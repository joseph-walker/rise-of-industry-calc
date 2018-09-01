export enum RemoveAllSelectedTypes {
	RemoveAllSelectedProducts = '@@products/REMOVE_ALL_SELECTED_PRODUCTS'
}

interface RemoveAllSelected {
	type: RemoveAllSelectedTypes.RemoveAllSelectedProducts
}

export type RemoveAllSelectedAction
	= RemoveAllSelected

export function removeAllSelectedProducts(): RemoveAllSelected {
	return {
		type: RemoveAllSelectedTypes.RemoveAllSelectedProducts
	};
};
