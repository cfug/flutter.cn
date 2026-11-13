Learn how to use [Visual Studio Code (VS Code)][VS Code] or any compatible
Code OSS-based editor to quickly install and set up your
Flutter development environment.

了解如何使用 [Visual Studio Code (VS Code)][VS Code] 
或任何兼容的基于 Code OSS 的编辑器，
快速安装并配置你的 Flutter 开发环境。

If you prefer a different editor or IDE,
you can [install Flutter manually][].

如果你更喜欢其他编辑器或 IDE，
你可以 [手动安装 Flutter][install Flutter manually]。

[VS Code]: https://code.visualstudio.com
[install Flutter manually]: /install/manual

## Confirm your development platform {: #dev-platform}

## 确认你的开发平台

These instructions are configured for **Windows**{:.selected-os-text}.
If you're using a different operating system,
select it from one of the following:

本指南针对 **Windows**{:.selected-os-text} 进行配置。
如果你使用的是其他操作系统，
请从以下进行选择：

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
    [install and set up Visual Studio Code][vscode-install]
    (or your preferred Code OSS-based editor).

    要快速安装 Flutter 并编辑、调试你的应用，
    请 [安装并配置 Visual Studio Code][vscode-install]
    （或者你喜欢的基于 Code OSS 的编辑器）。

{: .steps .chromeos-only}

<div class="macos-only">

