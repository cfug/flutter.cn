---
# title: Testing Flutter apps
title: 测试 Flutter 应用
# description: >-
#   Learn more about the different types of testing and how to write them.
description: >-
  了解不同类型的测试以及如何编写它们。
ai-translated: true
---

The more features your app has, the harder it is to test manually.
Automated tests help ensure that your app performs correctly before
you publish it, while retaining your feature and bug fix velocity.

应用功能越多，手动测试就越困难。
自动化测试有助于在发布前确保应用表现正确，
同时保持功能开发与 bug 修复的速度。

Automated testing falls into a few categories:

自动化测试可分为以下几类：

* A [_unit test_](#unit-tests) tests a single function, method, or class.

  [**单元测试**](#unit-tests) (unit test) 测试单个函数、方法或类。

* A [_widget test_](#widget-tests) (in other UI frameworks referred to
  as _component test_) tests a single widget.

  [**widget 测试**](#widget-tests)（widget test，在其他 UI 框架中称为 **component test**）测试单个 widget。

* An [_integration test_](#integration-tests)
  tests a complete app or a large part of an app.

  [**集成测试**](#integration-tests) (integration test) 测试完整应用或应用的大部分。

Generally speaking, a well-tested app has many unit and widget tests,
tracked by [code coverage][], plus enough integration tests
to cover all the important use cases. This advice is based on
the fact that there are trade-offs between different kinds of testing,
seen below.

一般而言，经过充分测试的应用会有大量由 [代码覆盖率][code coverage] 跟踪的单元测试和 widget 测试，
再加上足以覆盖所有重要用例的集成测试。此建议基于
不同测试类型之间存在权衡，如下所示。

| <t>Tradeoff</t><t>权衡</t> | <t>Unit</t><t>单元测试</t> | <t>Widget</t><t>Widget 测试</t> | <t>Integration</t><t>集成测试</t> |
| -------------------------- | -------------------------- | ------------------------------- | --------------------------------- |
| **Confidence**             | Low                        | Higher                          | Highest                           |
| **置信度**                 | 低                         | 较高                            | 最高                              |
| **Maintenance cost**       | Low                        | Higher                          | Highest                           |
| **维护成本**               | 低                         | 较高                            | 最高                              |
| **Dependencies**           | Few                        | More                            | Most                              |
| **依赖**                   | 少                         | 较多                            | 最多                              |
| **Execution speed**        | Quick                      | Quick                           | Slow                              |
| **执行速度**               | 快                         | 快                              | 慢                                |

{:.table .table-striped}

## Unit tests

## 单元测试

A _unit test_ tests a single function, method, or class.
The goal of a unit test is to verify the correctness of a
unit of logic under a variety of conditions.
External dependencies of the unit under test are generally
[mocked out](/cookbook/testing/unit/mocking).
Unit tests generally don't read from or write
to disk, render to screen, or receive user actions from
outside the process running the test.
For more information regarding unit tests,
you can view the following recipes
or run `flutter test --help` in your terminal.

**单元测试** (unit test) 测试单个函数、方法或类。
单元测试的目标是在多种条件下验证
逻辑单元的正确性。
被测单元的外部依赖通常会
[mock 掉](/cookbook/testing/unit/mocking)。
单元测试通常不会从磁盘读写、渲染到屏幕，
或从运行测试的进程之外接收用户操作。
有关单元测试的更多信息，
你可以查看以下食谱，
或在终端中运行 `flutter test --help`。

:::note
If you're writing unit tests for code that
uses plugins and you want to avoid crashes,
check out [Plugins in Flutter tests][].
If you want to test your Flutter plugin,
check out [Testing plugins][].

如果你为使用插件的代码编写单元测试并希望避免崩溃，
请参阅 [Flutter 测试中的插件][Plugins in Flutter tests]。
如果你要测试 Flutter 插件，
请参阅 [测试插件][Testing plugins]。
:::

[Plugins in Flutter tests]: /testing/plugins-in-tests
[Testing plugins]: /testing/testing-plugins

### Recipes {:.no_toc}

### 实用教程 {:.no_toc}

- [Introduction to unit testing](/cookbook/testing/unit/introduction)

  [单元测试简介](/cookbook/testing/unit/introduction)

- [Mock dependencies using Mockito](/cookbook/testing/unit/mocking)

  [使用 Mockito mock 依赖](/cookbook/testing/unit/mocking)

## Widget tests

## Widget 测试

A _widget test_ (in other UI frameworks referred to as _component test_)
tests a single widget. The goal of a widget test is to verify that the
widget's UI looks and interacts as expected. Testing a widget involves
multiple classes and requires a test environment that provides the
appropriate widget lifecycle context.

**widget 测试**（widget test，在其他 UI 框架中称为 **component test**）
测试单个 widget。widget 测试的目标是验证
widget 的 UI 外观与交互符合预期。测试 widget 涉及
多个类，并需要能提供
适当 widget 生命周期上下文的测试环境。

For example, the Widget being tested should be able to receive and
respond to user actions and events, perform layout, and instantiate child
widgets. A widget test is therefore more comprehensive than a unit test.
However, like a unit test, a widget test's environment is replaced with
an implementation much simpler than a full-blown UI system.

例如，被测 Widget 应能接收并
响应用户操作与事件、执行布局并实例化子
widget。因此 widget 测试比单元测试更全面。
不过与单元测试类似，widget 测试的环境会被替换为
比完整 UI 系统简单得多的实现。

### Recipes {:.no_toc}

### 实用教程 {:.no_toc}

- [Introduction to widget testing](/cookbook/testing/widget/introduction)

  [Widget 测试简介](/cookbook/testing/widget/introduction)

- [Find widgets using finders](/cookbook/testing/widget/finders)

  [使用 finder 查找 widget](/cookbook/testing/widget/finders)

- [Handling scrolling in widget tests](/cookbook/testing/widget/scrolling)

  [在 widget 测试中处理滚动](/cookbook/testing/widget/scrolling)

- [Tap, drag, and enter text in widget tests](/cookbook/testing/widget/tap-drag)

  [在 widget 测试中点击、拖拽和输入文本](/cookbook/testing/widget/tap-drag)

- [Test different orientations](/cookbook/testing/widget/orientation)

  [测试不同屏幕方向](/cookbook/testing/widget/orientation)

## Integration tests

## 集成测试

An _integration test_ tests a complete app or a large part of an app.
The goal of an integration test is to verify that all the widgets
and services being tested work together as expected.
Furthermore, you can use integration
tests to verify your app's performance.

**集成测试**（integration test）测试完整应用或应用的大部分。
集成测试的目标是验证所有被测
widget 与服务能按预期协同工作。
此外，你还可以使用集成
测试验证应用性能。

Generally, an _integration test_ runs on a real device or an OS emulator,
such as iOS Simulator or Android Emulator.
The app under test is typically isolated
from the test driver code to avoid skewing the results.

一般而言，**集成测试** 在真机或操作系统模拟器上运行，
例如 iOS Simulator 或 Android Emulator。
被测应用通常与
测试驱动代码隔离，以避免结果偏差。

The Flutter SDK includes the [`integration_test`][] package.
However, this package can't interact with native platform UI,
such as permission dialogs, notifications, or platform views.
For apps that need native interactions, you can use the 
[`patrol`][] package, an open-source framework that extends
Flutter's testing capabilities with native platform support.

Flutter SDK 包含 [`integration_test`][] package。
不过该 package 无法与原生平台 UI 交互，
例如权限对话框、通知或 platform view。
对于需要原生交互的应用，你可以使用
[`patrol`][] package，这是一个扩展开源框架，
在原生平台支持下扩展 Flutter 的测试能力。

For more information on how to write integration tests, see the [integration
testing page][].

有关如何编写集成测试的更多信息，请参阅 [集成测试页面][integration testing page]。

[`integration_test`]: {{site.repo.flutter}}/tree/main/packages/integration_test
[`patrol`]: {{site.pub-pkg}}/patrol

### Recipes {:.no_toc}

### 实用教程 {:.no_toc}

- [Integration testing concepts](/cookbook/testing/integration/introduction)

  [集成测试概念](/cookbook/testing/integration/introduction)

- [Write and run a Flutter integration test](/testing/integration-tests)

  [编写并运行 Flutter 集成测试](/testing/integration-tests)

- [Write and run a Patrol integration test](https://patrol.leancode.co/documentation/write-your-first-test)

  [编写并运行 Patrol 集成测试](https://patrol.leancode.co/documentation/write-your-first-test)

- [Measure performance with an integration test](/cookbook/testing/integration/profiling)

  [使用集成测试衡量性能](/cookbook/testing/integration/profiling)

## Continuous integration services

## 持续集成服务

Continuous integration (CI) services allow you to run your
tests automatically when pushing new code changes.
This provides timely feedback on whether the code
changes work as expected and do not introduce bugs.

持续集成 (CI) 服务让你在推送新代码变更时
自动运行测试。
这能及时反馈代码变更
是否按预期工作且未引入 bug。

For information on running tests on various continuous
integration services, see the following:

有关在各种持续
集成服务上运行测试的信息，请参阅以下内容：

* [Continuous delivery using fastlane with Flutter][]

  [使用 fastlane 与 Flutter 进行持续交付][Continuous delivery using fastlane with Flutter]

* [Test Flutter apps on Appcircle][]

  [在 Appcircle 上测试 Flutter 应用][Test Flutter apps on Appcircle]

* [Test Flutter apps on Travis][]

  [在 Travis 上测试 Flutter 应用][Test Flutter apps on Travis]

* [Test Flutter apps on Cirrus][]

  [在 Cirrus 上测试 Flutter 应用][Test Flutter apps on Cirrus]

* [Codemagic CI/CD for Flutter][]

  [适用于 Flutter 的 Codemagic CI/CD][Codemagic CI/CD for Flutter]

* [Codemagic CI/CD for Patrol][] 

  [适用于 Patrol 的 Codemagic CI/CD][Codemagic CI/CD for Patrol]

* [Flutter CI/CD with Bitrise][]

  [使用 Bitrise 的 Flutter CI/CD][Flutter CI/CD with Bitrise]

[code coverage]: https://en.wikipedia.org/wiki/Code_coverage
[Codemagic CI/CD for Flutter]: https://blog.codemagic.io/getting-started-with-codemagic/
[Codemagic CI/CD for Patrol]: https://docs.codemagic.io/integrations/patrol-integration/
[Continuous delivery using fastlane with Flutter]: /deployment/cd#fastlane
[Flutter CI/CD with Bitrise]: https://devcenter.bitrise.io/en/getting-started/quick-start-guides/getting-started-with-flutter-apps
[Test Flutter apps on Appcircle]: https://blog.appcircle.io/article/flutter-ci-cd-github-ios-android-web#
[Test Flutter apps on Cirrus]: https://cirrus-ci.org/examples/#flutter
[Test Flutter apps on Travis]: {{site.flutter-blog}}/test-flutter-apps-on-travis-3fd5142ecd8c
[integration testing page]: /cookbook/testing/integration/introduction
