import React, { FormEvent, useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { api } from "../../services/api";
import { addCountries } from "../../store/modules/countries/actions";

interface ICountry {
    name: string;
}

export default function ContriesSearchForm() {
    const dispatch = useDispatch();
    const [countryName, setCountryName] = useState('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (countryName) {
            api
                .get(`name/${countryName}`)
                .then((response) => {
                    dispatch(addCountries(response.data))
                }).catch();
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Search Countries</h1>
            <input type="text" onChange={(event) => setCountryName(event.target.value)} />
            <button type="submit">Search</button>
        </form>
    )
}
