---
# title: Set up iOS development
title: 配置 iOS 开发
# description: >-
#   Configure your development environment to
#   run, build, and deploy Flutter apps for iOS devices.
description: 配置你的开发环境，以便在 iOS 设备上运行、构建和部署 Flutter 应用。
---

:::note

本篇文档由 AI 翻译。

:::

Learn how to set up your development environment
to run, build, and deploy Flutter apps for iOS devices.

学习如何设置你的开发环境，
以便在 iOS 设备上运行、构建和部署 Flutter 应用。

:::note

If you haven't set up Flutter already,
visit and follow the [Get started with Flutter][] guide first.

如果你还没有设置 Flutter，
请先访问并按照 [Flutter 起步教程][Get started with Flutter] 指南进行操作。

If you've already installed Flutter,
ensure that it's [up to date][].

如果你已经安装了 Flutter，
请确保它是 [最新版本][up to date]。

:::

[Get started with Flutter]: /get-started
[up to date]: /install/upgrade

## Set up iOS tooling {: #set-up-tooling}

## 配置 iOS 工具 {: #set-up-tooling}

With Xcode, you can run Flutter apps on
an iOS physical device or on the iOS Simulator.

使用 Xcode，你可以在 iOS 物理设备或 iOS 模拟器上运行 Flutter 应用。

 1. <h3>Install Xcode</h3>

    <h3>安装 Xcode</h3>

    If you haven't done so already,
    [install and set up the latest version of Xcode][xcode].

    如果你还没有安装 Xcode，
    请先 [安装并设置最新版本的 Xcode][xcode]。

    If you've already installed Xcode,
    update it to the latest version using the
    same installation method you used originally.

    如果你已经安装了 Xcode，
    请使用你最初使用的安装方法将其更新到最新版本。

 1. <h3>Set up Xcode command-line tools</h3>

    <h3>设置 Xcode 命令行工具</h3>

    To configure the Xcode command-line tools to use
    the version of Xcode you installed,
    run the following command in your preferred terminal:

    要配置 Xcode 命令行工具以使用
    你安装的 Xcode 版本，
    请在你喜欢的终端中运行以下命令：

    ```console
    $ sudo sh -c 'xcode-select -s /Applications/Xcode.app/Contents/Developer && xcodebuild -runFirstLaunch'
    ```

    If you downloaded Xcode elsewhere or need to use a different version,
    replace `/Applications/Xcode.app` with the path to there instead.

    如果你从其他地方下载了 Xcode 或需要使用其他版本，
    请将 `/Applications/Xcode.app` 替换为该路径。

 1. <h3>Agree to the Xcode licenses</h3>

    <h3>同意 Xcode 许可协议</h3>

    After you've set up Xcode and configured its command-line tools,
    agree to the Xcode licenses.

    在你设置 Xcode 并配置其命令行工具后，
    请同意 Xcode 许可协议。

    1. Open your preferred terminal.

       打开你喜欢的终端。

    1. Run the following command to review and sign the Xcode licenses.

       运行以下命令以查看并签署 Xcode 许可协议。

       ```console
       $ sudo xcodebuild -license
       ```

    1. Read and agree to all necessary licenses.

       阅读并同意所有必要的许可协议。

       Before agreeing to the terms of each license,
       read each with care.

       在同意每个许可协议的条款之前，
       请仔细阅读每个协议。

 1. <h3>Download prerequisite tooling</h3>

    <h3>下载必备工具</h3>

    To download iOS platform support and
    the latest iOS Simulator runtimes,
    run the following command in your preferred terminal.

    要下载 iOS 平台支持和
    最新的 iOS 模拟器运行时，
    请在你喜欢的终端中运行以下命令。

    ```console
    $ xcodebuild -downloadPlatform iOS
    ```

 1. <h3>Install Rosetta</h3>

    <h3>安装 Rosetta</h3>

    If you're developing on an [Apple Silicon][] (ARM) Mac,
    [install Rosetta 2][]:

    如果你正在 [Apple Silicon][] (ARM) Mac 上进行开发，
    [安装 Rosetta 2][install Rosetta 2]：

    ```console
    $ sudo softwareupdate --install-rosetta --agree-to-license
    ```

 1. <h3>Install CocoaPods</h3>

    <h3>安装 CocoaPods</h3>

    To support [Flutter plugins][] that use native iOS or macOS code,
    install the latest version of [CocoaPods][].

    为了支持使用原生 iOS 或 macOS 代码的 [Flutter 插件][Flutter plugins]，
    请安装最新版本的 [CocoaPods][]。

    Install CocoaPods by following the
    [CocoaPods installation guide][].

    请按照 [CocoaPods 安装指南][CocoaPods installation guide]
    安装 CocoaPods。

    If you've already installed CocoaPods,
    update it by following the [CocoaPods update guide][].

    如果你已经安装了 CocoaPods，
    请按照 [CocoaPods 更新指南][CocoaPods update guide] 进行更新。

