---
# title: Deprecated API removed after v1.22
title: v1.22 之后移除的已弃用 API
# description: >
#   After reaching end of life,
#   the following deprecated APIs were removed from Flutter.
description: >
  以下已弃用 API 在到达生命周期终点后，
  已从 Flutter 中移除。
ai-translated: true
---

## Summary

## 概要

In accordance with Flutter's [Deprecation Policy][],
deprecated APIs that reached end of life after the
1.22 stable release have been removed.
This is the first time that deprecated APIs
have been removed from Flutter,
and some of these deprecations predate our
migration guide policy.

根据 Flutter 的 [弃用政策][Deprecation Policy]，
在 1.22 稳定版之后到达生命周期终点的已弃用 API 已被移除。
这是 Flutter 首次移除已弃用的 API，
其中部分弃用早于迁移指南政策。

All affected APIs have been compiled into this
primary source to aid in migration. A
[quick reference sheet][] is available as well.

所有受影响的 API 都汇总在这份主要资料中，以便迁移。
另有一份 [快速参考表][quick reference sheet]。

A [design document][] and [article][] are available
for more context on Flutter's deprecation policy.

关于 Flutter 弃用政策的更多背景，
可以阅读 [设计文档][design document] 和 [文章][article]。

[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-1-22
[design document]: /go/deprecation-lifetime
[article]: {{site.flutter-blog}}/deprecation-lifetime-in-flutter-e4d76ee738ad

## Changes

## 变更

This section lists the deprecations, listed by the affected class.

本节按受影响的类列出这些弃用项。

### `CupertinoDialog`

### `CupertinoDialog` 类

Supported by fix tool: IDE fix only.

是否支持修复工具：仅 IDE 修复。

`CupertinoDialog` was deprecated in v0.2.3.
Use `CupertinoAlertDialog` or `CupertinoPopupSurface` instead.

`CupertinoDialog` 已在 v0.2.3 中弃用。
请改用 `CupertinoAlertDialog` 或 `CupertinoPopupSurface`。

**Migration guide**

**迁移指南**

*CupertinoAlertDialog*

**改用 CupertinoAlertDialog**

Code before migration:

迁移之前的代码：

```dart
CupertinoDialog(child: myWidget);
```

Code after migration:

迁移之后的代码：

```dart
CupertinoAlertDialog(content: myWidget);
```

*CupertinoPopupSurface*

**改用 CupertinoPopupSurface**

Code before migration:

迁移之前的代码：

```dart
CupertinoDialog(child: myWidget);
```

Code after migration:

迁移之后的代码：

```dart
CupertinoPopupSurface(child: myWidget);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`CupertinoAlertDialog`][]
* [`CupertinoPopupSurface`][]

Relevant issues:

相关 issue：

* [Deprecate CupertinoDialog class][]

  [弃用 CupertinoDialog 类][Deprecate CupertinoDialog class]

Relevant PRs:

相关 PR：

* Deprecated in [#20649][]

  弃用于 [#20649][]

* Removed in [#73604][]

  移除于 [#73604][]

[`CupertinoAlertDialog`]: {{site.api}}/flutter/cupertino/CupertinoAlertDialog-class.html
[`CupertinoPopupSurface`]: {{site.api}}/flutter/cupertino/CupertinoPopupSurface-class.html
[Deprecate CupertinoDialog class]: {{site.repo.flutter}}/issues/20397
[#20649]: {{site.repo.flutter}}/pull/20649
[#73604]: {{site.repo.flutter}}/pull/73604

---

### Cupertino navigation bars' `actionsForegroundColor`

### Cupertino 导航栏的 `actionsForegroundColor`

Supported by fix tool: No

是否支持修复工具：否

`CupertinoNavigationBar.actionsForegroundColor`
and `CupertinoSliverNavigationBar.actionsForegroundColor`
were deprecated in v1.1.2.
Setting `primaryColor` in your `CupertinoTheme` propagates this instead.
To access the `primaryColor`,
call `CupertinoTheme.of(context).primaryColor`.

`CupertinoNavigationBar.actionsForegroundColor`
和 `CupertinoSliverNavigationBar.actionsForegroundColor`
已在 v1.1.2 中弃用。
改为在 `CupertinoTheme` 中设置 `primaryColor` 即可传递该颜色。
要访问 `primaryColor`，
调用 `CupertinoTheme.of(context).primaryColor`。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
CupertinoNavigationBar(
  actionsForegroundColor: CupertinoColors.systemBlue,
);
CupertinoSliverNavigationBar(
  actionsForegroundColor: CupertinoColors.systemBlue,
);
```

Code after migration:

迁移之后的代码：

```dart
CupertinoTheme(
  data: CupertinoThemeData(
    primaryColor: CupertinoColors.systemBlue
  ),
  child: ...
);

// To access the color from the `CupertinoTheme`
CupertinoTheme.of(context).primaryColor;
```

**References**

**参考资料**

API documentation:

API 文档：

* [`CupertinoNavigationBar`][]
* [`CupertinoSliverNavigationBar`][]
* [`CupertinoTheme`][]
* [`CupertinoThemeData`][]

Relevant issues:

相关 issue：

* [Create a CupertinoApp and a CupertinoTheme][]

  [创建 CupertinoApp 和
  CupertinoTheme][Create a CupertinoApp and a CupertinoTheme]

Relevant PRs:

相关 PR：

* Deprecated in [#23759][]

  弃用于 [#23759][]

* Removed in [#73745][]

  移除于 [#73745][]

[`CupertinoNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoNavigationBar-class.html
[`CupertinoSliverNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoSliverNavigationBar-class.html
[`CupertinoTheme`]: {{site.api}}/flutter/cupertino/CupertinoTheme-class.html
[`CupertinoThemeData`]: {{site.api}}/flutter/cupertino/CupertinoThemeData-class.html
[Create a CupertinoApp and a CupertinoTheme]: {{site.repo.flutter}}/issues/18037
[#23759]: {{site.repo.flutter}}/pull/23759
[#73745]: {{site.repo.flutter}}/pull/73745

---

### `CupertinoTextThemeData.brightness`

### `CupertinoTextThemeData.brightness` 属性

Supported by fix tool: Yes

是否支持修复工具：是

`CupertinoTextThemeData.brightness` was deprecated in v1.10.14.
This field member was made ineffective at the time of deprecation.
There is no replacement for this
parameter, references should be removed.

`CupertinoTextThemeData.brightness` 已在 v1.10.14 中弃用。
弃用时这个字段成员已经失效。
该参数没有替代项，应移除相关引用。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
const CupertinoTextThemeData themeData = CupertinoTextThemeData(brightness: Brightness.dark);
themeData.copyWith(brightness: Brightness.light);
```

Code after migration:

迁移之后的代码：

```dart
const CupertinoTextThemeData themeData = CupertinoTextThemeData();
themeData.copyWith();
```

**References**

**参考资料**

API documentation:

API 文档：

* [`CupertinoTextThemeData`][]

Relevant issues:

相关 issue：

* [Revise CupertinoColors and CupertinoTheme for dynamic colors][]

  [修订 CupertinoColors 和
  CupertinoTheme 以支持动态颜色][Revise
  CupertinoColors and CupertinoTheme for dynamic colors]

Relevant PRs:

相关 PR：

* Deprecated in [#41859][]

  弃用于 [#41859][]

* Removed in [#72017][]

  移除于 [#72017][]

[`CupertinoTextThemeData`]: {{site.api}}/flutter/cupertino/CupertinoTextThemeData-class.html
[Revise CupertinoColors and CupertinoTheme for dynamic colors]: {{site.repo.flutter}}/issues/35541
[#41859]: {{site.repo.flutter}}/pull/41859
[#72017]: {{site.repo.flutter}}/pull/72017

---

### Pointer events constructed `fromHoverEvent`

### 由 `fromHoverEvent` 构造的指针事件

Supported by fix tool: Yes

是否支持修复工具：是

The `fromHoverEvent` constructors for `PointerEnterEvent`
and `PointerExitEvent` were deprecated in v1.4.3.
The `fromMouseEvent` constructor should be used instead.

`PointerEnterEvent` 和 `PointerExitEvent` 的
`fromHoverEvent` 构造函数已在 v1.4.3 中弃用。
应改用 `fromMouseEvent` 构造函数。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
final PointerEnterEvent enterEvent = PointerEnterEvent.fromHoverEvent(PointerHoverEvent());
final PointerExitEvent exitEvent = PointerExitEvent.fromHoverEvent(PointerHoverEvent());
```

Code after migration:

迁移之后的代码：

```dart
final PointerEnterEvent enterEvent = PointerEnterEvent.fromMouseEvent(PointerHoverEvent());
final PointerExitEvent exitEvent = PointerExitEvent.fromMouseEvent(PointerHoverEvent());
```

**References**

**参考资料**

API documentation:

API 文档：

* [`PointerEnterEvent`][]
* [`PointerExitEvent`][]

Relevant issues:

相关 issue：

* [PointerEnterEvent and PointerExitEvent can only
  be created from hover events][]

  [PointerEnterEvent 与 PointerExitEvent
  只能从 hover 事件创建][PointerEnterEvent and
  PointerExitEvent can only be created from hover events]

Relevant PRs:

相关 PR：

* Deprecated in [#28602][]

  弃用于 [#28602][]

* Removed in [#72395][]

  移除于 [#72395][]

[`PointerEnterEvent`]: {{site.api}}/flutter/gestures/PointerEnterEvent-class.html
[`PointerExitEvent`]: {{site.api}}/flutter/gestures/PointerExitEvent-class.html
[PointerEnterEvent and PointerExitEvent can only be created from hover events]: {{site.repo.flutter}}/issues/29696
[#28602]: {{site.repo.flutter}}/pull/28602
[#72395]: {{site.repo.flutter}}/pull/72395

---

### `showDialog` uses `builder`

### `showDialog` 改用 `builder`

Supported by fix tool: Yes

是否支持修复工具：是

The `child` parameter of `showDialog` was deprecated in v0.2.3.
The `builder` parameter should be used instead.

`showDialog` 的 `child` 参数已在 v0.2.3 中弃用。
应改用 `builder` 参数。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
showDialog(child: myWidget);
```

Code after migration:

迁移之后的代码：

```dart
showDialog(builder: (context) => myWidget);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`showDialog`][]

Relevant issues:

相关 issue：

* [showDialog should take a builder rather than a child][]

  [showDialog 应接收 builder
  而不是 child][showDialog should take a builder rather than a child]

Relevant PRs:

相关 PR：

* Deprecated in [#15303][]

  弃用于 [#15303][]

* Removed in [#72532][]

  移除于 [#72532][]

[`showDialog`]: {{site.api}}/flutter/material/showDialog.html
[showDialog should take a builder rather than a child]: {{site.repo.flutter}}/issues/14341
[#15303]: {{site.repo.flutter}}/pull/15303
[#72532]: {{site.repo.flutter}}/pull/72532

---

### `Scaffold.resizeToAvoidBottomPadding`

### `Scaffold.resizeToAvoidBottomPadding` 参数

Supported by fix tool: Yes

是否支持修复工具：是

The `resizeToAvoidBottomPadding` parameter of `Scaffold` was deprecated in v1.1.9.
The `resizeToAvoidBottomInset` parameter should be used instead.

`Scaffold` 的 `resizeToAvoidBottomPadding` 参数已在 v1.1.9 中弃用。
应改用 `resizeToAvoidBottomInset` 参数。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
Scaffold(resizeToAvoidBottomPadding: true);
```

Code after migration:

迁移之后的代码：

```dart
Scaffold(resizeToAvoidBottomInset: true);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`Scaffold`][]

Relevant issues:

相关 issue：

* [Show warning when nesting Scaffolds][]

  [嵌套 Scaffold 时显示警告][Show warning when nesting Scaffolds]

* [SafeArea with keyboard][]

  [配合键盘使用的 SafeArea][SafeArea with keyboard]

* [Double stacked material scaffolds shouldn't double resizeToAvoidBottomPadding][]

  [双层叠放的 Material Scaffold
  不应把 resizeToAvoidBottomPadding 应用两次][Double stacked
  material scaffolds shouldn't double resizeToAvoidBottomPadding]

* [viewInsets and padding on Window and MediaQueryData should define how they interact][]

  [应定义 Window 与 MediaQueryData 上
  viewInsets 和 padding 的相互作用][viewInsets and padding
  on Window and MediaQueryData should define how they interact]

* [bottom overflow issue, when using textfields inside tabbarview][]

  [在 TabBarView 内使用文本框时的
  底部溢出问题][bottom overflow issue, when using textfields inside tabbarview]

Relevant PRs:

相关 PR：

* Deprecated in [#26259][]

  弃用于 [#26259][]

* Removed in [#72890][]

  移除于 [#72890][]

[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[Show warning when nesting Scaffolds]: {{site.repo.flutter}}/issues/23106
[SafeArea with keyboard]: {{site.repo.flutter}}/issues/25758
[Double stacked material scaffolds shouldn't double resizeToAvoidBottomPadding]: {{site.repo.flutter}}/issues/12084
[viewInsets and padding on Window and MediaQueryData should define how they interact]: {{site.repo.flutter}}/issues/15424
[bottom overflow issue, when using textfields inside tabbarview]: {{site.repo.flutter}}/issues/20295
[#26259]: {{site.repo.flutter}}/pull/26259
[#72890]: {{site.repo.flutter}}/pull/72890

---

### `ButtonTheme.bar`

### `ButtonTheme.bar` 构造函数

Supported by fix tool: No

是否支持修复工具：否

The `bar` constructor of `ButtonTheme` was deprecated in v1.9.1.
`ButtonBarTheme` can be used instead for `ButtonBar`s,
or use another constructor of `ButtonTheme`
if the use is not specific to `ButtonBar`.

`ButtonTheme` 的 `bar` 构造函数已在 v1.9.1 中弃用。
针对 `ButtonBar` 可以改用 `ButtonBarTheme`；
如果用途并不特定于 `ButtonBar`，
则使用 `ButtonTheme` 的其他构造函数。

Button-specific theming is also available with the `TextButtonTheme`,
`ElevatedButtonTheme`, and `OutlinedButtonTheme` classes,
each corresponding with the appropriate button class,
`TextButton`, `ElevatedButton` and `OutlinedButton`.

也可以用 `TextButtonTheme`、`ElevatedButtonTheme`
和 `OutlinedButtonTheme` 类做按钮专属主题，
它们分别对应 `TextButton`、`ElevatedButton` 和 `OutlinedButton`。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
ButtonTheme.bar(
  minWidth: 10.0,
  alignedDropdown: true,
  height: 40.0,
);
```

Code after migration, using `ButtonTheme`:

迁移之后的代码，使用 `ButtonTheme`：

```dart
ButtonTheme(
  minWidth: 10.0,
  alignedDropdown: true,
  height: 40.0,
);
```

Code after migration, using `ButtonBarTheme`:

迁移之后的代码，使用 `ButtonBarTheme`：

```dart
ButtonBarTheme(
  data: ButtonBarThemeData(
    buttonMinWidth: 10.0,
    buttonAlignedDropdown: true,
    buttonHeight: 40.0,
  )
);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`ButtonTheme`][]
* [`ButtonBarTheme`][]
* [`ButtonBar`][]
* [`TextButtonTheme`][]
* [`TextButton`][]
* [`ElevatedButtonTheme`][]
* [`ElevatedButton`][]
* [`OutlinedButtonTheme`][]
* [`OutlinedButton`][]

Relevant issues:

相关 issue：

* [ButtonTheme.bar uses accent color when it should be using primary color][]

  [ButtonTheme.bar 使用了 accent 颜色，
  但它应该使用 primary 颜色][ButtonTheme.bar uses accent
  color when it should be using primary color]

* [ThemeData.accentColor has insufficient contrast for text][]

  [ThemeData.accentColor
  与文本的对比度不足][ThemeData.accentColor has insufficient contrast for text]

* [Increased height as a result of changes to materialTapTargetSize affecting AlertDialog/ButtonBar heights][]

  [materialTapTargetSize 的改动增加了高度，影响
  AlertDialog 和 ButtonBar 的高度][Increased height as a
  result of changes to materialTapTargetSize affecting
  AlertDialog/ButtonBar heights]

Relevant PRs:

相关 PR：

* Deprecated in [#37544][]

  弃用于 [#37544][]

* Removed in [#73746][]

  移除于 [#73746][]

[`ButtonTheme`]: {{site.api}}/flutter/material/ButtonTheme-class.html
[`ButtonBarTheme`]: {{site.api}}/flutter/material/ButtonBarTheme-class.html
[`ButtonBar`]: {{site.api}}/flutter/material/ButtonBar-class.html
[`TextButtonTheme`]: {{site.api}}/flutter/material/TextButtonTheme-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[`ElevatedButtonTheme`]: {{site.api}}/flutter/material/ElevatedButtonTheme-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`OutlinedButtonTheme`]: {{site.api}}/flutter/material/OutlinedButtonTheme-class.html
[`OutlinedButton`]: {{site.api}}/flutter/material/OutlinedButton-class.html
[ButtonTheme.bar uses accent color when it should be using primary color]: {{site.repo.flutter}}/issues/31333
[ThemeData.accentColor has insufficient contrast for text]: {{site.repo.flutter}}/issues/19946
[Increased height as a result of changes to materialTapTargetSize affecting AlertDialog/ButtonBar heights]: {{site.repo.flutter}}/issues/20585
[#37544]: {{site.repo.flutter}}/pull/37544
[#73746]: {{site.repo.flutter}}/pull/73746

---

### `InlineSpan`, `TextSpan`, `PlaceholderSpan`

### `InlineSpan`、`TextSpan` 与 `PlaceholderSpan` 类

Supported by fix tool: No

是否支持修复工具：否

The following methods were deprecated in the
`InlineSpan`, `TextSpan` and `PlaceholderSpan` in order
to enable embedding widgets inline into paragraphs, like images.

为了能在段落中内嵌 widget（例如图片），`InlineSpan`、
`TextSpan` 和 `PlaceholderSpan` 中的以下方法已弃用。

**Migration guide**

**迁移指南**

<t>Code before migration</t><t>之前</t> | <t>Code after migration</t><t>之后</t>
-- | --
`InlineSpan.text` | `TextSpan.text`
`InlineSpan.text` | `TextSpan.text`
`InlineSpan.children` | `TextSpan.children`
`InlineSpan.children` | `TextSpan.children`
`InlineSpan.visitTextSpan` | `InlineSpan.visitChildren`
`InlineSpan.visitTextSpan` | `InlineSpan.visitChildren`
`InlineSpan.recognizer` | `TextSpan.recognizer`
`InlineSpan.recognizer` | `TextSpan.recognizer`
`InlineSpan.describeSemantics` | `InlineSpan.computeSemanticsInformation`
`InlineSpan.describeSemantics` | `InlineSpan.computeSemanticsInformation`
`PlaceholderSpan.visitTextSpan` | `PlaceHolderSpan.visitChildren`
`PlaceholderSpan.visitTextSpan` | `PlaceHolderSpan.visitChildren`
`TextSpan.visitTextSpan` |  `TextSpan.visitChildren`
`TextSpan.visitTextSpan` |  `TextSpan.visitChildren`

**References**

**参考资料**

API documentation:

API 文档：

* [`InlineSpan`][]
* [`TextSpan`][]
* [`PlaceholderSpan`][]
* [`WidgetSpan`][]

Relevant issues:

相关 issue：

* [Text: support inline images][]

  [文本：支持内嵌图片][Text: support inline images]

Relevant PRs:

相关 PR：

* Development history:
  * [#30069][]
  * [#33946][]
  * [#33794][]

  开发历史：

* Deprecated in [#34051][]

  弃用于 [#34051][]

* Removed in [#73747][]

  移除于 [#73747][]

[`InlineSpan`]: {{site.api}}/flutter/painting/InlineSpan-class.html
[`TextSpan`]: {{site.api}}/flutter/painting/TextSpan-class.html
[`PlaceholderSpan`]: {{site.api}}/flutter/painting/PlaceholderSpan-class.html
[`WidgetSpan`]: {{site.api}}/flutter/widgets/WidgetSpan-class.html
[Text: support inline images]: {{site.repo.flutter}}/issues/2022
[#30069]: {{site.repo.flutter}}/pull/30069
[#33946]: {{site.repo.flutter}}/pull/33946
[#33794]: {{site.repo.flutter}}/pull/33794
[#34051]: {{site.repo.flutter}}/pull/34051
[#73747]: {{site.repo.flutter}}/pull/73747

---

### `RenderView.scheduleInitialFrame`

### `RenderView.scheduleInitialFrame` 方法

Supported by fix tool: No

是否支持修复工具：否

The `RenderView.scheduleInitialFrame` method was deprecated and removed in
order to prevent splash screens from being taken down too early,
resulting in a black screen.
This would happen when `WidgetsFlutterBinding.ensureInitialized` was called.
Instead, replace calls to this method with `RenderView.prepareInitialFrame`,
followed by `RenderView.owner.requestVisualUpdate`.

`RenderView.scheduleInitialFrame` 方法已弃用并移除，
以避免启动画面被过早撤下，从而导致黑屏。
调用 `WidgetsFlutterBinding.ensureInitialized` 时就会发生这种情况。
请把对该方法的调用替换为 `RenderView.prepareInitialFrame`，
然后再调用 `RenderView.owner.requestVisualUpdate`。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
scheduleInitialFrame();
```

Code after migration:

迁移之后的代码：

```dart
prepareInitialFrame();
owner.requestVisualUpdate();
```

**References**

**参考资料**

API documentation:

API 文档：

* [`RenderView`][]
* [`WidgetsFlutterBinding`][]

Relevant issues:

相关 issue：

* [WidgetsFlutterBinding.ensureInitialized() takes down splash screen too early][]

  [WidgetsFlutterBinding.ensureInitialized()
  过早撤下启动画面][WidgetsFlutterBinding.ensureInitialized()
  takes down splash screen too early]

Relevant PRs:

相关 PR：

* Deprecated in [#39535][]

  弃用于 [#39535][]

* Removed in [#73748][]

  移除于 [#73748][]

[`RenderView`]: {{site.api}}/flutter/rendering/RenderView-class.html
[`TextSpan`]: {{site.api}}/flutter/widgets/WidgetsFlutterBinding-class.html
[`WidgetsFlutterBinding`]: {{site.api}}/flutter/widgets/WidgetsFlutterBinding-class.html
[WidgetsFlutterBinding.ensureInitialized() takes down splash screen too early]: {{site.repo.flutter}}/issues/39494
[#39535]: {{site.repo.flutter}}/pull/39535
[#73748]: {{site.repo.flutter}}/pull/73748

---

### `Layer.findAll`

### `Layer.findAll` 方法

Supported by fix tool: No

是否支持修复工具：否

The `Layer.findAll` method was deprecated with the
introduction of `Layer.findAnnotations` in order to unify
the implementations of `find` and `findAll`.
To migrate affected code, call `findAllAnnotations` instead.
This method returns an `AnnotationResult`, containing the former
return value of `findAll` in `AnnotationResult.annotations`.

随着 `Layer.findAnnotations` 的引入，`Layer.findAll` 方法已弃用，
以便统一 `find` 和 `findAll` 的实现。
要迁移受影响的代码，请改为调用 `findAllAnnotations`。
该方法返回 `AnnotationResult`，
原先 `findAll` 的返回值位于 `AnnotationResult.annotations` 中。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
findAll(offset);
```

Code after migration:

迁移之后的代码：

```dart
findAllAnnotations(offset).annotations;
```

**References**

**参考资料**

API documentation:

API 文档：

* [`Layer`][]
* [`MouseRegion`][]
* [`RenderMouseRegion`][]
* [`AnnotatedRegionLayer`][]
* [`AnnotationResult`][]

Relevant issues:

相关 issue：

* [Breaking Proposal: MouseRegion defaults to opaque; Layers are required to implement findAnnotations][]

  [破坏性提案：MouseRegion 默认不透明；Layer
  必须实现 findAnnotations][Breaking Proposal:
  MouseRegion defaults to opaque; Layers are required
  to implement findAnnotations]

Relevant PRs:

相关 PR：

* Initially changed in [#37896][]

  最初变更于 [#37896][]

* Deprecated in [#42953][]

  弃用于 [#42953][]

* Removed in [#73749][]

  移除于 [#73749][]

[`Layer`]: {{site.api}}/flutter/rendering/Layer-class.html
[`MouseRegion`]: {{site.api}}/flutter/widgets/MouseRegion-class.html
[`RenderMouseRegion`]: {{site.api}}/flutter/rendering/RenderMouseRegion-class.html
[`AnnotatedRegionLayer`]: {{site.api}}/flutter/rendering/AnnotatedRegionLayer-class.html
[`AnnotationResult`]: {{site.api}}/flutter/rendering/AnnotationResult-class.html
[Breaking Proposal: MouseRegion defaults to opaque; Layers are required to implement findAnnotations]: {{site.repo.flutter}}/issues/38488
[#37896]: {{site.repo.flutter}}/pull/37896
[#42953]: {{site.repo.flutter}}/pull/42953
[#73749]: {{site.repo.flutter}}/pull/73749

---

### `BinaryMessages`

### `BinaryMessages` 类

Supported by fix tool: No

是否支持修复工具：否

The `BinaryMessages` class, its associated static methods and the `defaultBinaryMessenger` getter
were deprecated and removed. The `defaultBinaryMessenger` instance was moved to `ServicesBinding`.
This made it possible to register a different default `BinaryMessenger` under testing environment,
by creating a `ServicesBinding` subclass for testing. Doing so allows you to track the number of
pending platform messages for synchronization purposes.

`BinaryMessages` 类、它的相关静态方法以及 `defaultBinaryMessenger` getter
已弃用并移除。`defaultBinaryMessenger` 实例已移到 `ServicesBinding`。
这样就可以通过创建用于测试的 `ServicesBinding` 子类，
在测试环境中注册不同的默认 `BinaryMessenger`。
由此可以跟踪待处理的平台消息数量，以便同步。

**Migration guide**

**迁移指南**

<t>Code before migration:</t><t>之前</t> | <t>Code after migration:</t><t>之后</t>
-- | --
`defaultBinaryMessenger` | `ServicesBinding.instance.defaultBinaryMessenger`
`defaultBinaryMessenger` | `ServicesBinding.instance.defaultBinaryMessenger`
`BinaryMessages` | `BinaryMessenger`
`BinaryMessages` | `BinaryMessenger`
`BinaryMessages.handlePlatformMessage` | `ServicesBinding.instance.defaultBinaryMessenger.handlePlatformMessage`
`BinaryMessages.handlePlatformMessage` | `ServicesBinding.instance.defaultBinaryMessenger.handlePlatformMessage`
`BinaryMessages.send` | `ServicesBinding.instance.defaultBinaryMessenger.send`
`BinaryMessages.send` | `ServicesBinding.instance.defaultBinaryMessenger.send`
`BinaryMessages.setMessageHandler` | `ServicesBinding.instance.defaultBinaryMessenger.setMessageHandler`
`BinaryMessages.setMessageHandler` | `ServicesBinding.instance.defaultBinaryMessenger.setMessageHandler`
`BinaryMessages.setMockMessageHandler` | `ServicesBinding.instance.defaultBinaryMessenger.setMockMessageHandler`
`BinaryMessages.setMockMessageHandler` | `ServicesBinding.instance.defaultBinaryMessenger.setMockMessageHandler`

**References**

**参考资料**

API documentation:

API 文档：

* [`ServicesBinding`][]
* [`BinaryMessenger`][]

Relevant issues:

相关 issue：

* [Flutter synchronization support for Espresso/EarlGrey][]

  [Flutter 对 Espresso/EarlGrey
  的同步支持][Flutter synchronization support for Espresso/EarlGrey]

Relevant PRs:

相关 PR：

* Initially changed in [#37489][]

  最初变更于 [#37489][]

* Deprecated in [#38464][]

  弃用于 [#38464][]

* Removed in [#73750][]

  移除于 [#73750][]

[`ServicesBinding`]: {{site.api}}/flutter/services/ServicesBinding-mixin.html
[`BinaryMessenger`]: {{site.api}}/flutter/services/BinaryMessenger-class.html
[Flutter synchronization support for Espresso/EarlGrey]: {{site.repo.flutter}}/issues/37409
[#37489]: {{site.repo.flutter}}/pull/37489
[#38464]: {{site.repo.flutter}}/pull/38464
[#73750]: {{site.repo.flutter}}/pull/73750

---

### Generic methods for `BuildContext`

### `BuildContext` 的泛型方法

Supported by fix tool: Yes

是否支持修复工具：是

Several methods in `BuildContext` were using `Type` to search for ancestors.
Most of those methods implied a cast at call site because
their return type was a parent type.
Moreover the type provided was not checked at analysis time
even if the type is actually constrained.
Making these methods generics improves type safety and requires less code.

`BuildContext` 中的若干方法曾用 `Type` 查找祖先。
其中大多数方法的返回类型是父类型，
因此调用处通常需要强制转换。
而且，即使类型实际上受到约束，
分析时也不会检查所提供的类型。
把这些方法改成泛型可以提高类型安全性，并减少代码。

These method changes affect
the `BuildContext`, `Element`, and `StatefulElement` classes.
The `TypeMatcher` class was also removed.

这些方法变更影响
`BuildContext`、`Element` 和 `StatefulElement` 类。`TypeMatcher`
类也已移除。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
ComplexLayoutState state = context.ancestorStateOfType(const TypeMatcher<ComplexLayoutState>()) as ComplexLayoutState;
```

Code after migration:

迁移之后的代码：

```dart
ComplexLayoutState state = context.ancestorStateOfType<ComplexLayoutState>();
```

`BuildContext`

`BuildContext` 类

<t>Code before migration:</t><t>之前</t> | <t>Code after migration:</t><t>之后</t>
--  | --
`inheritFromElement` | `dependOnInheritedElement`
`inheritFromElement` | `dependOnInheritedElement`
`inheritFromWidgetOfExactType` | `dependOnInheritedWidgetOfExactType`
`inheritFromWidgetOfExactType` | `dependOnInheritedWidgetOfExactType`
`ancestorInheritedElementForWidgetOfExactType` | `getElementForInheritedWidgetOfExactType`
`ancestorInheritedElementForWidgetOfExactType` | `getElementForInheritedWidgetOfExactType`
`ancestorWidgetOfExactType` | `findAncestorWidgetOfExactType`
`ancestorWidgetOfExactType` | `findAncestorWidgetOfExactType`
`ancestorStateOfType` | `findAncestorStateOfType`
`ancestorStateOfType` | `findAncestorStateOfType`
`rootAncestorStateOfType` | `findRootAncestorStateOfType`
`rootAncestorStateOfType` | `findRootAncestorStateOfType`
`ancestorRenderObjectOfType` | `findAncestorRenderObjectOfType`
`ancestorRenderObjectOfType` | `findAncestorRenderObjectOfType`

`Element`

`Element` 类

<t>Code before migration:</t><t>之前</t> | <t>Code after migration:</t><t>之后</t>
--  | --
`inheritFromElement` | `dependOnInheritedElement`
`inheritFromElement` | `dependOnInheritedElement`
`inheritFromWidgetOfExactType` | `dependOnInheritedWidgetOfExactType`
`inheritFromWidgetOfExactType` | `dependOnInheritedWidgetOfExactType`
`ancestorInheritedElementForWidgetOfExactType` | `getElementForInheritedWidgetOfExactType`
`ancestorInheritedElementForWidgetOfExactType` | `getElementForInheritedWidgetOfExactType`
`ancestorWidgetOfExactType` | `findAncestorWidgetOfExactType`
`ancestorWidgetOfExactType` | `findAncestorWidgetOfExactType`
`ancestorStateOfType` | `findAncestorStateOfType`
`ancestorStateOfType` | `findAncestorStateOfType`
`rootAncestorStateOfType` | `findRootAncestorStateOfType`
`rootAncestorStateOfType` | `findRootAncestorStateOfType`
`ancestorRenderObjectOfType` | `findAncestorRenderObjectOfType`
`ancestorRenderObjectOfType` | `findAncestorRenderObjectOfType`

`StatefulElement`

`StatefulElement` 类

<t>Code before migration:</t><t>之前</t> | <t>Code after migration:</t><t>之后</t>
--  | --
`inheritFromElement` | `dependOnInheritedElement`
`inheritFromElement` | `dependOnInheritedElement`

**References**

**参考资料**

API documentation:

API 文档：

* [`Type`][]
* [`BuildContext`][]
* [`Element`][]
* [`StatefulElement`][]

Relevant PRs:

相关 PR：

* Deprecated in [#44189][]

  弃用于 [#44189][]

* Removed in:
  * [#69620][]
  * [#72903][]
  * [#72901][]
  * [#73751][]

  移除于：

[`Type`]: {{site.api}}/flutter/dart-core/Type-class.html
[`BuildContext`]: {{site.api}}/flutter/widgets/BuildContext-class.html
[`Element`]: {{site.api}}/flutter/widgets/Element-class.html
[`StatefulElement`]: {{site.api}}/flutter/widgets/StatefulElement-class.html
[#44189]: {{site.repo.flutter}}/pull/44189
[#69620]: {{site.repo.flutter}}/pull/69620
[#72903]: {{site.repo.flutter}}/pull/72903
[#72901]: {{site.repo.flutter}}/pull/72901
[#73751]: {{site.repo.flutter}}/pull/73751

---

### `WidgetsBinding.deferFirstFrameReport` & `WidgetsBinding.allowFirstFrameReport`

### `deferFirstFrameReport` 与 `allowFirstFrameReport` 方法

Supported by fix tool: Yes

是否支持修复工具：是

The `deferFirstFrameReport` and `allowFirstFrameReport` methods
of `WidgetsBinding` were deprecated and removed in order to
provide the option to delay rendering the first frame.
This is useful for widgets that need to obtain initialization
information asynchronously and while they are waiting for
that information no frame should render as that would take
down the splash screen pre-maturely.
The `deferFirstFrame` and `allowFirstFrame` methods
should be used respectively instead.

`WidgetsBinding` 的 `deferFirstFrameReport` 和
`allowFirstFrameReport` 方法已弃用并移除，
以便提供延迟渲染第一帧的选项。
这对需要异步获取初始化信息的 widget 很有用：
在等待该信息时不应渲染任何帧，
否则会过早撤下启动画面。
应分别改用 `deferFirstFrame` 和 `allowFirstFrame` 方法。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
final WidgetsBinding binding = WidgetsBinding.instance;
binding.deferFirstFrameReport();
binding.allowFirstFrameReport();
```

Code after migration:

迁移之后的代码：

```dart
final WidgetsBinding binding = WidgetsBinding.instance;
binding.deferFirstFrame();
binding.allowFirstFrame();
```

**References**

**参考资料**

API documentation:

API 文档：

* [`WidgetsBinding`][]

Relevant PRs:

相关 PR：

* Initially changed in
  * [#45135][]
  * [#45588][]

  最初变更于：

* Deprecated in [#45941][]

  弃用于 [#45941][]

* Removed in [#72893][]

  移除于 [#72893][]

[`WidgetsBinding`]: {{site.api}}/flutter/widgets/WidgetsBinding-mixin.html
[#45135]: {{site.repo.flutter}}/pull/45135
[#45588]: {{site.repo.flutter}}/pull/45588
[#45941]: {{site.repo.flutter}}/pull/45941
[#72893]: {{site.repo.flutter}}/pull/72893

---

### `WaitUntilNoTransientCallbacks`, `WaitUntilNoPendingFrame`, & `WaitUntilFirstFrameRasterized`

### `WaitUntilNoTransientCallbacks` 等方法

Supported by fix tool: No

是否支持修复工具：否

The `WaitUntilNoTransientCallbacks`, `WaitUntilNoPendingFrame`, and `WaitUntilFirstFrameRasterized`
methods from the `flutter_driver` packages were deprecated and removed in order to provide a more
composable `waitForCondition` API that can be used to compose conditions that the client would like
to wait for.

`flutter_driver` package 中的
`WaitUntilNoTransientCallbacks`、`WaitUntilNoPendingFrame` 和
`WaitUntilFirstFrameRasterized`
方法已弃用并移除，以便提供更易组合的 `waitForCondition` API，
用来组合客户端希望等待的条件。

**Migration guide**

**迁移指南**

<t>Code before migration:</t><t>之前</t> | <t>Code after migration:</t><t>之后</t>
-- | --
`WaitUntilNoTransientCallbacks` | `WaitForCondition(NoTransientCallbacks())`
`WaitUntilNoTransientCallbacks` | `WaitForCondition(NoTransientCallbacks())`
`WaitUntilNoPendingFrame` | `WaitForCondition(NoPendingFrame())`
`WaitUntilNoPendingFrame` | `WaitForCondition(NoPendingFrame())`
`WaitUntilFirstFrameRasterized` | `WaitForCondition(FirstFrameRasterized))`
`WaitUntilFirstFrameRasterized` | `WaitForCondition(FirstFrameRasterized))`

**References**

**参考资料**

API documentation:

API 文档：

* [`WaitForCondition`][]

Relevant issues:

相关 issue：

* [Flutter synchronization support for Espresso/EarlGrey][]

  [Flutter 对 Espresso/EarlGrey
  的同步支持][Flutter synchronization support for Espresso/EarlGrey]

Relevant PRs:

相关 PR：

* Initially changed in [#37736][]

  最初变更于 [#37736][]

* Deprecated in [#38836][]

  弃用于 [#38836][]

* Removed in [#73754][]

  移除于 [#73754][]

[`WaitForCondition`]: {{site.api}}/flutter/flutter_driver/WaitForCondition-class.html
[#37736]: {{site.repo.flutter}}/pull/37736
[#38836]: {{site.repo.flutter}}/pull/38836
[#73754]: {{site.repo.flutter}}/pull/73754

---

## Timeline

## 时间线

In stable release: 2.0.0

进入稳定版：2.0.0
