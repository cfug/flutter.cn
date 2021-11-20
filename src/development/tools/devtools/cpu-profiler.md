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

## What is it?

## 它是什么？

The CPU profiler view allows you to record and profile a
session from your Dart or Flutter application.

CPU 探测视图能够测量并记录你的 Dart 或 Flutter 应用的片段。

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
