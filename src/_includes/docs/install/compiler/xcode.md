
## Configure iOS development

## 配置 iOS 开发

{% assign prompt1='$' %}

### Install and configure Xcode

### 安装并配置 Xcode

{% if include.attempt=="first" %}

To develop Flutter apps for {{include.target}}, install Xcode to compile to native bytecode.

要为 {{include.target}} 开发 Flutter 应用，
请安装 Xcode，以便编译为原生字节码。

1. Open the **App Store** and sign in.

   打开 **App Store** 并登录。

1. Search for `Xcode`.

   搜索 `Xcode`。

1. Click **Install**.

   点击 **获取 (Install)**。

   The Xcode installer takes up 6+ GB of storage.
   The download might take some time.

   Xcode 安装程序占用 6 GB 以上的存储空间。
   下载可能需要一些时间。

1. To configure the command-line tools to use the installed version of Xcode,
   use the following commands.

   请运行以下命令，
   来配置命令行工具使用已安装的 Xcode 版本。

    ```console
    {{prompt1}} sudo sh -c 'xcode-select -s /Applications/Xcode.app/Contents/Developer && xcodebuild -runFirstLaunch'
    ```

   Use this path for the latest version of Xcode.
   If you need to use a different version, specify that path instead.

   使用以上路径可以获取最新版本的 Xcode。
   如果你需要使用其他版本，请自行指定该路径。

1. Sign the Xcode license agreement.

   签署 Xcode 许可证协议。

    ```console
    {{prompt1}} sudo xcodebuild -license
    ```

{% else %}

<t>This section presumes you have installed and configured Xcode when you
installed Flutter for</t><t>本节假定你在安装用于</t>

{%- case include.target %}
{%- when 'iOS' %}
[macOS desktop][macos-install]
{%- when 'desktop' %}
[iOS][ios-install]
{%- endcase %}
 <t>development.</t><t>开发的 Flutter 时，已经安装并配置了 Xcode。</t>

[macos-install]: /get-started/install/macos/desktop/#configure-ios-development
[ios-install]: /get-started/install/macos/mobile-ios/#configure-ios-development

{% endif %}

Try to keep to the current version of Xcode.

请尽量使用最新版本的 Xcode。

{% if include.target=='iOS' %}

### Configure your target iOS device

### 配置目标 iOS 设备

With Xcode, you can run Flutter apps on an iOS device or on the simulator.

通过使用 Xcode，
你可以在 iOS 真机设备或模拟器上运行 Flutter 应用。

{% tabs "ios-simulator-or-not" %}
{% tab "虚拟设备" %}

#### Configure your iOS simulator

#### 配置 iOS 模拟器

To prepare to run and test your Flutter app on the iOS simulator,
follow this procedure.

请按照以下步骤操作，
来准备在 iOS 模拟器上运行和测试 Flutter 应用。

1. To install the iOS Simulator, run the following command.

   请运行以下命令，来安装 iOS 模拟器。

    ```console
    {{prompt1}} xcodebuild -downloadPlatform iOS
    ```

1. To start the Simulator, run the following command:

   请运行以下命令，来启动模拟器：

    ```console
    $ open -a Simulator
    ```

{% endtab %}
{% tab "真机设备" %}

#### Set up your target physical iOS device

#### 配置目标 iOS 设备

To deploy your Flutter app to a physical iPhone or iPad,
you need to do the following:

你需要执行以下操作，
将 Flutter 应用程序部署到 iPhone 或 iPad 真机上：

- Create an [Apple Developer][] account.

  创建一个 [Apple Developer][] 账户。

- Set up physical device deployment in Xcode.

  在 Xcode 中配置真机设备部署。

- Create a development provisioning profile to self-sign certificates.

  创建开发配置文件 (Provisioning Profile)，
  并自行签名证书 (Signing Certificate)。

