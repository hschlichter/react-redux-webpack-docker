const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

if (!process.env.NODE_ENV) {
	throw new Error('Envionrment variable NODE_ENV not defined. Look in README for howto');
}

const base = {
	context: __dirname,
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.js$/,
				loader: "eslint-loader",
				exclude: /node_modules/
			},
			{
				test: /\.[s]?css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
			},
			{
				test: /\.woff[2]?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&minetype=application/font-woff'
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader'
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			chunks: ['vendor.bundle.js']
		}),
		new ExtractTextPlugin('[name].bundle.css'),
		new webpack.DefinePlugin({
			__DEV__: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
			__TEST__: !process.env.NODE_ENV || process.env.NODE_ENV === 'testing',
			__STAGING__: !process.env.NODE_ENV || process.env.NODE_ENV === 'staging',
			__PROD__: !process.env.NODE_ENV || process.env.NODE_ENV === 'production'
		}),
		new webpack.ProvidePlugin({
		})
	],
	sassLoader: {
		includePaths: [
			'node_modules/foundation-sites/scss',
			'node_modules/normalize.scss',
			'src/components'
		]
	}
};

module.exports = [
	Object.assign({
		entry: {
			server: [
				'./src/client.js',
				'./src/styles/main.scss'
			]
		}
	}, base),
	Object.assign({
		entry: {
			client: [
				'./src/client.js',
				'./src/styles/main.scss'
			],
			vendor: [
				'react',
				'react-dom',
				'react-router',
				'redux',
				'react-redux'
			]
		}
	}, base)
];

