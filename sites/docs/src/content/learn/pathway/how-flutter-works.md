---
# title: How Flutter works
title: Flutter 工作原理
# description: >-
#   Dive deeper into how Flutter works through a six-part video series.
description: >-
  通过六集视频系列深入了解 Flutter 的工作原理。
layout: tutorial
ai-translated: true
---

<Stepper level="2">

## Flutter's architecture {:#architecture}

## Flutter 架构 {:#architecture}


<div class="video-wrapper">
  <YouTubeEmbed id="0Xn1QhNtPkQ" title="How Flutter Works" fullWidth />
</div>

Welcome to the first episode of "How Flutter Works,"
a six-part series designed to explore what happens to
your Dart code after you hand it off to the Flutter framework.
This episode takes a high-level look at Flutter's architecture,
covering declarative code, multi-platform frameworks, and
the role of Dart.
This video is perfect for anyone beginning to
research Flutter who wants to understand the big picture.

欢迎观看「Flutter 工作原理」第一集，
本系列共六集，旨在探索你将 Dart 代码交给 Flutter 框架之后会发生什么。
本集从宏观角度介绍 Flutter 架构，
涵盖声明式代码、多平台框架以及 Dart 的作用。
本视频非常适合刚开始了解 Flutter、希望把握整体图景的任何人。

## Widgets and the three trees {:#three-trees}

## widget 与三棵树 {:#three-trees}

<div class="video-wrapper">
  <YouTubeEmbed id="xiW3ahr4CRU" title="The three trees" fullWidth />
</div>

Dive into Flutter's architecture by exploring its
three primary trees: `Widget`, `Element`, and `RenderObject`.
Discover how widgets provide the declarative API for Flutter developers and
see how elements glue widgets to the rendering layer.
You'll also learn about the role of render objects in
translating widget values into painting calls.

通过探索 Flutter 的三棵主要树——`Widget`、`Element` 和 `RenderObject`——深入了解其架构。
了解 widget 如何为 Flutter 开发者提供声明式 API，
以及 element 如何将 widget 与渲染层连接起来。
你还将了解 render object 在将 widget 值转换为绘制调用方面的作用。

## State objects and their lifecycle {:#state}

## State 对象及其生命周期 {:#state}

<div class="video-wrapper">
  <YouTubeEmbed id="FP737UMx7ss" title="The state class" fullWidth />
</div>

Episode 3 of "How Flutter Works" dives deep into the `State` class,
a critical piece behind every `StatefulWidget`.
Follow the full lifecycle of a `State` object—from `initState`,
where you initialize resources, to `dispose`, where you clean up.
Along the way, explore important methods including `didChangeDependencies`,
`didUpdateWidget`, and the all-important `build` method.
By the end of the episode, you'll understand how `State` objects
track, respond to, and manage changes in your Flutter apps—and
how the `State` lifecycle enables efficient UI updates.

「Flutter 工作原理」第三集深入讲解 `State` 类，
它是每个 `StatefulWidget` 背后的关键组成部分。
跟随 `State` 对象的完整生命周期——从用于初始化资源的 `initState`，
到用于清理资源的 `dispose`。
途中还将探索重要方法，包括 `didChangeDependencies`、`didUpdateWidget` 以及至关重要的 `build` 方法。
本集结束时，你将理解 `State` 对象如何跟踪、响应并管理 Flutter 应用中的变化，
以及 `State` 生命周期如何实现高效的 UI 更新。

This episode also peels back the curtain on how Flutter
recurses down the widget tree after a `setState` call,
building out only the parts of your app that need to change.
You'll learn why `const` constructors matter for performance,
why `setState` closures must be synchronous, and how
elements (not widgets themselves) manage the actual rebuild process.
If you're curious how Flutter keeps apps fast and responsive, or
you just want to really understand what happens behind the scenes,
this episode is packed with the essential foundations.

本集还会揭示 Flutter 在调用 `setState` 后如何沿 widget 树向下递归，
仅构建应用中需要变更的部分。
你将了解为何 `const` 构造函数对性能很重要、
为何 `setState` 闭包必须同步，
以及 element（而非 widget 本身）如何管理实际的重建过程。
如果你好奇 Flutter 如何保持应用快速且响应灵敏，
或者你只想真正理解幕后发生了什么，
本集汇集了这些必备基础。

## The widgets that actually render {:#render-object-widgets}

## 真正负责渲染的 widget {:#render-object-widgets}

<div class="video-wrapper">
  <YouTubeEmbed id="zcJlHVVM84I" title="The RenderObjectWidget" fullWidth />
