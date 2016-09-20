'use strict';

module.exports = function(grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // show elapsed time at the end
  require('time-grunt')(grunt);
    
  // configurable paths
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist',
    distserveur: 'dist/serveur',
    diststandalone: 'dist/standalone',
    distfirefoxext: 'dist/Addin Firefox',    
    distchromeext: 'dist/Addin Chrome',    
    pkg: grunt.file.readJSON('bower.json') || {},
// hebergementProtocol If possible, use HTTPS
// hebergementDomaine Put your servername below example : "hebergementDomaine": "github.com"
// cookieDomain Define the domain for cookie storage example: "cookieDomain": "*.github.com"  
// hebergementFullPath Define the relative path where source file will be available with slashes before and after 
// example : if I deploy the content of dist into http://mydomain.com/confortplusserveur/ 
// "hebergementFullPath": "/confortplusserveur/"  
    config: require('./config.json') || {},
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
       
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/js/{,*/}*.js', 
          '!<%= yeoman.app %>/js/jquery.min.js'
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
            '<%= yeoman.dist %>/*'
          ]
        }]
      },
      firefoxext: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.distfirefoxext %>/*'
          ]
        }]
      },
      chromeext: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.distchromeext %>/*'
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
          '<%= yeoman.dist %>/{,*/}css/{,*/}*.css',
          '<%= yeoman.dist %>/{,*/}images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/{,*/}fonts/*']
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
            src: [ '<%= yeoman.dist %>/{,*/}/js/mask.js','<%= yeoman.dist %>/{,*/}/js/toolbar.js','<%= yeoman.dist %>/{,*/}/js/toolbar-min.js','<%= yeoman.dist %>/{,*/}/css/*']
          }
        }
    },  
       
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
         distserveur:{
            src: '<%= yeoman.distserveur %>/js/toolbar.js',
            dest: '<%= yeoman.distserveur %>/js/toolbar-min.js'
         },
         diststandalone:{
            src: '<%= yeoman.diststandalone %>/js/toolbar.js',
            dest: '<%= yeoman.diststandalone %>/js/toolbar-min.js'
         }
    },
    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
        html: ['<%= yeoman.dist %>/**/*.html','<%= yeoman.dist %>/{,*/}js/{,*/}.js'],
        css: ['<%= yeoman.dist %>/{,*/}css/{,*/}*.css'],
        js: '<%= yeoman.dist %>/{,*/}js/*.js',
        options: {
            assetsDirs: ['<%= yeoman.distserveur %>','<%= yeoman.distserveur %>/css', '<%= yeoman.distserveur %>/images','<%= yeoman.diststandalone %>','<%= yeoman.diststandalone %>/css', '<%= yeoman.diststandalone %>/images'],
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
          '<%= yeoman.distserveur %>/css/classic-toolbar.min.css': [
            '<%= yeoman.app %>/css/classic-toolbar.css'
          ],
          '<%= yeoman.diststandalone %>/css/classic-toolbar.min.css': [
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
            "<%= yeoman.app %>/conf/hebergement.js",
            "<%= yeoman.app %>/js/ToolbarStrings.js",
            "<%= yeoman.app %>/js/UciUserPref.js",
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
            "<%= yeoman.app %>/js/toolbar.js",
            "<%= yeoman.app %>/js/start.server.js"
        ],
        dest: '<%= yeoman.distserveur %>/js/toolbar.js'
      },      
      standalone: {
        options: {
            // Replace all 'use strict' statements in the code with a single one at the top
            banner: "var hebergementDomaine = '<%= yeoman.config.hebergementProtocol %>//<%= yeoman.config.hebergementDomaine %>';\nvar hebergementFullPath = hebergementDomaine + '<%= yeoman.config.hebergementFullPath %>';\n",            
            process: function(src, filepath) {
              return '// Source: ' + filepath + '\n' +
                src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
            },
        },        
        src: [  
            "<%= yeoman.app %>/conf/hebergement.js",
            "<%= yeoman.app %>/js/ToolbarStrings.js",
            "<%= yeoman.app %>/js/UciUserPref.js",
            "<%= yeoman.app %>/js/UciCookieStandalone.js",
            "<%= yeoman.app %>/language/en.js",
            "<%= yeoman.app %>/language/es.js",
            "<%= yeoman.app %>/language/fr.js",
            "<%= yeoman.app %>/js/UciAideMotrice.js",
            "<%= yeoman.app %>/js/UciCouleur.js",
            "<%= yeoman.app %>/js/UciApparence.js",
            "<%= yeoman.app %>/js/UciTypographie.js",
            "<%= yeoman.app %>/js/UciValidation.js",
            "<%= yeoman.app %>/js/UciIhm.js",
            "<%= yeoman.app %>/js/toolbar.js",
            "<%= yeoman.app %>/js/start.server.js"
        ],
        dest: '<%= yeoman.diststandalone %>/js/toolbar.js'
      },      
      firefoxext: {
        options: {
            // Replace all 'use strict' statements in the code with a single one at the top                      
            process: function(src, filepath) {
              return '// Source: ' + filepath + '\n' +
                src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
            },
        },        
        src: [  
            "<%= yeoman.app %>/js/jquery.min.js",
            "<%= yeoman.app %>/conf/extensionFirefox/hebergement.js",
            "<%= yeoman.app %>/js/ToolbarStrings.js",
            "<%= yeoman.app %>/js/UciUserPref.js",
            "<%= yeoman.app %>/js/UciSimpleStorage.js",
            "<%= yeoman.app %>/language/en.js",
            "<%= yeoman.app %>/language/es.js",
            "<%= yeoman.app %>/language/fr.js",
            "<%= yeoman.app %>/js/UciAideMotrice.js",
            "<%= yeoman.app %>/js/UciCouleur.js",
            "<%= yeoman.app %>/js/UciApparence.js",
            "<%= yeoman.app %>/js/UciTypographie.js",
            "<%= yeoman.app %>/js/UciValidation.js",
            "<%= yeoman.app %>/js/UciIhm.js",
            "<%= yeoman.app %>/js/toolbar.js",
            "<%= yeoman.app %>/js/mask.js",
            "<%= yeoman.app %>/js/start.extensionFirefox.js"
        ],
        dest: '<%= yeoman.distfirefoxext %>/data/confort+/js/concat.js'
      },      
      chromeext: {
        options: {
            // Replace all 'use strict' statements in the code with a single one at the top                      
            process: function(src, filepath) {
              return '// Source: ' + filepath + '\n' +
                src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
            },
        },        
        src: [  
            "<%= yeoman.app %>/js/jquery.min.js",
            "<%= yeoman.app %>/conf/extensionChrome/hebergement.js",
            "<%= yeoman.app %>/js/ToolbarStrings.js",
            "<%= yeoman.app %>/js/UciUserPref.js",
            "<%= yeoman.app %>/js/UciSimpleStorage.js",
            "<%= yeoman.app %>/language/en.js",
            "<%= yeoman.app %>/language/es.js",
            "<%= yeoman.app %>/language/fr.js",
            "<%= yeoman.app %>/js/UciAideMotrice.js",
            "<%= yeoman.app %>/js/UciCouleur.js",
            "<%= yeoman.app %>/js/UciApparence.js",
            "<%= yeoman.app %>/js/UciTypographie.js",
            "<%= yeoman.app %>/js/UciValidation.js",
            "<%= yeoman.app %>/js/UciIhm.js",
            "<%= yeoman.app %>/js/toolbar.js",
            "<%= yeoman.app %>/js/mask.js",
            "<%= yeoman.app %>/js/start.extensionChrome.js"
        ],
        dest: '<%= yeoman.distchromeext %>/js/concat.js'
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
          cwd: '<%= yeoman.distserveur %>',
          src: ['**/*.html'],
          dest: '<%= yeoman.distserveur %>'
        },{
          expand: true,
          cwd: '<%= yeoman.diststandalone %>',
          src: ['**/*.html'],
          dest: '<%= yeoman.diststandalone %>'
        }]
      }
    },
    
    // Copy remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.distserveur %>',
          src: [           
            'images/**',   
            'css/**',  
            'fonts/**', 
            'js/jquery.min.js', 
            'js/mask.js', 
            'conf/param.php',
            '*.php',
            '*.txt',
            '*.htm',
            '**/*.html'
          ]
        },{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.diststandalone %>',
          src: [           
            'images/**',   
            'css/**',  
            'fonts/**', 
            'js/jquery.min.js', 
            'js/mask.js', 
            '*.txt',
            '*.htm',
            '**/*.html'
          ]
        }
        ]
      },
      firefoxext: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/Addin Firefox',
          dest: '<%= yeoman.distfirefoxext %>',
          src: [           
            '**' 
          ]
        },{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.distfirefoxext %>/data/confort+',
          src: [           
            'images/**',   
            'css/**',  
            'help/**',
            'language/**',  
            'js/**' ,  
            '!js/jquery.min.js',  
            '!js/jquery-1.11.3.min.js',  
            '!js/start.extensionChrome.js',     
            '!js/start.extensionIE.js',
            '!js/start.server.js',  
            '!js/UciCookie.js',  
            '!js/UciCookieStandalone.js',  
            'conf/extensionFirefox/**' 
          ]
        }]
      },
      chromeext: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/Addin Chrome',
          dest: '<%= yeoman.distchromeext %>',
          src: [           
            '**' 
          ]
        },{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.distchromeext %>',
          src: [           
            'images/**',   
            'css/**',  
            'help/**',
            'language/**',  
            'js/**' ,  
            '!js/jquery.min.js',  
            '!js/jquery-1.11.3.min.js',  
            '!js/start.extensionFirefox.js',  
            '!js/start.extensionIE.js',  
            '!js/start.server.js',  
            '!js/UciCookie.js',  
            '!js/UciCookieStandalone.js',  
            'conf/extensionChrome/**' 
          ]
        }]
      },
      docs: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'bower_components/boosted/dist/',
          dest: 'docs',
          src: [           
            'css/**',
            'fonts/**'
          ]
        }]
      }
    },  
      
    replace: {
        replacements:{
            options: {
              patterns: [
                {
                    match: 'COOKIEDOMAIN',
                    replacement: '<%= yeoman.config.cookieDomain %>'
                },
                {
                    match: '../js/toolbar-min.js',
                    replacement: '<%= yeoman.config.hebergementProtocol %>//<%= yeoman.config.hebergementDomaine %><%= yeoman.config.hebergementFullPath %>js/toolbar-min.js'
                }                  
              ],
              usePrefix:false
            },
            files: [
              {expand: true, src: ['<%= yeoman.dist %>/**/*.html','<%= yeoman.dist %>/**/*.php'], dest: ''}
            ]
        }
    },
    
    /**    
    Firefox XPI builder
    **/
    jpm: {
      options: {
        src: "<%= yeoman.distfirefoxext %>",
        xpi: "<%= yeoman.distfirefoxext %>"
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

  grunt.task.run([
      'connect:livereload',
      'watch'
    ]);
  });
  //build the docs, copy boosted files
  grunt.registerTask('docs', [   
    'copy:docs'
  ]);
  
  grunt.registerTask('buildfirefoxext', [    
    'clean:firefoxext',
    'copy:firefoxext',
    //'concat:firefoxext',
    'jpm:xpi'
  ]);
  
  grunt.registerTask('buildchromeext', [    
    'clean:chromeext',
    'copy:chromeext'
    //'concat:chromeext'
  ]);
  
  grunt.registerTask('build', [
    'clean:dist',
    'copy:dist',
    'useminPrepare',  
    'concat:dist',
    'concat:standalone',
    'uglify:distserveur',  
    'uglify:diststandalone',  
    'cssmin',
    'filerev',
    'usemin',  
    'htmlmin',
    'replace',
    'usebanner'
  ]);

  grunt.registerTask('default', [
    'build','buildfirefoxext','buildchromeext','docs'
  ]);
};


