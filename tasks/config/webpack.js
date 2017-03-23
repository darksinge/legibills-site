/**
* `webpack`
*
* ---------------------------------------------------------------
*/
module.exports = function(grunt) {
    
    grunt.config.set('webpack', {
        dev: {
            entry: './assets/app/main.js',
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
        }
    });
    
    grunt.loadNpmTasks('grunt-webpack');
};
