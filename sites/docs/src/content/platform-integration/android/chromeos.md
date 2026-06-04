---
# title: Targeting ChromeOS with Android
title: 使用 Android 面向 ChromeOS
# description: Platform-specific considerations for building for ChromeOS with Flutter.
description: 使用 Flutter 为 ChromeOS 构建时的平台相关注意事项。
ai-translated: true
---

This page discusses considerations unique to building
Android apps that support ChromeOS with Flutter.

本页讨论使用 Flutter 构建支持 ChromeOS 的 Android 应用时的特有注意事项。

## Flutter & ChromeOS tips & tricks

## Flutter 与 ChromeOS 技巧

For the current versions of ChromeOS, only certain ports from
Linux are exposed to the rest of the environment.
Here's an example of how to launch
Flutter DevTools for an Android app with ports
that will work:

在当前版本的 ChromeOS 上，只有部分来自 Linux 的端口会暴露给环境的其余部分。以下示例演示如何为 Android 应用启动 Flutter DevTools，并使用可用的端口：

```console
$ flutter pub global run devtools --port 8000
$ cd path/to/your/app
$ flutter run --observatory-port=8080
```

Then, navigate to http://127.0.0.1:8000/#
in your Chrome browser and enter the URL to your
application. The last `flutter run` command you
just ran should output a URL similar to the format
of `http://127.0.0.1:8080/auth_code=/`. Use this URL
and select "Connect" to start the Flutter DevTools
for your Android app.

然后，在 Chrome 浏览器中访问 http://127.0.0.1:8000/#，并输入你的应用 URL。你刚运行的最后一次 `flutter run` 命令应输出类似 `http://127.0.0.1:8080/auth_code=/` 格式的 URL。使用该 URL 并选择「Connect」即可为你的 Android 应用启动 Flutter DevTools。

#### Flutter ChromeOS lint analysis

#### Flutter ChromeOS lint 分析

Flutter has ChromeOS-specific lint analysis checks
to make sure that the app that you're building
works well on ChromeOS. It looks for things
like required hardware in your Android Manifest
that aren't available on ChromeOS devices,
permissions that imply requests for unsupported
hardware, as well as other properties or code
that would bring a lesser experience on these devices.

Flutter 提供面向 ChromeOS 的 lint 分析检查，确保你构建的应用在 ChromeOS 上运行良好。它会检查 Android Manifest 中在 ChromeOS 设备上不可用的必需硬件、暗示请求不受支持硬件的权限，以及会在这些设备上降低体验的其他属性或代码。

To activate these,
you need to create a new analysis_options.yaml
file in your project folder to include these options.
(If you have an existing analysis_options.yaml file,
you can update it)

要启用这些检查，
你需要在项目文件夹中创建新的 analysis_options.yaml 文件以包含这些选项。
（若已有 analysis_options.yaml 文件，可更新它）

```yaml
include: package:flutter/analysis_options_user.yaml
analyzer:
 optional-checks:
   chrome-os-manifest-checks
```

To run these from the command line, use the following command:

要从命令行运行这些检查，请使用以下命令：

```console
$ flutter analyze
```

Sample output for this command might look like:

该命令的示例输出可能如下：

```console
Analyzing ...
warning • This hardware feature is not supported on ChromeOS •
android/app/src/main/AndroidManifest.xml:4:33 • unsupported_chrome_os_hardware
```
