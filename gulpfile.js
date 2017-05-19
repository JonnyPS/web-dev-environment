// enable gulp
var gulp = require('gulp');
// enable the sass compiler 
var sass = require('gulp-sass');
// enable browser-sync
var browserSync = require('browser-sync').create();
// enable useref in order to concatonate multiple files into one
var useref = require('gulp-useref');
// minimises js files
var uglify = require('gulp-uglify');
// ensures that only js files are minified
var gulpIf = require('gulp-if');

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

// concatonates files and dumps them in the dist folder
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', uglify()))
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

// running 'gulp' will run the gulp default task.
// this in turn can run all the other gulp tasks if the user defines them
gulp.task('default', ['watch']);

