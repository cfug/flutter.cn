---
# title: Set up Android development
title: 设置 Android 开发环境
# description: >-
#   Configure your development environment to
#   run, build, and deploy Flutter apps for Android devices.
description: >-
  配置开发环境，以便在 Android 设备上运行、构建和部署 Flutter 应用。
ai-translated: true
---

Learn how to set up your development environment
to run, build, and deploy Flutter apps for Android devices.

了解如何配置开发环境，以便在 Android 设备上运行、构建和部署 Flutter 应用。

:::warning
If you haven't set up Flutter already,
visit and follow [Install Flutter][] first.

若你尚未设置 Flutter，
请先访问并遵循 [安装 Flutter][Install Flutter]。

Installing the Flutter plugin for Android Studio is **not** enough;
you must also install the Flutter SDK and add its `bin` directory to your PATH
to use the `flutter` command.

仅安装 Android Studio 的 Flutter 插件 **不够**；
你还必须安装 Flutter SDK 并将其 `bin` 目录加入 PATH，
才能使用 `flutter` 命令。
:::

:::note
If you've already installed Flutter,
ensure that it's [up to date][].

若你已安装 Flutter，
请确保其 [为最新版本][up to date]。
:::

[Install Flutter]: /install
[up to date]: /install/upgrade

## Choose your development platform {: #dev-platform}

## 选择你的开发平台 {: #dev-platform}

The instructions on this page are configured to cover
setting up Android development on a **Windows**{:.selected-os-text} device.

本页说明默认面向在 **Windows**{:.selected-os-text} 设备上设置 Android 开发。

If you'd like to follow the instructions for a different OS,
please select one of the following.

若要为其他操作系统遵循说明，请选择以下之一。

<OSSelector />

## Set up Android tooling {: #set-up-tooling}

## 设置 Android 工具链 {: #set-up-tooling}

With Android Studio, you can run Flutter apps on
a physical Android device or an Android Emulator.

借助 Android Studio，你可以在实体 Android 设备或 Android 模拟器上运行 Flutter 应用。

If you haven't done so already,
install and set up the latest stable version of [Android Studio][].

