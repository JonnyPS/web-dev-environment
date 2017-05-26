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
// minimises css files
var cssnano = require('gulp-cssnano');
// minimises pictures
var imagemin = require('gulp-imagemin');
// to speed up image compression, gulp-cache doesn't compress images that haven't been changed since last compression
var cache = require('gulp-cache');
// allows gulp to return a file
var data = require('gulp-data');
// renders a nunjucks template
var nunjucksRender = require('gulp-nunjucks-render');
// creates a zip file from other files
var archiver = require('gulp-archiver');
// read data from a json file
var packageJSON = require('./app/content/data.json')
// displays errors in the terminal in a very readable way
var prettyError = require('gulp-prettyerror');
// deletes everything in a specified folder
var clean = require('gulp-clean');
// checks version of gulp modules
var modulesVersionCheck = require('gulp-modules-version-check');

var series = require('gulp-series');

var runSequence = require('run-sequence');


gulp.task('modules', function() {
  return gulp.src('./app/**')
    .pipe(modulesVersionCheck({
      update: true,
      match: /gul/
    }));
});
// deletes everything in a specified folder this runs prior to building for production to ensure there are no unwanted files
gulp.task('clean', function() {
   return gulp.src('dist', {read: false})
  .pipe(clean());
})

gulp.task('sass', function() {
  // return any scss files in the scss folder
  return gulp.src('app/scss/*.scss')
  .pipe(prettyError())
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
  return gulp.src('app/index.html')
  .pipe(useref())
  // // Minifies only if it's a JavaScript or a css file
  .pipe(gulpIf('*.js', uglify()))
  .pipe(gulpIf('*.css', cssnano()))
  .pipe(gulp.dest('dist'))
});

// selects all images in the images folder and child directories, and minimises them before dumping them into the dist folder
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/images'))
});

// accesses json files for the nunjucks template to read, renders nunjucks file
gulp.task('nunjucks', function() {
  return gulp.src('app/templates/*.+(html|nunjucks)')
    // Adding data to Nunjucks
    .pipe(data(function() {
      return require('./app/content/data.json')
    }))
    .pipe(nunjucksRender({
      path: ['app']
    }))
    .pipe(gulp.dest('app'))
    // .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// gulp.task('build', gulp.series('clean', 'nunjucks', 'useref', 'images', 'sass', 'archiver'))

// use gulp to watch files, when files are saved gulp will automatically compile the scss to css
gulp.task('watch', ['nunjucks', 'browserSync', 'sass'], function() {
  gulp.watch('app/scss/*.scss', ['sass']); 
  gulp.watch('app/templates/*.+(html|nunjucks)', ['nunjucks']); 
  // gulp.watch('app/templates/*.+(html|nunjucks)', ['nunjucks']); 
  gulp.watch('app/js/*.js', browserSync.reload); 
})




gulp.task('archiver', function() {
  // waits for all other tasks to finish, then zips up the dist folder contents
  // gives the zip file the name of the key value 'projectName' in the json file
  return gulp.src('dist/**')
  .pipe(archiver(packageJSON.projectName + '.zip'))
  .pipe(gulp.dest('./dist')); 
})

// run 'gulp build' when ready for publication
gulp.task('build', function() {
 runSequence('clean',
            ['nunjucks', 'useref', 'images'],
            'archiver');
});





