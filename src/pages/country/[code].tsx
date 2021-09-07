/* eslint-disable @next/next/no-img-element */
import { query as q } from "faunadb";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import MarkerButton from "../../components/markerButton";
import { apiRestCountries } from "../../services/api";
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
    return (
        <div>
            <MarkerButton country={country} isCountryMarked={isCountryMarked} />
            <h2>Info</h2>
            <ul>
                <li>{country.nativeName}</li>
                <li>{country.capital}</li>
                <li>{country.region}</li>
                <li>{country.subregion}</li>
                <li>{country.population}</li>
                <li>{country.demonym}</li>
            </ul>
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
                    ),
                    q.Match(
                        q.Index('marked_countries_by_marked'),
                        true
                    )
                ])
            )
        )
    } catch { }

    return {
        props: { country, isCountryMarked }
    }
}