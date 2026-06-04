---
# title: Install Flutter using VS Code
title: 使用 VS Code 安装 Flutter
# shortTitle: Install with VS Code
shortTitle: 使用 VS Code 安装
# breadcrumb: With VS Code
breadcrumb: 使用 VS Code
# description: >-
#   Learn how to use VS Code to quickly install and set up the Flutter SDK.
description: 了解如何使用 VS Code 快速安装并配置 Flutter SDK。
ai-translated: true
---

Learn how to install and set up Flutter in a Code OSS-based editor.
This includes (but is not limited to),
[VS Code][], [Antigravity][], [Cursor][], and [Windsurf][].

了解如何在基于 Code OSS 的编辑器中安装并配置 Flutter。
包括但不限于
[VS Code][]、[Antigravity][]、[Cursor][] 和 [Windsurf][]。

[VS Code]: https://code.visualstudio.com
[Antigravity]: https://antigravity.google/
[Cursor]: https://cursor.com/
[Windsurf]: https://windsurf.com/

:::tip
If you've never set up or developed an app with Flutter before,
follow [Set up and test drive Flutter][] instead.

如果你从未使用 Flutter 配置或开发过应用，
请先按照 [设置并试跑 Flutter][Set up and test drive Flutter] 进行操作。
:::

[Set up and test drive Flutter]: /install/quick

## Choose your development platform {: #dev-platform}

## 选择你的开发平台

The instructions on this page are configured to cover
installing Flutter on a **Windows**{:.selected-os-text} device.

本页说明默认针对在 **Windows**{:.selected-os-text} 设备上安装 Flutter。

If you'd like to follow the instructions for a different OS,
please select one of the following.

若要查看其他操作系统的说明，
请选择以下选项之一。

<OSSelector />

## Download prerequisite software {: #download-prerequisites}

## 下载必备软件

For the smoothest Flutter setup,
first install the following tools.

为了最顺畅地完成 Flutter 配置，
请先安装以下工具。

 1. <h3>Set up Linux support</h3>
    <h3>配置 Linux 支持</h3>

    If you haven't set up Linux support on your Chromebook before,
    [Turn on Linux support][chromeos-linux].

    若你此前未在 Chromebook 上配置 Linux 支持，
    请参阅 [开启 Linux 支持][chromeos-linux]。

    If you've already turned on Linux support,
    ensure it's up to date following the
    [Fix problems with Linux][chromeos-linux-update] instructions.

    若你已开启 Linux 支持，
    请按照 [修复 Linux 相关问题][chromeos-linux-update] 的说明确保其为最新状态。

 1. <h3>Download and install prerequisite packages</h3>
    <h3>下载并安装必备 package</h3>

    Using `apt-get` or your preferred installation mechanism,
    install the latest versions of the following packages:

    使用 `apt-get` 或你偏好的安装方式，
    安装以下 package 的最新版本：

    - `curl`
    - `git`
    - `unzip`
    - `xz-utils`
    - `zip`
    - `libglu1-mesa`

    If you want to use `apt-get`,
    install these packages using the following commands:

    若要使用 `apt-get`，
    请使用以下命令安装这些 package：

    ```console
    $ sudo apt-get update -y && sudo apt-get upgrade -y
    $ sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
    ```

 1. <h3>Download and install Visual Studio Code</h3>
    <h3>下载并安装 Visual Studio Code</h3>

    To quickly install Flutter, then edit and debug your apps,
    [install and set up Visual Studio Code][vscode-install].

    要快速安装 Flutter 并编辑、调试你的应用，
    请 [安装并配置 Visual Studio Code][vscode-install]。

{: .steps .chromeos-only}

 1. <h3>Install the Xcode command-line tools</h3>
    <h3>安装 Xcode 命令行工具</h3>

    Download the Xcode command-line tools to get access to
    the command-line tools that Flutter relies on, including Git.

    下载 Xcode 命令行工具以获取 Flutter 依赖的命令行工具（包括 Git）。

    To download the tools, run the following command in your preferred terminal:

    要下载这些工具，请在你偏好的终端中运行以下命令：

    ```console
    $ xcode-select --install
    ```

    If you haven't installed the tools already,
    a dialog should open that confirms you'd like to install them.
    Click **Install**, then once the installation is complete, click **Done**.

    若你尚未安装这些工具，
    应会弹出对话框确认你是否要安装。
    点击 **Install**，安装完成后点击 **Done**。

 1. <h3>Download and install Visual Studio Code</h3>
    <h3>下载并安装 Visual Studio Code</h3>

    To quickly install Flutter, then edit and debug your apps,
    [install and set up Visual Studio Code][vscode-install].

    要快速安装 Flutter 并编辑、调试你的应用，
    请 [安装并配置 Visual Studio Code][vscode-install]。

