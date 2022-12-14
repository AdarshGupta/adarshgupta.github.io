'use strict';

const browserSync = require('browser-sync');
const cp = require('child_process');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const jade = require('gulp-jade');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const cleanCss = require('gulp-clean-css');
const ghPages = require('gulp-gh-pages');

var paths = {
    jekyll: {
        dest: '_site',
    },
    styles: {
        src: 'assets/css/main.scss',
        dest: 'assets/css',
    },
    javascript: {
        src: 'assets/js',
        dest: 'assets/js',
    },
    images: {
        src: 'assets/img/**',
        dest: 'assets/img',
    }
};

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
function jekyllBuild(done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll.bat', ['build'], { stdio: 'inherit' })
        .on('close', done);
}

/**
 * Rebuild Jekyll & do page reload
 */
function jekyllRebuild(done){
    browserSync.reload();
    done();
}

function serve() {
    browserSync.init({
        server: {
            baseDir: paths.jekyll.dest
        },
        notify: true
    });
}

/**
 * Compile Jade into HTML files
 */
 function jadeToHTML(){
    return gulp.src('_jadefiles/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('_includes'));
}

/**
 * Compile files from _scss into both _site/assets/css/main.css (for live injecting)
 */
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass({
            includePaths: ['css']           //The SASS compiler uses each path here when resolving SASS @imports.
        }).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.jekyll.dest + '/assets/css'))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(paths.styles.dest));
}

/**
 * Compile JS files into a single _site/assets/js/main.js
 */
function mergeJS(){
    return gulp.src([paths.javascript.src + '/thumbnailData.js', paths.javascript.src + '/functions.js'])
        .pipe(concat('main.js'))
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest(paths.jekyll.dest + '/assets/js'));
}

/**
 * Copy images
 */
function copyImages(){
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.jekyll.dest + '/' + paths.images.dest));
}

/**
 * Deploy site to GitHub Pages
 */
function deploy() {
    return gulp.src('./_site/**/*')
            .pipe(ghPages({
                branch: "master"
            }));
};

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
function watch() {
    gulp.watch(['assets/css/**/*.scss', 'assets/css/**/*.sass'], gulp.series(styles, jekyllRebuild));
    gulp.watch('assets/js/**', gulp.series(mergeJS, jekyllRebuild));
    gulp.watch('assets/img/**', gulp.series(copyImages, jekyllRebuild));
    gulp.watch('_jadefiles/*.jade', gulp.series(jadeToHTML)); // Updates "_includes" which triggers a reload auto.
    gulp.watch(['index.html', '_layouts/*.html', '_includes/*'], gulp.series(jekyllBuild, jekyllRebuild));
}

exports.jekyllBuild = jekyllBuild;
exports.serve = serve;
exports.styles = styles;
exports.mergeJS = mergeJS;
exports.copyImages = gulp.series(copyImages);
exports.watch = watch;
exports.jadeToHTML = jadeToHTML;
exports.jekyllRebuild = gulp.series(jekyllBuild, jekyllRebuild);
exports.default = gulp.series(styles, mergeJS, copyImages, jekyllBuild, gulp.parallel(serve, watch));
exports.deploy = gulp.series(styles, mergeJS, copyImages, jekyllBuild, deploy);