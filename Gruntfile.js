module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    watch: {
      files: ['src/**/*.jade', 'src/**/*.js', 'src/**/*.css'],
      tasks: ['jade', 'copy']
    },

    jade: {
      compile: {
        files: [{
          src:     ["src/index.jade"],
          dest:    "www/index.html"
        }]
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'www',
          keepalive: true
        }
      }
    },

    copy: {
      main: {
        files: [
          { expand:true, cwd:'src/', src:'javascripts/*.js', dest:'www', filter:'isFile' },
          { expand:true, cwd:'src/', src:'stylesheets/*.css', dest:'www', filter:'isFile' }
        ]
      }
    }

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
};