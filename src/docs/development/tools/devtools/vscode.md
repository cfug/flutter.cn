---
title: Install and run DevTools from VS Code
title: 在 VS Code 里安装和使用开发者工具
description: Learn how to install and use DevTools from VS Code.
description: 学习如何在 VS Code 里使用开发者工具。
---

## 安装 VS Code 插件

如果您想在 VS Code 中使用开发工具，您就一定需要安装 [Dart 扩展][]。
如果您还想要调试 Flutter 应用程序，那您还应该安装 [Flutter 扩展][]。

## 进行调试应用程序

通过在 VS Code 中打开您项目的根目录（包含 `pubspec.yaml`）并点击**Debug > Debugging** (`F5`)，来开启调试会话。

## 启动开发工具

一旦调试会话处于活跃且应用程序已开启，那么 VS Code 命令控制板中将会显示**Dart: Open DevTools**：

![Screenshot showing Open DevTools command]({% asset tools/vs-code/vscode_command.png @path %}){:width="100%"}

当您第一次运行时（以及未来更新开发工具包时），系统会提醒您激活或升级开发工具。

![Screenshot showing Active DevTools command]({% asset tools/vs-code/vscode_install_prompt.png @path %}){:width="100%"}
<br><center>点击 <b>激活/更新</b> 按钮来使用<code>全局激活</code>为您激活开发工具包</center>

接下来，开发工具将会在浏览器中启动，并自动连接至您的调试会话。

![Screenshot showing DevTools in a browser]({% asset tools/vs-code/vscode_show_in_browser.png @path %}){:width="100%"}

当开发工具激活后，您将在 VS Code 的状态栏中看到它们。如果您已关闭浏览器选项卡，也可以通过单击状态栏来重新启动浏览器，只要还有可用的 Dart/Flutter 调试会话。

![Screenshot showing DevTools in the VS Code status bar]({% asset tools/vs-code/vscode_status_bar.png @path %}){:width="100%"}

[Dart extension]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code
[Flutter extension]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
