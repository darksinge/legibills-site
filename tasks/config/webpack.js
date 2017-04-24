/**
* `webpack`
*
* ---------------------------------------------------------------
*/

var path = require('path');
var appRoot = path.resolve('./');
const webpackConfig = require(appRoot + '/webpack.config');

module.exports = function(grunt) {
    grunt.config.set('webpack', {
        dev: webpackConfig
    });
    
    grunt.loadNpmTasks('grunt-webpack');
};
