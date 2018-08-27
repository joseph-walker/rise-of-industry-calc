const path = require('path');

function srcPath(subdir) {
    return path.join(__dirname, 'src', subdir);
}

module.exports = {
	mode: 'development',
	entry: './src/main.tsx',
    devtool: 'inline-source-map',
	devServer: {
		contentBase: './',
		publicPath: '/dist/',
		index: 'index.html',
		historyApiFallback: true
	},
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
