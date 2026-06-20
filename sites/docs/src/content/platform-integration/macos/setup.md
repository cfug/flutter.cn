---
# title: Set up macOS development
title: 配置 macOS 开发环境
# description: >-
#   Configure your development environment to
#   run, build, and deploy Flutter apps for macOS devices.
description: >-
  配置开发环境，以便在 macOS 设备上运行、构建和部署 Flutter 应用。
ai-translated: true
---

Learn how to set up your development environment
to run, build, and deploy Flutter apps for the macOS desktop platform.

了解如何配置开发环境，以便在 macOS 桌面平台上运行、构建和部署 Flutter 应用。

:::note
If you haven't set up Flutter already,
visit and follow [Install Flutter][] first.

若尚未配置 Flutter，请先访问并遵循 [安装 Flutter][Install Flutter]。

If you've already installed Flutter,
ensure that it's [up to date][].

若已安装 Flutter，请确保其 [为最新版本][up to date]。
:::

[Install Flutter]: /install
[up to date]: /install/upgrade

## Set up tooling {: #set-up-tooling}

## 配置工具链 {: #set-up-tooling}

With Xcode, you can run Flutter apps on macOS as well as
compile and debug native Swift and Objective-C code.

借助 Xcode，你可以在 macOS 上运行 Flutter 应用，并编译、调试原生 Swift 与 Objective-C 代码。

 1. <h3>Install Xcode</h3>

    <h3>安装 Xcode</h3>

    If you haven't done so already,
    [install and set up the latest version of Xcode][xcode].

    若尚未安装，请 [安装并配置最新版 Xcode][xcode]。

    If you've already installed Xcode,
    update it to the latest version using the
    same installation method you used originally.

    若已安装 Xcode，请用当初的安装方式将其更新到最新版本。

 1. <h3>Set up Xcode command-line tools</h3>

    <h3>配置 Xcode 命令行工具</h3>

    To configure the Xcode command-line tools to use
    the version of Xcode you installed,
    run the following command in your preferred terminal:

    将 Xcode 命令行工具配置为使用已安装的 Xcode 版本，在你常用的终端中运行：

    ```console
    $ sudo sh -c 'xcode-select -s /Applications/Xcode.app/Contents/Developer && xcodebuild -runFirstLaunch'
    ```

    If you downloaded Xcode elsewhere or need to use a different version,
    replace `/Applications/Xcode.app` with the path to there instead.

    若 Xcode 安装在其他位置或需使用其他版本，请将 `/Applications/Xcode.app` 替换为对应路径。

 1. <h3>Agree to the Xcode licenses</h3>

    <h3>同意 Xcode 许可协议</h3>

    After you've set up Xcode and configured its command-line tools,
    agree to the Xcode licenses.

    配置好 Xcode 及其命令行工具后，请同意 Xcode 许可协议。

    1. Open your preferred terminal.

       打开你常用的终端。

    1. Run the following command to review and sign the Xcode licenses.

       运行以下命令以查看并签署 Xcode 许可协议。

       ```console
       $ sudo xcodebuild -license
       ```

    1. Read and agree to all necessary licenses.

       阅读并同意所有必要的许可协议。

       Before agreeing to the terms of each license,
       read each with care.

       同意每项许可前，请仔细阅读条款。

       Once you've accepted all the necessary licenses successfully,
       the command should output how to review the licenses.

       成功接受所有必要许可后，命令会输出如何查看许可的说明。

 1. <h3>Install CocoaPods</h3>

    <h3>安装 CocoaPods</h3>

    To support [Flutter plugins][] that use native macOS code,
    install the latest version of [CocoaPods][].

    为支持使用原生 macOS 代码的 [Flutter 插件][Flutter plugins]，请安装最新版 [CocoaPods][]。

    Install CocoaPods following the
    [CocoaPods installation guide][].

    按 [CocoaPods 安装指南][CocoaPods installation guide] 安装 CocoaPods。

    If you've already installed CocoaPods,
    update it following the [CocoaPods update guide][].

    若已安装 CocoaPods，请按 [CocoaPods 更新指南][CocoaPods update guide] 更新。

