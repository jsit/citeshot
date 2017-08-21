var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// define tasks here
gulp.task('default', function(cb){
  return gulp.src(['./node_modules/html2canvas/dist/html2canvas.js', './node_modules/downloadjs/download.js', './src/citeshot.js'])
    .pipe(concat('citeshot.js'))
	// .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});


gulp.task('scripts', function() {
});
