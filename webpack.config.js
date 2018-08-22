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
		path: '/dist/',
		filename: 'bundle.js'
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
