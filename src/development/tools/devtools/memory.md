---
title: Using the Memory view
title: 使用内存视图 (Memory view)
description: Learn how to use the DevTools memory view.
description: 学习如何使用开发者工具的内容视图。
tags: Flutter开发工具,DevTools
keywords: 开发者工具,内存视图,Dart
---

## What is it?

## 这是什么？

Allocated Dart objects created using a class constructor (for
example, by using `new MyClass()` or `MyClass()`) live in a
portion of memory called the heap. The memory in the heap is
managed by the Dart VM (virtual machine).

使用类构造函数创建的 Dart 对象（例如，使用 `new MyClass()` 或 `MyClass()`）
会被分配在称为 **堆** 的内存区域中。堆中的内存由 Dart VM（虚拟机）管理。

## DevTools memory page

## DevTools 内存分析页面

The DevTools Memory page lets you peek at how an isolate is using
memory at a given moment. 

你可以在 DevTools 中的内存分析页面观察在给定的时段内 isolate 在怎样使用内存。

Memory profiling in DevTools consists of 3 main functions:

DevTools 中的内存分析包括 3 个主要功能：

* Charting memory usage statistics and events

  绘制内存使用统计数据和事件图表

* Analysis to view all memory via a heap to detect memory issues
  and inspect objects

  通过查看堆中的所有内存，来检测内存问题和检查对象

* Monitoring and tracking allocations and
  their stack traces for selected classes.

  分配时监控和跟踪（堆栈跟踪）特定类和对象的分配

{{site.alert.note}}

  **Use [profile mode][] when running your app
  to analyze performance.** Memory usage is not
  indicative of release performance unless your
  application is run in profile mode.
  In general, memory usage is fairly accurate,
  (in relative terms), between debug, release,
  and profile modes. Profile mode might show higher
  absolute memory usage because a service isolate
  is created to profile your application.
  This isolate won't exist in release mode.
  Absolute memory used might also be higher in
  debug versus release mode. In [release mode][],
  work can be computed and optimized ahead of time,
  while in [debug mode][] that same work might have
  to be computed at runtime, requiring more information.

  **分析应用性能时请使用 [性能模式][profile mode]。**
  内存使用情况仅在应用程序运行在性能模式下有代表性。
  一般来说，内存使用在调试、生产和性能文件模式之间都是相当准确的（相对而言）。
  性能模式下可能会展现更高的内存占用，
  因为应用创建了一个单独的服务 isolate 测算性能指标。
  在生产模式下，服务 isolate 不会存在。
  内存使用量在调试模式下也会比生产模式高。
  在 [生产模式][release mode] 中，工作流以 AOT 方式被处理，
  而 [调试模式][debug mode] 中部分工作流需要在运行时计算，
  从而需要更多的信息进行处理。

{{site.alert.end}}

## Charting memory statistics and events

## 绘制内存统计信息和事件图表

