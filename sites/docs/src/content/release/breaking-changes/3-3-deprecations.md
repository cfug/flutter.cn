---
# title: Deprecated API removed after v3.3
title: v3.3 之后移除的已弃用 API
# description: >
#   After reaching end of life, the following deprecated APIs
#   were removed from Flutter.
description: >
  以下已弃用 API 在到达生命周期终点后，
  已从 Flutter 中移除。
ai-translated: true
---

## Summary

## 概要

In accordance with Flutter's [Deprecation Policy][],
deprecated APIs that reached end of life after the
3.3 stable release have been removed.

根据 Flutter 的 [弃用政策][Deprecation Policy]，
在 3.3 稳定版之后到达生命周期终点的已弃用 API 已被移除。

All affected APIs have been compiled into this
primary source to aid in migration. A
[quick reference sheet][] is available as well.

所有受影响的 API 都汇总在这份主要资料中，以便迁移。
另有一份 [快速参考表][quick reference sheet]。

[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-3

## Changes

## 变更

This section lists the deprecations, listed by the affected class.

本节按受影响的类列出这些弃用项。

### `RenderUnconstrainedBox`

### `RenderUnconstrainedBox` 类

Supported by Flutter Fix: no

是否支持 Flutter Fix：否

`RenderUnconstrainedBox` was deprecated in v2.1.
Use `RenderConstraintsTransformBox` instead.

`RenderUnconstrainedBox` 已在 v2.1 中弃用。
请改用 `RenderConstraintsTransformBox`。

Where unconstrained in both axes, provide `ConstraintsTransformBox.unconstrained`
to `constraintsTransform`.

若两个轴都不受约束，
请向 `constraintsTransform` 提供 `ConstraintsTransformBox.unconstrained`。

If `RenderUnconstrainedBox.constrainedAxis` was previously set,
replace respectively:

如果之前设置了 `RenderUnconstrainedBox.constrainedAxis`，
请分别替换：

- Where `constrainedAxis` was previously `Axis.horizontal`, set
  `constraintsTransform` to `ConstraintsTransformBox.widthUnconstrained`.

  若 `constrainedAxis` 原先为 `Axis.horizontal`，
  将 `constraintsTransform` 设为 `ConstraintsTransformBox.widthUnconstrained`。

- Where `constrainedAxis` was previously `Axis.vertical`, set
  `constraintsTransform` to `ConstraintsTransformBox.heightUnconstrained`.

  若 `constrainedAxis` 原先为 `Axis.vertical`，
  将 `constraintsTransform` 设为 `ConstraintsTransformBox.heightUnconstrained`。

This change allowed for the introduction of several more types of constraint
transformations through `ConstraintsTransformBox`. Other parameters of the old
API are compatible with the new API.

这次改动让 `ConstraintsTransformBox` 可以引入更多类型的约束变换。
旧 API 的其他参数与新 API 兼容。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
// Unconstrained
final RenderUnconstrainedBox unconstrained = RenderUnconstrainedBox(
  textDirection: TextDirection.ltr,
  child: RenderConstrainedBox(
    additionalConstraints: const BoxConstraints.tightFor(height: 200.0),
  ),
  alignment: Alignment.center,
);

// Constrained in horizontal axis
final RenderUnconstrainedBox unconstrained = RenderUnconstrainedBox(
  constrainedAxis: Axis.horizontal,
  textDirection: TextDirection.ltr,
  child: RenderConstrainedBox(
    additionalConstraints: const BoxConstraints.tightFor(width: 200.0, height: 200.0),
  ),
  alignment: Alignment.center,
);

// Constrained in vertical axis
final RenderUnconstrainedBox unconstrained = RenderUnconstrainedBox(
  constrainedAxis: Axis.vertical,
  textDirection: TextDirection.ltr,
  child: RenderFlex(
    direction: Axis.vertical,
    textDirection: TextDirection.ltr,
    children: <RenderBox>[flexible],
  ),
  alignment: Alignment.center,
);
```

Code after migration:

迁移之后的代码：

```dart
// Unconstrained
final RenderConstraintsTransformBox unconstrained = RenderConstraintsTransformBox(
  constraintsTransform: ConstraintsTransformBox.unconstrained,
  textDirection: TextDirection.ltr,
  child: RenderConstrainedBox(
    additionalConstraints: const BoxConstraints.tightFor(height: 200.0),
  ),
  alignment: Alignment.center,
);

// Constrained in horizontal axis
final RenderConstraintsTransformBox unconstrained = RenderConstraintsTransformBox(
  constraintsTransform: ConstraintsTransformBox.widthUnconstrained,
  textDirection: TextDirection.ltr,
  child: RenderConstrainedBox(
    additionalConstraints: const BoxConstraints.tightFor(width: 200.0, height: 200.0),
  ),
  alignment: Alignment.center,
);

// Constrained in vertical axis
final RenderConstraintsTransformBox unconstrained = RenderConstraintsTransformBox(
  constraintsTransform: ConstraintsTransformBox.widthUnconstrained,
  textDirection: TextDirection.ltr,
  child: RenderFlex(
    direction: Axis.vertical,
    textDirection: TextDirection.ltr,
    children: <RenderBox>[flexible],
  ),
  alignment: Alignment.center,
);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`RenderConstraintsTransformBox`][]
* [`ConstraintsTransformBox`][]

