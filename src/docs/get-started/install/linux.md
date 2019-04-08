---
title: Linux install
title: Linux 下 Flutter 的安装和开发环境配置
short-title: Linux
# js: [{defer: true, url: /assets/archive.js}]
next:
  title: Set up an editor
  title: 编辑工具设定
  path: /docs/get-started/editor
---

{% assign os = 'linux' -%}

## System requirements

## 系统配置要求

To install and run Flutter, your development environment must meet these minimum requirements:

要想安装和运行 Flutter，你的开发环境至少应该满足如下的需求：

- **Operating Systems**: Linux (64-bit)
  
  **操作系统**: Linux (64 位)
  
- **Disk Space**: 600 MB (does not include disk space for IDE/tools).
 
  **磁盘空间**: 600MB (不包含安装 IDE 和其他工具的空间)

- **Tools**: Flutter depends on these command-line tools being available in your environment.
 
  **命令工具**: Flutter 需要你的开发环境中已经配置了以下命令行工具。

  - `bash`
  - `curl`
  - `git` 2.x
  - `mkdir`
  - `rm`
  - `unzip`
  - `which`
  - `xz-utils`

- **Shared libraries**: Flutter `test` command depends on this library being available in your environment.
  
  **公用库**: Flutter 的 `test` 命令需要你的系统安装或存在如下的公用库。
  
  - `libGLU.so.1` - provided by mesa packages e.g. `libglu1-mesa` on Ubuntu/Debian
    
    `libGLU.so.1` - 由 mesa 套件 (packages) 提供，比如 Ubuntu/Debian 系统下的 `libglu1-mesa`

{% include_relative _get-sdk.md %}

{% include_relative _path-mac-linux.md %}

{% include_relative _android-setup.md %}

## Next step

## 下一步

[Next step: Configure Editor](/docs/get-started/editor)

[下一步: 编辑工具设定](/docs/get-started/editor)

