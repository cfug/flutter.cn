---
# title: Deprecated API removed after v3.7
title: v3.7 之后移除的已弃用 API
# description: >
#   After reaching end of life, the following deprecated APIs
#   were removed from Flutter.
description: >
  到达生命周期终点后，下列已弃用的 API
  已从 Flutter 中移除。
ai-translated: true
---

## Summary

## 概要

In accordance with Flutter's [Deprecation Policy][],
deprecated APIs that reached end of life after the
3.7 stable release have been removed.

根据 Flutter 的 [弃用策略][Deprecation Policy]，
3.7 稳定版之后到达生命周期终点的已弃用 API
已被移除。

All affected APIs have been compiled into this
primary source to aid in migration. A
[quick reference sheet][] is available as well.

所有受影响的 API 都汇总在这份主要文档中，以便迁移。
另有一份 [速查表][quick reference sheet]。

[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-7

## Changes

## 改动

This section lists the deprecations, listed by the affected class.

本节按受影响的类列出各项弃用。

### `GestureRecognizer.kind` & subclasses

### `GestureRecognizer.kind` 及其子类

Supported by Flutter Fix: yes

Flutter Fix 支持：是

`GestureRecognizer.kind` was deprecated in v2.3.
Use `GestureRecognizer.supportedDevices` instead.

`GestureRecognizer.kind` 已在 v2.3 弃用。
请改用 `GestureRecognizer.supportedDevices`。

This same change affects all subclasses of `GestureRecognizer`:

同样的改动会影响 `GestureRecognizer` 的所有子类：

* `EagerGestureRecognizer`
* `ForcePressGestureRecognizer`
* `LongPressGestureRecognizer`
* `DragGestureRecognizer`
* `VerticalDragGestureRecognizer`
* `HorizontalDragGestureRecognizer`
* `MultiDragGestureRecognizer`
* `ImmediateMultiDragGestureRecognizer`
* `HorizontalMultiDragGestureRecognizer`
* `VerticalMultiDragGestureRecognizer`
* `DelayedMultiDragGestureRecognizer`
* `DoubleTapGestureRecognizer`
* `MultiTapGestureRecognizer`
* `OneSequenceGestureRecognizer`
* `PrimaryPointerGestureRecognizer`
* `ScaleGestureRecognizer`

This change allowed for multiple devices to be recognized for a gesture, rather
than the single option `kind` provided.

此改动让一个手势可以识别多种设备，
而不再只有 `kind` 这一个选项。

**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
var myRecognizer = GestureRecognizer(
  kind: PointerDeviceKind.mouse,
);
```

Code after migration:

迁移后的代码：

```dart
var myRecognizer = GestureRecognizer(
  supportedDevices: <PointerDeviceKind>[ PointerDeviceKind.mouse ],
);

```

**References**

**参考资料**

API documentation:

API 文档：

* [`GestureRecognizer`][]
* [`EagerGestureRecognizer`][]
* [`ForcePressGestureRecognizer`][]
* [`LongPressGestureRecognizer`][]
* [`DragGestureRecognizer`][]
* [`VerticalDragGestureRecognizer`][]
* [`HorizontalDragGestureRecognizer`][]
* [`MultiDragGestureRecognizer`][]
* [`ImmediateMultiDragGestureRecognizer`][]
* [`HorizontalMultiDragGestureRecognizer`][]
* [`VerticalMultiDragGestureRecognizer`][]
* [`DelayedMultiDragGestureRecognizer`][]
* [`DoubleTapGestureRecognizer`][]
* [`MultiTapGestureRecognizer`][]
* [`OneSequenceGestureRecognizer`][]
* [`PrimaryPointerGestureRecognizer`][]
* [`ScaleGestureRecognizer`][]

Relevant PRs:

相关 PR：

* Deprecated in [#81858][]

  弃用于 [#81858][]

* Removed in [#119572][]

  移除于 [#119572][]

[`GestureRecognizer`]: {{site.api}}/flutter/gestures/GestureRecognizer-class.html
[`EagerGestureRecognizer`]: {{site.api}}/flutter/gestures/EagerGestureRecognizer-class.html
[`ForcePressGestureRecognizer`]: {{site.api}}/flutter/gestures/ForcePressGestureRecognizer-class.html
[`LongPressGestureRecognizer`]: {{site.api}}/flutter/gestures/LongPressGestureRecognizer-class.html
[`DragGestureRecognizer`]: {{site.api}}/flutter/gestures/DragGestureRecognizer-class.html
[`VerticalDragGestureRecognizer`]: {{site.api}}/flutter/gestures/VerticalDragGestureRecognizer-class.html
[`HorizontalDragGestureRecognizer`]: {{site.api}}/flutter/gestures/HorizontalDragGestureRecognizer-class.html
[`MultiDragGestureRecognizer`]: {{site.api}}/flutter/gestures/MultiDragGestureRecognizer-class.html
[`ImmediateMultiDragGestureRecognizer`]: {{site.api}}/flutter/gestures/ImmediateMultiDragGestureRecognizer-class.html
[`HorizontalMultiDragGestureRecognizer`]: {{site.api}}/flutter/gestures/HorizontalMultiDragGestureRecognizer-class.html
[`VerticalMultiDragGestureRecognizer`]: {{site.api}}/flutter/gestures/VerticalMultiDragGestureRecognizer-class.html
[`DelayedMultiDragGestureRecognizer`]: {{site.api}}/flutter/gestures/DelayedMultiDragGestureRecognizer-class.html
[`DoubleTapGestureRecognizer`]: {{site.api}}/flutter/gestures/DoubleTapGestureRecognizer-class.html
[`MultiTapGestureRecognizer`]: {{site.api}}/flutter/gestures/MultiTapGestureRecognizer-class.html
[`OneSequenceGestureRecognizer`]: {{site.api}}/flutter/gestures/OneSequenceGestureRecognizer-class.html
[`PrimaryPointerGestureRecognizer`]: {{site.api}}/flutter/gestures/PrimaryPointerGestureRecognizer-class.html
[`ScaleGestureRecognizer`]: {{site.api}}/flutter/gestures/ScaleGestureRecognizer-class.html


[#81858]: {{site.repo.flutter}}/pull/81858
[#119572]: {{site.repo.flutter}}/pull/119572

---

### `ThemeData` `accentColor`, `accentColorBrightness`, `accentColorTextTheme`, `accentColorIconTheme`, and `buttonColor`

### `ThemeData` 的 accent 相关属性与 `buttonColor`

Supported by Flutter Fix: yes

Flutter Fix 支持：是

The `accentColor`, `accentColorBrightness`, `accentColorTextTheme`,
`accentColorIconTheme`, and `buttonColor` properties of `ThemeData` were
deprecated in v2.3.

`ThemeData` 的 `accentColor`、`accentColorBrightness`、
`accentColorTextTheme`、`accentColorIconTheme` 和 `buttonColor`
属性已在 v2.3 弃用。

This change better aligned `ThemeData` with Material Design guidelines. It also
created more clarity in theming by relying either on the core color scheme or
individual component themes for desired styling.

此改动让 `ThemeData` 更好地对齐 Material Design 指南。
主题也更清晰：所需样式要么来自核心配色方案，
要么来自各个组件主题。

The `accentColorBrightness`, `accentColorTextTheme`,
`accentColorIconTheme`, and `buttonColor` are no longer used by the framework.
References should be removed.

框架不再使用 `accentColorBrightness`、`accentColorTextTheme`、
`accentColorIconTheme` 和 `buttonColor`。
相关引用应当删除。

Uses of `ThemeData.accentColor` should be replaced with
`ThemeData.colorScheme.secondary`.

`ThemeData.accentColor` 的用法应替换为
`ThemeData.colorScheme.secondary`。

## Migration guide

## 迁移指南

Code before migration:

迁移前的代码：

```dart
var myTheme = ThemeData(
  //...
  accentColor: Colors.blue,
  //...
);
var color = myTheme.accentColor;
```

Code after migration:

迁移后的代码：

```dart
var myTheme = ThemeData(
  //...
  colorScheme: ColorScheme(
    //...
    secondary:Colors.blue,
    //...
  ),
  //...
);
var color = myTheme.colorScheme.secondary;
```

**References**

**参考资料**

* [Accent color migration guide][]

  [accent 颜色迁移指南][Accent color migration guide]

API documentation:

API 文档：

* [`ThemeData`][]
* [`ColorScheme`][]

Relevant issues:

相关 issue：

* [#56639][]
* [#84748][]
* [#56918][]
* [#91772][]

Relevant PRs:

相关 PR：

Deprecated in:

弃用于：

* [#92822][]
* [#81336][]
* [#85144][]

Removed in:

移除于：

* [#118658][]
* [#119360][]
* [#120577][]
* [#120932][]

[Accent color migration guide]: /release/breaking-changes/theme-data-accent-properties
[`ThemeData`]: {{site.api}}/flutter/widgets/Draggable-class.html
[`ColorScheme`]: {{site.api}}/flutter/widgets/LongPressDraggable-class.html
[#56639]: {{site.repo.flutter}}/pull/56639
[#84748]: {{site.repo.flutter}}/pull/84748
[#56918]: {{site.repo.flutter}}/pull/56918
[#91772]: {{site.repo.flutter}}/pull/91772
[#92822]: {{site.repo.flutter}}/pull/92822
[#81336]: {{site.repo.flutter}}/pull/81336
[#85144]: {{site.repo.flutter}}/pull/85144
[#118658]: {{site.repo.flutter}}/pull/118658
[#119360]: {{site.repo.flutter}}/pull/119360
[#120577]: {{site.repo.flutter}}/pull/120577
[#120932]: {{site.repo.flutter}}/pull/120932

---

### `AppBar`, `SliverAppBar`, and `AppBarTheme` updates

### `AppBar`、`SliverAppBar` 与 `AppBarTheme` 的更新

Supported by Flutter Fix: yes

Flutter Fix 支持：是

In v2.4, several changes were made to the app bar classes and their themes to
better align with Material Design. Several properties were deprecated at that
time and have been removed.

在 v2.4 中，应用栏类及其主题做了若干改动，
以便更好地对齐 Material Design。
当时有若干属性被弃用，现已移除。

For `AppBar`, `SliverAppBar` and `AppBarTheme`:

对于 `AppBar`、`SliverAppBar` 和 `AppBarTheme`：

* `brightness` has been removed, and is replaced by `systemOverlayStyle`

  `brightness` 已移除，由 `systemOverlayStyle` 替代。

* `textTheme` has been removed, and is replaced by either `toolbarTextStyle` or `titleTextStyle`.

  `textTheme` 已移除，由 `toolbarTextStyle` 或 `titleTextStyle` 替代。

* `backwardsCompatibility` can be removed, as it was a temporary migration flag for these properties.

  `backwardsCompatibility` 可以删除，它只是这些属性的临时迁移标志。

Additionally, `AppBarTheme.color` was removed, with `AppBarTheme.backgroundColor`
as its replacement.

此外，`AppBarTheme.color` 已移除，
由 `AppBarTheme.backgroundColor` 替代。

**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
var toolbarTextStyle = TextStyle(...);
var titleTextStyle = TextStyle(...);
AppBar(
  brightness: Brightness.light,
  textTheme: TextTheme(
    bodyMedium: toolbarTextStyle,
    titleLarge: titleTextStyle,
  )
  backwardsCompatibility: true,
);
AppBarTheme(color: Colors.blue);
```

Code after migration:

迁移后的代码：

```dart
var toolbarTextStyle = TextStyle(...);
var titleTextStyle = TextStyle(...);
AppBar(
  systemOverlayStyle: SystemOverlayStyle(statusBarBrightness: Brightness.light),
  toolbarTextStyle: toolbarTextStyle,
  titleTextStyle: titleTextStyle,
);
AppBarTheme(backgroundColor: Colors.blue);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`AppBar`][]
* [`SliverAppBar`][]
* [`AppBarTheme`][]

Relevant issues:

相关 issue：

* [#86127][]
* [#70645][]
* [#67921][]
* [#67497][]
* [#50606][]
* [#51820][]
* [#61618][]

Deprecated in:

弃用于：

* [#86198][]
* [#71184][]

Removed in:

移除于：

* [#120618][]
* [#119253][]
* [#120575][]


[`AppBar`]: {{site.api}}/flutter/material/AppBar-class.html
[`SliverAppBar`]: {{site.api}}/flutter/material/SliverAppBar-class.html
[`AppBarTheme`]: {{site.api}}/flutter/material/AppBarTheme-class.html
[#86127]: {{site.repo.flutter}}/pull/86127
[#70645]: {{site.repo.flutter}}/pull/70645
[#67921]: {{site.repo.flutter}}/pull/67921
[#67497]: {{site.repo.flutter}}/pull/67497
[#50606]: {{site.repo.flutter}}/pull/50606
[#51820]: {{site.repo.flutter}}/pull/51820
[#61618]: {{site.repo.flutter}}/pull/61618
[#86198]: {{site.repo.flutter}}/pull/86198
[#71184]: {{site.repo.flutter}}/pull/71184
[#120618]: {{site.repo.flutter}}/pull/120618
[#119253]: {{site.repo.flutter}}/pull/119253
[#120575]: {{site.repo.flutter}}/pull/120575

---

### `SystemChrome.setEnabledSystemUIOverlays`

### `SystemChrome.setEnabledSystemUIOverlays` 方法

Supported by Flutter Fix: yes

Flutter Fix 支持：是

In v2.3, `SystemChrome.setEnabledSystemUIOVerlays`, the static method for
setting device system level overlays like status and navigation bars, was
deprecated in favor of `SystemChrome.setEnabledSystemUIMode`.

在 v2.3 中，用于设置设备系统级遮罩
（例如状态栏和导航栏）的静态方法
`SystemChrome.setEnabledSystemUIOVerlays` 已弃用，
请改用 `SystemChrome.setEnabledSystemUIMode`。

This change allowed for setting up common fullscreen modes that match native
Android app designs like edge to edge.

此改动可以设置与原生 Android 应用设计一致的常见全屏模式，
例如边到边。

Manually setting overlays, instead of choosing a specific mode, is still
supported through `SystemUiMode.manual`, allowing developers to pass the same
list of overlays as before.

如果不选择特定模式，而是手动设置遮罩，
仍然可以通过 `SystemUiMode.manual` 实现，
开发者可以像以前一样传入同一份遮罩列表。

**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
SystemChrome.setEnabledSystemUIOverlays(<SystemUiOverlay>[
  SystemUiOverlay.top,
  SystemUiOverlay.bottom,
]);
```

Code after migration:

迁移后的代码：

```dart
SystemChrome.setEnabledSystemUIMode(
  SystemUiMode.manual,
  overlays: <SystemUiOverlay>[
    SystemUiOverlay.top,
    SystemUiOverlay.bottom,
  ],
);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`SystemChrome`][]

Relevant issues:

相关 issue：

* [#35748][]
* [#40974][]
* [#44033][]
* [#63761][]
* [#69999][]

Deprecated in:

弃用于：

* [#81303][]

Removed in:

移除于：

* [#11957][]

[`SystemChrome`]: {{site.api}}/flutter/services/SystemChrome-class.html
[#35748]: {{site.repo.flutter}}/pull/35748
[#40974]: {{site.repo.flutter}}/pull/40974
[#44033]: {{site.repo.flutter}}/pull/44033
[#63761]: {{site.repo.flutter}}/pull/63761
[#69999]: {{site.repo.flutter}}/pull/69999
[#81303]: {{site.repo.flutter}}/pull/81303
[#11957]: {{site.repo.flutter}}/pull/11957

---

### `SystemNavigator.routeUpdated`

### `SystemNavigator.routeUpdated` 方法

Supported by Flutter Fix: yes

Flutter Fix 支持：是

In v2.3, `SystemNavigator.routeUpdated` was deprecated in favor of
`SystemNavigator.routeInformationUpdated`.

在 v2.3 中，`SystemNavigator.routeUpdated` 已弃用，
请改用 `SystemNavigator.routeInformationUpdated`。

Instead of having two ways to update the engine about the current route, the
change moved everything to one API, which separately selects the single-entry
history mode if a `Navigator` that reports routes is created.

不再用两种方式向引擎更新当前路由，
此改动把一切集中到一个 API。
如果创建了会报告路由的 `Navigator`，
该 API 会另行选择单条目历史模式。

**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
SystemNavigator.routeUpdated(routeName: 'foo', previousRouteName: 'bar');
```

Code after migration:

迁移后的代码：

```dart
SystemNavigator.routeInformationUpdated(location: 'foo');
```

**References**

**参考资料**

API documentation:

API 文档：

* [`SystemNavigator`][]

Relevant issues:

相关 issue：

* [#82574][]

Deprecated in:

弃用于：

* [#82594][]

Removed in:

移除于：

* [#119187][]


[`SystemNavigator`]: {{site.api}}/flutter/services/SystemNavigator-class.html
[#82594]: {{site.repo.flutter}}/pull/82594
[#82574]: {{site.repo.flutter}}/pull/82574
[#119187]: {{site.repo.flutter}}/pull/119187

---

### `AnimatedSize.vsync`

### `AnimatedSize.vsync` 属性

Supported by Flutter Fix: yes

Flutter Fix 支持：是

In v2.2, `AnimatedSize.vsyc` was deprecated. This property was no longer
necessary after `AnimatedSize` was converted to a `StatefulWidget` whose `State`
mixed in `SingleTickerProviderStateMixin`. The change was made to fix a memory
leak.

`AnimatedSize.vsyc` 已在 v2.2 弃用。
`AnimatedSize` 改为 `StatefulWidget` 之后，
其 `State` 混入了 `SingleTickerProviderStateMixin`，
该属性不再需要。此改动是为了修复内存泄漏。

Uses of `vsync` should be removed, as `AnimatedSize` now handles this property.

`vsync` 的用法应当删除，因为 `AnimatedSize` 现在会自行处理该属性。

**Migration guide**

**迁移指南**

Code before migration:

迁移前的代码：

```dart
AnimatedSize(
  vsync: this,
  // ...
);
```

Code after migration:

迁移后的代码：

```dart
AnimatedSize(
  // ...
);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`AnimatedSize`][]

Deprecated in:

弃用于：

* [#80554][]
* [#81067][]

Removed in:

移除于：

* [#119186][]

[`AnimatedSize`]: {{site.api}}/flutter/widgets/AnimatedSize-class.html
[#80554]: {{site.repo.flutter}}/pull/80554
[#81067]: {{site.repo.flutter}}/pull/81067
[#119186]: {{site.repo.flutter}}/pull/119186

---

## Timeline

## 时间线

In stable release: 3.10

进入稳定版：3.10
