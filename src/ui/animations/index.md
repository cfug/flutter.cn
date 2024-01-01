---
title: Introduction to animations
title: 动画效果介绍
short-title: Animations
short-title: 动画
description: How to perform animations in Flutter.
description: 如何使用 Flutter 实现动画效果。
tags: 用户界面,Flutter UI,动画
keywords: 动画效果实现
---

{% include docs/yt_shims.liquid %}

Well-designed animations make a UI feel more intuitive,
contribute to the slick look and feel of a polished app,
and improve the user experience.
Flutter's animation support makes it easy to implement a variety of
animation types. Many widgets, especially [Material widgets][],
come with the standard motion effects defined in their design spec,
but it's also possible to customize these effects.

精心设计的动画会使 UI 更生动，
它有助于提升应用程序更精巧的外观和感觉，
从而改善用户体验。
Flutter 让各种动画效果的实现变得容易。
在许多 widget 特别是 [Material widgets][] 中，
它们都自带其设计规范中定义的标准动画效果，
当然，你也可以定制这些效果。

## Choosing an approach

## 选择一种实现方式

There are different approaches you can take when creating
animations in Flutter. Which approach is right for you?
To help you decide, check out the video,
[How to choose which Flutter Animation Widget is right for you?][]
(Also published as a [_companion article_][article1].)

在 Flutter 中创建动画可以有多种不同实现方式。
那么，究竟哪种才是最适合你的呢？
为了帮助你更好的理解它，你可以观看下面的视频，
[如何在 Flutter 中选择合适的动画 Widget][How to choose which Flutter Animation Widget is right for you?]
（同时也发布了一篇 [配套文章][article1]。）

<iframe width="560" height="315" src="{{yt-embed}}/GXIJJkq_H8g" title="Learn how to choose the Flutter Animation Widget for your use case" {{yt-set}}></iframe>

(To dive deeper into the decision process,
watch the [Animations in Flutter done right][] video,
presented at Flutter Europe.)

（若想要深入了解它的决策流程，
请观看在 Flutter Europe 社区账号发布的
[在 Flutter 中使用动画的正确选择][Animations in Flutter done right]）视频。

As shown in the video, the following
decision tree helps you decide what approach
to use when implementing a Flutter animation:

正如视频中说的那样，
下面的决策树将帮助你挑选实现 Flutter 动画的正确方式：

<img src='/assets/images/docs/ui/animations/animation-decision-tree.png'
    alt="The animation decision tree" class="mw-100">

If a pre-packaged implicit animation (the easiest animation
to implement) suits your needs, watch
[Animation basics with implicit animations][].
(Also published as a [_companion article_][article2].)

如果内置的隐式动画（最简单的动画）已经能够满足你的需求，
请观看 [隐式动画基础][Animation basics with implicit animations]。
（同时也发布了一篇 [配套文章][article2]。）

<iframe width="560" height="315" src="{{yt-embed}}/IVTjpW3W33s" title="Learn about basic Flutter animation with implicit animations" {{yt-set}}></iframe>

[Learn about Animation Basics with Implicit Animations]({{yt-watch}}/IVTjpW3W33s)

[使用隐式动画了解动画基础知识]({{yt-watch}}/IVTjpW3W33s)

To create a custom implicit animation, watch
[Creating your own custom implicit animations with TweenAnimationBuilder][].
(Also published as a [_companion article_][article3].)

要创建一个自定义的隐式动画，请观看
[使用 TweenAnimationBuilder 创建独特的隐式动画][Creating your own custom implicit animations with TweenAnimationBuilder]。
（同时也发布了一篇 [配套文章][article3]。）

<iframe width="560" height="315" src="{{yt-embed}}/6KiPEqzJIKQ" title="Learn about building Custom Implicit Animations with TweenAnimationBuilder" {{yt-set}}></iframe>

[Learn about building Custom Implicit Animations with TweenAnimationBuilder]({{yt-watch}}/6KiPEqzJIKQ)

[了解如何使用 TweenAnimationBuilder 构建自定义隐式动画]({{yt-watch}}/6KiPEqzJIKQ)

To create an explicit animation (where you control the animation,
rather than letting the framework control it), perhaps
you can use one of the built-in explicit animations classes.
For more information, watch
[Making your first directional animations with
built-in explicit animations][].
(Also published as a [_companion article_][article4].)

要创建显式动画（手动控制，而不是让框架控制），
你可以使用内置的其中一个显式动画类来实现。更多有关信息，请观看
[使用内置显式动画][Making your first directional animations with
built-in explicit animations]。
（同时也发布了一篇 [配套文章][article4]。）

<iframe width="560" height="315" src="{{yt-embed}}/CunyH6unILQ" title="Learn about the built-in explicit animations in Flutter" {{yt-set}}></iframe>

