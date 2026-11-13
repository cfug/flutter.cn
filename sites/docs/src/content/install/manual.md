---
# title: Install Flutter manually
title: 手动安装 Flutter
# shortTitle: Install manually
shortTitle: 手动安装
# breadcrumb: Manually
breadcrumb: 手动安装
# description: >-
#   Learn how to install and set up the Flutter SDK manually.
description: 了解如何手动安装并配置 Flutter SDK。
ai-translated: true
---

Learn how to manually download and set up the Flutter SDK
and configure your development environment.

了解如何手动安装并配置你的 Flutter 开发环境。

For a faster, automated setup in VS Code (or any Code OSS-based editor),
follow [Install Flutter with VS Code][with-vs-code] instead.
To download a specific Flutter version or release channel,
visit the [SDK archive][], or manage an existing installation in
[Install and set up Flutter][].

如果你想要更快速、自动化地配置，可以使用 VS Code（或任何基于 Code OSS 的编辑器），
请参考 [使用 VS Code 安装 Flutter][with-vs-code]。
如果要下载特定的 Flutter 版本或者发布渠道，
请访问 [SDK 版本列表][SDK archive]，或者通过 
[安装和配置 Flutter][Install and set up Flutter] 管理现有安装。

[with-vs-code]: /install/with-vs-code
[SDK archive]: /install/archive
[Install and set up Flutter]: /install

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

Before installing the Flutter SDK,
first complete the following setup.

在安装 Flutter SDK 之前，
请先完成以下配置。

 1. <h3>Install Git for Windows</h3>

    <h3>为 Windows 安装 Git</h3>

    Download and install the latest version of [Git for Windows][].

    下载并安装最新版本的 [Git for Windows][]。

    For help installing or troubleshooting Git,
    reference the [Git documentation][git-install].

    有关安装或排查 Git 问题的帮助，
    请参阅 [Git 文档][git-install]。

 1. <h3>Set up an editor or IDE</h3>

    <h3>配置编辑器或 IDE</h3>

    For the best experience developing Flutter apps,
    consider installing and setting up an
    [editor or IDE with Flutter support][editors]{: target="_blank"}.

    为获得最佳的 Flutter 应用开发体验，
    请考虑安装并配置
    [支持 Flutter 的编辑器或 IDE][editors]{: target="_blank"}。

{: .steps .windows-only}

 1. <h3>Install the Xcode command-line tools</h3>

    <h3>安装 Xcode 命令行工具</h3>

    **If you already have Git installed,**
    you can skip to the next step: Set up an editor or IDE.

    **若你已安装 git，**
    请跳至下一步：配置编辑器或 IDE。

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

 1. <h3>Set up an editor or IDE</h3>

    <h3>配置编辑器或 IDE</h3>

    For the best experience developing Flutter apps,
    consider installing and setting up an
    [editor or IDE with Flutter support][editors]{: target="_blank"}.

    为获得最佳的 Flutter 应用开发体验，
    请考虑安装并配置
    [支持 Flutter 的编辑器或 IDE][editors]{: target="_blank"}。

{: .steps .macos-only}

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

1. <h3>Set up an editor or IDE</h3>

   <h3>配置编辑器或 IDE</h3>

   For the best experience developing Flutter apps,
   consider installing and setting up an
   [editor or IDE with Flutter support][editors]{: target="_blank"}.

   为获得最佳的 Flutter 应用开发体验，
   请考虑安装并配置
   [支持 Flutter 的编辑器或 IDE][editors]{: target="_blank"}。

{: .steps .linux-only}

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

 1. <h3>Set up an editor or IDE</h3>

    <h3>配置编辑器或 IDE</h3>

    For the best experience developing Flutter apps,
    consider installing and setting up an
    [editor or IDE with Flutter support][editors]{: target="_blank"}.

    为获得最佳的 Flutter 应用开发体验，
    请考虑安装并配置
    [支持 Flutter 的编辑器或 IDE][editors]{: target="_blank"}。

{: .steps .chromeos-only}

[editors]: /tools/editors
[Git for Windows]: https://git-scm.com/downloads/win
[git-install]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[chromeos-linux]: https://support.google.com/chromebook/answer/9145439
[chromeos-linux-update]: https://support.google.com/chromebook/answer/9145439?hl=en#:~:text=Fix%20problems%20with%20Linux

## Install and set up Flutter {: #install-flutter}

