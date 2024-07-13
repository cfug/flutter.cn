---
# title: Web FAQ
title: Web 常见问题
# description: Some gotchas and differences when writing or running web apps in Flutter.
description: 在 Flutter 中编写或运行 Web 应用程序时遇到的一些问题，以及 Web 与不同之处。
tags: 平台集成
keywords: Flutter网页版,常见问题
---

## Questions

## 常见问题

### What scenarios are ideal for Flutter on the web?

### 在 Web 平台使用 Flutter 的场景有哪些？

Not every web page makes sense in Flutter, but we think Flutter is particularly
suited for app-centric experiences:

Flutter 目前并非适用于所有的网页内容，不过我们主要关注三个应用场景：

* Progressive Web Apps

  渐进式 web 应用 (Progressive web apps, PWA)，兼具 web 的高覆盖面与桌面应用的强大功能。

* Single Page Apps

  单页应用 (Single page apps, SPA)，只需一次加载，并与互联网服务动态互传数据。

* Existing Flutter mobile apps

  将现有 Flutter 移动应用拓展到 web，在两个平台共享代码。

At this time, Flutter is not suitable for static websites with text-rich
flow-based content. For example, blog articles benefit from the document-centric
model that the web is built around, rather than the app-centric services that a
UI framework like Flutter can deliver. However, you _can_ use Flutter to embed
interactive experiences into these websites.

现在阶段，Flutter 不适合具有丰富文本和瀑布流的页面。
例如，博客文章等基于流媒体的丰富文本内容，
其受益于网络构建的以文档为中心的模式，
而不是像 Flutter 这样的 UI 框架可以提供的以应用为中心的服务。
然而，你可以使用 Flutter 将交互式体验嵌入到这些网站中。

For more information on how you can use Flutter on the web,
see [Web support for Flutter][].

有关如何在 Web 上使用 Flutter 的更多信息，参考文档：
[Flutter 的 Web 支持][Web support for Flutter]。

### Search Engine Optimization (SEO)

### Flutter Web 应用的 SEO 优化

In general, Flutter is geared towards dynamic application experiences. Flutter's
web support is no exception. Flutter web prioritizes performance, fidelity, and
consistency. This means application output does not align with what search
engines need to properly index. For web content that is static or document-like,
we recommend using HTML—just like we do on [flutter.dev]({{site.main-url}}),
[dart.dev]({{site.dart-site}}), and [pub.dev]({{site.pub}}). You should also
consider separating your primary application experience—created in Flutter—from
your landing page, marketing content, and help content—created using
search-engine optimized HTML.

一般情况下，Flutter Web 的目标是构建「动态化」网页应用。
Flutter 的 Web 端支持会优先考虑和确保性能、保真度和一致性。
这意味着生成的网页页面可能不是搜索引擎「熟悉」的结构化页面。
对于一些网页、文档内容，我们建议你使用 HTML 构建，
就像我们为 [flutter.dev]({{site.main-url}})、
[dart.dev]({{site.dart-site}}) 以及 [pub.dev]({{site.pub}}) 官网所做的那样。
你还应该考虑将主要的类应用体验（使用 Flutter 构建的 Web 网页）
与首页、营销内容以及帮助内容等（使用搜索引擎「熟悉」的 HTML 构建）
进行分离，避免将它们混在一起。

That said, as mentioned in the [roadmap][], the Flutter team plans to
investigate search engine indexability of Flutter web. To that end, we built a
small website containing [Hawaii-themed space stories][space_hawaii], hoping
that search engines find and index this site.

### How do I create an app that also runs on the web?

### 如何创建同时在 Web 上运行的应用？

See [building a web app with Flutter][].

请参见 [使用 Flutter 构建 Web 应用][building a web app with Flutter]。

### Does hot reload work with a web app?

### 我该如何在浏览器中刷新正在运行的应用？

No, but you can use hot restart. Hot restart is a fast way of seeing your
changes without having to relaunch your web app and wait for it to compile and
load. This works similarly to the hot reload feature for Flutter mobile
development. The only difference is that hot reload remembers your state and hot
restart doesn't.

不能，但是可以使用热重启 (hot restart)。
热重启是可以你的应用快速响应改动的方法，无需等待重新编译的载入。
它与移动端的热重载功能类似。唯一的区别是热重载可以保持应用的状态。

### How do I restart the app running in the browser?

### 我该如何在浏览器中重启正在运行的应用？

Using the browser's refresh button doesn't work,
but you can enter "R" in the console where
"flutter run -d chrome" is running.

使用浏览器的刷新按钮不会起作用，
但你可以在执行 `flutter run -d chrome` 的控制台中
输入「R」进行刷新。

### Which web browsers are supported by Flutter?

### 现在有哪些浏览器支持 Flutter 了？

Flutter web apps can run on the following browsers:

现在 Flutter web 应用可以运行在以下浏览器中：

* Chrome (mobile & desktop)

  Chrome（移动和桌面端）

* Safari (mobile & desktop)

  Safari（移动和桌面端）

* Edge (mobile & desktop)

  Edge（移动和桌面端）

* Firefox (mobile & desktop)

  Firefox（移动和桌面端）

During development, Chrome (on macOS, Windows, and Linux) and Edge (on Windows)
are supported as the default browsers for debugging your app.

在开发阶段，Chrome（在 macOS、Windows 以及 Linux）以及
Edge（在 Windows 上）将作为默认浏览器用于调试。

### Can I build, run, and deploy web apps in any of the IDEs?

### 我可以在任意 IDE 中，构建、运行并发布 web 应用吗？

