import 'mocha';
import { expect } from 'chai';

import { Maybe } from 'util/Maybe';
import { getRecipe } from 'data/getRecipe';
import { solveRecipe } from 'data/solveRecipe';
import { Product } from 'data/types';
import { testChunks } from './stub/chunks';
import * as testProducts from './stub/products';

describe.only('Recipe Solver', function() {
	it('should solve a recipe and flatten the output', function() {
		const f = getRecipe(testChunks, testProducts.beef.name);

		const g = f.map(r => solveRecipe(testChunks, 0.4, [], r));

		expect(g).to.be.deep.equal({});
	});
});
