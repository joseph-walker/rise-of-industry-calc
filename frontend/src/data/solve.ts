import { tail } from 'ramda';

import { Product, Rate } from './types';
import { getRequirements } from './getRequirements';
import { Maybe } from './../util/Maybe';

export function solve(requiredRate: Rate, productList: Product[]): Maybe<[Product, number]> {
	switch (productList.length) {
		case 0: {
			return new Maybe.Nothing();
		}
		case 1: {
			const p = productList[0];
			const j: [Product, number] = [p, Math.ceil(requiredRate / p.outputRate)];

			return new Maybe.Just(j);
		}
		default: {
			const p1 = productList[0];
			const p2 = productList[1];
			const numFactories = Math.ceil(requiredRate / p1.outputRate);
			const nextProductRequiredRate = numFactories * getRequirements(p1.name, p2.name);

			return solve(nextProductRequiredRate, [].concat(p2, tail(productList)));
		}
	}
}
