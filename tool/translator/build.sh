#!/usr/bin/env bash

set -x
set -e

bundle exec jekyll build --config _config.yml

cp -r tool/translator/assets/* _site/assets/
cp tool/translator/robots.txt _site

cd tool/translator
npm i
npx gulp mark-side-toc
npx nt inject '../../_site/!(about|community|disclaimer|posts|tutorials)/**/!(*_cn).html' -c /assets/translator/css/translator.css -s /assets/translator/js/translator.js -m ./url-map.json -t ./text-map.json
npx nt mark '../../_site/!(about|community|disclaimer|posts|tutorials)/**/!(*_cn).html'  --mono
npx nt inject '../../_site/*/index.html' -c /assets/translator/css/translator.css -s /assets/translator/js/translator.js -m ./url-map.json -t ./text-map.json
npx nt mark '../../_site/*/index.html'  --mono
# npx nt inject '../../_site/index.html' -c /assets/translator/css/translator.css -s /assets/translator/js/translator.js -m ./url-map.json -t ./text-map.json
# npx nt mark '../../_site/index.html' --mono
npx gulp remove-space
cd -
