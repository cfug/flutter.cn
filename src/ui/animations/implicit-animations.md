---
title: Implicit Animations
title: 隐式动画
description: Where to find more information on using implicit animations in Flutter.
description: 在 Flutter 中寻找有关使用隐式动画的更多信息。
tags: 用户界面,Flutter UI,动画
keywords: 隐式动画
---

With Flutter's [animation library][],
you can add motion and create visual effects
for the widgets in your UI.
One part of the library is an assortment of widgets
that manage animations for you.
These widgets are collectively referred to as _implicit animations_,
or _implicitly animated widgets_, deriving their name from the
[`ImplicitlyAnimatedWidget`][] class that they implement.
The following set of resources provide many ways to learn
about implicit animations in Flutter.

通过 Flutter 的 [动画库][animation library]，
你可以为 UI 中的 widgets 添加动作并创造视觉效果。
有些库包含各种各样可以帮你管理动画的 widget。
这些 widgets 被统称为 **隐式动画** 或 **隐式动画 widget**，
其名字来源于它们所实现的 [`ImplicitlyAnimatedWidget`][] 类。
下列资源提供了许多在 Flutter 中学习使用隐式动画的方法。

## Documentation

## 文档

[Implicit animations codelab][]
<br> Jump right into the code!
  This codelab uses interactive examples
  and step-by-step instructions to teach you
  how to use implicit animations.
  
[隐式动画 codelab][Implicit animations codelab]
<br> 跳转至代码！
  Codelab 使用交互式示例和分布介绍来教你学会如何使用隐式动画。

[`AnimatedContainer` sample][]
<br> A step-by-step recipe from the [Flutter cookbook][]
  for using the [`AnimatedContainer`][]
  implicitly animated widget.

[`AnimatedContainer` 示例][`AnimatedContainer` sample]
<br>[Flutter cookbook][] 中针对如何使用 [`AnimatedContainer`][] 隐式动画 widget 进行了手把手的指导。

[`ImplicitlyAnimatedWidget`][] API page
<br> All implicit animations extend the `ImplicitlyAnimatedWidget` class.

[`ImplicitlyAnimatedWidget`][] API 页面
<br>所有隐式动画都扩展了 `ImplicitlyAnimatedWidget` 类。

## Flutter in Focus videos

## 聚焦 Flutter 视频

Flutter in Focus videos feature 5-10 minute tutorials
with real code that cover techniques
that every Flutter dev needs to know from top to bottom.
The following videos cover topics
that are relevant to implicit animations.

聚焦 Flutter 视频以 5 到 10 分钟的实战代码为特点，涵盖了每个 Flutter 开发人员都需要从头到尾了解的技术。
下列视频涵盖了所有与隐性动画相关的话题。

{% comment %} Animation Basics with Implicit Animations {% endcomment %}

<iframe width="560" height="315" src="{{site.youtube-site}}/embed/IVTjpW3W33s" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{% comment %} Custom Implicit Animations with Tween Animation Builder {% endcomment %}
<iframe width="560" height="315" src="{{site.youtube-site}}/embed/6KiPEqzJIKQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## The Boring Show

Watch the Boring Show to follow Google Engineers build apps
from scratch in Flutter. The following episode covers
using implicit animations in a news aggregator app.

观看《The Boring Show》，跟随谷歌工程师用 Flutter 从零开始构建应用程序。
下面这一集涉及在一个新闻聚合器应用中使用隐式动画。

{% comment %} Implicitly animating the Hacker News app {% endcomment %}

<iframe width="560" height="315" src="{{site.youtube-site}}/embed/8ehlWchLVlQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Widget of the Week videos

## 每周 Widget 视频

A weekly series of short animated videos each showing
the important features of one particular widget.
In about 60 seconds, you'll see real code for each
widget with a demo about how it works.
The following Widget of the Week videos cover
implicitly animated widgets:

每周都有一个系列的动画短片，每个短片都展示了一个特定 widget 的核心功能。
在大约六十秒的时间里，你将会看到每个 widget 的实战代码，以及关于它是如何工作的演示。
下列「每周 Widget」视频涉及了隐含动画 widget 有：

{% comment %} Animated Opacity {% endcomment %}
<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=839306372&bvid=BV1W54y1U7ma&cid=225852916&page=1&autoplay=false" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{% comment %} Animated Padding {% endcomment %}
<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=839226956&bvid=BV1354y1U7gU&cid=223412850&page=1&autoplay=false" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{% comment %} Animated Positioned {% endcomment %}
<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=839111170&bvid=BV1T54y1D7hk&cid=220295763&page=1&autoplay=false" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{% comment %} Animated switcher {% endcomment %}
<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=544022725&bvid=BV1dv4y1o7BG&cid=295191533&page=1&autoplay=false" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


[`AnimatedContainer` sample]: {{site.url}}/cookbook/animation/animated-container
[`AnimatedContainer`]: {{site.api}}/flutter/widgets/AnimatedContainer-class.html
[animation library]: {{site.api}}/flutter/animation/animation-library.html
[Flutter cookbook]: {{site.url}}/cookbook
[Implicit animations codelab]: {{site.url}}/codelabs/implicit-animations
[`ImplicitlyAnimatedWidget`]: {{site.api}}/flutter/widgets/ImplicitlyAnimatedWidget-class.html
