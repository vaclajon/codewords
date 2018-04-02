'use strict';

let path = require('path');

let HtmlWebpackPlugin = require('html-webpack-plugin');
let HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
let NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
let NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');
let DefinePlugin = require('webpack/lib/DefinePlugin');

const PORT = process.env.npm_package_config_port || 3001;
const ABSOLUTE_BASE = path.normalize(path.join(__dirname,'..'));
const ADDRESS = 'localhost' /*"10.2.105.219"*/ ;

module.exports = {
	devtool: 'eval',
	entry: [
		// necessary polyfills
		'core-js/es6/object.js',
		'core-js/es6/promise.js',
		'core-js/es6/function.js',
		'core-js/es6/string.js',

		'react-hot-loader/patch',
		`webpack-dev-server/client?http://${ADDRESS}:${PORT}`,
		'webpack/hot/only-dev-server',

		path.join(ABSOLUTE_BASE, 'client/index.js')

	],
	output: {
		path: path.join(ABSOLUTE_BASE, '/client/'),
		filename: 'index.js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(js)?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {

					// This is a feature of `babel-loader` for webpack (not Babel itself).
					// It enables caching results in ./node_modules/.cache/babel-loader/
					// directory for faster rebuilds.
					cacheDirectory: true,
					plugins: [
						'react-hot-loader/babel'
					]
				}
			},
			{
				test: /\.json?$/,
				loader: 'json-loader'
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader&name=images/[name].[ext]',
						options: {
							limit: 8192
						}
					}
				]
			},
			{
				test: /\.html$/,
				loader: "raw-loader"
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						query: { modules: false, sourceMap: true }
					},
					{
						loader: 'sass-loader',
						query: { sourceMap: true }
					}
				]
			}
		]
	},
	plugins: [
		new NamedModulesPlugin(),
		new HotModuleReplacementPlugin(),
		new NoEmitOnErrorsPlugin(),

		new HtmlWebpackPlugin({
			template: 'client/index.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})

	],
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devServer: {
		host: ADDRESS,
		port: PORT,

		// respond to 404s with index.html
		historyApiFallback: true,
		// enable HMR on the server
		hot: true
	}
};
