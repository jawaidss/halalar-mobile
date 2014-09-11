module.exports = (config) ->
  config.set

    # base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..'


    # frameworks to use
    # available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine']


    # list of files / patterns to load in the browser
    files: [
      'www/components/steroids-js/steroids.js'
      'www/components/jquery/dist/jquery.min.js'
      'www/components/angular/angular.min.js'
      'www/components/angular-mocks/angular-mocks.js'
      'www/components/angular-route/angular-route.min.js'
      'www/components/angular-local-storage/angular-local-storage.min.js'
      'www/components/angular-hammer/angular-hammer.js'
      'www/javascripts/**/*.js'
      'test/unit/**/*.js'
    ]


    # list of files to exclude
    exclude: [

    ]


    # preprocess matching files before serving them to the browser
    # available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.coffee': ['coffee']
      'www/javascripts/**/*.js': ['coverage']
    }


    # test results reporter to use
    # possible values: 'dots', 'progress'
    # available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage']


    # web server port
    port: 9876


    # enable / disable colors in the output (reporters and logs)
    colors: true


    # level of logging
    # possible values:
    # - config.LOG_DISABLE
    # - config.LOG_ERROR
    # - config.LOG_WARN
    # - config.LOG_INFO
    # - config.LOG_DEBUG
    logLevel: config.LOG_INFO


    # enable / disable watching file and executing tests whenever any file changes
    autoWatch: false


    # start these browsers
    # available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: []


    # Continuous Integration mode
    # if true, Karma captures browsers, runs the tests and exits
    singleRun: true

    coverageReporter: { # TODO
      type : 'html'
      dir : 'coverage/'
    }