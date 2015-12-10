module.exports = function(grunt) {
    grunt.initConfig({
        jade: {
            compile: {
                files: {
                    'dist/index.html': 'src/jade/index.jade',
                    'dist/testplan.html': 'src/jade/testplan.jade',
                    'dist/resourcemgr.html': 'src/jade/resourcemgr.jade',
                    'dist/testreport.html': 'src/jade/testreport.jade',
                    'dist/swbuild.html': 'src/jade/swbuild.jade',
                    'dist/testscheduler.html': 'src/jade/testscheduler.jade',
                    'dist/testagent.html': 'src/jade/testagent.jade',
                    'dist/console.html': 'src/jade/console.jade'
                }
            }
        },
        browserify: {
            compile: {
                files: {
                    'dist/js/taskqueue.js': 'src/js/taskqueue.js',
                    'dist/js/testplan.js': 'src/js/testplan.js',
                    'dist/js/resourcemgr.js': 'src/js/resourcemgr.js',
                    'dist/js/testreport.js': 'src/js/testreport.js',
                    'dist/js/swbuild.js': 'src/js/swbuild.js',
                    'dist/js/testscheduler.js': 'src/js/testscheduler.js',
                    'dist/js/testagent.js': 'src/js/testagent.js',
                    'dist/js/console.js': 'src/js/console.js'
                }
            }
        },
        uglify: {
            compile: {
                files: {
                    'dist/js/taskqueue.js': 'dist/js/taskqueue.js',
                    'dist/js/testplan.js': 'dist/js/testplan.js',
                    'dist/js/resourcemgr.js': 'dist/js/resourcemgr.js',
                    'dist/js/testreport.js': 'dist/js/testreport.js',
                    'dist/js/swbuild.js': 'dist/js/swbuild.js',
                    'dist/js/testscheduler.js': 'dist/js/testscheduler.js',
                    'dist/js/testagent.js': 'dist/js/testagent.js',
                    'dist/js/console.js': 'src/js/console.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jade', 'browserify', 'uglify']);
};
