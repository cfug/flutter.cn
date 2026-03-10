---
# title: How Flutter Works
title: Flutter 的工作原理
# breadcrumb: How Flutter Works
breadcrumb: Flutter 的工作原理
# description: This pages walks you through the quick install process for Flutter.
description: 本页面通过视频系列带你了解 Flutter 的工作原理。
layout: tutorial
---

<Stepper level="2">

## Flutter's architecture

## Flutter 的架构

<YouTubeEmbed id="0Xn1QhNtPkQ" title="How Flutter Works" fullWidth />

<br> Welcome to the first episode of "How Flutter Works," a six-part
series designed to explore what happens to your Dart code after you
release it into Flutter. In this episode, we're taking a high-level
look at Flutter's architecture. Learn about declarative code,
multi-platform frameworks, and the role of Dart in Flutter's
architecture. This video is perfect for those beginning to research
Flutter and who want to understand the big picture.

欢迎来到"Flutter 的工作原理"的第一集，这是一个由六部分组成的系列，旨在探索你的 Dart 代码进入 Flutter 后会发生什么。在本集中，我们将从高层次审视 Flutter 的架构。了解声明式代码、多平台框架以及 Dart 在 Flutter 架构中的作用。本视频非常适合刚开始研究 Flutter 并想要了解全貌的开发者。

## The three trees

## 三棵树

<YouTubeEmbed id="xiW3ahr4CRU" title="The three trees" fullWidth />

<br> Dive into Flutter's architecture by exploring its three primary
trees: Widget, Element, and RenderObject. Discover how widgets provide
the declarative API for Flutter developers and see how Elements glue
widgets to the rendering layer. Follow along as we also cover the role
of RenderObjects in translating widget values into painting calls.

深入了解 Flutter 的架构，探索它的三棵主要的树：widget 树、Element 树和渲染树。了解 widget 如何为 Flutter 开发者提供声明式 API，以及 Element 如何将 widget 与渲染层连接起来。跟随我们一起了解 RenderObject 在将 widget 的值转化为绘制调用中所扮演的角色。


## The state class

## State 类

<YouTubeEmbed id="FP737UMx7ss" title="The state class" fullWidth />

<br> In Episode 3 of How Flutter Works, we dive deep into the State
class, a critical piece behind every StatefulWidget. We walk through
the full life cycle of a State object—from initState, where you
initialize resources, to dispose, where you clean up. Along the way,
we explore important methods like didChangeDependencies (triggered by
inherited widgets like MediaQuery), didUpdateWidget (for reacting to
ancestor-driven changes), and the all-important build method. By the
end of the episode, you'll understand how State objects track, respond
to, and manage changes in your Flutter apps—and how the State life
cycle enables efficient UI updates.

在"Flutter 的工作原理"第 3 集中，我们深入探讨了 State 类——每个 StatefulWidget 背后的关键部分。我们将完整走过一个 State 对象的生命周期——从初始化资源的 initState，到清理资源的 dispose。在此过程中，我们还会探索重要的方法，如 didChangeDependencies（由 MediaQuery 等 inherited widget 触发）、didUpdateWidget（用于响应祖先驱动的变化）以及最重要的 build 方法。在本集结束时，你将理解 State 对象如何在 Flutter 应用中跟踪、响应和管理变化——以及 State 的生命周期如何实现高效的 UI 更新。

We also peel back the curtain on how Flutter recurses down the widget
tree after a setState call, building out only the parts of your app
that need to change. You'll learn why const constructors matter for
performance, why setState closures must be synchronous, and how
Elements (not Widgets themselves) manage the actual rebuild process.
If you're curious how Flutter keeps apps fast and responsive, or you
just want to really understand what happens behind the scenes, this
episode is packed with the essential foundations.

我们还揭示了 Flutter 在 setState 调用后如何沿 widget 树递归，只重建应用中需要变化的部分。你将了解为什么 const 构造函数对性能很重要，为什么 setState 的闭包必须是同步的，以及 Element（而非 Widget 本身）如何管理实际的重建过程。如果你好奇 Flutter 如何保持应用的快速和流畅，或者你只是想真正了解幕后发生了什么，这一集包含了所有必要的基础知识。


## The RenderObjectWidget

## RenderObjectWidget

<YouTubeEmbed id="zcJlHVVM84I" title="The RenderObjectWidget" fullWidth />

