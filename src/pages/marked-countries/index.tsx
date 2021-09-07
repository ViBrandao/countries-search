import { GetServerSideProps } from "next";
import { fauna } from "../../services/fauna";
import { query as q, Var } from "faunadb";
import { getSession } from "next-auth/client";
import Link from "next/link"

interface IMarkedCountry {
    countryCode: string;
    countryName: string;
}

interface IData {
    data: IMarkedCountry,
}

interface IFaunaResponse {
    data: IData[],
};

interface MarkedCountriesProps {
    markedCountries: IMarkedCountry[],
}

export default function markedCountries({ markedCountries }: MarkedCountriesProps) {
    return (
        <ul>
            {markedCountries.map((markedCountry, index) => (

                <li key={index}>
                    <Link href={`/country/${markedCountry.countryCode}`}>
                        <a >{markedCountry.countryName}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req })

    let markedCountries: IMarkedCountry[];

    let faunaResponse: IFaunaResponse;

    try {
        faunaResponse = await fauna
            .query(
                q.Map(
                    q.Paginate(
                        q.Match(
                            q.Index('marked_countries_by_email'),
                            q.Casefold(session.user.email)
                        )
                    ),
                    q.Lambda('email', q.Get(Var('email'))
                    )
                )
            );

        markedCountries = faunaResponse.data.map(item => item.data);

    } catch { }

    return {
        props: { markedCountries }
    }
}