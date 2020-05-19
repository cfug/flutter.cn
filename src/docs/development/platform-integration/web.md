---
title: Web FAQ
title: Web 常见问题
description: Some gotchas and differences when writing or running web apps in Flutter.
description: 在 Flutter 中编写或运行 Web 应用程序时遇到的一些问题，以及 Web 与不同之处。
---

### Is the web version of Flutter ready for production?

### Web 版本的 Flutter 是否已经准备好投入生产环境中了呢？

Flutter web support is available on the beta channel.
As is typical for beta software, we're still making
changes to improve performance and quality, and you
may discover rendering bugs compared to the stable
mobile platforms. While web support is in beta,
we recommend careful testing on a variety of platforms
before deploying to production, and that you track and
apply Flutter updates to your deployed site on a regular
basis.

Flutter 网页支持在测试版频道中提供。
作为典型的测试版软件，我们仍在进行修改以提高性能和质量，
与稳定的移动平台相比，您可能会发现渲染方面的 BUG。
虽然网页支持还在测试阶段，
但我们建议您在部署到生产环境之前在各种平台上仔细测试，
定期跟踪 Flutter 更新并将其应用于已部署的站点。

### What scenarios are ideal for Flutter on the web?

### 在 Web 平台使用 Flutter 的场景有哪些？

While traditional web approaches remain a great choice,
we envision the web support available in Flutter being
valuable in many scenarios. For example:

尽管传统的 Web 场景是非常有价值，
但我们设想在如下场景中的 Web 支持也有很大价值：

* Rich interactive single page applications

  丰富的交互式单页应用

* Connected Progressive Web Applications (PWAs)

  渐进式网络应用 (PWA)
  
* Embedding dynamic/interactive content in an existing website

  在现有网站中嵌入动态/互动内容

Not every HTML scenario is ideally suited for Flutter at
this time. For example, text-rich flow-based content such
as blog articles benefit from the document-centric model that
the web is built around, rather than the app-centric services
that a UI framework like Flutter can deliver.
However, you _can_ use Flutter to
embed interactive experiences into these websites.

目前，并不是每一个 HTML 场景在这个阶段都适合 Flutter。
例如，博客文章等基于流媒体的丰富文本内容，
其受益于网络构建的以文档为中心的模式，
而不是像 Flutter 这样的 UI 框架可以提供的以应用为中心的服务。
然而，你可以使用 Flutter 将交互式体验嵌入到这些网站中。

For more information on how you can use Flutter on the web,
see [Web support for Flutter][].

有关如何在 Web 上使用 Flutter 的更多信息，参考文档：
[Flutter 的 Web 支持][Web support for Flutter]。

See [Upgrading from package:flutter_web to the Flutter SDK][].

点击查看 [将使用 flutter_web package 升级使用到 Flutter SDK][Upgrading from package:flutter_web to the Flutter SDK]
以获得 Flutter Web 体验。

### How do I create an app that also runs on the web?

### 如何创建同时在 Web 上运行的应用？

See [building a web app with Flutter](/docs/get-started/web).

请参见 [使用 Flutter 构建 Web 应用](/docs/get-started/web)。

### Does hot reload work with a web app?

### Web 应用上能热重载吗？

No, but you can use hot restart.

不能，但是可以使用热重启 (hot restart)。

### Can I use Flutter plugins?

Yes, several plugins have web support. 
Find an updated list of plugins on [pub.dev][] using the web filter.
You can also add web support to existing plugins or
[write your own plugins][] for the web.

可以使用了，许多 plugin 已经支持 web。
使用 web 过滤器在 [pub.dev][] 上寻找 plugin 更新列表。
你也可以向已有 plugin 添加 web 支持，或者编写[你的 web plugin][write your own plugins]。

### How do I file an issue about web support?

### 我该如何提交关于 Web 支持的 issue？

You can [file an issue][] on the main Flutter repo.
Make sure that "web" is included in the title.

你可以在 Flutter 主仓库中 [提交一个 issue][file an issue]。
确保标题中包含 “Web” 字样。

### How do I refresh the app running in the browser?

### 我该如何在浏览器中刷新正在运行的应用？

Using the browser's refresh button doesn't work,
but you can enter "R" in the console where
"flutter run -d chrome" is running.

使用浏览器的刷新按钮不会起作用，
但你可以在执行 “flutter run -d chrome” 的控制台中输入“R” 进行刷新。

### Can I build, run, and deploy web apps in any of the IDEs?

### 我可以在任意 IDE 中，构建、运行并发布 web 应用吗？

You can select **Chrome** as the target device in
Android Studio/IntelliJ and VS Code if you are using the
latest beta channel of Flutter and have enabled web support.
To enable support, run the following in the terminal:

Flutter 最新的 beta 频道已开启 web 支持，
你可以在 Android Studio、IntelliJ 和 VS Code 中选择 **Chrome** 作为目标设备。
要启用 web 支持，请在终端中执行以下命令：

```terminal
flutter config --enable-web
```

You need only run this once.

你仅需要执行一次。

If the IDE is already running, restart it.
The device pulldown should now include the **Chrome (web)**
option.

如果 IDE 已在运行，请重新启动它。
设备列表菜单现在应该包含 **Chrome（web）** 选项了。

