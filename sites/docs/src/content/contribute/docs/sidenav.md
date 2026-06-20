---
# title: Sidenav
title: 侧边栏导航
# description: >-
#   Learn about adding to and configuring the sidenav of the
#   Dart and Flutter documentation site.
description: >-
  了解如何为 Dart 与 Flutter 文档站点的侧边栏导航添加与配置内容。
sitemap: false
noindex: true
showBreadcrumbs: true
ai-translated: true
---

:::warning
This document is a work in progress.

本文档仍在编写中。
:::

The sidenav presents the overall information architecture for the site
and provides developers access to documentation by topic.

侧边栏导航呈现站点的整体信息架构，并按主题为开发者提供文档访问入口。

The contents of the sidenav are configured in
[YAML][] files in the `/src/data/sidenav/` directory.
Each file in that directory defines a named sidenav,
with the filename (without extension) serving as the key.
Pages select which sidenav to display through the `sidenav` front matter field.
If no sidenav is specified, the `default` sidenav is used.

侧边栏导航内容在 `/src/data/sidenav/` 目录的 [YAML][] 文件中配置。该目录中每个文件定义一个命名的侧边栏导航，文件名（不含扩展名）作为键。页面通过 `sidenav` frontmatter 字段选择显示的侧边栏导航。若未指定，则使用 `default` 侧边栏导航。

[YAML]: https://yaml.org/

## Add a page

## 添加页面

## Remove a page

## 移除页面

## Hide pages unless open

## 除非展开否则隐藏页面

## Icons for top-level sections

## 顶级分区的图标

Top-level section entries support an optional `icon` field to render a Material Symbols icon to the left of the section title. Use the icon's identifier (for example, `flag`, `download`, or `build`). This icon appears only for the first-level items.

顶级分区条目支持可选的 `icon` 字段，在分区标题左侧渲染 Material Symbols 图标。使用图标标识符（例如 `flag`、`download` 或 `build`）。该图标仅出现在第一级条目中。

Icons use the site's Material Symbols font. Choose identifiers from Google's [Material Symbols catalog](https://fonts.google.com/icons).

图标使用站点的 Material Symbols 字体。从 Google 的 [Material Symbols 目录](https://fonts.google.com/icons) 选择标识符。

## Infrastructure

## 基础设施
