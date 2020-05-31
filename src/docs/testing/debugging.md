---
title: Debugging Flutter apps
title: 调试 Flutter 应用
description: How to debug your app using the DevTools suite.
description: 如何使用开发者工具来调试你的 Flutter 应用。
---

There are a wide variety of tools and features to help debug
Flutter applications. Here are some of the available tools:

有很多工具和特性可以帮助调试 Flutter 应用程序，如下列举了一些：

* [DevTools][], a suite of performance and profiling
  tools that run in a browser.

  [开发者工具][]，是一套运行在浏览器的性能及分析工具。

* [Android Studio/IntelliJ][], and [VS Code][]
  (enabled with the Flutter and Dart plugins)
  support a built-in source-level debugger with
  the ability to set breakpoints, step through code,
  and examine values.

  [Android Studio/IntelliJ][] 和 [VS Code][]（借助 Flutter 和 Dart 插件）支持内置的源代码调试器，可以设置断点，单步调试，检查数值。

* [Flutter inspector][], a widget inspector available
  in DevTools, and also directly from Android Studio
  and IntelliJ (enabled with the Flutter plugin).
  The inspector allows you to examine a visual
  representation of the widget tree, inspect
  individual widgets and their property values,
  enable the performance overlay, and more.

  [Flutter inspector][]，是开发者工具提供的 widget 检查器，也可直接在 Android Studio 和 IntelliJ 中使用（借助 Flutter 插件）。
  检查器可以可视化展现 widget 树，查看单个 widget 及其属性值，开启性能图层，等等。

## DevTools

## 开发者工具

For debugging and profiling apps, DevTools might be
the first tool you reach for. DevTools runs in a
browser and supports a variety of features:

要调试及分析应用，开发者工具可能是你的首选。
开发者工具运行在浏览器，支持以下特性：

* source-level debugger

  源代码调试器

* widget inspector that displays a visual widget tree,
  and "widget select" mode where you select a widget
  in the app and it drills down to that widget in
  the tree

  widget 检查器，展示可视化的 widget 树；
  “widget select” 模式，在应用中选择一个 widget，会在 widget 树直接定位到它的位置。

* memory profiler

  内存分析

* timeline view that supports tracing, and importing
  and exporting trace information

  时间线视图，支持跟踪，导入及导出跟踪信息

* logging view

  日志视图

If you run your application in [debug mode][] or
[profile mode][], while it's running you can open
DevTools in the browser to connect to your app.
DevTools doesn't work well with an app compiled to
[release mode][], as the debugging and profiling
information has been stripped away.

如果你在 [debug 模式][debug mode] 或 [profile 模式][profile mode] 运行，那么可以在浏览器打开开发者工具连接到你的应用。
开发者工具不能用在以 [release 模式][release mode] 编译的应用，因为调试和分析信息都被删除了。

