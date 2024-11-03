const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    entry: {
        main: './src/scripts/index.js',
        math: {
            import: './src/scripts/math.js',
            filename: 'script/[name].tes.js'
        },
    },

    output: {
        filename: 'script/[name].vv.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'images/[name].[hash][ext]'
    },

    mode: 'production',

    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[hash][ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['main'],
            inject: 'body',
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/index.html',
            chunks: ['math'],
            inject: 'body',
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
        })
    ],
    // 优化配置
    optimization: {
        // 无须dependOn配置 自动共享代码分割
        splitChunks: {
            chunks: 'all',
            name: 'shared',
            filename: 'script/[name].js',
        }
    }
}
