
import { signIn, useSession } from "next-auth/client";
import { useState } from "react";
import { FaMapMarkerAlt } from 'react-icons/fa'
import { api } from "../../services/api";

interface ICountry {
    name: string;
    alpha2Code: string;
}

interface CountryProps {
    country: ICountry;
    isCountryMarked: boolean;
}

export default function MarkerButton({ country, isCountryMarked }: CountryProps) {
    const [session] = useSession();
    const [marked, setMarked] = useState(isCountryMarked);

    async function mark(countryCode: string, countryName: string, userEmail: string) {
        if (!session) {
            signIn('github');
            return;
        }

        api
            .post('/mark', { countryCode, countryName, userEmail })
            .then(() => {
                setMarked(true);
            })
    }

    async function unmark(countryCode: string, countryName: string, userEmail: string) {
        if (!session) {
            signIn('github');
            return;
        }

        api
            .post('/unmark', { countryCode, countryName, userEmail })
            .then(() => {
                setMarked(false);
            })
    }

    if (!marked) {
        return (
            <button type="button" onClick={() => mark(country.alpha2Code, country.name, session.user.email)} >
                <FaMapMarkerAlt color="#eba417" />
                Mark
            </button>
        );
    }

    return (
        <button type="button" onClick={() => unmark(country.alpha2Code, country.name, session.user.email)} >
            <FaMapMarkerAlt color="#04d361" />
            Unmark
        </button>
    );
}