---
# title: Flutter performance profiling
title: Flutter 性能分析
# subtitle: Where to look when your Flutter app drops frames in the UI.
subtitle: 找出你的 Flutter 应用 UI 在哪里掉帧了
# description: Diagnosing UI performance issues in Flutter.
description: 诊断 Flutter 里的 UI 性能问题。
tags: Flutter性能
keywords: 性能分析,性能调试工具,开发者工具,60fps,120fps,profile mode
---

## Overview

## 概览

App performance encompasses various aspects, from raw speed and I/O throughput
to the smoothness of the user interface. While this page primarily focuses on UI
smoothness (lack of stutter or jank), the tools described here can often be used
to diagnose other performance issues as well.

应用性能包括多个方面，
从原生速度、I/O 吞吐量到用户界面的流畅性。
虽然本篇主要关注用户界面的流畅性（无卡顿或抖动），
但本篇介绍的工具通常也可用于诊断其他性能的问题。

Flutter offers several tools for performance analysis. Here are a few of them:

Flutter 提供多种性能分析工具。
以下是其中几种：

* **The Performance Overlay**: Displays a simplified set of metrics directly
  within your running app. To learn more, see the sections in this topic.

* **The Performance View**: A web-based interface that connects to your app and
  displays detailed performance metrics. Part of the DevTools utility. To learn
  more, see [Use the Performance View][].

* **Performance tracing within Dart**: Add tracing directly into your app's
  Dart code, using the `dart:developer package`, and then track your app's
  performance in the DevTools utility. To learn more, see [Tracing Dart code][].

* **Benchmarking**: You can measure and track your app's performance by writing
  benchmark tests. The Flutter Driver library provides support
  for benchmarking. Using this integration test framework,
  you can generate metrics that track jank, download size, battery efficiency,
  and startup time. For more information, check out [Integration testing][].

* **Widget rebuild profiler (IntelliJ for Android Studio)**: Jank often arises
  from unnecessary UI rebuilds. If you are using IntelliJ for Android Studio,
  the Widget Rebuild Profiler helps pinpoint and fix these issues by showing
  widget rebuild counts for the current screen and frame. For more information,
  see [Show performance data][].

Flutter aims to provide 60 frames per second (fps) performance,
or 120 fps on devices that support it. To achieve the 60fps, each frame must
render approximately every 16ms to avoid jank. Jank occurs when frames take
significantly longer to render and are dropped, resulting in a visible stutter
in animations. For example, if a frame occasionally takes 10 times longer than
usual to render, it will likely be dropped, causing the animation to appear
jerky.

Flutter 的目标是提供 60 帧每秒 (fps) 的性能，
或者是在可以达到 120 Hz 的设备上提供 120 fps 的性能。
对于 60 fps 来说，为了避免卡顿（抖动），需要在约每 16 ms 的时候渲染一帧。
当帧的呈现时间明显延长并被丢弃时，卡顿就随之产生了，动画会出现明显的停顿。
举例来说，如果一帧花了 10 倍的时间来渲染，这帧就可能会被丢弃，动画看起来就会卡顿。

[Use the Performance View]: /tools/devtools/performance
[Tracing Dart code]: /testing/code-debugging#trace-dart-code-performance
[Show performance data]: /tools/android-studio#show-performance-data
[Integration testing]: /testing/integration-tests

## Connect to a physical device

## 连接到真机设备

Almost all performance debugging for Flutter applications
should be conducted on a physical Android or iOS device,
with your Flutter application running in [profile mode][].
Using debug mode, or running apps on simulators
or emulators, is generally not indicative of the final
behavior of release mode builds.
_You should consider checking performance
on the slowest device that your users might reasonably use._

几乎全部的 Flutter 应用性能调试都应该在真实的 Android 或者
iOS 设备上以 [分析模式][profile mode] 进行。
通常来说，调试模式或者是模拟器上运行的应用的性能指标和发布模式的表现并不相同。
**应该考虑在用户使用的最慢的设备上检查性能。**

:::secondary 为什么应该在真机上运行
<!-- Why you should run on a real device -->

* Simulators and emulators don't use the same hardware, so their
  performance characteristics are different&mdash;some operations are
  faster on simulators than real devices, and some are slower.

  各种模拟器使用的硬件并不相同，因此性能也不同&mdash;模拟器上的
  一些操作会比真机快，而另一些操作则会比真机慢。

