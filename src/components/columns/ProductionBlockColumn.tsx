import * as React from 'react';
import { css } from 'emotion';

const productionBlockColumnStyles = css`
	flex: 1;
`;

interface OwnProps {
	//
}

export function ProductionBlockColumn(props: OwnProps) {
	return (
		<div className={`column ${productionBlockColumnStyles}`}>
			<h2>Production Block</h2>
			<section></section>
		</div>
	);
}
