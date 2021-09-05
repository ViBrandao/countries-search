/* eslint-disable @next/next/no-img-element */
import { query as q } from "faunadb";
import { GetServerSideProps } from "next";
import { getSession, signIn, useSession } from "next-auth/client";
import Link from "next/link"
import { FaMapMarkerAlt } from 'react-icons/fa'

import { api, apiRestCountries } from "../../services/api";
import { fauna } from "../../services/fauna";

interface ICallingCode {
    codes: string;
}

interface ICurrency {
    code: string;
    name: string;
    symbol: string;
}

interface ILanguage {
    name: string;
}

interface ICountry {
    name: string;
    nativeName: string;
    alpha2Code: string;
    callingCodes: ICallingCode[];
    capital: string;
    region: string;
    subregion: string;
    population: string;
    demonym: string;
    currencies: ICurrency[];
    languages: ILanguage[];
    flag: string;
}

interface CountryProps {
    country: ICountry;
    isCountryMarked: boolean;
}

export default function Country({ country, isCountryMarked }: CountryProps) {
    const [session] = useSession();

    async function mark(code: string, email: string) {
        if (!session) {
            signIn('github');
            return;
        }

        api.post('/mark', { code, email })
    }

    return (
        <div>
            <Link href={'/'}>
                <a >Home</a>
            </Link>
            {
                session?.user && !isCountryMarked && <button type="button" onClick={() => mark(country.alpha2Code, session.user.email)} >
                    <FaMapMarkerAlt />
                    Mark
                </button>
            }

            <p>{country.name}</p>
            <p>{country.nativeName}</p>
            <p>{country.capital}</p>
            <p>{country.region}</p>
            <p>{country.subregion}</p>
            <p>{country.population}</p>
            <p>{country.demonym}</p>
            <img src={country.flag} alt="Flag" />
        </div>
    );

}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req })
    const { code } = params;

    let country: ICountry;

    await apiRestCountries
        .get(`alpha/${code}`)
        .then((response) => {
            country = response.data;
        }).catch(() => {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        });

    let isCountryMarked = false;

    try {
        isCountryMarked = await fauna.query(
            q.Exists(
                q.Intersection([
                    q.Match(
                        q.Index('marked_countries_by_email'),
                        q.Casefold(session.user.email)
                    ),
                    q.Match(
                        q.Index('marked_countries_by_code'),
                        code
                    )
                ])
            )
        )
    } catch { }

    return {
        props: { country, isCountryMarked }
    }
}