const gulp = require('gulp');
const replace = require('gulp-replace');

gulp.task('remove-space', () => {
  return gulp.src(['../../_site/**/*.html'])
      .pipe(replace(/([\u3000-\u303F\u4e00-\u9fa5\uF900-\uFFEF])\s+(?=[\u3000-\u303F\u4e00-\u9fa5\uF900-\uFFEF])/gs, '$1'))
      .pipe(gulp.dest('../../_site'));
});

gulp.task('mark-side-toc', () => {
  return gulp.src(['../../_site/**/*.html'])
      .pipe(replace(/<li class="toc-entry (nav-item )?toc-h(\d)"><a class="nav-link" href="#(.*?)">(?!.*[\u4e00-\u9fa5])(.*?)<\/a><\/li>\n.*>(?=.*[\u4e00-\u9fa5])(.*?)<\/a>/g, '<li class="toc-entry $1toc-h$2"><a class="nav-link" href="#$3"><p>$4</p><p>$5</p></a>'))
      .pipe(gulp.dest('../../_site'));
});
