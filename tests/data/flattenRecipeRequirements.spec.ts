import 'mocha';
import { expect } from 'chai';

import { getRecipe } from 'data/getRecipe';
import { solveRecipe } from 'data/solveRecipe';
import { flattenRecipeRequirements } from 'data/flattenRecipeRequirements';
import { testChunks } from './stub/chunks';
import * as testProducts from './stub/products';

describe('Recipe Solution Flattener', function() {
	const flattenedRequirements = {
		'Beef': 20,
		'Water': 12,
		'Wheat': 8
	};

	it('should flatten a solved recipe into a list of factory requirements', function() {
		const recipe = getRecipe(testChunks, testProducts.beef.name);
		const solved = solveRecipe(testChunks, 0.4, recipe);

		expect(flattenRecipeRequirements(solved)).to.be.deep.equal(flattenedRequirements);
	});
});
