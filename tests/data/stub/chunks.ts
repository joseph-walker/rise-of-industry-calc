import { Chunks, Rate } from 'data/types';

export const testChunks: Chunks = {
	'Water': {
        name: 'Water',
        unitRate: 0.1,
        components: []
	},
	'Wheat': {
        name: 'Wheat',
        unitRate: 0.1,
        components: [
            {
                name: 'Water',
                unitRate: 0.05
            }
        ]
	},
	'Beef': {
        name: 'Beef',
        unitRate: 0.02,
        components: [
            {
                name: 'Water',
                unitRate: 0.04
            },
            {
                name: 'Wheat',
                unitRate: 0.04
            }
        ]
    }
};
