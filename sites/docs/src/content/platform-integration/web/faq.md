---
# title: Web FAQ
title: Web 常见问题
# description: >-
#   Some gotchas and differences when writing or running web apps in Flutter.
description: 在 Flutter 中编写或运行 Web 应用程序时遇到的一些问题，以及 Web 与不同之处。
tags: 平台集成
keywords: Flutter网页版,常见问题
ai-translated: true
---

## Questions

## 常见问题

### What scenarios are ideal for Flutter on the web?

### 在 Web 平台使用 Flutter 的场景有哪些？

Not every web page makes sense in Flutter,
but we think Flutter is particularly suited for app-centric experiences:

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

In general, Flutter is geared towards dynamic application experiences.
Flutter's web support is no exception.
Flutter web prioritizes performance, fidelity, and consistency.
This means application output doesn't align with what search
engines need to properly index.

一般情况下，Flutter Web 的目标是构建「动态化」网页应用。
Flutter 的 Web 端支持会优先考虑和确保性能、保真度和一致性。
这意味着生成的网页页面可能不是搜索引擎「熟悉」的结构化页面。

However, a community-released Dart package, [Jaspr][] _does_
support static websites.
In fact, the [Dart documentation][], [Flutter documentation][], and
[Flutter marketing][] websites were migrated to using the Jaspr package.

不过，[Jaspr][]（由社区发布的 Dart package）**确实** 支持静态网站。
实际上，[Dart 文档][Dart documentation]、[Flutter 文档][Flutter documentation] 
以及 [Flutter 官网首页][Flutter marketing] 都已迁移使用 Jaspr package。

To summarize, for web content that is static or document-like,
we recommend _either_ using:

总之，对于静态或类似文档的 Web 内容，我们建议 **任选其一**：

1. [Jaspr][], if you want to use Dart but want a more traditional
   DOM-based website. Also note that Jaspr makes SEO work in the
   same way a traditional website would.

   [Jaspr][]：若你想使用 Dart，又希望网站更接近传统的基于 DOM 的站点。
   另外，Jaspr 的 SEO 方式与传统网站相同。

1. HTML—in this case, consider separating your primary application
   experience (created in Flutter), from your landing page,
   marketing content, and help content (created using
   search engine optimized HTML).

   HTML：此时可考虑把主要应用体验（用 Flutter 创建）与落地页、
   营销内容和帮助内容（用针对搜索引擎优化的 HTML 创建）分开。

[Dart documentation]: {{site.dart-site}}
[Flutter documentation]: /
[Flutter marketing]: {{site.main-url}}
[Jaspr]: https://jaspr.site/

### Does hot reload work with a web app?

### Web 应用支持热重载吗？

Yes! For more information,
check out [hot reload on the web][].

支持！更多信息请参阅 [Web 上的热重载][hot reload on the web]。

[hot reload on the web]: /platform-integration/web/building#hot-reload-web

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

During development, Chrome (on macOS, Windows, and Linux),
and Edge (on Windows) are supported as the default browsers
for debugging your app.

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
in your app, use conditional imports.

部分插件需要在特定平台导入库或者文件，尤其是当使用浏览器无法访问的文件系统时。
若要在你的应用里使用这些插件，请使用条件导入。

When compiling for WebAssembly, check for `dart.library.js_interop`
(rather than `dart.library.js` or `dart.library.html`,
which are not supported on Wasm):

在为 WebAssembly 编译时，请使用 `dart.library.js_interop` 
（而非 `dart.library.js` 或 `dart.library.html`，
因为 Wasm 不支持这两者）：

```dart
import 'fallback.dart'
  if (dart.library.js) 'legacy_web_interop.dart'
  if (dart.library.js_interop) 'wasm_web_interop.dart';
```

