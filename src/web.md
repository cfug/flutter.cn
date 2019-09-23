---
title: Web support for Flutter
title: Flutter 正式支持 Web 平台
description: "Announcing the tech preview release of Flutter for web."
description: "宣布在 Web 端使用 Flutter 的发布预览版"
---

Web support is a code-compatible implementation of Flutter that is
rendered using standards-based web technologies: HTML, CSS and JavaScript.
With web support, you can compile existing Flutter code written in
Dart into a client experience that can be embedded in the browser and
deployed to any web server. You can use all the features of Flutter,
and you don’t need a browser plug-in.

Web 支持是 Flutter 的代码兼容实现，使用基于标准的 Web 技术呈现：HTML，CSS和JavaScript。
通过 Web 支持，你可以将使用 Dart 编写的现有 Flutter 代码编译为可以嵌入浏览器，
并部署到任何 Web 服务器上，具有客户端体验的 Web 应用。
你可以使用 Flutter 的所有功能，而不需要任何浏览器插件。

{{site.alert.warning}}

  **As of 1.9, web support is available as a tech preview.**
  As web support hasn't yet reached alpha,
  you can expect to experience crashes and missing features.
  If you experience a problem that hasn't yet been reported, please
  [file an issue][] and make sure that "web" appears in the title.
  
  **在 1.9 版本，Web 支持已可用于技术预览。**
  由于Web支持尚未达到alpha，你可能会遇到崩溃和功能缺失。
  如果你遇到了尚未被报告的问题，请 [提交一个 issue][]，并确保标题中标注了 “web” 字样。
  
{{site.alert.end}}

<img src="/images/Dart-framework-v-browser-framework.png"
     alt="showing Flutter architecture for C++ vs Flutter for web"
     width="100%">

Adding web support to Flutter involved implementing Flutter's
core drawing layer on top of standard browser APIs.
Using a combination of DOM, Canvas, and CSS,
web support aims to provide a portable, high-quality,
and performant user experience across modern browsers.
We implemented this core drawing layer completely in Dart
and used Dart's optimized JavaScript compiler to compile the
Flutter core and framework along with your application
into a single, minified source file that can be deployed to
any web server.

向 Flutter 添加 Web 支持涉及在标准浏览器 API 之上实现Flutter 的核心绘图层。
通过结合使用DOM、Canvas 和 CSS，Web 支持旨在为现代浏览器提供便携、高质量和高性能的用户体验。
我们在 Dart 中完全实现了这个核心绘图层，
并使用 Dart 的优化过的 JavaScript 编译器将 Flutter 核心与框架，
同你的应用程序一起编译成一个可以部署到任何 Web 服务器的简化源文件。

In this early stage of development,
we envision the web version of Flutter 
being valuable in many scenarios. For example:

在开发的早期阶段，我们设想 Flutter 的 Web 版本在许多场景中都很有应用价值。比方说：

**A connected [Progressive Web Application][] built with Flutter**
<br> Web support for Flutter enables existing mobile-based applications
  to be packaged as a PWA for reach to a broader variety of devices,
  or to provide a companion web experience to an existing app.

**使用 Flutter 构建的 [渐进式 Web 应用程序][]**
<br> 对 Flutter 的 Web 支持使现有的基于移动设备的
  Flutter 应用可以打包为 PWA，以覆盖更广泛的设备，
  或为现有应用提供配套的 Web 体验。

**Embedded interactive content**
<br> Flutter provides a powerful environment for creating rich,
  data-centric components that can be easily hosted within
  an existing web page. Whether for data visualization, an online
  tool like a car configurator, or an embedded chart,
  Flutter can provide a productive development approach for
  embedded web content.

**嵌入式交互内容**
<br> Flutter 为创建丰富的，以数据为中心的组件提供了一个强大的环境，
  可以轻松地在现有网页中托管。无论是数据可视化，或是如汽车配置器这样的在线工具，
  又或是嵌入式图表，Flutter 都可以为嵌入式 Web 内容提供高效的开发途径。

**Embedding dynamic content in a Flutter mobile app**
<br> An established way to provide dynamic content updates within
  an existing mobile application is the use of a web view control,
  which can load and display information dynamically.
  The support Flutter now offers for a unified environment for
  web and mobile content enables you to deploy content online
  or embedded in an app without rewriting.

**在 Flutter 移动应用中嵌入动态内容**
<br> 在现有移动应用程序内提供动态内容更新的既定方法是使用 Web 视图控件，
  其可以动态地加载和显示信息。Flutter 支持现在提供统一的 Web 和移动内容环境，
  使您可以在线部署内容或嵌入应用程序中，而无需重写。

<a name="web"></a>
## Notes on web support in 1.9

## 关于 1.9 版本中的 Web 支持的说明

This preview version of web support is your opportunity to
try it out. Before you get started, here are a few notes:

此预览版的 Web 支持是你开始试用它绝佳时机。在你开始之前，有一些注意事项：

* This release is missing features and has known performance
  issues, so we don't recommend it for production.
  
  此版本缺少一些功能，并存在已知性能问题，因此我们不建议将其用于生产环境。

* You can update existing Flutter code to work on the web,
  but there are some caveats as web support hasn't
  yet reached beta. For more information, see the
  [web FAQ][].
  
  你可以更新现有的 Flutter 代码以在 Web 上运行，
  但会有一些警告，因为 Web 支持还未达到 beta 测试状态。
  有关更多信息，请参阅 [Web 常见问题][web FAQ]。

The following resources can help you get started:

以下资源可以帮助你入门：

* To add web support to an existing app, or to create a
  new app that includes web support, see 
  [Building a web application with Flutter][].
  
  要向现有应用添加Web支持，或创建一个包含 Web 支持的新应用，
  请参阅 [使用 Flutter 构建 Web 应用][Building a web application with Flutter]。
  
* To learn how to create a responsive Flutter
  app, see [Creating responsive apps][].
  
  想了解如何创建响应式 Flutter 应用，请参阅 [创建响应式应用][Creating responsive apps]。
  
* To view commonly asked questions and answers, see the
  [web FAQ][].
  
  要浏览常见问题和答案，请参阅 [Web 常见问题][web FAQ]。
  
* To see code examples,
  check out the [web samples for Flutter][].
  
  要查看代码实例，请查看 [Web 平台示例代码][web samples for Flutter]。
  
* To learn about deploying a web app, see
  [Preparing an app for web release][].
  
  要了解关于发布 Web 应用的信息，请参阅 [Preparing an app for web release][]。
  
* [File an issue][] on the main Flutter repo.

  请从 [File an issue][] 向 Flutter 主仓库提一个 issue。
  
* You can chat and ask web-related questions on the
  [Discord group][].
  
  你可以在 [Discord group][] 聊聊或询问 Web 相关的问题。

[Progressive Web Application]: https://developers.google.com/web/progressive-web-apps/
[main Flutter repo]: {{site.github}}/flutter/flutter
[web FAQ]: /docs/development/platform-integration/web
[Building a web application with Flutter]: /docs/get-started/web
[Creating responsive apps]: /docs/development/ui/layout/responsive
[web samples for Flutter]: https://flutter.github.io/samples/
[Preparing an app for web release]: /docs/deployment/web
[File an issue]: https://goo.gle/flutter_web_issue
[Discord group]: https://discordapp.com/invite/yeZ6s7k
[file an issue]: https://goo.gle/flutter_web_issue
