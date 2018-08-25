import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ProductionBlockColumn as ProductionBlockColumnComponent } from '../components/columns/ProductionBlockColumn';
import { ReduxState } from '../state/store';
import { ProductsAction } from '../state/modules/products/reducer';
import { toggleSelectedProduct } from '../state/modules/products/actions/toggleSelected';
import { Product } from '../data/types';

function mapStateToProps(state: ReduxState) {
	return {
		productBlocks: state.products.productBlocks
	};
}

function mapDispatchToProps(dispatch: Dispatch<ProductsAction>) {
	return {
		onRemoveProduct: (p: Product) => dispatch(toggleSelectedProduct(p))
	};
}

export const ProductionBlockColumn = connect(mapStateToProps, mapDispatchToProps)(ProductionBlockColumnComponent);
