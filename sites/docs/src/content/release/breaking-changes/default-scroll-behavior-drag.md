---
# title: Default drag scrolling devices
title: 默认的拖动滚动设备
# description: >
#   ScrollBehaviors will now configure what
#   PointerDeviceKinds can drag Scrollables.
description: ScrollBehavior 现在会配置哪些 PointerDeviceKind 可以拖动可滚动组件。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`ScrollBehavior`s now allow or disallow drag scrolling from specified
`PointerDeviceKind`s. `ScrollBehavior.dragDevices`, by default,
allows scrolling widgets to be dragged by all `PointerDeviceKind`s
except for `PointerDeviceKind.mouse`.

`ScrollBehavior` 现在会按指定的 `PointerDeviceKind`
允许或禁止拖动滚动。
默认情况下，`ScrollBehavior.dragDevices` 让除
`PointerDeviceKind.mouse` 之外的所有 `PointerDeviceKind`
都能拖动可滚动 widget。

## Context

## 上下文

Prior to this change, all `PointerDeviceKind`s could drag a `Scrollable` widget.
This did not match developer expectations when interacting with Flutter
applications using mouse input devices. This also made it difficult to execute
other mouse gestures, like selecting text that was contained in a `Scrollable` widget.

在这次改动之前，所有 `PointerDeviceKind` 都可以拖动 `Scrollable` widget。
这不符合开发者用鼠标与 Flutter 应用交互时的预期。
它也让其他鼠标手势难以执行，例如选择 `Scrollable` widget 中的文本。

Now, the inherited `ScrollBehavior` manages which devices can drag scrolling widgets
as specified by `ScrollBehavior.dragDevices`. This set of `PointerDeviceKind`s are
allowed to drag.

现在，继承而来的 `ScrollBehavior` 会按照 `ScrollBehavior.dragDevices`，
管理哪些设备可以拖动可滚动 widget。
只有这一组 `PointerDeviceKind` 可以拖动。

## Description of change

## 变更说明

This change fixed the unexpected ability to scroll by dragging with a mouse.

这次改动修正了用鼠标拖动就能滚动这一不符合预期的行为。

If you have relied on the previous behavior in your application, there are several ways to
control and configure this feature.

如果你的应用依赖以前的行为，可以用下面几种方式控制和配置这个功能。

- Extend `ScrollBehavior`, `MaterialScrollBehavior`, or `CupertinoScrollBehavior`
to modify the default behavior, overriding `ScrollBehavior.dragDevices`.

  继承 `ScrollBehavior`、`MaterialScrollBehavior` 或 `CupertinoScrollBehavior`，
  重写 `ScrollBehavior.dragDevices` 来修改默认行为。

  - With your own `ScrollBehavior`, you can apply it app-wide by setting
    `MaterialApp.scrollBehavior` or `CupertinoApp.scrollBehavior`.

    有了自定义的 `ScrollBehavior` 之后，
    可以通过设置 `MaterialApp.scrollBehavior` 或 `CupertinoApp.scrollBehavior`，
    把它应用到整个应用。

  - Or, if you wish to only apply it to specific widgets, add a
    `ScrollConfiguration` above the widget in question with your
    custom `ScrollBehavior`.

    如果只想应用到特定 widget，可以在该 widget 上方添加 `ScrollConfiguration`，
    并传入自定义的 `ScrollBehavior`。

Your scrollable widgets then inherit and reflect this behavior.

之后，可滚动 widget 会继承并体现这一行为。

- Instead of creating your own `ScrollBehavior`, another option for changing
the default behavior is to copy the existing `ScrollBehavior`, and set different
`dragDevices`.

  除了自行创建 `ScrollBehavior`，另一种修改默认行为的办法是
  复制现有的 `ScrollBehavior`，并设置不同的 `dragDevices`。

  - Create a `ScrollConfiguration` in your widget tree, and provide a modified copy
    of the existing `ScrollBehavior` in the current context using `copyWith`.

    在 widget 树中创建 `ScrollConfiguration`，
    并用 `copyWith` 提供当前上下文中现有 `ScrollBehavior` 的修改副本。

To accommodate the new configuration of drag devices in `ScrollBehavior`,
`GestureDetector.kind` has been deprecated along with
all subclassed instances of the parameter.
A flutter fix is available to migrate existing code
for all gesture detectors from `kind` to `supportedDevices`.
The previous parameter `kind` only allowed one `PointerDeviceKind` to
be used to filter gestures.
The introduction of `supportedDevices` makes it possible for more
than one valid `PointerDeviceKind`.

