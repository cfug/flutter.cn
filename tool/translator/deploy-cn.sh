#!/usr/bin/env bash

set -x
set -e

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

rm -rf /tmp/flutter.cn-prebuilt/ || true

git clone https://asnowwolf:${GITHUB_ACCESS_TOKEN}@github.com/cfug/flutter.cn-prebuilt.git /tmp/flutter.cn-prebuilt

cp -r _site/* /tmp/flutter.cn-prebuilt/

cd /tmp/flutter.cn-prebuilt

git init
git add .
git commit --allow-empty -am "${commitMessage}"

git push -u -f origin master

cd -
