import React, { FormEvent, useState } from "react";

import { CountriesList } from "../components/CountriesList";
import { api } from "../services/api";

interface ICountry {
  name: string;
}

export default function Home() {
  const [countryName, setCountryName] = useState('');
  const [countries, setCountries] = useState<ICountry[]>([]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (countryName) {
      api
        .get(`name/${countryName}`)
        .then((response) => {
          setCountries(response.data);
        }).catch(() => {
          setCountries({} as ICountry[]);
        });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Search Countries</h1>
        <input type="text" onChange={(event) => setCountryName(event.target.value)} />
        <button type="submit">Search</button>
      </form>
      {countries.length > 0 && <CountriesList countries={countries} />}
    </div>
  )
}
