const home = {
	method: 'GET',
	path: '/',
	handler: async function(_, h) {
		return h.file('index.html');
	}
};

module.exports = [
	home
];
