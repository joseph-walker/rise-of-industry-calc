import { Chunks, Recipe } from "data/types";

export function getRecipe(chunks: Chunks, productName: string): Recipe {
	const extractChunkByName = (c: { name: string }) => extractChunk(c.name);

	function extractChunk(n: string): Recipe {
		if (chunks[n] === undefined)
			throw new Error(`Error in 'getRecipe' -- Tried to extract chunk with name '${n}', but it was not found`);

		const componentChunk = chunks[n];

		return {
			name: componentChunk.name,
			requiredRate: componentChunk.unitRate,
			components: componentChunk.components.map(extractChunkByName)
		};
	}

	return extractChunk(productName);
}
