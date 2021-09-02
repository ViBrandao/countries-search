import { Reducer } from "redux";

import { ICountriesState } from "./types";

const INITIAL_STATE: ICountriesState = {
    countries: []
};

const countries: Reducer<ICountriesState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_COUNTRIES': {
            const { countries } = action.payload;
            return {
                ...state, countries: countries

            };
            // se fosse adicionar mais aos que já tem
            // return {
            //     ...state, countries: [
            //         ...state.countries, { countries }
            //     ]
            // };
        }
        default: {
            return state;
        }
    };
}

export default countries;