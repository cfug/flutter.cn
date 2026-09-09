#!/usr/bin/bash

readonly BUILD_DIR="sites/docs/build/jaspr"
readonly TRANSLATOR_DIR="tool/translator"

mkdir -p "$BUILD_DIR/assets/"
cp -r "$TRANSLATOR_DIR/assets/"* "$BUILD_DIR/assets/"
cp "$TRANSLATOR_DIR/robots.txt" "$BUILD_DIR"

cd "$TRANSLATOR_DIR"

npm install

# 翻译前格式调整 (tool/translator/build.sh)
npx gulp mark-side-toc
npx gulp mark-side-level-title

# 需要翻译的目标文件模式（相对 $BUILD_DIR）
targets=(
  "!(about|community|disclaimer|posts|tutorials)/**/!(*_cn).html"
  "community/china/index.html"
  "*/index.html"
  "index.html"
)

# 批量执行 inject 和 export
for target in "${targets[@]}"; do
  npx nt inject "../../$BUILD_DIR/$target" \
    -c /assets/translator/css/translator.css \
    -s /assets/translator/js/translator.js \
    -m ./url-map.json \
    -t ./text-map.json
  npx nt export "../../$BUILD_DIR/$target" --mono
done

# 清理空格
npx gulp remove-space

cd -
