import { merge, mergeWithCustomize, customizeArray, customizeObject } from 'webpack-merge';
import commonConfig from './webpack.common.js';

let devConfig = {
    mode: 'development',
    stats: {
        modules: false
    },
    // eval- doesn't work with mini-css-extract-plugin
    devtool: 'cheap-module-source-map', // eval-source-map, cheap-module-source-map,
    devServer: {
        historyApiFallback: true,
        open: true,
        hot: true,
        port: 8080,
        client: {
            overlay: true,
        },
        // static: { // This is only necessary if you want to serve static files.
        //     directory: path.resolve(__dirname, "./dist/"),
        // },
        watchFiles: ["src/*.html"],
    },
    watchOptions: {
        ignored: /node_modules/,
    },

    module: {
        rules: [
            // Styles: Inject CSS into the head with source maps
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true, importLoaders: 1, modules: false,
                            url: {
                                filter: (url, _resourcePath) => {
                                    // Disable processing for root-relative urls under /static
                                    //https://stackoverflow.com/questions/71254243/webpack-5-stop-webpack-from-processing-root-relative-paths-to-images-in-scss
                                    return !/^\/static\//.test(url)
                                },
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true, }
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
