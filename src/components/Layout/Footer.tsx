import * as React from 'react';
import { css } from 'emotion';

import { ButtonStyle, Button } from 'components/widgets/Button';
import { md } from 'styles/breakpoints';

const footerStyles = css`
	display: flex;
	justify-content: flex-end;
	margin-top: 24px;

	@media(max-width: ${md}) {
		justify-content: center;
	}

	& > button {
		margin-left: 6px;
	}

	& > button:first-child {
		margin-left: 0;
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
