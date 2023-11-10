---
title: Using the CPU profiler view
title: 使用 CPU 探测视图
description: Learn how to use the DevTools CPU profiler view.
---

{{site.alert.note}}

  The CPU profiler view works with Dart CLI and mobile apps only.
  Use Chrome DevTools to [analyze performance][]
  of a web app.

  CPU 探测视图仅能在 Dart CLI 以及移动应用中使用。
  请使用 Chrome DevTools [测量][analyze performance] web 应用的性能。

{{site.alert.end}}

The CPU profiler view allows you to record and profile a
session from your Dart or Flutter application.
The profiler can help you solve performance problems
or generally understand your app's CPU activity.
The Dart VM collects CPU samples
(a snapshot of the CPU call stack at a single point in time)
and sends the data to DevTools for visualization.
By aggregating many CPU samples together,
the profiler can help you understand where the CPU
spends most of its time.

借助 CPU 探测视图，你可以记录并测量来自 Dart 或 Flutter 应用的会话。
探测器可以帮助你解决性能问题，或者更好地理解应用的 CPU 活动。
Dart VM 收集 CPU 样本（在单个时间点上 CPU 调用栈的快照），
并将数据发送给 DevTools 以进行可视化。
通过聚合多个 CPU 样本，探测器可以帮助你了解 CPU 的大部分时间都花在了哪里。

{{site.alert.note}}

  **If you are running a Flutter application,
  use a profile build to analyze performance.**
  CPU profiles are not indicative of release performance
  unless your Flutter application is run in profile mode.

  **如果你正在运行 Flutter 应用，请在 profile 模式下测量性能。**
  CPU 探测器无法测量 release 模式下的性能，你应该使用 profile 模式构建应用。

{{site.alert.end}}

{% include_relative _profiler.md %}

[analyze performance]: {{site.developers}}/web/tools/chrome-devtools/evaluate-performance/
  
## Other resources

## 其他资源
  
To learn how to use DevTools to analyze
the CPU usage of a compute-intensive Mandelbrot app,
check out a guided [CPU Profiler View tutorial][profiler-tutorial].
Also, learn how to analyze CPU usage when the app
uses isolates for parallel computing.

要了解如何使用 DevTools 分析计算密集型 Mandelbrot 应用的 CPU 使用情况，
请查看 [CPU 探测视图教程][profiler-tutorial]。
此外，还可以了解应用在使用隔离区进行并行计算时的 CPU 使用情况。

[profiler-tutorial]: {{site.medium}}/@fluttergems/mastering-dart-flutter-devtools-cpu-profiler-view-part-6-of-8-31e24eae6bf8
