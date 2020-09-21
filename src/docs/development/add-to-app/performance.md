---
title: Load sequence, performance, and memory
title: 控制加载顺序，优化性能与内存
description: What are the steps involved when showing a Flutter UI.
description: 介绍在显示一个 Flutter 界面时有哪些步骤。
tags: Flutter混合工程,add2app
keywords: 性能优化
---

This page describes the breakdown of the steps involved
to show a Flutter UI. Knowing this, you can make better, informed decisions
about when to pre-warm the Flutter engine, which operations are possible
at which stage, and the latency and memory costs of those operations.

本页面描述了展示一个 Flutter UI 的分解步骤。
知道了这一点，您可以就何时对 Flutter 引擎进行预热，
在哪个阶段可以进行哪些操作，
以及这些操作的潜在问题和内存成本做出更好、更明智的决策。

## Loading Flutter

## 加载 Flutter

Android and iOS apps (the two supported platforms for
integrating into existing apps), full Flutter apps,
and add-to-app patterns have a similar sequence of
conceptual loading steps when displaying the Flutter UI.

在展示 Flutter UI 时，
Android 与 iOS 应用（用于集成到现有应用的两个受支持的平台），
纯 Flutter 应用，以及 add-to-app 的模式，在概念上的加载步骤顺序相似。

### Finding the Flutter resources

### 查找 Flutter 资源

Flutter's engine runtime and your application's compiled
Dart code are both bundled as shared libraries on Android
and iOS. The first step of loading Flutter is to find those
resources in your .apk/.ipa/.app (along with other Flutter
assets such as images, fonts, and JIT code if applicable).

Flutter 的引擎运行时和应用已编译的 Dart 代码都被打包为 Android 和 iOS 上的共享库。
加载 Flutter 的第一步是在 .apk、.ipa 或 .app 中查找这些资源
（以及其他 Flutter 资源，例如图像和字体，假如适用的话还有 JIT 代码）。

This happens when you construct a `FlutterEngine` for the
first time on both **[Android][android-engine]**
and **[iOS][ios-engine]** APIs.

当您首次在 **[Android][android-engine]** 和 **[iOS][ios-engine]** 
上调用 API 构建 `FlutterEngine` 时，就会发生这种情况。

### Loading the Flutter library

### 加载 Flutter 库

After it's found, the engine's shared libraries are memory loaded
once per process.

找到后，引擎的共享库将在每个进程中加载一次内存。

On **Android**, this also happens when the
[`FlutterEngine`][android-engine] is constructed because the
JNI connectors need to reference the Flutter C++ library.
On **iOS**, this happens when the
[`FlutterEngine`][ios-engine] is first run,
such as by running [`runWithEntrypoint:`][].

在 **Android** 上，当构建 
[`FlutterEngine`][android-engine] 
时也会发生这种情况，因为 JNI 连接器需要引用 Flutter C++ 库。
在 **iOS** 上，这是在首次运行 
[`FlutterEngine`][ios-engine] 时发生的，
例如运行 [`runWithEntrypoint:`][]。

### Starting the Dart VM

### 启动 Dart VM

The Dart runtime is responsible for managing Dart memory and
concurrency for your Dart code. In JIT mode,
it's additionally responsible for compiling
the Dart source code into machine code during runtime.

Dart 运行时负责管理 Dart 代码的 Dart 内存与异步。
在 JIT 模式下，它还负责在运行时将 Dart 源代码编译为机器码。

A single Dart runtime exists per application session on
Android and iOS.

在 Android 和 iOS 上，每个应用程序会话都存在一个 Dart 运行时。

A one-time Dart VM start is done when constructing the
[`FlutterEngine`][android-engine] for the first time on
**Android** and when [running a Dart entrypoint][ios-engine]
for the first time on **iOS**.

在 **Android** 上首次构建 
[`FlutterEngine`][android-engine]，
以及在 **iOS** 上首次
[运行 Dart 入口][ios-engine]
时，将完成一次 Dart VM 启动。

At this point, your Dart code's [snapshot][]
is also loaded into memory from your application's files.

此时，您的 Dart 代码的 [snapshot][] 
也将从应用程序的文件加载到内存中。

This is a generic process that also occurs if you used the
[Dart SDK][] directly, without the Flutter engine.

即使您直接使用 [Dart SDK][]而没 Flutter 引擎，也会这样执行，这是一个通用的过程。

The Dart VM never shuts down after it's started.

