---
# title: Set up and test drive Flutter
title: 配置并体验 Flutter
# shortTitle: Quick start
shortTitle: 快速开始
# description: >-
#   Set up Flutter on your device with a OSS-based editor, such as VS Code, and
#   get started developing your first multi-platform app with Flutter!
description: >-
  使用 VS Code 等基于 OSS 的编辑器在你的设备上配置 Flutter，
  开始开发你的第一个跨平台应用！
showBanner: false
sitemap: false
---

Learn how to use any OSS-based editor, such as VS Code,
to set up your Flutter development environment and
test drive Flutter's developer experience.

了解如何使用任何基于 OSS 的编辑器（如 VS Code）
来配置你的 Flutter 开发环境，
并体验 Flutter 的开发流程。

If you've developed with Flutter before,
or you prefer to use a different editor or IDE,
you can follow the [custom setup instructions][] instead.

如果你之前使用过 Flutter，
或者你更喜欢使用其他编辑器或 IDE，
可以改为按照[自定义配置说明][custom setup instructions]进行操作。

:::note What you'll achieve
:::note 你将完成的内容

- Install the software prerequisites for Flutter.
- Use VS Code to download and install Flutter.
- Create a new Flutter app from a sample template.
- Try out Flutter development features like stateful hot reload.

- 安装 Flutter 所需的软件。
- 使用 VS Code 下载并安装 Flutter。
- 从示例模板创建一个新的 Flutter 应用。
- 体验 Flutter 的开发特性，例如有状态热重载。

:::

[custom setup instructions]: /get-started/custom

## Confirm your development platform {: #dev-platform}

## 确认你的开发平台 {: #dev-platform}

The instructions on this page are configured to cover
installing and trying out Flutter on a **Windows**{:.selected-os-text} device.

本页面的说明介绍了如何在 **Windows**{:.selected-os-text} 设备上
安装和体验 Flutter。

If you'd like to follow the instructions for a different OS,
please select one of the following.

如果你想查看其他操作系统的说明，
请选择以下选项之一。

<OSSelector />

## Download prerequisite software {: #download-prerequisites}

## 下载必备软件 {: #download-prerequisites}

For the smoothest Flutter setup,
first install the following tools.

为了顺利配置 Flutter，
请先安装以下工具。

 1. <h3>Set up Linux support</h3>

    <h3>设置 Linux 支持</h3>

    If you haven't set up Linux support on your Chromebook before,
    [Turn on Linux support][chromeos-linux].

    如果你之前没有在 Chromebook 上设置过 Linux 支持，
    请[开启 Linux 支持][chromeos-linux]。

    If you've already turned on Linux support,
    ensure it's up to date following the
    [Fix problems with Linux][chromeos-linux-update] instructions.

    如果你已经开启了 Linux 支持，
    请按照[修复 Linux 问题][chromeos-linux-update]的说明确保其为最新版本。

 1. <h3>Download and install prerequisite packages</h3>

    <h3>下载并安装必备软件包</h3>

    Using `apt-get` or your preferred installation mechanism,
    install the latest versions of the following packages:

    使用 `apt-get` 或你喜欢的安装方式，
    安装以下软件包的最新版本：

    - `curl`
    - `git`
    - `unzip`
    - `xz-utils`
    - `zip`
    - `libglu1-mesa`

    If you want to use `apt-get`,
    install these packages using the following commands:

    如果你想使用 `apt-get`，
    请使用以下命令安装这些软件包：

    ```console
    $ sudo apt-get update -y && sudo apt-get upgrade -y
    $ sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
    ```

 1. <h3>Download and install Visual Studio Code</h3>

    <h3>下载并安装 Visual Studio Code</h3>

    To quickly install Flutter, then edit and debug your apps,
    [install and set up Visual Studio Code][vscode-install].

    为了快速安装 Flutter 并编辑调试你的应用，
    请[安装并配置 Visual Studio Code][vscode-install]。

    You can instead install and use any other Code OSS-based editor
    that supports VS Code extensions.
    If you choose to do so, for the rest of this article,
    assume VS Code refers to the editor of your choice.

    你也可以安装和使用其他支持 VS Code 扩展的基于 Code OSS 的编辑器。
    如果你选择这样做，在本文的其余部分，
    请将 VS Code 理解为你选择的编辑器。

