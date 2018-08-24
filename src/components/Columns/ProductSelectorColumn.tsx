import * as React from 'react';
import { css } from 'emotion';

import { Product } from '../../data/types';
import { productListContainsProduct } from '../../data/productList';
import { Response } from '../../util/Response';
import { Maybe } from '../../util/Maybe';

const productSelectorColumnStyles = css`
	flex: 1;
`;

const columnContentsStyles = css`
	flex: 1;
	display: flex;
	flex-direction: column;
	border: 1px solid #EAEAEA;
	height: 100%;
`;

const searchBoxStyles = css`
	display: block;
	padding: 12px 16px;
	border-bottom: 1px solid #EAEAEA;
	width: 100%;
`;

const productListStyles = css`
	display: block;
	height: 100%;
	overflow-y: scroll;
`;

const productListItemStyles = css`
	display: flex;
	margin: 3px 3px 0 3px;
	background-color: #f7f7f7;
	border: 1px solid #F5F5F5;
	padding: 12px;
	cursor: pointer;

	&:last-child {
		margin-bottom: 3px;
	}
`;

const productListItemSelectedStyles = css`
	${productListItemStyles}
	background-color: #5028f1;
	border-color: #4d32b9;
	color: #FFF;
`;

interface OwnProps {
	productsList: Response<Product[], string>,
	searchValue: Maybe<string>,
	selectedProducts: Product[],
	onSetSearchValue: (e: React.FormEvent<HTMLInputElement>) => void,
	onSelectProduct: (p: Product) => void
}

export function ProductSelectorColumn(props: OwnProps) {
	const isSelected = productListContainsProduct(props.selectedProducts);

	return props.productsList.with({
		loading: function() {
			return (
				<p>Loading...</p>
			);
		},
		ready: function(products: Product[]) {
			const productItems = products.map((p, i) => {
				const cssClassName = isSelected(p)
					? productListItemSelectedStyles
					: productListItemStyles;

				return (
					<li
						className={cssClassName}
						key={`product-${i}`}
						onClick={() => props.onSelectProduct(p)}>
						{p.name}
					</li>
				);
			});

			return (
				<div className={`column ${productSelectorColumnStyles}`}>
					<h2>Product List</h2>
					<section className={columnContentsStyles}>
						<input
							className={searchBoxStyles}
							type="text"
							value={props.searchValue.withDefault('')}
							placeholder="Search..."
							onChange={props.onSetSearchValue} />
						<ul className={productListStyles}>
							{productItems}
						</ul>
					</section>
				</div>
			);
		},
		error: function(err: string) {
			return (
				<p>Something went wrong: {err}</p>
			);
		}
	});
}
