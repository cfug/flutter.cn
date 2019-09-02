---
title: Flutter performance profiling
title: Flutter 性能分析
subtitle: Where to look when your Flutter app drops frames in the UI.
subtitle: 找出你的 Flutter 应用 UI 在哪里掉帧了
description: Diagnosing UI performance issues in Flutter.
description: 诊断 Flutter 里的 UI 性能问题。
---

{{site.alert.secondary}}
  <h4 class="no_toc">What you’ll learn</h4>
  
  <h4 class="no_toc">你将学到</h4>

  * Flutter aims to provide 60 frames per second (fps) performance,
    or 120 fps performance on devices capable of 120Hz updates.
    
    Flutter 的目标是提供 60 帧每秒(fps)的性能，或者是在可以达到 120 Hz 的设备上提供 120 fps 的性能。
    
  * For 60fps, frames need to render approximately every 16ms.
  
    对于 60 fps 来说，需要在约每 16 ms 的时候渲染一帧。
    
  * Jank occurs when the UI doesn't render smoothly. For example,
    every so often, a frame takes 10 times longer to render,
    so it gets dropped, and the animation visibly jerks.
    
    当 UI 渲染不流畅的时候，卡顿就随之产生了。举例来说，如果一帧花了 10 倍的时间来渲染，这帧就会被丢弃，动画看起来就会卡。
    
{{site.alert.end}}

It's been said that "a _fast_ app is great,
but a _smooth_ app is even better."
If your app isn't rendering smoothly,
how do you fix it? Where do you begin?
This guide shows you where to start,
steps to take, and tools that can help.

有句话叫“**快**的应用固然很好，但**流畅**的应用则更好。”如果你的应用渲染并不流畅，该怎么处理呢？从哪里着手呢？本文展示了应该从哪里着手，步骤以及可以提供帮助的工具。

{{site.alert.note}}
  * An app's performance is determined by more than one measure.
    Performance sometimes refers to raw speed, but also to the UI's
    smoothness and lack of stutter. Other examples of performance
    include I/O or network speed. This page primarily focuses on the
    second type of performance (UI smoothness), but you can use most
    of the same tools to diagnose other performance problems.
    
    应用的性能不只是由一次测量 (measure) 决定的。性能有时取决于原生速度，同时也取决于 UI 的流畅性，不卡顿。其他性能指标还包括 I/O 或者网速。本文主要聚焦于第二种性能（UI 流畅性），但其中的大多数工具也能被用来分析其他性能问题。
    
  * To perform tracing inside your Dart code, see [Tracing Dart code][]
    in the [Debugging][] page.
    
    分析 Dart 代码中的性能问题，可以参考 [调试 Flutter 应用][] 页下的 [跟踪 Dart 代码性能][]。
{{site.alert.end}}

## Diagnosing performance problems

## 分析性能问题

To diagnose an app with performance problems, you'll enable
the performance overlay to look at the UI and GPU threads.
Before you begin, you want to make sure that you're running in
[profile mode][], and that you're not using an emulator.
For best results, you might choose the slowest device that
your users might use.

分析应用的性能问题需要打开性能监控图层 (performance overlay) 来观察 UI 和 GPU 线程。在此之前，要确保是在 [分析模式 (profile mode) ] 下运行，而且当前设备不是虚拟机。使用用户可能采用的最慢设备来获取最佳结果。

### Connect to a physical device

### 连接到物理设备

Almost all performance debugging for Flutter applications
should be conducted on a physical Android or iOS device,
with your Flutter application running in [profile mode][].
Using debug mode, or running apps on simulators
or emulators, is generally not indicative of the final
behavior of release mode builds.
_You should consider checking performance
on the slowest device that your users might reasonably use._

几乎全部的 Flutter 应用性能调试都应该在真实的 Android 或者 iOS 设备上以 [分析模式][] 进行。通常来说，调试模式或者是模拟器上运行的应用的性能指标和发布模式的表现并不相同。 _应该考虑在用户使用的最慢的设备上检查性能。_

