---
title: Introduction to animations
title: 动画效果介绍
short-title: Animations
short-title: 动画
description: How to perform animations in Flutter
description: 如何使用 Flutter 实现动画效果
---

Well-designed animations makes a UI feel more intuitive, contribute to
the slick look and feel of a polished app, and improve the user experience.
Flutter's animation support makes it easy to implement a variety of
animation types. Many widgets, especially [Material widgets][],
come with the standard motion effects defined in their design spec,
but it's also possible to customize these effects.

设计巧妙的动画可以使UI体验更加直观，使应用程序拥有华丽的视觉效果和感受，提供更好的用户体验。flutter 提供的动画支持可以轻松实现各种动画类型。许多 widgets 尤其是 [Material widgets][]，在其设计规范定义中都自带标准动画效果，不过也支持定制效果。

The following resources are a good place to start learning the Flutter
animation framework. Each of these documents shows, step by step,
how to write animation code.

通过下面的资源可以很好的学习 Flutter 动画框架。这些文档循序渐进地讲解如何编写动画代码。

{% comment %}
More documentation is in the works on how to implement common design
patterns, such as shared element transitions,
and physics-based animations.
If you have a specific request, 
[file an issue]({{site.github}}/flutter/website/issues).
{% endcomment -%}

{% comment %}
  还有更多关于如何实现通用设计模式的文档正在整理中，比如共享内容转换和基于物理基础的动画。如果您有其他需求，请 [在这里]({{site.github}}/flutter/website/issues) 提出。
{% endcomment -%}

* [Animations tutorial](/docs/development/ui/animations/tutorial)<br>
  Explains the fundamental classes in the Flutter animation package
  (controllers, Animatable, curves, listeners, builders),
  as it guides you through a progression of tween animations using
  different aspects of the animation APIs.

  [动画教程](/docs/development/ui/animations/tutorial)<br>
  阐释了 Flutter 动画包中的基本类（控制器，动画，曲线，监听器，构建器），这些可以帮助您使用不同的动画 APIs 完成补间动画。

* [Zero to One with Flutter, part
  1]({{site.medium}}/dartlang/zero-to-one-with-flutter-43b13fd7b354) and [part
  2]({{site.medium}}/dartlang/zero-to-one-with-flutter-part-two-5aa2f06655cb)<br>
  Medium articles showing how to create an animated chart using tweening.

  [使用 Flutter 从零到一, 第一部分]({{site.medium}}/dartlang/zero-to-one-with-flutter-43b13fd7b354) 和 [第二部分]({{site.medium}}/dartlang/zero-to-one-with-flutter-part-two-5aa2f06655cb)<br>
  Medium 文章中有介绍如何使用补间动画创建图表动画。

