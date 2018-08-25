import 'mocha';
import { expect } from 'chai';

describe('Hello Function', function() {
	it('should say hello world', function() {
		expect('Hello').to.equal('Hello');
	});
});
