---
title: 为文档网站写作
short-tile: Writing
description: >-
  Learn about the writing style guide and processes followed when writing
  for the Dart and Flutter documentation sites.
sitemap: false
noindex: true
showBreadcrumbs: true
---

:::warning
本文档正在编写中。
:::

## 写作指南

为文档网站写作时，
请遵循 [Google 开发者文档风格指南][Google developer documentation style guide]，
除非 [Dash 文档指南][Dash docs guidelines]与之冲突。

[Google developer documentation style guide]: https://developers.google.com/style
[Dash docs guidelines]: #dash-docs-styles

### Dash 文档样式

:::warning
本节正在编写中。
会随时间添加内容。
:::

## 语义换行

为了使 PR 审查、差异解决和历史跟踪更容易，
在编写 Markdown 时请使用[语义换行][semantic breaks]。
参考[完整规范][sembr-spec]获取帮助，
大致遵循以下指南：

- 每行保持 80 个字符或更少。
- 在句子处换行，除非句子很短，
  也可以在句子中的短语处换行。
- 当需要将句子拆分到多行时，
  尽量选择一个能清楚表明
  该行在下一行继续的换行点。
  这样未来的编辑者和审查者更可能
  注意到编辑可能会影响另一行。

在写作中加入语义换行一开始可能感觉很繁琐，
但很快就会证明是有帮助的并变得自然。
不用担心换行是否完美或完全一致，
任何向语义化方向的努力都非常有帮助。

有关此技术起源的更多讨论，
另请查看 Brandon Rhode 的[语义换行][Semantic Linefeeds]文章。

[semantic breaks]: https://sembr.org/
[sembr-spec]: https://sembr.org/#:~:text=seen%20by%20readers.-,Semantic%20Line%20Breaks%20Specification,-(SemBr)
[Semantic Linefeeds]: https://rhodesmill.org/brandon/2012/one-sentence-per-line/

## 链接

### 编写链接文本

使用遵循 Google 关于[交叉引用和链接][Cross-references and linking]指南的描述性链接文本。

[Cross-references and linking]: https://developers.google.com/style/cross-references

### 配置链接目标

为了更容易编辑、更短的行和减少重复，
请优先使用 Markdown 链接引用而不是内联链接。

将链接定义放在使用它们的当前部分的末尾，
在下一个标题之前。

如果链接定义在页面中多次使用，
你可以将其放在文档底部。

### 在新标签页中打开链接

如果你希望链接默认在新标签页中打开，
请添加 `target="_blank"` 和 `rel="noopener"` 属性。

对于 Markdown 链接：

```md
[Link text][link-ref]{: target="_blank" rel="noopener"}
```

对于 HTML 链接：

```html
<a href="#link-ref" target="_blank" rel="noopener">Link text</a>
```
