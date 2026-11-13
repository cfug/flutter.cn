---
# title: Install and set up Flutter
title: 安装并配置 Flutter
# shortTitle: Install
shortTitle: 安装
# description: >-
#   Download and install the Flutter SDK, configure your IDE and target
#   platforms, or update and troubleshoot an existing Flutter installation.
description: >-
  下载并安装 Flutter SDK，配置你的 IDE 和目标平台，
  或者更新排查现有 Flutter 安装故障。
---

<a id="get-started" aria-hidden="true"></a>

## Choose an installation method {: #install}

## 选择安装方式

To start building multiplatform apps from a single codebase,
choose how you'd like to install the Flutter SDK:

你想要只编写一套代码就可以覆盖多个平台吗？
请选择你希望如何安装 Flutter SDK：

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
      <p>在 VS Code 中使用 Flutter 扩展，或在其他基于 Code OSS 的编辑器中下载并安装 Flutter SDK，将其添加到 <code>PATH</code> 中，并验证你的配置。</p>
      <a class="filled-button" style="padding: 0.55rem 1.15rem; margin-top: 0.5rem;" href="/install/with-vs-code"><t>Install with VS Code</t><t>使用 VS Code 安装</t></a>
    </div>
  </div>
  <div class="card outlined-card">
    <div class="card-header">
      <span class="card-title">
        <Icon id="download" filled="true" size="1.675rem" />
        <span><t>Download and install manually</t><t>手动下载并安装</t></span>
      </span>
      <span class="card-subtitle" style="margin-top: 0.1rem;"><t>Set up without VS Code</t><t>无需 VS Code 的配置</t></span>
    </div>
    <div class="card-content" style="flex-direction: column; align-items: flex-start; justify-content: space-between; flex: 1;">
      <p>下载适用于你操作系统的最新稳定版 Flutter SDK 压缩包，解压并将 Flutter 添加到你的 <code>PATH</code> 中。</p>
      <a class="outlined-button" style="padding: 0.55rem 1.15rem; margin-top: 0.5rem;" href="/install/manual"><t>Download SDK and install</t><t>下载 SDK 并安装</t></a>
    </div>
  </div>
</div>

<a id="editor" aria-hidden="true"></a>

## Set up target platforms and editors {: #target-platform}

## 配置目标平台和编辑器

After you install the Flutter SDK,
set up the tools for your target platforms and configure your preferred editor:

安装 Flutter SDK 后，
请为目标平台配置相关工具，并配置你喜欢的编辑器：

- **Target platforms:** Set up development tools for [Android][], [iOS][],
  [web][] (requires only a supported browser), [Windows][], [macOS][], or
  [Linux][].

  **目标平台：** 为 [Android][]、[iOS][]、
  [web][]（仅需支持的浏览器）、[Windows][]、[macOS][] 或者 
  [Linux][] 配置开发工具。

- **IDEs and editors:** Configure Flutter support in [VS Code][] or
  [Android Studio and IntelliJ][].

  **IDE 和编辑器：** 在 [VS Code][] 或者 [Android Studio 和 IntelliJ][Android Studio and IntelliJ]
  中配置 Flutter 支持。

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

## 管理或排除安装故障

If you already have Flutter installed,
use the following guides to update, configure,
troubleshoot, or remove your installation:

如果你已经安装了 Flutter，
请参考以下指南进行更新、配置、排除故障或者卸载：

<div class="card-grid">
  <Card title="Upgrade Flutter" link="/install/upgrade" outlined="true">
    <!-- Upgrade the Flutter SDK to the latest release or switch release channels. -->
    将 Flutter SDK 升级到最新版本或者切换发布渠道。
  </Card>
  <Card title="SDK archive" link="/install/archive" outlined="true">
    <!-- Download and install previous releases of the Flutter SDK. -->
    下载并安装 Flutter SDK 的旧版本。
  </Card>
  <Card title="Add Flutter to PATH" link="/install/add-to-path" outlined="true">
    <!-- Configure your system's PATH environment variable to run
    Flutter on the command line. -->
    配置系统的 PATH 环境变量，以便在命令行运行 Flutter。
  </Card>
  <Card title="Troubleshoot SDK" link="/install/troubleshoot" outlined="true">
    <!-- Resolve common issues with your Flutter development environment. -->
    解决 Flutter 开发环境中的常见问题。
  </Card>
  <Card title="Uninstall SDK" link="/install/uninstall" outlined="true">
    <!-- Remove the Flutter SDK and related configuration files from your system. -->
    从系统中删除 Flutter SDK 以及相关配置文件。
  </Card>
</div>

<a id="next-steps" aria-hidden="true"></a>

:::tip 准备好开始构建了吗？
<!-- Ready to start building? -->

Once your environment is set up,
follow the [Flutter learning pathway][] to build your first Flutter app.

环境配置完成后，
请按照 [Flutter 学习路径][Flutter learning pathway] 来构建你的第一个 Flutter 应用。

:::

[Flutter learning pathway]: /learn/pathway
