---
# title: Books about Flutter
title: Flutter 相关书籍
# description: Extra, extra! Here's a collection of books about Flutter.
description: 号外，号外！Flutter 的书籍收藏清单都在这里啦。
tags: Flutter参考资料
keywords: Flutter出版书籍
showToc: false
---

Here's a collection of books about Flutter,
in alphabetical order.
If you find another one that we should add,
[file an issue][] and (feel free to)
submit a PR ([sample][]) to add it yourself.

这里收集了关于 Flutter 的书籍，按照字母顺序排列。
如果你发现其他我们应该添加的书籍，
你可以 [提出 issue][file an issue]
并且（可选）[提交 PR][sample]，以便添加书籍。

Also, check the Flutter version that the book
was written under. Anything published before
Flutter 3.10/Dart 3 (May 2023),
won't reflect the latest version of Dart and
might not include null safety;
anything published before Flutter 3.16 (November 2023)
won't reflect that Material 3 is now
Flutter's default theme.
See the [what's new][]
page to view Flutter's latest release.

同时，你需要确认书籍撰写时基于的 Flutter 版本。
Flutter 3.10 / Dart 3（2023年5月）之前发布的任何内容
都不会体现 Dart 最新版本的新特性，也有可能不包括空安全；
Flutter 3.16（2023年11月）之前发布的任何内容
都不会体现 Flutter 当前默认的 Material 3 主题。
你可以在 Flutter 最新发布页面看到 [版本更新内容][what's new]。

[file an issue]: {{site.repo.this}}/issues/new
[sample]: {{site.repo.this}}/pull/6019
[what's new]: /release/whats-new

{% for book in books -%}
* [{{book.title}}]({{book.link}})
{% endfor -%}

## Book details

## 书籍详情

The following sections have more information about each book.

以下是每本书籍的介绍。

{% for book in books %}
<div class="book-img-with-details">
<a href="{{book.link}}" title="{{book.title}}">
  <img src="/assets/images/docs/cover/{{book.cover}}" alt="{{book.title}}" />
</a>
<div class="details">

<h3 class="title" id="{{book.title | slugify}}">
<a href="{{book.link}}">{{book.title}}</a>
</h3>

by {{book.authors | arrayToSentenceString}}
{:.authors}

{{book.desc}}
</div>
</div>
{% endfor -%}