</div>

Ever wonder how your Flutter app actually renders to the screen?
This video dives into `RenderObjectWidget`—the only type of
widget in Flutter that creates something visual.
While stateless and stateful widgets help structure your app,
it's render object widgets that turn your UI code into real pixels.

你是否想过 Flutter 应用究竟是如何渲染到屏幕上的？
本视频深入讲解 `RenderObjectWidget`——Flutter 中唯一会创建可视内容的 widget 类型。
Stateless widget 和 Stateful widget 帮助组织应用结构，
而 render object widget 才将你的 UI 代码变成真正的像素。

You'll learn how Flutter builds the
`Widget`, `Element`, and `RenderObject` trees,
why many common widgets don't directly render anything, and
how Flutter uses `RenderObjectWidget` to create and
update render objects that power your UI.

你将了解 Flutter 如何构建 `Widget`、`Element` 和 `RenderObject` 三棵树，
为何许多常见 widget 并不直接渲染任何内容，
以及 Flutter 如何使用 `RenderObjectWidget` 创建并更新驱动 UI 的 render object。

## A day in the life of a render object {:#render-objects}

## Render object 的一天 {:#render-objects}

<div class="video-wrapper">
  <YouTubeEmbed id="EuG12bebwac" title="A day in the life of a RenderObject" fullWidth />
</div>

In Episode 5 of "How Flutter Works," Craig walks through
a full day in the life of a `RenderObject`.
Building on the concepts from Episode 4,
this video explains the core responsibilities of render objects:
layout, painting, hit testing, and accessibility. Craig demystifies how
constraints flow down the render tree, how sizes come back up, and
how parent render objects set their children's positions.
He also breaks down key methods like
`layout`, `paint`, and `describeSemanticsConfiguration`,
showing how they fit together to keep your UI responsive and accurate.

在「Flutter 工作原理」第五集中，Craig 带你了解 `RenderObject` 完整一天的工作流程。
在第四集概念的基础上，
本视频讲解 render object 的核心职责：
布局、绘制、命中测试和无障碍。
Craig 阐明了约束如何沿渲染树向下传递、尺寸如何向上回传，
以及父级 render object 如何设置子级的位置。
他还拆解了 `layout`、`paint` 和 `describeSemanticsConfiguration` 等关键方法，
说明它们如何协同工作，使你的 UI 保持响应灵敏且准确。

## The Flutter engine and embedders {:#engine}

## Flutter 引擎与 embedder {:#engine}

<div class="video-wrapper">
  <YouTubeEmbed id="Y2aBMjWVv2Y" title="The Flutter Engine and Embedders" fullWidth />
</div>

In Episode 6 of "How Flutter Works," Craig takes us
beneath the Dart code to explore the Flutter engine and embedders.
This episode explains how Flutter mobile apps rely on
native Android and iOS code to launch and operate,
how the Flutter engine connects your Dart code to the host platform, and
how embedders facilitate communication between the two.
Craig also highlights the structure of a newly generated Flutter project,
dives into how threads are managed in a Flutter app, and
explains the roles of platform channels and the [Pigeon][] package.

在「Flutter 工作原理」第六集中，Craig 带我们深入 Dart 代码之下，
探索 Flutter 引擎与 embedder。
本集说明 Flutter 移动应用如何依赖原生 Android 与 iOS 代码来启动和运行，
Flutter 引擎如何将你的 Dart 代码连接到宿主平台，
以及 embedder 如何促进两者之间的通信。
Craig 还介绍了新生成 Flutter 项目的结构，
深入讲解 Flutter 应用中的线程管理方式，
并说明 platform channel 与 [Pigeon][] package 的作用。

You'll also learn why the Flutter engine is
written in C++ rather than Dart,
how it evolved from a fork of Chrome, and
how it uses Skia or Impeller to render each frame.
The episode wraps up by looking ahead to
Flutter's future architecture improvements,
which aim to simplify native interop even further.
If you want a clear mental model of how Flutter apps work under the hood,
this is the perfect way to connect all the layers together.

你还将了解 Flutter 引擎为何用 C++ 而非 Dart 编写，
它如何从 Chrome 分支演化而来，
以及如何使用 Skia 或 Impeller 渲染每一帧。
本集最后展望 Flutter 未来的架构改进，
这些改进旨在进一步简化原生互操作。
如果你想建立清晰的思维模型来理解 Flutter 应用在底层的运作方式，
这是将所有层次串联起来的绝佳方式。

[Pigeon]: {{site.pub-pkg}}/pigeon

</Stepper>
