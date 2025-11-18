---
# title: Debug Flutter apps
title: 调试 Flutter 应用
# description: How to debug your Flutter app.
description: 如何调试你的 Flutter 应用。
---

<?code-excerpt path-base="testing/debugging"?>

There's a wide variety of tools and features to help debug
Flutter applications. Here are some of the available tools:

有很多工具和特性可以帮助调试 Flutter 应用程序，如下列举了一些：

* [VS Code][] (recommended) and [Android Studio/IntelliJ][],
  (enabled with the Flutter and Dart plugins)
  support a built-in source-level debugger with
  the ability to set breakpoints, step through code,
  and examine values.

  [VS Code][]（推荐）和 [Android Studio/IntelliJ][]
  （借助 Flutter 和 Dart 插件）
  支持内置的源代码调试器，可以设置断点，单步调试，检查数值。

* [DevTools][], a suite of performance and profiling
  tools that run in a browser.

  [开发者工具][DevTools]，是一套运行在浏览器的性能及分析工具。

* [Flutter inspector][], a widget inspector available
  in DevTools, and also directly from Android Studio
  and IntelliJ (enabled with the Flutter plugin).
  The inspector allows you to examine a visual
  representation of the widget tree, inspect
  individual widgets and their property values,
  enable the performance overlay, and more.

## Other resources

## 其他资源

You might find the following docs useful:

以下是其他一些有用的文档：

* [Performance best practices][]

  [性能优化最佳实践][Performance best practices]

* [Flutter performance profiling][]

  [Flutter 性能分析][Flutter performance profiling]

* [Use a native debugger][]

  [使用原生的调试器][Use a native debugger]

* [Flutter's modes][]

  [Flutter 构建模式][Flutter's modes]

* [Debugging Flutter apps programmatically][]

  [添加输出代码的方式调试 Flutter 应用][Debugging Flutter apps programmatically]

[Debugging Flutter apps programmatically]: /testing/code-debugging
[Flutter's modes]: /testing/build-modes
[Flutter performance profiling]: /perf/ui-performance
[Performance best practices]: /perf/best-practices
[Use a native debugger]: /testing/native-debugging

[Android Studio/IntelliJ]: /tools/android-studio#run-app-with-breakpoints
[VS Code]: /tools/vs-code#run-app-with-breakpoints
[DevTools]: /tools/devtools
[Flutter inspector]: /tools/devtools/inspector
