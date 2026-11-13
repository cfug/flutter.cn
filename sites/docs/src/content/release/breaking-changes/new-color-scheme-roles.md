---
# title: Introduce new ColorScheme roles for Material 3
title: 为 Material 3 引入新的 ColorScheme 角色
# description: >-
#   'ColorScheme' introduces new color roles to
#   better align with Material Design 3.
#   The 'ColorScheme.fromSeed' method is also updated to
#   support the newly added colors.
description: >-
  `ColorScheme` 新增了颜色角色，以便更好地对齐 Material Design 3。
  更新后的 `ColorScheme.fromSeed` 方法也会支持这些新颜色。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

New color roles in `ColorScheme` include
seven tone-based surfaces and containers, and twelve accent colors for
primary, secondary, and tertiary groups.
This update deprecates three existing color roles:
`background`, `onBackground`, and `surfaceVariant`.
The `ColorScheme` constructed by the updated `ColorScheme.fromSeed` method now
generates different values compared to the previous version,
adapting to the Material Design 3 guidelines.

`ColorScheme` 的新颜色角色包括
七个基于色调的 surface 与 container，
以及 primary、secondary 和 tertiary 三组共十二个强调色。
此次更新弃用了三个现有颜色角色：
`background`、`onBackground` 和 `surfaceVariant`。
更新后的 `ColorScheme.fromSeed` 方法构造出的 `ColorScheme`
会生成与之前版本不同的值，以适配 Material Design 3 指南。

## Background

## 背景

The tone-based surface colors include:

基于色调的 surface 颜色包括：

- `surfaceBright`
- `surfaceDim`
- `surfaceContainer`
- `surfaceContainerLow`
- `surfaceContainerLowest`
- `surfaceContainerHigh`
- `surfaceContainerHighest`

These changes help eliminate the use of widgets' `surfaceTintColor`, and
replaces the old opacity-based model that applied a tinted overlay
on top of surfaces based on their elevation.

这些改动有助于去掉 widget 对 `surfaceTintColor` 的使用，
并取代旧的、基于不透明度的模型。
旧模型会根据海拔在 surface 上叠加一层着色。

The default `surfaceTintColor` for all widgets is now `null` and
their default background color is now
based on the new tone-based surface colors.

现在所有 widget 的默认 `surfaceTintColor` 都是 `null`，
默认背景色则基于新的、按色调划分的 surface 颜色。

`ColorScheme.fromSeed` has also been updated to use the latest algorithm
from the [Material color utilities][] package.
This change prevents the constructed `ColorScheme` from being too bright,
even if the source color looks bright and
had a high chroma (contained little black, white, and shades of grey).

`ColorScheme.fromSeed` 也已更新，
改用 [Material color utilities][Material color utilities] package 中的最新算法。
这样即使源颜色看起来很亮、色度很高
（几乎不含黑、白和灰），
构造出的 `ColorScheme` 也不会过亮。

[Material color utilities]: {{site.pub-pkg}}/material_color_utilities

## Migration guide

## 迁移指南

The differences caused by the updated `ColorScheme.fromSeed` and
the new color roles should be small and acceptable.
However, when providing a brighter seed color to `ColorScheme.fromSeed`,
it might construct a relatively darker version of `ColorScheme`.
To force the output to still be bright,
set `dynamicSchemeVariant: DynamicSchemeVariant.fidelity` in
`ColorScheme.fromSeed`. For example:

更新后的 `ColorScheme.fromSeed` 和新颜色角色带来的差异应当很小，也可以接受。
不过，向 `ColorScheme.fromSeed` 提供更亮的种子色时，
它可能会构造出相对更暗的 `ColorScheme`。
若要强制输出仍然明亮，
请在 `ColorScheme.fromSeed` 中设置
`dynamicSchemeVariant: DynamicSchemeVariant.fidelity`。例如：

Code before migration:

迁移之前的代码：

```dart
ColorScheme.fromSeed(
    seedColor: Color(0xFF0000FF), // Bright blue
)
```

Code after migration:

迁移之后的代码：

```dart
ColorScheme.fromSeed(
    seedColor: Color(0xFF0000FF), // Bright blue
    dynamicSchemeVariant: DynamicSchemeVariant.fidelity,
)
```

