import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Footer as FooterComponent } from 'components/layout/Footer';
import { ReduxState } from 'state/store';
import { ProductsAction } from 'state/modules/products/reducer';
import { removeAllSelectedProducts } from 'state/modules/products/actions/removeAllSelected';

function mapStateToProps(state: ReduxState) {
	return {
		numSelectedProducts: state.products.productBlocks.length
	};
}

function mapDispatchToProps(dispatch: Dispatch<ProductsAction>) {
	return {
		onRemoveAllProducts: () => dispatch(removeAllSelectedProducts())
	};
}

export const Footer = connect(mapStateToProps, mapDispatchToProps)(FooterComponent);
