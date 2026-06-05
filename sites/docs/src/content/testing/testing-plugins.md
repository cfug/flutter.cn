---
# title: Testing plugins
title: 测试插件
# description: Learn how to test your plugin package.
description: 了解如何测试你的插件包。
ai-translated: true
---

All of the [usual types of Flutter tests][] apply to
plugin packages as well, but because plugins contain
native code they often also require other kinds of tests
to test all of their functionality.

所有[常见的 Flutter 测试类型][usual types of Flutter tests]也适用于
插件包，但由于插件包含
原生代码，通常还需要其他类型的测试
来测试其全部功能。

[usual types of Flutter tests]: /testing/overview

:::note
To learn how to test your plugin code, read on.
To learn how to avoid crashes from a plugin when
testing your Flutter app, check out
[Plugins in Flutter tests][].

要了解如何测试插件代码，请继续阅读。
要了解在测试 Flutter 应用时如何避免插件导致的崩溃，请参阅
[Flutter 测试中的插件][Plugins in Flutter tests]。
:::

[Plugins in Flutter tests]: /testing/plugins-in-tests

## Types of plugin tests

## 插件测试类型

To see examples of each of these types of tests, you can
[create a new plugin from the plugin template][plugin-tests]
and look in the indicated directories.

要查看每类测试的示例，你可以
[从插件模板创建新插件][plugin-tests]
并查看指定目录。

