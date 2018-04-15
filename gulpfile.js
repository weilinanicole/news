var gulp = require('gulp');
var data = require('./src/data/data.json');
var cleanCss = require('gulp-clean-css');
var scss = rrequire('gulp-sass');
var minHtml = require('gulp-htmlmin');
var minImg = require('gulp-imagemin');
var sequence = require('gulp-sequence');
var server = require('gulp-webserver');
gulp.task('minCss', function() {
    gulp.src('src/css/*.scss')
        .pipe(scss())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
});
gulp.task('minHtml', function() {
    gulp.src('src/*.html')
        .pipe(minHtml())
        .pipe(gulp.dest('dist'))
});
gulp.task('minImg', function() {
    gulp.src('src/imgs/*.jpg')
        .pipe(minImg())
        .pipe(gulp.dest('dist/imgs'))
});
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                console.log(req, url)
                next()
            }
        }))
})
gulp.task('default', function() {
    sequence(['minCss', 'minHtml', 'minImg'])
})