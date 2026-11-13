---
# title: Component theme normalization
title: 组件主题规范化
# description: >-
#   `CardTheme`, `DialogTheme`, and `TabBarTheme` have been normalized to follow
#   Flutter's convention for component themes in the Material library.
description: >-
  `CardTheme`、`DialogTheme` 和 `TabBarTheme` 已规范化，
  以遵循 Flutter 在 Material 库中对组件主题的约定。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`CardTheme`, `DialogTheme` and `TabBarTheme` were refactored to
conform to Flutter's conventions for component themes.
`CardThemeData`, `DialogThemeData`, and `TabBarThemeData` were added to
define overrides for the defaults of the component visual properties.
Releases of Flutter continue to normalize component themes like these for
a more consistent theming experience in the material library.

`CardTheme`、`DialogTheme` 和 `TabBarTheme` 已重构，
以符合 Flutter 对组件主题的约定。
新增了 `CardThemeData`、`DialogThemeData` 和 `TabBarThemeData`，
用于定义组件视觉属性默认值的覆盖。
Flutter 后续版本会继续规范化这类组件主题，
让 Material 库中的主题体验更加一致。

## Migration guide

## 迁移指南

In `ThemeData`:

在 `ThemeData` 中：

- The type of the `cardTheme` property has been
  changed from `CardTheme` to `CardThemeData`.

  `cardTheme` 属性的类型已从 `CardTheme` 改为 `CardThemeData`。

- The type of the `dialogTheme` property has been
  changed from the `DialogTheme` to `DialogThemeData`.

  `dialogTheme` 属性的类型已从 `DialogTheme` 改为 `DialogThemeData`。

- The type of `tabBarTheme` property has been
  changed from `TabBarTheme` to `TabBarThemeData`.

  `tabBarTheme` 属性的类型已从 `TabBarTheme` 改为 `TabBarThemeData`。

The return type of the component theme `xTheme.of()` methods and
`Theme.of().xTheme` have also changed to `xThemeData` accordingly.

组件主题 `xTheme.of()` 方法以及 `Theme.of().xTheme` 的返回类型
也相应改为 `xThemeData`。

Code before migration:

迁移之前的代码：

```dart
final CardTheme cardTheme = Theme.of(context).cardTheme;
final CardTheme cardTheme = CardTheme.of(context);

final DialogTheme dialogTheme = Theme.of(context).dialogTheme;
final DialogTheme dialogTheme = DialogTheme.of(context);

final TabBarTheme tabBarTheme = Theme.of(context).tabBarTheme;
final TabBarTheme tabBarTheme = TabBarTheme.of(context);
```

Code after migration:

迁移之后的代码：

```dart
final CardThemeData cardTheme = Theme.of(context).cardTheme;
final CardThemeData cardTheme = CardTheme.of(context);

final DialogThemeData dialogTheme = Theme.of(context).dialogTheme;
final DialogThemeData dialogTheme = DialogTheme.of(context);

final TabBarThemeData tabBarTheme = Theme.of(context).tabBarTheme;
final TabBarThemeData tabBarTheme = TabBarTheme.of(context);
```

## Timeline

## 时间线

Landed in version: 3.27.0-0.0.pre<br>
合入版本：3.27.0-0.0.pre<br>
Stable release: 3.27

进入稳定版：3.27

## References

## 参考资料

API documentation:

API 文档：

* [`ThemeData`][]
* [`CardTheme`][]
* [`DialogTheme`][]
* [`TabBarTheme`][]

Relevant PRs:

相关 PR：

* [Normalize ThemeData.cardTheme][]

  [规范化 ThemeData.cardTheme][Normalize ThemeData.cardTheme]

* [Normalize ThemeData.dialogTheme][]

  [规范化 ThemeData.dialogTheme][Normalize ThemeData.dialogTheme]

* [Normalize ThemeData.tabBarTheme][]

  [规范化 ThemeData.tabBarTheme][Normalize ThemeData.tabBarTheme]

[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
[`CardTheme`]: {{site.api}}/flutter/material/CardTheme-class.html
[`DialogTheme`]: {{site.api}}/flutter/material/DialogTheme-class.html
[`TabBarTheme`]: {{site.api}}/flutter/material/TabBarTheme-class.html
[Normalize ThemeData.cardTheme]: {{site.repo.flutter}}/pull/153254
[Normalize ThemeData.dialogTheme]: {{site.repo.flutter}}/pull/155129
[Normalize ThemeData.tabBarTheme]: {{site.repo.flutter}}/pull/156253
