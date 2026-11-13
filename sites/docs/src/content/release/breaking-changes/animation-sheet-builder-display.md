---
# title: Replace AnimationSheetBuilder.display with collate
title: 用 collate 替换 AnimationSheetBuilder.display
# description: >
#   AnimationSheetBuilder.display and sheetSize
#   are deprecated in favor of collate.
description: >
  AnimationSheetBuilder.display 和 sheetSize 已弃用，
  请改用 collate。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `AnimationSheetBuilder.display` and `sheetSize`
methods are deprecated, and should be replaced with
`AnimationSheetBuilder.collate`.

`AnimationSheetBuilder.display` 和 `sheetSize` 方法已弃用，
应替换为 `AnimationSheetBuilder.collate`。

## Context

## 上下文

[`AnimationSheetBuilder`][] is a testing utility
class that records frames of an animating widget,
and later composes the frames into a single
animation sheet for [golden testing][]. The old way
of composing involves `display` to list the images
into a table-like widget, adjusting the testing
surface with `sheetSize`, and capturing the table
widget for comparison. A new way, `collate`, has
been added that directly puts the frames together
into an image for comparison, which requires less
boilerplate code and outputs a smaller image without
compromise in quality. APIs for the old way are thus
deprecated.

[`AnimationSheetBuilder`][`AnimationSheetBuilder`] 是一个测试工具类，
它记录动画 widget 的帧，
随后把这些帧合成为单张动画表，用于 [golden 测试][golden testing]。
旧的合成方式是用 `display` 把图片排列成类似表格的 widget，
用 `sheetSize` 调整测试表面，再捕获该表格 widget 进行比较。
新增的 `collate` 会直接把各帧拼成一张图片用于比较，
所需样板代码更少，输出的图片更小，且质量没有损失。
因此旧方式的 API 已弃用。

The reason why `collate` outputs a smaller image,
is because the old way captures on a testing surface
with pixel ratio 3.0, which means it uses a 3x3 pixel
block of the exactly same color to represent 1 actual
pixel, making the image 9 times as large as necessary
(before PNG compression).

`collate` 输出的图片更小，
是因为旧方式在像素比为 3.0 的测试表面上捕获，
也就是用 3×3 的同色像素块表示 1 个实际像素，
使图片在 PNG 压缩前达到所需大小的 9 倍。

## Description of change

## 改动说明

The following changes have been made to the
[`AnimationSheetBuilder`][] class:

[`AnimationSheetBuilder`][`AnimationSheetBuilder`] 类做了以下改动：

* 'display' is deprecated and shouldn't be used

  「display」已弃用，不应再使用

* 'sheetSize' is deprecated and shouldn't be used

  「sheetSize」已弃用，不应再使用

## Migration guide

## 迁移指南

To migrate to the new API, change the process of setting
surface size and displaying the widget into
[`AnimationSheetBuilder.collate`][].

要迁移到新 API，请把设置表面尺寸并显示 widget 的过程
改为 [`AnimationSheetBuilder.collate`][`AnimationSheetBuilder.collate`]。

### Derive cells per row

### 推导每行单元格数

The `collate` requires an explicit `cellsPerRow`
argument, which is the number of frames per
row in the output image. It can be manually counted,
or calculated as follows:

`collate` 需要显式的 `cellsPerRow` 参数，
即输出图片中每行的帧数。可以手动计数，
也可以按以下方式计算：

* Find the width of frame, specified when constructing
  `AnimationSheetBuilder`. For example, in the following
  snippet it's 80:

  找到构造 `AnimationSheetBuilder` 时指定的帧宽度。
  例如，下面的代码片段中是 80：

```dart
final AnimationSheetBuilder animationSheet = AnimationSheetBuilder(frameSize: const Size(80, 30));
```

* Find the width of surface size, specified when
  setting the surface size; the default is 800.
  For example, in the following snippet it's 600:

  找到设置表面尺寸时指定的表面宽度；默认是 800。
  例如，下面的代码片段中是 600：

```dart
tester.binding.setSurfaceSize(animationSheet.sheetSize(600));
```

* The frames per row should be the result of the two
  numbers divided, rounded down. For example,
  600 / 80 = 7 (rounded down), therefore

  每行帧数应为这两个数相除后向下取整的结果。
  例如，600 / 80 = 7（向下取整），因此

```dart
animationSheet.collate(7)
```

### Migrate code

### 迁移代码

Code before migration:

迁移之前的代码：

```dart
  testWidgets('Indeterminate CircularProgressIndicator', (WidgetTester tester) async {
    final AnimationSheetBuilder animationSheet = AnimationSheetBuilder(frameSize: const Size(40, 40));

    await tester.pumpFrames(animationSheet.record(
      const Directionality(
        textDirection: TextDirection.ltr,
        child: Padding(
          padding: EdgeInsets.all(4),
          child: CircularProgressIndicator(),
        ),
      ),
    ), const Duration(seconds: 2));

    // The code starting here needs migration.

    tester.binding.setSurfaceSize(animationSheet.sheetSize());

    final Widget display = await animationSheet.display();
    await tester.pumpWidget(display);

    await expectLater(
      find.byWidget(display),
      matchesGoldenFile('material.circular_progress_indicator.indeterminate.png'),
    );
  }, skip: isBrowser); // https://github.com/flutter/flutter/issues/42767
```

Code after migration (`cellsPerRow` is 20, derived from 800 / 40):

迁移之后的代码（`cellsPerRow` 为 20，由 800 / 40 得出）：

```dart
  testWidgets('Indeterminate CircularProgressIndicator', (WidgetTester tester) async {
    final AnimationSheetBuilder animationSheet = AnimationSheetBuilder(frameSize: const Size(40, 40));

    await tester.pumpFrames(animationSheet.record(
      const Directionality(
        textDirection: TextDirection.ltr,
        child: Padding(
          padding: EdgeInsets.all(4),
          child: CircularProgressIndicator(),
        ),
      ),
    ), const Duration(seconds: 2));

    await expectLater(
      animationSheet.collate(20),
      matchesGoldenFile('material.circular_progress_indicator.indeterminate.png'),
    );
  }, skip: isBrowser); // https://github.com/flutter/flutter/issues/42767
```

It's expected that related golden test reference images
are invalidated, which should all be updated. The new
images should be identical to the old ones except
1/3 in scale.

相关 golden 测试的参考图片预期会失效，应全部更新。
新图片应与旧图片相同，只是比例为原来的 1/3。

## Timeline

## 时间线

Landed in version: v2.3.0-13.0.pre<br>
合入版本：v2.3.0-13.0.pre<br>
In stable release: 2.5

进入稳定版：2.5

## References

## 参考资料

API documentation:

API 文档：

* [`AnimationSheetBuilder`][]
* [`AnimationSheetBuilder.collate`][]

Relevant PR:

相关 PR：

* [Test WidgetTester handling test pointers][]

  [测试 WidgetTester 对测试指针的处理][Test WidgetTester handling test pointers]

[`AnimationSheetBuilder`]: {{site.api}}/flutter/flutter_test/AnimationSheetBuilder-class.html
[`AnimationSheetBuilder.collate`]: {{site.api}}/flutter/flutter_test/AnimationSheetBuilder/collate.html
[golden testing]: {{site.api}}/flutter/flutter_test/matchesGoldenFile.html
[Test WidgetTester handling test pointers]: {{site.repo.flutter}}/pull/83337