若尚未完成，
请安装并设置最新稳定版 [Android Studio][]。

 1. <h3>Install prerequisites libraries</h3>

    <h3>安装必备库</h3>

    If you're developing on Linux, first install the
    [prerequisite collection of 32-bit libraries][64bit-libs]
    that Android Studio requires.
    {: .linux-only}

    若在 Linux 上开发，请先安装 Android Studio 所需的 [32 位库必备集合][64bit-libs]。
    {: .linux-only}

 1. <h3>Install Android Studio</h3>

    <h3>安装 Android Studio</h3>

    If you haven't done so already, [install and set up][as-install]
    the latest stable version of [Android Studio][].

    若尚未完成，请 [安装并设置][as-install] 最新稳定版 [Android Studio][]。

    If you already have Android Studio installed,
    ensure that it's [up to date][as-update].

    若已安装 Android Studio，请确保其 [为最新版本][as-update]。

 1. <h3>Install Android SDK and tools</h3>

    <h3>安装 Android SDK 与工具</h3>

    1. Launch **Android Studio**.

       启动 **Android Studio**。

    1. Open the **SDK Manager** settings dialog.

       打开 **SDK Manager** 设置对话框。

       1. If the **Welcome to Android Studio** dialog is open,
          click the **More Actions** button that follows the
          **New Project** and **Open** buttons,
          then click **SDK Manager** from the dropdown menu.

          若 **Welcome to Android Studio** 对话框已打开，
          点击 **New Project** 和 **Open** 按钮后的 **More Actions** 按钮，
          然后从下拉菜单点击 **SDK Manager**。

       1. If you have a project open,
          go to **Tools** <span aria-label="and then">></span> **SDK Manager**.

          若已打开项目，
          前往 **Tools** <span aria-label="and then">></span> **SDK Manager**。

       {: type="a"}

    1. If the **SDK Platforms** tab is not open, switch to it.

       若 **SDK Platforms** 标签页未打开，请切换到该标签页。

    1. Verify that the first entry with an **API Level** of
       **36** has been selected.

       确认已选中 **API Level** 为 **36** 的第一项。

       If the **Status** column displays
       **Update available** or **Not installed**:

       若 **Status** 列显示 **Update available** 或 **Not installed**：

       1. Select the checkbox for that entry or row.

          选中该项或该行的复选框。

       1. Click **Apply**.

          点击 **Apply**。

       1. When the **Confirm Change** dialog displays, click **OK**.

          当 **Confirm Change** 对话框出现时，点击 **OK**。

          The **SDK Component Installer** dialog displays with a
          progress indicator.

          **SDK Component Installer** 对话框会显示进度指示器。

       1. When the installation finishes, click **Finish**.

          安装完成后，点击 **Finish**。

       {: type="a"}

    1. Switch to the **SDK Tools** tab.

       切换到 **SDK Tools** 标签页。

    1. Verify that the following SDK Tools have been selected:

       确认已选中以下 SDK Tools：

       - **Android SDK Build-Tools**
       - **Android SDK Command-line Tools**
       - **Android Emulator**
       - **Android SDK Platform-Tools**
       - **CMake**
       - **NDK (Side by side)**

    1. If the **Status** column for any of the preceding tools displays
       **Update available** or **Not installed**:

       若上述任一工具的 **Status** 列显示 **Update available** 或 **Not installed**：

       1. Select the checkbox for the necessary tools.

          选中所需工具的复选框。

       1. Click **Apply**.

          点击 **Apply**。

       1. When the **Confirm Change** dialog displays, click **OK**.

          当 **Confirm Change** 对话框出现时，点击 **OK**。

          The **SDK Component Installer** dialog displays with a
          progress indicator.

          **SDK Component Installer** 对话框会显示进度指示器。

       1. When the installation finishes, click **Finish**.

          安装完成后，点击 **Finish**。

       {: type="a"}

   1. <h3>Agree to the Android licenses</h3>

      <h3>同意 Android 许可</h3>

      Before you can use Flutter and after you install all prerequisites,
      agree to the licenses of the Android SDK platform.

      在安装所有必备项后、使用 Flutter 之前，
      请同意 Android SDK 平台的许可。

      1. Open your preferred terminal.

         打开你常用的终端。

      1. Run the following command to review and sign the SDK licenses.

         运行以下命令以查看并签署 SDK 许可。

         ```console
         $ flutter doctor --android-licenses
         ```

      1. Read and accept any necessary licenses.

         阅读并接受所有必要的许可。

         If you haven't accepted each of the SDK licenses previously,
         you'll need to review and agree to them before developing for Android.

         若你此前未接受各项 SDK 许可，
         在针对 Android 开发前需要查看并同意它们。

         Before agreeing to the terms of each license,
         read each with care.

         在同意每项许可条款前，请仔细阅读。

         Once you've accepted all the necessary licenses successfully,
         you should see output similar to the following:

         成功接受所有必要许可后，
         你应看到类似以下的输出：

         ```console
         All SDK package licenses accepted.
         ```

{: .steps}

[Android Studio]: https://developer.android.com/studio
[64bit-libs]: https://developer.android.com/studio/install#64bit-libs
[as-install]: https://developer.android.com/studio/install
[as-update]: https://developer.android.com/studio/intro/update

## Set up an Android device {: #set-up-devices}

## 设置 Android 设备 {: #set-up-devices}

You can debug Flutter apps on physical Android devices or
by running them on an Android emulator.

你可以在实体 Android 设备上调试 Flutter 应用，
或在 Android 模拟器上运行它们。

<Tabs key="android-emulator-or-not">
<Tab name="Android emulator">

To set up your development environment to
run a Flutter app on an Android emulator, follow these steps:

