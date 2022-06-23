---
title: Configuring the URL strategy on the web
title: 配置 Web 应用的 URL 策略
description: Use hash or path URL strategies on the web
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
[setUrlStrategy][] function provided by the [flutter_web_plugins][] library in
the SDK.

让 Flutter 使用 path 策略，请使用 [flutter_web_plugins][]
库中提供的 [setUrlStrategy][] 方法。

The `setUrlStrategy` API can only be called on the web.
The following instructions show how to use a conditional
import to call this function on the web,
but not on other platforms.

`setUrlStrategy` API 只能在 Web 平台使用。
下方的内容将介绍如何在 Web 平台下（仅在 Web 平台可用）
使用条件引入的方式来调用此方法。

{{site.alert.note}}

By default, Flutter uses the hash (`/#/`) location strategy.
These instructions are only required if you want to use
the URL path strategy.

Flutter 默认使用 hash (`/#/`) 定位策略，
仅当你使用 URL 路径策略时，才需要这份说明。

Instead of using these setup instructions,
you can also use the [`url_strategy`][] package.

你也可以尝试使用 [`url_strategy`][] package 来跳过此设置。

{{site.alert.end}}

## Web setup

## 设置 Web 平台

First, add `flutter_web_plugins` to your `pubspec.yaml`:

首先，将插件 `flutter_web_plugins` 加入到工程的 `pubspec.yaml` 文件中:

```yaml
dependencies:
  flutter_web_plugins:
    sdk: flutter
```

Then call [setUrlStrategy][] before `runApp()`:

在 `runApp()` 之前调用 [setUrlStrategy][]:

```
import 'package:flutter/material.dart';
import 'package:flutter_web_plugins/flutter_web_plugins.dart';

void main() {
  setUrlStrategy(PathUrlStrategy());
  runApp(MyApp());
}
```

## Cross platform setup

If your app is cross-platform, use Dart's conditional imports feature by
creating three files:

**url_strategy.dart**

```
export 'url_strategy_noop.dart' if (dart.library.html) 'url_strategy_web.dart';
```

**url_strategy_noop.dart**

```
void usePathUrlStrategy() {
  // noop
}
```

**url_strategy_web.dart**

```
import 'package:flutter_web_plugins/flutter_web_plugins.dart';

void usePathUrlStrategy() {
  setUrlStrategy(PathUrlStrategy());
}
```

Then, call `setPathUrlStrategy` before `runApp()`:

**main.dart**

```
import 'package:flutter/material.dart';
import 'url_strategy.dart';

void main() {
  usePathUrlStrategy();
  runApp(MyApp());
}
```

Using conditional imports ensures that the `flutter_web_plugins` library is only
loaded when your app is running on the web.

## Configuring your web server

PathUrlStrategy uses the [History API][], which requires additional
configuration for web servers.

To configure your web server to support PathUrlStrategy, check your web server's
documentation to rewrite requests to `index.html`.Check your web server's
documentation for details on how to configure single-page apps.

If you are using Firebase Hosting, choose the "Configure as a single-page app"
option when initializing your project. For more information see Firebase's
[Configure rewrites][] documentation.

The local dev server created by running `flutter run -d chrome` is configured to
handle any path gracefully and fallback to your app's `index.html` file.

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

[hash fragment]: https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax
[`HashUrlStrategy`]: {{site.api}}/flutter/flutter_web_plugins/HashUrlStrategy-class.html
[`PathUrlStrategy`]: {{site.api}}/flutter/flutter_web_plugins/PathUrlStrategy-class.html
[`setUrlStrategy`]: {{site.api}}/flutter/flutter_web_plugins/setUrlStrategy.html
[`url_strategy`]: {{site.pub-pkg}}/url_strategy
[setUrlStrategy]: https://api.flutter.dev/flutter/flutter_web_plugins/setUrlStrategy.html
[flutter_web_plugins]: https://api.flutter.dev/flutter/flutter_web_plugins/flutter_web_plugins-library.html
[History API]: https://developer.mozilla.org/en-US/docs/Web/API/History_API
[Configure rewrites]: {{site.url}}/development/ui/navigation/url-strategies
