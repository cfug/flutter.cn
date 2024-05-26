#!/usr/bin/bash

cd tool/host-redirect
npm install
npm run build

cd -
cp ./tool/host-redirect/build/host-redirect.min.js ./src/content/assets/js/host-redirect.min.js

git init
git config --global user.name "cfug-dev"
git config --global user.email "cfug-dev@googlegroups.com"

git add ./src/content/assets/js/host-redirect.min.js
git commit -m "[sync] Update: host-redirect.min.js"
git push -u -f