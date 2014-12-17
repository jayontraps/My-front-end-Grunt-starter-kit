module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    jshint: {
      options: {
        eqeqeq: true,
        curly: true,
        undef: false,
        unused: false
      },
      target: {
        src: ['js/*.js']               
      }
    },


  
    sass: {
      options: {
        precision: 5
      },
      dev: {
        options: {
          style: 'nested', // compact, compressed, nested or expanded
          lineNumbers: true
        },
        files: {
          'build/screen.css' : 'sass/screen.scss'
        }
      },
      prod: {
        options: {
          style: 'compressed', // compact, compressed, nested or expanded
          lineNumbers: true
        },
        files: {
          'build/screen.css' : 'sass/screen.scss'
        }
      }
    },


    autoprefixer: {
     options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'build/*.css',
        dest: 'build/prefixed/'
      }
    },   


    uglify: {
      dev: {
        options: {
          beautify: true
        },
        files: {
          // Where to combine and minify JS files, followed by list of which files to include and exclude
          'build/main.min.js' : ['js/*.js']
        }
      },
      prod: {
        files: {
          // Where to combine and minify JS files, followed by list of which files to include and exclude
          'build/main.min.js' : ['js/*.js']
        }
      }
    },

    // Watch options: what tasks to run when changes to files are saved
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['sass/*.scss'],
        tasks: ['sass:dev', 'autoprefixer']
      },
      js: {
        files: ['js/*.js', '!build/main.min.js'], // Watch for changes in JS files except for script.min.js to avoid reload loops
        tasks: ['jshint', 'uglify:dev']
      }
    },


    connect: {
      server: {
        options: {
          port: 9001,
          base: './'
        }
      }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-contrib-concat');  
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');



  grunt.registerTask('default', ['jshint','connect','sass:dev','uglify:dev','autoprefixer','watch']);
  grunt.registerTask('production', ['jshint','connect','sass:prod','uglify:prod', 'autoprefixer']);





};