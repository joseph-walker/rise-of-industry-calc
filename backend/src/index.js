'use strict';

require('dotenv').config();

const Hapi = require('hapi');
const Inert = require('inert');
const path = require('path');
const routes = require('./routes');

const host = 'localhost';
const port = '8080';

const server = Hapi.server({
	host: 'localhost',
	port: '8080',
	routes: {
		files: {
			relativeTo: path.join(__dirname, './../')
		}
	}
});

if (process.env.NODE_ENV === 'development') {
	const Webpack = require('webpack');
	const Dashboard = require('webpack-dashboard/plugin');
	const devMiddleware = require('webpack-dev-middleware');
	const webpackConfig = require('../../webpack/webpack.config');

	const compiler = Webpack(webpackConfig);

	compiler.apply(new Dashboard());

	const devMiddlewareInstance = devMiddleware(compiler, {
		host,
		port,
		historyApiFallback: true,
		publicPath: webpackConfig.output.publicPath,
		quiet: true
	});

	server.ext('onRequest', function(request, reply) {
		return devMiddlewareInstance(request.raw.req, request.raw.res, function(err) {
			if (err) {
				return reply(err);
			}

			return reply.continue;
		});
	});
}

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
