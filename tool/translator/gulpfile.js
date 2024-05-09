const gulp = require('gulp');
const replace = require('gulp-replace');

// 为了翻译工具能正确匹配，
// 需要为一些结构格式做出调整。

// 去掉中文标点与中文间的空格
gulp.task('remove-space', () => {
  return gulp.src(['../../_site/**/*.html'])
    .pipe(replace(/([\u3000-\u303F\u4e00-\u9fa5\uF900-\uFFEF])\s+(?=[\u3000-\u303F\u4e00-\u9fa5\uF900-\uFFEF])/gs, '$1'))
    .pipe(gulp.dest('../../_site'));
});

// 匹配替换目录相关格式
gulp.task('mark-side-toc', () => {
  // 宽显示屏右侧目录 正则匹配
  const wideRegexp = /<li class="toc-entry nav-item toc-h(\d)">\s*<a class="nav-link" href="#(.*?)">(?!.*[\u4e00-\u9fa5])(.*?)<\/a>\s*<\/li>\s*<li class="toc-entry nav-item toc-h(\d)">\s*<a class="nav-link" href="#(.*?)">(?=.*[\u4e00-\u9fa5])(.*?)<\/a>/g;
  // 移动端显示屏顶部目录 正则匹配
  const mobileRegexp = /<li class="toc-entry toc-h(\d)">\s*<a href="#(.*?)">(?!.*[\u4e00-\u9fa5])(.*?)<\/a>\s*<\/li>\s*<li class="toc-entry toc-h(\d)">\s*<a href="#(.*?)">(?=.*[\u4e00-\u9fa5])(.*?)<\/a>/g;

  return gulp.src(['../../_site/**/*.html'])
    // 宽显示屏右侧目录
    .pipe(
      replace(wideRegexp, (match, p1, p2, p3, p4, p5, p6) => {
        // 注意：不能以 </li> 结尾，避免分级标题混乱
        return `<li class="toc-entry nav-item toc-h${p1}"><a class="nav-link" href="#${p2}"><t>${p3}</t><t>${p6}</t></a>`;
      })
    )
    // 移动端显示屏顶部目录
    .pipe(
      replace(mobileRegexp, (match, p1, p2, p3, p4, p5, p6) => {
        // 注意：不能以 </li> 结尾，避免分级标题混乱
        return `<li class="toc-entry toc-h${p1}"><a href="#${p2}"><t>${p3}</t><t>${p6}</t></a>`;
      })
    )
    .pipe(gulp.dest('../../_site'));
});

// 匹配替换正文分级标题相关格式
gulp.task('mark-side-level-title', () => {
  // 正文分级标题 正则匹配
  const titleRegexp = /<div class="header-wrapper">\s*<h(\d) id="(.*?)">(?!.*[\u4e00-\u9fa5])(.*?)<\/h(\d)>\s*<a class="heading-link" href="#(.*?)" aria-label="(.*?)">#<\/a>\s*<\/div>\s*<div class="header-wrapper">\s*<h(\d) id="(.*?)">(?=.*[\u4e00-\u9fa5])(.*?)<\/h(\d)>\s*<a class="heading-link" href="#(.*?)" aria-label="(.*?)">#<\/a>\s*<\/div>/g;
  // 正文分级标题(no_toc) 正则匹配
  const titleNoTocRegexp = /<div class="header-wrapper">\s*<h(\d) class="no_toc" id="(.*?)">(?!.*[\u4e00-\u9fa5])(.*?)<\/h(\d)>\s*<a class="heading-link" href="#(.*?)" aria-label="(.*?)">#<\/a>\s*<\/div>\s*<div class="header-wrapper">\s*<h(\d) class="no_toc" id="(.*?)">(?=.*[\u4e00-\u9fa5])(.*?)<\/h(\d)>\s*<a class="heading-link" href="#(.*?)" aria-label="(.*?)">#<\/a>\s*<\/div>/g;

  return gulp.src(['../../_site/**/*.html'])
    // 正文分级标题
    .pipe(
      replace(titleRegexp, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12) => {
        return `
          <div class="header-wrapper">
            <h${p1} id="${p2}">${p3}</h${p1}><h${p1} id="${p2}">${p9}</h${p1}>
            <a class="heading-link" href="#${p5}" aria-label="${p6}">#</a>
          </div>
        `;
      })
    )
    // 正文分级标题(no_toc)
    .pipe(
      replace(titleNoTocRegexp, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12) => {
        return `
          <div class="header-wrapper">
            <h${p1} class="no_toc" id="${p2}">${p3}</h${p1}><h${p1} class="no_toc" id="${p2}">${p9}</h${p1}>
            <a class="heading-link" href="#${p5}" aria-label="${p6}">#</a>
          </div>
        `;
      })
    )
    .pipe(gulp.dest('../../_site'));
});
