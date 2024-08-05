
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

{% include docs/install/devices/ios-simulator.md %}

{% endtab %}
{% tab "真机设备" %}

{% include docs/install/devices/ios-physical.md %}

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
