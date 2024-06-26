---
# title: Report errors to a service
title: 把报错信息通过服务上传
# description: How to keep track of errors that users encounter.
description: 如何持续收集报错信息。
---

<?code-excerpt path-base="cookbook/maintenance/error_reporting/"?>

While one always tries to create apps that are free of bugs,
they're sure to crop up from time to time.
Since buggy apps lead to unhappy users and customers,
it's important to understand how often your users
experience bugs and where those bugs occur.
That way, you can prioritize the bugs with the
highest impact and work to fix them.

开发者总是试图创造没有 bug 的应用，但是 bug 还是会时不时地出现。
这些 bug 会给用户带来糟糕的体验，
所以获知 bug 发生的位置以及出现的频率就显得极为关键了。
这样，你就可以根据 bug 的影响程度优先修复它们。

How can you determine how often your users experiences bugs?
Whenever an error occurs, create a report containing the
error that occurred and the associated stacktrace.
You can then send the report to an error tracking
service, such as [Bugsnag][], [Datadog][],
[Firebase Crashlytics][], [Rollbar][], or Sentry.

如何确定用户遇到 bug 的频率呢？
解决方案是：当异常发生时，生成一份日志，日志中包含发生的异常及相关的堆栈信息。
随后，可以将日志发送到异常监控报警平台，比如
[Bugsnag][]、Fabric、[Firebase Crashlytics][]、
[Rollbar][] 或 Sentry。

The error tracking service aggregates all of the crashes your users
experience and groups them together. This allows you to know how often your
app fails and where the users run into trouble.

异常监控报警平台会将上报的崩溃日志异常信息聚合并分组归类，
这样就可以知道应用程序出现异常的频率并定位异常发生位置。

In this recipe, learn how to report errors to the
[Sentry][] crash reporting service using
the following steps:

这个章节中，你可以通过以下步骤学习如何把异常信息
上报给异常监控报警平台 [Sentry][]：

  1. Get a DSN from Sentry.

     从 Sentry 平台获取 DSN
     
  2. Import the Flutter Sentry package

     导入 Sentry package

  3. Initialize the Sentry SDK

     初始化 Sentry SDK

  4. Capture errors programmatically

     捕获并上报异常

## 1. Get a DSN from Sentry

## 1. 从 Sentry 平台获取 DSN

Before reporting errors to Sentry, you need a "DSN" to uniquely identify
your app with the Sentry.io service.

在向 Sentry 上报异常信息前，需要在 Sentry.io 上获取应用的唯一身份标识 DSN。

To get a DSN, use the following steps:

根据以下步骤，获取 DSN：

  1. [Create an account with Sentry][].

     [创建 Sentry 账户][Create an account with Sentry]

  2. Log in to the account.

     登录账户

  3. Create a new Flutter project.

     新建一个 Flutter 工程

  4. Copy the code snippet that includes the DSN.

     复制包含 DSN 的代码片段

## 2. Import the Sentry package

## 2. 导入 Sentry 包

Import the [`sentry_flutter`][] package into the app.
The sentry package makes it easier to send
error reports to the Sentry error tracking service.

导入 [`sentry_flutter`][] package 到应用中，
这个 package 能更方便的将错误报告发送给
Sentry 的错误追踪系统。

To add the `sentry_flutter` package as a dependency,
run `flutter pub add`:

运行 `flutter pub add` 将 `sentry_flutter` 添加为依赖：

```console
$ flutter pub add sentry_flutter
```

## 3. Initialize the Sentry SDK

## 3. 创建 `SentryClient`

Initialize the SDK to capture different unhandled errors automatically:

初始化 SDK 来自动捕获不同的未处理的错误。

<?code-excerpt "lib/main.dart (InitializeSDK)"?>
```dart
import 'package:flutter/widgets.dart';
import 'package:sentry_flutter/sentry_flutter.dart';

Future<void> main() async {
  await SentryFlutter.init(
    (options) => options.dsn = 'https://example@sentry.io/example',
    appRunner: () => runApp(const MyApp()),
  );
}
```

Alternatively, you can pass the DSN to Flutter using the `dart-define` tag:

另外，你也可以使用 `dart-define` 标记将 DSN 传递给 Flutter。

```sh
--dart-define SENTRY_DSN=https://example@sentry.io/example
```

### What does that give me?

### 这番操作都发生了什么？

This is all you need for Sentry to
capture unhandled errors in Dart and native layers.  
This includes Swift, Objective-C, C, and C++ on iOS, and
Java, Kotlin, C, and C++ on Android.

使用 Sentry 捕获 Dart 和原生中未处理的错误，以上这些操作就足够了。
这包括 iOS 上的 Swift、Objective-C、C 和 C++，
以及 Android 上的 Java、Kotlin、C 和 C++。

## 4. Capture errors programmatically

## 4. 捕获并上报异常

Besides the automatic error reporting that Sentry generates by
importing and initializing the SDK,
you can use the API to report errors to Sentry:

除了自动初始化 Sentry SDK 来捕获和上报错误之外，
你还可以通过 API 来报告错误：

<?code-excerpt "lib/main.dart (CaptureException)"?>
```dart
await Sentry.captureException(exception, stackTrace: stackTrace);
```

For more information, see the [Sentry API][] docs on pub.dev.

更多相关信息，请参阅 pub.dev 上的 [Sentry API][] 文档。

## Learn more

## 了解更多

Extensive documentation about using the Sentry SDK can be found on [Sentry's site][].

更多关于使用 Sentry SDK 的文档可以在 [其官网][Sentry's site] 查看。

## Complete example

## 完整样例

To view a working example,
see the [Sentry flutter example][] app.

查看 [Sentry flutter example][] 示例应用，体验完整流程。


[Sentry flutter example]: {{site.github}}getsentry/sentry-dart/tree/main/flutter/example
[Create an account with Sentry]: https://sentry.io/signup/
[Bugsnag]: https://www.bugsnag.com/platforms/flutter
[Datadog]: https://docs.datadoghq.com/real_user_monitoring/flutter/
[Rollbar]: https://rollbar.com/
[Sentry]: https://sentry.io/welcome/
[`sentry_flutter`]: {{site.pub-pkg}}sentry_flutter
[Sentry API]: {{site.pub-api}}sentry_flutter/latest/sentry_flutter/sentry_flutter-library.html
[Sentry's site]: https://docs.sentry.io/platforms/flutter/
[Firebase Crashlytics]: {{site.firebase}}docs/crashlytics
