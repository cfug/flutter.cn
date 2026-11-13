---
# title: Raw images on Web uses correct origin and colors
title: Web 上的原始图像使用正确的原点和颜色
# description: >
#   Raw images directly decoded by calling the Web engine functions now
#   uses the correct pixel format and starts from the top left corner.
description: >
  通过调用 Web 引擎函数直接解码的原始图像，
  现在会使用正确的像素格式，并从左上角开始。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

How raw images are rendered on Web has been corrected
and is now consistent with that on other platforms.
This breaks legacy apps that had to feed incorrect data
to `ui.ImageDescriptor.raw` or `ui.decodeImageFromPixels`,
causing the resulting images to be upside-down
and incorrectly colored
(whose red and blue channels are swapped.)

Web 上原始图像的渲染方式已修正，
现在与其他平台一致。
这会破坏那些必须向 `ui.ImageDescriptor.raw` 或 `ui.decodeImageFromPixels`
传入错误数据的旧应用。
那些数据会让得到的图像上下颠倒，并且颜色不正确
（红蓝通道被互换）。

## Context

## 背景

The "pixel stream" that Flutter uses internally
has always been defined as the same format:
for each pixel, four 8-bit channels are packed in the order defined
by a `format` argument, then grouped in a row,
from left to right, then rows from top to bottom.

Flutter 内部使用的「像素流」一直采用同一种格式：
每个像素由四个 8 位通道按 `format` 参数规定的顺序打包，
再按从左到右组成一行，然后各行从上到下排列。

However, Flutter for Web, or more specifically, the HTML renderer,
used to implement it in a wrong way
due to incorrect understanding of the BMP format specification.
As a result, if the app or library uses
`ui.ImageDescriptor.raw` or `ui.decodeImageFromPixels`,
it had to feed pixels from bottom to top and swap their red and blue channels
(for example, with the `ui.PixelFormat.rgba8888` format,
the first 4 bytes of the data were considered the blue, green,
red, and alpha channels of the first pixel instead.)

不过，Flutter for Web，更具体地说是 HTML 渲染器，
曾经因为对 BMP 格式规范的理解有误而错误地实现了它。
因此，如果应用或库使用 `ui.ImageDescriptor.raw` 或 `ui.decodeImageFromPixels`，
就必须自下而上传入像素，并互换红蓝通道。
例如，对于 `ui.PixelFormat.rgba8888` 格式，
数据的前 4 个字节会被当成第一个像素的蓝、绿、红和 alpha 通道。