{: .steps .chromeos-only}

 1. <h3>Install git</h3>

    <h3>安装 git</h3>

    **If you already have git installed, skip to the next
    step: Download and install Visual Studio Code.**

    **如果你已经安装了 git，请跳到下一步：下载并安装 Visual Studio Code。**

    There are a few ways to install git on your Mac,
    but the way we recommend is by using XCode.
    This will be important when you target your
    builds for iOS or macOS.

    在 Mac 上安装 git 有几种方式，
    但我们推荐使用 XCode。
    当你的构建目标是 iOS 或 macOS 时，这一点很重要。

    ```console
    $ xcode-select --install
    ```

    If you haven't installed the tools already,
    a dialog should open that confirms you'd like to install them.
    Click **Install**, then once the installation is complete, click **Done**.

    如果你之前没有安装过这些工具，
    会弹出一个对话框确认你是否要安装。
    点击 **Install**，安装完成后点击 **Done**。

 1. <h3>Download and install Visual Studio Code</h3>

    <h3>下载并安装 Visual Studio Code</h3>

    To quickly install Flutter, then edit and debug your apps,
    [install and set up Visual Studio Code][vscode-install].

    为了快速安装 Flutter 并编辑调试你的应用，
    请[安装并配置 Visual Studio Code][vscode-install]。

    You can instead install and use any other Code OSS-based editor
    that supports VS Code extensions.
    If you choose to do so, for the rest of this article,
    assume VS Code refers to the editor of your choice.

    你也可以安装和使用其他支持 VS Code 扩展的基于 Code OSS 的编辑器。
    如果你选择这样做，在本文的其余部分，
    请将 VS Code 理解为你选择的编辑器。

{: .steps .macos-only}

 1. <h3>Install Git for Windows</h3>

    <h3>安装 Git for Windows</h3>

    Download and install the latest version of [Git for Windows][].

    下载并安装最新版本的 [Git for Windows][]。

    For help installing or troubleshooting Git,
    reference the [Git documentation][git-install].

    如需安装帮助或排查 Git 问题，
    请参阅 [Git 文档][git-install]。

 1. <h3>Download and install Visual Studio Code</h3>

    <h3>下载并安装 Visual Studio Code</h3>

    To quickly install Flutter, then edit and debug your apps,
    [install and set up Visual Studio Code][vscode-install].

    为了快速安装 Flutter 并编辑调试你的应用，
    请[安装并配置 Visual Studio Code][vscode-install]。

    You can instead install and use any other Code OSS-based editor
    that supports VS Code extensions.
    If you choose to do so, for the rest of this article,
    assume VS Code refers to the editor of your choice.

    你也可以安装和使用其他支持 VS Code 扩展的基于 Code OSS 的编辑器。
    如果你选择这样做，在本文的其余部分，
    请将 VS Code 理解为你选择的编辑器。

