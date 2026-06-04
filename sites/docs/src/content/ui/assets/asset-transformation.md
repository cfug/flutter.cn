---
# title: Transforming assets at build time
title: 在构建时转换资源
# description: How to set up automatic transformation of images (and other assets) in your Flutter app.
description: 如何在你的 Flutter 应用中设置图片（及其他资源）的自动转换。
# shortTitle: Asset transformation
shortTitle: 资源转换
ai-translated: true
---

You can configure your project to automatically transform assets
at build time using compatible Dart packages.

你可以使用兼容的 Dart 包配置项目，在构建时自动转换资源。

## Specifying asset transformations

## 指定资源转换

In the `pubspec.yaml` file, list the assets to be transformed and the associated
transformer package.

在 `pubspec.yaml` 文件中，列出要转换的资源及关联的转换器包。

```yaml
flutter:
  assets:
    - path: assets/logo.svg
      transformers:
        - package: vector_graphics_compiler
```

With this configuration, `assets/logo.svg` is transformed by the
[`vector_graphics_compiler`][] package as it is copied to the build output. This
package precompiles SVG files into an optimized binary files that can be
displayed using the [`vector_graphics`][] package, like so:

使用此配置，`assets/logo.svg` 在复制到构建输出时会由 [`vector_graphics_compiler`][] 包进行转换。该包将 SVG 文件预编译为优化的二进制文件，可使用 [`vector_graphics`][] 包显示，如下所示：

<?code-excerpt "ui/assets_and_images/lib/logo.dart (TransformedAsset)"?>
```dart
import 'package:vector_graphics/vector_graphics.dart';

const Widget logo = VectorGraphic(loader: AssetBytesLoader('assets/logo.svg'));
```

### Passing arguments to asset transformers

### 向资源转换器传递参数

To pass a string of arguments to an asset transformer,
also specify that in the pubspec:

要向资源转换器传递参数字符串，也需在 pubspec 中指定：

```yaml
flutter:
  assets:
    - path: assets/logo.svg
      transformers:
        - package: vector_graphics_compiler
          args: ['--tessellate', '--font-size=14']
```

### Chaining asset transformers

### 链式资源转换器

Asset transformers can be chained and are applied in
the order they are declared.
Consider the following example using imaginary packages:

资源转换器可以链式组合，并按声明顺序应用。考虑以下使用假想包的示例：

```yaml
flutter:
  assets:
    - path: assets/bird.png
      transformers:
        - package: grayscale_filter
        - package: png_optimizer
```

Here, `bird.png` is transformed by the `grayscale_filter` package.
The output is then transformed by the `png_optimizer` package before being
bundled into the built app.

此处，`bird.png` 先由 `grayscale_filter` 包转换，输出再由 `png_optimizer` 包转换，然后才打包进构建后的应用。

## Writing asset transformer packages

## 编写资源转换器包

An asset transformer is a Dart [command-line app][] that is invoked with
`dart run` with at least two arguments: `--input`, which contains the path to
the file to transform and `--output`, which is the location where the
transformer code must write its output to.

资源转换器是一个通过 `dart run` 调用的 Dart [命令行应用][command-line app]，至少需要两个参数：`--input` 包含要转换的文件路径，`--output` 是转换器代码必须写入输出的位置。

If the transformer finishes with a non-zero exit code, the application build
fails with an error message explaining that transformation of the asset failed.
Anything written to the [`stderr`] stream of the process by the transformer is
included in the error message.

如果转换器以非零退出码结束，应用构建将失败，并附带说明资源转换失败的错误消息。转换器写入进程 [`stderr`] 流的任何内容都会包含在错误消息中。

During the invocation of the transformer, the `FLUTTER_BUILD_MODE`
environment variable will be set to the CLI name of the build mode being used.
For example, if you run your app with `flutter run -d macos --release`, then
`FLUTTER_BUILD_MODE` will be set to `release`.

在调用转换器期间，`FLUTTER_BUILD_MODE` 环境变量将设为所使用构建模式的 CLI 名称。例如，如果你使用 `flutter run -d macos --release` 运行应用，则 `FLUTTER_BUILD_MODE` 将设为 `release`。

## Sample

## 示例

For a sample Flutter project that uses asset transformation and includes a custom
Dart package that is used as a transformer, check out the
[asset_transformers project in the Flutter samples repo][].

要查看使用资源转换并包含用作转换器的自定义 Dart 包的 Flutter 示例项目，请查看 [Flutter 示例仓库中的 asset_transformers 项目][asset_transformers project in the Flutter samples repo]。

[command-line app]: {{site.dart-site}}/tutorials/server/cmdline
[asset_transformers project in the Flutter samples repo]: {{site.repo.samples}}/tree/main/asset_transformation
[`vector_graphics_compiler`]: {{site.pub}}/packages/vector_graphics_compiler
[`vector_graphics`]: {{site.pub-pkg}}/vector_graphics
[`stderr`]: {{site.api}}/flutter/dart-io/Process/stderr.html
