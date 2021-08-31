---
title: Multiple Flutter screens or views
title: 多个 Flutter 页面或视图
short-title: Adding multiple Flutters
short-title: 添加多个 Flutter 引擎
description: How to integrate multiple instances of Flutter engine, screens or views to your application.
description: 如何将多个 Flutter 引擎 (engine)、页面 (screen) 或视图 (view) 添加到你的应用中（实验性）。
---

## Experimental

## 实验性

{{site.alert.note}}

  Support for adding multiple instances of Flutter became available
  as of Flutter 2.0.0. Use at your own risk since stability or
  performance issues, and API changes are still possible.

  自 Flutter 2.0.0 开始，您可以同时添加多个 Flutter 实例。
  由于稳定性、性能问题以及 API 仍然可能变动，请您谨慎使用。

{{site.alert.end}}

The current memory footprint for each additional Flutter instance beyond the
first instance is ~180kB on Android and iOS.

目前在 Android 和 iOS 上，除了第一个 Flutter 实例以外，
其他每一个实例的内存占用量大约为 180kB。

As of the 2.0.0 release, communication between Flutter instances is handled using
[platform channels][] (or [Pigeon][]) through the host platform. To see
our roadmap on communication, or other multiple-Flutters issues, see [Issue 72009][].

随着 Flutter 2.0.0 正式版的发布，Flutter 实例之间将通过宿主平台的
[平台通道][platform channels]（或 [Pigeon][]）进行处理。
若您对我们平台通信的里程碑感兴趣，或是有其他多个 Flutter 实例的问题，请查看 [Issue 72009][]。

{{site.alert.warning}}

  In 2.0.0, the use of [platform views][] is not supported in conjunction with
  multiple Flutters. When a second Flutter instance is created, platform views
  will be globally disabled.

  在 2.0.0 版本中，[平台视图][platform views] 不支持与多个 Flutter 实例一同使用。
  当第二个 Flutter 实例被创建时，平台视图将被全局禁用。

{{site.alert.end}}

{{site.alert.warning}}

  In 2.0.0, the memory usage is only fully optimized in AOT mode (in profile
  and release builds). Some memory redundancy will still be present in JIT mode
  (in debug builds) and will be addressed in a future release.

  在 2.0.0 版本里，系统内存的占用只在 AOT 模式 (Profile 和 Release 模式) 下做了完全优化，
  在 JIT 模式 (debug 模式) 下仍会存在一些内存冗余，这个将在未来的版本中解决。

{{site.alert.end}}

## Scenarios

## 使用场景

Before Flutter 2.0.0, multiple instances of `FlutterEngine` and its associated
UI could be launched, but each instance came with significant latency
and fixed memory cost.

在 Flutter 2.0.0 发布之前，`FlutterEngine` 的多个实例和相关的 UI 可以同时启动，
但是每个实例都有明显的延迟和固定的内存占用。

Multiple Flutter instances can be useful in the following scenarios:

多个 Flutter 实例在以下场景有优势：

* An application where the integrated Flutter screen is not a leaf node of
  the navigation graph, and the navigation stack might be a hybrid mixture of
  native -> Flutter -> native -> Flutter.

  集成了 Flutter 界面的应用，其位置并不在路由栈的叶子节点上，
  且其可能是混合路由栈，即 native -> Flutter -> native -> Flutter。

* A screen where multiple partial screen Flutter views might be integrated
  and visible at once.

  多个 Flutter view 同时集成在同一个页面上，且同时显示。

The advantage of using multiple Flutter instances is that each
instance is independent and maintains its own internal navigation
stack, UI, and application states. This simplifies the overall application code's
responsibility for state keeping and improves modularity. More details on the
scenarios motivating the usage of multiple Flutters can be found at
[flutter.dev/go/multiple-flutters][].