- Install the third-party CocoaPods dependency manager
  if your app uses Flutter plugins.

  如果你的应用程序使用 Flutter 插件，
  请安装第三方 CocoaPods 依赖管理器。

##### Create your Apple ID and Apple Developer account

##### 创建 Apple ID 和 Apple Developer 账户

You can skip this step for now. You don't actually need
an Apple Developer account until you are ready to distribute
your app to the App Store.

你可以暂时跳过这一步。
实际上，你在准备向 App Store 发布应用之前，
并不需要 Apple Developer 账户。

If you only need to _test_ deploying your app,
complete the first step and move on to the next section.

如果你只需要 _测试_ 部署应用程序，
请完成第 1 步后继续下一节。

1. If you don't have an [Apple ID][], create one.

   如果你没有 [Apple ID][]，请创建一个。

1. If you haven't enrolled in the [Apple Developer][] program, enroll now.

   如果你未注册 [Apple Developer][] program，请立即注册。

   To learn more about membership types,
   check out [Choosing a Membership][].

   了解有关会员类型的更多信息，
   请查阅 [选择会员资格][Choosing a Membership]。

[Apple ID]: https://support.apple.com/en-us/HT204316

##### Attach your physical iOS device to your Mac {:#attach}

##### 将 iOS 真机连接到 Mac

Configure your physical iOS device to connect to Xcode.

配置你的 iOS 真机连接到 Xcode。

1. Attach your iOS device to the USB port on your Mac.

   将 iOS 设备连接到 Mac 的 USB 端口。

1. On first connecting your iOS device to your Mac,
   your iOS device displays the **Trust this computer?** dialog.

   首次将 iOS 设备连接到 Mac 时，
   你的 iOS 设备会显示 **信任这台电脑吗？** 的对话框。

1. Click **Trust**.

   点击 **信任**。

   ![Trust Mac][]

1. When prompted, unlock your iOS device.

   出现提示时，解锁你的 iOS 设备。

##### Enable Developer Mode on iOS 16 or later

##### 在 iOS 16 或更高版本上启用开发者模式

Starting with iOS 16, Apple requires you to enable **[Developer Mode][]**
to protect against malicious software.
Enable Developer Mode before deploying to a device running iOS 16 or later.

从 iOS 16 开始，Apple 要求你启用 **[开发者模式][Developer Mode]**，
以防止恶意软件。
在部署到 iOS 16 或更高版本的设备之前，请启用开发者模式。

1. Tap on **Settings** <span aria-label="and then">></span>
   **Privacy & Security** <span aria-label="and then">></span>
   **Developer Mode**.

   点击 **设置** <span aria-label="and then">></span>
   **隐私与安全性** <span aria-label="and then">></span>
   **开发者模式**。

1. Tap to toggle **Developer Mode** to **On**.

   将 **开发者模式** 切换为 **打开**。

1. Tap **Restart**.

   点击 **重新启动**。

1. After the iOS device restarts, unlock your iOS device.

   重新启动 iOS 设备后，解锁 iOS 设备。

1. When the **Turn on Developer Mode?** dialog appears, tap **Turn On**.

   当出现 **打开开发者模式吗？** 对话框时，点击 **打开**。

   The dialog explains that Developer Mode requires reducing the security
   of the iOS device.

   对话框会提示开发者模式会降低 iOS 设备的安全性。

1. Unlock your iOS device.

   解锁你的 iOS 设备。

##### Enable developer code signing certificates

##### 启用开发者代码签名证书 (signing certificates)

To deploy to a physical iOS device, you need to establish trust with your
Mac and the iOS device.
This requires you to load signed developer certificates to your iOS device.
To sign an app in Xcode,
you need to create a development provisioning profile.

在部署到 iOS 真机前，你需要在 Mac 与 iOS 设备之间建立信任。
这需要将签名的开发者证书加载到 iOS 设备上。
在 Xcode 中签名应用程序，
你需要创建一个开发者配置文件 (Provisioning Profile)。

