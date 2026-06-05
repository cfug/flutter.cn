---
# title: Debug performance for web apps
title: 调试 Web 应用性能
# description: Learn how to use Chrome DevTools to debug web performance issues.
description: 学习如何使用 Chrome DevTools 调试 Web 性能问题。
ai-translated: true
---

:::note
Profiling Flutter web apps requires Flutter version 3.14 or later.

分析 Flutter Web 应用需要 Flutter 3.14 或更高版本。
:::

The Flutter framework emits timeline events as it works to build frames,
draw scenes, and track other activity such as garbage collections.
These events are exposed in the
[Chrome DevTools performance panel][] for debugging.

Flutter 框架在构建帧、绘制场景以及跟踪垃圾回收等活动时会发出 timeline 事件。这些事件会暴露在
[Chrome DevTools performance panel][]（性能面板）中，供调试使用。

:::note
For information on how to optimize web loading speed,
check out the (free) article on Medium,
[Best practices for optimizing Flutter web loading speed][article].

[article]: {{site.flutter-blog}}/best-practices-for-optimizing-flutter-web-loading-speed-7cc0df14ce5c

有关如何优化 Web 加载速度的信息，
请参阅 Medium 上的（免费）文章
[Best practices for optimizing Flutter web loading speed][article]（优化 Flutter Web 加载速度的最佳实践）。

[article]: {{site.flutter-blog}}/best-practices-for-optimizing-flutter-web-loading-speed-7cc0df14ce5c
:::

You can also emit your own timeline events using the `dart:developer`
[Timeline][] and [TimelineTask][] APIs for further performance analysis.

你还可以使用 `dart:developer` 的
[Timeline][] 和 [TimelineTask][] API 发出自定义 timeline 事件，以进行更深入的性能分析。

[Chrome DevTools performance panel]: https://developer.chrome.com/docs/devtools/performance
[Timeline]: {{site.api}}/flutter/dart-developer/Timeline-class.html
[TimelineTask]: {{site.api}}/flutter/dart-developer/TimelineTask-class.html

![Screenshot of the Chrome DevTools performance panel](/assets/images/docs/tools/devtools/chrome-devtools-performance-panel.png)

## Optional flags to enhance tracing

## 用于增强跟踪的可选标志

To configure which timeline events are tracked, set any of the following top-level properties to `true`
in your app's `main` method.

要在应用中配置跟踪哪些 timeline 事件，请在 `main` 方法中将以下任一顶层属性设为 `true`。

- [debugProfileBuildsEnabled][]: Adds `Timeline` events for every `Widget` built.

- [debugProfileBuildsEnabled][]：为每个已构建的 `Widget` 添加 `Timeline` 事件。

- [debugProfileBuildsEnabledUserWidgets][]: Adds `Timeline` events for every user-created `Widget` built.

- [debugProfileBuildsEnabledUserWidgets][]：为每个用户创建的已构建 `Widget` 添加 `Timeline` 事件。

- [debugProfileLayoutsEnabled][]: Adds `Timeline` events for every `RenderObject` layout.

- [debugProfileLayoutsEnabled][]：为每次 `RenderObject` 布局添加 `Timeline` 事件。

- [debugProfilePaintsEnabled][]: Adds `Timeline` events for every `RenderObject` painted.

- [debugProfilePaintsEnabled][]：为每次 `RenderObject` 绘制添加 `Timeline` 事件。

[debugProfileBuildsEnabled]: {{site.api}}/flutter/widgets/debugProfileBuildsEnabled.html
[debugProfileBuildsEnabledUserWidgets]: {{site.api}}/flutter/widgets/debugProfileBuildsEnabledUserWidgets.html
[debugProfileLayoutsEnabled]: {{site.api}}/flutter/rendering/debugProfileLayoutsEnabled.html
[debugProfilePaintsEnabled]: {{site.api}}/flutter/rendering/debugProfilePaintsEnabled.html

## Instructions

## 操作步骤

1. _[Optional]_ Set any desired tracing flags to true from your app's main method.

1. _[可选]_ 在应用的 `main` 方法中将所需的跟踪标志设为 true。

2. Run your Flutter web app in [profile mode][].

2. 以 [profile mode][]（profile 模式）运行 Flutter Web 应用。

3. Open up the [Chrome DevTools Performance panel][] for your application,
    and [start recording][] to capture timeline events.

3. 为应用打开 [Chrome DevTools Performance panel][]（性能面板），
    并 [start recording][]（开始录制）以捕获 timeline 事件。

[start recording]: https://developer.chrome.com/docs/devtools/performance/#record

[profile mode]: /testing/build-modes#profile
[Chrome DevTools performance panel]: https://developer.chrome.com/docs/devtools/performance
