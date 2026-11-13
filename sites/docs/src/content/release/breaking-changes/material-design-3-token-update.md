---
# title: Material 3 tokens update in Flutter
title: Flutter 中的 Material 3 token 更新
# description: >-
#   The latest Material Design 3 tokens (v6.1) have been applied to
#   the Flutter Material library.
description: >-
  最新的 Material Design 3 token（v6.1）已应用到 Flutter Material 库。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The Material Design tokens updated the mapping of
4 color roles in light mode to be more
visually appealing while retaining accessible contrast.
Testing identified this change as [non-breaking][] in Flutter, but
some customers might notice this small change.
The update affected the following color properties:

Material Design token 更新了浅色模式下 4 个颜色角色的映射，
让视觉效果更好，同时保持可访问的对比度。
测试认为这次改动在 Flutter 中属于 [非破坏性改动][non-breaking]，
但有些用户可能会注意到这一细微变化。
此次更新影响了下列颜色属性：

* `onPrimaryContainer` (Primary10 to Primary30)

  `onPrimaryContainer`（Primary10 改为 Primary30）

* `onSecondaryContainer` (Secondary10 to Secondary30)

  `onSecondaryContainer`（Secondary10 改为 Secondary30）

* `onTertiaryContainer` (Tertiary10 to Tertiary30)

  `onTertiaryContainer`（Tertiary10 改为 Tertiary30）

* `onErrorContainer` (Error10 to Error30)

  `onErrorContainer`（Error10 改为 Error30）

Widgets that have been using these roles as their
default values might look different.

把这些角色用作默认值的 widget 外观可能会有所不同。

Additionally, the Material 3 tokens updated the border color of
chip widgets from `ColorScheme.outline` to `ColorScheme.outlineVariant` to
improve visual hierarchy between chips and buttons.
Chips (`Chip`, `ActionChip`, `ChoiceChip`, `FilterChip`, and `InputChip`) that
have been using the chip border tokens may look different.

此外，Material 3 token 把 Chip widget 的边框颜色
从 `ColorScheme.outline` 改为 `ColorScheme.outlineVariant`，
以改善 Chip 与按钮之间的视觉层级。
一直使用 Chip 边框 token 的 Chip
（`Chip`、`ActionChip`、`ChoiceChip`、`FilterChip` 和 `InputChip`）
外观可能会有所不同。

## Migration guide

## 迁移指南

The differences in the mappings of the color roles are small.
Use `ColorScheme.copyWith` to revert to the original default colors:

这些颜色角色的映射差异很小。
可以用 `ColorScheme.copyWith` 恢复原来的默认颜色：

Code before migration:

迁移前的代码：

```dart
final ColorScheme colors = ThemeData().colorScheme;
```

Code after migration:

迁移后的代码：

```dart
final ColorScheme colors = ThemeData().colorScheme.copyWith(
  onPrimaryContainer: const Color(0xFF21005D),
  onSecondaryContainer: const Color(0xFF1D192B),
  onTertiaryContainer: const Color(0xFF31111D),
  onErrorContainer: const Color(0xFF410E0B),
);
```

After applying the token update,
the default border color of M3 chips looks lighter.
Take `ActionChip` as an example:

应用这次 token 更新后，
M3 Chip 的默认边框颜色会看起来更浅。
以 `ActionChip` 为例：

Code before migration:

迁移前的代码：

```dart
final chip = ActionChip(
  label: const Text('action chip'),
  onPressed: () {},
);
```

Code after migration:

迁移后的代码：

```dart
final chip = ChipTheme(
  data: ChipThemeData(
    side: BorderSide(
      color: Theme.of(context).colorScheme.outline
    ),
  ),
  child: ActionChip(
    label: const Text('action chip'),
    onPressed: () {}
  )
);
```

## Timeline

## 时间线

Landed in version: 3.26.0-0.0.pre<br>
合入版本：3.26.0-0.0.pre<br>
In stable release: 3.27

进入稳定版：3.27

## References

## 参考资料

API documentation:

API 文档：

* [`ColorScheme`][]

  [`ColorScheme`][`ColorScheme`]

* [`ThemeData`][]

  [`ThemeData`][`ThemeData`]

* [`Chip`][]

  [`Chip`][`Chip`]

Relevant PRs:

相关 PR：

* [Update tokens to v5.0.0][]

  [将 token 更新到 v5.0.0][Update tokens to v5.0.0]

* [Update tokens to v6.1.0][]

  [将 token 更新到 v6.1.0][Update tokens to v6.1.0]

[`ColorScheme`]: {{site.api}}/flutter/material/ColorScheme-class.html
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
[`Chip`]: {{site.api}}/flutter/material/Chip-class.html
[Update tokens to v5.0.0]: {{site.repo.flutter}}/pull/153385
[Update tokens to v6.1.0]: {{site.repo.flutter}}/pull/153722
[non-breaking]: {{site.repo.flutter}}/flutter/blob/main/docs/contributing/Tree-hygiene.md#1-determine-if-your-change-is-a-breaking-change
