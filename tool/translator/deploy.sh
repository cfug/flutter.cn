#!/usr/bin/env bash

set -x
set -e

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

cd `dirname $0`

git clone https://asnowwolf:${GITHUB_ACCESS_TOKEN}@github.com/cfug/flutter.cn-prebuilt.git ./prebuilt

cp -r _site/* prebuilt

cd prebuilt

git add .
git commit -m "${commitSha} - ${commitMessage}"

git push
