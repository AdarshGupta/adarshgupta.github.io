const browserSync = require('browser-sync');
const cp = require('child_process');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const jade = require('gulp-jade');

var paths = {
    jekyll: {
        src: './app',
        dest: '_site',
    },
    styles: {
        src: 'assets/css/main.scss',
        dest: 'assets/css',
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
    done()
}

function serve() {
    browserSync.init({
        server: {
            baseDir: '_site'
        },
        notify: true
    });
}

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass({
            includePaths: ['css']
        }).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(paths.jekyll.dest + 'assets/css'))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(paths.styles.dest));
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
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
function watch() {
    gulp.watch(['assets/css/**/*.scss', 'assets/css/**/*.sass'], gulp.series(styles, jekyllBuild, jekyllRebuild));
    gulp.watch('_jadefiles/*.jade', gulp.series(jadeToHTML)); // Updated "_includes" which triggers a reload auto.
    gulp.watch(['index.html', '_layouts/*.html', '_includes/*'], gulp.series(jekyllBuild, jekyllRebuild));
}

exports.jekyllBuild = jekyllBuild;
exports.jekyllRebuild = gulp.series(jekyllBuild, jekyllRebuild);
exports.default = gulp.series(styles, jekyllBuild, gulp.parallel(serve, watch));
exports.serve = serve;
exports.styles = styles;
exports.watch = watch;
exports.jadeToHTML = jadeToHTML;