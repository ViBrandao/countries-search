import Link from "next/link"
import { useSelector } from "react-redux";

import { IState } from "../../store";
import { ICountry } from "../../store/modules/countries/types";

export default function CountriesList() {
    const countries = useSelector<IState, ICountry[]>(state => state.countries.countries);

    return (
        <div>
            <ul>
                {countries.map((country, index) => (
                    <li key={index}>
                        <Link href={`/countries/${country.alpha2Code}`}>
                            <a >{country.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}