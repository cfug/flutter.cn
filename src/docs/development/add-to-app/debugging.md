---
title: Debugging your add-to-app module
title: 在混合开发模式下进行调试
short-title: Debugging
short-title: 调试应用
description: How to run, debug, and hot reload your add-to-app Flutter module.
description: 如何在使用 Flutter module 的混合应用运行调试以及热重载。
tags: Flutter混合工程,add2app
keywords: 工程调试,VS Code
---

## Debugging your add-to-app module

## 调试混合开发的模块

Once you've integrated the Flutter module to your project and used Flutter's
platform APIs to run the Flutter engine and/or UI,
you can then build and run your Android or iOS app the same way
you run normal Android or iOS apps.

当你将 Flutter 模块集成到项目中并使用 Flutter 的平台 APIs 来运行 Flutter 引擎和/或 UI 时，
你可以像运行普通的 Android 或 iOS 应用程序一样构建和运行你的应用。

However, Flutter is now powering the UI in places where you're showing a
`FlutterActivity` or `FlutterViewController`.

Flutter 会在你打开 `FlutterActivity` 或 `FlutterViewController` 的时候为 UI 提供支持。

### Debugging

### 调试

You may be used to having your suite of favorite Flutter debugging tools
available to you automatically when running `flutter run` or an equivalent
command from an IDE. But you can also use all your Flutter
[debugging functionalities][] such as hot reload, performance
overlays, DevTools, and setting breakpoints in add-to-app scenarios.

你可能习惯于在 IDE 中运行 `flutter run` 或者等效的快捷命令，
它会自动使用你喜爱的 Flutter 调试工具。
同样的，你也可以使用所有 Flutter 的 [调试功能][debugging functionalities]，
例如热重载、性能调试、DevTools 以及在混合开发的场景中设置断点。

These functionalities are provided by the `flutter attach` mechanism.
`flutter attach` can be initiated through different pathways,
such as through the SDK's CLI tools,
through VS Code or IntelliJ/Android Studio.

这些功能由 `flutter attach` 机制提供。
`flutter attach` 可以通过不同的路径启动，
例如通过 SDK 中的 CLI 工具、VS Code 或者 IntelliJ/Android Studio。

`flutter attach` can connect as soon as you run your `FlutterEngine`, and
remains attached until your `FlutterEngine` is disposed. But you can invoke
`flutter attach` before starting your engine. `flutter attach` waits for
the next available Dart VM that is hosted by your engine.

`flutter attach` 可以在你运行 `FlutterEngine` 时立即进行连接并保持，
直到 `FlutterEngine` 被释放。
你可以在启动引擎之前执行 `flutter attach`，
等待由引擎持有下一个有效的 Dart VM 连接。

#### Terminal

#### 命令行

Run `flutter attach` or `flutter attach -d deviceId` to attach from the terminal.

在命令行执行 `flutter attach` 或者 `flutter attach -d deviceId` 来连接你的应用。 

{% include app-figure.md image="development/add-to-app/debugging/cli-attach.png" caption="flutter attach via terminal" %}

#### VS Code

Select the correct device using the status bar in VS Code, then run the **Flutter: Attach to Flutter on Device** command from the command palette.

在 VS Code 中的状态栏中选择待调试的设备，
然后在命令面板运行 **Flutter: Attach to Flutter on Device** 命令。

{% include app-figure.md image="development/add-to-app/debugging/vscode-attach.png" caption="flutter attach via VS Code" %}

Alternatively, create a `.vscode/launch.json` file in your Flutter module project to enable attaching using the **Run > Start Debugging** command or `F5`:

或者，在你的 Flutter 模块下创建一个 `.vscode/launch.json` 文件，
使用 **Run > Start Debugging** 命令 或 `F5`。

```js
{
  name: "Flutter: Attach",
  request: "attach",
  type: "dart",
}
```

#### IntelliJ / Android Studio

Select the device on which the Flutter module runs so `flutter attach` filters for the right start signals.

选择 Flutter 模块运行的设备，然后点击右边的 `flutter attach` 按钮。

{% include app-figure.md image="development/add-to-app/debugging/intellij-attach.png" caption="flutter attach via IntelliJ" %}

### Debugging specific instances of Flutter

### 调试 Flutter 的特定实例

It's possible to add multiple instances of Flutter
(`root isolates`) to an app.  `flutter attach`
connects to all of the available isolates by default.
Any commands sent from the attached CLI are then forwarded
to each of the attached isolates.

可以在一个应用程序中添加多个 Flutter 实例(`root isolates`)。
在默认情况下，`flutter attach` 会连接所有可用的 isolates。
然后，从连接的 CLI 发送的任何命令都会转发到每个已连接的 isolate。

You can list all the attached isolates by typing `l`
from an attached `flutter` CLI tool.
If unspecified, then the isolate names are automatically generated
from the dart entrypoint file and function name.

你可以通过在已连接的 `flutter` CLI 工具中键入 `l` 来列出所有连接的 isolate。
如果未指定，isolate 名称会由 dart 入口文件和函数名自动生成。

Example `l` output for an application that is displaying two Flutter isolates
simultaneously:

使用 `l` 同时显示一个应用中两个 Flutter isolates 的案例：

```terminal
Connected views:
  main.dart$main-517591213 (isolates/517591213)
  main.dart$main-332962855 (isolates/332962855)
```

In order to attach to specific isolates instead, do the following:

要连接到指定的 isolate，请执行以下操作：

1. Name the Flutter root isolate of interest in its Dart source.

1. 在 Dart 代码中给 Flutter 的 root isolate 添加一个你喜欢的名字。  

    <!-- skip -->
    ```dart
    // main.dart
    import 'dart:ui' as ui;

    void main() {
      ui.window.setIsolateDebugName("debug isolate");
      // ...
    }
    ```

2. Run `flutter attach` with the `--isolate-filter` option.

2. 运行 `flutter attach` 命令并附带 `--isolate-filter` 参数。

    ```terminal
    $ flutter attach --isolate-filter='debug'
    Waiting for a connection from Flutter...
    Done.
    Syncing files to device...      1.1s

    🔥  To hot reload changes while running, press "r".
    To hot restart (and rebuild state), press "R".
    An Observatory debugger and profiler is available
    at: http://127.0.0.1:43343/.
    For a more detailed help message,
    press "h". To detach, press "d"; to quit, press "q".

    Connected view:
      debug isolate (isolates/642101161)
    ```


[debugging functionalities]: /docs/testing/debugging

