const getRates = {
	method: 'GET',
	path: '/api/rates',
	handler: async function(_, h) {
		return h.file('data/roiRates.json');
	}
};

module.exports = [
	getRates
];
