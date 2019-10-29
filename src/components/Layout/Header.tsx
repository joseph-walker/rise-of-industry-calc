import * as React from 'react';
import { css } from 'emotion';
import { sm } from 'styles/breakpoints';

const headerContainerStyles = css`
	grid-area: h;
`;

const titleStyles = css`
	margin-bottom: 12px;
	font-size: 20px;

	&:before {
		content: 'Rise of Industry';
	}

	@media(max-width: ${sm}) {
		&:before {
			content: 'RoI';
		}
	}
`;

interface OwnProps {
	//
}

export function Header(props: OwnProps) {
	return (
		<header className={headerContainerStyles}>
			<h1 className={titleStyles}> - Production Calculator</h1>
		</header>
	);
}
