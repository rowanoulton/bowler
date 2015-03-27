'use strict';

var gulp = require('gulp'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['javascript']);

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
