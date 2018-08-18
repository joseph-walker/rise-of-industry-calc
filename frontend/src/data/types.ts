export type Rate = number

export interface Product {
	name: string,
	outputRate: Rate
}

export interface Recipe {
	name: string,
	requireRate: Rate,
	components: Recipe[]
}

export interface Chunk {
	[name: string]: {
		name: string,
		unitRate: Rate,
		components: [{
			name: string,
			unitRate: Rate
		}]
	}
}
