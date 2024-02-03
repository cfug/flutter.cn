---
title: Debug your add-to-app module
title: 在混合开发模式下进行调试
short-title: Debugging
short-title: 调试应用
description: How to run, debug, and hot reload your add-to-app Flutter module.
description: 如何在使用 Flutter module 的混合应用运行调试以及热重载。
tags: Flutter混合工程,add2app
keywords: 工程调试,VS Code
---

Once you've integrated the Flutter module to your project and used Flutter's
platform APIs to run the Flutter engine and/or UI,
you can then build and run your Android or iOS app the same way
you run normal Android or iOS apps.

当你将 Flutter 模块集成到项目中并使用 Flutter 的平台 APIs 来运行 Flutter 引擎和/或 UI 时，
你可以与平时运行 Android 或 iOS 应用程序一样，构建和运行你的应用。

However, Flutter is now powering the UI in places where you're showing a
`FlutterActivity` or `FlutterViewController`.

但就目前而言，Flutter 需要在 `FlutterActivity` 或 `FlutterViewController` 中展示 UI 内容。

### Debugging

### 调试

You might be used to having your suite of favorite Flutter debugging tools
available to you automatically when running `flutter run` or an equivalent
command from an IDE. But you can also use all your Flutter
[debugging functionalities][] such as hot reload, performance
overlays, DevTools, and setting breakpoints in add-to-app scenarios.

你可能习惯于在 IDE 中运行 `flutter run` 或者等效的快捷命令，
它会自动启动你喜爱的 Flutter 调试工具。
同样的，你也可以使用所有 Flutter 的 [调试功能][debugging functionalities]，
例如热重载、性能调试、DevTools 以及在混合开发的场景中设置断点。

These functionalities are provided by the `flutter attach` mechanism.
`flutter attach` can be initiated through different pathways,
such as through the SDK's CLI tools,
through VS Code or IntelliJ/Android Studio.

这些功能由 `flutter attach` 机制提供。
`flutter attach` 可以通过不同的路径启动，
例如通过 SDK 中的命令行工具、VS Code 或者 IntelliJ/Android Studio。

`flutter attach` can connect as soon as you run your `FlutterEngine`, and
remains attached until your `FlutterEngine` is disposed. But you can invoke
`flutter attach` before starting your engine. `flutter attach` waits for
the next available Dart VM that is hosted by your engine.

`flutter attach` 可以在你运行 `FlutterEngine` 时立即进行连接，
并在 `FlutterEngine` 被释放之前一直保持连接。
你可以在启动引擎之前执行 `flutter attach`，
它将等待下一个由引擎持有的 Dart VM 进行连接。

#### Terminal

#### 终端

Run `flutter attach` or `flutter attach -d deviceId` to attach from the terminal.

在终端执行 `flutter attach` 或者 `flutter attach -d deviceId` 来连接你的应用。 

{% include docs/app-figure.md image="development/add-to-app/debugging/cli-attach.png" caption="flutter attach via terminal" %}

#### VS Code

{% include docs/debug/debug-flow-ios.md %}
{% include docs/debug/vscode-flutter-attach-json.md %}

#### IntelliJ / Android Studio

Select the device on which the Flutter module runs so `flutter attach` filters for the right start signals.

选择要运行 Flutter 模块的设备，然后点击右边的 `flutter attach` 按钮。

{% include docs/app-figure.md image="development/add-to-app/debugging/intellij-attach.png" caption="flutter attach via IntelliJ" %}

[debugging functionalities]: {{site.url}}/testing/debugging

### Wireless debugging

You can debug your app wirelessly on an iOS or Android device
using `flutter attach`.

#### iOS

On iOS, you must follow the steps below:

<ol markdown="1">
<li markdown="1">

Ensure that your device is wirelessly connected to Xcode
as described in the [iOS setup guide][].

</li>
<li markdown="1">

Open **Xcode > Product > Scheme > Edit Scheme**

</li>
<li markdown="1">

Select the **Arguments** tab

</li>
<li markdown="1">

Add either `--vm-service-host=0.0.0.0` for IPv4, 
or `--vm-service-host=::0` for IPv6 as a launch argument

You can determine if you're on an IPv6 network by opening your Mac's 
**Settings > Wi-Fi > Details (of the network you're connected to) > TCP/IP** 
and check to see if there is an **IPv6 address** section.

<img src="/assets/images/docs/development/add-to-app/debugging/wireless-port.png" alt="Check the box that says 'connect via network' from the devices and simulators page">

</li>
</ol>

#### Android

Ensure that your device is wirelessly connected to Android Studio 
as described in the [Android setup guide][].

[iOS setup guide]: {{site.url}}/get-started/install/macos/mobile-ios
[Android setup guide]: {{site.url}}/get-started/install/macos/mobile-android?tab=physical#configure-your-target-android-device