{: .steps}

[xcode]: https://developer.apple.com/xcode/
[Apple Silicon]: https://support.apple.com/en-us/116943
[install Rosetta 2]: https://support.apple.com/en-us/102527
[cocoapods]: https://guides.cocoapods.org/using/getting-started.html#installation
[Flutter plugins]: /packages-and-plugins/developing-packages#types
[CocoaPods installation guide]: https://guides.cocoapods.org/using/getting-started.html#installation
[CocoaPods update guide]: https://guides.cocoapods.org/using/getting-started.html#updating-cocoapods

## Set up an iOS device {: #set-up-devices}

## 设置 iOS 设备 {: #set-up-devices}

We recommend starting with the iOS Simulator as
it's easier to get set up than a physical iOS device.
However, you should also test your app on an actual
physical device.

我们建议从 iOS 模拟器开始，因为它比物理 iOS 设备更容易设置。
但是，你也应该在实际的物理设备上测试你的应用。

<Tabs key="ios-simulator-or-physical-device">
<!-- <Tab name="Simulator"> -->
<Tab name="模拟器">

Start the iOS Simulator with the following command:

使用以下命令启动 iOS 模拟器：

```console
$ open -a Simulator
```

If you need to install a simulator for a different OS version,
check out [Downloading and installing additional Xcode components][]
on the Apple Developer site.

如果你需要为不同的操作系统版本安装模拟器，
请查看 Apple Developer 网站上的 [下载和安装其他 Xcode 组件][Downloading and installing additional Xcode components]。

[Downloading and installing additional Xcode components]: {{site.apple-dev}}/documentation/xcode/downloading-and-installing-additional-xcode-components

</Tab>
<!-- <Tab name="Physical device"> -->
<Tab name="物理设备">

:::warning

An upcoming change to iOS has caused a temporary break in Flutter's debug mode
on physical devices running iOS 26 (currently in beta).
If your physical device is already on iOS 26, we recommend switching to the
**Simulator** tab and following the instructions.
See [Flutter on latest iOS][] for details.

iOS 的即将到来的更改导致 Flutter 的调试模式在
运行 iOS 26（目前为 beta 版）的物理设备上暂时中断。
如果你的物理设备已经在 iOS 26 上，我们建议切换到
**模拟器** 选项卡并按照说明进行操作。
有关详细信息，请参阅 [Flutter on latest iOS][]。

:::

[Flutter on latest iOS]: /platform-integration/ios/ios-latest

Set up each iOS device on which you want to test.