If you need to build an explicit animation from scratch, watch
[Creating custom explicit animations with
AnimatedBuilder and AnimatedWidget][].
(Also published as a [_companion article_][article5].)

如果你需要从头开始构建显式动画，请观看
[通过 AnimatedBuilder 和 AnimatedWidget 创建一个自定义动画][Creating custom explicit animations with AnimatedBuilder and AnimatedWidget]。
（同时也发布了一篇[配套文章][article5]。）

<iframe width="560" height="315" src="{{yt-embed}}/fneC7t4R_B0" title="Learn about building Custom Explicit Animations with the AnimatedBuilder and AnimatedWidget Flutter Widgets" {{yt-set}}></iframe>

For a deeper understanding of just how animations work in Flutter, watch
[Animation deep dive][].
(Also published as a [_companion article_][article6].)

想要更深入的理解动画在 Flutter 中的工作方式，
请观看 [深入理解动画][Animation deep dive]。
（同时也发布了一篇 [配套文章][article6]。）

<iframe width="560" height="315" src="{{yt-embed}}/PbcILiN8rbo" title="Take a deep dive into Flutter animation" {{yt-set}}></iframe>

## Codelabs, tutorials, and articles

## Codelabs, 教程和文章

The following resources are a good place to start learning
the Flutter animation framework. Each of these documents
shows how to write animation code.

通过下面的资源可以很好的学习 Flutter 动画框架。这些文档循序渐进地讲解如何编写动画代码。

* [Implicit animations codelab][]<br>
  Covers how to use implicit animations
  using step-by-step instructions and interactive examples.

  [隐式动画 codelab][Implicit animations codelab]<br>
  涵盖了如何使用隐式动画的分步说明及交互示例。

* [Animations tutorial][]<br>
  Explains the fundamental classes in the Flutter animation package
  (controllers, Animatable, curves, listeners, builders),
  as it guides you through a progression of tween animations using
  different aspects of the animation APIs.

  [动画教程][Animations tutorial]<br>
  阐释了 Flutter 动画包中的基本类（控制器，动画，曲线，监听器，构建器），
  这些可以帮助您使用不同的动画 APIs 完成补间动画。

* [Zero to One with Flutter, part 1][] and [part 2][]<br>
  Medium articles showing how to create an animated chart using tweening.

  [使用 Flutter 从零到一, 第一部分][Zero to One with Flutter, part 1] 和 [第二部分][part 2]<br>
  Medium 文章中有介绍如何使用补间动画创建图表动画。

* [Write your first Flutter app on the web][]<br>
  Codelab demonstrating how to create a form
  that uses animation to show the user's progress
  as they fill in the fields.

  [撰写你的第一个 Flutter Web 应用][Write your first Flutter app on the web]<br>
  Codelab 演示如何构建一个根据用户填写的内容以动画展示进度的表单。

## Animation types

Generally, animations are either tween- or physics-based.
The following sections explain what these terms mean,
and point you to resources where you can learn more.

动画分为两类：补间动画和基于物理动画。下面将解释这些术语的含义，
并帮助您找到更多相关资源。在一些情况下，
我们现有的最佳文档是 Flutter gallery 中的示例代码。

### Tween animation

### 补间动画

Short for _in-betweening_. In a tween animation, the beginning
and ending points are defined, as well as a timeline, and a curve
that defines the timing and speed of the transition.
The framework calculates how to transition from the beginning point
to the end point.

补间动画是“介于两者之间”的缩写。
在补间动画中，定义了起点和终点以及时间轴，
再定义过渡时间和速度的曲线。然后框架会计算如何从起点过渡到终点。

The documents listed above, such as the [animations
tutorial][] are not about tweening,
specifically, but they use tweens in their examples.

上文列出的文档，比如 
[在 Flutter 应用里实现动画效果][animations tutorial] 
并不是特别针对补间动画的，但是其示例中使用了补间动画。

### Physics-based animation

### 基于物理基础的动画

In physics-based animation, motion is modeled to resemble real-world
behavior. When you toss a ball, for example, where and when it lands
depends on how fast it was tossed and how far it was from the ground.
Similarly, dropping a ball attached to a spring falls
(and bounces) differently than dropping a ball attached to a string.

在基于物理基础的动画中，动作是模拟真实世界的行为来进行建模的。
举个例子，当您抛球时，球落地的时间和位置取决于抛出的速度和距离地面的高度。
类似地，附在弹簧上的球和附在绳子上的球掉落（和反弹）方式是不一样的。

* [Animate a widget using a physics simulation][]<br>
  A recipe in the animations section of the Flutter cookbook.

  [使用物理模拟动画效果][Animate a widget using a physics simulation]<br>
  在 Flutter cookbook 中的动画教程。

