import Link from "next/link"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { apiRestCountries as api } from "../../services/api";
import { IState } from "../../store";
import { addCountries } from "../../store/modules/countries/actions";
import { ICountry } from "../../store/modules/countries/types";

export default function CountriesList() {
    const countries = useSelector<IState, ICountry[]>(state => state.countries.countries);
    const dispatch = useDispatch();

    if (countries.length <= 0) {
        api
            .get('all')
            .then((response) => {
                dispatch(addCountries(response.data))
            }).catch(() => {
                dispatch(addCountries([]))
            });
    }

    return (
        <div>
            {
                countries.length > 0 ? (
                    <h2>{countries.length} {countries.length > 1 ? 'Countries' : 'Country'} found</h2>
                ) : (
                    <h2>{countries.length} Countries found</h2>
                )
            }
            <ul>
                {countries.map((country, index) => (
                    <li key={index}>
                        <Link href={`/country/${country.alpha2Code}`}>
                            <a >{country.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}