要配置开发环境以在 Android 模拟器上运行 Flutter 应用，请按以下步骤操作：

 1. <h3>Set up your development device</h3>

    <h3>设置你的开发设备</h3>

    Enable [VM acceleration][] on your development computer.

    在开发计算机上启用 [VM 加速][VM acceleration]。

 1. <h3>Set up a new emulator</h3>

    <h3>设置新模拟器</h3>

    1. Start **Android Studio**.

       启动 **Android Studio**。

    1. Open the **Device Manager** settings dialog.

       打开 **Device Manager** 设置对话框。

       1. If the **Welcome to Android Studio** dialog is open,
          click the **More Actions** button that follows the
          **New Project** and **Open** buttons,
          then select **Virtual Device Manager** from the dropdown menu.

          若 **Welcome to Android Studio** 对话框已打开，
          点击 **New Project** 和 **Open** 按钮后的 **More Actions** 按钮，
          然后从下拉菜单选择 **Virtual Device Manager**。

       1. If you have a project open,
          go to **Tools** <span aria-label="and then">></span>
          **Device Manager**.

          若已打开项目，
          前往 **Tools** <span aria-label="and then">></span>
          **Device Manager**。

       {: type="a"}

    1. Click the **Create Virtual Device** button that appears as a `+` icon.

       点击显示为 `+` 图标的 **Create Virtual Device** 按钮。

       The **Virtual Device Configuration** dialog displays.

       **Virtual Device Configuration** 对话框会出现。

    1. Select either **Phone** or **Tablet** under **Form Factor**.

       在 **Form Factor** 下选择 **Phone** 或 **Tablet**。

    1. Select a device definition. You can browse or search for the device.

       选择设备定义。你可以浏览或搜索设备。

    1. Click **Next**.

       点击 **Next**。

    1. If the option is provided,
       select either **x86 Images** or **ARM Images** depending on
       if your development computer is an x64 or Arm64 device.

       若提供该选项，
       根据开发计算机是 x64 还是 Arm64 设备，选择 **x86 Images** 或 **ARM Images**。

    1. Select one system image for the Android version you want to emulate.

       为要模拟的 Android 版本选择一个系统镜像。

       1. If the desired image has a **Download** icon to the left
          of the system image name, click it.

          若所需镜像在系统镜像名称左侧有 **Download** 图标，请点击它。

          The **SDK Component Installer** dialog displays with a
          progress indicator.

          **SDK Component Installer** 对话框会显示进度指示器。

       1. When the download completes, click **Finish**.

          下载完成后，点击 **Finish**。

       {: type="a"}

    1. Click **Additional settings** in the top tab bar and
       scroll to **Emulated Performance**.

       点击顶部标签栏中的 **Additional settings**，
       滚动到 **Emulated Performance**。

    1. From the **Graphics acceleration** dropdown menu,
       select an option that mentions **Hardware**.

       在 **Graphics acceleration** 下拉菜单中，
       选择提及 **Hardware** 的选项。

       This enables [hardware acceleration][], improving render performance.

       这将启用 [硬件加速][hardware acceleration]，提升渲染性能。

    1. Verify your virtual device configuration.
       If it is correct, click **Finish**.

       验证虚拟设备配置。
       若正确，点击 **Finish**。

       To learn more about virtual devices,
       check out [Create and manage virtual devices][].

       要了解更多虚拟设备信息，
       请参阅 [创建和管理虚拟设备][Create and manage virtual devices]。

 1. <h3>Try running the emulator</h3>

    <h3>尝试运行模拟器</h3>

    In the **Device Manager** dialog,
    click the **Run** icon to the right of your desired virtual device.

    在 **Device Manager** 对话框中，
    点击所需虚拟设备右侧的 **Run** 图标。

    The emulator should start up and display the default canvas for
    your selected Android OS version and device.

    模拟器应启动并显示所选 Android 操作系统版本和设备的默认画布。

{: .steps}

[VM acceleration]: {{site.android-dev}}/studio/run/emulator-acceleration#accel-vm
[hardware acceleration]: {{site.android-dev}}/studio/run/emulator-acceleration
[Create and manage virtual devices]: {{site.android-dev}}/studio/run/managing-avds

</Tab>
<Tab name="Physical device">

To set up your development environment to
run a Flutter app on a physical Android device, follow these steps:

要配置开发环境以在实体 Android 设备上运行 Flutter 应用，请按以下步骤操作：

 1. <h3>Configure your device</h3>

    <h3>配置你的设备</h3>

    Enable **Developer options** and **USB debugging** on your device
    as described in [Configure on-device developer options][].

    按 [配置设备端开发者选项][Configure on-device developer options] 中的说明，
    在设备上启用 **Developer options** 和 **USB debugging**。

 1. <h3>Enable wireless debugging</h3>

    <h3>启用无线调试</h3>

    To leverage wireless debugging,
    enable **Wireless debugging** on your device as described in
    [Connect to your device using Wi-Fi][].
    {: .windows-only}

    要使用无线调试，
    请按 [使用 Wi-Fi 连接设备][Connect to your device using Wi-Fi] 中的说明，在设备上启用 **Wireless debugging**。
    {: .windows-only}

 1. <h3>Install platform prerequisites</h3>

    <h3>安装平台必备项</h3>

    If you're developing on Windows, first install the necessary
    USB driver for your particular device as described in
    [Install OEM USB drivers][].

    若在 Windows 上开发，请先按 [安装 OEM USB 驱动][Install OEM USB drivers] 中的说明，为特定设备安装必要的 USB 驱动。

 1. <h3>Connect your device</h3>

    <h3>连接你的设备</h3>

    Plug your device into your computer.
    If your device prompts you,
    authorize your computer to access your Android device.

    将设备插入计算机。
    若设备提示你，
    请授权计算机访问你的 Android 设备。

 1. <h3>Verify the device connection</h3>

    <h3>验证设备连接</h3>

    To verify that Flutter recognizes your connected Android device,
    run `flutter devices` in your preferred terminal:

    要验证 Flutter 是否识别已连接的 Android 设备，
    请在你常用的终端运行 `flutter devices`：

    ```console
    $ flutter devices
    ```

    Your device should be found and show up as a connected device.

    应能找到你的设备并将其显示为已连接设备。

