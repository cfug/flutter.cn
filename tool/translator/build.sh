#!/usr/bin/env bash

set -x
set -e

bundle exec jekyll build

cp -r tool/translator/assets/*  _site/assets/

npm i -g @awesome-fe/translate@0.3.4

nt inject '_site/**/*.html' -c /assets/translator/css/translator.css -s /assets/translator/js/translator.js -m ./tool/translator/url-map.json -t ./tool/translator/text-map.json

nt mark '_site/**/*.html'

nt inject '_site/**/*.svg' -t ./tool/translator/text-map.json
