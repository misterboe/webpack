const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    stats: 'none',
    entry: ['./Assets/Sass/style.scss', './Assets/JavaScripts/main.js'],
    output: {
        path: path.resolve(__dirname, '../Dist'),
        filename: 'main.js',
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()]
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            autoprefixer: {
                                browsers: ["> 5%"]
                            },
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer'),
                                require('cssnano')
                            ],
                        }
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'Fonts/'
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    outputPath: 'Images/'
                }
            }
        ]
    },
    plugins: [
        new StyleLintPlugin({
            configFile: ".stylelintrc",
            emitErrors: false,
            syntax: 'scss',
            files: '**/*.scss',
            failOnError: false,
            quiet: false,
        }),
        new WebpackBar({
            clear: false,
            profile: true,
        }),
        new FriendlyErrorsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new UglifyJsPlugin({
            extractComments: true
        }),
        new CleanWebpackPlugin(['Dist'], {
            verbose: false,
        })
    ],
};
