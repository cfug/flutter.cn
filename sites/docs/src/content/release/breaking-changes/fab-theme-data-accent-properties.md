---
# title: FloatingActionButton and ThemeData's accent properties
title: FloatingActionButton 与 ThemeData 的 accent 属性
# description: >
#   Remove FloatingActionButton's undocumented use of
#   the ThemeData accentTextTheme property, and
#   its unnecessary use of accentIconTheme.
description: >-
  移除 FloatingActionButton 对 ThemeData accentTextTheme 属性
  未经记录的使用，以及它对 accentIconTheme 不必要的使用。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Removed Flutter's `FloatingActionButton` (FAB) dependency on
`ThemeData` accent properties.

移除了 Flutter 的 `FloatingActionButton`（FAB）
对 `ThemeData` accent 属性的依赖。

## Context

## 背景

This was a small part of the [Material Theme System Updates][] project.

这是 [Material 主题系统更新][Material Theme System Updates] 项目中的一小部分。

Previously, the `ThemeData` [`accentIconTheme`] property was only
used by [`FloatingActionButton`][] to determine the default
color of the text or icons that appeared within the button.

先前，`ThemeData` 的 [`accentIconTheme`] 属性只被
[`FloatingActionButton`][] 用来决定按钮内文本或图标的默认颜色。

`FloatingActionButton` also used the
`ThemeData accentTextTheme` property,
however this dependency was undocumented and unnecessary.

`FloatingActionButton` 也会使用 `ThemeData accentTextTheme` 属性，
但这一依赖既没有文档记录，也没有必要。

Both of these dependencies were confusing.
For example if one configured the `Theme`'s `accentIconTheme`
to change the appearance of all floating action buttons,
it was difficult to know what other components would be affected,
or might be affected in the future.

这两种依赖都容易让人困惑。
例如，如果配置 `Theme` 的 `accentIconTheme`
来改变所有浮动操作按钮的外观，
就很难知道还有哪些组件会受影响，或者将来可能受影响。

The [Material Design spec][] no longer includes an "accent" color.
The `ColorScheme`'s [secondary color][] is now used instead.

[Material Design 规范][Material Design spec] 不再包含「强调色」。
现在改用 `ColorScheme` 的 [次要颜色][secondary color]。

Previously, applications could configure the color of text and icons
within `FloatingActionButtons` with the widget's `foregroundColor`
property, or with the `FloatingActionButtonTheme`'s `foregroundColor`.
If neither `foregroundColor` property was specified, the foreground
color defaulted to the `accentIconTheme`'s color.

先前，应用可以通过 widget 的 `foregroundColor` 属性，
或 `FloatingActionButtonTheme` 的 `foregroundColor`，
配置 `FloatingActionButton` 内文本和图标的颜色。
如果两个 `foregroundColor` 都没有指定，
前景色会默认使用 `accentIconTheme` 的颜色。

With this change, the default behavior uses the color scheme's
`onSecondary` color instead.

此次改动之后，默认行为改为使用配色方案的 `onSecondary` 颜色。

## Description of change

## 变更说明

Previously, the `accentIconTheme` provided a default for the
`FloatingActionButton`'s `foregroundColor` property:

先前，`accentIconTheme` 为 `FloatingActionButton` 的
`foregroundColor` 属性提供默认值：

```dart
    final Color foregroundColor = this.foregroundColor
      ?? floatingActionButtonTheme.foregroundColor
      ?? theme.accentIconTheme.color // To be removed.
      ?? theme.colorScheme.onSecondary;
```

Apps that configure their theme's `accentIconTheme`
to effectively configure the `foregroundColor` of all
floating action buttons, can get the same effect by
configuring the `foregroundColor` of their theme's
`floatingActionButtonTheme`.

如果应用通过配置主题的 `accentIconTheme`
来实际配置所有浮动操作按钮的 `foregroundColor`，
可以改为配置主题 `floatingActionButtonTheme` 的 `foregroundColor`，
以获得相同效果。

The `FloatingActionButton`'s `foregroundColor` is now used
to configure the `textStyle` of the `RawMaterialButton`
created by `FloatingActionButton`. Previously,
this text style was based on the button style of
`ThemeData.accentTextTheme`:

