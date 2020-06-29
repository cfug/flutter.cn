---
title: Using the Timeline view
title: 使用时间线视图 (Timeline view)
description: Learn how to use the DevTools timeline view.
description: 学习如何在开发者工具里使用时间轴视图。
---

{{site.alert.note}}

  The timeline view works with Dart CLI and mobile apps only.
  Use Chrome DevTools to [generate timeline events][]
  for a web app.

  时间线视图适用于 Dart 命令行应用和移动应用。
  对于 web 应用程序，请使用 Chrome 的开发者工具
  [生成时间线事件][generate timeline events]。

{{site.alert.end}}


## What is it?

## 它是什么?

The timeline view offers timing and performance information for activity in your
application. It consists of three parts, each increasing in granularity.

* Flutter frames chart (Flutter apps only)

  Flutter 帧图（仅适用于 Flutter 应用） 

* Timeline events chart

  时间线事件图表
  
* CPU profiler

  CPU 分析器


{{site.alert.note}}

  **Use a profile build of your application to analyze performance.**
  Frame rendering times are not indicative of release performance
  unless your application is run in profile mode.

  **请使用 profile 构建模式进行性能分析**
  只有当你的应用程序运行在 profile 模式下，
  帧渲染时间才能与发行版本的性能保持一致。

{{site.alert.end}}

The timeline view also supports importing and exporting of
timeline data files. For more information,
see the [Import and export][] section.

时间线视图也支持导入和导出时间线数据文件。
更多信息请参考[导入和导出][Import and export] 部分。

## Flutter frames chart

## Flutter 帧图

This chart contains Flutter frame information for your application. Each bar set
in the chart represents a single Flutter frame. The bars are color-coded to
highlight the different portions of work that occur when rendering a Flutter
frame: work from the UI thread and work from the raster thread (previously known
as the GPU thread).

![Screenshot from a timeline recording]({% asset tools/devtools/timeline-flutter-frames-chart.png @path %}){:width="100%"}

Selecting a bar from this chart centers the flame chart below on the timeline
events corresponding to the selected Flutter frame. The events are highlighted
with blue brackets.

![Screenshot from a timeline recording]({% asset tools/devtools/timeline-flame-chart-selected-frame.png @path %}){:width="100%"}

更多帧详情可以通过单击一个条形框进行查看。

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

栅格化线程（也就是我们之前知道的 GPU 线程）
执行 Flutter 引擎中图形相关的代码。
这个线程通过与 GPU (图形处理单元) 通信，获取图形树并显示它。
你不能直接访问 Raster 线程或它的数据，
但如果这个线程较慢，那它肯定是由你的 Dart 代码引起的。
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

更多详细信息，请查看 [Identifying problems in the GPU graph][GPU graph]。

### Jank

### 丢帧 (Jank)

The frame rendering chart shows jank with a red overlay.
A frame is considered to be janky if it takes more than
~16 ms to complete (for 60 FPS devices). To achieve a frame rendering rate of
60 FPS (frames per second), each frame must render in
~16 ms or less. When this target is missed, you may
experience UI jank or dropped frames.

帧渲染图表使用红色图层显示帧延时。如果一帧的渲染时间超过 16ms，
则会被认为此帧是延时的，为了达到帧渲染频率到 60 FPS (每秒帧数)，
每一帧的渲染时间必须等于或少于 16 ms。
如果没有达到这个目标，你会发现 UI 不流畅或丢帧。

For more information on how to analyze your app's performance,
see [Flutter performance profiling][].

更多关于性能分析信息，请查看文档：
[Flutter 性能分析][Flutter performance profiling]。

## Timeline events chart

## 时间线事件表

