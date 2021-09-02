import { createStore } from 'redux';
import { ICountriesState } from './modules/countries/types';

import rootReducer from './modules/rootReducer';

export interface IState {
    countries: ICountriesState;
}

const store = createStore(rootReducer);

export default store;

