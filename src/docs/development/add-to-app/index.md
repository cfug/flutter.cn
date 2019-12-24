---
title: Add Flutter to existing app
title: 将 Flutter 集成到现有应用
description: Adding Flutter as a library to an existing Android or iOS app.
description: 将 Flutter 作为 library 集成到现有的 Android 或 iOS 应用。
---

## Add-to-app

## 集成到现有应用

It's sometimes not practical to rewrite your entire application in Flutter all
at once. For those situations, Flutter can be integrated into your existing
application piecemeal, as a library or module. That module can then
be imported into your Android or iOS (currently supported platforms) app to
render a part of your app's UI in Flutter. Or, just to run shared Dart logic.

有时候，用 Flutter 一次性重写整个已有的应用是不切实际的。
对于这些情况，Flutter 可以作为一个库或模块，
集成进现有的应用当中。
模块引入到您的 Android 或 iOS 应用（当前支持的平台）中，
以使用 Flutter 来渲染一部分的 UI，或者仅运行多平台共享的 Dart 代码逻辑。

In a few steps, you can bring the productivity and the expressiveness of
Flutter into your own app.

仅需几步，你就可以将高效而富有表现力的 Flutter 引入您的应用。

As of Flutter v1.12, add-to-app is supported for the basic scenario of
integrating one full-screen Flutter instance at a time per app. It currently has
the _**following limitations**_:

在 Flutter v1.12 中，添加到现有应用的基本场景已被支持，
每个应用在同一时间可以集成一个全屏幕的 Flutter 实例。
目前仍有以下限制：

- Running multiple Flutter instances or running in partial screen views may have
  undefined behavior.
  
  运行多个 Flutter 实例，或在屏幕局部上运行 Flutter 可能会导致不可预测的行为；
  
- Using Flutter in background mode is still a WIP.

  在后台模式使用 Flutter 的能力还在开发中；
  
- Packing a Flutter library into another sharable library or packing multiple
  Flutter libraries into an application isn't supported.
  
  将 Flutter 库打包进另一个可共享的库或将多个 Flutter 库打包到同一个应用中，都未被支持。

## Supported features

## 已支持的特性

### Add to Android applications

### 集成到 Android 应用

{% include app-figure.md image="development/add-to-app/android-overview.gif" alt="Add-to-app steps on Android" %}

- Auto-build and import the Flutter module by adding a Flutter SDK hook to
  your Gradle script.
  
  在 Gradle 脚本中添加一个自动构建并引入 Flutter 模块的 Flutter SDK 钩子。
  
