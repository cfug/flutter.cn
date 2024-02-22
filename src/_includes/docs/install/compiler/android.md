## Configure Android development

## 配置 Android 开发

### Configure the Android toolchain in Android Studio

### 在 Android Studio 中配置 Android toolchain

{% include docs/help-link.md location='android-studio' section='#android-setup' %}

{% comment %} Nav tabs {% endcomment -%}
<ul class="nav nav-tabs" id="android-studio-start" role="tablist">
    <li class="nav-item">
        <a class="nav-link active" id="first-start-tab" href="#first-start" role="tab" aria-controls="first-start" aria-selected="true">首次使用 Android Studio</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="later-start-tab" href="#later-start" role="tab" aria-controls="later-start" aria-selected="false">正在使用 Android Studio</a>
    </li>
</ul>

{% comment %} Tab panes {% endcomment -%}
<div class="tab-content">

<div class="tab-pane active" id="first-start" role="tabpanel" aria-labelledby="first-start-tab" markdown="1">

1. Start **Android Studio**.

   启动 **Android Studio**。

   The **Welcome to Android Studio** dialog displays.

   显示 **Welcome to Android Studio** 的对话框。

1. Follow the **Android Studio Setup Wizard**.

   按照 **Android Studio Setup Wizard** 操作。

1. Install the following components:

   安装以下组件：

   * **Android SDK Platform, API {{ site.appnow.android_sdk }}**
   * **Android SDK Command-line Tools**
   * **Android SDK Build-Tools**
   * **Android SDK Platform-Tools**
   * **Android Emulator**

</div>

<div class="tab-pane" id="later-start" role="tabpanel" aria-labelledby="later-start-tab" markdown="1">

1. Start **Android Studio**.

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

1. Verify that **Android API {{ site.appnow.android_sdk }}** has been selected.

   检查 **Android API {{ site.appnow.android_sdk }}** 是否已经选中。

   If the **Status** column displays **Update available** or **Not installed**:

   如果 **Status** 栏显示 **Update available** 或 **Not installed**：

   {:type="a"}
   1. Select **Android API {{ site.appnow.android_sdk }}**.

      选择 **Android API {{ site.appnow.android_sdk }}**

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

</div>
</div>
{% comment %} End: Tab panes. {% endcomment -%}

### Configure your target Android device

### 配置目标 Android 设备

{% comment %} Nav tabs {% endcomment -%}
<ul class="nav nav-tabs" id="android-devices-vp" role="tablist">
    <li class="nav-item">
        <a class="nav-link active" id="virtual-tab" href="#virtual" role="tab" aria-controls="virtual" aria-selected="true">虚拟设备</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="physical-tab" href="#physical" role="tab" aria-controls="physical" aria-selected="false">真机设备</a>
    </li>
</ul>

{% comment %} Tab panes {% endcomment -%}
<div class="tab-content">

<div class="tab-pane active" id="virtual" role="tabpanel" aria-labelledby="virtual-tab" markdown="1">

{% include docs/install/devices/android-emulator.md os=include.os %}

</div>

<div class="tab-pane" id="physical" role="tabpanel" aria-labelledby="physical-tab" markdown="1">

{% include docs/install/devices/android-physical.md os=include.os %}

</div>
</div>
{% comment %} End: Tab panes. {% endcomment -%}

### Agree to Android licenses

### 同意 Android 许可证

{% include docs/help-link.md location='android-licenses' section='#android-setup' %}

Before you can use Flutter and after you install all prerequisites,
agree to the licenses of the Android SDK platform.

在使用 Flutter 之前，
按照指南安装所有必要的条件之后，
再同意 Android SDK 平台的许可证。

1. Open an elevated console window.

   打开一个高权限（管理员）的控制台窗口。

1. Run the following command to enable signing licenses.

   运行以下指令启用签名许可证。

   ```terminal
   $ flutter doctor --android-licenses
   ```

   If you accepted the Android Studio licenses at another time,
   this command returns:

   如果你在其他时候已经同意了 Android Studio 许可证，
   该指令将会返回：

   ```terminal
   [========================================] 100% Computing updates...
   All SDK package licenses accepted.
   ```

   You can skip the next step.

   你可以跳过下一个步骤。

1. Before agreeing to the terms of each license,
   read each with care.

   请仔细阅读每项许可条款后，再同意。

#### Troubleshooting licensing issues
{:.no_toc}

#### 许可证问题故障排除
{:.no_toc}

<details markdown="1">
<!-- <summary>How to fix the error of finding Java install</summary> -->
<summary>如何解决查找 Java 安装错误的问题</summary>

You might have an issue with the Android SDK locating the Java SDK.

你可以遇到了 Android SDK 定位 Java SDK 的问题。

```terminal
$ flutter doctor --android-licenses

ERROR: JAVA_HOME is set to an invalid directory: /Applications/Android\ Studio.app/Contents/jre/Contents/Home

Please set the JAVA_HOME variable in your environment to match the
location of your Java installation.

Android sdkmanager tool was found, but failed to run
(/Users/atsansone/Library/Android/sdk/cmdline-tools/latest/bin/sdkmanager): "exited code 1".
Try re-installing or updating your Android SDK,
visit https://flutter.dev/docs/get-started/install/macos#android-setup for detailed instructions.
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

```conf
export JAVA_HOME="/Applications/Android\ Studio.app/Contents/jre/Contents/Home"
```

to:

改成：

```conf
export JAVA_HOME="/Applications/Android Studio.app/Contents/jre/Contents/Home"
```

Do not include the backslash between `Android` and `Studio`.

不要在 `Android` 和 `Studio` 之间加入反斜杠。

To load this updated environment variable, reload your shell.
This example uses the `zsh` resource file.

要加载当前更新后的环境变量，
请重新加载 shell。
本例使用 `zsh` 资源文件。

```terminal
source ~/.zshrc
```

</details>
