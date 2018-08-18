'use strict';

const Hapi = require('hapi');
const Webpack = require('webpack');
const Dashboard = require('webpack-dashboard/plugin');
const Inert = require('inert');
const path = require('path');
const devMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./../../webpack/webpack.config');
const routes = require('./routes');

const compiler = Webpack(webpackConfig);

const host = 'localhost';
const port = '8080';

compiler.apply(new Dashboard());

const devMiddlewareInstance = devMiddleware(compiler, {
	host,
	port,
	historyApiFallback: true,
	publicPath: webpackConfig.output.publicPath,
	quiet: true
});

const server = Hapi.server({
	host: 'localhost',
	port: '8080',
	routes: {
		files: {
			relativeTo: path.join(__dirname, './../public/')
		}
	}
});

server.ext('onRequest', function(request, reply) {
	return devMiddlewareInstance(request.raw.req, request.raw.res, function(err) {
		if (err) {
			return reply(err);
		}

		return reply.continue;
	});
});

server.route(routes);

async function start() {
	try {
		await server.register(Inert);
		await server.start();
	}
	catch (err) {
		console.log(err);
		process.exit(1);
	}

	console.log('Server running at: ', server.info.uri);
}

start();