* Debug mode enables additional checks (such as asserts) that don't run
  in profile or release builds, and these checks can be expensive.
  
  调试模式相比分析模式或者发布编译来说，
  增加了额外的检查（例如断言），这些检查可能相当耗费资源。
  
* Debug mode also executes code in a different way than release mode.
  The debug build compiles the Dart code "just in time" (JIT) as the
  app runs, but profile and release builds are pre-compiled to native
  instructions (also called "ahead of time", or AOT) before the app is
  loaded onto the device. JIT can cause the app to pause for JIT
  compilation, which itself can cause jank.
  
  调试模式和发布模式代码执行的方式也是不同的。
  调试编译采用的是“just in time” (JIT) 模式运行应用，
  而分析和发布模式则是预编译到本地指令（“ahead of time”，或者叫 AOT）
  之后再加载到设备中。JIT本身的编译就可能导致应用暂停，从而导致卡顿。

:::

## Run in profile mode

## 在 Profile 分析模式运行

Flutter's profile mode compiles and launches your application
almost identically to release mode, but with just enough additional
functionality to allow debugging performance problems.
For example, profile mode provides tracing information to the
profiling tools.

除了一些调试性能问题所必须的额外方法，
Flutter 的分析模式和发布模式的编译和运行基本相同。
例如，分析模式为分析工具提供了追踪信息。

:::note

Dart/Flutter DevTools can't connect to a
Flutter web app running in profile mode.
Use Chrome DevTools to
[generate timeline events][] for a web app.

Dart/Flutter DevTools 无法连接到以性能模式运行的 Flutter 应用。
你需要使用 Chrome 的 DevTools 来为 Flutter Web 应用
[生成时间线事件][generate timeline events]。

:::

Launch the app in profile mode as follows:

使用分析模式运行应用的方法：

* In VS Code, open your `launch.json` file, and set the
  `flutterMode` property to `profile`
  (when done profiling, change it back to `release` or `debug`):

  在 VS Code 中，打开 `launch.json` 文件，
  设置 `flutterMode` 属性为 `profile`（当分析完成后，改回 `release` 或者 `debug`）：

  ```json
  "configurations": [
    {
      "name": "Flutter",
      "request": "launch",
      "type": "dart",
      "flutterMode": "profile"
    }
  ]
  ```
* In Android Studio and IntelliJ, use the
  **Run > Flutter Run main.dart in Profile Mode** menu item.

  在 Android Studio 和 IntelliJ 使用
  **Run > Flutter Run main.dart in Profile Mode** 选项。

* From the command line, use the `--profile` flag:

  命令行使用 `--profile` 参数运行：

  ```console
  $ flutter run --profile
  ```

