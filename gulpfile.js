/**
 * Created by sridharrajs.
 */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jshint = require('gulp-jshint');
const runSequence = require('run-sequence');

const SERVER_JS_FILES = [
  'app/**/*.js',
  'config.js',
  'index.js'
];

gulp.task('jshint', () => {
  return gulp.src(SERVER_JS_FILES)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('eslint', () => {
  return gulp
    .src(SERVER_JS_FILES)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('default', (callback) => {
  runSequence('jshint', 'eslint', callback);
});

