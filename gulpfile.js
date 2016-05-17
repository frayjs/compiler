'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
  var sources = [
    'src/**/*.js',
    'test/**/*.js'
  ];

  return gulp.src(sources)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', ['lint']);
