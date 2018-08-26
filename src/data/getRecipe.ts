import { Rate, Chunks, Recipe } from "data/types";
import { Maybe } from 'util/Maybe';

export function getRecipe(chunks: Chunks, requiredRate: Rate, productName: string): Maybe<Recipe> {
	const extractChunkByName = (c: { name: string }) => extractChunk(c.name);

	function extractChunk(n: string): Recipe {
		if (chunks[n] === undefined)
			throw new Error('Name not found');

		const componentChunk = chunks[n];

		return {
			name: componentChunk.name,
			requiredRate: componentChunk.unitRate,
			components: componentChunk.components.map(extractChunkByName)
		};
	}

	if (chunks[productName] === undefined)
		return Maybe.Nothing();

	try {
		const chunk = chunks[productName];
		const recipe = {
			name: chunk.name,
			requiredRate,
			components: chunk.components.map(extractChunkByName)
		};

		return Maybe.Just(recipe);
	}
	catch (err) {
		return Maybe.Nothing();
	}
}
