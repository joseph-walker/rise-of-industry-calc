const path = require('path');

function srcPath(subdir) {
    return path.join(__dirname, 'src', subdir);
}

const env = process.env.NODE_ENV;

let config = {
	entry: './src/main.tsx',
	output: {
		path: path.join(__dirname, 'dist/'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		alias: {
			components: srcPath('components'),
			containers: srcPath('containers'),
			data: srcPath('data'),
			state: srcPath('state'),
			util: srcPath('util')
		}
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'ts-loader' }
		]
	}
}

if (env == 'development') {
	config = Object.assign({}, config, {
		mode: 'development',
		devtool: 'inline-source-map',
		devServer: {
			contentBase: './',
			publicPath: '/dist/',
			index: 'index.html',
			historyApiFallback: true
		},
	});
}

if (env == 'production') {
	config = Object.assign({}, config, {
		mode: 'production',
	});
}

module.exports = config;
