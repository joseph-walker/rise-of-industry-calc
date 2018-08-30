import { tail } from 'ramda';

import { Chunks, Product, Rate } from 'data/types';
import { getRequirements } from 'data/getRequirements';
import { Maybe } from 'util/Maybe';

export function solve(chunks: Chunks, requiredRate: Rate, productList: Product[]): [Product, number] {
	switch (productList.length) {
		case 0: {
			throw new Error(`Cannot solve production chain with no products in it`);
		}
		case 1: {
			const p = productList[0];
			const j: [Product, number] = [p, Math.ceil(requiredRate / p.outputRate)];

			return j;
		}
		default: {
			const p1 = productList[0];
			const p2 = productList[1];
			const numFactories = Math.ceil(requiredRate / p1.outputRate);
			const nextProductRequiredRate = getRequirements(chunks, p1.name, p2.name) * numFactories;

			return solve(chunks, nextProductRequiredRate, tail(productList));
		}
	}
}
