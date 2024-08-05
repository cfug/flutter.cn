---
# title: Add Flutter to existing app
title: 将 Flutter 集成到现有应用
# short-title: Add to app
short-title: 集成到现有应用
# description: Adding Flutter as a library to an existing Android or iOS app.
description: 将 Flutter 作为 library 集成到现有的 Android 或 iOS 应用。
tags: Flutter混合工程,add2app
keywords: Flutter原生混编,Flutter集成
---

## Add-to-app

## 集成到现有应用

It's sometimes not practical to rewrite your entire application in
Flutter all at once. For those situations,
Flutter can be integrated into your existing
application piecemeal, as a library or module.
That module can then be imported into your Android or iOS
(currently supported platforms) app to render a part of your
app's UI in Flutter. Or, just to run shared Dart logic.

有时候，用 Flutter 一次性重写整个已有的应用是不切实际的。
对于这些情况，Flutter 可以作为一个库或模块，
集成进现有的应用当中。
模块引入到你的 Android 或 iOS 应用（当前支持的平台）中，
以使用 Flutter 来渲染一部分的 UI，或者仅运行多平台共享的 Dart 代码逻辑。

In a few steps, you can bring the productivity and the expressiveness of
Flutter into your own app.

仅需几步，你就可以将高效而富有表现力的 Flutter 引入你的应用。

The `add-to-app` feature supports integrating multiple instances of any screen size.
This can help scenarios such as a hybrid navigation stack with mixed
native and Flutter screens, or a page with multiple partial-screen Flutter
views.

Add-to-app 支持将多个 Flutter 实例附加到任意大小的视图上。
适用于混合栈应用在导航到原生页面和 Flutter 页面的情况，
也适用于一个页面有原生视图和 Flutter 视图的情况等混合栈应用。

Having multiple Flutter instances allows each instance to maintain
independent application and UI state while using minimal
memory resources. See more in the [multiple Flutters][] page.

多个 Flutter 实例会帮助每个实例保持独立的应用和 UI 状态，
同时使用最少的内存资源。请多详细内容，请参考文档：
[多个 Flutter 实例][multiple Flutters]。 

## Supported features

## 已支持的特性

### Add to Android applications

### 集成到 Android 应用

{% render docs/app-figure.md, image:"development/add-to-app/android-overview.gif", alt:"Add-to-app steps on Android" %}

* Auto-build and import the Flutter module by adding a
  Flutter SDK hook to your Gradle script.

  在 Gradle 脚本中添加一个自动构建并引入 Flutter 模块的 Flutter SDK 钩子。

* Build your Flutter module into a generic
  [Android Archive (AAR)][] for integration into your
  own build system and for better Jetifier interoperability
  with AndroidX.

  将 Flutter 模块构建为通用的 [Android Archive (AAR)][Android Archive (AAR)]
  以便集成到你自己的构建系统中，并提高 Jetifier 与 AndroidX 的互操作性；

* [`FlutterEngine`][java-engine] API for starting and persisting
  your Flutter environment independently of attaching a
  [`FlutterActivity`][]/[`FlutterFragment`][] etc.

  [`FlutterEngine`][java-engine] API 用于启动并持续地为挂载 
  [`FlutterActivity`][] 或 [`FlutterFragment`][] 提供独立的 Flutter 环境；

* Android Studio Android/Flutter co-editing and module
  creation/import wizard.

  Android Studio 的 Android 与 Flutter 同时编辑，
  以及 Flutter module 创建与导入向导；

* Java and Kotlin host apps are supported.

  支持了 Java 和 Kotlin 为宿主的应用程序；

* Flutter modules can use [Flutter plugins][] to interact
  with the platform.

  Flutter 模块可以通过使用 [Flutter plugins][] 与平台进行交互。

* Support for Flutter debugging and stateful hot reload by
  using `flutter attach` from IDEs or the command line to
  connect to an app that contains Flutter.

  支持通过从 IDE 或命令行中使用 `flutter attach` 
  来实现 Flutter 调试与有状态的热重载。

### Add to iOS applications

### 集成到 iOS 应用

{% render docs/app-figure.md, image:"development/add-to-app/ios-overview.gif", alt:"Add-to-app steps on iOS" %}

