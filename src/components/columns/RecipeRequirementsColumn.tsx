import * as React from 'react';
import { css } from 'emotion';

const recipeRequirementsColumnStyles = css`
	flex: 2;
`;

const requirementListStyles = css`
	display: flex;
	flex-direction: column;
`;

const requirementStyles = css`
	position: relative;
	display: flex;
	margin: 3px 3px 0 3px;
	background-color: #f7f7f7;
	border: 1px solid #F5F5F5;
	padding: 12px;
	height: 42px;
	align-items: center;

	& i {
		position: absolute;
		top: -1px;
		right: 0;
		line-height: 42px;
		color: #FFF;
		width: 40px;
		text-align: center;
		display: block;
		background-color: #454ea0;
	}
`;

interface OwnProps {
	productRequirements: [string, number][]
}

export function RecipeRequirementsColumn(props: OwnProps) {
	return (
		<div className={`column ${recipeRequirementsColumnStyles}`}>
			<h2>Factory Requirements</h2>
			<section>
				<ul className={requirementListStyles}>
					<li className={requirementStyles}>
						<em>Beef</em><i>x 7</i>
					</li>
				</ul>
			</section>
		</div>
	);
}
