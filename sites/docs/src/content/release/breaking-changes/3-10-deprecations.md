---
# title: Deprecated API removed after v3.10
title: v3.10 之后移除的已弃用 API
# description: >
#   After reaching end of life, the following deprecated APIs
#   were removed from Flutter.
description: >
  以下已弃用 API 在达到生命周期结束后，已从 Flutter 中移除。
ai-translated: true
---

## Summary

## 概要

In accordance with Flutter's [Deprecation Policy][],
deprecated APIs that reached end of life after the
3.10 stable release have been removed.

根据 Flutter 的 [弃用政策][Deprecation Policy]，
在 3.10 稳定版之后达到生命周期结束的已弃用 API 已被移除。

All affected APIs have been compiled into this
primary source to aid in migration. A
[quick reference sheet][] is available as well.

所有受影响的 API 都汇总在这篇主要文档中，以便迁移。
另有一份 [快速参考表][quick reference sheet]。

[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-10

## Changes

## 变更

This section lists the deprecations, listed by the package and affected class.

本节按 package 与受影响的类列出各项弃用。

### ThemeData.fixTextFieldOutlineLabel

### ThemeData.fixTextFieldOutlineLabel 属性

Package: flutter
Supported by Flutter Fix: yes

Package：flutter
由 Flutter Fix 支持：是

`ThemeData.fixTextFieldOutlineLabel` was deprecated in v2.5.
References to this property can be removed.

`ThemeData.fixTextFieldOutlineLabel` 已在 v2.5 中弃用。
可以移除对该属性的引用。

The `fixTextFieldOutlineLabel` was a temporary migration flag that allowed users
to gracefully migrate to a new behavior rather than experiencing a hard break.
Before deprecating, this property was transitioned to the new default from the
fix to the label for text fields.

`fixTextFieldOutlineLabel` 是一个临时迁移标志，
让用户可以平滑迁移到新行为，而不必经历硬性中断。
在弃用之前，该属性已从修复切换为文本字段标签的新默认值。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
var themeData = ThemeData(
  fixTextFieldOutlineLabel: true,
);
```

Code after migration:

迁移之后的代码：

```dart
var themeData = ThemeData(
);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`ThemeData`][]

Relevant PRs:

相关 PR：