## 安装并配置 Flutter

To install the Flutter SDK,
download the latest bundle from the SDK archive,
then extract the SDK to where you want it stored.

要安装 Flutter SDK，
请从 SDK 归档下载最新的压缩包，
然后将其解压到你希望存放的位置。

 1. <h3>Download the Flutter SDK bundle</h3>

    <h3>下载 Flutter SDK 压缩包</h3>

    Download the following installation bundle to get the
    latest stable release of the Flutter SDK.

    下载以下压缩包以获取
    Flutter SDK 的最新稳定版。

    <DownloadLatestButton os="windows" />

 1. <h3>Create a folder to store the SDK</h3>

    <h3>创建用于存放 SDK 的文件夹</h3>

    Create or find a folder to store the extracted SDK in.
    Consider creating and using a directory at
    `%USERPROFILE%\develop` (`C:\Users\{username}\develop`).

    创建或找到一个用于存放解压后 SDK 的文件夹。
    可考虑在 `%USERPROFILE%\develop`（`C:\Users\{username}\develop`）创建并使用该目录。

    :::note
    Select a location that
    doesn't have special characters or spaces in its path and
    doesn't require elevated privileges.

    选择的路径中不要包含特殊字符或空格，
    且不需要提升权限。
    :::

 1. <h3>Extract the SDK</h3>

    <h3>解压 SDK</h3>

    Extract the downloaded `.zip` archive into your chosen directory
    (for example, from `Downloads` into `develop`,
    adjusting the filename and paths as needed):

    将下载的 `.zip` 压缩包解压到你选择的目录中
    （例如，从 `Downloads` 解压到 `develop`，
    并根据需要调整文件名和路径）：

    <Tabs key="windows-terminal">
    <Tab name="PowerShell">

    ```powershell
    Expand-Archive `
      -Path "$env:USERPROFILE\Downloads\flutter_windows_3.50.0-stable.zip" `
      -DestinationPath "$env:USERPROFILE\develop"
    ```

    </Tab>
    <Tab name="命令提示符">

    ```bat
    tar -xf "%USERPROFILE%\Downloads\flutter_windows_3.50.0-stable.zip" -C "%USERPROFILE%\develop"
    ```

    </Tab>
    </Tabs>

    :::note
    If the `flutter.bat` file is missing from the `bin` directory
    after extraction, your antivirus software might have quarantined it.
    If this happens, configure your antivirus to trust the Flutter SDK directory,
    then extract the bundle again.

    若解压后 `bin` 目录中缺少 `flutter.bat` 文件，
    可能是杀毒软件将其隔离了。
    若出现此情况，请将 Flutter SDK 目录加入杀毒软件信任列表，
    然后重新解压压缩包。
    :::

{: .steps .windows-only}

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

 1. <h3>Download the Flutter SDK bundle</h3>

    <h3>下载 Flutter SDK 压缩包</h3>

    To choose the correct bundle,
    you need to know your Mac's processor type.
    *(To check, go to **Apple menu () > About This Mac**
    and look at the **Processor** or **Chip** section.)*

    你需要了解你的 Mac 处理器类型，来选择正确的压缩包。
    （前往 **Apple 菜单 () > 关于本机**，
    并查看 **处理器** 或 **芯片** 部分。）

    Depending on your macOS device's cpu architecture,
    download one of the following installation bundles to get the
    latest stable release of the Flutter SDK.

    根据你的 macOS 设备的 CPU 架构，
    下载以下任一压缩包以获取
    Flutter SDK 的最新稳定版。

    | Apple Silicon (ARM64)                                                 | Intel                                                               |
    | --------------------------------------------------------------------- | ------------------------------------------------------------------- |
    | <DownloadLatestButton os="macos" arch="arm64"></DownloadLatestButton> | <DownloadLatestButton os="macos" arch="x64"></DownloadLatestButton> |

 1. <h3>Create a folder to store the SDK</h3>

    <h3>创建用于存放 SDK 的文件夹</h3>

    Create or find a folder to store the extracted SDK in.
    Consider creating and using a directory at `~/develop/`.

    创建或找到一个用于存放解压后 SDK 的文件夹。
    可考虑在 `~/develop/` 创建并使用该目录。

 1. <h3>Extract the SDK</h3>

    <h3>解压 SDK</h3>

    Extract the downloaded `.zip` archive into your chosen directory
    (for example, from `~/Downloads` into `~/develop/`,
    adjusting the filename and paths as needed):

    将下载的 `.zip` 压缩包解压到你选择的目录中
    （例如，从 `~/Downloads` 解压到 `~/develop/`，
    并根据需要调整文件名和路径）：

    ```console
    $ unzip ~/Downloads/flutter_macos_3.50.0-stable.zip -d ~/develop/
    ```

