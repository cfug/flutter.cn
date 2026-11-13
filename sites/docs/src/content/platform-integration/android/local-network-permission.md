---
# title: Request local network permissions on Android
title: 在 Android 上请求本地网络权限
# shortTitle: Local network permission
shortTitle: 本地网络权限
# description: >-
#   Learn how to declare and request Android local area network permissions
#   before opening Dart sockets in Flutter.
description: >-
  了解如何在 Flutter 中打开 Dart 套接字之前，
  声明并请求 Android 局域网权限。
ai-translated: true
---

Starting in Android 17 (API level 37), Android blocks local network access
by default. Apps targeting Android 17 or higher that discover, scan,
or connect to devices on the local area network must declare and request
the `ACCESS_LOCAL_NETWORK` runtime permission.

从 Android 17（API 级别 37）开始，Android 默认阻止本地网络访问。
目标版本为 Android 17 或更高、
并且会发现、扫描或连接局域网上设备的应用，
必须声明并请求 `ACCESS_LOCAL_NETWORK` 运行时权限。

:::note
Although enforced for apps targeting Android 17 (API level 37) and higher,
you can opt in to test this behavior on Android 16 (API level 36).

此行为对目标版本为 Android 17（API 级别 37）及以上的应用强制生效，
你也可以选择在 Android 16（API 级别 36）上测试它。
:::

## Understand the impact on Dart sockets

## 了解对 Dart 套接字的影响

The standard `dart:io` library provides low-level socket networking,
including [`Socket`][socket-class], [`RawSocket`][raw-socket-class],
and [`ServerSocket`][server-socket-class].
These socket classes operate at the system level
and do not interact with Android's application framework UI.

标准库 `dart:io` 提供底层套接字网络能力，
包括 [`Socket`][socket-class]、[`RawSocket`][raw-socket-class]
和 [`ServerSocket`][server-socket-class]。
这些套接字类在系统层工作，
不会与 Android 应用框架的 UI 交互。

Because Dart sockets cannot display an Android permission prompt,
any attempt to connect to a local IP address without the required permission
fails and throws a `SocketException`.
To prevent connection failures,
request the runtime permission in Flutter
before you initialize or connect your Dart socket.

由于 Dart 套接字无法显示 Android 权限提示，
在没有所需权限时连接本地 IP 地址
会失败并抛出 `SocketException`。
为避免连接失败，
请在初始化或连接 Dart 套接字之前，
先在 Flutter 中请求该运行时权限。

## Declare the permission in Android

## 在 Android 中声明权限

Before you can request the permission at runtime,
declare it in your Android manifest.

在运行时请求该权限之前，
先在 Android 清单中声明它。

1. Open `android/app/src/main/AndroidManifest.xml`.

   打开 `android/app/src/main/AndroidManifest.xml`。

1. Add the `ACCESS_LOCAL_NETWORK` permission inside the `<manifest>` tag:

   在 `<manifest>` 标签内添加 `ACCESS_LOCAL_NETWORK` 权限：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.ACCESS_LOCAL_NETWORK" />
    <application
        ...
    </application>
</manifest>
```

## Add the permission_handler package

## 添加 permission_handler package

To request Android runtime permissions from Dart,
use the [`permission_handler`][] plugin from [pub.dev][].

要从 Dart 请求 Android 运行时权限，
请使用 [pub.dev][] 上的 [`permission_handler`][] 插件。

Add `permission_handler` to your Flutter project dependencies:

将 `permission_handler` 添加到 Flutter 项目依赖：

```bash
flutter pub add permission_handler
```

## Request permission before connecting a socket

## 连接套接字前请求权限

Call `Permission.accessLocalNetwork.request()`
before opening a Dart socket connection.

在打开 Dart 套接字连接之前，
调用 `Permission.accessLocalNetwork.request()`。

The following example demonstrates how to check the platform,
request local network permission,
and open a socket connection:

下面的示例演示如何检查平台、
请求本地网络权限，
并打开套接字连接：

```dart
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';

Future<void> connectToLocalDevice({
  required String host,
  required int port,
}) async {
  // Check and request runtime permission on Android.
  if (Platform.isAndroid) {
    final status = await Permission.accessLocalNetwork.request();

    if (status.isPermanentlyDenied) {
      // The user opted not to grant permission and checked "Don't ask again".
      // In a real app, show an explanation dialog before calling openAppSettings().
      debugPrint('Permission permanently denied. Please enable it in settings.');
      return;
    }

    if (!status.isGranted) {
      // Handle the case where the user denied permission.
      debugPrint('Local network permission was denied.');
      return;
    }
  }

  // Connect the Dart socket after the permission is granted.
  try {
    final socket = await Socket.connect(
      host,
      port,
      timeout: const Duration(seconds: 5),
    );

    debugPrint(
      'Connected to ${socket.remoteAddress.address}:${socket.remotePort}',
    );

    // Use the socket...

    await socket.close();
  } on SocketException catch (e) {
    debugPrint('Failed to connect: $e');
  }
}
```

## Handle permission status

## 处理权限状态

The `Permission.accessLocalNetwork.request()` method
returns a `PermissionStatus` enum that indicates the outcome:

`Permission.accessLocalNetwork.request()` 方法
会返回一个 `PermissionStatus` 枚举，表示请求结果：

* `PermissionStatus.granted`: The user granted local network access.
  You can proceed to connect your Dart sockets.

  `PermissionStatus.granted`：用户已授予本地网络访问权限。
  你可以继续连接 Dart 套接字。

* `PermissionStatus.denied`: The user denied permission for this request.
  Prompt the user with an explanation before requesting permission again.

  `PermissionStatus.denied`：用户拒绝了本次权限请求。
  再次请求之前，先向用户说明原因。

* `PermissionStatus.permanentlyDenied`: The user denied permission permanently.
  Call `openAppSettings()` to help the user enable permission
  in the system settings.

  `PermissionStatus.permanentlyDenied`：用户永久拒绝了权限。
  调用 `openAppSettings()`，帮助用户在系统设置中开启权限。

:::tip
You only need to obtain permission once during an app session,
but checking the status before establishing a socket connection
ensures reliable network calls.

在一次应用会话中，你只需获取一次权限。
在建立套接字连接前检查状态，
可以让网络调用更可靠。
:::

## More information

## 更多信息

To learn more about local network permissions and socket programming,
consult the following resources:

要进一步了解本地网络权限和套接字编程，
请查阅以下资源：

* Android developer guide on [Local network permission][android-local-network]

  Android 开发者指南：[本地网络权限][android-local-network]

* [`permission_handler`][] package on pub.dev

  pub.dev 上的 [`permission_handler`][] package

* Dart [`Socket` class documentation][socket-class]

  Dart [`Socket` 类文档][socket-class]

* [Issue #184859 on GitHub][flutter-issue-184859]

  [GitHub 上的 issue #184859][flutter-issue-184859]

[android-local-network]: https://developer.android.com/privacy-and-security/local-network-permission#android-17-enforcement
[`permission_handler`]: {{site.pub-pkg}}/permission_handler
[pub.dev]: {{site.pub}}
[socket-class]: {{site.dart.api}}/dart-io/Socket-class.html
[raw-socket-class]: {{site.dart.api}}/dart-io/RawSocket-class.html
[server-socket-class]: {{site.dart.api}}/dart-io/ServerSocket-class.html
[flutter-issue-184859]: {{site.repo.flutter}}/issues/184859
