import * as React from 'react';
import { css } from 'emotion';

import { ProductSelectorColumn } from 'containers/ProductSelectorColumn';
import { ProductionBlockColumn } from 'containers/ProductionBlockColumn';
import { RecipeRequirementsColumn } from 'containers/RecipeRequirementsColumn';
import { md } from 'styles/breakpoints';

const mainContainerStyles = css`
	display: flex;
	flex: 1;
	flex-wrap: wrap;

	& .column {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	& .column section {
		flex: 1;
		display: flex;
		flex-direction: column;
		border: 1px solid #EAEAEA;
		height: 100%;
	}

	@media(max-width: ${md}) {
		& .column {
			max-height: 420px;
			min-height: 240px;
		}
	}
`;

interface OwnProps {
	//
}

export function Body(props: OwnProps) {
	return (
		<main className={mainContainerStyles}>
			<ProductSelectorColumn />
			<ProductionBlockColumn />
			<RecipeRequirementsColumn />
		</main>
	);
}
