import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Lens } from 'ramda';

import { ProductionBlockColumn as ProductionBlockColumnComponent } from 'components/columns/ProductionBlockColumn';
import { ReduxState } from 'state/store';
import { ProductsAction } from 'state/modules/products/reducer';
import { toggleSelectedProduct } from 'state/modules/products/actions/toggleSelected';
import { Product } from 'data/types';
import { updateProductionBlockValue } from 'state/modules/products/actions/updateProductionBlock';

function mapStateToProps(state: ReduxState) {
	return {
		productBlocks: state.products.productBlocks
	};
}

function mapDispatchToProps(dispatch: Dispatch<ProductsAction>) {
	return {
		onRemoveProduct: (p: Product) => dispatch(toggleSelectedProduct(p)),
		onUpdateBlockValue: (blockIndex: Lens) => (blockValueProp: Lens, newValue: string) => {
			dispatch(updateProductionBlockValue(blockIndex, blockValueProp, newValue))
		}
	};
}

export const ProductionBlockColumn = connect(mapStateToProps, mapDispatchToProps)(ProductionBlockColumnComponent);
