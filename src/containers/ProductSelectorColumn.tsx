import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ReduxState } from '../state/store';
import { Product } from '../data/types';
import { getProducts } from '../data/getProducts';
import { ProductsAction } from '../state/modules/products/reducer';
import { setSearchValue } from '../state/modules/products/actions/search';
import { ProductSelectorColumn as ProductSelectorColumnComponent } from '../components/Columns/ProductSelectorColumn';
import { Maybe } from '../util/Maybe';

function maybeFilterProductsList(maybeSearchValue: Maybe<string>) {
	return (products: Product[]): Product[] => {
		return maybeSearchValue.with({
			just: (searchValue: string) => {
				return products.filter((product: Product) => {
					return product
						.name
						.toLowerCase()
						.indexOf(searchValue.toLowerCase()) !== -1
				});
			},
			nothing: () => products
		});
	};
}

function mapStateToProps(state: ReduxState) {
	const maybeSearchValue = state.products.searchValue;

	const productsList = state
		.products
		.productChunks
		.map(getProducts);

	return {
		productsList: productsList.map(maybeFilterProductsList(maybeSearchValue)),
		searchValue: state.products.searchValue
	};
}

function mapDispatchToProps(dispatch: Dispatch<ProductsAction>) {
	return {
		onSetSearchValue: (e: React.FormEvent<HTMLInputElement>) => dispatch(setSearchValue(e.currentTarget.value))
	};
}

export const ProductSelectorColumn = connect(mapStateToProps, mapDispatchToProps)(ProductSelectorColumnComponent);
