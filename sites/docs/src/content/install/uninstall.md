---
# title: Uninstall Flutter
title: 卸载 Flutter
# shortTitle: Uninstall
shortTitle: 卸载
# description: >-
#     How to remove the Flutter SDK and clean up its configuration files.
description: 如何移除 Flutter SDK 并清理其配置文件。
showToc: false
ai-translated: true
---

To remove the Flutter SDK from your development machine,
delete the directories that store Flutter and its configuration files.

要从你的开发机上移除 Flutter SDK，
请删除存放 Flutter 及其配置文件的目录。

## Choose your development platform {: #dev-platform }

## 选择你的开发平台

The instructions on this page are configured to cover
uninstall Flutter on a **Windows**{:.selected-os-text} device.

本页说明默认针对在 **Windows**{:.selected-os-text} 设备上卸载 Flutter。

If you'd like to follow the instructions for a different OS,
please select one of the following.

若要查看其他操作系统的说明，
请选择以下选项之一。

<OSSelector />

## Uninstall the Flutter SDK {: #uninstall }

## 卸载 Flutter SDK

 1. <h3>Determine your Flutter SDK installation location</h3>
    <h3>确定 Flutter SDK 的安装位置</h3>

    Copy the absolute path to the directory that you
    downloaded and extracted the Flutter SDK into.

    复制你下载并解压 Flutter SDK 所在目录的绝对路径。

 1. <h3>Remove the installation directory</h3>
    <h3>删除安装目录</h3>

    To uninstall the Flutter SDK,
    delete the `flutter` directory you installed Flutter to.

    要卸载 Flutter SDK，
    请删除你安装 Flutter 时使用的 `flutter` 目录。

    For example, if you downloaded Flutter into a
    `develop\flutter` folder inside your user directory,
    run the following command to delete the SDK:

    例如，若你将 Flutter 下载到用户目录下的
    `develop\flutter` 文件夹中，
    可运行以下命令删除 SDK：

    ```ps
    $ Remove-Item -Recurse -Force -Path (Join-Path $env:USERPROFILE "develop\flutter")
    ```

{: .steps .windows-only}

 1. <h3>Determine your Flutter SDK installation location</h3>
    <h3>确定 Flutter SDK 的安装位置</h3>

    Copy the absolute path to the directory that you
    downloaded and extracted the Flutter SDK into.

    复制你下载并解压 Flutter SDK 所在目录的绝对路径。

 1. <h3>Remove the installation directory</h3>
    <h3>删除安装目录</h3>

    To uninstall the Flutter SDK,
    delete the `flutter` directory you installed Flutter to.

    要卸载 Flutter SDK，
    请删除你安装 Flutter 时使用的 `flutter` 目录。

    For example, if you downloaded Flutter into a
    `develop/flutter` folder inside your user directory,
    run the following command to delete the SDK:

    例如，若你将 Flutter 下载到用户目录下的
    `develop/flutter` 文件夹中，
    可运行以下命令删除 SDK：

    ```console
    $ rm -rf ~/develop/flutter
    ```

{: .steps .macos-only .linux-only .chromeos-only }

## Clean up installation and configuration files {: #cleanup }

## 清理安装与配置文件

Flutter and Dart add to additional directories in your home directory.
These contain configuration files and package downloads.
The following cleanup is optional.

Flutter 和 Dart 还会在你的主目录下使用其他目录。
这些目录存放配置文件和 package 下载内容。
以下清理步骤为可选操作。

 1. <h3>Remove Flutter configuration directories</h3>
    <h3>删除 Flutter 配置目录</h3>

    If you don't want to preserve your Flutter tooling configuration,
    remove the following directories from your device.

    若你不需要保留 Flutter 工具链配置，
    请从设备上删除以下目录。

    <div class="windows-only">

    - `%APPDATA%\.flutter-devtools`

    To remove these directories, run the following command:

    要删除这些目录，请运行以下命令：

    ```ps
    $ Remove-Item -Recurse -Force -Path (Join-Path $env:APPDATA ".flutter-devtools")
    ```

    </div>

    <div class="macos-only linux-only chromeos-only">

    - `~/.flutter`
    - `~/.flutter-devtools`
    - `~/.flutter_settings`

    To remove these directories, run the following command:

    要删除这些目录，请运行以下命令：

    ```ps
    $ rm -rf  ~/.flutter ~/.flutter-devtools ~/.flutter_settings
    ```

    </div>

 1. <h3>Remove Dart configuration directories</h3>
    <h3>删除 Dart 配置目录</h3>

    If you don't want to preserve your Dart tooling configuration,
    remove the following directories from your device.

    若你不需要保留 Dart 工具链配置，
    请从设备上删除以下目录。

    <div class="windows-only">

    - `%APPDATA%\.dart`
    - `%APPDATA%\.dart-tool`
    - `%LOCALAPPDATA%\.dartServer`

    To remove these directories, run the following command:

    要删除这些目录，请运行以下命令：

    ```console
    $ Remove-Item -Recurse -Force -Path (Join-Path $env:APPDATA ".dart"), (Join-Path $env:APPDATA ".dart-tool"), (Join-Path $env:LOCALAPPDATA ".dartServer")
    ```

    </div>

    <div class="macos-only linux-only chromeos-only">

    - `~/.dart`
    - `~/.dart-tool`
    - `~/.dartServer`

    To remove these directories, run the following command:

    要删除这些目录，请运行以下命令：

    ```console
    $ rm -rf  ~/.dart ~/.dart-tool ~/.dartServer
    ```

    </div>

 1. <h3>Remove pub package directories</h3>
    <h3>删除 pub package 目录</h3>

    If you don't want to preserve your locally installed pub packages,
    remove the [pub system cache][] directory from your device.

    若你不需要保留本地已安装的 pub packages，
    请从设备上删除 [pub 系统缓存][pub system cache] 目录。

    <div class="windows-only">

    If you didn't change the location of the pub system cache,
    run the following command to
    delete the `%LOCALAPPDATA%\Pub\Cache` directory:

    若你未更改 pub 系统缓存的位置，
    可运行以下命令删除 `%LOCALAPPDATA%\Pub\Cache` 目录：

    ```ps
    $ Remove-Item -Recurse -Force -Path (Join-Path $env:LOCALAPPDATA "Pub\Cache")
    ```

    </div>

    <div class="macos-only linux-only chromeos-only">

    If you didn't change the location of the pub system cache,
    run the following command to delete the `~/.pub-cache` directory:

    若你未更改 pub 系统缓存的位置，
    可运行以下命令删除 `~/.pub-cache` 目录：

    ```console
    $ rm -rf ~/.pub-cache
    ```

    </div>

{: .steps }

[pub system cache]: {{site.dart-site}}/tools/pub/glossary#system-cache

## Reinstall Flutter {: #reinstall }

## 重新安装 Flutter

You can [reinstall Flutter][flutter-install] or
[just Dart][dart-install] at any time.
If you removed any configuration directories,
reinstalling Flutter restores them to default settings.

你可以随时 [重新安装 Flutter][flutter-install] 或
[仅安装 Dart][dart-install]。
若你删除了任何配置目录，
重新安装 Flutter 会将它们恢复为默认设置。

[flutter-install]: /install
[dart-install]: {{site.dart-site}}/get-dart
