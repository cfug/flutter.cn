---
# title: Deprecated API removed after v2.5
title: v2.5 之后移除的废弃 API
# description: >
#   After reaching end of life, the following deprecated APIs
#   were removed from Flutter.
description: 下列废弃 API 在到达生命周期终点后已从 Flutter 中移除。
ai-translated: true
---

## Summary

## 概要

In accordance with Flutter's [Deprecation Policy][],
deprecated APIs that reached end of life after the
2.5 stable release have been removed.

按照 Flutter 的 [废弃策略][Deprecation Policy]，
在 2.5 稳定版之后到达生命周期终点的废弃 API 已被移除。

All affected APIs have been compiled into this
primary source to aid in migration. A
[quick reference sheet][] is available as well.

所有受影响的 API 都汇总在这份主要资料中，以便迁移。
另外也提供了 [快速参考表][quick reference sheet]。


[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-2-5

## Changes

## 变更

This section lists the deprecations by affected class.

本节按受影响的类列出这些废弃项。

---

### `autovalidate` of `Form` & related classes

### `Form` 及相关类的 `autovalidate`

Supported by Flutter Fix: yes

Flutter Fix 支持：是

`autovalidate` was deprecated in v1.19.

`autovalidate` 在 v1.19 中被废弃。

Use `autovalidateMode` instead.
Where `autovalidate` was true, replace with `AutovalidateMode.always`.
Where `autovalidate` was false, replace with `AutovalidateMode.disabled`.
This change allows more behaviors to be specified beyond the original binary
choice, adding `AutovalidateMode.onUserInteraction` as an additional option.

请改用 `autovalidateMode`。
`autovalidate` 为 true 时，替换为 `AutovalidateMode.always`。
`autovalidate` 为 false 时，替换为 `AutovalidateMode.disabled`。
这样就能在原来的二选一之外指定更多行为，
并增加了 `AutovalidateMode.onUserInteraction` 这一选项。

The following classes all have the same change of API:

下列类的 API 变更都相同：

- `Form`
- `FormField`
- `DropdownButtonFormField`
- `TextFormField`

**Migration guide**

**迁移指南**

[In-depth migration guide available][]

[详细迁移指南][In-depth migration guide available]

Code before migration:

迁移之前的代码：

```dart
const Form form = Form(autovalidate: true);
const Form form = Form(autovalidate: false);
final autoMode = form.autovalidate;

const FormField formField = FormField(autovalidate: true);
const FormField formField = FormField(autovalidate: false);
final autoMode = formField.autovalidate;

const TextFormField textFormField = TextFormField(autovalidate: true);
const TextFormField textFormField = TextFormField(autovalidate: false);

const DropdownButtonFormField dropDownButtonFormField = DropdownButtonFormField(autovalidate: true);
const DropdownButtonFormField dropdownButtonFormField = DropdownButtonFormField(autovalidate: false);
```

Code after migration:

迁移之后的代码：

```dart
const Form form = Form(autovalidateMode: AutovalidateMode.always);
const Form form = Form(autovalidateMode: AutovalidateMode.disabled);
final autoMode = form.autovalidateMode;

const FormField formField = FormField(autovalidateMode: AutovalidateMode.always);
const FormField formField = FormField(autovalidateMode: AutovalidateMode.disabled);
final autoMode = formField.autovalidateMode;

const TextFormField textFormField = TextFormField(autovalidateMode: AutovalidateMode.always);
const TextFormField textFormField = TextFormField(autovalidateMode: AutovalidateMode.disabled);

const DropdownButtonFormField dropDownButtonFormField = DropdownButtonFormField(autovalidateMode: AutovalidateMode.always);
const DropdownButtonFormField dropdownButtonFormField = DropdownButtonFormField(autovalidateMode: AutovalidateMode.disabled);
```

[In-depth migration guide available]: /release/breaking-changes/form-field-autovalidation-api

**References**

**参考资料**

API documentation:

API 文档：

* [`Form`][]
* [`FormField`][]
* [`TextFormField`][]
* [`DropdownButtonFormField`][]
* [`AutovalidateMode`][]

Relevant issues:

相关 issue：

* [Issue 56363]({{site.repo.flutter}}/issues/56363)

  [问题 56363]({{site.repo.flutter}}/issues/56363)

* [Issue 18885]({{site.repo.flutter}}/issues/18885)

  [问题 18885]({{site.repo.flutter}}/issues/18885)

* [Issue 15404]({{site.repo.flutter}}/issues/15404)

  [问题 15404]({{site.repo.flutter}}/issues/15404)

* [Issue 36154]({{site.repo.flutter}}/issues/36154)

  [问题 36154]({{site.repo.flutter}}/issues/36154)

* [Issue 48876]({{site.repo.flutter}}/issues/48876)

  [问题 48876]({{site.repo.flutter}}/issues/48876)

Relevant PRs:

相关 PR：

* Deprecated in [#59766]({{site.repo.flutter}}/pull/59766)

  在 [#59766]({{site.repo.flutter}}/pull/59766) 中废弃

* Removed in [#90292]({{site.repo.flutter}}/pull/90292)

  在 [#90292]({{site.repo.flutter}}/pull/90292) 中移除

[`Form`]: {{site.api}}/flutter/widgets/Form-class.html
[`FormField`]: {{site.api}}/flutter/widgets/FormField-class.html
[`TextFormField`]: {{site.api}}/flutter/material/TextFormField-class.html
[`DropdownButtonFormField`]: {{site.api}}/flutter/material/DropdownButtonFormField-class.html
[`AutovalidateMode`]: {{site.api}}/flutter/widgets/AutovalidateMode-class.html

---

### `FloatingHeaderSnapConfiguration.vsync`

### `FloatingHeaderSnapConfiguration.vsync` 属性

Supported by Flutter Fix: no

Flutter Fix 支持：否

The `TickerProvider` `vsync` property of `FloatingHeaderSnapConfiguration` was
deprecated in v1.19.

`FloatingHeaderSnapConfiguration` 的 `TickerProvider` 类型属性 `vsync`
在 v1.19 中被废弃。

The `vsync` for the animation should instead be specified using
`SliverPersistentHeaderDelegate.vsync`.

动画的 `vsync` 应改为通过 `SliverPersistentHeaderDelegate.vsync` 指定。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
class MySliverPersistentHeaderDelegate extends SliverPersistentHeaderDelegate {
  FloatingHeaderSnapConfiguration? get snapConfiguration => FloatingHeaderSnapConfiguration(vsync: myTickerProvider);
}
```

Code after migration:

迁移之后的代码：

```dart
class MySliverPersistentHeaderDelegate extends SliverPersistentHeaderDelegate {
  FloatingHeaderSnapConfiguration? get snapConfiguration => FloatingHeaderSnapConfiguration();
  TickerProvider? get vsync => myTickerProvider;
}

```

**References**

**参考资料**

Design document:

设计文档：

* [Control SliverPersistentHeader's showOnScreen Behavior][]

  [控制 SliverPersistentHeader 的 showOnScreen 行为][Control SliverPersistentHeader's showOnScreen Behavior]

API documentation:

API 文档：

* [`FloatingHeaderSnapConfiguration`][]
* [`SliverPersistentHeaderDelegate`][]
* [`TickerProvider`][]

Relevant issues:

相关 issue：

* [Issue 25507]({{site.repo.flutter}}/issues/25507)

  [问题 25507]({{site.repo.flutter}}/issues/25507)

Relevant PRs:

相关 PR：

* Deprecated in [#56413]({{site.repo.flutter}}/pull/56413)

  在 [#56413]({{site.repo.flutter}}/pull/56413) 中废弃

* Removed in [#90293]({{site.repo.flutter}}/pull/90293)

  在 [#90293]({{site.repo.flutter}}/pull/90293) 中移除

[Control SliverPersistentHeader's showOnScreen Behavior]: https://docs.google.com/document/d/1BZhxy176uUnqOCnXdnHM1XetS9mw9WIyUAOE-dgVdUM/edit?usp=sharing
[`FloatingHeaderSnapConfiguration`]: {{site.api}}/flutter/rendering/FloatingHeaderSnapConfiguration-class.html
[`SliverPersistentHeaderDelegate`]: {{site.api}}/flutter/widgets/SliverPersistentHeaderDelegate-class.html
[`TickerProvider`]: {{site.api}}/flutter/scheduler/TickerProvider-class.html

---

### `AndroidViewController` & subclasses' `id`

### `AndroidViewController` 及其子类的 `id`

Supported by Flutter Fix: yes

Flutter Fix 支持：是

The `id` of `AndroidViewController`, `TextureAndroidViewController`, and
`SurfaceAndroidViewController`, was deprecated in v1.20.

`AndroidViewController`、`TextureAndroidViewController` 和
`SurfaceAndroidViewController` 的 `id` 在 v1.20 中被废弃。

For all of these use cases, `viewId` should be used instead.

这些用例都应改用 `viewId`。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
final SurfaceAndroidViewController surfaceController = SurfaceAndroidViewController(
  viewId: 10,
  viewType: 'FixTester',
  layoutDirection: TextDirection.ltr,
);
int viewId = surfaceController.id;
final SurfaceAndroidViewController surfaceController = SurfaceAndroidViewController(
  error: '',
);
final TextureAndroidViewController textureController = TextureAndroidViewController(
  error: '',
);
final TextureAndroidViewController textureController = TextureAndroidViewController(
  viewId: 10,
  viewType: 'FixTester',
  layoutDirection: TextDirection.ltr,
);
viewId = textureController.id;
```

Code after migration:

迁移之后的代码：

```dart
final SurfaceAndroidViewController surfaceController = SurfaceAndroidViewController(
  viewId: 10,
  viewType: 'FixTester',
  layoutDirection: TextDirection.ltr,
);
int viewId = surfaceController.viewId;
final SurfaceAndroidViewController surfaceController = SurfaceAndroidViewController(
  error: '',
);
final TextureAndroidViewController textureController = TextureAndroidViewController(
  error: '',
);
final TextureAndroidViewController textureController = TextureAndroidViewController(
  viewId: 10,
  viewType: 'FixTester',
  layoutDirection: TextDirection.ltr,
);
viewId = textureController.viewId;
```

**References**

**参考资料**

Design document:

设计文档：

* [Flutter Hybrid Composition][]

  [Flutter 混合合成][Flutter Hybrid Composition]

API documentation:

API 文档：

* [`AndroidViewController`][]
* [`TextureAndroidViewController`][]
* [`SurfaceAndroidViewController`][]

Relevant issues:

相关 issue：

* [Issue 55218]({{site.repo.flutter}}/issues/55218)

  [问题 55218]({{site.repo.flutter}}/issues/55218)

Relevant PRs:

相关 PR：

* Deprecated in [#60320]({{site.repo.flutter}}/issues/60320)

  在 [#60320]({{site.repo.flutter}}/issues/60320) 中废弃

* Removed in [#90294]({{site.repo.flutter}}/issues/90294)

  在 [#90294]({{site.repo.flutter}}/issues/90294) 中移除

[Flutter Hybrid Composition]: {{site.repo.flutter}}/blob/main/docs/platforms/Hybrid-Composition.md
[`AndroidViewController`]: {{site.api}}/flutter/services/AndroidViewController-class.html
[`TextureAndroidViewController`]: {{site.api}}/flutter/services/TextureAndroidViewController-class.html
[`SurfaceAndroidViewController`]: {{site.api}}/flutter/services/SurfaceAndroidViewController-class.html

---

### `BlacklistingTextInputFormatter` & `WhitelistingTextInputFormatter`

### `BlacklistingTextInputFormatter` 与 `WhitelistingTextInputFormatter` 类

Supported by Flutter Fix: no

Flutter Fix 支持：否

The entire classes of `BlacklistingTextInputFormatter` and
`WhitelistingTextInoutFormatter` were deprecated in v1.20.

`BlacklistingTextInputFormatter` 和 `WhitelistingTextInoutFormatter`
这两个类在 v1.20 中被整体废弃。

Their functionality has been rewritten into a single class,
`FilteringTextInputFormatter`.

它们的功能已被重写进单一类 `FilteringTextInputFormatter`。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
formatter = BlacklistingTextInputFormatter(pattern, replacementString: 'replacedPattern');
formatter = BlacklistingTextInputFormatter.singleLineFormatter;
pattern = formatter.blacklistedPattern;
formatter = WhitelistingTextInputFormatter(pattern);
formatter = WhitelistingTextInputFormatter.digitsOnly;
pattern = formatter.whitelistedPattern;
```

Code after migration:

迁移之后的代码：

```dart
formatter = FilteringTextInputFormatter.deny(pattern, replacementString: 'replacedPattern');
formatter = FilteringTextInputFormatter.singleLineFormatter;
pattern = formatter.filterPattern;
formatter = FilteringTextInputFormatter.allow(pattern);
formatter = FilteringTextInputFormatter.digitsOnly;
pattern = formatter.filterPattern;
```

**References**

**参考资料**

API documentation:

API 文档：

* [`FilteringTextInputFormatter`][]

Relevant PRs:

相关 PR：

* Deprecated in [#59120]({{site.repo.flutter}}/issues/59120)

  在 [#59120]({{site.repo.flutter}}/issues/59120) 中废弃

* Removed in [#90296]({{site.repo.flutter}}/issues/90296)

  在 [#90296]({{site.repo.flutter}}/issues/90296) 中移除

[`FilteringTextInputFormatter`]: {{site.api}}/flutter/services/FilteringTextInputFormatter-class.html

---

### `BottomNavigationBarItem.title`

### `BottomNavigationBarItem.title` 属性

Supported by Flutter Fix: yes

Flutter Fix 支持：是

The `title` of `BottomNavigationBarItem` was deprecated in v1.19.
The `label` property should be used instead. This migration allows for better
text scaling, and presents built-in `Tooltip`s for the `BottomNavigationBarItem`
in the context of a `BottomNavigationBar`.

`BottomNavigationBarItem` 的 `title` 在 v1.19 中被废弃。
应改用 `label` 属性。这次迁移可以改善文字缩放，
并在 `BottomNavigationBar` 的上下文中为 `BottomNavigationBarItem` 提供内置 `Tooltip`。

**Migration guide**

**迁移指南**

[In-depth migration guide available][]

[详细迁移指南][In-depth migration guide available]

Code before migration:

迁移之前的代码：

```dart
const BottomNavigationBarItem bottomNavigationBarItem = BottomNavigationBarItem(title: myTitle);
const BottomNavigationBarItem bottomNavigationBarItem = BottomNavigationBarItem();
bottomNavigationBarItem.title;
```

Code after migration:

迁移之后的代码：

```dart
const BottomNavigationBarItem bottomNavigationBarItem = BottomNavigationBarItem(label: myTitle);
const BottomNavigationBarItem bottomNavigationBarItem = BottomNavigationBarItem();
bottomNavigationBarItem.label;
```

**References**

**参考资料**

Design document:

设计文档：

* [BottomNavigationBarItem title][]

  [BottomNavigationBarItem 的 title][BottomNavigationBarItem title]

API documentation:

API 文档：

* [`BottomNavigationBarItem`][]
* [`BottomNavigationBar`][]
* [`Tooltip`][]

Relevant PRs:

相关 PR：

* Deprecated in [#59127]({{site.repo.flutter}}/issues/59127)

  在 [#59127]({{site.repo.flutter}}/issues/59127) 中废弃

* Removed in [#90295]({{site.repo.flutter}}/issues/90295)

  在 [#90295]({{site.repo.flutter}}/issues/90295) 中移除

[In-depth migration guide available]: /release/breaking-changes/bottom-navigation-title-to-label
[BottomNavigationBarItem title]: /go/bottom-navigation-bar-title-deprecation
[`BottomNavigationBarItem`]: {{site.api}}/flutter/widgets/BottomNavigationBarItem-class.html
[`BottomNavigationBar`]: {{site.api}}/flutter/material/BottomNavigationBar-class.html
[`Tooltip`]: {{site.api}}/flutter/material/Tooltip-class.html

---

### `packageRoot` in `dart:core`, `dart:isolate`, and `package:platform`

### `dart:core`、`dart:isolate` 与 `package:platform` 中的 `packageRoot`

The following APIs have been removed:

下列 API 已被移除：

* [`Platform.packageRoot`][] in `dart:core`

  `dart:core` 中的 [`Platform.packageRoot`][]

* [`Isolate.packageRoot`][] in `dart:isolate`

  `dart:isolate` 中的 [`Isolate.packageRoot`][]

* [`Platform.packageRoot`][] in `package:platform`

  `package:platform` 中的 [`Platform.packageRoot`][]

These APIs were marked deprecated [in Dart 2.0][dart-deprecated], and did not
work correctly in any Dart 2.x release.

这些 API 在 [Dart 2.0][dart-deprecated] 中被标记为废弃，
并且在任何一个 Dart 2.x 版本中都不能正确工作。

**Migration guide**

**迁移指南**

These `packageRoot` APIs have been replaced by a new set of `packageConfig` APIs,
which you should migrate to.

这些 `packageRoot` API 已被一组新的 `packageConfig` API 取代，你应当迁移过去。

* [`Platform.packageConfig`][] in `dart:core`

  `dart:core` 中的 [`Platform.packageConfig`][]

* [`Isolate.packageConfig`][] in `dart:isolate`

  `dart:isolate` 中的 [`Isolate.packageConfig`][]

* [`Platform.packageConfig`][] in `package:platform`

  `package:platform` 中的 [`Platform.packageConfig`][]

If you are using the `package:platform` package, note that regardless of whether
you are using the `packageRoot` API or not, older versions of that package are
not compatible with Dart 2.16 and later, as they depend on the now removed
`packageRoot` API. You may see an error like this when attempting to run your
app:

如果你使用 `package:platform` 这个 package，请注意：
无论你是否使用 `packageRoot` API，该 package 的旧版本都不兼容 Dart 2.16 及更高版本，
因为它们依赖现已移除的 `packageRoot` API。
尝试运行应用时，你可能会看到类似下面的错误：

```plaintext
../../.pub-cache/hosted/pub.dartlang.org/platform-3.0.0/
  lib/src/interface/local_platform.dart:46:19:
  Error: Member not found: 'packageRoot'.
      io.Platform.packageRoot; // ignore: deprecated_member_use
                  ^^^^^^^^^^^
```

To resolve that, upgrade to version `3.1.0` or later of `package:platform` by
upgrading the constraint in your `pubspec.yaml` file:

要解决这个问题，请把 `pubspec.yaml` 中的约束升级到
`package:platform` 的 `3.1.0` 或更高版本：

```yaml
dependencies:
  platform: ^3.1.0
```

**References**

**参考资料**

Relevant PRs:

相关 PR：

* Removed from the Dart libraries in [#47769][]

  在 [#47769][] 中从 Dart 库移除

* Removed from `package:platform` in [PR #38][]

  在 [PR #38][] 中从 `package:platform` 移除

* Updated Flutter to use `package:platform` 3.1.0 in [PR #94603][]

  在 [PR #94603][] 中把 Flutter 更新为使用 `package:platform` 3.1.0

[`Platform.packageRoot`]: {{site.dart.api}}/stable/2.15.1/dart-io/Platform/packageRoot.html
[`Isolate.packageRoot`]: {{site.dart.api}}/stable/2.15.1/dart-isolate/Isolate/packageRoot.html
[`Platform.packageRoot`]: {{site.pub-api}}/platform/3.0.0/platform/Platform/packageRoot.html
[dart-deprecated]: https://dart-review.googlesource.com/c/sdk/+/59100/16/CHANGELOG.md
[`Platform.packageConfig`]: {{site.dart.api}}/stable/2.15.1/dart-io/Platform/packageConfig.html
[`Isolate.packageConfig`]: {{site.dart.api}}/stable/2.15.1/dart-isolate/Isolate/packageConfig.html
[`Platform.packageConfig`]: {{site.pub-api}}/platform/3.0.0/platform/Platform/packageConfig.html
[#47769]: {{site.repo.dart-sdk}}/issues/47769
[PR #38]: https://github.com/google/platform.dart/pull/38
[PR #94603]: {{site.repo.flutter}}/pull/94603

---

## Timeline

## 时间线

In stable release: 2.10

进入稳定版：2.10