:::warning
**Note for Intel Macs:**
Flutter is deprecating support for Intel-based Macs (x64).
Future Flutter releases will require Apple Silicon.
For details, check out the
[macOS Intel deprecation strategy](https://docs.google.com/document/d/1ty3js_Eg2sNIbDuyYS_aV7h4jYdx1hEpX_mV135gO4s/edit?tab=t.0#heading=h.cx7d8y57ce6p).

**关于 Intel Mac 的说明：**
Flutter 正在逐步停止对基于 Intel 的 Mac (x64) 的支持。
未来的 Flutter 版本将要求使用 Apple Silicon。
详情请查看 
[macOS Intel 弃用策略](https://docs.google.com/document/d/1ty3js_Eg2sNIbDuyYS_aV7h4jYdx1hEpX_mV135gO4s/edit?tab=t.0#heading=h.cx7d8y57ce6p)。
:::

</div>

 1. <h3>Install the Xcode command-line tools</h3>

    <h3>安装 Xcode 命令行工具</h3>

    **If you already have Git installed,**
    you can skip to the next step: Download and install Visual Studio Code.

    **若你已安装 git，**
    请跳至下一步：下载并安装 Visual Studio Code。

    Download the Xcode command-line tools to get access to
    the command-line tools that Flutter relies on, including Git.
    This is also required when you target your builds for iOS or macOS.

    下载 Xcode 命令行工具，
    以便使用 Flutter 所依赖的命令行工具，包括 Git。
    你的构建目标为 iOS 或 macOS 的时候，
    这也是必不可少的步骤。

    To download the tools, run the following command in your preferred terminal:

    请在你常用的终端中运行以下命令来下载这些工具：

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
    [install and set up Visual Studio Code][vscode-install]
    (or your preferred Code OSS-based editor).

    要快速安装 Flutter 并编辑、调试你的应用，
    请 [安装并配置 Visual Studio Code][vscode-install]
    （或者你喜欢的基于 Code OSS 的编辑器）。

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
    [install and set up Visual Studio Code][vscode-install]
    (or your preferred Code OSS-based editor).

    要快速安装 Flutter 并编辑、调试你的应用，
    请 [安装并配置 Visual Studio Code][vscode-install]
    （或者你喜欢的基于 Code OSS 的编辑器）。

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
    [install and set up Visual Studio Code][vscode-install]
    (or your preferred Code OSS-based editor).

    要快速安装 Flutter 并编辑、调试你的应用，
    请 [安装并配置 Visual Studio Code][vscode-install]
    （或者你喜欢的基于 Code OSS 的编辑器）。

{: .steps .linux-only}

[chromeos-linux]: https://support.google.com/chromebook/answer/9145439
[chromeos-linux-update]: https://support.google.com/chromebook/answer/9145439?hl=en#:~:text=Fix%20problems%20with%20Linux
[Git for Windows]: https://git-scm.com/downloads/win
[git-install]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[vscode-install]: https://code.visualstudio.com/docs/setup/setup-overview

<a id="install-flutter" aria-hidden="true"></a>

## Install and set up Flutter {: #install}

## 安装并配置 Flutter

Now that you've installed the prerequisites,
use VS Code to download and set up the Flutter SDK:

你已经安装了必要的环境，
接下来请使用 VS Code 下载并配置 Flutter SDK：

 1. <h3>Install the Flutter extension</h3>

    <h3>安装 Flutter 扩展</h3>

    Open VS Code, then install the
    [Flutter extension from the VS Code Marketplace][flutter-vscode]
    or press <kbd class="special-key">Cmd/Ctrl</kbd> +
    <kbd>Shift</kbd> + <kbd>X</kbd> to open the **Extensions** view,
    search for `Flutter`, and click **Install**.
    Installing the Flutter extension also installs the Dart extension.

    打开 VS Code，然后安装
    [VS Code 市场中的 Flutter 扩展][flutter-vscode]
    或者按下快捷键 <kbd class="special-key">Cmd/Ctrl</kbd> +
    <kbd>Shift</kbd> + <kbd>X</kbd>
    打开 **扩展 (Extensions)** 视图，
    搜索 `Flutter` 并且点击 **安装 (Install)**。
    安装 Flutter 扩展时也会一并安装 Dart 扩展。

 1. <h3>Install Flutter with VS Code</h3>

    <h3>使用 VS Code 安装 Flutter</h3>

    1. Open the Command Palette in VS Code.

       在 VS Code 中打开命令面板 (Command Palette)。

       Go to **View** <span aria-label="and then">></span> **Command Palette**
       or press <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>.

       依次选择 **查看 (View)** <span aria-label="and then">></span> **命令面板 (Command Palette)**，
       或者按下快捷键 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. In the Command Palette, type `flutter` and select
       **Flutter: New Project**.

       在命令面板 (Command Palette) 中输入 `flutter`。
       选择 **Flutter: New Project**。

    1. VS Code prompts you to locate the Flutter SDK on your computer.
       Select **Download SDK**.

       VS Code 会提示你在计算机上定位 Flutter SDK。
       选择 **Download SDK**。

    1. When the **Select Folder for Flutter SDK** dialog displays,
       choose where you want to install Flutter and click **Clone Flutter**.

       当 **Select Folder for Flutter SDK** 对话框显示时，
       选择你希望安装 Flutter 的位置，
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

    1. Once the download finishes, click **Add SDK to PATH**.

       下载完成后，点击 **Add SDK to PATH**。

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

    To verify your installation, open the Command Palette
    (<kbd class="special-key">Cmd/Ctrl</kbd> +
    <kbd>Shift</kbd> + <kbd>P</kbd>) and select
    **Flutter: Run Flutter Doctor**, or run `flutter doctor`
    in your terminal.

    验证安装是否成功，请打开命令面板 (Command Palette)
    （快捷键 <kbd class="special-key">Cmd/Ctrl</kbd> +
    <kbd>Shift</kbd> + <kbd>P</kbd>）
    然后选择 **Flutter: Run Flutter Doctor**，
    或者在终端中运行 `flutter doctor`。

    In the output, you only need checkmarks (`[✓]`) for **Flutter**
    and the platforms you plan to target
    (for example, **Chrome** lets you build for the web immediately).
    You can safely ignore `[!]` or `[✗]` warnings for tools like
    Android Studio or Xcode until you're ready to target those platforms.

    在输出结果中，你只需要关注 **Flutter** 以及你计划支持的平台的勾选标记 (`[✓]`)
    （例如，**Chrome** 允许你构建 Web 版本）。
    对于 Android Studio 或者 Xcode 等工具显示的 `[!]` 或者 `[✗]` 警告，
    在你准备好支持这些平台之前，可以放心忽略。

    If you encounter any issues during installation,
    consult [Flutter installation troubleshooting][troubleshoot].

    若安装过程中遇到任何问题，
    请参阅 [Flutter 安装问题排查][troubleshoot]。

{:.steps}

[flutter-vscode]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[troubleshoot]: /install/troubleshoot
