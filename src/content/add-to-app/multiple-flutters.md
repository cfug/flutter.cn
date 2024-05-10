---
# title: Multiple Flutter screens or views
title: 多个 Flutter 页面或视图
# short-title: Add multiple Flutters
short-title: 添加多个 Flutter 引擎
# description: >
#   How to integrate multiple instances of 
#   Flutter engine, screens, or views to your application.
description: 如何将多个 Flutter 引擎 (engine)、页面 (screen) 或视图 (view) 添加到你的应用中（实验性）。
---

## Scenarios

## 使用场景

If you're integrating Flutter into an existing app,
or gradually migrating an existing app to use Flutter,
you might find yourself wanting to add multiple
Flutter instances to the same project.
In particular, this can be useful in the
following scenarios:

如果你正在将 Flutter 集成到现有应用，或者正在将原生应用逐渐迁移到使用 Flutter，
你可能会需要在一个工程中添加多个 Flutter 实例，特别是在下述场景下，
多 Flutter 实例可能更为有用：

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
RFC 文档: [Multiple Flutters]({{site.flutter-files-cn}}/flutter-design-docs/Multiple_Flutters.pdf)。

Flutter is optimized for this scenario, with a low incremental
memory cost (~180kB) for adding additional Flutter instances. This fixed cost
reduction allows the multiple Flutter instance pattern to be used more liberally
in your add-to-app integration.

Flutter 针对多 Flutter 实例进行了优化，
额外增加的 Flutter 实例只会增加约 180K 的内存占用，
这种「固定成本」的降低，可以帮助你更轻松的将 Flutter 加入到现有应用 (add-to-app)。

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

* When all `FlutterEngine`s from a `FlutterEngineGroup` are destroyed, the next
  `FlutterEngine` created has the same performance characteristics as the very
  first engine.

  当所有由 `FlutterEngineGroup` 构造的 `FlutterEngine` 都被销毁后，
  下一个创建的 `FlutterEngine` 与首个创造的性能特征相同。

* The `FlutterEngineGroup` itself doesn't need to live beyond all of the spawned
  engines. Destroying the `FlutterEngineGroup` doesn't affect existing spawned
  `FlutterEngine`s but does remove the ability to spawn additional
  `FlutterEngine`s that share resources with existing spawned engines.

  `FlutterEngineGroup` 本身不需要持续保活。
  将其销毁后，已生成的 `FlutterEngine` 不受影响，
  但无法继续在现有共享的基础上创建新引擎。

## Communication

## 实例之间相互通讯

Communication between Flutter instances is handled using [platform channels][]
(or [Pigeon][]) through the host platform. To see our roadmap on communication,
or other planned work on enhancing multiple Flutter instances, check out
[Issue 72009][].

多个 Flutter 实例之间相互通讯可以通过 [平台通道][platform channels] 或者 [Pigeon][] 进行。
可以在 [Issue 72009][] 里查阅我们关于多 Flutter 实例通讯和增强功能计划的路线图。

## Samples

## 示例

You can find a sample demonstrating how to use `FlutterEngineGroup`
on both Android and iOS on [GitHub][].

你可以在 [GitHub 仓库][GitHub] 上找到在 Android 和 iOS 上
使用 `FlutterEngineGroup` 的示例。

{% include docs/app-figure.md image="development/add-to-app/multiple-flutters-sample.gif" alt="A sample demonstrating multiple-Flutters" %}

[GitHub]: {{site.repo.samples}}/tree/main/add_to_app/multiple_flutters
[`FlutterActivity`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html
[`FlutterViewController`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html
[performance characteristics]: /add-to-app/performance
[flutter.dev/go/multiple-flutters]: /go/multiple-flutters
[Issue 72009]: {{site.repo.flutter}}/issues/72009
[Pigeon]: {{site.pub}}/packages/pigeon
[platform channels]: /platform-integration/platform-channels
[Android API]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/android/io/flutter/embedding/engine/FlutterEngineGroup.java
[iOS API]: https://cs.opensource.google/flutter/engine/+/master:shell/platform/darwin/ios/framework/Headers/FlutterEngineGroup.h
