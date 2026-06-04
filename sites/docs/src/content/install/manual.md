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

Learn how to install and manually set up
your Flutter development environment.

了解如何手动安装并配置
你的 Flutter 开发环境。

:::tip
If you're just looking to quickly install Flutter,
consider [installing Flutter with VS Code][with-vs-code] for
a streamlined setup experience.

若你只想快速安装 Flutter，
可考虑 [使用 VS Code 安装 Flutter][with-vs-code]，
获得更简化的配置体验。
:::

[with-vs-code]: /install/with-vs-code

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
请从 SDK 归档下载最新 bundle，
然后将其解压到你希望存放的位置。

 1. <h3>Download the Flutter SDK bundle</h3>
    <h3>下载 Flutter SDK bundle</h3>

    Download the following installation bundle to get the
    latest stable release of the Flutter SDK.

    下载以下安装 bundle 以获取
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

    Extract the SDK bundle you downloaded into
    the directory you want to store the Flutter SDK in.

    将你下载的 SDK bundle 解压到
    你希望存放 Flutter SDK 的目录。

    1. Copy the following command.

       复制以下命令。

    1. Replace `<sdk_zip_path>` with the path to the bundle you downloaded.

       将 `<sdk_zip_path>` 替换为你下载的 bundle 路径。

    1. Replace `<destination_directory_path>` with the path to the
       folder you want the extracted SDK to be in.

       将 `<destination_directory_path>` 替换为
       你希望存放解压后 SDK 的文件夹路径。

    1. Run the edited command in your preferred terminal.

       在你偏好的终端中运行编辑后的命令。

    ```console
    $ Expand-Archive –Path <sdk_zip_path> -Destination <destination_directory_path>
    ```

    For example, if you downloaded the bundle for Flutter 3.29.3 into
    the `%USERPROFILE%\Downloads` directory and want to
    store the extracted SDK in the `%USERPROFILE%\develop` directory:

    例如，若你将 Flutter 3.29.3 的 bundle 下载到
    `%USERPROFILE%\Downloads` 目录，并希望将解压后的 SDK 存放在
    `%USERPROFILE%\develop` 目录：

    ```console
    $ Expand-Archive `
      -Path $env:USERPROFILE\Downloads\flutter_windows_3.29.3-stable.zip `
      -Destination $env:USERPROFILE\develop\
    ```

    :::note
    If the `flutter.bat` file is missing from the `bin` directory
    after extraction, your antivirus software might have quarantined it.
    If this happens, configure your antivirus to trust the Flutter SDK directory,
    then extract the bundle again.

    若解压后 `bin` 目录中缺少 `flutter.bat` 文件，
    可能是杀毒软件将其隔离了。
    若出现此情况，请将 Flutter SDK 目录加入杀毒软件信任列表，
    然后重新解压 bundle。
    :::

{: .steps .windows-only}

 1. <h3>Download the Flutter SDK bundle</h3>
    <h3>下载 Flutter SDK bundle</h3>

    Depending on your macOS device's cpu architecture,
    download one of the following installation bundles to get the
    latest stable release of the Flutter SDK.

    根据你的 macOS 设备的 CPU 架构，
    下载以下任一安装 bundle 以获取
    Flutter SDK 的最新稳定版。

    | Apple Silicon (ARM64)                            | Intel                                          |
    | Apple Silicon（ARM64）                            | Intel                                          |
    |--------------------------------------------------|------------------------------------------------|
    | <DownloadLatestButton os="macos" arch="arm64" /> | <DownloadLatestButton os="macos" arch="x64" /> |

 1. <h3>Create a folder to store the SDK</h3>
    <h3>创建用于存放 SDK 的文件夹</h3>

    Create or find a folder to store the extracted SDK in.
    Consider creating and using a directory at `~/develop/`.

    创建或找到一个用于存放解压后 SDK 的文件夹。
    可考虑在 `~/develop/` 创建并使用该目录。

 1. <h3>Extract the SDK</h3>
    <h3>解压 SDK</h3>

    Extract the SDK bundle you downloaded into
    the directory you want to store the Flutter SDK in.

    将你下载的 SDK bundle 解压到
    你希望存放 Flutter SDK 的目录。

    1. Copy the following command.

       复制以下命令。

    1. Replace `<sdk_zip_path>` with the path to the bundle you downloaded.

       将 `<sdk_zip_path>` 替换为你下载的 bundle 路径。

    1. Replace `<destination_directory_path>` with the path to the
       folder you want the extracted SDK to be in.

       将 `<destination_directory_path>` 替换为
       你希望存放解压后 SDK 的文件夹路径。

    1. Run the edited command in your preferred terminal.

       在你偏好的终端中运行编辑后的命令。

    ```console
    $ unzip <sdk_zip_path> -d <destination_directory_path>
    ```

    For example, if you downloaded the bundle for Flutter 3.29.3 into
    the `~/Downloads` directory and want to
    store the extracted SDK in the `~/develop` directory:

    例如，若你将 Flutter 3.29.3 的 bundle 下载到
    `~/Downloads` 目录，并希望将解压后的 SDK 存放在 `~/develop` 目录：

    ```console
    $ unzip ~/Downloads/flutter_macos_3.29.3-stable.zip -d ~/develop/
    ```

{: .steps .macos-only}

 1. <h3>Download the Flutter SDK bundle</h3>
    <h3>下载 Flutter SDK bundle</h3>

    Download the following installation bundle to get the
    latest stable release of the Flutter SDK.

    下载以下安装 bundle 以获取
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

    Extract the SDK bundle you downloaded into
    the directory you want to store the Flutter SDK in.

    将你下载的 SDK bundle 解压到
    你希望存放 Flutter SDK 的目录。

    1. Copy the following command.

       复制以下命令。

    1. Replace `<sdk_zip_path>` with the path to the bundle you downloaded.

       将 `<sdk_zip_path>` 替换为你下载的 bundle 路径。

    1. Replace `<destination_directory_path>` with the path to the
       folder you want the extracted SDK to be in.

       将 `<destination_directory_path>` 替换为
       你希望存放解压后 SDK 的文件夹路径。

    1. Run the edited command in your preferred terminal.

       在你偏好的终端中运行编辑后的命令。

    ```console
    $ tar -xf <sdk_zip_path> -C <destination_directory_path>
    ```

    For example, if you downloaded the bundle for Flutter 3.29.3 into
    the `~/Downloads` directory and want to
    store the extracted SDK in the `~/develop` directory:

    例如，若你将 Flutter 3.29.3 的 bundle 下载到
    `~/Downloads` 目录，并希望将解压后的 SDK 存放在 `~/develop` 目录：

    ```console
    $ tar -xf ~/Downloads/flutter_linux_3.29.3-stable.tar.xz -C ~/develop/
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
[developing on the web][web-setup]!

若你尚未确定开发时要面向的平台，
Flutter 团队建议你首先尝试
[在 Web 上开发][web-setup]！
:::

[web-setup]: /platform-integration/web/setup

<div class="card-grid link-cards">
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-phone.svg"
           height="160" aria-hidden="true"
           alt="A representation of Flutter on multiple devices.">
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
      <img src="/assets/images/decorative/pointing-the-way.png"
           height="160" aria-hidden="true"
           alt="Dash helping you explore Flutter learning resources.">
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
      <img src="/assets/images/decorative/up-to-date.png" height="160"
           aria-hidden="true" alt="Keep up to date with Flutter">
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
