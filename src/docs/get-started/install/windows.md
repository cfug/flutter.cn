---
title: Windows install
title: 在 Windows 操作系统上安装和配置 Flutter 开发环境
short-title: Windows
# js: [{defer: true, url: /assets/archive.js}]
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

要想安装和运行 Flutter，你的开发环境至少应该满足如下的需求：

- **Operating Systems**: Windows 7 SP1 or later (64-bit)
  
  **操作系统**：Windows 7 SP1 或更高的版本（64 位操作系统）。
  
- **Disk Space**: 400 MB (does not include disk space for IDE/tools).

  **磁盘空间**：除安装 IDE 和一些工具之外还应有至少 400 MB 的空间。

- **Tools**: Flutter depends on these tools being available in your environment.

  **工具**：要让 Flutter 在你的开发环境中正常使用，依赖于以下的工具：
  
  - [Windows PowerShell 5.0][] or newer (this is pre-installed with Windows 10)
  
    [Windows PowerShell 5.0][] 或者更高的版本（Windows 10 中已经预装了）
    
  - [Git for Windows][] 2.x, with the
    **Use Git from the Windows Command Prompt** option.
  
    [Git for Windows][] 2.x，并且勾选**从 Windows 命令提示符使用 Git** 选项。

     If Git for Windows is already installed,
     make sure you can run `git` commands from the
     command prompt or PowerShell.
     
     如果 Windows 版的 Git 已经安装过了，那么请确保能从命令提示符或者 PowerShell 中直接执行 git 命令。

{% include_relative _get-sdk-win.md %}

{% include_relative _android-setup.md %}

{% include_relative _web-setup.md %}

## Next step

## 下一步

Set up your preferred editor.

编辑器设置。

[Git for Windows]: https://git-scm.com/download/win
[Windows PowerShell 5.0]: https://docs.microsoft.com/en-us/powershell/scripting/setup/installing-windows-powershell