{: .steps .macos-only}

 1. <h3>Install Git for Windows</h3>
    <h3>为 Windows 安装 Git</h3>

    Download and install the latest version of [Git for Windows][].

    下载并安装最新版本的 [Git for Windows][]。

    For help installing or troubleshooting Git,
    reference the [Git documentation][git-install].

    有关安装或排查 Git 问题的帮助，
    请参阅 [Git 文档][git-install]。

 1. <h3>Download and install Visual Studio Code</h3>
    <h3>下载并安装 Visual Studio Code</h3>

    To quickly install Flutter, then edit and debug your apps,
    [install and set up Visual Studio Code][vscode-install].

    要快速安装 Flutter 并编辑、调试你的应用，
    请 [安装并配置 Visual Studio Code][vscode-install]。

{: .steps .windows-only}

 1. <h3>Download and install prerequisite packages</h3>
    <h3>下载并安装必备 package</h3>

    Using your preferred package manager or mechanism,
    install the latest versions of the following packages:

    使用你偏好的 package 管理器或安装方式，
    安装以下 package 的最新版本：

    - `curl`
    - `git`
    - `unzip`
    - `xz-utils`
    - `zip`
    - `libglu1-mesa`

    On Debian-based distros with `apt-get`, such as Ubuntu,
    install these packages using the following commands:

    在基于 Debian 且使用 `apt-get` 的发行版（例如 Ubuntu）上，
    请使用以下命令安装这些 package：

    ```console
    $ sudo apt-get update -y && sudo apt-get upgrade -y
    $ sudo apt-get install -y curl git unzip xz-utils zip libglu1-mesa
    ```

 1. <h3>Download and install Visual Studio Code</h3>
    <h3>下载并安装 Visual Studio Code</h3>

    To quickly install Flutter, then edit and debug your apps,
    [install and set up Visual Studio Code][vscode-install].

    要快速安装 Flutter 并编辑、调试你的应用，
    请 [安装并配置 Visual Studio Code][vscode-install]。

{: .steps .linux-only}

[chromeos-linux]: https://support.google.com/chromebook/answer/9145439
[chromeos-linux-update]: https://support.google.com/chromebook/answer/9145439?hl=en#:~:text=Fix%20problems%20with%20Linux
[Git for Windows]: https://git-scm.com/downloads/win
[git-install]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[vscode-install]: https://code.visualstudio.com/docs/setup/setup-overview

## Install and set up Flutter {: #install-flutter}

## 安装并配置 Flutter

Now that you've installed Git and VS Code,
follow these steps to use VS Code to install and set up Flutter.

