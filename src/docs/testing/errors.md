---
title: Handling errors in Flutter
title: 在 Flutter 里处理错误
description: How to control error messages and logging of errors
description: 如何在 Flutter 里处理和打印错误信息
tags: Flutter测试
keywords: Flutter处理错误,Flutter错误报告,FlutterError
---

The Flutter framework catches errors that occur during callbacks
triggered by the framework itself, including during build, layout, and
paint.

Flutter 框架可以捕获运行期间的错误，包括构建期间、布局期间和绘制期间。

All these errors are routed to the [`FlutterError.onError`][] handler. 
By default, this calls [`FlutterError.dumpErrorToConsole`][],
which, as you might guess, dumps the error to the device logs. When
running from an IDE, the inspector overrides this so that errors can
also be routed to the IDE's console, allowing you to inspect the
objects mentioned in the message.

所有的错误均会被回调方法 [`FlutterError.onError`][] 捕获。
默认情况下，会调用 [`FlutterError.dumpErrorToConsole`][] 方法，
正如方法名表示的那样，将错误转储到当前的设备日志中。
当从 IDE 运行应用时，检查器重写了该方法，
错误也被发送到 IDE 的控制台，可以在控制台中检查出错的对象。

When an error occurs during the build phase, the [`ErrorWidget.builder`][]
callback is invoked to build the widget that is used instead of the
one that failed. By default, in debug mode this shows an error message
in red, and in release mode this shows a gray background.

当构建期间发生错误时，回调函数 [`ErrorWidget.builder`][] 会被调用，
来生成一个新的 widget，用来代替构建失败的 widget。
默认情况，debug 模式下会显示一个红色背景的错误页面，
release 模式下会展示一个灰色背景的空白页面。

You can override each of these, typically by setting them to values in
your `void main()` function.

这些回调方法都可以被重写，通常在 `void main()` 方法中重写。

For example, to make your application quit immediately any time an
error is shown in release mode, you could use the following handler:

例如，当 release 模式下发生错误时，应用理应立即关闭，
可以使用下面的回调方法:

<!-- skip -->
```dart
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  FlutterError.onError = (FlutterErrorDetails details) {
    FlutterError.dumpErrorToConsole(details);
    if (kReleaseMode)
      exit(1);
  };
  runApp(MyApp());
}

// rest of `flutter create` code...
```
{{site.alert.note}}
  Use the top-level [`kReleaseMode`][] constant to determine whether the
  app was compiled in release mode.
{{site.alert.end}}

This handler can also be used to report errors to a logging service.
For more details, see our cookbook chapter for 
[reporting errors to a service][].

这个回调方法也可以上报错误到日志服务平台。更多信息可以查看文档
[报错信息通过服务上传][reporting errors to a service]。


[`FlutterError.onError`]: {{site.api}}/flutter/foundation/FlutterError/onError.html
[`FlutterError.dumpErrorToConsole`]: {{site.api}}/flutter/foundation/FlutterError/dumpErrorToConsole.html
[`ErrorWidget.builder`]: {{site.api}}/flutter/widgets/ErrorWidget/builder.html
[reporting errors to a service]: /docs/cookbook/maintenance/error-reporting
[`kReleaseMode`]:  {{site.api}}/flutter/foundation/kReleaseMode-constant.html