If you use DevTools for profiling, make sure to
run your application in [profile mode][]. Otherwise,
the main output that appears on your profile are the
debug asserts verifying the framework's various invariants
(see [Debug mode assertions](#debug-mode-assertions)).

如果你要用开发者工具分析应用，需确保使用 [profile 模式][]。
否则，分析的主要输出将会是用于验证框架中各种不变式的调试断言（查看 [debug 模式断言](#debug-mode-assertions)）。

![GIF showing DevTools features]({% asset tools/devtools/inspector.gif @path %}){:width="100%"}

![展示开发者工具特性的 GIF]({% asset tools/devtools/inspector.gif @path %}){:width="100%"}

For more information, see the
[DevTools][] documentation.

想获取更多信息，请查看 [开发者工具][DevTools] 文档。

## Setting breakpoints

## 设置断点

You can set breakpoints directly in your IDE/editor
(such as [Android Studio/IntelliJ][] and [VS Code][]),
in the [DevTools debugger][],
or [programmatically][breakpoints].

要设置断点，可以直接在 IDE 或编辑器（比如 [Android Studio/IntelliJ][] 和 [VS Code][]）、[开发者工具调试器][DevTools debugger] 设置，或者 [通过编码的方式设置][breakpoints]。

## The Dart analyzer

## Dart 分析器

If you're using a [Flutter enabled IDE/editor][],
the Dart analyzer is already checking your code
and looking for possible mistakes.

如果你使用的是 [Flutter 推荐的 IDE 或编辑器][Flutter enabled IDE/editor]，则自带的 Dart 分析器默认会检查代码，并发现可能的错误。

If you run from the command line,
test your code with `flutter analyze`.

如果你使用命令行，则可以使用 `flutter analyze` 检查代码。

The Dart analyzer makes heavy use of type annotations that
you put in your code to help track problems down.
You are encouraged to use them everywhere (avoiding `var`,
untyped arguments, untyped list literals, and so on)
as this is the quickest and least painful way of tracking
down problems.

Dart 分析器非常依赖你在代码中添加的类型注解，以帮助跟踪问题。
建议您在各个地方都加上注解（避免 `var`，无类型参数，无类型 list 字面量，等等），因为这是跟踪问题最快且最不痛苦的方式。

For more information, see [Using the Dart analyzer][].

想获取更多信息，请查看 [使用 Dart 分析器][Using the Dart analyzer]。

## Logging

## 日志

Another useful debugging tool is logging. 
You set logging up [programmatically][logging]
then view the output in the DevTools
[logging view][], or in the console.

另一个有用的调试工具是日志。
通过 [编码][logging] 配置日志，然后在开发者工具中的 [日志视图][logging view] 或控制台查看输出。

## Debugging application layers

## 调试应用层

Flutter was designed with a layered architecture that includes
widget, rendering, and painting layers. For links to more
information and videos, see [The Framework architecture][] on the
[GitHub wiki][], and the community article, [The Layer Cake][].

Flutter 采用分层架构，包括 widget、渲染和绘制等层。
想获取更多信息和视频，请查看 [GitHub wiki][] 上的 [The Framework architecture][]，和社区文章 [The Layer Cake][]。

The Flutter widget inspector provides a visual representation
of the widget tree, but if you want a greater level of detail,
or you want a verbose text-based dump of the widget,
layer, or render trees, see
[Debug flags: application layers][]
in the [Debugging Flutter apps programmatically][] page.

Flutter widget 检查器提供了 widget 树的视觉展现，如果你想要更多细节，
或关于 wiget、层级或渲染树的详尽文本转储，请查看 
[添加输出代码的方式调试 Flutter 应用][Debugging Flutter apps programmatically] 
页面的 [调试标志：应用层][Debug flags: application layers] 部分。

## Debug mode assertions

## Debug 模式断言

During development, you are highly encouraged to use Flutter's
[debug mode][]. This is the default if you use bug icon in
Android Studio, or `flutter run` at the command line.
Some tools support assert statements through the
command-line flag `--enable-asserts`.

在开发过程中，强烈建议您使用 Flutter 的 [debug 模式][debug mode]。
如果你是用 Android Studio 的 bug 图标运行，或者在命令行执行 `flutter run`，则默认会使用 debug 模式。
有些工具通过 `--enable-assets` 命令行标志可以支持断言语句。

In this mode, Dart assert statements are enabled,
and the Flutter framework evaluates the argument
to each assert statement encountered during execution,
throwing an exception if the result is false.
This allows developers to enable or disable invariant
checking, such that the associated performance cost
is only paid during debugging sessions.

在此模式，Dart 断言语句被开启，Flutter 框架在执行时会计算每一个遇到的断言语句的参数，当结果是 false 时抛出异常。
如此一来，开发者可以控制不变式检查的开启或关闭，相应的性能损耗将只发生在调试期间。

When an invariant is violated, it's reported to the
console, with some context information to help track
down the source of the problem.

有不变式被违反时，它会被报告给控制台，并携带一些帮助跟踪问题源的上下文信息。

For more information, see [`Assert`][] in the
[Dart language tour][].

想获取更多信息，请查看 [探索 Dart 语言][Dart language tour] 中的 [断言][Assert] 部分。

## Debugging animations

## 调试动画

The easiest way to debug animations is to slow them down.
The [Flutter inspector][] provides a **Slow Animations** button,
or you can [slow the animations programmatically][].

调试动画最简单的方法是让它们变慢。
[Flutter inspector][] 提供一个 **放慢动画**(Slow Animations) 的按钮，你也可以 [在代码中放慢动画][slow the animations programmatically]。

For more information on debugging janky (non-smooth)
applications, see [Flutter performance profiling][].

想获取更多关于调试动画卡顿的信息，请查看 [Flutter 性能分析][Flutter performance profiling]。

## Measuring app startup time

### 测量应用启动时间

To gather detailed information about the time it takes for your
Flutter app to start, you can run the `flutter run` command
with the `trace-startup` and `profile` options.

要收集有关 Flutter 应用程序启动所需时间的详细信息，可以在运行 `flutter run` 时使用 `trace-startup` 和 `profile` 选项。

```
$ flutter run --trace-startup --profile
```

The trace output is saved as a JSON file called `start_up_info.json`
under the `build` directory of your Flutter project.
The output lists the elapsed time from app startup to these trace
events (captured in microseconds):

跟踪输出被保存到 Flutter 工程目录在 `build` 目录下，一个名为 `start_up_info.json` 的 JSON 文件中。
输出列出了从应用程序启动到这些跟踪事件（以微秒捕获）所用的时间：

+ Time to enter the Flutter engine code.
  
  进入 Flutter 引擎时
  
+ Time to render the first frame of the app.

  展示应用第一帧时

+ Time to initialize the Flutter framework.

  初始化Flutter框架时

+ Time to complete the Flutter framework initialization.

  完成Flutter框架初始化时

For example:

例如：

```
{
  "engineEnterTimestampMicros": 96025565262,
  "timeToFirstFrameMicros": 2171978,
  "timeToFrameworkInitMicros": 514585,
  "timeAfterFrameworkInitMicros": 1657393
}
```

## Tracing Dart code

### 跟踪 Dart 代码性能

To perform a performance trace,
you can use the DevTools [Timeline view][].
The Timeline view also supports importing
and exporting trace files. For more
information, see the [Timeline view][] docs.

要进行性能跟踪，你可以使用开发者工具的 [时间线视图][Timeline view]。
时间线视图还支持导入和导出跟踪文件。
想要获取更多信息，请查看 [时间线视图][Timeline view]。

You can also
[perform traces programmatically][],
though these traces can't be imported
into DevTool's Timeline view.

你也可以 [在代码中跟踪][]，不过这些跟踪信息无法导入到开发者模式的时间线视图。

Be sure to use run your app in [profile mode][]
before tracing to ensure that the runtime performance
characteristics closely matches that of your final product.

跟踪时请确保在 [profile 模式][] 运行应用，这样才能保证运行时性能特征同你最终产品高度一致。

## Performance overlay

## 性能图层

To get a graphical view of the performance of your application,
turn on the performance overlay. You can do this in the
by clicking the **Performance Overlay** button in the
[Flutter inspector][].

要图形化展现你应用的性能，可以开启性能图层。
你可以在 [Flutter inspector][] 中点击 **Performance Overlay** 按钮。

You can also turn on the overlay [programmatically][overlay].

你也可以 [在代码中][overlay] 开启该图层。

For information on how to interpret the graphs in the overlay,
see [The performance overlay][] in
the [Flutter performance profiling][] guide.

关于如何解析图层中的图形，请查看 [Flutter 性能分析][Flutter performance profiling] 中的 [性能图层][The performance overlay] 部分。

## Debug flags

## 调试标志

In most cases, you won't need to use the debug flags
directly, as you'll find the most useful debugging
functionality in the [DevTools][] suite. But if you
prefer to use the debug flags directly, see
[Debug flags: performance][] in the
[Debugging Flutter apps programmatically][] page.

大部分情况，你不需要直接使用调试标志，因为可以在 [开发者工具][DevTools] 找到最有用的调试功能。
但是如果你偏好直接使用调试标志，请查看 [添加输出代码的方式调试 Flutter 应用][Debugging Flutter apps programmatically] 中的 [调试标志：性能][Debug flags: performance] 部分。

## Common problems

## 常见问题

The following is a problem that some have encountered on macOS.

下面是一些在 macOS 上遇到的问题。

### "Too many open files" exception (macOS)

### "句柄数超出系统限制" 异常 (macOS)

The default limit for Mac OS on how many files it can have open at a
time is rather low.  If you run into this limit,
increase the number of available
file handlers using the `ulimit` command:

mac OS 在同一时间可以打开多少句柄的默认限制数相当低。如果你达到这个极限，
可以用 `ulimit` 命令增加可用句柄的数量：

```
ulimit -S -n 2048
```

If you use Travis or Cirrus for testing, increase the number of
available file handlers that they can open by adding the same line to
flutter/.travis.yml, or flutter/.cirrus.yml, respectively.

如果您使用 Travis 或 Cirrus 进行测试，
请通过在 flutter/.travis.yml 或 flutter/.cirrus.yml 
中增加同样的命令来增加它们可以打开的句柄数量。

### Widgets marked const that should be equal to each other, aren't

### 被标记为 const 的相同 Widget 应被视为同一对象，然而却并没有

In debug mode, you may find that two `const` widgets that should to all
appearances be equal (because of Dart's constant deduplication) are not.

在 debug 模式下，（由于 Dart 的常量去重策略）你也许会发现两个 `const` 的 widget 长得并不完全一样。

For example, this code should print 1:

例如，下面的代码应该打印 1：

<!--skip-->
```dart
print(<Widget>{ // this is the syntax for a Set<Widget> literal
  const SizedBox(),
  const SizedBox(),
}.length);
```

It should print 1 (rather than 2) because the two constants are the same and sets
coallesce duplicate values (and indeed the analyzer complains that
"Two elements in a set literal shouldn't be equal"). As expected, in release
builds, it does print 1. However, in debug builds it prints 2. This is because the
flutter tool injects the source location of Widget constructors into the code at compile
time, so the code is effectively:

这段代码应该打印 1（而不是 2），这是由于两个常量相同且在同一个 set 中（实际上分析器抱怨
“集合文字中的两个元素不应相等”）。正如我们所期待的那样，在 release 模式下构建的时候，它确实打印了 1。
然而，在 debug 模式下它却打印了 2。这是由于 Flutter tool 在编译期向 Widget 的构造器注入了源位置，
所以下面的代码有效：

<!--skip-->
```dart
print(<Widget>{
  const SizedBox(location: Location(file: 'foo.dart', line: 12)),
  const SizedBox(location: Location(file: 'foo.dart', line: 13)),
}.length);
```

This results in the instances being different, and so they are not deduplicated by the set.
We use this injected information to make the error messages clearer when
a widget is involved in an exception, by reporting where the relevant widget was created.
Unfortunately, it has the visible side-effect of making otherwise-identical constants be
different at compile time.

上面的代码在结果中的实例不同，故它们在 set 中并没有重复。我们使用注入信息汇报相关 widget 的创建信息，使得 widget 出现异常时错误消息会更加清晰。不幸的是，它会导致相同常量在编译期变为不同实例。


To disable this behavior, pass `--no-track-widget-creation` to the `flutter run` command.
With that flag set, the code above prints "1" in debug and release builds, and error messages
include a message saying that they cannot provide all the information that they would otherwise
be able to provide if widget creation tracking was enabled.

要关闭此行为，请在运行 `flutter run` 命令的同时传 `--no-track-widget-creation`。有了这个标记，代码将会在
debug 和 release 模式下打印 1，而错误消息这边会有一条消息说，除非打开 widget 创建跟踪器，否则我们将无法提供完整的信息。

See also:

你也可以查看：

 * Our documentation on [how the Widget Inspector uses widget creation tracking][].

   文档 [Widget Inspector 是如何使用 widget 创建跟踪的][how the Widget Inspector uses widget creation tracking]。
 
 * [WidgetInspectorService.isWidgetCreationTracked][].
 * The `_Location` class in [widget_inspector.dart][].

   [widget_inspector.dart][] 中的 `_Location` 类。

 * The [kernel transform that implements this feature][].

   [实现该功能的核心转换][kernel transform that implements this feature]。

## Other resources

## 其他资源

You might find the following docs useful:

以下是其他一些有用的文档：

* [Performance best practices][]

  [性能优化最佳实践][Performance best practices]

* [Flutter performance profiling][]

  [Flutter 性能分析][Flutter performance profiling]

* [Using an OEM debugger][]

  [使用原生的调试器][Using an OEM debugger]

* [Flutter's modes][]

  [Flutter 构建模式][Flutter's modes]

* [Debugging Flutter apps programmatically][]

  [添加输出代码的方式调试 Flutter 应用][Debugging Flutter apps programmatically]

* [DevTools][]

  [开发者工具][DevTools]

* [Android Studio/IntelliJ][]

* [VS Code][]


[Flutter enabled IDE/editor]: /docs/get-started/editor
[Flutter 推荐的 IDE 或编辑器]: /docs/get-started/editor

[Debugging Flutter apps programatically]: /docs/testing/code-debugging
[添加输出代码的方式调试 Flutter 应用]: /docs/testing/code-debugging
[Debugging Flutter apps programmatically]: /docs/testing/code-debugging
[perform traces programmatically]: /docs/testing/code-debugging#tracing-dart-code-performance
[在代码中跟踪]: /docs/testing/code-debugging#tracing-dart-code-performance
[Debug flags: application layers]: /docs/testing/code-debugging#debug-flags-application-layers
[调试标志：应用层]: /docs/testing/code-debugging#debug-flags-application-layers
[Debug flags: performance]: /docs/testing/code-debugging#debug-flags-performance
[调试标志：性能]: /docs/testing/code-debugging#debug-flags-performance
[slow the animations programmatically]: /docs/testing/code-debugging#debugging-animations
[在代码中放慢动画]: /docs/testing/code-debugging#debugging-animations
[breakpoints]: /docs/testing/code-debugging#setting-breakpoints
[logging]: /docs/testing/code-debugging#logging
[Flutter's modes]: /docs/testing/build-modes
[Flutter 构建模式]: /docs/testing/build-modes
[Flutter performance profiling]: /docs/testing/ui-performance
[Flutter 性能分析]: /docs/testing/ui-performance
[Performance best practices]: /docs/testing/best-practices
[性能优化最佳实践]: /docs/testing/best-practices

[Using an OEM debugger]: /docs/testing/oem-debuggers
[使用原生的调试器]: /docs/testing/oem-debuggers

[The Layer Cake]: https://medium.com/flutter-community/the-layer-cake-widgets-elements-renderobjects-7644c3142401

[GitHub wiki]: {{site.github}}/flutter/flutter/wiki/
[Using the Dart analyzer]: {{site.github}}/flutter/flutter/wiki/Using-the-Dart-analyzer
[使用 Dart 分析器]: {{site.github}}/flutter/flutter/wiki/Using-the-Dart-analyzer
[The Framework architecture]: {{site.github}}/flutter/flutter/wiki/The-Framework-architecture

[Android Studio/IntelliJ]: /docs/development/tools/android-studio#run-app-with-breakpoints
[VS Code]: /docs/development/tools/vs-code#run-app-with-breakpoints
[DevTools]: /docs/development/tools/devtools
[开发者工具]: /docs/development/tools/devtools
[Flutter inspector]: /docs/development/tools/devtools/inspector
[DevTools debugger]: /docs/development/tools/devtools/debugger
[开发者工具调试器]: /docs/development/tools/devtools/debugger
[logging view]: /docs/development/tools/devtools/logging
[日志视图]: /docs/development/tools/devtools/logging
[Timeline view]: /docs/development/tools/devtools/timeline
[时间线视图]: /docs/development/tools/devtools/timeline
[The performance overlay]: /docs/testing/ui-performance#the-performance-overlay
[性能图层]: /docs/testing/ui-performance#the-performance-overlay
[Flutter performance profiling]: /docs/testing/ui-performance
[Flutter 性能分析]: /docs/testing/ui-performance
[overlay]: /docs/testing/code-debugging#performance-overlay
[debug mode]: /docs/testing/build-modes#debug
[debug 模式]: /docs/testing/build-modes#debug
[profile mode]: /docs/testing/build-modes#profile
[profile 模式]: /docs/testing/build-modes#profile
[release mode]: /docs/testing/build-modes#release
[release 模式]: /docs/testing/build-modes#release

[`Assert`]: {{site.dart-site}}/guides/language/language-tour#assert
[Dart language tour]: {{site.dart-site}}/guides/language/language-tour
[探索 Dart 语言]: {{site.dart-site}}/guides/language/language-tour
[how the Widget Inspector uses widget creation tracking]: /docs/development/tools/devtools/inspector#track-widget-creation
[WidgetInspectorService.isWidgetCreationTracked]: {{site.api}}/flutter/widgets/WidgetInspectorService/isWidgetCreationTracked.html
[widget_inspector.dart]: {{site.github}}/flutter/flutter/blob/master/packages/flutter/lib/src/widgets/widget_inspector.dart
[kernel transform that implements this feature]: {{site.github}}/dart-lang/sdk/blob/master/pkg/kernel/lib/transformations/track_widget_constructor_locations.dart
