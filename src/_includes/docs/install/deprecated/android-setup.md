## Android setup

## 设置 Android 开发环境

:::note

Flutter relies on a full installation of Android Studio to supply
its Android platform dependencies. However, you can write your
Flutter apps in a number of editors; a later step discusses that.

Flutter 依赖 Android Studio 的全量安装来为其提供 Android 平台的支持。
但你也可以使用其他的编辑器来写 Flutter 应用，接下来的步骤会提到这个问题。

:::

### Install Android Studio

### 安装 Android Studio

{% render docs/help-link.md, location:'android-studio', section:'#android-setup' %}

 1. Download and install [Android Studio]({{site.android-dev}}/studio).

    下载并安装 [Android Studio]({{site.android-dev}}/studio)。

 1. Start Android Studio, and go through the 'Android Studio Setup Wizard'.
    This installs the latest Android SDK, Android SDK Command-line Tools,
    and Android SDK Build-Tools, which are required by Flutter
    when developing for Android.

    运行 Android Studio，并进入 'Android Studio Setup Wizard'，
    这会安装最新的 Android SDK，
    Android SDK Platform-Tools 以及 Android SDK Build-Tools，
    这些都是在开发 Android Flutter 应用时所需要的。

 1. Run `flutter doctor` to confirm that Flutter has located
    your installation of Android Studio. If Flutter cannot locate it,
    run `flutter config --android-studio-dir=<directory>` to set the
    directory that Android Studio is installed to.

    运行 `flutter doctor` 确保 Flutter 已经定位到了你的 Android Studio 的安装位置。
    如果 Flutter 并未定位到，运行 `flutter config --android-studio-dir <directory>`
    设置你的 Android Studio 的安装目录。

### Set up your Android device

### 配置 Android 设备

{% render docs/help-link.md, location:'android-device', section:'#android-setup' %}

To prepare to run and test your Flutter app on an Android device,
you need an Android device running Android 5.0 (API level 21) or higher.

