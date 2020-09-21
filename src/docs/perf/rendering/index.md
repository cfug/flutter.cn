---
title: Improving rendering performance
title: 提高渲染性能
description: How to measure and evaluate your app's rendering performance.
description: 如何测量以及评估你的应用渲染性能。
tags: Flutter性能
keywords: 性能测量,建议,常见问题,性能调试
---

Rendering animations in your app is one of the most cited
topics of interest when it comes to measuring performance.
Thanks in part to Flutter's Skia engine and its ability
to quickly create and dispose of widgets,
Flutter applications are performant by default,
so you only need to avoid common pitfalls to achieve
excellent performance.

在衡量性能时，应用程序中的渲染动画一直是最受关注的话题之一。
由于 Flutter 自带的 Skia 引擎以及它能够快速创建和处理组件的能力，
Flutter 应用在默认情况下就能保证拥有良好的性能，
因此我们只需避开常见的陷阱就可以获得出色的性能。

## General advice

## 一些基本的建议

If you _are_ seeing janky (non smooth) animations, make
**sure** that you are profiling performance with an
app built in _profile_ mode.
The default Flutter build creates an app in _debug_ mode,
which is not indicative of release performance.
For information,
see [Flutter's build modes][].

如果看到不稳定（不流畅）的动画，
请 **确保** 你正在做性能分析的应用是在 **profile** 模式下构建的，
因为默认情况下 Flutter 会在 debug 模式下创建应用，这并不表示应用正式发布后的性能。
更多信息，参见 [Flutter 的构建模式][Flutter's build modes]。

A couple common pitfalls:

有几种常见的陷阱：

* Rebuilding far more of the UI than expected each frame.
  To track widget rebuilds, see [Show performance data][].
  
  每帧重建的 UI 比预期的要多得多。要跟踪组件的重建，
  请参阅 [显示性能数据][Show performance data]。
  
* Building a large list of children directly, rather than
  using a ListView.
  
  直接构建大量的子组件列表，而不使用 ListView。

For more information on evaluating performance
including information on common pitfalls,
see the following docs:

有关评估性能的更多资料（包括常见缺陷），请参阅以下文档：

* [Performance best practices][]

  [Flutter 应用性能优化最佳实践][Performance best practices]

* [Flutter performance profiling][]

  [Flutter 性能分析][Flutter performance profiling]

## Mobile-only advice

## 纯移动应用

Do you see noticeable jank on your mobile app, but only on
the first run of an animation? If so, see
[Reduce shader animation jank on mobile][].

如果移动应用里遇到一些肉眼可见的卡顿，单只是在第一次运行动画的时候？
如果是这样的话，可以查看这个文档
[减少过移动应用的着色器动画卡顿][Reduce shader animation jank on mobile]。

[Reduce shader animation jank on mobile]: /docs/perf/rendering/shader

## Web-only advice

## 纯 Web 应用

The following series of articles cover what the Flutter Material
team learned when improving performance of the Flutter Gallery
app on the web:

下面的内容是 Flutter Material 团队在提高
Flutter Gallery Web 应用性能时候总结的经验：

* [Optimizing performance in Flutter web apps with tree shaking and deferred loading][shaking]

  [通过 tree shaking 和延迟加载来优化 Flutter Web 应用的性能 (Optimizing performance in Flutter web apps with 
  tree shaking and deferred loading)][shaking]

* [Improving perceived performance with image placeholders, precaching, and disabled navigation transitions][images]

  [通过使用图像占位符、预缓存和禁用导航效果来提高性能(Improving perceived performance with image placeholders, precaching, and disabled navigation transitions)][images]
  
* [Building performant Flutter widgets][]

  [高效构建 Flutter widgets (Building performant Flutter widgets)][Building performant Flutter widgets]

[Building performant Flutter widgets]: {{site.medium}}/flutter/building-performant-flutter-widgets-3b2558aa08fa
[Flutter's build modes]: /docs/testing/build-modes
[Flutter performance profiling]: /docs/perf/rendering/ui-performance
[images]: {{site.medium}}/flutter/improving-perceived-performance-with-image-placeholders-precaching-and-disabled-navigation-6b3601087a2b
[Performance best practices]: /docs/perf/rendering/best-practices
[shaking]: {{site.medium}}/flutter/optimizing-performance-in-flutter-web-apps-with-tree-shaking-and-deferred-loading-535fbe3cd674
[Show performance data]: /docs/development/tools/android-studio#show-performance-data

