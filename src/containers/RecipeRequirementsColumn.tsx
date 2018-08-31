import { divide } from 'ramda';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RecipeRequirementsColumn as RecipeRequirementsColumnComponent } from 'components/columns/RecipeRequirementsColumn';
import { ReduxState } from 'state/store';
import { ProductsAction } from 'state/modules/products/reducer';
import { getRecipe } from 'data/getRecipe';
import { OutputRequirements, Rate, RecipeRequirements } from 'data/types';
import { Maybe } from 'util/Maybe';
import { sequenceA, liftA2 } from 'util/Algebra';
import { solveRecipe } from 'data/solveRecipe';
import { List } from 'util/List';

function parseNumber(str: string): Maybe<number> {
	const parsed = parseFloat(str);

	return isNaN(parsed) || parsed === 0
		? Maybe.Nothing()
		: Maybe.Just(parsed);
}

function getRequiredRate(requirements: OutputRequirements): Maybe<Rate> {
	return liftA2(divide, requirements.rate.chain(parseNumber), requirements.days.chain(parseNumber)) as Maybe<number>;
}

function mapStateToProps(state: ReduxState) {
	const { productChunks: chunkResponse, productBlocks: blocks } = state.products;
	const emptyProductRequirements: [string, number][] = [];

	const f = chunkResponse.map(function(chunks) {
		const solvedBlocks = blocks.map(function(block) {
			const requiredRate = getRequiredRate(block.requiredRate);
			const recipe = getRecipe(chunks, block.product.name);

			return requiredRate.map(function(rate) {
				return solveRecipe(chunks, rate, recipe);
			});
		});

		return sequenceA(Maybe.pure, List.fromArray(solvedBlocks)) as Maybe<List<RecipeRequirements>>;
	});

	return {
		productRequirements: emptyProductRequirements
	};
}

function mapDispatchToProps(dispatch: Dispatch<ProductsAction>) {
	return {

	};
}

export const RecipeRequirementsColumn = connect(mapStateToProps, mapDispatchToProps)(RecipeRequirementsColumnComponent);