For more information on the different modes,
see [Flutter's build modes][].

关于不同模式的更多信息，请参考文档：
[Flutter 的构建模式选择][Flutter's build modes]。

You'll begin by opening DevTools and viewing
the performance overlay, as discussed in the next section.

下面我们会从打开 DevTools、查看性能图层开始讲述。

[Flutter's build modes]: /testing/build-modes
[generate timeline events]: {{site.developers}}/web/tools/chrome-devtools/evaluate-performance/performance-reference

## Launch DevTools

## 运行 DevTools

DevTools provides features like profiling, examining the heap,
displaying code coverage, enabling the performance overlay,
and a step-by-step debugger.
DevTools' [Timeline view][] allows you to investigate the
UI performance of your application on a frame-by-frame basis.

DevTool 提供诸如性能分析、堆测试以及显示代码覆盖率等功能。
DevTool 的 [Timeline view][] 界面可以让开发者逐帧分析应用的 UI 性能。

Once your app is running in profile mode,
[launch DevTools][].

一旦你的应用程序在 Profile 模式下运行，
即 [运行 DevTools][launch DevTools]。

[Timeline view]: /tools/devtools/performance
[launch DevTools]: /tools/devtools

## Display the performance overlay {:#displaying-the-performance-overlay}

You can toggle the display of the performance overlay as
follows:

* **DevTools Performance view**: The easiest way to enable the
  PerformanceOverlay widget is from the [Performance view][] in [DevTools][].
  Simply click the **Performance Overlay** button to toggle the overlay on your
  running app.

* **command line**: Toggle the performance overlay using the **P** key from
  the command line.

* **programmatically**: To enable the overlay programmatically, see
  [Performance overlay][], a section in the
  [Debugging Flutter apps programmatically][] page.

[Performance overlay]: /testing/code-debugging#add-performance-overlay
[Debugging Flutter apps programmatically]: /testing/code-debugging

<a id="the-performance-overlay" aria-hidden="true"></a>

## Observe the performance overlay {:#performance-overlay}

## 观察性能图层

The performance overlay displays statistics in two graphs
that show where time is being spent in your app. If the UI
is janky (skipping frames), these graphs help you figure out why.
The graphs display on top of your running app, but they aren't
drawn like a normal widget&mdash;the Flutter engine itself
paints the overlay and only minimally impacts performance.
Each graph represents the last 300 frames for that thread.

性能图层用两张图表显示应用的耗时信息。如果 UI 产生了卡顿（跳帧），
这些图表可以帮助分析原因。图表在当前应用的最上层展示，
但并不是用普通的 widget 方式绘制的&mdash;Flutter 
引擎自身绘制了该图层来尽可能减少对性能的影响。
每一张图表都代表当前线程的最近 300 帧表现。

This section describes how to enable the performance overlay
and use it to diagnose the cause of jank in your application.
The following screenshot shows the performance overlay running
on the Flutter Gallery example:

本节阐述如何打开性能图层并用其来分析应用中卡顿的原因。
下面的截图展示了 Flutter Gallery 样例的性能图层：

![Screenshot of overlay showing zero jank](/assets/images/docs/tools/devtools/performance-overlay-green.png)

<br>Performance overlay showing the raster thread (top),
and UI thread (bottom).<br>The vertical green bars
represent the current frame.

<br>显示 Raster 线程（顶部）和 UI 线程（底部）的性能叠加图。
<br>垂直的绿色条条代表的是当前帧。

### Review the graphs {:#interpreting-the-graphs}

### 审查图表

The top graph (marked "GPU") shows the time spent by 
the raster thread, the bottom one graph shows the time 
spent by the UI thread.
The white lines across the graphs show 16ms increments
along the vertical axis; if the graph ever goes over one
of these lines then you are running at less than 60Hz.
The horizontal axis represents frames. The graph is
only updated when your application paints,
so if it's idle the graph stops moving.

最顶部（标志了 “GPU”）的图形表示 raster 线程所花费的时间，
底部的图表显示了 UI 线程所花费的时间。
横跨图表中的白线代表了 16 ms 内沿竖轴的增量；
如果这些线在图表中都没有超过它的话，
说明你的运行帧率低于 60 Hz。而横轴则表示帧。
只有当你的应用绘制时这个图表才会更新，所以如果它空闲的话，图表就不会动。

The overlay should always be viewed in [profile mode][],
since [debug mode][] performance is intentionally sacrificed
in exchange for expensive asserts that are intended to aid
development, and thus the results are misleading.

这个浮层只应在 [分析模式][profile mode] 中使用，因为在 
[调试模式][debug mode] 下有意牺牲了性能来换取昂贵的断言以帮助开发，
所以这时候的结果会有误导性。

Each frame should be created and displayed within 1/60th of
a second (approximately 16ms). A frame exceeding this limit
(in either graph) fails to display, resulting in jank,
and a vertical red bar appears in one or both of the graphs.
If a red bar appears in the UI graph, the Dart code is too
expensive. If a red vertical bar appears in the GPU graph,
the scene is too complicated to render quickly.

每一帧都应该在 1/60 秒（大约 16 ms）内创建并显示。
如果有一帧超时（任意图像）而无法显示，就导致了卡顿，
图表之一就会展示出来一个红色竖条。
如果是在 UI 图表出现了红色竖条，则表明 Dart 代码消耗了大量资源。
而如果红色竖条是在 GPU 图表出现的，
意味着场景太复杂导致无法快速渲染。

![Screenshot of performance overlay showing jank with red bars](/assets/images/docs/tools/devtools/performance-overlay-jank.png)

<br>The vertical red bars indicate that the current frame is
expensive to both render and paint.<br>When both graphs
display red, start by diagnosing the UI thread.

<br>红色竖条表明当前帧的渲染和绘制都很耗时。<br>
当两张图表都是红色时，就要开始对 UI 线程 (Dart VM) 进行诊断了。

[debug mode]: /testing/build-modes#debug

### Review the threads {:#flutters-threads}

### 审查线程

Flutter uses several threads to do its work, though
only two of the threads are shown in the overlay.
All of your Dart code runs on the UI thread.
Although you have no direct access to any other thread,
your actions on the UI thread have performance consequences
on other threads.

Flutter 使用多个线程来完成其必要的工作，图层中仅展示了其中两个线程。 
你写的所有 Dart 代码都在 UI 线程上运行。尽管你没有直接访问其他线程的权限，
但是你对 UI 线程的操作会对其他线程产生性能影响。

**Platform thread**
<br/>The platform's main thread. Plugin code runs here.
  For more information, see the [UIKit][] documentation for iOS,
  or the [MainThread][] documentation for Android.
  _This thread is not shown in the performance overlay._

**平台线程**
<br/>平台的主线程。插件代码在此运行。
  更多信息，请查阅 iOS 的 [UIKit][] 文档，
  或者 Android 的 [MainThread][] 文档。
  **该线程将不会显示在 performance overlay 上**

**UI thread**
<br/>The UI thread executes Dart code in the Dart VM.
  This thread includes code that you wrote, and code executed by
  Flutter's framework on your app's behalf.
  When your app creates and displays a scene, the UI thread creates
  a _layer tree_, a lightweight object containing device-agnostic
  painting commands, and sends the layer tree to the raster thread to
  be rendered on the device. _Don't block this thread!_
  Shown in the bottom row of the performance overlay.

**UI 线程**
<br/>UI 线程在 Dart VM 中执行 Dart 代码。
  该线程包括开发者写下的代码和 Flutter 框架根据应用行为生成的代码。
  当应用创建和展示场景的时候，UI 线程首先建立一个 **图层树（layer tree）** ，
  一个包含设备无关的渲染命令的轻量对象，
  并将图层树发送到 GPU 线程来渲染到设备上。
  **不要阻塞这个线程！** 在性能图层的最低栏展示该线程。

**Raster thread**
<br/>The raster thread takes the layer tree and displays
  it by talking to the GPU (graphic processing unit).
  You cannot directly access the raster thread or its data but,
  if this thread is slow, it's a result of something you've done
  in the Dart code. Skia and Impeller, the graphics libraries,
  run on this thread.
  Shown in the top row of the performance overlay.
  Note that while the raster thread rasterizes for the GPU,
  the thread itself runs on the CPU.

**Raster 线程**
<br/>raster 线程拿到 layer tree，并将它交给 GPU（图形处理单元）。
  你无法直接与 GPU 线程或其数据通信，
  但如果该线程变慢，一定是开发者 Dart 代码中的某处导致的。
  图形库 Skia 在该线程运行，并在性能图层的最顶栏显示该线程。
  请注意，raster 线程为 GPU 进行栅格化，
  而线程本身则是在 CPU 上运行的。

**I/O thread**
<br/>Performs expensive tasks (mostly I/O) that would
  otherwise block either the UI or raster threads.
  _This thread is not shown in the performance overlay._

**I/O线程**
<br/>执行昂贵的操作（常见的有 I/O）以避免阻塞 UI 或者 raster 线程。
  **该线程将不会显示在 performance overlay 上**。
    
For links to more information and videos,
see [The Framework architecture][] in the
[Flutter wiki][], and the community article,
[The Layer Cake][].

你可以在 [Flutter wiki][] 上的框架结构 ([The Framework architecture][]) 一文中
了解更多信息和一些视频内容，
另外你可以在我们的社区中查看文章 [The Layer Cake][]。

[debug mode]: /testing/build-modes#debug
[Flutter wiki]: {{site.repo.flutter}}/tree/main/docs
[UIKit]: {{site.apple-dev}}/documentation/uikit
[The Layer Cake]: {{site.medium}}/flutter-community/the-layer-cake-widgets-elements-renderobjects-7644c3142401
[The Framework architecture]: {{site.repo.flutter}}/blob/main/docs/about/The-Framework-architecture.md
[MainThread]: {{site.android-dev}}/reference/android/support/annotation/MainThread

## Identify problems

## 定位问题

### Review the UI graph {:#identifying-problems-in-the-ui-graph}

### 审查 UI 图表

If the performance overlay shows red in the UI graph,
start by profiling the Dart VM, even if the GPU graph
also shows red.

如果性能图层的 UI 图表显示红色，
就要从分析 Dart VM 开始着手了，
即使 GPU 图表同样显示红色。

### Review the GPU graph {:#identifying-problems-in-the-gpu-graph}

### 审查 GPU 图表

Sometimes a scene results in a layer tree that is easy to construct,
but expensive to render on the raster thread. When this happens,
the UI graph has no red, but the GPU graph shows red.
In this case, you'll need to figure out what your code is doing
that is causing rendering code to be slow. Specific kinds of workloads
are more difficult for the GPU. They might involve unnecessary calls
to [`saveLayer`][], intersecting opacities with multiple objects,
and clips or shadows in specific situations.

有些情况下界面的图层树构造起来虽然容易，
但在 raster 线程下渲染却很耗时。
这种情况发生时，UI 图表没有红色，但 GPU 图表会显示红色。
这时需要找出代码中导致渲染缓慢的原因。
特定类型的负载对 GPU 来说会更加复杂。
可能包括不必要的对 [`saveLayer`][] 的调用，
许多对象间的复杂操作，还可能是特定情形下的裁剪或者阴影。

If you suspect that the source of the slowness is during an animation,
click the **Slow Animations** button in the Flutter inspector
to slow animations down by 5x.
If you want more control on the speed, you can also do this
[programmatically][].

如果推断的原因是动画中的卡顿的话，
可以点击 Flutter inspector 中的 **Slow Animations** 按钮，来使动画速度减慢 5 倍。
如果你想从更多方面控制动画速度，你可以参考 [programmatically][]。

Is the slowness on the first frame, or on the whole animation?
If it's the whole animation, is clipping causing the slow down?
Maybe there's an alternative way of drawing the scene that doesn't
use clipping. For example, overlay opaque corners onto a square
instead of clipping to a rounded rectangle.
If it's a static scene that's being faded, rotated, or otherwise
manipulated, a [`RepaintBoundary`][] might help.

卡顿是第一帧发生的还是贯穿整个动画过程呢？
如果是整个动画过程的话，会是裁剪导致的吗？
也许有可以替代裁剪的方法来绘制场景。
比如说，不透明图层的长方形中用尖角来取代圆角裁剪。
如果是一个静态场景的淡入、旋转或者其他操作，
可以尝试使用重绘边界 ([`RepaintBoundary`][])。

[programmatically]: /testing/code-debugging#debug-animation-issues

#### Checking for offscreen layers

#### 检查屏幕之外的视图

The [`saveLayer`][] method is one of the most expensive methods in
the Flutter framework. It's useful when applying post-processing
to the scene, but it can slow your app and should be avoided if
you don't need it.  Even if you don't call `saveLayer` explicitly,
implicit calls might happen on your behalf, for example when specifying
[`Clip.antiAliasWithSaveLayer`][] (typically as a `clipBehavior`).

[`saveLayer`][] 方法是 Flutter 框架中特别消耗性能的操作之一。
更新屏幕时这个方法很有用，但它可能使应用变慢，
如果不是必须的话，应尽量避免使用这个方法。
即便你自己没有明确地调用 `saveLayer`，也可能在其他操作中间接调用了该方法，
例如在指定 [`Clip.antiAliasWithSaveLayer`][]（通常用于 `clipBehavior`）时就会调用。

For example,
perhaps you have a group of objects with opacities that are rendered
using `saveLayer`. In this case, it's probably more performant to
apply an opacity to each individual widget, rather than a parent
widget higher up in the widget tree. The same goes for
other potentially expensive operations, such as clipping or shadows.

举个例子，也许有一组对象的透明度要使用 `saveLayer` 来渲染。
在这种情况下，相比通过 widget 树中高层次的父 widget 操作，
单独对每个 widget 来应用透明度可能性能会更好。
其他可能大量消耗资源的操作也同理，比如裁剪或者阴影。

:::note

Opacity, clipping, and shadows are not, in themselves,
a bad idea. However, applying them to the top of the
widget tree might cause extra calls to `saveLayer`,
and needless processing.

透明度、裁剪以及阴影它们本身并不是个糟糕的主意。
然而对 widget 树顶层 widget 的操作可能导致额外对
`saveLayer` 的调用以及无用的处理。

:::

When you encounter calls to `saveLayer`,
ask yourself these questions:

当遇到对 `saveLayer` 的调用时，先问问自己：

* Does the app need this effect?

  应用是否需要这个效果？
  
* Can any of these calls be eliminated?

  可以减少调用么？
  
* Can I apply the same effect to an individual element instead of a group?

  可以对单独元素操作而不是一组元素么？

[`Clip.antiAliasWithSaveLayer`]: {{site.api}}/flutter/dart-ui/Clip.html

#### Checking for non-cached images

#### 检查没有缓存的图像

Caching an image with [`RepaintBoundary`][] is good,
_when it makes sense_.

使用重绘边界 ([`RepaintBoundary`][]) 来缓存图片是个好主意，**当需要的时候。**

One of the most expensive operations,
from a resource perspective,
is rendering a texture using an image file.
First, the compressed image
is fetched from persistent storage.
The image is decompressed into host memory (GPU memory),
and transferred to device memory (RAM).

从资源的角度看，特别消耗性能的操作之一是用图像文件来渲染纹理。
首先，需要从持久存储中取出压缩图像，
然后解压缩到宿主存储中（GPU 存储），再传输到设备存储器中 (RAM)。

In other words, image I/O can be expensive.
The cache provides snapshots of complex hierarchies so
they are easier to render in subsequent frames.
_Because raster cache entries are expensive to
construct and take up loads of GPU memory,
cache images only where absolutely necessary._

也就是说，图像的 I/O 操作是特别消耗性能的。
缓存提供了复杂层次的快照，这样就可以方便地渲染到随后的帧中。
**因为光栅缓存入口的构建需要大量资源，同时增加了 GPU 存储的负载，所以只在必须时才缓存图片。**

## Other resources

## 更多资源

The following resources provide more information on using
Flutter's tools and debugging in Flutter:

以下链接提供了关于 Flutter 工具的使用和 Flutter 调试的更多信息：

* [Debugging][]

  [调试 Flutter 应用][Debugging]
  
* [Performance view][]

  [性能视图][Performance view]

* [Flutter inspector][]

* [Flutter inspector talk][], presented at DartConf 2018
  
  [Flutter Inspector talk][], 一个在 DartConf 2018 大会的演讲
  
* [Why Flutter Uses Dart][], an article on Hackernoon

  Hackernoon 专栏的一篇文章 [为什么 Flutter 使用 Dart][Why Flutter Uses Dart]
  
* [Why Flutter uses Dart][video], a video on the Flutter channel
 
  Flutter YouTube 频道的一个视频：[为什么 Flutter 使用 Dart 的][video]

* [DevTools][devtools]: performance tooling for Dart and Flutter apps

  [Dart 开发者工具][devtools]: Dart 和 Flutter 应用的开发者性能调试工具；
  
* [Flutter API][] docs, particularly the [`PerformanceOverlay`][] class,
  and the [dart:developer][] package

  [Flutter API][] 文档, 特别是 [`PerformanceOverlay`][] 这个类
  和 [dart:developer][] 这个 package。

[`PerformanceOverlay`]: {{site.api}}/flutter/widgets/PerformanceOverlay-class.html
[`RepaintBoundary`]: {{site.api}}/flutter/widgets/RepaintBoundary-class.html
[`saveLayer`]: {{site.api}}/flutter/dart-ui/Canvas/saveLayer.html
[dart:developer]: {{site.api}}/flutter/dart-developer/dart-developer-library.html
[Debugging]: /testing/debugging
[devtools]: /tools/devtools
[Flutter API]: {{site.api}}
[Flutter inspector talk]: {{site.yt.watch}}?v=JIcmJNT9DNI
[Flutter inspector]: /tools/devtools/inspector
[Performance view]: /tools/devtools/performance
[profile mode]: /testing/build-modes#profile
[video]: {{site.yt.watch}}?v=5F-6n_2XWR8
[Why Flutter Uses Dart]: https://hackernoon.com/why-flutter-uses-dart-dd635a054ebf
