'use strict';

var gulp = require('gulp'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    jasmine = require('gulp-jasmine'),
    sass = require('gulp-sass');

gulp.task('default', ['build', 'watch']);

gulp.task('watch', function () {
    gulp.watch('./src/js/**/*.js', ['test']);
    gulp.watch('./spec/**/*.js', ['test']);
    gulp.watch('./src/scss/**/*.scss', ['css']);
});

gulp.task('build', ['javascript', 'css']);

gulp.task('css', function () {
    gulp.src('./src/scss/bowler.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('javascript', function () {
    var browserified = transform(function (filename) {
        var b = browserify({ entries: filename, debug: true });
        return b.bundle();
    });

    return gulp.src('./src/js/bowler.js')
        .pipe(browserified)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('test', ['javascript'], function () {
    return gulp.src('./spec/**/*.js')
        .pipe(jasmine());
});
