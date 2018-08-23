import * as React from 'react';
import { css } from 'emotion';

const headerContainerStyles = css`
	display: flex;
`;

const titleStyles = css`
	margin-bottom: 12px;
	font-size: 20px;
`;

interface OwnProps {
	//
}

export function Header(props: OwnProps) {
	return (
		<header className={headerContainerStyles}>
			<h1 className={titleStyles}>Rise of Industry - Production Calculator</h1>
		</header>
	);
}
