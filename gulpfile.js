var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();

var jsFiles = [
        './assets/js/**./*.js',
        './node_modules/uswds/dist/js/uswds.min.js'],
    jsDest = './assets/js',
    scssSrc = './src/scss/**/*.scss',
    cssSrc = './assets/css/*.css',
    cssDest = './assets/css'

gulp.task('sass', function(){
    return gulp.src(scssSrc)
        .pipe(sass())
        .pipe(gulp.dest(cssDest))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('minify-css', function(){
    return gulp.src(cssSrc, '!assets/css/*.min.css')
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(cssDest))
});

gulp.task('js', function(){
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    })
});

gulp.task('watch', ['browserSync', 'sass', 'js'], function(){
    gulp.watch(scssSrc, ['sass']);
    gulp.watch(jsFiles, ['js']);
})

gulp.task('default', ['watch']);