{: .steps .macos-only}

 1. <h3>Download the Flutter SDK bundle</h3>

    <h3>下载 Flutter SDK 压缩包</h3>

    Download the following installation bundle to get the
    latest stable release of the Flutter SDK.

    下载以下压缩包以获取
    Flutter SDK 的最新稳定版。

    <DownloadLatestButton os="linux" />

 1. <h3>Create a folder to store the SDK</h3>
    <h3>创建用于存放 SDK 的文件夹</h3>

    Create or find a folder to store the extracted SDK in.
    Consider creating and using a directory at `~/develop/`.

    创建或找到一个用于存放解压后 SDK 的文件夹。
    可考虑在 `~/develop/` 创建并使用该目录。

 1. <h3>Extract the SDK</h3>

    <h3>解压 SDK</h3>

    Extract the downloaded `.tar.xz` archive into your chosen directory
    (for example, from `~/Downloads` into `~/develop/`,
    adjusting the filename and paths as needed):

    将下载的 `.tar.xz` 压缩包解压到你选择的目录中
    （例如，从 `~/Downloads` 解压到 `~/develop/`，
    并根据需要调整文件名和路径）：

    ```console
    $ tar -xf ~/Downloads/flutter_linux_3.50.0-stable.tar.xz -C ~/develop/
    ```

{: .steps .linux-only .chromeos-only}

## Add Flutter to your PATH {: #add-to-path}

## 将 Flutter 添加到 PATH

Now that you've downloaded the SDK,
add the Flutter SDK's `bin` directory to your `PATH` environment variable.
Adding Flutter to your `PATH` allows you to use the
`flutter` and `dart` command-line tools in terminals and IDEs.

现在你已经下载了 SDK，
请将 Flutter SDK 的 `bin` 目录添加到你的 `PATH` 环境变量。
将 Flutter 添加到你的 `PATH` 后，你就可以在终端和 IDE 中使用
`flutter` 和 `dart` 命令行工具。

<div class="windows-only">

{% render "docs/install/path/windows.md" %}

</div>

<div class="macos-only">

{% render "docs/install/path/macos.md" %}

</div>

<div class="linux-only">

{% render "docs/install/path/linux.md" %}

</div>

<div class="chromeos-only">

{% render "docs/install/path/chromeos.md" %}

</div>

## Validate your setup {: #validate-setup}

## 验证你的配置

To verify your Flutter installation, run `flutter doctor` in your terminal:

在终端中运行 `flutter doctor` 来验证 Flutter 的安装情况：

```console
$ flutter doctor
```

:::note `flutter doctor` 会显示什么内容
<!-- What to expect in `flutter doctor` -->

You only need checkmarks (`[✓]`) for **Flutter**
and the platforms you plan to target
(for example, **Chrome** lets you build for the web immediately).
You can safely ignore `[!]` or `[✗]` warnings for tools like
Android Studio or Xcode until you're ready to target those platforms.

在输出结果中，你只需要关注 **Flutter** 以及你计划支持的平台的勾选标记 (`[✓]`)
（例如，**Chrome** 允许你构建 Web 版本）。
对于 Android Studio 或者 Xcode 等工具显示的 `[!]` 或者 `[✗]` 警告，
在你准备好支持这些平台之前，可以放心忽略。

:::

If you encounter any issues during installation,
consult [Flutter installation troubleshooting][troubleshoot].

若安装过程中遇到任何问题，
请参阅 [Flutter 安装问题排查][troubleshoot]。

[troubleshoot]: /install/troubleshoot

## Continue your Flutter journey {: #next-steps}

## 继续你的 Flutter 之旅

Now that you've successfully installed Flutter,
set up development for a target platform or start learning
to continue your journey with Flutter.

现在你已经成功安装了 Flutter，
请为一个目标平台配置开发环境或者开始学习，
以继续你的 Flutter 学习之旅。

{% render "docs/get-started/setup-next-steps.html", site: site %}
