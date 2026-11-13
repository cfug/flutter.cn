---
# title: Deprecate `ButtonBar` in favor of `OverflowBar`
title: 弃用 `ButtonBar`，改用 `OverflowBar`
# description: >-
#   The ButtonBar widget has been replaced by
#   a more efficient widget, OverflowBar.
description: >-
  ButtonBar widget 已被更高效的 OverflowBar widget 取代。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `ButtonBar` widget was deprecated in favor of
the more efficient `OverflowBar` widget.
As a result, `ThemeData.buttonBarTheme` and
`ButtonBarTheme` were also deprecated.

`ButtonBar` widget 已弃用，请改用更高效的 `OverflowBar` widget。
因此，`ThemeData.buttonBarTheme` 和 `ButtonBarTheme` 也已弃用。

## Context

## 背景

The `ButtonBar` widget lays out its children in a row and
in a column if there is not enough horizontal space.
The `OverflowBar` widget does the same, but it's
not tied to the Material library and is part of the core `widgets.dart` library.

`ButtonBar` widget 会把子组件排成一行；
水平空间不够时则排成一列。
`OverflowBar` widget 的行为相同，
但它不依附于 Material 库，而是核心 `widgets.dart` 库的一部分。

## Description of change

## 改动说明

- Replace `ButtonBar` widget with `OverflowBar` widget.

  用 `OverflowBar` widget 替换 `ButtonBar` widget。

- By default, `ButtonBar` aligns its children to the end of the layout, while
  `OverflowBar` aligns its children to the start.
  To align the `OverflowBar` children to the end, set
  the `OverflowBar.alignment` property to `MainAxisAlignment.end`.

  默认情况下，`ButtonBar` 会把子组件对齐到布局末端，
  而 `OverflowBar` 会把子组件对齐到起点。
  若要把 `OverflowBar` 的子组件对齐到末端，
  请将 `OverflowBar.alignment` 设为 `MainAxisAlignment.end`。

- `ButtonBar.buttonPadding` provides spacing
  between buttons and padding around buttons.
  Replace it with `OverflowBar.spacing`, which provides spacing between buttons.
  Wrap the `OverflowBar` widget with `Padding` widget to
  provide padding around the buttons.

  `ButtonBar.buttonPadding` 同时提供按钮之间的间距和按钮外围的内边距。
  请改用 `OverflowBar.spacing` 来提供按钮之间的间距。
  再用 `Padding` widget 包住 `OverflowBar` widget，
  为按钮外围提供内边距。

- Replace `ButtonBar.overflowButtonSpacing` with `OverflowBar.overflowSpacing`,
  which provides spacing between buttons when the buttons are laid in a column
  when there is not enough horizontal space.

  用 `OverflowBar.overflowSpacing` 替换 `ButtonBar.overflowButtonSpacing`。
  水平空间不足、按钮排成一列时，它提供按钮之间的间距。

- If it is specified, remove `ButtonBarThemeData` from `ThemeData`.

  如果指定了 `ButtonBarThemeData`，请从 `ThemeData` 中移除它。

## Migration guide

## 迁移指南

Replace `ButtonBar` with `OverflowBar`, override the default alignment if
necessary, replace `ButtonBar.buttonPadding` with `Padding` widget and
`OverflowBar.spacing` for spacing between and around buttons, and replace
`ButtonBar.overflowButtonSpacing` with `OverflowBar.overflowSpacing` for
spacing between buttons when the buttons are laid in a column when there is not
enough horizontal space.

用 `OverflowBar` 替换 `ButtonBar`，必要时覆盖默认对齐方式。
用 `Padding` widget 和 `OverflowBar.spacing` 替换 `ButtonBar.buttonPadding`，
分别处理按钮外围和按钮之间的间距。
再用 `OverflowBar.overflowSpacing` 替换 `ButtonBar.overflowButtonSpacing`，
作为水平空间不足、按钮排成一列时的按钮间距。

Before:

之前：

```dart
ButtonBar(
  buttonPadding: const EdgeInsets.all(8.0),
  overflowButtonSpacing: 8.0,
  children: <Widget>[
    TextButton(child: const Text('Button 1'), onPressed: () {}),
    TextButton(child: const Text('Button 2'), onPressed: () {}),
    TextButton(child: const Text('Button 3'), onPressed: () {}),
  ],
),
```

After:

之后：

```dart
Padding(
  padding: const EdgeInsets.all(8.0),
  child: OverflowBar(
    alignment: MainAxisAlignment.end,
    spacing: 8.0,
    overflowSpacing: 8.0,
    children: <Widget>[
      TextButton(child: const Text('Button 1'), onPressed: () {}),
      TextButton(child: const Text('Button 2'), onPressed: () {}),
      TextButton(child: const Text('Button 3'), onPressed: () {}),
    ],
  ),
),
```

If you specify a `ThemeData.buttonBarTheme`, remove it and
use the `OverflowBar` widget properties to customize the `OverflowBar` widget.

如果指定了 `ThemeData.buttonBarTheme`，请移除它，
并改用 `OverflowBar` widget 自身的属性来定制 `OverflowBar`。

Before:

之前：

```dart
ThemeData(
  buttonBarTheme: ButtonBarThemeData(
    alignment: MainAxisAlignment.center,
  ),
),
```

After:

之后：

```dart
ThemeData(
  // ...
),
```

If you use the `ButtonBarTheme` widget, remove it and
use the `OverflowBar` widget properties to customize the `OverflowBar` widget.

如果使用了 `ButtonBarTheme` widget，请移除它，
并改用 `OverflowBar` widget 自身的属性来定制 `OverflowBar`。

Before:

之前：

```dart
ButtonBarTheme(
  data: ButtonBarThemeData(
    alignment: MainAxisAlignment.center,
  ),
  child: ButtonBar(
    children: <Widget>[
      // ...
    ],
  ),
),
```

After:

之后：

```dart
OverflowBar(
  alignment: MainAxisAlignment.center,
  children: <Widget>[
    // ...
  ],
),
```

## Timeline

## 时间线

Landed in version: 3.22.0-2.0.pre<br>
合入版本：3.22.0-2.0.pre<br>
In stable release: 3.24.0

进入稳定版：3.24.0

## References

## 参考资料

API documentation:

API 文档：

- [`OverflowBar`][]

  [`OverflowBar`][`OverflowBar`]

- [`ButtonBar`][]

  [`ButtonBar`][`ButtonBar`]

Relevant issues:

相关 issue：

- [Issue #127955][]

  [Issue #127955][Issue #127955]

Relevant PRs:

相关 PR：

- [Deprecate `ButtonBar`, `ButtonBarThemeData`, and `ThemeData.buttonBarTheme`][]

  [弃用 `ButtonBar`、`ButtonBarThemeData` 和 `ThemeData.buttonBarTheme`][Deprecate `ButtonBar`, `ButtonBarThemeData`, and `ThemeData.buttonBarTheme`]

[`OverflowBar`]: {{site.api}}/flutter/widgets/OverflowBar-class.html
[`ButtonBar`]: {{site.api}}/flutter/material/ButtonBar-class.html
[Issue #127955]: {{site.repo.flutter}}/issues/127955
[Deprecate `ButtonBar`, `ButtonBarThemeData`, and `ThemeData.buttonBarTheme`]: {{site.repo.flutter}}/pull/145523
