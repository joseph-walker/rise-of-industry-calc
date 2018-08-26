import { indexOf, memoize } from 'ramda';

import { Product } from 'data/types';

export const productListContainsProduct = (productList: Product[]) => memoize((p: Product): number => {
	return indexOf(p, productList);
});
