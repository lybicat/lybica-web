module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jade: {
            files: {
                'dist/index.html': ['src/jade/*.jade']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');


    grunt.registerTask('default', ['jade']);
};
