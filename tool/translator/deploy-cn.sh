#!/usr/bin/env bash

set -x
set -e

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

bundle install

bundle exec jekyll build

cp -r tool/translator/assets/*  _site/assets/

npm i -g @awesome-fe/translate

nt inject '_site/**/*.html' -c /assets/translator/css/translator.css -s /assets/translator/js/translator.js -m /Users/twer/dev/sdk/flutter-docs-cn/tool/translator/url-map.json -t /Users/twer/dev/sdk/flutter-docs-cn/tool/translator/text-map.json

nt mark '_site/**/*.html'

nt inject '_site/**/*.svg' -t /Users/twer/dev/sdk/flutter-docs-cn/tool/translator/text-map.json

rm -rf /tmp/flutter-docs-cn/

git clone https://asnowwolf:${GITHUB_ACCESS_TOKEN}@github.com/cfug/flutter.cn-prebuilt.git /tmp/flutter-docs-cn

cp -r _site/* /tmp/flutter-docs-cn/

cd /tmp/flutter-docs-cn

git init
git add .
git commit --allow-empty -am "${commitMessage}"

git push -u -f origin master

cd -
