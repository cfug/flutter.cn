---
# title: Configuring the URL strategy on the web
title: 配置 Web 应用的 URL 策略
# description: Use hash or path URL strategies on the web
description: 在 Web 上使用路径 URL 策略
---

Flutter web apps support two ways of configuring
URL-based navigation on the web:

Flutter Web 应用支持两种基于 URL 的路由的配置方式：

**Hash (default)**
<br> Paths are read and written to the [hash fragment][].
For example, `flutterexample.dev/#/path/to/screen`.


**Hash（默认）**
<br> 路径使用 [# + 锚点标识符][hash fragment] 读写，
  例如：`flutterexample.dev/#/path/to/screen`。

**Path**
<br>  Paths are read and written without a hash. For example,
`flutterexample.dev/path/to/screen`.

**Path**
<br> 路径使用非 # 读写，
  例如：`flutterexample.dev/path/to/screen`。

## Configuring the URL strategy

## 配置 URL 策略

To configure Flutter to use the path instead, use the
[usePathUrlStrategy][] function provided by the [flutter_web_plugins][] library
in the SDK:

让 Flutter 使用 path 策略，请使用 [flutter_web_plugins][]
库中提供的 [`setUrlStrategy`][] 方法。

```dart
import 'package:flutter_web_plugins/url_strategy.dart';

void main() {
  usePathUrlStrategy();
  runApp(ExampleApp());
}
```

## Configuring your web server

## 配置 web 服务器

PathUrlStrategy uses the [History API][], which requires additional
configuration for web servers.

PathUrlStrategy 使用的是 [History API][]，
Web 服务器需要额外进行配置才能支持相关策略。

To configure your web server to support PathUrlStrategy, check your web server's
documentation to rewrite requests to `index.html`. Check your web server's
documentation for details on how to configure single-page apps.

要让 Web 服务器支持 PathUrlStrategy，
你需要查阅 Web 服务器文档，重写对 `index.html` 的请求。
更多细节请查阅 Web 服务器文档，了解如何配置单页应用程序。

If you are using Firebase Hosting, choose the "Configure as a single-page app"
option when initializing your project. For more information see Firebase's
[Configure rewrites][] documentation.

如果你使用 Firebase Hosting 托管，在初始化项目时选择 "配置单页应用" 选项。
更多信息请查看 Firebase 中的 [配置重写][Configure rewrites]。

The local dev server created by running `flutter run -d chrome` is configured to
handle any path gracefully and fallback to your app's `index.html` file.

当你通过 `flutter run -d chrome` 创建并运行本地开发服务器时，
它的默认配置会处理好所有的路径，并回退到应用程序的 `index.html` 文件。

## Hosting a Flutter app at a non-root location

## 将 Flutter 应用部署在子目录下

Update the `<base href="/">` tag in `web/index.html`
to the path where your app is hosted.
For example, to host your Flutter app at
`my_app.dev/flutter_app`, change
this tag to `<base href="/flutter_app/">`.

更新 `web/index.html` 中的 `<base href="/">` 标签为你的应用部署路径。
例如：如果你期望将 Flutter 应用部署在 `myapp.dev/flutter_app`，
则更改此标签为 `<base href="/flutter_app/">`。

Relative `base href` tags are supported for release builds but they must take
into account the full URL where the page was served from.
This means a relative `base href` for a request to `/flutter_app/`,
`/flutter_app/nested/route`, and `/flutter_app/nested/route/` will be different
(for example `"."`, `".."`, and `"../.."` respectively).

构建支持相对路径的 `base href` 标签，
但必须要考虑到页面完整的 URL。
这意味着，对于请求 `/flutter_app/`、
`/flutter_app/nested/route` 和 `/flutter_app/nested/route/`，
`base href` 的相对路径会不同
（例如，分别为 `"."`、`".."` 和 `"../.."`）。

[hash fragment]: https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax
[`HashUrlStrategy`]: {{site.api}}/flutter/flutter_web_plugins/HashUrlStrategy-class.html
[`PathUrlStrategy`]: {{site.api}}/flutter/flutter_web_plugins/PathUrlStrategy-class.html
[`setUrlStrategy`]: {{site.api}}/flutter/flutter_web_plugins/setUrlStrategy.html
[`url_strategy`]: {{site.pub-pkg}}/url_strategy
[usePathUrlStrategy]: {{site.api}}/flutter/flutter_web_plugins/usePathUrlStrategy.html
[flutter_web_plugins]: {{site.api}}/flutter/flutter_web_plugins/flutter_web_plugins-library.html
[History API]: https://developer.mozilla.org/en-US/docs/Web/API/History_API
[Configure rewrites]: {{site.firebase}}/docs/hosting/full-config#rewrites
