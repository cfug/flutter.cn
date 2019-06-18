const gulp = require('gulp');
const replace = require('gulp-replace');

gulp.task('default', () => {
  return gulp.src(['_site/**/*.html'])
      .pipe(replace(/([\u3000-\u303F\u4e00-\u9fa5\uF900-\uFFEF])\s+(?=[\u3000-\u303F\u4e00-\u9fa5\uF900-\uFFEF])/gs, '$1'))
      .pipe(gulp.dest('_site'));
});