在 Android 设备上运行或测试 Flutter 应用之前，
你需要一个运行 Android 4.1（API 版本 16）或者更高的设备。

 1. Enable **Developer options** and **USB debugging** on your device.
    Detailed instructions are available in the
    [Android documentation]({{site.android-dev}}/studio/debug/dev-options).

    在设备上打开 **Developer options** 和 **USB debugging** 选项，
    你可以在 [Android documentation]({{site.android-dev}}/studio/debug/dev-options) 上查看更详细的方法介绍。

 1. [Optional] To leverage wireless debugging, enable **Wireless debugging** 
    on your device. Detailed instructions are available in the 
    [Android documentation]({{site.android-dev}}/studio/run/device#wireless).

    [可选] 要使用无线调试，启用设备上的 **Wireless debugging**。
    详细的操作步骤在 [Android 文档]({{site.android-dev}}/studio/run/device#wireless) 里有。

 1. Windows-only: Install the [Google USB
    Driver]({{site.android-dev}}/studio/run/win-usb).

    如果是在 Windows 平台上使用，需要安装 [Google USB Driver]({{site.android-dev}}/studio/run/win-usb)
 
 1. Using a USB cable, plug your phone into your computer. If prompted on your
    device, authorize your computer to access your device.
 
    通过 USB 接口连接手机和电脑，如果在设备上弹出需要授权弹窗，
    允许授权以便让电脑能够访问你的开发设备。
 
 1. In the terminal, run the `flutter devices` command to verify that
    Flutter recognizes your connected Android device.  By default,
    Flutter uses the version of the Android SDK where your `adb`
    tool is based. If you want Flutter to use a different installation
    of the Android SDK, you must set the `ANDROID_SDK_ROOT` environment
    variable to that installation directory.

    在终端中，运行 `flutter devices` 命令来确认 Flutter 是否识别到你连接的 Android 设备。
    默认情况下，Flutter 会使用你的 `adb` 工具所在的 Android SDK 版本。
    如果你希望 Flutter 使用不同的 Android SDK 安装版本，
    你必须设置 `ANDROID_SDK_ROOT` 环境变量到那个安装目录。

### Set up the Android emulator

### 配置 Android 模拟器

{% render docs/help-link.md, location:'android-emulator', section:'#android-setup' %}

To prepare to run and test your Flutter app on the Android emulator,
follow these steps:

根据以下步骤来将 Flutter 应用运行或测试于你的 Android 模拟器上：

 1. Enable
    [VM acceleration]({{site.android-dev}}/studio/run/emulator-acceleration#accel-vm)
    on your machine.

    激活机器上的 
    [VM acceleration]({{site.android-dev}}/studio/run/emulator-acceleration) 选项。
 
 1. Start **Android Studio**, click the **Device Manager**
    icon, and select **Create Device** under **Virtual** tab...

    打开 **Android Studio**，点击 **Device Manager** 按钮，
    在 **Virtual** 这个标签页下选择 **Create Device**

     * In older versions of Android Studio, you should instead
    launch **Android Studio > Tools > Android > AVD Manager** and select
    **Create Virtual Device...**. (The **Android** submenu is only present
    when inside an Android project.)

       在一些旧的 Android Studio 版本里，需要通过
       **Android Studio > Tools > Android > AVD Manager**，
       然后选择 **Create Virtual Device...** 选项。
       （只有在 Android 项目中才会显示 **Android** 子选项。）

     * If you do not have a project open, you can choose 
    **3-Dot Menu / More Actions > Virtual Device Manager** and select **Create Device...**

       如果你以及还没打开某个项目，你可以选择
       **3-Dot Menu / More Actions > Virtual Device Manager** 
       然后选择 **Create Device** 选项

 1. Choose a device definition and select **Next**.

    选择相应的设备并选择 **Next** 选项。

 1. Select one or more system images for the Android versions you want
    to emulate, and select **Next**.
    An _x86\_64_ image is recommended.

    选择一个或多个你想要模拟的 Android 版本的系统镜像，
    然后选择 **Next** 选项。推荐选择 **x86_64** 镜像。

 1. Under Emulated Performance, select **Hardware - GLES 2.0** to enable
    [hardware
    acceleration]({{site.android-dev}}/studio/run/emulator-acceleration).

    在 Emulated Performance 下选择 **Hardware - GLES 2.0** 选项来开启
    [硬件加速]({{site.android-dev}}/studio/run/emulator-acceleration)。

 1. Verify the AVD configuration is correct, and select **Finish**.
    
    确保 AVD 选项配置正确，并选择 **Finish** 选项。

    For details on the above steps, see [Managing
    AVDs]({{site.android-dev}}/studio/run/managing-avds).

    想要查看上述步骤的更多详细信息，
    请查看 [Managing AVDs]({{site.android-dev}}/studio/run/managing-avds) 页面。

 1. In Android Virtual Device Manager, click **Run** in the toolbar.
    The emulator starts up and displays the default canvas for your
    selected OS version and device.

    在 Android Virtual Device Manager 中，点击工具栏中的 **Run** 选项，
    模拟器会启动并为你所选择的系统版本和设备显示出相应的界面。

### Agree to Android Licenses

### 同意 Android 协议

{% render docs/help-link.md, location:'android-licenses', section:'#android-setup' %}

Before you can use Flutter, you must agree to the
licenses of the Android SDK platform. This step should be done after
you have installed the tools listed above.

在使用 Flutter 前，你必须同意 Android SDK 平台的协议。
你可以在安装完上述工具后执行这一步。

 1. Open an elevated console window and run the following command to begin
    signing licenses.

    打开一个已经提升管理员权限的终端窗口，运行以下命令进行协议的确认。

    ```console
    $ flutter doctor --android-licenses
    ```
 1. Review the terms of each license carefully before agreeing to them.

    仔细阅读每条协议后同意。

 1. Once you are done agreeing with licenses, run `flutter doctor` again
    to confirm that you are ready to use Flutter.

    当你同意所有协议后，再次运行 `flutter doctor` 以确认是否已经可以正常使用 Flutter。
