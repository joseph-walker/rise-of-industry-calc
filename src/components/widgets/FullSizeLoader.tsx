import * as React from 'react';
import { css } from 'emotion';

const fullSizeLoaderStyles = css`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
`;

const loadingTextStyle = css`
	margin-left: 8px;
`;

const spinnerStyle = css`
	color: #5028f1;
`;

interface OwnProps {
	//
}

export function FullSizeLoader(_: OwnProps) {
	return (
		<div className={fullSizeLoaderStyles}>
			<i className={`${spinnerStyle} fas fa-circle-notch fa-spin`} /><span className={loadingTextStyle}>Loading...</span>
		</div>
	);
}