- Build your Flutter module into a generic 
  [Android Archive (AAR)](https://developer.android.com/studio/projects/android-library)
  for integration into your own build system and for better Jetifier interoperability
  with AndroidX.
  
  将 Flutter 模块构建为通用的 
  [Android Archive (AAR)](https://developer.android.google.cn/studio/projects/android-library)
  以便集成到您自己的构建系统中，并提高 Jetifier 与 AndroidX 的互操作性；
  
- [FlutterEngine]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html)
  API for starting and persisting your Flutter environment independently of
  attaching a 
  [FlutterActivity]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html)/
  [FlutterFragment]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html) etc.
  
  [FlutterEngine]({{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html) 
  API 用于启动并持续地为挂载 
  [FlutterActivity]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html) 或
  [FlutterFragment]({{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html)
  提供独立的 Flutter 环境；
  
- Android Studio Android/Flutter co-editing and module creation/import wizard.

  Android Studio 的 Android 与 Flutter 同时编辑，以及 Flutter module 创建与导入向导；
  
- Java and Kotlin host apps are supported.

  支持了 Java 和 Kotlin 为宿主的应用程序；
  
- Flutter modules can use [Flutter plugins](https://pub.dev/flutter) to interact
  with the platform. Android plugins should be 
  [migrated to the V2 plugins APIs](/docs/development/packages-and-plugins/plugin-api-migration)
  for best add-to-app correctness. As of Flutter v1.12, most of the plugins
  [maintained by the Flutter team](https://github.com/flutter/plugins/tree/master/packages)
  as well as [FlutterFire](https://github.com/FirebaseExtended/flutterfire/tree/master/packages)
  have been migrated.
  
  Flutter 模块可以通过使用 [Flutter plugins](https://pub.flutter-io.cn/flutter) 与平台进行交互。
  Android 平台的 plugin 应该[迁移至 V2 plugin API](/docs/development/packages-and-plugins/plugin-api-migration)
  以确保最佳的兼容性。在 Flutter v1.12，大多数 
  [Flutter 团队维护](https://github.com/flutter/plugins/tree/master/packages) 的 plugin，以及 
  [FlutterFire](https://github.com/FirebaseExtended/flutterfire/tree/master/packages) 都已完成迁移；
  
- Support for Flutter debugging and stateful hot reload by using `flutter attach`
  from IDEs or the command line to connect to an app that contains Flutter.
  
  支持通过从 IDE 或命令行中使用 `flutter attach` 来实现 Flutter 调试与有状态的热重载。

### Add to iOS applications

### 集成到 iOS 应用

{% include app-figure.md image="development/add-to-app/ios-overview.gif" alt="Add-to-app steps on iOS" %}

- Auto-build and import the Flutter module by adding a Flutter SDK hook to
  your CocoaPods and to your Xcode build phase.
  
  在 Xcode 的 Build Phase 以及 CocoaPods 中，添加一个自动构建并引入 Flutter 模块的 Flutter SDK 钩子。
  
- Build your Flutter module into a generic [iOS Framework](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WhatAreFrameworks.html)
  for integration into your own build system.
  
  将 Flutter 模块构建为通用的 [iOS Framework](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WhatAreFrameworks.html)
  以便集成到您自己的构建系统中；
  
- [FlutterEngine]({{site.api}}/objcdoc/Classes/FlutterEngine.html) API for
  starting and persisting your Flutter environment independently of attaching a
  [FlutterViewController]({{site.api}}/objcdoc/Classes/FlutterViewController.html).
  
  [FlutterEngine]({{site.api}}/objcdoc/Classes/FlutterEngine.html) API 用于
  启动并持续地为挂载 [FlutterViewController]({{site.api}}/objcdoc/Classes/FlutterViewController.html)
  提供独立的 Flutter 环境；
  
- Objective-C and Swift host apps supported.

  支持了 Objective-C 和 Swift 为宿主的应用程序；
  
- Flutter modules can use [Flutter plugins](https://pub.dev/flutter) to interact
  with the platform.
  
  Flutter 模块可以通过使用 [Flutter plugins](https://pub.flutter-io.cn/flutter) 与平台进行交互；
  
- Support for Flutter debugging and stateful hot reload by using `flutter attach`
  from IDEs or the command line to connect to an app that contains  Flutter.
  
  支持通过从 IDE 或命令行中使用 `flutter attach` 来实现 Flutter 调试与有状态的热重载。

See our [add-to-app GitHub Samples repository](https://github.com/flutter/samples/tree/master/experimental/add_to_app)
for sample projects in Android and iOS that import a Flutter module for UI.

查看 [add-to-app GitHub 示例仓库](https://github.com/flutter/samples/tree/master/experimental/add_to_app)
中在 iOS 和 Android 平台上引入 Flutter module 的示例项目。 

## Get started

## 开始

To get started, see our project integration guide for

第一步，查看以下工程集成指南

<div class="card-deck mb-8">
  <a class="card" href="/docs/development/add-to-app/android/project-setup">
    <div class="card-body">
      <header class="card-title text-center m-0">
        Android
      </header>
    </div>
  </a>
  <a class="card" href="/docs/development/add-to-app/ios/project-setup">
    <div class="card-body">
      <header class="card-title text-center m-0">
        iOS
      </header>
    </div>
  </a>
</div>

## API usage

## API 用法

After Flutter is integrated into your project, see our API usage guides for

将 Flutter 集成进您的工程后，可以查看以下 API 使用指南

<div class="card-deck mb-8">
  <a class="card" href="/docs/development/add-to-app/android/add-flutter-screen">
    <div class="card-body">
      <header class="card-title text-center m-0">
        Android
      </header>
    </div>
  </a>
  <a class="card" href="/docs/development/add-to-app/ios/add-flutter-screen">
    <div class="card-body">
      <header class="card-title text-center m-0">
        iOS
      </header>
    </div>
  </a>
</div>
