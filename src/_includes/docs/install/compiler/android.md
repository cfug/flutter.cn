
## Configure Android development

## 配置 Android 开发

{% case include.devos %}
{% when 'Windows' -%}
   {% assign terminal='PowerShell' %}
   {% assign prompt='C:\>' %}
{% when "macOS" -%}
   {% assign terminal='Terminal' %}
   {% assign prompt='$' %}
{% else -%}
   {% assign terminal='shell' %}
   {% assign prompt='$' %}
{% endcase -%}

### Configure the Android toolchain in Android Studio

### 在 Android Studio 中配置 Android toolchain

{% render docs/help-link.md, location:'android-studio', section:'#android-setup' %}

To create Android apps with Flutter, verify that the following Android
components have been installed.

要使用 Flutter 创建 Android 应用，
请确认已经安装以下 Android 组件。

* **Android SDK Platform, API 35**
* **Android SDK Command-line Tools**
* **Android SDK Build-Tools**
* **Android SDK Platform-Tools**
* **Android Emulator**

If you haven't installed these, or you don't know, continue with the following procedure.

如果你没有安装或者不清楚，请继续以下步骤。

Otherwise, you can skip to the [next section][check-dev].

如果你已经安装，你可以跳转至 [下一节][check-dev]。

[check-dev]: #check-your-development-setup

{% tabs "android-studio-experience" %}
{% tab "首次使用 Android Studio" %}

1. Launch **Android Studio**.

   启动 **Android Studio**。

   The **Welcome to Android Studio** dialog displays.

   显示 **Welcome to Android Studio** 的对话框。

1. Follow the **Android Studio Setup Wizard**.

   按照 **Android Studio Setup Wizard** 操作。

1. Install the following components:

   安装以下组件：

   * **Android SDK Platform, API 35**
   * **Android SDK Command-line Tools**
   * **Android SDK Build-Tools**
   * **Android SDK Platform-Tools**
   * **Android Emulator**

{% endtab %}
{% tab "正在使用 Android Studio" %}

1. Launch **Android Studio**.

   启动 **Android Studio**。

1. Go to the **Settings** dialog to view the **SDK Manager**.

   打开 **Settings** 对话框，
   查看 **SDK Manager**。

   1. If you have a project open,
      go to **Tools** <span aria-label="and then">></span> **SDK Manager**.

      如果你已经打开了一个项目，
      请打开 **Tools** <span aria-label="and then">></span> **SDK Manager**。

   1. If the **Welcome to Android Studio** dialog displays,
      click the **More Options** icon that follows the **Open** button
      and click **SDK Manager** from the dropdown menu.

      如果显示 **Welcome to Android Studio** 的对话框，
      请单击 **Open** 按钮后面的 **More Options** 图标，
      然后从下拉菜单中单击 **SDK Manager**。 

1. Click **SDK Platforms**.

   单击 **SDK Platforms**。

1. Verify that **Android API 35** has been selected.

   检查 **Android API 35** 是否已经选中。

   If the **Status** column displays **Update available** or **Not installed**:

   如果 **Status** 栏显示 **Update available** 或 **Not installed**：

   {:type="a"}
   1. Select **Android API 35**.

      选择 **Android API 35**

   1. Click **Apply**.

      单击 **Apply**。

   1. When the **Confirm Change** dialog displays, click **OK**.

      当显示 **Confirm Change** 对话框时，
      单击 **OK**。

      The **SDK Quickfix Installation** dialog displays with a
      completion meter.

      显示 **SDK Quickfix Installation** 完成进度的对话框。

   1. When the install finishes, click **Finish**.

      安装完成后，单击 **Finish**。

      After you installed the latest SDK,
      the **Status** column might display **Update available**.
      This means some additional system images might not be installed.
      You can ignore this and continue.

      安装最新的 SDK 后，
      **Status** 栏可能会显示 **Update available**。
      这意味着某些额外的系统镜像可能尚未安装。
      你可以忽略它然后继续。

1. Click **SDK Tools**.

   单击 **SDK Tools**。

1. Verify that the following SDK Tools have been selected:

   检查以下 SDK 工具是否已经选择：

   * **Android SDK Command-line Tools**
   * **Android SDK Build-Tools**
   * **Android SDK Platform-Tools**
   * **Android Emulator**

1. If the **Status** column for any of the preceding tools displays
   **Update available** or **Not installed**:

   如果上述任何工具的 **Status** 栏显示 
   **Update available** 或 **Not installed**：

   {:type="a"}
   1. Select the needed tools.

      选择所需的工具。

   1. Click **Apply**.

      单击 **Apply**。

   1. When the **Confirm Change** dialog displays, click **OK**.

      当显示 **Confirm Change** 的对话框时，
      单击 **OK**。

      The **SDK Quickfix Installation** dialog displays with a
      completion meter.

      显示 **SDK Quickfix Installation** 完成进度的对话框。

   1. When the install finishes, click **Finish**.

      安装完成后，单击 **Finish**。

