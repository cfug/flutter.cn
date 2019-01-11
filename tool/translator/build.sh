#!/usr/bin/env bash

set -x
set -e

cd `dirname $0`

npm install

npm run preprocess

cd -

bundle install

bundle exec jekyll build

cd `dirname $0`

npm run postprocess

cd -
