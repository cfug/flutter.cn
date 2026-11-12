---
# title: FAQ
title: 常见问题与解答
# description: Frequently asked questions and answers about Flutter.
description: 与 Flutter 相关的常见问题与解答
showBreadcrumbs: false
tags: Flutter参考资料
keywords: Flutter常见问题和答案,Flutter的优势
---

## Introduction

This page collects common questions about Flutter.
You can also check out the following specialized FAQs:

本页面收集了关于 Flutter 一些大家常见问题的解答。
你可能还会想要查看下面一些特别的答疑：

* [Web FAQ][]
* [Performance FAQ][]

[Performance FAQ]: /perf/faq
[Web FAQ]: /platform-integration/web/faq

### What is Flutter?

Flutter is Google's open source framework
for crafting beautiful, natively compiled applications
for mobile (iOS, Android), web, desktop (macOS, Windows, Linux),
and embedded devices from a single codebase.
Flutter works with existing code,
is used by developers and organizations worldwide,
and is free and open source.

Flutter 是 Google 的便携式 UI 工具包，
帮助你在移动、web、桌面端创造高质量的绝妙原生体验的应用。
Flutter 可以和世界上的开发人员和开发组织广泛使用的那些现存代码一起使用，
并且是开源的、免费的。

### Who is Flutter for?

For developers, Flutter accelerates app development
and reduces the cost and complexity of building across platforms.

For designers, Flutter provides a flexible canvas
for high-end user experiences.
It turns concepts into production code
without the compromises imposed by traditional cross-platform frameworks.

对于设计师来说，Flutter 提供了一个能够实现高保真度用户体验的画布。
Fast 公司评价 Flutter 是
[一个设计灵感的源泉][one of the top design ideas of the decade]，
提供了将概念转换为生产代码的能力，却没有典型的框架强加的妥协。
Flutter 同时也是一个能提高生产力的原型工具，
例如可拖入文件加载的 [FlutterFlow][] 和基于 Web 的 IDE [Zapp!][]。

For engineering managers and businesses,
Flutter enables the unification of app developers into a single team,
building branded apps for multiple platforms from a single codebase.
Flutter speeds feature development and synchronizes release schedules
across your customer base.

### How much development experience do I need to use Flutter?

Flutter is approachable to programmers familiar with object-oriented
and imperative or declarative programming concepts.
Experience with languages such as Java, Kotlin, Swift, TypeScript,
or C# helps you learn Dart and Flutter quickly.

就我们亲历过的例子来说，
编程经验并不丰富的人们一样可以学习并使用 Flutter 进行原型设计和应用开发。

### What kinds of apps can I build with Flutter?

Flutter supports building mobile apps on Android and iOS,
web applications, desktop apps on macOS, Windows, and Linux,
and embedded device interfaces.

Apps that require custom, branded designs are well suited for Flutter.
You can also create pixel-perfect experiences that match
Android's Material Design and iOS's Cupertino design languages.

Flutter's [package ecosystem][] on pub.dev supports a wide variety of hardware
(such as camera, GPS, Bluetooth, network, and local storage)
and cloud services (such as authentication, notifications, payments, and storage).
[package ecosystem]: {{site.pub}}/flutter

### Who makes Flutter?

Flutter is an open source project managed by Google,
with contributions from a global community of developers,
companies, and individuals.

Flutter 是一个开源项目，由 Google 和开发社区共同创造。

### Who uses Flutter?

Developers and organizations worldwide use Flutter to build
natively compiled applications.
To explore apps built with Flutter, visit the [showcase][].

Google 内部和外部的开发者使用 Flutter 为 Android 和 iOS 构建精美的原生应用。
你可以访问 [案例页面][showcase] 来了解一些知名的开发者 / 组织。

[showcase]: {{site.main-url}}/showcase

### What makes Flutter unique?

Flutter differs from most cross-platform alternatives
because it doesn't rely on web browser views
or system-provided platform widgets.
Instead, Flutter renders its UI using its own high-performance
rendering engine ([Impeller][]).

In addition, Flutter implements most of its framework
(including compositing, gestures, animation, and widgets) in [Dart][].
This architecture gives you deep control over the UI,
high predictability, and the ability to inspect or modify
the framework at any level.

Flutter 与其它工具的不同之处还在于，它只有一层简洁的 C/C++ 代码，
在这之上，Flutter 使用 [Dart][] (一种现代化的、简洁的面向对象语言)
实现其大部分系统功能 (布局、手势、动画、框架、Widget 等)，
这种语言使得开发者可以轻松地进行阅读、更改、替换或删除。
这些特性都为开发者提供了巨大的系统控制权限，同时显著降低了访问大多数系统功能的门槛。

[Dart]: {{site.dart-site}}/
[Impeller]: /perf/impeller

### Should I build my next production app with Flutter?

Yes. Thousands of organizations, from early-stage startups
to large enterprises, deploy production Flutter apps
to hundreds of millions of users.
Explore real-world examples in the [showcase][].

Flutter releases updates on a regular cadence,
bringing performance improvements, new features,
and platform updates to the stable channel.

