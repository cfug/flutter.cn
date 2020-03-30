---
title: Linux install
title: 在 Linux 操作系统上安装和配置 Flutter 开发环境
description: How to install on Linux.
description: 如何在 Linux 上安装 Flutter。
short-title: Linux
next:
  title: Set up an editor
  title: 编辑工具设定
  path: /docs/get-started/editor
---

{% assign os = 'linux' -%}

## System requirements

## 系统配置要求

To install and run Flutter,
your development environment must meet these minimum requirements:

要想安装和运行 Flutter，你的开发环境至少应该满足如下的需求：

- **Operating Systems**: Linux (64-bit)
  
  **操作系统**: Linux (64 位)
  
- **Disk Space**: 600 MB (does not include disk space for IDE/tools).
 
  **磁盘空间**: 600MB (不包含安装 IDE 和其他工具的空间)

- **Tools**: Flutter depends on these command-line tools being available
  in your environment.
 
  **命令工具**: Flutter 需要你的开发环境中已经配置了以下命令行工具。

  - `bash`
  - `curl`
  - `git` 2.x
  - `mkdir`
  - `rm`
  - `unzip`
  - `which`
  - `xz-utils`
  - `zip`

- **Shared libraries**: Flutter `test` command depends on this library
  being available in your environment.
  
  **公用库**: Flutter 的 `test` 命令需要你的系统安装或存在如下的公用库。
  
  - `libGLU.so.1` - provided by mesa packages such as `libglu1-mesa` on
     Ubuntu/Debian
    
    `libGLU.so.1` - 由 mesa 套件 (packages) 提供，
    比如 Ubuntu/Debian 系统下的 `libglu1-mesa`

{% include_relative _get-sdk.md %}

{% include_relative _path-linux-chromeos.md %}

{% include_relative _android-setup.md %}

{% include_relative _web-setup.md %}

## Next step

## 下一步

Set up your preferred editor.

编辑器设置。

