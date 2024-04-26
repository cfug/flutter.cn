#### Set up your target Android device

#### 配置目标 Android 设备
{:.no_toc}

{% include docs/help-link.md location='android-device' section='#android-setup' %}

{% assign devos = include.devos %}
{% assign target = include.target %}
{% assign compiler = include.compiler %}
{% assign attempt = include.attempt %}

To configure your Flutter app to run on a physical Android device,
you need an Android device running {{site.targetmin.android}} or later.

你需要一台运行 {{site.targetmin.android}} 或更高版本的安卓设备，
来配置 Flutter 应用在真机 Android 设备上运行。

1. Enable **Developer options** and **USB debugging** on your device
   as described in the
   [Android documentation]({{site.android-dev}}/studio/debug/dev-options).

   按照 [Android 文档]({{site.android-dev}}/studio/debug/dev-options) 
   中的说明，
   在设备上启用 **开发者选项** 和 **USB 调试**。

1. [Optional] To leverage wireless debugging,
   enable **Wireless debugging** on your device as described in the
   [Android documentation]({{site.android-dev}}/studio/run/device#wireless).

   [可选] 如果要利用无线调试，
   请按照 [Android 文档]({{site.android-dev}}/studio/run/device#wireless) 
   中的说明在设备上启用 **无线调试**。

{%- if devos == 'Windows' %}

1. Install the [Google USB Driver]({{site.android-dev}}/studio/run/win-usb).

   安装 [Google USB Driver]({{site.android-dev}}/studio/run/win-usb)。

{% endif %}

1. Plug your device into your {{devos}} computer.
   If your device prompts you, authorize your computer to access your device.

   将设备插入你的 {{include.os}} 电脑。
   如果设备发出提示，请授权电脑访问你的设备。

1. Verify that Flutter recognizes your connected Android device.

   检查 Flutter 是否能识别连接的 Android 设备。

   {%- if devos == 'Windows' %}

   In PowerShell, run:

   在 PowerShell 中运行：

   ```console
   c:\> flutter devices
   ```

   {% elsif devos == 'macOS' %}

   In the Terminal, run:

   在 Terminal 中运行：

   ```console
   $ flutter devices
   ```

   {% endif %}

   By default, Flutter uses the version of the Android
   SDK where your `adb` tool is based.
   To use a different Android SDK installation path with Flutter,
   set the `ANDROID_SDK_ROOT` environment variable
   to that installation directory.

   默认情况下，Flutter 使用 `adb` 工具所在的 Android SDK 版本。
   如果要在 Flutter 中使用不同的 Android SDK 安装路径，
   请设置环境变量 `ANDROID_SDK_ROOT` 为该安装目录。
