const TCMPlugin = require('./TCMPlugin.js');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const frontendDirectory = path.join(__dirname, './../frontend/src/');

module.exports = {
	mode: 'development',
	plugins: [
		new MiniCSSExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new TCMPlugin({
			srcDirectory: frontendDirectory
		})
	],
	entry: path.join(frontendDirectory, 'main.tsx'),
	output: {
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				include: frontendDirectory,
				use: [
					{ loader: MiniCSSExtractPlugin.loader },
					{
						loader: 'css-loader',
						options: {
							modules: true,
							camelCase: true,
							localIdentName: '[folder]:[name]_[local]--[hash:base64:5]'
						}
					}
				]
			},
			{ test: /\.tsx?$/, loader: 'ts-loader' }
		]
	}
}
