---
# title: Web support for Flutter
title: Flutter 正式支持 Web 平台
# description: Details of how Flutter supports the creation of web experiences.
description: 有关 Flutter 如何支持创建 Web 体验的详细信息。
tags: Web平台
keywords: Flutter web, web跨端
---

Flutter's web support delivers the same experiences on the web as on mobile.
Building on the portability of Dart, the power of the web platform and the
flexibility of the Flutter framework, you can now build apps for iOS, Android,
and the browser from the same codebase. You can compile existing Flutter code
written in Dart into a web experience because it is exactly the same Flutter
framework and **web** is just another device target for your app.

Flutter 的 Web 端支持在 Web 和移动设备上提供相同的体验。
基于 Dart 的可移植性、Web 平台的强大以及 Flutter 框架的灵活性，
你现在可以从同一个代码库为 iOS、Android 和浏览器构建应用。
你可以将用 Dart 编写的现有 Flutter 代码编译成 web 体验，
因为它就是完全相同的 Flutter 框架，而 **Web** 只是你的应用的另一个设备目标。

<img src="/assets/images/docs/arch-overview/web-arch.png"
     alt="Flutter architecture for web"
     width="100%">

Adding web support to Flutter involved implementing Flutter's
core drawing layer on top of standard browser APIs, in addition
to compiling Dart to JavaScript, instead of the ARM machine code that
is used for mobile applications. Using a combination of DOM, Canvas,
and WebAssembly, Flutter can provide a portable, high-quality,
and performant user experience across modern browsers.
We implemented the core drawing layer completely in Dart
and used Dart's optimized JavaScript compiler to compile the
Flutter core and framework along with your application
into a single, minified source file that can be deployed to
any web server.

向 Flutter 添加 Web 支持涉及在标准浏览器 API
之上实现 Flutter 的核心绘图层。
通过结合使用 DOM、Canvas 和 CSS，Web 支持旨在为现代浏览器提供
便携、高质量和高性能的用户体验。
我们在 Dart 中完全实现了这个核心绘图层，
并使用 Dart 的优化过的 JavaScript 编译器将 Flutter 核心与框架，
同你的应用程序一起编译成一个可以部署到任何 Web 服务器的简化源文件。

While you can do a lot on the web,
Flutter's web support is most valuable in the
following scenarios:

**A [Progressive Web Application][] built with Flutter**
: Flutter delivers high-quality PWAs that are integrated with a user's
  environment, including installation, offline support, and tailored UX.

**Single Page Application**
: Flutter's web support enables complex standalone web apps that are rich with
  graphics and interactive content to reach end users on a wide variety of
  devices.

**Existing mobile applications**
: Web support for Flutter provides a browser-based delivery model for existing
  Flutter mobile apps.

Not every HTML scenario is ideally suited for Flutter at this time.
For example, text-rich, flow-based, static content such as blog articles
benefit from the document-centric model that the web is built around,
rather than the app-centric services that a UI framework like Flutter
can deliver. However, you _can_ use Flutter to embed interactive
experiences into these websites.

For a glimpse into how to migrate your mobile app to web,
check out the following video:

<iframe width="560" height="315" src="{{site.bili.embed}}?aid=246950294&bvid=BV1Jv411h7x6&cid=305745348&page=1&autoplay=false" title="了解如何使用 Flutter 从移动应用转向 Web 应用" {{site.bili.set}}></iframe>

<a id="web"></a>

## Resources

## 关于 web 支持的说明

The following resources can help you get started:

以下资源可以帮助你入门：

* To add web support to an existing app, or to create a
  new app that includes web support, see
  [Building a web application with Flutter][].
  
  要向现有应用添加Web支持，或创建一个包含 Web 支持的新应用，
  请参阅 [使用 Flutter 构建 Web 应用][Building a web application with Flutter]。
  
* To learn about Flutter's different web renderers (HTML and CanvasKit), see
  [Web renderers][]

  了解更多关于 Flutter web 渲染器 (HTML and CanvasKit) 的不同之处，
  请查阅[网页渲染器][Web renderers]。
  
* To learn how to create a responsive Flutter
  app, see [Creating responsive apps][].
  
  想了解如何创建响应式 Flutter 应用，请参阅 [创建响应式应用][Creating responsive apps]。
  
* To view commonly asked questions and answers, see the
  [web FAQ][].
  
  要浏览常见问题和答案，请参阅 [Web 常见问题][web FAQ]。
  
* To see code examples,
  check out the [web samples for Flutter][].

  要查看代码实例，请查看
  [Web 平台示例代码][web samples for Flutter]。

* To see a Flutter web app demo, check out the [Wonderous app][].

  查看 Flutter web 应用的示例，可以试试看 [Wonderous app][]。

* To learn about deploying a web app, see
  [Preparing an app for web release][].
  
  要了解关于发布 Web 应用的信息，请参阅 [Preparing an app for web release][]。
  
* [File an issue][] on the main Flutter repo.

  请从 [File an issue][] 向 Flutter 主仓库提一个 issue。

* You can chat and ask web-related questions on the
  **#help** channel on [Discord][].

  你可以在 [Discord][] 的 **#help** 频道咨询 web 相关的问题。

[Building a web application with Flutter]: /platform-integration/web/building
[Creating responsive apps]: /ui/adaptive-responsive
[Discord]: https://discordapp.com/invite/yeZ6s7k
[file an issue]: https://goo.gle/flutter_web_issue
[Wonderous app]: {{site.wonderous}}/web
[Preparing an app for web release]: /deployment/web
[Progressive Web Application]: https://web.dev/progressive-web-apps/
[web FAQ]: /platform-integration/web/faq
[web samples for Flutter]: https://flutter.github.io/samples/#?platform=web
[Web renderers]: /platform-integration/web/renderers
