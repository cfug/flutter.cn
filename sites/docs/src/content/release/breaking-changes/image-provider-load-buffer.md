---
# title: Adding ImageProvider.loadBuffer
title: 新增 ImageProvider.loadBuffer
# description: >
#   ImageProviders must now be implemented using the
#   new loadBuffer API instead of the existing load API.
description: >
  ImageProvider 现在必须使用新的 loadBuffer API 实现，
  而不能再使用原有的 load API。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

* `ImageProvider` now has a method called `loadBuffer` that functions
   similarly to `load`, except that it decodes from an `ui.ImmutableBuffer`.

  `ImageProvider` 现在有一个名为 `loadBuffer` 的方法，
  作用与 `load` 类似，但会从 `ui.ImmutableBuffer` 解码。

* `ui.ImmutableBuffer` can now be created directly from an asset key.

  现在可以直接用资源 key 创建 `ui.ImmutableBuffer`。

* The `AssetBundle` classes can now load an `ui.ImmutableBuffer`.

  `AssetBundle` 类现在可以加载 `ui.ImmutableBuffer`。

* The `PaintingBinding` now has a method called
  `instantiateImageCodecFromBuffer`, which functions similarly to
  `instantiateImageCodec`.

  `PaintingBinding` 现在有一个名为
  `instantiateImageCodecFromBuffer` 的方法，
  作用与 `instantiateImageCodec` 类似。

* `ImageProvider.load` is now deprecated, it will be removed in a future
   release.

  `ImageProvider.load` 现已弃用，将在未来版本中移除。

* `PaintingBinding.instantiateImageCodec` is now deprecated, it will be removed
   in a future release.

  `PaintingBinding.instantiateImageCodec` 现已弃用，
  将在未来版本中移除。

## Context

## 上下文

`ImageProvider.loadBuffer` is a new method that must be implemented in order to
load images. This API allows asset-based image loading to be performed faster
and with less memory impact on application.

`ImageProvider.loadBuffer` 是加载图片时必须实现的新方法。
这套 API 让基于资源的图片加载更快，
对应用的内存影响也更小。

## Description of change

## 变更说明

When loading asset images, previously the image provider API required multiple
copies of the compressed data. First, when opening the asset the data was
copied into the external heap and exposed to Dart as a typed data array. Then
that typed data array was eventually converted into an `ui.ImmutableBuffer`,
which internally copies the data into a second structure for decoding.

加载资源图片时，图片 provider API 此前需要压缩数据的多份副本。
首先，打开资源时数据会被复制到外部堆，
并以类型化数据数组的形式暴露给 Dart。
随后，该类型化数据数组最终会转换成 `ui.ImmutableBuffer`，
它会在内部再把数据复制到第二个结构中用于解码。

With the addition of `ui.ImmutableBuffer.fromAsset`, compressed image bytes can
be loaded directly into the structure used for decoding. Using this approach
requires changes to the byte loading pipeline of `ImageProvider`. This process
is also faster, because it bypasses some additional scheduling overhead of the
previous method channel based loader.

新增 `ui.ImmutableBuffer.fromAsset` 之后，
压缩后的图片字节可以直接加载到用于解码的结构中。
采用这种方式需要修改 `ImageProvider` 的字节加载管线。
这个过程也更快，因为它避开了原先基于方法通道的加载器
所带来的额外调度开销。

`ImageProvider.loadBuffer` otherwise has the same contract as
`ImageProvider.load`, except it provides a new decoding callback that expects
an `ui.ImmutableBuffer` instead of a `Uint8List`. For `ImageProvider` classes
that acquire bytes from places other than assets, the convenience method
`ui.ImmutableBuffer.fromUint8List` can be used for compatibility.

除此之外，`ImageProvider.loadBuffer` 与 `ImageProvider.load`
的约定相同，只是它提供的新解码回调期望
`ui.ImmutableBuffer`，而不是 `Uint8List`。
对于从资源以外的地方获取字节的 `ImageProvider` 类，
可以使用便捷方法 `ui.ImmutableBuffer.fromUint8List` 保持兼容。

## Migration guide

## 迁移指南

Classes that subclass `ImageProvider` must implement the `loadBuffer` method for
loading assets. Classes that delegate to or call the methods of an
`ImageProvider` directly must use `loadBuffer` instead of `load`.

继承 `ImageProvider` 的类必须实现 `loadBuffer` 方法来加载资源。
委托给 `ImageProvider` 或直接调用其方法的类，
必须使用 `loadBuffer`，而不能再使用 `load`。

Code before migration:

迁移之前的代码：

```dart
class MyImageProvider extends ImageProvider<MyImageProvider> {
  @override
  ImageStreamCompleter load(MyImageProvider key, DecoderCallback decode) {
    return MultiFrameImageStreamCompleter(
        codec: _loadData(key, decode),
    );
  }

  Future<ui.Codec> _loadData(MyImageProvider key, DecoderCallback decode) async {
    final Uint8List bytes = await bytesFromSomeApi();
    return decode(bytes);
  }
}

class MyDelegatingProvider extends ImageProvider<MyDelegatingProvider> {
  MyDelegatingProvider(this.provider);

  final ImageProvider provider;

  @override
  ImageStreamCompleter load(MyDelegatingProvider key, DecoderCallback decode) {
    return provider.load(key, decode);
  }
}
```

Code after migration:

迁移之后的代码：

```dart
class MyImageProvider extends ImageProvider<MyImageProvider> {
  @override
  ImageStreamCompleter loadBuffer(MyImageProvider key, DecoderBufferCallback decode) {
    return MultiFrameImageStreamCompleter(
        codec: _loadData(key, decode),
    );
  }

  Future<ui.Codec> _loadData(MyImageProvider key, DecoderBufferCallback decode) async {
    final Uint8List bytes = await bytesFromSomeApi();
    final ui.ImmutableBuffer buffer = await ui.ImmutableBuffer.fromUint8List(bytes);
    return decode(buffer);
  }
}

class MyDelegatingProvider extends ImageProvider<MyDelegatingProvider> {
  MyDelegatingProvider(this.provider);

  final ImageProvider provider;

  @override
  ImageStreamCompleter loadBuffer(MyDelegatingProvider key, DecoderCallback decode) {
    return provider.loadBuffer(key, decode);
  }
}
```

In both cases you might choose to keep the
previous implementation of `ImageProvider.load`
to give users of your code time to migrate as well.

这两种情况下，你也可以保留
`ImageProvider.load` 的原有实现，
给使用你代码的人留出迁移时间。

## Timeline

## 时间线

Landed in version: 3.1.0-0.0.pre.976<br>
In stable release: 3.3.0

合入版本：3.1.0-0.0.pre.976<br>
进入稳定版：3.3.0

## References

## 参考资料

API documentation:

API 文档：

* [`ImmutableBuffer`]({{site.api}}/flutter/dart-ui/ImmutableBuffer-class.html)
* [`ImageProvider`]({{site.api}}/flutter/painting/ImageProvider-class.html)

Relevant PR:

相关 PR：

* [Use immutable buffer for loading asset images]({{site.repo.flutter}}/pull/103496)

  [使用不可变缓冲区加载资源图片]({{site.repo.flutter}}/pull/103496)
