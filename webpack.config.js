const path = require("path");
const glob = require("globby");
const { BannerPlugin } = require("webpack");

/** @type {import("webpack").Configuration} */
module.exports = {
	entry: [
		"./src/index.tsx",
		...glob.sync(path.posix.join(__dirname.replace(/\\/g, "/"), "./src/hacks/**/*.ts{,x}")),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ["babel-loader", "ts-loader"],
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["postcss-preset-env"],
							},
						},
					},
					"sass-loader",
				],
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			react: "preact/compat",
			"react-dom": "preact/compat",
		},
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	mode: "production",
};
