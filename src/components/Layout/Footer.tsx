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
	const noOp = () => {};

	const clearButton = props.numSelectedProducts > 0
		? <Button
			buttonStyle={ButtonStyle.danger}
			content={`Clear ${props.numSelectedProducts} Selected Products`}
			onClick={props.onRemoveAllProducts} />
		: <Button
			buttonStyle={ButtonStyle.danger}
			disabled
			content="Clear Selected Products"
			onClick={noOp} />;

	return (
		<footer className={footerStyles}>
			{clearButton}
		</footer>
	);
}
