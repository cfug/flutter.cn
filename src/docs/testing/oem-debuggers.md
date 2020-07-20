---
title: Using an OEM debugger
title: 使用原生的调试器
short-title: debuggers
short-title: 调试器
description: How to connect an OEM debugger to your running Flutter app.
description: 如何连接各开发平台的调试器调试 Flutter 应用。
---

If you are exclusively writing Flutter apps with Dart code and not using
platform-specific libraries, or otherwise accessing platform-specific
features, you can debug your code using your IDE's debugger.
Only the first section of this guide, Debugging Dart code,
is relevant for you.

如果你只使用 Dart 语言开发 Flutter 应用，并且不使用特定于平台的的库或者功能，
你可以使用 IDE 的调试器调试你的代码。
只有这篇指南的第一部分「调试 Dart 代码」对你有用。

If you're writing a platform-specific plugin or using platform-specific
libraries written in Swift, ObjectiveC, Java, or Kotlin, you can debug
that portion of your code using Xcode (for iOS) or Android Gradle
(for Android).  This guide shows you how you can connect _two_
debuggers to your Dart app, one for Dart, and one for the OEM code.

如果你正在开发特定于平台的的插件或者使用由
Swift、ObjectiveC、Java 或 Kotlin 语言编写的特定于平台的库，
你可以使用 Xcode（用于 iOS）或者 Android Gradle（用于 Android）调试这部分代码。
本指南介绍如何将用于 Dart 和用于原生代码的 *两个* 调试器连接到你的 Dart 应用。

## Debugging Dart code

## 调试 Dart 代码

Use your IDE for standard Dart debugging. These instructions describe Android
Studio, but you can use your preferred IDE with the Flutter and Dart
plugins installed and configured.

你可以使用 IDE 进行一般的 Dart 调试。以下内容针对 Android Studio 进行说明，
但你也可以使用你喜欢的安装并配置好 Flutter 和 Dart 插件的编辑器来进行调试。