At the top-level, when the **Memory** tab is selected,
memory statistics from the VM are collected and displayed
in the two overview charts (Dart memory and Android only).
The collected statistics include general memory usage,
such as total heap used, external heap size,
maximum heap capacity, and Resident Set Size (RSS).
As you interact with your application,
various events are detected and collected in the same timeline
as the memory statistics, such as memory GC (garabage collection),
Flutter events, and user-fired events
(using the `dart:developer` package).
All of these collected statistics and events
are displayed in charts.
For more information, see [Memory anatomy](#memory-anatomy).

当选中顶部 tab 中的 **Memory（内存）**选项时，
DevTools 将收集来自 VM 的内存统计数据。
这些统计数据显示在两个概览图（Dart 内存以及 Android 图表）中，
记录了一般内存的使用情况，
例如使用的总堆、外部堆、最大堆容量、常驻集大小（RSS）。
当你与应用程序交互时，会触发各种事件，
例如内存 GC（垃圾回收）、Flutter 事件、用户触发的事件
（使用 `dart:developer` 包）与内存统计数据会被记录在同一时间线中。
所有这些收集的统计数据和事件都显示在图表中，详见 [内存剖析](#memory-anatomy)。

## Analysis and snapshots

## 分析和快照

A snapshot is a complete view of
all objects in the Dart memory heap.
Each time a snapshot is taken, a complex
and time consuming analysis
is performed over the collected memory data.
The memory profiler attempts to identify any memory patterns
that might cause leaks or lead to application crashes.
For example, loading large assets for images displayed
as thumbnails&mdash;memory usage can be improved by loading smaller
assets or adjusting the `cacheWidth` and `cacheHeight`
to decode an image to a smaller size.
This reduces the memory burden on the `ImageCache`.
For more information, see [Analysis tab](#analysis-tab).

快照是 Dart 内存堆中所有对象最复杂和最耗时的完整视图。
每次保存快照时，都会对收集的内存数据进行分析。
该分析会尝试识别任何可能导致应用程序内存泄漏或崩溃的内存模式。
例如，为缩略图大小的图片加载大型资源是低效的，
可以通过加载较小的资源或调整 cacheWidth/cacheHeight，
减小图片的解码大小，降低 ImageCache 的内存使用，以此提高内存使用率。
你可以在 [Analysis 选项](#analysis-tab) 中查看分析捕捉到的问题。

## Allocations and tracking

## 分配和跟踪

Monitoring all allocations involves directly interacting
with DevTools and your application for a specific period
of time; this tells you how many objects and bytes were
allocated in that timeframe, as well as tracking
all of the places in your code where a particular
class was allocated.
This information is available under the **Allocations**
tab of the Memory profiler and is a fairly fast computation
with less overhead than using a snapshot.

在你感兴趣的时间周期内，监控所有直接与 DevTools 或应用程序交互时涉及到的内存分配。
你可以了解分配了多少对象、多少字节，或者跟踪代码中特定类的所有分配位置。
此信息可在内存分析页面的 **Allocations（分配）** 选项下查看，
与使用快照相比，它的速度相当快，开销也更小。

Monitoring allocations and resetting accumulators
helps to analyze the accumulator counts (the number of
objects or bytes allocated), in a short timeframe.
If you suspect that your application is leaking memory,
or has other bugs relating to memory allocation,
use the accumulators to understand the rate
of allocation. Additionally, you can track
allocations of a few specific classes.
This feature isolates the exact location in your
code when memory is allocated.
For more information, see [Allocation tab](#allocation-tab).

监控分配和重置累计数据，有助于在点击重置和监视跟踪之间的短时间内分析累计数据（分配的对象数或字节数）。
如果你怀疑应用程序发生了内存泄漏或存在与内存分配相关的其他错误，累计数据可以帮助你了解内存分配的速率。
此外，跟踪几个特定类的能力，可能会减慢应用程序的运行。VM 在调用类的构造函数（分配）时记录堆栈跟踪。
可以在分配内存时找到代码中的确切位置。请参阅 [Allocation 选项](#allocation-tab)。

{{site.alert.secondary}}

  **Pro tip**: When tracking is enabled for a class,
  the VM records a stack trace for each call to the
  class constructor. Recording this stack trace
  can be expensive, so we don't recommend tracking
  too many classes at once.

  **高级提示**：当开启对某一个类的追踪时，
  VM 会记录类构造的每一次调用堆栈。
  记录这些堆栈较为消耗性能，
  所以此处不推荐同时追踪过多类。

{{site.alert.end}}

## Memory anatomy

## 内存剖析图

## 内存剖析图

A timeseries graph is used to visualize the state
of the Flutter memory at successive intervals of time.
Each data point on the chart corresponds to the timestamp
(x-axis) of measured quantities (y-axis) of the heap.
For example, usage, capacity, external, garbage
collection, and resident set size are captured.

时间序列图用于显示连续时间间隔的 Flutter 内存状态。
图表上的每个数据点表示相应时间戳（x 轴）下堆的测量值（y 轴），
例如，使用率、容量、外部内存、垃圾收集和常驻集大小。

![Screenshot of a memory anatomy page]({{site.url}}/assets/images/docs/tools/devtools/memory_chart_anatomy.png){:width="100%"}

### Events pane

### 事件窗格

The event timeline displays Dart VM and DevTools events
on a shared timeline. These events can be snapshots
(manual and auto), Dart VM GCs, user requested GCs,
or monitor and accumulator reset actions.

同一个时间轴上会显示 Dart VM 和 DevTools 事件。
这些事件包含快照（手动和自动）、Dart VM 自动 GC、手动 GC
或者监控和累计数据的重置操作。

![Screenshot of DevTools events]({{site.url}}/assets/images/docs/tools/devtools/memory_eventtimeline.png)

This chart displays DevTools events (such as manual GC, VM GC,
snapshot, monitor Allocations **Track** and **Reset** of
accumulators button clicks) in relation to the memory chart timeline.
Clicking over the markers in the **Event** timeline displays
a hover card of the time when the event occurred.
This might help identify when a memory leak has
possibly occurred in the timeline (x-axis).

此图表显示与内存图表时间线相关的 DevTools 事件
（如手动 GC、VM GC、快照、监控分配 **跟踪** 和 **重置** 累计数据按钮单击）。
点击事件时间线中的标记，将显示事件发生时间的悬浮窗。
这可能有助于判断时间轴（x 轴）中何时发生内存泄漏。

![Screenshot of the event timeline legend]({{site.url}}/assets/images/docs/tools/devtools/memory_eventtimeline_legend.png)

The following legend shows the symbol for each
DevTools event and its meaning:

下面是图例中每个 DevTools 事件的符号及其含义:

**Snapshot**  

**Snapshot (手动快照)**
![User snapshot]({{site.url}}/assets/images/docs/tools/devtools/memory_eventtimeline_snapshot.png){:width="17px"}

User initiated snapshot&mdash;all memory
information is collected and an analysis is performed.

用户主动保存的快照，可以收集所有内存信息并进行分析。

**Auto-Snapshot**  

**Auto-Snapshot (自动快照)**
![Auto snapshot]({{site.url}}/assets/images/docs/tools/devtools/memory_eventtimeline_auto_snapshot.png){:width="18px"}

DevTools initiated a snapshot after detecting
that memory has grown by 40% or more from its
last measurement. This can help to quickly detect
memory spikes in your Flutter application for later
analysis, and is the same information collected
in a manual snapshot.

当检测到内存比以前的大小增加了 40% 或更多时
DevTools 会自动保存一个快照。
可以用于快速检测 Flutter 应用程序中的内存峰值，
以供后续分析，它与手动快照中记录的内容一致。

**Track**  

**Track (跟踪)**
![Monitor]({{site.url}}/assets/images/docs/tools/devtools/memory_eventtimeline_monitor.png){:width="17px"}

Collects the current state of all active classes, the
number of instances, and the byte size of all instances.
In addition, the deltas indicate the change in the
accumulators since the last **Reset**.

收集当前所有处于活动状态的类的状态实例数和所有实例的字节大小。
此外，变化值是自上次按下 **Reset (重置)** 按钮以来累计数据的变化。

**Reset**  

**Reset (重置)**
![Reset]({{site.url}}/assets/images/docs/tools/devtools/memory_eventtimeline_reset_monitor.png){:width="18px"}

When both the instance and byte accumulators
were reset to zero.

实例和字节的累计数据都重置为零时。

**User Initiated GC**  

**User Initiated GC (用户手动 GC)**
![GC]({{site.url}}/assets/images/docs/tools/devtools/memory_eventtimeline_gc.png){:width="18px"}

User initiated request to the VM to perform a
garbage collection on memory. This is not a guarantee
that GC occured&mdash;it's only a request.

用户向 VM 请求执行内存 GC。仅向 VM 申请，不一定立刻执行。

**VM GC**  

**VM GC (VM 自动 GC)**  
![VM GC]({{site.url}}/assets/images/docs/tools/devtools/memory_eventtimeline_vmgc.png){:width="11px"}

GC (VM garbage collection) has occurred and has freed
up space that is no longer used. For more information on
how Dart performs garbage collection, see
[Don't Fear the Garbage Collector][].

VM 自动执行 GC，释放不再使用的空间。
更多 Dart 是如何执行垃圾收集的信息，
参阅 [不要担心 GC][Don't Fear the Garbage Collector]。

**User and Flutter Event**  

**User and Flutter Event (用户和 Flutter 事件)**

The dark magenta triangle displayed in the event pane indicates
that "Multiple Flutter or User Events" occurred at this timestamp.

深色三角形表示在这个时间点的「多个 Flutter 或用户事件」。

![Aggregate Events]({{site.url}}/assets/images/docs/tools/devtools/memory_multi_events.png){:width="25px"}

The lighter magenta triangle indicates that
"One Flutter or User Event" occurred at this timestamp.

浅色三角形表示在这个时间点的「一次 Flutter 或用户事件」。

![Single Events]({{site.url}}/assets/images/docs/tools/devtools/memory_one_event.png){:width="23px"}

To view the events, click on the triangle to display a hover card.
Expand the events at the bottom of the hover card
to display all events for that timestamp.

表示在此时间戳处仅收到一个事件。要查看事件，点击三角形将显示悬浮窗，
展开浮窗底部，将显示该时间戳的所有事件。

Displayed below the events pane is the [memory chart](#memory-overview-chart)
and the [Android memory chart](#android-chart). The android-memory chart is
specific to an Android app, and it shows Android ADB meminfo from an
ADB app summary.

事件窗格下方显示的是 [内存图表](#memory-overview-chart) 和 [Android 内存图表](#android-chart)。
只有 Android 应用程序才会展示，它显示了 ADB 应用程序摘要中的 Android ADB 内存信息。

### Adding user custom events to the timeline

### 添加自定义事件到时间线

Sometimes it might be difficult to correlate the
actions in your Flutter application code and the
collected memory statistics and events charted in
the **Memory** timeline chart.
To learn precisely what your app is doing to the heap,
you can inject your own events into the **Memory Profile** timeline.

有时可能很难将 Flutter 应用程序代码中的操作与内存时间线图中绘制的内存数据或者事件关联起来。
你可以将自定义的事件发送到 **内存分析** 时间线中，来了解代码中发生了什么。
这会帮助你了解应用程序在 Dart/Flutter 框架中的内存使用情况（堆）。

Post your own custom events by using the `postEvent`
method in the `dart:developer` package.
The event name must be prefixed with
**DevTools.Event_**.
For example, **DevTools.Event_**_MyEventName_

使用 dart:developer 包的 `postEvent` 方法发布你的自定义事件。
需要注意的是，事件名称的前缀必须为 **DevTools.Event_**，然后附加事件的名称。
例如 **DevTools.Event_**_MyEventName_。

To use this feature,
add the following import to your code:

使用时你需要在代码中添加下方的导入信息：

<!--skip-->
```dart
import 'dart:developer' as developer;
```

Also add a method to post custom events to the
Memory timeline:

以及将自定义事件发布到内存时间线的方法：

<!--skip-->
```dart
void devToolsPostEvent(String eventName, Map<String, Object> eventData) {
  developer.postEvent('DevTools.Event_$eventName', eventData);
}
```

To post an event from your code,
call the `devToolsPostEvent` method.
For example, in your function,
`recordLoadedImage`, you could post the
`MyImages` event to the memory timeline as follows:

要从代码中发布事件，可以调用 devToolsPostEvent。
例如，在函数 recordLoadedImage 中，
可以通过 method（recordLoadedImage）以及 param（URL）参数
将 `MyImages` 事件发布到内存（事件）时间线。

<!--skip-->
```dart
Widget recordLoadedImage(ImageChunkEvent imageChunkEvent, String imageUrl) {
 
  // Record the event in the memory event pane.
  devToolsPostEvent('MyImages', { 'method': 'recordLoadedImage', 'param': imageUrl });

  if (imageChunkEvent == null) return null;

  //...
  }
```

Clicking the aggregated event triangle in the event pane
dispays a hover card with the details of all events.
The following example displays two custom events at the
timestamp 04:36:21 with the event name `MyFirstApp`,
and the two `eventData` entries (`method` and `param`),
are displayed with their values: 

点击事件窗格中的多事件三角形，将显示包含所有事件详细信息的悬浮窗，
例如，在 04:36:21 时刻的两个自定义事件，事件名称为「MyFirstApp」，
两个字段 method 和 param 显示事件的对应值：

![Hover Card Custom Events]({{site.url}}/assets/images/docs/tools/devtools/memory_hover_events.png)

Scrolling the events displays the following:

滑动事件显示：

![Custom Events Details]({{site.url}}/assets/images/docs/tools/devtools/memory_events_detail.png)

## Memory overview chart

## 内存概览图

The memory overview chart is a timeseries graph of collected
memory statistics. It visually presents the state of the
Dart or Flutter heap and Dart's or Flutter's native memory
over time.

采集的内存数据的时间序列图，用于观察随时间变化的 Dart/Flutter 堆和本机内存的状态。

The chart's x-axis is a timeline of events (timeseries).
The data plotted in the y-axis all has a timestamp
when the data was collected. In other words,
it shows the polled state (capacity, used, external,
RSS (resident set size), and GC (garbage collection))
of the memory every 500 ms. This helps provide a live
appearance on the state of the memory as the application is running.

图表的 x 轴是事件的时间线（时间序列）。在 y 轴上绘制的数据在收集数据时都有时间戳。
换句话说，这会显示每隔 500 毫秒内存的状态（容量、已用内存、外部内存、常驻集大小和 GC）。
显示应用程序运行实时的内存状态。

Clicking the **Legend** button displays the collected
measurements and symbols and colors used to display the data.

点击图例按钮会显示采集的测量值和用于显示数据的符号或颜色。

![Screenshot of a memory anatomy page]({{site.url}}/assets/images/docs/tools/devtools/memory_chart_anatomy.png){:width="100%"}

The **Memory Size Scale** y-axis automatically adjusts to the
range of data collected in the current visible chart range.

Y 轴上 **内存大小刻度** 会自动调整到当前图表收集的数据范围内。

The quantities plotted on the y-axis are as follows:

y 轴上绘制的数据包含：

**Dart/Flutter Heap**
<br> Objects (Dart/Flutter objects) in the heap.

**Dart/Flutter Heap（Dart/Flutter 堆）**
<br> 堆中的对象 (Dart/Flutter 对象)。

**Dart/Flutter Native**
<br> Memory that is not in the Dart/Flutter heap but
  is still part of the total memory footprint.
  Objects in this memory would be native objects
  (for example, from a memory read from a file,
  or a decoded image). The native objects are exposed
  to the Dart VM from the native OS (such as Android,
  Linux, Windows, iOS) using a Dart embedder.
  The embedder creates a Dart wrapper with a finalizer,
  allowing Dart code to communicate with these native resources.
  Flutter has an embedder for Android and iOS.
  For more information, see [Dart on the Server][server]
  or [Custom Flutter Engine Embedders][embedder].

**Dart/Flutter Native（Dart/Flutter 原生对象）**
<br> 不在 Dart/Flutter 堆中，但仍然占用总内存的一部分。
  该内存中存储了原生对象（例如，文件读取或者图片解码的所占用的内存）。
  原生对象通过 Dart 嵌入层，从原生操作系统
  （如 Android、Linux、Windows、iOS）暴露给 Dart VM。
  嵌入层使用 finalizer 创建一个 Dart 包装类，允许 Dart 代码与这些原生资源通信。
  Flutter 有一个用于 Android 和 iOS 的嵌入层。更多信息，
  参阅 [服务端应用 Dart][server] 或 [自定义 Flutter 引擎嵌入层][embedder]。

**Timeline**
<br> The timestamps of all collected memory statistics
  and events at a particular point in time (timestamp).

**Timeline（时间线）**
<br> 在特定时间点采集的所有内存统计数据和事件的时间戳（时间戳）。

**Raster Cache**
<br> The size of the Flutter engine's raster cache layer(s)
  or picture(s), while performing the final rendering
  after compositing.  For more information,
  see [Flutter Architectural Overview][architecture]
  and [DevTools Performance][performance].

**Raster Cache（光栅缓存）**
<br> 合成后执行最终渲染时颤振引擎光栅缓存层或图片的光栅缓存大小。
  详情参阅 [Flutter 架构概览][architecture]
  和 [DevTools 性能视图][performance]。

**Allocated**
<br> The current capacity of the heap is typically slightly
  larger than the total size of all heap objects.

**Allocated（已分配内存）**
<br> 堆当前的容量，通常略大于所有堆对象的总大小。

**RSS - Resident Set Size**
<br> The resident set size displays the
  amount of memory for a process.
  It doesn't include memory that is swapped out.
  It includes memory from shared libraries that are
  loaded, as well as all stack and heap memory.

**RSS - Resident Set Size（常驻集）**
<br> 常驻集大小显示进程的内存量。
  包含加载的共享库中的内存，以及所有堆栈和堆内存，不包含交互的内存。

For more information, see [Dart VM internals][vm].

有关更多信息，请参阅 [Dart 虚拟机结构][vm]。

### Hover card

### 悬浮窗

Clicking a chart displays a vertical yellow line where
the click occurred on the x-axis (Timestamp).
A hover card displays the collected information:

点击图表会在 X 轴（时间戳）上显示一条垂直黄线，
同时显示带有所收集信息的悬浮窗：

![Screenshot of the basic memory chart]({{site.url}}/assets/images/docs/tools/devtools/memory_basic_chart.png)

**Memory Events**
<br> Memory Events recorded in the Event Pane.
  This includes VM GC, User Initiated GC,
  User Initiated Snapshot, Auto-Snapshot,
  Allocation Monitoring, and Reset of Accumulators

**Memory Events（内存事件）** 事件窗口中记录的内存事件，
<br> 例如虚拟机自动 GC、用户启动的 GC、用户保存的快照、自动快照、分配监控和重置累加数据。

**Dart / Flutter Memory**
<br> Displays collected data Capacity, Used, External, RSS,
  Raster Cache (pictures/layers)

**Dart / Flutter Memory（Dart / Flutter 内存）**
<br> 收集的数据容量、已用数据、外部数据、RSS、光栅缓存（图像/图层）。

**Flutter and User Events**
<br> Includes extension events,
  such as `Flutter.ImageSizesForFrame`,
  user custom events. For more information,
  see [Events](#events-pane).

**Flutter and User Events（Flutter 和自定义的事件）**
<br> 扩展事件，例如 `Flutter.ImageSizesForFrame`，
  用户自定义事件。参阅 [事件](#events-pane)。

Aggregate events, as the name implies,
collects all the events nearest a particular
timestamp (tick) and displays the events to the x-axis'
closest tick.

顾名思义，集合事件收集了最接近特定时间戳（tick）的所有事件，并将事件显示到 x 轴最近的位置。

If more than one event was collected at this timestamp,
a dark magenta triangle is displayed with the aggregate
list of events. The aggregate events collects all the events
nearest a particular timestamp (tick) and displays the events
on the x-axis near the closest tick.
Expanding an event displays the values for that event:

![Aggregate Events]({{site.url}}/assets/images/docs/tools/devtools/memory_multi_events.png){:width="25px"}

如果此时间戳处收集了多个事件，则会显示一个深色三角形，包含事件集合的列表。
集合事件收集了最接近特定时间戳 (tick) 的所有事件，并将事件显示到 x 轴最近的位置。
展开将显示每个事件的更多信息：

If only one event is collected,
a lighter magenta triangle color is
displayed with the single event values:

如果只收集了一个事件，则会显示一个浅色三角形，并显示单个事件信息：

![Single Events]({{site.url}}/assets/images/docs/tools/devtools/memory_one_event.png){:width="23px"}

If the Android memory chart is displayed,
then the collected Android data is separated
into **Dart / Flutter Memory** and
**Flutter and User Events** categories:

如果显示 Android 内存图表，则 Android 部分采集的数据将显示在
「Dart / Flutter 内存」和「Flutter 和自定义的事件」之间。例如：

![Hovercard of Android chart is visible]({{site.url}}/assets/images/docs/tools/devtools/memory_android_hovercard.png)

### Android chart

### Android 图表

When connected to an Android app,
DevTools collects Android's ADB (Android Debug Bridge)
meminfo from an ADB app summary (polled every 500 ms).
This meminfo section is most interesting at a high-level.
If you collect this info from the ADB tool,
it would similar to the following:

当连接到 Android 应用程序时，DevTools 会从 ADB 连接的应用程序摘要中（每 500 毫秒一次）
收集 Android 的 ADB（Android 调试通道）内存信息。这部分内存信息非常有趣。
如果你从 ADB 工具中采集此信息，它将是这样的：

```sh
> adb shell dumpsys meminfo io.flutter.demo.gallery -d

 App Summary
                       Pss(KB)
                       -------
           Java Heap:     5192
         Native Heap:    11992
                Code:     2132
               Stack:       60
            Graphics:    53700
       Private Other:    42800
              System:    84493
 
               TOTAL:   200369       TOTAL SWAP PSS:    82168
```

This chart is another timeseries graph of the state
of Android memory as the application is running.
The quantities plotted on the y-axis are the above values
(Java Heap, Native Heap, Code size, Stack size,
Graphics stack, System size and total).

此图表是应用程序运行时 Android 内存状态的另一个时间序列图。
上述值会被绘制到 y 轴上
（Java 堆、原生堆、代码大小、堆栈大小、图形堆栈、系统大小和总大小）。

Clicking a timestamp (x-position) displays all data points
collected for that time period:

点击时间戳（x 位置）将显示该时间段内收集的所有数据点。

![Screenshot of Android Memory Chart]({{site.url}}/assets/images/docs/tools/devtools/memory_android.png)

The hover card displays the values of all
collected Android memory data.

悬浮窗将显示所有采集到的 Android 内存数据。

**Time**  
The timestamp for the current data values
collected&mdash;see descriptions below.

**Time (时间戳)**
内存数据的采集时刻&mdash;&mdash;请参阅以下的说明。

**Total**  
The total memory in use. Total memory is comprised of
several different categories, all of which are plotted
along the y-axis. These categories are described below.

**Total (总计大小)**
已使用的总内存大小，由几类不同的内存组成，
所有类别都沿着 y 轴绘制，如下所述。

**Other**  
Other memory usage corresponds to the ‘Private Other’
field from ADB. This is memory used by the app that the
system isn't sure how to categorize. Note: The Other trace
is a combination of Other and System (shared and system
memory usage), and corresponds to ‘System’ field from ADB.

**其他 (Other)**
「其他」使用情况对应于 ADB 的「Private Other（其他私有）」部分，
这是系统不确定如何分类的内存。
注意：这一部分是「其他」和「系统」
（共享和系统内存使用- 对应 ADB 的 System（系统）部分）的组合。

**Code**  
Code memory usage corresponds to the ‘Code’ field from ADB.
This is memory that your app uses for static
code and resources, such as dex byte code,

**Code (代码)**
「代码」使用情况对应于 ADB 的 「Code（代码）」部分。
这是应用程序中静态代码和资源的内存，
如 dex 字节码、优化或编译的 dex 代码、.so 库和字体。

**Native Heap**  
Native Heap usage corresponds to the ‘Native Heap’ field
from ADB. This is memory from objects allocated from C or
C++ code. Even if you're not using C++ in your app, you might
see some native memory used here because the Android framework
uses native memory to handle various tasks on your behalf. Some
examples of these tasks are handling image assets and other
graphics&mdash;even though the code you've written is in Java or Kotlin.

**Native Heap (本地堆内存)**
「本地堆」使用情况对应于 ADB 中的 「Native Heap（本地堆）」部分。
这是从 C 或 C++ 代码分配的对象的内存。即使你的应用程序中没有使用 C++，
也可以看到本地内存的使用，因为 Android 框架使用本地内存来处理各种任务。
比如，用来处理图像资源和其他图形，即使你编写的代码是 Java 或 Kotlin。

**Java Heap**  
Java Heap usage corresponds to the ‘Java Heap’ field from ADB.
This is memory from objects allocated from Java or Kotlin code.

**Java Heap (Java 堆内存)**
「Java 堆」使用情况对应于 ADB 的「Java Heap（Java 堆）」部分。
这是 Java 或 Kotlin 代码分配的对象的内存。

**Stack**  
Stack usage corresponds to the ‘Stack’ field from ADB.
This is memory used by both native and Java stacks
in your app and usually relates to how many threads
your app is running.

**Stack (堆栈)**
「堆栈」使用情况对应于 ADB 的 「Stack（堆栈）」部分。
这是应用程序中本地和 Java 堆栈使用的内存。
通常与应用程序正在运行的线程数有关。

**Graphics**  
Graphics usage corresponds to the ‘Graphics’ field from ADB.
This is memory used for graphics buffer queues to
display pixels on the screen, including GL surfaces,
GL textures, and so on. Note: This is memory shared
with the CPU&mdash;not dedicated GPU memory.

**Graphics (图形)**
「图形」使用情况对应于 ADB 的 「Graphics（图形）」部分。
这是用于图形缓冲队列在屏幕上显示像素的内存，包括 GL 曲面、GL 纹理等。
注意：这是与 CPU 共享的内存，而不是专用的 GPU 内存。

## Memory controls

## 内存控制

At the top of the memory page, above the charts,
are several buttons and dropdowns that control
how memory data is displayed:

在内存页面顶部的图表上方，有几个按钮和下拉列表，用于控制内存数据的显示方式。

![Screenshot of a memory controls]({{site.url}}/assets/images/docs/tools/devtools/memory_controls.png){:width="100%"}

**Pause**  
Pauses the memory overview chart to allow inspecting
the currently plotted data. Incoming memory data is still received;
notice the Range selector continues to grow to the right.

**Pause (暂停)**
暂停内存概览图表的变化，可以检查已展示的数据，
但仍会接收到传入的内存数据。注意，范围选择器会继续向右增长。

**Resume**  
Resumes the memory overview chart so that it's live, displaying the
current time and the latest memory statistics.

**Resume (恢复)**
恢复内存概览图表，使其处于活动状态，
显示当前时间和最新内存统计数据。

**Clear**
Clears all collected data from the memory profiler.

**Clear (清除)**
清除内存监控中收集的所有数据。

**Display**
The duration of the x-axis. For example, if this dropdown
is set to "Display 5 minutes", memory data from the last
5 minutes is displayed.

**Display (显示范围)**
x 轴的显示区间。例如，将此下拉列表设置为「显示 5 分钟」，
则显示最近 5 分钟的内存数据。

\- Display 1 Minute  

   显示最近 1 分钟

\- Display 5 Minutes  

   显示最近 5 分钟

\- Display 10 Minutes  

   显示最近 10 分钟

\- Display All Minutes (slider disabled)

   显示所有时间 - 禁用滑动

**Source**  
Source can be either **Live Feed**, which pulls data from the
connected Flutter app, or one of the available offline data
files, which are created by clicking **Export**.

**数据来源 (Source)**
数据来源可以是 **Live Feed**（从连接的 Flutter 应用程序中获取实时数据），
也可以是通过点击 **导出** 创建的本地数据文件。

**Android Memory**  
Displays or hides the Android Memory Chart.

**Android Memory (Android 内存)**
显示或隐藏 Android 内存图表。

**GC**  
Initiates a garbage collection&mdash;a compaction of the heap.

**GC (垃圾回收)**
启动垃圾回收&mdash;&mdash;压缩堆空间。

**Export**  
Saves collected data for the Event Timeline, Memory Overview Chart,
and Android Overview Chart. Files saved are displayed under the
**Source** dropdown. Selecting a file loads the offline data.

**Export (导出)**
为事件时间线、内存概览图和 Android 概览图保存已收集的数据。
保存的文件显示在「Source（数据来源）」下拉列表中。选择文件将加载数据。

## Memory actions

## 内存相关操作

Below the memory charts (Event Timeline, Memory Overview, and Android Overview
charts), are interactive actions used to collect and analyze information about
memory usage while using the application that DevTools is connected.
Two tabs are displayed:

内存图表（事件时间线、内存概览和 Android 概览图表）下方有两个 tab,
分别用于分析和收集 DevTools 所连接到的应用程序的内存使用情况。

![Two Tabs Memory Actions]({{site.url}}/assets/images/docs/tools/devtools/memory_two_tabs.png)

### Analysis tab

### Analysis 选项

The **Analysis** tab collects memory snapshots, both user initiated and
auto-collected by DevTools (when DevTools detects memory spikes).
Each snapshot is analyzed.

**分析选项** 会收集由用户手动保存和 DevTools 检测到内存峰值时自动保存的内存快照。
每个快照都会被分析并生成分析结果。

### Analysis actions

### Analysis 选项下的操作

The actions available for Analysis are:

analysis 选项下的操作包括：

![Screenshot of a memory actions]({{site.url}}/assets/images/docs/tools/devtools/memory_analysis_actions.png)

**Snapshot**
<br> Clicking the **Snapshot** button makes a request to the
  Dart VM to collect the current state of memory. The
  memory objects can be sorted by attributes, such as class
  name, size, and allocated instances.
  For more information, see [Snapshot classes](#snapshots)).

**Snapshot（快照）**
<br> 点击 Snapshot 按钮向 Dart VM 发出请求，以保存内存当前的状态。
  内存对象可以按属性排序，如类名、大小、分配的实例（参见 [快照类](#snapshots)）。

**Treemap**
<br> If the **Treemap** switch is on, the snapshot displays currently
  active memory objects, the last snapshot, and memory in a high-level
  view as a tree map.

**Treemap（树形图）**
<br> 如果 Treemap 开关打开，
  快照将以树形图的形式在高级视图中显示当前活动的对象、
  最后一个快照和内存。（详情待定）

**Group By**
<br> A dropdown to select how data is grouped, which can either be by
  instance or by class name.

**Group By（分组方式）**
<br> 下拉列表选择数据的分组方式，可以按实例或按类名分组。

**Collapse All**
<br> Collapse all nodes in the tree table.

**Collapse All（折叠全部）**
<br> 折叠树表中的所有节点。

**Expand All**
<br> Expand all nodes in the tree table.

**Expand All（展开全部）**
<br> 展开树表中的所有节点。

### Analysis and snapshots

### 分析和快照

All analyses and snapshots are displayed in a table tree:

所有分析和快照都显示在树表视图中：

![Two Tabs Memory Actions]({{site.url}}/assets/images/docs/tools/devtools/memory_table_tree_view.png){:width="100%"}

The snapshots are grouped by library, and then by class.
Each class displays the list of known instances for that class.

快照按库分组，在库中按类分组，每个类将显示该类的已知实例列表。

A snapshot is a complete view of all memory objects
at a particular point in time. You can navigate in
the tree to a class and its instances (if the constructor
was called to create an instance). If instances exist,
expanding the class displays all live instances (objects).
Clicking an instance of a class brings up the memory inspector.

快照是特定时间点上所有内存对象的完整视图。
在树中导航到类及其实例（调用构造函数创建的实例）。
如果实例存在，扩展类将显示所有活动实例（对象）。
点击一个类的实例，将在树表的右侧显示内存的检查信息。

![Two Tabs Memory Actions]({{site.url}}/assets/images/docs/tools/devtools/memory_navigate_inspect.png){:width="100%"}

## Snapshots

## 快照

![The snapshot button]({{site.url}}/assets/images/docs/tools/devtools/memory_snapshot.png)

Clicking the **Snapshot** button shows the current state of the heap
and displays all active classes and their instances: 

点击 **Snapshot（快照）** 按钮显示堆的所有活动的类及其实例的当前状态。

![Screenshot of the snapshot classes]({{site.url}}/assets/images/docs/tools/devtools/memory_snapshot_tree.png){:width="100%"}

This pane shows classes allocated in the heap, all instances for a class,
and the ability to inspect a particular instance.

此窗口显示堆中分配的类、类的所有实例并且可以检查某个特定的实例的信息。

In addition, a snapshot can automatically occur when DevTools notices a
spike in memory usage (when detecting growth of 40% or greater).

此外，当 DevTools 检测到所用内存出现峰值（内存增长 > 40%）时，会自动生成快照。

Every snapshot, whether manual or automatic, generates an
analysis of the snapshot. For example, analysis might indicate
that image problems have occurred. In the future, other
common Flutter coding issues will be flagged, such as problems
with fonts, files, or JSON.

每个快照（手动或自动）都将生成快照的分析。例如，可能发生的组映像问题。
将来，其他可能引起内存问题的常见 Flutter 编码问题
（例如字体、文件、JSON 等）也会加入到分析中。

**Tree View of Memory**  
The tree table view displays outstanding memory events (user
requested snapshots, automatic snapshots, snapshot analyses,
memory allocation monitoring).

**Tree View of Memory (内存树视图)**
树表视图显示关键的内存事件（用户请求的快照、自动快照、快照分析、内存分配监控）。

**Memory Inspector**  
Displays either the contents of an analysis, snapshot, or
monitoring based on the currently selected row in the tree view.

**Memory Inspector (内存检查器)**
根据树状图中当前选定的行显示其分析、快照或监视的内容。

Snapshots have major tree nodes:

快照具有主要的树节点：

**External**  
Memory that is not in the Dart heap but is still part
of the total memory footprint. Objects in external memory would be
native objects (for example, from a memory read from a file,
or a decoded image). The native objects are exposed to the Dart
VM from the native OS (such as Android, Linux, Windows, iOS)
using a Dart embedder. The embedder creates a Dart wrapper with
a finalizer, allowing Dart code to communicate with these native
resources. Flutter has an embedder for Android and iOS.
For more information, see [Dart on the Server][server] or
[Custom Flutter Engine Embedders][embedder].

**External (外部内存)**
不在 Dart 堆中的内存但仍然占用总内存一部分的内存。
外部内存中的对象可以是原生对象（例如，文件读取或者图片解码的所占用的内存）。
原生对象通过 Dart 嵌入层，从原生操作系统（如 Android、Linux、Windows、iOS）暴露给 Dart VM。
嵌入层使用 finalizer 创建一个 Dart 包装类，允许 Dart 代码与这些原生资源通信。
Flutter 有一个用于 Android 和 iOS 的嵌入层。
更多信息，参阅 [服务端应用 Dart][server] 或 [自定义 Flutter 引擎嵌入层][embedder]。

**Filtered**  
Displays the packages being filtered.

**Filtered (筛选)**
筛选项中包含了筛选过的 package。

**Packages**  
User packages used by the application and
Src&mdash;the empty Dart package.

**Packages**  
应用使用的用户 package 和 Src&mdash;&mdash;空的 Dart package。

Under each node are class nodes, an aggregate of the
objects allocated to this class.
Clicking a class name displays all the instances in a class.
Clicking an instance inspects the fields and values of that
instance.

上述每个节点下都是类节点，是分配给该类的对象的集合。
点击类名将显示该类的所有实例。单击某个实例将显示其检查信息（字段和值）。

## Inspecting a class instance in a snapshot

## 检查快照中的类实例

Expanding a class displays the active instances for that class.
Clicking a particular instance displays the type and value of
the fields for that instance:

展开类将显示该类的活动的实例。点击某个特定实例将显示该实例字段的类型和值。

![Screenshot of the inspecting an instance]({{site.url}}/assets/images/docs/tools/devtools/memory_inspector.png)

## Analysis of a snapshot

## 快照分析

Every snapshot creates a corresponding **Analyzed** entry under the
**Analysis** node (the analyzed date/time corresponds to the matching
snapshot date/time):

每个快照都会在分析节点下创建相应的分析内容（分析的时间对应快照的生成时间）。

![Screenshot of a snapshot analysis]({{site.url}}/assets/images/docs/tools/devtools/memory_analysis.png)

Currently, analysis looks for common problems with images, such as
loading large files instead of scaled thumbnails, or not using a
`ListBuilder` to manage images in a list, and so on.

目前，分析查找图片的常见问题。 例如，加载大文件而不是缩放的缩略图，
没使用 ListBuilder 管理列表中的图片等。

The analysis pulls all image-related classes and instances from
a snapshot and organizes the data in one place. This saves you
the pain of having to search through all the classes and inspect the
instances to find the image-related classes.

该分析从快照中提取所有与图片相关的类和实例，并将数据组织在一个位置。
这样我们不必搜索和了解哪些类与图片相关，并检查其实例。

In the above analysis, the raw images are located in the **External**
portion of memory, as `_Int32List` (or `_Int64List` for newer phones).
DevTools organizes the images by size into buckets. In this example,
eleven images are 10K-50K, one image is 10M-50M,
seven images are 1M-10M and four images are greater than 50M.
That's a grand total of over 500M to render thumbnail-sized
images on a phone. Obviously, this should be improved!

在上图的分析中，原始图片位于外部内存的 _Int32List
（或较新手机的 _Int64List）部分，根据实例大小分类到 Buckets 中。
可以看出，图片大小为 10K-50K 的有 11 张，
10M-50M 有 1 张，1M-10M 有 7 张，大于 50M 的有 4 张。
这个应用程序中共有超过 500M 的图片在手机上渲染为小图。

## Allocation tab

## Allocation 选项

The **Allocation** tab monitors the instances of all classes,
reporting the number of objects allocated,
and the number of bytes consumed by all objects.
The numbers are displayed in absolute totals as well
as in accumulated totals. Initially, the accumulated values
(the number of objects and their size in bytes) are
equal to the initial totals at the time of the first
monitor request. The accumulators can be reset to zero at
any time such that the next monitor request returns the
accumlated values since the last reset.

**Allocation** 选项可以监控所有类的实例，
报告分配的对象数和所有对象消耗的字节数。
数字以绝对总数和累计总数显示。
一开始，累计数据（对象数量和字节大小）
等于第一次发起监控请求时的初始总数。
可以随时将累计数据重置为零，
这样下次监控请求将返回自上次重置以来的累计值。

Additionally, a small set of classes can track the allocation of each instance
of a class. The tracking captures a stack trace when the constructor was
called. The overhead to track these allocations is expensive (slow)
therefore tracking should be used sparingly.

此外，一小组类可以跟踪类的每个实例的内存分配。
调用构造函数时，监控器可以捕获到对应的堆栈。
但跟踪这些分配性能代价很大（缓慢的），因此不要频繁使用跟踪。

### Allocation actions

### 内存分配操作

You can perform the following Allocation actions:

你可以进行如下的内存分配操作:

![Screenshot of a memory actions]({{site.url}}/assets/images/docs/tools/devtools/memory_allocations_actions.png){:width="100%"}

**Track**  
Records and monitors the number of instances
and size of all instances in bytes. Clicking
the **Track** button populates a table with
instance allocation data. For each instance in
the allocation table, the **Delta** column reflects
the number of memory allocations since the last reset.

**Track (跟踪)**
记录和监控所有实例的数量和大小（以字节为单位）。
点击「Track（跟踪）」按钮，实例分配数据会显示在下方的表格中。对于表中的每个实例，
「Delta（增加量）」列表示自上次重置数据以来内存的分配大小。

**Reset**  
Resets the accumulator counts (**Delta** columns) for each
instance in the allocation table. The next time the **Monitor**
button is pressed, the **Delta** columns populate with
the new instances and sizes since the last reset.

**Reset (重置)**
重置表中每个实例的累计数据（增加量列）。
下次按下 **Monitor（监控）** 按钮时，
增加量列将显示自上次重置以来新分配的实例和所占空间。

**Search**  
The **Search** field is enabled when the instance allocation data
exists. Typing, or selecting a name from the dropdown,
navigates to that class name in the table.

**Search (搜索)**
搜索功能 **Search** 会存在实例分配数据时可用。
输入或从下拉列表中选择名称将跳转到表中对应的类。

**Filter**  
When clicked, displays a dialog box listing libraries and class names
that you can select.

**Filter (筛选)**
点击时弹出一个包含所有已展示的库和类名的对话框。

### Allocation view

### 分配视图

Allocations are displayed in a table view that lists the
classes available to the connected application:

已连接的应用程序中所有可用的类的分配信息会显示表中：

![Two Tabs Memory Actions]({{site.url}}/assets/images/docs/tools/devtools/memory_allocations_overview.png){:width="100%"}

Each row displays the class name, the number of instances and bytes
allocated, with deltas for each (the count since the last reset).

每行显示类名、实例数和对应分配的增加（自上次重置以来的累计数据）的字节数。

**Track with Stack Trace**  
If enabled, records the stack trace when the instance
is created (when the class constructor is called).

**Track with Stack Trace (堆栈跟踪)**
如果启用，则在调用类构造函数创建实例时记录堆栈。

**Class Name**  
Class allocations monitored.

**Class Name (类名)**
监控的类名

**Total Instances**  
Total number of active instances for the class.

**Total Instances (实例总计数量)**
类活动实例总数。

**Delta Instances**  
An accumulator indicating a change to the instance count.
When **Reset** is pressed, the accumulators reset to zero;
then each time the **Track** button is pressed,
the data in the table is updated.

**Delta Instances (实例的增加数量)**
由重置按钮控制的实例累计数据。
当按下 **Reset（重置）** 时，累计数据重置为零，
然后每次按下 **Track（跟踪）** 按钮时，当前总计和增加数量都会更新。

**Total Bytes**  
Total number of bytes allocated to all instances of the class.

**总字节数 (Total Bytes)**
为类的所有实例分配的总字节数。

**Delta Bytes**  
An accumulator indicating a change to the number of
instance bytes created. When **Reset** is pressed,
the accumulators reset to zero; then each time the
**Track** button is pressed, the data in the table
is updated.

**Delta Bytes (增加的字节数)**
由重置按钮控制的实例字节变化累计数据。
当按下 **Reset（重置）** 时，累计数据重置为零，
然后每次按下 **Track（跟踪）** 按钮时，当前总计和增加数量都会更新。

**Timestamp of Last Track**  
The timestamp when the **Track** button was pressed.

**Timestamp of Last Track (上一次启用跟踪的时间)**
按下 **Track（跟踪）** 按钮的时间。

**Change Bubble**  
A small bubble indicating that data in the table has
been updated.

**Change Bubble (更改气泡)**
小气泡，表示已经在表中记录并更新的更改。

For more information, see [Allocation tracking](#allocation-tracking).

更多信息，请参阅 [分配跟踪](#allocation-tracking)。

### Managing the objects and statistics in the heap (Monitor Allocations)

### 管理堆中的对象和统计数据（分配监控）

This feature can help you find memory leaks. Here are some of the
available buttons:

该功能可以帮助你找到内存泄露。
以下是一些可用的按钮：

![The Monitor Allocations button]({{site.url}}/assets/images/docs/tools/devtools/memory_monitor_allocations.png)

Clicking the allocation **Track** button monitors the total
number of instances and bytes allocated for a class.
In addition, two accumulators are provided for instances and bytes
allocated. You can reset these values to zero by pressing
the **Reset Accumulators** button. The mechanism is useful
for finding memory leaks.

点击「Track（跟踪）」按钮可以监控类分配的实例总数和字节总数。
此外，为实例的分配维护两个累计数据（总计数量和增加数量），用户可以通过操作（按下重置按钮）重置为零。
该机制对于查找内存泄漏非常有用。

![Reset Accumulators button]({{site.url}}/assets/images/docs/tools/devtools/memory_reset.png)

Pressing the **Reset** button resets the accumulators for all classes
to zero and a "monitor reset" event is sent to the
Event Timeline. Clicking the **Reset** button again resets both
accumulators to zero.

按下 **Reset（重置）** 按钮时，所有类别的累计数据都会重置为零。当发生重置时，
事件时间线上会出现「监控重置」事件。再次点击 **Reset（重置）** 按钮将两个累计数据重置为零。

**Classes**  
Active classes in the heap.

**Classes (类)**
堆中的活动的类。

**Instances column**  
Total active objects (instances) for all classes in the heap.

**Instances column (实例列)**
堆中所有类的活动对象（实例）总数。

**Delta column**  
Total number of instances since last **Reset** was pressed.
Clicking the **Reset** button initializes the accumulated
(Delta) instances of a class. This is useful for finding memory leaks.

**Delta column (数量增加列)**
自上次按下「Reset（重置）」后所有实例的累计数量。
点击重置按钮重置类实例的累计数量。这对于查找内存泄漏非常有用。

**Bytes column**  
Total bytes consumed for all instances of a class in the heap.

**Bytes column (字节列)**
堆中类的所有实例的总字节数。

**Delta column**  
The number of bytes allocated since the **Reset** was last pressed.
Clicking the **Reset** button initializes the accumulated (Delta) bytes for
all instances of a class. This is useful for finding memory leaks.

**Delta column (字节增加列)**
自上次按下「Reset（重置）」后所有实例的累计字节数。
点击重置按钮重置类实例的累计字节数。这对于查找内存泄漏非常有用。

## Allocation tracking

## 分配跟踪

In addition to tracking the number of objects and bytes consumed
for all instances of a class, a stack trace can be recorded when a
class's constructor is called. This can help narrow where allocations
might have gone astray.
To do this, enable the **Track** checkbox for a class. For example:

除了跟踪一个类的所有实例的对象数和字节数外，还可以在调用类的构造函数时记录堆栈，
来帮助缩小分配可能出错的范围。为此，请选中类的跟踪 (**Track**) 复选框，例如：

![Enable Stack Trace Tracking]({{site.url}}/assets/images/docs/tools/devtools/memory_enable_stacktrace.png){:width="100%"}

Interact with your application. When you want to view the
instances allocation press the **Track** button again
to update the count for the instances being tracked.
For example, 118 instances of `ObjectWithUniqueId`
are being tracked in the following screenshot.
Expanding the instances tracked displays all 
instances and the timestamp when each instance was created:

在你与应用程序交互，想要查看实例分配时，再次按下「Track（跟踪）」按钮。
这将更新正在跟踪的实例的数量，例如下图中的 118。
展开跟踪的实例将显示所有实例以及创建每个实例的时间，例如：

![Class Tracking]({{site.url}}/assets/images/docs/tools/devtools/memory_tracking.png){:width="100%"}

Selecting an instance displays the call stack at the time the
class's constructor was called and the instance was allocated:

选择实例将显示调用类的构造函数（已分配）时的堆栈，例如：

![Call Stack]({{site.url}}/assets/images/docs/tools/devtools/memory_tracking_callstack.png){:width="100%"}

## Filtering, searching, and auto-complete

## 筛选、搜索和自动补全

Both the **Analysis** and **Allocations** tabs support
searching and filtering. Begin typing name of the class
you'd like to find (for example, `ObjectWithUniqueId`)
to display a list that matches the characters
typed so far. The first item in the list is highlighted:

「Analysis（分析）」和「Allocations（分配）」选项都支持搜索和筛选。
输入要查找的类的名称，例如，`ObjectWithUniqueId`
将返回与与输入字符匹配的列表。列表中的第一项高亮显示。

**ENTER**  
Selects the highlighted line (GlobalObjectKey) and
navigates to the row with that class name in the
active **Snapshot** table or the **Allocations** table.

**回车键**
选择高亮显示的行（GlobalObjectKey）
跳转到当前树表视图 **快照** 或表 **分配** 中该类名对应的行。

**UP/DOWN arrows**  
Rotates through the list of possible matches highlighting
the next item in the list.

**上/下箭头**
在可能匹配的列表中跳转，突出显示列表中的下一项。

**ESCAPE**  
Clears and cancels all searching.

**ESC 键**
清除并取消所有搜索。

![Searching]({{site.url}}/assets/images/docs/tools/devtools/memory_search_1.png)

Typing more characters to further narrow down the list of possible
class names. For example, typing **Obje** displays:

输入更多字符来缩小类名范围，例如键入 **Obje** 显示：

![Narrower Search]({{site.url}}/assets/images/docs/tools/devtools/memory_search_2.png)

Finally, typing **ObjectW** displays the exact match:

最后，输入 **ObjectW** 显示精确匹配：

![Narrowed Search]({{site.url}}/assets/images/docs/tools/devtools/memory_search_3.png)

### Filtering

### 筛选

Filtering allows you to move libraries and classes from the main list
to a **Filter** group. This help reduce the number of classes visible that are
less important while profiling memory:

筛选用于将库和类从主列表（表）移动到筛选组，帮助减少在分析内存时不太重要的可见类的数量。

![Filtering]({{site.url}}/assets/images/docs/tools/devtools/memory_filtering.png){:width="100%"}

**Hide Private Classes**  
Class names prefix with an underscore.

**Hide Private Classes (隐藏私有类)**
前缀带有下划线类的类。

**Hide Classes with No Instances**  
Classes never constructed are filtered.

**Hide Classes with No Instances (隐藏没有实例的类)**
从未构造的类将被过滤。

**Hide Libraries with No Instances**  
All classes in a library never constructed
the library is filtered.

**Hide Libraries with No Instances (隐藏没有实例的库)**  
库中所有类都从未被实例化过，将会被隐藏

**Hide Libraries or Packages**  
List of all libraries used in your application
are displayed. By default the libraries enabled
above are filtered out (for example, dart:*,
package:flutter*, and so on).
The libraries filtered out can
be enabled if you are interested in Dart core
libraries and classes or the Flutter framework.

**Hide Libraries or Packages (隐藏库或 package)**
显示应用程序中使用的所有库的列表。默认情况下启用，
系统相关库将被过滤掉（例如：`dart:*`、`package:flutter*`）。
如果你对 Dart 核心库和类或 Flutter 框架感兴趣，可以关闭自动过滤掉的库。

### Setting

### 设置

The Memory profiler has its own settings dialog:

内存分析器有自己的设置对话框：

![Settings]({{site.url}}/assets/images/docs/tools/devtools/memory_settings.png){:width="100%"}

**Collect Android Memory Statistics using ADB**  
By default, if DevTools is connected to your
application through an Android device or emulator,
Android memory statistics are not collected.
Collecting with ADB can be expensive and might hide
performance issues in your app.

**使用 ADB 收集 Android 内存统计信息**
默认情况下，如果 DevTools 通过 Android 设备或模拟器连接到应用，
则不会收集 Android 内存统计信息。
使用 ADB 收集开销很大，并且可能会隐藏应用程序中的性能问题。

**Display Data in Units (B, K, MB, GB)**  
By default, data displayed in the hover card
is scaled using units instead of raw values.
Turning this off displays the raw numbers.
For example, 125M displays as 125,235,712

**以单位（B、K、MB、GB）显示数据**
默认情况下，悬浮窗中显示的数据使用单位而不是原始值。
关闭此选项将显示原始数字，例如 125M 将显示为 125,235,712。

**Enable advanced memory settings**  
If enabled, the GC button is available to
ask the VM to garbage collect memory (manually).
This manual GC is only a request to the VM. The
VM might decide to do no compaction, some compaction,
or complete compaction of the heap.

**启用高级内存设置**
如果启用，将显示 GC 按钮，请求虚拟机（手动）垃圾收集内存。
此手动 GC 只是对虚拟机的请求。
虚拟机可能不压缩、部分压缩或完全压缩堆。

## Memory problem case study

## 内存问题案例学习

A memory leak study using large network images is available
on GitHub. You can follow the step-by-step instructions
on using the Devtools memory profiler to detect the
memory problem and fix it. For more information,
see the [memory leak case study][case_study].

使用大量网络图片导致内存泄漏的学习，以及有关使用 DevTools 内存分析器、
检测内存问题和修复问题的分步说明，请参阅 [案例研究][case_study]。

## Glossary of VM terms

## VM 虚拟机术语表

The following computer science terms will help you better
understand how your application uses memory.

以下是一些计算机科学概念，
它们将帮助你更好地理解应用程序如何使用内存。

**Garbage collection (GC)**  
GC is the process of searching the
heap to locate, and reclaim, regions of "dead" memory&mdash;memory
that is no longer being used by an application. This process
allows the memory to be re-used and minimizes the risk of an
application running out of memory, causing it to crash. Garbage
collection is performed automatically by the Dart VM. In DevTools,
you can perform garbage collection on demand by clicking the
GC button.

**垃圾回收 (GC)**
GC 是搜索堆以定位和回收应用程序不再使用的内存区域的过程。
这个过程允许重新使用内存，将应用程序由于内存不足导致的崩溃风险降至最低。
GC 由 Dart VM 自动执行。在 DevTools 中，
你可以通过点击 GC 按钮按需执行垃圾回收。

**Heap**  
Dart objects that are dynamically allocated live in a portion of
memory called _the heap_. An object allocated from the heap is freed
(eligible for garbage collection) when nothing points to it,
or when the application terminates. When nothing points to an
object, it is considered to be dead. When an object is pointed
to by another object, it is live.

**堆**
动态分配的 Dart 对象存在于称为堆的内存部分中。当没有任何对象指向它，
或者当应用程序退出时。在堆中分配的对象将被回收（符合 GC 的条件）。
当没有任何东西指向某个对象时，它不处于存活状态。
当一个对象被另一个对象指向时，它是存活的。

**Isolates**  
Dart supports concurrent execution by way of isolates,
which you can think of processes without the overhead.
Each isolate has its own memory and code that can't be
affected by any other isolate. For more information,
see [The Event Loop and Dart][event-loop].

**Isolates**  
Dart 通过 Isolates 的方式支持并发，你可以认为这样的过程没有开销。
每个 Isolates 都有自己的内存和代码，不受任何其他 Isolates 的影响。
更多信息，请参见 [事件循环和 Dart][event-loop]。

**Memory leak** 
A memory leak occurs when an object is live
(meaning that another object points to it), but it is not being
used (so it shouldn't have any references from other objects).
Such an object can't be garbage collected, so it takes up space
in the heap and contributes to memory fragmentation.
Memory leaks put unnecessary pressure on the VM and can be
difficult to debug.

**内存泄漏**
当一个对象处于存活状态（意味着有其它对象指向它），
但它没有被使用时（因此它不应该有来自其他任何对象的引用），就会发生内存泄漏。
这样的对象不能被垃圾收集，因此它会占用堆中的空间并导致内存碎片。
内存泄漏会给虚拟机带来不必要的压力，并且可能很难调试。

**Virtual machine (VM)**  
The Dart virtual machine is a piece of
software that directly executes Dart code.

**VM 虚拟机**
Dart 虚拟机是一种直接执行 Dart 代码的软件。

[architecture]: {{site.url}}/resources/architectural-overview
[performance]: {{site.url}}/development/tools/devtools/performance
[server]: https://dart-lang.github.io/server/server.html
[embedder]: {{site.repo.flutter}}/wiki/Custom-Flutter-Engine-Embedders
[vm]: https://mrale.ph/dartvm/
[event-loop]: {{site.dart-site}}/articles/archive/event-loop
[profile mode]: {{site.url}}/testing/build-modes#profile
[release mode]: {{site.url}}/testing/build-modes#release
[debug mode]: {{site.url}}/testing/build-modes#debug
[Don't Fear the Garbage Collector]: {{site.flutter-medium}}/flutter-dont-fear-the-garbage-collector-d69b3ff1ca30
[case_study]: {{site.repo.organization}}/devtools/tree/master/case_study/memory_leaks/images_1
