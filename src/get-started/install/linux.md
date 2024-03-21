---
title: Linux Installation Guide
title: 在 Linux 操作系统上安装和配置 Flutter 开发环境
description: Learn how to install Flutter on Linux.
description: 学习如何在 Linux 上安装 Flutter。
short-title: Linux
tags: Flutter安装,Flutter环境搭建
keywords: Flutter Linux,Flutter macOS,Flutter镜像,Linux开发Flutter
next:
  title: Set up an editor
  title: 编辑工具设定
  path: /get-started/editor
---

{% assign os = 'linux' -%}

## System requirements

## 系统配置要求

To install and run Flutter,
your Linux development environment needs to meet these minimum requirements:

要想安装和运行 Flutter，你的开发环境至少应该满足如下的需求：

- **Operating System**: Linux (64-bit)

  **操作系统**: Linux (64 位)

- **Disk Space**: At least 1.6 GB (excluding disk space for IDE/tools).

  **磁盘空间**: 1.6 GB (不包含安装 IDE 和其他工具的空间)

- **Tools**: Flutter relies on these command-line tools:

  **命令工具**: Flutter 需要以下命令行工具：

  - `bash`
  - `curl`
  - `file`
  - `git` 2.x
  - `mkdir`
  - `rm`
  - `unzip`
  - `which`
  - `xz-utils`
  - `zip`

- **Shared libraries**: To utilize the `flutter test` command,
  your environment needs the library `libGLU.so.1`.
  The `mesa` packages provide this library:
  `libglu1-mesa` on Ubuntu/Debian and `mesa-libGLU` on Fedora.

  **公用库**: Flutter 的 `test` 命令需要 `libGLU.so.1` 库。
  `mesa` 套件已经包含了这个库：
  在 Ubuntu/Debian 上是 `libglu1-mesa`，在 Fedora 上是 `mesa-libGLU`。

{% include_relative _get-sdk-linux.md %}

{% include_relative _path-linux-chromeos.md %}

{% include_relative _android-setup.md %}

{% include_relative _linux-desktop-setup.md %}

## Next step

## 下一步

Set up your preferred editor.

编辑器设置。

