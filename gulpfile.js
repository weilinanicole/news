var gulp = require('gulp');
var data = require('./src/data/data.json');
var cleanCss = require('gulp-clean-css');
var scss = require('gulp-sass');
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
var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
}
gulp.task('minHtml', function() {
    gulp.src('src/*.html')
        .pipe(minHtml(options))
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
                if (/\/login/g.test(req.url)) {
                    res.end(JSON.stringify(data))
                }
                next()
            }
        }))
})
gulp.task('default', ['minCss', 'minHtml', 'minImg', 'server'])