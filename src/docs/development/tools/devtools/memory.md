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
会被分配在称为 **堆** 的内存部分中。堆中的内存由 Dart VM（虚拟机）管理。

## DevTools memory page

## DevTools 内存分析页面

DevTools Memory page lets you peek at how an isolate is using
memory at a given moment. 

DevTools 中的内存分析页面可以让你观察在给定的时段内 isolate 是如何使用内存。

Memory profiling in DevTools consists of 3 main functions:

DevTools 中的内存分析包括 3 个主要功能：

* Charting memory usage statistics and events
  
  绘制内存使用统计数据和事件图表
  
* Anaylsis to view all memory via a heap to detect memory issues and inspect objects

  通过查看堆中的所有内存，来检测内存问题和检查对象

* Allocations to monitor and track (stack trace) specific classes and objects when an allocation occurs

  分配时监控和跟踪（堆栈跟踪）特定类和对象的分配

## Charting memory statistics and events

## 绘制内存统计信息和事件图表

At the top-level, when the memory tab is selected memory statistics from
the VM are collected. These statistics are displayed in the two overview
charts (Dart memory and Android-only) the collection of general memory
usage e.g., total heap used, external heap, maximum heap capacity,
Resident Set Size (RSS). As you interact with your application various
events are detected e.g., memory GC (garabage collection),Flutter events,
user fired events (using the ```dart:developer``` package) are collected
in the same timeline as the memory statistics. All of this collected
statistics and events are displayed in charts see [Memory anatomy](#memory-anatomy).

当选中顶部 tab 中的内存选项时，DevTools 将收集来自 VM 的内存统计数据。
这些统计数据显示在两个概览图（Dart 内存以及 Android 特有）中，
记录了一般内存的使用情况，例如使用的总堆、外部堆、最大堆容量、常驻集大小（RSS）。
当你与应用程序交互时，会触发各种事件，例如内存 GC（垃圾回收）、Flutter 事件、
用户触发的事件（使用 ```dart:developer``` 包）与内存统计数据会被记录在同一时间线中。
所有这些收集的统计数据和事件都显示在图表中，请参见 [内存剖析](#memory-anatomy)。

## Analysis and snapshots

## 分析和快照

A Snapshot is a complete, the most complex and time consuming view of
all objects in the Dart memory heap. Each time a snapshot is taken, an
analysis is performed over the collected memory data.  The analysis
attempts to identify any memory patterns that may cause leaks or lead to
application crashes. For example, loading large assets for thumbnail-sized
images inefficiently, memory usage can be improved by loading smaller
assets or adjusting the cacheWidth/cacheHeight to decode an image to a
smaller size reducing the memory usage of the ImageCache. The analysis
catches issues like this see [Analysis tab](#analysis-tab).

快照是 Dart 内存堆中所有对象最复杂和最耗时的完整视图。
每次保存快照时，都会对收集的内存数据进行分析。
该分析会尝试识别任何可能导致泄漏或导致应用程序崩溃的内存模式。
例如，为缩略图大小的图片加载大型资源是低效的，
可以通过加载较小的资源或调整 cacheWidth/cacheHeight，
减小图片的解码大小，降低 ImageCache 的内存使用，以此提高内存使用率。
该分析捕捉到问题可以在 [Analysis 选项]（#analysis-tab）查看。

## Allocations and tracking

## 分配和跟踪

Monitoring all allocations involes you directly interacting with DevTools
and your application to isolate a short period of time that you are
interested in knowing how many objects were allocated, how many bytes
were allocated, or tracking all the places in your code where a particular
class is allocated. This information is available under the "Allocations"
tab of Memory profiler and his a fairly fast with less overhead than using
a snapshot.

监控所有你直接与 DevTools 或你的应用程序交互时涉及到的内存分配，在你感兴趣的时间周期内，
可以了解分配了多少对象、分配了多少字节，或者跟踪代码中特定类的所有分配位置。
此信息可在 Memory profiler 的 **Allocations** 选项下查看，
与使用快照相比，它的速度相当快，开销也更小。

Monitoring allocations and resetting of accumulators, helps to analyze
the accumulator counts (number of objects or bytes allocated) in a short
timeframe between a reset and monitor Track events. The accumulators
can be used to understand the rate of memory allocations. If you suspect
your application is leaking memory or has other bugs relating to memory
allocation. Additionally, the ability to track a few specific classes, too
many may slow the running of your application. The VM records the stack
trace at the time a class' constructor (allocation) is called. This can
isolate the exact location in your code when/where memory is being allocated.
See [Allocation tab](#allocation-tab).

监控分配和重置累计数据，有助于在点击重置和监视跟踪之间的短时间内分析累计数据（分配的对象数或字节数）。
如果你怀疑你的应用程序发生了泄漏内存或存在与内存分配相关的其他错误，累计数据可以帮助了解内存分配的速率。
此外，跟踪几个特定类的能力，可能会减慢应用程序的运行。VM 在调用类的构造函数（分配）时记录堆栈跟踪。
可以在分配内存时找到代码中的确切位置。请参阅 [Allocation 选项](#allocation-tab)。

{{site.alert.note}}
  **Use [profile mode][] when running your app to analyze performance.**
  Memory usage is not indicative of release performance unless your
  application is run in profile mode. In general, memory usage is
  fairly accurate, in relative terms, between debug, release, or
  profile modes. Profile mode might show higher absolute memory usage
  because a service isolate is created to profile your application.
  This isolate won't exist in release mode. Absolute memory used might
  also be higher in debug versus release mode. In [release mode][],
  work can be computed and optimized ahead of time, while in [debug mode][]
  that same work might have to be computed at runtime,
  requiring more information.

  对你正在运行的应用程序进行性能分析时，请使用 **[profile 模式][profile mode]**。
  除非你的应用程序以 profile 模式运行，否则不能看做 release 版本的内存性能表现。
  一般来说，在 debug、release 和 profile 模式之间，相对而言，内存的使用是相当准确的。
  因为 profile 模式创建了 service isolate 来配置应用程序，可能会显示更高的绝对内存使用率。
  此 isolate 在 release 模式下不存在。debug 模式下使用的绝对内存也可能高于 release 模式。
  [release 模式][release mode] 可以提前运行和优化任务，而在 [debug 模式][debug mode] 中，
  同样的任务必须实时运行，这需要更多信息。

{{site.alert.end}}

## Memory anatomy

## 内存剖析图

A timeseries graph is used to visualize the state of the Flutter memory
at successive intervals of time. Each data point on the chart
corresponds to the timestamp (x-axis) of measured quantities (y-axis)
of the heap, for example, usage, capacity, external, garbage
collection, and resident set size.

时间序列图用于显示连续时间间隔的 Flutter 内存状态。
图表上的每个数据点表示相应时间戳（x 轴）下堆的测量值（y 轴），
例如，使用率、容量、外部内存、垃圾收集和常驻集大小。

![Screenshot of a memory anatomy page](/assets/images/docs/tools/devtools/memory_chart_anatomy.png){:width="100%"}

### Events Pane

### 事件窗格

The event timeline displays Dart VM and DevTools events
on a shared timeline. These events can be snapshots (manual and auto),
Dart VM GCs, user requested GCs, or monitor and accumulator reset actions.

同一个时间轴上会显示 Dart VM 和 DevTools 事件。
这些事件包含快照（手动和自动）、Dart VM 自动垃圾回收、手动垃圾回收
或者监控和累计数据的重置操作。

![Screenshot of DevTools events](/assets/images/docs/tools/devtools/memory_eventtimeline.png)

This chart displays DevTools events (such as manual GC, VM GC,
Snapshot, monitor Allocations **Track** and **Reset** of accumulators button
clicks) in relation to the memory chart timeline. Clicking over the
markers in the Event timeline displays a hover card of the time when
the event occurred. This may help identify when a memory leak might have
occurred in the timeline (x-axis).

此图表显示与内存图表时间线相关的 DevTools 事件
（如手动垃圾回收、VM 垃圾回收、快照、监控分配 **跟踪** 和 **重置** 累计数据按钮单击）。
点击事件时间线中的标记，将显示事件发生时间的悬浮窗。
这可能有助于判断时间轴（x 轴）中何时发生内存泄漏。

![Screenshot of the event timeline legend](/assets/images/docs/tools/devtools/memory_eventtimeline_legend.png)

This legend shows the symbol for each DevTools event and its meaning

下面是图例中每个 DevTools 事件的符号及其含义

<dl markdown="1">
<dt markdown="1">
<p markdown="1">**Snapshot**</p>
<p markdown="1">**Snapshot（手动快照）**</p>
</dt>
![User Snapshot](/assets/images/docs/tools/devtools/memory_eventtimeline_snapshot.png){:width="17px"}
<dd markdown="1">
<p markdown="1">User initiated snapshot&mdash;all memory 
information collected and an analysis performed.</p>
<p markdown="1">用户主动保存的快照，
可以收集所有内存信息并进行分析。</p>
</dd>
<dt markdown="1">
<p markdown="1">**Auto-Snapshot**</p>
<p markdown="1">**Auto-Snapshot（自动快照）**</p>
</dt>
![Auto Snapshot](/assets/images/docs/tools/devtools/memory_eventtimeline_auto_snapshot.png){:width="18px"}
<dd markdown="1">
<p markdown="1"> DevTools initiated a snapshot detecting
                 that memory grow by 40% or more from previous
                 size.  This is used to quickly detect memory
                 spikes in your Flutter application for later
                 analysis (same information collected in a manual
                 snapshot).</p>
<p markdown="1"> 当检测到内存比以前的大小增加了 40% 或更多时
                 DevTools 会自动保存一个快照。
                 可以用于快速检测 Flutter 应用程序中的内存峰值，
                 以供后续分析（与手动快照中收集的信息相同）。</p>
</dd>
<dt markdown="1">
<p markdown="1">**Track**</p>
<p markdown="1">**Track（跟踪）**</p>
</dt>
![Monitor](/assets/images/docs/tools/devtools/memory_eventtimeline_monitor.png){:width="17px"}
<dd markdown="1">
<p markdown="1"> Collects current state of all active classes
                 number of instances and byte size of all instances.
                 In addition, the deltas are the change in the
                 accumulators since the last "Reset" button pressed.</p>
<p markdown="1"> 收集当前所有处于活动状态的类的状态实例数和所有实例的字节大小。
                 此外，变化值是自上次按下 **Reset(重置)** 按钮以来累计数据的变化。</p>
</dd>
<dt markdown="1">
<p markdown="1">**Reset**</p>
<p markdown="1">**Reset（重置）**</p>
</dt>
![Reset](/assets/images/docs/tools/devtools/memory_eventtimeline_reset_monitor.png){:width="18px"}
<dd markdown="1">
<p markdown="1"> When both the instance and bytes accumulators
                 were reset to zero.</p>
<p markdown="1"> 实例和字节的累计数据都重置为零时。</p>
</dd>
<dt markdown="1">
<p markdown="1">**User Initiated GC**</p>
<p markdown="1">**User Initiated GC（用户手动垃圾回收）**</p>
</dt>
![GC](/assets/images/docs/tools/devtools/memory_eventtimeline_gc.png){:width="18px"}
<dd markdown="1">
<p markdown="1"> User initiated request to VM to to perform a
                 garbage collection of memory (only a suggestion
                 to the VM).</p>
<p markdown="1"> 用户向 VM 请求执行内存垃圾回收（仅向 VM 建议，不一定立刻执行）。</p>
</dd>
<dt markdown="1">
<p markdown="1">**VM GC**</p>
<p markdown="1">**VM GC（VM 自动垃圾回收）**</p>
</dt>
![VM GC](/assets/images/docs/tools/devtools/memory_eventtimeline_vmgc.png){:width="11px"}
<dd markdown="1">
<p markdown="1"> GC (VM garbage collection) has occurred, frees
                 space no longer used. For more information on
                 how Dart performs garbage collection, see
                 [Don't Fear the Garbage Collector][].</p>
<p markdown="1"> VM 自动执行垃圾回收，释放不再使用的空间。
                 更多 Dart 是如何执行垃圾收集的信息，
                 参阅 [不要要担心垃圾回收][Don't Fear the Garbage Collector]。</p>
</dd>
<dt markdown="1">
<p markdown="1">**User and Flutter Event**</p>
<p markdown="1">**User and Flutter Event（用户和 Flutter 事件）**</p>
</dt>
<dd>
<p markdown="1">Displayed as a triangle in the event pane.  The dark magenta
    triangle "Multiple Flutter or User Events"</p>
<p markdown="1">在事件窗格中显示为三角形。深色三角形表示「多个 Flutter 或用户事件」。</p>
</dd>
![Aggregate Events](/assets/images/docs/tools/devtools/memory_multi_events.png){:width="25px"}
<dd><p markdown="1">identifies more than one event was received at this timestamp.
    The lighter magenta triangle "One Flutter or User Event"</p> 
<dd><p markdown="1">标识在此时间戳接收的多个事件。浅色三角形表示「一次 Flutter 或用户事件」。</p> 
</dd>
![Single Events](/assets/images/docs/tools/devtools/memory_one_event.png){:width="23px"}
<dd><p markdown="1">indicates only one event was received at this timestamp. To
    view the events clicking on the triangle will display a hover
    card and expanding the events at the bottom of the hovercard
    will display all events for that timestamp.</p>
    <p markdown="1">表示在此时间戳处仅收到一个事件。要查看事件，单击三角形将显示悬浮窗，
                    展开浮窗底部，将显示该时间戳的所有事件。</p>
</dd>
</dl>

Displayed below the events pane is the [memory chart](#memory-overview-chart)
and the [Android memory chart](#android-chart). The android-memory chart is
specific to an Android app, and it shows Android ADB meminfo from an
ADB app summary.

事件窗格下方显示的是 [内存图表](#memory-overview-chart) 和 [Android 内存图表](#android-chart)。
只有 Android 应用程序才会展示，它显示了 ADB 应用程序摘要中的 Android ADB 内存信息。

### Adding user custom events to the timeline

### 添加自定义事件到时间线

Sometimes it may be difficult to correlate the actions in your Flutter
application code and the collected memory statistics/events charted in
the Memory timeline/chart. To help know what's happening in your code
your own events can be injected into the Memory Profile timeline to
help to understand how your application's memory usage is performing
within the Dart/Flutter framework (heap).

Posting your own custom event(s) are done using the dart:developer package
postEvent method. In particular, the event name must be prefixed with
**DevTools.Event_** then your event name would be appended e.g.,
**DevTools.Event_**_MyEventName_

To use add the following import to your code:

```
import 'dart:developer' as developer;
```

and a method to post custom event(s) to the Memory timeline:
```
  void devToolsPostEvent(String eventName, Map<String, Object> eventData) {
    developer.postEvent('DevTools.Event_$eventName', eventData);
  }
```

Then to post an event from your code you would call the devToolsPostEvent
e.g. In your function recordLoadedImage you could cause the 'MyImages'
event to be posted to the Memory (event) timeline with the values method
and param (the URL).

```
  Widget recordLoadedImage(ImageChunkEvent imageChunkEvent, String imageUrl) {
 
    // Record the event in the memory event pane.
    devToolsPostEvent('MyFirstApp', { 'method': 'recordLoadedImage', 'param': imageUrl });

    if (imageChunkEvent == null) return null;

    ...

  }
```
Clicking on the aggregated event triangle in the event pane will dispay a
hover card with the details of all events e.g., two custom events at
the timestamp 04:36:21 with the event name 'MyFirstApp' and the two
eventData entries method and param are displayed with their values: 

![Hover Card Custom Events](/assets/images/docs/tools/devtools/memory_hover_events.png)

Scrolling the events displays:

![Custom Events Details](/assets/images/docs/tools/devtools/memory_events_detail.png)

## Memory overview chart

A timeseries graph of collected memory statistics, to visualize
the state of the Dart/Flutter heap and Dart/Flutter native memory
over time.

The chart's x-axis is a timeline of events (timeseries). The data
plotted in the y-axis all have a timestamp when the data was
collected. In other words, it shows the polled state (capacity,
used, external, RSS (resident set size), and GC (garbage collection))
of the memory every 500 ms. This helps give a live appearance on
the state of the memory as the application is running.

Clicking on the Legend button describes the collected measurements
and symbols/colors used to display the data.

![Screenshot of a memory anatomy page](/assets/images/docs/tools/devtools/memory_chart_anatomy.png)

The **Memory Size Scale** Y axis scale automatically adjusts to the
range of data collected in the current visible chart range.

The quantities plotted on the y-axis are:

**Dart/Flutter Heap** Objects (Dart/Flutter objects) in the heap.

**Dart/Flutter Native** Memory that is not in the Dart/Flutter heap but
  is still part of the total memory footprint. Objects in this
  memory would be native objects (for example, from a memory read
  from a file, or a decoded image). The native objects are exposed
  to the Dart VM from the native OS (such as Android, Linux, Windows,
  iOS) using a Dart embedder. The embedder creates a Dart wrapper
  with a finalizer, allowing Dart code to communicate with these
  native resources. Flutter has an embedder for Android and iOS.
  For more information, see [Dart on the Server][server] or
  [Custom Flutter Engine Embedders][embedder].

**Timeline** The timestamps of all collected memory statistics
and events at a particular point in time (timestamp).

**Raster Cache** Size of the Flutter engine's raster cache layer(s)
or picture(s) while performing the final rendering after compositing.
See [Flutter Architectural Overview][architecture] and
[DevTools Performance][performance].

**Allocated** Current capacity of the heap is typically slightly
larger than total size of all heap objects.

**RSS - Resident Set Size** The resident set size displays the
amount of memory for a process. It doesn't include memory that is
swapped out. It includes memory from shared libraries that are
loaded, as well as all stack and heap memory.

For more information, see [Dart VM internals][vm].

### Hover card

Clicking in a chart will display a vertical yellow line where the click
occurred on the X-Axis (Timestamp), a hover card will be displayed with
the information collected:

![Screenshot of the basic memory chart](/assets/images/docs/tools/devtools/memory_basic_chart.png)

**Memory Events** Memory Events recorded in the Event Pane e.g., VM GC,
User Initiated GC, User Initiated Snapshot, Auto-Snapshot,
Allocation Monitoring and, Reset of Accumulators.

**Dart / Flutter Memory**
Collected data Capacity, Used, External, RSS, Raster Cache
(pictures/layers).

**Flutter and User Events**
Extension events e.g., Flutter.ImageSizesForFrame, user
custom events see [Events](#events-pane).

Aggregate events, as the name implies, collects all the events nearest
a particular timestamp (tick) and displays the events to the x-axis'
closest tick.

If more than one event, collected at this timestamp, a dark magenta
triangle is displayed with the aggregate list of events. The aggregate
vents collects all the events nearest a particular timestamp (tick)
and displays the events to the X-Axis closest tick. Expanding the events
will display the values for each event:
![Aggregate Events](/assets/images/docs/tools/devtools/memory_multi_events.png){:width="25px"}

If only one event is collected, a lighter magenta triangle color is
displayed with the single event values:
![Single Events](/assets/images/docs/tools/devtools/memory_one_event.png){:width="23px"}

If the Android memory chart is displayed then the Android collect data
will displayed between the "Dart / Flutter Memory" and the "Flutter and
User Events" e.g.,

![Hovercard of Android chart is visible](/assets/images/docs/tools/devtools/memory_android_hovercard.png)

### Android chart

When connected to an Android app, DevTools collects Android's ADB
(Android Debug Bridge) meminfo from an ADB app summary (polled every 500 ms).
This meminfo section is the most interesting at a high-level.  If you were
to collect this info from the ADB tool, this is what it would look like:
```
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

This chart is another timeseries graph of the state of Android memory as
the application is running. The quantities plotted on the y-axis are
the above values (Java Heap, Native Heap, Code size, Stack size,
Graphics stack, System size and total).

Clicking on a timestamp (x-position) will display all data points
collected for that time period.

![Screenshot of Android Memory Chart](/assets/images/docs/tools/devtools/memory_android.png)

The hover card will display the values of all collected Android memory data.

<dl markdown="1">
<dt markdown="1">**Time**</dt>
<dd>The timestamp for the current data values collected -
    see descriptions below.
</dd>
<dt markdown="1">**Total**</dt>
<dd>The total memory in use. Total memory is comprised of
    several different categories, all of which are plotted
    along the y-axis. These categories are described below.
</dd>
<dt markdown="1">**Other**</dt>
<dd>Other memory usage corresponds to the ‘Private Other’
    field from ADB. This is memory used by the app that the
    system isn't sure how to categorize. Note: The Other trace
    is a combination of Other and System (shared and system
    memory usage) - corresponds to ‘System’ field from ADB.
</dd>
<dt markdown="1">**Code**</dt>
<dd>Code memory usage corresponds to the ‘Code’ field from ADB.
This is memory that your app uses for static code and resources,
such as dex byte code, optimized or compiled dex code, .so libraries,
and fonts.
</dd>
<dt markdown="1">**Native Heap**</dt>
<dd>Native Heap usage corresponds to the ‘Native Heap’ field
    from ADB. This is memory from objects allocated from C or
    C++ code. Even if you're not using C++ in your app, you might
    see some native memory used here because the Android framework
    uses native memory to handle various tasks on your behalf. Some
    examples of these tasks are handling image assets and other
    graphics—even though the code you've written is in Java or Kotlin.
</dd>
<dt markdown="1">**Java Heap**</dt>
<dd>Java Heap usage corresponds to the ‘Java Heap’ field from ADB.
    This is memory from objects allocated from Java or Kotlin code.
</dd>
<dt markdown="1">**Stack**</dt>
<dd>Stack usage corresponds to the ‘Stack’ field from ADB. This is
memory used by both native and Java stacks in your app. This usually
relates to how many threads your app is running.
</dd>
<dt markdown="1">**Graphics**</dt>
<dd>Graphics usage corresponds to the ‘Graphics’ field from ADB. This
is memory used for graphics buffer queues to display pixels on the screen,
including GL surfaces, GL textures, etc. Note: This is memory shared with
the CPU—not dedicated GPU memory.
</dd>
</dl>

## Memory controls

At the top of the memory page, above the charts, are several buttons and
dropdowns that control how memory data is displayed.

![Screenshot of a memory controls](/assets/images/docs/tools/devtools/memory_controls.png){:width="100%"}

<dl markdown="1">
<dt markdown="1">**Pause**</dt>
<dd>Pause the memory overview chart to allow inspecting
    the currently plotted data. Incoming memory data is still received;
    notice the Range selector continues to grow to the right.</dd>
<dt markdown="1">**Resume**</dt>
<dd>Resume the memory overview chart so that it is live, displaying the
    current time and the latest memory statistics.</dd>
<dt markdown="1">**Clear**</dt>
<dd>Clear all collected data from the memory profiler.</dd>
<dt markdown="1">**Display**</dt>
<dd>The duration of the x-axis. For example, if this dropdown
    is set to "Display 5 minutes", memory data from the last
    5 minutes will be displayed.</dd>
<dt markdown="1">- Display 1 Minute</dt>
<dt markdown="1">- Display 5 Minutes</dt>
<dt markdown="1">- Display 10 Minutes</dt>
<dt markdown="1">- Display All Minutes (slider disabled)</dt>
<dt markdown="1">**Source**</dt>
<dd>Source can be either "Live Feed", which pulls data from the
    connected Flutter app, or one of the available offline data
    files, which are created by clicking "Export".</dd>
<dt markdown="1">**Android Memory**</dt>
<dd>Displays or hides the Android Memory Chart.</dd>
<dt markdown="1">**GC**</dt>
<dd>Initiates a garbage collection - compaction of the heap.</dd>
<dt markdown="1">**Export**</dt>
<dd>Saves collected data for Event Timeline, Memory Overview Chart
    and Android Overview Chart. Files saved are displayed under the Source
    dropdown. Selecting a file loads the offline data.</dd>
</dl>

## Memory actions

## 内存相关操作

Below the memory charts (Event Timeline, Memory Overview and Android Overview
charts) are interactive actions used to collect and analyze information about
memory usage while using the application DevTools is connected to there are two tabs:

内存图表（事件时间线、内存概览和 Android 概览图表）下方有两个 tab,
分别用于分析和收集 DevTools 所连接到的应用程序的内存使用情况。

![Two Tabs Memory Actions](/assets/images/docs/tools/devtools/memory_two_tabs.png)

### Analysis tab

### Analysis 选项

The Analysis tab collects memory snapshots both user initiated and
auto-collected by DevTools, when DevTools detects memory spikes.
Each snapshot is analyzed and an analysis is created too.

**分析选项** 会收集由用户手动保存和 DevTools 检测到内存峰值时自动保存的内存快照。
每个快照都会被分析并生成分析结果。

### Analysis actions

### Analysis 选项下的操作

The actions available for Analysis are:

analysis 选项下的操作包括：

![Screenshot of a memory actions](/assets/images/docs/tools/devtools/memory_analysis_actions.png)

**Snapshot** Clicking the Snapshot button makes a request to the
Dart VM to collect the current state of memory.  The
memory objects can be sorted by attributes such as class
name, size, allocated instances (see [Snapshot classes](#snapshots)).

**Snapshot（快照）** 点击 Snapshot 按钮向 Dart VM 发出请求，以保存内存当前的状态。
内存对象可以按属性排序，如类名、大小、分配的实例（参见 [快照类](#snapshots)）。

**Treemap（树形图）** If the Treemap switch is on the snapshot displays currently
active memory objects, the last snapshot, memory in a high-level
view as a tree map. (TBD details).

**Treemap** 如果 Treemap 开关打开，
快照将以树形图的形式在高级视图中显示当前活动的对象、最后一个快照和内存。（详情待定）

**Group By** Dropdown to select how data is grouped, which can either be by
instance or by class name.

**Group By（分组方式）** 下拉列表选择数据的分组方式，可以按实例或按类名分组。

**Collapse All** Collapse all nodes in the tree table.

**Collapse All（折叠全部）** 折叠树表中的所有节点。

**Expand All** Expand all nodes in the tree table

**Expand All（展开全部）** 展开树表中的所有节点。

### Analysis and Snapshots view

### 分析和快照视图

All Analyses and Snapshots are displayed in a Table Tree View:

所有分析和快照都显示在树表视图中：

![Two Tabs Memory Actions](/assets/images/docs/tools/devtools/memory_table_tree_view.png)

The snapshots are grouped by library and within library by class and
each class will display the list of known instances for that class.

快照按库分组，在库中按类分组，每个类将显示该类的已知实例列表。

A snapshot is a complete view of all memory objects at a particular
point in time.  Navigating, in the tree, to a class and it's instances
(if the constructor was called to create an instance).  If instances exists
expanding the class will display all live instances (objects). Clicking on
an instance, of a class, will bring up the memory inspector to the right-side
of the table tree.

快照是特定时间点上所有内存对象的完整视图。
在树中导航到类及其实例（调用构造函数创建的实例）。
如果实例存在，扩展类将显示所有活动实例（对象）。
点击一个类的实例，将在树表的右侧显示内存的检查信息。

![Two Tabs Memory Actions](/assets/images/docs/tools/devtools/memory_navigate_inspect.png)

## Snapshots

## 快照

![The Snapshot button](/assets/images/docs/tools/devtools/memory_snapshot.png)

Clicking the **Snapshot** button shows the current state of the heap with regard
to all active classes and their instances. 

点击 **Snapshot（快照）** 按钮显示堆的所有活动类及其实例的当前状态。

![Screenshot of the Snapshot classes](/assets/images/docs/tools/devtools/memory_snapshot_tree.png)

This pane shows classes allocated in the heap, all instances for a class,
and the ability to inspect a particular instance.

此窗口显示堆中分配的类、类的所有实例并且可以检查某个特定的实例的信息。

In addition, a snapshot can automatically occur when DevTools notices a
spike in memory used (growth of > 40%).

此外，当 DevTools 检测到所用内存出现峰值（内存增长 > 40%）时，会自动生成快照。

Every snapshot, manual or automatic, will generate an analysis of the snapshot
e.g., groups image problems that might have occurred. In the future, other
common Flutter coding issues e.g., Fonts, Files, JSON, etc. that could cause
memory problems will be flagged.

每个快照（手动或自动）都将生成快照的分析。例如，可能发生的组映像问题。
将来，其他可能引起内存问题的常见 Flutter 编码问题（例如字体、文件、JSON 等）也会加入到分析中。

<dl markdown="1">
<dt markdown="1">
<p markdown="1">**Tree View of Memory**</p>
<p markdown="1">**内存树视图**</p>
</dt>
<dd>
<p markdown="1">The tree table view displays outstanding memory events (user
    requested snapshots, automatic snapshots, snapshot analyses,
    memory allocation monitoring).</p>
<p markdown="1">树表视图显示关键的内存事件（用户请求的快照、自动快照、快照分析、内存分配监控）。</p>
</dd>
<dt markdown="1">
<p markdown="1">**Memory Inspector**</p>
<p markdown="1">**内存检查器**</p>
</dt>
<dd>
<p markdown="1">Display either the contents of an analysis, snapshot or
    monitoring based on the currently selected row in the tree view.</p>
<p markdown="1">根据树状图中当前选定的行显示其分析、快照或监视的内容。</p>
</dd>
</dl>

Snapshots have major tree nodes:
快照具有主要的树节点：

<dl markdown="1">
<dt markdown="1">
<p markdown="1">External</p>
<p markdown="1">External（外部内存）</p>
</dt>
<dd markdown="1">
<p markdown="1">Memory that is not in the Dart heap but is still part
    of the total memory footprint. Objects in external memory would be
    native objects (for example, from a memory read from a file,
    or a decoded image). The native objects are exposed to the Dart
    VM from the native OS (such as Android, Linux, Windows, iOS)
    using a Dart embedder. The embedder creates a Dart wrapper with
    a finalizer, allowing Dart code to communicate with these native
    resources. Flutter has an embedder for Android and iOS.
    For more information, see [Dart on the Server][server] or
    [Custom Flutter Engine Embedders][embedder].</p>
<p markdown="1"> 不在 Dart 堆中但仍然占用总内存一部分的内存。
    外部内存中的对象可以是原生对象（例如，文件读取或者图片解码的所占用的内存）。
    原生对象通过 Dart 嵌入层，从原生操作系统（如 Android、Linux、Windows、iOS）暴露给 Dart VM。
    嵌入层使用 finalizer 创建一个 Dart 包装类，允许 Dart 代码与这些原生资源通信。
    Flutter 有一个用于 Android 和 iOS 的嵌入层。
    更多信息，参阅 [服务端应用 Dart][server] 或 [自定义 Flutter 引擎嵌入层][embedder]。</p>
</dd>
<dt markdown="1">
<p markdown="1">Filtered</p>
<p markdown="1">Filtered（筛选项）</p>
</dt>
<dd>
<p markdown="1">Filter are the packages being filtered.</p>
<p markdown="1">筛选项中包含了筛选过的包。</p>
</dd>
<dt markdown="1">
<p markdown="1">Packages</p>
<p markdown="1">Packages（包）</p>
</dt>
<dd>
<p markdown="1">User packages used by the application and Src - the empty Dart package.</p>
<p markdown="1">应用程序使用的用户包和 Src — 空的 Dart 包。</p>
</dd>
</dl>

Under each of the above nodes are class nodes, an aggregate of the
objects allocated to this class. Clicking a class name displays a
list of class instances. and under each class are all the instances
of a class. Clicking on an instance will inspect the contents of that
instances (fields and values).

上述每个节点下都是类节点，是分配给该类的对象的集合。
点击类名将显示该类的所有实例。单击某个实例将显示其检查信息（字段和值）。

## Inspecting a class instance in a snapshot

## 检查快照中的类实例

Expanding a class displays the active instances for that class.
Clicking on an particular instance displays the type and value of
the fields for that instance.

展开类将显示该类的活动实例。点击某个特定实例将显示该实例字段的类型和值。

![Screenshot of the inspecting an instance](/assets/images/docs/tools/devtools/memory_inspector.png)

## Analysis of a snapshot

## 快照分析

Every snapshot creates a corresponding Analyzed entry under the
Analysis node (the Analyzed date/time corresponds to the matching
Snapshot date/time).

每个快照都会在分析节点下创建相应的分析内容（分析的时间对应快照的生成时间）。

![Screenshot of a Snapshot Analysis](/assets/images/docs/tools/devtools/memory_analysis.png)

Currently, Analysis looks for common problems with images e.g.,
loading large files instead of scaled thumbnails, not using a
ListBuilder to manage images in a list, etc.

目前，分析查找图片的常见问题。 例如，加载大文件而不是缩放的缩略图，
没使用 ListBuilder 管理列表中的图片等。

The Analysis pulls all Image related classes and instances from
a snapshot and organizes the data in one place instead of having
to search for the all the classes and inspect the instances to
understand what are just image related classes.

该分析从快照中提取所有与图片相关的类和实例，并将数据组织在一个位置。
这样我们不必搜索和了解哪些类与图片相关，并检查其实例。

In the above Analysis the raw images are located in the Externals
portion of memory _Int32List (or _Int64List for newer phones)
organizes the instances sizes into buckets.  Eleven images are
10K-50K, one image is 10M-50M, seven images are 1M-10M and four
images are greater than 50M.  For a grand total of over 500M of
this app constitute images rendered as small images on a phone.

在上图的分析中，原始图片位于外部内存的 _Int32List（或较新手机的 _Int64List）部分，根据实例大小分类到 Buckets 中。
可以看出，图片大小为 10K-50K 的有 11 张，10M-50M 有 1 张，1M-10M 有 7 张，大于 50M 的有 4 张。
这个应用程序中共有超过 500M 的图片在手机上渲染为小图。

## Allocation tab

## Allocation 选项

The Allocation tab allows monitoring the instances of all classes, reporting
the number of objects allocated and number of bytes consumed by all objects.
The numbers are displayed in absolute totals as well as accumulated totals.
Initially, the accumulated values (number of objects and size in bytes) are
equal to the initial totals at the time of the first monitor request. The
accumulators can be reset, to zero, at any time such that the next monitor
request will return the accumlated values since the last reset.

**Allocation** 选项可以监控所有类的实例，报告分配的对象数和所有对象消耗的字节数。
数字以绝对总数和累计总数显示。一开始，累计数据（对象数量和字节大小）等于第一次发起监控请求时的初始总数。
可以随时将累计数据重置为零，这样下次监控请求将返回自上次重置以来的累计值。

Additionally, a small set of classes can track the allocation of each instance
of a class. The tracking captures a stack trace when the constructor was
called. The overhead to track these allocations are expensive (slow) therefore
tracking should be used sparingly.

此外，一小组类可以跟踪类的每个实例的内存分配。
调用构造函数时，监控器可以捕获到对应的堆栈。
但跟踪这些分配性能代价很大（缓慢的），因此不要频繁使用跟踪。

### Allocation actions

![Screenshot of a memory actions](/assets/images/docs/tools/devtools/memory_allocations_actions.png)

<dl markdown="1">
<dt markdown="1">**Track**</dt>
<dd markdown="1">Records and monitors the number of instances
                 and size of all instances in bytes. Clicking
                 the "Track" button, a table will populate with
                 instance allocation data. For each instance in
                 the allocation table, The "Delta" column reflects
                 the number of memory allocations since the last reset.
</dd>
<dt markdown="1">**Reset**</dt>
<dd>Resets the accumulator counts (Delta columns) for each
    instance in the allocation table.  The next time the "Monitor"
    button is pressed, the "Delta" columns displays the populate with
    the new instances and sizes since the last reset.
</dd>
<dt markdown="1">**Search**</dt>
<dd>The search field is enabled when the instance allocation data
    exists. Typing, or selecting a name from the dropdown, will
    navigate to that class name in the table.
</dd>
<dt markdown="1">**Filter**</dt>
<dd>Display a dialog box of libraries and class names to display
   (checked on).
</dd>
</dl>

### Allocation view

Allocations are displayed in a table view of each class available to
the connected application:

![Two Tabs Memory Actions](/assets/images/docs/tools/devtools/memory_allocations_overview.png)

Each row displays the class name the number of instances and bytes
allocated with deltas (accumulators since last reset).

<dl markdown="1">
<dt markdown="1">**Track with Stack Trace**</dt>
<dd markdown="1">If enabled records the stack trace when the instance
                 is created, class constructor called.
</dd>
<dt markdown="1">**Class Name**</dt>
<dd markdown="1">Class allocations monitored.</dd>
<dt markdown="1">**Total Instances**</dt>
<dd markdown="1">Total number of active instances for the class.</dd>
<dt markdown="1">**Delta Instances**</dt>
<dd markdown="1">An accumulator of change in instance count controlled
                 by the Reset button. When Reset is pressed the accumulators
                 rest to zero then each time the Track button is pressed the
                 current totals and deltas are updated.
</dd>
<dt markdown="1">**Total Bytes**</dt>
<dd markdown="1">Total number of bytes allocated of all instances for the class.</dd>
<dt markdown="1">**Delta Bytes**</dt>
<dd markdown="1">An accumulator of change in instance bytes created controlled
                 by the Reset button. When Reset is pressed the accumulators
                 rest to zero then each time the Track button is pressed the
                 current totals and deltas are updated.
</dd>
<dt markdown="1">**Timestamp of Last Track**</dt>
<dd markdown="1">The time when the Track button was pressed.</dd>
<dt markdown="1">**Change Bubble**</dt>
<dd markdown="1">Small bubble to indicate the changes collected have been
                 collected and updated in the table.
</dd>
</dl>

For more information see [Allocation Tracking](#allocation-tracking).

### Managing the objects and statistics in the heap (Monitor Allocations)

![The Monitor Allocations button](/assets/images/docs/tools/devtools/memory_monitor_allocations.png)

Clicking the allocation **Track** button monitors the total
number of instances and total number of bytes allocated for a class.
In addition, two accumulators are maintained for instances and bytes
allocated these accumulators can be reset, to zero, by user action
(pressing the Reset Accumulators button).  The mechanism is useful
to find memory leaks.

![Reset Accumulators button](/assets/images/docs/tools/devtools/memory_reset.png)

When the **Reset** button is pressed, the accumulators for all classes
resets to zero. When reset is occurs a "monitor reset" event to the
Event Timeline.  Clicking the **Reset** button again resets both
accumulators to zero.

<dl markdown="1">
<dt markdown="1">**Classes**</dt>
<dd markdown="1">Active classes in the heap.</dd>
<dt markdown="1">**Instances column**</dt>
<dd>Total active objects (instances) for all classes in the heap</dd>
<dt markdown="1">**Delta column**</dt>
<dd>Accumulator counts of all instances since last "Reset" was pressed.
    Clicking the Reset button initializes the accumulated (Delta) instances
    of a class. This is useful for finding memory leaks.
</dd>
<dt markdown="1">**Bytes column**</dt>
<dd>Total bytes consumed for all instances of a class in the heap.</dd>
<dt markdown="1">**Delta column**</dt>
<dd>Accumulator counts bytes allocated since last "Reset" was pressed.
    Clicking the Reset button initializes the accumulated (Delta) bytes for
    all instances of a class. This is useful for finding memory leaks.
</dd>
</dl>

## Allocation tracking

In addition to tracking the number of objects and bytes consumed
for all instances of a class, a stack trace can be recorded when a
class's constructor is called to help narrow where allocations might
be astray. To do this enable the Track checkbox for a class e.g.,

![Enable Stack Trace Tracking](/assets/images/docs/tools/devtools/memory_enable_stacktrace.png)

Interact with your application then when you want to view the
instances allocation press the "Track" button again. This will
update the count for the instances being tracked e.g., 118 in the
below figure. Expanding the instances tracked will display all the
instances and timestamp when each instance was created e.g.,

![Class Tracking](/assets/images/docs/tools/devtools/memory_tracking.png)

Selecting an instance will display the call stack at the time the
class's constructor (allocated) was called e.g.,

![Call Stack](/assets/images/docs/tools/devtools/memory_tracking_callstack.png)

## Filtering, Searching and Auto-Complete

Both the Analysis and Allocations tabs support searching and filtering
Begin typing in the name of the class you'd like to find
e.g., **Ob**_ectWithUniqueId_ will return a list that matches the characters
typed so far. The first item in the list is highlighted.

Pressing a keystroke when auto-complete is visible:

<dl markdown="1">
<dt markdown="1">**ENTER**</dt>
<dd markdown="1">Selects the highlighted line (GlobalObjectKey) and
                 navigates to the row with that class name in
                 the active tree table (Snapshot) or table (Allocations).
</dd>
<dt markdown="1">**UP/DOWN arrows**</dt>
<dd markdown="1">Rotates through the list of possible matches highlighting
                 the next item in the list.
</dd>
<dt markdown="1">**ESCAPE**</dt>
<dd markdown="1">Clears and cancels all searching.
</dd>
</dl>

![Searching](/assets/images/docs/tools/devtools/memory_search_1.png)

Typing more characters would narrow down the possible class names e.g., typing
**Obje** displays:

![Narrower Search](/assets/images/docs/tools/devtools/memory_search_2.png)

Finally, typing **ObjectW** displays the exact match:

![Narrowed Search](/assets/images/docs/tools/devtools/memory_search_3.png)

### Filtering

Filtering is used to move libraries and classes from the main list (tables)
to a Filter group to help reduce the number of classes visible that are
less important while profiling memory.

![Filtering](/assets/images/docs/tools/devtools/memory_filtering.png)

<dl markdown="1">
<dt markdown="1">**Hide Private Classes**</dt>
<dd markdown="1">Class names prefix with an underscore.</dd>
<dt markdown="1">**Hide Classes with No Instances**</dt>
<dd markdown="1">Classes never constructed are filtered.</dd>
<dt markdown="1">**Hide Libraries with No Instances**</dt>
<dd markdown="1">All classes in a library never constructed
                 the library is filtered.</dd>
<dt markdown="1">**Hide Libraries or Packages**</dt>
<dd markdown="1">List of all libraries used in your application
                 are displayed. By default the libraries enabled
                 above are filtered out (dart:*, package:flutter*,
                 etc.). The libraries automatically filtered can
                 be enabled if you are interested in Dart core
                 libraries and classes or the Flutter framework.
</dd>
</dl>

### Setting

The Memory profiler has a specific settings dialog:

![Settings](/assets/images/docs/tools/devtools/memory_settings.png)

<dl markdown="1">
<dt markdown="1">**Collect Android Memory Statistics using ADB**</dt>
<dd markdown="1">By default if DevTools is connected to your
                 application via an Android device/emulator
                 then Android memory statistics are not collected.
                 Collecting with ADB can be expensive and may hide
                 performance issues in your app.
</dd>
<dt markdown="1">**Display Data in Units (B, K, MB, GB)**</dt>
<dd markdown="1">By default data displayed in the hover card
                 are scaled using units instead of raw values.
                 Turning off this will display the raw numbers
                 e.g., 125M would display as 125,235,712
</dd>
<dt markdown="1">**Enable advanced memory settings**</dt>
<dd markdown="1">If enabled, the GC button is displayed to
                 ask the VM to garbage collect memory (manually).
                 This manual GC is only a request to the VM. The
                 VM may decide to do no compaction, some compaction
                 or complete compaction of the heap.
</dd>
</dl>

## Memory problem case study
Memory leak study using large network images was added with step-by-step
instructions on using DevTools Memory profiler, detecting the memory
problem and fixing the problem, see [case study][case_study].

## Glossary of VM terms

Here are some computer science concepts that will help you better
understand how your application uses memory.

<dl markdown="1">
<dt markdown="1">**Garbage collection (GC)**</dt>
<dd>GC is the process of searching the
    heap to locate, and reclaim, regions of "dead" memory&mdash;memory
    that is no longer being used by an application. This process
    allows the memory to be re-used and minimizes the risk of an
    application running out of memory, causing it to crash. Garbage
    collection is performed automatically by the Dart VM. In DevTools,
    you can perform garbage collection on demand by clicking the
    GC button.
</dd>
<dt markdown="1">**Heap**</dt>
<dd>Dart objects that are dynamically allocated live in a portion of
    memory called the heap. An object allocated from the heap is freed
    (eligible for garbage collection) when nothing points to it,
    or when the application terminates. When nothing points to an
    object, it is considered to be dead. When an object is pointed
    to by another object, it is live.
</dd>
<dt markdown="1">**Isolates**</dt>
<dd markdown="1">Dart supports concurrent execution by way of isolates,
    which you can think of processes without the overhead.
    Each isolate has its own memory and code that can't be
    affected by any other isolate. For more information,
    see [The Event Loop and Dart][event-loop].
</dd>
<dt markdown="1">**Memory leak**</dt>
<dd>A memory leak occurs when an object is live
    (meaning that another object points to it), but it is not being
    used (so it shouldn't have any references from other objects).
    Such an object can't be garbage collected, so it takes up space
    in the heap and contributes to memory fragmentation.
    Memory leaks put unnecessary pressure on the VM and can be
    difficult to debug.
</dd>
<dt markdown="1">**Virtual machine (VM)**</dt>
<dd>The Dart virtual machine is a piece of
    software that directly executes Dart code.
</dd>
</dl>

[architecture]: https://flutter.dev/docs/resources/architectural-overview
[performance]: https://flutter.dev/docs/development/tools/devtools/performance
[server]: https://dart-lang.github.io/server/server.html
[embedder]: {{site.github}}/flutter/flutter/wiki/Custom-Flutter-Engine-Embedders
[vm]: https://mrale.ph/dartvm/
[event-loop]: {{site.dart-site}}/articles/archive/event-loop
[profile mode]: /docs/testing/build-modes#profile
[release mode]: /docs/testing/build-modes#release
[debug mode]: /docs/testing/build-modes#debug
[Don't Fear the Garbage Collector]: {{site.flutter-medium}}/flutter-dont-fear-the-garbage-collector-d69b3ff1ca30
[case_study]: {{site.github}}/flutter/devtools/tree/master/case_study/memory_leaks/images_1
