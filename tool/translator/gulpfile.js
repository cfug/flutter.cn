const gulp = require('gulp');
const replace = require('gulp-replace');

// 去掉中文标点与中文间的空格
gulp.task('remove-space', () => {
  return gulp.src(['../../_site/**/*.html'])
    .pipe(replace(/([\u3000-\u303F\u4e00-\u9fa5\uF900-\uFFEF])\s+(?=[\u3000-\u303F\u4e00-\u9fa5\uF900-\uFFEF])/gs, '$1'))
    .pipe(gulp.dest('../../_site'));
});

// 匹配替换目录相关格式
gulp.task('mark-side-toc', () => {
  const tocRegexp = /<li class="toc-entry (nav-item )?toc-h(\d)"><a (class="nav-link" )?href="#(.*?)">(?!.*[\u4e00-\u9fa5])(.*?)<\/a><\/li>\n.*>(?=.*[\u4e00-\u9fa5])(.*?)<\/a>/g;
  return gulp.src(['../../_site/**/*.html'])
    .pipe(replace(tocRegexp, `<li class="toc-entry $1toc-h$2"><a $3href="#$4"><t>$5</t><t>$6</t></a>`))
    .pipe(gulp.dest('../../_site'));
});
