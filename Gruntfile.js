'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // show elapsed time at the end
  require('time-grunt')(grunt);
    
  // configurable paths
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist',
    pkg: grunt.file.readJSON('bower.json') || {},
    config: grunt.file.readJSON('config.json') || {},
  };

  grunt.initConfig({
    yeoman: appConfig,
    watch: {
      js: {
        files: ['<%= yeoman.app %>/js/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '<%= yeoman.app %>/**/*.js',
          '<%= yeoman.app %>/**/*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        livereload: 35730
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9000,
          middleware: function(connect) {
            return [
              connect.static('test'),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },
             
    php: {
        dist: {
            options: {
                port: 5000
            }
        }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/js/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/css',
          src: '{,*/}*.css',
          dest: '<%= yeoman.app %>/css'
        }]
      }
    },
      
    // Renames files for browser caching purposeses
    filerev: {
      dist: {
        src: [
          //'<%= yeoman.dist %>/js/{,*/}*.js',
          '<%= yeoman.dist %>/css/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/fonts/*']
      }
    },
    
    // Banner
    banner: '/* <%= yeoman.pkg.name %> - version <%= yeoman.pkg.version %> - ' +
          '<%= grunt.template.today("dd-mm-yyyy") %>\n' +
          '<%= yeoman.pkg.description %>\n ' +
          'Copyright (C) 2014 - <%= grunt.template.today("yyyy") %> <%= yeoman.pkg.author %> */',
    usebanner: {
        dist: {
          options: {
            position: 'top',
            banner: '<%= banner %>'
          },
          files: {
            src: [ 'dist/js/*','dist/css/*']
          }
        }
    },  
      
    // Generate changelog based on git commit
      /**
    changelog: {
      options: {
        from:'v2.0.0',
        commitLink: function(commitHash) {
          //TODO externalize orangeforge git url + project name etc..
          return '['+ commitHash.substring(0,8) +'](https://github.com/Orange-OpenSource/Orange-Confort-plus?p=boos.git?a=commit&h=' + commitHash +')';
        }
      }
    },
    */ 
 
	// Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/testpage.html'
    },
      
    uglify: {
         options: {
             report: 'min',
             ASCIIOnly  : true,  
             beautify    : false  
         },
         dist:{
            src: '<%= yeoman.dist %>/js/toolbar.js',
            dest: '<%= yeoman.dist %>/js/toolbar-min.js'
         }
    },
    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
        html: ['<%= yeoman.dist %>/**/*.html','<%= yeoman.dist %>/js/{,*/}.js'],
        css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
        js: '<%= yeoman.dist %>/js/*.js',
        options: {
            assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/css', '<%= yeoman.dist %>/images'],
            patterns: {
                js: [
                    [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp))/gm, 'Update the JS to reference our revved images'],
                    [/(css\/.*?\.(?:css))/gm, 'Update the JS to reference our revved css']
                ]
            }
        }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/css/classic-toolbar.min.css': [
            '<%= yeoman.app %>/css/classic-toolbar.css'
          ]
        }
      }
    },
    concat: {
      /*options: {
        banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>',
        stripBanners: false
      },*/
      dist: {
        options: {
            // Replace all 'use strict' statements in the code with a single one at the top
            banner: "var hebergementDomaine = '<%= yeoman.config.hebergementProtocol %>//<%= yeoman.config.hebergementDomaine %>';\nvar hebergementFullPath = hebergementDomaine + '<%= yeoman.config.hebergementFullPath %>';\n",            
            process: function(src, filepath) {
              return '// Source: ' + filepath + '\n' +
                src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
            },
        },
        src: [
            "<%= yeoman.app %>/js/UciCookie.js",
            "<%= yeoman.app %>/language/en.js",
            "<%= yeoman.app %>/language/es.js",
            "<%= yeoman.app %>/language/fr.js",
            "<%= yeoman.app %>/js/UciAideMotrice.js",
            "<%= yeoman.app %>/js/UciCouleur.js",
            "<%= yeoman.app %>/js/UciApparence.js",
            "<%= yeoman.app %>/js/UciTypographie.js",
            "<%= yeoman.app %>/js/UciValidation.js",
            "<%= yeoman.app %>/js/UciIhm.js",
            "<%= yeoman.app %>/js/toolbar.js"
        ],
        dest: '<%= yeoman.dist %>/js/toolbar.js'
      }
    },
      
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [           
            'images/**',   
            'css/**',  
            'fonts/**', 
            'js/jquery.min.js', 
            'js/ruler.js', 
            'conf/param.php',
            '*.php',
            '*.txt',
            '*.htm',
            '**/*.html'
          ]
        }
        ]
      }
    },  
      
    replace: {
        replacements:{
            options: {
              patterns: [
                {
                    match: 'HEBERGEMENTPROTOCOL',
                    replacement: '<%= yeoman.config.hebergementProtocol %>'
                },
                {
                    match: 'HEBERGEMENTDOMAIN',
                    replacement: '<%= yeoman.config.cookieDomain %>'
                },
                {
                    match: 'js/toolbar-min.js',
                    replacement: '<%= yeoman.config.hebergementProtocol %>//<%= yeoman.config.hebergementDomaine %><%= yeoman.config.hebergementFullPath %>js/toolbar-min.js'
                }                  
              ],
              usePrefix:false
            },
            files: [
              {expand: true, src: ['dist/**/*.js','dist/**/*.html','dist/**/*.php'], dest: ''}
            ]
        }
    },
            
    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

  grunt.task.run([
      //'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
	// TODO 'autoprefixer',
    'php',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'copy:dist',
    'useminPrepare',  
    'concat',
    'uglify:dist',  
    'cssmin',
    'filerev',
    'usemin',  
    'htmlmin',
    'replace',
    'usebanner'
  ]);

  grunt.registerTask('default', [
    //'newer:jshint',
    //'test',
    'build'
  ]);
};


