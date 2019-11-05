---
title: Using the Performance view
title: 使用性能视图 (Performance view)
description: Learn how to use the DevTools performance view.
description: 学习如何使用开发者工具的性能视图。
---

{{site.alert.note}}

  The performance view works with mobile apps only.
  Use Chrome DevTools to [analyze
  performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
  of a web app.

  性能视图仅适用于移动应用。
  对于 web 应用程序，请使用 Chrome 自带的开发者工具进行 [性能分析](https://developers.google.cn/web/tools/chrome-devtools/evaluate-performance/)

{{site.alert.end}}

## What is it?

## 它是什么?

The performance view allows you to record and profile a session from your Dart application.

性能视图可以记录并分析 Dart 应用程序的性能，以帮助我们找到应用程序的性能瓶颈。

{{site.alert.note}}

  **If you are running a Flutter application, use a profile build to analyze performance.**
  Cpu profiles are not indicative of release performance unless your Flutter application is
  run in profile mode.

   **对于 Flutter 应用程序，需要使用 profile 构建模式才能使用性能分析**
   如果你希望你的 Flutter 应用程序性能与 Release 模式下相同且希望使用性能分析工具，请使用 Profile 模式。

{{site.alert.end}}

## CPU Profiler

## CPU 分析器

Start recording a CPU profile by clicking Record. When you are done recording, click Stop. At this
point, CPU profiling data is pulled from the VM and displayed in the profiler views (Call Tree,
Bottom Up, and Flame Chart).

单击 `Record` 开始进行记录 CPU 信息，完成后点击 `Stop` 停止记录，CPU 分析器会把收集的信息推送到VM并分别在不同的信息窗口进行展示调用树 (Call Tree,
Bottom Up, and Flame Chart).

### Profile granularity

### 分析粒度

The default rate at which the VM collects CPU samples is 1 sample / 250 μs.
This is selected by default on the Performance view as "Profile granularity: medium".
This rate can be modified via the selector at the top of the page. The sampling rates
for low, medium, and high granularity are 1 / 50 μs, 1 / 250 μs, and 1 / 1000 μs,
respectively. It is important to know the trade-offs of modifying this setting.

VM 收集 CPU 样本的默认速率为 1/250μs (即每 250 微秒收集一次数据)。
一般情况下，`Profile granularity`的默认值为:“medium”。
可以通过页面顶部下拉列表进行修改。抽样率低、中、高粒度分别顺序对应 1/50μs、1/250μs 和 1/1000μs。
正确设定此值对性能分析非常重要。

A **higher granularity** profile has a higher sampling rate, and therefore yields
a fine-grained CPU profile with more samples. This may also impact performance of
your app since the VM is being interrupted more often to collect samples.
This also causes the VM's CPU sample buffer to overflow more quickly. The VM has
limited space where it can store CPU sample information. At a higher sampling
rate, the space fills up and begins to overflow sooner than it would have if a
lower sampling rate was used. This means that you may not have access to CPU samples
from the beginning of the recorded profile.

**高粒度**的配置会具有更高效的采样率，因此单元时间内采集的 CPU 信息会更加详细且采集样例更多。
因些 VM 会被经常中断以收集样本数据，所以这有可能会影响你的应用程序的运行或导致性能下降。
VM 中 CPU 样例数据信息的存储空间是受限制的，所以也会导致 VM 的 CPU 示例缓冲区很快地填充满且会产生溢出。
相对低采样率，高采样率存储空间会被迅速填满并会出现溢出。一旦空间溢出，就有可能导致采样数据丢失。

A **lower granularity** profile has a lower sampling rate, and therefore
yields a coarse-grained CPU profile with fewer samples. However, this impacts your
app's performance less. The VM's sample buffer also fills more slowly, so you can see
CPU samples for a longer period of app run time. This means that you have a better
chance of viewing CPU samples from the beginning of the recorded profile.

**低粒度**的配置具有较低的采样率，因此单元时间内采集的 CPU 信息会比较粗略且采集样例较少。
当然，这样也会对你的应用程序性能影响更小。VM 示例缓冲区填充速度也会较慢，因此你可以采集到相当长一段时间内应用程序的 CPU 样例数据。这也意味着你有更好的机会去查看 CPU 样例数据。

### Flame chart

### 火焰图表

This tab of the profiler shows CPU samples for the recorded duration.
This chart should be viewed as a top-down stack trace, where the
top-most stack frame calls the one below it. The width of each stack
frame represents the amount of time it consumed the CPU. Stack frames
that consume a lot of CPU time may be a good place to look for possible
performance improvements.

火焰图选项卡主要用于显示一段持续时间内 CPU 的样本信息。
图表展示的是自上而下的调用堆栈信息，即上面的堆栈帧调用下面的堆栈帧。
每一个堆栈帧的宽度代表 CPU 执行的时长。栈帧消耗 CPU 的时间越长，就越洽有可能是我们进行性能改进的好地方。

![Screenshot of a flame chart]({% asset tools/devtools/cpu_profiler_flame_chart.png @path %}){:width="100%"}

### Call tree

### 调用树(也叫跟踪树)

The call tree view shows the method trace for the CPU profile.
This table is a top-down representation of the profile,
meaning that a method can be expanded to show its _callees_.

调用树视图是一种自上而下展示 CPU 中的调用堆栈信息方法。
在下图中的表格中可以看出，展开其中的一个方法可以查看它所有的调用者。

<dt markdown="1"><t><b>Total time</b><t><t>总时间</t></dt>
<dd><p>Time the method spent executing its own code as well as
    the code for its callees.</p>

<p>此方法运行的总时间，包括了调用者的执行时间(即调用此方法整个的生命周期时长)。</p></dd>
<dt markdown="1"><t><b>Self time</b><t><t>自执行时间</t></dt>
<dd><t>Time the method spent executing only its own code.</t><t>仅表示执行当前方法把花费的时长。</t></dd>
<dt markdown="1"><t><b>Method</b><t><t>方法</t></dt>
<dd><t>Name of the called method.</t><t>调用的方法名称。</t></dd>
<dt markdown="1"><t><b>Source</b><t><t>源码</t></dt>
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

**Bottom up** 视图也是用于显示方法调用堆栈，但顾名思义，它是一个自下而上的表示方式。
这意味着表格中的每个最上方的方法实际上是给定 CPU 样本的调用堆栈中的最后一个方法(换句话说，这是样本的叶节点)。

In this table, a method can be expanded to show its _callers_.

在这张表中，可以展开一个方法查看它的所有调用过程。

<dt markdown="1"><t><b>Total time</b><t><t>总时间</t></dt>
<dd markdown="1"><p>Time the method spent executing its own code
    as well as the code for its callee.</p>

<p>此方法运行的总时间，包括了调用者的执行时间(即调用此方法整个的生命周期时长)。</p>
</dd>

<dt markdown="1"><t><b>Self time</b><t><t>自执行时间</t></dt>
<dd markdown="1"><p>For top-level methods in the bottom-up tree
    (leaf stack frames in the profile), this is the time the
    method spent executing only its own code. For sub nodes
    (the callers in the CPU profile), this is the self time
    of the callee when being called by the caller.
    In the following example, the self time of the caller
    `Element.updateSlotForChild.visit()` is equal to the self time of
    the callee `[Stub] OneArgCheckInLineCache` when being called by
    the caller.</p>

<p>在 Bottom up 调用树中对于最顶层的方法(叶堆栈帧)，它表示执行自己的代码所需要的时间。
对于子节点(调用者)，它表示调用者运行被调用者的时间。
在下面的这个例子中，调用者 `Element.updateSlotForChild.visit()` 的执行时间等于被调用者 `[Stub] OneArgCheckInLineCache` 的执行时间。
</p>

</dd>

<dt markdown="1"><t><b>Method</b><t><t>方法</t></dt>
<dd markdown="1"><t>Name of the called method.</t><t>调用方法的名称。</t></dd>

<dt markdown="1"><t><b>Source</b><t><t>源码</t></dt>
<dd markdown="1"><t>File path for the method call site.</t><t>方法所在的文件路径。</t></dd>
</dl>

![Screenshot of a bottom up table]({% asset tools/devtools/cpu_profiler_bottom_up.png @path %}){:width="100%"}

