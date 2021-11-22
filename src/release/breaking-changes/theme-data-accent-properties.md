---
title: ThemeData's accent properties have been deprecated
title: ThemeData 的 accent 属性已经被弃用
description: The ThemeData accentColor, accentColorBrightness, accentIconTheme, and accentTextTheme properties have been deprecated.
description: ThemeData 的 accentColor、accentColorBrightness、accentIconTheme 和 accentTextTheme 属性已经被弃用。
---

## Summary

## 概述

The ThemeData [accentColor][], [accentColorBrightness][], [accentIconTheme][] and
[accentTextTheme][] properties have been deprecated.

主题信息 ThemeData 中的 [accentColor][]、[accentColorBrightness][]、[accentIconTheme][] 和
[accentTextTheme][] 属性现已被弃用。 

The [Material Design spec][] no longer specifies or uses an "accent"
color for the Material components. The default values for component
colors are derived from the overall theme's [color scheme][]. The
`ColorScheme`'s [secondary color][] is now typically used instead of
`accentColor` and the [onSecondary color][] is used when a contrasting
color is needed.

[Material 设计规范][Material Design spec] 不再为 Material 组件指定或使用「强调」色。
组件的默认颜色来自整个主题的 [颜色方案][color scheme]。
现在通常使用 `ColorScheme` 的 [secondary color][] 代替 `accentColor`，
并且在需要对比色时使用 [onSecondary 属性][onSecondary color]。

## Context

## 上下文

This was a small part of the [Material Theme System Updates][] project.

这是 [Material 主题系统升级][Material Theme System Updates] 项目的一部分。

As of Flutter 1.17, the ThemeData accent properties - accentColor,
accentColorBrightness, accentIconTheme, and accentTextTheme - were no
longer used by the Material library. They had been replaced by
dependencies on the theme's [`colorScheme`][] and [`textTheme`][] properties as
part of the long-term goal of making the default configurations of the
material components depend almost exclusively on these two
properties.

从 Flutter 1.17 开始，Material 库不再使用 ThemeData 的强调属性 - 
`accentColor`、`accentColorBrightness`、`accentIconTheme` 和 `accentTextTheme`。 
它们已被主题的 [`colorScheme`][] 和 [`textTheme`][] 属性的依赖关系所取代。
这是 material 组件的默认配置完全依赖这两个属性的长期目标中的一部分，

The motivation for these changes is to make the theme system easier to
understand and use. The default colors for all components are to be
defined by the components themselves and based on the color
scheme. The defaults for specific component types can be overridden
with component-specific themes like [`FloatingActionButtonThemeData`][] or
[`CheckBoxTheme`][]. Previously, properties like accentColor were used by a
handful of component types and only in some situations, which made it
difficult to understand the implications of overriding them.

改动的出发点是使主题系统更易于理解和使用。所有组件的默认颜色由组件本身根据颜色方案定义。
特定组件类型的默认配置可以使用特定组件的主题来覆盖，
例如 [`FloatingActionButtonThemeData`][] 或 [`CheckBoxTheme`][]。
以前，像 `accentColor` 这样的属性仅在某些情况下被少数组件类型使用，
这使得很难理解覆盖它们的含义。

## Description of change

## 更改描述

The ThemeData accentColor, accentColorBrightness, accentIconTheme and
accentTextTheme properties have been deprecated because the Material
library no longer uses them.

主题信息 ThemeData 中的 [accentColor][]、[accentColorBrightness][]、[accentIconTheme][] 和
[accentTextTheme][] 属性现已被弃用，因为 Material 不再使用它们。

## Migration guide

## 迁移指南

### Application theme

### 应用程序主题

[`ThemeData`][] values no longer need to specify accentColor,
accentColorBrightness, accentIconTheme, or accentTextTheme.

[`ThemeData`][] 不再需要指定 accentColor、accentColorBrightness、
accentIconTheme 或 accentTextTheme 属性。

To configure the appearance of the material components in about the
same way as before, specify the color scheme's secondary color
instead of accentColor.

要以与以前大致相同的方式配置 material 组件的样式，
请指定配色方案的次要颜色，而不是 `accentColor`。

Code before migration:

迁移前的代码：

<!-- skip -->
```dart
MaterialApp(
  theme: ThemeData(accentColor: myColor),
  // ...
);
```

Code after migration:

迁移后的代码：

<!-- skip -->
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

The closest backwards compatible [`ColorScheme`][] color is
[`ColorScheme.secondary`][]. To hew most closely to the latest Material
Design guidelines one can substitute ColorScheme.primary instead.
If a contrasting color is needed then use [`ColorScheme.onSecondary`][].

最接近 [`ColorScheme`][] 的颜色是 [`ColorScheme.secondary`][]。
为了跟上最新的 Material 设计指南，可以用 `ColorScheme.primary` 代替。
如果需要对比色，使用 [`ColorScheme.onSecondary`][]。

Custom components that used to look up the theme's accentColor, can look up
the `ColorScheme.secondary` instead.

自定义组件中查找主题的 `accentColor` 属性可以改为查找 `ColorScheme.secondary`。

