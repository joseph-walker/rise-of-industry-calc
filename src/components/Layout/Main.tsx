import * as React from 'react';
import { css } from 'emotion';

import { ProductSelectorColumn } from '../../containers/ProductSelectorColumn';

const mainContainerStyles = css`
	display: flex;
	flex: 1;

	& .column {
		display: flex;
		flex-direction: column;
		margin: 0 12px;
	}

	& .column:first-child {
		margin-left: 0;
	}

	& .column:last-child {
		margin-right: 0;
	}
`;

interface OwnProps {
	//
}

export function Main(props: OwnProps) {
	return (
		<main className={mainContainerStyles}>
			<ProductSelectorColumn />
		</main>
	);
}
