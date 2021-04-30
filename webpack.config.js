/********************************
 * Webpack config
 ********************************/

/* Import
 ********************************/
const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv").config();
const copyPlugin = require("copy-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const cssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const isDevMode = process.env.NODE_ENV !== "production";

/* Config
 ********************************/
module.exports = {
	mode: isDevMode ? "development" : "production",

	entry: [
		"@babel/polyfill",
		path.resolve(process.env.PATH_SOURCES, "index.js"),
	],

	output: {
		path: path.resolve(process.env.PATH_DESTINATION),
		filename: "bundle.js",
		clean: true,
	},

	watch: isDevMode,

	devtool: isDevMode ? "cheap-source-map" : false,
	stats: {
		children: true, // for css imports
	},

	module: {
		rules: [
			// Javascript
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},

			// CSS
			{
				test: /\.css$/,
				use: [
					miniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							url: false,
							sourceMap: true,
							importLoaders: 1,
						},
					},
					"postcss-loader",
				],
			},
		],
	},

	plugins: [
		// Copy files
		new copyPlugin({
			patterns: [
				{
					context: process.env.PATH_SOURCES,
					from: "**/*",
					globOptions: {
						ignore: ["**/*.css", "**/*.js"],
					},
				},
			],
		}),

		// CSS Extract
		new miniCssExtractPlugin({
			filename: "bundle.css",
		}),
	],

	optimization: {
		minimizer: [new cssMinimizerPlugin()],
	},
};
