#!/usr/bin/env bash

set -x
set -e

repo=cfug/docs.flutter.cn
commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

rm -rf /tmp/cfug/docs.flutter.cn/ || true

git clone https://$DEPLOY_USER:$DEPLOY_TOKEN@github.com/$repo.git /tmp/$repo

cp -r _site/* /tmp/$repo/docs

cd /tmp/$repo

git init
git add .

git config --global user.name "github actions deploy"
git config --global user.email "cfug-dev@googlegroups.com"

git commit --allow-empty -am "${commitMessage}"

git push -u -f origin main

cd -
