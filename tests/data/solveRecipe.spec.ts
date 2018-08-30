import 'mocha';
import { expect } from 'chai';

import { getRecipe } from 'data/getRecipe';
import { solveRecipe } from 'data/solveRecipe';
import { RecipeRequirements } from 'data/types';
import { testChunks } from './stub/chunks';
import * as testProducts from './stub/products';

describe('Recipe Solver', function() {
	const solvedRecipe: RecipeRequirements = {
		components: [
			{
				components: [],
				name: 'Water',
				requiredFactories: 8
			}, {
				components: [{
					components: [],
					name: 'Water',
					requiredFactories: 4
				}],
				name: 'Wheat',
				requiredFactories: 8
			}
		],
		name: 'Beef',
		requiredFactories: 20
	};

	it('should solve a recipe for its requirements', function() {
		const recipe = getRecipe(testChunks, testProducts.beef.name);

		expect(solveRecipe(testChunks, 0.4, recipe)).to.be.deep.equal(solvedRecipe);
	});
});
