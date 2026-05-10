#!/usr/bin/bash

cd tool/host-redirect
npm install
npm run test
npm run build

cd -
cp ./tool/host-redirect/build/host-redirect.min.js ./sites/docs/web/assets/js/host-redirect.min.js
