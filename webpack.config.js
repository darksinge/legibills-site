/**
* `webpack.config.js`
* --------------------------
* config file for webpack module bundler
*/

var path = require('path');
var appRoot = path.resolve('./');

module.exports = {
    entry: appRoot + '/assets/app/app-entry.js',
    output: { path: appRoot + './.tmp/public/app', filename: 'bundle.js'},
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['es2015', 'react']
            }
        }]
    }
}