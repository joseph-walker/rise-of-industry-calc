const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const frontendDirectory = path.join(__dirname, './../frontend/src/');
const backendDirectory = path.join(__dirname, './../backend/');
const publicPath = path.join(backendDirectory, '/public/dist/');

module.exports = {
	mode: 'development',
	entry: path.join(frontendDirectory, 'main.tsx'),
	output: {
		path: publicPath,
		filename: 'bundle.js',
		publicPath: '/dist/'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'ts-loader' }
		]
	}
}
