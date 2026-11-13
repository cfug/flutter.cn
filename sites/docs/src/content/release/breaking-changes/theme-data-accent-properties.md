---
# title: ThemeData's accent properties have been deprecated
title: ThemeData 的 accent 属性已弃用
# description: >
#   The ThemeData accentColor, accentColorBrightness, accentIconTheme, and
#   accentTextTheme properties have been deprecated.
description: >
  ThemeData 的 accentColor、accentColorBrightness、accentIconTheme
  和 accentTextTheme 属性已弃用。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The ThemeData [accentColor][], [accentColorBrightness][], [accentIconTheme][]
and [accentTextTheme][] properties have been deprecated.

ThemeData 的 [accentColor][]、[accentColorBrightness][]、[accentIconTheme][]
和 [accentTextTheme][] 属性已弃用。

The [Material Design spec][] no longer specifies or uses an "accent"
color for the Material components. The default values for component
colors are derived from the overall theme's [color scheme][color-scheme-prop].
The `ColorScheme`'s [secondary color][] is now typically used instead of
`accentColor` and the [onSecondary color][] is used when a contrasting
color is needed.

[Material Design 规范][Material Design spec] 不再为 Material 组件
规定或使用「accent」颜色。
组件颜色的默认值来自整体主题的 [配色方案][color-scheme-prop]。
现在通常用 `ColorScheme` 的 [次要颜色][secondary color] 代替 `accentColor`，
需要对比色时则使用 [onSecondary 颜色][onSecondary color]。

## Context

## 上下文

This was a small part of the [Material Theme System Updates][] project.

这是 [Material 主题系统更新][Material Theme System Updates] 项目的一小部分。

As of Flutter 1.17, the ThemeData accent properties - accentColor,
accentColorBrightness, accentIconTheme, and accentTextTheme - were no
longer used by the Material library. They had been replaced by
dependencies on the theme's [`colorScheme`][color-scheme-prop] and
[`textTheme`][text-scheme-prop] properties as part of the long-term goal of
making the default configurations of the material components depend
almost exclusively on these two properties.

从 Flutter 1.17 起，Material 库不再使用 ThemeData 的 accent 属性，
即 accentColor、accentColorBrightness、accentIconTheme 和 accentTextTheme。
它们已被对主题 [`colorScheme`][color-scheme-prop] 和
[`textTheme`][text-scheme-prop] 属性的依赖所取代。
长期目标是让 Material 组件的默认配置几乎只依赖这两个属性。

The motivation for these changes is to make the theme system easier to
understand and use. The default colors for all components are to be
defined by the components themselves and based on the color
scheme. The defaults for specific component types can be overridden
with component-specific themes like [`FloatingActionButtonThemeData`][] or
[`CheckBoxTheme`][]. Previously, properties like accentColor were used by a
handful of component types and only in some situations, which made it
difficult to understand the implications of overriding them.

这些改动是为了让主题系统更容易理解和使用。
所有组件的默认颜色由组件自身根据配色方案定义。
特定组件类型的默认值可以用组件专属主题覆盖，
例如 [`FloatingActionButtonThemeData`][] 或 [`CheckBoxTheme`][]。
此前，accentColor 这类属性只被少数组件类型、
并且只在某些情况下使用，
因此很难理解覆盖它们会带来什么影响。

## Description of change

## 变更说明

The ThemeData accentColor, accentColorBrightness, accentIconTheme and
accentTextTheme properties have been deprecated because the Material
library no longer uses them.

ThemeData 的 accentColor、accentColorBrightness、accentIconTheme
和 accentTextTheme 属性已弃用，
因为 Material 库不再使用它们。

## Migration guide

## 迁移指南

### Application theme

### 应用主题

[`ThemeData`][] values no longer need to specify accentColor,
accentColorBrightness, accentIconTheme, or accentTextTheme.

[`ThemeData`][] 的值不再需要指定
accentColor、accentColorBrightness、accentIconTheme 或 accentTextTheme。

To configure the appearance of the material components in about the
same way as before, specify the color scheme's secondary color
instead of accentColor.

要让 Material 组件的外观与之前大致相同，
请指定配色方案的次要颜色，而不是 accentColor。

Code before migration:

迁移之前的代码：

```dart
MaterialApp(
  theme: ThemeData(accentColor: myColor),
  // ...
);
```

Code after migration:

迁移之后的代码：

```dart
final ThemeData theme = ThemeData();
MaterialApp(
  theme: theme.copyWith(
    colorScheme: theme.colorScheme.copyWith(secondary: myColor),
  ),
  //...
)
```

### `accentColor`

### `accentColor` 属性

The closest backwards compatible [`ColorScheme`][] color is
[`ColorScheme.secondary`][]. To hew most closely to the latest Material
Design guidelines one can substitute `ColorScheme.primary` instead.
If a contrasting color is needed then use [`ColorScheme.onSecondary`][].

向后兼容时，最接近的 [`ColorScheme`][] 颜色是
[`ColorScheme.secondary`][]。
若要最贴近最新的 Material Design 指南，
可以改用 `ColorScheme.primary`。
如果需要对比色，则使用 [`ColorScheme.onSecondary`][]。

Custom components that used to look up the theme's accentColor, can look up
the `ColorScheme.secondary` instead.

