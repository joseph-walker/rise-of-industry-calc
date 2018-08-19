import { createStore, compose } from 'redux';
import { StoreCreator, combineReducers, install as installReduxLoop } from 'redux-loop';

import { productsReducer, initialState as productsInitialState } from './modules/products/reducer';
import { fetchRates } from './modules/products/actions/fetchRates';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancedCreateStore = createStore as StoreCreator;

const enhancer = composeEnhancers(
	installReduxLoop()
);

const reducers = combineReducers({
	products: productsReducer
});

const initialState = {
	products: productsInitialState
};

export const store = enhancedCreateStore(reducers, initialState, enhancer );

store.dispatch(fetchRates());
