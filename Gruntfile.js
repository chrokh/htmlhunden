module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    watch: {
      options: {
        livereload: 35729
      },
      chapters: {
        files: ['src/**/*.jade', 'src/**/*.js', 'src/**/*.css'],
        tasks: ['compile']
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
    },

    shell: {
      publish: {
        options:{ stdout: true },
        command: 'git checkout gh-pages && git merge master && git push && git checkout master'
      }
    }

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('compile', ['jade', 'copy', 'build-toc']);
  grunt.registerTask('publish', ['compile', 'shell:publish']);
  grunt.registerTask('build-toc', function(){
    require('./tasks/build-toc.js')(this.async());
  });
};