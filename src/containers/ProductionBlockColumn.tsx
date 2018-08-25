import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ReduxState } from '../state/store';
import { ProductsAction } from '../state/modules/products/reducer';
import { ProductionBlockColumn as ProductionBlockColumnComponent } from '../components/columns/ProductionBlockColumn';

function mapStateToProps(state: ReduxState) {
	return {
		productBlocks: state.products.productBlocks
	};
}

function mapDispatchToProps(dispatch: Dispatch<ProductsAction>) {
	return {
		//
	};
}

export const ProductionBlockColumn = connect(mapStateToProps, mapDispatchToProps)(ProductionBlockColumnComponent);
