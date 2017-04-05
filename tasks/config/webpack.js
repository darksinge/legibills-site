/**
* `webpack`
*
* ---------------------------------------------------------------
*/

var path = require('path');
var appRoot = path.resolve('./');

module.exports = function(grunt) {
    
    grunt.config.set('webpack', {
        dev: {
            entry: appRoot + '/assets/app/app-entry.js',
            output: { path: appRoot + '/.tmp/public/app', filename: 'bundle.js'},
            module: {
                loaders: [{
                    loader: 'babel-loader',
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    options: {"presets": ['es2015', 'react']}
                }]
            },
            watch: process.env.NODE_ENV === 'development',
            keepalive: true
        }
    });
    
    grunt.loadNpmTasks('grunt-webpack');
};
