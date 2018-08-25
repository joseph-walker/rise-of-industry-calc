import * as React from 'react';
import { css } from 'emotion';

import { ProductionBlock as IProductionBlock } from '../../data/types';

const headerStyles = css`
	display: flex;
	margin-bottom: 8px;

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
	color: #999;
`;

interface OwnProps {
	block: IProductionBlock
}

export function ProductionBlock(props: OwnProps) {
	const toString = (n: number) => n.toString();

	return (
		<>
			<div className={headerStyles}>
				<em>{props.block.product.name}</em>
				<button className={deleteButtonStyles}><i className="fas fa-times"></i></button>
			</div>
			<div className={bodyStyles}>
				<span className={labelStyles}>Output:</span>
				<input
					className={inputStyles}
					value={props.block.requiredRate.rate.map(toString).withDefault('')}
					type="text"
					placeholder="0" />
				<span>Every</span>
				<input
					className={inputStyles}
					value={props.block.requiredRate.days.map(toString).withDefault('')}
					type="text"
					placeholder="0" />
				<span>Days</span>
			</div>
		</>
	);
}
