/**
* `webpack`
*
* ---------------------------------------------------------------
*/

const { resolve } = require('path');
const webpackConfig = require(resolve('.', './webpack.config'));

module.exports = function(grunt) {
    grunt.config.set('webpack', {
            build: webpackConfig
    });
    
    grunt.loadNpmTasks('grunt-webpack');
};