To provision your project, follow the Xcode signing flow.

请按照 Xcode 签名流程配置你的项目。

1. Launch Xcode.

   启动 Xcode。

1. Sign in to Xcode with your Apple ID.

   使用 Apple ID 登录 Xcode。

   1. Go to **Xcode** <span aria-label="and then">></span>
      **Settings...**

      打开 **Xcode** <span aria-label="and then">></span>
      **Settings...**

   1. Click **Accounts**.

      点击 **Accounts**。

   1. Click **+**.

      点击 **+**。

   1. Select **Apple ID** and click **Continue**.

      选择 **Apple ID** 并点击 **Continue**。

   1. When prompted, enter your **Apple ID** and **Password**.

      出现提示时，请输入你的 **Apple ID** 和 **Password**。

   1. Close the **Settings** dialog.

      关闭 **Settings** 对话框。

   Development and testing supports any Apple ID.

   开发和测试支持任意 Apple ID。

1. Go to **File** <span aria-label="and then">></span> **Open...**

   打开 **File** <span aria-label="and then">></span> **Open...**

   You can also press <kbd>Cmd</kbd> + <kbd>O</kbd>.

   你还可以使用快捷键：<kbd>Cmd</kbd> + <kbd>O</kbd>

1. Navigate to your Flutter project directory.

   导航至 Flutter 项目目录。

1. Open the default Xcode workspace in your project: `ios/Runner.xcworkspace`.

   打开项目中默认的 Xcode workspace：`ios/Runner.xcworkspace`。

1. Select the physical iOS device you intend to deploy to in the device
   drop-down menu to the right of the run button.

   在运行按钮右侧的设备下拉菜单中选择你要部署的 iOS 真机。

   It should appear under the **iOS devices** heading.

   它应该出现在 **iOS devices** 标题下方。

1. In the left navigation panel under **Targets**, select **Runner**.

   在左侧导航面板的 **Targets** 下，选择 **Runner**。

1. In the **Runner** settings pane, click **Signing & Capabilities**.

   在 **Runner** 设置窗内，点击 **Signing & Capabilities**。

1. Select **All** at the top.

   选择顶部的 **All**。

1. Select **Automatically manage signing**.

   选择 **Automatically manage signing**。

1. Select a team from the **Team** dropdown menu.

   从 **Team** 下拉菜单中选择一个团队。

   Teams are created in the **App Store Connect** section of your
   [Apple Developer Account][] page.
   If you have not created a team, you can choose a _personal team_.

   团队是在 [Apple Developer Account][] 页面的 **App Store Connect** 创建的。
   如果你尚未创建团队，可以选择 _个人团队 (personal team)_。

   The **Team** dropdown displays that option as **Your Name (Personal Team)**.

   **Team** 下拉菜单中会显示名为 **你的名称 (Personal Team)** 的选项。

   ![Xcode account add][]

   After you select a team, Xcode performs the following tasks:

   选择团队后，Xcode 会执行以下工作。

   1. Creates and downloads a Development Certificate

      创建并下载开发证书

   1. Registers your device with your account,

      将设备注册到你的账户

   1. Creates and downloads a provisioning profile if needed

      根据需要创建并下载配置文件 (Provisioning Profile)

If automatic signing fails in Xcode, verify that the project's
**General** <span aria-label="and then">></span>
**Identity** <span aria-label="and then">></span>
**Bundle Identifier** value is unique.

如果在 Xcode 中自动签名失败，请检查项目的 **General** <span aria-label="and then">></span>
**Identity** <span aria-label="and then">></span>
**Bundle Identifier** 值是否唯一。