## What does Flutter provide?

## Flutter 能够为我们提供什么？

### What is inside the Flutter SDK?

The Flutter SDK includes:

* High-performance 2D rendering engine ([Impeller][])
* Modern, reactive framework written in Dart
* Rich set of widgets implementing Material Design 3 and Cupertino (iOS-style)
* APIs for unit, widget, and integration tests
* Interop and plugin APIs to connect to system features and native SDKs
* Headless test runner for running tests on Windows, Linux, and macOS
* [Flutter DevTools][] for profiling, debugging, and inspecting your app
* Command-line tools for creating, building, testing, and compiling apps

[Flutter DevTools]: /tools/devtools

  命令行工具，用于创建、开发、测试和编译你的应用程序

### Does Flutter work with any editors or IDEs?

Flutter provides plugins and extensions for [VS Code][],
[Antigravity][] (an AI-assisted IDE), [Android Studio][],
and [IntelliJ IDEA][].
See [editor configuration][] for setup details,
and [VS Code][] and [Android Studio/IntelliJ][] for usage guidance.

You can also run the `flutter` command from a terminal
along with any editor that supports [editing Dart][].

[Android Studio]: {{site.android-dev}}/studio
[Android Studio/IntelliJ]: /tools/android-studio
[Antigravity]: /ai/get-started
[editing Dart]: {{site.dart-site}}/tools
[editor configuration]: /tools/editors
[IntelliJ IDEA]: https://www.jetbrains.com/idea/
[VS Code]: https://code.visualstudio.com/

### Does Flutter come with a framework?

Yes. Flutter includes a modern, reactive framework.
The framework is layered and customizable,
allowing you to use high-level widgets or interact directly
with lower layers of the rendering pipeline.

是的，Flutter 自带了现代化的开发框架，灵感正是来自 React。
Flutter 的框架旨在实现分层、可定制 (以及灵活的开发选项)。
开发者可以选择仅使用框架的一部分，或是使用另外的框架。

### Does Flutter come with widgets?

Yes. Flutter ships with a collection of high-quality
[Material Design and Cupertino (iOS-style) widgets][widgets],
layouts, and themes.
You can use these widgets as provided,
customize them, or create custom widgets.

是的，Flutter 自带了一套
[高品质的 Material Design 和 Cupertino (iOS 风格) Widget][widgets]、
布局和主题。当然，这些 Widget 只是一个起点。
Flutter 的设计目的就是，让你轻松创建自己的 Widget，或是定制现有的 Widget。

[widgets]: /ui/widgets

### Does Flutter support Material Design?

Yes. Flutter provides full support for [Material Design 3][widget catalog],
Google's design system.

是的，Flutter 和 Material 团队密切合作，完全支持 Material Theming。
你可以通过 [widget 目录][widget catalog]
了解支持 Material 2 和 3 的 widget。

[widget catalog]: /ui/widgets/material

### Does Flutter come with a testing framework?

Yes. Flutter provides built-in support for unit, widget,
and integration testing.
To learn more, see [Testing overview][].

[Testing overview]: /testing/overview

### Does Flutter come with debugging tools?

Yes. Flutter includes [Flutter DevTools][].
For more information, see [Debugging Flutter apps][]
and the [Flutter DevTools][] documentation.

[Debugging Flutter apps]: /testing/debugging

### Does Flutter come with a dependency injection framework?

### Flutter 是否带有依赖注入 (dependency injection) 的框架？

Flutter doesn't require an opinionated dependency injection framework.
The Flutter ecosystem offers several packages for dependency injection
and service location, such as [Riverpod][], [get_it][],
[Provider][], and [injectable][].

[get_it]: {{site.pub}}/packages/get_it
[injectable]: {{site.pub}}/packages/injectable
[Provider]: {{site.pub}}/packages/provider
[Riverpod]: {{site.pub}}/packages/riverpod

## Technology

## 技术篇

### What technology is Flutter built with?

Flutter is built with C, C++, and Dart.
It uses [Impeller][] as its default rendering engine,
taking advantage of modern graphics APIs such as Metal on iOS and macOS,
and Vulkan on Android.
For a detailed description of Flutter's layered architecture,
read the [architectural overview][].

Flutter 使用 C、C++、Dart、Skia (2D 渲染引擎)
以及 [Impeller][] (iOS 默认的渲染引擎) 构建。
你可以参阅下面这张 [架构图][architecture diagram] 来理解其主要构建。
若你需要了解 Flutter 的分层架构，请阅读 [架构概览][architectural overview]。

[architectural overview]: /resources/architectural-overview

### How does Flutter run my code on Android? {:#run-android}

The engine's C and C++ code is compiled using Android's NDK.
The Dart code (both the framework and your application code)
is ahead-of-time (AOT) compiled into native machine code.
These libraries are packaged into a runner Android project
and built into an APK or Android App Bundle (AAB).
When launched, the app loads the Flutter engine,
which executes the compiled code and renders the UI.

