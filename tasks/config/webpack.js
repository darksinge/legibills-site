/**
* `webpack`
*
* ---------------------------------------------------------------
*/
module.exports = function(grunt) {
    
    grunt.config.set('webpack', {
        dev: {
            entry: './assets/js/app/main.js',
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
            watch: true
        },
        prod: {
            entry: './assets/js/app/main.js',
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
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-webpack');
};
