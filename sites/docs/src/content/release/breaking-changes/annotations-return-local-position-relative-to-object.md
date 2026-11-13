---
# title: AnnotatedRegionLayers return local position relative to clipping region
title: AnnotatedRegionLayer 返回相对于裁剪区域的局部位置
# description: >
#   Provide annotation searches with reliable and meaningful local positions.
description: 让注解搜索返回可靠且有意义的局部位置。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The local position returned by `AnnotatedRegionLayers` in an
annotation search has been changed to be relative to the clipping
region instead of the layer. This makes the local position more
meaningful and reliable, but breaks code that directly performs
annotation searches and uses the local position.

注解搜索中，`AnnotatedRegionLayers` 返回的局部位置已改为相对于裁剪区域，
而不是相对于图层。
这让局部位置更有意义、也更可靠，
但会破坏直接执行注解搜索并使用该局部位置的代码。

## Context

## 上下文

Annotations are metadata that are assigned during the
rendering phase to regions on the screen.
Searching the annotations with a location gives the
contextual information that contains that location.
They are used to detect mouse events and the theme of app bars.

注解是渲染阶段赋给屏幕区域的元数据。
用某个位置搜索注解，可以得到包含该位置的上下文信息。
它们用于检测鼠标事件和应用栏的主题。

When `localPosition` was first added to the search result,
it was defined as relative to the layer that owned the annotation,
which turned out to be a design mistake.
The offset from the layer is meaningless and unreliable.
For example, a `Transform` widget draws on the same layer
with an offset if the transform matrix is a simple translation,
or push a dedicated `TransformLayer` if the matrix is non-trivial.
The former case keeps the previous coordinate origin
(for example, the top left corner of the app),
while the latter case moves the position origin since
it's on a new layer. The two cases might not produce noticeable
visual differences, since the extra layer might just be a scale of
99%, despite that the annotation search returns different results.
In order to make this local position reliable, we have to choose
one of the results to stick to.

`localPosition` 最初被加到搜索结果中时，
被定义成相对于拥有该注解的图层，这后来被证明是设计错误。
相对图层的偏移没有意义，也不可靠。
例如，如果变换矩阵只是简单平移，`Transform` widget 会带着偏移绘制在同一图层上；
如果矩阵不是简单变换，则会压入一个专门的 `TransformLayer`。
前一种情况会保留原来的坐标原点（例如应用的左上角），
后一种情况因为位于新图层上，位置原点会移动。
这两种情况在视觉上可能没有明显差别，
额外的图层也许只是缩放到 99%，
但注解搜索却会返回不同的结果。
为了让这个局部位置可靠，必须选定其中一种结果并坚持使用。

## Description of change

## 变更说明

The `localPosition` returned by an `AnnotatedRegionLayer`
is now the local position it received subtracted by `offset`,
where `offset` is the location of the clipping area relative
to the layer.

`AnnotatedRegionLayer` 返回的 `localPosition`
现在是它收到的局部位置减去 `offset`。
这里的 `offset` 是裁剪区域相对于图层的位置。

```dart
class AnnotatedRegionLayer<T> extends ContainerLayer {
  @override
  bool findAnnotations<S>(AnnotationResult<S> result, Offset localPosition, { required bool onlyFirst }) {
    ...
    if (/* shouldAddAnnotation */) {
      result.add(AnnotationEntry<S>(
        annotation: typedValue,
        // Used to be:
        // localPosition: localPosition,
        localPosition: localPosition - offset,
      ));
    }
    ...
  }
}
```

Conceptually, this has changed how `AnnotatedRegionLayer.offset`
and `size` are defined. They used to mean
"the clipping rectangle that restricts the annotation search",
while they now jointly represent
"the region of the annotation object".

从概念上说，这改变了 `AnnotatedRegionLayer.offset` 和 `size` 的定义。
它们原先表示「限制注解搜索的裁剪矩形」，
现在共同表示「注解对象的区域」。

## Migration guide

## 迁移指南

Code that is actively using this local position is probably
directly interacting with layers, since using render objects or
widgets have already made this result unreliable. In order to
preserve the previous behavior, you can reimplement
`AnnotatedRegionLayer` to return a local position without
subtracting the offset.

正在使用这个局部位置的代码，多半是在直接与图层交互，
因为通过 render object 或 widget 使用时，这个结果本来就已经不可靠。
要保留以前的行为，可以重新实现 `AnnotatedRegionLayer`，
让它返回不减去 offset 的局部位置。

## Timeline

## 时间线

Landed in version: 1.15.2<br>
合入版本：1.15.2<br>
In stable release: 1.17

进入稳定版：1.17

## References

## 参考资料

API documentation:

API 文档：

* [`AnnotatedRegionLayer`][]
* [`AnnotationEntry`][]

Relevant issues:

相关 issue：

* [Issue #49568][]

  [问题 #49568][Issue #49568]

Relevant PR:

相关 PR：

* [Make Annotation's localPosition relative to object][]

  [让 Annotation 的 localPosition 相对于对象][Make Annotation's localPosition relative to object]

[`AnnotatedRegionLayer`]: {{site.api}}/flutter/rendering/AnnotatedRegionLayer-class.html
[`AnnotationEntry`]: {{site.api}}/flutter/rendering/AnnotationEntry-class.html
[Issue #49568]: {{site.repo.flutter}}/issues/49568
[Make Annotation's localPosition relative to object]: {{site.repo.flutter}}/pull/50157
