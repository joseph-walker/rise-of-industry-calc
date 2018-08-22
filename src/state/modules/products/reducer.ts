import { LoopReducer, loop, Cmd } from 'redux-loop';

import { FetchRatesActionTypes, FetchRatesAction, fetchRatesSuccess, fetchRatesFail } from './actions/fetchRates';
import { runFetchRates } from './commands/runFetchRates';
import { Response } from './../../../util/Response';
import { Chunks } from './../../../data/types';

interface ProductsState {
	rawProducts: Response<Chunks, string>
}

type ProductsAction
	= FetchRatesAction

export const initialState: ProductsState = {
	rawProducts: Response.Loading()
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
				products: Response.Ready(action.rates)
			};
		}
		case FetchRatesActionTypes.Fail: {
			return {
				...state,
				products: Response.Error(action.error)
			};
		}
		default: {
			return state;
		}
	}
}
