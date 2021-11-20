## Android setup

## Android 设置

{{site.alert.note}}

  Flutter relies on a full installation of Android Studio to supply
  its Android platform dependencies. However, you can write your
  Flutter apps in a number of editors; a later step discusses that.

  Flutter 需要完整安装 Android Studio 才能支持其 Android 平台的依赖。
  然而，你也可以在许多其他编辑器上编写 Flutter 应用，之后我们将会提到它。

{{site.alert.end}}

### Install Android Studio

### 安装 Android Studio

 1. Download and install [Android Studio]({{site.android-dev}}/studio).

    下载并安装 [Android Studio]({{site.android-dev}}/studio)。

 1. Start Android Studio, and go through the 'Android Studio Setup Wizard'.
    This installs the latest Android SDK, Android SDK Command-line Tools,
    and Android SDK Build-Tools, which are required by Flutter
    when developing for Android.

    启动 Android Studio，并前往 'Android Studio Setup Wizard'，这将会帮你安装最新版本的 Android SDK，Android SDK 命令行工具，以及 Android SDK 构建工具，等一系列你在构建 Android 应用时会需要用到的组件。

 1. Accept Android licenses.

    同意 Android 许可协议（Android licenses）。

 ```terminal
$ flutter doctor --android-licenses
```

### Set up your Android device

### 设置你的 Android 设备

To prepare to run and test your Flutter app on an Android device,
you need an Android device running Android 4.1 (API level 16) or higher.

在 Android 设备上运行或测试你的 Flutter 之前，需要确保 Android 设备运行在 4.1（API 级别 16）或者更高的版本。

 1. Enable **Developer options** and **USB debugging** on your device.
    Detailed instructions are available in the
    [Android documentation]({{site.android-dev}}/studio/debug/dev-options).

    在你的设备上启动**开发者选项**以及 **USB 调试**工具。
    详细步骤请查看 [Android 文档]({{site.android-dev}}/studio/debug/dev-options)。

 1. Using a USB cable, plug your phone into your computer. On your Chromebook,
    you may see a notification for "USB device detected". Click on "Connect
    to Linux" If prompted on your Android device, authorize your computer
    to access your device. 

    通过 USB 数据线连接你的手机与电脑。在 Chromebook 上，你可能会看到 "USB device detected"（USB 设备已连接）的通知。如果你的 Android 设备上出现点击 "Connect to Linux"（连接到 Linux）的提示，请授权计算机访问你的设备。

 1. In the terminal, run the `flutter devices` command to verify that
    Flutter recognizes your connected Android device.  By default,
    Flutter uses the version of the Android SDK where your `adb`
    tool is based. If you want Flutter to use a different installation
    of the Android SDK, you must set the `ANDROID_SDK_ROOT` environment
    variable to that installation directory.

    在命令行运行 `flutter devices` 命令以验证 Flutter 能够识别你的 Android 设备连接。
    默认情况下，flutter 使用基于 `adb` 工具的 Android SDK 版本。如果你想要 Flutter 运行并安装在不同的 Android SDK 中的话，你必须将 `ANDROID_SDK_ROOT` 环境变量设置为该 SDK 的安装目录。

### Deploy to your Chromebook

### 在 Chromebook 上部署

With the latest version of Chrome OS, you no longer need to put your
device into developer mode to push apps to your Chrome OS device.

在最新版本的 Chrome OS 中，你不再需要将设备置为开发者模式，就可以将你的应用部署到 Chrome OS 设备中。

 1. [Enable ADB][] in Settings. Note that this will require you to reboot your
    device once. 

    在设置中[开启 ADB][Enable ADB]。注意，这将会需要你重启一次电脑。

 1. In the Terminal, run `flutter devices`. If prompted, authorize access to
    the Android container. Verify that `flutter devices` lists your Chrome
    OS device as a recognized device.

    在终端中运行 `flutter devices`。如果出现提示，请授权访问
    安卓容器。通过 `flutter devices` 验证是否列出了您的 Chrome
    操作系统设备作为识别的设备。
    
[Enable ADB]: https://support.google.com/chromebook/answer/9770692
