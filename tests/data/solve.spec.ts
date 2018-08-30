import 'mocha';
import { expect } from 'chai';

import { Maybe } from 'util/Maybe';
import { solve } from 'data/solve';
import { Product } from 'data/types';
import { testChunks } from './stub/chunks';
import * as testProducts from './stub/products';

describe('Requirements Solver', function() {
	const chain1: Product[] = [testProducts.beef];
	const chain2: Product[] = [testProducts.beef, testProducts.wheat];
	const chain3: Product[] = [testProducts.beef, testProducts.wheat, testProducts.water];
	const invalidChain: Product[] = [testProducts.wheat, testProducts.beef];
	const emptyChain: Product[] = [];

	it('should solve a production block for required factory instances', function() {
		expect(solve(testChunks, 0.2, chain1)).to.be.deep.equal(Maybe.Just([testProducts.beef, 10]));
		expect(solve(testChunks, 0.2, chain2)).to.be.deep.equal(Maybe.Just([testProducts.wheat, 4]));
		expect(solve(testChunks, 0.2, chain3)).to.be.deep.equal(Maybe.Just([testProducts.water, 2]));
	});

	it('should return Nothing for an invalid chain', function() {
		expect(solve(testChunks, 0.2, invalidChain)).to.be.deep.equal(Maybe.Nothing());
	});

	it('should return Nothing for an empty chain', function() {
		expect(solve(testChunks, 0.2, emptyChain)).to.be.deep.equal(Maybe.Nothing());
	});
});
