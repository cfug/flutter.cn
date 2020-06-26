---
title: Install and run DevTools from VS Code
title: 在 VS Code 里安装和使用开发者工具
description: Learn how to install and use DevTools from VS Code.
description: 学习如何在 VS Code 里使用开发者工具。
---

## Install the VS Code extensions

## 安装 VS Code 插件

To use the DevTools from VS Code, you need the [Dart extension][].
If you're debugging Flutter applications, you should also install
the [Flutter extension][].

如果你想在 VS Code 中使用开发工具，你就一定需要安装 [Dart 扩展][Dart extension]。
如果你还想要调试 Flutter 应用程序，那你还应该安装 [Flutter 扩展][Flutter extension]。

## Start an application to debug

## 进行调试应用程序

Start a debug session for your application by opening the root
folder of your project (the one containing `pubspec.yaml`)
in VS Code and clicking **Debug > Start Debugging** (`F5`).

通过在 VS Code 中打开你的项目的根目录
（包含 `pubspec.yaml`）并点击 **Debug > Debugging** (`F5`)，
来开启调试会话。

## Launch DevTools

## 启动开发工具

Once the debug session is active and the application has started,
the **Dart: Open DevTools** command becomes available in the
VS Code command palette:

一旦调试会话处于活跃且应用程序已开启，那么 VS Code 命令控制板中将会显示 **Dart: Open DevTools**：

![Screenshot showing Open DevTools command]({% asset tools/vs-code/vscode_command.png @path %}){:width="100%"}

The first time you run this (and subsequently when the DevTools package
is updated), you are prompted to activate or upgrade DevTools.

当你第一次运行时（以及未来更新开发工具包时），系统会提醒你激活或升级开发工具。

![Screenshot showing Active DevTools command]({% asset tools/vs-code/vscode_install_prompt.png @path %}){:width="100%"}

Clicking the **Open** button uses `pub global activate` to activate
the DevTools package for you. Next, DevTools launches in your browser and
automatically connects to your debug session.

接下来，开发工具将会在浏览器中启动，并自动连接至你的调试会话。

![Screenshot showing DevTools in a browser]({% asset tools/vs-code/vscode_show_in_browser.png @path %}){:width="100%"}

While DevTools is active, you'll see them in the status bar
of VS Code. If you've closed the browser tab,
you can click the status bar to re-launch your browser, so long
as there's still a suitable Dart/Flutter debugging session available.

当开发工具激活后，你将可以在 VS Code 的状态栏中看到它们。
如果你已关闭浏览器选项卡，只要还有可用的 Dart/Flutter 调试会话，
你也可以通过单击状态栏来重新启动浏览器。

![Screenshot showing DevTools in the VS Code status bar]({% asset tools/vs-code/vscode_status_bar.png @path %}){:width="100%"}

[Dart extension]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code
[Flutter extension]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
