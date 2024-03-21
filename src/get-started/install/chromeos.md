---
title: ChromeOS install
title: 在 ChromeOS 上安装和配置 Flutter 开发环境
description: How to install on ChromeOS.
description: 如何在 ChromeOS 上安装 Flutter。
short-title: ChromeOS
tags: Flutter安装,Flutter环境搭建
keywords: Flutter ChromsOS,ChromeOS上安装Flutter,ChromeOS开发
next:
  title: Set up an editor
  titie: 编辑工具设定
  path: /get-started/editor
---

{% assign os = 'linux' -%}

## System requirements

## 系统要求

To install and run Flutter on a Chromebook, your machine
must have [Linux][] enabled from the **Developers** tab of Settings.

要在 Chromebook 上安装并运行 Flutter，
你的设备必须在设置的 **开发者** 选项卡中启用内置的 [Linux][] 环境。

The amount of disk space required varies
depending on which target platforms you enable.
We recommend that you increase the disk size for the
Linux environment from the default of 10GB to 32GB or larger,
to accommodate Android Studio and other tooling.

所需的磁盘空间大小会根据你启用的目标平台而变化。
我们建议你将 Linux 环境的磁盘大小从默认的 10GB 增大到 32GB 或更大，
以容纳 Android Studio 和其他工具。

{% include_relative _get-sdk-chromeos.md %}

{% include_relative _chrome-setup-chromeos.md %}

{% include_relative _android-setup-chromeos.md %}

## Next step

## 下一步

Set up your preferred editor.

编辑器设置。

[Linux (Beta)]: https://support.google.com/chromebook/answer/9145439
[Linux]: https://support.google.com/chromebook/answer/9145439
