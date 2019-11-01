---
title: Books about Flutter
title: Flutter 相关书籍
description: Extra, extra! Here's a collection of books about Flutter.
description: 号外，号外！Flutter 的书籍收藏清单都在这里啦。
---

Here's a collection of books about Flutter.
If you find another one that we should add,
[let us know.](https://github.com/flutter/website/issues)

{% for book in site.data.books %}
<div class="item-with-pic">
  <a href="{{ book.link }}" title="{{ book.title }}">
    <img src="{% asset 'cover/{{ book.cover }}' @path %}" alt="Cover: {{ book.title }}"/>
  </a>
  <div class="details">
    <h3 class="title"><a href="{{ book.link }}" title="{{ book.title }}">{{ book.title }}</a></h3>
    <h4 class="authors">by {{ book.authors | array_to_sentence_string }}</h4>
    <p>{{ book.desc }}</p>
  </div>
</div>
{% endfor %}
