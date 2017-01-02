/**
 * Created by sridharrajs.
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const jshint = require('gulp-jshint');
const runSequence = require('run-sequence');

const FILES = {
  SERVER_JS_FILES: ['gulpfile.js', 'app/**/*.js'],
  CLIENT_NON_JS_FILES: ['client/**/*.css', 'client/**/*.html'],
  CLIENT_JS_FILES: ['client/**/*.js'],
  CLIENT_FILES: ['client/**/*.js', 'client/**/*.css', 'client/**/*.html']
};

const DIST = 'dist/';

gulp.task('compile-js', () => {
  return gulp
    .src(FILES.CLIENT_JS_FILES)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(DIST));
});

gulp.task('jshint', () => {
  return gulp.src(FILES.SERVER_JS_FILES)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('eslint', () => {
  return gulp
    .src(FILES.SERVER_JS_FILES)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lints', (callback) => {
  runSequence('jshint', 'eslint', callback);
});

gulp.task('serve', () => {
  gulp.watch(FILES.CLIENT_FILES, ['compile-js', 'copy-html-css']);
});

gulp.task('copy-html-css', () => {
  return gulp
    .src(FILES.CLIENT_NON_JS_FILES)
    .pipe(gulp.dest(DIST));
});

gulp.task('install', (callback) => {
  runSequence('compile-js', 'copy-html-css', callback);
});