<br> Ever wonder how your Flutter app actually renders to the screen?
In this video, we dive into RenderObjectWidgets—the only type of
widget in Flutter that creates something visual. While
StatelessWidgets and StatefulWidgets help structure your app, it’s
RenderObjectWidgets that turn your UI code into real pixels.

是否想过你的 Flutter 应用实际上是如何渲染到屏幕上的？在本视频中，我们深入了解 RenderObjectWidget——Flutter 中唯一能创建可视化内容的 widget 类型。虽然 StatelessWidget 和 StatefulWidget 帮助构建应用的结构，但真正将 UI 代码转化为实际像素的是 RenderObjectWidget。

You’ll learn how Flutter builds the Widget, Element, and RenderObject
trees, why many common widgets don’t directly render anything, and how
RenderObjectWidgets create and update RenderObjects that power your
UI.

你将了解 Flutter 如何构建 widget 树、Element 树和渲染树，为什么许多常见的 widget 并不直接渲染任何内容，以及 RenderObjectWidget 如何创建和更新驱动 UI 的 RenderObject。

## The RenderObject

## RenderObject

<YouTubeEmbed id="EuG12bebwac" title="The RenderObject" fullWidth />

<br> In Episode 5 of "How Flutter Works," Craig walks through a full
day in the life of a RenderObject. Building on the concepts from
Episode 4, this video explains the core responsibilities of
RenderObjects: layout, painting, hit testing, and accessibility. Craig
demystifies how constraints flow down the render tree, how sizes come
back up, and how parent RenderObjects set their children's positions.
He also breaks down key methods like layout, paint, and
describeSemanticsConfiguration, showing how they fit together to keep
your UI responsive and accurate.

在"Flutter 的工作原理"第 5 集中，Craig 带你走过一个 RenderObject 的完整生命历程。在第 4 集概念的基础上，本视频讲解了 RenderObject 的核心职责：布局、绘制、命中测试和无障碍。Craig 揭开了约束如何沿渲染树向下传递、尺寸如何向上回传，以及父 RenderObject 如何设置子节点位置的神秘面纱。他还拆解了 layout、paint 和 describeSemanticsConfiguration 等关键方法，展示了它们如何协同工作以保持 UI 的响应性和准确性。


## The Flutter Engine and Embedders

## Flutter 引擎与嵌入器

<YouTubeEmbed id="Y2aBMjWVv2Y" title="The Flutter Engine and Embedders" fullWidth />

<br> In Episode 6 of "How Flutter Works," Craig takes us beneath the
Dart code to explore the Flutter engine and embedders. This episode
explains how Flutter mobile apps rely on native Android and iOS code
to launch and operate, how the Flutter engine connects your Dart code
to the host platform, and how embedders facilitate communication
between the two. Craig also highlights the structure of a newly
generated Flutter project, dives into how threads are managed in a
Flutter app, and explains the roles of PlatformChannels and the Pigeon
package.

在"Flutter 的工作原理"第 6 集中，Craig 带我们深入 Dart 代码之下，探索 Flutter 引擎和嵌入器。本集讲解了 Flutter 移动应用如何依赖原生 Android 和 iOS 代码来启动和运行，Flutter 引擎如何将你的 Dart 代码连接到宿主平台，以及嵌入器如何促进两者之间的通信。Craig 还重点介绍了新生成的 Flutter 项目的结构，深入探讨了 Flutter 应用中的线程管理方式，并讲解了平台通道和 Pigeon 包的作用。

You’ll also learn why the Flutter engine is written in C++ rather than
Dart, how it evolved from a fork of Chrome, and how it uses Skia or
Impeller to render each frame. The episode wraps up by looking ahead
to Flutter’s future architecture improvements, which aim to simplify
native interop even further. If you want a clear mental model of how
Flutter apps work under the hood, this is the perfect way to connect
all the layers together.

你还将了解为什么 Flutter 引擎是用 C++ 而非 Dart 编写的，它如何从 Chrome 的一个分支演变而来，以及它如何使用 Skia 或 Impeller 来渲染每一帧。本集最后展望了 Flutter 未来的架构改进，这些改进旨在进一步简化原生互操作。如果你想对 Flutter 应用在底层的工作方式建立清晰的心智模型，这是将所有层次串联起来的完美方式。

</Stepper>