Material Design 3 removes 3 colors.

Material Design 3 移除了 3 种颜色。

To configure the appearance of the material components,
`background` should be replaced with `surface`,
`onBackground` should be replaced with `onSurface`, and
`surfaceVariant` should be migrated to `surfaceContainerHighest`.

要配置 Material 组件的外观，
应将 `background` 替换为 `surface`，
将 `onBackground` 替换为 `onSurface`，
并将 `surfaceVariant` 迁移为 `surfaceContainerHighest`。

Code before migration:

迁移之前的代码：

```dart
final ColorScheme colorScheme = ColorScheme();
MaterialApp(
  theme: ThemeData(
    //...
    colorScheme: colorScheme.copyWith(
      background: myColor1,
      onBackground: myColor2,
      surfaceVariant: myColor3,
    ),
  ),
  //...
)
```

Code after migration:

迁移之后的代码：

```dart
final ColorScheme colorScheme = ColorScheme();
MaterialApp(
  theme: ThemeData(
    //...
    colorScheme: colorScheme.copyWith(
      surface: myColor1,
      onSurface: myColor2,
      surfaceContainerHighest: myColor3,
    ),
  ),
  //...
)
```

Custom components that used to look up `ColorScheme.background`,
`ColorScheme.onBackground`, and `ColorScheme.surfaceVariant` can look up
`ColorScheme.surface`, `ColorScheme.onSurface` and
`ColorScheme.surfaceContainerHighest` instead.

过去查找 `ColorScheme.background`、
`ColorScheme.onBackground` 和 `ColorScheme.surfaceVariant` 的自定义组件，
可以改为查找 `ColorScheme.surface`、`ColorScheme.onSurface`
和 `ColorScheme.surfaceContainerHighest`。

Code before migration:

迁移之前的代码：

```dart
Color myColor1 = Theme.of(context).colorScheme.background;
Color myColor2 = Theme.of(context).colorScheme.onBackground;
Color myColor3 = Theme.of(context).colorScheme.surfaceVariant;
```

Code after migration:

迁移之后的代码：

```dart
Color myColor1 = Theme.of(context).colorScheme.surface;
Color myColor2 = Theme.of(context).colorScheme.onSurface;
Color myColor3 = Theme.of(context).colorScheme.surfaceContainerHighest;
```

## Timeline

## 时间线

Landed in version: 3.21.0-4.0.pre<br>
合入版本：3.21.0-4.0.pre<br>
In stable release: 3.22.0

进入稳定版：3.22.0

## References

## 参考资料

Relevant issues:

相关 issue：

* [Support tone-based surface and surface container ColorScheme roles][]

  [支持基于色调的 surface 与 surface container ColorScheme 角色][Support tone-based surface and surface container ColorScheme roles]

* [Support fidelity variant for ColorScheme.fromSeed][]

  [为 ColorScheme.fromSeed 支持 fidelity 变体][Support fidelity variant for ColorScheme.fromSeed]

Relevant PRs:

相关 PR：

* [Introduce tone-based surfaces and accent color add-ons - Part 1][]

  [引入基于色调的 surface 与强调色扩展 - 第 1 部分][Introduce tone-based surfaces and accent color add-ons - Part 1]

* [Introduce tone-based surfaces and accent color add-ons - Part 2][]

  [引入基于色调的 surface 与强调色扩展 - 第 2 部分][Introduce tone-based surfaces and accent color add-ons - Part 2]

* [Enhance ColorScheme.fromSeed with a new variant parameter][]

  [为 ColorScheme.fromSeed 增加新的 variant 参数][Enhance ColorScheme.fromSeed with a new variant parameter]

[Support tone-based surface and surface container ColorScheme roles]: {{site.repo.flutter}}/issues/115912
[Support fidelity variant for ColorScheme.fromSeed]: {{site.repo.flutter}}/issues/144649
[Introduce tone-based surfaces and accent color add-ons - Part 1]: {{site.repo.flutter}}/pull/142654
[Introduce tone-based surfaces and accent color add-ons - Part 2]: {{site.repo.flutter}}/pull/144273
[Enhance ColorScheme.fromSeed with a new variant parameter]: {{site.repo.flutter}}/pull/144805