{: .steps}

[Configure on-device developer options]: {{site.android-dev}}/studio/debug/dev-options
[Connect to your device using Wi-Fi]: {{site.android-dev}}/studio/run/device#wireless
[Install OEM USB drivers]: {{site.android-dev}}/studio/run/oem-usb

</Tab>
</Tabs>

## Validate your setup {: #validate-setup}

## 验证你的设置 {: #validate-setup}

 1. <h3>Check for toolchain issues</h3>

    <h3>检查工具链问题</h3>

    To check for any issues with your Android development setup,
    run the `flutter doctor` command in your preferred terminal:

    要检查 Android 开发设置是否存在问题，
    请在你常用的终端运行 `flutter doctor` 命令：

    ```console
    $ flutter doctor
    ```

    If you see any errors or tasks to complete under
    the **Android toolchain** or **Android Studio** sections,

    若在 **Android toolchain** 或 **Android Studio** 部分看到任何错误或待完成任务，

    Complete any mentioned tasks and then
    run `flutter doctor` again to verify any changes.

    请完成所有提到的任务，然后再次运行 `flutter doctor` 以验证变更。

 1. <h3>Check for Android devices</h3>

    <h3>检查 Android 设备</h3>

    To ensure you set up your emulator and/or physical Android device correctly,
    run `flutter emulators` and `flutter devices` in your preferred terminal:

    为确保你正确设置了模拟器和/或实体 Android 设备，
    请在你常用的终端运行 `flutter emulators` 和 `flutter devices`：

    ```console
    $ flutter emulators && flutter devices
    ```

    Depending on if you set up an emulator or a device,
    at least one should output an entry with the platform marked as **android**.

    根据你设置的是模拟器还是设备，
    至少应有一项输出平台标记为 **android** 的条目。

 1. <h3>Troubleshoot setup issues</h3>

    <h3>排查设置问题</h3>

    If you need help resolving any setup issues,
    check out [Install and setup troubleshooting][].

    若需要帮助解决任何设置问题，
    请参阅 [安装与设置故障排除][Install and setup troubleshooting]。

    If you still have issues or questions,
    reach out on one of the Flutter [community][] channels.

    若仍有问题或疑问，
    可通过 Flutter [社区][community] 渠道联系。

{: .steps}

[Install and setup troubleshooting]: /install/troubleshoot#android-setup
[community]: {{site.main-url}}/community

## Start developing for Android {: #start-developing}

## 开始为 Android 开发 {: #start-developing}

Congratulations!
Now that you've set up Android development for Flutter,
you can continue your Flutter learning journey while testing on Android
or begin improving integration with Android.

恭喜！
既然你已为 Flutter 设置好 Android 开发，
你可以在 Android 上测试的同时继续 Flutter 学习之旅，
或开始改进与 Android 的集成。

<div class="card-grid link-cards">
  <div class="card filled-card list-card">
    <div class="card-leading">
      <img src="/assets/images/decorative/pointing-the-way.png" height="160" aria-hidden="true" alt="Dash 帮助你探索 Flutter 学习资源。">
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
      <img src="/assets/images/decorative/flutter-on-phone.svg" height="160" aria-hidden="true" alt="Flutter 在多设备上的示意。">
    </div>
    <div class="card-header">
      <span class="card-title">为 Android 构建</span>
    </div>
    <div class="card-content">
      <ul>
        <li>
          <a class="text-button" href="/deployment/android">构建并部署到 Android</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/bind-native-code">绑定原生 Android 代码</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/android/splash-screen">添加启动画面</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/android/platform-views">嵌入原生 Android 视图</a>
        </li>
        <li>
          <a class="text-button" href="/platform-integration/android/predictive-back">支持预测性返回</a>
        </li>
      </ul>
    </div>
  </div>
</div>