* Deprecated in [#87281][]

  弃用于 [#87281][#87281]

* Removed in [#125893][]

  移除于 [#125893][#125893]

[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html

[#87281]: {{site.repo.flutter}}/pull/87281
[#125893]: {{site.repo.flutter}}/pull/125893

---

### OverscrollIndicatorNotification.disallowGlow

### OverscrollIndicatorNotification.disallowGlow 方法

Package: flutter
Supported by Flutter Fix: yes

Package：flutter
由 Flutter Fix 支持：是

`OverscrollIndicatorNotification.disallowGlow` was deprecated in v2.5.
The replacement is the `disallowIndicator` method.

`OverscrollIndicatorNotification.disallowGlow` 已在 v2.5 中弃用。
替代方法是 `disallowIndicator`。

The `disallowIndicator` was created as a replacement for the original method
with the introduction of the `StretchingOverscrollIndicator`. Previously,
the `GlowingOverscrollIndicator` was the only kind to dispatch
`OverscrollIndicatorNotification`s, and so the method was updated to better
reflect multiple kinds of indicators.

引入 `StretchingOverscrollIndicator` 后，
`disallowIndicator` 被创建出来以替代原来的方法。
此前，只有 `GlowingOverscrollIndicator` 会分发
`OverscrollIndicatorNotification`，
因此该方法已更新，以便更好地反映多种指示器。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
bool _handleOverscrollIndicatorNotification(OverscrollIndicatorNotification notification) {
  notification.disallowGlow();
  return false;
}
```

Code after migration:

迁移之后的代码：

```dart
bool _handleOverscrollIndicatorNotification(OverscrollIndicatorNotification notification) {
  notification.disallowIndicator();
  return false;
}
```

**References**

**参考资料**

API documentation:

API 文档：

* [`OverscrollIndicatorNotification`][]
* [`StretchingOverscrollIndicator`][]
* [`GlowingOverscrollIndicator`][]

Relevant PRs:

相关 PR：

* Deprecated in [#87839][]

  弃用于 [#87839][#87839]

* Removed in [#127042][]

  移除于 [#127042][#127042]

[`OverscrollIndicatorNotification`]: {{site.api}}/flutter/widgets/OverscrollIndicatorNotification-class.html
[`StretchingOverscrollIndicator`]: {{site.api}}/flutter/widgets/StretchingOverscrollIndicator-class.html
[`GlowingOverscrollIndicator`]: {{site.api}}/flutter/widgets/GlowingOverscrollIndicator-class.html

[#87839]: {{site.repo.flutter}}/pull/87839
[#127042]: {{site.repo.flutter}}/pull/127042

---

### ColorScheme primaryVariant & secondaryVariant

### ColorScheme 的 primaryVariant 与 secondaryVariant

Package: flutter
Supported by Flutter Fix: yes

Package：flutter
由 Flutter Fix 支持：是

`ColorScheme.primaryVariant` and `ColorScheme.secondaryVariant` were deprecated
in v2.6. The replacements are the `ColorScheme.primaryContainer` and
`ColorScheme.secondaryContainer`, respectively.

`ColorScheme.primaryVariant` 和 `ColorScheme.secondaryVariant` 已在 v2.6 中弃用。
替代项分别是 `ColorScheme.primaryContainer` 和 `ColorScheme.secondaryContainer`。

These changes were made to align with the updated Material Design specification
for `ColorScheme`. The updates to `ColorScheme` are covered more extensively in
the [ColorScheme for Material 3][] design document.

这些改动是为了与更新后的 `ColorScheme` Material Design 规范对齐。
`ColorScheme` 的更新在 [Material 3 的 ColorScheme][ColorScheme for Material 3]
设计文档中有更详细的说明。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
var colorScheme = ColorScheme(
  primaryVariant: Colors.blue,
  secondaryVariant: Colors.amber,
);
var primaryColor = colorScheme.primaryVariant;
var secondaryColor = colorScheme.secondaryVariant;
```

Code after migration:

迁移之后的代码：

```dart
var colorScheme = ColorScheme(
  primaryContainer: Colors.blue,
  secondaryContainer: Colors.amber,
);
var primaryColor = colorScheme.primaryContainer;
var secondaryColor = colorScheme.secondaryContainer;
```

**References**

**参考资料**

Design Document:

设计文档：

* [ColorScheme for Material 3][]

  [Material 3 的 ColorScheme][ColorScheme for Material 3]

API documentation:

API 文档：

* [`ColorScheme`][]

Relevant PRs:

相关 PR：

* Deprecated in [#93427][]

  弃用于 [#93427][#93427]

* Removed in [#127124][]

  移除于 [#127124][#127124]

[ColorScheme for Material 3]: /go/colorscheme-m3

[`ColorScheme`]: {{site.api}}/flutter/material/ColorScheme-class.html

[#93427]: {{site.repo.flutter}}/pull/93427
[#127124]: {{site.repo.flutter}}/pull/127124

---

### ThemeData.primaryColorBrightness

### ThemeData.primaryColorBrightness 属性

Package: flutter
Supported by Flutter Fix: yes

Package：flutter
由 Flutter Fix 支持：是

`ThemeData.primaryColorBrightness` was deprecated in v2.6, and has not been used
by the framework since then. References should be removed. The `Brightness` is
now extrapolated from the `ThemeData.primaryColor` if `ThemeData.brightness` has
not been explicitly provided.

`ThemeData.primaryColorBrightness` 已在 v2.6 中弃用，
此后框架不再使用它。应当移除相关引用。
如果没有显式提供 `ThemeData.brightness`，
现在会从 `ThemeData.primaryColor` 推断 `Brightness`。

This change was made as part of the update to `Theme` to match new Material
Design guidelines. The overall update to the theming system, including the
removal of `primaryColorBrightness` is discussed more extensively in the
[Material Theme System Updates][] design document.

这次改动是更新 `Theme` 以匹配新 Material Design 指南的一部分。
主题系统的整体更新，包括移除 `primaryColorBrightness`，
在 [Material 主题系统更新][Material Theme System Updates] 设计文档中有更详细的讨论。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
var themeData = ThemeData(
  primaryColorBrightness: Brightness.dark,
);
```

Code after migration:

迁移之后的代码：

```dart
var themeData = ThemeData(
);
```

**References**

**参考资料**

Design Document:

设计文档：

* [Material Theme System Updates][]

  [Material 主题系统更新][Material Theme System Updates]

API documentation:

API 文档：

* [`Theme`][]
* [`ThemeData`][]
* [`Brightness`][]

Relevant PRs:

相关 PR：

* Deprecated in [#93396][]

  弃用于 [#93396][#93396]

* Removed in [#127238][]

  移除于 [#127238][#127238]

[Material Theme System Updates]: /go/material-theme-system-updates

[`Theme`]: {{site.api}}/flutter/material/Theme-class.html
[`ThemeData`]: {{site.api}}/flutter/material/Theme-class.html
[`Brightness`]: {{site.api}}/flutter/dart-ui/Brightness.html

[#93396]: {{site.repo.flutter}}/pull/93396
[#127238]: {{site.repo.flutter}}/pull/127238

---

### RawScrollbar & subclasses updates

### RawScrollbar 及其子类更新

Package: flutter
Supported by Flutter Fix: yes

Package：flutter
由 Flutter Fix 支持：是

The `isAlwaysShown` property of `RawScrollbar`, `Scrollbar`,
`ScrollbarThemeData` and `CupertinoScrollbar` was deprecated in v2.9. The
replacement in all cases is `thumbVisibility`.

`RawScrollbar`、`Scrollbar`、`ScrollbarThemeData` 和 `CupertinoScrollbar`
的 `isAlwaysShown` 属性已在 v2.9 中弃用。
所有情况下的替代项都是 `thumbVisibility`。

This change was made since `isAlwaysShown` always referred to the scrollbar
thumb. With the addition of a scrollbar track, and varying configurations for
its visibility in response to mouse hovering and dragging, we renamed this
property for a clearer API.

这次改动是因为 `isAlwaysShown` 始终指的是滚动条拇指。
随着滚动条轨道的加入，以及针对鼠标悬停和拖动的不同可见性配置，
我们重命名了该属性，以便 API 更清晰。

Additionally, `Scrollbar.hoverThickness` was also deprecated in v2.9. Its
replacement is the `MaterialStateProperty` `ScrollbarThemeData.thickness`.

此外，`Scrollbar.hoverThickness` 也已在 v2.9 中弃用。
它的替代项是 `MaterialStateProperty` 类型的 `ScrollbarThemeData.thickness`。

This change was made to allow the thickness of a `Scrollbar` to respond to all
kind of states, including and beyond just hovering. The use of
`MaterialStateProperties` also matches the convention in the material library of
configuring widgets based on their state, rather than enumerating properties for
every permutation of interactive states.

这次改动是为了让 `Scrollbar` 的粗细能够响应各种状态，
而不仅仅是悬停。使用 `MaterialStateProperties`
也符合 Material 库的约定：根据 widget 的状态进行配置，
而不是为交互状态的每一种排列组合都列举属性。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
var rawScrollbar = RawScrollbar(
  isAlwaysShown: true,
);
var scrollbar = Scrollbar(
  isAlwaysShown: true,
  hoverThickness: 15.0,
);
var cupertinoScrollbar = CupertinoScrollbar(
  isAlwaysShown: true,
);
var scrollbarThemeData = ScrollbarThemeData(
  isAlwaysShown: true,
);
```

Code after migration:

迁移之后的代码：

```dart
var rawScrollbar = RawScrollbar(
  thumbVisibility: true,
);
var scrollbar = Scrollbar(
  thumbVisibility: true,
);
var cupertinoScrollbar = CupertinoScrollbar(
  thumbVisibility: true,
);
var scrollbarThemeData = ScrollbarThemeData(
  thumbVisibility: true,
  thickness: MaterialStateProperty.resolveWith((Set<MaterialState> states) {
    return states.contains(MaterialState.hovered) ? null : 15.0;
  }),
);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`RawScrollbar`][]
* [`Scrollbar`][]
* [`CupertinoScrollbar`][]
* [`ScrollbarThemeData`][]
* [`MaterialStateProperty`][]
* [`MaterialState`][]

Relevant PRs:

相关 PR：

* Deprecated in [#96957][]

  弃用于 [#96957][#96957]

* Deprecated in [#97173][]

  弃用于 [#97173][#97173]

* Removed in [#127351][]

  移除于 [#127351][#127351]


[`RawScrollbar`]: {{site.api}}/flutter/widgets/RawScrollbar-class.html
[`Scrollbar`]: {{site.api}}/flutter/material/Scrollbar-class.html
[`CupertinoScrollbar`]: {{site.api}}/flutter/cupertino/CupertinoScrollbar-class.html
[`ScrollbarThemeData`]: {{site.api}}/flutter/material/ScrollbarThemeData-class.html
[`MaterialStateProperty`]: {{site.api}}/flutter/material/MaterialStateProperty-class.html
[`MaterialState`]: {{site.api}}/flutter/material/MaterialState.html

[#96957]: {{site.repo.flutter}}/pull/96957
[#97173]: {{site.repo.flutter}}/pull/97173
[#127351]: {{site.repo.flutter}}/pull/127351

---

### AnimationSheetBuilder display & sheetSize

### AnimationSheetBuilder 的 display 与 sheetSize

Package: flutter_test
Supported by Flutter Fix: yes

Package：flutter_test
由 Flutter Fix 支持：是

The `display` and `sheetSize` methods of `AnimationSheetBuilder` were deprecated
in v2.3. The replacement is the `collate` method.

`AnimationSheetBuilder` 的 `display` 和 `sheetSize` 方法已在 v2.3 中弃用。
替代方法是 `collate`。

`AnimationSheetBuilder`'s output step previously required these two methods to
be called, but is now streamlined through a single call to `collate`.

`AnimationSheetBuilder` 的输出步骤此前需要调用这两个方法，
现在已简化为一次 `collate` 调用。

The `collate` function directly puts the images together and asynchronously
returns an image. It requires less boilerplate, and outputs smaller images
without any compromise to quality.

`collate` 函数直接把图片拼在一起，并异步返回一张图片。
它所需的样板代码更少，输出的图片更小，且质量没有任何损失。

**Migration guide**

**迁移指南**

[In-depth migration guide available]

[详细迁移指南][In-depth migration guide available]

Code before migration:

迁移之前的代码：

```dart
final AnimationSheetBuilder animationSheet = AnimationSheetBuilder(
    frameSize: const Size(40, 40)
);

await tester.pumpFrames(animationSheet.record(
  const Directionality(
    textDirection: TextDirection.ltr,
    child: Padding(
      padding: EdgeInsets.all(4),
      child: CircularProgressIndicator(),
    ),
  ),
), const Duration(seconds: 2));

tester.binding.setSurfaceSize(animationSheet.sheetSize());

final Widget display = await animationSheet.display();
await tester.pumpWidget(display);

await expectLater(
  find.byWidget(display),
  matchesGoldenFile('material.circular_progress_indicator.indeterminate.png'),
);
```

Code after migration:

迁移之后的代码：

```dart
final AnimationSheetBuilder animationSheet = AnimationSheetBuilder(
    frameSize: const Size(40, 40)
);

await tester.pumpFrames(animationSheet.record(
  const Directionality(
    textDirection: TextDirection.ltr,
    child: Padding(
      padding: EdgeInsets.all(4),
      child: CircularProgressIndicator(),
    ),
  ),
), const Duration(seconds: 2));

await expectLater(
  animationSheet.collate(20),
  matchesGoldenFile('material.circular_progress_indicator.indeterminate.png'),
);
```

[In-depth migration guide available]: /release/breaking-changes/animation-sheet-builder-display

**References**

**参考资料**

API documentation:

API 文档：

* [`AnimationSheetBuilder`][]

Relevant PRs:

相关 PR：

* Deprecated in [#83337][]

  弃用于 [#83337][#83337]

* Removed in [#129657][]

  移除于 [#129657][#129657]

[`AnimationSheetBuilder`]: {{site.api}}/flutter/flutter_test/AnimationSheetBuilder-class.html

[#83337]: {{site.repo.flutter}}/pull/83337
[#129657]: {{site.repo.flutter}}/pull/129657

---

---

### flutter_test timeout logic

### flutter_test 超时逻辑

Package: flutter_test
Supported by Flutter Fix: no

Package：flutter_test
由 Flutter Fix 支持：否

The following APIs related to timeout logic in tests were deprecated
in v2.6. There are no replacements, and references should be removed, except for
the `initialTimeout` parameter of `testWidgets`, which is replaced by using
`timeout`.

下列与测试超时逻辑相关的 API 已在 v2.6 中弃用。
它们没有替代项，应当移除相关引用，
但 `testWidgets` 的 `initialTimeout` 参数除外，它改为使用 `timeout`。

* `TestWidgetsFlutterBinding.addTime`
* `TestWidgetsFlutterBinding.runAsync` method - `additionalTime` parameter

  `TestWidgetsFlutterBinding.runAsync` 方法 - `additionalTime` 参数

* `TestWidgetsFlutterBinding.runTest` method - `timeout` parameter

  `TestWidgetsFlutterBinding.runTest` 方法 - `timeout` 参数

* `AutomatedTestWidgetsFlutterBinding.runTest` method - `timeout` parameter

  `AutomatedTestWidgetsFlutterBinding.runTest` 方法 - `timeout` 参数

* `LiveTestWidgetsFlutterBinding.runTest` method - `timeout` parameter

  `LiveTestWidgetsFlutterBinding.runTest` 方法 - `timeout` 参数

* `testWidgets` method - `initialTime` parameter

  `testWidgets` 方法 - `initialTime` 参数

These were found to cause flakiness in testing, and were not in use by tested
customers.

这些 API 被发现会导致测试不稳定，并且测试过的用户并未使用它们。

Since being deprecated, use of these parameters have had no effect on tests, so
removing references should have no effect on existing code bases.

自弃用以来，使用这些参数对测试没有任何效果，
因此移除相关引用对现有代码库应当没有影响。

**Migration guide**

**迁移指南**


Code before migration:

迁移之前的代码：

```dart
testWidgets('Test', (_) {}, initialTimeout:  Duration(seconds: 5));
```

Code after migration:

迁移之后的代码：

```dart
testWidgets('Test', (_) {}, timeout:  Timeout(Duration(seconds: 5)));
```

**References**

**参考资料**

API documentation:

API 文档：

* [`testWidgets`][]
* [`TestWidgetsFlutterBinding`][]
* [`AutomatedTestWidgetsFlutterBinding`][]
* [`LiveTestWidgetsFlutterBinding`][]

Relevant PRs:

相关 PR：

* Deprecated in [#89952][]

  弃用于 [#89952][#89952]

* Removed in [#129663][]

  移除于 [#129663][#129663]

[`testWidgets`]: {{site.api}}/flutter/flutter_test/testWidgets.html
[`TestWidgetsFlutterBinding`]: {{site.api}}/flutter/flutter_test/TestWidgetsFlutterBinding-class.html
[`AutomatedTestWidgetsFlutterBinding`]: {{site.api}}/flutter/flutter_test/AutomatedTestWidgetsFlutterBinding-class.html
[`LiveTestWidgetsFlutterBinding`]: {{site.api}}/flutter/flutter_test/LiveTestWidgetsFlutterBinding-class.html

[#89952]: {{site.repo.flutter}}/pull/89952
[#129663]: {{site.repo.flutter}}/pull/129663

---

## Timeline

## 时间线

In stable release: 3.13.0

进入稳定版：3.13.0
