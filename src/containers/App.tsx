import * as React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { ReduxState } from '../state/store';
import { getProducts } from '../data/getProducts';
import { Product as IProduct } from '../data/types';
import { Response } from '../util/Response';

import { Product } from '../components/Product';

const appStyles = css`
	color: red;
`;

interface OwnProps {
	//
}

interface ReduxProps {
	//
}

interface DispatchProps {
	productsList: Response<IProduct[], string>
}

function mapStateToProps(state: ReduxState, ownProps: OwnProps) {
	return {
		productsList: state.products.productChunks.map(getProducts)
	};
}

class AppComponent extends React.Component<OwnProps & ReduxProps & DispatchProps> {
	render() {
		const productsList = this.props.productsList.with({
			loading: function() {
				return (
					<p>Loading...</p>
				);
			},
			ready: function(products: IProduct[]) {
				const productComponents = products.map(function(product) {
					return (
						<Product product={product} />
					);
				});

				return (
					<div>{productComponents}</div>
				);
			},
			error: function(err: string) {
				return (
					<p>Something went wrong: {err}</p>
				);
			}
		});

		return (
			<section className={appStyles}>{productsList}</section>
		);
	}
}

export const App = connect(mapStateToProps)(AppComponent);