Relevant PRs:

相关 PR：

* Deprecated in [#78673][]

  弃用于 [#78673][]

* Removed in [#111711][]

  移除于 [#111711][]

[`RenderConstraintsTransformBox`]: {{site.api}}/flutter/rendering/RenderConstraintsTransformBox-class.html
[`ConstraintsTransformBox`]: {{site.api}}/flutter/widgets/ConstraintsTransformBox-class.html
[#78673]: {{site.repo.flutter}}/pull/78673
[#111711]: {{site.repo.flutter}}/pull/111711

---

### `DragAnchor`, `Draggable.dragAnchor` & `LongPressDraggable.dragAnchor`

### `DragAnchor`、`Draggable.dragAnchor` 与 `LongPressDraggable.dragAnchor` 属性

Supported by Flutter Fix: yes

是否支持 Flutter Fix：是

The enum `DragAnchor`, and its uses in `Draggable.dragAnchor` &
`LongPressDraggable.dragAnchor` were deprecated in v2.1.
Use `dragAnchorStrategy` instead.

枚举 `DragAnchor`，以及它在 `Draggable.dragAnchor` 和
`LongPressDraggable.dragAnchor` 中的用法，已在 v2.1 中弃用。
请改用 `dragAnchorStrategy`。

This change allowed for more accurate feedback of the draggable widget when used
in conjunction with other widgets like `Stack` and `InteractiveViewer`.

这次改动让可拖动 widget 与 `Stack`、`InteractiveViewer`
等其他 widget 一起使用时，反馈更加准确。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
Draggable draggable = Draggable();
draggable = Draggable(dragAnchor: DragAnchor.child);
draggable = Draggable(dragAnchor: DragAnchor.pointer);

LongPressDraggable longPressDraggable = LongPressDraggable();
longPressDraggable = LongPressDraggable(dragAnchor: DragAnchor.child);
longPressDraggable = LongPressDraggable(dragAnchor: DragAnchor.pointer);
```

Code after migration:

迁移之后的代码：

```dart
Draggable draggable = Draggable();
draggable = Draggable(dragAnchorStrategy: childDragAnchorStrategy);
draggable = Draggable(dragAnchorStrategy: pointerDragAnchorStrategy);

LongPressDraggable longPressDraggable = LongPressDraggable();
longPressDraggable = LongPressDraggable(dragAnchorStrategy: childDragAnchorStrategy);
longPressDraggable = LongPressDraggable(dragAnchorStrategy: pointerDragAnchorStrategy);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`Draggable`][]
* [`LongPressDraggable`][]
* [`DragAnchorStrategy`][]

Relevant issues:

相关 issue：

* [#73143][]

Relevant PRs:

相关 PR：

* Deprecated in [#79160][]

  弃用于 [#79160][]

* Removed in [#111713][]

  移除于 [#111713][]

[`Draggable`]: {{site.api}}/flutter/widgets/Draggable-class.html
[`LongPressDraggable`]: {{site.api}}/flutter/widgets/LongPressDraggable-class.html
[`DragAnchorStrategy`]: {{site.api}}/flutter/widgets/DragAnchorStrategy.html
[#73143]: {{site.repo.flutter}}/pull/73143
[#79160]: {{site.repo.flutter}}/pull/79160
[#111713]: {{site.repo.flutter}}/pull/111713

---

### `ScrollBehavior.buildViewportChrome`

### `ScrollBehavior.buildViewportChrome` 方法

Supported by Flutter Fix: yes

是否支持 Flutter Fix：是

The method `ScrollBehavior.buildViewportChrome` was deprecated in v2.1.

方法 `ScrollBehavior.buildViewportChrome` 已在 v2.1 中弃用。

This method was used by the `Scrollable` widget to apply an overscroll
indicator, like `GlowingOverscrollIndicator`, by default on the appropriate
platforms. As more default decorators have been added, like `Scrollbar`s, each
has instead been split into individual methods to replace `buildViewportChrome`.

`Scrollable` widget 用这个方法在合适的平台上
默认应用过度滚动指示器，例如 `GlowingOverscrollIndicator`。
随着更多默认装饰器的加入，例如 `Scrollbar`，
它们被拆成各自的方法，以取代 `buildViewportChrome`。

This allows extending classes to only override the specific decorator, through
`buildScrollbar` or `buildOverscrollIndicator`, rather than needing to rewrite
code in order to maintain one or the other.

这样，扩展类只需通过 `buildScrollbar` 或 `buildOverscrollIndicator`
覆盖特定的装饰器，而不必为了保留其中一种而重写代码。

**Migration guide**

**迁移指南**

[In-depth migration guide available][]

[更详细的迁移指南][In-depth migration guide available]

Code before migration:

迁移之前的代码：

```dart
final ScrollBehavior scrollBehavior = ScrollBehavior();
scrollBehavior.buildViewportChrome(context, child, axisDirection);
```

Code after migration:

迁移之后的代码：

```dart
final ScrollBehavior scrollBehavior = ScrollBehavior();
scrollBehavior.buildOverscrollIndicator(context, child, axisDirection);
```

**References**

**参考资料**

Design document:

设计文档：

* [Exposing & Updating ScrollBehaviors][]

  [公开并更新 ScrollBehavior][Exposing & Updating ScrollBehaviors]

API documentation:

API 文档：

* [`ScrollBehavior`][]

Relevant issues:

相关 issue：

* [Scrollbars should be always visible and instantiated by default on web and desktop][]

  [滚动条应在 Web 和桌面端
  默认可见并默认实例化][Scrollbars should be always visible
  and instantiated by default on web and desktop]

Relevant PRs:

相关 PR：

* [#76739][]
* Deprecated in [#78588][]

  弃用于 [#78588][]

* Removed in [#111715][]

  移除于 [#111715][]

[In-depth migration guide available]: /release/breaking-changes/default-desktop-scrollbars
[Exposing & Updating ScrollBehaviors]: /go/exposing-scroll-behaviors
[`ScrollBehavior`]: {{site.api}}/flutter/widgets/ScrollBehavior-class.html
[Scrollbars should be always visible and instantiated by default on web and desktop]: {{site.repo.flutter}}/issues/40107
[#76739]: {{site.repo.flutter}}/pull/76739
[#78588]: {{site.repo.flutter}}/pull/78588
[#111715]: {{site.repo.flutter}}/pull/111715

---

## Timeline

## 时间线

In stable release: 3.7

进入稳定版：3.7
