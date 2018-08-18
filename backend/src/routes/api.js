const getRates = {
	method: 'GET',
	path: '/api/rates',
	handler: async function(_, h) {
		return h.file('api/roiRates.json');
	}
};

module.exports = [
	getRates
];
