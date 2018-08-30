import 'mocha';
import { expect } from 'chai';

import { getRecipe } from 'data/getRecipe';
import { Recipe } from 'data/types';
import { testChunks } from './stub/chunks';
import * as testProducts from './stub/products';

describe('Recipe Generator', function() {
	const emptyComponentList: Recipe[] = [];

	const beefRecipe: Recipe = {
		name: 'Beef',
		requiredRate: 0.02,
		components: [{
			name: 'Water',
			requiredRate: 0.1,
			components: emptyComponentList
		}, {
			name: 'Wheat',
			requiredRate: 0.1,
			components: [{
				name: 'Water',
				requiredRate: 0.1,
				components: emptyComponentList
			}]
		}]
	};

	it('should generate a recipe when given a product name and a required rate', function() {
		expect(getRecipe(testChunks, testProducts.beef.name)).to.be.deep.equal(beefRecipe);
	});
});
