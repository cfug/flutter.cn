---
# title: Default multitouch scrolling
title: 默认的多点触控滚动
# description: >
#   ScrollBehaviors will now configure how Scrollables respond to
#   multitouch gestures.
description: >-
  ScrollBehavior 现在会配置 Scrollable 如何响应多点触控手势。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`ScrollBehavior`s now allow or disallow scrolling speeds to be affected by the
number of pointers on the screen. `ScrollBehavior.multitouchDragStrategy`, by
default, prevents multiple pointers interacting with the scrollable at the same
time from affecting the speed of scrolling.

`ScrollBehavior` 现在可以允许或禁止滚动速度受屏幕上指针数量的影响。
默认情况下，`ScrollBehavior.multitouchDragStrategy` 会阻止多个指针
同时与可滚动组件交互时改变滚动速度。

## Context

## 背景

Prior to this change, for each pointer dragging a `Scrollable` widget, the
scroll speed would increase. This did not match platform expectations when
interacting with Flutter applications.

在此次变更之前，每增加一个拖动 `Scrollable` widget 的指针，
滚动速度就会加快。这不符合与 Flutter 应用交互时的平台预期。

Now, the inherited `ScrollBehavior` manages how multiple pointers affect
scrolling widgets as specified by `ScrollBehavior.multitouchDragStrategy`. This
enum, `MultitouchDragStrategy`, can also be configured for the prior behavior.

现在，继承而来的 `ScrollBehavior` 会按照
`ScrollBehavior.multitouchDragStrategy` 的指定，
管理多个指针对滚动 widget 的影响。
枚举 `MultitouchDragStrategy` 也可以配置成以前的行为。

## Description of change

## 变更说明

This change fixed the unexpected ability to increase scroll speeds by dragging
with more than one finger.

此次变更修复了用多根手指拖动就能加快滚动速度这一意外行为。

If you have relied on the previous behavior in your application, there are
several ways to control and configure this feature.

如果你的应用依赖以前的行为，可以用以下几种方式控制和配置此功能。

- Extend `ScrollBehavior`, `MaterialScrollBehavior`, or `CupertinoScrollBehavior`
  to modify the default behavior, overriding
  `ScrollBehavior.multitouchDragStrategy`.

  扩展 `ScrollBehavior`、`MaterialScrollBehavior` 或 `CupertinoScrollBehavior`，
  重写 `ScrollBehavior.multitouchDragStrategy`，以修改默认行为。

    - With your own `ScrollBehavior`, you can apply it app-wide by setting
      `MaterialApp.scrollBehavior` or `CupertinoApp.scrollBehavior`.

      有了自己的 `ScrollBehavior` 后，
      可以通过设置 `MaterialApp.scrollBehavior` 或 `CupertinoApp.scrollBehavior`
      将其应用到整个应用。

    - Or, if you wish to only apply it to specific widgets, add a
      `ScrollConfiguration` above the widget in question with your
      custom `ScrollBehavior`.

      如果只想应用到特定 widget，
      在该 widget 上方添加 `ScrollConfiguration`，
      并使用自定义的 `ScrollBehavior`。

Your scrollable widgets then inherit and reflect this behavior.

之后，可滚动 widget 会继承并体现这一行为。

- Instead of creating your own `ScrollBehavior`, another option for changing
  the default behavior is to copy the existing `ScrollBehavior`, and set different
  `multitouchDragStrategy`.

  除了创建自己的 `ScrollBehavior`，另一种修改默认行为的办法是
  复制现有的 `ScrollBehavior`，并设置不同的 `multitouchDragStrategy`。

    - Create a `ScrollConfiguration` in your widget tree, and provide a modified copy
      of the existing `ScrollBehavior` in the current context using `copyWith`.

      在 widget 树中创建 `ScrollConfiguration`，
      并用 `copyWith` 提供当前上下文中现有 `ScrollBehavior` 的修改副本。

To accommodate the new configuration
`DragGestureRecognizer` was updated to support `MultitouchDragStrategy` as well
in other dragging contexts.

为配合这一新配置，`DragGestureRecognizer` 也已更新，
以便在其他拖动场景中支持 `MultitouchDragStrategy`。

