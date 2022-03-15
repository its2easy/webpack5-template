import { merge, mergeWithCustomize, customizeArray, customizeObject } from 'webpack-merge';
import commonConfig from './webpack.common.js';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

let prodConfig = {
    mode: 'production',
    devtool: false, //'source-map'
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
    ],

    module: {
        rules: [
            {
                test:/\.(s*)css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        // importLoaders for .css @import,
                        // 1 to handle by postcss, 2 to postcss and scss (probably wrong)
                        options: { sourceMap: false, url: false, importLoaders: 1, modules: false }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: false,
                            postcssOptions: {
                                plugins: [
                                    [ 'autoprefixer' ],
                                    [ 'cssnano', {preset: ['default', {
                                            svgo: false
                                        }]} ]
                                ],
                            },
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { }
                    }
                ]
            }
        ]
    }
}

let resultConfig = mergeWithCustomize({
    customizeArray: customizeArray({
        'module.rules': 'append'
    }),
    // customizeObject: customizeObject({
    //     entry: 'prepend'
    // })
})(commonConfig, prodConfig);

export default resultConfig;
