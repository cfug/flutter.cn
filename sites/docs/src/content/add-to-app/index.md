---
# title: Add Flutter to an existing app
title: 将 Flutter 集成到现有应用
# shortTitle: Add to app
shortTitle: 集成到现有应用
# description: Adding Flutter as a library to an existing Android, iOS, macOS, or web app.
description: 将 Flutter 作为 library 集成到现有的 Android、iOS、macOS 或 web 应用。
tags: Flutter混合工程,add2app
keywords: Flutter原生混编,Flutter集成
ai-translated: true
---

## Add-to-app

## 集成到现有应用

If you are writing a new application from scratch, it is easy to [get started][]
using Flutter. But what if you already have an app that's not written in
Flutter, and it's impractical to start from scratch?

如果你正从零开始编写一个新应用，使用 Flutter [上手][get started]
会很容易。但如果你已经有一个并非使用 Flutter 编写的应用，
并且从头开始重写并不现实，该怎么办？

For those situations, Flutter can be integrated into your existing application
piecemeal, as a module. This feature is known as "add-to-app". The module can be
imported into your existing app to render part of your app using Flutter, while
the rest can be rendered using existing technology. This method can also be used
to run shared non-UI logic by taking advantage of Dart's portability and
interoperability with other languages.

对于这些场景，Flutter 可以作为一个 module，逐步集成到你的现有应用中。
这项功能称为「add-to-app」。该 module 可以导入到你的现有应用中，
用 Flutter 渲染应用的一部分，而其余部分继续使用现有技术渲染。
借助 Dart 的可移植性以及与其他语言的互操作性，
这种方式也可以用来运行共享的非 UI 逻辑。

Add-to-app is currently supported on Android, iOS, macOS, and web.

Add-to-app 目前支持 Android、iOS、macOS 和 web。

Flutter supports two flavors of add-to-app:

Flutter 支持两种 add-to-app 形式：

- **Multi-engine**: supported on Android, iOS, and macOS, allows running one or more
  instances of Flutter, each rendering a widget embedded into the host
  application. Each instance is a separate Dart program, running in isolation
  from other programs. Having multiple Flutter instances allows each instance to
  maintain independent application and UI state while using minimal memory
  resources. See more in the [multiple Flutters][] page.

  **多引擎**：支持 Android、iOS 和 macOS，允许运行一个或多个 Flutter 实例，
  每个实例都会渲染一个嵌入到宿主应用中的 widget。
  每个实例都是一个独立的 Dart 程序，并与其他程序隔离运行。
  多个 Flutter 实例可以让每个实例在使用较少内存资源的同时，
  维护各自独立的应用状态和 UI 状态。请在 [multiple Flutters][] 页面了解更多内容。

- **Multi-view**: supported on the web, allows creating multiple
  [FlutterView][]s, each rendering a widget embedded into the host application.
  In this mode there's only one Dart program and all views and widgets can share
  objects.

  **多视图**：支持 web，允许创建多个 [FlutterView][]，
  每个视图都会渲染一个嵌入到宿主应用中的 widget。
  在这种模式下只有一个 Dart 程序，所有视图和 widget 都可以共享对象。

Add-to-app supports integrating multiple Flutter views of any size, supporting
various use-cases. Two of the most common use-cases are:

Add-to-app 支持集成多个任意尺寸的 Flutter 视图，适用于多种用例。
其中最常见的两个用例是：

* **Hybrid navigation stacks**: an app is made of multiple screens, some of
  which are rendered by Flutter, and others by another framework. The user can
  navigate from one screen to another freely, no matter which framework is used
  to render the screen.

  **混合导航栈**：一个应用由多个屏幕组成，其中一些屏幕由 Flutter 渲染，
  另一些屏幕由其他框架渲染。无论屏幕使用哪种框架渲染，
  用户都可以在不同屏幕之间自由导航。

* **Partial-screen views**: a screen in the app renders multiple widgets, some
  of which are rendered by Flutter, and others by another framework. The user
  can scroll and interact with any widget freely, no matter which framework is
  used to render the widget. 

  **局部屏幕视图**：应用中的一个屏幕会渲染多个 widget，
  其中一些由 Flutter 渲染，另一些由其他框架渲染。
  无论 widget 使用哪种框架渲染，用户都可以自由滚动并与任何 widget 交互。

## Supported features

## 已支持的特性

### Add to Android applications

### 集成到 Android 应用

<DashImage figure image="development/add-to-app/android-overview.webp" alt="Add-to-app steps on Android" />

* Auto-build and import the Flutter module by adding a
  Flutter SDK hook to your Gradle script.

  在 Gradle 脚本中添加 Flutter SDK 钩子，自动构建并导入 Flutter module。

