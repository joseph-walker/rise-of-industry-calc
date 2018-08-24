import * as React from 'react';
import { css } from 'emotion';

const recipeRequirementsColumnStyles = css`
	flex: 2;
`;

interface OwnProps {
	//
}

export function RecipeRequirementsColumn(props: OwnProps) {
	return (
		<div className={`column ${recipeRequirementsColumnStyles}`}>
			<h2>Factory Requirements</h2>
			<section></section>
		</div>
	);
}
