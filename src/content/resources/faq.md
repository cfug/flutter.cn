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

## 简介

This page collects some common questions asked about
Flutter. You might also check out the following
specialized FAQs:

本页面收集了关于 Flutter 一些大家常见问题的解答。
你可能还会想要查看下面一些特别的答疑：

* [Web FAQ][]
* [Performance FAQ][]

[Web FAQ]: /platform-integration/web/faq
[Performance FAQ]: /perf/faq

### What is Flutter?

### 什么是 Flutter？

Flutter is Google's portable UI toolkit for crafting beautiful,
natively compiled applications for mobile, web,
and desktop from a single codebase.
Flutter works with existing code,
is used by developers and organizations around
the world, and is free and open source.

Flutter 是 Google 的便携式 UI 工具包，
帮助你在移动、web、桌面端创造高质量的绝妙原生体验的应用。
Flutter 可以和世界上的开发人员和开发组织广泛使用的那些现存代码一起使用，
并且是开源的、免费的。

### Who is Flutter for?

### 哪些人会用到 Flutter？

For users, Flutter makes beautiful apps come to life.

对于用户来说，Flutter 将美妙的应用带到了生活中。

For developers, Flutter lowers the bar to entry for building apps.
It speeds app development and reduces the cost and complexity
of app production across platforms.

对于开发者来说，Flutter 降低了应用开发的入门门槛。
它加速了应用开发的过程，减少了跨平台开发的成本以及复杂度。

For designers, Flutter provides a canvas for
high-end user experiences. Fast Company described
Flutter as [one of the top design ideas of the decade][] for
its ability to turn concepts into production code
without the compromises imposed by typical frameworks.
It also acts as a productive prototyping tool
with drag-and-drop tools like [FlutterFlow][]
and web-based IDEs like [Zapp!][].

对于设计师来说，Flutter 提供了一个能够实现高保真度用户体验的画布。
Fast 公司评价 Flutter 是
[一个设计灵感的源泉][one of the top design ideas of the decade]，
提供了将概念转换为生产代码的能力，却没有典型的框架强加的妥协。
Flutter 同时也是一个能提高生产力的原型工具，
例如可拖入文件加载的 [FlutterFlow][] 和基于 Web 的 IDE [Zapp!][]。

For engineering managers and businesses,
Flutter allows the unification of app
developers into a single _mobile, web,
and desktop app team_, building branded
apps for multiple platforms out of a single codebase.
Flutter speeds feature development and synchronizes
release schedules across the entire customer base.

对于工程主管以及雇主来说，Flutter 可以将不同平台的应用开发者，
统一为一个 **移动端、前端和桌面端应用程序** 的团队，共同建立品牌，
并在单个代码库中打造的多个平台的应用程序。
Flutter 加速了跨平台下开发以及同步发布进程的开发进度。

[FlutterFlow]: https://flutterflow.io/
[Zapp!]: https://zapp.run/
[one of the top design ideas of the decade]: https://www.fastcompany.com/90442092/the-14-most-important-design-ideas-of-the-decade-according-to-the-experts

### How much development experience do I need to use Flutter?

### 我需要拥有怎样的开发经验才能使用 Flutter？

Flutter is approachable to programmers familiar with
object-oriented concepts (classes, methods, variables,
etc) and imperative programming concepts (loops,
conditionals, etc).

如果你熟悉面向对象概念 (类、方法、变量等) 和指令式编程概念 (循环、条件等) ，
你会发现 Flutter 很容易上手。

We have seen people with very little programming
experience learn and use Flutter for prototyping
and app development.

就我们亲历过的例子来说，
编程经验并不丰富的人们一样可以学习并使用 Flutter 进行原型设计和应用开发。

### What kinds of apps can I build with Flutter?

### 我可以用 Flutter 构建怎样的应用？

Flutter is designed to support mobile apps that run
on both Android and iOS, as well as interactive apps
that you want to run on your web pages or on the desktop.

Flutter 设计为了让移动应用能够运行在 Android 与 iOS，
以及在 web 和桌面端运行可交互式的应用。

Apps that need to deliver highly branded designs
are particularly well suited for Flutter.
However, you can also create pixel-perfect experiences
that match the Android and iOS design languages with Flutter.

如果你的应用强烈需要表达出品牌个性，Flutter 会非常适合。
不过，即便你想要打造的应用看起来像是股票平台那样复杂，
也可以使用 Flutter 来构建。

Flutter's [package ecosystem][] supports a wide
variety of hardware (such as camera, GPS, network,
and storage) and services (such as payments, cloud
storage, authentication, and [ads][]).

Flutter 的 [软件包生态][package ecosystem] 支持绝大多数硬件
（包括摄像头、GPS、网络以及储存）以及服务
（例如支付、云储存、验证以及 [广告][ads]）。

[ads]: {{site.main-url}}/monetization
[package ecosystem]: {{site.pub}}/flutter

### Who makes Flutter?

### 谁创造了 Flutter？

Flutter is an open source project,
with contributions from Google and other
companies and individuals.

Flutter 是一个开源项目，由 Google 和开发社区共同创造。

### Who uses Flutter?

### 谁在使用 Flutter？

Developers inside and outside of Google use
Flutter to build beautiful natively-compiled
apps for iOS and Android. To learn about some
of these apps, visit the [showcase][].

Google 内部和外部的开发者使用 Flutter 为 Android 和 iOS 构建精美的原生应用。
你可以访问 [案例页面][showcase] 来了解一些知名的开发者 / 组织。

[showcase]: {{site.main-url}}/showcase

### What makes Flutter unique?

### Flutter 有哪些独到之处？

Flutter is different than most other options
for building mobile apps because it doesn't rely
on web browser technology nor the set of widgets
that ship with each device. Instead, Flutter uses
its own high-performance rendering engine to draw widgets.

Flutter 与大多数用来构建移动应用的工具不同，因为它既不使用 WebView，
也不使用设备附带的 OEM Widget，而是使用自己的高性能渲染引擎来绘制 Widget。

In addition, Flutter is different because it only
has a thin layer of C/C++ code. Flutter implements
most of its system (compositing, gestures, animation,
framework, widgets, etc) in [Dart][] (a modern,
concise, object-oriented language) that developers
can easily approach read, change, replace, or remove.
This gives developers tremendous control over the system,
as well as significantly lowers the bar to approachability
for the majority of the system.

Flutter 与其它工具的不同之处还在于，它只有一层简洁的 C/C++ 代码，
在这之上，Flutter 使用 [Dart][] (一种现代化的、简洁的面向对象语言)
实现其大部分系统功能 (布局、手势、动画、框架、Widget 等)，
这种语言使得开发者可以轻松地进行阅读、更改、替换或删除。
这些特性都为开发者提供了巨大的系统控制权限，同时显著降低了访问大多数系统功能的门槛。

[Dart]: {{site.dart-site}}/

### Should I build my next production app with Flutter?

### 我需要使用 Flutter 来构建我的下一个应用吗？

[Flutter 1][] was launched on Dec 4th, 2018,
[Flutter 2][] on March 3rd, 2021, and
[Flutter 3][] on May 10th, 2023.
As of May 2023, over _one million_ apps have shipped using
Flutter to many hundreds of millions of devices.
Check out some sample apps in the [showcase][].

[Flutter 1][] 于 2018 年 12 月推出，
[Flutter 2][] 于 2021 年 3 月 3 日发布，
[Flutter 3][] 于 2023 年 5 月 10 日发布。
至今为止，成千上万使用了 Flutter 的应用已经被安装到了数亿台设备中。
请通过成功 [案例页面][showcase] 了解知名开发者们的成果。

Flutter ships updates on a roughly-quarterly
cadence that improve stability and performance
and address commonly-requested user features.

Flutter 进行了高质量的持续交付更新，优化了稳定性、性能以及一些常见的用户需求。

[Flutter 1]: {{site.google-blog}}/2018/12/flutter-10-googles-portable-ui-toolkit.html
[Flutter 2]: {{site.google-blog}}/2021/03/announcing-flutter-2.html
[Flutter 3]: {{site.google-blog}}/flutter/introducing-flutter-3-5eb69151622f

## What does Flutter provide?

## Flutter 能够为我们提供什么？

### What is inside the Flutter SDK?

### Flutter SDK 里有什么？

Flutter includes:

Flutter 包括了：

* Heavily optimized, mobile-first 2D rendering engine
  with excellent support for text

  针对移动应用深度优化的 2D 渲染引擎，具备出色的文字支持功能

* Modern react-style framework

  现代响应式风格框架

* Rich set of widgets implementing Material Design and iOS-style

  Material Design 风格及 iOS 风格丰富的 widget 组件

* APIs for unit and integration tests

  用于单元测试和集成测试的 API

* Interop and plugin APIs to connect to the system and 3rd-party SDKs

  原生平台交互性和插件 API 可以连接系统及第三方 SDK

* Headless test runner for running tests on Windows, Linux, and Mac

  Headless 测试运行器，用于在 Windows、Linux 和 Mac 上运行测试

* [Flutter DevTools][] (also called Dart DevTools)
  for testing, debugging, and profiling your app

  用于测试、调试和分析你的应用程序的 [Flutter DevTools][]  

* Command-line tools for creating, building, testing, and
  compiling your apps

  命令行工具，用于创建、开发、测试和编译你的应用程序

### Does Flutter work with any editors or IDEs?

### 用 Flutter 开发时可以使用哪些编辑器或 IDE？

We provide plugins for [VS Code][],
[Android Studio][], and [IntelliJ IDEA][].
See [editor configuration][] for setup details,
and [VS Code][] and [Android Studio/IntelliJ][]
for tips on how to use the plugins.

可以通过插件的方式使用
[Android Studio][]、[IntelliJ IDEA][] 和 [VS Code][]
开发 Flutter 应用。请参阅 [边界配置][editor configuration] 以了解如何初始化，
以及 [Android Studio/IntelliJ][] 和 [VS Code][] 如何使用 plugin 的小提示。

