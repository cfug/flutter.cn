Learn how to use any Code OSS-based editor, such as VS Code,
to set up your Flutter development environment and
test drive Flutter's developer experience.

了解如何使用基于 Code OSS 的编辑器（例如 VS Code）
配置 Flutter 开发环境并
试跑 Flutter 的开发体验。

If you've developed with Flutter before,
or you prefer to use a different editor or IDE,
you can follow the [custom setup instructions][] instead.

若你此前已使用 Flutter 开发过，
或你更倾向使用其他编辑器或 IDE，
可改为按照 [自定义配置说明][custom setup instructions] 操作。

<!-- What you'll achieve -->
:::note 你将达成的目标

- Install the software prerequisites for Flutter.

  安装 Flutter 的软件必备项。

- Use VS Code to download and install Flutter.

  使用 VS Code 下载并安装 Flutter。

- Create a new Flutter app from a sample template.

  从示例模板创建新的 Flutter 应用。

- Try out Flutter development features like stateful hot reload.

  体验 Flutter 开发功能，例如 stateful hot reload。

:::

[custom setup instructions]: /install/custom

## Confirm your development platform {: #dev-platform}

## 确认你的开发平台

The instructions on this page are configured to cover
installing and trying out Flutter on a **Windows**{:.selected-os-text} device.

本页说明默认针对在 **Windows**{:.selected-os-text} 设备上安装并试跑 Flutter。

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

    You can instead install and use any other Code OSS-based editor
    that supports VS Code extensions.
    If you choose to do so, for the rest of this article,
    assume VS Code refers to the editor of your choice.

    你也可以安装并使用任何其他支持 VS Code 扩展的
    基于 Code OSS 的编辑器。
    若你选择这样做，本文余下部分中的 VS Code
    均指你所选的编辑器。

{: .steps .chromeos-only}

 1. <h3>Install git</h3>

    <h3>安装 git</h3>

    **If you already have git installed, skip to the next
    step: Download and install Visual Studio Code.**

    **若你已安装 git，请跳至下一步：下载并安装 Visual Studio Code。**

    There are a few ways to install git on your Mac,
    but the way we recommend is by using XCode.
    This will be important when you target your
    builds for iOS or macOS.

    在 Mac 上安装 git 有多种方式，
    但我们推荐使用 XCode。
    当你面向 iOS 或 macOS 构建时，这一点很重要。

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

    You can instead install and use any other Code OSS-based editor
    that supports VS Code extensions.
    If you choose to do so, for the rest of this article,
    assume VS Code refers to the editor of your choice.

    你也可以安装并使用任何其他支持 VS Code 扩展的
    基于 Code OSS 的编辑器。
    若你选择这样做，本文余下部分中的 VS Code
    均指你所选的编辑器。

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

    You can instead install and use any other Code OSS-based editor
    that supports VS Code extensions.
    If you choose to do so, for the rest of this article,
    assume VS Code refers to the editor of your choice.

    你也可以安装并使用任何其他支持 VS Code 扩展的
    基于 Code OSS 的编辑器。
    若你选择这样做，本文余下部分中的 VS Code
    均指你所选的编辑器。

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

    You can instead install and use any other Code OSS-based editor
    that supports VS Code extensions.
    If you choose to do so, for the rest of this article,
    assume VS Code refers to the editor of your choice.

    你也可以安装并使用任何其他支持 VS Code 扩展的
    基于 Code OSS 的编辑器。
    若你选择这样做，本文余下部分中的 VS Code
    均指你所选的编辑器。

{: .steps .linux-only}

[chromeos-linux]: https://support.google.com/chromebook/answer/9145439
[chromeos-linux-update]: https://support.google.com/chromebook/answer/9145439?hl=en#:~:text=Fix%20problems%20with%20Linux
[Git for Windows]: https://git-scm.com/downloads/win
[git-install]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[vscode-install]: https://code.visualstudio.com/docs/setup/setup-overview

## Install and set up Flutter {: #install}

## 安装并配置 Flutter

Now that you've installed Git and VS Code,
follow these steps to use VS Code to install and set up Flutter.

现在你已经安装了 Git 和 VS Code，
请按照以下步骤使用 VS Code 安装并配置 Flutter。

<!-- Download manually -->
:::note 手动下载
If you prefer to manually install Flutter,
follow the instructions in [Install Flutter manually][].

若你更倾向手动安装 Flutter，
请按照 [手动安装 Flutter][Install Flutter manually] 中的说明操作。
:::

 1. <h3>Launch VS Code</h3>

    <h3>启动 VS Code</h3>

    If not already open, open VS Code by searching for it with Spotlight
    or opening it manually from the directory where it's installed.

    若尚未打开，可通过 Spotlight 搜索或从安装目录手动打开 VS Code。

 1. <h3>Add the Flutter extension to VS Code</h3>

    <h3>向 VS Code 添加 Flutter 扩展</h3>

    To add the Dart and Flutter extensions to VS Code,
    visit the [Flutter extension's marketplace page][flutter-vscode],
    then click **Install**.
    If prompted by your browser, allow it to open VS Code.

    要向 VS Code 添加 Dart 和 Flutter 扩展，
    请访问 [Flutter 扩展的市场页面][flutter-vscode]，
    然后点击 **Install**。
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

    :::note
    The VS Code setup process might check for Android Studio, which can result in a warning if it's not installed.
    You can safely ignore this if you're targeting other platforms (like web, iOS, or macOS), as the installation will still succeed.
    Afterward, run `flutter doctor` to verify your installation.

    VS Code 配置过程可能会检查 Android Studio，若未安装可能会显示警告。
    若你面向其他平台（例如 Web、iOS 或 macOS），可安全忽略此警告，安装仍会成功。
    之后请运行 `flutter doctor` 验证你的安装。
    :::

 1. <h3>Troubleshoot installation issues</h3>

    <h3>排查安装问题</h3>

    If you encounter any issues during installation,
    check out [Flutter installation troubleshooting][troubleshoot].

    若安装过程中遇到任何问题，
    请参阅 [Flutter 安装问题排查][troubleshoot]。

{:.steps}

[Install Flutter manually]: /install/manual
[flutter-vscode]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[troubleshoot]: /install/troubleshoot
