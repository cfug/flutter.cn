---
# title: Scrolling
title: 滚动
# description: Overview of Flutter's scrolling support
description: Flutter 滚动支持概览
ai-translated: true
---

Flutter has many built-in widgets that automatically
scroll and also offers a variety of widgets
that you can customize to create specific scrolling
behavior.

Flutter 有许多内置 widget 可自动滚动，
还提供多种可自定义的 widget，
用于实现特定的滚动行为。

## Basic scrolling

## 基础滚动

Many Flutter widgets support scrolling out of the box
and do most of the work for you. For example,
[`SingleChildScrollView`][] automatically scrolls its
child when necessary. Other useful widgets include
[`ListView`][] and [`GridView`][].
You can check out more of these widgets on the
[scrolling page][] of the Widget catalog.

许多 Flutter widget 开箱即用地支持滚动，并为你完成大部分工作。例如，
[`SingleChildScrollView`][] 会在必要时自动滚动其子 widget。
其他实用 widget 包括 [`ListView`][] 和 [`GridView`][]。
你可以在 Widget 目录的[滚动页面][scrolling page]查看更多此类 widget。

<YouTubeEmbed id="DbkIQSvwnZc" title="Scrollbar | Flutter widget of the week"></YouTubeEmbed>

<YouTubeEmbed id="KJpkjHGiI5A" title="ListView | Flutter widget of the week"></YouTubeEmbed>

### Infinite scrolling

### 无限滚动

When you have a long list of items
in your `ListView` or `GridView` (including an _infinite_ list),
you can build the items on demand
as they scroll into view. This provides a much
more performant scrolling experience.
For more information, check out
[`ListView.builder`][] or [`GridView.builder`][].

当你的 `ListView` 或 `GridView` 中有很长的项列表（包括*无限*列表）时，
可以在项滚动进入可视区域时按需构建。
这能带来性能更好的滚动体验。
更多信息请参阅 [`ListView.builder`][] 或 [`GridView.builder`][]。

[`ListView.builder`]: {{site.api}}/flutter/widgets/ListView/ListView.builder.html
[`GridView.builder`]: {{site.api}}/flutter/widgets/GridView/GridView.builder.html

### Specialized scrollable widgets

### 专用可滚动 widget

The following widgets provide more
specific scrolling behavior.

以下 widget 提供更具体的滚动行为。

A video on using [`DraggableScrollableSheet`][]:

关于使用 [`DraggableScrollableSheet`][] 的视频：

<YouTubeEmbed id="Hgw819mL_78" title="DraggableScrollableSheet | Flutter widget of the week"></YouTubeEmbed>

Turn the scrollable area into a wheel with [`ListWheelScrollView`][]!

使用 [`ListWheelScrollView`][] 将可滚动区域变成滚轮！

<YouTubeEmbed id="dUhmWAz4C7Y" title="ListWheelScrollView | Flutter widget of the week"></YouTubeEmbed>

[`DraggableScrollableSheet`]: {{site.api}}/flutter/widgets/DraggableScrollableSheet-class.html
[`GridView`]: {{site.api}}/flutter/widgets/GridView-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`ListWheelScrollView`]: {{site.api}}/flutter/widgets/ListWheelScrollView-class.html
[scrolling page]: /ui/widgets/scrolling
[`SingleChildScrollView`]: {{site.api}}/flutter/widgets/SingleChildScrollView-class.html

{% comment %}
  Not yet, but coming. Two dimensional scrolling:
  TableView and TreeView.
  Video: {{site.yt.watch}}?v=UDZ0LPQq-n8
{% endcomment %}

## Fancy scrolling

## 高级滚动

Perhaps you want to implement _elastic_ scrolling,
also called _scroll bouncing_. Or maybe you want to
implement other dynamic scrolling effects, like parallax scrolling.
Or perhaps you want a scrolling header with very specific behavior,
such as shrinking or disappearing.

也许你希望实现*弹性*滚动，也称为*滚动回弹*。
或者你想实现其他动态滚动效果，例如视差滚动。
又或者你需要具有特定行为的滚动页眉，例如收缩或消失。

You can achieve all this and more using the
Flutter `Sliver*` classes.
A _sliver_ refers to a piece of the scrollable area.
You can define and insert a sliver into a [`CustomScrollView`][]
to have finer-grained control over that area.

你可以使用 Flutter 的 `Sliver*` 类实现以上所有效果及更多。
*sliver* 指可滚动区域中的一块。
你可以定义 sliver 并将其插入 [`CustomScrollView`][]，
以对该区域进行更细粒度的控制。

For more information, check out
[Using slivers to achieve fancy scrolling][]
and the [Sliver classes][].

更多信息请参阅
[使用 sliver 实现出色的滚动效果][Using slivers to achieve fancy scrolling]
和 [Sliver 类][Sliver classes]。

[`CustomScrollView`]: {{site.api}}/flutter/widgets/CustomScrollView-class.html
[Sliver classes]: /ui/widgets/layout#sliver-widgets
[Using slivers to achieve fancy scrolling]: /ui/layout/scrolling/slivers

## Nested scrolling widgets

## 嵌套滚动 widget

How do you nest a scrolling widget
inside another scrolling widget
without hurting scrolling performance?
Do you set the `ShrinkWrap` property to true,
or do you use a sliver?

如何将一个滚动 widget 嵌套在另一个滚动 widget 内，
同时不影响滚动性能？
是将 `ShrinkWrap` 属性设为 true，还是使用 sliver？

Check out the "ShrinkWrap vs Slivers" video:

请观看「ShrinkWrap vs Slivers」视频：

<YouTubeEmbed id="LUqDNnv_dh0" title="ShrinkWrap vs Slivers | Decoding Flutter"></YouTubeEmbed>
