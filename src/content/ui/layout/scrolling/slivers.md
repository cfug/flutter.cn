---
# title: Using slivers to achieve fancy scrolling
title: 使用 sliver 实现出色的滑动效果
# description: >-
#  Where to find information on using slivers to
#  implement fancy scrolling effects, like elastic scrolling, in Flutter.
description: 介绍如何通过 slivers 在 Flutter 里实现酷炫的滑动效果。
showToc: false
tags: 用户界面,Flutter UI
keywords: 滑动效果, slivers
---

A sliver is a portion of a scrollable area that you
can define to behave in a special way.
You can use slivers to achieve custom scrolling effects,
such as elastic scrolling.

Sliver 是可滚动区域的一部分，你可以定义它以特殊的方式工作。
你可以使用 sliver 实现自定义滚动效果，
比如弹性滚动。

For a free, instructor-led video workshop that uses DartPad,
check out the following video about using slivers.

以下是一个关于使用 sliver 的免费指导视频，
由讲师使用 DartPad Workshop 进行指导，
请观看视频：

{% biliEmbed 'BV11f4y187gV', '?aid=291195426&bvid=BV11f4y187gV&cid=354814353&page=1&autoplay=false', 'Building scrolling experiences in Flutter' %}

## Resources

## 资源

For more information on implementing fancy scrolling effects
in Flutter, see the following resources:

关于在 Flutter 中实现出色的滚动效果的更多信息，
请参阅以下资源：

**[Slivers, Demystified][]**
<br/> A free article on Medium that
  explains how to implement custom scrolling
  using the sliver classes.

**[Slivers, Demystified][]**
<br/> 一篇 Medium 上的免费文章，
  介绍了如何使用 sliver 组件类实现自定义滚动。

**[SliverAppBar][sliver-app-bar-video]**
<br/> A one-minute Widget-of-the-week
  video that gives an overview of the
  `SliverAppBar` widget.
  
**[SliverAppBar][sliver-app-bar-video]**
<br/> 一段一分钟的「每周 Flutter Widgets」视频，
  概述了 `SliverAppBar` widget。

  {% biliEmbed 'BV19z4y1S7K7', '?aid=586378022&bvid=BV19z4y1S7K7&cid=288732722&page=1&autoplay=false', 'SliverAppBar | Flutter widget of the week' %}

**[SliverList and SliverGrid][]**
<br/> A one-minute Widget-of-the-week
  video that gives an overview of the `SliverList`
  and `SliverGrid` widgets.

**[SliverList 和 SliverGrid][SliverList and SliverGrid]**
<br/> 一段一分钟的「每周 Flutter Widgets」视频，
  概述了 `SliverList` 和 `SliverGrid` widget。

  {% biliEmbed 'BV1Pt411v78y', '?aid=38437526&bvid=BV1Pt411v78y&cid=67565151&page=12&autoplay=false', 'SliverList & SliverGrid | Flutter widget of the week' %}

**[Slivers explained - Making dynamic layouts][]**
<br/> A 50-minute episode of [The Boring Show][]
  where Ian Hickson, Flutter's Tech Lead, and Filip Hracek
  discuss the power of slivers.

**[Slivers explained - 动态布局][Slivers explained - Making dynamic layouts]**
<br/> 一集 50 分钟的 [The Boring Show][] 视频，
  Flutter 的技术负责人 Ian Hickson 和 Filip Hracek 讨论了 sliver 的能力。

  {% biliEmbed 'BV1EJ41197NB', '?aid=77325252&bvid=BV1EJ41197NB&cid=132272803&page=1&autoplay=false', 'Slivers explained - Making dynamic layouts' %}

## API docs

## API 文档

To learn more about the available sliver APIs,
check out these related API docs:

参阅以下 Sliver 相关 API 文档了解更多：

* [`CustomScrollView`][]
* [`SliverAppBar`][]
* [`SliverGrid`][]
* [`SliverList`][]

[`CustomScrollView`]: {{site.api}}/flutter/widgets/CustomScrollView-class.html
[sliver-app-bar-video]: {{site.yt.watch}}?v=R9C5KMJKluE
[`SliverAppBar`]: {{site.api}}/flutter/material/SliverAppBar-class.html
[`SliverGrid`]: {{site.api}}/flutter/widgets/SliverGrid-class.html
[SliverList and SliverGrid]: {{site.yt.watch}}?v=ORiTTaVY6mM
[`SliverList`]: {{site.api}}/flutter/widgets/SliverList-class.html
[Slivers, DeMystified]: {{site.flutter-medium}}/slivers-demystified-6ff68ab0296f
[Slivers explained - Making dynamic layouts]: {{site.bili.video}}/BV1EJ41197NB/
[The Boring Show]: {{site.yt.playlist}}PLOU2XLYxmsIK0r_D-zWcmJ1plIcDNnRkK