{: .steps}

[xcode]: https://developer.apple.com/xcode/
[Flutter plugins]: /packages-and-plugins/developing-packages#types
[CocoaPods]: https://cocoapods.org/
[CocoaPods installation guide]: https://guides.cocoapods.org/using/getting-started.html#installation
[CocoaPods update guide]: https://guides.cocoapods.org/using/getting-started.html#updating-cocoapods

## Validate your setup {: #validate-setup}

## 验证配置 {: #validate-setup}

 1. <h3>Check for toolchain issues</h3>

    <h3>检查工具链问题</h3>

    To check for any issues with your macOS development setup,
    run the `flutter doctor` command in your preferred terminal:

    检查 macOS 开发环境是否有问题，在你常用的终端中运行 `flutter doctor`：

    ```console
    $ flutter doctor -v
    ```

    If you see any errors or tasks to complete
    under the **Xcode** section,
    complete and resolve them, then
    run `flutter doctor -v` again to verify any changes.

    若 **Xcode** 部分有错误或待办项，请完成并解决后再次运行 `flutter doctor -v` 验证。

 1. <h3>Check for macOS devices</h3>

    <h3>检查 macOS 设备</h3>

    To ensure Flutter can find and connect to your macOS device correctly,
    run `flutter devices` in your preferred terminal:

    确保 Flutter 能正确发现 macOS 设备，在你常用的终端中运行 `flutter devices`：

    ```console
    $ flutter devices
    ```

    If you set everything up correctly,
    there should be at least one entry with the platform marked as **macos**.

    若配置正确，应至少有一条平台的 **macos** 条目。

 1. <h3>Troubleshoot setup issues</h3>

    <h3>排查配置问题</h3>

    If you need help resolving any setup issues,
    check out [Install and setup troubleshooting][].

    若需帮助解决配置问题，请参阅 [安装与配置故障排除][Install and setup troubleshooting]。

    If you still have issues or questions,
    reach out on one of the Flutter [community][] channels.

    若仍有问题或疑问，可通过 Flutter [社区][community] 渠道联系。

{: .steps}

[Install and setup troubleshooting]: /install/troubleshoot
[community]: {{site.main-url}}/community

## Start developing for macOS {: #start-developing}

## 开始为 macOS 开发 {: #start-developing}

Congratulations!
Now that you've set up macOS desktop development for Flutter,
you can continue your Flutter learning journey while testing on macOS
or begin expanding integration with macOS.

恭喜！
你已完成 Flutter 的 macOS 桌面开发配置，
可在 macOS 上继续学习 Flutter，或开始扩展与 macOS 的集成。

<div class="card-grid link-cards">
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/pointing-the-way.png" height="160" aria-hidden="true" alt="Dash helping you explore Flutter learning resources.">
    </div>
    <div class="card-header">
      <span class="card-title">继续学习 Flutter</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/learn/pathway">学习基础知识</a>
        </li>
        <li>
          <a class="text-button" href="https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">探索 Flutter widget</a>
        </li>
        <li>
          <a class="text-button" href="/reference/learning-resources">查看示例</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-desktop.svg" height="160" aria-hidden="true" alt="An outline of Flutter desktop support.">
    </div>
    <div class="card-header">
      <span class="card-title">为 macOS 构建</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/deployment/macos">构建并部署到 macOS</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/macos/c-interop">绑定原生 macOS 代码</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/macos/platform-views">嵌入原生 macOS 视图</a>
        </li>
        <li>
          <a class="text-button" href="/deployment/flavors-ios">配置应用 flavor</a>
        </li>
        <li>
          <a class="text-button" href="/packages-and-plugins/swift-package-manager/for-app-developers">使用 Swift Package Manager</a>
        </li>
      </ul>
    </div>
  </div>
</div>
