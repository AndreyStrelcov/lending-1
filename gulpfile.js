'use strict';
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');
/*********************************************
             Developer tasks
*********************************************/  
//sass compile
gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('app/css'))
});
// js libs compile
gulp.task('scripts', function() {
    return gulp.src([ 
        'app/libs/jquery/dist/jquery.min.js', 
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' 
        ])
        .pipe(concat('libs.min.js')) 
        .pipe(uglify()) 
        .pipe(gulp.dest('app/js')); 
});
// minific libs
gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css') 
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'})) 
        .pipe(gulp.dest('app/css')); 
});

gulp.task('sass:watch', ['css-libs', 'scripts'], function () {
  gulp.watch('app/sass/**/*.scss', ['sass']);
});
/*********************************************
             Prodution tasks
*********************************************/  
// clear
gulp.task('clean', function() {
    return del.sync('build'); 
});
// zip photo
gulp.task('img', function() {
    return gulp.src('app/img/**/*') 
        .pipe(cache(imagemin({ 
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('build/img')); 
});
// css+fonts+js+html
gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
// css libs
    var buildCss = gulp.src([ 
        'app/css/main.css',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('build/css'))
// fonts
    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('build/fonts'))
// js
    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('build/js'))
// html
    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('build'));
});
// default
gulp.task('default', ['sass:watch']);


