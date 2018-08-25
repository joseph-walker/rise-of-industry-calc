import * as React from 'react';
import { css } from 'emotion';
import { Lens, lensProp } from 'ramda';

import { ProductionBlock as IProductionBlock, Product } from '../../data/types';

const headerStyles = css`
	display: flex;
	margin-bottom: 8px;
	position: relative;

	& em {
		font-weight: bold;
	}

	& button {
		margin-left: auto;
	}
`;

const bodyStyles = css`
	display: flex;

	& span,
	& input {
		line-height: 28px;
	}
`;

const labelStyles = css`
	margin-right: auto;
`;

const inputStyles = css`
	line-height: 28px;
	width: 42px;
	padding: 0 6px;
	text-align: center;
	margin: 0 6px;
	background-color: #FFF;
	border: 1px solid #eaeaea;
`;

const deleteButtonStyles = css`
	cursor: pointer;
	color: #999;
	transition: color 0.05s ease-in-out;
    position: absolute;
    top: -12px;
    right: -12px;
    line-height: 32px;
    width: 32px;
    text-align: center;

	&:hover {
		color: #f16628;
	}
`;

interface OwnProps {
	block: IProductionBlock,
	onRemoveProduct: (p: Product) => void,
	onUpdateBlockValue: (l: Lens, s: string) => void
}

export function ProductionBlock(props: OwnProps) {
	return (
		<>
			<div className={headerStyles}>
				<em>{props.block.product.name}</em>
				<button
					onClick={() => props.onRemoveProduct(props.block.product)}
					className={deleteButtonStyles}>
					<i className="fas fa-times"></i>
				</button>
			</div>
			<div className={bodyStyles}>
				<span className={labelStyles}>Output:</span>
				<input
					className={inputStyles}
					onChange={(e) => props.onUpdateBlockValue(lensProp('rate'), e.currentTarget.value)}
					value={props.block.requiredRate.rate.withDefault('')}
					type="text"
					placeholder="0" />
				<span>Every</span>
				<input
					className={inputStyles}
					onChange={(e) => props.onUpdateBlockValue(lensProp('days'), e.currentTarget.value)}
					value={props.block.requiredRate.days.withDefault('')}
					type="text"
					placeholder="0" />
				<span>Days</span>
			</div>
		</>
	);
}
