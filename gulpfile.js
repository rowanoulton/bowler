'use strict';

var gulp = require('gulp'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    jasmine = require('gulp-jasmine');

gulp.task('default', ['build', 'watch']);

gulp.task('watch', function () {
    gulp.watch('./src/js/**/*.js', ['test']);
    gulp.watch('./spec/**/*.js', ['test']);
});

gulp.task('build', function () {
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

gulp.task('test', ['build'], function () {
    return gulp.src('./spec/**/*.js')
        .pipe(jasmine());
});
