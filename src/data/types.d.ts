import { Maybe } from "util/Maybe";

export type Rate = number

export interface Product {
	name: string,
	outputRate: Rate
}

export interface OutputRequirements {
	rate: string,
	days: string
}

export interface ProductionBlock {
	product: Product,
	requiredRate: OutputRequirements
}

export interface Recipe {
	name: string,
	requiredRate: Rate,
	components: Recipe[]
}

export interface RecipeRequirements {
	name: string,
	requiredFactories: number,
	components: RecipeRequirements[]
}

export type RequirementTuple = { [k: string]: number };

export interface Chunks {
	[name: string]: {
		name: string,
		unitRate: Rate,
		components: {
			name: string,
			unitRate: Rate
		}[]
	}
}
