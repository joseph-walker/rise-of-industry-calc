import * as React from 'react';

import { Product } from '../data/types';

interface OwnProps {
	product: Product
}

export function Product(props: OwnProps) {
	return (
		<span>{props.product.name}</span>
	);
}
