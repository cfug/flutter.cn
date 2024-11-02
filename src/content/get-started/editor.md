---
# title: Set up an editor
title: 编辑工具设定
# description: Configuring an IDE for Flutter.
description: 为 Flutter 配置 IDE 环境。
tags: Flutter安装,Flutter起步教程
keywords: Flutter编辑工具,IDE配置
prev:
#   title: Set up Flutter
  title: 安装和环境配置
  path: /get-started/install
next:
#   title: Create your first app
  title: 编写你的第一个应用
  path: /get-started/codelab
toc: false
---

You can build apps with Flutter using any text editor or
integrated development environment (IDE)
combined with Flutter's command-line tools.
The Flutter team recommends using an editor that supports
a Flutter extension or plugin, like VS Code and Android Studio.
These plugins provide code completion, syntax highlighting,
widget editing assists, run & debug support, and more.

你可以使用任意文本编辑器，结合我们的命令行工具来开发 Flutter 应用。
Flutter 团队推荐使用支持 Flutter 插件的编辑器，以获取更好的开发体验。
这些插件提供了代码补全、代码高亮、widget 辅助编辑的功能，
以及为项目的运行和调试提供支持等。

You can add a supported plugin for Visual Studio Code,
Android Studio, or IntelliJ IDEA Community, Educational,
and Ultimate editions.
The [Flutter plugin][] _only_ works with
Android Studio and the listed editions of IntelliJ IDEA.

你可以为 Visual Studio Code、Android Studio 以及 
IntelliJ IDEA（Community、Educational、Ultimate 版）
添加编辑器支持的插件。
[Flutter 插件][Flutter plugin] **仅** 适用于 
Android Studio 和 IntelliJ IDEA 所列的版本。

(The [Dart plugin][] supports eight additional JetBrains IDEs.)

（[Dart 插件][Dart plugin] 支持另外八个 JetBrains IDE。）

[Flutter plugin]: https://plugins.jetbrains.com/plugin/9212-flutter
[Dart plugin]: https://plugins.jetbrains.com/plugin/6351-dart

Follow these procedures to add the Flutter plugin to VS Code,
Android Studio, or IntelliJ.

参考以下步骤为 VS Code、Android Studio 或者 IntelliJ 添加编辑器插件。

If you choose another IDE, skip ahead
to [Write your first Flutter app][].

如果你想使用其他的编辑器，请前往
[编写你的第一个 Flutter 应用][Write your first Flutter app]。

[Write your first Flutter app]: /get-started/codelab

{% tabs %}
{% tab "Visual Studio Code" %}

## Install VS Code

## 安装 VS Code

[VS Code][] is a code editor to build and debug apps.
With the Flutter extension installed, you can compile, deploy, and debug
Flutter apps.

[VS Code][] 是一个可以运行和调试 Flutter 的编辑器。
安装 Flutter 插件后，你可以编译、部署及调试 Flutter 应用。

To install the latest version of VS Code,
follow Microsoft's instructions for the relevant platform:

请参考 Microsoft 针对不同平台的安装指引来安装最新版本的 VS Code：

- [Install on macOS][]
- [Install on Windows][]
- [Install on Linux][]

[VS Code]: https://code.visualstudio.com/
[Install on macOS]: https://code.visualstudio.com/docs/setup/mac
[Install on Windows]: https://code.visualstudio.com/docs/setup/windows
[Install on Linux]: https://code.visualstudio.com/docs/setup/linux

## Install the VS Code Flutter extension

## 安装 VS Code 的 Flutter 扩展

1. Start **VS Code**.

   打开 **VS Code**。

1. Open a browser and go to the [Flutter extension][] page
   on the Visual Studio Marketplace.

   打开浏览器，访问市场的 [Flutter 插件][Flutter extension] 页面。

1. Click **Install**.
   Installing the Flutter extension also installs the Dart extension.

   点击 **Install**，安装 Flutter 与 Dart 依赖。

[Flutter extension]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter

## Validate your VS Code setup

## 验证 VS Code 的设置

1. Go to **View** <span aria-label="and then">></span>
   **Command Palette...**.

   打开 **查看 (View)** <span aria-label="and then">></span> **命令面板 (Command Palette...)**。

   You can also press <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> +
   <kbd>Shift</kbd> + <kbd>P</kbd>.

   你也可以按下 <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> +
   <kbd>Shift</kbd> + <kbd>P</kbd>。