现在，`FloatingActionButton` 的 `foregroundColor` 用来配置
它创建的 `RawMaterialButton` 的 `textStyle`。
先前，这一文本样式基于 `ThemeData.accentTextTheme` 的按钮样式：

```dart
// theme.accentTextTheme becomes theme.textTheme
final TextStyle textStyle = theme.accentTextTheme.button.copyWith(
  color: foregroundColor,
  letterSpacing: 1.2,
);

```

Except in a case where an app has explicitly configured the
`accentTextTheme` to take advantage of this undocumented dependency,
this use of `accentTextTheme` is unnecessary.
This change replaces this use of `accentTextTheme` with `textTheme`.

除非应用特意配置了 `accentTextTheme` 来利用这一未经记录的依赖，
否则这样使用 `accentTextTheme` 是不必要的。
此次改动用 `textTheme` 取代了对 `accentTextTheme` 的这种使用。

## Migration guide

## 迁移指南

This change occurred in two steps:

这项改动分两步完成：

1. If the foreground of a `FloatingActionButton` is set
   to a non-default color, a warning is now printed.

   如果 `FloatingActionButton` 的前景被设为非默认颜色，
   现在会打印一条警告。

2. The `accentIconTheme` dependency was removed.
   If you haven't already done so, migrate your apps
   per the pattern below.

   `accentIconTheme` 依赖已被移除。
   如果尚未迁移，请按下面的模式更新应用。

To configure the `FloatingActionButton`'s `foregroundColor`
for all FABs, you can configure the theme's
`floatingActionButtonTheme` instead of its `accentIconTheme`.

要为所有 FAB 配置 `FloatingActionButton` 的 `foregroundColor`，
可以配置主题的 `floatingActionButtonTheme`，
而不再配置 `accentIconTheme`。

Code before migration:

迁移前的代码：

```dart
MaterialApp(
  theme: ThemeData(
    accentIconTheme: IconThemeData(color: Colors.red),
  ),
)
```

Code after migration:

迁移后的代码：

```dart
MaterialApp(
  theme: ThemeData(
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      foregroundColor: Colors.red,
    ),
  ),
)
```

## Timeline

## 时间线

Landed in version: 1.16.3<br>
In stable release: 1.17

合入版本：1.16.3<br>
进入稳定版：1.17

## References

## 参考资料

Design doc:

设计文档：

* [Remove FAB Accent Theme Dependency][]

  [移除 FAB 对强调色主题的依赖][Remove FAB Accent Theme Dependency]

API documentation:

API 文档：

* [`FloatingActionButton`][]
* [`ThemeData`][]
* [`FloatingActionButtonThemeData`][]

Relevant PRs:

相关 PR：

* [Step 1 of 2][] Warn about Flutter's
  FloatingActionButton dependency on ThemeData accent properties

  [第 1 步，共 2 步][Step 1 of 2]：
  警告 FloatingActionButton 对 ThemeData accent 属性的依赖

* [Step 2 of 2][] Remove Flutter's FloatingActionButton dependency
  on ThemeData accent properties

  [第 2 步，共 2 步][Step 2 of 2]：
  移除 FloatingActionButton 对 ThemeData accent 属性的依赖

Other:

其他：

* [Material Theme System Updates][]

  [Material 主题系统更新][Material Theme System Updates]


[`accentIconTheme`]: {{site.api}}/flutter/material/ThemeData/accentIconTheme.html
[`FloatingActionButton`]: {{site.api}}/flutter/material/FloatingActionButton/foregroundColor.html
[`FloatingActionButtonThemeData`]: {{site.api}}/flutter/material/FloatingActionButtonThemeData-class.html
[Material Design spec]: {{site.material}}/styles/color
[Material Theme System Updates]: /go/material-theme-system-updates
[Remove FAB Accent Theme Dependency]: /go/remove-fab-accent-theme-dependency
[secondary color]: {{site.material}}/styles/color/the-color-system/color-roles#904230ec-ae73-4f0f-8bff-4024a036ca66
[Step 1 of 2]: {{site.repo.flutter}}/pull/48435
[Step 2 of 2]: {{site.repo.flutter}}/pull/46923
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData/floatingActionButtonTheme.html
