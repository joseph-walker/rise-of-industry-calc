import { createStore, combineReducers } from 'redux';

import { solverReducer } from './modules/solver';

const reducers = combineReducers({
	solver: solverReducer
});

export const store = createStore(reducers);