Dart VM 启动后永远不会关闭。

### Creating and running a Dart Isolate

### 创建并运行一个 Dart Isolate

After the Dart runtime is initialized,
the Flutter engine's usage of the Dart
runtime is the next step.

在初始化 Dart 运行时之后，下一步就是 Flutter 引擎对 Dart 运行时的使用。

This is done by starting a [Dart `Isolate`][] in the Dart runtime.
The isolate is Dart's container for memory and threads.
A number of [auxiliary threads][] on the host platform are
also created at this point to support the isolate, such
as a thread for offloading GPU handling and another for image decoding.

这是通过在 Dart 运行时中启动 
[Dart `Isolate`][] 来完成的。
isolate 是 Dart 的内存和线程容器。 
此时在宿主平台上还创建了许多
[辅助线程][auxiliary threads] 来支持 isolate，
例如用于解除 GPU 处理的线程和用于图像解码的线程。

One isolate exists per `FlutterEngine` instance, and multiple isolates
can be hosted by the same Dart VM.

每个 `FlutterEngine` 实例都存在一个 isolate，并且同一个 Dart VM 可以承载多个 isolate。

On **Android**, this happens when you call
[`DartExecutor.executeDartEntrypoint()`][]
on a `FlutterEngine` instance.

在 **Android** 上，当您在 `FlutterEngine` 实例上调用 
[`DartExecutor.executeDartEntrypoint()`][] 时，就会发生这种情况。

On **iOS**, this happens when you call [`runWithEntrypoint:`][]
on a `FlutterEngine`.

在 **iOS** 上，当您对 `FlutterEngine` 实例调用 [`runWithEntrypoint:`][]时会发生这种情况。

At this point, your Dart code's selected entrypoint
(the `main()` function of your Dart library's `main.dart` file,
by default) is executed. If you called the
Flutter function [`runApp()`][] in your `main()` function,
then your Flutter app or your library's widget tree is also created
and built. If you need to prevent certain functionalities from executing
in your Flutter code, then the `AppLifecycleState.detached`
enum value indicates that the `FlutterEngine` isn't attached
to any UI components such as a `FlutterViewController`
on iOS or a `FlutterActivity` on Android.

此时，Dart 代码会执行默认的入口点方法 (默认是 `main.dart` 文件的 `main()` 方法) ，
如果你在 `main()` 方法中调用 Flutter 的 [`runApp()`][] 方法，则你的 Flutter 应用
或库的 widget 树将会创建并构建。如果你需要阻止某些功能在 Flutter 代码中执行，
则需要使用枚举值 `AppLifecycleState.detached` 表示其不绑定在任何 UI 组件上。

### Attaching a UI to the Flutter engine

### 将 UI 挂载到 Flutter 引擎

A standard, full Flutter app moves to reach this state as
soon as the app is launched.

启动后不久，一个标准的完整的 Flutter 应用程序便会达到此状态。

In an add-to-app scenario,
this happens when you attach a `FlutterEngine`
to a UI component such as by calling [`startActivity()`][])
with an [`Intent`][] built using [`FlutterActivity.withCachedEngine()`][]
on **Android**. Or, by presenting a [`FlutterViewController`][]
initialized by using [`initWithEngine: nibName: bundle:`][]
on **iOS**.

在 add-to-app 的场景中，
例如通过在 **Android** 上使用 [`FlutterActivity.withCachedEngine()`][] 
方法构建的 [`Intent`][]，
调用 [`startActivity()`][] 时，
或者，在 **iOS** 上调用 [`initWithEngine: nibName: bundle:`][]，
展示实例化的 [`FlutterViewController`][]，
都会将 `FlutterEngine` 挂载到 UI 组件。

This is also the case if a Flutter UI component was launched without
pre-warming a `FlutterEngine` such as with
[`FlutterActivity.createDefaultIntent()`][] on **Android**,
or with [`FlutterViewController initWithProject: nibName: bundle:`][]
on **iOS**. An implicit `FlutterEngine` is created in these cases.

如果在没有启动 Flutter UI 组件的情况下也是如此,
例如在 **Android** 上使用 [`FlutterActivity.createDefaultIntent()`][] 
或在 **iOS** 上使用 [`FlutterViewController initWithProject: nibName: bundle:`][] 
预热一个 `FlutterEngine`。
在这些情况下，将创建一个隐式的 `FlutterEngine`。