{: .steps .windows-only}

 1. <h3>Download and install prerequisite packages</h3>

    <h3>下载并安装必备软件包</h3>

    Using your preferred package manager or mechanism,
    install the latest versions of the following packages:

    使用你喜欢的包管理器或安装方式，
    安装以下软件包的最新版本：

    - `curl`
    - `git`
    - `unzip`
    - `xz-utils`
    - `zip`
    - `libglu1-mesa`

    On Debian-based distros with `apt-get`, such as Ubuntu,
    install these packages using the following commands:

    在使用 `apt-get` 的基于 Debian 的发行版（如 Ubuntu）上，
    请使用以下命令安装这些软件包：

    ```console
    $ sudo apt-get update -y && sudo apt-get upgrade -y
    $ sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
    ```

 1. <h3>Download and install Visual Studio Code</h3>

    <h3>下载并安装 Visual Studio Code</h3>

    To quickly install Flutter, then edit and debug your apps,
    [install and set up Visual Studio Code][vscode-install].

    为了快速安装 Flutter 并编辑调试你的应用，
    请[安装并配置 Visual Studio Code][vscode-install]。

    You can instead install and use any other Code OSS-based editor
    that supports VS Code extensions.
    If you choose to do so, for the rest of this article,
    assume VS Code refers to the editor of your choice.

    你也可以安装和使用其他支持 VS Code 扩展的基于 Code OSS 的编辑器。
    如果你选择这样做，在本文的其余部分，
    请将 VS Code 理解为你选择的编辑器。

{: .steps .linux-only}

[chromeos-linux]: https://support.google.com/chromebook/answer/9145439
[chromeos-linux-update]: https://support.google.com/chromebook/answer/9145439?hl=en#:~:text=Fix%20problems%20with%20Linux
[Git for Windows]: https://git-scm.com/downloads/win
[git-install]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[vscode-install]: https://code.visualstudio.com/docs/setup/setup-overview

## Install and set up Flutter {: #install}

## 安装并配置 Flutter {: #install}

Now that you've installed Git and VS Code,
follow these steps to use VS Code to install and set up Flutter.

既然你已经安装了 Git 和 VS Code，
请按照以下步骤使用 VS Code 安装并配置 Flutter。

:::note Download manually
:::note 手动下载

If you prefer to manually install Flutter,
follow the instructions in [Install Flutter manually][].

如果你更喜欢手动安装 Flutter，
请按照[手动安装 Flutter][Install Flutter manually]中的说明操作。

