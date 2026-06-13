---
# title: Authoring Markdown
title: 编写 Markdown
shortTitle: Markdown
# description: >-
#   Learn about the Markdown syntaxes the Dart and Flutter documentation sites
#   support and their guidelines for using them.
description: >-
  了解 Dart 与 Flutter 文档站点支持的 Markdown 语法及使用指南。
sitemap: false
noindex: true
showBreadcrumbs: true
ai-translated: true
---

:::warning
This document is a work in progress.

本文档仍在编写中。
:::

Our sites support writing content in [Markdown][],
with some additions from [GitHub Flavored Markdown][]
as well as other custom syntaxes.

我们的站点支持使用 [Markdown][] 编写内容，并包含 [GitHub Flavored Markdown][] 的部分扩展以及其他自定义语法。

This page outlines the Markdown syntax we support
as well as our style guidelines for authoring Markdown.

本页概述我们支持的 Markdown 语法以及编写 Markdown 的样式指南。

[Markdown]: https://commonmark.org/
[GitHub Flavored Markdown]: https://github.github.com/gfm/

## General guidelines

## 通用指南

Prefer using Markdown syntax over custom HTML and components.
Raw Markdown is easier to maintain, easier for tools to understand,
and easier to migrate in the future if necessary.

优先使用 Markdown 语法而非自定义 HTML 与组件。原始 Markdown 更易维护、更易被工具理解，且在必要时更易迁移。

## Code blocks

## 代码块

Don't use Markdown's indented code blocks,
only use fenced code blocks using backticks
and always specify a language. For example:

不要使用 Markdown 的缩进代码块，仅使用反引号围栏代码块，并始终指定语言。例如：

````markdown
```dart
void main() {
  print('Hello world!');
}
```
````

To learn more about customizing code blocks,
check out the dedicated documentation on [Code blocks][].

要了解更多代码块自定义方式，请参阅 [代码块][Code blocks] 专题文档。

[Code blocks]: /contribute/docs/code-blocks
