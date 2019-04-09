var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var fileinclude = require('gulp-file-include');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-replace');
var reload = browserSync.reload;

// Browser sync
gulp.task('server', function () {
  browserSync.init({
      server: "./dist"
  });
  gulp.watch("dist/js/main.js").on("change", reload);
});

// Scss compiler
gulp.task('sass', function() {
  gulp.src([
      'src/scss/*.scss'
  ])
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}))
      .on('error', function(e){
          console.log(e.formatted);
      })
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
});

// Js compiler
gulp.task('js', function () {
  gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'src/js/*js'
  ])
      .pipe(uglify())
      .on('error', function(e){
        console.log(e.formatted);
      })
      .pipe(gulp.dest('dist/js'))
});

// Image compresser
gulp.task('imagemin', function () {
  gulp.src('src/media/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/media/'))
});

// Include html partials
gulp.task('fileinclude', function() {
  gulp.src(['src/html/templates/*.html'])
      .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
      }))
      .pipe(replace('@get_url', 'http://localhost:3000/'))
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.stream());
});

// Copy webfonts to /dist
gulp.task('webfonts', function () {
  gulp.src('src/webfonts/*')
    .pipe(gulp.dest('dist/webfonts/'))
});

// Gulp watchers
gulp.task('default', ['fileinclude', 'server', 'sass', 'js', 'imagemin', 'webfonts'], function(){
  gulp.watch('./src/scss/**/*', ['sass']);
  gulp.watch('./src/js/**/*', ['js']);
  gulp.watch('./src/html/**/*.html', ['fileinclude']);
  gulp.watch('./src/media/*', ['imagemin']);
  gulp.watch('./src/webfonts/*', ['webfonts']);
  gulp.watch('./dist/*').on('change', browserSync.reload);
});