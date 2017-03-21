/**
* `tsc`
*
*/
module.exports = function(grunt) {
    
    grunt.config.set('ts', {
        options: {
            experimentalDecorators: true
        },
        default: {
            files: {
                '.tmp/public/app': ['assets/app/**/*.ts']
            },
            options: {
                fast: 'never'
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-ts');
};
