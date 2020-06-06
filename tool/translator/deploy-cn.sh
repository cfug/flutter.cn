#!/usr/bin/env bash

set -x
set -e

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

rm -rf /tmp/site-flutter.cn/ || true

git clone https://chenglu:${CHENGLU_DEPLOY_KEY}@github.com/chenglu/site-flutter.cn /tmp/site-flutter.cn

cp -r _site/* /tmp/site-flutter.cn/

cd /tmp/site-flutter.cn

git init
git add .

git config --global user.name "travis-ci deploy"
git config --global user.email "cfug-dev@googlegroups.com"

git commit --allow-empty -am "${commitMessage}"

git push -u -f origin master

cd -
