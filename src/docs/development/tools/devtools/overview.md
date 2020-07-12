---
title: DevTools
title: 开发者工具概览
description: How to use the DevTools with Flutter.
description: 学习如何在 Flutter 里使用开发者工具。
---

## What is DevTools?

## 开发工具是什么？

DevTools is a suite of performance and debugging tools
for Dart and Flutter. It's currently in beta release,
but is under active development.

开发工具是一套 Dart 和 Flutter 的性能调试工具。
目前已经“行进”到 Beta 版本了，但仍在正在持续开发中。

![Dart DevTools Screens]({% asset tools/devtools/dart-devtools.gif @path %}){:width="100%"}

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

We expect you to use DevTools in conjunction with
your existing IDE or command-line based development workflow.

我们希望您将开发工具与现有的 IDE 或基于命令行的开发流程结合起来使用。

## How do I install DevTools?

## 如何安装开发工具？

See the [Android Studio/IntelliJ][], [VS Code][], or
[command line][] pages for installation instructions.

## Providing feedback

## 提交反馈

Please give DevTools a try, provide feedback, and file issues
in the [DevTools issue tracker][]. Thanks!

请在 [开发者工具 issue 追踪器][] 中尝试使用开发工具，并提交反馈和文件 issue。

## Other resources

## 其他资源

For more information on debugging and profiling
Flutter apps, see the [Debugging][] page and,
in particular, its list of [other resources][].

关于调试、分析 Flutter 应用程序的更多详细，
请查阅 [调试][] 页面，尤其是 [其他资源][] 列表。

For more information on using DevTools with Dart command-line apps, see the 
[DevTools documentation on dart.dev]({{site.dart-site}}/tools/dart-devtools).

如果你希望知道更多如何在命令行下使用开发者工具 (DevTools) 的话，
请参考这个页面 [Dart 开发者工具]({{site.dart-site}}/tools/dart-devtools).

[Android Studio/IntelliJ]: /docs/development/tools/devtools/android-studio
[VS Code]: /docs/development/tools/devtools/vscode
[command line]: /docs/development/tools/devtools/cli
[DevTools issue tracker]: {{site.github}}/flutter/devtools/issues
[Debugging]: /docs/testing/debugging
[Other resources]: /docs/testing/debugging#other-resources
[命令行]: /docs/development/tools/devtools/cli
[开发工具 issue 追踪器]: {{site.github}}/flutter/devtools/issues
[调试]: /docs/testing/debugging
[其他资源]: /docs/testing/debugging#other-resources