:::

 1. <h3>Launch VS Code</h3>

    <h3>启动 VS Code</h3>

    If not already open, open VS Code by searching for it with Spotlight
    or opening it manually from the directory where it's installed.

    如果尚未打开，可以使用 Spotlight 搜索 VS Code，
    或从安装目录手动打开。

 1. <h3>Add the Flutter extension to VS Code</h3>

    <h3>为 VS Code 添加 Flutter 扩展</h3>

    To add the Dart and Flutter extensions to VS Code,
    visit the [Flutter extension's marketplace page][flutter-vscode],
    then click **Install**.
    If prompted by your browser, allow it to open VS Code.

    要为 VS Code 添加 Dart 和 Flutter 扩展，
    请访问 [Flutter 扩展的商店页面][flutter-vscode]，
    然后点击 **Install**。
    如果浏览器提示，请允许其打开 VS Code。

 1. <h3>Install Flutter with VS Code</h3>

    <h3>使用 VS Code 安装 Flutter</h3>

    1. Open the command palette in VS Code.

       在 VS Code 中打开命令面板。

       Go to **View** <span aria-label="and then">></span> **Command Palette**
       or press <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>.

       转到 **View** <span aria-label="and then">></span> **Command Palette**
       或按 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. In the command palette, type `flutter`.

       在命令面板中输入 `flutter`。

    1. Select **Flutter: New Project**.

       选择 **Flutter: New Project**。

    1. VS Code prompts you to locate the Flutter SDK on your computer.
       Select **Download SDK**.

       VS Code 会提示你在计算机上定位 Flutter SDK。
       选择 **Download SDK**。

    1. When the **Select Folder for Flutter SDK** dialog displays,
       choose where you want to install Flutter.

       当 **Select Folder for Flutter SDK** 对话框出现时，
       选择你想要安装 Flutter 的位置。

    1. Click **Clone Flutter**.

       点击 **Clone Flutter**。

       While downloading Flutter, VS Code displays this pop-up notification:

       下载 Flutter 时，VS Code 会显示以下弹出通知：

       ```console
       Downloading the Flutter SDK. This may take a few minutes.
       ```

       This download takes a few minutes.
       If you suspect that the download has hung, click **Cancel** then
       start the installation again.

       下载需要几分钟时间。
       如果你怀疑下载已卡住，请点击 **Cancel**，然后重新开始安装。

    1. Click **Add SDK to PATH**.

       点击 **Add SDK to PATH**。

       When successful, a notification displays:

       成功后会显示以下通知：

       ```console
       The Flutter SDK was added to your PATH
       ```

    1. VS Code might display a Google Analytics notice.

       VS Code 可能会显示 Google Analytics 通知。

       If you agree, click **OK**.

       如果你同意，请点击 **OK**。

    1. To ensure that Flutter is available in all terminals:

       为确保 Flutter 在所有终端中可用：

       1. Close, then reopen all terminal windows.

          关闭并重新打开所有终端窗口。

       1. Restart VS Code.

          重启 VS Code。

       {:type="a"}

 1. <h3>Troubleshoot installation issues</h3>

    <h3>排查安装问题</h3>

    If you encounter any issues during installation,
    check out [Flutter installation troubleshooting][troubleshoot].

    如果你在安装过程中遇到任何问题，
    请查看 [Flutter 安装故障排查][troubleshoot]。

{:.steps}

[Install Flutter manually]: /install/manual
[flutter-vscode]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[troubleshoot]: /install/troubleshoot

## Test drive Flutter {: #test-drive}

## 体验 Flutter {: #test-drive}

Now that you've set up VS Code and Flutter,
it's time to create an app and try out Flutter development!

既然你已经配置好了 VS Code 和 Flutter，
现在是时候创建一个应用并体验 Flutter 开发了！

 1. <h3>Create a new Flutter app</h3>

    <h3>创建一个新的 Flutter 应用</h3>

    1. Open the command palette in VS Code.

       在 VS Code 中打开命令面板。

       Go to **View** <span aria-label="and then">></span> **Command Palette**
       or press <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>.

       转到 **View** <span aria-label="and then">></span> **Command Palette**
       或按 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. In the command palette, start typing `flutter:`.

       在命令面板中，开始输入 `flutter:`。

       VS Code should surface commands from the Flutter plugin.

       VS Code 应该会显示来自 Flutter 插件的命令。

    1. Select the **Flutter: New Project** command.

       选择 **Flutter: New Project** 命令。

       Your OS or VS Code might ask for access to your documents,
       agree to continue to the next step.

       你的操作系统或 VS Code 可能会请求访问你的文档，
       同意后继续下一步。

    1. Choose the **Application** template.

       选择 **Application** 模板。

       VS Code should prompt you with **Which Flutter template?**.
       Choose **Application** to bootstrap a simple counter app.

       VS Code 会提示你 **Which Flutter template?**。
       选择 **Application** 来创建一个简单的计数器应用。

    1. Create or select the parent directory for your new app's folder.

       创建或选择新应用文件夹的父目录。

       A file dialog should appear.

       应该会出现一个文件对话框。

       1. Select or create the parent directory where
          you want the project to be created.

          选择或创建你想要创建项目的父目录。

       1. To confirm your selection,
          click **Select a folder to create the project in**.

          要确认你的选择，
          请点击 **Select a folder to create the project in**。

    1. Enter a name for your app.

       为你的应用输入一个名称。

       VS Code should prompt you to enter a name for your new app.
       Enter `trying_flutter` or a similar `lowercase_with_underscores` name.
       To confirm your selection, press <kbd>Enter</kbd>.

       VS Code 会提示你为新应用输入名称。
       输入 `trying_flutter` 或类似的 `lowercase_with_underscores` 格式名称。
       要确认你的选择，请按 <kbd>Enter</kbd>。

    1. Wait for project initialization to complete.

       等待项目初始化完成。

       Task progress is often surfaced as a notification in the bottom right
       and can also be accessed from the **Output** panel.

       任务进度通常会在右下角显示为通知，
       也可以从 **Output** 面板查看。

    1. Open the `lib` directory, then the `main.dart` file.

       打开 `lib` 目录，然后打开 `main.dart` 文件。

       If you're curious about what each portion of the code does,
       check out the preceding comments throughout the file.

       如果你对代码的每个部分的作用感到好奇，
       请查看文件中的注释。

 1. <h3>Run your app on the web</h3>

    <h3>在 Web 上运行你的应用</h3>

    While Flutter apps can run on many platforms,
    try running your new app on the web.

    虽然 Flutter 应用可以在多个平台上运行，
    但先尝试在 Web 上运行你的新应用。

    1. Open the command palette in VS Code.

       在 VS Code 中打开命令面板。

       Go to **View** <span aria-label="and then">></span> **Command Palette**
       or press <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>.

       转到 **View** <span aria-label="and then">></span> **Command Palette**
       或按 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. In the command palette, start typing `flutter:`.

       在命令面板中，开始输入 `flutter:`。

       VS Code should surface commands from the Flutter plugin.

       VS Code 应该会显示来自 Flutter 插件的命令。

    1. Select the **Flutter: Select Device** command.

       选择 **Flutter: Select Device** 命令。

    1. From the **Select Device** prompt, select **Chrome**.

       在 **Select Device** 提示中，选择 **Chrome**。

    1. Run or start debugging your app.

       运行或开始调试你的应用。

       Go to **Run** <span aria-label="and then">></span>
       **Start Debugging** or press <kbd>F5</kbd>.

       转到 **Run** <span aria-label="and then">></span>
       **Start Debugging** 或按 <kbd>F5</kbd>。

       `flutter run` is used to build and start your app,
       then a new instance of Chrome should open and
       start running your newly created app.

       `flutter run` 用于构建和启动你的应用，
       然后会打开一个新的 Chrome 实例并开始运行你新创建的应用。

 1. <h3>Try hot reload</h3>

    <h3>尝试热重载</h3>

    Flutter offers a fast development cycle with **stateful hot reload**,
    the ability to reload the code of a live running app without
    restarting or losing app state.

    Flutter 通过**有状态热重载**提供快速的开发周期，
    它可以在不重启或丢失应用状态的情况下重新加载正在运行的应用代码。

    You can change your app's source code,
    run the hot reload command in VS Code,
    then see the change in your running app.

    你可以更改应用的源代码，
    在 VS Code 中运行热重载命令，
    然后在运行中的应用中查看更改。

    1. In the running app, try adding to the counter a few times by
       clicking the ![increment (+)][increment-button]{: .text-icon} button.

       在运行的应用中，尝试通过点击
       ![增加 (+)][increment-button]{: .text-icon} 按钮来增加计数器的值几次。

    1. With your app still running, make a change in the `lib/main.dart` file.

       在应用仍在运行的情况下，修改 `lib/main.dart` 文件。

       Change the `_counter++` line in the `_incrementCounter` method
       to instead decrement the `_counter` field.

       将 `_incrementCounter` 方法中的 `_counter++` 行改为递减 `_counter` 字段。

       ```dart diff
         setState(() {
           // ...
       -   _counter++;
       +   _counter--;
         });
       ```

    1. Save your changes
       (**File** <span aria-label="and then">></span> **Save All**) or
       click the **Hot Reload** ![hot reload icon][]{: .text-icon} button.

       保存你的更改（**File** <span aria-label="and then">></span> **Save All**）
       或点击 **Hot Reload** ![热重载图标][hot reload icon]{: .text-icon} 按钮。

       Flutter updates the running app without losing any existing state.
       Notice the existing value stayed the same.

       Flutter 会在不丢失任何现有状态的情况下更新正在运行的应用。
       注意现有的值保持不变。

    1. Try clicking the
       ![increment (+)][increment-button]{: .text-icon} button again.
       Notice the value decreases instead of increases.

       尝试再次点击 ![增加 (+)][increment-button]{: .text-icon} 按钮。
       注意值现在是递减而不是递增。

 1. <h3>Explore the Flutter sidebar</h3>

    <h3>探索 Flutter 侧边栏</h3>

    The Flutter plugin adds a dedicated sidebar to VS Code
    for managing Flutter debug sessions and devices,
    viewing an outline of your code and widgets,
    as well as accessing the Dart and Flutter DevTools.

    Flutter 插件为 VS Code 添加了一个专用侧边栏，
    用于管理 Flutter 调试会话和设备、
    查看代码和 widget 的大纲，
    以及访问 Dart 和 Flutter DevTools。

    1. If your app isn't running, start debugging it again.

       如果你的应用没有在运行，请重新开始调试。

       Go to **Run** <span aria-label="and then">></span>
       **Start Debugging** or press <kbd>F5</kbd>.

       转到 **Run** <span aria-label="and then">></span>
       **Start Debugging** 或按 <kbd>F5</kbd>。

    1. Open the Flutter sidebar in VS Code.

       在 VS Code 中打开 Flutter 侧边栏。

       Either open it with the Flutter ![Flutter logo][]{: .text-icon} button in
       the VS Code sidebar or open it from the command palette by
       running the **Flutter: Focus on Flutter Sidebar View** command.

       可以通过 VS Code 侧边栏中的 Flutter ![Flutter 标志][Flutter logo]{: .text-icon} 按钮打开，
       也可以通过命令面板运行 **Flutter: Focus on Flutter Sidebar View** 命令来打开。

    1. In the Flutter sidebar, under **DevTools**,
       click the **Flutter Inspector** button.

       在 Flutter 侧边栏中的 **DevTools** 下，
       点击 **Flutter Inspector** 按钮。

       A separate **Widget Inspector** panel should open in VS Code.

       VS Code 中应该会打开一个单独的 **Widget Inspector** 面板。

       In the widget inspector, you can view your app's widget tree,
       view the properties and layout of each widget, and more.

       在 widget 检查器中，你可以查看应用的 widget 树、
       查看每个 widget 的属性和布局等。

    1. In the widget inspector, try clicking the top-level `MyHomePage` widget.

       在 widget 检查器中，尝试点击顶层的 `MyHomePage` widget。

       A view of its properties and layout should open, and
       the VS Code editor should navigate to and focus the line where
       the widget was included.

       应该会打开其属性和布局的视图，
       VS Code 编辑器应该会导航到并聚焦包含该 widget 的那一行。

    1. Explore and try out other features in
       the widget inspector and Flutter sidebar.

       探索并尝试 widget 检查器和 Flutter 侧边栏中的其他功能。

{:.steps}

[increment-button]: /assets/images/docs/get-started/increment-button.png
[hot reload icon]: /assets/images/docs/get-started/hot-reload.svg
[Flutter logo]: /assets/images/branding/flutter/logo/square.svg

## Continue your Flutter journey {: #next-steps}

## 继续你的 Flutter 之旅 {: #next-steps}

**Congratulations!**
Now that you've installed and tried out Flutter,
follow the codelab on [Building your first app][],
set up development for an [additional target platform][], or
explore some of these resources to continue your Flutter learning journey.

**恭喜！**
现在你已经安装并体验了 Flutter，
可以按照[构建你的第一个应用][Building your first app]的 codelab 继续学习，
为[其他目标平台][additional target platform]配置开发环境，
或者探索以下资源继续你的 Flutter 学习之旅。

{% render "docs/get-started/setup-next-steps.html", site: site %}

[Building your first app]: /get-started/codelab
[additional target platform]: /platform-integration#setup
