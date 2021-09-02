import { ICountry } from "./types";

export function addCountries(countries: ICountry[]) {
    return {
        type: 'ADD_COUNTRIES',
        payload: {
            countries
        }
    }
}