* Auto-build and import the Flutter module by adding a Flutter
  SDK hook to your CocoaPods and to your Xcode build phase.

  在 Xcode 的 Build Phase 以及 CocoaPods 中，
  添加一个自动构建并引入 Flutter 模块的 Flutter SDK 钩子。
  
* Build your Flutter module into a generic [iOS Framework][]
  for integration into your own build system.

  将 Flutter 模块构建为通用的 [iOS Framework][]
  以便集成到你自己的构建系统中；
  
* [`FlutterEngine`][ios-engine] API for starting and persisting
  your Flutter environment independently of attaching a
  [`FlutterViewController`][].

  [`FlutterEngine`][ios-engine] API 用于启动并持续地为挂载
  [`FlutterViewController`][] 以提供独立的 Flutter 环境；
  
* Objective-C and Swift host apps supported.

  支持了 Objective-C 和 Swift 为宿主的应用程序；
  
* Flutter modules can use [Flutter plugins][] to interact
  with the platform.

  Flutter 模块可以通过使用 [Flutter plugins][] 与平台进行交互；
  
- Support for Flutter debugging and stateful hot reload by
  using `flutter attach` from IDEs or the command line to
  connect to an app that contains Flutter.

  支持通过从 IDE 或命令行中使用 `flutter attach` 
  来实现 Flutter 调试与有状态的热重载。

See our [add-to-app GitHub Samples repository][]
for sample projects in Android and iOS that import
a Flutter module for UI.

查看 [add-to-app GitHub 示例仓库](https://github.com/flutter/samples/tree/master/experimental/add_to_app)
中在 iOS 和 Android 平台上引入 Flutter module 的示例项目。 

## Get started

## 开始

To get started, see our project integration guide for
Android and iOS:

第一步，查看以下工程集成指南

<div class="card-grid">
  <a class="card" href="/add-to-app/android/project-setup">
    <div class="card-body">
      <header class="card-title text-center">
        Android
      </header>
    </div>
  </a>
  <a class="card" href="/add-to-app/ios/project-setup">
    <div class="card-body">
      <header class="card-title text-center">
        iOS
      </header>
    </div>
  </a>
</div>

## API usage

## API 用法

After Flutter is integrated into your project,
see our API usage guides at the following links:

将 Flutter 集成进你的工程后，可以查看以下 API 使用指南

<div class="card-grid">
  <a class="card" href="/add-to-app/android/add-flutter-screen">
    <div class="card-body">
      <header class="card-title text-center">
        Android
      </header>
    </div>
  </a>
  <a class="card" href="/add-to-app/ios/add-flutter-screen">
    <div class="card-body">
      <header class="card-title text-center">
        iOS
      </header>
    </div>
  </a>
</div>

## Limitations

## 已知限制

* Packing multiple Flutter libraries into an
  application isn't supported.

  不支持将多个 Flutter 库（Flutter 模块）同时打包进一个应用。
  
* Plugins that don't support `FlutterPlugin` might have unexpected
  behaviors if they make assumptions that are untenable in add-to-app
  (such as assuming that a Flutter `Activity` is always present).

  不支持 `FlutterPlugin` 的插件如果在 add-to-app 进行一些不合理的假设
  （例如假设 Flutter 的 `Activity` 始终存在），可能会出现意外行为。

* On Android, the Flutter module only supports AndroidX applications.

  Android 平台的 Flutter 模块仅支持适配了 AndroidX 的应用。

[add-to-app GitHub Samples repository]: {{site.repo.samples}}/tree/main/add_to_app
[Android Archive (AAR)]: {{site.android-dev}}/studio/projects/android-library
[Flutter plugins]: {{site.pub}}/flutter
[`FlutterActivity`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html
[java-engine]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html
[ios-engine]: {{site.api}}/ios-embedder/interface_flutter_engine.html
[FlutterFire]: {{site.github}}/firebase/flutterfire/tree/master/packages
[`FlutterFragment`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html
[`FlutterPlugin`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/FlutterPlugin.html
[`FlutterViewController`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html
[iOS Framework]: {{site.apple-dev}}/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WhatAreFrameworks.html
[maintained by the Flutter team]: {{site.repo.packages}}/tree/main/packages
[multiple Flutters]: /add-to-app/multiple-flutters
