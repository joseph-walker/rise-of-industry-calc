import { LoopReducer, loop, Cmd } from 'redux-loop';
import { without, append } from 'ramda';

import { productListContainsProduct } from '../../../data/productList';
import { FetchRatesActionTypes, FetchRatesAction, fetchRatesSuccess, fetchRatesFail } from './actions/fetchRates';
import { SearchActionTypes, SearchAction } from './actions/search';
import { ToggleActionTypes, ToggleAction } from './actions/toggleSelected';
import { runFetchRates } from './commands/runFetchRates';
import { Response } from './../../../util/Response';
import { Maybe } from './../../../util/Maybe';
import { Chunks, Product } from './../../../data/types';

export type ProductsAction
	= FetchRatesAction
	| SearchAction
	| ToggleAction

export interface ProductsState {
	productChunks: Response<Chunks, string>,
	selectedProducts: Product[],
	searchValue: Maybe<string>
}

export const initialState: ProductsState = {
	productChunks: Response.Loading(),
	selectedProducts: [],
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
		case ToggleActionTypes.ToggleSelectedProduct: {
			return {
				...state,
				// Toggle the given product in the selectedProducts list
				selectedProducts: productListContainsProduct(state.selectedProducts)(action.product)
					// Product is selected -- Remove it
					? without([action.product], state.selectedProducts)
					// Product is not selected -- Add it
					: append(action.product, state.selectedProducts)
			};
		}
		default: {
			return state;
		}
	}
}
