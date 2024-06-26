## Configuring Android app support

## Android 设置

:::note

Flutter relies on a full installation of Android Studio to supply
its Android platform dependencies. However, you can write your
Flutter apps in a number of editors; a later step discusses that.

Flutter 需要完整安装 Android Studio 才能支持其 Android 平台的依赖。
然而，你也可以在许多其他编辑器上编写 Flutter 应用，之后我们将会提到它。

:::

### Install Android Studio

### 安装 Android Studio

 1. Download and install [Android Studio]({{site.android-dev}}studio/install#chrome-os).

    下载并安装 [Android Studio]({{site.android-dev}}studio/install#chrome-os)。

 1. Start Android Studio, and go through the 'Android Studio Setup Wizard'.
    This installs the latest Android SDK, platform tools and build tooling
    that are required by Flutter when developing for Android.

    启动 Android Studio，并前往 'Android Studio Setup Wizard'，
    这将会帮你安装最新版本的 Android SDK，Android SDK 命令行工具，
    以及 Android SDK 构建工具，等一系列你在构建 Android 应用时会需要用到的组件。

 1. From the welcome dialog, choose **More Actions -> SDK Manager**.
    From the SDK Tools tab, select
    **Android SDK Command-line Tools (latest)**
    to install additional necessary tooling.

    从欢迎对话框中，选择 **More Actions -> SDK Manager**。
    在 SDK 工具标签页中，选择
    **Android SDK Command-line Tools (latest)**
    来安装额外的必要工具。

 1. Accept Android licenses.

    同意 Android 许可协议（Android licenses）。

```console
$ flutter doctor --android-licenses
```

### Deploy to your Chromebook

### 部署到 Chromebook

To deploy apps directly to your Chromebook, you need to do the following:

要在 Chromebook 上直接部署应用程序，需要执行以下操作：

 1. [Enable ADB][] in Settings. Note that this requires you to reboot your
    device once.

    在设置中 [启用 ADB][Enable ADB]。
    请注意，这需要你重启一次设备。

 1. In the Terminal, run `flutter devices`. If prompted, authorize access to
    the Android container. Verify that `flutter devices` lists your ChromeOS
    device as a recognized device.

    在终端运行 `flutter devices`。如果出现提示，
    请授权访问 Android 容器。
    验证 `flutter devices` 是否将 ChromeOS 设备列为可识别设备。

### Set up your Android device

### 设置你的 Android 设备

To prepare to run and test your Flutter app on an attached device,
you need an Android device running Android 5.0 (API level 21) or higher.

在 Android 设备上运行或测试你的 Flutter 之前，
需要确保 Android 设备运行在 4.1（API 级别 16）或者更高的版本。

 1. Enable **Developer options** and **USB debugging** on your device.
    Detailed instructions are available in the
    [Android documentation]({{site.android-dev}}studio/debug/dev-options).

    在你的设备上启动**开发者选项**以及 **USB 调试**工具。
    详细步骤请查看 [Android 文档]({{site.android-dev}}studio/debug/dev-options)。

 1. Using a USB cable, plug your phone into your computer.
    On your Chromebook, you might see a notification for
    "USB device detected". Click on "Connect to Linux".
    If prompted on your Android device,
    authorize your computer to access your device.

    通过 USB 数据线连接你的手机与电脑。
    在 Chromebook 上，你可能会看到 "USB device detected"（USB 设备已连接）的通知。
    如果你的 Android 设备上出现点击 "Connect to Linux"（连接到 Linux）的提示，
    请授权计算机访问你的设备。

 1. In the terminal, run the `flutter devices` command to verify
    that Flutter recognizes your connected Android device.
    By default, Flutter uses the version of the
    Android SDK where your `adb` tool is based.
    If you want Flutter to use a different installation
    of the Android SDK, you must set the `ANDROID_SDK_ROOT`
    environment variable to that installation directory.

    在命令行运行 `flutter devices` 命令以验证 Flutter 能够识别你的 Android 设备连接。
    默认情况下，flutter 使用基于 `adb` 工具的 Android SDK 版本。
    如果你想要 Flutter 运行并安装在不同的 Android SDK 中的话，
    你必须将 `ANDROID_SDK_ROOT` 环境变量设置为该 SDK 的安装目录。

[Enable ADB]: https://support.google.com/chromebook/answer/9770692