![Check the app's Bundle ID][]

##### Enable trust of your Mac and iOS device {:#trust}

##### 启用 Mac 和 iOS 设备之间的信任

When you attach your physical iOS device for the first time,
enable trust for both your Mac and the Development Certificate
on the iOS device.

首次连接 iOS 真机时，
为你的 Mac 和 iOS 设备上的开发证书启用信任。

You should have enabled trust of your Mac on your iOS device when
you [attached the device to your Mac](#attach).

当 [设备连接到 Mac](#attach) 时，
你应该启用 iOS 对 Mac 的信任。

##### Enable developer certificate for your iOS devices

##### 为 iOS 设备启用开发者证书

Enabling certificates varies in different versions of iOS.

在不同版本的 iOS 中，启用证书的方式也不尽相同。

{% tabs "ios-versions" %}
{% tab "iOS 14" %}

1. Open the **Settings** app on the iOS device.

   打开 iOS 设备上的 **设置**。

1. Tap on **General** <span aria-label="and then">></span>
   **Profiles & Device Management**.

   点击 **通用** <span aria-label="and then">></span>
   **设备管理**。

1. Tap to toggle your Certificate to **Enable**

   点击你的证书切换为 **启用**。

{% endtab %}
{% tab "iOS 15" %}

1. Open the **Settings** app on the iOS device.

   打开 iOS 设备上的 **设置**。

1. Tap on **General** <span aria-label="and then">></span>
    **VPN & Device Management**.

   点击 **通用** <span aria-label="and then">></span>
   **VPN 与 设备管理**。

1. Tap to toggle your Certificate to **Enable**.

   点击你的证书切换为 **启用**。

{% endtab %}
{% tab "iOS 16 或更高" %}

1. Open the **Settings** app on the iOS device.

   打开 iOS 设备上的 **设置**。

1. Tap on **General** <span aria-label="and then">></span>
    **VPN & Device Management**.

   点击 **通用** <span aria-label="and then">></span>
   **VPN 与 设备管理**。

    :::note

    If you can't find **VPN & Device Management**
    in **Settings**, run your app on your iOS device once, then try again.

    如果在 **设置** 中找不到 **VPN 与 设备管理**，
    请在 iOS 设备上运行一次应用，然后再试一次。

    :::

1. Under the **Developer App** heading, you should find your certificate.

   在 **开发者应用** 标题下，你需要找到你的证书。

1. Tap your Certificate.

   点击你的证书。

1. Tap **Trust "&lt;certificate&gt;"**.

   点击 **信任 "&lt;certificate&gt;"**。

1. When the dialog displays, tap **Trust**.

   显示对话框时，点击 **信任**。

{% endtab %}
{% endtabs %}

If the **codesign wants to access key...** dialog displays:

如果出现 **codesign 想要访问密钥...** 的提示对话框：

1. Enter your macOS password.

   输入你的 macOS 密码。

1. Tap **Always Allow**.

   点击 **始终允许**。

#### Set up wireless debugging on your iOS device (Optional)

#### 在 iOS 设备上设置无线调试（可选）

To debug your device using a Wi-Fi connection, follow this procedure.

请按照以下步骤来使用 Wi-Fi 连接调试设备。

1. Connect your iOS device to the same network as your macOS device.

   将 iOS 设备连接到与 macOS 设备相同的网络。

1. Set a passcode for your iOS device.

   为 iOS 设备设置密码。

1. Open **Xcode**.

   打开 **Xcode**。

1. Go to **Window** <span aria-label="and then">></span>
   **Devices and Simulators**.

   选择 **Window** <span aria-label="and then">></span>
   **Devices and Simulators**。

   You can also press <kbd>Shift</kbd> + <kbd>Cmd</kbd> + <kbd>2</kbd>.

   你还可以使用快捷键：<kbd>Shift</kbd> + <kbd>Cmd</kbd> + <kbd>2</kbd>

1. Select your iOS device.

   选择你的 iOS 设备。

1. Select **Connect via Network**.

   选择 **Connect via Network**。

1. Once the network icon appears next to the device name,
   unplug your iOS device from your Mac.

   一旦设备名称旁边出现网络图标，
   请将 iOS 设备从 Mac 拔下。

If you don't see your device listed when using `flutter run`,
extend the timeout. The timeout defaults to 10 seconds.
To extend the timeout, change the value to an integer greater than 10.

如果在使用 `flutter run` 时没有看到设备列表，请延长超时时间。
超时默认为 10 秒。
要延长超时时间，请将值改为大于 10 的整数。

```console
$ flutter run --device-timeout 60
```

:::note 进一步了解无线调试
<!-- Learn more about wireless debugging -->

* To learn more, check out
  [Apple's documentation on pairing a wireless device with Xcode][].

  要了解更多信息，请查阅 
  [Apple 文档中的 pairing a wireless device with Xcode][Apple's documentation on pairing a wireless device with Xcode]。

* To troubleshoot, check out [Apple's Developer Forums][].

  要排除故障，请访问 [Apple's Developer Forums][]。

* To learn how to configure wireless debugging with `flutter attach`,
  check out [Debugging your add-to-app module][].

  要了解如何使用 `flutter attach` 配置无线调试，
  请查阅 [在混合开发模式下进行调试][Debugging your add-to-app module]。

:::

[Check the app's Bundle ID]: /assets/images/docs/setup/xcode-unique-bundle-id.png
[Choosing a Membership]: {{site.apple-dev}}/support/compare-memberships
[Trust Mac]: /assets/images/docs/setup/trust-computer.png
[Xcode account add]: /assets/images/docs/setup/xcode-account.png
[Developer Mode]: {{site.apple-dev}}/documentation/xcode/enabling-developer-mode-on-a-device
[Apple's Developer Forums]: {{site.apple-dev}}/forums/
[Debugging your add-to-app module]: /add-to-app/debugging/#wireless-debugging
[Apple's documentation on pairing a wireless device with Xcode]: https://help.apple.com/xcode/mac/9.0/index.html?localePath=en.lproj#/devbc48d1bad
[Apple Developer]: {{site.apple-dev}}/programs/
[Apple Developer Account]: {{site.apple-dev}}/account

{% endtab %}
{% endtabs %}

{% endif %}

{% if include.attempt=="first" %}

### Install CocoaPods

### 安装 CocoaPods

If your apps depend on [Flutter plugins][] with native {{include.target}} code,
install [CocoaPods][cocoapods].
This program bundles various dependencies across
Flutter and {{include.target}} code.

如果你的应用程序依赖于带有原生 {{include.target}} 代码的 [Flutter 插件][Flutter plugins]，
请安装 [CocoaPods][cocoapods]。
该程序会捆绑 Flutter 和 {{include.target}} 代码之间的各种依赖关系。

To install and set up CocoaPods, run the following commands:

请运行以下步骤，安装并设置 CocoaPods：

1. Install `cocoapods` following the
   [CocoaPods install guide][cocoapods].

   按照 [CocoaPods 安装指南][cocoapods]
   安装 `cocoapods`。

   ```console
   $ sudo gem install cocoapods
   ```
1. Launch your preferred text editor.

   启动你喜欢的文本编辑器。

1. Open the Zsh environmental variable file `~/.zshenv` in your text editor.

   在文本编辑器中打开 Zsh 环境变量文件 `~/.zshenv`。

1. Copy the following line and paste it at the end of your `~/.zshenv` file.

   复制以下内容并粘贴到 `~/.zshenv` 文件内的末尾。

   ```bash
   export PATH=$HOME/.gem/bin:$PATH
   ```

1. Save your `~/.zshenv` file.

   保存 `~/.zshenv` 文件。

1. To apply this change, restart all open terminal sessions.

   请重新启动所有打开的终端会话窗口，
   来应用此更改。

[Flutter plugins]: /packages-and-plugins/developing-packages#types

{% endif %}

[cocoapods]: https://guides.cocoapods.org/using/getting-started.html#installation
