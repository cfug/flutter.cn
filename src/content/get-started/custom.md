---
# title: Set up Flutter for your needs
title: 根据你的需求配置 Flutter
# shortTitle: Custom setup
shortTitle: 自定义配置
# description: >-
#   Install and set up Flutter for your preferred
#   development environment and target platforms.
description: >-
  为你偏好的开发环境和目标平台安装并配置 Flutter。
showBanner: false
sitemap: false
---

To get started developing with Flutter,
follow these steps to install and set up Flutter
for your preferred development environment and target platform.

要开始使用 Flutter 进行开发，
请按照以下步骤为你偏好的开发环境和目标平台安装并配置 Flutter。

If you plan to use VS Code or another Code - OSS derived editor,
consider following the [Flutter quick start][] instead.

如果你打算使用 VS Code 或其他基于 Code OSS 的编辑器，
可以考虑改为按照 [Flutter 快速开始][Flutter quick start]进行操作。

[Flutter quick start]: /get-started/quick

## Install and set up Flutter {: #install}

## 安装并配置 Flutter {: #install}

To get started developing apps with Flutter,
install the Flutter SDK to your development device.
Choose one of the following installation methods:

要开始使用 Flutter 开发应用，
请在你的开发设备上安装 Flutter SDK。
选择以下安装方式之一：

<div class="card-grid">
  <a class="card outlined-card" href="/install/with-vs-code" target="_blank">
    <div class="card-header">
      <span class="card-title"><t>Install with VS Code</t><t>使用 VS Code 安装</t></span>
      <span class="card-subtitle"><t>Recommended</t><t>推荐</t></span>
    </div>
    <div class="card-content">
      <p>Use VS Code to quickly set up your Flutter development environment.</p>
      <p>使用 VS Code 快速配置你的 Flutter 开发环境。</p>
    </div>
  </a>
  <a class="card outlined-card" href="/install/manual" target="_blank">
    <div class="card-header">
      <span class="card-title"><t>Install manually</t><t>手动安装</t></span>
      <span class="card-subtitle"><t>For specific releases</t><t>适用于特定版本</t></span>
    </div>
    <div class="card-content">
      <p>Manually install and set up a specific Flutter SDK release.</p>
      <p>手动安装并配置特定版本的 Flutter SDK。</p>
    </div>
  </a>
</div>

## Set up an IDE or editor {: #editor}

## 配置 IDE 或编辑器 {: #editor}

For the best development experience with Flutter,
install an IDE or editor with support for Dart and Flutter.
Some popular options include VS Code, Android Studio,
Firebase Studio, and other Code OSS-based editors.

为了获得最佳的 Flutter 开发体验，
请安装支持 Dart 和 Flutter 的 IDE 或编辑器。
一些常用的选项包括 VS Code、Android Studio、
Firebase Studio 以及其他基于 Code OSS 的编辑器。

<div class="card-grid wide">
 <a class="card outlined-card" href="/tools/vs-code#setup" target="_blank">
   <div class="card-header">
     <span class="card-title">VS Code</span>
   </div>
   <div class="card-content">
     <p>Set up Flutter support in VS Code.</p>
     <p>在 VS Code 中配置 Flutter 支持。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/tools/android-studio#setup" target="_blank">
   <div class="card-header">
     <span class="card-title">Android Studio</span>
   </div>
   <div class="card-content">
     <p>Set up Flutter support in Android Studio.</p>
     <p>在 Android Studio 中配置 Flutter 支持。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/tools/android-studio#setup" target="_blank">
   <div class="card-header">
     <span class="card-title">IntelliJ</span>
   </div>
   <div class="card-content">
     <p>Set up Flutter support in an IntelliJ-based IDE.</p>
     <p>在基于 IntelliJ 的 IDE 中配置 Flutter 支持。</p>
   </div>
 </a>
 <a class="card outlined-card" href="https://studio.firebase.google.com/new/flutter" target="_blank">
   <div class="card-header">
     <span class="card-title">Firebase Studio</span>
   </div>
   <div class="card-content">
     <p>Create a new Flutter workspace in Firebase Studio.</p>
     <p>在 Firebase Studio 中创建新的 Flutter 工作区。</p>
   </div>
 </a>
</div>

## Set up a target platform {: #target-platform}

## 配置目标平台 {: #target-platform}

