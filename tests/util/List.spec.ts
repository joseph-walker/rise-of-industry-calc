import 'mocha';

import { List } from 'util/List';
import { functorLaws, applicativeLaws, monadLaws } from './Algebra.spec';

describe('List Monad', function() {
	const tF = (n: number) => List.of(n + 1);
	const tG = (n: number) => List.of(n - 2);

	functorLaws(List.of);
	applicativeLaws(List.pure, List.of);
	monadLaws(List.pure, List.of, tF, tG);
});
