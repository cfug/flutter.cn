---
title: Flutter's build modes
title: Flutter 的构建模式选择
description: Describes Flutter's build modes and when you should use debug, release, or profile mode.
description: 在使用 Flutter 构建的时候，你应该选择哪种模式呢？Debug、Release、或者是 Profile 模式。
---

The Flutter tooling supports three modes when compiling your app,
and a headless mode for testing.
This doc explains the three modes and tells you when to use which.
For more information on headless testing, see
[Unit testing.](/docs/testing#unit-tests)

Flutter 支持三种模式编译 app，也支持使用 headless 模式来测试。
这篇文档解释了这三种模式，并且告诉你什么时候应该使用哪种模式。关于 headless 测试的更多信息，可以查看 [单元测试](/docs/testing#unit-tests)。

You choose a compilation mode depending on where you are in
the development cycle. Are you debugging your code? Do you
need profiling information? Are you ready to deploy your app?

选择哪种编译模式取决于你处于哪个开发周期中。正在调试代码？需要分析信息？准备部署你的 app？

A quick summary for when to use which mode is as follows:

快速简要介绍下列三种构建模式：

* Use [debug](#debug) mode during development,
  when you want to use [hot reload][].

  开发过程中，需要使用 [热重载][hot reload] 功能，
  请选择 [debug](#debug) 构建模式；
  
* Use [profile](#profile) mode when you want to analyze
  performance using [DevTools][].

  当你使用开发者工具分析性能的时候，
  选择使用 [profile](#profile) 构建模式；

* Use [release](#release) mode when you are ready to release
  your app.

  发布应用的时候，需要选择使用 [release](#release) 构建模式。

The rest of the page goes into more detail about these modes.
For information on headless testing, see the [Flutter wiki][].

下文详细解释了每种模式以及何时使用它，获得更多信息，或者了解无头模式的测试，
请参考 [Flutter wiki][] 文档。

## Debug
## 调试模式

In _debug mode_, the app is set up for debugging on the physical
device, emulator, or simulator. Debug mode means that:

在 **Debug 模式**下，app 可以被安装在物理设备、仿真器或者模拟器上进行调试。Debug 模式意味着：

* [Assertions][] are enabled.
   
  [断点]({{site.dart-site}}/guides/language/language-tour#assert) 是开启的。

* Service extensions are enabled.

  服务扩展是开启的。

* Compilation is optimized for fast development and run cycles
  (but not for execution speed, binary size, or deployment).

  针对快速开发和运行周期进行了编译优化（但不是针对执行速度、二进制文件大小或者部署）。
  
* Debugging is enabled, and tools supporting source level debugging
  (such as [DevTools][]) can connect to the process.

  调试开启，类似 [开发者工具][DevTools] 等调试工具可以连接到进程里。

By default, `flutter run` compiles to debug mode.
Your IDE supports this mode. Android Studio,
for example, provides a **Run > Debug...** menu option,
as well as a green bug icon overlayed with a small triangle
on the project page.

默认情况下，运行 `flutter run` 会使用 Debug 模式。
你的 IDE 也支持这些模式。例如，Android Studio 提供了 **Run > Debug...** 菜单选项，
而且在项目面板中还有一个三角形的绿色运行按钮图标
（菜单选项中会显示相应图标的图片）。

{{site.alert.note}}

  * Hot reload works _only_ in debug mode.

    热重载功能**仅能**在调试模式下运行；
  
  * The emulator and simulator execute _only_ in debug mode.

    仿真器和模拟器**仅能**在调试模式下运行；

  * Application performance can be janky in debug mode.
    Measure performance in [profile](#profile)
    mode on an actual device.

    在调试模型下，应用的性能可能会掉帧或者卡顿，
    [profile](#profile) 模式下会更接近真机性能。

{{site.alert.end}}


## Release
## Release 模式

Use _release mode_ for deploying the app, when you want maximum
optimization and minimal footprint size. Release mode,
which is not supported on the simulator or emulator, means that:

当你想要最大的优化以及最小的占用空间时，就使用 **Release 模式**来部署 app 吧。release 模式是不支持模拟器或者仿真器的，使用 **Release 模式**意味着：

* Assertions are disabled.

  断点是不可用的。

* Debugging information is stripped out.

  调试信息是不可见的。

* Debugging is disabled.

  调试是禁用的。

* Compilation is optimized for fast startup, fast execution,
  and small package sizes.
  
  编译针对快速启动、快速执行和小的 package 的大小进行了优化。

* Service extensions are disabled.

  服务扩展是禁用的。

The command `flutter run --release` compiles to release mode.
Your IDE supports this mode.  Android Studio, for example,
provides a **Run > Run...** menu option, as well as a triangular 
green run button icon on the project page.
(The menu item shows a pic of the corresponding icon.)

`flutter run --release` 命令会使用 Release 模式来进行编译。你的 IDE 同样也支持这个模式。例如，Android Studio 提供了 **Run > Run...** 菜单选项，而且在项目面板中还有一个被小三角覆盖的绿色虫子图标。（菜单选项中会显示相应图标的图片）

You can also compile to release mode with `flutter build`.

你也可以通过 `flutter  build` 命令来使用 release 模式。

For more information, see the docs on releasing
[iOS][] and [Android][] apps.

你也可以运行 `flutter build` 命令使用 Release 模式来编译。更多详细信息，可以参阅发布 [iOS](../deployment/ios) 和 [Android](../deployment/android) app 的文档。

## Profile
## Profile 模式

In _profile mode_, some debugging ability is maintained&mdash;enough
to profile your app's performance. Profile mode is disabled on
the emulator and simulator, because their behavior is not representative
of real performance. Profile mode is similar to release mode,
with the following differences:

在 **profile** 模式下，一些调试能力是被保留的&mdash;足够分析你的 app 性能。在仿真器和模拟器上，Profile 模式是不可用的，因为他们的行为不能代表真实的性能。profile 模式和 release 类似，但有以下不同：

* Some service extensions, such as the one that enables the performance
  overlay, are enabled.
  
  一些服务扩展是启用的。例如，支持 performance overlay。

* Tracing is enabled, and tools supporting source-level debugging
  (such as [DevTools][]) can connect to the process.

  Tracing 是启用的，一些调试工具，比如 [开发者工具][DevTools] 可以连接到进程里。

Your IDE supports this mode. Android Studio, for example,
provides a **Run > Profile...** menu option.
The command `flutter run --profile` compiles to profile mode.

`flutter run --profile` 命令是使用 Profile 模式来编译的。
你的 IDE 也是支持这个模式的。例如，Android Studio 提供了 **Run > Profile...** 菜单选项。

{{site.alert.note}}

  Use the [DevTools][] suite to profile your app's performance.
  
  可以使用 [开发者工具][DevTools] 来测试应用性能。
{{site.alert.end}}

For more information on the build modes, see
[Flutter's build modes][].

关于这些模式的更多信息，可以查看 [Flutter wiki][] 中的 
[Flutter's build modes][] 文档。

[Flutter wiki]: {{site.github}}/flutter/flutter/wiki/Flutter's-modes
[Assertions]: {{site.dart-site}}/guides/language/language-tour#assert
[iOS]:  /docs/deployment/ios
[Android]: /docs/deployment/android
[hot reload]: /docs/development/tools/hot-reload
[DevTools]: /docs/development/tools/devtools
[Flutter's build modes]: ({{site.github}}/flutter/flutter/wiki/Flutter%27s-modes)
