import * as React from 'react';
import { css } from 'emotion';
import { Lens, lensIndex } from 'ramda';

import { ProductionBlock as IProductionBlock, Product } from 'data/types';
import { ProductionBlock } from 'components/widgets/ProductionBlock';
import { FullSizeNotification, NotificationType } from 'components/widgets/FullSizeNotification';
import { md, sm } from 'styles/breakpoints';

const productionBlockColumnStyles = css`
	flex: 1;
	margin: 0 12px;

	@media(max-width: ${md}) {
		margin-right: 0;
	}

	@media(max-width: ${sm}) {
		flex-basis: 100%;
		margin-left: 0;
		margin-top: 24px;
	}
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

const selectorDirection = css`
	&:before {
		content: 'on the left';
	}

	@media(max-width: ${sm}) {
		&:before {
			content: 'above';
		}
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
			<li key={i}>
				<ProductionBlock
					onRemoveProduct={props.onRemoveProduct}
					onUpdateBlockValue={props.onUpdateBlockValue(lensIndex(i))}
					block={b} />
			</li>
		);
	}

	const test = <>Select some products <span className={selectorDirection}></span> to create a production block...</>;

	const columnContents = props.productBlocks.length
		? (
			<ul className={productBlockStyles}>
				{props.productBlocks.map(renderBlock)}
			</ul>
		)
		: <FullSizeNotification
			type={NotificationType.notification}
			message={test} />
			// message="" />;

	return (
		<div className={`column ${productionBlockColumnStyles}`}>
			<h2>Production Block</h2>
			<section>
				{columnContents}
			</section>
		</div>
	);
}
