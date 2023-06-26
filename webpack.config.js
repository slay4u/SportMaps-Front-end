const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx', module: {
        rules: [{
            test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/,
        }, {
            test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader',
        }, {
            test: /\.css?$/, use: ['style-loader', 'css-loader'],
        }],
    }, resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    }, output: {
        filename: '[name].bundle.js', path: path.resolve(__dirname, './dist'),
    }, plugins: [new HtmlWebpackPlugin({
        title: 'webpack html plugin', template: path.resolve(__dirname, './public/index.html'),
        filename: 'indexBuild.html',
    }),]
};
