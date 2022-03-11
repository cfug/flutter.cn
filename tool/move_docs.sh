#!/usr/bin/bash -e
DOCS=src/docs

if [ -d "$DOCS" ]; then
  echo "$DOCS already exist, Skip moving."
  exit 0
fi

if [ -f "$DOCS" ]; then
  echo "$DOCS already exist, Skip moving."
  exit 0
fi

cd src
mkdir docs
mv -- */ docs/
mv docs/_* ./
mv docs/about ./
mv docs/community ./
mv docs/posts ./
cp -r docs/assets ./
rm assets/images/shared/brand
rm docs/assets/images/shared/brand
ln -s ../../../../site-shared/src/_assets/image assets/images/shared/brand
ln -s ../../../../../site-shared/src/_assets/image docs/assets/images/shared/brand
rm assets/js/vendor
rm docs/assets/js/vendor
ln -s ../../../site-shared/src/_assets/vendor assets/js/vendor
ln -s ../../../../site-shared/src/_assets/vendor docs/assets/js/vendor
ls -al
cd ..
