import { createStore, compose } from 'redux';
import { StoreCreator, combineReducers, install as installReduxLoop } from 'redux-loop';

import { ProductsState, productsReducer, initialState as productsInitialState } from './modules/products/reducer';
import { fetchRates } from './modules/products/actions/fetchRates';

export interface ReduxState {
	products: ProductsState
}

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancedCreateStore = createStore as StoreCreator;

const enhancer = composeEnhancers(
	installReduxLoop()
);

const reducers = combineReducers({
	products: productsReducer
});

const initialState: ReduxState = {
	products: productsInitialState
};

export const store = enhancedCreateStore(reducers, initialState, enhancer );

store.dispatch(fetchRates());