为了配合 `ScrollBehavior` 中新的拖动设备配置，
`GestureDetector.kind` 及其所有子类上的该参数都已废弃。
可以用 Flutter Fix 把现有手势检测器代码从 `kind` 迁移到 `supportedDevices`。
原先的 `kind` 参数只能用一种 `PointerDeviceKind` 来过滤手势。
引入 `supportedDevices` 之后，可以指定多个有效的 `PointerDeviceKind`。

## Migration guide

## 迁移指南

### Setting a custom `ScrollBehavior` for your application

### 为应用设置自定义 ScrollBehavior

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
  // Override behavior methods and getters like dragDevices
  @override
  Set<PointerDeviceKind> get dragDevices => {
    PointerDeviceKind.touch,
    PointerDeviceKind.mouse,
    // etc.
  };
}

// Set ScrollBehavior for an entire application.
MaterialApp(
  scrollBehavior: MyCustomScrollBehavior(),
  // ...
);
```

### Setting a custom `ScrollBehavior` for a specific widget

### 为特定 widget 设置自定义 ScrollBehavior

Code before migration:

迁移之前的代码：

```dart
final ScrollController controller = ScrollController();
ListView.builder(
  controller: controller,
  itemBuilder: (BuildContext context, int index) {
   return Text('Item $index');
 }
);
```

Code after migration:

迁移之后的代码：

```dart
class MyCustomScrollBehavior extends MaterialScrollBehavior {
  // Override behavior methods and getters like dragDevices
  @override
  Set<PointerDeviceKind> get dragDevices => {
    PointerDeviceKind.touch,
    PointerDeviceKind.mouse,
    // etc.
  };
}

// ScrollBehavior can be set for a specific widget.
final ScrollController controller = ScrollController();
ScrollConfiguration(
  behavior: MyCustomScrollBehavior(),
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
     return Text('Item $index');
    }
  ),
);
```

### Copy and modify existing `ScrollBehavior`

### 复制并修改现有的 ScrollBehavior

Code before migration:

迁移之前的代码：

```dart
final ScrollController controller = ScrollController();
ListView.builder(
  controller: controller,
  itemBuilder: (BuildContext context, int index) {
   return Text('Item $index');
 }
);
```

Code after migration:

迁移之后的代码：

```dart
// ScrollBehavior can be copied and adjusted.
final ScrollController controller = ScrollController();
ScrollConfiguration(
  behavior: ScrollConfiguration.of(context).copyWith(dragDevices: {
    PointerDeviceKind.touch,
    PointerDeviceKind.mouse,
  }),
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
     return Text('Item $index');
    }
  ),
);
```

### Migrate `GestureDetector`s from `kind` to `supportedDevices`

### 将 GestureDetector 从 kind 迁移到 supportedDevices

Code before migration:

迁移之前的代码：

```dart
VerticalDragGestureRecognizer(
  kind: PointerDeviceKind.touch,
);
```

Code after migration:

迁移之后的代码：

```dart
VerticalDragGestureRecognizer(
  supportedDevices: <PointerDeviceKind>{ PointerDeviceKind.touch },
);
```

## Timeline

## 时间线

Landed in version: 2.3.0-12.0.pre<br>
合入版本：2.3.0-12.0.pre<br>
In stable release: 2.5

进入稳定版：2.5

## References

## 参考资料

API documentation:

API 文档：

* [`ScrollConfiguration`][]
* [`ScrollBehavior`][]
* [`MaterialScrollBehavior`][]
* [`CupertinoScrollBehavior`][]
* [`PointerDeviceKind`][]
* [`GestureDetector`][]

Relevant issue:

相关 issue：

* [Issue #71322][]

  [问题 #71322][Issue #71322]

Relevant PRs:

相关 PR：

* [Reject mouse drags by default in scrollables][]

  [默认拒绝可滚动组件上的鼠标拖动][Reject mouse drags by default in scrollables]

* [Deprecate GestureDetector.kind in favor of new supportedDevices][]

  [废弃 GestureDetector.kind，改用新的 supportedDevices][Deprecate GestureDetector.kind in favor of new supportedDevices]


[`ScrollConfiguration`]: {{site.api}}/flutter/widgets/ScrollConfiguration-class.html
[`ScrollBehavior`]: {{site.api}}/flutter/widgets/ScrollBehavior-class.html
[`MaterialScrollBehavior`]: {{site.api}}/flutter/material/MaterialScrollBehavior-class.html
[`CupertinoScrollBehavior`]: {{site.api}}/flutter/cupertino/CupertinoScrollBehavior-class.html
[`PointerDeviceKind`]: {{site.api}}/flutter/dart-ui/PointerDeviceKind-class.html
[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[Issue #71322]: {{site.repo.flutter}}/issues/71322
[Reject mouse drags by default in scrollables]: {{site.repo.flutter}}/pull/81569
[Deprecate GestureDetector.kind in favor of new supportedDevices]: {{site.repo.flutter}}/pull/81858
