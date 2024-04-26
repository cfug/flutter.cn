#!/usr/bin/bash

cd src

# Make a copy of assets.
rm content/assets/js/vendor
ln -s ../../../site-shared/src/_assets/vendor content/assets/js/vendor

cd ..

# Replace `site.url` to `site.main-url` in shared files.
# Note: The below `sed` command can only run successfully on Linux. Add `''` between `-i` and `'s` on macOS.
find site-shared -type f -not -path '*/\.*' -exec sed -i 's|site.url|site.main-url|g' {} \;


# ------------------ old ------------------------
# DOCS=src/docs

# if [ -d "$DOCS" ]; then
#   echo "$DOCS already exist, Skip moving."
#   exit 0
# fi

# if [ -f "$DOCS" ]; then
#   echo "$DOCS already exist, Skip moving."
#   exit 0
# fi

# cd src
# # mkdir docs

# # Move all directories to /docs.
# for folder in */; do
#   if [[ $folder != "docs/" && $folder != _* ]]; then
#     echo "Moving folder $folder to docs/$folder..."
#     mv "$folder" docs/
#   fi
# done
# # Move all markdown files to /docs.
# mv ./*.md docs/

# # Move out CN site directories.
# mv docs/about ./
# mv docs/community ./
# mv docs/posts ./
# # Move out CN site files.
# mv docs/disclaimer.md ./

# # Make a copy of assets.
# rm assets/images/shared/brand
# rm assets/js/vendor
# cp -r assets ./
# ln -s ../../../../site-shared/src/_assets/image assets/images/shared/brand
# ln -s ../../../site-shared/src/_assets/vendor assets/js/vendor
# ln -s ../../../../../site-shared/src/_assets/image docs/assets/images/shared/brand
# ln -s ../../../../site-shared/src/_assets/vendor docs/assets/js/vendor

# cd ..

# # Replace `site.url` to `site.main-url` in shared files.
# # Note: The below `sed` command can only run successfully on Linux. Add `''` between `-i` and `'s` on macOS.
# find site-shared -type f -not -path '*/\.*' -exec sed -i 's|site.url|site.main-url|g' {} \;
# ------------------------------------------