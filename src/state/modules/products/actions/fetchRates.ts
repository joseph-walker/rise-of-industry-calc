import { Action, ActionCreator } from 'redux';

import { Chunks } from './../../../../data/types';

export enum FetchRatesActionTypes {
	Init = '@@products/FETCH_RATES_INIT',
	Success = '@@products/FETCH_RATES_SUCCESS',
	Fail = '@@products/FETCH_RATES_FAIL'
}

interface FetchRatesInitAction extends Action {
	type: FetchRatesActionTypes.Init
}

interface FetchRatesSuccessAction extends Action {
	type: FetchRatesActionTypes.Success,
	rates: Chunks
}

interface FetchRatesFailAction extends Action {
	type: FetchRatesActionTypes.Fail,
	error: string
}

export type FetchRatesAction
	= FetchRatesInitAction
	| FetchRatesSuccessAction
	| FetchRatesFailAction

export const fetchRates: ActionCreator<FetchRatesInitAction> = () => {
	return {
		type: FetchRatesActionTypes.Init
	};
};

export const fetchRatesSuccess: ActionCreator<FetchRatesSuccessAction> = (rates: Chunks) => {
	return {
		type: FetchRatesActionTypes.Success,
		rates
	};
};

export const fetchRatesFail: ActionCreator<FetchRatesFailAction> = (error: string) => {
	return {
		type: FetchRatesActionTypes.Fail,
		error
	};
};
