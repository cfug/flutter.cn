#!/usr/bin/env bash

set -x
set -e

bundle exec jekyll build

cp -r tool/translator/assets/*  _site/assets/

cp tool/translator/robots.txt _site

cd tool/translator

npm i

npx gulp mark-side-toc

npx nt inject '../../_site/**/*.html' -c /assets/translator/css/translator.css -s /assets/translator/js/translator.js -m ./url-map.json -t ./text-map.json

npx nt mark '../../_site/**/*.html'

npx gulp remove-space

cd -
