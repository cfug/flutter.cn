const gulp = require('gulp');
const replace = require('gulp-replace');

// 为了翻译工具能正确匹配，
// 需要为一些结构格式做出调整。

// 适用路径
const gulpSrc = [
  '../../_site/**/*.html',
  '../../_site/!(about|community|disclaimer|posts|tutorials)/**/!(*_cn).html',
  '!../../_site/{about,disclaimer,posts}/**/*.html',
  '!../../_site/community/tutorials/**/*.html',
  '../../_site/community/china/index.html',
  '../../_site/*/index.html',
  '../../_site/index.html',
];

// 去掉中文标点与中文间的空格
gulp.task('remove-space', () => {
  return gulp.src(['../../_site/**/*.html'])
    .pipe(replace(/([\u3000-\u303F\u4e00-\u9fa5\uF900-\uFFEF])\s+(?=[\u3000-\u303F\u4e00-\u9fa5\uF900-\uFFEF])/gs, '$1'))
    .pipe(gulp.dest('../../_site'));
});

// 匹配替换目录相关格式
gulp.task('mark-side-toc', () => {
  // 宽显示屏右侧 / 移动端显示屏顶部 目录 正则匹配
  const wideRegexp = /<li>\s*<span class="sidenav-item">\s*<a href="#(.*?)">(?!.*[\u4e00-\u9fa5])(.*?)<\/a>\s*<\/span>\s*<\/li>\s*<li>\s*<span class="sidenav-item">\s*<a href="#(.*?)">(?=.*[\u4e00-\u9fa5])(.*?)<\/a>\s*<\/span>/g;

  return gulp.src(gulpSrc)
    // 宽显示屏右侧目录
    .pipe(
      replace(wideRegexp, (match, p1, p2, p3, p4, p5) => {
        // 注意：不能以 </li> 结尾，避免分级标题混乱
        return `<li><span class="sidenav-item"><a href="#${p1}"><t>${p2}</t><t>${p4}</t></a></span>`;
      })
    )
    .pipe(gulp.dest('../../_site'));
});

// 匹配替换正文分级标题相关格式
gulp.task('mark-side-level-title', () => {
  // 正文分级标题 正则匹配
  const titleRegexp = /<div class="header-wrapper">\s*<h(\d) id="(.*?)">(?!.*[\u4e00-\u9fa5])(.*?)<\/h\1>\s*<a class="heading-link" href="#(.*?)" aria-label="(.*?)">#<\/a>\s*<\/div>\s*<div class="header-wrapper">\s*<h\1 id="(.*?)">(?=.*[\u4e00-\u9fa5])(.*?)<\/h\1>\s*<a class="heading-link" href="#(.*?)" aria-label="(.*?)">#<\/a>\s*<\/div>/g;
  // 正文分级标题(no_toc) 正则匹配
  const titleNoTocRegexp = /<div class="header-wrapper">\s*<h(\d) class="no_toc" id="(.*?)">(?!.*[\u4e00-\u9fa5])(.*?)<\/h\1>\s*<a class="heading-link" href="#(.*?)" aria-label="(.*?)">#<\/a>\s*<\/div>\s*<div class="header-wrapper">\s*<h\1 class="no_toc" id="(.*?)">(?=.*[\u4e00-\u9fa5])(.*?)<\/h\1>\s*<a class="heading-link" href="#(.*?)" aria-label="(.*?)">#<\/a>\s*<\/div>/g;

  return gulp.src(gulpSrc)
    // 正文分级标题
    .pipe(
      replace(titleRegexp, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9) => {
        return `
          <div class="header-wrapper">
            <h${p1} id="${p2}">${p3}</h${p1}><h${p1} id="${p2}">${p7}</h${p1}>
            <a class="heading-link" href="#${p4}" aria-label="${p5}">#</a>
          </div>
        `;
      })
    )
    // 正文分级标题(no_toc)
    .pipe(
      replace(titleNoTocRegexp, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9) => {
        return `
          <div class="header-wrapper">
            <h${p1} class="no_toc" id="${p2}">${p3}</h${p1}><h${p1} class="no_toc" id="${p2}">${p7}</h${p1}>
            <a class="heading-link" href="#${p4}" aria-label="${p5}">#</a>
          </div>
        `;
      })
    )
    .pipe(gulp.dest('../../_site'));
});
