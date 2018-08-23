import { LoopReducer, loop, Cmd } from 'redux-loop';

import { FetchRatesActionTypes, FetchRatesAction, fetchRatesSuccess, fetchRatesFail } from './actions/fetchRates';
import { SearchActionTypes, SearchAction } from './actions/search';
import { runFetchRates } from './commands/runFetchRates';
import { Response } from './../../../util/Response';
import { Maybe } from './../../../util/Maybe';
import { Chunks } from './../../../data/types';

export type ProductsAction
	= FetchRatesAction
	| SearchAction

export interface ProductsState {
	productChunks: Response<Chunks, string>,
	searchValue: Maybe<string>
}

export const initialState: ProductsState = {
	productChunks: Response.Loading(),
	searchValue: Maybe.Nothing()
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
		case SearchActionTypes.SetSearchValue: {
			return {
				...state,
				searchValue: action.searchValue !== ''
					? Maybe.Just(action.searchValue)
					: Maybe.Nothing()
			};
		}
		default: {
			return state;
		}
	}
}