以前查找主题 accentColor 的自定义组件，
可以改为查找 `ColorScheme.secondary`。

Code before migration:

迁移之前的代码：

```dart
Color myColor = Theme.of(context).accentColor;
```

Code after migration:

迁移之后的代码：

```dart
Color myColor = Theme.of(context).colorScheme.secondary;
```

### `accentColorBrightness`

### `accentColorBrightness` 属性

The static [`ThemeData.estimateBrightnessForColor()`][] method can be used
to compute the brightness of any color.

可以用静态方法 [`ThemeData.estimateBrightnessForColor()`][]
计算任意颜色的亮度。

### `accentTextTheme`

### `accentTextTheme` 属性

This was white [`TextStyle`]s for dark themes, black
TextStyles for light themes. In most cases textTheme can be used
instead. A common idiom was to refer to one TextStyle from
accentTextTheme, since the text style's color was guaranteed to contrast
well with the accent color (now `ColorScheme.secondaryColor`).
To get the same result now, specify the text style's color as
`ColorScheme.onSecondary`:

它在深色主题中是白色 [`TextStyle`][]，
在浅色主题中是黑色 TextStyle。
大多数情况下可以改用 textTheme。
一种常见写法是从 accentTextTheme 取一个 TextStyle，
因为该文本样式的颜色保证能与 accent 颜色形成对比
（现在是 `ColorScheme.secondaryColor`）。
现在要得到同样的结果，
请把文本样式的颜色指定为 `ColorScheme.onSecondary`：

Code before migration:

迁移之前的代码：

```dart
TextStyle style = Theme.of(context).accentTextTheme.headline1;
```

Code after migration:

迁移之后的代码：

```dart
final ThemeData theme = Theme.of(context);
TextStyle style = theme.textTheme.headline1.copyWith(
  color: theme.colorScheme.onSecondary,
)
```

### `accentIconTheme`

### `accentIconTheme` 属性

This property had only been used to configure the color of icons
within a [`FloatingActionButton`][]. It's now possible to configure the icon
color directly or with the [`FloatingActionButtonThemeData`][]. See
[FloatingActionButton and ThemeData's accent properties][].

这个属性此前只用于配置 [`FloatingActionButton`][] 内图标的颜色。
现在可以直接配置图标颜色，
或使用 [`FloatingActionButtonThemeData`][]。
请参阅 [FloatingActionButton 与 ThemeData 的
accent 属性][FloatingActionButton and ThemeData's accent properties]。

## Timeline

## 时间线

Landed in version: 2.3.0-0.1.pre<br>
In stable release: 2.5

合入版本：2.3.0-0.1.pre<br>
进入稳定版：2.5

## References

## 参考资料

API documentation:

API 文档：

* [`ColorScheme`][]
* [`FloatingActionButton`][]
* [`FloatingActionButtonThemeData`][]
* [`TextStyle`][]
* [`TextTheme`][]
* [`Theme`][]
* [`ThemeData`][]

Relevant issues:

相关 issue：

* [Issue #56918][]

Relevant PRs:

相关 PR：

* [PR #81336][]

Other:

其他：

* [Material Theme System Updates][]

  [Material 主题系统更新][Material Theme System Updates]


[accentColor]: {{site.api}}/flutter/material/ThemeData/accentColor.html
[accentColorBrightness]: {{site.api}}/flutter/material/ThemeData/accentColorBrightness.html
[accentIconTheme]: {{site.api}}/flutter/material/ThemeData/accentIconTheme.html
[accentTextTheme]: {{site.api}}/flutter/material/ThemeData/accentTextTheme.html
[`CheckboxTheme`]: {{site.api}}/flutter/material/CheckboxTheme-class.html
[color-scheme-prop]: {{site.api}}/flutter/material/ThemeData/colorScheme.html
[`colorScheme.onSecondary`]: {{site.api}}/flutter/material/ColorScheme/onSecondary.html
[`colorScheme.secondary`]: {{site.api}}/flutter/material/ColorScheme/secondary.html
[`ColorScheme`]: {{site.api}}/flutter/material/ColorScheme-class.html
[Issue #56918]: {{site.repo.flutter}}/issues/56918
[FloatingActionButton and ThemeData's accent properties]: /release/breaking-changes/fab-theme-data-accent-properties
[`FloatingActionButton`]: {{site.api}}/flutter/material/FloatingActionButton-class.html
[`FloatingActionButtonThemeData`]: {{site.api}}/flutter/material/FloatingActionButtonThemeData-class.html
[Material Design spec]: {{site.material}}/styles/color
[Material Theme System Updates]: /go/material-theme-system-updates
[secondary color]: {{site.api}}/flutter/material/ColorScheme/secondary.html
[onSecondary color]: {{site.api}}/flutter/material/ColorScheme/onSecondary.html
[PR #81336]: {{site.repo.flutter}}/pull/81336
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
[text-scheme-prop]: {{site.api}}/flutter/material/ThemeData/textTheme.html
[`TextTheme`]: {{site.api}}/flutter/material/TextTheme-class.html
[`Theme`]: {{site.api}}/flutter/material/Theme-class.html
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
[`ThemeData.estimateBrightnessForColor()`]: {{site.api}}/flutter/material/ThemeData/estimateBrightnessForColor.html
