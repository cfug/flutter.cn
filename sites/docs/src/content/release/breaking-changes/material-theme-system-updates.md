---
# title: Material Theme System Updates
title: Material 主题系统更新
# description: >-
#   `CardTheme`, `DialogTheme`, and `TabBarTheme` have been normalized to follow
#   Flutter's convention for component themes in the Material library. In
#   `ThemeData`, the type of these properties have also changed accordingly.
description: >-
  `CardTheme`、`DialogTheme` 和 `TabBarTheme` 已按
  Material 库中组件主题的 Flutter 约定完成规范化。
  在 `ThemeData` 中，这些属性的类型也相应改变。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`CardTheme`, `DialogTheme` and `TabBarTheme` were refactored to
conform to Flutter's conventions for component themes. `CardThemeData`,
`DialogThemeData` and `TabBarThemeData` were added to define overrides for the
defaults of the component visual properties.

`CardTheme`、`DialogTheme` 和 `TabBarTheme` 已重构，
以符合 Flutter 对组件主题的约定。
新增了 `CardThemeData`、`DialogThemeData` 和 `TabBarThemeData`，
用于定义组件视觉属性默认值的覆盖。

During card theme normalization, the type of `ThemeData.cardTheme` is changed
to `Object?` to accept both `CardTheme` and `CardThemeData`, in order to have
a smooth transition for the breaking changes. The same approach was used for
`dialogTheme` and `tabBarTheme`.

在卡片主题规范化期间，`ThemeData.cardTheme` 的类型改为 `Object?`，
以便同时接受 `CardTheme` 和 `CardThemeData`，
让这次破坏性改动可以平滑过渡。`dialogTheme` 和
`tabBarTheme` 也采用了同样的做法。

To complete the transition and fully conform to the `ThemeData` convention, the
type of `ThemeData.cardTheme` has been changed to `CardThemeData?`; the type of
`ThemeData.dialogTheme` has been changed to `DialogThemeData?`; and the type of
`ThemeData.tabBarTheme` has been changed to `TabBarThemeData?`.

为完成过渡并完全符合 `ThemeData` 的约定，`ThemeData.cardTheme`
的类型已改为 `CardThemeData?`；`ThemeData.dialogTheme`
的类型已改为 `DialogThemeData?`；`ThemeData.tabBarTheme`
的类型已改为 `TabBarThemeData?`。

## Migration guide

## 迁移指南

Previously, the type of `ThemeData.cardTheme` was `Object?` to accept both
`CardTheme` and `CardThemeData`. Now that the type has been changed to
`CardThemeData?`, a migration is required if `ThemeData.cardTheme` is used.
Similarly, the types of `ThemeData.dialogTheme` and `ThemeData.tabBarTheme`
should be migrated to `DialogThemeData` and `TabBarThemeData`, respectively.

此前，`ThemeData.cardTheme` 的类型是 `Object?`，
可以同时接受 `CardTheme` 和 `CardThemeData`。
现在类型已改为 `CardThemeData?`，
如果使用了 `ThemeData.cardTheme`，就需要迁移。
同样，`ThemeData.dialogTheme` 和 `ThemeData.tabBarTheme`
应分别迁移到 `DialogThemeData` 和 `TabBarThemeData`。

Code before migration:

迁移之前的代码：

```dart
final ThemeData theme = ThemeData(
    cardTheme: CardTheme(),
    dialogTheme: DialogTheme(),
    tabBarTheme: TabBarTheme(),
);
```

Code after migration:

迁移之后的代码：

```dart
final ThemeData theme = ThemeData(
    cardTheme: CardThemeData(),
    dialogTheme: DialogThemeData(),
    tabBarTheme: TabBarThemeData(),
);
```

## Timeline

## 时间线

Landed in version: 3.31.0-0.0.pre<br>
In stable release: 3.32

合入版本：3.31.0-0.0.pre<br>
进入稳定版：3.32

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

* [Change cardTheme, dialogTheme, and tabBarTheme type to xxxThemeData][]

  [将 cardTheme、dialogTheme 和
  tabBarTheme 的类型改为 xxxThemeData][Change cardTheme,
  dialogTheme, and tabBarTheme type to xxxThemeData]

[Change cardTheme, dialogTheme, and tabBarTheme type to xxxThemeData]: {{site.repo.flutter}}/pull/157292
[`ThemeData`]: {{site.api}}/flutter/material/ThemeData-class.html
[`CardTheme`]: {{site.api}}/flutter/material/CardTheme-class.html
[`DialogTheme`]: {{site.api}}/flutter/material/DialogTheme-class.html
[`TabBarTheme`]: {{site.api}}/flutter/material/TabBarTheme-class.html
