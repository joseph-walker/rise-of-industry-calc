import { LoopReducer, loop, Cmd } from 'redux-loop';

import { FetchRatesActionTypes, FetchRatesAction, fetchRatesSuccess, fetchRatesFail } from './actions/fetchRates';
import { runFetchRates } from './commands/runFetchRates';
import { Response } from './../../../util/Response';
import { Chunks } from './../../../data/types';

type ProductsAction
	= FetchRatesAction

export interface ProductsState {
	productChunks: Response<Chunks, string>
}

export const initialState: ProductsState = {
	productChunks: Response.Loading()
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
				productChunks: Response.Ready(action.rates)
			};
		}
		case FetchRatesActionTypes.Fail: {
			return {
				...state,
				productChunks: Response.Error('There was a problem fetching production rate data.')
			};
		}
		default: {
			return state;
		}
	}
}
