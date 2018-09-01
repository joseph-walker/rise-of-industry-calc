import { divide, flatten, mergeWith, add, compose, reduce } from 'ramda';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RecipeRequirementsColumn as RecipeRequirementsColumnComponent } from 'components/columns/RecipeRequirementsColumn';
import { ReduxState } from 'state/store';
import { ProductsAction } from 'state/modules/products/reducer';
import { getRecipe } from 'data/getRecipe';
import { OutputRequirements, Rate, RequirementTuple, NotificationMessage } from 'data/types';
import { flattenRecipeRequirements } from 'data/flattenRecipeRequirements';
import { Either } from 'util/Either';
import { sequenceA, liftA2 } from 'util/Algebra';
import { solveRecipe } from 'data/solveRecipe';
import { List } from 'util/List';
import { NotificationType } from 'components/widgets/FullSizeNotification';

// Return either a number or an error string
function parseNumber(str: string): Either<string, number> {
	const parsed = parseFloat(str);

	return isNaN(parsed) || parsed === 0
		? Either.Left('must be a number greater than zero')
		: Either.Right(parsed);
}

// Gets either the required rate, or an error message with what component of the
// output block is incorrect
function getRequiredRate({ rate, days }: OutputRequirements): Either<string, Rate> {
	return liftA2(
		divide,
		parseNumber(rate).mapError(e => `Output per day ${e}`),
		parseNumber(days).mapError(e => `Days ${e}`)
	) as Either<string, number>;
}

function mapStateToProps(state: ReduxState) {
	const flattenRequirements = compose(reduce(mergeWith(add), {}), flatten);

	const {
		productChunks: chunkResponse,
		productBlocks: blocks
	} = state.products;

	const solvedRecipeRequirements = chunkResponse.map(function(chunks) {
		try {
			const solvedBlocks = blocks.map(function(block) {
				const requiredRate = getRequiredRate(block.requiredRate)
					.mapError(e => `${block.product.name} has invalid inputs: ${e}`)
					.mapError(m => ({ message: m, type: NotificationType.notification } as NotificationMessage));

				const recipe = getRecipe(chunks, block.product.name); // Can throw

				return requiredRate.map(function(rate) {
					return flattenRecipeRequirements(solveRecipe(chunks, rate, recipe)); // Can throw
				});
			});

			const resolvedRequirements = sequenceA(
				Either.pure,
				List.fromArray(solvedBlocks)
			).map(l => l.toArray()) as Either<NotificationMessage, RequirementTuple[][]>;

			return resolvedRequirements.map(flattenRequirements) as Either<NotificationMessage, RequirementTuple>;
		}
		catch (err) {
			return Either.Left({
				message: err.message,
				type: NotificationType.error
			}) as Either<NotificationMessage, RequirementTuple>;
		}
	});

	return {
		recipeRequirements: solvedRecipeRequirements
	};
}

function mapDispatchToProps(dispatch: Dispatch<ProductsAction>) {
	return {
		//
	};
}

export const RecipeRequirementsColumn = connect(mapStateToProps, mapDispatchToProps)(RecipeRequirementsColumnComponent);
