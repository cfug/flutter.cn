---
# title: Default Scrollbars on Desktop
title: 桌面端默认显示滚动条
# description: >
#   ScrollBehaviors will now automatically build Scrollbars on Desktop platforms.
description: ScrollBehavior 现在会在桌面平台上自动构建 Scrollbar。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`ScrollBehavior`s now automatically apply `Scrollbar`s to
scrolling widgets on desktop platforms - Mac, Windows and Linux.

`ScrollBehavior` 现在会在桌面平台（Mac、Windows 和 Linux）上，
自动为可滚动 widget 应用 `Scrollbar`。

## Context

## 上下文

Prior to this change, `Scrollbar`s were applied to scrolling widgets
manually by the developer across all platforms. This did not match
developer expectations when executing Flutter applications on desktop platforms.

在这次改动之前，开发者需要在所有平台上手动为可滚动 widget 应用 `Scrollbar`。
这不符合在桌面平台上运行 Flutter 应用时的开发者预期。

Now, the inherited `ScrollBehavior` applies a `Scrollbar` automatically
to most scrolling widgets. This is similar to how `GlowingOverscrollIndicator`
is created by `ScrollBehavior`. The few widgets that are exempt from this
behavior are listed below.

现在，继承而来的 `ScrollBehavior` 会自动为大多数可滚动 widget 应用 `Scrollbar`。
这与 `ScrollBehavior` 创建 `GlowingOverscrollIndicator` 的方式类似。
少数不受这一行为影响的 widget 列在下面。

To provide better management and control of this feature, `ScrollBehavior`
has also been updated. The `buildViewportChrome` method, which applied
a `GlowingOverscrollIndicator`, has been deprecated. Instead, `ScrollBehavior`
now supports individual methods for decorating the viewport, `buildScrollbar`
and `buildOverscrollIndicator`. These methods can be overridden to control
what is built around the scrollable.

为了更好地管理和控制这个功能，`ScrollBehavior` 也做了更新。
原先用来应用 `GlowingOverscrollIndicator` 的 `buildViewportChrome` 方法已废弃。
`ScrollBehavior` 现在改为用单独的方法装饰视口：
`buildScrollbar` 和 `buildOverscrollIndicator`。
可以重写这些方法，控制在可滚动组件周围构建什么。

Furthermore, `ScrollBehavior` subclasses `MaterialScrollBehavior` and
`CupertinoScrollBehavior` have been made public, allowing developers to extend
and build upon the other existing `ScrollBehavior`s in the framework. These
subclasses were previously private.

此外，`ScrollBehavior` 的子类 `MaterialScrollBehavior` 和
`CupertinoScrollBehavior` 已改为公开，
开发者可以继承并扩展框架中其他现有的 `ScrollBehavior`。
这些子类以前是私有的。


## Description of change

## 变更说明

The previous approach called on developers to create their own `Scrollbar`s on
all platforms. In some use cases, a `ScrollController` would need to be provided
to the `Scrollbar` and the scrollable widget.

以前的做法要求开发者在所有平台上自行创建 `Scrollbar`。
在某些用例中，需要把同一个 `ScrollController` 同时提供给
`Scrollbar` 和可滚动 widget。

```dart
final ScrollController controller = ScrollController();
Scrollbar(
  controller: controller,
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
      return Text('Item $index');
    }
  )
);
```

The `ScrollBehavior` now applies the `Scrollbar` automatically
when executing on desktop, and handles providing the `ScrollController`
to the `Scrollbar` for you.

现在，在桌面端运行时，`ScrollBehavior` 会自动应用 `Scrollbar`，
并替你把 `ScrollController` 提供给 `Scrollbar`。

```dart
final ScrollController controller = ScrollController();
ListView.builder(
  controller: controller,
  itemBuilder: (BuildContext context, int index) {
   return Text('Item $index');
 }
);
```

Some widgets in the framework are exempt from
this automatic `Scrollbar` application.
They are:

框架中有些 widget 不会自动应用 `Scrollbar`。它们是：

- `EditableText`, when `maxLines` is 1.

  `EditableText`，当 `maxLines` 为 1 时。

- `ListWheelScrollView`
- `PageView`
- `NestedScrollView`

Since these widgets manually override the inherited `ScrollBehavior`
to remove `Scrollbar`s, all of these widgets now have a `scrollBehavior`
parameter so that one can be provided to use instead of the override.

由于这些 widget 会手动重写继承来的 `ScrollBehavior` 以移除 `Scrollbar`，
它们现在都有 `scrollBehavior` 参数，
可以传入一个来代替这个重写。

This change did not cause any test failures, crashes, or error messages
in the course of development, but it may result in two `Scrollbar`s
being rendered in your application if you are manually adding `Scrollbar`s
on desktop platforms.

这次改动在开发过程中没有造成测试失败、崩溃或错误信息，
但如果你在桌面平台上手动添加 `Scrollbar`，
应用里可能会渲染出两个 `Scrollbar`。

If you are seeing this in your application, there are several ways to
control and configure this feature.

如果应用里出现了这种情况，可以用下面几种方式控制和配置这个功能。

- Remove the manually applied `Scrollbar`s in your
  application when running on desktop.

  在桌面端运行时，移除应用中手动添加的 `Scrollbar`。