[Firebase Studio][], currently in preview,
is an AI-assisted workspace for full-stack,
multiplatform app development in the cloud.
Firebase Studio supports Dart and Flutter. For more information,
check out [Get started with Firebase Studio][].

[Firebase Studio][] 是一个人工智能辅助工作区，
目前为预览版，
用于在云端进行全栈、多平台应用的开发。
Firebase Studio 支持 Dart 和 Flutter。
更多信息，请查看 [开始使用 Firebase Studio][Get started with Firebase Studio] 指南。

[Firebase Studio]: https://firebase.studio/
[Get started with Firebase Studio]: https://firebase.google.com/docs/studio/get-started

Alternatively, you can use the `flutter` command
from a terminal, along with one
of the many editors that support [editing Dart][].

你也可以在命令行中使用 `flutter` 命令，
并配合能编辑 [Dart 语言的编辑器][editing Dart] 进行开发。


[Android Studio]: {{site.android-dev}}/studio
[Android Studio/IntelliJ]: /tools/android-studio
[editing Dart]: {{site.dart-site}}/tools
[editor configuration]: /tools/editors
[IntelliJ IDEA]: https://www.jetbrains.com/idea/
[VS Code]: https://code.visualstudio.com/

### Does Flutter come with a framework?

### Flutter 里存在开发框架吗？

Yes! Flutter ships with a modern react-style framework.
Flutter's framework is designed to be layered and
customizable (and optional). Developers can choose to
use only parts of the framework, or even replace
upper layers of the framework entirely.

是的，Flutter 自带了现代化的开发框架，灵感正是来自 React。
Flutter 的框架旨在实现分层、可定制 (以及灵活的开发选项)。
开发者可以选择仅使用框架的一部分，或是使用另外的框架。

### Does Flutter come with widgets?

### Flutter 里存在 Widget 吗？

Yes! Flutter ships with a set of
[high-quality Material Design and Cupertino
(iOS-style) widgets][widgets], layouts, and themes.
Of course, these widgets are only a starting point.
Flutter is designed to make it easy to create your own
widgets, or customize the existing widgets.

是的，Flutter 自带了一套
[高品质的 Material Design 和 Cupertino (iOS 风格) Widget][widgets]、
布局和主题。当然，这些 Widget 只是一个起点。
Flutter 的设计目的就是，让你轻松创建自己的 Widget，或是定制现有的 Widget。

[widgets]: /ui/widgets

### Does Flutter support Material Design?

### Flutter 支持 Material Design 吗？

Yes! The Flutter and Material teams collaborate closely,
and Material is fully supported. For more information,
check out the Material 2 and Material 3 widgets
in the [widget catalog][].

是的，Flutter 和 Material 团队密切合作，完全支持 Material Theming。
你可以通过 [widget 目录][widget catalog]
了解支持 Material 2 和 3 的 widget。

[widget catalog]: /ui/widgets/material

### Does Flutter come with a testing framework?

### Flutter 带有测试框架吗？

Yes, Flutter provides APIs for writing unit and
integration tests. Learn more about [testing with Flutter][].

是的，Flutter 提供用于编写单元和集成测试的 API。
了解更多有关 Flutter 测试的信息请查看
[测试 Flutter 应用][testing with Flutter]。

We use our own testing capabilities to test our SDK,
and we measure our [test coverage][] on every commit.

我们使用自己的测试功能来测试我们的 SDK，
每次提交代码前我们都会测量提交的 [测试覆盖率][test coverage]。

[test coverage]: https://coveralls.io/github/flutter/flutter?branch=master
[testing with Flutter]: /testing/overview

### Does Flutter come with debugging tools?

### Flutter 是否附带调试工具？

Yes, Flutter comes with [Flutter DevTools][] (also
called Dart DevTools). For more information, see
[Debugging with Flutter][] and the [Flutter DevTools][] docs.

Flutter 本身附带了 [调试工具][Flutter DevTools]（也称为 Dart DevTools）。
你可以在 [调试 Flutter][Debugging with Flutter]
和 [Flutter DevTools][] 文档中了解更多信息。


[Debugging with Flutter]: /testing/debugging
[Flutter DevTools]: /tools/devtools

### Does Flutter come with a dependency injection framework?

### Flutter 是否带有依赖注入 (dependency injection) 的框架？

We don't ship with an opinionated solution,
but there are a variety of packages that offer
dependency injection and service location,
such as [injectable][], [get_it][], [kiwi][], and [riverpod][].

我们并没有提供相关解决方案，
但是这里有许多包提供了依赖注入或服务定位的能力，
例如 [injectable][]、[get_it][]、[kiwi][] 和 [riverpod][]。


[get_it]: {{site.pub}}/packages/get_it
[injectable]: {{site.pub}}/packages/injectable
[kiwi]: {{site.pub}}/packages/kiwi
[riverpod]: {{site.pub}}/packages/riverpod

## Technology

## 技术篇

### What technology is Flutter built with?

### Flutter 是使用什么技术构建的？

Flutter is built with C, C++, Dart,
Skia (a 2D rendering engine),
and [Impeller][] (the default rendering engine on iOS).
See this [architecture diagram][]
for a better picture of the main components.
For a more detailed description of the layered architecture
of Flutter, read the [architectural overview][].

Flutter 使用 C、C++、Dart、Skia (2D 渲染引擎)
以及 [Impeller][] (iOS 默认的渲染引擎) 构建。
你可以参阅下面这张 [架构图][architecture diagram] 来理解其主要构建。
若你需要了解 Flutter 的分层架构，请阅读 [架构概览][architectural overview]。

[architectural overview]: /resources/architectural-overview
[architecture diagram]: https://docs.google.com/presentation/d/1cw7A4HbvM_Abv320rVgPVGiUP2msVs7tfGbkgdrTy0I/edit#slide=id.gbb3c3233b_0_162
[Impeller]: /perf/impeller

### How does Flutter run my code on Android? {:#run-android}

### Flutter 如何在 Android 上运行我的代码？

