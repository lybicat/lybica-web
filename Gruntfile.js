module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jade: {
          compile: {
            files: {
                'dist/index.html': ['src/jade/index.jade']
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');


    grunt.registerTask('default', ['jade']);
};
