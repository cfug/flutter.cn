---
title: Using the Performance view
title: 使用性能视图 (Performance view)
description: Learn how to use the DevTools performance view.
description: 学习如何使用开发者工具的性能视图。
tags: Flutter开发工具,DevTools
keywords: 开发者工具,性能视图,Dart,性能优化
---

{{site.alert.note}}

  The performance view works with Dart CLI and mobile apps only.
  Use Chrome DevTools to [generate timeline events][]
  of a web app.

  性能视图适用于移动应用和 Dart 命令行工具。
  对于 web 应用程序，请使用 Chrome 自带的开发者工具
  [生成时间线事件][generate timeline events]。

{{site.alert.end}}

## What is it?

## 它是什么?

The performance view offers timing and performance information for activity in
your application. It consists of three parts, each increasing in granularity.

性能视图提供了应用活动的时间线以及性能信息。它由三个部分组成，且每个部分的粒度都更加细。

* Flutter frames chart (Flutter apps only)

  Flutter 火焰图（仅支持 Flutter 应用）

* Timeline events chart

  时间线事件图

* CPU profiler

  CPU 监控

{{site.alert.note}}

  **If you are running a Flutter application, 
  use a profile build to analyze performance.**
  Cpu profiles are not indicative of release performance 
  unless your Flutter application is run in profile mode.

   **对于 Flutter 应用程序，需要使用 profile 构建模式才能使用性能分析**
   如果你希望你的 Flutter 应用程序性能与 Release 模式下相同
   且希望使用性能分析工具，请使用 Profile 模式。

{{site.alert.end}}

## Flutter frames chart

This chart contains Flutter frame information for your application. Each bar set
in the chart represents a single Flutter frame. The bars are color-coded to
highlight the different portions of work that occur when rendering a Flutter
frame: work from the UI thread and work from the raster thread (previously known
as the GPU thread).

![Screenshot from a performance snapshot](/assets/images/docs/tools/devtools/performance-flutter-frames-chart.png){:width="100%"}

Selecting a bar from this chart centers the flame chart below on the timeline
events corresponding to the selected Flutter frame. The events are highlighted
with blue brackets.

![Screenshot from a timeline recording](/assets/images/docs/tools/devtools/performance-timeline-events-chart-selected-frame.png){:width="100%"}

### UI

The UI thread executes Dart code in the Dart VM. This includes
code from your application as well as the Flutter framework.
When your app creates and displays a scene, the UI thread creates
a layer tree, a lightweight object containing device-agnostic
painting commands, and sends the layer tree to the raster thread
to be rendered on the device. Do **not** block this thread.

UI 线程执行 Dart VM 中的 Dart 代码。
它包括你的应用程序和 Flutter 框架的所有代码。
当你创建或打开一个页面，
UI 线程会创建一个图层树和一个轻量级的与设备无关的绘制指令集，
并把图层树交给设备的 raster（栅格）线程进行渲染。
**不要**阻塞这个线程。

### Raster

### 栅格线程

The raster thread (previously known as the GPU thread) executes 
graphics code from the Flutter Engine.
This thread takes the layer tree and displays it by talking to
the GPU (graphic processing unit). You cannot directly access
the raster thread or its data, but if this thread is slow, it's a
result of something you've done in the Dart code. Skia, the
graphics library, runs on this thread.

栅格化线程（也就是我们之前知道的 GPU 线程）执行 Flutter 引擎中图形相关的代码。
这个线程通过与 GPU (图形处理单元) 通信，获取图形树并显示它。
你不能直接访问 Raster 线程或它的数据，但如果这个线程较慢，
那它肯定是由你的 Dart 代码引起的。
图形化库 Skia 运行在这个线程上，有时候也称它为光栅线程。

Sometimes a scene results in a layer tree that is easy to construct,
but expensive to render on the raster thread. In this case, you
need to figure out what your code is doing that is causing
rendering code to be slow. Specific kinds of workloads are more
difficult for the GPU. They might involve unnecessary calls to
`saveLayer()`, intersecting opacities with multiple objects,
and clips or shadows in specific situations.

有时候一个页面的图形层树比较容易构建但 raster 线程的渲染却比较昂贵。
在这种情形下，你需要找出导致渲染变慢的代码。
为 GPU 设定特定多种类型的 workload 是相当困难的。
在一些特定的情形下，多个对象的透明度重叠、剪切或阴影，
有可能会导致不必要的 `saveLayer()` 的调用。

For more information on profiling, see
[Identifying problems in the GPU graph][GPU graph].

更多详细信息，请查看文档 [定位 GPU 图表中的问题][GPU graph]。

### Jank

### 丢帧 (Jank)

The frame rendering chart shows jank with a red overlay.
A frame is considered to be janky if it takes more than
~16 ms to complete (for 60 FPS devices). To achieve a frame rendering rate of
60 FPS (frames per second), each frame must render in
~16 ms or less. When this target is missed, you may
experience UI jank or dropped frames.

帧渲染图表使用红色图层显示帧延时。
如果一帧的渲染时间超过 16ms，则会被认为此帧是延时的，
为了达到帧渲染频率到 60 FPS (每秒帧数)，
每一帧的渲染时间必须等于或少于 16 ms。
如果没有达到这个目标，你会发现 UI 不流畅或丢帧。

For more information on how to analyze your app's performance,
see [Flutter performance profiling][].

更多关于性能分析信息，请查看文档：[Flutter 性能分析][Flutter performance profiling]。

## Timeline events chart

## 时间线事件表

The timeline events chart shows all event tracing from your application.
The Flutter framework emits timeline events as it works to build frames, draw
scenes, and track other activity such as HTTP traffic. These events show up here
in the Timeline. You can also send your own Timeline events via the
dart:developer
[Timeline](https://api.flutter.dev/flutter/dart-developer/Timeline-class.html)
and [TimelineTask](https://api.flutter.dev/flutter/dart-developer/TimelineTask-class.html)
APIs.

![Screenshot of timeline events for a frame](/assets/images/docs/tools/devtools/performance-timeline-events-chart.png){:width="100%"}

The flame chart supports zooming and panning:
* To zoom, scroll up and down with the mouse wheel / trackpad
* To pan horizontally, either click and drag the chart or scroll horizontally
with the mouse wheel / trackpad
* To pan vertically, either click and drag the chart or use **alt + scroll**
* The WASD keys also work for controlling zoom and horizontal scroll position

You can click an event to view CPU profiling information in the CPU profiler
below, described in the next section.

火焰图表支持缩放和平移。上下滚动分别进行放大和缩小。
你可以通过单击和拖拽图表或水平滚动的方式来移动它。
在下一节的描述中，你会了解在 CPU 分析器中单击一个事件来查看 CPU 信息。

{% include_relative _profiler.md %}

## Import and export

## 导入导出

DevTools supports importing and exporting performance snapshots.
Clicking the export button (upper-right corner above the
frame rendering chart) downloads a snapshot of the current data on the
performance page. To import a performance snapshot, you can drag and drop the
snapshot into DevTools from any page. **Note that DevTools only
supports importing files that were originally exported from DevTools.**

DevTools 支持导入和导出时间线快照。单击 export 按钮 (帧渲染图表右上角) 下载当前时间线的快照。
要导入时间线快照，可以从任何页面拖放快照到 DevTools。
提示 : DevTools 仅支持导入 DevTools 导出的源文件。

[generate timeline events]: https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/performance-reference
[GPU graph]: /docs/perf/rendering/ui-performance#identifying-problems-in-the-gpu-graph
[Flutter performance profiling]: /docs/perf/rendering/ui-performance
[Import and export]: #import-and-export