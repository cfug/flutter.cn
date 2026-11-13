---
# title: Web-specific golden comparisons are no longer supported
title: 不再支持 Web 专用的黄金对比
# description: >-
#   The `WebGoldenComparator` class and `webGoldenComparator` top-level instance
#   are deprecated, pending removal, and the web rendering backends (including
#   both CanvasKit and skWasm) now use `GoldenFileComparator` and
#   `goldenFileComparator` directly.
description: >-
  `WebGoldenComparator` 类和顶层实例 `webGoldenComparator`
  已弃用并即将移除。Web 渲染后端（包括 CanvasKit 和 skWasm）
  现在直接使用 `GoldenFileComparator` 和 `goldenFileComparator`。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `flutter_test` package and `flutter` tool will no longer use the
[`webGoldenComparator`][] top-level variable, and instead use the original
[`goldenFileComparator`][] top-level variable (like the non-web platforms).

`flutter_test` package 和 `flutter` 工具将不再使用
顶层变量 [`webGoldenComparator`][]，
改为使用原来的顶层变量 [`goldenFileComparator`][]
（与非 Web 平台一样）。

For _users_ of `flutter_test`, these changes will be made automatically.

对于 `flutter_test` 的 **用户**，这些改动会自动完成。

## Background

## 背景

Originally, [`WebGoldenComparator`][class-WebGoldenComparator] was added for
the HTML-backend of Flutter web, as it was not possible to create an encoded
PNG (byte buffer), and a new API was needed. As [the HTML backend is being
deprecated and removed][Issue 145954], this separate API is no longer necessary.

最初，[`WebGoldenComparator`][class-WebGoldenComparator]
是为 Flutter Web 的 HTML 后端添加的，
因为当时无法创建编码后的 PNG（字节缓冲区），需要一套新 API。
随着 [HTML 后端正在被弃用并移除][Issue 145954]，
这套单独的 API 不再必要。

## Migration guide

## 迁移指南

For most users, no changes are required (other than migrating off the HTML
backend, which is not covered here), the `flutter` tool will automatically
configure [`goldenFileComparator`][] and use it (when using a non-HTML web
backend).

对大多数用户来说，不需要改动
（从 HTML 后端迁出不在本文范围内），`flutter` 工具会自动配置并使用
[`goldenFileComparator`][]
（在使用非 HTML 的 Web 后端时）。

For users that implement a custom [`WebGoldenComparator`][], you will
migrate the implementation to [`GoldenFileComparator`][]. Fortunately the
Canvas Kit and SkWasm backends already required similar methods (`compareButes`
and `updateBytes`).

如果你实现了自定义的 [`WebGoldenComparator`][]，
需要把实现迁移到 [`GoldenFileComparator`][]。
好在 Canvas Kit 和 SkWasm 后端已经要求类似的方法
（`compareButes` 和 `updateBytes`）。

For example:

例如：

```dart
// Before
class MyWebGoldenComparator extends WebGoldenComparator {
  @override
  Future<bool> compare(double width, double height, Uri golden) {
    // will be removed in the migration
  }

  @override
  Future<bool> update(double width, double height, Uri golden) {
    // will be removed in the migration
  }

  @override
  Future<bool> compareBytes(Uint8List bytes, Uri golden) {
    // will be renamed "compare"
  }

  @override
  Future<bool> updateBytes(Uint8List bytes, Uri golden) {
    // will be renamed "update" and the parameter orders swapped
  }
}

// After
class MyGenericGoldenComparator extends GoldenFileComparator {
  @override
  Future<bool> compare(Uint8List bytes, Uri golden) {
    // used to be "compareBytes"
  }

  @override
  Future<bool> update(Uri golden, Uint8List bytes) {
    // used to be "updateBytes"
  }
}
```

## Timeline

## 时间线

Landed in version: 3.29.0-0.0.pre<br>
In stable release: 3.29

合入版本：3.29.0-0.0.pre<br>
进入稳定版：3.29

## References

## 参考资料

Relevant Issues:

相关 issue：

- [Issue 145954][], where the HTML renderer was deprecated.

  [Issue 145954][]，HTML 渲染器在此被弃用。

- [Issue 160261][], where it was proposed to consolidate `GoldenFileComparator` and `WebGoldenComparator`.

  [Issue 160261][]，提议合并 `GoldenFileComparator` 和 `WebGoldenComparator`。

Relevant PRs:

相关 PR：

- [PR 161196][], where `WebGoldenComparator` was deprecated and the `flutter` CLI started using `goldenFileComparator`.

  [PR 161196][]，`WebGoldenComparator`
  在此被弃用，`flutter` CLI 开始使用 `goldenFileComparator`。

[Issue 145954]: {{site.repo.flutter}}/issues/145954
[Issue 160261]: {{site.repo.flutter}}/issues/160261
[PR 161196]: https://github.com/flutter/flutter/pull/161196
[class-WebGoldenComparator]: {{site.api}}/flutter/flutter_test/WebGoldenComparator-class.html
[`webGoldenComparator`]: {{site.api}}/flutter/flutter_test/webGoldenComparator.html
[`goldenFileComparator`]: {{site.api}}/flutter/flutter_test/goldenFileComparator.html
