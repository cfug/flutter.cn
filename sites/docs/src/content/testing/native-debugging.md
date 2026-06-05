---
# title: Use a native language debugger
title: 使用原生语言调试器
# shortTitle: debuggers
shortTitle: 调试器
# description: How to connect a native debugger to your running Flutter app.
description: 如何将原生调试器连接到你正在运行的 Flutter 应用。
ai-translated: true
---

<?code-excerpt path-base="testing/native_debugging"?>

:::note
This guide presumes you understand general debugging,
have installed Flutter and git, and have familiarity
with the Dart language as well as one of the following
languages: Java, Kotlin, Swift, or Objective-C.
:::

:::note
本指南假定你理解一般调试知识，
已安装 Flutter 和 Git，并熟悉
Dart 语言以及以下语言之一：
Java、Kotlin、Swift 或 Objective-C。
:::

If you write Flutter apps only with Dart code,
you can debug your code using your IDE's debugger.
The Flutter team recommends VS Code.

如果你仅用 Dart 代码编写 Flutter 应用，
可以使用 IDE 的调试器调试代码。
Flutter 团队推荐使用 VS Code。

If you write a platform-specific plugin or
use platform-specific libraries, you can debug
that portion of your code with a native debugger.

如果你编写平台特定插件或
使用平台特定库，可以使用原生调试器
调试那部分代码。

- To debug iOS or macOS code written in Swift or Objective-C,
  you can use Xcode.
- To debug Android code written in Java or Kotlin,
  you can use Android Studio.
- To debug Windows code written in C++, you can use Visual Studio.

- 要调试用 Swift 或 Objective-C 编写的 iOS 或 macOS 代码，
  可以使用 Xcode。
- 要调试用 Java 或 Kotlin 编写的 Android 代码，
  可以使用 Android Studio。
- 要调试用 C++ 编写的 Windows 代码，
  可以使用 Visual Studio。

This guide shows you how you can connect _two_
debuggers to your Dart app, one for Dart, and one for the native code.

本指南说明如何将 _两个_
调试器连接到你的 Dart 应用：一个用于 Dart，一个用于原生代码。

## Debug Dart code

## 调试 Dart 代码

This guide describes how to use VS Code to debug your Flutter app.
You can also use your preferred IDE with the
Flutter and Dart plugins installed and configured.

本指南介绍如何使用 VS Code 调试 Flutter 应用。
你也可以使用已安装并配置
Flutter 和 Dart 插件的首选 IDE。

## Debug Dart code using VS Code

## 使用 VS Code 调试 Dart 代码

The following procedure explains how to use the Dart debugger
with the default sample Flutter app.
The featured components in VS Code work and appear when
debugging your own Flutter project as well.

以下步骤说明如何将 Dart 调试器
与默认示例 Flutter 应用配合使用。
在调试你自己的 Flutter 项目时，
VS Code 中展示的这些组件同样可用并会出现。

1. Create a basic Flutter app.

    1. 创建一个基本的 Flutter 应用。

    ```console
    $ flutter create my_app
    ```

    ```console
    Creating project my_app...
    Resolving dependencies in my_app...
    Got dependencies in my_app.
    Wrote 129 files.

    All done!
    You can find general documentation for Flutter at: https://docs.flutter.dev/
    Detailed API documentation is available at: https://api.flutter.dev/
    If you prefer video documentation, consider: https://www.youtube.com/c/flutterdev

    In order to run your application, type:

      $ cd my_app
      $ flutter run

    Your application code is in my_app/lib/main.dart.
    ```

    ```console
    $ cd my_app
    ```

1. Open the `lib\main.dart` file in the Flutter app using
   VS Code.

    1. 使用 VS Code 打开 Flutter 应用中的 `lib\main.dart` 文件。

