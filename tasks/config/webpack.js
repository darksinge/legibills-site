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
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react']
                    }
                }
                ]
            },
            watch: true
        }
    });
    
    grunt.loadNpmTasks('grunt-webpack');
};