* [Flutter Gallery][]<br>
  Under **Material Components**, the [`Grid`][] example
  demonstrates a fling animation. Select one of the
  images from the grid and zoom in. You can pan the
  image with flinging or dragging gestures.

  [Flutter Gallery][]<br>
  在 **Material 组件** 下，[`Grid`][] 示例演示了一个抛物动画。
  从网格中选取一个图像并放大。您可以通过使用投掷和拖动来平移图像。

* Also see the API documentation for
  [`AnimationController.animateWith`][] and
  [`SpringSimulation`][].

  请参考 API 文档 [`AnimationController.animateWith`][]
  和 [`SpringSimulation`][]。

## Pre-canned animations

## 预置动画

If you are using Material widgets, you might check
out the [animations package][] available on pub.dev.
This package contains pre-built animations for
the following commonly used patterns:
`Container` transforms, shared axis transitions,
fade through transitions, and fade transitions.

如果你在使用 Material widgets，
你也许想要看看 pub.dev 上的 [animations package][]。
这个 package 包含了以下内置常用模式：
`Container` 变换、共享轴变化、渐变穿透和渐变变换。

## Common animation patterns

## 常见动画模式

Most UX or motion designers find that certain
animation patterns are used repeatedly when designing a UI.
This section lists some of the commonly
used animation patterns, and tells you where to learn more.

大多数 UX 或 动效设计师在设计 UI 时都会寻找主要动画模式。
本章的列表将介绍一些常见的动画模式，并向你介绍更多学习它们的地方。

### Animated list or grid

### 列表或网格动画

This pattern involves animating the addition or removal of
elements from a list or grid.

这种模式用于在列表或网格中添加或删除元素。

* [`AnimatedList` example][]<br>
  This demo, from the [Sample app catalog][], shows how to
  animate adding an element to a list, or removing a selected element.
  The internal Dart list is synced as the user modifies the list using
  the plus (+) and minus (-) buttons.

  [`AnimatedList` example][]<br>
  这个来自 [Sample app catalog][] 的演示展示了
  如何动态添加元素至列表或删除选定元素。
  当用户使用 plus (+) 和 minus (-) 按钮修改列表时，
  会同步到内部 Dart 列表。

### Shared element transition

### 共享元素转换

In this pattern, the user selects an element&mdash;often an
image&mdash;from the page, and the UI animates the selected element
to a new page with more detail. In Flutter, you can easily implement
shared element transitions between routes (pages)
using the `Hero` widget.

在这个模式中，用户从页面中选择一个元素，通常是图像，
然后 UI 会在新页面中为指定元素添加动画，并生成更多细节。
在 Flutter 中，您可以通过 Hero widget
轻松实现路径（页面）间的共享元素转换动画。

* [Hero animations][]
  How to create two styles of Hero animations:

  [Hero animations][] 如何创建两种风格的 Hero 动画：

  * The hero flies from one page to another while changing position
    and size.
    
    当改变位置和大小时，Hero 从一页飞至另一页。
    
  * The hero's boundary changes shape, from a circle to a square,
    as its flies from one page to another.
    
    Hero 的边界改变形状由圆变方，同时从一页飞至另一页。

* [Flutter Gallery][]<br>
  You can build the Gallery app yourself,
  or download it from the Play Store. The [Shrine][]
  demo includes an example of a hero animation.

  [Flutter Gallery][]<br>
  您可以自己自己创建 Gallery 应用程序，或者到 Play 商店中下载。
  [Shrine][] 演示中有关于 Hero 动画的示例。

* Also see the API documentation for the
  [`Hero`][], [`Navigator`][], and [`PageRoute`][] classes.

  另请参阅 API 文档 [`Hero`][]、[`Navigator`][] 和 [`PageRoute`][] 类。

### Staggered animation

### 交织动画

Animations that are broken into smaller motions,
where some of the motion is delayed.
The smaller animations might be sequential,
or might partially or completely overlap.

动画被分解成较小的动作，其中一些动作被延迟。
这些小动画可以是连续的，也可以部分或完全重叠。

* [Staggered Animations][]

  [交织动画][Staggered Animations]

{% comment %}
  Save so I can remember how to add it back later.
  <img src="/assets/images/docs/ic_new_releases_black_24px.svg" alt="this doc is new!"> NEW<br>
{% endcomment -%}

## Other resources

## 其他资源

Learn more about Flutter animations at the following links:

以下链接可以了解更多 Flutter 动画：

* [Animation samples][] from the [Sample app catalog][].

  [示例应用目录][Sample app catalog] 中的 [动画示例][Animation samples]

* [Animation recipes][] from the Flutter cookbook.

  Flutter 实用教程 (Cookbook) 中的 [动画教程][Animation recipes]

* [Animation videos][] from the Flutter YouTube channel.

  Flutter 视频频道中 [动画相关的视频][Animation videos]