You can select **Chrome** or **Edge** as the target device in
Android Studio/IntelliJ and VS Code.

你可以在 Android Studio/IntelliJ 和 VS Code 里选择使用
**Chrome** 或者 **Edge** 浏览器。

The device pulldown should now include the **Chrome (web)**
option for all channels.

设备下拉列表里现在应该在所有平台里都包含了 Chrome (web)。


### How do I build a responsive app for the web?

### 我该如何构建响应式 web 应用？

See [Creating responsive apps][].

请参阅 [创建响应式应用][Creating responsive apps]。

### Can I use `dart:io` with a web app?

### 我能在 Web 应用中使用 `dart:io` 这个 package 吗？

No. The file system is not accessible from the browser.
For network functionality, use the [`http`][]
package. Note that security works somewhat
differently because the browser (and not the app)
controls the headers on an HTTP request.

不行。文件系统在浏览器中是无法访问的。
对于网络功能来说，请使用 [`http`][] package。
请注意，安全方面的工作有所不同，
因为浏览器（而不是应用程序）控制 HTTP 请求上的标头。

### How do I handle web-specific imports?

### 我应该如何处理一个 Web 平台特定的导入？

Some plugins require platform-specific imports, particularly if they use the
file system, which is not accessible from the browser. To use these plugins
in your app, see the [documentation for conditional imports][]
on [dart.dev]({{site.dart-site}}).

部分插件需要在特定平台导入库或者文件，尤其是当使用浏览器无法访问的文件系统时。
若要在你的应用里使用这些插件，请参阅 [dart.cn]({{site.dart-site}})：
[选择性的导入][documentation for conditional imports]。

### Does Flutter web support concurrency?

### Flutter Web 是否支持并发？

Dart's concurrency support via [isolates][]
is not currently supported in Flutter web.

Dart 通过 [isolates][] 机制实现并发，
目前在 Web 中尚未支持。

Flutter web apps can potentially work around this
by using [web workers][],
although no such support is built in.

Flutter Web 没有内置并发的支持，
但你可以尝试通过 [web workers][] 来解决这个问题。

### How do I embed a Flutter web app in a web page?

### 我该如何把一个 Flutter web 应用嵌入到一个网页中？

You can embed a Flutter web app,
as you would embed other content,
in an [`iframe`][] tag of an HTML file.
In the following example, replace "URL"
with the location of your hosted HTML page:

你可以通过下面这个例子，以 [`iframe`][] 来内嵌，
把 URL 替换成托管 Flutter Web 的页面 URL：

```html
<iframe src="URL"></iframe>
```

If you encounter problems, please [file an issue][].

如果你遇到问题，请 [提交一个 issue][file an issue] 给我们。

### How do I debug a web app?

### 我该如何调试一个 web 应用？

Use [Flutter DevTools][] for the following tasks:

使用 [Flutter DevTools][] 来尝试如下工作：

* [Debugging][]

  [调试][Debugging]

* [Logging][]

  [查看日志][Logging]

* [Running Flutter inspector][]

  [运行 Flutter inspector][Running Flutter inspector]

Use [Chrome DevTools][] for the following tasks:

使用 [Chrome DevTools][] 来尝试如下工作：

* [Generating event timeline][]

  [生成事件的时间线][Generating event timeline]

* [Analyzing performance][]&mdash;make sure to use a
  profile build

  [分析性能][Analyzing performance]&mdash;&mdash;请确保应用使用的是 profile 构建

### How do I test a web app?

### 我该如何测试 Web 应用？

Use [widget tests][] or integration tests. To learn more about
running integration tests in a browser, see the [Integration testing][] page.

使用常规的 [widget tests][]，了解更多关于如何在浏览器里使用集成测试，请查看
[集成测试][Integration testing] 文档页面。

### How do I deploy a web app?

### 我该如何部署 Web 应用？

See [Preparing a web app for release][].

请参阅 [打包并发布到 Web 平台][Preparing a web app for release]。

### Does `Platform.is` work on the web?

### `Platform.is` API 现在可用吗？

Not currently.

目前还不行。

[Analyzing performance]: {{site.developers}}web/tools/chrome-devtools/evaluate-performance
[building a web app with Flutter]: /platform-integration/web/building
[Chrome DevTools]: {{site.developers}}web/tools/chrome-devtools
[Creating responsive apps]: /ui/adaptive-responsive
[Debugging]: /tools/devtools/debugger
[file an issue]: {{site.repo.flutter}}/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[Flutter DevTools]: /tools/devtools
[Generating event timeline]: {{site.developers}}/web/tools/chrome-devtools/evaluate-performance/performance-reference
[`http`]: {{site.pub}}/packages/http
[`iframe`]: https://html.com/tags/iframe/
[isolates]: {{site.dart-site}}guides/language/concurrency
[Issue 32248]: {{site.repo.flutter}}issues/32248
[Logging]: /tools/devtools/logging
[Preparing a web app for release]: /deployment/web
[Running Flutter inspector]: /tools/devtools/inspector
[widget tests]: /testing/overview#widget-tests
[Web support for Flutter]: /platform-integration/web
[web workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[run your web apps in any supported browser]: /platform-integration/web/building#create-and-run
[Integration testing]: /testing/integration-tests#test-in-a-web-browser
[documentation for conditional imports]: {{site.dart-site}}/guides/libraries/create-library-packages#conditionally-importing-and-exporting-library-files
[roadmap]: {{site.github}}/flutter/flutter/blob/master/docs/roadmap/Roadmap.md#web-platform
[space_hawaii]: https://alien-hawaii-2024.web.app/
