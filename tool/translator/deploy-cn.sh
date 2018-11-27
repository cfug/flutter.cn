#!/usr/bin/env bash

set -x
set -e

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

bundle install

cd `dirname $0`

# 从源文件中把中文所对应的英文剃掉
gulp preprocess

cd -

bundle exec jekyll build

cd `dirname $0`

npm install

gulp translate

if [[ ! -d "/tmp/flutter-docs-cn" ]]
then
    git clone git@github.com:cfug/flutter.cn-prebuilt.git /tmp/flutter-docs-cn
fi

cp -r _site/* /tmp/flutter-docs-cn/
cp CNAME /tmp/flutter-docs-cn/

cd /tmp/flutter-docs-cn

git init
git add .
git commit --allow-empty -am "${commitMessage}"

git push -f -u origin master

cd -