{{site.alert.tip}}

  Connect to a physical device when debugging, rather than an emulator or
  simulator, which don't support profile mode. For more information, see
  [Flutter's modes][].

  推荐连接到真机进行调试，而不是使用不支持 profie 构建模式的仿真器或模拟器。
  更多信息参考 [Flutter 的构建模式][Flutter's modes]。

{{site.alert.end}}

### Dart debugger

### Dart 调试器

* Open your project in Android Studio. If you don't have a project yet,
  create one using the instructions in [Test drive](/docs/get-started/test-drive).

  使用 Android Studio 打开你的项目。如果你还没有项目，根据 [开发体验初探](/docs/get-started/test-drive) 中的说明创建一个。

* Simultaneously bring up the Debug pane and run the app in the Console
  view by clicking the bug icon
  ({% asset 'testing/debugging/oem/debug-run.png' alt='Debug-run icon' %}).

  通过单击调试图标（{% asset 'testing/debugging/oem/debug-run.png' alt='Debug-run icon' %}）
  同时打开调试面板并在控制台中运行应用。

  The first time you launch the app is the slowest.
  You should see the Debug pane appear at the bottom of the window that
  looks something like the following:

  首次运行应用是最慢的，你会发现窗口底部的调试面板看起来会像这样：

  {% asset 'testing/debugging/oem/debug-pane.png' alt='Debug pane' %}{:width="100%"}

  You can configure where the debug pane appears,
  or even tear it off to its own
  window using the gear to the right in the Debug pane bar.
  This is true for any inspector in Android Studio.

  你可以设置调试面板的显示位置，甚至可以用调试面板右侧的齿轮将其拆分到独立的窗口。
  对于 Android Studio 中的任何检查器都是如此。

* Add a breakpoint on the `counter++` line.

  在 `counter++` 这一行上添加断点。

* In the app, click the **+** button (FloatingActionButton,
  or FAB, for short) to increment the counter. The app pauses.

  在应用里，点击 **+** 按钮
  （FloatingActionButton，或者简称 FAB）来增加数字，应用会暂停。

* The following screenshot shows:

  以下截图显示：

  * Breakpoint in the edit pane.

    编辑面板中的断点。

  * State of the app in the debug pane, when paused at the breakpoint.

    当在断点处暂停时，在调试面板中显示应用的状态。

  * `this` variable expanded to display its values.

    `this` 变量展开并显示其值。

  {% asset 'testing/debugging/oem/debug-pane-action.png' alt='App status when hitting the set breakpoint' %}{:width="100%"}

You can step in, out, and over Dart statements, hot reload or resume the app,
and use the debugger in the same way you'd use any debugger.
The **5: Debug** button toggles display of the debug pane.

你可以 step in/out/over Dart 语句、热重载和恢复执行应用、
以及像使用其他调试器一样来使用 Dart 调试器。
**5: Debug** 按钮切换调试面板的显示。

### Flutter inspector

There are two other features provided by the Flutter plugin that you might
find useful. The Flutter inspector is a tool for visualizing and exploring
the Flutter widget tree and helps you:

Flutter 插件提供了另外两个可能给你提供帮助的功能。
Flutter inspector 是一个用来可视化以及查看 Flutter widget 树的工具，
并帮助你：

* Understand existing layouts
  
  了解现有布局

* Diagnose layout issues

  诊断布局问题

Toggle display of the inspector using the vertical button to the
right of the Android Studio window.

你可以使用 Android Studio 窗口右侧的垂直按钮切换检查器的显示。

{% asset 'testing/debugging/oem/flutter-inspector.png' alt='Flutter inspector' %}

### Flutter outline

The Flutter Outline displays the build method in visual form.
Note that this might be different than the widget tree for the
build method. Toggle display of the outline using the vertical
button to the right of the AS window.

Flutter Outline 以可视形式显示构建方法。注意在构建方法上可能与 widget 树不同。
你可以使用 Android Studio 窗口右侧的垂直按钮切换 outline 的显示。

{% asset 'testing/debugging/oem/flutter-outline.png' alt='screenshot showing the Flutter inspector' %}{:width="100%"}

{% comment %}

TODO: Android Tips - How to assign a keyboard shortcut on the Mac?

TODO: Android 提示 - 在 Mac 上如何设置快捷键？

{% endcomment %}

The rest of this guide shows how to set up your environment to debug OEM
code. As you'd expect, the process works differently for iOS and Android.

这篇指南剩下的部分介绍了如何搭建原生代码的调试环境。
你应该可以想象到，对于 iOS 和 Android 这个过程是不同的。

{% comment %}

Considere moving the info below to a new page.

考虑将下面的说明转移到新的页面。

{% endcomment %}

{{site.alert.tip}}

  Become a pro user of Android Studio by installing the **Presentation
  Assistant** plugin. You can find and install this plugin using
  **Preferences** > **Plugins** > **Browsing repositories...** and start entering
  _Presen_ in the search field.

  通过安装 **Presentation Assistant** 插件来成为 Android Studio 的专业用户。
  你可以打开 **Preferences** > **Plugins** > **Browsing repositories...** 
  并在搜索框中输入 **Presen** 来找到并安装这个插件。

  Once installed and AS is relaunched, this plugin helps you to become a
  pro user by:

  当你安装并重启 Android Studio 之后，
  通过使用以下功能这个插件可以帮助你成为一个专业用户：

  * Showing the name and Windows/Linux/Mac shortcuts of any action you
    invoke.

    显示你执行的任何操作的名字和 Windows/Linux/Mac 的快捷键。

  * Allowing you to search and find available actions, settings, docs,
    and so on.

    允许你搜索并找到可用的操作、设置、文档等等。

  * Allowing you to toggle preferences, open up views, or run actions.

    允许你切换首选项，打开视图或者执行操作。

  * Allowing you to assign keyboard shortcuts (?? Can't make this work on
    Mac.)

    允许你设置键盘快捷键。（无法在 Mac 上运行此功能？）

  For example, try this:

  例如，尝试下这个：

  * While focus is in the Edit pane, enter **command-Shift-A** (Mac) or
    **shift-control-A** (Windows and Linux).
    The plugin simultaneously brings up the Find panel and shows a hint for
    performing this same operation on all three platforms.

    当焦点在编辑面板中时，
    输入 **command-Shift-A**（Mac）或者 **shift-control-A**（Windows 和 Linux）。
    该插件会同时显示「查找」面板并显示在所有三个平台上执行此操作的提示。

    {% asset 'testing/debugging/oem/presentation-assistant-find-pane.png' alt='Find panel' %}{:width="100%"}
    <center>Presentation assistant's Find panel</center>

    <center>Presentation assistant 的「查找」面板</center>

    {% asset 'testing/debugging/oem/presentation-assistant-teaches.png' alt='Find pane' %}{:width="100%"}
    <center>Presentation assistant's action hint for opening its Find panel on Mac, Windows and Linux</center>

    <center>Presentation assistant 的在 Mac、Windows 和 Linux 上打开「查找」面板的操作提示。</center>

  * Enter _attach_ to see the following:

    输入 **attach** 显示以下内容：

    {% asset 'testing/debugging/oem/presentation-assistant-search-results.png' alt='Find panel' %}

  * After an update, you might enter _Flutter_ or _Dart_ to see if
    new actions are available.

    更新之后，你可以输入 **Flutter** 或者
    **Dart** 来查看是否有新的可用的操作。

  Hide the Presentation Assistant's Find panel by using **Escape**.

  使用 **Escape** 隐藏 Presentation Assistant 的「查找」面板。

{{site.alert.end}}


## Debugging with Android Gradle (Android)

## 使用 Android Gradle 调试（Android）

In order to debug OEM Android code, you need an app that contains
OEM Android code. In this section, you'll learn how to connect
two debuggers to your app: 1) the Dart debugger and,
2) the Android Gradle debugger.

