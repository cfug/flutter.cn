---
title: 编写 Markdown
shortTitle: Markdown
description: >-
  Learn about the Markdown syntaxes the Dart and Flutter documentation sites
  support and their guidelines for using them.
sitemap: false
noindex: true
showBreadcrumbs: true
---

:::warning
本文档正在编写中。
:::

我们的网站支持使用 [Markdown][] 编写内容，
以及来自 [GitHub Flavored Markdown][] 的一些扩展
和其他自定义语法。

本页面概述了我们支持的 Markdown 语法
以及编写 Markdown 的样式指南。

[Markdown]: https://commonmark.org/
[GitHub Flavored Markdown]: https://github.github.com/gfm/

## 通用指南

优先使用 Markdown 语法而不是自定义 HTML 和组件。
原始 Markdown 更易于维护、更易于工具理解，
并且在必要时更容易迁移。

## 代码块

不要使用 Markdown 的缩进代码块，
只使用带反引号的围栏代码块，
并始终指定语言。例如：

````markdown
```dart
void main() {
  print('Hello world!');
}
```
````

要了解更多关于自定义代码块的信息，
请查看[代码块][Code blocks]的专门文档。

[Code blocks]: /contribute/docs/code-blocks
