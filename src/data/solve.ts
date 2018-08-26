import { tail } from 'ramda';

import { Chunks, Product, Rate } from 'data/types';
import { getRequirements } from 'data/getRequirements';
import { Maybe } from 'util/Maybe';

export function solve(chunks: Chunks, requiredRate: Rate, productList: Product[]): Maybe<[Product, number]> {
	switch (productList.length) {
		case 0: {
			return Maybe.Nothing();
		}
		case 1: {
			const p = productList[0];
			const j: [Product, number] = [p, Math.ceil(requiredRate / p.outputRate)];

			return Maybe.Just(j);
		}
		default: {
			const p1 = productList[0];
			const p2 = productList[1];
			const numFactories = Math.ceil(requiredRate / p1.outputRate);
			const nextProductRequiredRate = getRequirements(chunks, p1.name, p2.name).map(n => n * numFactories);

			return nextProductRequiredRate
				.chain(function(nextProductRate) {
					return solve(chunks, nextProductRate, [].concat(p2, tail(productList)))
				});
		}
	}
}
