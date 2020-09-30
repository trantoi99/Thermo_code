var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});
gulp.task('sass', function() {
    return gulp.src('app/scss/styles.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('app/css'))
});

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
    // Other watchers
});
// toi uu file js va css
gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        //minfies only if it's a js file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});
// toi uu hoa anh
gulp.task('images', function() {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});
//coppy tu fonts toi dist
gulp.task('font', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});
// tu dong xoa file dc tao ra
gulp.task('clean:dist', function() {
    return del.sync('dist');
});
// xoa cache tren local
gulp.task('cache:clear', function(callback) {
    return cache.clearAll(callback)
});