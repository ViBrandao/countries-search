import produce from 'immer';
import { Reducer } from "redux";

import { ICountriesState } from "./types";

const INITIAL_STATE: ICountriesState = {
    countries: []
};

const countries: Reducer<ICountriesState> = (state = INITIAL_STATE, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'ADD_COUNTRIES': {
                const { countries } = action.payload;
                draft.countries = countries;
                break;
            }
            default: {
                return state;
            }
        };
    });
}

export default countries;

//---- 
// se fosse adicionar mais 
// draft.countries.push();
//----
// sem immer
// return {
//     ...state, countries: countries
// };
//----
// se fosse adicionar mais aos que já tem
// return {
//     ...state, countries: [
//         ...state.countries, { countries }
//     ]
// };