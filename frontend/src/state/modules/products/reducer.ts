import { LoopReducer, loop, Cmd } from 'redux-loop';

import { FetchRatesActionTypes, FetchRatesAction, fetchRatesSuccess, fetchRatesFail } from './actions/fetchRates';
import { runFetchRates } from './commands/runFetchRates';
import { Response } from './../../../util/Response';
import { Chunk } from './../../../data/types';

interface ProductsState {
	products: Response<Chunk[], string>
}

type ProductsAction
	= FetchRatesAction

export const initialState: ProductsState = {
	products: new Response.Loading()
}

export const productsReducer: LoopReducer<ProductsState, ProductsAction> = (state: ProductsState = initialState, action: ProductsAction) => {
	switch (action.type) {
		case FetchRatesActionTypes.Init: {
			return loop(
				state,
				Cmd.run<FetchRatesAction>(runFetchRates, {
					successActionCreator: fetchRatesSuccess,
					failActionCreator: fetchRatesFail
				})
			);
		}
		case FetchRatesActionTypes.Success: {
			return {
				...state,
				products: new Response.Ready(action.rates)
			};
		}
		case FetchRatesActionTypes.Fail: {
			return {
				...state,
				products: new Response.Error(action.error)
			};
		}
		default: {
			return state;
		}
	}
}
