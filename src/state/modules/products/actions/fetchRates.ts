import { Chunks } from 'data/types';

export enum FetchRatesActionTypes {
	Init = '@@products/FETCH_RATES_INIT',
	Success = '@@products/FETCH_RATES_SUCCESS',
	Fail = '@@products/FETCH_RATES_FAIL'
}

interface FetchRatesInitAction {
	type: FetchRatesActionTypes.Init
}

interface FetchRatesSuccessAction {
	type: FetchRatesActionTypes.Success,
	rates: Chunks
}

interface FetchRatesFailAction {
	type: FetchRatesActionTypes.Fail,
	error: string
}

export type FetchRatesAction
	= FetchRatesInitAction
	| FetchRatesSuccessAction
	| FetchRatesFailAction

export function fetchRates(): FetchRatesInitAction {
	return {
		type: FetchRatesActionTypes.Init
	};
};

export function fetchRatesSuccess(rates: Chunks): FetchRatesSuccessAction {
	return {
		type: FetchRatesActionTypes.Success,
		rates
	};
};

export function fetchRatesFail(error: string): FetchRatesFailAction {
	return {
		type: FetchRatesActionTypes.Fail,
		error
	};
};