{{site.alert.secondary}}
  <h4 class="no_toc" markdown="1">**Why you should run on a real device:**</h4>
  
  <h4 class="no_toc" markdown="1">**为什么应该在真机上运行：**</h4>

* Simulators and emulators don’t use the same hardware, so their
  performance characteristics are different&mdash;some operations are
  faster on simulators than real devices, and some are slower.
  
  各种模拟器使用的硬件并不相同，因此性能也不同&mdash;模拟器上的一些操作会比真机快，而另一些操作则会比真机慢。
  
* Debug mode enables additional checks (such as asserts) that don’t run
  in profile or release builds, and these checks can be expensive.
  
  调试模式相比分析模式或者发布编译来说，增加了额外的检查（例如断言），这些检查可能相当耗费资源。
  
* Debug mode also executes code in a different way than release mode.
  The debug build compiles the Dart code "just in time" (JIT) as the
  app runs, but profile and release builds are pre-compiled to native
  instructions (also called “ahead of time”, or AOT) before the app is
  loaded onto the device. JIT can cause the app to pause for JIT
  compilation, which itself can cause jank.
  
  调试模式和发布模式代码执行的方式也是不同的。调试编译采用的是“just in time” (JIT) 模式运行应用，而分析和发布模式则是预编译到本地指令（“ahead of time”，或者叫 AOT）之后再加载到设备中。JIT本身的编译就可能导致应用暂停，从而导致卡顿。
{{site.alert.end}}

### Run in profile mode

### 在分析模式运行

Flutter’s profile mode compiles and launches your application
almost identically to release mode, but with just enough additional
functionality to allow debugging performance problems.
For example, profile mode provides tracing information to the
profiling tools.

除了一些调试性能问题所必须的额外方法，Flutter 的分析模式和发布模式的编译和运行基本相同。例如，分析模式为分析工具提供了追踪信息。

Launch the app in profile mode as follows:

使用分析模式运行应用的方法：

- In Android Studio and IntelliJ, use the
  **Run > Flutter Run main.dart in Profile Mode** menu item.
  
  在 Android Studio 和 IntelliJ 使用 **Run > Flutter Run main.dart in Profile Mode** 选项
  
- In VS Code, open your `launch.json` file, and set the
  `flutterMode` property to `profile`
  (when done profiling, change it back to `release` or `debug`):
  
  在 VS Code 中，打开 `launch.json` 文件，设置 `flutterMode` 属性为 `profile`（当分析完成后，改回 `release` 或者 `debug`）：


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
- From the command line, use the `--profile` flag:

  命令行使用 `--profile` 参数运行

  ```terminal
  $ flutter run --profile
  ```

