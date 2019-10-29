
import * as React from 'react';
import { css } from 'emotion';

import { Header } from 'components/Layout/Header';
import { Footer } from 'containers/Footer';
import { ProductSelectorColumn } from 'containers/ProductSelectorColumn';
import { ProductionBlockColumn } from 'containers/ProductionBlockColumn';
import { RecipeRequirementsColumn } from 'containers/RecipeRequirementsColumn';
import { sm, md } from 'styles/breakpoints';

const appStyles = css`
	background-color: #FFF;
	border-radius: 8px;
	height: 100%;
	box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.05);
	padding: 24px;
	max-width: 1200px;
	margin: auto;

	display: grid;
	grid-template-columns: 1fr 1fr 2fr;
	grid-template-rows: auto 1fr auto;
	grid-template-areas:
	"h h h"
	"a b c"
	"f f f";

	@media(max-width: ${md}) {
		grid-template-columns: 1fr;
		grid-template-rows: auto repeat(2, 1fr) auto;
		grid-template-areas:
		"h h"
		"a b"
		"c c"
		"f f";
	}

	@media(max-width: ${sm}) {
		grid-template-columns: 1fr;
		grid-template-rows: auto repeat(3, 1fr) auto;
		grid-template-areas:
		"h"
		"a"
		"b"
		"c"
		"f";
	}

	& .column {
		display: flex;
		flex-direction: column;
	}

	& .column section {
		overflow-y: scroll;
		flex: 1 1 350px;
		border: 1px solid #EAEAEA;
		display: flex;
		flex-direction: column;
	}
`;

interface OwnProps {
	//
}

export function App(props: OwnProps) {
	return (
		<section className={appStyles}>
			<Header />
			<ProductSelectorColumn />
			<ProductionBlockColumn />
			<RecipeRequirementsColumn />
			<Footer />
		</section>
	);
}
