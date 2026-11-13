---
# title: Deprecated API removed after v3.16
title: v3.16 之后移除的已弃用 API
# description: >-
#   After reaching end of life, the following deprecated APIs
#   were removed from Flutter.
description: >-
  以下已弃用 API 在达到生命周期结束后，已从 Flutter 中移除。
ai-translated: true
---

## Summary

## 概要

In accordance with Flutter's [Deprecation Policy][],
deprecated APIs that reached end of life after the
3.16 stable release have been removed.

根据 Flutter 的 [弃用政策][Deprecation Policy]，
在 3.16 稳定版之后达到生命周期结束的已弃用 API 已被移除。

All affected APIs have been compiled into this
primary source to aid in migration.
To further aid your migration, check out this
[quick reference sheet][].

所有受影响的 API 都汇总在这篇主要文档中，以便迁移。
要进一步帮助你迁移，请查看这份 [快速参考表][quick reference sheet]。

[Deprecation Policy]: {{site.repo.flutter}}/blob/main/docs/contributing/Tree-hygiene.md#deprecations
[quick reference sheet]: /go/deprecations-removed-after-3-16

## Changes

## 变更

This section lists the deprecations by the package and affected class.

本节按 package 与受影响的类列出各项弃用。

### Button `styleFrom` properties

### 按钮 `styleFrom` 属性

Package: flutter
Supported by Flutter Fix: yes

Package：flutter
由 Flutter Fix 支持：是

The `TextButton`, `ElevatedButton` and `OutlinedButton` widgets all have a
static `styleFrom` method for generating the `ButtonStyle`. The following color
properties of this method for each class were deprecated in v3.1:

`TextButton`、`ElevatedButton` 和 `OutlinedButton` widget
都有用于生成 `ButtonStyle` 的静态 `styleFrom` 方法。
各类的下列颜色属性已在 v3.1 中弃用：

* `TextButton.styleFrom`
  * `primary`
  * `onSurface`
* `ElevatedButton.styleFrom`
  * `primary`
  * `onPrimary`
  * `onSurface`
* `OutlinedButton.styleFrom`
  * `primary`
  * `onSurface`

These changes better aligned the API with updated Material Design
specifications. The changes also provided more clarity in how the colors would
be applied to the buttons, by replacing these properties with `backgroundColor`,
`foregroundColor`, and `disabledForegroundColor`.

这些改动让 API 更好地对齐更新后的 Material Design 规范。
用 `backgroundColor`、`foregroundColor` 和 `disabledForegroundColor`
替换这些属性后，颜色如何应用到按钮上也更加清晰。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
TextButton.styleFrom(
  primary: Colors.red,
  onSurface: Colors.black,
);
ElevatedButton.styleFrom(
  primary: Colors.red,
  onPrimary: Colors.blue,
  onSurface: Colors.black,
);
OutlinedButton.styleFrom(
  primary: Colors.red,
  onSurface: Colors.black,
);
```

Code after migration:

迁移之后的代码：

```dart
TextButton.styleFrom(
  foregroundColor: Colors.red,
  disabledForegroundColor: Colors.black,
);
ElevatedButton.styleFrom(
  backgroundColor: Colors.red,
  foregroundColor: Colors.blue,
  disabledForegroundColor: Colors.black,
);
OutlinedButton.styleFrom(
  foregroundColor: Colors.red,
  disabledForegroundColor: Colors.black,
);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`TextButton`][]
* [`ElevatedButton`][]
* [`OutlinedButton`][]
* [`ButtonStyle`][]

Relevant PRs:

相关 PR：

