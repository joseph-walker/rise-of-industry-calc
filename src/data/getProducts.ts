import { values } from 'ramda';

import { Product, Chunks } from "./types";

export function getProducts(chunks: Chunks): Product[] {
	return values(chunks)
		.map(function(productChunk) {
			return {
				name: productChunk.name,
				outputRate: productChunk.unitRate
			};
		});
}