This bug has been fixed by [engine#29593][],
but apps and libraries have to correct how their data are generated.

该 bug 已由 [engine#29593][engine#29593] 修复，
但应用和库必须更正数据的生成方式。

## Description of change

## 改动说明

The `pixels` argument of `ui.ImageDescriptor.raw` or `ui.decodeImageFromPixels`
now uses the correct pixel order described by `format`,
and originates from the top left corner.

`ui.ImageDescriptor.raw` 或 `ui.decodeImageFromPixels` 的 `pixels` 参数
现在会使用 `format` 所描述的正确像素顺序，
并且从左上角开始。

Images rendered by directly calling these two functions
Legacy code that invokes these functions directly might
find their images upside down and colored incorrectly.

直接调用这两个函数所渲染的图像。
直接调用这些函数的旧代码可能会发现图像上下颠倒，并且颜色不正确。

## Migration guide

## 迁移指南

If the app uses the latest version of Flutter and experiences this situation,
the most direct solution is to manually flip the image, and use the alternate
pixel format. However, this is unlikely the most optimized solution,
since such pixel data are usually constructed from other sources,
allowing flipping during the construction process.

如果应用使用的是最新版本的 Flutter 并遇到这种情况，
最直接的办法是手动翻转图像，并改用另一种像素格式。
不过这多半不是最优做法，
因为这类像素数据通常来自其他数据源，
可以在构建过程中完成翻转。

Code before migration:

迁移前的代码：

```dart
import 'dart:typed_data';
import 'dart:ui' as ui;

// Parse `image` as a displayable image.
//
// Each byte in `image` is a pixel channel, in the order of blue, green, red,
// and alpha, starting from the bottom left corner and going row first.
Future<ui.Image> parseMyImage(Uint8List image, int width, int height) async {
  final ui.ImageDescriptor descriptor = ui.ImageDescriptor.raw(
    await ui.ImmutableBuffer.fromUint8List(image),
    width: width,
    height: height,
    pixelFormat: ui.PixelFormat.rgba8888,
  );
  return (await (await descriptor.instantiateCodec()).getNextFrame()).image;
}
```

Code after migration:

迁移后的代码：

```dart
import 'dart:typed_data';
import 'dart:ui' as ui;

Uint8List verticallyFlipImage(Uint8List sourceBytes, int width, int height) {
  final Uint32List source = Uint32List.sublistView(ByteData.sublistView(sourceBytes));
  final Uint32List result = Uint32List(source.length);
  int sourceOffset = 0;
  int resultOffset = 0;
  for (final int row = height - 1; row >= 0; row -= 1) {
    sourceOffset = width * row;
    for (final int col = 0; col < width; col += 1) {
      result[resultOffset] = source[sourceOffset];
      resultOffset += 1;
      sourceOffset += 1;
    }
  }
  return Uint8List.sublistView(ByteData.sublistView(sourceBytes))
}

Future<ui.Image> parseMyImage(Uint8List image, int width, int height) async {
  final Uint8List correctedImage = verticallyFlipImage(image, width, height);
  final ui.ImageDescriptor descriptor = ui.ImageDescriptor.raw(
    await ui.ImmutableBuffer.fromUint8List(correctedImage),
    width: width,
    height: height,
    pixelFormat: ui.PixelFormat.rgba8888,
  );
  return (await (await descriptor.instantiateCodec()).getNextFrame()).image;
}
```

A trickier situation is when you're writing a library,
and you want this library to work on both the most recent Flutter
and a pre-patch one.
In that case, you can decide whether the behavior has been changed
by letting it decode a single pixel first.

更棘手的情况是你在编写一个库，
并且希望这个库同时能在最新的 Flutter 和修复之前的版本上工作。
这时，可以先让它解码一个像素，
以此来判断行为是否已经改变。

Code after migration:

迁移后的代码：

```dart
Uint8List verticallyFlipImage(Uint8List sourceBytes, int width, int height) {
  // Same as the example above.
}

late Future<bool> imageRawUsesCorrectBehavior = (() async {
  final ui.ImageDescriptor descriptor = ui.ImageDescriptor.raw(
    await ui.ImmutableBuffer.fromUint8List(Uint8List.fromList(<int>[0xED, 0, 0, 0xFF])),
    width: 1, height: 1, pixelFormat: ui.PixelFormat.rgba8888);
  final ui.Image image = (await (await descriptor.instantiateCodec()).getNextFrame()).image;
  final Uint8List resultPixels = Uint8List.sublistView(
    (await image.toByteData(format: ui.ImageByteFormat.rawStraightRgba))!);
  return resultPixels[0] == 0xED;
})();

Future<ui.Image> parseMyImage(Uint8List image, int width, int height) async {
  final Uint8List correctedImage = (await imageRawUsesCorrectBehavior) ?
    verticallyFlipImage(image, width, height) : image;
  final ui.ImageDescriptor descriptor = ui.ImageDescriptor.raw(
    await ui.ImmutableBuffer.fromUint8List(correctedImage), // Use the corrected image
    width: width,
    height: height,
    pixelFormat: ui.PixelFormat.bgra8888, // Use the alternate format
  );
  return (await (await descriptor.instantiateCodec()).getNextFrame()).image;
}
```

## Timeline

## 时间线

Landed in version: 2.9.0-0.0.pre<br>
合入版本：2.9.0-0.0.pre<br>
In stable release: 2.10

进入稳定版：2.10

## References

## 参考资料

API documentation:

API 文档：

* [`decodeImageFromPixels`][]

  [`decodeImageFromPixels`][`decodeImageFromPixels`]

* [`ImageDescriptor.raw`][]

  [`ImageDescriptor.raw`][`ImageDescriptor.raw`]

Relevant issues:

相关 issue：

* [Web: Regression in Master - PDF display distorted due to change in BMP Encoder][]

  [Web：Master 上的回归——BMP 编码器改动导致 PDF 显示扭曲][Web: Regression in Master - PDF display distorted due to change in BMP Encoder]

* [Web: ImageDescriptor.raw flips and inverts images (partial reason included)][]

  [Web：ImageDescriptor.raw 会翻转并反色图像（附部分原因）][Web: ImageDescriptor.raw flips and inverts images (partial reason included)]

Relevant PRs:

相关 PR：

* [Web: Reland: Fix BMP encoder][]

  [Web：重新合入：修复 BMP 编码器][Web: Reland: Fix BMP encoder]

* [Clarify ImageDescriptor.raw pixel order and add version detector][]

  [澄清 ImageDescriptor.raw 的像素顺序并增加版本检测][Clarify ImageDescriptor.raw pixel order and add version detector]

[`decodeImageFromPixels`]: {{site.api}}/flutter/dart-ui/decodeImageFromPixels.html
[`ImageDescriptor.raw`]: {{site.api}}/flutter/dart-ui/ImageDescriptor/ImageDescriptor.raw.html

[Web: Regression in Master - PDF display distorted due to change in BMP Encoder]: {{site.repo.flutter}}/issues/93615
[Web: ImageDescriptor.raw flips and inverts images (partial reason included)]: {{site.repo.flutter}}/issues/89610

[engine#29593]: {{site.repo.engine}}/pull/29593
[Web: Reland: Fix BMP encoder]: {{site.repo.engine}}/pull/29593
[Clarify ImageDescriptor.raw pixel order and add version detector]: {{site.repo.engine}}/pull/30343
