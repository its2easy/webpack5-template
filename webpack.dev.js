import { merge, mergeWithCustomize, customizeArray, customizeObject } from 'webpack-merge';
import commonConfig from './webpack.common.js';

let devConfig = {
    mode: 'development',
    stats: {
        modules: false
    },
    // eval- doesn't work with mini-css-extract-plugin
    devtool: 'cheap-module-source-map', // eval-source-map, cheap-module-source-map,

    module: {
        rules: [
            // Styles: Inject CSS into the head with source maps
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, importLoaders: 1, modules: false },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                //fiber: fibers,//passed by default https://github.com/webpack-contrib/sass-loader#string
                            },
                        }
                    }
                ],
            },
        ],
    },
}

let resultConfig = mergeWithCustomize({
    customizeArray: customizeArray({
        'module.rules': 'append',
        'plugins': 'append',
    }),
})(commonConfig, devConfig);

export default resultConfig;