The timeline events chart shows all event trace from your application.
The Flutter framework emits timeline events as it works to build frames, draw
scenes, and track other activity such as HTTP traffic. These events show up here
in the Timeline. You can also send your own Timeline events via the
dart:developer
[Timeline](https://api.flutter.dev/flutter/dart-developer/Timeline-class.html)
and [TimelineTask](https://api.flutter.dev/flutter/dart-developer/TimelineTask-class.html)
APIs.

![Screenshot of timeline events for a frame]({% asset tools/devtools/timeline-flame-chart @path %}){:width="100%"}

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

## CPU profiler

## CPU 分析器

This section shows CPU profiling information for a specific event
from the frame events chart (Build, Layout, Paint, etc).

本节用于显示从帧事件图表中选择的事件CPU相关信息。

### Profile granularity

### 分析器粒度

The default rate at which the VM collects CPU samples is 1 sample / 250 μs.
This is selected by default on the Timeline view as "Profile granularity: medium".
This rate can be modified via the selector at the top of the page. The sampling rates
for low, medium, and high granularity are 1 / 50 μs, 1 / 250 μs, and 1 / 1000 μs,
respectively. It is important to know the trade-offs of modifying this setting.

VM 收集 CPU 样本的默认速率为 1/250μs (即每 250 微秒收集一次数据)。
在时间线视图里，`Profile granularity` 的默认值为 “medium”。
可以通过页面顶部下选择器进行修改。
抽样率低、中、高粒度分别顺序对应 1/50μs、1/250μs 和 1/1000μs。
正确设定此值对性能分析非常重要。


A **higher granularity** profile has a higher sampling rate, and therefore yields
a fine-grained CPU profile with more samples. This may also impact performance of
your app since the VM is being interrupted more often to collect samples.
This also causes the VM's CPU sample buffer to overflow more quickly. The VM has
limited space where it can store CPU sample information. At a higher sampling
rate, the space fills up and begins to overflow sooner than it would have if a
lower sampling rate was used. This means that you may not have access to CPU samples
for frames in the beginning of the timeline.

**高粒度** 的配置会具有更高效的采样率，
因此单元时间内采集的 CPU 信息会更加详细且采集样例更多。
因此 VM 会被经常中断以收集样本数据，
所以这有可能会影响你的应用程序的运行或导致性能下降。
VM 中 CPU 样例数据信息的存储空间是受限制的。
相对低采样率，高采样率存储空间会被迅速填满并会出现溢出。
这意味着，你可能无法获取时间线初始阶段几帧的 CPU 采样数据。

A **lower granularity** profile has a lower sampling rate, and therefore
yields a coarse-grained CPU profile with fewer samples. However, this impacts your
app's performance less. The VM's sample buffer also fills more slowly, so you can see
CPU samples for a longer period of app run time. This means that you have a better
chance of viewing CPU samples from earlier frames in the timeline.

**低粒度** 的配置具有较低的采样率，
因此单元时间内采集的 CPU 信息会比较粗略且采集样例较少。
当然，这样也会对你的应用程序性能影响更小。
VM 示例缓冲区填充速度也会较慢，
因此你可以采集到相当长一段时间内应用程序的 CPU 样例数据。
这也意味着你有更好的机会去查看 CPU 时间线早期的帧样例数据。

### Flame chart

### 火焰图表

This tab of the profiler shows CPU samples for the selected frame
event (such as Layout in the following example). This chart should
be viewed as a top-down stack trace, where the top-most stack frame
calls the one below it. The width of each stack frame represents the
amount of time it consumed the CPU. Stack frames that consume a lot
of CPU time may be a good place to look for possible performance
improvements.

火焰图选项卡用于显示选中帧事件(例如在下面这个例子中的 Layout) CPU 的样本信息。
图表展示的是自上而下的调用堆栈信息，即上面的堆栈帧调用下面的堆栈帧。
每一个堆栈帧的宽度代表 CPU 执行的时长。栈帧消耗 CPU 的时间越长，
就越洽有可能是我们进行性能改进的好地方。

![Screenshot of a flame chart]({% asset tools/devtools/cpu_profiler_flame_chart.png @path %}){:width="100%"}

### Call tree

### 调用树(也叫跟踪树)

The call tree view shows the method trace for the CPU profile.
This table is a top-down representation of the profile,
meaning that a method can be expanded to show its _callees_.

调用树视图是一种自上而下展示 CPU 中的调用堆栈信息方法。
在下图中的表格中可以看出，展开其中的一个方法可以查看它所有的调用者。

<dl>
<dt markdown="1"><t><b>Total time</b></t><t>总时间</t></dt>
<dd><p>Time the method spent executing its own code as well as
    the code for its callees.</p>

<p>此方法运行的总时间，包括了调用者的执行时间(即调用此方法整个的生命周期时长)。</p></dd>
<dt markdown="1"><t><b>Self time</b></t><t>自执行时间</t></dt>
<dd><t>Time the method spent executing only its own code.</t><t>仅表示执行当前方法把花费的时长。</t></dd>
<dt markdown="1"><t><b>Method</b></t><t>方法</t></dt>
<dd><t>Name of the called method.</t><t>调用的方法名称。</t></dd>
<dt markdown="1"><t><b>Source</b></t><t>源码</t></dt>
<dd><t>File path for the method call site.</t><t>方法所在的文件路径。</t></dd>
</dl>

![Screenshot of a call tree table]({% asset tools/devtools/cpu_profiler_call_tree.png @path %}){:width="100%"}

### Bottom up

### 自下而上


The bottom up view shows the method trace for the CPU profile but,
as the name suggests, it's a bottom-up representation of the profile.
This means that each top-level method in the table is actually the
last method in the call stack for a given CPU sample (in other words,
it's the leaf node for the sample).

**Bottom up** 视图也是用于显示方法调用堆栈，
但顾名思义，它是一个自下而上的表示方式。
这意味着表格中的每个最上方的方法实际上是
给定 CPU 样本的调用堆栈中的最后一个方法
(换句话说，这是样本的叶节点)。

In this table, a method can be expanded to show its _callers_.

在这张表中，可以展开一个方法查看它的所有调用过程。

<dt markdown="1"><t><b>Total time</b></t><t>总时间</t></dt>
<dd markdown="1"><p>Time the method spent executing its own code
    as well as the code for its callee.</p>

<p>此方法运行的总时间，包括了调用者的执行时间(即调用此方法整个的生命周期时长)。</p>
</dd>

<dt markdown="1"><t><b>Self time</b></t><t>自执行时间</t></dt>
<dd markdown="1"><p>For top-level methods in the bottom-up tree
    (leaf stack frames in the profile), this is the time the
    method spent executing only its own code. For sub nodes
    (the callers in the CPU profile), this is the self time
    of the callee when being called by the caller.
    In the following example, the self time of the caller
    `createRenderObject` is equal to the self time of
    the callee `debugCheckHasDirectionality` when being called by
    the caller.</p>

<p>在自下而上调用树中对于最顶层的方法 (叶堆栈帧)，
它表示执行自己的代码所需要的时间。
对于子节点(调用者)，它表示调用者运行被调用者的时间。
在下面的这个例子中，调用者 `createRenderObject` 
的执行时间等于被调用者 `debugCheckHasDirectionality` 的执行时间。
</p>

</dd>

<dt markdown="1"><t><b>Method</b></t><t>方法</t></dt>
<dd markdown="1"><t>Name of the called method.</t><t>调用方法的名称。</t></dd>

<dt markdown="1"><t><b>Source</b></t><t>源码</t></dt>
<dd markdown="1"><t>File path for the method call site.</t><t>方法所在的文件路径。</t></dd>

![Screenshot of a bottom up table]({% asset tools/devtools/cpu_profiler_bottom_up.png @path %}){:width="100%"}

## Import and export

## 导入导出

DevTools supports importing and exporting timeline snapshots.
Clicking the export button (upper-right corner above the
frame rendering chart) downloads a snapshot of the current timeline
state. To import a timeline snapshot, you can drag and drop the
snapshot into DevTools from any page. **Note that DevTools only
supports importing files that were originally exported from DevTools.**

DevTools 支持导入和导出时间线快照。
单击export按钮(帧渲染图表右上角)下载当前时间线的快照。
要导入时间线快照，可以从任何页面拖放快照到 DevTools。
**提示 : DevTools 仅支持导入 DevTools 导出的源文件。**

[generate timeline events]: https://developers.google.cn/web/tools/chrome-devtools/evaluate-performance/performance-reference
[GPU graph]: /docs/perf/rendering/ui-performance#identifying-problems-in-the-gpu-graph
[Flutter performance profiling]: /docs/perf/rendering/ui-performance
[Import and export]: #import-and-export