* Build your Flutter module into a generic
  [Android Archive (AAR)][] for integration into your
  own build system and for better Jetifier interoperability
  with AndroidX.

  将 Flutter module 构建为通用的
  [Android Archive (AAR)][Android Archive (AAR)]，
  以便集成到你自己的构建系统中，并提升 Jetifier 与 AndroidX 的互操作性。

* [`FlutterEngine`][java-engine] API for starting and persisting
  your Flutter environment independently of attaching a
  [`FlutterActivity`][]/[`FlutterFragment`][] etc.

  [`FlutterEngine`][java-engine] API 可用于启动并持久化 Flutter 环境，
  且不依赖附加 [`FlutterActivity`][]、[`FlutterFragment`][] 等组件。

* Android Studio Android/Flutter co-editing and module
  creation/import wizard.

  Android Studio 提供 Android/Flutter 协同编辑，
  以及 module 创建/导入向导。

* Java and Kotlin host apps are supported.

  支持 Java 和 Kotlin 宿主应用。

* Flutter modules can use [Flutter plugins][] to interact
  with the platform.

  Flutter module 可以使用 [Flutter 插件][Flutter plugins] 与平台交互。

* Support for Flutter debugging and stateful hot reload by
  using `flutter attach` from IDEs or the command line to
  connect to an app that contains Flutter.

  支持从 IDE 或命令行使用 `flutter attach` 连接到包含 Flutter 的应用，
  以进行 Flutter 调试和有状态的热重载。

### Add to iOS applications

### 集成到 iOS 应用

<DashImage figure image="development/add-to-app/ios-overview.webp" alt="Add-to-app steps on iOS" />

* Build your Flutter module into a Swift package
  for integration into your own build system.

  将 Flutter module 构建为 Swift package，
  以便集成到你自己的构建系统中。

* Auto-build and import the Flutter module using Xcode build phases.

  使用 Xcode build phase 自动构建并导入 Flutter module。

* [`FlutterEngine`][ios-engine] API for starting and persisting
  your Flutter environment independently of attaching a
  [`FlutterViewController`][].

  [`FlutterEngine`][ios-engine] API 可用于启动并持久化 Flutter 环境，
  且不依赖附加 [`FlutterViewController`][]。

* Objective-C and Swift host apps supported.

  支持 Objective-C 和 Swift 宿主应用。

* Flutter modules can use [Flutter plugins][] to interact
  with the platform.

  Flutter module 可以使用 [Flutter 插件][Flutter plugins] 与平台交互。

- Support for Flutter debugging and stateful hot reload by
  using `flutter attach` from IDEs or the command line to
  connect to an app that contains Flutter.

  支持从 IDE 或命令行使用 `flutter attach` 连接到包含 Flutter 的应用，
  以进行 Flutter 调试和有状态的热重载。

See our [add-to-app GitHub Samples repository][]
for sample projects in Android and iOS that import
a Flutter module for UI.

请查看我们的 [add-to-app GitHub 示例仓库][add-to-app GitHub Samples repository]，
其中包含在 Android 和 iOS 中导入 Flutter module 来构建 UI 的示例项目。

### Add to macOS applications

### 集成到 macOS 应用

* Build your Flutter module into a Swift package
  for integration into your own build system.

  将 Flutter module 构建为 Swift package，
  以便集成到你自己的构建系统中。

* Auto-build and import the Flutter module using Xcode build phases.

  使用 Xcode build phase 自动构建并导入 Flutter module。

* [`FlutterEngine`][macos-engine] API for starting and persisting
  your Flutter environment independently of attaching a
  [`FlutterViewController`][macos-flutterviewcontroller].

  [`FlutterEngine`][macos-engine] API 可用于启动并持久化 Flutter 环境，
  且不依赖附加 [`FlutterViewController`][macos-flutterviewcontroller]。

* Swift host apps supported.

  支持 Swift 宿主应用。

* Flutter modules can use [Flutter plugins][] to interact
  with the platform.

  Flutter module 可以使用 [Flutter 插件][Flutter plugins] 与平台交互。

* Support for Flutter debugging and stateful hot reload by
  using `flutter attach` from IDEs or the command line to
  connect to an app that contains Flutter.

  支持从 IDE 或命令行使用 `flutter attach` 连接到包含 Flutter 的应用，
  以进行 Flutter 调试和有状态的热重载。

### Add to web applications

### 集成到 web 应用

Flutter can be added to any existing HTML DOM-based web app written in any
client-side Dart web framework ([jaspr][], [ngdart][], [over_react][], etc),
any client-side JS framework ([React][], [Angular][], [Vue.js][], etc),
any server-side rendered framework ([Django][], [Ruby on Rails][],
[Apache Struts][], etc), or even no framework (affectionately known as
"[VanillaJS][]"). The minimum requirement is only that your existing application
and its framework support importing JavaScript libraries, and creating HTML
elements for Flutter to render into.

