---
# title: Run DevTools from the command line
title: 通过命令行运行开发者工具
# description: Learn how to launch and use DevTools from the command line.
description: 学习如何通过命令行工具启动和使用开发者工具。
tags: Flutter开发工具
keywords: 命令行,启动,开发者工具,DevTools
---

To run DevTools from the CLI,
you must have `dart` on your path.
Then to launch DevTools, run the `dart devtools` command.

要从命令行或终端运行 DevTools，
`dart` 必须要能在环境变量中找到。
然后你可以运行 `dart devtools` 命令启动 DevTools。

To upgrade DevTools, upgrade Flutter.
If a newer Dart SDK
(which is included in the Flutter SDK)
includes a newer version of DevTools,
running `dart devtools` automatically launches this version.
If `which dart` points to a Dart SDK _not_
included in your Flutter SDK, updating that
Dart SDK won't update the Flutter version.

你可以通过升级 Flutter 来升级 DevTools。
如果新的 Dart SDK
（包含在 Flutter SDK 中）
包含了新版本的 DevTools，
运行 `dart devtools` 就会自动启动新的版本。
如果 `which dart` 指向的是 **未** 包含在 Flutter SDK 中的 Dart SDK，
则会更新该 Dart SDK，不会更新 Flutter 版本。

When you run DevTools from the command line,
you should see output that looks something like:

在命令行或终端运行 DevTools 时，你会看到类似下方的输出：

```plaintext
Serving DevTools at http://127.0.0.1:9100
```

## Start an application to debug

## 启动一个应用进行 debug

Next, start an app to connect to.
This can be either a Flutter application
or a Dart command-line application.
The command below specifies a Flutter app:

下一步，启动并连接一个 app。可以是 Flutter app 或者一个 Dart 命令行应用。
下面这个命令是启动一个 Flutter app:

```console
cd path/to/flutter/app
flutter run
```

You need to have a device connected, or a simulator open,
for `flutter run` to work. Once the app starts, you'll see a
message in your terminal that looks like the following:

运行 `flutter run` 时，你需要连接一个设备或者模拟器。
当 app 启动后，你会在命令行中看到如下内容：

```console
An Observatory debugger and profiler on macOS is available at:
http://127.0.0.1:52129/QjqebSY4lQ8=/
The Flutter DevTools debugger and profiler on macOS is available at:
http://127.0.0.1:9100?uri=http://127.0.0.1:52129/QjqebSY4lQ8=/
```

Open the DevTools instance connected to your app
by opening the second link in Chrome.

在 Chrome 浏览器中打开第二个链接，
启动链接到你应用的开发者工具实例。

This URL contains a security token, 
so it's different for each run of your app. 
This means that if you stop your application and re-run it, 
you need to connect to DevTools again with the new URL.

这个链接包含一个安全认证的 token，
所以每次启动你的 app 时，链接都会改变。
这意味着如果重启 app 后，
你需要用新的 URL 链接来连接开发者工具。

## Connect to a new app instance

## 链接到一个新的应用实例

If your app stops running
or you opened DevTools manually,
you should see a **Connect** dialog:

如果应用已经停止运行，或者你是手动打开的开发者工具，
你应该可以看到一个 **Connect** 对话框。

![Screenshot of the DevTools connect dialog](/assets/images/docs/tools/devtools/connect_dialog.png){:width="100%"}

You can manually connect DevTools to a new app instance
by copying the Observatory link you got from running your app,
such as `http://127.0.0.1:52129/QjqebSY4lQ8=/`
and pasting it into the connect dialog.

你可以将 Observatory 链接贴入到输入框中，
手动将开发者工具链接到新的应用实例中去，
类似: `http://127.0.0.1:52129/QjqebSY4lQ8=/`。
