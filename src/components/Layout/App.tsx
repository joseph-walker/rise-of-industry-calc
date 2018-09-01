
import * as React from 'react';
import { css } from 'emotion';

import { Header } from 'components/Layout/Header';
import { Body } from 'components/layout/Body';
import { Footer } from 'containers/Footer';

const appStyles = css`
	display: flex;
	flex-direction: column;
	background-color: #FFF;
	border-radius: 8px;
	height: 100%;
	box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.05);
	padding: 24px;
	max-width: 1200px;
	margin: auto;
`;

interface OwnProps {
	//
}

export function App(props: OwnProps) {
	return (
		<section className={appStyles}>
			<Header />
			<Body />
			<Footer />
		</section>
	);
}
