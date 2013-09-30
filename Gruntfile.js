module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    watch: {
      options: {
        livereload: 35729
      },
      chapters: {
        files: ['src/**/*.jade', 'src/**/*.js', 'src/**/*.css'],
        tasks: ['jade', 'copy']
      }
    },

    jade: {
      compile: {
        files: [{
          src:     ["src/index.jade"],
          dest:    "index.html"
        }]
      }
    },

    connect: {
      server: {
        options: {
          port: 9001
        }
      }
    },

    copy: {
      main: {
        files: [
          { expand:true, cwd:'src/', src:'javascripts/*.js', dest:'assets', filter:'isFile' },
          { expand:true, cwd:'src/', src:'stylesheets/*.css', dest:'assets', filter:'isFile' }
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
  grunt.registerTask('default', ['connect', 'watch']);
};