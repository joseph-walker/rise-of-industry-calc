import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ReduxState } from '../state/store';
import { Product } from '../data/types';
import { getProducts } from '../data/getProducts';
import { ProductsAction } from '../state/modules/products/reducer';
import { setSearchValue } from '../state/modules/products/actions/search';
import { toggleSelectedProduct } from '../state/modules/products/actions/toggleSelected';
import { ProductSelectorColumn as ProductSelectorColumnComponent } from '../components/columns/ProductSelectorColumn';
import { Maybe } from '../util/Maybe';

function alphabetize(p1: Product, p2: Product): number {
	const p1Name = p1.name.toLowerCase()[0];
	const p2Name = p2.name.toLowerCase()[0];

	if (p1Name < p2Name)
		return -1
	else if (p1Name > p2Name)
		return 1;

	return 0;
}

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
		.map(getProducts)
		.map(maybeFilterProductsList(maybeSearchValue));

	return {
		productsList: productsList
			.map(ps => ps.sort(alphabetize)),
		searchValue: state
			.products
			.searchValue,
		selectedProducts: state
			.products
			.productBlocks
			.map(b => b.product)
	};
}

function mapDispatchToProps(dispatch: Dispatch<ProductsAction>) {
	return {
		onSetSearchValue: (e: React.FormEvent<HTMLInputElement>) => dispatch(setSearchValue(e.currentTarget.value)),
		onSelectProduct: (p: Product) => dispatch(toggleSelectedProduct(p))
	};
}

export const ProductSelectorColumn = connect(mapStateToProps, mapDispatchToProps)(ProductSelectorColumnComponent);
