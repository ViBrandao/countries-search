import { GetServerSideProps } from "next";
import { fauna } from "../../services/fauna";
import { query as q, Var } from "faunadb";
import { getSession } from "next-auth/client";
import Link from "next/link"
import React from "react";
import MarkerButton from "../../components/markerButton";
import { ICountry } from "../../store/modules/countries/types";

interface IMarkedCountry {
    countryCode: string;
    countryName: string;
}

interface IData {
    data: IMarkedCountry,
}

interface IFaunaResponse {
    data: IData[],
}

interface MarkedCountriesProps {
    countries: IMarkedCountry[],
}

export default function markedCountries({ countries }: MarkedCountriesProps) {
    let country: ICountry;
    return (
        <ul>
            {countries.map((markedCountry, index) => {
                country = {
                    alpha2Code: markedCountry.countryCode,
                    name: markedCountry.countryName
                }
                return (

                    <li key={index}>
                        <Link href={`/country/${markedCountry.countryCode}`}>
                            <a >{markedCountry.countryName}</a>
                        </Link>
                        <MarkerButton country={country} isCountryMarked={true} />
                    </li>);
            })}
        </ul>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req })

    let countries: IMarkedCountry[];

    let faunaResponse: IFaunaResponse;

    try {
        faunaResponse = await fauna
            .query(
                q.Map(
                    q.Paginate(
                        q.Intersection([
                            q.Match(
                                q.Index('marked_countries_by_email'),
                                q.Casefold(session.user.email)
                            ),
                            q.Match(
                                q.Index('marked_countries_by_marked'),
                                true
                            )
                        ])
                    ),
                    q.Lambda('email', q.Get(Var('email'))
                    )
                )
            );

        countries = faunaResponse.data.map(item => item.data);

    } catch { }

    return {
        props: { countries }
    }
}