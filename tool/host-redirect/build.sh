#!/usr/bin/bash

cd tool/host-redirect
npm install
npm run build

cd -
cp ./tool/host-redirect/build/host-redirect.min.js ./src/content/assets/js/host-redirect.min.js
