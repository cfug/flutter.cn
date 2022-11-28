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
  如果你希望你的 Flutter 应用程序性能与生产模式下相同
  且希望使用性能分析工具，请使用性能模式。

{{site.alert.end}}

## Flutter frames chart

This chart contains Flutter frame information for your application. Each bar set
in the chart represents a single Flutter frame. The bars are color-coded to
highlight the different portions of work that occur when rendering a Flutter
frame: work from the UI thread and work from the raster thread (previously known
as the GPU thread).

![Screenshot from a performance snapshot]({{site.url}}/assets/images/docs/tools/devtools/performance-flutter-frames-chart.png){:width="100%"}

Selecting a bar from this chart centers the flame chart below on the timeline
events corresponding to the selected Flutter frame. The events are highlighted
with blue brackets.

![Screenshot from a timeline recording]({{site.url}}/assets/images/docs/tools/devtools/performance-timeline-events-chart-selected-frame.png){:width="100%"}

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
**不要** 阻塞这个线程。

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

### Jank (slow frame)

### 卡顿 (Jank)

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

### Shader compilation

### 着色器渲染

Shader compilation occurs when a shader is first used in your Flutter
app. Frames that perform shader compilation are marked in dark
red:

在 Flutter 应用中，着色器会在初次使用时发生渲染。参与了着色器编译的构建帧已标记为深红色：

![Screenshot of shader compilation for a frame]({{site.url}}/assets/images/docs/tools/devtools/shader-compilation-frames-chart.png)

For more information on how to reduce shader compilation jank, see [Reduce
shader compilation jank on mobile][].

想要了解更多关于如何减少着色器缓存卡顿的内容，阅读
[在移动端减少着色器编译卡顿][Reduce shader compilation jank on mobile]。

## Timeline events chart

## 时间线事件表

The timeline events chart shows all event tracing from your application.
The Flutter framework emits timeline events as it works to build frames, draw
scenes, and track other activity such as HTTP traffic. These events show up here
in the Timeline. You can also send your own Timeline events via the
dart:developer
[Timeline]({{site.api}}/flutter/dart-developer/Timeline-class.html)
and [TimelineTask]({{site.api}}/flutter/dart-developer/TimelineTask-class.html)
APIs.

![Screenshot of timeline events for a frame]({{site.url}}/assets/images/docs/tools/devtools/performance-timeline-events-chart.png){:width="100%"}

The flame chart supports zooming and panning:
* To zoom, scroll up and down with the mouse wheel / trackpad
* To pan horizontally, either click and drag the chart or scroll horizontally
with the mouse wheel / trackpad
* To pan vertically, either click and drag the chart or use **alt + scroll**
* The WASD keys also work for controlling zoom and horizontal scroll position

You can click an event to view CPU profiling information in the CPU profiler
below, described in the next section.

## Enhance tracing 

## 增强的追踪选项

To view more detailed tracing in the timeline events chart,
use the options in the enhance tracing dropdown:

想要在时间线事件图表里查看更详细的追踪内容，请使用增强的追踪下拉控件里的选项：

{{site.alert.note}}

  Frame times may be negatively affected when these options are enabled.

  启用该选项后，帧构建时间可能会受到影响。

{{site.alert.end}}

![Screenshot of enhance tracing dropdown]({{site.url}}/assets/images/docs/tools/devtools/enhance-tracing.png)

To see the new timeline events,
reproduce the activity in your app that you are interested in tracing,
and then select a frame to inspect the timeline.

你可以重复操作你想要追踪的行为来查看新的时间线事件，
操作后可以在时间线中选择一个构建帧进行查看。

### Track widget builds

### 追踪 widget 的构建

To see the build() method events in the timeline,
enable the Track Widget Builds option.
The name of the widget is shown in the timeline event.

想要在时间线中查看 `build()` 方法的事件，启用 Track Widget Builds 选项。
时间线中将出现 widget 对应名称的事件。

