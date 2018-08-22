import * as React from 'react';

import { css } from 'emotion';

const appStyles = css`
	color: red;
`;

interface AppProps {

}

export function App(props: AppProps) {
	return (
		<section className={appStyles}>
			<p>Sup</p>
		</section>
	);
}