- Extend `ScrollBehavior`, `MaterialScrollBehavior`,
  or `CupertinoScrollBehavior` to modify the default behavior.

  继承 `ScrollBehavior`、`MaterialScrollBehavior` 或 `CupertinoScrollBehavior`，
  以修改默认行为。

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

Your scrollable widgets then inherits this and reflects this behavior.

之后，可滚动 widget 会继承并体现这一行为。

- Instead of creating your own `ScrollBehavior`, another option for changing
  the default behavior is to copy the existing `ScrollBehavior`, and toggle the
  desired feature.

  除了自行创建 `ScrollBehavior`，另一种修改默认行为的办法是
  复制现有的 `ScrollBehavior`，并开关想要的功能。

  - Create a `ScrollConfiguration` in your widget tree, and
    provide a modified copy of the existing `ScrollBehavior` in
    the current context using `copyWith`.

    在 widget 树中创建 `ScrollConfiguration`，
    并用 `copyWith` 提供当前上下文中现有 `ScrollBehavior` 的修改副本。

## Migration guide

## 迁移指南

### Removing manual `Scrollbar`s on desktop

### 在桌面端移除手动添加的 Scrollbar

Code before migration:

迁移之前的代码：

```dart
final ScrollController controller = ScrollController();
Scrollbar(
  controller: controller,
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
      return Text('Item $index');
    }
  )
);
```

Code after migration:

迁移之后的代码：

```dart
final ScrollController controller = ScrollController();
final Widget child = ListView.builder(
  controller: controller,
  itemBuilder: (BuildContext context, int index) {
    return Text('Item $index');
  }
);
// Only manually add a `Scrollbar` when not on desktop platforms.
// Or, see other migrations for changing `ScrollBehavior`.
switch (currentPlatform) {
  case TargetPlatform.linux:
  case TargetPlatform.macOS:
  case TargetPlatform.windows:
    return child;
  case TargetPlatform.android:
  case TargetPlatform.fuchsia:
  case TargetPlatform.iOS:
    return Scrollbar(
      controller: controller,
      child: child;
    );
}
```

### Setting a custom `ScrollBehavior` for your application

### 为应用设置自定义 ScrollBehavior

Code before migration:

迁移之前的代码：

```dart
// MaterialApps previously had a private ScrollBehavior.
MaterialApp(
  // ...
);
```

Code after migration:

迁移之后的代码：

```dart
// MaterialApps previously had a private ScrollBehavior.
// This is available to extend now.
class MyCustomScrollBehavior extends MaterialScrollBehavior {
  // Override behavior methods like buildOverscrollIndicator and buildScrollbar
}

// ScrollBehavior can now be configured for an entire application.
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
// MaterialApps previously had a private ScrollBehavior.
// This is available to extend now.
class MyCustomScrollBehavior extends MaterialScrollBehavior {
  // Override behavior methods like buildOverscrollIndicator and buildScrollbar
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
  behavior: ScrollConfiguration.of(context).copyWith(scrollbars: false),
  child: ListView.builder(
    controller: controller,
    itemBuilder: (BuildContext context, int index) {
     return Text('Item $index');
    }
  ),
);
```

## Timeline

## 时间线

Landed in version: 2.2.0-10.0.pre<br>
合入版本：2.2.0-10.0.pre<br>
In stable release: 2.2.0

进入稳定版：2.2.0

## References

## 参考资料

API documentation:

API 文档：

* [`ScrollConfiguration`][]
* [`ScrollBehavior`][]
* [`MaterialScrollBehavior`][]
* [`CupertinoScrollBehavior`][]
* [`Scrollbar`][]
* [`CupertinoScrollbar`][]

Relevant issues:

相关 issue：

* [Issue #40107][]

  [问题 #40107][Issue #40107]

* [Issue #70866][]

  [问题 #70866][Issue #70866]

Relevant PRs:

相关 PR：

* [Exposing ScrollBehaviors for app-wide settings][]

  [公开 ScrollBehavior 以支持全应用设置][Exposing ScrollBehaviors for app-wide settings]

* [Automatically applying Scrollbars on desktop platforms with configurable ScrollBehaviors][]

  [在桌面平台上通过可配置的 ScrollBehavior 自动应用 Scrollbar][Automatically applying Scrollbars on desktop platforms with configurable ScrollBehaviors]


[`ScrollConfiguration`]: {{site.api}}/flutter/widgets/ScrollConfiguration-class.html
[`ScrollBehavior`]: {{site.api}}/flutter/widgets/ScrollBehavior-class.html
[`MaterialScrollBehavior`]: {{site.api}}/flutter/material/MaterialScrollBehavior-class.html
[`CupertinoScrollBehavior`]: {{site.api}}/flutter/cupertino/CupertinoScrollBehavior-class.html
[`Scrollbar`]: {{site.api}}/flutter/material/Scrollbar-class.html
[`CupertinoScrollbar`]: {{site.api}}/flutter/cupertino/CupertinoScrollbar-class.html
[Issue #40107]: {{site.repo.flutter}}/issues/40107
[Issue #70866]: {{site.repo.flutter}}/issues/70866
[Exposing ScrollBehaviors for app-wide settings]: {{site.repo.flutter}}/pull/76739
[Automatically applying Scrollbars on desktop platforms with configurable ScrollBehaviors]: {{site.repo.flutter}}/pull/78588