设置每台需要测试的 iOS 设备。

 1. <h3>Configure your physical iOS device</h3>

    <h3>配置你的物理 iOS 设备</h3>

    1. Attach your iOS device to the USB port on your Mac.

       将你的 iOS 设备连接到 Mac 上的 USB 端口。

    1. On first connecting an iOS device to your Mac,
       your device displays the **Trust this computer?** dialog.

       首次将 iOS 设备连接到 Mac 时，
       你的设备会显示 **信任此电脑？** 对话框。

    1. Click **Trust**.

       点击 **信任**。

       ![Trust Mac](/assets/images/docs/setup/trust-computer.png)

 1. <h3>Configure your physical iOS device</h3>

    <h3>配置你的物理 iOS 设备</h3>

    Apple requires enabling **[Developer Mode][]**
    on the device to protect against malicious software.

    Apple 要求在设备上启用 **[开发者模式][Developer Mode]**
    以防止恶意软件。

    1. Tap on **Settings** <span aria-label="and then">></span>
       **Privacy & Security** <span aria-label="and then">></span>
       **Developer Mode**.

       点击 **设置** <span aria-label="and then">></span>
       **隐私与安全性** <span aria-label="and then">></span>
       **开发者模式**。

    1. Tap to toggle **Developer Mode** to **On**.

       点击以将 **开发者模式** 切换为 **开启**。

    1. Restart the device.

       重启设备。

    1. When the **Turn on Developer Mode?** dialog appears,
       tap **Turn On**.

       当出现 **打开开发者模式？** 对话框时，
       点击 **打开**。

 1. <h3>Create a developer code signing certificate</h3>

    <h3>创建开发者代码签名证书</h3>

    To send your app to a physical iOS device,
    _even_ for testing, you must establish trust
    between your Mac and the device.
    In addition to trusting the device when that
    popup appears, you must upload a signed
    developer certificate to your device.

    要将你的应用发送到物理 iOS 设备，
    **即使** 是为了测试，你也必须建立
    你的 Mac 和设备之间的信任关系。
    除了在弹出窗口出现时信任设备之外，
    你还必须将签名的
    开发者证书上传到你的设备。

    To create a signed development certificate,
    you need an Apple ID.
    If you don't have one, [create one][apple-account-new].
    You must also enroll in the [Apple Developer program][]
    and create an [Apple Developer account][].
    If you're just _testing_ your app on an iOS device,
    a personal Apple Developer account is free and works.

    要创建签名的开发证书，
    你需要一个 Apple ID。
    如果你没有，[创建一个][apple-account-new]。
    你还必须注册 [Apple Developer program][] 并创建一个 [Apple Developer account][]。
    如果你只是在 iOS 设备上 **测试** 你的应用，
    个人 Apple Developer 帐户是免费的并且可以使用。

    :::note Apple Developer program

    When you want to _deploy_ your app to the App Store,
    you'll need to upgrade your personal Apple Developer account to
    a professional account.

    当你想要将你的应用 **部署** 到 App Store 时，
    你需要将你的个人 Apple Developer 帐户升级到
    专业帐户。

    :::

 1. <h3>Prepare the device</h3>

    <h3>准备设备</h3>

    1. Find the **VPN & Device Management** menu under **Settings**.

       在 **设置** 下找到 **VPN 与设备管理** 菜单。

       Toggle your certificate to **Enable**.

       将你的证书切换为 **启用**。

       :::note

       If you can't find the **VPN & Device Management** menu,
       run your app on your iOS device once, then try again.

       如果你找不到 **VPN 与设备管理** 菜单，
       请在你的 iOS 设备上运行你的应用一次，然后重试。

       :::

    1. Under the **Developer App** heading,
       you should find your certificate.

       在 **开发者应用** 标题下，
       你应该能找到你的证书。

    1. Tap the certificate.

       点击证书。

    1. Tap **Trust "&lt;certificate&gt;"**.

       点击 **信任 "&lt;证书&gt;"**。

    1. When the dialog displays, tap **Trust**.

       当对话框显示时，点击 **信任**。

       If the **codesign wants to access key...** dialog appears:

       如果出现 **codesign 想要访问密钥...** 对话框：

       1. Enter your macOS password.

          输入你的 macOS 密码。

       1. Tap **Always Allow**.

          点击 **始终允许**。

{: .steps}

[apple-account-new]: https://support.apple.com/en-us/108647
[Developer Mode]: {{site.apple-dev}}/documentation/xcode/enabling-developer-mode-on-a-device
[Apple Developer program]: {{site.apple-dev}}/programs/
[Apple Developer account]: {{site.apple-dev}}/account

</Tab>
</Tabs>

---

## Start developing for iOS {: #start-developing}

## 开始为 iOS 开发 {: #start-developing}

**Congratulations.**
Now that you've set up iOS development for Flutter,
you can continue your Flutter learning journey while testing on iOS
or begin improving integration with iOS.

**恭喜你。**
既然你已经为 Flutter 设置了 iOS 开发，
你就可以在 iOS 上进行测试的同时继续你的 Flutter 学习之旅，
或者开始改进与 iOS 的集成。

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
          <a class="text-button" href="/get-started/codelab">编写第一个 Flutter 应用</a>
        </li>
        <li>
          <a class="text-button" href="/get-started/fundamentals">掌握基础知识</a>
        </li>
        <li>
          <a class="text-button" href="https://www.youtube.com/watch?v=b_sQ9bMltGU&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG">探索 Flutter widget</a>
        </li>
        <li>
          <a class="text-button" href="/reference/learning-resources">查看示例</a>
        </li>
        <li>
          <a class="text-button" href="/resources/bootstrap-into-dart">了解 Dart</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/flutter-on-phone.svg" height="160" aria-hidden="true" alt="A representation of Flutter on multiple devices.">
    </div>
    <div class="card-header">
      <span class="card-title">构建 iOS</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/deployment/ios">构建和发布为 iOS 应用</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/ios/c-interop">在 iOS 中使用原生代码</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/ios/apple-frameworks">运用系统框架</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/ios/platform-views">嵌入原生 iOS 视图</a>
        </li>
        <li>
          <a class="text-button" href="/packages-and-plugins/swift-package-manager/for-app-developers">使用 Swift Package Manager</a>
        </li>
      </ul>
    </div>
  </div>
</div>
