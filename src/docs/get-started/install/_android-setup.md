## Android setup

## 设置 Android 开发环境


{{site.alert.note}}

  Flutter relies on a full installation of Android Studio to supply
  its Android platform dependencies. However, you can write your
  Flutter apps in a number of editors; a later step will discuss that.

  Flutter 依赖 Android Studio 的全量安装来为其提供 Android 平台的支持。
  但你也可以使用其他的编辑器来写 Flutter 应用，稍后会说明讨论这个问题。

{{site.alert.end}}

### Install Android Studio

### 安装 Android Studio


 1. Download and install [Android Studio]({{site.android-dev}}/studio).

    下载并安装 [Android Studio]({{site.android-dev}}/studio)。

 2. Start Android Studio, and go through the 'Android Studio Setup Wizard'. This
    installs the latest Android SDK, Android SDK Platform-Tools, and Android SDK
    Build-Tools, which are required by Flutter when developing for Android.

    运行 Android Studio，并进入 'Android Studio Setup Wizard'，这会安装最新的 Android SDK，
    Android SDK Platform-Tools 以及 Android SDK Build-Tools，这些都是在开发 Android Flutter 应用时所需要的。

### Set up your Android device

### 配置 Android 设备

To prepare to run and test your Flutter app on an Android device, you'll need an
Android device running Android 4.1 (API level 16) or higher.

在 Android 设备上运行或测试 Flutter 应用之前，你需要一个运行 Android 4.1（API 版本 16）或者更高的设备。

 1. Enable **Developer options** and **USB debugging** on your device. Detailed instructions
    are available in the [Android documentation]({{site.android-dev}}/studio/debug/dev-options).

    在设备上打开 **Developer options** 和 **USB debugging** 选项，你可以在 [Android documentation]({{site.android-dev}}/studio/debug/dev-options) 上查看更详细的方法介绍。
 
 2. Windows-only: Install the [Google USB Driver]({{site.android-dev}}/studio/run/win-usb)

    如果是在 Windows 平台上使用，需要安装 [Google USB Driver]({{site.android-dev}}/studio/run/win-usb)
 
 3. Using a USB cable, plug your phone into your computer. If prompted on your
    device, authorize your computer to access your device.
 
    通过 USB 接口连接手机和电脑，如果在设备上弹出需要授权弹窗，允许授权以便让电脑能够访问你的开发设备。
 
 4. In the terminal, run the `flutter devices` command to verify that Flutter recognizes your
    connected Android device.

    在命令行中，使用 `flutter devices` 命令来确保 Flutter 能够识别出你所连接的 Android 设备。

By default, Flutter uses the version of the Android SDK where your `adb` tool is based. If
you want Flutter to use a different installation of the Android SDK, you must set the
`ANDROID_HOME` environment variable to that installation directory.

默认情况下，Flutter 会使用当前版本 `adb` 工具所依赖的 Android SDK 版本，如果你想让 Flutter 使用别的 Android SDK，你可以通过设置 `ANDROID_HOME` 环境变量来达到目的。

### Set up the Android emulator

### 配置 Android 模拟器


To prepare to run and test your Flutter app on the Android emulator, follow these steps:

根据以下步骤来将 Flutter 应用运行或测试于你的 Android 模拟器上：

 1. Enable [VM acceleration]({{site.android-dev}}/studio/run/emulator-acceleration) on your machine.

    激活机器上的 [VM acceleration]({{site.android-dev}}/studio/run/emulator-acceleration) 选项。
 
 2. Launch **Android Studio > Tools > Android > AVD Manager** and select
    **Create Virtual Device**. (The **Android** submenu is only present
    when inside an Android project.)

    启动 **Android Studio > Tools > Android > AVD Manager**，然后选择 **Create Virtual Device** 选项。（只有在 Android 项目中才会显示 **Android** 子选项。）

 3. Choose a device definition and select **Next**.

    选择相应的设备并选择 **Next** 选项。

 4. Select one or more system images for the Android versions you want to emulate,
    and select **Next**. An _x86_ or _x86\_64_ image is recommended.

    选择一个或多个你想要模拟的 Android 版本的系统镜像，然后选择 **Next** 选项。推荐选择 _x86_ 或者 _x86\_64_ 镜像。

 5. Under Emulated Performance, select **Hardware - GLES 2.0** to enable
    [hardware
    acceleration]({{site.android-dev}}/studio/run/emulator-acceleration).

    在 Emulated Performance 下选择 **Hardware - GLES 2.0** 选项来开启
    [硬件加速]({{site.android-dev}}/studio/run/emulator-acceleration)。

 6. Verify the AVD configuration is correct, and select **Finish**.
    
    确保 AVD 选项配置正确，并选择 **Finish** 选项。

    For details on the above steps, see [Managing
    AVDs]({{site.android-dev}}/studio/run/managing-avds).

    想要查看上述步骤的更多详细信息，请查看 [Managing AVDs]({{site.android-dev}}/studio/run/managing-avds) 页面。

 7. In Android Virtual Device Manager, click **Run** in the toolbar.
    The emulator starts up and displays the default canvas for your selected OS version
    and device.

    在 Android Virtual Device Manager 中，点击工具栏中的 **Run** 选项，
    模拟器会启动并为你所选择的系统版本和设备显示出相应的界面。
