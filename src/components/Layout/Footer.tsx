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
	numSelectedProducts: number,
	onRemoveAllProducts: () => void
}

export function Footer(props: OwnProps) {
	return (
		<footer className={footerStyles}>
			<Button
				buttonStyle={ButtonStyle.danger}
				disabled={props.numSelectedProducts == 0}
				content={`Clear Selected Products`}
				onClick={props.onRemoveAllProducts} />
		</footer>
	);
}
