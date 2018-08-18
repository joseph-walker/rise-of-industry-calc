import { createStore, combineReducers, compose } from 'redux';
import { install as installReduxLoop } from 'redux-loop';

import { solverReducer } from './modules/solver';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
	solver: solverReducer
});

const enhancer = composeEnhancers(
	installReduxLoop()
);

export const store = createStore(
	reducers,
	enhancer
);
