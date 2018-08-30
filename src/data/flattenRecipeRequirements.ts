import { toPairs, splitEvery, nth, mergeWith, add, filter, compose, map, complement, isEmpty } from 'ramda';
import { flatten } from 'flat';

import { RecipeRequirements } from "data/types";

export function flattenRecipeRequirements(recipe: RecipeRequirements): { [k: string]: number } {
	const fromPair = ([k, v]: [string, number]): {} => ({[k]: v});

	const fn = compose(
		splitEvery(2),
		filter(complement(isEmpty)),
		map(nth(1)),
		toPairs,
		(r: RecipeRequirements) => flatten(r)
	);

	return fn(recipe)
		.map(fromPair)
		.reduce(mergeWith(add), {});
}
