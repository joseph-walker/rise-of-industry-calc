import { append as cons } from 'ramda';

import { RecipeRequirements, Recipe, Chunks, Product } from 'data/types';
import { solve } from 'data/solve';

function isoRecipeToProduct(r: Recipe): Product {
	return {
		name: r.name,
		outputRate: r.requiredRate
	};
}

export function solveRecipe<T>(chunks: Chunks, requiredRootRate: number, path: Product[], recipe: Recipe): RecipeRequirements {
	console.log('Solving with...');

	const newPath = cons(isoRecipeToProduct(recipe), path);

	console.log(newPath);
	console.log();

	return {
		name: recipe.name,
		requiredFactories: solve(chunks, requiredRootRate, newPath).map(tuple => tuple[1]).withDefault(0),
		components: recipe.components.map(c => solveRecipe(chunks, requiredRootRate, newPath, c))
	};
}