* Deprecated in [#105291][]

  弃用于 [#105291][#105291]

* Removed in [#139267][]

  移除于 [#139267][#139267]

[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`OutlinedButton`]: {{site.api}}/flutter/material/OutlinedButton-class.html
[`ButtonStyle`]: {{site.api}}/flutter/material/ButtonStyle-class.html

[#105291]: {{site.repo.flutter}}/pull/105291
[#139267]: {{site.repo.flutter}}/pull/139267

---

### ThemeData.selectedRowColor

### ThemeData.selectedRowColor 属性

Package: flutter
Supported by Flutter Fix: yes

Package：flutter
由 Flutter Fix 支持：是

The `selectedRowColor` property of `ThemeData` was deprecated in v3.1.

`ThemeData` 的 `selectedRowColor` 属性已在 v3.1 中弃用。

The property was no longer used by the framework, as widgets using it migrated
to other component themes or no longer required it in the updated specification
for Material Design.

该属性已不再被框架使用，因为使用它的 widget 已迁移到其他组件主题，
或者在更新后的 Material Design 规范中不再需要它。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
ThemeData(
  // ...
  selectedRowColor: Colors.pink, // Would have no effect.
);
```

Code after migration:

迁移之后的代码：

```dart
ThemeData(
  // ...
  // Remove uses.
);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`ThemeData`][]

Relevant PRs:

相关 PR：

* Deprecated in [#109070][]

  弃用于 [#109070][#109070]

* Removed in [#139080][]

  移除于 [#139080][#139080]

[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html

[#109070]: {{site.repo.flutter}}/pull/109070
[#139080]: {{site.repo.flutter}}/pull/139080

---

### NavigatorState.focusScopeNode

### NavigatorState.focusScopeNode 属性

Package: flutter
Supported by Flutter Fix: yes

Package：flutter
由 Flutter Fix 支持：是

The `focusScopeNode` property of `NavigatorState` was deprecated in v3.1.

`NavigatorState` 的 `focusScopeNode` 属性已在 v3.1 中弃用。

This change was made to resolve several issues stemming around the
`FocusScopeNode` introduced by the `Navigator`. Instead, the `FocusScope`
was moved to enclose the topmost `Navigator` in a `WidgetsApp`.
`NavigatorState` was changed to contain its own `FocusNode`, from where it can
refer to its `FocusNode.enclosingScope` to access the correct `FocusScopeNode`.

这次改动是为了解决 `Navigator` 引入的 `FocusScopeNode` 所带来的若干问题。
作为替代，`FocusScope` 被移到 `WidgetsApp` 中，包围最顶层的 `Navigator`。
`NavigatorState` 改为包含自己的 `FocusNode`，
并可以从那里通过 `FocusNode.enclosingScope` 访问正确的 `FocusScopeNode`。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
Navigator.of(context).focusScopeNode;

```

Code after migration:

迁移之后的代码：

```dart
Navigator.of(context).focusNode.enclosingScope!;
```

**References**

**参考资料**

API documentation:

API 文档：

* [`Navigator`][]
* [`NavigatorState`][]
* [`FocusScope`][]
* [`FocusScopeNode`][]
* [`FocusNode`][]

Relevant PRs:

相关 PR：

* Deprecated in [#109702][]

  弃用于 [#109702][#109702]

* Removed in [#139260][]

  移除于 [#139260][#139260]

[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`NavigatorState`]: {{site.api}}/flutter/widgets/NavigatorState-class.html
[`FocusScope`]: {{site.api}}/flutter/widgets/FocusScope-class.html
[`FocusScopeNode`]: {{site.api}}/flutter/widgets/FocusScopeNode-class.html
[`FocusNode`]: {{site.api}}/flutter/widgets/FocusNode-class.html

[#109702]: {{site.repo.flutter}}/pull/109702
[#139260]: {{site.repo.flutter}}/pull/139260

---

### PlatformMenuBar.body

### PlatformMenuBar.body 属性

Package: flutter
Supported by Flutter Fix: yes

Package：flutter
由 Flutter Fix 支持：是

The `body` property of `PlatformMenuBar` was deprecated in v3.1.

`PlatformMenuBar` 的 `body` 属性已在 v3.1 中弃用。

This change was made to align `PlatformMenuBar` with other widgets in the
framework, renaming it to `child`.

这次改动是为了让 `PlatformMenuBar` 与框架中的其他 widget 对齐，
将它重命名为 `child`。

**Migration guide**

**迁移指南**

Code before migration:

迁移之前的代码：

```dart
PlatformMenuBar(
  body: myWidget,
);
```

Code after migration:

迁移之后的代码：

```dart
PlatformMenuBar(
  child: myWidget,
);
```

**References**

**参考资料**

API documentation:

API 文档：

* [`PlatformMenuBar`][]

Relevant PRs:

相关 PR：

* Deprecated in [#104565][]

  弃用于 [#104565][#104565]

* Removed in [#138509][]

  移除于 [#138509][#138509]

[`PlatformMenuBar`]: {{site.api}}/flutter/widgets/PlatformMenuBar-class.html

[#104565]: {{site.repo.flutter}}/pull/104565
[#138509]: {{site.repo.flutter}}/pull/138509

---

The [previously announced][] deprecations for `TextTheme`, `WidgetInspectorService`,
and `WidgetInspectorServiceExtensions` were not removed during this cycle.
The `WidgetInspectorService` and `WidgetInspectorServiceExtensions`
deprecation on `setPubRootDirectories` has been extended another year to allow
IDEs and other customer to migrate.
Expect the `TextTheme` deprecations to be removed in the next cycle, which will
be announced again when it comes.

此周期未移除先前 [已宣布][previously announced] 的 `TextTheme`、
`WidgetInspectorService` 和 `WidgetInspectorServiceExtensions` 弃用。
`WidgetInspectorService` 与 `WidgetInspectorServiceExtensions`
上 `setPubRootDirectories` 的弃用已再延长一年，
以便 IDE 和其他用户迁移。
预计 `TextTheme` 的弃用将在下一周期移除，届时会再次宣布。

[previously announced]: https://groups.google.com/g/flutter-announce/c/DLnuqZo714o

---

## Timeline

## 时间线

In stable release: 3.19.0

进入稳定版：3.19.0