1. Type `doctor`.

   输入 `doctor`。

1. Select **Flutter: Run Flutter Doctor**.

   选择 **Flutter: Run Flutter Doctor**。

   Once you select this command, VS Code does the following.

   选择该指令后，VS Code 会执行以下操作。

   - Opens the **Output** panel.

     打开 **输出 (Output)** 面板。

   - Displays **flutter (flutter)** in the dropdown on the upper right
     of this panel.

     在此面板右上方的下拉菜单中选择 **flutter (flutter)**。

   - Displays the output of Flutter Doctor command.

     显示 Flutter Doctor 指令的输出内容。

{% endtab %}
{% tab "Android Studio 或 IntelliJ" %}

## Install Android Studio or IntelliJ IDEA

## 安装 Android Studio 或 IntelliJ IDEA

Android Studio and IntelliJ IDEA offer a complete,
IDE experience once you install the Flutter plugin.

Android Studio 和 IntelliJ IDEA
为 Flutter 提供了一个完整的集成开发环境。

To install the latest version of the following IDEs, follow their instructions:

你可以按照以下指引安装对应 IDE 的最新版本：

- [Android Studio][]
- [IntelliJ IDEA Community][]
- [IntelliJ IDEA Ultimate][]

[Android Studio]: {{site.android-dev}}/studio/install
[IntelliJ IDEA Community]: https://www.jetbrains.com/idea/download/
[IntelliJ IDEA Ultimate]: https://www.jetbrains.com/idea/download/

## Install the Flutter plugin

## 安装 Flutter 和 Dart 插件

The installation instructions vary by platform.

请参考下面不同平台的安装指南：

### macOS

Use the following instructions for macOS:

安装过程如下：

1. Start Android Studio or IntelliJ.

   打开 Android Studio 或 IntelliJ。

1. From the macOS menu bar, go to **Android Studio** (or **IntelliJ**)
   <span aria-label="and then">></span> **Settings...**.

   从 macOS 的菜单栏中打开插件设置。

   You can also press <kbd>Cmd</kbd> + <kbd>,</kbd>.

   你也可以按下 <kbd>Cmd</kbd> + <kbd>,</kbd>。

   The **Preferences** dialog opens.

   **Preferences** 弹窗会打开。

1. From the list at the left, select **Plugins**.

   在左侧列表中选择 **Plugins**。

1. From the top of this panel, select **Marketplace**.

   在面板的上方选择 **Marketplace**。

1. Type `flutter` in the plugins search field.

   在搜索框中输入 `flutter`。

1. Select the **Flutter** plugin.

   选择 **Flutter** 插件。

1. Click **Install**.

   点击 **Install** 安装。

1. Click **Yes** when prompted to install the plugin.

   提示安装时点击确认。如果提示同时安装 Dart 插件也点击确认。

1. Click **Restart** when prompted.

   当弹出重新启动提示时，点击 **Restart**。

### Linux or Windows

### Linux 或者 Windows 平台

Use the following instructions for Linux or Windows:

参考使用下面介绍的步骤：

1. Go to **File** <span aria-label="and then">></span>
   **Settings**.

   打开 **File** <span aria-label="and then">></span>
   **Settings**。

   You can also press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> +
   <kbd>S</kbd>.

   你也可以按下 <kbd>Cmd</kbd> + <kbd>,</kbd>。

   The **Preferences** dialog opens.

   **Preferences** 弹窗会打开。

1. From the list at the left, select **Plugins**.

   在左侧列表中选择 **Plugins**。

1. From the top of this panel, select **Marketplace**.

   在面板的上方选择 **Marketplace**。

1. Type `flutter` in the plugins search field.

   在搜索框中输入 `flutter`。

1. Select the **Flutter** plugin.

   选择 **Flutter** 插件。

1. Click **Install**.

   点击 **Install** 安装。

1. Click **Yes** when prompted to install the plugin.

   提示安装时点击确认。如果提示同时安装 Dart 插件也点击确认。

1. Click **Restart** when prompted.

   当弹出重新启动提示时，点击 **Restart**。

{% endtab %}
{% endtabs %}
