import { append as cons } from 'ramda';

import { List } from 'util/List';
import { RecipeRequirements, Recipe, Chunks, Product } from 'data/types';
import { solve } from 'data/solve';

function isoRecipeToProduct(r: Recipe): Product {
	return {
		name: r.name,
		outputRate: r.requiredRate
	};
}

export function solveRecipe<T>(chunks: Chunks, requiredRootRate: number, recipe: Recipe, path: Product[] = []): RecipeRequirements {
	const newPath = cons(isoRecipeToProduct(recipe), path);

	return {
		name: recipe.name,
		requiredFactories: solve(chunks, requiredRootRate, newPath)[1],
		components: recipe.components.map(c => solveRecipe(chunks, requiredRootRate, c, newPath))
	};
}
