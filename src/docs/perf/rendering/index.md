---
title: Improving rendering performance
title: 提高渲染性能
description: How to measure and evaluate your app's rendering performance.
description: 如何测量以及评估你的应用渲染性能。
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

If you _are_ seeing janky (non smooth) animations, make
**sure** that you are profiling performance with an
app built in _profile_ mode.
The default Flutter build creates an app in _debug_ mode,
which is not indicative of release performance.
For information,
see [Flutter's build modes][].

如果看到不稳定（不流畅）的动画，
请**确保**你正在做性能分析的应用是在 _profile_ 模式下构建的，
因为默认情况下 Flutter 会在 debug 模式下创建应用，这并不表示应用正式发布后的性能。
更多信息，参见 [Flutter 的构建模式]()。

A couple common pitfalls:

有几种常见的陷阱：

* Rebuilding far more of the UI than expected each frame.
  To track widget rebuilds, see [Show performance data][].
  
  每帧重建的 UI 比预期的要多得多。要跟踪组件的重建，请参阅[显示性能数据]()。
  
* Building a large list of children directly, rather than
  using a ListView.
  
  直接构建大量的子组件列表，而不使用 ListView。

For more information on evaluating performance
including information on common pitfalls,
see the following docs:

有关评估性能的更多资料（包括常见缺陷），请参阅以下文档：

* [Performance best practices][]

  [Flutter 应用性能优化最佳实践]()

* [Flutter performance profiling][]

  [Flutter 性能分析]()

[Flutter's build modes]: /docs/testing/build-modes
[Flutter performance profiling]: /docs/perf/rendering/ui-performance
[Performance best practices]: /docs/perf/rendering/best-practices
[Show performance data]: /docs/development/tools/android-studio#show-performance-data

