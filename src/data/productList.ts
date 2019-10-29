import { indexOf, memoizeWith } from "ramda";

import { Product } from "data/types";

export const productListContainsProduct = (productList: Product[]) =>
	memoizeWith(
		p => p.name,
		(p: Product): number => {
			return indexOf(p, productList);
		}
	);
