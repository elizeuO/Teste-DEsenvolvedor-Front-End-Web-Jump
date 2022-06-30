module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: 'public/assets/js/desafio-frontend.js',
          dest: 'public/dist/main.js'
        }
      },
      watch: {
        scripts: {
          files: ['**/*.js'],
          tasks: ['uglify'],
          options: {
            interrupt: true,
          },
        },
      }
    });
  
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'watch']);
  
  };