---
title: Books about Flutter
title: Flutter 相关书籍
description: Extra, extra! Here's a collection of books about Flutter.
description: 号外，号外！Flutter 的书籍收藏清单都在这里啦。
tags: Flutter参考资料
keywords: Flutter出版书籍
toc: false
---

Here's a collection of books about Flutter, in alphabetical order.
If you find another one that we should add,
[file an issue][] and (optionally)
submit a PR ([sample][]) to add it yourself.

这里收集了关于 Flutter 的书籍，按照字母顺序排列。
如果您发现其他我们应该添加的书籍，
您可以 [提出 issue][file an issue] 并且（可选）[提交 PR][sample]，以便添加书籍。

[file an issue]: {{site.repo.this}}/issues/new/choose
[sample]: {{site.repo.this}}/pulls

{% for book in site.data.books -%}
* [{{book.title}}]({{book.link}})
{% endfor -%}

<p>
  The following sections have more information about each book.
</p>
<p>
  以下是每本书籍的介绍
</p>

{% for book in site.data.books %}
<div class="book-img-with-details row">
<a href="{{book.link}}" title="{{book.title}}" class="col-sm-3 no-automatic-external">
  <img src="/assets/images/docs/cover/{{book.cover}}" alt="{{book.title}}">
</a>
<div class="details col-sm-9" markdown="1">
### [{{book.title}}]({{book.link}})
{:.title}

by {{book.authors | array_to_sentence_string}}
{:.authors.h4}

{{book.desc}}
</div>
</div>
{% endfor %}

