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

If you are writing a new application from scratch, it is easy to [get started][]
using Flutter. But what if you already have an app that's not written in
Flutter, and it's impractical to start from scratch?

For those situations, Flutter can be integrated into your existing application
piecemeal, as a module. This feature is known as "add-to-app". The module can be
imported into your existing app to render part of your app using Flutter, while
the rest can be rendered using existing technology. This method can also be used
to run shared non-UI logic by taking advantage of Dart's portability and
interoperability with other languages.

Add-to-app is currently supported on Android, iOS, and web.

Flutter supports two flavors of add-to-app:

- **Multi-engine**: supported on Android and iOS, allows running one or more
  instances of Flutter, each rendering a widget embedded into the host
  application. Each instance is a separate Dart program, running in isolation
  from other programs. Having multiple Flutter instances allows each instance to
  maintain independent application and UI state while using minimal memory
  resources. See more in the [multiple Flutters][] page.
- **Multi-view**: supported on the web, allows creating multiple
  [FlutterView][]s, each rendering a widget embedded into the host application.
  In this mode there's only one Dart program and all views and widgets can share
  objects.

Add-to-app supports integrating multiple Flutter views of any size, supporting
various use-cases. Two of the most common use-cases are:

* **Hybrid navigation stacks**: an app is made of multiple screens, some of
  which are rendered by Flutter, and others by another framework. The user can
  navigate from one screen to another freely, no matter which framework is used
  to render the screen.
* **Partial-screen views**: a screen in the app renders multiple widgets, some
  of which are rendered by Flutter, and others by another framework. The user
  can scroll and interact with any widget freely, no matter which framework is
  used to render the widget. 

## Supported features

## 已支持的特性

### Add to Android applications

### 集成到 Android 应用

{% render docs/app-figure.md, image:"development/add-to-app/android-overview.webp", alt:"Add-to-app steps on Android" %}

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

{% render docs/app-figure.md, image:"development/add-to-app/ios-overview.webp", alt:"Add-to-app steps on iOS" %}

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

请查看我们的 [add-to-app GitHub 示例仓库][add-to-app GitHub Samples repository]，
其中包含了在 Android 和 iOS 平台上引入 Flutter module 用于 UI 的示例项目。 

### Add to web applications

Flutter can be added to any existing HTML DOM-based web app written in any
client-side Dart web framework ([jaspr][], [ngdart][], [over_react][], etc),
any client-side JS framework ([React][], [Angular][], [Vue.js][], etc),
any server-side rendered framework ([Django][], [Ruby on Rails][],
[Apache Struts][], etc), or even no framework (affectionately known as
"[VanillaJS][]"). The minimum requirement is only that your existing application
and its framework support importing JavaScript libraries, and creating HTML
elements for Flutter to render into.

To add Flutter to an existing app, build it normally, then follow the
[embedding instructions][] for putting Flutter views onto the page.

[jaspr]: https://pub.dev/packages/jaspr
[ngdart]: https://pub.dev/packages/ngdart
[over_react]: https://pub.dev/packages/over_react
[React]: https://react.dev/
[Angular]: https://angular.dev/
[Vue.js]: https://vuejs.org/
[Django]: https://www.djangoproject.com/
[Ruby on Rails]: https://rubyonrails.org/
[Apache Struts]: https://struts.apache.org/
[VanillaJS]: http://vanilla-js.com/
[embedding instructions]: {{site.docs}}/platform-integration/web/embedding-flutter-web#embedded-mode

## Get started

## 开始

To get started, see our project integration guide for
Android and iOS:

第一步，查看以下工程集成指南

<div class="card-grid">
  <a class="card outlined-card" href="/add-to-app/android/project-setup">
    <div class="card-header text-center">
      <span class="card-title">Android</span>
    </div>
  </a>
  <a class="card outlined-card" href="/add-to-app/ios/project-setup">
    <div class="card-header text-center">
      <span class="card-title">iOS</span>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/embedding-flutter-web#embedded-mode">
    <div class="card-header text-center">
      <span class="card-title">Web</span>
    </div>
  </a>
</div>

## API usage

## API 用法

After Flutter is integrated into your project,
see our API usage guides at the following links:

将 Flutter 集成进你的工程后，可以查看以下 API 使用指南

<div class="card-grid">
  <a class="card outlined-card" href="/add-to-app/android/add-flutter-screen">
    <div class="card-header text-center">
      <span class="card-title">Android</span>
    </div>
  </a>
  <a class="card outlined-card" href="/add-to-app/ios/add-flutter-screen">
    <div class="card-header text-center">
      <span class="card-title">iOS</span>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/embedding-flutter-web#manage-flutter-views-from-js">
    <div class="card-header text-center">
      <span class="card-title">Web</span>
    </div>
  </a>
</div>

## Limitations

## 已知限制

Mobile limitations:

移动端的限制：

* Multi-view mode is not supported (multi-engine only).

  不支持多视图模式（仅限多引擎）。

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

Web limitations:

Web 端的限制：

* Multi-engine mode is not supported (multi-view only).

  不支持多引擎模式（仅限多视图）。

* There's no way to completely "shutdown" the Flutter engine. The app can remove
  all the [FlutterView][] objects and make sure all data is garbage collected
  using normal Dart concepts. However, the engine will remain warmed up, even if
  it's not rendering anything.

  无法完全“关闭” Flutter 引擎。
  应用程序可以移除所有 [FlutterView][] 对象，
  并确保所有数据通过 Dart 常规的垃圾回收机制被清理。
  然而，即使引擎不再渲染任何内容，
  它仍会保持预热状态。

[get started]: /get-started/codelab
[add-to-app GitHub Samples repository]: {{site.repo.samples}}/tree/main/add_to_app
[Android Archive (AAR)]: {{site.android-dev}}/studio/projects/android-library
[Flutter plugins]: {{site.pub}}/flutter
[`FlutterActivity`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterActivity.html
[java-engine]: {{site.api}}/javadoc/io/flutter/embedding/engine/FlutterEngine.html
[ios-engine]: {{site.api}}/ios-embedder/interface_flutter_engine.html
[FlutterFire]: {{site.github}}/firebase/flutterfire/tree/main/packages
[`FlutterFragment`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterFragment.html
[`FlutterPlugin`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/FlutterPlugin.html
[`FlutterViewController`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html
[iOS Framework]: {{site.apple-dev}}/library/archive/documentation/MacOSX/Conceptual/BPFrameworks/Concepts/WhatAreFrameworks.html
[maintained by the Flutter team]: {{site.repo.packages}}/tree/main/packages
[multiple Flutters]: /add-to-app/multiple-flutters
[FlutterView]: https://api.flutter-io.cn/flutter/dart-ui/FlutterView-class.html
