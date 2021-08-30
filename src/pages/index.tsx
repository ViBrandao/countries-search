import { FormEvent, useState } from "react";
import { api } from "../services/api";

interface ICountry {
  name: string;
  capital: string;
}

export default function Home() {
  const [countryName, setCountryName] = useState('');
  const [countries, setCountries] = useState<ICountry[]>([]);
  console.log(countries);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (countryName) {
      api
        .get(`name/${countryName}`)
        .then((response) => {
          setCountries(response.data);
        });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Search Countries</h1>
        <input type="text" onChange={(event) => setCountryName(event.target.value)} />
      </form>
      {countries && (countries.map((country, index) => (
        <div key={index}>
          <span>Name: {country.name}</span>
          <br />
          <span>Capital: {country.capital}</span>
        </div>
      )))}
    </div>
  )
}