* <strong>Dart [unit tests][] and [widget tests][]</strong>.
  These tests allow you to test the Dart portion of your plugin
  just as you would test the Dart code of a non-plugin package.
  However, the plugin's native code [won't be loaded][],
  so any calls to platform channels need to be [mocked in tests][].

  <strong>Dart [单元测试][unit tests] 和 [widget 测试][widget tests]</strong>。
  这些测试让你测试插件的 Dart 部分，
  就像测试非插件包的 Dart 代码一样。
  不过，插件的原生代码[不会被加载][won't be loaded]，
  因此对平台通道的任何调用都需要在测试中[mock][mocked in tests]。

  See the `test` directory for an example.

  请参阅 `test` 目录中的示例。

* <strong>Dart [integration tests][]</strong>.
  Since integration tests run in the context of a
  Flutter application (the example app),
  they can test both the Dart and native code,
  as well as the interaction between them.
  They are also useful for unit testing web implementation
  code that needs to run in a browser.

  <strong>Dart [集成测试][integration tests]</strong>。
  由于集成测试在
  Flutter 应用（示例应用）的上下文中运行，
  它们可以测试 Dart 与原生代码，
  以及两者之间的交互。
  它们也适用于对需要在浏览器中运行的 Web 实现
  代码进行单元测试。

  These are often the most important tests for a plugin.
  However, Dart integration tests using `integration_test` can't
  interact with native UI, such as native dialogs or the contents
  of platform views. For native component interaction support,
  consider using [`patrol`][]

  这些通常是插件最重要的测试。
  不过，使用 `integration_test` 的 Dart 集成测试无法
  与原生 UI 交互，例如原生对话框或
  platform view 的内容。如需原生组件交互支持，
  可考虑使用 [`patrol`][]

  See the  `example/integration_test` directory for an example.

  请参阅 `example/integration_test` 目录中的示例。

* <strong>Native unit tests.</strong>
  Just as Dart unit tests can test the Dart portions
  of a plugin in isolation, native unit tests can
  test the native parts in isolation.
  Each platform has its own native unit test system,
  and the tests are written in the same native languages
  as the code it is testing.

  <strong>原生单元测试。</strong>
  正如 Dart 单元测试可以隔离测试插件的 Dart 部分，
  原生单元测试可以
  隔离测试原生部分。
  每个平台都有自己的原生单元测试系统，
  测试使用与被测代码相同的原生语言编写。

  Native unit tests can be especially valuable
  if you need to mock out APIs wrapped by your plugin code,
  which isn't possible in a Dart integration test.

  如果你需要 mock 插件代码封装的 API，
  这在 Dart 集成测试中无法实现，
  原生单元测试尤其有价值。

  You can set up and use any native test frameworks
  you are familiar with for each platform,
  but the following are already configured in the plugin template:

  你可以为每个平台设置并使用你熟悉的任何原生测试框架，
  但以下已在插件模板中配置：

  * <strong>Android</strong>:
    [JUnit][] tests can be found in `android/src/test/`.

    <strong>Android</strong>：
    [JUnit][] 测试位于 `android/src/test/`。

  * <strong>iOS</strong> and <strong>macOS</strong>:
    [XCTest][] tests can be found in `example/ios/RunnerTests/`
    and `example/macos/RunnerTests/` respectively.
    These are in the example directory,
    not the top-level package directory,
    because they are run via the example app's project.

    <strong>iOS</strong> 和 <strong>macOS</strong>：
    [XCTest][] 测试分别位于 `example/ios/RunnerTests/`
    和 `example/macos/RunnerTests/`。
    这些位于示例目录，
    而非顶层包目录，
    因为它们通过示例应用的项目运行。

  * <strong>Linux</strong> and <strong>Windows</strong>:
    [GoogleTest][] tests can be found in `linux/test/`
    and `windows/test/`, respectively.

    <strong>Linux</strong> 和 <strong>Windows</strong>：
    [GoogleTest][] 测试分别位于 `linux/test/`
    和 `windows/test/`。

Other types of tests, which aren't currently pre-configured
in the template, are <strong>native UI tests</strong>.
Running your application under a native UI testing framework,
such as [Espresso][] or [XCUITest][],
enables tests that interact with both native and Flutter UI elements,
so can be useful if your plugin can't be tested without
native UI interactions.

模板中当前未预配置的其他测试类型是 <strong>原生 UI 测试</strong>。
在原生 UI 测试框架下运行应用，
例如 [Espresso][] 或 [XCUITest][]，
可实现与原生和 Flutter UI 元素交互的测试，
因此若插件无法在没有
原生 UI 交互的情况下测试，这会很有用。

[Espresso]: {{site.repo.packages}}/tree/main/packages/espresso
[GoogleTest]: {{site.github}}/google/googletest
[integration tests]: /cookbook/testing/integration/introduction
[JUnit]: {{site.github}}/junit-team/junit4/wiki/Getting-started
[mocked in tests]: /testing/plugins-in-tests#mock-the-platform-channel
[`patrol`]: {{site.pub-pkg}}/patrol
[plugin-tests]: /packages-and-plugins/developing-packages#step-1-create-the-package-1
[unit tests]: /cookbook/testing/unit/introduction
[widget tests]: /cookbook/testing/widget/introduction
[won't be loaded]: /testing/plugins-in-tests
[XCTest]: {{site.apple-dev}}/documentation/xctest
[XCUITest]: {{site.apple-dev}}/library/archive/documentation/DeveloperTools/Conceptual/testing_with_xcode/chapters/09-ui_testing.html

## Running tests

## 运行测试

### Dart unit tests

### Dart 单元测试

These can be run like any other Flutter unit tests,
either from your preferred Flutter IDE,
or using `flutter test`.

这些可以像任何其他 Flutter 单元测试一样运行，
在你首选的 Flutter IDE 中，
或使用 `flutter test`。

### Integration tests

### 集成测试

For information on running this type of test, check out the
[integration test documentation][].
The commands must be run in the `example` directory.

有关运行此类测试的信息，请参阅
[集成测试文档][integration test documentation]。
命令必须在 `example` 目录中运行。

[integration test documentation]: /cookbook/testing/integration/introduction

### Native unit tests

### 原生单元测试

For all platforms, you need to build the example
application at least once before running the unit tests,
to ensure that all of the platform-specific build
files have been created.

对于所有平台，你需要在运行单元测试前
至少构建一次示例
应用，以确保所有平台特定的构建
文件已创建。

<strong>Android JUnit</strong><br>

<strong>Android JUnit</strong><br>

If you have the example opened as an Android project
in Android Studio, you can run the unit tests using
the [Android Studio test UI][].

如果你在 Android Studio 中将示例作为 Android 项目打开，
可以使用
[Android Studio 测试 UI][Android Studio test UI] 运行单元测试。

To run the tests from the command line,
use the following command in the `example/android` directory:

要从命令行运行测试，
在 `example/android` 目录中使用以下命令：

```sh
./gradlew testDebugUnitTest
```

<strong>iOS and macOS XCTest</strong><br>

<strong>iOS 与 macOS XCTest</strong><br>

If you have the example app opened in Xcode,
you can run the unit tests using the [Xcode Test UI][].

如果你在 Xcode 中打开了示例应用，
可以使用 [Xcode 测试 UI][Xcode Test UI] 运行单元测试。

To run the tests from the command line,
use the following command in the `example/ios` (for iOS)
or `example/macos` (for macOS) directory:

要从命令行运行测试，
在 `example/ios`（iOS）或
`example/macos`（macOS）目录中使用以下命令：

```sh
xcodebuild test -workspace Runner.xcworkspace -scheme Runner -configuration Debug
```

For iOS tests, you might need to first open
`Runner.xcworkspace` in Xcode to configure code signing.

对于 iOS 测试，你可能需要先在 Xcode 中打开
`Runner.xcworkspace` 以配置代码签名。

<strong>Linux GoogleTest</strong><br>

<strong>Linux GoogleTest</strong><br>

To run the tests from the command line,
use the following command in the example directory,
replacing "my_plugin" with your plugin project name:

要从命令行运行测试，
在示例目录中使用以下命令，
将 "my_plugin" 替换为你的插件项目名称：

```sh
build/linux/plugins/x64/debug/my_plugin/my_plugin_test
```

If you built the example app in release mode rather than
debug, replace "debug" with "release".

如果你以 release 模式而非
debug 模式构建示例应用，将 "debug" 替换为 "release"。

<strong>Windows GoogleTest</strong><br>

<strong>Windows GoogleTest</strong><br>

If you have the example app opened in Visual Studio,
you can run the unit tests using the [Visual Studio test UI][].

如果你在 Visual Studio 中打开了示例应用，
可以使用 [Visual Studio 测试 UI][Visual Studio test UI] 运行单元测试。

To run the tests from the command line,
use the following command in the example directory,
replacing "my_plugin" with your plugin project name:

要从命令行运行测试，
在示例目录中使用以下命令，
将 "my_plugin" 替换为你的插件项目名称：

```sh
build/windows/plugins/my_plugin/Debug/my_plugin_test.exe
```

If you built the example app in release mode rather
than debug, replace "Debug" with "Release".

如果你以 release 模式而非
debug 模式构建示例应用，将 "Debug" 替换为 "Release"。

## What types of tests to add

## 应添加哪些类型的测试

The [general advice for testing Flutter projects][general advice]
applies to plugins as well.
Some extra considerations for plugin testing:

[测试 Flutter 项目的一般建议][general advice]
也适用于插件。
插件测试的一些额外考虑：

* Since only integration tests can test the communication
  between Dart and the native languages,
  try to have at least one integration test of each
  platform channel call.

  由于只有集成测试可以测试 Dart 与
  原生语言之间的通信，
  请尽量为每个
  平台通道调用至少编写一个集成测试。

* If some flows can't be tested using the `integration_test` package
  (for example if they require interacting with native UI or mocking
  device state), consider using the [`patrol`][] package for
  native UI interactions, or writing "end to end" tests of the two halves
  using unit tests:

  如果某些流程无法使用 `integration_test` 包测试
  （例如需要与原生 UI 交互或 mock
  设备状态），可考虑使用 [`patrol`][] 包进行
  原生 UI 交互，或使用单元测试为两半编写「端到端」测试：

  * Native unit tests that set up the necessary mocks,
    then call into the method channel entry point
    with a synthesized call and validate the method response.

    设置必要 mock 的原生单元测试，
    然后通过合成的调用调用 method channel 入口点
    并验证方法响应。

  * Dart unit tests that mock the platform channel,
    then call the plugin's public API and validate the results.

    mock 平台通道的 Dart 单元测试，
    然后调用插件的公共 API 并验证结果。

[Android Studio test UI]: {{site.android-dev}}/studio/test/test-in-android-studio
[general advice]: /testing/overview
[Visual Studio test UI]: https://learn.microsoft.com/en-us/visualstudio/test/getting-started-with-unit-testing?view=vs-2022&tabs=dotnet%2Cmstest#run-unit-tests
[Xcode Test UI]: {{site.apple-dev}}/library/archive/documentation/DeveloperTools/Conceptual/testing_with_xcode/chapters/05-running_tests.html
