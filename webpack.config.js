/**
* `webpack.config.js`
* --------------------------
* config file for webpack module bundler
*/

const { resolve, join } = require('path');
const webpack = require('webpack');

var cache = {};

module.exports = {
        entry: resolve(__dirname, 'assets/src/index.jsx'),
        context: __dirname,
        output: {
            path: resolve(__dirname, './assets/js/build'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                { 
                    test: /\.jsx?$/, 
                    loader: 'babel-loader',
                    exclude: /node_modules/
                }
            ]
        },
        watch: true,
        cache: cache,
        stats: "errors-only"
};