## Migration guide

## 迁移指南

### Setting a custom `ScrollBehavior` for your application

### 为应用设置自定义 `ScrollBehavior`

Code before migration:

迁移之前的代码：

```dart
MaterialApp(
  // ...
);
```

Code after migration:

迁移之后的代码：

```dart
class MyCustomScrollBehavior extends MaterialScrollBehavior {
  // Override behavior methods and getters like multitouchDragStrategy
  @override
  MultitouchDragStrategy getMultitouchDragStrategy(BuildContext context) => MultitouchDragStrategy.sumAllPointers;
}

// Set ScrollBehavior for an entire application.
MaterialApp(
  scrollBehavior: MyCustomScrollBehavior(),
  // ...
);
```

### Setting a custom `ScrollBehavior` for a specific widget

### 为特定 widget 设置自定义 `ScrollBehavior`

Code before migration:

迁移之前的代码：

```dart
final ScrollController controller = ScrollController();
ListView.builder(
  controller: controller,
  itemBuilder: (BuildContext context, int index) {
    return Text('Item $index');
  },
);
```

Code after migration:

迁移之后的代码：

```dart
class MyCustomScrollBehavior extends MaterialScrollBehavior {
  // Override behavior methods and getters like multitouchDragStrategy
  @override
  MultitouchDragStrategy getMultitouchDragStrategy(BuildContext context) => MultitouchDragStrategy.sumAllPointers;
}

// ScrollBehavior can be set for a specific widget.
final ScrollController controller = ScrollController();
ScrollConfiguration(
  behavior: MyCustomScrollBehavior(),
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
      return Text('Item $index');
    },
  ),
);
```

### Copy and modify existing `ScrollBehavior`

### 复制并修改现有的 `ScrollBehavior`

Code before migration:

迁移之前的代码：

```dart
final ScrollController controller = ScrollController();
ListView.builder(
  controller: controller,
  itemBuilder: (BuildContext context, int index) {
    return Text('Item $index');
  },
);
```

Code after migration:

迁移之后的代码：

```dart
// ScrollBehavior can be copied and adjusted.
final ScrollController controller = ScrollController();
ScrollConfiguration(
  behavior: ScrollConfiguration.of(context).copyWith(
    multitouchDragStrategy: MultitouchDragStrategy.sumAllPointers,
  ),
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
      return Text('Item $index');
    },
  ),
);
```

## Timeline

## 时间线

Landed in version: 3.18.0-4.0.pre<br>
合入版本：3.18.0-4.0.pre<br>
In stable release: 3.19.0

进入稳定版：3.19.0

## References

## 参考资料

API documentation:

API 文档：

* [`ScrollConfiguration`][]
* [`ScrollBehavior`][]
* [`MaterialScrollBehavior`][]
* [`CupertinoScrollBehavior`][]
* [`MultitouchDragStrategy`][]
* [`DragGestureRecognizer`][]

Relevant issue:

相关 issue：

* [Issue #11884][]

Relevant PRs:

相关 PR：

* [Introduce multi-touch drag strategies for DragGestureRecognizer][]

  [为 DragGestureRecognizer 引入多点触控拖动策略][Introduce multi-touch drag strategies
  for DragGestureRecognizer]


[`ScrollConfiguration`]: {{site.api}}/flutter/widgets/ScrollConfiguration-class.html
[`ScrollBehavior`]: {{site.api}}/flutter/widgets/ScrollBehavior-class.html
[`MaterialScrollBehavior`]: {{site.api}}/flutter/material/MaterialScrollBehavior-class.html
[`CupertinoScrollBehavior`]: {{site.api}}/flutter/cupertino/CupertinoScrollBehavior-class.html
[`MultitouchDragStrategy`]: {{site.api}}/flutter/gestures/MultitouchDragStrategy.html
[`DragGestureRecognizer`]: {{site.api}}/flutter/gestures/DragGestureRecognizer-class.html
[Issue #11884]: {{site.repo.flutter}}/issues/11884
[Introduce multi-touch drag strategies for DragGestureRecognizer]: {{site.repo.flutter}}/pull/136708