* [Building Beautiful UIs with
  Flutter]({{site.codelabs}}/codelabs/flutter)<br>
  Codelab demonstrating how to build a simple chat app. [Step 7 (Animate
  your app)]({{site.codelabs}}/codelabs/flutter/#6)
  shows how to animate the new message&mdash;sliding it from the input area up
  to the message list.

  [使用 Flutter 构建美观 UIs]({{site.codelabs}}/codelabs/flutter)<br>
  Codelab 演示如何构建简单的聊天应用程序。[步骤 7 (应用动画化)]({{site.codelabs}}/codelabs/flutter/#6)

We also have some videos that discuss aspects of Flutter animation.

我们也提供一些探讨 Flutter 动画的视频。

<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=55792572&cid=97526142&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
AnimatedContainer

<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=55810608&cid=97564816&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
Opacity, including the implicit AnimatedOpacity widget

<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=55793736&cid=97536134&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
FadeInImage

<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=55794187&cid=97537277&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
Hero

<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=55831662&cid=97600653&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
Transform

<iframe width="560" height="315" src="//player.bilibili.com/player.html?aid=55835996&cid=97607807&page=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
AnimatedBuilder

## Animation types

## 动画类型

Animations fall into one of two categories: tween- or physics-based.
The following sections explain what these terms mean, and points you to
resources where you can learn more. In some cases,
the best documentation we currently have is example code in the
Flutter gallery.

动画分为两类：补间动画和基于物理动画。下面将解释这些术语的含义，并帮助您找到更多相关资源。在一些情况下，我们现有的最佳文档是 Flutter gallery 中的示例代码。

### Tween animation

### 补间动画

Short for _in-betweening_. In a tween animation, the beginning
and ending points are defined, as well as a timeline, and a curve
that defines the timing and speed of the transition.
The framework calculates how to transition from the beginning point
to the end point.

补间动画是“介于两者之间”的缩写。在补间动画中，定义了起点和终点以及时间轴，再定义过渡时间和速度的曲线。然后框架会计算如何从起点过渡到终点。

The documents listed above, such as the [animations
tutorial](/docs/development/ui/animations/tutorial) are not about tweening,
specifically, but they use tweens in their examples.

上文列出的文档，比如 [动画指南](/docs/development/ui/animations/tutorial) 并不是特别针对补间动画的，但是其示例中使用了补间动画。

### Physics-based animation

### 基于物理基础的动画

In physics-based animation, motion is modeled to resemble real-world
behavior. When you toss a ball, for example, where and when it lands
depends on how fast it was tossed and how far it was from the ground.
Similarly, dropping a ball attached to a spring falls
(and bounces) differently than dropping a ball attached to a string.

在基于物理基础的动画中，动作是模拟真实世界的行为来进行建模的。举个例子，当您抛球时，球落地的时间和位置取决于抛出的速度和距离地面的高度。类似地，附在弹簧上的球和附在绳子上的球掉落（和反弹）方式是不一样的。

* [Flutter Gallery]({{site.github}}/flutter/flutter/tree/master/examples/flutter_gallery)<br>
Under **Material Components**, the
[Grid]({{site.github}}/flutter/flutter/blob/master/examples/flutter_gallery/lib/demo/material/grid_list_demo.dart) example
demonstrates a fling animation. Select one of the images from
the grid and zoom in. You can pan the image with flinging or dragging
gestures.

 [Flutter Gallery]({{site.github}}/flutter/flutter/tree/master/examples/flutter_gallery)<br>
在 **Material 组件** 下，[网格]({{site.github}}/flutter/flutter/blob/master/examples/flutter_gallery/lib/demo/material/grid_list_demo.dart) 示例演示了一个抛物动画。从网格中选取一个图像并放大。您可以通过使用投掷和拖动来平移图像。

* Also see the API documentation for
  [AnimationController<wbr>.animateWith][AnimationController.animateWith] and
  [SpringSimulation][].

  请参考 API 文档 [AnimationController<wbr>.animateWith][AnimationController.animateWith] 和
  [SpringSimulation][]。

## Common animation patterns

## 常见动画模式

Most UX or motion designers find that certain animation patterns are
used repeatedly when designing a UI. This section lists some of the commonly
used animation patterns, and tells you where you can learn more.

多数 UX 或动画设计人员会发现在设计 UI 时，经常重复使用某些动画模式。本章列举了一些常用的动画模式，并提供更多学习路径。

### Animated list or grid

### 列表或网格动画

This pattern involves animating the addition or removal of elements from a
list or grid.

这种模式用于在列表或网格中添加或删除元素。

* [AnimatedList example](/docs/catalog/samples/animated-list)<br>
This demo, from the [Sample App Catalog](/docs/catalog/samples), shows how to
animate adding an element to a list, or removing a selected element.
The internal Dart list is synced as the user modifies the list using
the plus (+) and minus (-) buttons.

  [AnimatedList example](/docs/catalog/samples/animated-list)<br>
这个来自 [Sample App Catalog](/docs/catalog/samples) 的演示展示了如何动态添加元素至列表或删除选定元素。当用户使用 plus (+) 和 minus (-) 按钮修改列表时，会同步到内部 Dart 列表。

### Shared element transition

### 共享元素转换

In this pattern, the user selects an element&mdash;often an
image&mdash;from the page, and the UI animates the selected element
to a new page with more detail. In Flutter, you can easily implement
shared element transitions between routes (pages) using the Hero widget.

在这个模式中，用户从页面中选择一个元素，通常是图像，然后 UI 会在新页面中为指定元素添加动画，并生成更多细节。在 Flutter 中，您可以通过 Hero widget 轻松实现路径（页面）间的共享元素转换动画。

* [Hero Animations](/docs/development/ui/animations/hero-animations)
How to create two styles of Hero animations:

  [Hero Animations](/docs/development/ui/animations/hero-animations) 如何创建两种风格的 Hero 动画：

  * The hero flies from one page to another while changing position
    and size.
    
    当改变位置和大小时，Hero 从一页飞至另一页。
    
  * The hero's boundary changes shape, from a circle to a square,
    as its flies from one page to another.
    
    Hero 的边界改变形状由圆变方，同时从一页飞至另一页。

* [Flutter Gallery][]<br>
You can build the Gallery app yourself, or download it from the Play Store.
The
[Shrine]({{site.github}}/flutter/flutter/blob/master/examples/flutter_gallery/lib/demo/shrine_demo.dart)
demo includes an example of a Hero animation.

  [Flutter Gallery][]<br>
您可以自己自己创建 Gallery 应用程序，或者到 Play 商店中下载。[Shrine]({{site.github}}/flutter/flutter/blob/master/examples/flutter_gallery/lib/demo/shrine_demo.dart) 演示中有关于 Hero 动画的示例。

* Also see the API documentation for the
[Hero,]({{site.api}}/flutter/widgets/Hero-class.html)
[Navigator,]({{site.api}}/flutter/widgets/Navigator-class.html) and
[PageRoute]({{site.api}}/flutter/widgets/PageRoute-class.html)
classes.

  另请参阅 API 文档 [Hero,]({{site.api}}/flutter/widgets/Hero-class.html)
[Navigator,]({{site.api}}/flutter/widgets/Navigator-class.html) 
[PageRoute]({{site.api}}/flutter/widgets/PageRoute-class.html)。

### Staggered animation

### 交织动画

Animations that are broken into smaller motions, where some of the motion
is delayed.  The smaller animations might be sequential,
or might partially or completely overlap.

动画被分解成较小的动作，其中一些动作被延迟。这些小动画可以是连续的，也可以部分或完全重叠。

* [Staggered Animations](/docs/development/ui/animations/staggered-animations)

  [交织动画](/docs/development/ui/animations/staggered-animations)

{% comment %}
  Save so I can remember how to add it back later.
  <img src="/images/ic_new_releases_black_24px.svg" alt="this doc is new!"> NEW<br>
{% endcomment -%}

{% comment %}
  请保存以便记得以后如何添加。
  <img src="/images/ic_new_releases_black_24px.svg" alt="this doc is new!"> NEW<br>
{% endcomment -%}

## Other resources

## 其他资源

Learn more about Flutter animations at the following links:

以下链接可以了解更多 Flutter 动画：

* [Animations: Technical Overview](/docs/development/ui/animations/overview.html)<br>
A look at some of the major classes in the animations library,
and Flutter's animation architecture.

  [动画概览](/docs/development/ui/animations/overview.html)<br>
动画库中主要类简介，以及 Flutter 动画结构。

* [Animation and Motion Widgets](/docs/development/ui/widgets/animation)<br>
A catalog of some of the animation widgets provided in the Flutter APIs.

  [动画及动作 Widgets](/docs/development/ui/widgets/animation)<br>
Flutter APIs 提供的动画 widgets 目录。

{% comment %}
Until the landing page for the animation library is reworked, leave this
link out.
* The [animation
library]({{site.api}}/flutter/animation/animation-library.html)
in the [Flutter API documentation]({{site.api}})<br>
The animation API for the Flutter framework.
{% endcomment %}

{% comment %}
在动画库页面可用之前，请保留此连接。
* 在 [Flutter API 文档]({{site.api}}) 中的 [动画库]({{site.api}}/flutter/animation/animation-library.html)<br>
Flutter 框架中的动画 API。
{% endcomment %}

<hr>

If there is specific animation documentation you'd like to see,
[file an issue]({{site.github}}/flutter/website/issues).

如有您有想要查阅的动画文档，请 [在这里]({{site.github}}/flutter/website/issues) 提出。

[AnimationController.animateWith]: {{site.api}}/flutter/animation/AnimationController/animateWith.html
[Flutter Gallery]: {{site.repo.flutter}}/tree/master/examples/flutter_gallery
[Material widgets]: /docs/development/ui/widgets/material
[SpringSimulation]: {{site.api}}/flutter/physics/SpringSimulation-class.html
