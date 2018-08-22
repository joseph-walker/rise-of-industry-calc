import { indexOf } from 'ramda';

import { Chunks, Rate } from './types';
import { Maybe } from './../util/Maybe';

export function getRequirements(chunks: Chunks, productName1: string, productName2: string): Maybe<Rate> {
	if (chunks[productName1] === undefined)
		return Maybe.Nothing();

	const chunk = chunks[productName1];
	const componentNames = chunk.components.map(c => c.name);
	const i = indexOf(productName2, componentNames);

	if (i === -1)
		return Maybe.Nothing();

	return Maybe.Just(chunk.components[i].unitRate);
}
