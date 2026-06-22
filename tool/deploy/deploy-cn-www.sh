#!/usr/bin/env bash

set -x
set -e

repo=cfug/www.flutter.cn
commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

rm -rf ./tmp/$repo/ || true

# Clone
git clone https://$DEPLOY_USER:$DEPLOY_TOKEN@github.com/$repo.git ./tmp/$repo

cd ./tmp/$repo

git init
git config --global user.name "github actions deploy"
git config --global user.email "cfug-dev@googlegroups.com"

mkdir -p www

# Empty all files in www
rm -rf www/* || true

# Redeployment to www
cp -r ../../../sites/www/build/jaspr/* www/

git add .
git commit --allow-empty -am "${commitMessage}"

# Push to main
git push -u -f origin main

cd -