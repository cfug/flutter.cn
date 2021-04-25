---
title: Handling errors in Flutter
title: 在 Flutter 里处理错误
description: How to control error messages and logging of errors
description: 如何在 Flutter 里处理和打印错误信息
tags: Flutter测试
keywords: Flutter处理错误,Flutter错误报告,FlutterError
---

The Flutter framework catches errors that occur during callbacks
triggered by the framework itself, including errors encountered
during the build, layout, and paint phases. Errors that don't occur
within Flutter's callbacks can't be caught by the framework,
but you can handle them by setting up a [`Zone`][].

Flutter 框架可以捕获运行期间的错误，包括构建期间、布局期间和绘制期间。

All errors caught by Flutter are routed to the
[`FlutterError.onError`][] handler. By default,
this calls [`FlutterError.dumpErrorToConsole`][],
which, as you might guess, dumps the error to the device logs.
When running from an IDE, the inspector overrides this so
that errors can also be routed to the IDE's console,
allowing you to inspect the
objects mentioned in the message.

所有 Flutter 的错误均会被回调方法 [`FlutterError.onError`][] 捕获。
默认情况下，会调用 [`FlutterError.dumpErrorToConsole`][] 方法，
正如方法名表示的那样，将错误转储到当前的设备日志中。
当从 IDE 运行应用时，检查器重写了该方法，
错误也被发送到 IDE 的控制台，可以在控制台中检查出错的对象。

When an error occurs during the build phase,
the [`ErrorWidget.builder`][] callback is
invoked to build the widget that is used
instead of the one that failed. By default,
in debug mode this shows an error message in red,
and in release mode this shows a gray background.

当构建期间发生错误时，回调函数 [`ErrorWidget.builder`][] 会被调用，
来生成一个新的 widget，用来代替构建失败的 widget。
默认情况，debug 模式下会显示一个红色背景的错误页面，
release 模式下会展示一个灰色背景的空白页面。

When errors occur without a Flutter callback on the call stack,
they are handled by the `Zone` where they occur. By default,
a `Zone` only prints errors and does nothing else.

如果在调用堆栈上没有 Flutter 回调的情况下发生错误，
它们由发生区域的 `Zone` 处理。
`Zone` 在默认情况下仅会打印错误，而不会执行其他任何操作。

You can customize these behaviors,
typically by setting them to values in
your `void main()` function.

这些回调方法都可以被重写，通常在 `void main()` 方法中重写。

Below each error type handling is explained. At the bottom
there's a code snippet which handles all types of errors. Even
though you can just copy-paste the snippet, we recommend you
to first get acquainted with each of the error types.

下面解释了所有的错误捕获类型。
在最后的代码段可以用于处理所有类型的错误。
尽管你可以直接复制粘贴代码段，但我们建议你先了解每种错误类型。


## Errors caught by Flutter

## Flutter 导致的错误 

For example, to make your application quit immediately any time an
error is caught by Flutter in release mode, you could use the
following handler:

例如，如果你想在 release 模式下发生错误时立刻关闭应用，
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

  The top-level [`kReleaseMode`][] constant indicates
  whether the app was compiled in release mode.

  顶层的 [`kReleaseMode`][] 常数表示该应用是否在 release 模式下编译。

{{site.alert.end}}

This handler can also be used to report errors to a logging service.
For more details, see our cookbook chapter for 
[reporting errors to a service][].

这个回调方法也可以上报错误到日志服务平台。更多信息可以查看文档
[报错信息通过服务上传][reporting errors to a service]。

## Define a custom error widget for build phase errors

## 自定义一个 ErrorWidget 以展示 build 时的错误

To define a customized error widget that displays whenever
the builder fails to build a widget, use [`MaterialApp.builder`][].

定义一个自定义的 error widget，以当 builder 构建 widget 失败时显示，
请使用 [`MaterialApp.builder`][]。

<!-- skip -->
```dart
class MyApp extends StatelessWidget {
...
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      ...
      builder: (BuildContext context, Widget widget) {
        Widget error = Text('...rendering error...');
        if (widget is Scaffold || widget is Navigator)
          error = Scaffold(body: Center(child: error));
        ErrorWidget.builder = (FlutterErrorDetails errorDetails) => error;
        return widget;
      },
    );
  }
}
```

