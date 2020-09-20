---
title: Using the Logging view
title: 使用日志视图 (Logging view)
description: Learn how to use the DevTools logging view.
description: 学习如何使用开发者工具的日志视图。
tags: Flutter开发工具,DevTools
keywords: 开发者工具,日志视图,Dart
---

{{site.alert.note}}

  The logging view works with all Flutter and Dart applications.

  日志视图可用于所有 Flutter 和 Dart 应用。
  
{{site.alert.end}}

## What is it?

## 简介

The logging view displays events from the Dart runtime,
application frameworks (like Flutter), and application-level
logging events.

日志视图展示 Dart 运行时和应用框架（比如 Flutter）的事件，
以及应用级日志。

## Standard logging events

## 标准日志事件

By default, the logging view shows:

默认情况下，日志视图会展示：

* Garbage collection events from the Dart runtime

  Dart 运行时的垃圾回收事件

* Flutter framework events, like frame creation events

  Flutter 框架事件，比如创建帧的事件

* `stdout` and `stderr` from applications

  应用的 `stdout` 和 `stderr` 输出

* Custom logging events from applications

  应用的自定义日志事件

![日志视图的截图]({% asset tools/devtools/logging_log_entries.png @path %}){:width="100%"}

## Logging from your application

## 应用日志

To implement logging in your code,
see the [Logging][] section in the
[Debugging Flutter apps programmatically][]
page.

要在代码中输出日志，请查看 
[添加输出代码的方式调试 Flutter 应用][Debugging Flutter apps programmatically]
页面的 [日志][Logging] 部分。

## Clearing logs

## 清理日志

To clear the log entries in the logging view,
click the **Clear logs** button.

要清理日志视图的日志记录，请点击 **Clear logs**（清理日志）按钮。

[Logging]: /docs/testing/code-debugging#logging
[Debugging Flutter apps programmatically]: /docs/testing/code-debugging