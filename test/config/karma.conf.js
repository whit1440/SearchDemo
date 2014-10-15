module.exports = function (config) {
  config.set({
    basePath: '../..',
    preprocessors: {
      'www/js/index.js': 'coverage'
    },
    files: [
      'www/js/jquery.min.js',
      'www/js/angular/angular.js',
      'www/js/angular/angular-mocks.js',
      'www/js/*.js',
      'test/cordova-mock.js',
      'test/unit/**/*.js',
      {pattern: 'test/reports/**/*.html', included: false, served: true, watched: false},
      {pattern: 'test/reports/**/*.js', included: false, served: true, watched: true},
      {pattern: 'test/reports/**/*.css', included: false, served: true, watched: true}
    ],

    exclude: [
      'www/app/lib/js/angular/angular-loader.js',
      'www/app/lib/js/angular/*.min.js',
      'www/app/lib/js/angular/angular-scenario.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-htmlfile-reporter',
      'karma-junit-reporter',
      'karma-phantomjs-launcher'
    ],
    reporters: ['coverage', 'junit'],
    junitReporter: {
      outputFile: 'do_not_checkin/karma-reports/temp/TEST-UnitTest.xml',
      suite:'UnitTest'
    },
    coverageReporter: {
      type : 'lcov',
      dir : 'do_not_checkin/karma-reports/temp/'
    }
  });
};