现在你已经安装了 Git 和 VS Code，
请按照以下步骤使用 VS Code 安装并配置 Flutter。

 1. <h3>Launch VS Code</h3>
    <h3>启动 VS Code</h3>

    If not already open, open VS Code by searching for it with Spotlight
    or opening it manually from the directory where it's installed.

    若尚未打开，可通过 Spotlight 搜索或从安装目录手动打开 VS Code。

 1. <h3>Add the Flutter extension to VS Code</h3>
    <h3>向 VS Code 添加 Flutter 扩展</h3>

    To add the Dart and Flutter extensions to VS Code,
    visit the [Flutter extension's marketplace page][flutter-vscode],
    and click **Install**.
    If prompted by your browser, allow it to open VS Code.

    要向 VS Code 添加 Dart 和 Flutter 扩展，
    请访问 [Flutter 扩展的市场页面][flutter-vscode]，
    并点击 **Install**。
    若浏览器提示，请允许其打开 VS Code。

 1. <h3>Install Flutter with VS Code</h3>
    <h3>使用 VS Code 安装 Flutter</h3>

    1. Open the command palette in VS Code.

       在 VS Code 中打开命令面板。

       Go to **View** <span aria-label="and then">></span> **Command Palette**
       or press <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>.

       依次选择 **View** <span aria-label="and then">></span> **Command Palette**，
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

       当 **Select Folder for Flutter SDK** 对话框显示时，
       选择你希望安装 Flutter 的位置。

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

       此下载可能需要几分钟。
       若你怀疑下载已卡住，请点击 **Cancel**，
       然后重新开始安装。

    1. Click **Add SDK to PATH**.

       点击 **Add SDK to PATH**。

       When successful, a notification displays:

       成功时，会显示以下通知：

       ```console
       The Flutter SDK was added to your PATH
       ```

    1. VS Code might display a Google Analytics notice.

       VS Code 可能会显示 Google Analytics 通知。

       If you agree, click **OK**.

       若你同意，请点击 **OK**。

    1. To ensure that Flutter is available in all terminals:

       要确保 Flutter 在所有终端中可用：

       1. Close, then reopen all terminal windows.

          关闭并重新打开所有终端窗口。

       1. Restart VS Code.

          重启 VS Code。

       {:type="a"}

 1. <h3>Validate your setup</h3>
    <h3>验证你的配置</h3>

    To ensure you installed Flutter correctly,
    run `flutter doctor -v` in your preferred terminal.

    要确保你正确安装了 Flutter，
    请在你偏好的终端中运行 `flutter doctor -v`。

    If the command isn't found or there's an error,
    check out [Flutter installation troubleshooting][troubleshoot].

    若找不到该命令或出现错误，
    请参阅 [Flutter 安装问题排查][troubleshoot]。

{:.steps}

[Install Flutter manually]: /install/manual
[flutter-vscode]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[troubleshoot]: /install/troubleshoot

## Continue your Flutter journey {: #next-steps}

## 继续你的 Flutter 之旅

Now that you've successfully installed Flutter,
set up development for at least one target platform
to continue your journey with Flutter.

现在你已经成功安装了 Flutter，
请至少为一个目标平台配置开发环境，
以继续你的 Flutter 学习之旅。

:::recommend
If you don't yet have a preferred platform
to target during development,
the Flutter team recommends you first try out
[developing for the web][web-setup]!

若你尚未确定开发时要面向的平台，
Flutter 团队建议你首先尝试
[面向 Web 开发][web-setup]！
:::

[web-setup]: /platform-integration/web/setup

<div class="card-grid link-cards">
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-phone.svg" height="160" aria-hidden="true" alt="A representation of Flutter on multiple devices.">
    </div>
    <div class="card-header">
      <span class="card-title"><t>Set up a target platform</t><t>配置目标平台</t></span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/platform-integration/web/setup">Target the web</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/web/setup">面向 Web</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/android/setup">Target Android</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/android/setup">面向 Android</a>
        </li>
        <li class="macos-only">
          <a class="text-button" href="/platform-integration/ios/setup">Target iOS</a>
        </li>
        <li class="macos-only">
          <a class="text-button" href="/platform-integration/ios/setup">面向 iOS</a>
        </li>
        <li class="macos-only">
          <a class="text-button" href="/platform-integration/macos/setup">Target macOS</a>
        </li>
        <li class="macos-only">
          <a class="text-button" href="/platform-integration/macos/setup">面向 macOS</a>
        </li>
        <li class="windows-only">
          <a class="text-button" href="/platform-integration/windows/setup">Target Windows</a>
        </li>
        <li class="windows-only">
          <a class="text-button" href="/platform-integration/windows/setup">面向 Windows</a>
        </li>
        <li class="linux-only">
          <a class="text-button" href="/platform-integration/linux/setup">Target Linux</a>
        </li>
        <li class="linux-only">
          <a class="text-button" href="/platform-integration/linux/setup">面向 Linux</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/pointing-the-way.png" height="160" aria-hidden="true" alt="Dash helping you explore Flutter learning resources.">
    </div>
    <div class="card-header">
      <span class="card-title"><t>Learn Flutter development</t><t>学习 Flutter 开发</t></span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/learn/pathway">Learn the fundamentals</a>
        </li>
        <li>
          <a class="text-button" href="/learn/pathway">学习基础知识</a>
        </li>
        <li>
          <a class="text-button" href="https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">Explore Flutter widgets</a>
        </li>
        <li>
          <a class="text-button" href="https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">探索 Flutter widget</a>
        </li>
      </ul>
    </div>
  </div>

  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/up-to-date.png" height="160" aria-hidden="true" alt="Keep up to date with Flutter">
    </div>
    <div class="card-header">
      <span class="card-title"><t>Stay up to date with Flutter</t><t>跟进 Flutter 最新动态</t></span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/install/upgrade">Update Flutter</a>
        </li>
        <li>
          <a class="text-button" href="/install/upgrade">升级 Flutter</a>
        </li>
        <li>
          <a class="text-button" href="/release/release-notes">Find out what's new</a>
        </li>
        <li>
          <a class="text-button" href="/release/release-notes">了解新特性</a>
        </li>
        <li>
          <a class="text-button" href="{{site.social.youtube}}">Subscribe on YouTube</a>
        </li>
        <li>
          <a class="text-button" href="{{site.social.youtube}}">在 YouTube 上订阅</a>
        </li>
      </ul>
    </div>
  </div>
</div>
