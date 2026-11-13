---
# title: Dry layout support for RenderBox
title: RenderBox 的干运行布局支持
# description: >
#   The method "computeDryLayout" was added to the RenderBox protocol to
#   correctly calculate its intrinsic size in certain situations.
description: >-
  RenderBox 协议新增了 computeDryLayout 方法，
  以便在某些情况下正确计算其固有尺寸。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

A new method named `computeDryLayout` was added to the `RenderBox` protocol.
Subclasses of `RenderBox` are expected to implement it to correctly report
their desired size given a set of `BoxConstraints` during intrinsic
calculations. Subclasses that implement `computeDryLayout` no longer need to
override `performResize`.

`RenderBox` 协议新增了名为 `computeDryLayout` 的方法。
`RenderBox` 的子类应当实现它，以便在固有尺寸计算期间，
根据一组 `BoxConstraints` 正确报告期望尺寸。
实现了 `computeDryLayout` 的子类不再需要重写 `performResize`。

## Context

## 背景

A new method, `computeDryLayout`, was added to the `RenderBox` protocol to
correctly calculate the intrinsic sizes of a `RenderParagraph` with `WidgetSpan`
children and a `RenderWrap`. The method receives a set of `BoxConstraints` and
is expected to calculate the resulting size of the `RenderBox` without changing
any internal state. It's essentially a dry run of `performLayout` that only
calculates the resulting size and doesn't place the children. The
`computeDryLayout` method is part of the intrinsics protocol (see also
[`RenderBox.computeMinIntrinsicWidth`][] and friends).

`RenderBox` 协议新增了 `computeDryLayout` 方法，
以便正确计算带有 `WidgetSpan` 子级的 `RenderParagraph`
以及 `RenderWrap` 的固有尺寸。
该方法接收一组 `BoxConstraints`，
并应在不改变任何内部状态的情况下算出 `RenderBox` 的结果尺寸。
它本质上是 `performLayout` 的一次干运行：只计算最终尺寸，不摆放子级。
`computeDryLayout` 属于固有尺寸协议的一部分
（另请参阅 [`RenderBox.computeMinIntrinsicWidth`][] 及相关方法）。

## Description of change

## 变更说明

Subclasses of `RenderBox` need to override the new `computeDryLayout` method
if they are used as a descendant of a `RenderObject` that may query the intrinsic
size of its children. Examples of widgets that do this are `IntrinsicHeight`
and `IntrinsicWidth`.

如果 `RenderBox` 的子类用作某个 `RenderObject` 的后代，
而该对象可能会查询子级的固有尺寸，
就需要重写新的 `computeDryLayout` 方法。
会这样做的 widget 包括 `IntrinsicHeight` 和 `IntrinsicWidth`。

The default implementation of `RenderBox.performResize` also uses the size
computed by `computeDryLayout` to perform the resize. Overriding `performResize`
is therefore no longer necessary.

`RenderBox.performResize` 的默认实现也会使用
`computeDryLayout` 算出的尺寸来完成调整大小。
因此不再需要重写 `performResize`。

## Migration guide

## 迁移指南

Subclasses that already override `performResize` can be migrated by simply
changing the function signature from `void performResize()` to
`Size computeDryLayout(BoxConstraints constraints)` and by returning the
calculated size instead of assigning it to the `size` setter. The old
implementation of `performResize` can be removed.

已经重写 `performResize` 的子类可以这样迁移：
把函数签名从 `void performResize()` 改为
`Size computeDryLayout(BoxConstraints constraints)`，
返回计算出的尺寸，而不是赋给 `size` setter。
可以删除旧的 `performResize` 实现。

Code before migration:

迁移之前的代码：

```dart
  @override
  void performResize() {
     size = constraints.biggest;
  }
```

Code after migration:

迁移之后的代码：

```dart
  // This replaces the old performResize method.
  @override
  Size computeDryLayout(BoxConstraints constraints) {
     return constraints.biggest;
  }
```

If the subclass doesn't override `performResize`, the implementation of
`computeDryLayout` has to be extracted from the `performLayout` method.
Basically, `computeDryLayout` needs to do all the work `performLayout` is doing
to figure out the size of the `RenderBox`. However, instead of assigning it
to the `size` setter, it returns the computed size. If `computeDryLayout`
needs to know the size of its children, it must obtain that size by calling
`getDryLayout` on the child instead of calling `layout`.

如果子类没有重写 `performResize`，
就需要从 `performLayout` 方法中抽出 `computeDryLayout` 的实现。
简单来说，`computeDryLayout` 需要完成 `performLayout`
为确定 `RenderBox` 尺寸所做的全部工作。
但它不把结果赋给 `size` setter，而是返回算出的尺寸。
如果 `computeDryLayout` 需要知道子级尺寸，
必须对子级调用 `getDryLayout`，而不是调用 `layout`。

If for some reason it is impossible to calculate the dry layout, `computeDryLayout`
must call `debugCannotComputeDryLayout` from within an assert and return a dummy
size of `const Size(0, 0)`. Calculating a dry layout is, for example, impossible
if the size of a `RenderBox` depends on the baseline metrics of its children.

如果由于某种原因无法计算干运行布局，
`computeDryLayout` 必须在 assert 中调用 `debugCannotComputeDryLayout`，
并返回占位尺寸 `const Size(0, 0)`。
例如，当 `RenderBox` 的尺寸依赖子级的基线度量时，
就无法计算干运行布局。

```dart
  @override
  Size computeDryLayout(BoxConstraints constraints) {
    assert(debugCannotComputeDryLayout(
      reason: 'Layout requires baseline metrics, which are only available after a full layout.'
    ));
    return const Size(0, 0);
  }
```

## Timeline

## 时间线

Landed in version: 1.25.0-4.0.pre<br>
合入版本：1.25.0-4.0.pre<br>
In stable release: 2.0.0

进入稳定版：2.0.0

## References

## 参考资料

API documentation:

API 文档：

* [`RenderBox`][]
* [`computeMinIntrinsicWidth`][]
* [`computeDryLayout`][]
* [`getDryLayout`][]
* [`performResize`][]
* [`RenderWrap`][]
* [`RenderParagraph`][]

Relevant issues:

相关 issue：

* [Issue 48679][]

Relevant PRs:

相关 PR：

* [Fixes Intrinsics for RenderParagraph and RenderWrap][]

  [修复 RenderParagraph 和 RenderWrap 的固有尺寸][Fixes Intrinsics for RenderParagraph
  and RenderWrap]

[`RenderBox`]: {{site.api}}/flutter/rendering/RenderBox-class.html
[`RenderBox.computeMinIntrinsicWidth`]: {{site.api}}/flutter/rendering/RenderBox/computeMinIntrinsicWidth.html
[`computeMinIntrinsicWidth`]: {{site.api}}/flutter/rendering/RenderBox/computeMinIntrinsicWidth.html
[`computeDryLayout`]: {{site.api}}/flutter/rendering/RenderBox/computeDryLayout.html
[`getDryLayout`]: {{site.api}}/flutter/rendering/RenderBox/getDryLayout.html
[`performResize`]: {{site.api}}/flutter/rendering/RenderBox/performResize.html
[`RenderWrap`]: {{site.api}}/flutter/rendering/RenderWrap-class.html
[`RenderParagraph`]: {{site.api}}/flutter/rendering/RenderParagraph-class.html

[Issue 48679]: {{site.repo.flutter}}/issues/48679
[Fixes Intrinsics for RenderParagraph and RenderWrap]: {{site.repo.flutter}}/pull/70656
