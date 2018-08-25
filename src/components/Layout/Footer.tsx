import * as React from 'react';
import { css } from 'emotion';

import { ButtonStyle, Button } from '../widgets/Button';

const footerStyles = css`
	display: flex;
	justify-content: flex-end;
	margin-top: 24px;

	& > button {
		margin-left: 6px;
	}
`;

interface OwnProps {
	//
}

export function Footer(props: OwnProps) {
	const noOp = () => {};

	return (
		<footer className={footerStyles}>
			<Button buttonStyle={ButtonStyle.danger} content="Clear All Selected Products" onClick={noOp} />
			<Button buttonStyle={ButtonStyle.default} content="Copy Link to Factory" onClick={noOp} />
		</footer>
	);
}
