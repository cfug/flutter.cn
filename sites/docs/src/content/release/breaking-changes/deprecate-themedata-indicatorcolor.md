---
# title: Deprecate `ThemeData.indicatorColor` in favor of
#   `TabBarThemeData.indicatorColor`
title: 弃用 `ThemeData.indicatorColor`，改用 `TabBarThemeData.indicatorColor`
# description: >-
#   The `ThemeData.indicatorColor` parameter has been replaced by
#   `TabBarThemeData.indicatorColor`.
description: >-
  `ThemeData.indicatorColor` 参数已由
  `TabBarThemeData.indicatorColor` 取代。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The [`ThemeData.indicatorColor`][] parameter was deprecated in favor of
the [`TabBarThemeData.indicatorColor`][] parameter.

[`ThemeData.indicatorColor`][] 参数已弃用，
请改用 [`TabBarThemeData.indicatorColor`][] 参数。

## Context

## 背景

The defaults for the [`TabBar`][] widget can be overridden with a
component-specific theme like [`TabBarThemeData`][].
Previously, the `ThemeData.indicatorColor` parameter was used to
override the default tab bar indicator color in Material Design 2,
which was made redundant by [`TabBarThemeData`][].

可以用 [`TabBarThemeData`][] 这类组件专属主题
覆盖 [`TabBar`][] widget 的默认值。
以前，Material Design 2 用 `ThemeData.indicatorColor` 参数
覆盖标签栏指示器的默认颜色。
[`TabBarThemeData`][] 出现后，该参数变得多余。

## Description of change

## 变更说明

The [`ThemeData.indicatorColor`][] is deprecated in
favor of a component-specific theme.
Use [`TabBarThemeData`][] to override the default indicator color.

[`ThemeData.indicatorColor`][] 已弃用，请改用组件专属主题。
使用 [`TabBarThemeData`][] 覆盖默认指示器颜色。

## Migration guide

## 迁移指南

Replace [`ThemeData.indicatorColor`][] with
[`TabBarThemeData.indicatorColor`][] to override the default tab bar
indicator color when [`ThemeData.useMaterial3`][] flag is set to `false`.

当 [`ThemeData.useMaterial3`][] 标志设为 `false` 时，
用 [`TabBarThemeData.indicatorColor`][] 替换
[`ThemeData.indicatorColor`][]，
以覆盖标签栏指示器的默认颜色。

Code before migration:

迁移之前的代码：

```dart
theme: ThemeData(
  indicatorColor: Colors.red,
  useMaterial3: false,
),
```

Code after migration:

迁移之后的代码：

```dart
theme: ThemeData(
  tabBarTheme: const TabBarThemeData(indicatorColor: Colors.red),
  useMaterial3: false,
),
```

## Timeline

## 时间线

Landed in version: 3.30.0-0.0.pre<br>
合入版本：3.30.0-0.0.pre<br>
In stable release: 3.32

进入稳定版：3.32

## References

## 参考资料

API documentation:

API 文档：

- [`ThemeData.indicatorColor`][]
- [`ThemeData.useMaterial3`][]
- [`TabBarThemeData.indicatorColor`][]
- [`TabBarThemeData`][]
- [`TabBar`][]

Relevant issues:

相关 issue：

- [Issue #91772][]

Relevant PRs:

相关 PR：

- [Deprecate `ThemeData.indicatorColor` in favor of `TabBarThemeData.indicatorColor`][]

  [弃用 `ThemeData.indicatorColor`，改用 `TabBarThemeData.indicatorColor`][Deprecate
  `ThemeData.indicatorColor` in favor of `TabBarThemeData.indicatorColor`]

[`ThemeData.indicatorColor`]: {{site.api}}/flutter/material/ThemeData/indicatorColor.html
[`ThemeData.useMaterial3`]: {{site.api}}/flutter/material/ThemeData/useMaterial3.html
[`TabBarThemeData.indicatorColor`]: {{site.api}}/flutter/material/TabBarThemeData/indicatorColor.html
[`TabBarThemeData`]: {{site.api}}/flutter/material/TabBarThemeData-class.html
[`TabBar`]: {{site.api}}/flutter/material/TabBar-class.html
[Issue #91772]: {{site.repo.flutter}}/issues/91772
[Deprecate `ThemeData.indicatorColor` in favor of `TabBarThemeData.indicatorColor`]: {{site.repo.flutter}}/pull/160024