### How do I build a responsive app for the web?

### 我该如何构建响应式 web 应用？

See [Creating responsive apps][].

请参阅[创建响应式应用][Creating responsive apps]。

### Can I use `dart:io` with a web app?

### 我能在 web 应用中使用 `dart:io` 这个 package 吗？

No. The file system is not accessible from the browser.
For network functionality, use the [`http`][]
package. Note that security works somewhat
differently because the browser (and not the app)
controls the headers on an HTTP request.

不行。文件系统在浏览器中是无法访问的。
对于网络功能来说，请使用 [`http`][] package。
请注意，安全方面的工作有所不同，
因为浏览器（而不是应用程序）控制 HTTP 请求上的标头。

### How are forward and backward buttons presented in the web UI?

### 如何在 Web 用户界面中显示前进和后退按钮？

The browser's back button is supported for web apps.
The forward button is not yet enabled.
For more information, see [Issue 32248][].

Web 应用支持浏览器的后退按钮。
前进按钮尚未支持。
有关更多信息，请参阅 [Issue 32248][]。

### How do copy/paste work?

### 复制和粘贴功能状况如何？

Copy/paste works on mobile. If you encounter problems,
please [file an issue][].

在移动设备上复制和粘贴可以使用。
如果你遇到了什么问题，请 [提一个 issue][file an issue]。

### How do I embed a web app in a web page?

### 我该如何把一个 web 应用嵌入到一个网页中？

You can embed a Flutter web app,
as you would embed other content,
in an [`iframe`][] tag of an HTML file.
In the following example, replace "URL"
with the location of your hosted HTML page:

你可以通过下面这个例子，以 [`iframe`] 来内嵌，把 URL 替换成托管 Flutter Web 的页面 URL：

```html
<iframe src="URL"></iframe>
```

### Implementing CORS

### 实现跨域资源共享

HTTP requests work on mobile, but not on the web.
Web applications have special security restrictions.
If you experience problems,
check that the web server you are accessing is setting
CORS headers that accept requests from the domain
hosting your Flutter app.

HTTP 请求适用于移动设备，但不适用于网络。
Web 应用程序有特殊的安全限制。
如果你遇到问题，请检查正在访问的 Web
服务器是否设置了接受来自托管 Flutter 应用程序的域的请求的 CORS 标头。

### How do I avoid JS lockout with CORS?

### 我该如何使用 CORS 避免 JS 锁定？

IDK

尚未有明确的解决方案。

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
  
  [分析性能][Analyzing performance]&mdash;请确保应用使用的是 profile 构建

### How do I test a web app?

### 我该如何测试 Web 应用？

Use the normal [widget tests][].

跟常规的 [widget tests][] 通用。

Driver tests are not yet supported.

自动化测试尚不支持。

### How do I internationalize a web app?

### 我该如何国际化 Web 应用？

TBD

暂未完成

### How do I deploy a web app?

### 我该如何部署 Web 应用？

See [Preparing a web app for release][]

请参阅 [打包并发布到 Web 平台](/docs/deployment/web)

### Does `Platform.is` work on the web?

### `Platform.is` API 现在可用吗？

Not currently. 

目前还不行。

### How can I compare notes with others who are playing with this feature?

### 如何跟其他使用者交流？

Check out the **#web** discussion board on [Discord][].
Flutter engineers routinely read and respond on Discord.

请在 [Discord][] 平台的 **#web** 这个讨论板跟大家讨论，
Flutter 团队的工程师会经常阅读和互动。

[Analyzing performance]: https://developers.google.com/web/tools/chrome-devtools/evaluate-performance
[building a web app with Flutter]: /docs/get-started/web
[Chrome DevTools]: https://developers.google.com/web/tools/chrome-devtools
[Creating responsive apps]: /docs/development/ui/layout/responsive
[Analyzing performance]: https://developers.google.cn/web/tools/chrome-devtools/evaluate-performance
[Chrome DevTools]: https://developers.google.cn/web/tools/chrome-devtools
[Debugging]: /docs/development/tools/devtools/debugger
[Discord]: https://discord.gg/N7Yshp4
[file an issue]: https://goo.gle/flutter_web_issue
[Flutter DevTools]: /docs/development/tools/devtools/overview
[Generating event timeline]: https://developers.google.cn/web/tools/chrome-devtools/evaluate-performance/performance-reference
[`http`]: {{site.pub}}/packages/http
[`iframe`]: https://html.com/tags/iframe/
[Issue 32248]: {{site.github}}/flutter/flutter/issues/32248
[Logging]: /docs/development/tools/devtools/logging
[Preparing a web app for release]: /docs/deployment/web
[Running Flutter inspector]: /docs/development/tools/devtools/inspector
[Upgrading from package:flutter_web to the Flutter SDK]: {{site.github}}/flutter/flutter/wiki/Upgrading-from-package:flutter_web-to-the-Flutter-SDK
[widget tests]: /docs/testing#widget-tests
[pub.dev]: {{site.pub}}/flutter/packages?platform=web
[Web support for Flutter]: /web
[write your own plugins]: {{site.medium}}/flutter/how-to-write-a-flutter-web-plugin-5e26c689ea1
