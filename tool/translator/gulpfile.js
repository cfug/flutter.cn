const gulp = require('gulp');
const replace = require('gulp-replace');
const rimraf = require('rimraf');

gulp.task('clean', (done) => {
  rimraf('_site/*', {}, done);
});
gulp.task('copy-all', ['clean'], () => {
  return gulp.src('../../_site/**/*.*')
      .pipe(gulp.dest('./_site/'));
});

gulp.task('prepare-assets', ['copy-all'], () => {
  return gulp.src('./assets/**/*.*')
      .pipe(gulp.dest('_site/assets/'));
});

gulp.task('translate', ['prepare-assets'], () => {
  return gulp.src('./_site/**/*.html')
  // 添加 translator
      .pipe(replace(/<\/body>/im, '  <script async="" defer="" src="/assets/js/translator.js"></script>\n</body>'))
      .pipe(replace(/<\/head>/im, '  <link href="/assets/css/translator.css" rel="stylesheet">\n  </head>'))
          // 替换 GA UA id
      .pipe(replace(/UA-67589403-1/gim, 'UA-122680122-3'))
      // 处理被墙的 CDN
      .pipe(replace(/https:\/\/fonts.googleapis.com\/icon\?family=Material\+Icons/gim, '/assets/css/material-icons.css'))
      .pipe(replace(/https:\/\/fonts.googleapis.com\/css\?family=Source\+Code\+Pro%7CRoboto:500,400italic,300,400/gim, '/assets/css/material-roboto-italic.css'))
      .pipe(replace(/https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/jquery\/3.2.1\/jquery.min.js/gim, '/assets/js/jquery.min.js'))
      .pipe(replace(/https:\/\/maxcdn.bootstrapcdn.com\/bootstrap\/3.3.4\/js\/bootstrap.min.js/gim, '/assets/js/bootstrap.min.js'))
      .pipe(replace(/https:\/\/maxcdn.bootstrapcdn.com\/font-awesome\/4.5.0\/css\/font-awesome.min.css/gim, '/assets/css/font-awesome.min.css'))
      .pipe(replace(/\/\/survey.g.doubleclick.net\/async_survey\?site=at3ul57xpub2vk3oxt2ytw365i/gim, '/assets/js/async_survey.js'))
      // 加翻译指令
      .pipe(replace(/<(span|a|t)\b([^<]*?)<\/\1>(\s*)<\1\b([^<]*?)<\/\1>/gim, addTranslationDirectives))
      .pipe(replace(/<(h\d|p|header)\b([^<]*?)<\/\1>(\s*)<\1\b([^<]*?)<\/\1>/gim, addTranslationDirectives))
      .pipe(replace(/<(div)\b(.*?)<\/\1>(\s*)<\1\b(.*?)<\/\1>/gim, addTranslationDirectives))
      .pipe(gulp.dest('_site/'));
});

gulp.task('default', ['translate']);

function containsChinese(text) {
  return text.search(/[\u4e00-\u9fa5]/gm) !== -1;
}

function containsTranslationResult(text) {
  return text.search(/\btranslation-result\b/gm) !== -1;
}

function addTranslationDirectives(all, _1, _2, _3, _4) {
  if (!containsTranslationResult(_4) && !containsChinese(_2) && containsChinese(_4)) {
    return `<${_1} translation-result${_4}</${_1}>${_3}<${_1} translation-origin="off"${_2}</${_1}>`;
  } else {
    return all;
  }
}