During debug mode, Flutter runs inside the Dart VM
to enable stateful [hot reload][],
allowing you to make changes to your running code without recompiling.
A "debug" banner in the top right corner indicates
that the app is running in debug mode.

调试模式时，Flutter 使用虚拟机 (VM) 来运行 Dart 代码
（因此这时会显示 "Debug" 字样，以提醒开发者速度会稍微变慢），
这样便可以启用有状态热重载 (Stateful Hot Reload)，
它能够让你无需重新编译整个应用就能看到代码变更带来的变化。
当运行该模式时，你可以看到一个 “debug” banner 在你应用的右上角。
请记住，这时的性能并不是最终发布应用时的性能。

### How does Flutter run my code on iOS? {:#run-ios}

The engine's C and C++ code is compiled with LLVM.
The Dart code (both the framework and your application code)
is ahead-of-time (AOT) compiled into native ARM machine code.
The compiled code is packaged into a runner iOS project
and built into an `.ipa` bundle.
When launched, the app loads the Flutter engine,
which executes the compiled code and renders the UI using Impeller.

During debug mode, Flutter runs inside the Dart VM
to enable stateful [hot reload][].
A "debug" banner in the top right corner indicates
that the app is running in debug mode.

在 debug 模式下，Flutter 使用虚拟环境 (VM) 来运行代码，
使其可以保持状态并且可以热重载，
这个功能让你可以在无需重新编译的前提下立刻看到新代码生效的结果。
在 debug 模式下，你会看到右上角有一个 "debug" 的横幅条，
它会提醒你 debug 模式下的性能并不代表 release 模式的性能。

### Does Flutter use my operating system's built-in platform widgets?

