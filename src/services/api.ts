import axios from "axios";

export const apiRestCountries = axios.create({
    baseURL: 'https://restcountries.eu/rest/v2/'
});

export const api = axios.create({
    baseURL: '/api'
});