使用多个 Flutter 实例的优势在于，每一个实例互相独立，各自维护路由栈、UI 和应用状态。
这简化了应用程序整体的状态保持考虑，并且进一步模块化。
了解更多关于多个 Flutter 使用的动机和场景，请查看
[flutter.cn/go/multiple-flutters](https://files.flutter-io.cn/sources/flutter-design-docs/Multiple_Flutters.pdf)。

The 2.0.0 Flutter release drastically reduces the memory footprint of additional
Flutter engines from **~19MB** on Android and **~13MB** on iOS, to **~180kB** on Android and
iOS. This ~99% fixed cost reduction allows the multiple Flutters pattern to be
used more liberally in your add-to-app integration.

Flutter 2.0.0 大幅减少了额外的 Flutter 引擎的内存占用，
从 Android 上 **约 19MB**，iOS 上 **约 13MB**，降至 **约 180kB**。
将固定成本减少了约 99% 后，您可以更自由地将多个 Flutter 集成至您的应用。

## Components

## 组件

The primary API for adding multiple Flutter instances on both Android and iOS
is based on a new `FlutterEngineGroup` class ([Android API][], [iOS API][])
to construct `FlutterEngine`s, rather than the `FlutterEngine`
constructors used previously.

在 Android 和 iOS 上添加多个 Flutter 实例的主要 API
是基于新的 `FlutterEngineGroup` 类 ([Android API][], [iOS API][])
来创建 `FlutterEngine` 的，而不是通过以前的 `FlutterEngine` 构造。

Whereas the `FlutterEngine` API was direct and easier to consume, the
`FlutterEngine` spawned from the same `FlutterEngineGroup` have the performance
advantage of sharing many of the common, reusable resources such as the GPU
context, font metrics, and isolate group snapshot, leading to a faster initial
rendering latency and lower memory footprint.

尽管 `FlutterEngine` API 的用法简洁明了，
但从 `FlutterEngineGroup` 生成的 `FlutterEngine` 具有常用共享资源
（例如 GPU 上下文、字体度量和隔离线程的快照）的性能优势，
从而加快首次渲染的速度、降低延迟并降低内存占用。

* `FlutterEngine`s spawned from `FlutterEngineGroup` can be used to
   connect to UI classes like [`FlutterActivity`][] or [`FlutterViewController`][]
   in the same way as normally constructed cached `FlutterEngine`s.

  由 `FlutterEngineGroup` 生成的 `FlutterEngine` 可以用来关联 UI 相关的类，
  例如 [`FlutterActivity`][] 或 [`FlutterViewController`][]，
  与通常构造缓存的 `FlutterEngine` 类似。

* The first `FlutterEngine` spawned from the `FlutterEngineGroup` doesn't need
  to continue surviving in order for subsequent `FlutterEngine`s to share
  resources as long as there's at least 1 living `FlutterEngine` at all
  times.

  第一个 `FlutterEngineGroup` 生成的 `FlutterEngine` 不需要持续保活，
  只要有 1 个可用的 `FlutterEngine`，就可以随时在各个 `FlutterEngine` 之间共享资源。

* Creating the very first `FlutterEngine` from a `FlutterEngineGroup` has
  the same [performance characteristics][] as constructing a
  `FlutterEngine` using the constructors did previously.

  通过 `FlutterEngineGroup` 生成的首个 `FlutterEngine` 与使用先前的构造方法构造的
  `FlutterEngine` 有相同的[性能特征][performance characteristics]。

* When all `FlutterEngine`s from a `FlutterEngineGroup` are destroyed,
the next `FlutterEngine` created has the same performance
characteristics as the very first engine.

  当所有由 `FlutterEngineGroup` 构造的 `FlutterEngine` 都被销毁后，
  下一个创建的 `FlutterEngine` 与首个创造的性能特征相同。

* The `FlutterEngineGroup` itself doesn't need to live beyond all of the spawned
engines. Destroying the `FlutterEngineGroup` doesn't affect existing spawned
`FlutterEngine`s but does remove the ability to spawn additional
`FlutterEngine`s that share resources with existing spawned engines.

  `FlutterEngineGroup` 本身不需要持续保活。
  将其销毁后，已生成的 `FlutterEngine` 不受影响，
  但无法继续在现有共享的基础上创建新引擎。

## Samples

## 示例

You can find a sample demonstrating how to use `FlutterEngineGroup`
on both Android and iOS on [GitHub][].

您可以在 [GitHub 仓库][GitHub] 上找到在 Android 和 iOS 上
使用 `FlutterEngineGroup` 的示例。

{% include docs/app-figure.md image="development/add-to-app/multiple-flutters-sample.gif" alt="A sample demonstrating multiple-Flutters" %}

[GitHub]: {{site.github}}/flutter/samples/tree/master/add_to_app/multiple_flutters
[`FlutterActivity`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html
[`FlutterViewController`]: {{site.api}}/objcdoc/Classes/FlutterViewController.html
[performance characteristics]: /docs/development/add-to-app/performance
[flutter.dev/go/multiple-flutters]: /go/multiple-flutters
[Issue 72009]: {{site.github}}/flutter/flutter/issues/72009
[Pigeon]: {{site.pub}}/packages/pigeon
[platform channels]: /docs/development/platform-integration/platform-channels
[platform views]: /docs/development/platform-integration/platform-views
[Android API]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/android/io/flutter/embedding/engine/FlutterEngineGroup.java
[iOS API]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/darwin/ios/framework/Headers/FlutterEngineGroup.h
