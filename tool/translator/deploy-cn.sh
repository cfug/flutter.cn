#!/usr/bin/env bash

set -x
set -e

commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

bundle exec jekyll build

cd `dirname $0`

npm install

npm start

rm -fr prebuilt

git clone git@github.com:cfug/flutter.cn-prebuilt.git prebuilt

cp -r _site/* ./prebuilt/

cd ./prebuilt

git add .
git commit --allow-empty -am "${commitMessage}"

git push

cd -
