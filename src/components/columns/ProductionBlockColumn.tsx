import * as React from 'react';
import { css } from 'emotion';

import { ProductionBlock as IProductionBlock } from '../../data/types';
import { ProductionBlock } from '../widgets/ProductionBlock';

const productionBlockColumnStyles = css`
	flex: 1;
`;

const productBlockStyles = css`
	overflow-y: scroll;
	height: 100%;

	& li {
		display: block;
		padding: 12px;
		margin: 3px 3px 0 3px;
		background-color: #f7f7f7;
		border: 1px solid #F5F5F5;
	}
`;

interface OwnProps {
	productBlocks: IProductionBlock[]
}

export function ProductionBlockColumn(props: OwnProps) {
	const columnContents = props.productBlocks.length
		? (
			<ul className={productBlockStyles}>
				{props.productBlocks.map(b => <li><ProductionBlock block={b} /></li>)}
			</ul>
		)
		: <span>Nothing</span>;

	return (
		<div className={`column ${productionBlockColumnStyles}`}>
			<h2>Production Block</h2>
			<section>
				{columnContents}
			</section>
		</div>
	);
}
