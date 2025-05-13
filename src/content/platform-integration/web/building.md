---
# title: Building a web application with Flutter
title: 构建 Flutter Web 应用
short-title: Web development
# description: Instructions for creating a Flutter app for the web.
description: 针对 Web 平台构建 Flutter 应用的指南。
---

This page provides an overview of how to configure, run, and build a web
application using Flutter.

本篇内容概述了如何使用 Flutter 来配置、运行以及构建 Web 应用。

## Requirements

## 必要条件

Before you can build a web application with Flutter,
make sure that you have the [Flutter SDK][] and a web browser installed.
See the [Set up web development for Flutter][Setup-web] instructions
for details.

在你使用 Flutter 构建 Web 应用之前，
请确保已安装 [Flutter SDK][] 以及 Web 浏览器。
相关详细说明，请查阅 [设置 Flutter Web 开发环境][Setup-web]

## Set up a Flutter project

## 准备 Flutter 项目

To set up your project, you can create a new Flutter project or add web support
to an existing project.

为了设置你的项目，
你可以创建一个新的 Flutter 项目，
或者为现有项目添加 Web 支持。

### Create a new project

### 创建一个新项目

To create a new app that includes web support, run the following command:

运行以下命令，来创建一个支持 Web 的新应用：

```console
$ flutter create my_app 
```

### Add web support to an existing project

### 为现有项目添加 Web 支持

If you already have a project, run the `flutter create` command in your project directory:

如果你已经有了一个项目，
请在项目目录中运行以下 `flutter create` 命令：

```console
$ flutter create . --platforms web
```

This creates a `web/` directory containing the web assets used to bootstrap
and run your Flutter app. 

这会创建一个 `web/` 目录，
其中包含用于启动和运行 Flutter 应用的 Web 资源。

## Run your app

## 运行应用

Select [Chrome][] as your app's target device to run and debug a Flutter web app:

选择使用 [Chrome][] 作为运行和调试 Flutter Web 应用的目标浏览器：

```console
$ flutter run -d chrome
```

You can also choose Chrome as a target device in your IDE.

你也可以在 IDE 中选择 Chrome 作为目标浏览器。

If you prefer, you can use the `edge` device type on Windows, or use `web-server` to
navigate to a local URL in the browser of your choice.

如果你想使用其他浏览器，
你还可以使用 Windows 上的 `edge` 浏览器，
或者使用 `web-server` 在浏览器中访问本地服务的 URL。

:::warning

**Hot reload is not supported in a web browser**.
Currently, Flutter only supports **hot restart**, which restarts your app
without refreshing the web page.

**Web 浏览器不支持热重载**。
目前为止，Flutter 仅支持在 Web 浏览器中 **热重启**，
它会在不刷新网页的情况下重新启动你的应用。

:::

### Run your app using WebAssembly

### 使用 WebAssembly 运行应用

You can pass the `--wasm` flag to run your app using WebAssembly:

你可以通过 `--wasm` 标志，使用 WebAssembly 来运行应用：

```console
$ flutter run -d chrome --wasm
```

Flutter web offers multiple build modes and renderers. For more information,
see [Web renderers][].

Flutter Web 提供多种构建模式和渲染器。
想要了解更多信息，请查阅 [Web 渲染器][Web renderers]。

## Build your app

## 构建应用

Run the following command to generate a release build:

运行以下命令生成发布版本 (release) 的构建：

```console
$ flutter build web
```

### Build your app using WebAssembly

### 使用 WebAssembly 构建应用

You can also pass the `--wasm` flag to build your app using WebAssembly:

你还可以通过 `--wasm` 标志，使用 WebAssembly 来构建应用：

```console
$ flutter build web --wasm
```

This populates a `build/web` directory
with built files, including an `assets` directory,
which need to be served together.

这会在 `build/web` 目录中生成构建文件，
包括需要一起提供服务的 `assets` 目录。

To learn more about how to deploy these assets to the web, see
[Build and release a web app][].
For answers to other common questions, see the [Web FAQ][].

如果你想要了解更多关于如何将这些资源部署到 Web 的信息，
请查阅 [构建和发布 Web 应用][Build and release a web app]。
如果你有其他常见问题需要解答，可以查阅 [Web 常见问题][Web FAQ]。

## Debugging

## 调试

Use [Flutter DevTools][] for the following tasks:

你可以使用 [Flutter DevTools][] 来进行以下调试：

* [Debugging][]

  [调试][Debugging]

* [Logging][]

  [日志][Logging]

* [Running Flutter inspector][]

  [运行 Flutter inspector 工具][Running Flutter inspector]

Use [Chrome DevTools][] for the following tasks:

你可以使用 [Chrome DevTools][] 来进行以下调试：

* [Generating event timeline][]

  [生成事件时间轴][Generating event timeline]

* [Analyzing performance][]&mdash;make sure to use a
  profile build

  [性能分析][Analyzing performance]&mdash;确保使用 profile 构建模式

## Testing

## 测试

Use [widget tests][Widget tests] or integration tests. To learn more about
running integration tests in a browser, see the [Integration testing][] page.

你可以使用 [Widget 测试][Widget tests] 或者集成测试。
想要了解在浏览器中运行集成测试的更多信息，
请查阅 [集成测试][Integration testing] 文档。

[Analyzing performance]: {{site.developers}}/web/tools/chrome-devtools/evaluate-performance
[Build and release a web app]: /deployment/web
[Chrome DevTools]: {{site.developers}}/web/tools/chrome-devtools
[Chrome]: https://www.google.com/chrome/
[Debugging]: /tools/devtools/debugger
[Flutter DevTools]: /tools/devtools
[Flutter SDK]: /get-started/install
[Generating event timeline]: {{site.developers}}/web/tools/chrome-devtools/evaluate-performance/performance-reference
[Integration testing]: /testing/integration-tests#test-in-a-web-browser
[Logging]: /tools/devtools/logging
[Running Flutter inspector]: /tools/devtools/inspector
[Setup-web]: {{site.url}}/platform-integration/web/setup
[Web FAQ]: /platform-integration/web/faq
[Web renderers]: /platform-integration/web/renderers
[Widget tests]: /testing/overview#widget-tests

