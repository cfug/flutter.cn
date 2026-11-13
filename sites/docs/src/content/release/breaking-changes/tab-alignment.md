---
# title: Customizing tabs alignment using the new TabBar.tabAlignment property
title: 使用新的 TabBar.tabAlignment 属性自定义标签对齐
# description: Introducing the TabBar.tabAlignment property.
description: 介绍 TabBar.tabAlignment 属性。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Using `TabBar.tabAlignment` to customize the alignment of tabs in a `TabBar`.

使用 `TabBar.tabAlignment` 自定义 `TabBar` 中标签的对齐方式。

## Context

## 背景

The `TabBar.tabAlignment` property sets where a Material 3 `TabBar` places tabs.
The `TabAlignment` enum has the following values:

`TabBar.tabAlignment` 属性决定 Material 3 `TabBar` 把标签放在哪里。
`TabAlignment` 枚举有以下取值：

* `TabAlignment.start`: Aligns the tabs to the start of the scrollable `TabBar`.

  `TabAlignment.start`：将标签对齐到可滚动 `TabBar` 的起始位置。

* `TabAlignment.startOffset`: Aligns the tabs to the start of the
   scrollable `TabBar` with an offset of `52.0` pixels.

  `TabAlignment.startOffset`：将标签对齐到可滚动 `TabBar` 的起始位置，
  并偏移 `52.0` 像素。

* `TabAlignment.center`: Aligns the tabs to the center of the `TabBar`.

  `TabAlignment.center`：将标签对齐到 `TabBar` 的中央。

* `TabAlignment.fill`: Aligns the tabs to the start and stretches the tabs
   to fill the fixed `TabBar`.

  `TabAlignment.fill`：将标签对齐到起始位置，并拉伸标签以填满固定的 `TabBar`。

The scrollable `TabBar` supports the following alignments:

可滚动 `TabBar` 支持以下对齐方式：

* `TabAlignment.start`
* `TabAlignment.startOffset`
* `TabAlignment.center`

The fixed `TabBar` supports the following alignments:

固定 `TabBar` 支持以下对齐方式：

* `TabAlignment.fill`
* `TabAlignment.center`

When you set `ThemeData.useMaterial3` to `true`,
a scrollable `TabBar` aligns tabs as `TabAlignment.startOffset` by default.
To change this alignment, set the
`TabBar.tabAlignment` property for widget level customization.
Or, set the `TabBarThemeData.tabAlignment` property for app level customization.

将 `ThemeData.useMaterial3` 设为 `true` 时，
可滚动 `TabBar` 默认以 `TabAlignment.startOffset` 对齐标签。
要更改这一对齐方式，
可设置 `TabBar.tabAlignment` 做 widget 级别的自定义，
或设置 `TabBarThemeData.tabAlignment` 做应用级别的自定义。

## Description of change

## 变更说明

When you set `TabBar.isScrollable` and `ThemeData.useMaterial3` to `true`,
the tabs in a scrollable `TabBar` defaults to `TabAlignment.startOffset`.
This aligns the tabs to the start of the
scrollable `TabBar` with an offset of `52.0` pixels.
This changes the previous behavior.
The tabs were aligned to the start of the scrollable `TabBar`
when more tabs needed to display than the width allowed.

将 `TabBar.isScrollable` 和 `ThemeData.useMaterial3` 都设为 `true` 时，
可滚动 `TabBar` 中的标签默认使用 `TabAlignment.startOffset`。
这会把标签对齐到可滚动 `TabBar` 的起始位置，并偏移 `52.0` 像素。
这改变了先前的行为。
以前，当需要显示的标签超出宽度时，
标签会对齐到可滚动 `TabBar` 的起始位置。

## Migration guide

## 迁移指南

A Material 3 scrollable `TabBar` uses `TabAlignment.startOffset` as
the default tab alignment.
This aligns the tabs to the start of the
scrollable `TabBar` with an offset of `52.0` pixels.

Material 3 的可滚动 `TabBar` 默认使用 `TabAlignment.startOffset`
作为标签对齐方式。
这会把标签对齐到可滚动 `TabBar` 的起始位置，并偏移 `52.0` 像素。

To align the tabs to the start of the
scrollable `TabBar`, set `TabBar.tabAlignment` to `TabAlignment.start`.
This change also removed the `52.0` pixel offset.
The following code snippets show how to use `TabBar.tabAlignment` to
align tabs to the start of the scrollable `TabBar`:

要把标签对齐到可滚动 `TabBar` 的起始位置，
请将 `TabBar.tabAlignment` 设为 `TabAlignment.start`。
这样也会去掉 `52.0` 像素的偏移。
下面的代码片段展示如何用 `TabBar.tabAlignment`
把标签对齐到可滚动 `TabBar` 的起始位置：

Code before migration:

迁移前的代码：

```dart
TabBar(
  isScrollable: true,
  tabs: List<Tab>.generate(
    count,
    (int index) => Tab(text: 'Tab $index'),
  ).toList(),
);
```

Code after migration:

迁移后的代码：

```dart
TabBar(
  tabAlignment: TabAlignment.start,
  isScrollable: true,
  tabs: List<Tab>.generate(
    count,
    (int index) => Tab(text: 'Tab $index'),
  ).toList(),
);
```

## Timeline

## 时间线

Landed in version: 3.13.0-17.0.pre<br>
In stable release: 3.16

合入版本：3.13.0-17.0.pre<br>
进入稳定版：3.16

## References

## 参考资料

API documentation:

API 文档：

* [`TabBar`][]
* [`TabBar.tabAlignment`][]
* [`TabAlignment`][]

Relevant PRs:

相关 PR：

* [Introduce `TabBar.tabAlignment`][]

  [引入 `TabBar.tabAlignment`][Introduce `TabBar.tabAlignment`]

* [Fix Material 3 Scrollable `TabBar`][]

  [修复 Material 3 可滚动 `TabBar`][Fix Material 3 Scrollable `TabBar`]

[`TabBar`]: {{site.api}}/flutter/material/TabBar-class.html
[`TabBar.tabAlignment`]: {{site.api}}/flutter/material/TabBar/tabAlignment.html
[`TabAlignment`]: {{site.api}}/flutter/material/TabAlignment.html

[Introduce `TabBar.tabAlignment`]: {{site.repo.flutter}}/pull/125036
[Fix Material 3 Scrollable `TabBar`]: {{site.repo.flutter}}/pull/131409
