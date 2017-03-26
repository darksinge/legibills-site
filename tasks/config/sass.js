/**
 * `sass`
 *
 * ---------------------------------------------------------------
 *
 * Compile your SASS files into a CSS stylesheet.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-sass
 *
 */

module.exports = function(grunt) {

  grunt.config.set('sass', {
    dev: {
        files: [{
            expand: true,
            cwd: 'assets/bower_components/materialize/sass/',
            src: ['materialize.scss'],
            dest: '.tmp/public/styles/',
            ext: '.css'
        }],
        options: {
            noCache: false
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};
