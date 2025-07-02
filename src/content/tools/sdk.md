---
# title: Flutter SDK overview
title: Flutter SDK 概览
short-title: Flutter SDK
# description: Flutter libraries and command-line tools.
description: Flutter 库和命令行工具。
---

The Flutter SDK has the packages and command-line tools that you need to develop
Flutter apps across platforms. To get the Flutter SDK, see [Install][].

Flutter SDK 拥有你在 Flutter 跨平台应用程序所需的 package 和命令行工具。
请前往 [安装][Install] 页面了解如何安装 Flutter SDK。

## What's in the Flutter SDK

## Flutter SDK 中的内容

The following is available through the Flutter SDK:

以下是 Flutter SDK 提供的内容：

* [Dart SDK][]
* Heavily optimized, mobile-first 2D rendering engine with
  excellent support for text

  针对移动应用深度优化的 2D 渲染引擎，具备出色的文字支持功能

* Modern react-style framework

  现代响应式风格框架

* Rich set of widgets implementing Material Design and iOS styles

  Material Design 风格及 iOS 风格丰富的 widget 组件

* APIs for unit and integration tests

  用于单元测试和集成测试的 API

* Interop and plugin APIs to connect to the system and 3rd-party SDKs

  原生平台交互性和插件 API 可以连接系统及第三方 SDK 

* Headless test runner for running tests on Windows, Linux, and Mac

  Headless 测试运行器，用于在 Windows、Linux 和 Mac 上运行测试

* [Flutter DevTools][] for testing, debugging, and profiling your app

  用于测试、调试和分析你的应用程序的 [Flutter DevTools][]

* `flutter` and `dart` command-line tools for creating, building, testing,
  and compiling your apps

  `flutter` 和 `dart` 命令行工具，用于创建、开发、测试和编译你的应用程序

Note: For more information about the Flutter SDK, see its
[README file][].

说明：关于 Flutter SDK 的更多信息，
请查阅 [README 文件][README file]。

## `flutter` command-line tool

## `flutter` 命令行工具

The [`flutter` CLI tool][] (`flutter/bin/flutter`) is how developers
(or IDEs on behalf of developers) interact with Flutter.

开发者（或使用的 IDE）使用 [`flutter` CLI 工具][`flutter` CLI tool] (`flutter/bin/flutter`)
与 Flutter 的相关功能进行交互。

## `dart` command-line tool

## `dart` 命令行工具

The [`dart` CLI tool][] is available with the Flutter SDK at `flutter/bin/dart`.

Flutter SDK 中提供了 [`dart` CLI 工具][`dart` CLI tool] (`flutter/bin/dart`)。

[Flutter DevTools]: /tools/devtools
[Dart SDK]: {{site.dart-site}}/tools/sdk
[`dart` CLI tool]: {{site.dart-site}}/tools/dart-tool
[`flutter` CLI tool]: /reference/flutter-cli
[Install]: /get-started/install
[README file]: {{site.repo.flutter}}/blob/main/README.md

## SDK support for Flutter developer tools

The IDE tooling for Flutter (Android Studio and Intellij plugins, VS Code 
extensions) supports Flutter SDK versions going back two years. This means that
while the tools might still function with SDKs older than two years, they will
no longer provide fixes for issues specific to these older versions.
