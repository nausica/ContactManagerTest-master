'use strict';

var gulp       = require('gulp');
var less       = require('gulp-less');
var minifycss  = require('gulp-minify-css');
var del        = require('del');
var path       = require('path');
var browserify = require('browserify');
var reactify   = require('reactify');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');
var concat     = require('gulp-concat');
var $          = require('gulp-load-plugins')();

var is_prod = $.util.env.type === 'production';

function onError() {
  var args = Array.prototype.slice.call(arguments);
  $.util.beep();
  $.notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}


// Styles LESS > CSS
gulp.task('bootstrap:prepareLess', function() {
  return gulp.src('src/styles/custom-variables.less')
    .pipe(gulp.dest('src/styles/lib/bootstrap/less'));
});


gulp.task('styles', function(){

  gulp.src(['src/styles/lib/bootstrap/less/variables.less', 'src/styles/custom-variables.less'])
    .pipe(concat('src/styles/lib/bootstrap/less/variables.less'))
    .pipe(gulp.dest('.'));

  return gulp.src('src/styles/styles.less')
    .pipe(less())
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'));
});

// Scripts
gulp.task('scripts', function() {
  var bundler;
  bundler = browserify({
    basedir: __dirname,
    noparse: ['react/addons', 'reflux', 'react-router'],
    entries: ['./src/scripts/app.js'],
    transform: [reactify],
    extensions: ['.js'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  bundler = watchify(bundler);

  function rebundle() {
    console.log('Bundling Scripts...');
    var start = Date.now();
    return bundler.bundle()
      .on('error', onError)
      .pipe(source('app.js'))
      .pipe(is_prod ? $.streamify($.uglify()) : $.util.noop())
      .pipe(gulp.dest('dist/scripts'))
      .pipe($.notify(function() {
        console.log('Bundling Complete - ' + (Date.now() - start) + 'ms');
      }));
  }

  bundler.on('update', rebundle);

  return rebundle();
});


// HTML
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe($.useref())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});


// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

// Fonts
gulp.task('copy:fonts', function() {
    return gulp.src([
            'src/styles/lib/bootstrap/fonts/glyphicons-halflings-regular.*'])
            .pipe(gulp.dest('dist/fonts/'));
});

// Webserver
gulp.task('serve', function() {
  gulp.src('dist')
    .pipe($.webserver({
      livereload: true,
      port: 9000,
      fallback: 'index.html'
    }));
});


// Clean
gulp.task('clean', function(cb) {
  del(['dist/styles', 'dist/scripts', 'dist/images'], cb);
});


// Default task
gulp.task('default', ['clean', 'html', 'styles', 'images', 'scripts', 'copy:fonts']);


// Watch
gulp.task('watch', ['html', 'styles', 'images', 'scripts', 'copy:fonts', 'serve'], function() {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/styles/**/*.less', ['styles']);
  gulp.watch('src/images/**/*', ['images']);
});
