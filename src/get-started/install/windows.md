---
title: Windows install
title: 在 Windows 操作系统上安装和配置 Flutter 开发环境
description: How to install on Windows.
description: 如何在 Windows 上安装 Flutter。
short-title: Windows
tags: Flutter安装,Flutter环境搭建
keywords: Flutter Windows,Flutter镜像,Windows开发Flutter,Windows开发环境配置
next:
  title: Set up an editor
  title: 编辑工具设定
  path: /docs/get-started/editor
---

{% assign os = 'windows' -%}

## System requirements

## 系统配置要求

To install and run Flutter,
your development environment must meet these minimum requirements:

- **Operating Systems**: Windows 10 or later (64-bit), x86-64 based.

  **操作系统**：Windows 10 或更高的版本（基于 x86-64 的 64 位操作系统）。

- **Disk Space**: 2.5 GB (does not include disk space for IDE/tools).

  **磁盘空间**：除安装 IDE 和一些工具之外还应有至少 2.5 GB 的空间。

- **Tools**: Flutter depends on these tools being available in your environment.

  **工具**：要让 Flutter 在你的开发环境中正常使用，依赖于以下的工具：

  - [Windows PowerShell 5.0][] or newer (this is pre-installed with Windows 10)

    [Windows PowerShell 5.0][] 或者更高的版本（Windows 10 中已预装）

  - [Git for Windows][] 2.x, with the
    **Use Git from the Windows Command Prompt** option.

    [Git for Windows][] 2.x，并且勾选**从 Windows 命令提示符使用 Git** 选项。

     If Git for Windows is already installed,
     make sure you can run `git` commands from the
     command prompt or PowerShell.

     如果 Windows 版的 Git 已经安装过了，那么请确保能从命令提示符或者
     PowerShell 中直接执行 git 命令。

{% include_relative _get-sdk-win.md %}

{% include_relative _android-setup.md %}

{% include_relative _windows-desktop-setup.md %}

## Next step

## 下一步

Set up your preferred editor.

编辑工具设定。

[Git for Windows]: https://git-scm.com/download/win
[Windows PowerShell 5.0]: https://docs.microsoft.com/en-us/powershell/scripting/install/installing-windows-powershell
