#!/usr/bin/bash

mkdir -p _site/assets/
cp -r tool/translator/assets/* _site/assets/
cp tool/translator/robots.txt _site
cd tool/translator

npm install
npx gulp mark-side-toc
npx gulp mark-side-level-title

# !(about|community|disclaimer|posts|tutorials)/**/!(*_cn).html
npx nt inject '../../_site/!(about|community|disclaimer|posts|tutorials)/**/!(*_cn).html' -c /assets/translator/css/translator.css -s /assets/translator/js/translator.js -m ./url-map.json -t ./text-map.json
npx nt export '../../_site/!(about|community|disclaimer|posts|tutorials)/**/!(*_cn).html'  --mono

# community/china/!(*_cn).html
npx nt inject '../../_site/community/china/!(*_cn).html' -c /assets/translator/css/translator.css -s /assets/translator/js/translator.js -m ./url-map.json -t ./text-map.json
npx nt export '../../_site/community/china/!(*_cn).html'  --mono

# */index.html
npx nt inject '../../_site/*/index.html' -c /assets/translator/css/translator.css -s /assets/translator/js/translator.js -m ./url-map.json -t ./text-map.json
npx nt export '../../_site/*/index.html'  --mono

# index.html
npx nt inject '../../_site/index.html' -c /assets/translator/css/translator.css -s /assets/translator/js/translator.js -m ./url-map.json -t ./text-map.json
npx nt export '../../_site/index.html' --mono
npx gulp remove-space
cd -
