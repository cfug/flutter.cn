---
title: Using slivers to achieve fancy scrolling
title: 使用 sliver 实现出色的滑动效果
description: Where to find information on using slivers to implement fancy scrolling effects, like elastic scrolling, in Flutter.
description: 介绍如何通过 slivers 在 Flutter 里实现酷炫的滑动效果。
toc: false
tags: 用户界面,Flutter UI
keywords: 滑动效果, slivers
---

A sliver is a portion of a scrollable area that you
can define to behave in a special way.
You can use slivers to achieve custom scrolling effects,
such as elastic scrolling.

For a free, instructor-led video workshop that also uses DartPad,
check out the following video about using slivers:

<iframe width="560" height="315" src="https://player.bilibili.com/player.html?aid=291195426&bvid=BV11f4y187gV&cid=354814353&page=1" title="Bilibili video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Resources

For more information on implementing fancy scrolling effects
in Flutter, see the following resources:

<dl markdown="1">
<dt markdown="1"> **[Slivers, Demystified][]**
</dt>
<dd markdown="1">A free article on Medium that
    explains how to implement custom scrolling
    using the sliver classes.
</dd>

<dt markdown="1"> **[SliverAppBar][]**
</dt>
<dd markdown="1">A one-minute Widget-of-the-week
    video that gives an overview of the
    `SliverAppBar` widget.

<iframe width="560" height="315" src="https://www.youtube.com/embed/R9C5KMJKluE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</dd>

<dt markdown="1"> **[SliverList and SliverGrid][]**
</dt>
<dd markdown="1">A one-minute Widget-of-the-week
    video that gives an overview of the `SliverList`
    and `SliverGrid` widgets.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ORiTTaVY6mM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</dd>

<dt markdown="1"> **[Slivers explained - Making dynamic layouts][]**
</dt>
<dd markdown="1">A 50-minute episode of [The Boring Show][]
    where Ian Hickson, Flutter's Tech Lead, and Filip Hracek
    discuss the power of slivers.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Mz3kHQxBjGg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</dd>
</dl>

## API docs

Here some links to relevant API docs:

* [`SliverAppBar`][]
* [`SliverGrid`][]
* [`SliverList`][]


[SliverAppBar]: https://youtu.be/R9C5KMJKluE
[`SliverAppBar`]: {{site.api}}/flutter/material/SliverAppBar-class.html
[`SliverGrid`]: {{site.api}}/flutter/widgets/SliverGrid-class.html
[SliverList and SliverGrid]: https://youtu.be/ORiTTaVY6mM
[`SliverList`]: {{site.api}}/flutter/widgets/SliverList-class.html
[Slivers, DeMystified]: {{site.flutter-medium}}/slivers-demystified-6ff68ab0296f
[Slivers explained - Making dynamic layouts]: https://www.youtube.com/watch?v=Mz3kHQxBjGg
[The Boring Show]: https://www.youtube.com/playlist?list=PLOU2XLYxmsIK0r_D-zWcmJ1plIcDNnRkK
