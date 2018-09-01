import { LoopReducer, loop, Cmd } from 'redux-loop';
import { Lens, compose, lensProp, set, remove, append } from 'ramda';

import { Maybe } from 'util/Maybe';
import { Response } from 'util/Response';
import { Chunks, ProductionBlock } from 'data/types';
import { productListContainsProduct } from 'data/productList';
import { runFetchRates } from './commands/runFetchRates';
import { SearchActionTypes, SearchAction } from './actions/search';
import { ToggleActionTypes, ToggleAction } from './actions/toggleSelected';
import { UpdateProductionBlockTypes, UpdateProductionBlockAction } from './actions/updateProductionBlock';
import { FetchRatesActionTypes, FetchRatesAction, fetchRatesSuccess, fetchRatesFail } from './actions/fetchRates';

export type ProductsAction
	= FetchRatesAction
	| SearchAction
	| ToggleAction
	| UpdateProductionBlockAction

export interface ProductsState {
	productChunks: Response<Chunks, string>,
	productBlocks: ProductionBlock[],
	searchValue: Maybe<string>
}

export const initialState: ProductsState = {
	productChunks: Response.Loading(),
	productBlocks: [],
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
			const indexOfProduct = productListContainsProduct(state.productBlocks.map(b => b.product))(action.product);
			const emptyProductBlock: ProductionBlock = {
				product: action.product,
				requiredRate: {
					rate: '',
					days: '15'
				}
			}

			return {
				...state,
				productBlocks: indexOfProduct !== -1
					// Product is selected -- Remove it
					? remove(indexOfProduct, 1, state.productBlocks)
					// Product is not selected -- Add it
					: append(emptyProductBlock, state.productBlocks)
			};
		}
		case UpdateProductionBlockTypes.UpdateProductionBlock: {
			const productionBlockLens = compose(lensProp('productBlocks'), action.blockPath) as Lens;

			return set(productionBlockLens, action.value.replace(/[^\d\.]/g, ''), state);
		}
		default: {
			return state;
		}
	}
}