Code before migration:

迁移前的代码：

<!-- skip -->
```dart
Color myColor = Theme.of(context).accentColor;
```

Code after migration:

迁移后的代码：

<!-- skip -->
```dart
Color myColor = Theme.of(context).colorScheme.secondary;
```

### `accentColorBrightness`

The static [`ThemeData.estimateBrightnessForColor()`][] method can be used
to compute the brightness of any color.

静态方法 [`ThemeData.estimateBrightnessForColor()`][] 可用于计算任何颜色的亮度。

### `accentTextTheme`

This was white [`TextStyle`]s for dark themes, black
TextStyles for light themes. In most cases textTheme can be used
instead. A common idiom was to refer to one TextStyle from
accentTextTheme, since the text style's color was guaranteed to contrast
well with the accent color (now `ColorScheme.secondaryColor`).  To get
the same result now, specify the text style's color as
`ColorScheme.onSecondary`:

此属性在深色主题中代表白色的 [`TextStyle`]，黑色主题中代表浅色的 TextStyles。
大多数情况下， 可以使用 `textTheme`。
一个常见的用法是引用 `accentTextTheme` 中的 `TextStyle`，
因为文本样式的颜色要与强调颜色（现在是 `ColorScheme.secondaryColor`）形成鲜明的对比。
现在要获得相同的结果，请将文本样式的颜色指定为 `ColorScheme.secondaryColor`：

Code before migration:

迁移前的代码：

<!-- skip -->
```dart
TextStyle style = Theme.of(context).accentTextTheme.headline1;
```

Code after migration:

迁移后的代码：

<!-- skip -->
```dart
final ThemeData theme = Theme.of(context);
TextStyle style = theme.textTheme.headline1.copyWith(
  color: theme.colorScheme.onSecondary,
)
```

### `accentIconTheme`

This property had only been used to configure the color of icons
within a [`FloatingActionButton`][]. It's now possible to configure the icon
color directly or with the [`FloatingActionButtonThemeData`][]. See
[FloatingActionButton and ThemeData's accent properties][].

此属性仅用于配置 [`FloatingActionButton`][] 中图标的颜色。
现在可以直接使用 [`FloatingActionButtonThemeData`][] 配置图标颜色。
参阅 [FloatingActionButton 和 ThemeData 的强调属性][FloatingActionButton and ThemeData's accent properties]。

## Timeline

## 时间轴

Landed in version: 2.3.0-0.1.pre<br>
In stable release: 2.5

发布于版本：2.3.0-0.1.pre<br>
发布于稳定版本：2.5

## References

## 参考文献

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

相关 issues：

* [Issue #56918][]

Relevant PRs:

相关 PR：

* [PR #81336][]

Other:

其他：

* [Material Theme System Updates][]


[accentColor]: {{site.api}}/flutter/material/ThemeData/accentColor.html
[accentColorBrightness]: {{site.api}}/flutter/material/ThemeData/accentColorBrightness.html
[accentIconTheme]: {{site.api}}/flutter/material/ThemeData/accentIconTheme.html
[accentTextTheme]: {{site.api}}/flutter/material/ThemeData/accentTextTheme.html
[`CheckboxTheme`]: {{site.api}}/flutter/material/CheckboxTheme-class.html
[color scheme]: {{site.api}}/flutter/material/ThemeData/colorScheme.html
[`colorScheme`]: {{site.api}}/flutter/material/ThemeData/colorScheme.html
[`colorScheme.onSecondary`]: {{site.api}}/flutter/material/ColorScheme/onSecondary.html
[`colorScheme.secondary`]: {{site.api}}/flutter/material/ColorScheme/secondary.html
[`ColorScheme`]: {{site.api}}/flutter/material/ColorScheme-class.html
[Issue #56918]: {{site.repo.flutter}}/issues/56918
[FloatingActionButton and ThemeData's accent properties]: {{site.url}}/release/breaking-changes/fab-theme-data-accent-properties
[`FloatingActionButton`]: {{site.api}}/flutter/material/FloatingActionButton-class.html
[`FloatingActionButtonTheme`]: {{site.api}}/flutter/material/FloatingActionButtonTheme-class.html
[`FloatingActionButtonThemeData`]: {{site.api}}/flutter/material/FloatingActionButtonThemeData-class.html
[Material Design spec]: {{site.material}}/design/color
[Material Theme System Updates]: {{site.url}}/go/material-theme-system-updates
[secondary color]: {{site.api}}/flutter/material/ColorScheme/secondary.html
[onSecondary color]: {{site.api}}/flutter/material/ColorScheme/onSecondary.html
[PR #81336]: {{site.repo.flutter}}/pull/81336
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
[`textTheme`]: {{site.api}}/flutter/material/ThemeData/textTheme.html
[`TextTheme`]: {{site.api}}/flutter/material/TextTheme-class.html
[`Theme`]: {{site.api}}/flutter/material/Theme-class.html
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
[`ThemeData.estimateBrightnessForColor()`]: {{site.api}}/flutter/material/ThemeData/estimateBrightnessForColor.html
