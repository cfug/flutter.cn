const gulp = require('gulp');
const replace = require('gulp-replace');

gulp.task('default', () => {
  return gulp.src(['_site/**/*.html'])
      .pipe(replace(/([\u4e00-\u9fa5]) +(?=[\u4e00-\u9fa5])/gs, '$1'))
      .pipe(gulp.dest('_site'));
});
