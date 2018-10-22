const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');

const paths = {
  js: 'src/**/*.js',
  dist: 'dist/'
};

gulp.task("build", () => {
  return gulp
    .src(`${paths.js}`)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist))
});

gulp.task("watch", () => {
  gulp.watch(`${paths.js}`, ["build"]);
});

gulp.task("default", ["watch"]);
