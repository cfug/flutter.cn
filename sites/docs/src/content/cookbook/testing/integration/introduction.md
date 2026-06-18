---
# title: Integration testing concepts
title: 集成测试的理念
# description: Learn about integration testing in Flutter.
description: 了解 Flutter 中的集成测试。
# shortTitle: Introduction
shortTitle: 介绍
ai-translated: true
---

<?code-excerpt path-base="cookbook/testing/integration/introduction/"?>

Unit tests and widget tests validate individual classes,
functions, or widgets.
They don't validate how individual pieces work
together in whole or capture the performance
of an app running on a real device.
To perform these tasks, use *integration tests*.

单元测试和 widget 测试验证单个类、函数或 widget。
它们不会验证各个部分如何作为一个整体协同工作，
也不会反映应用在真实设备上运行时的性能。
要完成这些任务，请使用 **集成测试** (integration tests)。

Integration tests verify the behavior of the complete app.
This test can also be called end-to-end testing or GUI testing.

集成测试验证完整应用的行为。
这类测试也可称为端到端测试或 GUI 测试。

## Testing frameworks

## 测试框架

Two packages are commonly used to perform Flutter integration tests.
These are:

Flutter 集成测试常用两个 package，分别是：

- [integration_test][integration_test] package: The official
integration test package that is part of the Flutter SDK. Tests written
with `integration_test` can perform the following tasks: run on the
target device, run from the host machine with `flutter test integration_test`,
and use `flutter_test` APIs. This makes integration tests similar to writing 
[widget tests][]. However, `integration_test` can't interact with
native platform UI.

  [integration_test][integration_test] package：官方集成测试 package，属于 Flutter SDK 的一部分。
  使用 `integration_test` 编写的测试可以：在目标设备上运行、通过 `flutter test integration_test` 在主机上运行，
  并使用 `flutter_test` API。这使得集成测试的编写方式与[ widget 测试][widget tests]类似。
  不过，`integration_test` 无法与原生平台 UI 交互。

- [patrol][] package: A popular third-party integration test package that
has many of the features supported by the `integration_test` package,
but can additionally interact with native platform UI such as
permission dialogs, notifications, or the contents of platform views.

  [patrol][] package：流行的第三方集成测试 package，
  具备 `integration_test` package 支持的许多功能，
  还能额外与原生平台 UI 交互，例如权限对话框、通知或平台视图的内容。

## Terminology

## 术语

**host machine**
<br/> The system on which you develop your app, like a desktop computer.

**主机 (host machine)**
<br/> 你开发应用所在的系统，例如台式计算机。

**target device**
<br/> The mobile device, browser, or desktop application that
  runs your Flutter app.

**目标设备 (target device)**
<br/> 运行 Flutter 应用的移动设备、浏览器或桌面应用。

  If you run your app in a web browser or as a desktop application,
  the host machine and the target device are the same.

  若在 Web 浏览器或桌面应用中运行应用，
  主机与目标设备是同一台机器。

## Getting started

## 入门

To use `integration_test`, add it as a dependency for your
Flutter app test file.

要使用 `integration_test`，请将其作为依赖添加到你的 Flutter 应用测试文件中。

To migrate existing projects that use `flutter_driver`,
consult the [Migrating from flutter_driver][] guide.

若要将使用 `flutter_driver` 的现有项目迁移，
请参阅 [从 flutter_driver 迁移][Migrating from flutter_driver] 指南。

To use `patrol`, follow the [Patrol setup guide][].

要使用 `patrol`，请遵循 [Patrol 设置指南][Patrol setup guide]。

## Use cases for integration testing

## 集成测试的用例

The other guides in this section explain how to use integration tests to validate
[functionality][] and [performance][].

本小节的其他指南说明如何使用集成测试验证 [功能][functionality] 和 [性能][performance] 。

[functionality]: /testing/integration-tests/
[integration_test]: {{site.repo.flutter}}/tree/main/packages/integration_test
[Migrating from flutter_driver]: /release/breaking-changes/flutter-driver-migration
[patrol]: {{site.pub-pkg}}/patrol
[Patrol setup guide]: https://patrol.leancode.co/getting-started
[performance]: /cookbook/testing/integration/profiling/
[widget tests]: /testing/overview#widget-tests
