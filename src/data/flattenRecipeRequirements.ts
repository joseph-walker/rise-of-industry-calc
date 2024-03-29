import { toPairs, splitEvery, nth, filter, compose, map, complement, isEmpty } from 'ramda';
import { flatten } from 'flat';

import { RequirementTuple, RecipeRequirements } from "data/types";

export function flattenRecipeRequirements(recipe: RecipeRequirements): RequirementTuple[] {
	const fromPair = ([k, v]: [string, number]): {} => ({[k]: v});

	const fn = compose(
		splitEvery(2),
		filter(complement(isEmpty)),
		map(nth(1)),
		toPairs as any,
		(r: RecipeRequirements) => flatten(r)
	);

	return fn(recipe)
		.map(fromPair);
}
