---
title: DevTools
title: 开发者工具概览
description: How to use the DevTools with Flutter.
description: 学习如何在 Flutter 里使用开发者工具。
---

## What is DevTools?

## 开发工具是什么？

DevTools is a suite of performance and debugging tools
for Dart and Flutter. It's currently in preview release,
but is under active development.

开发工具是一套 Dart 和 Flutter 的性能调试工具。现在它还是预览版，但它正在持续开发中。

![Screenshot of timeline dark mode]({% asset tools/devtools/timeline-dark-mode.png @path %}){:width="100%"}
<br><center><span>DevTools Timeline view in dark mode</span><span>黑暗模式下的开发工具时间轴截图</span></center>

## What can I do with DevTools?

## 我可以用开发工具来做什么？

Here are some of the things you can do with DevTools:

下面列出了一些可以用开发工具来实现的操作：

* Inspect the UI layout and state of a Flutter app.

  检查 Flutter 应用程序的 UI 组件布局和状态

* Diagnose UI jank performance issues in a Flutter app.

  在 Flutter 应用程序中诊断 UI 性能过低的问题。

* Source-level debugging of a Flutter or Dart
  command-line app.

  在 Flutter 或 Dart 的命令行应用程序中进行源码级的调试。

* Debug memory issues in a Flutter or Dart
  command-line app.

  在 Flutter 或 Dart 命令行应用程序中测试内存问题。

* View general log and diagnostics information
  about a running Flutter or Dart
  command-line app.

  查看正在运行的 Flutter 或 Dart 的命令行应用程序相关的常规日志和诊断信息。

We expect you to use DevTools in conjunction with
your existing IDE or command-line based development workflow.

我们希望您将开发工具与现有的 IDE 或基于命令行的开发流程结合起来使用。

![GIF showing DevTools features]({% asset tools/devtools/inspector.gif @path %}){:width="100%"}
<br><center><span>DevTools in action</span><span>运行中的开发工具</span></center>

## How do I install DevTools?

## 如何安装开发工具？

See the [Android Studio/IntelliJ][], [VS Code][], or
[command line][] pages for installation instructions.

详细安装教程，请查阅 [Android Studio/IntelliJ][]、[VS Code][] 或 [命令行][] 页面。

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