Flutter 可以添加到任何基于 HTML DOM 的现有 web 应用中，
这些应用可以使用任意客户端 Dart web 框架（[jaspr][]、[ngdart][]、[over_react][] 等）、
任意客户端 JS 框架（[React][]、[Angular][]、[Vue.js][] 等）、
任意服务端渲染框架（[Django][]、[Ruby on Rails][]、[Apache Struts][] 等），
甚至可以不使用任何框架（亲切地称为「[VanillaJS][]」）。
最低要求只是你的现有应用及其框架支持导入 JavaScript library，
并支持创建供 Flutter 渲染内容的 HTML 元素。

To add Flutter to an existing app, build it normally, then follow the
[embedding instructions][] for putting Flutter views onto the page.

若要将 Flutter 添加到现有应用，请按常规方式构建它，
然后按照 [嵌入说明][embedding instructions] 将 Flutter 视图放到页面上。

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

## 开始使用

To get started, see our project integration guide for
Android, web, iOS, and macOS:

若要开始使用，请参阅 Android、web、iOS 和 macOS 的项目集成指南：

<div class="card-grid">
  <a class="card outlined-card" href="/add-to-app/android/project-setup">
    <div class="card-header text-center">
      <span class="card-title">Android</span>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/embedding-flutter-web#embedded-mode">
    <div class="card-header text-center">
      <span class="card-title">Web</span>
    </div>
  </a>
</div>

<div class="card-grid">
  <a class="card outlined-card" href="/add-to-app/ios/project-setup">
    <div class="card-header text-center">
      <span class="card-title">iOS</span>
    </div>
  </a>
  <a class="card outlined-card" href="/add-to-app/macos/project-setup">
    <div class="card-header text-center">
      <span class="card-title">macOS</span>
    </div>
  </a>
</div>

## API usage

## API 用法

After Flutter is integrated into your project,
see our API usage guides at the following links:

将 Flutter 集成到你的项目后，请参阅以下链接中的 API 使用指南：

<div class="card-grid">
  <a class="card outlined-card" href="/add-to-app/android/add-flutter-screen">
    <div class="card-header text-center">
      <span class="card-title">Android</span>
    </div>
  </a>

  <a class="card outlined-card" href="/platform-integration/web/embedding-flutter-web#manage-flutter-views-from-js">
    <div class="card-header text-center">
      <span class="card-title">web</span>
    </div>
  </a>
</div>

<div class="card-grid">
  <a class="card outlined-card" href="/add-to-app/ios/add-flutter-screen">
    <div class="card-header text-center">
      <span class="card-title">iOS</span>
    </div>
  </a>
  <a class="card outlined-card" href="/add-to-app/macos/add-flutter-screen">
    <div class="card-header text-center">
      <span class="card-title">macOS</span>
    </div>
  </a>
</div>

## Limitations

## 限制

Mobile limitations:

移动端限制：

* Multi-view mode is not supported (multi-engine only).

  不支持多视图模式（仅支持多引擎）。

* Packing multiple Flutter libraries into an
  application isn't supported.

  不支持将多个 Flutter library 打包到同一个应用中。

* Plugins that don't support `FlutterPlugin` might have unexpected
  behaviors if they make assumptions that are untenable in add-to-app
  (such as assuming that a Flutter `Activity` is always present).

  如果不支持 `FlutterPlugin` 的插件做出了 add-to-app 中并不成立的假设
  （例如假设 Flutter `Activity` 始终存在），可能会出现意外行为。

* On Android, the Flutter module only supports AndroidX applications.

  在 Android 上，Flutter module 仅支持 AndroidX 应用。

Web limitations:

Web 限制：

* Multi-engine mode is not supported (multi-view only).

  不支持多引擎模式（仅支持多视图）。

* There's no way to completely "shutdown" the Flutter engine. The app can remove
  all the [FlutterView][] objects and make sure all data is garbage collected
  using normal Dart concepts. However, the engine will remain warmed up, even if
  it's not rendering anything.

  无法完全「关闭」Flutter 引擎。应用可以移除所有 [FlutterView][] 对象，
  并确保所有数据都通过常规 Dart 概念完成垃圾回收。
  但是，即使引擎未渲染任何内容，它仍会保持预热状态。

[get started]: /learn/pathway
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
[macos-engine]: {{site.api}}/macos-embedder/interface_flutter_engine.html
[macos-flutterviewcontroller]: {{site.api}}/macos-embedder/interface_flutter_view_controller.html
