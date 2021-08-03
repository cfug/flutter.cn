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

[file an issue]: {{site.github}}/flutter/website/issues/new
[sample]: {{site.github}}/flutter/website/pull/6019

{% for book in site.data.books -%}
* [{{book.title}}]({{book.link}})
{% endfor -%}

<p>
  The following sections have more information about each book.
</p>

{% for book in site.data.books %}
<div class="book-img-with-details row">
<a href="{{book.link}}" title="{{book.title}}" class="col-sm-3 no-automatic-external">
  <img src="{% asset 'cover/{{book.cover}}' @path %}" alt="{{book.title}}"/>
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