## Errors not caught by Flutter

## 未被 Flutter 捕获的错误

Consider an `onPressed` callback that invokes an asynchronous function,
such as `MethodChannel.invokeMethod` (or pretty much any plugin).
For example:

假设一个 `onPressed` 回调调用了异步方法，例如 `MethodChannel.invokeMethod`
（或者其他 plugin 的方法）：

<!-- skip -->
```dart
OutlinedButton(
  child: Text('Click me!'),
  onPressed: () async {
    final channel = const MethodChannel('crashy-custom-channel');
    await channel.invokeMethod('blah');
  },
),
```

If `invokeMethod` throws an error, it won't be forwarded to `FlutterError.onError`.
Instead, it's forwarded to the `Zone` where `runApp` was run.

如果 `invokeMethod` 抛出了错误，它不会传递至 `FlutterError.onError`，
而是直接进入 `runApp` 的 `Zone`。

To catch such an error, use [`runZonedGuarded`][].

如果你想捕获这样的错误，请使用 [`runZonedGuarded`][]。

<!-- skip -->
```dart
import 'dart:async';

void main() {
  runZonedGuarded(() {
    runApp(MyApp());
  }, (Object error, StackTrace stack) {
    myBackend.sendError(error, stack);
  });
}
```

Note that if in your app you call `WidgetsFlutterBinding.ensureInitialized()`
manually to perform some initialization before calling `runApp` (e.g.
`Firebase.initializeApp()`), you **must** call
`WidgetsFlutterBinding.ensureInitialized()` inside `runZonedGuarded`:

请注意，如果你的应用在 `runApp` 中调用了
`WidgetsFlutterBinding.ensureInitialized()` 方法来进行一些初始化操作
（例如 `Firebase.initializeApp()`），则必须在 `runZonedGuarded` 中调用
`WidgetsFlutterBinding.ensureInitialized()`：

<!-- skip -->
```dart
runZonedGuarded(() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MyApp());
}
```

{{site.alert.note}}

    Error handling wouldn't work if `WidgetsFlutterBinding.ensureInitialized()`
    was called from the outside.

    如果 `WidgetsFlutterBinding.ensureInitialized()` 在外部调用，
    错误将不会被捕获到。

{{site.alert.end}}

## Handling all types of errors

## 处理所有类型的错误

Say you want to exit application on any exception and to display
a custom error widget whenever a widget building fails - you can base
your errors handling on next code snippet:

如果你想在异常抛出时退出应用，并在 build 错误时展示自定义的 ErrorWidget，
你可以在下面的代码片段的基础上定制你的处理：

<!-- skip -->
```dart
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runZonedGuarded(() async {
    WidgetsFlutterBinding.ensureInitialized();
    await myErrorsHandler.initialize();
    FlutterError.onError = (FlutterErrorDetails details) {
      FlutterError.dumpErrorToConsole(details);
      myErrorsHandler.onError(details);
      exit(1);
    };
    runApp(MyApp());
  }, (Object error, StackTrace stack) {
    myErrorsHandler.onError(error, stack);
    exit(1);
  });
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      builder: (BuildContext context, Widget widget) {
        Widget error = Text('...rendering error...');
        if (widget is Scaffold || widget is Navigator)
          error = Scaffold(body: Center(child: error));
        ErrorWidget.builder = (FlutterErrorDetails errorDetails) => error;
        return widget;
      },
    );
  }
}
```

[`ErrorWidget.builder`]: {{site.api}}/flutter/widgets/ErrorWidget/builder.html
[`FlutterError.onError`]: {{site.api}}/flutter/foundation/FlutterError/onError.html
[`FlutterError.dumpErrorToConsole`]: {{site.api}}/flutter/foundation/FlutterError/dumpErrorToConsole.html
[`kReleaseMode`]:  {{site.api}}/flutter/foundation/kReleaseMode-constant.html
[`MaterialApp.builder`]: {{site.api}}/flutter/material/MaterialApp/builder.html
[reporting errors to a service]: /docs/cookbook/maintenance/error-reporting
[`runZonedGuarded`]: {{site.api}}/flutter/dart-async/runZonedGuarded.html
[`Zone`]: {{site.api}}/flutter/dart-async/Zone-class.html
