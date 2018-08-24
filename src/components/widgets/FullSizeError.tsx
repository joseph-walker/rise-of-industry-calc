import * as React from 'react';
import { css } from 'emotion';

const fullSizeErrorStyles = css`
	display: flex;
	flex-direction: column;
	padding: 12px;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
`;

const alertIconStyle = css`
	font-size: 18px;
	display: block;
	margin-bottom: 6px;
	color: #f16628;
`;

const errorTextStyle = css`
	text-align: center;
`;

interface OwnProps {
	errorMessage: string
}

export function FullSizeError(props: OwnProps) {
	return (
		<div className={fullSizeErrorStyles}>
			<i className={`${alertIconStyle} fas fa-exclamation-triangle`} />
			<p className={errorTextStyle}>{props.errorMessage}</p>
		</div>
	);
}
