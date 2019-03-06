#!/usr/bin/env bash

set -x
set -e

bundle install

bundle exec jekyll build