Behind the scene, both platform's UI components provide the
`FlutterEngine` with a rendering surface such as a
[`Surface`][] on **Android** or a [CAEAGLLayer][] or [CAMetalLayer][]
on **iOS**.

在后台，这两个平台的UI组件都为 `FlutterEngine` 提供了渲染层，
例如 **Android** 上的 [`Surface`][] 或 **iOS** 上的 [CAEAGLLayer][]
或 [CAMetalLayer][]。

At this point, the [`Layer`][] tree generated by your Flutter
program, per frame, is converted into
OpenGL (or Vulkan or Metal) GPU instructions.

此时，您的 Flutter 程序生成的 [`Layer`][]
树将转换为 OpenGL（或 Vulkan 或 Metal）GPU 指令。

## Memory and latency

## 内存和延迟

Showing a Flutter UI has a non-trivial latency cost.
This cost can be lessened by starting the Flutter engine
ahead of time.

显示 Flutter UI 会耗费不少时间。提前启动 Flutter 引擎可以降低时间开销。

The most relevant choice for add-to-app scenarios is for you
to decide when to pre-load a `FlutterEngine`
(that is, to load the Flutter library, start the Dart VM,
and run entrypoint in an isolate), and what the memory and latency
cost is of that pre-warm. You also need to know how the pre-warm 
affects the memory and latency cost of rendering a first Flutter
frame when the UI component is subsequently attached
to that `FlutterEngine`.

对于 add-to-app 的场景，预热相应的选择是，
让您决定什么时候预加载 `FlutterEngine`
（即加载 Flutter 库，启动 Dart VM 并在 isolate 中运行入口点），
以及确定内存的占用与时间开销。
您还需要知道，在将 UI 组件随后挂载到该 `FlutterEngine` 时，
预热会如何影响 Flutter 渲染首帧的内存和时间开销。

As of Flutter v1.10.3, and testing on a low-end 2015 class device
in release-AOT mode, pre-warming the `FlutterEngine` costs:

用 Flutter v1.10.3 版本，在 2015 年的低端设备上测试，release AOT 模式下，预热 `FlutterEngine` 的开销：

* 42 MB and 1530 ms to prewarm on **Android**.
  330 ms of it is a blocking call on the main thread.

  **Android** 平台需要 42 MB 内存，耗费 1530 毫秒。主线程阻塞了 330 毫秒；
  
* 22 MB and 860 ms to prewarm on **iOS**.
  260 ms of it is a blocking call on the main thread.


  **iOS** 平台需要 22 MB 内存，耗费 860 毫秒。主线程阻塞了 260 毫秒。

A Flutter UI can be attached during the pre-warm.
The remaining time is joined to the time-to-first-frame latency.

Flutter 用户界面可以在预热期间被加载。所需时间与渲染出首帧的时间有关。

Memory-wise, a cost sample (variable,
depending on the use case) could be:

在内存方面的开销（具体根据使用情况而定）可能是：

* ~4 MB OS's memory usage for creating pthreads.
  
  约 4 MB 系统内存用于创建 pthread；
  
* ~10 MB GPU driver memory.
  
  约 10 MB 是 GPU 驱动内存；
  
* ~1 MB for Dart runtime-managed memory.
  
  约 1 MB 是用于 Dart 运行时管理的内存；
  
* ~5 MB for Dart-loaded font maps.
  
  约 5 MB 用于 Dart 加载的字体映射。

Latency-wise,
a cost sample (variable, depending on the use case) could be:

在时间方面的开销（具体根据使用情况而定）可能是：

* ~20 ms to collect the Flutter assets from the application package.
  
  约 20 毫秒用于从应用包中收集 Flutter 资源；

* ~15 ms to dlopen the Flutter engine library.
  
  约 15 毫秒用于 dlopen 加载 Flutter 引擎的库；
  
* ~200 ms to create the Dart VM and load the AOT snapshot.
  
  约 200 毫秒用于创建 Dart VM 并加载 AOT snapshot；
  
* ~200 ms to load Flutter-dependent fonts and assets.
  
  约 200 毫秒用于加载 Flutter 依赖的字体和资源；
  
* ~400 ms to run the entrypoint, create the first widget tree,
  and compile the needed GPU shader programs.
  
  约 400 毫秒来运行应用入口，创建第一个 widget 树，并编译所需的 GPU 着色器程序。