为了调试原生代码，你需要一个包含 Android 原生代码的应用。
在本节中，你将学会如何连接两个调试器到你的应用：
1）Dart 调试器，和 2）Android Gradle 调试器。

* Create a basic Flutter app.
  
  创建一个基本的 Flutter 应用。

* Replace `lib/main.dart` with the following example code from the
[`url_launcher`]({{site.pub}}/packages/url_launcher)
package:

  替换 `lib/main.dart` 为来自 
  [`url_launcher`]({{site.pub}}/packages/url_launcher) 包的以下示例代码：

{% prettify dart %}
// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'URL Launcher',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'URL Launcher'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  Future<void> _launched;

  Future<void> _launchInBrowser(String url) async {
    if (await canLaunch(url)) {
      await launch(url, forceSafariVC: false, forceWebView: false);
    } else {
      throw 'Could not launch $url';
    }
  }

  Future<void> _launchInWebViewOrVC(String url) async {
    if (await canLaunch(url)) {
      await launch(url, forceSafariVC: true, forceWebView: true);
    } else {
      throw 'Could not launch $url';
    }
  }

  Widget _launchStatus(BuildContext context, AsyncSnapshot<void> snapshot) {
    if (snapshot.hasError) {
      return Text('Error: ${snapshot.error}');
    } else {
      return Text('');
    }
  }

  @override
  Widget build(BuildContext context) {
    String toLaunch = 'https://flutter.dev';
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.all(16.0),
              child: Text(toLaunch),
            ),
            RaisedButton(
              onPressed: () => setState(() {
                    _launched = _launchInBrowser(toLaunch);
                  }),
              child: Text('Launch in browser'),
            ),
            Padding(padding: EdgeInsets.all(16.0)),
            RaisedButton(
              onPressed: () => setState(() {
                    _launched = _launchInWebViewOrVC(toLaunch);
                  }),
              child: Text('Launch in app'),
            ),
            Padding(padding: EdgeInsets.all(16.0)),
            FutureBuilder<void>(future: _launched, builder: _launchStatus),
          ],
        ),
      ),
    );
  }
}
{% endprettify %}

* Add the `url_launcher` dependency to the pubspec file,
  and run flutter pub get:

  添加 `url_launcher` 依赖到 pubspec 文件，并执行 `flutter pub get`：

```yaml
name: flutter_app
description: A new Flutter application.
version: 1.0.0+1

dependencies:
  flutter:
    sdk: flutter

  url_launcher: ^3.0.3
  cupertino_icons: ^0.1.2

dev_dependencies:
  flutter_test:
    sdk: flutter
```

* Click the debug icon
  ({% asset 'testing/debugging/oem/debug-run.png' alt='Debug-run icon' %})
  to simultaneously bring up the Debug pane and launch the app.
  Wait for the app to launch on the device, and for the debug pane to
  indicate **Connected**.
  (This can take a minute the first time but is faster for subsequent
   launches.) The app contains two buttons: 1) **Launch in browser**
   opens flutter.dev in your phone's default browser and 2) **Launch
   in app** opens flutter.dev within your app.

   点击调试按钮
   （{% asset 'testing/debugging/oem/debug-run.png' alt='Debug-run icon' %}）
   来同时打开调试面板并启动应用。
   等待应用在设备上启动并在调试面板中显示 **Connected**。
   （第一次可能需要一分钟，但是之后的启动会变快。）
   应用包含两个按钮：
   1）**Launch in browser** 在你的手机默认浏览器中打开 flutter.dev 网站 
   2）**Launch in app** 在你的应用中打开 flutter.dev 网站。

  {% asset 'testing/debugging/oem/launch-flutter-dev.png' alt='screenshot containing two buttons for opening flutter.dev' %}

* Click the **Attach debugger to Android process** button (
  {% asset 'testing/debugging/oem/attach-process-button.png' alt='looks like a rectangle superimposed with a tiny green bug' %} )

  点击 **Attach debugger to Android process** 按钮
  （{% asset 'testing/debugging/oem/attach-process-button.png' alt='looks like a rectangle superimposed with a tiny green bug' %}）

{{site.alert.tip}}

  If this button doesn't appear in the Projects menu bar, make sure that
  you are inside a Flutter project but <em>not a Flutter plugin</em>.

  如果这个按钮没有显示在 Projects 菜单栏上，
  确定你正在使用的是 Flutter 项目而<em>不是 Flutter 插件</em>。

{{site.alert.end}}

