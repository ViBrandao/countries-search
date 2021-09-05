/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import Link from "next/link"

import { api } from "../../services/api";

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
}

export default function Country({ country }: CountryProps) {
    return (
        <div>
            <Link href={`/`}>
                <a >Home</a>
            </Link>
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
    const { code } = params;

    let country: ICountry;

    await api
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

    return {
        props: { country }
    }
}