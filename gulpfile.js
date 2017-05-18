var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  // return any scss files in the scss folder
  return gulp.src('app/scss/*.scss')
    // run the complier task
    .pipe(sass())
    // output css to the css foldercss
    .pipe(gulp.dest('app/css'))
});

gulp.task('watch', function() {
  gulp.watch('app/scss/*.scss', ['sass']); 
})