The `FlutterEngine` should be pre-warmed late enough to delay the
memory consumption needed but early enough to avoid combining the
Flutter engine start-up time with the first frame latency of
showing Flutter.

应该对 `FlutterEngine` 进行预热，不应过于提早，以延迟内存占用，
但又要避免 Flutter 引擎初始化的时机与显示 Flutter 的首帧的时机赶在一起。

The exact timing depends on the app's structure and heuristics.
An example would be to load the Flutter engine in the screen
before the screen is drawn by Flutter.

确切的时间取决于应用的结构与不断试探的结果。
一个示例是在 Flutter 绘制屏幕之前将 Flutter 引擎加载到屏幕中。

Given an engine pre-warm, the first frame cost on UI attach is:

引擎预热后，加载 UI 首帧的成本为：

* 320 ms on **Android** and an additional 12 MB
  (highly dependent on the screen's physical pixel size).
  
  在 **Android** 上为 320 毫秒，另外需要 12 MB 的内存（在很大程度上取决于屏幕的物理像素大小）；
  
* 200 ms on **iOS** and an additional 16 MB
  (highly dependent on the screen's physical pixel size).

  在 **iOS** 上为 200 毫秒，另外需要 16 MB 的内存（在很大程度上取决于屏幕的物理像素大小）。

Memory-wise, the cost is primarily the graphical memory buffer used for
rendering and is dependent on the screen size.

在内存方面，开销主要用于渲染的图形内存缓冲区，并且取决于屏幕大小。

Latency-wise, the cost is primarily waiting for the OS callback to provide
Flutter with a rendering surface and compiling the remaining shader programs
that are not pre-emptively predictable. This is a one-time cost.

在时间方面，开销主要是在等待系统回调，为 Flutter 提供渲染层，
并编译其余无法预先预测的着色器程序。这是一次性的开销。

When the Flutter UI component is released, the UI-related memory is freed.
This doesn't affect the Flutter state, which lives in the `FlutterEngine`
(unless the `FlutterEngine` is also released).

释放 Flutter UI 组件后，将释放与 UI 相关的内存。
这不会影响 Flutter 状态（除非也释放了 `FlutterEngine`），状态位于 `FlutterEngine` 中。

[android-engine]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html
[auxiliary threads]: {{site.github}}/flutter/flutter/wiki/The-Engine-architecture#threading
[CAEAGLLayer]: https://developer.apple.com/documentation/quartzcore/caeagllayer
[CAMetalLayer]: https://developer.apple.com/documentation/quartzcore/cametallayer
[Dart `Isolate`]: {{site.dart.api}}/stable/dart-isolate/Isolate-class.htm
[Dart SDK]: {{site.dart-site}}/tools/sdk
[`DartExecutor.executeDartEntrypoint()`]: {{site.api}}/javadoc/io/flutter/embedding/engine/dart/DartExecutor.html#executeDartEntrypoint-io.flutter.embedding.engine.dart.DartExecutor.DartEntrypoint-
[`FlutterActivity.createDefaultIntent()`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html#createDefaultIntent-android.content.Context-
[`FlutterActivity.withCachedEngine()`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html#withCachedEngine-java.lang.String-
[`FlutterViewController`]: {{site.api}}/objcdoc/Classes/FlutterViewController.html
[`FlutterViewController initWithProject: nibName: bundle:`]: {{site.api}}/objcdoc/Classes/FlutterViewController.html#/c:objc(cs)FlutterViewController(im)initWithProject:nibName:bundle:
[`initWithEngine: nibName: bundle:`]: {{site.api}}/objcdoc/Classes/FlutterViewController.html#/c:objc(cs)FlutterViewController(im)initWithEngine:nibName:bundle:
[`Intent`]: https://developer.android.com/reference/android/content/Intent.html
[ios-engine]: {{site.api}}/objcdoc/Classes/FlutterEngine.html
[`Layer`]: {{site.api}}/flutter/rendering/Layer-class.html
[`runApp()`]: {{site.api}}/flutter/widgets/runApp.html
[`runWithEntrypoint:`]: {{site.api}}/objcdoc/Classes/FlutterEngine.html#/c:objc(cs)FlutterEngine(im)runWithEntrypoint:
[snapshot]: {{site.github}}/dart-lang/sdk/wiki/Snapshots
[`startActivity()`]: https://developer.android.com/reference/android/content/Context.html#startActivity(android.content.Intent
[`Surface`]: https://developer.android.com/reference/android/view/Surface