![Screenshot of track widget builds]({{site.url}}/assets/images/docs/tools/devtools/track-widget-builds.png)

### Track layouts

### 追踪布局

To see render object layout events in the timeline,
enable the Track Layouts option:

想要在时间线中查看 `RenderObject` 布局构建的事件，启用 Track Layouts 选项：

![Screenshot of track layouts]({{site.url}}/assets/images/docs/tools/devtools/track-layouts.png)

### Track paints

### 追踪绘制

To see render object paint events in the timeline,
enable the Track Paints option:

想要在时间线中查看 `RenderObject` 的绘制事件，启用 Track Paints 选项：

![Screenshot of track paints]({{site.url}}/assets/images/docs/tools/devtools/track-paints.png)

## More debugging options

## 更多调试选项

To diagnose performance problems related to rendering layers,
toggle off a rendering layer.
These options are enabled by default.

想要诊断渲染图层相关的问题，请先关闭渲染层。
下述的选项将会默认启动。

To see the effects on your app's performance,
reproduce the activity in your app.
Then select the new frames in the frames chart
to inspect the timeline events
with the layers disabled.
If Raster time has significantly decreased,
excessive use of the effects you disabled might be contributing
to the jank you saw in your app.

想要查看你的应用的性能影响，请尝试以相同的操作重现性能问题。
在渲染层关闭的情况下，于构建帧图表里选择一个新的构建帧，
查看它的时间线细节。
如果 Raster 线程的时间消耗有显著降低，
那么你禁用的效果的滥用可能是导致卡顿的主要原因。

**Render Clip layers**
<br> Disable this option  to check whether excessive use of clipping
     is affecting performance.
     If performance improves with this option disabled,
     try to reduce the use of clipping effects in your app.

**渲染裁剪的图层**
<br> 禁用该选项来检查已使用的裁剪图层是否影响了性能。
     如果禁用后性能有显著提升，请尝试减少你的应用中裁剪效果的使用。

**Render Opacity layers**
<br> Disable this option to check whether
     excessive use of opacity effects are affecting performance.
     If performance improves with this option disabled,
     try to reduce the use of opacity effects in your app.

**渲染透明度图层**
<br> 禁用该选项来检查已使用的透明度图层是否影响了性能。
     如果禁用后性能有显著提升，请尝试减少你的应用中透明度效果的使用。

**Render Physical Shape layers**
<br> Disable this option to check whether excessive
     use of physical modeling effects are affecting performance,
     such as shadows or elevation.
     If performance improves with this option disabled,
     try to reduce the use of physical modeling effects in your app.

**渲染物理形状图层**
<br> 禁用该选项来检查已使用的物理形状图层是否影响了性能，例如阴影和背景特效。
     如果禁用后性能有显著提升，请尝试减少你的应用中物理效果的使用。

![Screenshot of more debugging options]({{site.url}}/assets/images/docs/tools/devtools/more-debugging-options.png)

## Import and export

## 导入导出

DevTools supports importing and exporting performance snapshots.
Clicking the export button (upper-right corner above the
frame rendering chart) downloads a snapshot of the current data on the
performance page. To import a performance snapshot, you can drag and drop the
snapshot into DevTools from any page. **Note that DevTools only
supports importing files that were originally exported from DevTools.**

DevTools 支持导入和导出时间线快照。单击 export 按钮
(帧渲染图表右上角) 下载当前时间线的快照。
要导入时间线快照，可以从任何页面拖放快照到 DevTools。
提示：DevTools 仅支持导入 DevTools 导出的源文件。

[generate timeline events]: {{site.developers}}/web/tools/chrome-devtools/evaluate-performance/performance-reference
[GPU graph]: {{site.url}}/perf/ui-performance#identifying-problems-in-the-gpu-graph
[Flutter performance profiling]: {{site.url}}/perf/ui-performance
[Reduce shader compilation jank on mobile]: {{site.url}}/perf/shader
[Import and export]: #import-and-export
