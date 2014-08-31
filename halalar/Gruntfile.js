/*
 * Default Gruntfile for AppGyver Steroids
 * http://www.appgyver.com
 *
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'www/javascripts/**/*.js', 'test/unit/**/*.js'],
      options: { // TODO
        node: true,
        browser: true,
        esnext: true,
        bitwise: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: 'single',
        regexp: true,
        undef: true,
        unused: false,
        strict: true,
        trailing: true,
        smarttabs: true,
        globals: {
          alert: false,
          angular: false,
          steroids: false,
          describe: false,
          beforeEach: false,
          inject: false,
          it: false,
          expect: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-steroids');

  grunt.registerTask('default', ['jshint', 'steroids-make', 'steroids-compile-sass']);

};
