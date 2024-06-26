#### Set up the Android emulator

#### 配置安卓模拟器

{% render docs/help-link.md, location:'android-emulator', section:'#android-setup' %}

{% case include.devos %}
{% when 'Windows','Linux' -%}
{% assign images = '**x86 Images**' -%}
{% when 'macOS' -%}
<!-- {% assign images = '**x86 Images** if your Mac runs on an Intel CPU or **ARM Images** if your Mac runs on an Apple CPU' -%} -->
{% assign images = '**x86 Images**（Intel CPU 的 Mac）或者 **ARM Images**（Apple CPU 的 Mac）' -%}
{% endcase -%}

To configure your Flutter app to run in an Android emulator,
follow these steps to create and select an emulator.

要配置 Flutter 应用在 Android 模拟器中运行，
请按照以下步骤创建并选择模拟器：

1. Enable
   [VM acceleration]({{site.android-dev}}studio/run/emulator-acceleration#accel-vm)
   on your development computer.

   在你的开发电脑上启用 [VM acceleration]({{site.android-dev}}studio/run/emulator-acceleration#accel-vm)。

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

   单击 {{images}}。

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
   [Managing AVDs]({{site.android-dev}}studio/run/managing-avds).

   想要了解更多有关 AVD 的信息，请查阅
   [Managing AVDs]({{site.android-dev}}studio/run/managing-avds)。

1. In the **Device Manager** dialog, click the **Run** icon to the right
   of your desired AVD.
   The emulator starts up and displays the default canvas for your
   selected Android OS version and device.

   在 **Device Manager** 对话框中，
   单击所需 AVD 右侧的 **Run** 图标。
   模拟器启动并显示所选 Android 操作系统的版本和设备默认的画布。

[hardware acceleration]: {{site.android-dev}}studio/run/emulator-acceleration
