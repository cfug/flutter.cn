---
# title: Build for and integrate with multiple platforms
title: 跨平台构建与集成
# shortTitle: Platform integration
shortTitle: 平台集成
# description: >-
#   Learn how to develop for different platforms and
#   integrate with platform-specific features in Flutter apps.
description: >-
  了解如何在 Flutter 应用中为不同平台进行开发，
  并集成特定平台的功能。
ai-translated: true
---

Flutter enables you to build, test, and deploy beautiful, natively compiled,
multi-platform applications from a single codebase.

Flutter 让你能从单一代码库构建、测试并部署
精美的、经过原生编译的多平台应用。

## Overview

## 概述

Flutter and its core packages often automatically support and integrate
with Flutter's officially [supported platforms][].
Some platforms require you to [set up additional tooling](#setup),
but once your development environment is set up,
Flutter apps are usually functional across platforms out of the box.

Flutter 及其核心 package 通常会自动支持并集成
Flutter 官方 [支持的平台][supported platforms]。
部分平台需要你 [配置额外工具](#setup)，
但开发环境配置好之后，
Flutter 应用通常开箱即可在各平台上运行。

Occasionally you need to integrate with platform-specific functionality.
For example, you might want to use a native library that's
only available on iOS and iPadOS.
For many use cases, you can find and use one of the many [Flutter plugins][]
provided by the Flutter team and the amazing Flutter community.
If none of them meet your needs, you can
[write platform-specific code][] and even [create your own plugin][].

有时你需要集成特定平台的功能。
例如，你可能想使用只在 iOS 和 iPadOS 上提供的原生库。
在许多场景下，你可以从 Flutter 团队和社区提供的众多
[Flutter 插件][Flutter plugins] 中找到合适的插件来使用。
如果它们都不符合需求，你可以
[编写特定平台的代码][write platform-specific code]，
甚至 [创建自己的插件][create your own plugin]。

:::tip
If you're exploring building your app for multiple platforms,
also consider building your UI with [adaptive and responsive design][] in mind.

如果你正在探索为多个平台构建应用，
也请考虑以 [自适应与响应式设计][adaptive and responsive design] 来构建 UI。
:::

[supported platforms]: /reference/supported-platforms
[Flutter plugins]: /packages-and-plugins/using-packages
[write platform-specific code]: /platform-integration/platform-channels
[create your own plugin]: /packages-and-plugins/developing-packages
[adaptive and responsive design]: /ui/adaptive-responsive/

## Set up platform development {:#setup}

## 配置平台开发环境

While Flutter apps can be built for a variety of [supported platforms][]
with little to no modifications to your code,
your development environment might require additional setup
when targeting a new platform.

虽然 Flutter 应用只需很少甚至不修改代码，
就可以面向多种 [支持的平台][supported platforms] 构建，
但当你面向新平台时，
开发环境可能需要额外配置。

To set up development for an additional platform,
select the platform from the following:

要为另一个平台配置开发环境，
请从下面选择该平台：

<div class="card-grid">
  <a class="card outlined-card" href="/platform-integration/android/setup">
    <div class="card-header">
      <span class="card-title"><t>Target Android</t><t>面向 Android</t></span>
      <span class="card-subtitle"><t>On any device</t><t>任意设备</t></span>
    </div>
    <div class="card-content">
      <p>Set up your development environment to build Flutter apps for Android.</p>
      <p>配置开发环境，以便构建面向 Android 的 Flutter 应用。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/ios/setup">
    <div class="card-header">
      <span class="card-title"><t>Target iOS</t><t>面向 iOS</t></span>
      <span class="card-subtitle"><t>On macOS only</t><t>仅 macOS</t></span>
    </div>
    <div class="card-content">
      <p>Set up your development environment to build Flutter apps for iOS.</p>
      <p>配置开发环境，以便构建面向 iOS 的 Flutter 应用。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/setup">
    <div class="card-header">
      <span class="card-title"><t>Target Web</t><t>面向 Web</t></span>
      <span class="card-subtitle"><t>On any device</t><t>任意设备</t></span>
    </div>
    <div class="card-content">
      <p>Set up your development environment to build Flutter apps for the web.</p>
      <p>配置开发环境，以便构建面向 Web 的 Flutter 应用。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/windows/setup">
    <div class="card-header">
      <span class="card-title"><t>Target Windows</t><t>面向 Windows</t></span>
      <span class="card-subtitle"><t>On Windows only</t><t>仅 Windows</t></span>
    </div>
    <div class="card-content">
      <p>Set up your development environment to build Flutter apps for Windows.</p>
      <p>配置开发环境，以便构建面向 Windows 的 Flutter 应用。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/macos/setup">
    <div class="card-header">
      <span class="card-title"><t>Target macOS</t><t>面向 macOS</t></span>
      <span class="card-subtitle"><t>On macOS only</t><t>仅 macOS</t></span>
    </div>
    <div class="card-content">
      <p>Set up your development environment to build Flutter apps for macOS.</p>
      <p>配置开发环境，以便构建面向 macOS 的 Flutter 应用。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/linux/setup">
    <div class="card-header">
      <span class="card-title"><t>Target Linux</t><t>面向 Linux</t></span>
      <span class="card-subtitle"><t>On Linux only</t><t>仅 Linux</t></span>
    </div>
    <div class="card-content">
      <p>Set up your development environment to build Flutter apps for Linux.</p>
      <p>配置开发环境，以便构建面向 Linux 的 Flutter 应用。</p>
    </div>
  </a>
</div>

## Integrate with each platform {:#integrate}

## 与各个平台集成

If the situation you're trying to solve is not
covered by an existing [Flutter plugin][],
check out the following guides to learn how to
integrate with each of the supported platforms.

如果现有的 [Flutter 插件][Flutter plugin] 还不能覆盖你要解决的情况，
请查阅以下指南，了解如何与各个受支持的平台集成。

[Flutter plugin]: /packages-and-plugins/using-packages#searching-for-packages

### Integrate with Android {:#android}

### 与 Android 集成

Learn how to add custom integrations with Android to your Flutter app.

了解如何为 Flutter 应用添加 Android 自定义集成。

<div class="card-grid">
  <a class="card outlined-card" href="/platform-integration/android/splash-screen">
    <div class="card-header">
      <span class="card-title"><t>Add a splash screen</t><t>添加启动画面</t></span>
    </div>
    <div class="card-content">
      <p>Learn how to add a splash screen to your app on Android.</p>
      <p>了解如何在 Android 上为应用添加启动画面。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/android/predictive-back">
    <div class="card-header">
      <span class="card-title">
        <t>Support predictive back</t><t>支持预测性返回</t>
      </span>
    </div>
    <div class="card-content">
      <p>Learn how to add the predictive back gesture to your app on Android.</p>
      <p>了解如何在 Android 上为应用添加预测性返回手势。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/android/call-jetpack-apis">
    <div class="card-header">
      <span class="card-title">
        <t>Call JetPack APIs</t><t>调用 Jetpack API</t>
      </span>
    </div>
    <div class="card-content">
      <p>Learn how the latest Android APIs in your app from Dart.</p>
      <p>了解如何从 Dart 调用应用中的最新 Android API。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/bind-native-code">
    <div class="card-header">
      <span class="card-title"><t>Bind to native code</t><t>绑定原生代码</t></span>
    </div>
    <div class="card-content">
      <p>Learn how to bind to native code from your app on Android.</p>
      <p>了解如何在 Android 上从应用绑定原生代码。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/android/platform-views">
    <div class="card-header">
      <span class="card-title">
        <t>Embed an Android view</t><t>嵌入 Android 视图</t>
      </span>
    </div>
    <div class="card-content">
      <p>Learn how to host native Android views in your app.</p>
      <p>了解如何在应用中托管原生 Android 视图。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/android/compose-activity">
    <div class="card-header">
      <span class="card-title">
        <t>Launch a Compose activity</t><t>启动 Compose activity</t>
      </span>
    </div>
    <div class="card-content">
      <p>Learn how to launch a Jetpack Compose activity from your app.</p>
      <p>了解如何从应用启动 Jetpack Compose activity。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/android/local-network-permission">
    <div class="card-header">
      <span class="card-title">
        <t>Request local network permissions</t><t>请求本地网络权限</t>
      </span>
    </div>
    <div class="card-content">
      <p>Learn how to handle Android local network permissions in Flutter.</p>
      <p>了解如何在 Flutter 中处理 Android 本地网络权限。</p>
    </div>
  </a>
</div>

### Integrate with iOS {:#ios}

### 与 iOS 集成

Learn how to add custom integrations with iOS to your Flutter app.

了解如何为 Flutter 应用添加 iOS 自定义集成。

<div class="card-grid">
  <a class="card outlined-card" href="/platform-integration/ios/launch-screen">
    <div class="card-header">
      <span class="card-title"><t>Add a launch screen</t><t>添加启动屏幕</t></span>
    </div>
    <div class="card-content">
      <p>Learn how to add a launch screen to your app on iOS.</p>
      <p>了解如何在 iOS 上为应用添加启动屏幕。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/ios/apple-frameworks">
    <div class="card-header">
      <span class="card-title">
        <t>Leverage system frameworks</t><t>使用系统框架</t>
      </span>
    </div>
    <div class="card-content">
      <p>Learn about plugins that support functionality from native iOS frameworks.</p>
      <p>了解支持原生 iOS 框架功能的插件。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/bind-native-code">
    <div class="card-header">
      <span class="card-title"><t>Bind to native code</t><t>绑定原生代码</t></span>
    </div>
    <div class="card-content">
      <p>Learn how to bind to native code from your app on iOS.</p>
      <p>了解如何在 iOS 上从应用绑定原生代码。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/ios/platform-views">
    <div class="card-header">
      <span class="card-title"><t>Embed an iOS view</t><t>嵌入 iOS 视图</t></span>
    </div>
    <div class="card-content">
      <p>Learn how to host native iOS views in your app.</p>
      <p>了解如何在应用中托管原生 iOS 视图。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/ios/app-extensions">
    <div class="card-header">
      <span class="card-title"><t>Add an app extension</t><t>添加应用扩展</t></span>
    </div>
    <div class="card-content">
      <p>Learn how to add an iOS app extension to your app.</p>
      <p>了解如何为应用添加 iOS 应用扩展。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/ios/ios-latest">
    <div class="card-header">
      <span class="card-title">
        <t>Support new iOS features</t><t>支持新的 iOS 功能</t>
      </span>
    </div>
    <div class="card-content">
      <p>Learn about Flutter's support for new or upcoming iOS features.</p>
      <p>了解 Flutter 对新推出或即将推出的 iOS 功能的支持。</p>
    </div>
  </a>
</div>

### Integrate with the web {:#web}

### 与 Web 集成

Learn how to add custom integrations with the
web platform to your Flutter app.

了解如何为 Flutter 应用添加
Web 平台的自定义集成。

<div class="card-grid">
  <a class="card outlined-card" href="/platform-integration/web/initialization">
    <div class="card-header">
      <span class="card-title">
        <t>Customize app initialization</t><t>自定义应用初始化</t>
      </span>
    </div>
    <div class="card-content">
      <p>Customize how your Flutter app is initialized on the web.</p>
      <p>自定义 Flutter 应用在 Web 上的初始化方式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/web-content-in-flutter">
    <div class="card-header">
      <span class="card-title"><t>Embed web content</t><t>嵌入 Web 内容</t></span>
    </div>
    <div class="card-content">
      <p>Learn how to embed native web content in your app.</p>
      <p>了解如何在应用中嵌入原生 Web 内容。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/embedding-flutter-web">
    <div class="card-header">
      <span class="card-title"><t>Embed your app</t><t>嵌入你的应用</t></span>
    </div>
    <div class="card-content">
      <p>Learn how to embed your Flutter app in another web app.</p>
      <p>了解如何把 Flutter 应用嵌入另一个 Web 应用。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/web/wasm/">
    <div class="card-header">
      <span class="card-title">
        <t>Compile to WebAssembly</t><t>编译为 WebAssembly</t>
      </span>
    </div>
    <div class="card-content">
      <p>Learn how to take advantage of WebAssembly in your Flutter web app.</p>
      <p>了解如何在 Flutter Web 应用中使用 WebAssembly。</p>
    </div>
  </a>
  <a class="card outlined-card" href="{{site.dart-site}}/interop/js-interop" target="_blank">
    <div class="card-header">
      <span class="card-title">
        <span><t>Interop with JavaScript</t><t>与 JavaScript 互操作</t></span>
        <Icon id="open_in_new" size="1rem" />
      </span>
    </div>
    <div class="card-content">
      <p>Learn how to integrate with JavaScript from your Dart code.</p>
      <p>了解如何从 Dart 代码与 JavaScript 集成。</p>
    </div>
  </a>
</div>

### Integrate with Windows {:#windows}

### 与 Windows 集成

Learn how to add custom integrations with Windows to your Flutter app.

了解如何为 Flutter 应用添加 Windows 自定义集成。

<div class="card-grid">
  <a class="card outlined-card" href="/platform-integration/windows/building/#integrating-with-windows">
    <div class="card-header">
      <span class="card-title"><t>Bind to native code</t><t>绑定原生代码</t></span>
    </div>
    <div class="card-content">
      <p>Learn how to bind to native C code from your app on Windows.</p>
      <p>了解如何在 Windows 上从应用绑定原生 C 代码。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/windows/building/#distributing-windows-apps">
    <div class="card-header">
      <span class="card-title"><t>Distribute your app</t><t>分发你的应用</t></span>
    </div>
    <div class="card-content">
      <p>Learn about different options for distributing your app on Windows.</p>
      <p>了解在 Windows 上分发应用的不同方式。</p>
    </div>
  </a>
  <a class="card outlined-card" href="platform-integration/windows/building#supporting-windows-ui-guidelines">
    <div class="card-header">
      <span class="card-title">
        <t>Follow Windows UI conventions</t><t>遵循 Windows UI 惯例</t>
      </span>
    </div>
    <div class="card-content">
      <p>Learn different techniques to integrate with the Windows look and feel.</p>
      <p>了解与 Windows 外观和体验集成的不同方法。</p>
    </div>
  </a>
</div>

### Integrate with macOS {:#macos}

### 与 macOS 集成

Learn how to add custom integrations with macOS to your Flutter app.

了解如何为 Flutter 应用添加 macOS 自定义集成。

<div class="card-grid">
  <a class="card outlined-card" href="/platform-integration/bind-native-code">
    <div class="card-header">
      <span class="card-title"><t>Bind to native code</t><t>绑定原生代码</t></span>
    </div>
    <div class="card-content">
      <p>Learn how to bind to native code from your app on macOS.</p>
      <p>了解如何在 macOS 上从应用绑定原生代码。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/macos/platform-views">
    <div class="card-header">
      <span class="card-title">
        <t>Embed a macOS view</t><t>嵌入 macOS 视图</t>
      </span>
    </div>
    <div class="card-content">
      <p>Learn how to host native macOS views in your app.</p>
      <p>了解如何在应用中托管原生 macOS 视图。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/macos/building#entitlements-and-the-app-sandbox">
    <div class="card-header">
      <span class="card-title">
        <t>Set up macOS entitlements</t><t>配置 macOS entitlement</t>
      </span>
    </div>
    <div class="card-content">
      <p>Learn how to enable specific capabilities and services for your app.</p>
      <p>了解如何为应用启用特定能力与服务。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/macos/building#integrating-with-macos-look-and-feel">
    <div class="card-header">
      <span class="card-title">
        <t>Integrate with the macOS visual style</t><t>融入 macOS 视觉风格</t>
      </span>
    </div>
    <div class="card-content">
      <p>Learn different techniques to integrate with the macOS look and feel.</p>
      <p>了解与 macOS 外观和体验集成的不同方法。</p>
    </div>
  </a>
</div>

### Integrate with Linux {:#linux}

### 与 Linux 集成

Learn how to add custom integrations with Linux to your Flutter app.

了解如何为 Flutter 应用添加 Linux 自定义集成。

<div class="card-grid">
  <a class="card outlined-card" href="/platform-integration/linux/building#integrate-with-linux">
    <div class="card-header">
      <span class="card-title"><t>Bind to native code</t><t>绑定原生代码</t></span>
    </div>
    <div class="card-content">
      <p>Learn how to use and bind to native Linux libraries and code.</p>
      <p>了解如何使用并绑定原生 Linux 库与代码。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/platform-integration/linux/building#prepare-linux-apps-for-distribution">
    <div class="card-header">
      <span class="card-title"><t>Prepare for distribution</t><t>准备分发</t></span>
    </div>
    <div class="card-content">
      <p>Prepare your Flutter app for distributing to Linux users.</p>
      <p>让 Flutter 应用做好分发给 Linux 用户的准备。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/deployment/linux/">
    <div class="card-header">
      <span class="card-title">
        <t>Deploy to the Snap Store</t><t>部署到 Snap Store</t>
      </span>
    </div>
    <div class="card-content">
      <p>Learn how to deploy your Linux desktop app to the Snap Store.</p>
      <p>了解如何把 Linux 桌面应用部署到 Snap Store。</p>
    </div>
  </a>
</div>
