---
# title: Debug your add-to-app module
title: 调试 add-to-app 模块
# shortTitle: Debugging
shortTitle: 调试
# description: How to run, debug, and hot reload your add-to-app Flutter module.
description: 如何运行、调试并对 add-to-app Flutter 模块进行热重载。
tags: Flutter混合工程,add2app
keywords: 调试,热重载
ai-translated: true
---

Once you've integrated the Flutter module to your project and used
Flutter's platform APIs to run the Flutter engine and/or UI,
you can then build and run your Android or iOS app the same way
you run normal Android or iOS apps.

将 Flutter 模块集成到项目并使用 Flutter 平台 API 运行 Flutter 引擎和/或 UI 后，你可以像运行普通 Android 或 iOS 应用一样构建并运行应用。

Flutter now powers the UI wherever your code includes
`FlutterActivity` or `FlutterViewController`.

只要代码中包含 `FlutterActivity` 或 `FlutterViewController`，UI 就由 Flutter 驱动。

## Overview

## 概览

You might be used to having your suite of favorite Flutter debugging tools
available when running `flutter run` or an equivalent command from an IDE.
But you can also use all your Flutter [debugging functionalities][] such as
hot reload, performance overlays, DevTools, and setting breakpoints in
add-to-app scenarios.

你可能习惯在 IDE 中运行 `flutter run` 或等效命令时使用一整套 Flutter 调试工具。在 add-to-app 场景中，你同样可以使用所有 Flutter [调试功能][debugging functionalities]，例如热重载、性能叠加层、DevTools 和设置断点。

The `flutter attach` command provides these functionalities.
To run this command, you can use the SDK's CLI tools, VS Code
or IntelliJ IDEA or Android Studio.

`flutter attach` 命令提供这些功能。你可以通过 SDK 的 CLI 工具、VS Code 或 IntelliJ IDEA / Android Studio 运行该命令。

The `flutter attach` command connects once you run your `FlutterEngine`.
It remains attached until you dispose your `FlutterEngine`.
You can invoke `flutter attach` before starting your engine.
The `flutter attach` command waits for the next available Dart VM that
your engine hosts.

运行 `FlutterEngine` 后，`flutter attach` 会建立连接，并在你 dispose `FlutterEngine` 之前保持连接。你可以在启动引擎之前调用 `flutter attach`；该命令会等待引擎托管的下一个可用 Dart VM。

## Debug from the Terminal

## 从终端调试

To attach from the terminal, run `flutter attach`.
To select a specific target device, add `-d <deviceId>`.

在终端中附加调试，运行 `flutter attach`。要选择特定目标设备，添加 `-d <deviceId>`。

```console
$ flutter attach
```

The command should print output resembling the following:

命令应打印类似以下的输出：

```console
Syncing files to device iPhone 15 Pro...
 7,738ms (!)

To hot reload the changes while running, press "r".
To hot restart (and rebuild state). press "R".
```

## Debug iOS extension in Xcode and VS Code

## 在 Xcode 与 VS Code 中调试 iOS 扩展

{% render "docs/debug/debug-flow-ios.md", add:'launch' %}

## Debug Android extension in Android Studio

## 在 Android Studio 中调试 Android 扩展

{% render "docs/debug/debug-flow-androidstudio-as-start.md" %}

[debugging functionalities]: /testing/debugging

## Debug without USB connection {:#wireless-debugging}

## 无 USB 连接调试 {:#wireless-debugging}

To debug your app over Wi-Fi on an iOS or Android device,
use `flutter attach`.

要在 iOS 或 Android 设备上通过 Wi-Fi 调试应用，请使用 `flutter attach`。

### Debug over Wi-Fi on iOS devices

### 在 iOS 设备上通过 Wi-Fi 调试

For an iOS target, complete the follow steps:

对于 iOS 目标，完成以下步骤：

1. Verify your device connects to Xcode over Wi-Fi
   as described in the [iOS setup guide][].

1. 按 [iOS 设置指南][iOS setup guide] 所述，确认设备已通过 Wi-Fi 连接到 Xcode。

1. On your macOS development machine,
   open **Xcode** <span aria-label="and then">></span>
   **Product** <span aria-label="and then">></span>
   **Scheme** <span aria-label="and then">></span>
   **Edit Scheme...**.

   You can also press <kbd>Cmd</kbd> + <kbd><</kbd>.

1. 在 macOS 开发机上，打开 **Xcode** <span aria-label="and then">></span> **Product** <span aria-label="and then">></span> **Scheme** <span aria-label="and then">></span> **Edit Scheme...**。

   也可以按 <kbd>Cmd</kbd> + <kbd><</kbd>。

1. Click **Run**.

1. 点击 **Run**。

1. Click **Arguments**.

1. 点击 **Arguments**。

1. In **Arguments Passed On Launch**, Click **+**.

   {:type="a"}
   1. If your dev machine uses IPv4, add `--vm-service-host=0.0.0.0`.

   1. If your dev machine uses IPv6, add `--vm-service-host=::0`.

   <DashImage figure img-class="site-mobile-screenshot border" image="development/add-to-app/debugging/wireless-port.png" caption="Arguments Passed On Launch with an IPv4 network added", width="100%" />

1. 在 **Arguments Passed On Launch** 中，点击 **+**。

   {:type="a"}
   1. 若开发机使用 IPv4，添加 `--vm-service-host=0.0.0.0`。

   1. 若开发机使用 IPv6，添加 `--vm-service-host=::0`。

   <DashImage figure img-class="site-mobile-screenshot border" image="development/add-to-app/debugging/wireless-port.png" caption="Arguments Passed On Launch with an IPv4 network added", width="100%" />

#### To determine if you're on an IPv6 network

#### 如何判断是否处于 IPv6 网络

1. Open **Settings** <span aria-label="and then">></span> **Wi-Fi**.

1. 打开 **Settings** <span aria-label="and then">></span> **Wi-Fi**。

1. Click on your connected network.

1. 点击已连接的网络。

1. Click **Details...**

1. 点击 **Details...**

1. Click **TCP/IP**.

1. 点击 **TCP/IP**。

1. Check for an **IPv6 address** section.

   <DashImage figure img-class="site-mobile-screenshot border" image="development/add-to-app/ipv6.png" caption="WiFi dialog box for macOS System Settings" width="60%" />

1. 查看是否有 **IPv6 address** 部分。

   <DashImage figure img-class="site-mobile-screenshot border" image="development/add-to-app/ipv6.png" caption="WiFi dialog box for macOS System Settings" width="60%" />

### Debug over Wi-Fi on Android devices

### 在 Android 设备上通过 Wi-Fi 调试

Verify your device connects to Android Studio over Wi-Fi
as described in the [Android setup guide][].

按 [Android 设置指南][Android setup guide] 所述，确认设备已通过 Wi-Fi 连接到 Android Studio。

[iOS setup guide]: /platform-integration/ios/setup
[Android setup guide]: /platform-integration/android/setup#set-up-devices
