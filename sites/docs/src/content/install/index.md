---
# title: Install and set up Flutter
title: 安装并配置 Flutter
# shortTitle: Install
shortTitle: 安装
# description: >-
#   Download and install the Flutter SDK, configure your IDE and target
#   platforms, or update and troubleshoot an existing Flutter installation.
description: >-
  下载并安装 Flutter SDK，配置 IDE 和目标平台，
  或更新、排查、移除现有安装。
ai-translated: true
---
<a id="get-started" aria-hidden="true"></a>

## Choose an installation method {: #install}

## 选择安装方式

To start building multiplatform apps from a single codebase,
choose how you'd like to install the Flutter SDK:

要从同一套代码开始构建多平台应用，
先选择安装 Flutter SDK 的方式：

<div class="card-grid wide">
  <div class="card filled-card outlined-card">
    <div class="card-header">
      <span class="card-title">
        <Icon id="rocket_launch" filled="true" size="1.675rem" />
        <span><t>Install with VS Code</t><t>使用 VS Code 安装</t></span>
      </span>
      <span class="card-subtitle" style="margin-top: 0.1rem;"><t>Recommended</t><t>推荐</t></span>
    </div>
    <div class="card-content" style="flex-direction: column; align-items: flex-start; justify-content: space-between; flex: 1;">
      <p>Use the Flutter extension in VS Code or another Code OSS-based editor
        to download and install the Flutter SDK, add it to your
        <code>PATH</code>, and validate your setup.</p>
      <p>在 VS Code 或其他基于 Code OSS 的编辑器中使用 Flutter 扩展，
        下载并安装 Flutter SDK，把它加入
        <code>PATH</code>，并验证配置是否可用。</p>
      <a class="filled-button" style="padding: 0.55rem 1.15rem; margin-top: 0.5rem;" href="/install/with-vs-code"><t>Install with VS Code</t><t>使用 VS Code 安装</t></a>
    </div>
  </div>
  <div class="card outlined-card">
    <div class="card-header">
      <span class="card-title">
        <Icon id="download" filled="true" size="1.675rem" />
        <span><t>Download and install manually</t><t>手动下载并安装</t></span>
      </span>
      <span class="card-subtitle" style="margin-top: 0.1rem;"><t>Set up without VS Code</t><t>不使用 VS Code 配置</t></span>
    </div>
    <div class="card-content" style="flex-direction: column; align-items: flex-start; justify-content: space-between; flex: 1;">
      <p>Download the latest stable Flutter SDK bundle for your operating
        system, extract the archive, and add Flutter to your
        <code>PATH</code>.</p>
      <p>下载适用于你的操作系统的最新稳定版 Flutter SDK 压缩包，
        解压后把 Flutter 加入
        <code>PATH</code>。</p>
      <a class="outlined-button" style="padding: 0.55rem 1.15rem; margin-top: 0.5rem;" href="/install/manual"><t>Download SDK and install</t><t>下载 SDK 并安装</t></a>
    </div>
  </div>
</div>

<a id="editor" aria-hidden="true"></a>

## Set up target platforms and editors {: #target-platform}

## 配置目标平台和编辑器

After you install the Flutter SDK,
set up the tools for your target platforms and configure your preferred editor:

安装 Flutter SDK 之后，
为你的目标平台安装工具，并配置你常用的编辑器：

- **Target platforms:** Set up development tools for [Android][], [iOS][],
  [web][] (requires only a supported browser), [Windows][], [macOS][], or
  [Linux][].

  **目标平台：** 为 [Android][]、[iOS][]、
  [Web][web]（只需要受支持的浏览器）、[Windows][]、[macOS][] 或
  [Linux][] 配置开发工具。

- **IDEs and editors:** Configure Flutter support in [VS Code][] or
  [Android Studio and IntelliJ][].

  **IDE 和编辑器：** 在 [VS Code][] 或
  [Android Studio 和 IntelliJ][Android Studio and IntelliJ] 中配置 Flutter 支持。

[Android]: /platform-integration/android/setup
[iOS]: /platform-integration/ios/setup
[web]: /platform-integration/web/setup
[Windows]: /platform-integration/windows/setup
[macOS]: /platform-integration/macos/setup
[Linux]: /platform-integration/linux/setup
[VS Code]: /tools/vs-code#setup
[Android Studio and IntelliJ]: /tools/android-studio#setup

<a id="try" aria-hidden="true"></a>
<a id="update" aria-hidden="true"></a>
<a id="previous-releases" aria-hidden="true"></a>

<a id="uninstall" aria-hidden="true"></a>

## Manage or troubleshoot your installation {: #manage}

## 管理或排查安装

If you already have Flutter installed,
use the following guides to update, configure,
troubleshoot, or remove your installation:

如果已经安装了 Flutter，
可以用下面的指南更新、配置、
排查或移除这次安装：

<div class="card-grid">
  <Card title="升级 Flutter" link="/install/upgrade" outlined="true">
    把 Flutter SDK 升级到最新版本，或切换发布渠道。
  </Card>
  <Card title="SDK 归档" link="/install/archive" outlined="true">
    下载并安装 Flutter SDK 的历史版本。
  </Card>
  <Card title="把 Flutter 加入 PATH" link="/install/add-to-path" outlined="true">
    配置系统的 PATH 环境变量，以便在命令行运行 Flutter。
  </Card>
  <Card title="排查 SDK" link="/install/troubleshoot" outlined="true">
    解决 Flutter 开发环境中的常见问题。
  </Card>
  <Card title="卸载 SDK" link="/install/uninstall" outlined="true">
    从系统中移除 Flutter SDK 和相关配置文件。
  </Card>
</div>

<a id="next-steps" aria-hidden="true"></a>

:::tip Ready to start building?
Once your environment is set up,
follow the [Flutter learning pathway][] to build your first Flutter app.

环境配置好之后，
按照 [Flutter 学习路径][Flutter learning pathway] 构建你的第一个 Flutter 应用。
:::

[Flutter learning pathway]: /learn/pathway
