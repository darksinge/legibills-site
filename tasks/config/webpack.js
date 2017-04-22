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
            entry: appRoot + '/assets/app/index.js',
            output: { path: appRoot + '/.tmp/public/app', filename: 'bundle.js'},
            module: {
                loaders: [
                    {
                        loader: 'babel-loader',
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        options: {"presets": ['es2015', 'react']}
                    }
                ]
            },
            watch: true,
            keepalive: true
        },

        prod: {
            entry: './assets/app/index.js',
            output: { path:'./.tmp/public/app', filename: 'bundle.js'},
            module: {
                loaders: [
                    {
                        loader: 'babel-loader',
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        options: {"presets": ['es2015', 'react']}
                    }
                ]
            },

            watch: false
        }
    });
    
    grunt.loadNpmTasks('grunt-webpack');
};
