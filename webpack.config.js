const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const pages = require('./webpack/webpack.page');

module.exports = {
    //webpack에 내장된 최적화 기능을 사용할 수 있습니다.
    mode:'development',
    devtool: "source-map",
    //webpack이 번들링을 시작
    entry:{
        css: ['./src/scss/style.scss'],
        index: ['./src/js/index.js']
    },
    output:{
        path:path.resolve(__dirname, 'dist/'),
        filename:'./assets/js/[name].bundle.js',
        sourceMapFilename: '[file].map'
    },
    module: {
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options:{
                        sourceMap: true,
                        presets:[
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    shippedProposals: true,
                                    corejs: 3,
                                    targets: {
                                        browsers: ['last 2 versions', 'ie >= 11']
                                    }
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "assets/css/[name].css"
                        }
                    },
                    {
                        loader: "extract-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url : false,
                            sourceMap: true,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap:true
                        }
                    }
                ]
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'compiled/fonts/[hash][ext][query]'
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                }
            })
        ],
    },
    devServer: {
        host : '0.0.0.0',
        static: {
            publicPath: '/',
            directory: path.join(__dirname, 'dist'),
            watch: true,
        },
        hot: true,
        compress: true,
        port: 9999,
        open : true 
      },
    plugins:pages
};