For more details, see the [documentation for conditional imports][]
on [dart.dev]({{site.dart-site}}). For help dealing with Wasm compilation
failures due to unsupported imports, check out
[Diagnosing Wasm compilation errors](/platform-integration/web/wasm#diagnosing-wasm-compilation-errors).

请参阅 [dart.cn]({{site.dart-site}})：
[条件导入][documentation for conditional imports]。
如果需要解决不支持的导入所导致的 Wasm 编译失败问题，
请参考 [诊断 Wasm 编译错误](/platform-integration/web/wasm#diagnosing-wasm-compilation-errors)。

### Does Flutter web support concurrency?

### Flutter Web 是否支持并发？

Dart's concurrency support that uses [isolates][]
is not currently supported in Flutter web.

Dart 通过 [isolates][] 机制实现并发，
目前在 Web 中尚未支持。

Flutter web apps can potentially work around this
by using [web workers][],
although such support isn't built in.

Flutter Web 没有内置并发的支持，
但你可以尝试通过 [web workers][] 来解决这个问题。

### How do I deploy a web app?

### 我该如何部署 Web 应用？

See [Preparing a web app for release][].

请参阅 [打包并发布到 Web 平台][Preparing a web app for release]。

### Does `Platform.is` work on the web?

### `Platform.is` API 现在可用吗？

No. While you can technically import `dart:io` when compiling for the web,
calling any `Platform.isXYZ` method throws an `UnsupportedError`.
Furthermore, importing `dart:io` in a package
(except through conditional imports) causes pub.dev
to score the package as not supporting the web.

不支持。编译到 Web 时技术上可以导入 `dart:io`，
但调用任何 `Platform.isXYZ` 方法都会抛出 `UnsupportedError`。
此外，在 package 中导入 `dart:io`（条件导入除外）
会让 pub.dev 将该 package 评为不支持 Web。

* If you are developing a Flutter app, consider using [`kIsWeb`][].

  如果正在开发 Flutter 应用，可以考虑使用 [`kIsWeb`][]。

* If you are developing a package
  (especially one without a Flutter dependency),
  consider using the [`os_detect`][] package.

  如果正在开发 package（尤其是不依赖 Flutter 的 package），
  可以考虑使用 [`os_detect`][] package。

[`kIsWeb`]: {{site.api}}/flutter/foundation/kIsWeb-constant.html

### Why doesn't my app update immediately after it's deployed?

### 为什么应用部署后没有立即更新？

You might need to configure the `Cache-Control` header
returned by your web server.
For example, if this header is set to 3600,
then the browser and CDN will cache the asset for 1 hour,
and your users might see an out-of-date
version of your app up to 1 hour after you deploy a new version.
For more information about caching on the web, check out
[Prevent unnecessary network requests with the HTTP Cache][http-cache].

你可能需要配置 Web 服务器返回的 `Cache-Control` 标头。
例如，若该标头设为 3600，浏览器和 CDN 会把资源缓存 1 小时，
用户在你部署新版本后最多 1 小时内仍可能看到过期版本。
有关 Web 缓存的更多信息，请参阅
[使用 HTTP 缓存避免不必要的网络请求][http-cache]。

It's a good idea to be aware of this behavior to avoid an
undesirable user experience.
After you deploy your app, users might use a
cached version of your app (cached by the browser or CDN)
for the duration defined by your cache headers.
This can lead to using a version of your app that
is incompatible with changes that have been deployed
to backend services.

了解这一行为有助于避免不佳的用户体验。
部署应用后，用户可能在缓存标头规定的时间内
继续使用缓存版本（由浏览器或 CDN 缓存）。
这可能导致他们使用的应用版本与已部署到后端服务的变更不兼容。

### How do I clear the web cache after a deployment and force an app download?

### 部署后如何清除 Web 缓存并强制下载应用？

If you wish to defeat these cache headers after each deployment,
a common technique is to append a build ID of some sort to the links
of your static resources, or update the filenames themselves.
For example, `logo.png` might become `logo.v123.png`.

若希望每次部署后绕过这些缓存标头，
常见做法是在静态资源链接后附加某种构建 ID，或直接更新文件名。
例如，`logo.png` 可以变成 `logo.v123.png`。

```html
<!-- Option 1, append build ID as a query parameter in your links -->
<script src="flutter_bootstrap.js?v=123" async></script>

<!-- Option 2, update the filename and update your links -->
<script src="flutter_bootstrap.v123.js" async></script>
```

Flutter doesn't currently support appending build IDs to resources
automatically.

Flutter 目前不支持自动为资源附加构建 ID。

### How do I configure my cache headers?

### 如何配置缓存标头？

If you are using Firebase Hosting,
the shared cache (CDN) is invalidated when you deploy a
new version of your app.
However, to make sure that the browser doesn't
cache application scripts but the shared cache does,
you can configure your cache headers as follows,

若使用 Firebase Hosting，部署应用新版本时共享缓存（CDN）会失效。
不过，为了让浏览器不缓存应用脚本、而共享缓存仍然缓存，
可以按如下方式配置缓存标头：

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

### 如何配置 service worker？

Flutter no longer generates or manages a service worker by default.

Flutter 默认不再生成或管理 service worker。

If your application requires offline support or advanced caching,
you need to configure a service worker yourself using standard
web tooling or third-party solutions such as [Workbox][workbox].

若应用需要离线支持或高级缓存，
需要使用标准 Web 工具或 [Workbox][workbox] 等第三方方案
自行配置 service worker。

For more information on building custom service workers,
check out [Using service workers][].

有关构建自定义 service worker 的更多信息，
请参阅 [使用 service worker][Using service workers]。

If your service worker is not refreshing, configure your CDN and
browser cache by setting the `Cache-Control` header to a small
value such as 0 or 60 seconds.

若 service worker 没有刷新，请配置 CDN 和浏览器缓存，
把 `Cache-Control` 标头设为较小的值，例如 0 或 60 秒。

[building a web app with Flutter]: /platform-integration/web/building
[Creating responsive apps]: /ui/adaptive-responsive
[documentation for conditional imports]: {{site.dart-site}}/interop/js-interop/package-web#conditional-imports
[Embedding Flutter web]: /platform-integration/web/embedding-flutter-web
[file an issue]: {{site.repo.flutter}}/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[`http`]: {{site.pub}}/packages/http
[http-cache]: https://web.dev/articles/http-cache
[`iframe`]: https://html.com/tags/iframe/
[isolates]: {{site.dart-site}}/guides/language/concurrency
[Issue 32248]: {{site.repo.flutter}}/issues/32248
[Preparing a web app for release]: /deployment/web
[roadmap]: {{site.repo.flutter}}/blob/master/docs/roadmap/Roadmap.md#web-platform
[run your web apps in any supported browser]: /platform-integration/web/building#create-and-run
[Using service workers]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
[Web content in Flutter]: /platform-integration/web/web-content-in-flutter
[Web support for Flutter]: /platform-integration/web
[web workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[workbox]: https://github.com/GoogleChrome/workbox
[`os_detect`]: {{site.pub}}/packages/os_detect