{% endtab %}
{% endtabs %}

### Configure your target Android device

### 配置目标 Android 设备

{% tabs "android-emulator-or-not" %}
{% tab "虚拟设备" %}

#### Set up the Android emulator

#### 配置安卓模拟器

{% render docs/help-link.md, location:'android-emulator', section:'#android-setup' %}

{% case include.devos %}
{% when 'Windows','Linux' -%}
{% assign images = '**x86 Images**' -%}
{% when 'macOS' -%}
{% assign images = '**x86 Images** if your Mac runs on an Intel CPU or **ARM Images** if your Mac runs on an Apple CPU' -%}
{% endcase -%}

{% case include.devos %}
{% when 'Windows','Linux' -%}
{% assign images-cn = '**x86 Images**' -%}
{% when 'macOS' -%}
{% assign images-cn = '单击 **x86 Images**（Intel CPU 的 Mac）或者 **ARM Images**（Apple CPU 的 Mac）' -%}
{% endcase -%}

To configure your Flutter app to run in an Android emulator,
follow these steps to create and select an emulator.

要配置 Flutter 应用在 Android 模拟器中运行，
请按照以下步骤创建并选择模拟器：

1. Enable
    [VM acceleration]({{site.android-dev}}/studio/run/emulator-acceleration#accel-vm)
    on your development computer.

   在你的开发电脑上启用 [VM acceleration]({{site.android-dev}}/studio/run/emulator-acceleration#accel-vm)。

1. Start **Android Studio**.

   启动 **Android Studio**。

1. Go to the **Settings** dialog to view the **SDK Manager**.

   打开 **Settings** 对话框，
   查看 **SDK Manager**。

   1. If you have a project open,
      go to **Tools** <span aria-label="and then">></span>
      **Device Manager**.

      如果你已经打开了一个项目，
      请打开 **Tools** <span aria-label="and then">></span>
      **Device Manager**。

   1. If the **Welcome to Android Studio** dialog displays,
      click the **More Options** icon that follows the **Open** button
      and click **Device Manager** from the dropdown menu.

      如果显示 **Welcome to Android Studio** 的对话框，
      请单击 **Open** 按钮后面的 **More Options** 图标，
      然后在下拉菜单中单击 **Device Manager**。

1. Click **Virtual**.

   单击 **Virtual**。

1. Click **Create Device**.

   单击 **Create Device**。

   The **Virtual Device Configuration** dialog displays.

   显示 **Virtual Device Configuration** 的对话框。

1. Select either **Phone** or **Tablet** under **Category**.

   在 **Category** 下选择 **Phone** 或 **Tablet**。

1. Select a device definition. You can browse or search for the device.

   选择设备，你可以浏览或搜索设备。

1. Click **Next**.

   单击 **Next**。

1. Click {{images}}.

   单击 {{images-cn}}。

1. Click one system image for the Android version you want to emulate.

   单击需要模拟的 Android 版本系统镜像。

   {:type="a"}
   1. If the desired image has a **Download** icon to the right
      of the **Release Name**, click it.

      如果所需镜像的 **Release Name** 右侧有一个 **Download** 图标，
      请单击该图标。

      The **SDK Quickfix Installation** dialog displays with a
      completion meter.

      显示 **SDK Quickfix Installation** 完成进度的对话框

   1. When the download completes, click **Finish**.

      下载完成后，单击 **Finish**。

1. Click **Next**.

   单击 **Next**。

   The **Virtual Device Configuration** displays its
   **Verify Configuration** step.

   **Virtual Device Configuration** 会显示它的 
   **Verify Configuation** 步骤。

1. To rename the Android Virtual Device (AVD), change the value in the
   **AVD Name** box.

   如果要重命名 Android 虚拟设备 (AVD)，
   请更改 **AVD Name** 框中的值。

1. Click **Show Advanced Settings** and scroll to **Emulated Performance**.

   单击 **Show Advanced Settings** 并滚动至 **Emulated Performance**。

1. From the **Graphics** dropdown menu, select **Hardware - GLES 2.0**.

   从 **Graphics** 下拉菜单中，
   选择 **Hardware - GLES 2.0**。

   This enables [hardware acceleration][] and improves rendering performance.

   这样就会开启 [硬件加速 (hardware acceleration)][hardware acceleration]
   并提高渲染性能。

1. Verify your AVD configuration. If it is correct, click **Finish**.

   检查你的 AVD 配置。
   如果已经完备，
   请单击 **Finish**。

   To learn more about AVDs, check out
   [Managing AVDs]({{site.android-dev}}/studio/run/managing-avds).

   想要了解更多有关 AVD 的信息，请查阅
   [Managing AVDs]({{site.android-dev}}/studio/run/managing-avds)。

1. In the **Device Manager** dialog, click the **Run** icon to the right
   of your desired AVD.
   The emulator starts up and displays the default canvas for your
   selected Android OS version and device.

   在 **Device Manager** 对话框中，
   单击所需 AVD 右侧的 **Run** 图标。
   模拟器启动并显示所选 Android 操作系统的版本和设备默认的画布。

[hardware acceleration]: {{site.android-dev}}/studio/run/emulator-acceleration

{% endtab %}
{% tab "真机设备" %}

#### Set up your target Android device

#### 配置目标 Android 设备

{% render docs/help-link.md, location:'android-device', section:'#android-setup' %}

To configure your Flutter app to run on a physical Android device,
you need a [supported version of Android][supported-version].

你需要一台 [支持开发的 Android 版本][supported-version]，
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

{%- if include.devos == 'Windows' %}

1. Install the [Google USB Driver]({{site.android-dev}}/studio/run/win-usb).

   安装 [Google USB Driver]({{site.android-dev}}/studio/run/win-usb)。

{% endif %}

1. Plug your device into your {{include.devos}} computer.
   If your device prompts you, authorize your computer to access your device.

   将设备插入你的 {{include.devos}} 电脑。
   如果设备发出提示，请授权电脑访问你的设备。

1. Verify that Flutter recognizes your connected Android device.

   检查 Flutter 是否能识别连接的 Android 设备。

   {%- if include.devos == 'Windows' %}

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

{% endtab %}
{% endtabs %}

[supported-version]: /reference/supported-platforms

{% if include.attempt == 'first' %}

### Agree to Android licenses

### 同意 Android 许可证

{% render docs/help-link.md, location:'android-licenses', section:'#android-setup' %}

Before you can use Flutter and after you install all prerequisites,
agree to the licenses of the Android SDK platform.

在使用 Flutter 之前，
按照指南安装所有必要的条件之后，
再同意 Android SDK 平台的许可证。

1. Open an elevated console window.

   打开一个高权限（管理员）的控制台窗口。

1. Run the following command to enable signing licenses.

   运行以下指令启用签名许可证。

   ```console
   {{prompt}} flutter doctor --android-licenses
   ```

   If you accepted the Android Studio licenses at another time,
   this command returns:

   如果你在其他时候已经同意了 Android Studio 许可证，
   该指令将会返回：

   ```console
   [========================================] 100% Computing updates...
   All SDK package licenses accepted.
   ```

   You can skip the next step.

   你可以跳过下一个步骤。

1. Before agreeing to the terms of each license,
   read each with care.

   请仔细阅读每项许可条款后，再同意。

{% if include.devos == 'macOS' %}

#### Troubleshooting licensing issues

#### 许可证问题故障排除

<details>
<!-- <summary>How to fix the error of finding Java install</summary> -->
<summary>如何解决查找 Java 安装错误的问题</summary>

You might have an issue with the Android SDK locating the Java SDK.

你可以遇到了 Android SDK 定位 Java SDK 的问题。

```console
$ flutter doctor --android-licenses

ERROR: JAVA_HOME is set to an invalid directory: /Applications/Android\ Studio.app/Contents/jre/Contents/Home

Please set the JAVA_HOME variable in your environment to match the
location of your Java installation.

Android sdkmanager tool was found, but failed to run
(/Users/atsansone/Library/Android/sdk/cmdline-tools/latest/bin/sdkmanager): "exited code 1".
Try re-installing or updating your Android SDK,
visit https://flutter.dev/to/macos-android-setup for detailed instructions.
```

The `flutter doctor` command returns this error because of how the `JAVA_HOME`
variable was set. When you add the path to `JAVA_HOME`, you can add a backslash
to the space between `Android` and `Studio` or enclose the entire path in
matching quotes. You cannot do _both_.

这是由于环境变量 `JAVA_HOME` 设置方式导致的，
`flutter doctor` 指令就会返回此错误。
当你在向 `JAVA_HOME` 添加路径时，
可以在 `Android` 和 `Studio` 之间的空格处添加反斜杠，
或者用引号将整个路径包含进来。
切记，不能 **同时** 这样做。

Look for your `JAVA_HOME` path in your appropriate shell resource file.

在合适的 shell 资源文件中查找 `JAVA_HOME` 路径。

Change it from:

将下面这样：

```bash
export JAVA_HOME="/Applications/Android\ Studio.app/Contents/jre/Contents/Home"
```

to:

改成：

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/Contents/Home"
```

Do not include the backslash between `Android` and `Studio`.

不要在 `Android` 和 `Studio` 之间加入反斜杠。

To load this updated environment variable, reload your shell.
This example uses the `zsh` resource file.

要加载当前更新后的环境变量，
请重新加载 shell。
本例使用 `zsh` 资源文件。

```console
source ~/.zshrc
```

</details>

{% endif %}

{% endif %}
