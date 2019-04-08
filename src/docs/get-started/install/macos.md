---
title: macOS install
title: macOS 下 Flutter 的安装和开发环境配置
short-title: macOS
next:
  title: Set up an editor
  title: 编辑工具设定
  path: /docs/get-started/editor
---

{% assign os = 'macos' -%}

## System requirements

## 系统配置要求


To install and run Flutter, your development environment must meet these minimum requirements:

想要安装并运行 Flutter，你的开发环境需要最低满足以下要求：

- **Operating Systems**: macOS (64-bit)

  **操作系统**：macOS（64 位）

- **Disk Space**: 700 MB (does not include disk space for IDE/tools).

  **磁盘空间**：700 MB（不包含 IDE 或其余工具所需要的磁盘空间） 

- **Tools**: Flutter depends on these command-line tools being available in your environment.

  **命令工具**：Flutter 需要你的开发环境中已经配置了以下命令行工具。

  - `bash`
  - `curl`
  - `git` 2.x
  - `mkdir`
  - `rm`
  - `unzip`
  - `which`

{% include_relative _get-sdk.md %}

{% include_relative _path-mac-linux.md %}

## Platform setup

## 平台配置


MacOS supports developing Flutter apps for both iOS and Android. Complete at
least one of the two platform setup steps now, to be able to build and run your
first Flutter app.

macOS 可以允许开发 iOS 和 Android 两个平台的 Flutter 应用，你可以任选一个平台完成初始配置，
以此来搭建并运行起来你的第一个 Flutter 应用。

{% include_relative _ios-setup.md %}

{% include_relative _android-setup.md %}

## Next step

## 下一步


[Next step: Configure Editor](/docs/get-started/editor)

[下一步: 编辑工具设定](/docs/get-started/editor)
