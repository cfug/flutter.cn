---
# title: Writing for the docs sites
title: 为文档站点写作
# short-tile: Writing
short-tile: 写作
# description: >-
#   Learn about the writing style guide and processes followed when writing
#   for the Dart and Flutter documentation sites.
description: >-
  了解为 Dart 与 Flutter 文档站点写作时所遵循的写作风格指南与流程。
sitemap: false
noindex: true
showBreadcrumbs: true
ai-translated: true
---

:::warning
This document is a work in progress.

本文档仍在编写中。
:::

## Writing guidelines

## 写作指南

When writing for the documentation sites,
follow the [Google developer documentation style guide][],
except in the cases where the [Dash docs guidelines][] conflict with it.

为文档站点写作时，请遵循 [Google 开发者文档风格指南][Google developer documentation style guide]，除非与 [Dash 文档指南][Dash docs guidelines] 冲突。

[Google developer documentation style guide]: https://developers.google.com/style
[Dash docs guidelines]: #dash-docs-styles

### Dash docs styles

### Dash 文档样式

:::warning
This section is a work in progress.
It will be added to over time.

本节仍在编写中。
将随时间逐步补充。
:::

## Semantic breaks

## 语义换行

To make PR review, diff resolution, and history tracking easier,
use [semantic breaks][] when writing Markdown.
Reference the [full specification][sembr-spec] for helps,
but roughly follow these guidelines:

为便于 PR 审查、diff 解决与历史追踪，编写 Markdown 时请使用 [语义换行][semantic breaks]。参阅 [完整规范][sembr-spec] 获取帮助，并大致遵循以下指南：

- Keep each line 80 characters or fewer.

  每行不超过 80 个字符。

- Break lines at sentences and, unless the sentence is very short,
  on phrases within sentences.

  在句子处换行；除非句子很短，可在句内短语处换行。

- When it's necessary to split a sentence across lines,
  try to pick a break that makes it clear that
  the line continues on the next line.
  That way future editors and reviewers are more likely to
  notice that the edit might affect another line.

  当必须将一句拆到多行时，尽量选择能表明下一行继续本句的断点，以便后续编辑者与审查者更容易注意到编辑可能影响其他行。

Incorporating semantic breaks in your writing might feel tedious at first,
but quickly proves helpful and becomes natural.
Don't worry about getting the breaks perfect or completely consistent,
any effort towards their semantic nature is extremely helpful.

在写作中采用语义换行起初可能显得繁琐，但很快会变得有用且自然。不必追求断行完美或完全一致，任何朝语义化方向的努力都非常有帮助。

For some more discussion about the origin of this technique,
also check out Brandon Rhode's [Semantic Linefeeds][] post.

关于该技术起源的更多讨论，也可参阅 Brandon Rhode 的 [Semantic Linefeeds][] 文章。

[semantic breaks]: https://sembr.org/
[sembr-spec]: https://sembr.org/#:~:text=seen%20by%20readers.-,Semantic%20Line%20Breaks%20Specification,-(SemBr)
[Semantic Linefeeds]: https://rhodesmill.org/brandon/2012/one-sentence-per-line/

## Links

## 链接

### Write link text

### 编写链接文本

Use descriptive link text that follows the
Google guidelines on [Cross-references and linking][].

使用符合 Google [交叉引用与链接][Cross-references and linking] 指南的描述性链接文本。

[Cross-references and linking]: https://developers.google.com/style/cross-references

### Configure link destinations

### 配置链接目标

For easier editing, shorter lines, and reduced duplication,
prefer using Markdown link references instead of inline links.

为便于编辑、缩短行宽并减少重复，优先使用 Markdown 链接引用而非行内链接。

Place the link definitions at the end of the
current section where they're used, before the next header.

将链接定义放在使用它们的当前章节末尾、下一个标题之前。

If a link definition is used multiple times across a page,
you can place it at the bottom of the document.

若链接定义在整页多次使用，可放在文档底部。

### Open the link in a new tab

### 在新标签页中打开链接

If you want a link to open in a new tab by default,
add the `target="_blank"` and `rel="noopener"` attributes.

若希望链接默认在新标签页打开，添加 `target="_blank"` 与 `rel="noopener"` 属性。

For Markdown links:

对于 Markdown 链接：

```md
[Link text][link-ref]{: target="_blank" rel="noopener"}
```

For HTML links:

对于 HTML 链接：

```html
<a href="#link-ref" target="_blank" rel="noopener">Link text</a>
```
