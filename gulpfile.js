// enable gulp
var gulp = require('gulp');
// enable the sass compiler 
var sass = require('gulp-sass');
// enable browser-sync
var browserSync = require('browser-sync').create();
// enable useref in order to concatonate multiple files into one
var useref = require('gulp-useref');

gulp.task('sass', function() {
  // return any scss files in the scss folder
  return gulp.src('app/scss/*.scss')
  // run the complier task
  .pipe(sass())
  // output css to the css foldercss
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

// use browserSync to refresh the browser using the contents of the app folder
gulp.task('browserSync', function() {
  browserSync.init({
    injectChanges: true,
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

// use gulp to watch files, when files are saved gulp will automatically compile the scss to css
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/*.scss', ['sass']); 
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/*.js', browserSync.reload); 
})

// refer to evalue.
// recompile js before wathcing
// add a manifest.js file

