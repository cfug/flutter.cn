---
# title: Flutter and Dart DevTools
title: Flutter 和 Dart 的开发者工具 (DevTools) 概览
# description: How to use Flutter DevTools with Flutter.
description: 学习如何在 Flutter 里使用 Flutter 开发者工具 (DevTools)。
---

## What is DevTools?

## 开发工具 (DevTools) 是什么？

DevTools is a suite of performance and debugging tools
for Dart and Flutter.
_Flutter DevTools_ and _Dart DevTools_ refer to the
same set of tools.

开发工具 (DevTools) 是一套 Dart 和 Flutter 的性能调试工具。
**Flutter DevTools** 和 **Dart DevTools** 是同一套工具。

![Dart DevTools Screens](/assets/images/docs/tools/devtools/dart-devtools.webp){:width="100%"}

For a video introduction to DevTools, check out
the following deep dive and use-case walkthrough:

请查看以下视频，来深入探究和演示开发工具 (DevTools)：

{% ytEmbed '_EYk-E29edo', 'Dive in to Flutter and Dart DevTools' %}

## What can I do with DevTools?

## 我可以用开发工具来做什么？

Here are some of the things you can do with DevTools:

下面列出了一些可以用开发工具来实现的操作：

* Inspect the UI layout and state of a Flutter app.

  检查 Flutter 应用程序的 UI 组件布局和状态；

* Diagnose UI jank performance issues in a Flutter app.

  在 Flutter 应用程序中诊断 UI 性能过低的问题；
  
* CPU profiling for a Flutter or Dart app.

  Flutter 和 Dart 应用的 CPU 性能检测；

* Network profiling for a Flutter app.

  为 Flutter 应用进行网络性能检测；

* Source-level debugging of a Flutter or Dart app.

  为 Flutter 或 Dart 应用进行源码级的调试；

* Debug memory issues in a Flutter or Dart
  command-line app.

  在 Flutter 或 Dart 命令行应用中测试内存问题；

* View general log and diagnostics information
  about a running Flutter or Dart
  command-line app.

  查看正在运行的 Flutter 或 Dart 的命令行应用程序相关的常规日志和诊断信息。

* Analyze code and app size.

  分析代码和应用的大小

* Validate deep links in your Android or iOS app.

  验证 Android 或 iOS 应用中的深层链接 (Deep Link)。

We expect you to use DevTools in conjunction with
your existing IDE or command-line based development workflow.

我们希望你将开发工具与现有的 IDE 或基于命令行的开发流程结合起来使用。

<a id="how-do-i-install-devtools"></a>
<a id="install-devtools"></a>

## How to launch DevTools {:#start}

## 如何启动开发工具 (DevTools)

You can launch DevTools with the following tools:

你可以使用以下工具启动开发工具 (DevTools)：

* [VS Code][]
* [Android Studio/IntelliJ][]
* [command line][]

  [命令行][command line]

## Troubleshooting some standard issues

## 一些常见问题的解决方案

**Question**: My app looks janky or stutters.
  How do I fix it?

**问题**: 我的应用程序看起来很卡顿或者有明显的延迟，
我该如何解决？

**Answer**: Performance issues can cause [UI frames][]
  to be janky and/or slow down some operations.

**解决方案**: 性能问题可能会导致 [UI frames][] 卡顿，
或者导致某些操作变慢。

  1. To detect which code impacts concrete late frames,
     start at [Performance > Timeline][].

     从 [性能 > 时间轴][Performance > Timeline] 开始，
     检测哪些代码影响了具体的延迟帧。

  2. To learn which code takes the most CPU time in
     the background, use the [CPU profiler][].

     使用 [CPU profiler][] 来观察和学习
     哪些代码在后台占用了大量的 CPU 时间。

For more information, check out the
[Performance][] page.

更多信息，请查阅 [性能][Performance] 页面。

**Question**: I see a lot of garbage collection (GC) events occurring.
  Is this a problem?

**问题**: 我看到了很多垃圾回收 (GC) 事件的发生，
这是一个问题吗？

**Answer**: Frequent GC events might display on
  the DevTools > Memory > Memory chart. In most cases,
  it's not a problem.

**解决方案**: 在开发工具 > 内存 > 内存图表中，
频繁的 GC 事件可能会显示出来。在大多数情况下，
这个问题不大。

If your app has frequent background activity with some idle time,
Flutter might use that opportunity to collect the created objects
without performance impact.

如果你的应用有频繁的后台活动和一些空闲时间，
Flutter 可能会利用这个机会来收集创建的对象，而不会影响性能。

[CPU profiler]: /tools/devtools/cpu-profiler
[Performance]: /perf
[Performance > Timeline]: /tools/devtools/performance#timeline-events-tab
[UI frames]: /perf/ui-performance

## Providing feedback

## 提交反馈

Please give DevTools a try, provide feedback, and file issues
in the [DevTools issue tracker][]. Thanks!

请在 [开发者工具 issue 追踪器][DevTools issue tracker] 中尝试使用开发工具，并提交反馈和文件 issue。

## DevTools versioning

## DevTools 版本

DevTools is distributed as part of the Flutter SDK. To get access to the latest
DevTools functionality, run `flutter upgrade` to get the most up-to-date version
of Flutter. To access DevTools features before they hit the Flutter `stable`
channel, consider switching to the `beta` or `main` channels.

DevTools 是 Flutter SDK 的一部分。
要访问最新稳定的 DevTools 功能，请运行 `flutter upgrade` 来获取 Flutter 的最新版本。
要访问最新但还未进入 Flutter `stable` 渠道的 DevTools 功能，
请考虑切换到 `beta` 或 `main` 渠道。

## Other resources

## 其他资源

For more information on debugging and profiling
Flutter apps, see the [Debugging][] page and,
in particular, its list of [other resources][].

关于调试、分析 Flutter 应用程序的更多详细，
请查阅 [调试][Debugging] 页面，尤其是
[其他资源][other resources] 列表。

For more information on using DevTools with
Dart command-line apps, see the
[DevTools documentation on dart.dev]({{site.dart-site}}/tools/dart-devtools).

果你希望知道更多如何在命令行下使用开发者工具 (DevTools) 的话，
请参考这个页面 [Dart 开发者工具]({{site.dart-site}}/tools/dart-devtools).

[Android Studio/IntelliJ]: /tools/devtools/android-studio
[VS Code]: /tools/devtools/vscode
[command line]: /tools/devtools/cli
[DevTools issue tracker]: {{site.github}}/flutter/devtools/issues
[Debugging]: /testing/debugging
[Other resources]: /testing/debugging#other-resources
