import { contains, memoize } from 'ramda';

import { Product } from './types';

export const productListContainsProduct = (productList: Product[]) => memoize((p: Product): boolean => {
	return contains(p, productList);
});
