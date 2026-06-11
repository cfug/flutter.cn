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

将 Flutter 模块集成到你的项目，并使用 Flutter 平台 API
运行 Flutter 引擎和/或 UI 之后，
你就可以像运行普通 Android 或 iOS 应用一样，
构建并运行你的 Android 或 iOS 应用。

Flutter now powers the UI wherever your code includes
`FlutterActivity` or `FlutterViewController`.

只要你的代码中包含 `FlutterActivity` 或 `FlutterViewController`，
Flutter 就会驱动相应的 UI。

## Overview

## 概览

You might be used to having your suite of favorite Flutter debugging tools
available when running `flutter run` or an equivalent command from an IDE.
But you can also use all your Flutter [debugging functionalities][] such as
hot reload, performance overlays, DevTools, and setting breakpoints in
add-to-app scenarios.

你可能习惯了在 IDE 中运行 `flutter run` 或等效命令时，
使用一整套你喜爱的 Flutter 调试工具。
但在 add-to-app 场景中，你同样可以使用所有 Flutter [调试功能][debugging functionalities]，
例如热重载、性能叠加层、DevTools
以及设置断点。

The `flutter attach` command provides these functionalities.
To run this command, you can use the SDK's CLI tools, VS Code
or IntelliJ IDEA or Android Studio.

`flutter attach` 命令提供这些功能。
要运行此命令，你可以使用 SDK 的 CLI 工具、VS Code、
IntelliJ IDEA 或 Android Studio。

The `flutter attach` command connects once you run your `FlutterEngine`.
It remains attached until you dispose your `FlutterEngine`.
You can invoke `flutter attach` before starting your engine.
The `flutter attach` command waits for the next available Dart VM that
your engine hosts.

运行 `FlutterEngine` 后，`flutter attach` 命令便会建立连接，
并在你 dispose `FlutterEngine` 之前保持连接。
你可以在启动引擎之前调用 `flutter attach`，
该命令会等待引擎托管的
下一个可用 Dart VM。

## Debug from the Terminal

## 从终端调试

To attach from the terminal, run `flutter attach`.
To select a specific target device, add `-d <deviceId>`.

要从终端附加调试，请运行 `flutter attach`。
要选择特定的目标设备，请添加 `-d <deviceId>`。

```console
$ flutter attach
```

The command should print output resembling the following:

该命令应打印出类似以下的输出：

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

## 无 USB 连接调试

To debug your app over Wi-Fi on an iOS or Android device,
use `flutter attach`.

要在 iOS 或 Android 设备上通过 Wi-Fi 调试你的应用，
请使用 `flutter attach`。

### Debug over Wi-Fi on iOS devices

### 在 iOS 设备上通过 Wi-Fi 调试

For an iOS target, complete the follow steps:

对于 iOS 目标，请完成以下步骤：

1. Verify your device connects to Xcode over Wi-Fi
   as described in the [iOS setup guide][].

   按 [iOS 设置指南][iOS setup guide] 所述，
   确认你的设备已通过 Wi-Fi 连接到 Xcode。

1. On your macOS development machine,
   open **Xcode** <span aria-label="and then">></span>
   **Product** <span aria-label="and then">></span>
   **Scheme** <span aria-label="and then">></span>
   **Edit Scheme...**.

   在你的 macOS 开发机上，
   打开 **Xcode** <span aria-label="and then">></span>
   **Product** <span aria-label="and then">></span>
   **Scheme** <span aria-label="and then">></span>
   **Edit Scheme...**。

   You can also press <kbd>Cmd</kbd> + <kbd><</kbd>.

   也可以按 <kbd>Cmd</kbd> + <kbd><</kbd>。

1. Click **Run**.

   点击 **Run**。

1. Click **Arguments**.

   点击 **Arguments**。

1. In **Arguments Passed On Launch**, Click **+**.

   在 **Arguments Passed On Launch** 中，点击 **+**。

   {:type="a"}
   1. If your dev machine uses IPv4, add `--vm-service-host=0.0.0.0`.

      若你的开发机使用 IPv4，请添加 `--vm-service-host=0.0.0.0`。

   1. If your dev machine uses IPv6, add `--vm-service-host=::0`.

      若你的开发机使用 IPv6，请添加 `--vm-service-host=::0`。

   <DashImage figure img-class="site-mobile-screenshot border" image="development/add-to-app/debugging/wireless-port.png" caption="Arguments Passed On Launch with an IPv4 network added", width="100%" />

#### To determine if you're on an IPv6 network

#### 如何判断你是否处于 IPv6 网络

1. Open **Settings** <span aria-label="and then">></span> **Wi-Fi**.

   打开 **Settings** <span aria-label="and then">></span> **Wi-Fi**。

1. Click on your connected network.

   点击你已连接的网络。

1. Click **Details...**

   点击 **Details...**

1. Click **TCP/IP**.

   点击 **TCP/IP**。

1. Check for an **IPv6 address** section.

   查看是否有 **IPv6 address** 部分。

   <DashImage figure img-class="site-mobile-screenshot border" image="development/add-to-app/ipv6.png" caption="WiFi dialog box for macOS System Settings" width="60%" />

### Debug over Wi-Fi on Android devices

### 在 Android 设备上通过 Wi-Fi 调试

Verify your device connects to Android Studio over Wi-Fi
as described in the [Android setup guide][].

按 [Android 设置指南][Android setup guide] 所述，
确认你的设备已通过 Wi-Fi 连接到 Android Studio。

[iOS setup guide]: /platform-integration/ios/setup
[Android setup guide]: /platform-integration/android/setup#set-up-devices