No. Instead, Flutter renders widgets directly using its own engine,
providing implementations of Material Design and Cupertino (iOS-style) widgets.
You can explore the available widgets in the [widget catalog][catalog of Flutter's widgets].

By rendering pixels directly, Flutter avoids the performance constraints
and behavioral differences of platform widget abstractions.
This approach delivers consistent performance and appearance across platforms.

For cases where you need a platform-native component
(such as Google Maps or a web view),
Flutter supports embedding [platform views][] directly into the widget tree.

另外，使用单一的语言、单个框架和同一组适用于所有 UI 的库
（无论你的 UI 在每个移动平台上都各有不同还是基本一致），
也有助于帮助你降低应用开发和维护成本。

[catalog of Flutter's widgets]: /ui/widgets
[platform views]: /platform-integration/platform-views

### What happens when my mobile OS updates and introduces new widgets?

The Flutter team and community track new design guidelines
and platform widgets from Apple and Google,
updating Flutter's widget libraries accordingly.
Because Flutter widgets are written in Dart,
you can also build or adapt widgets immediately
without waiting for an OS or SDK update.

Flutter 的分层架构旨在支持众多 widget 库，我们鼓励并支持社区构建和维护 widget 库。

### What happens when my mobile OS updates and introduces new platform capabilities?

Flutter's plugin architecture, [platform channels][],
and native interop tools (such as Dart FFI, `ffigen`, and `jnigen`)
allow you to access new OS APIs immediately.
You don't need to wait for a Flutter SDK release to integrate new platform capabilities.

[platform channels]: /platform-integration/platform-channels

Flutter 的互操作 (interop) 和插件 (plugin)
系统旨在使开发者能够立即访问新的移动操作系统特性和功能。
开发者不必等待 Flutter 团队提供新系统功能的访问接口，而是自己第一时间即可使用。

### Does Flutter support code push?

Flutter doesn't provide built-in code push functionality.
Third-party solutions, such as [Shorebird][],
provide code push support for Flutter applications.

Flutter 不支持热更新 (Code Push)，
热更新就是直接向用户设备推送应用程序更新的功能。
不过，我们知道有一种第三方解决方案，
它叫 [Shorebird][]。
请注意，这并非是官方认可或推荐的方案。

[Shorebird]: https://shorebird.dev/

### What operating systems can I use to build a Flutter app?

Flutter supports development on macOS, Windows, Linux, and ChromeOS.
For details on system requirements, see the [install guide][install].

[install]: /install

Flutter 支持使用 Linux、Mac 和 Windows 进行开发。

### What language is Flutter written in?

The Flutter framework is written in [Dart][].
The underlying engine and graphics pipeline are implemented in C and C++.

[Dart][] 是一个现代化高度发展，并为终端应用专门优化的语言。
底层图形框架和 Dart 虚拟机在 C/C++ 中实现。

### Why did Flutter choose to use Dart?

During initial development, the Flutter team evaluated multiple languages
and runtimes before selecting Dart for the framework and widgets.
Dart scored highest across several key evaluation criteria:

在评估时，Dart 在以下主要标准上得分很高：

_Developer productivity_
: Dart supports both JIT (Just-in-Time) compilation for fast development
  with stateful hot reload, and AOT (Ahead-of-Time) compilation
  for efficient native machine code in production.
  Because the framework is written in Dart,
  developers can inspect, debug, and modify the entire stack.

_Object orientation and UI composition_
: Dart's object-oriented structure matches the requirements
  of building composable user interfaces without requiring a separate markup language.

**面向对象**
<br> 对于 Flutter 而言，我们需要一种适合创建可视化用户体验的语言。
  这个领域中沉淀了数十年的面向对象构建 UI 框架的经验。
  虽然我们可以使用非面向对象语言，但这意味着，
  为了解决几个难题，我们要 "重新发明轮子"。
  此外，绝大多数开发者都拥有面向对象开发的经验，
  因此可以更轻松地学习如何使用 Flutter 进行开发。

_Predictable, high performance_
: Dart compiles directly to native machine code without an interpreter or bridge,
  delivering consistent frame rates without unpredictable runtime pauses.

_Fast memory allocation_
: Flutter's reactive framework creates many short-lived objects.
  Dart's generational garbage collector is optimized
  for fast allocation and cleanup of ephemeral objects.

**快速内存分配**
<br> Flutter 框架使用的函数式流程，
很大程度上依赖于下层的内存分配器高效地对小型的、短生命周期的内容进行内存分配。
这个流程是使用支持这种分配机制的语言进行开发的，
在缺少这个机制的语言中无法有效运作。

### Can Flutter run any Dart code?

Flutter can run any Dart code that doesn't depend on libraries
unavailable on the target platform.
For example, mobile and desktop apps can't import web-specific libraries,
and web apps can't use `dart:io`.

### How does Flutter compile for the web?

Flutter compiles Dart for the web to both JavaScript and WebAssembly (Wasm).
WebAssembly compilation (WasmGC) delivers high-performance rendering
comparable to native desktop and mobile apps.
For details, see the [Flutter web documentation][web].

[web]: /platform-integration/web

### How big is the Flutter engine? {:#how-big-is-the-flutter-engine}

A minimal release Flutter application includes the Flutter engine,
the framework, and your application code.
The engine adds a small baseline footprint (a few megabytes compressed),
which varies by target platform and architecture.

App size is largely determined by bundled assets, fonts,
and third-party packages.
To analyze and minimize the size of your application,
see [Measuring your app's size][].
[Measuring your app's size]: /perf/app-size

### How does Flutter define a pixel?

### Flutter 是如何定义像素的？

Flutter uses logical pixels,
which correspond roughly to physical pixels on a standard-density display.
Flutter automatically maps logical pixels to physical device pixels
based on the view's [`devicePixelRatio`][].

[`devicePixelRatio`]: {{site.api}}/flutter/dart-ui/FlutterView/devicePixelRatio.html

## Capabilities

## 赋能

### What kind of app performance can I expect?

Flutter is designed to deliver smooth 60fps and 120fps animations.
Flutter apps compile directly to native machine code or WebAssembly,
eliminating interpreter overhead.
To learn more about performance optimization, see the [Performance FAQ][].



### What kind of developer cycles can I expect? How long between edit and refresh? {:#hot-reload}

Flutter implements a stateful _hot reload_ developer cycle.
You can expect sub-second reload times on physical devices,
emulators, and simulators.

Hot reload preserves your application state,
allowing you to iterate rapidly without navigating back
to the current screen after every code change.

### How is hot reload different from hot restart?

Hot reload injects updated source code files into the running Dart VM
without clearing the application state.
Hot restart resets the application state and re-executes `main()`,
which takes slightly longer than hot reload but remains faster
than a full recompile.

通过将更新的源代码文件注入到正在运行的 Dart VM（虚拟机）中来进行热重载。
这不仅会添加新的类，还会向现有的类中添加方法和字段，并更改现有的函数。
热重启后会将状态重置为应用程序的初始状态。

For more information, see [Hot reload][].


[Hot reload]: /tools/hot-reload

### Where can I deploy my Flutter app?

You can compile and deploy Flutter apps to iOS, Android,
[web][], [desktop][] (macOS, Windows, Linux), and embedded devices.

[desktop]: /platform-integration/desktop

### What devices and OS versions does Flutter run on? {:#what-devices-and-os-versions-does-flutter-run-on}

Flutter supports a broad range of operating systems and hardware platforms:

* Mobile: Android (ARM32, ARM64, x86_64) and iOS (ARM64).
* Desktop: macOS (x86_64, ARM64), Windows (x86_64, ARM64), and Linux (x86_64, ARM64).
* Web: Modern browsers supporting WebAssembly or JavaScript.

For the complete list of supported OS versions,
see [Supported platforms][].

[Supported platforms]: /reference/supported-platforms

### Does Flutter run on the web?

Yes. Flutter web support is available on the stable channel
and supports compilation to both WebAssembly (Wasm) and JavaScript.
For more details, see [Web support for Flutter][web].

### Can I use Flutter to build desktop apps?

Yes. Desktop support is available on the stable channel
for macOS, Windows, and Linux.
For details, see [Desktop support for Flutter][desktop].

可以，Flutter 的桌面端稳定版支持已经适用于
Windows、macOS 和 Linux 啦。

### Can I use Flutter inside of my existing native app?

Yes. You can integrate Flutter into existing Android and iOS applications
using [Add-to-App][add-to-app].

是的，你可以在我们网上内的 [混合应用][add-to-app] 章节中学习。

[add-to-app]: /add-to-app

### Can I access platform services and APIs like sensors and local storage?

Yes. Flutter provides access to platform-specific APIs and hardware
through plugins available on [pub.dev][ready-made packages].
You can also create custom integrations using [platform channels][]
or native interop (Dart FFI).
[ready-made packages]: {{site.pub}}/flutter/

### Can I extend and customize the bundled widgets?

Yes. Flutter's widget system is built around composition.
Instead of subclassing complex widgets,
you compose smaller, single-purpose widgets to create custom designs.
This architecture provides control over layout, painting,
and gesture handling.

这种组合策略使你可以最大限度地控制 widget 的可视化和交互逻辑，
同时重复利用大量代码。在框架中，
我们将复杂的 widget 分解为实现视觉、交互和动效的各部分。
你可以按照自己喜欢的方式重新组合这些 widget，
从而制作出自定义 widget 来完整传达出你的设计意图。

### Why would I want to share layout code across iOS and Android?

Sharing layout and UI code reduces engineering effort,
keeps feature releases synchronized,
and ensures a consistent brand experience across platforms.
When you want platform-specific behavior or styling,
you can adapt the UI using platform checks or responsive layouts.

我们还发现，很多应用都在 iOS 和 Android 上采用了通用的布局模式。
例如，你现在可以在 iOS 和 Android 上很方便地找到“底部导航”设计模式。
移动平台上的设计理念似乎正在趋于一致。

### Can I interop with my mobile platform's default programming language?

Yes. Flutter supports calling native code on all supported platforms:

* On Android: Kotlin and Java via [platform channels][] and [JNI interop][] (`jnigen`).
* On iOS and macOS: Swift and Objective-C via [platform channels][] and [Objective-C/Swift interop][] (`ffigen`).
* On desktop and mobile: C and C++ via Dart FFI ([`dart:ffi`][]).

[JNI interop]: {{site.dart-site}}/interop/java-interop
[Objective-C/Swift interop]: {{site.dart-site}}/interop/objective-c-interop
[`dart:ffi`]: {{site.dart-site}}/interop/c-interop

### Does Flutter come with a reflection / mirrors system?

No. Dart disables `dart:mirrors` in Flutter to enable aggressive
ahead-of-time (AOT) compilation and dead-code elimination (tree shaking).
This keeps binary sizes small and startup times fast.
For metadata inspection and serialization,
Flutter applications use compile-time code generation.

使用静态类型分析系统，我们可以移除任何不会用到的东西（"得益于 tree shaking 机制"）。
如果你导入了一个巨大的 Dart 库，但仅仅用到了一个其中实现的一个两行的函数，
那么你只需要付出这两行函数的代价，即便是这个 Dart 库中导入了非常多非常多的库。
此保证仅 Dart 可以在编译期安全识别代码路径的情况下。
目前，我们已找到其他满足特定需求的方法以提供更好的平衡，如代码生成。

### Are internationalization and localization supported?

Yes. Flutter provides built-in internationalization (i18n)
and localization (l10n) support,
including pluralization, bidirectional text, and date formatting.
To learn more, see [Internationalizing Flutter apps][internationalization documentation].

是的，Flutter 支持国际化 (i18n) 和本地化 (l10n)，
因此你的应用可以适应不同的语言和文化。
你可以在 [国际化文档][internationalization documentation] 中了解更多信息。

[internationalization documentation]: /ui/internationalization

### What accessibility is supported?

Flutter supports standard accessibility features (a11y),
including screen readers (TalkBack, VoiceOver), large text scaling,
high-contrast themes, and hardware switch access.
For details, see [Accessibility][accessibility documentation].

Flutter 支持严格的可访问性/无障碍设计要求 (a11y)。
例如，支持屏幕阅读器、大文本、色彩对比度以及硬件开关控制。
要了解更多信息，请参阅 [无障碍文档][accessibility documentation]。

[accessibility documentation]: /ui/accessibility

### How do I write parallel and/or concurrent apps for Flutter?

Dart uses an event loop for asynchronous operations (`Future` and `Stream`).
For CPU-intensive tasks, Flutter supports isolates—isolated execution
threads with independent memory heaps that communicate through message passing.
You can use [`Isolate.run()`][] or the [`compute()`][] function
to run heavy computations in the background.

[`Isolate.run()`]: {{site.api}}/flutter/dart-isolate/Isolate/run.html
[`compute()`]: {{site.api}}/flutter/foundation/compute.html

### Can I run Dart code in the background of a Flutter app?

Yes. You can execute Dart code in background processes on Android and iOS
using background execution packages and platform service integrations.

### Can I use JSON, XML, or Protocol Buffers with Flutter?

Yes. The Dart ecosystem provides packages on [pub.dev][]
for JSON serialization, XML parsing, Protocol Buffers,
and other data formats.
For details on working with JSON, see [JSON and serialization][JSON tutorial].

有关在 Flutter 中使用 JSON 的详细介绍，你可以查看
[使用 JSON 的教程][JSON tutorial]。

[JSON tutorial]: /data-and-backend/serialization/json
[pub.dev]: {{site.pub}}

### Can I build 3D apps with Flutter?

Yes. Flutter supports 3D graphics through Flutter GPU
and packages such as `flutter_scene`,
which use the Impeller rendering backend to draw 3D scenes.
You can also embed third-party 3D views (such as Unity or native 3D engines)
using platform views.

我们暂不支持通过 OpenGL ES 或类似的机制实现 3D。
在 3D API 方面我们有一个长期的计划，但目前我们专注于呈现 2D。

### Why is my APK or IPA so big?

App bundle size includes the Flutter engine, framework code,
application logic, and bundled assets (such as images, fonts, and audio).
Always create a release build (`flutter build apk` or `flutter build appbundle`
for Android, and `flutter build ipa` for iOS),
which removes debug symbols and enables compiler optimizations.
To analyze and reduce app size, see [Measuring your app's size][].

### Is Flutter ABI compatible?

Flutter and Dart don't provide application binary interface (ABI)
compatibility across different compiler releases.
Always compile your application using matching SDK versions.

Flutter 和 Dart 尚未提供且目前不会提供应用二进制接口 (ABI) 的支持。

### How does Flutter handle scrolling?

Flutter provides platform-specific scroll physics
that match the native scrolling behavior of each platform
(such as momentum scrolling on iOS and overscroll stretch on Android).
For more details, see the [scrolling][] documentation.

每个应用平台都是用自定义滚动实现，以便滚动与对应平台的原生滚动看起来感觉一致。
要了解 Flutter 滚动的更多信息，请参阅 [滚动][scrolling] 文档。

[scrolling]: /ui/layout/scrolling

## Framework

## 框架

### Why is the build() method on State, rather than StatefulWidget?

Placing the `Widget build(BuildContext context)` method on `State`
rather than `StatefulWidget` provides greater flexibility
when subclassing `StatefulWidget` and managing lifecycle state.
For a detailed explanation, see the [API documentation for `State.build`][].

[API documentation for `State.build`]: {{site.api}}/flutter/widgets/State/build.html

### Where is Flutter's markup language? Why doesn't Flutter have a markup syntax?

Flutter UIs are defined in Dart code rather than a declarative markup language.
Defining UI in code enables:

* Fast development with stateful hot reload.
* Full access to programming language features (loops, conditionals, functions).
* Strong type safety and compiler checks.
* Easy refactoring and code reuse across widgets.

Because build methods are standard code,
you can also create widgets dynamically from data or external configurations.

### My app has a Debug banner in the upper right. Why am I seeing that?

By default, `flutter run` launches the app in debug mode.
The debug build configuration runs code inside the Dart VM
to enable stateful [hot reload][],
and enables runtime assertions to catch errors early.
The "Debug" banner indicates that these checks are active.

To run without assertions and with optimized performance,
run the app in release mode using `flutter run --release`
or build a release binary.

### What programming paradigm does Flutter's framework use? {:#what-programming-paradigm-does-flutters-framework-use}

Flutter uses a combination of programming paradigms,
applying each where it is most effective:

Flutter 是一个多范式的编程环境。过去几十年中许多编程技术都有在 Flutter 中使用。
我们在选择范式时会考虑其适用性进行综合性的决策。以下列出的范式不分先后：

**Composition**
: The primary paradigm in Flutter is composing small,
  single-purpose widgets into complex user interfaces.
  For example, the Material [`TextButton`][] widget is composed of
  an [`IconTheme`][], an [`InkWell`][], a [`Padding`][],
  a [`Center`][], a [`Material`][],
  an [`AnimatedDefaultTextStyle`][], and a [`ConstrainedBox`][].

**组合 (composition)** 
<br> 这也是 Flutter 的主要开发范式，将简单的、行为有限的小对象进行组合，
  从而实现更复杂的效果。
  绝大多数 Flutter widget 都是用这种方法构建的。
  比如 Material [`TextButton`][] 类是基于
  [`IconTheme`][]、[`InkWell`][]、[`Padding`][]、[`Center`][]、
  [`Material`][]、[`AnimatedDefaultTextStyle`][]
  以及 [`ConstrainedBox`][] 组合而成的。
  而 [`InkWell`][] 则是由 [`GestureDetector`][] 组成，
  [`Material`][] 则是由
  [`AnimatedDefaultTextStyle`][]、[`NotificationListener`][]
  和 [`AnimatedPhysicalModel`][] 组成。
  如此等等。

**Functional programming**
: Applications can define UI using [`StatelessWidget`][] instances,
  which act as functions mapping configuration inputs to child widgets.
  Flutter uses immutable data structures across its widget hierarchy,
  including [`Widget`][], [`TextStyle`][], and [`Rect`][].

**函数式编程 (functional programming)** 
<br> 整个应用都可以只用 [`StatelessWidget`][] 来构建，它本质上就是一些方法，
  用来描述如何将参数传送给其他方法，以及在布局区域内计算布局以及绘制图像。
  当然这样的应用一般也不会包含状态，所以通常也无法进行交互。
  比如，[`Icon`][] widget 就只是一个将其元素 
  （[颜色][`color`]、[图标][`icon`]、[尺寸][`size`]）罗列在布局区域内的方法。
  另外，当这个范式被重度使用时，则会使用不可变的数据结构，
  如整个 [`Widget`][] 类及其派生，以及一些辅助类，如 [`Rect`][] 和 [`TextStyle`][]。
  另外，从一个较小的尺度来看的话，
  Dart 的 [`Iterable`][] API 也重度使用了这个范式 (如 map, reduce, where 等方法），
  它在框架中经常被用来处理一系列的值。

**Event-driven programming**
: User interactions are represented by event objects
  dispatched to callbacks registered on widgets.
  Classes like [`Listenable`][] formalize event subscription models.

**事件驱动编程 (event-driven programming)** 
<br> 用户的交互操作被包装成事件对象，
  这些对象发送给被各个 event handler 注册的回调方法。
  屏幕内容的更新使用的也是类似的回调机制。
  比如，做为动画系统构建基础的 [`Listenable`][] 类，
  就采用了包含多个事件监听者的订阅模型。

**Class-based object-oriented programming**
: The framework APIs use inheritance to specialize behavior.
  For example, [`RenderBox`][] extends [`RenderObject`][]
  to establish a Cartesian coordinate system for 2D layout.

**Prototype-based object-oriented programming**
: The [`ScrollPhysics`][] class chains instances to compose
  scrolling physics dynamically at runtime.

**原型编程 (prototype-based programming，同样是面向对象编程的一种方式)** 
<br> [`ScrollPhysics`][] 类在运行时动态链接那些会组成滚动逻辑的实例。
  这就使得系统无需在编译时提前选择平台的情况下，
  也能组合出符合平台特性的页面滚动效果。

**Imperative programming**
: Imperative code manages encapsulated state and test execution,
  where step-by-step logic is clearest.

**指令式编程 (imperative programming)** 
<br> 简单直白的指令式编程，通常和对象内封装的状态 (state) 搭配使用，
  这种范式能提供最符合直觉的解法。
  比如，测试就是使用指令式编程实现的，首先描述出测试的环境，
  然后给出测试需要满足的定量，最后开始步进，
  或者根据测试需要插入事件。

**Reactive programming**
: Constructor parameters propagate changes down the widget tree,
  and user interactions trigger updates back up the tree through callbacks.
  State changes schedule rebuilds of affected subtrees.

**响应式编程 (reactive programming)** 
<br> Widget 和元素树有时候被描述为响应式的，
  因为随 widget 构造方法引入的新输入会随着其 build 方法
  传播给更低等级的 widget；
  而底层 widget 中出现的修改 (如响应用户的输入) 也会
  沿着结构树通过 event handler 向上传播。
  在整个框架中，函数-响应式以及指令-响应式的实现都有出现，
  具体取决于 widget 的功能需求。
  Widget 的 build 方法如果只是包含其针对变化如何响应的表达式的话，
  就是函数-响应式 widget (如 Material [`Divider`][] 类)。
  如果 widget 的 build 方法包含一系列构造子元素的表达式，
  用于描述该 widget 如何响应变化的话，
  那它就是指令响应式 widget (如 [`Chip`][] 类)。

**Declarative programming**
: Widget `build` methods describe the desired UI state declaratively,
  leaving layout and rendering updates to the framework.

**Generic programming**
: Generic types enforce type safety across the framework,
  such as parameterizing [`State<T>`][] with its widget type
  and [`GlobalKey<T>`][] with its state type.

**泛型程序设计 (generic programming)** 
<br> 类型可以帮助开发者更早地抓到错误，
  基于这一点，Flutter 框架也采用了泛型开发。
  比如，[`State`][] 类就是如此，其关联的 widget 就是类型参数，
  如此一来 Dart 分析器就能捕获到 state 和 widget 不匹配的情况。
  类似的，[`GlobalKey`][] 类就接受一个类型参数，
  从而类型安全地访问一个 widget 的 state (会使用运行时检查)。
  [`Route`][] 接口也在被 [popped][] 时接受类型参数，
  另外 [`List`][], [`Map`][], [`Set`][] 这些集合也都如此，
  这样就可以在分析或者运行时尽早发现类型不匹配的错误。

**Concurrent programming**
: Flutter uses [`Future`][] and [`Stream`][] for asynchronous operations,
  and isolates for parallel background computation.

**并发 (concurrent programming)** 
<br> Flutter 大量使用诸如 [`Future`][] 等异步 API。
  比如，动画系统就会在动画执行完 future 时进行事件告知。
  同样的，图片加载系统也会使用 future 在加载完毕时进行告知。

**Constraint programming**
: The layout system uses box constraints (minimum and maximum width and height)
  passed down from parent to child to compute geometry in a single pass.

[`AnimatedDefaultTextStyle`]: {{site.api}}/flutter/widgets/AnimatedDefaultTextStyle-class.html
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`ConstrainedBox`]: {{site.api}}/flutter/widgets/ConstrainedBox-class.html
[`Future`]: {{site.api}}/flutter/dart-async/Future-class.html
[`GlobalKey<T>`]: {{site.api}}/flutter/widgets/GlobalKey-class.html
[`IconTheme`]: {{site.api}}/flutter/widgets/IconTheme-class.html
[`InkWell`]: {{site.material_ui}}/InkWell-class.html
[`Listenable`]: {{site.api}}/flutter/foundation/Listenable-class.html
[`Material`]: {{site.material_ui}}/Material-class.html
[`Padding`]: {{site.api}}/flutter/widgets/Padding-class.html
[`Rect`]: {{site.api}}/flutter/dart-ui/Rect-class.html
[`RenderBox`]: {{site.api}}/flutter/rendering/RenderBox-class.html
[`RenderObject`]: {{site.api}}/flutter/rendering/RenderObject-class.html
[`ScrollPhysics`]: {{site.api}}/flutter/widgets/ScrollPhysics-class.html
[`State<T>`]: {{site.api}}/flutter/widgets/State-class.html
[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html
[`Stream`]: {{site.api}}/flutter/dart-async/Stream-class.html
[`TextButton`]: {{site.material_ui}}/TextButton-class.html
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
[`Widget`]: {{site.api}}/flutter/widgets/Widget-class.html

## Project

## 工程管理

### Where can I get support?

To report bugs or request features, file an issue in the
[Flutter issue tracker][issue tracker].

For community discussion, troubleshooting, and advice:

* Join the [Flutter Discord][Discord].
* Ask questions on [Stack Overflow][] using the `flutter` tag.
* Participate in discussions on [Reddit r/FlutterDev][Reddit].
* Visit the [Community][] page for additional resources.

[Community]: {{site.main-url}}/community
[Discord]: https://discord.com/invite/rflutterdev
[issue tracker]: {{site.repo.flutter}}/issues
[Reddit]: https://www.reddit.com/r/FlutterDev/
[Stack Overflow]: {{site.so}}/tags/flutter

### How do I get involved?

Flutter is open source, and contributions are welcome.
You can help by:

* Reporting bugs and feature requests on the [issue tracker][].
* Contributing code and documentation by following the [Contributing guide][].
* Triaging issues or helping other developers on [Discord][] and [Stack Overflow][].

你还可以在 Flutter [Discord][] 上与其他开发人员交流。

[Contributing guide]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md

### Is Flutter open source?

Yes. Flutter is open source and available under the
BSD 3-Clause License on [GitHub][].

是的，Flutter 是开源的。你可以在 [GitHub][] 上获取到它。

[GitHub]: {{site.repo.flutter}}

### Which software license(s) apply to Flutter and its dependencies?

Flutter includes two main components:
the engine (compiled binary with dependencies)
and the framework (Dart source code).

* The framework is licensed under the [BSD 3-Clause License][only one license].
* The engine uses open source dependencies listed in its [license file][].
* Dart packages on pub.dev specify their own individual licenses.

另外，你使用的其他 Dart package 可能有其独有的许可协议。

[license file]: {{site.repo.flutter}}/blob/main/engine/src/flutter/sky/packages/sky_engine/LICENSE
[only one license]: {{site.repo.flutter}}/blob/main/LICENSE

### How can I determine the licenses my Flutter application needs to show?

Flutter provides built-in APIs to display open source licenses:

* If your application uses a `Drawer`, add an [`AboutListTile`][].
* If your application uses Material Design, call [`showAboutDialog`][]
  or [`showLicensePage`][].
* For custom presentations, access the raw licenses from the [`LicenseRegistry`][].

[`AboutListTile`]: {{site.material_ui}}/AboutListTile-class.html
[`LicenseRegistry`]: {{site.api}}/flutter/foundation/LicenseRegistry-class.html
[`showAboutDialog`]: {{site.material_ui}}/showAboutDialog.html
[`showLicensePage`]: {{site.material_ui}}/showLicensePage.html

### Who works on Flutter?

Flutter is developed by engineers at Google along with
hundreds of open source contributors worldwide.
To join the community, see [contribute to Flutter][].
[contribute to Flutter]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md

### What are Flutter's guiding principles?

Flutter is built around three core principles:

我们目前集中于以下三件事：

_Control_
: Developers have full access to and control over every layer of the system.

_Performance_
: Applications deliver smooth, responsive, jank-free experiences.

_Fidelity_
: Applications achieve pixel-perfect, beautiful user experiences on every platform.

### Will Apple or Google reject my Flutter app?

No. Thousands of Flutter apps are published, approved, and featured
in the Apple App Store and Google Play Store.
As with any application, ensure your app complies with
Apple's [App Store Review Guidelines][guidelines]
and Google Play's Developer Program Policies.

[guidelines]: {{site.apple-dev}}/app-store/review/guidelines/
