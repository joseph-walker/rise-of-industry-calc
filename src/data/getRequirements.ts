import { indexOf } from 'ramda';

import { Chunks, Rate } from 'data/types';

export function getRequirements(chunks: Chunks, productName1: string, productName2: string): Rate {
	if (chunks[productName1] === undefined)
		throw new Error(`Error in 'getRequirements' -- Tried to find primary product with name ${productName1}, but it was not found`);

	const chunk = chunks[productName1];
	const componentNames = chunk.components.map(c => c.name);
	const i = indexOf(productName2, componentNames);

	if (i === -1)
		throw new Error(`Error in 'getRequirements' -- Tried to find secondary product with name ${productName2}, but it was not found`);

	return chunk.components[i].unitRate;
}
