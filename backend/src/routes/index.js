const staticRoutes = require('./static');
const apiRoutes = require('./api');

module.exports = [].concat(staticRoutes, apiRoutes);
