import * as React from 'react';
import { css } from 'emotion';

import { ProductSelectorColumn } from '../../containers/ProductSelectorColumn';
import { ProductionBlockColumn } from '../../containers/ProductionBlockColumn';
import { RecipeRequirementsColumn } from '../columns/RecipeRequirementsColumn';

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

	& .column section {
		flex: 1;
		display: flex;
		flex-direction: column;
		border: 1px solid #EAEAEA;
		height: 100%;
	}
`;

interface OwnProps {
	//
}

export function Main(props: OwnProps) {
	return (
		<main className={mainContainerStyles}>
			<ProductSelectorColumn />
			<ProductionBlockColumn />
			<RecipeRequirementsColumn />
		</main>
	);
}
