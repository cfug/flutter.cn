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

- **Operating Systems**: macOS, version 10.14 (Mojave) or later.

  **操作系统**：macOS，需要 10.14 (Mojave) 以及以上版本的操作系统

- **Disk Space**: 2.8 GB (does not include disk space for IDE/tools).

  **磁盘空间**：2.8 GB（不包含 IDE 或其余工具所需要的磁盘空间） 

- **Tools**: Flutter uses `git` for installation and upgrade. We recommend
  installing [Xcode][], which includes `git`, but you can also 
  [install `git` separately][]. 

  **工具**：Flutter 使用 `git` 进行安装和升级，我们建议您安装包含了 `git` 的 Xcode，
  或者您也可以 [单独安装 `git`][install `git` separately]。

{{site.alert.important}}

  If you're installing on an [Apple Silicon Mac][], you must have the Rosetta
  translation environment available for [some ancillary tools]. 
  You can install this manually by running:

  如果你要在 [Apple 芯片的 Mac 电脑][] 上使用，你还需要安装
  Rosetta 2 环境因为 [一些辅助工具][some ancillary tools] 仍然需要，
  你可以通过手动运行下面的命令来安装：

  ```terminal
$ sudo softwareupdate --install-rosetta --agree-to-license
  ```

{{site.alert.end}}

{% include_relative _get-sdk-mac.md %}

{% include_relative _path-mac.md %}

## Platform setup

## 平台配置

macOS supports developing Flutter apps for iOS, Android, macOS itself 
and the web. Complete at least one of the platform setup steps now,
to be able to build and run your first Flutter app.

macOS 系统可以开发支持 iOS、Android、macOS 桌面以及 Web 的 Flutter 应用，
你可以任选一个平台完成初始配置，以此来搭建并运行你的第一个 Flutter 应用。

{% include_relative _ios-setup.md %}

{% include_relative _android-setup.md %}

{% include_relative _macos-desktop-setup.md %}

## Next step

## 下一步

Set up your preferred editor.

编辑器设置。

[Apple Silicon Mac]: https://support.apple.com/en-us/HT211814
[Apple 芯片的 Mac 电脑]: https://support.apple.com/zh-cn/HT211814
[some ancillary tools]: https://github.com/flutter/website/pull/7119#issuecomment-1124537969
[these supplementary notes]: {{site.repo.flutter}}/wiki/Developing-with-Flutter-on-Apple-Silicon
[Xcode]: {{site.apple-dev}}/xcode/
[install `git` separately]: https://git-scm.com/download/mac