For more information on the different modes,
see [Flutter's build modes][].

关于不同模式的更多信息，请参考 [Flutter 的构建模式选择][]

You'll begin by opening DevTools and viewing
the performance overlay, as discussed in the next section.

下面我们会从打开 DevTools、查看性能图层开始讲述。

## Launch DevTools

## 运行 DevTools

DevTools provides features like profiling, examining the heap,
displaying code coverage, enabling the performance overlay,
and a step-by-step debugger.
DevTools' [Timeline] allows you to investigate the
UI performance of your application on a frame-by-frame basis.

Dart DevTool 提供诸如性能分析、堆测试以及显示代码覆盖率等功能。DevTool 的 [Timeline] 界面可以让开发者逐帧分析应用的 UI 性能。

Once your app is running in profile mode,
[launch DevTools][].

一旦你的应用程序在分析模式下运行，即 [运行了 DevTools][launch DevTools]。

## The performance overlay

## 性能图层

The performance overlay displays statistics in two graphs
that show where time is being spent in your app. If the UI
is janky (skipping frames), these graphs help you figure out why.
The graphs display on top of your running app, but they aren’t
drawn like a normal widget&mdash;the Flutter engine itself
paints the overlay and only minimally impacts performance.
Each graph represents the last 300 frames for that thread.

性能图层用两张图表显示应用的耗时信息。如果 UI 产生了卡顿（跳帧），这些图表可以帮助分析原因。图表在当前应用的最上层展示，但并不是用普通的 widget 方式绘制的&mdash;Flutter 引擎自身绘制了该图层来尽可能减少对性能的影响。每一张图表都代表当前线程的最近 300 帧表现。

This section describes how to enable the performance overlay
and use it to diagnose the cause of jank in your application.
The following screenshot shows the performance overlay running
on the Flutter Gallery example:

本节阐述如何打开性能图层并用其来分析应用中卡顿的原因。下面的截图展示了 Flutter Gallery 样例的性能图层：

![Screenshot of overlay showing zero jank]({% asset tools/devtools/performance-overlay-green.png @path %})

<br>Performance overlay showing the GPU thread (top),
and UI thread (bottom).<br>The vertical green bars
represent the current frame.

<br>GPU 线程的性能情况在上面，UI 线程显示在下面。<br>垂直的绿色条条代表的是当前帧。

## Interpreting the graphs

## 图表解释

The top graph shows the time spent by the GPU thread,
the bottom one graph shows the time spent by the
UI (CPU) thread.
The white lines across the graphs show 16ms increments
along the vertical axis; if the graph ever goes over one
of these lines then you are running at less than 60Hz.
The horizontal axis represents frames. The graph is
only updated when your application paints,
so if it's idle the graph stops moving.

最顶部的图形表示 GPU 线程所花费的时间，底部的图表显示了 UI 线程所花费的时间。横跨图表中的白线代表了 16 ms 内沿竖轴的增量；如果这些线在图表中都没有超过它的话，说明你的运行帧率低于 60 Hz。而横轴则表示帧。只有当你的应用绘制时这个图表才会更新，所以如果它空闲的话，图表就不会动。

The overlay should always be viewed in [profile mode][],
since [debug mode][] performance is intentionally sacrificed
in exchange for expensive asserts that are intended to aid
development, and thus the results are misleading.

这个浮层只应在 [profile mode][] 中使用，因为在 [debug mode][] 下有意牺牲了性能来换取昂贵的断言以帮助开发，所以这时候的结果会具有误导性。

Each frame should be created and displayed within 1/60th of
a second (approximately 16ms). A frame exceeding this limit
(in either graph) fails to display, resulting in jank,
and a vertical red bar appears in one or both of the graphs.
If a red bar appears in the UI graph, the Dart code is too
expensive  If a red vertical bar appears in the GPU graph,
the scene is too complicated to render quickly.

每一帧都应该在 1/60 秒（大约 16 ms）内创建并显示。如果有一帧超时（任意图像）而无法显示，就导致了卡顿，图表之一就会展示出来一个红色竖条。
如果是在 UI 图表出现了红色竖条，则表明 Dart 代码消耗了大量资源。
而如果红色竖条是在 GPU 图表出现的，意味着场景太复杂导致无法快速渲染。

![Screenshot of performance overlay showing jank with red bars]({% asset tools/devtools/performance-overlay-jank.png @path %})

<br>The vertical red bars indicate that the current frame is
expensive to both render and paint.<br>When both graphs
display red, start by diagnosing the UI thread (Dart VM).

<br>红色竖条表明当前帧的渲染和绘制都很耗时。<br>当两张图表都是红色时，就要开始对 UI 线程 (Dart VM) 进行诊断了。

## Flutter's threads

## Flutter 的线程

Flutter uses several threads to do its work, though
only two of the threads are shown in the overlay.
All of your Dart code runs on the UI thread.
Although you have no direct access to any other thread,
your actions on the UI thread have performance consequences
on other threads.

Flutter 用了一些额外的线程来完成这项工作。开发者的 Dart 代码都在 UI 线程运行。尽管没有直接访问其他线程的权限，但 UI 线程的动作还是对其他线程的性能有影响的。

### Platform thread 

### 平台线程 

The platform's main thread. Plugin code runs here.
For more information, see the [UIKit][] documentation for iOS,
or the [MainThread][] documentation for Android.
This thread is not shown in the performance overlay.
    
该平台的主线程。插件代码在这里运行。更多信息请参阅：iOS 的 [UIKit][] 文档，或者 Android 的 [MainThread][] 文档。性能图层并不会展示该线程。

### UI thread

### UI 线程

The UI thread executes Dart code in the Dart VM.
This thread includes code that you wrote, and code executed by
Flutter's framework on your app's behalf.
When your app creates and displays a scene, the UI thread creates
a _layer tree_, a lightweight object containing device-agnostic
painting commands, and sends the layer tree to the GPU thread to
be rendered on the device. _Don't block this thread!_
Shown in the bottom row of the performance overlay.

UI 线程在 Dart VM 执行 Dart 代码。该线程包括开发者写下的代码和 Flutter 框架根据应用行为生成的代码。当应用创建和展示场景的时候，UI 线程首先建立一个 _图层树 (layer tree) _ ，一个包含设备无关的渲染命令的轻量对象，并将图层树发送到 GPU 线程来渲染到设备上。 _不要阻塞这个线程！_ 在性能图层的最低栏展示该线程。

### GPU thread 

### GPU 线程 

The GPU thread takes the layer tree and displays
it by talking to the GPU (graphic processing unit).
You cannot directly access the GPU thread or its data but,
if this thread is slow, it's a result of something you've done
in the Dart code.  Skia, the graphics library, runs on this thread,
which is sometimes called the _rasterizer_ thread.
Shown in the top row of the performance overlay.

GPU 线程取回图层树并通知 GPU 渲染。尽管无法直接与 GPU 线程或其数据通信，但如果该线程变慢，一定是开发者 Dart 代码中的某处导致的。图形库 Skia 在该线程运行，有时也被叫做 _光栅器 (rasterizer) 线程_ 。在性能图层的最顶栏展示该线程。

### I/O thread

### I/O 线程 

Performs expensive tasks (mostly I/O) that would
otherwise block either the UI or GPU threads.
This thread is not shown in the performance overlay.

可能阻塞 UI 或者 GPU 线程的耗时任务（大多数情况下是 I/O）。该线程并不会在性能图层中展示。

For links to more information and videos,
see [The Framework architecture][] on the
[GitHub wiki][], and the community article,
[The Layer Cake][].

你可以在 [GitHub wiki][] 上的 [The Framework architecture][] 了解更多信息和一些视频内容，另外你可以在我们的社区中查看文章 [The Layer Cake][]。

### Displaying the performance overlay

### 显示性能图层

You can toggle display of the performance overlay as follows:

你可以用如下方法显示性能图层：

* Using the Flutter inspector

  使用 Flutter Inspector
  
* From the command line

  从命令行启动
   
* Programmatically

  写入代码

#### Using the Flutter inspector

#### 使用 Flutter inspector

The easiest way to enable the PerformanceOverlay widget is 
from the Flutter inspector, which is available in the
[Inspector view][] in [DevTools][]. Simply click the
**Performance Overlay** button to toggle the overlay
on your running app.

打开 PerformanceOverlay widget 最简单的方法是 IDE 中 Flutter 插件提供的 Flutter inspector，你可以在 [DevTools][] 的 [Inspector view][] 中找到。只需单击 **Performance Overlay** 按钮，即可在正在运行的应用程序上切换图层。

#### From the command line

#### 命令行

Toggle the performance overlay using the **P** key from
the command line.

使用 **p** 参数触发性能图层。

#### Programmatically

#### 代码控制

To enable the overlay programmatically, see
[Performance overlay][], a section in the
[Debugging Flutter apps programmatically][] page.

要用代码实现性能图层，可以查看 [Debugging Flutter apps programmatically][] 中的 [Performance overlay][]。

You are probably familiar with the Flutter Gallery example app.
To use the performance overlay with Flutter Gallery,
use the copy in the [examples][] directory that was installed
with Flutter, and run the app in profile mode. The program is written
so that the app menu allows you to dynamically toggle the overlay,
as well as enable checks for calls to `saveLayer` and the presence of
cached images.

可能读者已经对 Flutter Gallery 样例应用相当熟悉了。要在 Flutter Gallery 中使用性能图层，请使用与 Flutter 一起安装的 [examples][] 目录的副本在分析模式下运行应用。应用的代码中已经写好了通过应用菜单动态触发图层，同时允许对 `saveLayer` 的调用和当前已缓存的图片的检查。

{{site.alert.note}}

  You can’t enable the performance overlay in the Flutter
  Gallery app downloaded from the App Store.
  That version of the app is compiled to release mode
  (not profile mode), and doesn’t provide
  a menu for enabling or disabling the overlay.
  
  从应用市场下载的 Flutter Gallery 应用是无法打开性能图层的。因为该版本是用发布模式编译的（而不是分析模式），并且没有提供图层开关的菜单。
  
{{site.alert.end}}

## Identifying problems in the UI graph

## 定位 UI 图表中的问题

If the performance overlay shows red in the UI graph,
start by profiling the Dart VM, even if the GPU graph
also shows red.

如果性能图层的 UI 图表显示红色，就要从分析 Dart VM 开始着手了，即使 GPU 图表同样显示红色。

PENDING: Other than saying "debug with DevTools", what
can be said here?

思考：除了说“使用DevTools调试”，这里还可以说什么？

## Identifying problems in the GPU graph

## 定位 GPU 图表中的问题

Sometimes a scene results in a layer tree that is easy to construct,
but expensive to render on the GPU thread. When this happens,
the UI graph has no red, but the GPU graph shows red.
In this case, you’ll need to figure out what your code is doing
that is causing rendering code to be slow. Specific kinds of workloads
are more difficult for the GPU.  They might involve unnecessary calls
to [`saveLayer`][], intersecting opacities with multiple objects,
and clips or shadows in specific situations.

有些情况下界面的图层树构造起来虽然容易，但在 GPU 线程下渲染却很耗时。这种情况发生时，UI 图表没有红色，但 GPU 图表会显示红色。这时需要找出代码中导致渲染缓慢的原因。特定类型的负载对 GPU 来说会更加复杂。可能包括不必要的对 [`saveLayer`][] 的调用，许多对象间的复杂操作，还可能是特定情形下的裁剪或者阴影。

If you suspect that the source of the slowness is during an animation,
click the **Slow Animations** button in the Flutter inspector
to slow animations down by 5x.
If you want more control on the speed, you can also do this
[programmatically][].

如果推断的原因是动画中的卡顿的话，可以点击 Flutter inspector 中的 **Slow Animations** 按钮，来使动画速度减慢 5x。
如果你想从更多方面控制动画速度，你可以参考 [programmatically][]。

Is the slowness on the first frame, or on the whole animation?
If it's the whole animation, is clipping causing the slow down?
Maybe there's an alternative way of drawing the scene that doesn't
use clipping. For example, overlay opaque corners onto a square
instead of clipping to a rounded rectangle.
If it's a static scene that's being faded, rotated, or otherwise
manipulated, a [RepaintBoundary][] might help.

卡顿是第一帧发生的还是贯穿整个动画过程呢？如果是整个动画过程的话，会是裁剪导致的么？也许有可以替代裁剪的方法来绘制场景。比如说，不透明图层的长方形中用尖角来取代圆角裁剪。如果是一个静态场景的淡入、旋转或者其他操作，可以尝试使用 [RepaintBoundary][]。

#### Checking for offscreen layers

#### 检查屏幕之外的视图

The [`saveLayer`][] method is one of the most expensive methods in
the Flutter framework. It’s useful when applying post-processing
to the scene, but it can slow your app and should be avoided if
you don’t need it.  Even if you don’t call `saveLayer` explicitly,
implicit calls might happen on your behalf. You can check whether
your scene is using `saveLayer` with the
[PerformanceOverlayLayer.checkerboardOffscreenLayers][] switch.

[`saveLayer`][] 方法是 Flutter 框架中最重量的操作之一。更新屏幕时这个方法很有用，但它可能使应用变慢，如果不是必须的话，应该避免使用这个方法。
即便没有显式地调用 `saveLayer`，也可能在其他操作中间接调用了该方法。可以使用 [PerformanceOverlayLayer.checkerboardOffscreenLayers][] 开关来检查场景是否使用了 `saveLayer`。

{% comment %}
[TODO: Document disabling the graphs and checkerboardRasterCacheImages.
Flutter inspector doesn't seem to support this?]
{% endcomment %}

Once the switch is enabled, run the app and look for any images
that are outlined with a flickering box. The box flickers from
frame to frame if a new frame is being rendered.  For example,
perhaps you have a group of objects with opacities that are rendered
using `saveLayer`. In this case, it's probably more performant to
apply an opacity to each individual widget, rather than a parent
widget higher up in the widget tree. The same goes for
other potentially expensive operations, such as clipping or shadows.

打开开关之后，运行应用并检查是否有图像的轮廓闪烁。如果有新的帧渲染的话，容器就会闪烁。举个例子，也许有一组对象的透明度要使用 `saveLayer` 来渲染。在这种情况下，相比通过 widget 树中高层次的父 widget 操作，单独对每个 widget 来应用透明度可能性能会更好。其他可能大量消耗资源的操作也同理，比如裁剪或者阴影。

{{site.alert.note}}

  Opacity, clipping, and shadows are not, in themselves,
  a bad idea. However, applying them to the top of the
  widget tree might cause extra calls to `saveLayer`,
  and needless processing.
  
  透明度、裁剪以及阴影它们本身并不是个糟糕的注意。
  然而对 widget 树顶层 widget 的操作可能导致额外对 `saveLayer` 的调用以及无用的处理。
  
{{site.alert.end}}

When you encounter calls to `saveLayer`,
ask yourself these questions:

当遇到对 `saveLayer` 的调用时，先问问自己：

* Does the app need this effect?

  应用是否需要这个效果？
  
* Can any of these calls be eliminated?

  可以减少调用么？
  
* Can I apply the same effect to an individual element instead of a group?

  可以对单独元素操作而不是一组元素么？

#### Checking for non-cached images

#### 检查没有缓存的图像

Caching an image with [RepaintBoundary][] is good, _when it makes sense_.

使用 [RepaintBoundary][] 来缓存图片是个好主意， _当需要的时候_ 。

One of the most expensive operations, from a resource perspective,
is rendering a texture using an image file. First, the compressed image
is fetched from persistent storage.
The image is decompressed into host memory (GPU memory), and transferred
to device memory (RAM).

从资源的角度看，最重量级的操作之一是用图像文件来渲染纹理。首先，需要从持久存储中取出压缩图像，然后解压缩到宿主存储中（GPU 存储），再传输到设备存储器中　(RAM) 。

In other words, image I/O can be expensive.
The cache provides snapshots of complex hierarchies so
they are easier to render in subsequent frames.
_Because raster cache entries are expensive to
construct and take up loads of GPU memory,
cache images only where absolutely necessary._

也就是说，图像的 I/O 操作是重量级的。
缓存提供了复杂层次的快照，这样就可以方便地渲染到随后的帧中。
_因为光栅缓存入口的构建需要大量资源，同时增加了 GPU 存储的负载，所以只在必须时才缓存图片。_ 

You can see which images are being cached by enabling the
[PerformanceOverlayLayer.checkerboardRasterCacheImages][] switch.

打开 [PerformanceOverlayLayer.checkerboardRasterCacheImages][] 开关可以检查哪些图片被缓存了。

{% comment %}
[TODO: Document how to do this, either via UI or programmatically.
At this point, disable the graphs and checkerboardOffScreenLayers.]
{% endcomment %}

Run the app and look for images rendered with a randomly colored
checkerboard, indicating that the image is cached.
As you interact with the scene, the checkerboarded images
should remain constant&mdash;you don’t want to see flickering,
which would indicate that the cached image is being re-cached.

运行应用来查看使用随机颜色网格渲染的图像，标识被缓存的图像。当和场景交互时，网格里的图片应该是静止的&mdash;代表重新缓存图片的闪烁视图不应该出现。

In most cases, you want to see checkerboards on static images,
but not on non-static images.  If a static image isn't cached,
you can cache it by placing it into a [RepaintBoundary][]
widget. Though the engine might still ignore a repaint
boundary if it thinks the image isn't complex enough.

大多数情况下，开发者都希望在网格里看到的是静态图片，而不是非静态图片。如果静态图片没有被缓存，可以将其放到 [RepaintBoundary][] widget 中来缓存。虽然引擎也可能忽略 repaint boundary，如果它认为图像还不够复杂的话。

### Viewing the widget rebuild profiler

### 检视 widget 重建性能

The Flutter framework is designed to make it hard to create
applications that are not 60fps and smooth. Often, if you have jank,
it's because there is a simple bug causing more of the UI to be
rebuilt each frame than required. The Widget rebuild profiler
helps you debug and fix performance problems due to these sorts
of bugs.

Flutter 框架的设计使得构建达不到 60 fps 流畅度的应用变得困难。通常情况下如果卡顿，就是因为每一帧被重建的 UI 比需求更多的简单 bug。Widget rebuild profiler 可以帮助调试和修复这些问题引起的 bug。

You can view the widget rebuilt counts for the current screen and
frame in the Flutter plugin for Android Studio and IntelliJ.
For details on how to do this, see [Show performance data][]

可以检视 widget inspector 中当前屏幕和帧下的 widget 重建数量。了解细节，可以参考 [在 Android Studio 或类 IntelliJ 里开发 Flutter 应用][] 中的 [显示性能数据][]。

## Benchmarking

## 评分

You can measure and track your app’s performance by writing
benchmark tests  The Flutter Driver library provides support
for benchmarking. Using this integration test framework,
you can generate metrics to track the following:

可以通过编写评分测试来测量和追踪应用的性能。Flutter Driver 库提供了对评分的支持。基于这套测试框架就可以生成以下几项的测试标准：

* Jank

  卡顿
  
* Download size
  
  下载大小
  
* Battery efficiency
  
  电池性能
  
* Startup time

  启动时间

Tracking these benchmarks allows you to be informed when a
regression is introduced that adversely affects performance.

追踪这些评分可以在回归测试中了解对性能的不利影响。

For more information, see [Integration testing][],
a section in [Testing Flutter apps][].

了解更多，请参考 [测试 Flutter 应用][] 中的 [集成测试][] 一节。

## Other resources

## 更多资源

The following resources provide more information on using
Flutter's tools and debugging in Flutter:

以下链接提供了关于 Flutter 工具的使用和 Flutter 调试的更多信息：

* [Debugging][]

  [调试 Flutter 应用][Debugging]
  
* [Flutter inspector][]

* [Flutter inspector talk][], presented at DartConf 2018
  
  [Flutter Inspector talk][], 一个在 DartConf 2018 大会的演讲
  
* [Why Flutter Uses Dart][], an article on Hackernoon

  [为什么 Flutter 使用 Dart (Why Flutter Uses Dart)][Why Flutter Uses Dart], Hackernoon 专栏的一篇文章
  
* [DevTools][devtools]: performance tooling for Dart and Flutter apps

  [Dart 开发者工具][devtools]: Dart 和 Flutter 应用的开发者性能调试工具；
  
* [Flutter API][] docs, particularly the [PerformanceOverlay][] class,
  and the [dart:developer][] package
  
  [Flutter API][] 文档, 特别是 [PerformanceOverlay][] 这个类和 [dart:developer][] 这个 package。

[RepaintBoundary]: {{site.api}}/flutter/widgets/RepaintBoundary-class.html
[Tracing Dart code]: /docs/testing/debugging#tracing-dart-code
[跟踪 Dart 代码性能]: /docs/testing/debugging#tracing-dart-code
[Debugging]: /docs/testing/debugging
[调试 Flutter 应用]: /docs/testing/debugging
[examples]: {{site.github}}/flutter/flutter/tree/master/examples/flutter_gallery
[Flutter's build modes]: /docs/testing/build-modes
[Flutter 的构建模式选择]: /docs/testing/build-modes
[profile mode]: /docs/testing/build-modes#profile
[分析模式]: /docs/testing/build-modes#profile
[debug mode]: /docs/testing/build-modes#debug
[PerformanceOverlay]: {{site.api}}/flutter/widgets/PerformanceOverlay-class.html
[dart:developer]: {{site.api}}/flutter/dart-developer/dart-developer-library.html
[PerformanceOverlayLayer.checkerboardOffscreenLayers]: {{site.api}}/flutter/rendering/PerformanceOverlayLayer/checkerboardOffscreenLayers.html
[PerformanceOverlayLayer.checkerboardRasterCacheImages]: {{site.api}}/flutter/rendering/PerformanceOverlayLayer/checkerboardRasterCacheImages.html
[Flutter API]: {{site.api}}
[UIKit]: https://developer.apple.com/documentation/uikit
[MainThread]: {{site.android-dev}}/reference/android/support/annotation/MainThread
[Integration testing]: /docs/testing#integration-tests
[集成测试]: /docs/testing#integration-tests
[Flutter inspector]: /docs/development/tools/devtools/inspector
[Flutter inspector talk]: https://www.youtube.com/watch?v=JIcmJNT9DNI
[bookshelf-like icon]: /docs/testing/ui-performance/images/performance-overlay-icon.png
[line-chart icon]: /docs/testing/ui-performance/images/observatory-timeline-icon.png
[stopwatch icon]: /docs/testing/ui-performance/images/observatory-icon.png
[issues or feature requests]: {{site.github}}/dart-lang/sdk/issues?q=is%3Aopen+is%3Aissue+label%3Aarea-observatory
[`saveLayer`]: {{site.api}}/flutter/dart-ui/Canvas/saveLayer.html
[timeDilation]: {{site.api}}/flutter/scheduler/timeDilation.html
[Show performance data]: /docs/development/tools/android-studio#show-performance-data
[显示性能数据]: /docs/development/tools/android-studio#show-performance-data
[Android Studio/IntelliJ]: /docs/development/tools/android-studio
[在 Android Studio 或类 IntelliJ 里开发 Flutter 应用]: /docs/development/tools/android-studio
[rendering library]: {{site.api}}/flutter/rendering/rendering-library.html
[Testing Flutter apps]: /docs/testing
[测试 Flutter 应用]: /docs/testing
[Why Flutter Uses Dart]: https://hackernoon.com/why-flutter-uses-dart-dd635a054ebf
[devtools]: /docs/development/tools/devtools
[Inspector view]: /docs/development/tools/devtools/inspector
[Timeline view]: /docs/development/tools/devtools/timeline
[programmatically]: /docs/testing/code-debugging#debugging-animations
[Performance overlay]: /docs/testing/code-debugging#performance-overlay
[Debugging Flutter apps programmatically]: /docs/testing/code-debugging
[launch DevTools]: /docs/development/tools/devtools
[The Layer Cake]: https://medium.com/flutter-community/the-layer-cake-widgets-elements-renderobjects-7644c3142401
[GitHub wiki]: {{site.github}}/flutter/flutter/wiki/
[The Framework architecture]: {{site.github}}/flutter/flutter/wiki/The-Framework-architecture
