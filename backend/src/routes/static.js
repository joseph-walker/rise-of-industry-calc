const home = {
	method: 'GET',
	path: '/',
	handler: async function(_, h) {
		return h.file('public/index.html');
	}
};

module.exports = [
	home
];
