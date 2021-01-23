#!/usr/bin/env bash

set -x
set -e

bundle exec jekyll build

cp -r tool/translator/assets/* _site/assets/

cp tool/translator/robots.txt _site

cd tool/translator

export NODE_OPTIONS=–max_old_space_size=8192

npm i

npx gulp mark-side-toc

npx --node-arg --max-old-space-size=2048 nt inject '../../_site/!(community|tutorials)/**/!(*_cn).html' -c /assets/translator/css/translator.css -s /assets/translator/js/translator.js -m ./url-map.json -t ./text-map.json

npx --node-arg --max-old-space-size=2048 nt mark '../../_site/!(community|tutorials)**/!(*_cn).html'

npx gulp remove-space

cd -
