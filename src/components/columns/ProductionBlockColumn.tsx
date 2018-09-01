import * as React from 'react';
import { css } from 'emotion';
import { Lens, lensIndex } from 'ramda';

import { ProductionBlock as IProductionBlock, Product } from 'data/types';
import { ProductionBlock } from 'components/widgets/ProductionBlock';
import { FullSizeNotification, NotificationType } from 'components/widgets/FullSizeNotification';

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
	productBlocks: IProductionBlock[],
	onRemoveProduct: (p: Product) => void,
	onUpdateBlockValue: (i: Lens) => (v: Lens, s: string) => void
}

export function ProductionBlockColumn(props: OwnProps) {
	function renderBlock(b: IProductionBlock, i: number) {
		return (
			<li>
				<ProductionBlock
					onRemoveProduct={props.onRemoveProduct}
					onUpdateBlockValue={props.onUpdateBlockValue(lensIndex(i))}
					block={b} />
			</li>
		);
	}

	const columnContents = props.productBlocks.length
		? (
			<ul className={productBlockStyles}>
				{props.productBlocks.map(renderBlock)}
			</ul>
		)
		: <FullSizeNotification
			type={NotificationType.notification}
			message="Select some products on the left to create a production block..." />;

	return (
		<div className={`column ${productionBlockColumnStyles}`}>
			<h2>Production Block</h2>
			<section>
				{columnContents}
			</section>
		</div>
	);
}
