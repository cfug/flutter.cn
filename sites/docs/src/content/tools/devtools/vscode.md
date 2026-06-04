---
# title: Run DevTools from VS Code
title: 从 VS Code 运行 DevTools
# description: Learn how to launch and use DevTools from VS Code.
description: 学习如何从 VS Code 启动并使用 DevTools。
ai-translated: true
---

## Add the VS Code extensions

## 添加 VS Code 扩展

To use the DevTools from VS Code, you need the [Dart extension][].
If you're debugging Flutter applications, you should also install
the [Flutter extension][].

要在 VS Code 中使用 DevTools，你需要安装 [Dart extension][]（Dart 扩展）。
如果正在调试 Flutter 应用，还应安装 [Flutter extension][]（Flutter 扩展）。

## Start an application to debug {: #run-and-debug}

## 启动要调试的应用 {: #run-and-debug}

Start a debug session for your application by opening the root
folder of your project (the one containing `pubspec.yaml`)
in VS Code and clicking **Run > Start Debugging** (`F5`).

在 VS Code 中打开项目根目录（包含 `pubspec.yaml` 的文件夹），
点击 **Run > Start Debugging**（运行 > 开始调试）（`F5`），
即可为应用启动调试会话。

## Launch DevTools

## 启动 DevTools

Once the debug session is active and the application has started,
the **Open DevTools** commands become available in the
VS Code command palette (`F1`):

调试会话处于活动状态且应用已启动后，
**Open DevTools**（打开 DevTools）命令会出现在
VS Code 命令面板（`F1`）中：

![Screenshot showing Open DevTools commands](/assets/images/docs/tools/vs-code/vscode_command.png){:width="100%"}

The chosen tool will be opened embedded inside VS Code.

所选工具会在 VS Code 内嵌打开。

![Screenshot showing DevTools embedded in VS Code](/assets/images/docs/tools/vs-code/vscode_embedded.png){:width="100%"}

You can choose to have DevTools always opened
in a browser with the `dart.embedDevTools` setting,
and control whether it opens as a full window or
in a new column next to your current editor with the
`dart.devToolsLocation` setting.

你可以通过 `dart.embedDevTools` 设置让 DevTools 始终在浏览器中打开，
并通过 `dart.devToolsLocation` 设置控制其以全窗口打开，
还是在当前编辑器旁的新列中打开。

A full list of Dart/Flutter settings are available on
[dartcode.org](https://dartcode.org/docs/settings/)
or in the
[VS Code settings editor](https://code.visualstudio.com/docs/getstarted/settings#_settings-editor).
Some recommendation settings for Dart/Flutter in VS Code
can also be found on
[dartcode.org](https://dartcode.org/docs/recommended-settings/).

完整的 Dart/Flutter 设置列表见
[dartcode.org](https://dartcode.org/docs/settings/)，
或在 [VS Code settings editor](https://code.visualstudio.com/docs/getstarted/settings#_settings-editor)（VS Code 设置编辑器）中查看。
VS Code 中 Dart/Flutter 的部分推荐设置也可在
[dartcode.org](https://dartcode.org/docs/recommended-settings/) 找到。

You can also see whether DevTools is running
and launch it in a browser from the language status area
(the `{}` icon next to **Dart** in the status bar).

你也可以在语言状态区域（状态栏中 **Dart** 旁的 `{}` 图标）
查看 DevTools 是否正在运行，并在浏览器中启动它。

![Screenshot showing DevTools in the VS Code language status area](/assets/images/docs/tools/vs-code/vscode_status_bar.png){:width="100%"}

[Dart extension]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code
[Flutter extension]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
