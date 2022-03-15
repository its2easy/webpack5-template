import CopyWebpackPlugin from 'copy-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { fileURLToPath } from "url";

//const CopyWebpackPlugin = require('copy-webpack-plugin');
//const HTMLWebpackPlugin = require('html-webpack-plugin');

import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(path.resolve(__dirname, "./dist/"));

const webpackConfig = {
    entry: {
        main: path.join(__dirname, "./src/js/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "./dist/"),
        filename: 'js/[name].[contenthash].js',
    },
    plugins: [
        //new CleanWebpackPlugin(),\
        new HTMLWebpackPlugin({
            template: './src/template.html', // template file
            filename: 'index.html', // output file
            minify: false
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ]
    },
}
export default webpackConfig;
