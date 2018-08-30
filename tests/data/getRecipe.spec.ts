import 'mocha';
import { expect } from 'chai';

import { Maybe } from 'util/Maybe';
import { getRecipe } from 'data/getRecipe';
import { Product } from 'data/types';
import { testChunks } from './stub/chunks';
import * as testProducts from './stub/products';

describe('Recipe Generator', function() {
	const beefRecipe = Maybe.Just({
		name: 'Beef',
		requiredRate: 0.02,
		components: [{
			name: 'Water',
			requiredRate: 0.1,
			components: []
		}, {
			name: 'Wheat',
			requiredRate: 0.1,
			components: [{
				name: 'Water',
				requiredRate: 0.1,
				components: []
			}]
		}]
	});

	it('should generate a recipe when given a product name and a required rate', function() {
		expect(getRecipe(testChunks, testProducts.beef.name)).to.be.deep.equal(beefRecipe);
	});
});
