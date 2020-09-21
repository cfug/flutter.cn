---
title: macOS install
title: 在 macOS 上安装和配置 Flutter 开发环境
description: How to install on macOS.
description: 如何在 macOS 上安装 Flutter。
short-title: macOS
tags: Flutter安装,Flutter环境搭建
keywords: Flutter macOS,Flutter镜像,macOS开发Flutter,macOS开发环境配置
next:
  title: Set up an editor
  title: 编辑工具设定
  path: /docs/get-started/editor
---

{% assign os = 'macos' -%}

## System requirements

## 系统配置要求

To install and run Flutter,
your development environment must meet these minimum requirements:

想要安装并运行 Flutter，你的开发环境需要最低满足以下要求：

- **Operating Systems**: macOS (64-bit)

  **操作系统**：macOS（64 位）

- **Disk Space**: 2.8 GB (does not include disk space for IDE/tools).

  **磁盘空间**：2.8 GB（不包含 IDE 或其余工具所需要的磁盘空间） 

- **Tools**: Flutter depends on these command-line tools being available
  in your environment.

  **命令工具**：Flutter 需要你的开发环境中已经配置了以下命令行工具。

  - `bash`
  - `curl`
  - `git` 2.x
  - `mkdir`
  - `rm`
  - `unzip`
  - `which`
  - `zip`

{% include_relative _get-sdk.md %}

{% include_relative _path-mac.md %}

## Platform setup

## 平台配置

macOS supports developing Flutter apps in iOS, Android,
and the web (technical preview release).
Complete at least one of the platform setup steps now,
to be able to build and run your first Flutter app.

macOS 可以允许开发 iOS、Android 和 Web（技术预览版正式发布）
三个平台的 Flutter 应用，
你可以任选一个平台完成初始配置，
以此来搭建并运行起来你的第一个 Flutter 应用。

{% include_relative _ios-setup.md %}

{% include_relative _android-setup.md %}

{% include_relative _web-setup.md %}

## Next step

## 下一步

Set up your preferred editor.

编辑器设置。
