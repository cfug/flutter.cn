---
title: Configuring the URL strategy on the web
title: 配置 Web 应用的 URL 策略
description: Use hash or path URL strategies on the web
description: 在 Web 上使用 # 或路径 URL 策略
---

Flutter web apps support two ways of configuring URL-based navigation on the
web:

Flutter Web 应用支持两种基于 URL 的路由的配置方式：

**Hash (default)**: Paths are read and written to the [hash fragment][].
  For example, `flutterexample.dev/#/path/to/screen`.
  
**Hash（默认）**：路径使用 [# + 锚点标识符][hash fragment] 读写，
  例如：`flutterexample.dev/#/path/to/screen`。
  
**Path**:  Paths are read and written without a hash. For example,
  `flutterexample.dev/path/to/screen`.
  
**Path**：路径使用非 # 读写，
  例如：`flutterexample.dev/path/to/screen`。
  
These are set using the [setUrlStrategy][] API with either a [HashUrlStrategy][]
or [PathUrlStrategy][].

使用 [setUrlStrategy][] API 设置 [HashUrlStrategy][] 或者 [PathUrlStrategy][]。
  
## Configuring the URL strategy

## 配置 URL 策略

{{site.alert.note}}

  Flutter uses the hash (`/#/`) location strategy by default. These instructions
  are only required if you would like to use the URL path strategy.
  
  Flutter 默认使用 hash (`/#/`) 定位策略。
  仅当你使用 URL 路径策略时，才需要这份说明。
  
{{site.alert.end}}

{{site.alert.note}}

  You can also try the [url_strategy package][] if you would like to skip this
  setup.
  
  你也可以尝试使用 [url_strategy package][] 来跳过此设置。
  
{{site.alert.end}}

The `setUrlStrategy` API can only be called on the web. The following
instructions show how to use a conditional import to call this function on the
web, but not on other platforms.

`setUrlStrategy` API 只能在 Web 平台使用。
下方的内容将介绍如何在 Web 平台下（仅在 Web 平台可用）
使用条件引入的方式来调用此方法。

1. Include the `flutter_web_plugins` package and call the [setUrlStrategy][]
  function before your app runs:
  
   引入 `flutter_web_plugins` 包，并在你的应用启动前调用 [setUrlStrategy][] 方法：

```yaml
dependencies:
  flutter_web_plugins:
    sdk: flutter
```

2. Create a `lib/configure_nonweb.dart` file with the following:

   创建如下的 `lib/configure_nonweb.dart` 文件：

```dart
void configureApp() {
  // No-op.
}
```

3. Create a `lib/configure_web.dart` file with the following:

   创建如下的 `lib/configure_web.dart` 文件：

<!--skip-->
```dart
import 'package:flutter_web_plugins/flutter_web_plugins.dart';

void configureApp() {
  setUrlStrategy(PathUrlStrategy());
}
```

4. Open `lib/main.dart` and use a conditional import to import `configure_web.dart` when the `html` package
  is available, and `configure_nonweb.dart` when it isn't:
  
   打开 `lib/main.dart`，当 `html` 包可用时，使用条件引入的方式引入 `configure_web.dart`，
   否则引入 `configure_nonweb.dart`：

<!--skip-->
```dart
import 'package:flutter/material.dart';
import 'configure_nonweb.dart' if (dart.library.html) 'configure_web.dart';

void main() {
  configureApp();
  runApp(MyApp());
}
```

## Hosting a Flutter app at a non-root location

## 将 Flutter 应用部署在子目录下

Update the `<base href="/">` tag in `web/index.html` to the path where
your app is hosted. For example, to host your Flutter app at
`myapp.dev/flutter_app`, change
this tag to `<base href="/flutter_app">`.

更新 `web/index.html` 中的 `<base href="/">` 标签为你的应用部署路径。
例如：如果你期望将 Flutter 应用部署在 `myapp.dev/flutter_app`，
则更改此标签为 `<base href="/flutter_app">`。

[Hash fragment]: https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax
[setUrlStrategy]: {{site.master-api}}/flutter/flutter_web_plugins/setUrlStrategy.html
[HashUrlStrategy]: {{site.master-api}}/flutter/flutter_web_plugins/HashUrlStrategy-class.html
[PathUrlStrategy]: {{site.master-api}}/flutter/flutter_web_plugins/PathUrlStrategy-class.html
[url_strategy package]: {{site.pub-pkg}}/url_strategy
