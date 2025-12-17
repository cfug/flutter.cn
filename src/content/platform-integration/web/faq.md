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
investigate search engine indexability of Flutter web.

### Does hot reload work with a web app?

Yes! For more information, check out
[hot reload on the web][].

[hot reload on the web]: /platform-integration/web/building#hot-reload-web

Hot restart is a fast way of seeing your
changes without having to relaunch your web app and wait for it
to compile and load. This works similarly to
the hot reload feature for Flutter mobile development.
The difference is that hot reload remembers your state and hot
restart doesn't.

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

### How do I deploy a web app?

### 我该如何部署 Web 应用？

See [Preparing a web app for release][].

请参阅 [打包并发布到 Web 平台][Preparing a web app for release]。

### Does `Platform.is` work on the web?

### `Platform.is` API 现在可用吗？

Not currently.

目前还不行。

### Why doesn't my app update immediately after it's deployed?

You might need to configure the `Cache-Control` header returned by your web server.
For example, if this header is set to 3600, then the browser
and CDN will cache the asset for 1 hour, and your users might see an out-of-date
version of your app up to 1 hour after you deploy a new version. For
more information about caching on the web,
check out [Prevent unnecessary network requests with the HTTP Cache][http-cache].

It is a good idea to be aware of this behavior to avoid an undesirable user experience.
After you deploy your app, users might use a
cached version of your app (cached by the browser or CDN)
for the duration defined by your cache headers.
This can lead to users using a version of your app that
is incompatible with changes that have been deployed to backend services.

### How do I clear the web cache after a deployment and force an app download?
If you wish to defeat these cache headers after each deployment, a common
technique is to append a build ID of some sort to the links of your static
resources, or update the filenames themselves.
For example, `logo.png` might become `logo.v123.png`.

```html
<!-- Option 1, append build ID as a query parameter in your links -->
<script src="flutter_bootstrap.js?v=123" async></script>

<!-- Option 2, update the filename and update your links -->
<script src="flutter_bootstrap.v123.js" async></script>
```

Flutter does not currently support appending build IDs to resources
automatically.

### How do I configure my cache headers?

If you are using Firebase Hosting,
the shared cache (CDN) is invalidated when you deploy a new version of your
app. But you might choose to configure your cache headers as follows,
so that the browser cache doesn't cache application scripts,
but the shared cache does.

```json
{
  "hosting": {
    "headers": [
      {
        "source":
          "**/*.@(jpg|jpeg|gif|png|svg|webp|css|eot|otf|ttf|ttc|woff|woff2|font.css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=3600,s-maxage=604800"
          }
        ]
      },
      {
        "source":
          "**/*.@(mjs|js|wasm|json)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=0,s-maxage=604800"
          }
        ]
      }
    ]
  }
}
```

### How do I configure a service worker?

The service worker generated by `flutter build web` is deprecated,
and you can disable it by setting the `--pwa-strategy` flag to `none`
when running the `flutter build web` command.

```console
flutter build web --pwa-strategy=none
```

If you would like to continue to use a service worker, you can
[build your own][using-service-workers] or try third-party tools
such as [Workbox][workbox].

If your service worker is not refreshing,
configure your CDN and browser cache by setting
the `Cache-Control` header to a small value such as 0 or 60 seconds.

[building a web app with Flutter]: /platform-integration/web/building
[Creating responsive apps]: /ui/adaptive-responsive
[documentation for conditional imports]: {{site.dart-site}}/guides/libraries/create-library-packages#conditionally-importing-and-exporting-library-files
[Embedding Flutter web]: /platform-integration/web/embedding-flutter-web
[file an issue]: {{site.repo.flutter}}/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[`http`]: {{site.pub}}/packages/http
[http-cache]: https://web.dev/articles/http-cache
[`iframe`]: https://html.com/tags/iframe/
[isolates]: {{site.dart-site}}/guides/language/concurrency
[Issue 32248]: {{site.repo.flutter}}/issues/32248
[Preparing a web app for release]: /deployment/web
[roadmap]: {{site.github}}/flutter/flutter/blob/main/docs/roadmap/Roadmap.md#web-platform
[run your web apps in any supported browser]: /platform-integration/web/building#create-and-run
[using-service-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
[Web content in Flutter]: /platform-integration/web/web-content-in-flutter
[Web support for Flutter]: /platform-integration/web
[web workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[workbox]: https://github.com/GoogleChrome/workbox
