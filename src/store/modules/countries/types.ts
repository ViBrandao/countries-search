export interface ICountry {
    name: string;
    alpha2Code: string;
}

export interface ICountriesState {
    countries: ICountry[];
}