1. Click the bug icon
   (![VS Code's bug icon to trigger the debugging mode of a Flutter app](/assets/images/docs/testing/debugging/vscode-ui/icons/debug.png)).
   This opens the following panes in VS Code:

    1. 点击虫子图标
       （![VS Code 的虫子图标，用于触发 Flutter 应用的调试模式](/assets/images/docs/testing/debugging/vscode-ui/icons/debug.png)）。
       这会在 VS Code 中打开以下窗格：

   - **Debug**
   - **Debug Console**
   - **Widget Inspector**

   - **Debug**
   - **Debug Console**
   - **Widget Inspector**

   The first time you run the debugger takes the longest.

   首次运行调试器耗时最长。

   {% comment %}
   ![VS Code window with debug panes opened](/assets/images/docs/testing/debugging/vscode-ui/screens/vscode-debugger.png){:width="100%"}
   {% endcomment %}

1. Test the debugger.

    1. 测试调试器。

   a. In `main.dart`, click on this line:

      a. 在 `main.dart` 中，点击这一行：

      ```dart
      _counter++;
      ```

   b. Press <kbd>Shift</kbd> + <kbd>F9</kbd>.
      This adds a breakpoint where the
      `_counter` variable increments.

      b. 按 <kbd>Shift</kbd> + <kbd>F9</kbd>。
         这会在 `_counter` 变量递增处添加断点。

   c. In the app, click the **+** button
      to increment the counter. The app pauses.

      c. 在应用中，点击 **+** 按钮
         以增加计数器。应用会暂停。

      {% comment %}
      ![Flutter test app paused](/assets/images/docs/testing/debugging/native/macos/basic-app.png){:width="50%"}
      <div class="figure-caption">

      Default Flutter app as rendered on macOS.

      </div>
      {% endcomment %}

    d. At this point, VS Code displays:

       d. 此时，VS Code 会显示：

      - In the **Editor Groups**:
        - The highlighted breakpoint in `main.dart`
        - The widget hierarchy for the Flutter app
          in the **Widget Tree** of the **Widget Inspector**
      - In the **side bar**:
        - The state of the app in the **Call Stack** section
        - The value of the `this` local variable in the **Variables** section
      - In the **panel**:
        - The log of the Flutter app in the **Debug console**

      - 在 **Editor Groups** 中：
        - `main.dart` 中高亮的断点
        - **Widget Inspector** 的 **Widget Tree** 中
          Flutter 应用的 widget 层级
      - 在**侧边栏**中：
        - **Call Stack** 部分中的应用状态
        - **Variables** 部分中 `this` 局部变量的值
      - 在**面板**中：
        - **Debug console** 中的 Flutter 应用日志

      {% comment %}
      ![VS Code window with Flutter app paused](/assets/images/docs/testing/debugging/vscode-ui/screens/vscode-debugger-paused.png){:width="100%"}
      {% endcomment %}

### VS Code Flutter debugger

### VS Code Flutter 调试器

The Flutter plugin for VS Code adds a number of components
to the VS Code user interface.

VS Code 的 Flutter 插件会向
VS Code 用户界面添加多个组件。

#### Changes to VS Code interface

#### VS Code 界面的变化

When launched, the Flutter debugger adds debugging tools to the
VS Code interface.

启动后，Flutter 调试器会向
VS Code 界面添加调试工具。

The following screenshot and table explain the purpose of each tool.

以下截图和表格说明每个工具的用途。

![VS Code with the Flutter plugin UI additions](/assets/images/docs/testing/debugging/vscode-ui/screens/debugger-parts.png)

| Highlight Color in Screenshot | Bar, Panel, or Tab  | Contents                                                                          |
|-------------------------------|---------------------|-----------------------------------------------------------------------------------|
| **Yellow**                    | Variables           | List of current values of variables in the Flutter app                            |
|                               | Watch               | List of items you chose to track in the Flutter app                               |
|                               | Call Stack          | Stack of active subroutines in the Flutter app                                    |
|                               | Breakpoints         | List of exceptions and set breakpoints that you set                               |
| **Green**                     | `<Flutter files>`   | Files that you are editing                                                        |
| **Pink**                      | Widget Inspector    | Hierarchy of widgets in the running Flutter app                                   |
| **Blue**                      | Layout Explorer     | Visual of how Flutter placed the widget you selected in the Widget Inspector      |
|                               | Widget Details Tree | List of properties of the widget selected in the Widget Inspector                 |
| **Orange**                    | Problems            | List of issues the Dart analyzer found in the current Dart file                   |
|                               | Output              | Response that the Flutter app returns when building an app                        |
|                               | Debug Console       | Logs or error messages that the Flutter app generates while debugging             |
|                               | Terminal            | System shell prompt contained in VS Code                                          |

| 截图中的高亮颜色 | 栏、面板或标签页 | 内容 |
|-------------------------------|---------------------|-----------------------------------------------------------------------------------|
| **黄色** | Variables | Flutter 应用中变量的当前值列表 |
| | Watch | 你在 Flutter 应用中选择跟踪的项列表 |
| | Call Stack | Flutter 应用中活动子例程的栈 |
| | Breakpoints | 你设置的异常与断点列表 |
| **绿色** | `<Flutter files>` | 你正在编辑的文件 |
| **粉色** | Widget Inspector | 正在运行的 Flutter 应用中的 widget 层级 |
| **蓝色** | Layout Explorer | Flutter 如何在 Widget Inspector 中放置你所选 widget 的可视化 |
| | Widget Details Tree | Widget Inspector 中所选 widget 的属性列表 |
| **橙色** | Problems | Dart 分析器在当前 Dart 文件中发现的问题列表 |
| | Output | 构建应用时 Flutter 应用返回的响应 |
| | Debug Console | 调试时 Flutter 应用生成的日志或错误消息 |
| | Terminal | VS Code 中包含的系统 shell 提示符 |

{:.table .table-striped}

To change where the panel (in **orange**) appears in VS Code,
go to **View** > **Appearance** > **Panel Position**.

要更改面板（**橙色**）在 VS Code 中的位置，
请前往 **View** > **Appearance** > **Panel Position**。

#### VS Code Flutter debugging toolbar

#### VS Code Flutter 调试工具栏

The toolbar allows you to debug using any debugger.
You can step in, out, and over Dart statements, hot reload, or resume the app.

工具栏让你使用任何调试器进行调试。
你可以单步进入、跳出和跳过 Dart 语句，热重载或恢复应用。

![Flutter debugger toolbar in VS Code](/assets/images/docs/testing/debugging/vscode-ui/screens/debug-toolbar.png)

| Icon                                                | Action                | Default keyboard shortcut                             |
|-----------------------------------------------------|-----------------------|-------------------------------------------------------|
| {% render "docs/vscode-flutter-bar/play.md" %}        | Start or Resume       | <kbd>F5</kbd>                                         |
| {% render "docs/vscode-flutter-bar/pause.md" %}       | Pause                 | <kbd>F6</kbd>                                         |
| {% render "docs/vscode-flutter-bar/step-over.md" %}   | Step Over             | <kbd>F10</kbd>                                        |
| {% render "docs/vscode-flutter-bar/step-into.md" %}   | Step Into             | <kbd>F11</kbd>                                        |
| {% render "docs/vscode-flutter-bar/step-out.md" %}    | Step Out              | <kbd>Shift</kbd> + <kbd>F11</kbd>                     |
| {% render "docs/vscode-flutter-bar/hot-reload.md" %}  | Hot Reload            | <kbd>Ctrl</kbd> + <kbd>F5</kbd>                       |
| {% render "docs/vscode-flutter-bar/hot-restart.md" %} | Hot Restart           | <kbd>Shift</kbd> + <kbd>Special</kbd> + <kbd>F5</kbd> |
| {% render "docs/vscode-flutter-bar/stop.md" %}        | Stop                  | <kbd>Shift</kbd> + <kbd>F5</kbd>                      |
| {% render "docs/vscode-flutter-bar/inspector.md" %}   | Open Widget Inspector |                                                       |

| 图标 | 操作 | 默认键盘快捷键 |
|-----------------------------------------------------|-----------------------|-------------------------------------------------------|
| {% render "docs/vscode-flutter-bar/play.md" %} | 启动或恢复 | <kbd>F5</kbd> |
| {% render "docs/vscode-flutter-bar/pause.md" %} | 暂停 | <kbd>F6</kbd> |
| {% render "docs/vscode-flutter-bar/step-over.md" %} | 单步跳过 | <kbd>F10</kbd> |
| {% render "docs/vscode-flutter-bar/step-into.md" %} | 单步进入 | <kbd>F11</kbd> |
| {% render "docs/vscode-flutter-bar/step-out.md" %} | 单步跳出 | <kbd>Shift</kbd> + <kbd>F11</kbd> |
| {% render "docs/vscode-flutter-bar/hot-reload.md" %} | 热重载 | <kbd>Ctrl</kbd> + <kbd>F5</kbd> |
| {% render "docs/vscode-flutter-bar/hot-restart.md" %} | 热重启 | <kbd>Shift</kbd> + <kbd>Special</kbd> + <kbd>F5</kbd> |
| {% render "docs/vscode-flutter-bar/stop.md" %} | 停止 | <kbd>Shift</kbd> + <kbd>F5</kbd> |
| {% render "docs/vscode-flutter-bar/inspector.md" %} | 打开 Widget Inspector | |

{:.table .table-striped}

## Update test Flutter app

## 更新测试用 Flutter 应用

For the remainder of this guide, you need to update the
test Flutter app. This update adds native code to debug.

在本指南的其余部分，你需要更新
测试用 Flutter 应用。此更新会添加用于调试的原生代码。

1. Open the `lib/main.dart` file using your preferred IDE.

    1. 使用你首选的 IDE 打开 `lib/main.dart` 文件。

1. Replace the contents of `main.dart` with the following code.

    1. 将 `main.dart` 的内容替换为以下代码。

    <details>
    <summary>Expand to see Flutter code for this example · 展开以查看此示例的 Flutter 代码</summary>

    ```dart title="lib/main.dart"
    // Copyright 2023 The Flutter Authors. All rights reserved.
    // Use of this source code is governed by a BSD-style license that can be
    // found in the LICENSE file.

    import 'package:flutter/material.dart';
    import 'package:url_launcher/url_launcher.dart';

    void main() {
      runApp(const MyApp());
    }

    class MyApp extends StatelessWidget {
      const MyApp({super.key});

      @override
      Widget build(BuildContext context) {
        return MaterialApp(
          title: 'URL Launcher',
          theme: ThemeData(
            colorSchemeSeed: Colors.purple,
            brightness: Brightness.light,
          ),
          home: const MyHomePage(title: 'URL Launcher'),
        );
      }
    }

    class MyHomePage extends StatefulWidget {
      const MyHomePage({super.key, required this.title});
      final String title;

      @override
      State<MyHomePage> createState() => _MyHomePageState();
    }

    class _MyHomePageState extends State<MyHomePage> {
      Future<void>? _launched;

      Future<void> _launchInBrowser(Uri url) async {
        if (!await launchUrl(
          url,
          mode: LaunchMode.externalApplication,
        )) {
          throw Exception('Could not launch $url');
        }
      }

      Future<void> _launchInWebView(Uri url) async {
        if (!await launchUrl(
          url,
          mode: LaunchMode.inAppWebView,
        )) {
          throw Exception('Could not launch $url');
        }
      }

      Widget _launchStatus(BuildContext context, AsyncSnapshot<void> snapshot) {
        if (snapshot.hasError) {
          return Text('Error: ${snapshot.error}');
        } else {
          return const Text('');
        }
      }

      @override
      Widget build(BuildContext context) {
        final Uri toLaunch = Uri(
            scheme: 'https',
            host: 'docs.flutter.dev',
            path: 'testing/native-debugging');
        return Scaffold(
          appBar: AppBar(
            title: Text(widget.title),
          ),
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Text(toLaunch.toString()),
                ),
                FilledButton(
                  onPressed: () => setState(() {
                    _launched = _launchInBrowser(toLaunch);
                  }),
                  child: const Text('Launch in browser'),
                ),
                const Padding(padding: EdgeInsets.all(16)),
                FilledButton(
                  onPressed: () => setState(() {
                    _launched = _launchInWebView(toLaunch);
                  }),
                  child: const Text('Launch in app'),
                ),
                const Padding(padding: EdgeInsets.all(16.0)),
                FutureBuilder<void>(future: _launched, builder: _launchStatus),
              ],
            ),
          ),
        );
      }
    }
    ```

    </details>

1. To add the `url_launcher` package as a dependency,
   run `flutter pub add`:

    1. 要将 `url_launcher` 包添加为依赖，
       请运行 `flutter pub add`：

    ```console
    $ flutter pub add url_launcher
    ```

    ```console
    Resolving dependencies...
      collection 1.17.1 (1.17.2 available)
    + flutter_web_plugins 0.0.0 from sdk flutter
      matcher 0.12.15 (0.12.16 available)
      material_color_utilities 0.2.0 (0.8.0 available)
    + plugin_platform_interface 2.1.4
      source_span 1.9.1 (1.10.0 available)
      stream_channel 2.1.1 (2.1.2 available)
      test_api 0.5.1 (0.6.1 available)
    + url_launcher 6.1.11
    + url_launcher_android 6.0.36
    + url_launcher_ios 6.1.4
    + url_launcher_linux 3.0.5
    + url_launcher_macos 3.0.5
    + url_launcher_platform_interface 2.1.3
    + url_launcher_web 2.0.17
    + url_launcher_windows 3.0.6
    Changed 10 dependencies!
    ```

1. To check what changed with the codebase:

    1. 要检查代码库有哪些变更：

   {: type="a"}
   1. In Linux or macOS, run this `find` command.

      1. 在 Linux 或 macOS 上，运行此 `find` 命令。

      ```console
      $ find ./ -mmin -120
      ```

      ```console
      ./ios/Flutter/Debug.xcconfig
      ./ios/Flutter/Release.xcconfig
      ./linux/flutter/generated_plugin_registrant.cc
      ./linux/flutter/generated_plugins.cmake
      ./macos/Flutter/Flutter-Debug.xcconfig
      ./macos/Flutter/Flutter-Release.xcconfig
      ./macos/Flutter/GeneratedPluginRegistrant.swift
      ./pubspec.lock
      ./pubspec.yaml
      ./windows/flutter/generated_plugin_registrant.cc
      ./windows/flutter/generated_plugins.cmake
      ```
   1. In Windows, run this command in the command prompt.

      1. 在 Windows 上，在命令提示符中运行此命令。

      ```ps
      Get-ChildItem C:\dev\example\ -Rescurse | Where-Object {$_.LastWriteTime -gt (Get-Date).AddDays(-1)}
      ```

      ```ps
      C:\dev\example\ios\Flutter\


      Mode                LastWriteTime         Length Name
      ----                -------------         ------ ----
                      8/1/2025   9:15 AM                Debug.xcconfig
                      8/1/2025   9:15 AM                Release.xcconfig

      C:\dev\example\linux\flutter\


      Mode                LastWriteTime         Length Name
      ----                -------------         ------ ----
                      8/1/2025   9:15 AM                generated_plugin_registrant.cc
                      8/1/2025   9:15 AM                generated_plugins.cmake

      C:\dev\example\macos\Flutter\


      Mode                LastWriteTime         Length Name
      ----                -------------         ------ ----
                      8/1/2025   9:15 AM                Flutter-Debug.xcconfig
                      8/1/2025   9:15 AM                Flutter-Release.xcconfig
                      8/1/2025   9:15 AM                GeneratedPluginRegistrant.swift

      C:\dev\example\


      Mode                LastWriteTime         Length Name
      ----                -------------         ------ ----
                      8/1/2025   9:15 AM                pubspec.lock
                      8/1/2025   9:15 AM                pubspec.yaml

      C:\dev\example\windows\flutter\


      Mode                LastWriteTime         Length Name
      ----                -------------         ------ ----
                      8/1/2025   9:15 AM                generated_plugin_registrant.cc
                      8/1/2025   9:15 AM                generated_plugins.cmake
      ```

Installing `url_launcher` added config files and code files
for all target platforms in the Flutter app directory.

安装 `url_launcher` 会在 Flutter 应用目录中为
所有目标平台添加配置文件和代码文件。

## Debug Dart and native language code at the same time

## 同时调试 Dart 与原生语言代码

This section explains how to debug the Dart code in your Flutter app
and any native code with its regular debugger.
This capability allows you to leverage Flutter's hot reload
when editing native code.

本节说明如何调试 Flutter 应用中的 Dart 代码，
并使用其常规调试器调试任何原生代码。
此能力让你在编辑原生代码时
仍可利用 Flutter 的热重载。

### Debug Dart and Android code using Android Studio

### 使用 Android Studio 调试 Dart 与 Android 代码

To debug native Android code, you need a Flutter app that contains
Android code. In this section, you learn how to connect
the Dart, Java, and Kotlin debuggers to your app.
You don't need VS Code to debug both Dart and Android code.
This guide includes the VS Code instructions to be consistent
with the Xcode and Visual Studio guides.

要调试原生 Android 代码，你需要包含
Android 代码的 Flutter 应用。在本节中，你将学习如何将
Dart、Java 和 Kotlin 调试器连接到你的应用。
调试 Dart 与 Android 代码不一定需要 VS Code。
本指南包含 VS Code 说明，以与
Xcode 和 Visual Studio 指南保持一致。

These section uses the same example Flutter `url_launcher` app created
in [Update test Flutter app](#update-test-flutter-app).

本节使用在[更新测试用 Flutter 应用](#update-test-flutter-app)中创建的
相同示例 Flutter `url_launcher` 应用。

{% render "docs/debug/debug-flow-android.md" %}

### Debug Dart and iOS code using Xcode

### 使用 Xcode 调试 Dart 与 iOS 代码

To debug iOS code, you need a Flutter app that contains iOS code.
In this section, you learn to connect two debuggers to your app:
Flutter via VS Code and Xcode. You need to run both VS Code and Xcode.

要调试 iOS 代码，你需要包含 iOS 代码的 Flutter 应用。
在本节中，你将学习将两个调试器连接到你的应用：
通过 VS Code 的 Flutter 与 Xcode。你需要同时运行 VS Code 和 Xcode。

These section uses the same example Flutter `url_launcher` app created
in [Update test Flutter app](#update-test-flutter-app).

本节使用在[更新测试用 Flutter 应用](#update-test-flutter-app)中创建的
相同示例 Flutter `url_launcher` 应用。

{% render "docs/debug/debug-flow-ios.md" %}

### Debug Dart and macOS code using Xcode

### 使用 Xcode 调试 Dart 与 macOS 代码

To debug macOS code, you need a Flutter app that contains macOS code.
In this section, you learn to connect two debuggers to your app:
Flutter via VS Code and Xcode. You need to run both VS Code and Xcode.

要调试 macOS 代码，你需要包含 macOS 代码的 Flutter 应用。
在本节中，你将学习将两个调试器连接到你的应用：
通过 VS Code 的 Flutter 与 Xcode。你需要同时运行 VS Code 和 Xcode。

These section uses the same example Flutter `url_launcher` app created
in [Update test Flutter app](#update-test-flutter-app).

本节使用在[更新测试用 Flutter 应用](#update-test-flutter-app)中创建的
相同示例 Flutter `url_launcher` 应用。

{% render "docs/debug/debug-flow-macos.md" %}

### Debug Dart and C++ code using Visual Studio

### 使用 Visual Studio 调试 Dart 与 C++ 代码

To debug C++ code, you need a Flutter app that contains C++ code.
In this section, you learn to connect two debuggers to your app:
Flutter via VS Code and Visual Studio.
You need to run both VS Code and Visual Studio.

要调试 C++ 代码，你需要包含 C++ 代码的 Flutter 应用。
在本节中，你将学习将两个调试器连接到你的应用：
通过 VS Code 的 Flutter 与 Visual Studio。
你需要同时运行 VS Code 和 Visual Studio。

These section uses the same example Flutter `url_launcher` app created
in [Update test Flutter app](#update-test-flutter-app).

本节使用在[更新测试用 Flutter 应用](#update-test-flutter-app)中创建的
相同示例 Flutter `url_launcher` 应用。

{% render "docs/debug/debug-flow-windows.md" %}

## Resources

## 资源

Check out the following resources on debugging Flutter, iOS, Android,
macOS and Windows:

请查阅以下关于调试 Flutter、iOS、Android、
macOS 和 Windows 的资源：

### Flutter

### Flutter

- [Debugging Flutter apps][]

  [调试 Flutter 应用][Debugging Flutter apps]

- [Flutter inspector][] and the [DevTools][] docs

  [Flutter inspector][] 与 [DevTools][] 文档

- [Performance profiling][]

  [性能分析][Performance profiling]

[Debugging Flutter apps]: /testing/debugging
[Performance profiling]: /perf/ui-performance

### Android

### Android

You can find the following debugging resources on
[developer.android.com][].

你可以在 [developer.android.com][] 上找到以下调试资源。

- [Debug your app][]

  [调试你的应用][Debug your app]

- [Android Debug Bridge (adb)][]

  [Android Debug Bridge (adb)][Android Debug Bridge (adb)]

### iOS and macOS

### iOS 与 macOS

You can find the following debugging resources on
[developer.apple.com][].

你可以在 [developer.apple.com][] 上找到以下调试资源。

- [Debugging][]

  [调试][Debugging]

- [Instruments Help][]

  [Instruments 帮助][Instruments Help]

### Windows

### Windows

You can find debugging resources on [Microsoft Learn][].

你可以在 [Microsoft Learn][] 上找到调试资源。

- [Visual Studio Debugger][]

  [Visual Studio 调试器][Visual Studio Debugger]

- [Learn to debug C++ code using Visual Studio][]

  [学习使用 Visual Studio 调试 C++ 代码][Learn to debug C++ code using Visual Studio]

[Android Debug Bridge (adb)]: {{site.android-dev}}/studio/command-line/adb
[Debug your app]: {{site.android-dev}}/studio/debug
[Debugging]: {{site.apple-dev}}/support/debugging/
[developer.android.com]: {{site.android-dev}}
[developer.apple.com]: {{site.apple-dev}}
[DevTools]: /tools/devtools
[Flutter inspector]: /tools/devtools/inspector
[Instruments Help]: https://help.apple.com/instruments/mac/current/
[Microsoft Learn]: https://learn.microsoft.com/visualstudio/
[Visual Studio Debugger]: https://learn.microsoft.com/visualstudio/debugger/?view=vs-2022
[Learn to debug C++ code using Visual Studio]: https://learn.microsoft.com/visualstudio/debugger/getting-started-with-the-debugger-cpp?view=vs-2022
