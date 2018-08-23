export enum SearchActionTypes {
	SetSearchValue = '@@products/SET_SEARCH_VALUE'
}

interface SetSearchValue {
	type: SearchActionTypes.SetSearchValue,
	searchValue: string
}

export type SearchAction
	= SetSearchValue

export function setSearchValue(searchValue: string): SetSearchValue {
	return {
		type: SearchActionTypes.SetSearchValue,
		searchValue
	};
};
