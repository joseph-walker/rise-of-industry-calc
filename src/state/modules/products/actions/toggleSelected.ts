import { Product } from "../../../../data/types";

export enum ToggleActionTypes {
	ToggleSelectedProduct = '@@products/TOGGLE_SELECTED_PRODUCT'
}

interface ToggleSelectedProduct {
	type: ToggleActionTypes.ToggleSelectedProduct,
	product: Product
}

export type ToggleAction
	= ToggleSelectedProduct

export function toggleSelectedProduct(product: Product): ToggleSelectedProduct {
	return {
		type: ToggleActionTypes.ToggleSelectedProduct,
		product
	};
};
