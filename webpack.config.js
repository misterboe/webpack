const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['./Assets/Sass/style.scss', './Assets/JavaScripts/main.js'],
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, 'Dist'),
        filename: 'JavaScripts/main.js',
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer'),
                                require('cssnano')
                            ]
                        }
                    },
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "Css/style.css",
            chunkFilename: "Css/[id].css"
        }),
        new CleanWebpackPlugin(['Dist']),
    ],
};