* [Animations: overview][]<br>
  A look at some of the major classes in the
  animations library, and Flutter's animation architecture.

  [动画概览][Animations: overview]<br>
  动画库中主要类简介，以及 Flutter 动画结构。

* [Animation and motion widgets][]<br>
  A catalog of some of the animation widgets
  provided in the Flutter APIs.

  [动画及动作 Widgets][Animation and motion widgets]<br>
  Flutter APIs 提供的动画 widgets 目录。

* The [animation library][] in the [Flutter API documentation][]<br>
  The animation API for the Flutter framework. This link
  takes you to a technical overview page for the library.

  [Flutter API 文档][Flutter API documentation] 中的 [动画库][animation library]<br>
  Flutter 的动画 API。此链接将带你进入动画库的概述页。

[Animate a widget using a physics simulation]: {{site.url}}/cookbook/animation/physics-simulation
[`AnimatedList` example]: https://flutter.github.io/samples/animations.html
[Animation and motion widgets]: {{site.url}}/ui/widgets/animation
[Animation basics with implicit animations]: {{yt-watch}}?v=IVTjpW3W33s&list=PLjxrf2q8roU2v6UqYlt_KPaXlnjbYySua&index=1
[Animation deep dive]: {{yt-watch}}?v=PbcILiN8rbo&list=PLjxrf2q8roU2v6UqYlt_KPaXlnjbYySua&index=5
[animation library]: {{site.api}}/flutter/animation/animation-library.html
[Animation recipes]: {{site.url}}/cookbook/animation
[Animation samples]: {{site.repo.samples}}/tree/main/animations#animation-samples
[Animation videos]: {{site.social.youtube}}/search?query=animation
[Animations in Flutter done right]: {{yt-watch}}?v=wnARLByOtKA&t=3s
[Animations: overview]: {{site.url}}/ui/animations/overview
[animations package]: {{site.pub}}/packages/animations
[Animations tutorial]: {{site.url}}/ui/animations/tutorial
[`AnimationController.animateWith`]: {{site.api}}/flutter/animation/AnimationController/animateWith.html
[article1]: {{site.flutter-medium}}/how-to-choose-which-flutter-animation-widget-is-right-for-you-79ecfb7e72b5
[article2]: {{site.flutter-medium}}/flutter-animation-basics-with-implicit-animations-95db481c5916
[article3]: {{site.flutter-medium}}/custom-implicit-animations-in-flutter-with-tweenanimationbuilder-c76540b47185
[article4]: {{site.flutter-medium}}/directional-animations-with-built-in-explicit-animations-3e7c5e6fbbd7
[article5]: {{site.flutter-medium}}/when-should-i-useanimatedbuilder-or-animatedwidget-57ecae0959e8
[article6]: {{site.flutter-medium}}/animation-deep-dive-39d3ffea111f
[Creating your own custom implicit animations with TweenAnimationBuilder]: {{yt-watch}}?v=6KiPEqzJIKQ&feature=youtu.be
[Creating custom explicit animations with AnimatedBuilder and AnimatedWidget]: {{yt-watch}}?v=fneC7t4R_B0&list=PLjxrf2q8roU2v6UqYlt_KPaXlnjbYySua&index=4
[Flutter API documentation]: {{site.api}}
[Flutter Gallery]: {{site.repo.gallery}}
[`Grid`]: {{site.repo.gallery}}/blob/main/lib/demos/material/grid_list_demo.dart
[`Hero`]: {{site.api}}/flutter/widgets/Hero-class.html
[Hero animations]: {{site.url}}/ui/animations/hero-animations
[How to choose which Flutter Animation Widget is right for you?]: {{yt-watch}}?v=GXIJJkq_H8g
[Implicit animations codelab]: {{site.url}}/codelabs/implicit-animations
[Making your first directional animations with built-in explicit animations]: {{yt-watch}}?v=CunyH6unILQ&list=PLjxrf2q8roU2v6UqYlt_KPaXlnjbYySua&index=3
[Material widgets]: {{site.url}}/ui/widgets/material
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`PageRoute`]: {{site.api}}/flutter/widgets/PageRoute-class.html
[part 2]: {{site.medium}}/dartlang/zero-to-one-with-flutter-part-two-5aa2f06655cb
[Sample app catalog]: https://flutter.github.io/samples
[Shrine]: {{site.repo.gallery}}/tree/main/lib/studies/shrine
[`SpringSimulation`]: {{site.api}}/flutter/physics/SpringSimulation-class.html
[Staggered Animations]: {{site.url}}/ui/animations/staggered-animations
[Write your first Flutter app on the web]: {{site.url}}/get-started/codelab-web
[Zero to One with Flutter, part 1]: {{site.medium}}/dartlang/zero-to-one-with-flutter-43b13fd7b354