* From the process dialog, you should see an entry for each connected device.
  Select **show all processes** to display available processes for each
  device.

  从进程对话框中，你应该可以看到每一个设备的入口。
  选择 **show all processes** 来显示每个设备可用的进程。

* Choose the process you want to attach to. In this case, it's the
  `com.google.clickcount`
   (or <strong>com.<em>company</em>.<em>app_name</em></strong>)
   process for the Motorola Moto G.

  选择你想附加到的进程。
  在这个例子中是 Motorola Moto G 的 `com.google.clickcount`
  （或 <strong>com.<em>company</em>.<em>app_name</em></strong>）进程。
  
  {% asset 'testing/debugging/oem/choose-process-dialog.png' alt='screenshot containing two buttons for opening flutter.dev' %}{:width="100%"}

* In the debug pane, you should now see a tab for **Android Debugger**.

  在调试面板中，你现在应该可以看到一个 **Android Debugger** 标签页。

* In the project pane, expand
  <nobr><strong><em>app_name</em> > android > app > src > main >
  java > io.flutter plugins</strong></nobr>.
  Double click **GeneratedProjectRegistrant** to open the
  Java code in the edit pane.

  在项目面板，展开 <strong><em>app_name</em> > android > app > src > main > java > io.flutter plugins</strong>。
  双击 **GeneratedProjectRegistrant** 在编辑面板中打开 Java 代码。

Both the Dart and OEM debuggers are interacting with the same process.
User either, or both, to set breakpoints, examine stack, resume execution...
In other words, debug!

Dart 和原生调试器都在与同一个进程交互。
使用其中一个或者同时使用两个来设置断点、检查堆栈、恢复运行……
换句话说，调试！

  {% asset 'testing/debugging/oem/dart-debugger.png' alt='screenshot of Android Studio in the Dart debug pane.' %}{:width="100%"}
  <br><center>The Dart debug pane with two breakpoints set in `lib/main.dart`</center>

  <center>Dart 调试面板和 `lib/main.dart` 中的两个断点。</center>

  {% asset 'testing/debugging/oem/android-debugger.png' alt='screenshot of Android Studio in the Android debug pane.' %}{:width="100%"}
  <br><center>The Android debug pane with one breakpoint set in
   `GeneratedPluginRegistrant.java`.
  Toggle between the debuggers by clicking the appropriate debugger in
   the Debug pane's banner.</center>

  <center>Android 调试面板和 `GeneratedPluginRegistrant.java` 中的一个断点。
  通过单击调试面板顶部的相应调试器，在调试器之间进行切换。</center>

## Debugging with Xcode (iOS)

## 使用 Xcode 调试（iOS）

In order to debug OEM iOS code, you need an app that contains OEM iOS code.
In this section, you'll learn how to connect two debuggers to your app:
1) the Dart debugger and, 2) the Xcode debugger.

为了调试原生 iOS 代码，你需要一个包含原生 iOS 代码的应用。
在本节中，你将学会如何连接两个调试器到你的应用：
1）Dart 调试器
2）Xcode 调试器。

[PENDING]

## Resources

## 资源

The following resources have more information on debugging Flutter,
iOS, and Android:

下面的资源包含更多关于 Flutter、iOS 和 Android 调试的信息。

### Flutter

* [Debugging Flutter apps](/docs/testing/debugging)
 
  [调试 Flutter 应用](/docs/testing/debugging)

* [Flutter inspector][], as well as the general
  [DevTools][] docs.

  [开发者工具][DevTools] 里的 [Flutter inspector][]

* [Performance Profiling](/docs/perf/rendering/ui-performance)

  [Flutter 性能分析](/docs/testing/ui-performance)

### Android

You can find the following debugging resources on
[developer.android.com][].

你可以在 [developer.android.com]({{site.android-dev}}) 找到下列的调试资源。

* [Debug your app][]

  [调试你的应用][Debug your app]

* [Android Debug Bridge (adb)][]

  [Android 调试桥 (adb)][Android Debug Bridge (adb)]

### iOS

You can find the following debugging resources on
[developer.apple.com][].

你可以在 [developer.apple.com](https://developer.apple.com) 找到下列的调试资源。

* [Debugging][]
 
  [调试](https://developer.apple.com/cn/support/debugging/)

* [Instruments Help][]

[Android Debug Bridge (adb)]: {{site.android-dev}}/studio/command-line/adb
[Debug your app]: {{site.android-dev}}/studio/debug
[Debugging]: https://developer.apple.com/support/debugging/
[developer.android.com]: {{site.android-dev}}
[developer.apple.com]: https://developer.apple.com
[DevTools]: /docs/development/tools/devtools
[Flutter inspector]: /docs/development/tools/devtools/inspector
[Flutter's modes]: /docs/testing/build-modes
[Instruments Help]: https://help.apple.com/instruments/mac/current/
