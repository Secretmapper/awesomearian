var gulp = require('gulp')
var stylus = require('gulp-stylus')
var sourcemaps = require('gulp-sourcemaps')
var minify = require('gulp-minify')

var fn = {
  styles () {
    gulp.src('./app/styles/main.styl')
      .pipe(stylus({
        compress: true
      }))
      .pipe(gulp.dest('./static/css/'))
  },
  js () {
    gulp.src('./app/styles/main.js')
      .pipe(minify())
      .pipe(gulp.dest('./static/js/'))
  }
}

gulp.task('styles', fn.styles)
gulp.task('js', fn.js)

gulp.task('watch', () => {
  gulp.watch('./app/styles/**/*.styl', ['styles'])
  gulp.watch('./app/styles/**/*.js', ['js'])
})

gulp.task('default', ['styles', 'watch']);
