import { Maybe } from "../util/Maybe";

export type Rate = number

export interface Product {
	name: string,
	outputRate: Rate
}

export interface OutputRequirements {
	rate: Maybe<string>,
	days: Maybe<string>
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

export interface Chunks {
	[name: string]: {
		name: string,
		unitRate: Rate,
		components: [{
			name: string,
			unitRate: Rate
		}]
	}
}
