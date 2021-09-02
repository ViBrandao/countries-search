import { useSelector } from "react-redux";

import { IState } from "../../store";
import { ICountry } from "../../store/modules/countries/types";

export default function CountriesList() {
    const countries = useSelector<IState, ICountry[]>(state => state.countries.countries);

    return (
        <ul>
            {countries.map((country, index) => (
                <li key={index}>{country.name}</li>
            ))}
        </ul>
    );
}