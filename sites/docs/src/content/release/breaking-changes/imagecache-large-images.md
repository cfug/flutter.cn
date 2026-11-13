---
# title: ImageCache large images
title: ImageCache 与大图
# description: >
#   Stop increasing the ImageCache maxByteSize to accommodate large images.
description: >
  不再为容纳大图而增大 ImageCache 的 maxByteSize。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `maxByteSize` of the `ImageCache` is no longer
automatically made larger to accommodate large images.

`ImageCache` 的 `maxByteSize` 不再
自动增大以容纳大图。

## Context

## 上下文

Previously, when loading images into the `ImageCache`
that had larger byte sizes than the `ImageCache`'s `maxByteSize`,
Flutter permanently increased the `maxByteSize` value
to accommodate those images.
This logic sometimes led to bloated `maxByteSize` values that
made working in memory-limited systems more difficult.

此前，当载入 `ImageCache` 的图片字节数
大于 `ImageCache` 的 `maxByteSize` 时，Flutter
会永久增大 `maxByteSize` 来容纳这些图片。
这种逻辑有时会让 `maxByteSize` 膨胀，
在内存受限的系统上更难工作。

## Description of change

## 变更说明

The following "before" and "after" pseudocode demonstrates
the changes made to the `ImageCache` algorithm:

下面的「之前」和「之后」伪代码展示了
对 `ImageCache` 算法所做的改动：

```dart
// Old logic pseudocode
void onLoadImage(Image image) {
  if (image.byteSize > _cache.maxByteSize) {
    _cache.maxByteSize = image.byteSize + 1000;
  }
  _cache.add(image);
  while (_cache.count > _cache.maxCount
      || _cache.byteSize > _cache.maxByteSize) {
    _cache.discardOldestImage();
  }
}
```

```dart
// New logic pseudocode
void onLoadImage(Image image) {
  if (image.byteSize < _cache.maxByteSize) {
    _cache.add(image);
    while (_cache.count > _cache.maxCount
        || _cache.byteSize > cache.maxByteSize) {
      cache.discardOldestImage();
    }
  }
}
```

## Migration guide

## 迁移指南

There might be situations where the `ImageCache`
is thrashing with the new logic where it wasn't previously,
specifically if you load images that are larger than your
`cache.maxByteSize` value.
This can be remedied by one of the following approaches:

在新逻辑下，`ImageCache` 有时会出现抖动，而之前不会。
具体来说，当你加载的图片大于 `cache.maxByteSize` 时就会如此。
可以用以下方法之一解决：

1. Increase the `ImageCache.maxByteSize` value
   to accommodate larger images.

   增大 `ImageCache.maxByteSize`，以容纳更大的图片。

1. Adjust your image loading logic to guarantee that
   the images fit nicely into the `ImageCache.maxByteSize`
   value of your choosing.

   调整图片加载逻辑，确保图片能够放进你所设定的
   `ImageCache.maxByteSize`。

1. Subclass `ImageCache`, implement your desired logic,
   and create a new binding that serves up your subclass
   of `ImageCache` (see the [`image_cache.dart`][] source).

   继承 `ImageCache` 并实现你需要的逻辑，
   再新建一个 binding 来提供这个 `ImageCache` 子类
   （参阅 [`image_cache.dart`][] 源码）。

## Timeline

## 时间线

The old algorithm is no longer supported.

旧算法不再受支持。

Landed in version: 1.16.3<br>
In stable release: 1.17

合入版本：1.16.3<br>
进入稳定版：1.17

## References

## 参考资料

API documentation:

API 文档：

* [`ImageCache`][]

Relevant issue:

相关 issue：

* [Issue 45643][]

Relevant PR:

相关 PR：

* [Stopped increasing the cache size to accommodate large images][]

  [停止为容纳大图而增大缓存][Stopped increasing the cache size to accommodate large images]

Other:

其他：

* [`ImageCache` source][]

  [`ImageCache` 源码][`ImageCache` source]


[Stopped increasing the cache size to accommodate large images]: {{site.repo.flutter}}/pull/47387
[`ImageCache`]: {{site.api}}/flutter/painting/ImageCache-class.html
[`image_cache.dart`]: {{site.repo.flutter}}/blob/72a3d914ee5db0033332711224e728b8a5281d89/packages/flutter/lib/src/painting/image_cache.dart#L34
[`ImageCache` source]: {{site.repo.flutter}}/blob/main/packages/flutter/lib/src/painting/image_cache.dart
[Issue 45643]: {{site.repo.flutter}}/issues/45643
