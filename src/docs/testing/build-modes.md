---
title: Flutter's build modes
title: Flutter 的构建模式选择
description: Describes Flutter's build modes and when you should use debug, release, or profile mode?
description: 在使用 Flutter 构建的时候，你应该选择哪种模式呢？Debug、Release、或者是 Profile 模式？
---

The Flutter tooling supports three modes when compiling your app,
and a headless mode for testing.
This doc explains the three modes and tells you when to use which.
For more information on headless testing, see
[Unit testing.](/docs/testing#unit-tests)

Flutter 支持三种模式编译 app，也支持使用 headless 模式来测试。
这篇文档解释了这三种模式，并且告诉你什么时候应该使用哪种模式。关于 headless 测试的更多信息，可以查看 [单元测试](/docs/testing#unit-tests)。

You choose the compilation mode depending on where you are in
the development cycle. Are you debugging your code? Do you
need profiling information? Are you ready to deploy your app?

选择哪种编译模式取决于你处于哪个开发周期中。正在调试代码？需要分析信息？准备部署你的 app？

The following describes each mode and when to use it.

下文详细解释了每种模式以及何时使用它。

## Debug

In _debug mode_, the app is set up for debugging on the physical
device, emulator, or simulator. Debug mode means that:

在 **debug 模式**下，app 可以被安装在物理设备、模拟器或者xxx上进行调试。debug 模式意味着：

* [Assertions]({{site.dart-site}}/guides/language/language-tour#assert)
   are enabled.
   
* [断点]({{site.dart-site}}/guides/language/language-tour#assert)是开启的。

* [Observatory](https://dart-lang.github.io/observatory) is enabled,
   allowing you to use the dart debugger.
   
* [Observatory](https://dart-lang.github.io/observatory) 是开启的，允许你使用 dart 的 debugger。

* Service extensions are enabled.

* 服务扩展是开启的。

* Compilation is optimized for fast development and run cycles (but not for
  execution speed, binary size, or deployment.)

* 针对快速开发和运行周期进行了编译优化（但不是针对执行速度、二进制文件大小或者部署）。

By default, `flutter run` compiles to debug mode.
Your IDE also supports these modes. Android Studio,
for example, provides a **Run > Debug...** menu option, as well
as an triangular green run button icon on the project page.
(The menu item shows a pic of the corresponding icon.)
The emulator and simulator execute _only_ in debug mode.

默认情况下，运行 `flutter run` 会使用 debug 模式。
你的 IDE 也支持这些模式。例如，Android Studio 提供了 **Run > Debug...** 菜单选项，而且在项目面板中还有一个三角形的绿色运行按钮图标。（菜单选项中会显示相应图标的图片。）emulator 和 simulator **仅**可以在 debug 模式下执行。

## Release

Use _release mode_ for deploying the app, when you want maximum
optimization and minimal footprint size. Release mode, which is not
supported on the simulator or emulator, means that:

当你想要最大的优化以及最小的占用空间时，就使用 **release 模式**来部署 app 吧。release 模式是不支持 simulator 或者 emulator 的，使用 **release 模式**意味着：

* Assertions are disabled.

  断点是不可用的。

* Debugging information is stripped out.

* 调试信息是不可见的。

* Debugging is disabled.

* 调试是禁用的。

* Compilation is optimized for fast startup, fast execution, and small
  package sizes.
  
* 编译针对快速启动、快速执行和小的 package 的大小进行了优化。

* Service extensions are disabled.

* 服务扩展是禁用的。

The command `flutter run --release` compiles to release mode.
Your IDE also supports these modes.  Android Studio, for example,
provides a **Run > Run...** menu option, as well as a green bug
icon overlayed with a small triangle on the project page.
(The menu item shows a pic of the corresponding icon.)

`flutter run --release` 命令会使用 release 模式来进行编译。你的 IDE 同样也支持这个模式。例如，Android Studio 提供了 **Run > Run...** 菜单选项，而且在项目面板中还有一个被小三角覆盖的绿色虫子图标。（菜单选项中会显示相应图标的图片。）

You can also compile to release mode with `flutter build`.
For more information, see the docs on releasing
[iOS](../deployment/ios) and [Android](../deployment/android) apps.

你也可以运行 `flutter build` 命令使用 release 模式来编译。更多详细信息，可以参阅发布 [iOS](../deployment/ios) 和 [Android](../deployment/android) app 的文档。

## Profile

In _profile mode_, some debugging ability is maintained&mdash;enough
to profile your app's performance. Profile mode is disabled on
the emulator and simulator, because their behavior is not representative
of real performance. Profile mode is similar to release mode, with
the following differences:

在 **profile** 模式下，一些调试能力是被保留的&mdash;足够分析你的 app 性能。在 emulator 和 simulator 中，profile 模式是不可用的，因为他们的行为不能代表真实的性能。profile 模式和 release 类似，但是有以下不同：

* Some service extensions, such as the one that enables the performance
  overlay, are enabled.
  
* 一些服务扩展是启用的，例如支持 performance overlay。

* Tracing is enabled, and Observatory can connect to the process.

* 追踪是启用的，observatory 可以连接整个过程。

The command `flutter run --profile` compiles to profile mode.
Your IDE also supports these modes. Android Studio, for example,
provides a **Run > Profile...** menu option.

`flutter run --profile` 命令是使用 profile 模式来编译的。你的 IDE 也是支持这个模式的。例如，Android Studio 提供了 **Run > Profile...** 菜单选项。

For more information on these modes, see
[Flutter's modes]({{site.github}}/flutter/flutter/wiki/Flutter%27s-modes)
in the [Flutter SDK wiki]({{site.github}}/flutter/flutter/wiki).

关于这些模式的更多信息，可以查看 [Flutter SDK wiki]({{site.github}}/flutter/flutter/wiki) 中的 [Flutter's modes]({{site.github}}/flutter/flutter/wiki/Flutter%27s-modes)。


