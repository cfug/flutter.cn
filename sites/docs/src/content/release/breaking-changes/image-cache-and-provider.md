---
# title: ImageCache and ImageProvider changes
title: ImageCache 与 ImageProvider 的改动
# description: >
#   ImageCache requires implementers to override containsKey, and
#   ImageProvider has marked resolve as @nonVirtual.
description: >
  ImageCache 要求实现者重写 containsKey，
  ImageProvider 已将 resolve 标记为 @nonVirtual。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`ImageCache` now has a method called `containsKey`.
`ImageProvider` subclasses should not override `resolve`,
but instead should implement new methods on `ImageProvider`.
These changes were submitted as a single commit to the framework.

`ImageCache` 现在有一个名为 `containsKey` 的方法。
`ImageProvider` 的子类不应再重写 `resolve`，
而应实现 `ImageProvider` 上的新方法。
这些改动以一次提交进入框架。

## Description of change

## 改动说明

The sections below describe the changes to `containsKey`
and `ImageProvider`.

下面几节说明 `containsKey` 和 `ImageProvider` 的改动。

### containsKey change

### containsKey 改动

Clients of the `ImageCache`, such as a custom `ImageProvider`,
may want to know if the cache is already tracking an image.
Adding the `containsKey` method allows callers to discover
this without calling a method like `putIfAbsent`,
which can trigger an undesired call to `ImageProvider.load`.

`ImageCache` 的调用方（例如自定义 `ImageProvider`）
可能想知道缓存是否已经在跟踪某张图片。
新增的 `containsKey` 方法让调用方可以得知这一点，
而不必调用 `putIfAbsent` 之类的方法，
后者可能会意外触发 `ImageProvider.load`。

The default implementation checks both pending and cached
image buckets.

默认实现会同时检查待处理图片和已缓存图片。

```dart
  bool containsKey(Object key) {
    return _pendingImages[key] != null || _cache[key] != null;
  }
```

### ImageProvider changes

### ImageProvider 改动说明

The `ImageProvider.resolve` method does some complicated
error handling work that should not normally be overridden.
It also previously did work to load the image into the
image cache, by way of `ImageProvider.obtainKey` and
`ImageProvider.load`. Subclasses had no opportunity to
override this behavior without overriding `resolve`,
and the ability to compose `ImageProvider`s is limited
if multiple `ImageProvider`s expect to override `resolve`.

`ImageProvider.resolve` 方法包含一些复杂的错误处理，
通常不应被重写。
它以前还会通过 `ImageProvider.obtainKey`
和 `ImageProvider.load` 把图片加载进图片缓存。
子类若不重写 `resolve`，就无法改变这一行为；
而如果多个 `ImageProvider` 都要重写 `resolve`，
组合 `ImageProvider` 的能力也会受到限制。

To solve this issue, `resolve` is now marked as non-virtual,
and two new protected methods have been added: `createStream()`
and `resolveStreamForKey()`.
These methods allow subclasses to control most of the behavior
of `resolve`, without having to duplicate all the error handling work.
It also allows subclasses that compose `ImageProvider`s
to be more confident that there is only one public entrypoint
to the various chained providers.

为解决这个问题，`resolve` 现已标记为非虚方法，
并新增了两个受保护方法：`createStream()`
和 `resolveStreamForKey()`。
子类可以借此控制 `resolve` 的大部分行为，
而不必重复全部错误处理逻辑。
组合多个 `ImageProvider` 的子类也可以更有把握：
这一串 provider 只有一个公开入口。

## Migration guide

## 迁移指南

### ImageCache change

### ImageCache 改动

Before migration, the code would not have an override of `containsKey`.

迁移之前，代码里不会有 `containsKey` 的重写。

Code after migration:

迁移后的代码：

```dart
class MyImageCache implements ImageCache {
  @override
  bool containsKey(Object key) {
    // Check if your custom cache is tracking this key.
  }

  ...
}
```

### ImageProvider change

### ImageProvider 迁移改动

Code before the migration:

迁移前的代码：

```dart
class MyImageProvider extends ImageProvider<Object> {
  @override
  ImageStream resolve(ImageConfiguration configuration) {
    // create stream
    // set up error handling
    // interact with ImageCache
    // call obtainKey/load, etc.
  }
  ...
}
```

Code after the migration:

迁移后的代码：

```dart
class MyImageProvider extends ImageProvider<Object> {
  @override
  ImageStream createStream(ImageConfiguration configuration) {
    // Return stream, or use super.createStream(),
    // which returns a new ImageStream.
  }

  @override
  void resolveStreamForKey(
    ImageConfiguration configuration,
    ImageStream stream,
    Object key,
    ImageErrorListener handleError,
  ) {
    // Interact with the cache, use the key, potentially call `load`,
    // and report any errors back through `handleError`.
  }
  ...
}

```

## Timeline

## 时间线

Landed in version: 1.16.3<br>
合入版本：1.16.3<br>
In stable release: 1.17

进入稳定版：1.17

## References

## 参考资料

API documentation:

API 文档：

* [`ImageCache`][]
* [`ImageProvider`][]
* [`ScrollAwareImageProvider`][]

Relevant issues:

相关 issue：

* [Issue #32143][]
* [Issue #44510][]
* [Issue #48305][]
* [Issue #48775][]

Relevant PRs:

相关 PR：

* [Defer image decoding when scrolling fast #49389][]

  [快速滚动时延迟图片解码 #49389][Defer image decoding when scrolling fast #49389]

[`ImageCache`]: {{site.api}}/flutter/painting/ImageCache-class.html
[`ImageProvider`]: {{site.api}}/flutter/painting/ImageProvider-class.html
[`ScrollAwareImageProvider`]: {{site.api}}/flutter/widgets/ScrollAwareImageProvider-class.html
[Issue #32143]: {{site.repo.flutter}}/issues/32143
[Issue #44510]: {{site.repo.flutter}}/issues/44510
[Issue #48305]: {{site.repo.flutter}}/issues/48305
[Issue #48775]: {{site.repo.flutter}}/issues/48775
[Defer image decoding when scrolling fast #49389]: {{site.repo.flutter}}/pull/49389