Once you've successfully installed Flutter,
set up development for at least one target platform
to continue your journey with Flutter.

成功安装 Flutter 后，
请至少为一个目标平台配置开发环境，
以继续你的 Flutter 之旅。

We recommend [developing for the web][web-setup]{: target="_blank"} first as
it requires no additional setup besides an appropriate browser.
You can always set up development for additional target platforms later.

我们建议首先[为 Web 平台开发][web-setup]{: target="_blank"}，
因为它除了需要一个合适的浏览器外，不需要其他额外配置。
你随时可以在之后为其他目标平台配置开发环境。

<div class="card-grid wide">
 <a class="card outlined-card" href="/platform-integration/android/setup" target="_blank">
   <div class="card-header">
     <span class="card-title"><t>Target Android</t><t>面向 Android</t></span>
     <span class="card-subtitle"><t>On any device</t><t>任何设备</t></span>
   </div>
   <div class="card-content">
     <p>Set up your development environment to build Flutter apps for Android.</p>
     <p>配置你的开发环境以构建 Android 平台的 Flutter 应用。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/platform-integration/ios/setup" target="_blank">
   <div class="card-header">
     <span class="card-title"><t>Target iOS</t><t>面向 iOS</t></span>
     <span class="card-subtitle"><t>On macOS only</t><t>仅限 macOS</t></span>
   </div>
   <div class="card-content">
     <p>Set up your development environment to build Flutter apps for iOS.</p>
     <p>配置你的开发环境以构建 iOS 平台的 Flutter 应用。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/platform-integration/web/setup" target="_blank">
   <div class="card-header">
     <span class="card-title"><t>Target Web</t><t>面向 Web</t></span>
     <span class="card-subtitle"><t>On any device</t><t>任何设备</t></span>
   </div>
   <div class="card-content">
     <p>Set up your development environment to build Flutter apps for the web.</p>
     <p>配置你的开发环境以构建 Web 平台的 Flutter 应用。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/platform-integration/windows/setup" target="_blank">
   <div class="card-header">
     <span class="card-title"><t>Target Windows</t><t>面向 Windows</t></span>
     <span class="card-subtitle"><t>On Windows only</t><t>仅限 Windows</t></span>
   </div>
   <div class="card-content">
     <p>Set up your development environment to build Flutter apps for Windows desktop.</p>
     <p>配置你的开发环境以构建 Windows 桌面平台的 Flutter 应用。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/platform-integration/macos/setup" target="_blank">
   <div class="card-header">
     <span class="card-title"><t>Target macOS</t><t>面向 macOS</t></span>
     <span class="card-subtitle"><t>On macOS only</t><t>仅限 macOS</t></span>
   </div>
   <div class="card-content">
     <p>Set up your development environment to build Flutter apps for macOS desktop.</p>
     <p>配置你的开发环境以构建 macOS 桌面平台的 Flutter 应用。</p>
   </div>
 </a>
 <a class="card outlined-card" href="/platform-integration/linux/setup" target="_blank">
   <div class="card-header">
     <span class="card-title"><t>Target Linux</t><t>面向 Linux</t></span>
     <span class="card-subtitle"><t>On Linux only</t><t>仅限 Linux</t></span>
   </div>
   <div class="card-content">
     <p>Set up your development environment to build Flutter apps for Linux desktop.</p>
     <p>配置你的开发环境以构建 Linux 桌面平台的 Flutter 应用。</p>
   </div>
 </a>
</div>

[web-setup]: /platform-integration/web/setup

## Continue your Flutter journey {: #next-steps}

## 继续你的 Flutter 之旅 {: #next-steps}

**Congratulations!**
Now that you've installed Flutter, set up an IDE or editor,
and set up development for a target platform,
you can continue your Flutter learning journey.

**恭喜！**
现在你已经安装了 Flutter，配置了 IDE 或编辑器，
并为目标平台配置了开发环境，
你可以继续你的 Flutter 学习之旅了。

Follow the codelab on [Building your first app][],
set up development for an [additional target platform][], or
explore some of these other learning resources.

按照[构建你的第一个应用][Building your first app]的 codelab 继续学习，
为[其他目标平台][additional target platform]配置开发环境，
或者探索以下其他学习资源。

{% render "docs/get-started/setup-next-steps.html", site:site %}

[Building your first app]: /get-started/codelab
[additional target platform]: /platform-integration#setup
