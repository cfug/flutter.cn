---
# title: Use the Network View
title: 使用网络视图 (Network View)
description: How to use the DevTools network view.
tags: Flutter开发工具,DevTools
keywords: 开发者工具,网络视图,Dart
---

:::note

The network view works with all Flutter and Dart applications.

网络视图适用于所有 Flutter 和 Dart 应用程序。

:::

## What is it?

## 网络视图是什么？

The network view allows you to inspect HTTP, HTTPS, and web socket traffic from
your Dart or Flutter application.

你可以通过网络视图检查来自 Dart 或 Flutter 应用程序的
HTTP、HTTPS 和 web socket 的网络流量情况。

![Screenshot of the network screen](/assets/images/docs/tools/devtools/network_screenshot.png){:width="100%"}

## How to use it

## 如何使用

Network traffic should be recording by default when you open the Network page.
If it is not, click the **Record network traffic** button in the upper left to
begin polling.

当你打开网络页时，网络流量应该是默认记录的。
如果没有记录，请点击左上方的 **Resume** 按钮，
开始记录网络流量情况。

Select a network request from the table (left) to view details (right). You can
inspect general and timing information about the request, as well as the content
of response and request headers and bodies.

从表格中选中一个网络请求（左边）来查看请求细节（右边）。
你可以检查关于请求的常规信息和时间信息，
包含响应内容、请求标头、请求体。

### Search and filtering

### 搜索和过滤

You can use the search and filter controls to find a specific request or filter
requests out of the request table.

你可以使用搜索和过滤来寻找一个特定的请求，
或者单独在请求表中过滤请求。

![Screenshot of the network screen](/assets/images/docs/tools/devtools/network_search_and_filter.png)

To apply a filter, press the filter button (right of the search bar). You will
see a filter dialog pop up:

要使用过滤器，请点击过滤器按钮（搜索栏右边）。
你会看见一个过滤查询对话框弹出：

![Screenshot of the network screen](/assets/images/docs/tools/devtools/network_filter_dialog.png)

The filter query syntax is described in the dialog. You can filter network
requests by the following keys:

过滤查询的语法在对话框中描述。
你可以通过以下语法关键词来过滤网络请求：

* `method`, `m`: this filter corresponds to the value in the "Method" column

  `method`，`m`：该关键词对应过滤 “Method” 列中的值

* `status`, `s`: this filter corresponds to the value in the "Status" column

  `status`，`s`：该关键词对应过滤 “Status” 列中的值

* `type`, `t`: this filter corresponds to the value in the "Type" column

  `type`，`t`：该关键词对应过滤 “Type” 列中的值

Any text that is not paired with an available filter key will be queried against
all categories (method, uri, status, type).

任何没有与可用的语法关键词对应的文本将会查询所有类别 (method、uri、status、type)。

Example filter queries:

过滤器查询示例：

```plaintext
my-endpoint m:get t:json s:200
```

```plaintext
https s:404
```

### Recording network requests on app startup

To record network traffic on app startup, you can start your app in a paused
state, and then begin recording network traffic in DevTools
before resuming your app.

1. Start your app in a paused state:
    * `flutter run --start-paused ...`
    * `dart run --pause-isolates-on-start --observe ...`
2. Open DevTools from the IDE where you started your app, or from the link that
   was printed to the command line if you started your app from the CLI.
3. Navigate to the Network screen and ensure that recording has started.
4. Resume your app.
   ![Screenshot of the app resumption experience on the Network screen](/assets/images/docs/tools/devtools/network_startup_resume.png){:width="100%"}
5. The Network profiler will now record all network traffic from your app,
   including traffic from app startup.

## Other resources

## 其他信息

HTTP and HTTPs requests are also surfaced in the [Timeline][timeline] as
asynchronous timeline events. Viewing network activity in the timeline can be
useful if you want to see how HTTP traffic aligns with other events happening
in your app or in the Flutter framework.

HTTP 和 HTTPs 请求也作为异步时间线事件出现在 [时间线 (Timeline)][timeline] 中。
如果你想了解 HTTP 流量情况与应用程序或 Flutter 框架中发生的其他事件是否一致，
这种情况下在时间线中查看网络活动是很有用的。

To learn how to monitor an app's network traffic and inspect
different types of requests using the DevTools,
check out a guided [Network View tutorial][network-tutorial].
The tutorial also uses the view to identify network activity that
causes poor app performance.

要学习如何使用 DevTools 监控应用程序的网络流量以及检查不同类型的请求，
请查阅 [网络视图教程][network-tutorial]。
该教程还使用网络视图来识别导致应用程序性能不佳的网络活动。

[timeline]: /tools/devtools/performance#timeline-events-tab
[network-tutorial]: {{site.medium}}@fluttergems/mastering-dart-flutter-devtools-network-view-part-4-of-8-afce2463687c
