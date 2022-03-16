//todo add eslint

// Based on
// https://github.com/WeAreAthlon/frontend-webpack-boilerplate
// https://github.com/taniarascia/webpack-boilerplate
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import WebpackBar from 'webpackbar';
//import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';

// Path resolve
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;

// const templateFiles = fs.readdirSync("") // for multiple html files
//     .filter((file) => path.extname(file).toLowerCase() === '.html');

const webpackConfig = {
    entry: {
        main: path.resolve(root, "src/js/index.js"),
    },
    output: {
        path: path.resolve(root, "dist"),
        filename: 'js/[name].[contenthash].js',
        assetModuleFilename: 'assets/[hash:10][ext][query]',
    },
    plugins: [
        //new BundleAnalyzerPlugin.BundleAnalyzerPlugin(),
        new WebpackBar({
            profile: true, // doesn't work?
        }),
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({ // https://github.com/jantimon/html-webpack-plugin#options
            template: path.resolve(root, "src/index.html"), // template file
            filename: 'index.html', // output file
            minify: false
        }),
        new CopyWebpackPlugin({ // Copy "static" folder
            patterns: [
                {
                    from: path.resolve(root, 'src', 'static'),
                    to: path.resolve(root, 'dist', 'static'),
                    globOptions: {
                        ignore: ['*.DS_Store', 'Thumbs.db'],
                    },
                },
            ],
        }),
    ],
    module: {
        rules: [
            {  // JS
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            { // FONTS
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name]-[contenthash:10][ext][query]'
                }
            },
            { // IMAGES
                test: /\.(png|gif|jpe?g|svg|wepb)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name].[contenthash:10][ext][query]',
                },
            },
            { // HTML IMPORTS
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    minimize: false,
                    sources: {
                        list: ["...",],
                        urlFilter: (attribute, value, resourcePath) => { // Ignore "static" folder
                            if (/^\/?static\//.test(value)) {
                                return false;
                            }
                            return true;
                        },
                    },
                },
            },
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(root, 'src'),
        },
    },
}
export default webpackConfig;
