#!/usr/bin/env bash

set -x
set -e

repo=cfug/docs.flutter.cn
commitSha=$(git rev-parse --short HEAD)
commitMessage=$(git log --oneline -n 1)

rm -rf ./tmp/$repo/ || true

# Clone
git clone https://$DEPLOY_USER:$DEPLOY_TOKEN@github.com/$repo.git ./tmp/$repo

cd ./tmp/$repo

git init
git config --global user.name "github actions deploy"
git config --global user.email "cfug-dev@googlegroups.com"

mkdir -p docs

# Empty all files in docs
rm -rf docs/* || true

git add .
git commit --allow-empty -am "Delete: Empty all files in docs - ${commitMessage}"

# Redeployment to docs
cp -r ../../../_site/* docs/

git add .
git commit --allow-empty -am "${commitMessage}"

# Push to main
git push -u -f origin main

cd -