The engine's C and C++ code are compiled with Android's NDK.
The Dart code (both the SDK's and yours)
are ahead-of-time (AOT) compiled into native, ARM, and x86-64
libraries. Those libraries are included in a "runner"
Android project, and the whole thing is built into an `.apk`.
When launched, the app loads the Flutter library.
Any rendering, input, or event handling, and so on,
is delegated to the compiled Flutter and app code.
This is similar to the way many game engines work.

引擎的 C 和 C++ 代码使用 Android 的 NDK 编译。
Dart 代码 (SDK 的和你写的) 都是预先
(ahead-of-time, AOT) 编译成本地 ARM 及 x86 库。
这些库被包含在一个 Android "runner" 项目中，然后整套内容被编译成一个 APK。
当应用启动时，它会加载 Flutter 库。
任何渲染、输入或事件处理等都会 delegate 给编译好的 Flutter 和应用代码。
这个工作机制与很多游戏引擎颇为相似。

During debug mode, Flutter uses a virtual machine (VM)
to run its code in order to enable stateful hot reload,
a feature that lets you make changes to your running code
without recompilation. You'll see a "debug" banner in
the top right-hand corner of your app when running in this mode,
to remind you that performance is not characteristic of
the finished release app.

调试模式时，Flutter 使用虚拟机 (VM) 来运行 Dart 代码
（因此这时会显示 "Debug" 字样，以提醒开发者速度会稍微变慢），
这样便可以启用有状态热重载 (Stateful Hot Reload)，
它能够让你无需重新编译整个应用就能看到代码变更带来的变化。
当运行该模式时，你可以看到一个 “debug” banner 在你应用的右上角。
请记住，这时的性能并不是最终发布应用时的性能。

### How does Flutter run my code on iOS? {:#run-ios}

### Flutter 如何在 iOS 上运行我的代码？

The engine's C and C++ code are compiled with LLVM.
The Dart code (both the SDK's and yours)
are ahead-of-time (AOT) compiled into a native, ARM library.
That library is included in a "runner" iOS project,
and the whole thing is built into an `.ipa`.
When launched, the app loads the Flutter library.
Any rendering, input or event handling, and so on,
are delegated to the compiled Flutter and app code.
This is similar to the way many game engines work.

引擎的 C 和 C++ 代码使用 LLVM 编译。Dart 代码 (SDK 的和你的)
都是预先 (ahead-of-time, AOT) 编译成本地 ARM 库。
这些库被包含在一个 iOS "runner" 项目中，
然后整套内容被编译成一个 `.ipa`。当应用启动时，
它会加载 Flutter 库。任何渲染、输入或事件处理等都会
代理给编译好的 Flutter 和应用代码。
这个工作机制与很多游戏引擎颇为相似。

During debug mode, Flutter uses a virtual machine (VM)
to run its code in order to enable stateful hot reload,
a feature that lets you make changes to your
running code without recompilation. You'll see
a "debug" banner in the top right-hand corner of
your app when running in this mode, to remind you that
performance is not characteristic of the finished release app.

在 debug 模式下，Flutter 使用虚拟环境 (VM) 来运行代码，
使其可以保持状态并且可以热重载，
这个功能让你可以在无需重新编译的前提下立刻看到新代码生效的结果。
在 debug 模式下，你会看到右上角有一个 "debug" 的横幅条，
它会提醒你 debug 模式下的性能并不代表 release 模式的性能。

### Does Flutter use my operating system's built-in platform widgets?

### Flutter 是否会使用操作系统内置的 widget？

No. Instead, Flutter provides a set of widgets
(including Material Design and Cupertino (iOS-styled) widgets),
managed and rendered by Flutter's framework and engine.
You can browse a [catalog of Flutter's widgets][].

不会。相反，Flutter 自己提供了一套 widget
(包括 Material Design 和 iOS 风格的 Cupertino widget)，
由 Flutter 的框架和引擎负责管理和渲染。
你可以在这里浏览 [Flutter widget 目录][catalog of Flutter's widgets]。

We believe that the end result is higher quality apps.
If we reused the built-in platform widgets,
the quality and performance of Flutter apps would be limited
by the flexibility and quality of those widgets.

我们希望最终能够产生出更高质量的应用。
如果我们直接使用 OEM 自带的 widget，
那么 Flutter 应用的质量和性能将受到这些 widget 质量的限制。

In Android, for example, there's a hard-coded set
of gestures and fixed rules for disambiguating them.
In Flutter, you can write your own gesture recognizer
that is a first class participant in the [gesture system][].
Moreover, two widgets authored by different people can
coordinate to disambiguate gestures.

例如，在 Android 中，有一组硬编码的手势和固定的计算规则来区别它们。
在 Flutter 中，你可以编写自己的手势识别器，
它在 [手势系统][gesture system] 中拥有最高的优先级。
此外，由不同人创作的两个 widget 可以进行协调，以便消除手势的歧义。

Modern app design trends point towards designers and
users wanting more motion-rich UIs and brand-first designs.
In order to achieve that level of customized, beautiful design,
Flutter is architectured to drive pixels instead
of the built-in widgets.

如今的应用设计趋势表明，很多设计师和用户都需要动效丰富的 UI，同时富有品牌表现力。
为了实现这种级别的美学定制化设计，Flutter 在架构上就会倾向于直接驱动像素，
而不是交给 OEM widget 来处理。

By using the same renderer, framework, and set of widgets,
it's easier to publish for multiple platforms from the same
codebase, without having to do careful and costly planning
to align different feature sets and API characteristics.

由于使用相同的渲染器、框架和 widget，
就意味着你能更加轻松地同时发布 iOS 和 Android 版本应用，
而无需耗费精力和成本来规划和同步两套独立的代码库和功能集。

By using a single language, a single framework,
and a single set of libraries for all of your code
(regardless if your UI is different for each platform or not),
we also aim to help lower app development and maintenance costs.

另外，使用单一的语言、单个框架和同一组适用于所有 UI 的库
（无论你的 UI 在每个移动平台上都各有不同还是基本一致），
也有助于帮助你降低应用开发和维护成本。

[catalog of Flutter's widgets]: /ui/widgets
[gesture system]: /ui/interactivity/gestures

### What happens when my mobile OS updates and introduces new widgets?

### 我的移动 OS 更新并加入新的 widget 时会怎么样？

The Flutter team watches the adoption and demand for new mobile
widgets from iOS and Android, and aims to work with the community
to build support for new widgets. This work might come in the form
of lower-level framework features, new composable widgets,
or new widget implementations.

Flutter 团队密切关注来自 iOS 和 Android 的 widget 使用和需求情况，
且会与社区合作，对新的 widget 提供构建支持。
这些支持可能会以这些形式来提供给开发者: 
较低层级的框架功能、新的可编辑组合的 widget，或全新的 widget 实现。

Flutter's layered architecture is designed to support numerous
widget libraries, and we encourage and support the community in
building and maintaining widget libraries.

Flutter 的分层架构旨在支持众多 widget 库，我们鼓励并支持社区构建和维护 widget 库。

### What happens when my mobile OS updates and introduces new platform capabilities?

### 我的移动 OS 更新并加入新的平台功能时会怎么样？

Flutter's interop and plugin system is designed to allow
developers to access new mobile OS features and capabilities
immediately. Developers don't have to wait for the Flutter team
to expose the new mobile OS capability.

Flutter 的互操作 (interop) 和插件 (plugin)
系统旨在使开发者能够立即访问新的移动操作系统特性和功能。
开发者不必等待 Flutter 团队提供新系统功能的访问接口，而是自己第一时间即可使用。

### Does Flutter support code push?

### Flutter 支持热更新 (Code Push) 吗？

Code push, or the ability to push app updates directly to a
user's device, isn't directly supported by Flutter.
However, we are aware of a third party solution,
called [Shorebird][].
Note that this is not an official endorsement or recommendation.

Flutter 不支持热更新 (Code Push)，
热更新就是直接向用户设备推送应用程序更新的功能。
不过，我们知道有一种第三方解决方案，
它叫 [Shorebird][]。
请注意，这并非是官方认可或推荐的方案。

[Shorebird]: https://shorebird.dev/

### What operating systems can I use to build a Flutter app?

### 我能使用哪些操作系统开发 Flutter 应用？

Flutter supports development using Linux, macOS, ChromeOS,
and Windows.

Flutter 支持使用 Linux、Mac 和 Windows 进行开发。

### What language is Flutter written in?

### Flutter 是用哪种语言写成的？

[Dart][], a fast-growing modern language optimized
for client apps. The underlying graphics framework
and the Dart virtual machine are implemented in C/C++.

[Dart][] 是一个现代化高度发展，并为终端应用专门优化的语言。
底层图形框架和 Dart 虚拟机在 C/C++ 中实现。

### Why did Flutter choose to use Dart?

### Flutter 为什么选择使用 Dart？

During the initial development phase,
the Flutter team looked at a lot of
languages and runtimes, and ultimately
adopted Dart for the framework and widgets.
Flutter used four primary dimensions for evaluation,
and considered the needs of framework authors,
developers, and end users. We found many languages
met some requirements, but Dart scored highly on
all of our evaluation dimensions and met all our
requirements and criteria.

在最初的开发阶段，Flutter 团队调研了很多开发语言和运行时，
最终在框架和小部件中采用了 Dart。
Flutter 主要基于四个维度进行评估，并同时考虑了框架作者、开发人员和终端用户的需求。
我们发现许多语言都满足了一些要求，但 Dart 在我们所有的评估维度上都获得了高分，
并且满足了我们的所有要求和标准。

Dart runtimes and compilers support the combination of
two critical features for Flutter: a JIT-based fast
development cycle that allows for shape changing and
stateful hot reloads in a language with types,
plus an Ahead-of-Time compiler that emits efficient
ARM code for fast startup and predictable performance of
production deployments.

Dart 运行时和编译器支持 Flutter 的两个关键功能的组合：
基于 JIT 的高效开发，允许在具有类型的语言中进行形参更改，以及保持状态的热重载；
还有 AOT 编译器，可产出高效的 ARM 代码，为生产部署带来快速启动和可观的性能。

In addition, we have the opportunity to work closely
with the Dart community, which is actively investing
resources in improving Dart for use in Flutter. For
example, when we adopted Dart,
the language didn't have an ahead-of-time
toolchain for producing native binaries,
which is instrumental in achieving predictable,
high performance, but now the language does because the Dart team
built it for Flutter. Similarly, the Dart VM has
previously been optimized for throughput but the
team is now optimizing the VM for latency, which is more
important for Flutter's workload.

此外，我们还有幸与 Dart 社区展开了密切合作，Dart 社区积极投入资源改进 Dart，以便在 Flutter 中更易使用。例如，当我们采用 Dart 时，该语言还没有用于生成原生二进制文件的 AOT 工具链，这些工具有助于实现稳定的高性能表现，但在 Dart 团队为 Flutter 构建了这些工具后，这个缺失已经不复存在了。同样，Dart VM 之前是针对吞吐量进行的优化，但团队现在正在针对延迟进行优化，这对于解决 Flutter 的工作负载更为重要。

Dart scores highly for us on the following primary criteria:

在评估时，Dart 在以下主要标准上得分很高：

_Developer productivity_
<br> One of Flutter's main value propositions is that it
  saves engineering resources by letting developers
  create apps for both iOS and Android with the same codebase.
  Using a highly productive language accelerates
  developers further and makes Flutter more attractive.
  This was very important to both our framework team as
  well as our developers. The majority of Flutter
  is built in the same language we give to our users,
  so we need to stay productive at 100k's lines of code,
  without sacrificing approachability or
  readability of the framework and widgets for our developers.

**开发人员生产力**
<br> Flutter 的主要价值之一，是通过让开发人员用同一套代码，
  创建适用于 iOS 和 Android 的应用而节省开发资源。
  使用高生产力的语言加速开发，并提升 Flutter 的吸引力。
  这对于我们的框架团队和开发人员都很重要。
  Flutter 本身的大部分内容所用的语言都和我们提供给用户的一样，
  所以我们要让十万行代码保持生产力，
  而不会牺牲框架和部件对我们开发人员的可达性和可读性。

_Object-orientation_
<br> For Flutter, we want a language that's suited to
  Flutter's problem domain: creating visual user experiences.
  The industry has multiple decades of experience building
  user interface frameworks in object-oriented languages.
  While we could use a non-object-oriented language,
  this would mean reinventing the wheel to solve several
  hard problems. Plus, the vast majority of developers
  have experience with object-oriented development,
  making it easier to learn how to develop with Flutter.

**面向对象**
<br> 对于 Flutter 而言，我们需要一种适合创建可视化用户体验的语言。
  这个领域中沉淀了数十年的面向对象构建 UI 框架的经验。
  虽然我们可以使用非面向对象语言，但这意味着，
  为了解决几个难题，我们要 "重新发明轮子"。
  此外，绝大多数开发者都拥有面向对象开发的经验，
  因此可以更轻松地学习如何使用 Flutter 进行开发。

_Predictable, high performance_
<br> With Flutter, we want to empower developers to create fast,
  fluid user experiences. In order to achieve that, we need to
  be able to run a significant amount of end-developer code
  during every animation frame. That means we need a language
  that both delivers high performance and predictable
  performance, without periodic pauses that would cause
  dropped frames.

**稳定可期的高性能表现**
<br> 我们希望开发者能够通过 Flutter 创建快速而流畅的用户体验。
  为了实现这一点，我们需要能够在每个动画帧期间运行大量的最终开发者代码。
  这意味着我们需要的语言一方面既要拥有高性能，
  另一方面又需要避免因周期性的中断而影响帧率，即 "可期性"。

_Fast allocation_
<br> The Flutter framework uses a functional-style flow that
  depends heavily on the underlying memory allocator
  efficiently handling small, short-lived allocations.
  This style was developed in languages with this
  property and doesn't work efficiently in languages
  that lack this facility.

**快速内存分配**
<br> Flutter 框架使用的函数式流程，
很大程度上依赖于下层的内存分配器高效地对小型的、短生命周期的内容进行内存分配。
这个流程是使用支持这种分配机制的语言进行开发的，
在缺少这个机制的语言中无法有效运作。

### Can Flutter run any Dart code?

### Flutter 可以运行任意的 Dart 代码吗？

Flutter can run Dart code that doesn't directly or
transitively import `dart:mirrors` or `dart:html`.

Flutter 可以运行那些没有直接或间接导入了
`dart:mirrors` 或 `dart:html` 的库。

### Can Flutter compile Dart to JavaScript?

### Flutter 可以将 Dart 编译为 JavaScript 吗？

Flutter compiles Dart to JavaScript with the
[`js.dart`][] package.

Flutter 使用 [`js.dart`][] package 将 Dart 编译为 JavaScript。

[`js.dart`]: {{site.dart-site}}/tools/dart-compile#js

### How big is the Flutter engine?

### Flutter 引擎有多大？

In March 2021, we measured the download size of a
[minimal Flutter app][] (no Material Components,
just a single `Center` widget, built with `flutter build
apk --split-per-abi`), bundled and compressed as a release APK,
to be approximately 4.3 MB for ARM32, and 4.8 MB for ARM64.

2021 年 3 月，我们实测了一个
[最简版本的 Flutter 应用][minimal Flutter app]
（即不含 Material 组件，只包含一个使用 `flutter build apk --split-per-abi`
构建的 `Center` widget 的 app）
压缩且 Bundle 一个 release 的 APK，
ARM64 下是 4.6 MB，ARM32 下是 4.3 MB。

On ARM32, the core engine is approximately 3.4 MB
(compressed), the framework + app code is approximately
765 KB (compressed), the LICENSE file is 58 KB
(compressed), and necessary Java code (`classes.dex`)
is 120 KB (compressed).

在 ARM32 下，核心的引擎大约占 3.4 MB，框架和应用的代码大约是 765 KB，
许可证文件大约是 58 KB，必要的 Java 代码（classes.dex）是 120 KB。
上述数据均为经过压缩处理之后的大小。

In ARM64, the core engine is approximately 4.0 MB
(compressed), the framework + app code is approximately
659 KB (compressed), the LICENSE file is 58 KB
(compressed), and necessary Java code (`classes.dex`)
is 120 KB (compressed).

在 ARM64 下，核心的引擎大约占 4.0 MB，框架和应用的代码大约是 659 KB，
许可证文件大约是 58 KB，必要的 Java 代码（classes.dex）是 120 KB。
上述数据均为经过压缩处理之后的大小。

These numbers were measured using [apkanalyzer][],
which is also [built into Android Studio][].

这些数字是由 [AndroidStudio][built into Android Studio]
内置的 [apkanalyzer][] 实测得出。

On iOS, a release IPA of the same app has a download
size of 10.9 MB on an iPhone X, as reported by Apple's
App Store Connect. The IPA is larger than the APK mainly
because Apple encrypts binaries within the IPA, making the
compression less efficient (see the
[iOS App Store Specific Considerations][]
section of Apple's [QA1795][]).

在 iOS 平台上，跟据 App Store Connect 的数据，
同一应用的发布 IPA 在 iPhone X 上的下载文件体积为 10.9 MB。
IPA 比 APK 大，主要是因为 Apple 加密了 IPA 中的二进制文件，
使得压缩效率降低。
（可以查看 [iOS App Store Specific Considerations][]
中 [QA1795][] 关于加密的部分）

:::note

The release engine binary used to include LLVM IR (bitcode).
However, Apple [deprecated bitcode in Xcode 14][] and removed support,
so it has been removed from the Flutter 3.7 release.

发布版本的引擎二进制文件曾经包含 LLVM IR（bitcode）。
但是，Apple 已在 [Xcode 14 中废弃][deprecated bitcode in Xcode 14]
并移除了对 bitcode 的支持，因此，
我们也在 Flutter 3.7 版本中移除了 bitcode。

:::

Of course, we recommend that you measure your own app.
To do that, see [Measuring your app's size][].

当然，你的实际情况可能跟我们所说的有所不同，我们建议你测量自己的应用的体积。
想要测量应用体积，请查看 [测量你的应用体积][Measuring your app's size]。


[apkanalyzer]: {{site.android-dev}}/studio/command-line/apkanalyzer
[built into Android Studio]: {{site.android-dev}}/studio/build/apk-analyzer
[deprecated bitcode in Xcode 14]: {{site.apple-dev}}/documentation/xcode-release-notes/xcode-14-release-notes
[iOS App Store Specific Considerations]: {{site.apple-dev}}/library/archive/qa/qa1795/_index.html#//apple_ref/doc/uid/DTS40014195-CH1-APP_STORE_CONSIDERATIONS
[Measuring your app's size]: /perf/app-size
[minimal Flutter app]: {{site.repo.flutter}}/tree/75228a59dacc24f617272f7759677e242bbf74ec/examples/hello_world
[QA1795]: {{site.apple-dev}}/library/archive/qa/qa1795/_index.html

### How does Flutter define a pixel?

Flutter uses logical pixels,
and often refers to them merely as "pixels".
Flutter's [`devicePixelRatio`][] expresses the ratio
between physical pixels and logical CSS pixels.

[`devicePixelRatio`]: {{site.api}}/flutter/dart-html/Window/devicePixelRatio.html

## Capabilities

## 赋能

### What kind of app performance can I expect?

### Flutter 应用会拥有怎样的性能表现？

In general, you can expect excellent performance. Flutter is designed to help
developers easily achieve a constant 60fps. Flutter apps run using natively
compiled code, so no interpreters are involved. This means that Flutter apps
start quickly.

总的来说，Flutter 应用会有很出色的性能。
Flutter 设计的目标就是帮助开发者轻松实现 60fps 的稳定帧率。
Flutter 应用通过原生编译的代码运行，不涉及解释器的过程。
这也意味着 Flutter 应用启动会非常快捷。

Flutter's performance when using native code depends on your
[app's architecture][]. For optimal performance, familiarize yourself with Flutter's
[platform channels][]. These channels provide an asynchronous message-passing
system for communicating with native code.

使用原生代码时，Flutter 的性能取决于你的 [应用架构][app's architecture]。
为了获得最佳性能，请熟悉 Flutter 的 [平台通道][platform channels]。
这些通道提供了与原生代码通信的异步消息传递系统。

To learn more about performance and Flutter, see the [Performance FAQ][].

要了解有关性能和 Flutter 的更多信息，请参阅 [性能常见问题][Performance FAQ]。

[platform channels]: /platform-integration/platform-channels
[app's architecture]: /app-architecture
[Performance FAQ]: /perf/faq



### What kind of developer cycles can I expect? How long between edit and refresh? {:#hot-reload}

### 开发 Flutter 时的操作周期有多长？修改代码和看到界面内容更新之间会隔多久？

Flutter implements a _hot reload_ developer cycle. You can expect
sub-second reload times, on a device or an emulator/simulator.

Flutter 使用的是热重载式的开发操作周期。
你在实机或者模拟器上都能实现亚秒级的修改和更新速度。

Flutter's hot reload is _stateful_ so the app state
is retained after a reload. This means you can quickly iterate
on a screen deeply nested in your app, without starting
from the home screen after every reload.

另外，Flutter 的热重载是有状态的 (stateful)，
这意味着重新加载后 app 的状态会被保留。
这样即使你修改的界面在应用很深的位置，
重载后你也能直接看到修改后的该界面，
而无需从应用首页开始重新操作。

### How is _hot reload_ different from _hot restart_?

### 热重载 **hot reload** 相比较热重启 **hot restart** 的区别在哪里？

Hot reload works by injecting updated source code files
into the running Dart VM (Virtual Machine). This doesn't
only add new classes, but also adds methods and fields
to existing classes, and changes existing functions.
Hot restart resets the state to the app's initial state.

通过将更新的源代码文件注入到正在运行的 Dart VM（虚拟机）中来进行热重载。
这不仅会添加新的类，还会向现有的类中添加方法和字段，并更改现有的函数。
热重启后会将状态重置为应用程序的初始状态。

For more information, see [Hot reload][].

更多关于热重载的详细信息，请查看文档：[使用热重载][Hot reload]。


[Hot reload]: /tools/hot-reload

### Where can I deploy my Flutter app?

### 我能把 Flutter 应用部署到哪里？

You can compile and deploy your Flutter app to iOS, Android,
[web][], and [desktop][].

你可以将 Flutter 应用编译并部署到 iOS 和 Android 平台，
亦可部署到 [web][] 平台以及 [桌面端][desktop]。


[desktop]: /platform-integration/desktop
[web]: /platform-integration/web

### What devices and OS versions does Flutter run on?

### Flutter 可以运行在哪些设备，哪些操作系统版本上？

* We support and test running Flutter on a variety
  of low-end to high-end platforms.  For a detailed list
  of the platforms on which we test, see
  the list of [supported platforms][].

  我们会为各种从低端到高端的平台进行支持并且加入测试。
  你可以查看 [已支持的平台][supported platforms] 以了解已测试的平台列表。

* Flutter supports building ahead-of-time (AOT) compiled libraries
  for `x86-64`, `armeabi-v7a`, and `arm64-v8a`.

  Flutter 支持在 `x86-64`、`armeabi-v7a` 和 `arm64-v8a`
  架构下构建为 ahead-of-time (AOT) 库。

* Apps built for ARMv7 or ARM64 run fine (using ARM emulation)
  on many x86-64 Android devices.

  为 ARMv7 或 ARM64 构建的应用在很多
  x86-64 Android 设备上运行良好 (使用 ARM 模拟器)。

* We support developing Flutter apps on a range of platforms.
  See the system requirements listed under each
  [development operating system][install].

  我们支持在不同的平台上开发 Flutter 应用，
  请参阅 [不同操作系统下安装 Flutter 的方法文档][install] 了解更多。


[install]: /get-started
[supported platforms]: /reference/supported-platforms

### Does Flutter run on the web?

### Flutter 能在 Web 上运行吗？

Yes, web support is available in the stable channel.
For more details, check out the [web instructions][].

可以的，目前 stable channel 已经支持 web 平台了。
你可以将已有的 Flutter 代码编译在 web 运行。
更多详细信息，请参阅 [Web 介绍][web instructions]。

[web instructions]: /platform-integration/web/building

### Can I use Flutter to build desktop apps?

### 我能使用 Flutter 构建桌面应用吗？

Yes, desktop support is in stable for Windows,
macOS, and Linux.

可以，Flutter 的桌面端稳定版支持已经适用于
Windows、macOS 和 Linux 啦。

### Can I use Flutter inside of my existing native app?

### 我能在我现有的原生应用里使用 Flutter 吗？

Yes, learn more in the [add-to-app][] section of our website.

是的，你可以在我们网上内的 [混合应用][add-to-app] 章节中学习。

[add-to-app]: /add-to-app

### Can I access platform services and APIs like sensors and local storage?

### 我能访问传感器、本地存储之类的平台服务和 API 吗？

Yes. Flutter gives developers out-of-the-box access to _some_
platform-specific services and APIs from the operating system.
However, we want to avoid the "lowest common denominator" problem
with most cross-platform APIs, so we don't intend to build
cross-platform APIs for all native services and APIs.

可以。Flutter 默认即为开发者提供了操作系统中 **一些** 平台专属服务和 API 的操作入口。
但是，我们希望避免大多数跨平台 API 的“最小公约数”问题，
因此我们不打算为所有本地服务和 API 构建跨平台的操作 API。

A number of platform services and APIs have
[ready-made packages][] available on pub.dev.
Using an existing package [is easy][].

很多平台服务和 API 都在 Pub 站点中提供了
[现成的代码包][ready-made packages]，
我们可以根据 [说明][is easy] 使用它们，非常方便。

Finally, we encourage developers to use Flutter's
asynchronous message passing system to create your
own integrations with [platform and third-party APIs][].
Developers can expose as much or as little of the
platform APIs as they need, and build layers of
abstractions that are a best fit for their project.

最后，我们鼓励开发者使用 Flutter 的异步消息传递系统来创建出
[自己的平台][platform and third-party APIs] 与第三方 API 的整合方案。
开发者可以根据需要公开尽可能多 (或者尽可能少) 的平台 API，
并构建最适合其项目的抽象层。


[is easy]: /packages-and-plugins/using-packages
[platform and third-party APIs]: /platform-integration/platform-channels
[ready-made packages]: {{site.pub}}/flutter/

### Can I extend and customize the bundled widgets?

### 我能对自带的 widget 进行扩展和定制吗？

Absolutely. Flutter's widget system was designed
to be easily customizable.

当然可以。Flutter widget 系统的设计思路就是让开发者可以轻松定制。

Rather than having each widget provide a large number of parameters,
Flutter embraces composition. Widgets are built out of smaller
widgets that you can reuse and combine in novel ways to make
custom widgets. For example, rather than subclassing a generic
button widget, `ElevatedButton` combines a Material widget with a
`GestureDetector` widget. The Material widget provides the visual
design and the `GestureDetector` widget provides the
interaction design.

Flutter 没有让每个 widget 都提供大量参数，而是采用了组合的方式。
较大的 widget 是用较小的 widget 组合构建出来的，
你可以重复使用它们，并以新颖的方式对其加以组合，从而生成自定义的 widget。
例如，`RaisedButton` 没有继承自一个通用按钮 widget，
而是将 Material widget 与 `GestureDetector` widget 组合在一起。
Material widget 负责视觉呈现，`GestureDetector` widget 则实现其交互。

To create a button with a custom visual design, you can combine
widgets that implement your visual design with a `GestureDetector`,
which provides the interaction design. For example,
`CupertinoButton` follows this approach and combines a
`GestureDetector` with several other widgets that implement its
visual design.

如果你想要创建自定义设计的按钮，
可以将负责视觉呈现的 widget 与提供交互的 `GestureDetector` 组合起来使用。
例如，`CupertinoButton` 就采用了这种方法，
将 `GestureDetector` 与其他几个负责表现视觉的 widget 进行组合。

Composition gives you maximum control over the visual and
interaction design of your widgets while also allowing a
large amount of code reuse. In the framework, we've decomposed
complex widgets to pieces that separately implement
the visual, interaction, and motion design. You can remix
these widgets however you like to make your own custom
widgets that have full range of expression.

这种组合策略使你可以最大限度地控制 widget 的可视化和交互逻辑，
同时重复利用大量代码。在框架中，
我们将复杂的 widget 分解为实现视觉、交互和动效的各部分。
你可以按照自己喜欢的方式重新组合这些 widget，
从而制作出自定义 widget 来完整传达出你的设计意图。

### Why would I want to share layout code across iOS and Android?

### 我为什么要在 iOS 和 Android 应用间共享布局代码？

You can choose to implement different app layouts for
iOS and Android. Developers are free to check the mobile OS
at runtime and render different layouts,
though we find this practice to be rare.

你可以选择为 iOS 和 Android 应用实现不同的布局。
开发者可以在运行时检查移动操作系统的种类，并根据操作系统呈现不同的布局，
但我们发现这种做法比较少见。

More and more, we see mobile app layouts and designs evolving
to be more brand-driven and unified across platforms.
This implies a strong motivation to share layout and UI
code across iOS and Android.

我们发现移动应用布局和设计正在不断发展，更趋于品牌设计的诉求，
而且跨平台之间的呈现逐渐趋同。
这意味着不少开发者会有很强的动力在 iOS 和 Android 上共享布局和 UI 代码。

The brand identity and customization of the app's
aesthetic design is now becoming more important than
strictly adhering to traditional platform aesthetics.
For example, app designs often require custom fonts, colors,
shapes, motion, and more in order to clearly convey their
brand identity.

如今，在应用美学设计中，品牌表达和定制比严格遵循平台自己的美学更为重要。
例如，应用设计通常需要自定义字体、颜色、形状、动效等，
以便清楚地传达出其品牌独有的特性。

We also see common layout patterns deployed across
iOS and Android. For example, the "bottom nav bar"
pattern can now be naturally found across iOS and Android.
There seems to be a convergence of design ideas
across mobile platforms.

我们还发现，很多应用都在 iOS 和 Android 上采用了通用的布局模式。
例如，你现在可以在 iOS 和 Android 上很方便地找到“底部导航”设计模式。
移动平台上的设计理念似乎正在趋于一致。

### Can I interop with my mobile platform's default programming language?

### 我能与移动平台上的默认编程语言进行互操作吗？

Yes, Flutter supports calling into the platform,
including integrating with Java or Kotlin code on Android,
and Swift or Objective-C code on iOS.
This is enabled by a flexible message passing style
where a Flutter app might send and receive messages
to the mobile platform using a [`BasicMessageChannel`][].

可以，Flutter 支持调用 (包括集成) Android 上的 Java 或者 Kotlin 代码，
或者 iOS 上的 ObjectiveC 或 Swift 代码。
这是通过灵活的消息传递方式实现的，
Flutter 应用可以使用 [`BasicMessageChannel`][] 向移动平台收发消息。

Learn more about accessing platform and third-party services
in Flutter with [platform channels][].

如果你想了解有关平台通道的更多信息，可以查阅 [platform channels][] 相关文档。

Here is an [example project][] that shows how to use a
platform channel to access battery state information on
iOS and Android.

你也可以通过这个 [示例项目][example project]，
学习如何使用平台通道访问 iOS 和 Android 上的电池状态信息。


[`BasicMessageChannel`]: {{site.api}}/flutter/services/BasicMessageChannel-class.html
[example project]: {{site.repo.flutter}}/tree/main/examples/platform_channel
[platform channels]: /platform-integration/platform-channels

### Does Flutter come with a reflection / mirrors system?

### Flutter 包含反射 / 镜像系统吗？

No. Dart includes `dart:mirrors`,
which provides type reflection. But since
Flutter apps are pre-compiled for production,
and binary size is always a concern with mobile apps,
this library is unavailable for Flutter apps.

不支持，Dart 的确是含有 `dart:mirrors` 库，能够提供类型反射。
但是由于 Flutter 应用已经针对最终产物进行了预编译，
并且控制二进制内容体积始终是现代移动应用需要面对的一个问题，
所以我们禁用了 dart:mirrors。

Using static analysis we can strip out anything that isn't
used ("tree shaking"). If you import a huge Dart library
but only use a self-contained two-line method,
then you only pay the cost of the two-line method,
even if that Dart library itself imports dozens and
dozens of other libraries. This guarantee is only secure
if Dart can identify the code path at compile time.
To date, we've found other approaches for specific needs
that offer a better trade-off, such as code generation.

使用静态类型分析系统，我们可以移除任何不会用到的东西（"得益于 tree shaking 机制"）。
如果你导入了一个巨大的 Dart 库，但仅仅用到了一个其中实现的一个两行的函数，
那么你只需要付出这两行函数的代价，即便是这个 Dart 库中导入了非常多非常多的库。
此保证仅 Dart 可以在编译期安全识别代码路径的情况下。
目前，我们已找到其他满足特定需求的方法以提供更好的平衡，如代码生成。

### Are internationalization and localization supported?

### 是否支持国际化 (internationalization, i18n) 和本地化 (localization, l10n)？

Yes, Flutter supports internationalization (i18n) and localization (l10n) so
that your apps are adaptable to different languages and cultures. You can
learn more in the [internationalization documentation][].

是的，Flutter 支持国际化 (i18n) 和本地化 (l10n)，
因此你的应用可以适应不同的语言和文化。
你可以在 [国际化文档][internationalization documentation] 中了解更多信息。

[internationalization documentation]: /ui/internationalization

### What accessibility is supported?

### 支持哪些可访问性/无障碍？

Flutter supports strict accessibility requirements (a11y). For example,
screen readers, large text, color contrast, and hardware switch control are
all supported. To learn more, see the [accessibility documentation][].

Flutter 支持严格的可访问性/无障碍设计要求 (a11y)。
例如，支持屏幕阅读器、大文本、色彩对比度以及硬件开关控制。
要了解更多信息，请参阅 [无障碍文档][accessibility documentation]。

[accessibility documentation]: /ui/accessibility

### How do I write parallel and/or concurrent apps for Flutter?

### 我如何为 Flutter 开发并行 (parallel) 和/或并发 (concurrent) 应用？

Flutter supports isolates. Isolates are separate heaps in
Flutter's VM, and they are able to run in parallel
(usually implemented as separate threads). Isolates
communicate by sending and receiving asynchronous messages.

Flutter 支持 isolate，一个个的 isolate 是 Flutter VM 里彼此独立的堆 (heap)，
可以并行运行 (通常以独立线程的形式实现)。
Isolate 之间通过异步收发消息来进行通信。

Check out an [example of using isolates with Flutter][].

你可以点击链接查看 [在 Flutter 中使用 isolate 的示例][example of using isolates with Flutter]。

[example of using isolates with Flutter]: {{site.repo.flutter}}/blob/main/examples/layers/services/isolate.dart

### Can I run Dart code in the background of a Flutter app?

### 我能在 Flutter 应用后台运行 Dart 代码吗？

Yes, you can run Dart code in a background process on both
iOS and Android. For more information, see the free Medium article
[Executing Dart in the Background with Flutter Plugins and Geofencing][backgnd].

可以，你可以在 iOS 和 Android 后台进程中运行 Dart 代码。
有关更多信息，你可以查看在 Medium 上的文章：
[使用 Flutter 插件和 Geofencing 在后台运行 Dart 代码][backgnd]。

[backgnd]: {{site.flutter-blog}}/executing-dart-in-the-background-with-flutter-plugins-and-geofencing-2b3e40a1a124

### Can I use JSON/XML/<wbr>Protobufs (and so on) with Flutter?

### 我在 Flutter 里能使用 JSON/XML/<wbr>Protobufs 等内容吗？

Absolutely. There are libraries on
[pub.dev][] for JSON, XML, protobufs,
and many other utilities and formats.

当然可以。[Pub 站点][pub.dev] 提供了很多这样的代码库，
包括 JSON, XML, protobufs 以及很多其他内容格式。

For a detailed writeup on using JSON with Flutter,
check out the [JSON tutorial][].

有关在 Flutter 中使用 JSON 的详细介绍，你可以查看
[使用 JSON 的教程][JSON tutorial]。

[JSON tutorial]: /data-and-backend/serialization/json
[pub.dev]: {{site.pub}}

### Can I build 3D (OpenGL) apps with Flutter?

### 我能用 Flutter 构建 3D (OpenGL) 应用吗？

Today we don't support 3D using OpenGL ES or similar.
We have long-term plans to expose an optimized 3D API,
but right now we're focused on 2D.

我们暂不支持通过 OpenGL ES 或类似的机制实现 3D。
在 3D API 方面我们有一个长期的计划，但目前我们专注于呈现 2D。

### Why is my APK or IPA so big?

### 我的 APK 或 IPA 为什么这么大？

Usually, assets including images, sound files, fonts, and so on,
are the bulk of an APK or IPA. Various tools in the
Android and iOS ecosystems can help you understand
what's inside of your APK or IPA.

通常，图像、声音文件、字体等资源在 APK 或 IPA 里占据了相当的比重。
Android 和 iOS 生态系统中有很多工具可以帮助你了解 APK 或 IPA 中的各种内容的比重情况。

Also, be sure to create a _release build_
of your APK or IPA with the Flutter tools.
A release build is usually _much_ smaller
than a _debug build_.

此外，请务必使用 Flutter 工具创建 APK 或 IPA 的_发布版本_。
发布版本的体积通常_远_小于_调试_版本。

Learn more about creating a
[release build of your Android app][],
and creating a [release build of your iOS app][].
Also, check out [Measuring your app's size][].

如果你想学习更多有关如何发布版本的教程，可以查看
[打包和发布到 Android 平台][release build of your Android app]
以及 [打包和发布到 iOS 平台][release build of your iOS app]。
同时，查看 [测量你的应用体积][Measuring your app's size]。


[release build of your Android app]: /deployment/android
[release build of your iOS app]: /deployment/ios

### Do Flutter apps run on Chromebooks?

### Flutter 应用能在 Chromebook 上运行吗？

We have seen Flutter apps run on some Chromebooks.
We are tracking [issues related to running Flutter on
Chromebooks][].

我们注意到已经有 Flutter 应用运行在某些 Chromebook 上了。
针对在 Chromebook 上运行 Flutter 的情况，
我们有进行持续的跟踪，你可以查看
[Flutter 运行在 Chromebook 上的问题追踪][issues related
to running Flutter on Chromebooks]
来获得相关信息。

[issues related to running Flutter on Chromebooks]: {{site.repo.flutter}}/labels/platform-arc

### Is Flutter ABI compatible?

### Flutter 是否提供 ABI 支持？

Flutter and Dart don't offer application binary interface (ABI)
compatibility. Offering ABI compatibility is not a current
goal for Flutter or Dart.

Flutter 和 Dart 尚未提供且目前不会提供应用二进制接口 (ABI) 的支持。

### How does Flutter handle scrolling?

### Flutter 是如何处理滚动的？

A custom scrolling implementation is used for each app platform so that
scrolling matches that platform's native scrolling look and feel. To learn
more about scrolling with Flutter, see the [scrolling][] documentation.

每个应用平台都是用自定义滚动实现，以便滚动与对应平台的原生滚动看起来感觉一致。
要了解 Flutter 滚动的更多信息，请参阅 [滚动][scrolling] 文档。

[scrolling]: /ui/layout/scrolling

## Framework

## 框架

### Why is the build() method on State, rather than StatefulWidget?

### 为什么 build() 方法被放在 State 上，而不是 StatefulWidget 上？

Putting a `Widget build(BuildContext context)` method on `State`
rather putting a `Widget build(BuildContext context, State state)`
method on `StatefulWidget` gives developers more flexibility when
subclassing `StatefulWidget`. You can read a more
[detailed discussion on the API docs for `State.build`][].

将 Widget 的 build(BuildContext context) 方法放在 `State` 上，
而不是将 `Widget build(BuildContext context, State state)`
方法放在 `StatefulWidget` 上，
这个策略能让开发者在继承 `StatefulWidget` 时提供更多的灵活性，
你可以在 API 文档中查看 
[关于 State.build 的讨论][detailed discussion
on the API docs for `State.build`]。

[detailed discussion on the API docs for `State.build`]: {{site.api}}/flutter/widgets/State/build.html

### Where is Flutter's markup language? Why doesn't Flutter have a markup syntax?

### Flutter 怎么没有标记语言 (markup language) 和语法？

Flutter UIs are built with an imperative, object-oriented
language (Dart, the same language used to build Flutter's
framework). Flutter doesn't ship with a declarative markup.

Flutter 的 UI 由指令式的面向对象语言构建，也就是 Dart。
它也是 Flutter 框架的编写语言。Flutter 本身并不包含声明式的标记语言。

We found that UIs dynamically built with code allow for
more flexibility. For example, we have found it difficult
for a rigid markup system to express and produce
customized widgets with bespoke behaviors.

我们发现将 UI 交给代码来动态构建会带来更多的灵活性。
比如，我们发现固化的标记语言系统很难表达一个从视觉到行为都完全定制的 widget。

We have also found that our "code-first" approach better allows
for features like hot reload and dynamic environment adaptations.

另外，“代码优先”的开发也使得热重载以及动态环境适配等特性能更好地得以实现。

It's possible to create a custom language that is then
converted to widgets on the fly. Because build methods
are "just code", they can do anything,
including interpreting markup and turning it into widgets.

从根本上来讲，创造出一种能动态转化成 widget 的语言是可能的，
毕竟构建方法说到底也还是代码，他们能做的事情很多，
自然也包括将标记语言转化成 widget。

### My app has a Debug banner/ribbon in the upper right. Why am I seeing that?

### 我的应用运行时在右上角有一个 Debug 的标识，为什么？

By default, the `flutter run` command uses the
debug build configuration.

默认情况下，flutter run 指令会使用 debug 编译配置。

The debug configuration runs your Dart code in a VM (Virtual Machine)
enabling a fast development cycle with [hot reload][]
(release builds are compiled using the standard [Android][]
and [iOS][] toolchains).

Debug 编译配置会在一个 VM (Virtual Machine) 里运行你的 Dart 代码，
从而提供更快速的开发操作周期，如 [热重载][hot reload]。
（如果是编译发布版本的话，则会使用 [Android][] 和 [iOS][] 标准的工具链。）

The debug configuration also checks all asserts, which helps
you catch errors early during development, but imposes a
runtime cost. The "Debug" banner indicates that these checks
are enabled. You can run your app without these checks by
using either the `--profile` or `--release` flag to `flutter run`.

Debug 编译配置也会检查所有的断言 (assert)，这会帮助你在开发时更早地发现错误，
但这也会加大运行时的开销。你看到的 Debug 标识是告诉你这些检查目前是打开的状态。
你可以通过在运行 `flutter run` 时附加 `--profile`
或者 `--release` 来跳过这些检查。

If your IDE uses the Flutter plugin,
you can launch the app in profile or release mode.
For VS Code, use the **Run > Start debugging**
or **Run > Run without debugging** menu entries.
For IntelliJ, use the menu entries
**Run > Flutter Run in Profile Mode** or **Release Mode**.

如果你在使用 Flutter 的 IDE 插件，
你就可以在 profile 或者 release 模式下启动应用，
对于 VS Code 而言，你可以使用 **Run > Start debugging** 或者
**Run > Run without debugging** 菜单选项。
对于 IntelliJ 而言，你可以使用 **Run > Flutter run in Profile Mode** 或者
**Release Mode** 菜单选项。

[Android]: #run-android
[hot reload]: #hot-reload
[iOS]: #run-ios

### What programming paradigm does Flutter's framework use?

### Flutter 框架采用了哪些编程范式？

Flutter is a multi-paradigm programming environment.
Many programming techniques developed over the past few decades
are used in Flutter. We use each one where we believe
the strengths of the technique make it particularly well-suited.
In no particular order:

Flutter 是一个多范式的编程环境。过去几十年中许多编程技术都有在 Flutter 中使用。
我们在选择范式时会考虑其适用性进行综合性的决策。以下列出的范式不分先后：

**Composition**
<br> The primary paradigm used by Flutter is that of using
  small objects with narrow scopes of behavior, composed together to
  obtain more complicated effects, sometimes called
  _aggressive composition_. Most widgets in the Flutter widget
  library are built in this way. For example, the Material
  [`TextButton`][] class is built using
  an [`IconTheme`][], an [`InkWell`][], a [`Padding`][],
  a [`Center`][], a [`Material`][],
  an [`AnimatedDefaultTextStyle`][], and a [`ConstrainedBox`][].
  The [`InkWell`][] is built using a [`GestureDetector`][].
  The [`Material`][] is built using an
  [`AnimatedDefaultTextStyle`][],
  a [`NotificationListener`][], and an [`AnimatedPhysicalModel`][].
  And so on. It's widgets all the way down.

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
<br> Entire applications can be built with only
  [`StatelessWidget`][]s, which are essentially functions that
  describe how arguments map to other functions, bottoming out
  in primitives that compute layouts or paint graphics.
  (Such applications can't easily have state,
  so are typically non-interactive.) For example, the [`Icon`][]
  widget is essentially a function that maps its arguments
  ([`color`][], [`icon`][], [`size`][]) into layout primitives.
  Additionally, heavy use is made of immutable data structures,
  including the entire [`Widget`][] class
  hierarchy as well as numerous supporting classes such as
  [`Rect`][] and [`TextStyle`][]. On a smaller scale, Dart's
  [`Iterable`][] API, which makes heavy use of the functional
  style (map, reduce, where, etc), is frequently used to process
  lists of values in the framework.

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
<br> User interactions are represented by event objects
  that are dispatched to callbacks registered with event handlers.
  Screen updates are triggered by a similar callback mechanism. The
  [`Listenable`][] class, which is used as the basis of the
  animation system, formalizes a subscription model for events
  with multiple listeners.

**事件驱动编程 (event-driven programming)** 
<br> 用户的交互操作被包装成事件对象，
  这些对象发送给被各个 event handler 注册的回调方法。
  屏幕内容的更新使用的也是类似的回调机制。
  比如，做为动画系统构建基础的 [`Listenable`][] 类，
  就采用了包含多个事件监听者的订阅模型。

**Class-based object-oriented programming**
<br> Most of the APIs of the framework are built using classes
  with inheritance. We use an approach whereby we define
  very high-level APIs in our base classes, then specialize
  them iteratively in subclasses. For example,
  our render objects have a base class ([`RenderObject`][])
  that is agnostic regarding the coordinate system,
  and then we have a subclass ([`RenderBox`][])
  that introduces the opinion that the geometry should be based
  on the Cartesian coordinate system (x/width and y/height).
  
**面向类编程 (class-based programming，是面向对象编程的一种方式)** 
<br> 框架内绝大多数的 API 是由包含各种继承关系的类来组成的。
  我们在基本类中定义较高级别的 API，然后在其子类中对这些 API 进行特化处理。
  比如，我们的渲染对象就有一个基本类 [`RenderObject`][])，
  它对坐标系的细节并不关心，
  但它的子类 [`RenderBox`][]) 就引入了笛卡尔坐标系的概念
  （x/y坐标值，以及宽度高度的概念）。

**Prototype-based object-oriented programming**
<br> The [`ScrollPhysics`][] class chains instances to compose
  the physics that apply to scrolling dynamically at runtime.
  This lets the system compose, for example, paging physics
  with platform-specific physics, without the platform having to be
  selected at compile time.

**原型编程 (prototype-based programming，同样是面向对象编程的一种方式)** 
<br> [`ScrollPhysics`][] 类在运行时动态链接那些会组成滚动逻辑的实例。
  这就使得系统无需在编译时提前选择平台的情况下，
  也能组合出符合平台特性的页面滚动效果。

**Imperative programming**
<br> Straightforward imperative programming, usually
  paired with state encapsulated within an object,
  is used where it provides the most intuitive solution.
  For example, tests are written in an imperative style,
  first describing the situation under test, then listing
  the invariants that the test must match, then advancing
  the clock or inserting events as necessary for the test.

**指令式编程 (imperative programming)** 
<br> 简单直白的指令式编程，通常和对象内封装的状态 (state) 搭配使用，
  这种范式能提供最符合直觉的解法。
  比如，测试就是使用指令式编程实现的，首先描述出测试的环境，
  然后给出测试需要满足的定量，最后开始步进，
  或者根据测试需要插入事件。

**Reactive programming**
<br> The widget and element trees are sometimes described as
  reactive, because new inputs provided in a widget's
  constructor are immediately propagated as changes to
  lower-level widgets by the widget's build method, and
  changes made in the lower widgets (for example,
  in response to user input) propagate back up the tree
  using event handlers. Aspects of both functional-reactive and
  imperative-reactive are present in the framework,
  depending on the needs of the widgets. Widgets with build
  methods that consist of just an expression describing how
  the widget reacts to changes in its configuration are functional
  reactive widgets (for example, the Material [`Divider`][] class).
  Widgets whose build methods construct a list of children
  over several statements, describing how the widget reacts
  to changes in its configuration, are imperative reactive
  widgets (for example, the [`Chip`][] class).

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
<br> The build methods of widgets are often a single
  expression with multiple levels of nested constructors,
  written using a strictly declarative subset of Dart.
  Such nested expressions could be mechanically transformed
  to or from any suitably expressive markup language.
  For example, the [`UserAccountsDrawerHeader`][]
  widget has a long build method (20+ lines),
  consisting of a single nested expression.
  This can also be combined with the imperative style to build UIs
  that would be harder to describe in a pure-declarative approach.
  
**声明式编程 (declarative programming)** 
<br> Widget 的 build 方法通常都是一个单一表达式，
  它包含多级嵌套的构造函数，且使用 Dart 严格的声明式子集编写。
  这些嵌套的表达式可以与合适的标记语言互相转换。
  比如，[`UserAccountsDrawerHeader`][] 这个 widget
  就有一个很长的 build 方法 (20 多行)，由一个嵌套的表达式构成。
  这种范式也可以和指令式混合使用，以实现某些很难用纯声明式的方法实现的 UI。

**Generic programming**
<br> Types can be used to help developers catch programming
  errors early. The Flutter framework uses generic programming to
  help in this regard. For example, the [`State`][]
  class is parameterized in terms of the type of its
  associated widget, so that the Dart analyzer can catch
  mismatches of states and widgets. Similarly, the
  [`GlobalKey`][] class takes a type parameter so that it
  can access a remote widget's state in a type-safe manner
  (using runtime checking), the [`Route`][] interface is
  parameterized with the type that it is expected to use when
  [popped][], and collections such as [`List`][]s, [`Map`][]s,
  and [`Set`][]s are all parameterized so that mismatched
  elements can be caught early either during analysis or at
  runtime during debugging.

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
<br> Flutter makes heavy use of [`Future`][]s and other
  asynchronous APIs. For example, the animation system reports
  when an animation is finished by completing a future.
  The image loading system similarly uses futures to report
  when a load is complete.

**并发 (concurrent programming)** 
<br> Flutter 大量使用诸如 [`Future`][] 等异步 API。
  比如，动画系统就会在动画执行完 future 时进行事件告知。
  同样的，图片加载系统也会使用 future 在加载完毕时进行告知。

**Constraint programming**
<br> The layout system in Flutter uses a weak form of
  constraint programming to determine the geometry of a scene.
  Constraints (for example, for cartesian boxes, a minimum and
  maximum width and a minimum and maximum height)
  are passed from parent to child, and the child selects a resulting
  geometry (for example, for cartesian boxes, a size,
  specifically a width and a height) that fulfills those constraints.
  By using this technique, Flutter can usually
  lay out an entire scene with a single pass.

**约束编程 (constraint programming)**
<br>Flutter 的布局系统使用了约束编程的简化形态来描述一个场景的几何性质。
  约束值 (比如一个笛卡尔矩形允许的最大 / 最小宽高值) 会从父元素传递给子元素，
  子元素最终选择一个能满足上面所有约束条件的最终尺寸。
  这种做法也使得 Flutter 能不依赖太多输入的情况下快速完成一个全新的布局。


[`AnimatedDefaultTextStyle`]: {{site.api}}/flutter/widgets/AnimatedDefaultTextStyle-class.html
[`AnimatedPhysicalModel`]: {{site.api}}/flutter/widgets/AnimatedPhysicalModel-class.html
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`Chip`]: {{site.api}}/flutter/material/Chip-class.html
[`color`]: {{site.api}}/flutter/widgets/Icon/color.html
[`ConstrainedBox`]: {{site.api}}/flutter/widgets/ConstrainedBox-class.html
[`Divider`]: {{site.api}}/flutter/material/Divider-class.html
[`Future`]: {{site.api}}/flutter/dart-async/Future-class.html
[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[`GlobalKey`]: {{site.api}}/flutter/widgets/GlobalKey-class.html
[`icon`]: {{site.api}}/flutter/widgets/Icon/icon.html
[`Icon`]: {{site.api}}/flutter/widgets/Icon-class.html
[`IconTheme`]: {{site.api}}/flutter/widgets/IconTheme-class.html
[`InkWell`]: {{site.api}}/flutter/material/InkWell-class.html
[`Iterable`]: {{site.api}}/flutter/dart-core/Iterable-class.html
[`List`]: {{site.api}}/flutter/dart-core/List-class.html
[`Listenable`]: {{site.api}}/flutter/foundation/Listenable-class.html
[`Map`]: {{site.api}}/flutter/dart-core/Map-class.html
[`Material`]: {{site.api}}/flutter/material/Material-class.html
[`NotificationListener`]: {{site.api}}/flutter/widgets/NotificationListener-class.html
[`Padding`]: {{site.api}}/flutter/widgets/Padding-class.html
[popped]: {{site.api}}/flutter/widgets/Navigator/pop.html
[`Rect`]: {{site.api}}/flutter/dart-ui/Rect-class.html
[`RenderBox`]: {{site.api}}/flutter/rendering/RenderBox-class.html
[`RenderObject`]: {{site.api}}/flutter/rendering/RenderObject-class.html
[`Route`]: {{site.api}}/flutter/widgets/Route-class.html
[`ScrollPhysics`]: {{site.api}}/flutter/widgets/ScrollPhysics-class.html
[`Set`]: {{site.api}}/flutter/dart-core/Set-class.html
[`size`]: {{site.api}}/flutter/widgets/Icon/size.html
[`State`]: {{site.api}}/flutter/widgets/State-class.html
[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[`TextStyle`]: {{site.api}}/flutter/painting/TextStyle-class.html
[`UserAccountsDrawerHeader`]: {{site.api}}/flutter/material/UserAccountsDrawerHeader-class.html
[`Widget`]: {{site.api}}/flutter/widgets/Widget-class.html

## Project

## 工程管理

### Where can I get support?

### 我该如何获得技术支持？

If you think you've encountered a bug, file it in our
[issue tracker][]. You might also use
[Stack Overflow][] for "HOWTO" type questions.
For discussions, join our mailing list at
[{{site.email}}][] or seek us out on [Discord][].

For more information, see our [Community][] page.

如果你觉得遇到 bug 了，请提交至我们的 [问题追踪入口][issue tracker]。
我们也鼓励你在 [Stack Overflow][] 中多多使用
“如何 (how to) ...“来搜索解答。
如果你希望直接与我们沟通，
请使用我们的官方邮件地址 [{{site.email}}][]
或在 [Discord][] 上向我们提问。 


[Community]: {{site.main-url}}/community
[Discord]: https://discord.com/invite/rflutterdev
[issue tracker]: {{site.repo.flutter}}/issues
[{{site.email}}]: mailto:{{site.email}}
[Stack Overflow]: {{site.so}}/tags/flutter

### How do I get involved?

### 我如何投入到 Flutter 开发社区？

Flutter is open source, and we encourage you to contribute.
You can start by simply filing issues for feature requests
and bugs in our [issue tracker][].

Flutter 是开源的，我们鼓励你为此做出自己的贡献。
你可以通过 [问题追踪入口][issue tracker] 来提交功能需求或者 bug 报告。

We recommend that you join our mailing list at
[{{site.email}}][] and let us know how you're
using Flutter and what you'd like to do with it.

我们也希望你加入我们的邮件讨论 [{{site.email}}][]，
告诉我们你是如何使用 Flutter 的，以及打算用 Flutter 开发什么。

If you're interested in contributing code, you can start
by reading our [Contributing guide][], and check out our
list of [easy starter issues][].

如果你打算为 Flutter 贡献代码，请先阅读 [代码贡献指南][Contributing guide]，
然后从 [简单待修复问题][easy starter issues] 列表中寻找力所能及的问题开始入手。

Finally, you can connect with helpful Flutter communities.
For more information, see the [Community][] page.

最后，你可以与各个 Flutter 社区保持联系，
更多相关信息，请查阅我们的 [社区][Community] 页面。

You can also engage with other developers on the Flutter
[Discord][].

你还可以在 Flutter [Discord][] 上与其他开发人员交流。

[Contributing guide]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md
[easy starter issues]: {{site.repo.flutter}}/issues?q=is%3Aopen+is%3Aissue+label%3A%22easy+fix%22

### Is Flutter open source?

### Flutter 是开源的吗？

Yes, Flutter is open source technology.
You can find the project on [GitHub][].

是的，Flutter 是开源的。你可以在 [GitHub][] 上获取到它。

[GitHub]: {{site.repo.flutter}}

### Which software license(s) apply to Flutter and its dependencies?

### Flutter 以及其依存项目使用的是哪种软件许可协议？

Flutter includes two components: an engine that ships as a
dynamically linked binary, and the Dart framework as a separate
binary that the engine loads. The engine uses multiple software
components with many dependencies; view the complete list
in its [license file][].

Flutter 包含两个部分：
一个使用动态链接二进制文件发行的引擎，以及引擎加载的 Dart 框架二进制文件。
引擎使用了很多软件组件，且包含许多依存内容。
完整的说明和依存清单请查看引擎的 [许可协议][license file]。

The framework is entirely self-contained and requires
[only one license][].

框架部分则自成一体，且 [只有一份简单的许可协议][only one license]。

In addition, any Dart packages you use might have their
own license requirements.

另外，你使用的其他 Dart 代码包可能有其独有的许可协议。

[license file]: {{site.repo.flutter}}/blob/main/engine/src/flutter/sky/packages/sky_engine/LICENSE
[only one license]: {{site.repo.flutter}}/blob/main/LICENSE

### How can I determine the licenses my Flutter application needs to show?

### 我如何确定我的 Flutter 应用该显示哪些许可协议？

There's an API to find the list of licenses you need to show:

你可以使用 API 来确定需要显示的许可协议。

* If your application has a [`Drawer`][], add an
  [`AboutListTile`][].

  如果你的应用使用了 [`Drawer`][]，则添加一个 [`AboutListTile`][]。

* If your application doesn't have a Drawer but does use the
  Material Components library, call either [`showAboutDialog`][]
  or [`showLicensePage`][].

  如果你的应用不包含 Drawer 但使用了 Material 组件库，
  请调用 [`showAboutDialog`][] 或者 [`showLicensePage`][]。

* For a more custom approach, you can get the raw licenses from the
  [`LicenseRegistry`][].

  对于更加定制的场合，你可以使用
  [`LicenseRegistry`][] 获得原始的许可内容。


[`AboutListTile`]: {{site.api}}/flutter/material/AboutListTile-class.html
[`Drawer`]: {{site.api}}/flutter/material/Drawer-class.html
[`LicenseRegistry`]: {{site.api}}/flutter/foundation/LicenseRegistry-class.html
[`showAboutDialog`]: {{site.api}}/flutter/material/showAboutDialog.html
[`showLicensePage`]: {{site.api}}/flutter/material/showLicensePage.html

### Who works on Flutter?

### 目前有哪些人在开发 Flutter？

We all do! Flutter is an open source project.
Currently, the bulk of the development is done
by engineers at Google. If you're excited about Flutter,
we encourage you to join the community and
[contribute to Flutter][]!

我们都在参与 Flutter 开发！
我们都知道 Flutter 是一个开源项目。
目前 Flutter 中的大部分都是由 Google 的工程师来开发。
如果你喜欢 Flutter 的话，我们希望你加入开发者社区并
[做出贡献][contribute to Flutter]！

[contribute to Flutter]: {{site.repo.flutter}}/blob/main/CONTRIBUTING.md

### What are Flutter's guiding principles?

### Flutter 有哪些指导原则？

We believe the following:

我们相信：

* In order to reach every potential user,
  developers need to target multiple mobile platforms.

  为了触达每一位潜在用户，开发者需要针对多个移动平台发布自己的应用。

* HTML and WebViews as they exist today make it challenging to
  consistently hit high frame rates and deliver
  high-fidelity experiences, due to automatic behavior (scrolling,
  layout) and legacy support.

  目前常用的 HTML 和 WebView 由于一些默认的交互响应
  （滚动、布局等）以及向后兼容等问题，很难获得稳定的高帧率和精确的设计体验。

* Today, it's too costly to build the same app multiple times: it
  requires different teams, different code bases,
  different workflows, different tools, etc.

  目前，开发同一个应用的不同平台版本成本很高：
  这意味着不同的团队、不同的代码库、不同的工作流程以及不同的工具，等等。

* Developers want an easier, better way to use a single codebase to
  build mobile apps for multiple target platforms,
  and they don't want to sacrifice quality, control, or performance.

  开发者需要一个简单的、更好的方法来使用同一套代码库开发应用的不同平台版本。
  而且他们不希望在质量、细节和功能控制以及性能上有任何妥协。

We are focused on three things:

我们目前集中于以下三件事：

_Control_
<br> Developers deserve access to, and control over,
  all layers of the system. Which leads to:

**功能控制**
<br> 开发者应该能访问到系统所有层级的功能，且能获得全面的控制权。这也意味着：

_Performance_ 
<br> Users deserve perfectly fluid, responsive,
  jank-free apps. Which leads to:

**性能表现**
<br> 用户应该获得流畅、响应迅捷且没有卡顿的应用。这也意味着：

_Fidelity_
<br> Everyone deserves precise, beautiful, delightful
  app experiences.

**精确实现**
<br> 每一个人都应该获得精确、优美且富有表现力的移动应用体验。

### Will Apple reject my Flutter app?

### Apple 会拒绝我的 Flutter 应用吗？

We can't speak for Apple, but their App Store contains
many apps built with framework technologies such as Flutter.
Indeed, Flutter uses the same fundamental architectural
model as Unity, the engine that powers many of the
most popular games on the Apple store.

我们无法代 Apple 发言，但已经有很多使用类似 Flutter 的其他技术开发的应用。
实际上，Flutter 与 Unity 使用了近乎一致的底层架构模型，
Apple store 中最著名的游戏也是使用它的引擎开发的。

Apple has frequently featured well-designed apps
that are built with Flutter,
including [Hamilton][Hamilton for iOS] and [Reflectly][].

Apple 最近评选的最佳设计应用也是使用 Flutter 开发的，
其中包括 [Hamilton][Hamilton for iOS] 和 [Reflectly][]。

As with any app submitted to the Apple store,
apps built with Flutter should follow Apple's
[guidelines][] for App Store submission.

任何提交到 Apple store 的 Flutter 应用都应该遵守
Apple 的 [规范][guidelines]。

[guidelines]: {{site.apple-dev}}/app-store/review/guidelines/
[Hamilton for iOS]: https://itunes.apple.com/us/app/hamilton-the-official-app/id1255231054?mt=8
[Reflectly]: https://apps.apple.com/us/app/reflectly-journal-ai-diary/id1241229134
