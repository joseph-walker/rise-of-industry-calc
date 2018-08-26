import { compose, lensProp, Lens } from 'ramda';

export enum UpdateProductionBlockTypes {
	UpdateProductionBlock = '@@products/UPDATE_PRODUCTION_BLOCK_VALUE'
}

interface UpdateProductionBlock {
	type: UpdateProductionBlockTypes.UpdateProductionBlock,
	blockPath: Lens,
	value: string
}

export type UpdateProductionBlockAction
	= UpdateProductionBlock

export function updateProductionBlockValue(blockIndex: Lens, blockValue: Lens, value: string): UpdateProductionBlock {
	return {
		type: UpdateProductionBlockTypes.UpdateProductionBlock,
		blockPath: compose(blockIndex, lensProp('requiredRate'), blockValue) as Lens,
		value
	};
};
