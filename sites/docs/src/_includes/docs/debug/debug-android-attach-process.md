1. Click the **Attach debugger to Android process** button.
   (![Tiny green bug superimposed with a light grey arrow](/assets/images/docs/testing/debugging/native/android-studio/attach-process-button.png))

   点击 **Attach debugger to Android process**（将调试器附加到 Android 进程）按钮。
      (![Tiny green bug superimposed with a light grey arrow](/assets/images/docs/testing/debugging/native/android-studio/attach-process-button.png))

    :::tip
    If this button doesn't appear in the **Projects** menu bar, verify that
    you opened Flutter _application_ project but _not a Flutter plugin_.
    :::

    :::tip
    若 **Projects** 菜单栏中没有此按钮，请确认你打开的是 Flutter _application_ 项目，而_不是 Flutter plugin_。
    :::

1. The **process** dialog displays one entry for each connected device.
   Select **show all processes** to display available processes for each
   device.

   **process** 对话框会为每个已连接设备显示一项。选择 **show all processes**（显示所有进程）可显示各设备上的可用进程。

1. Choose the process to which you want to attach.
   For this guide, select the `com.example.my_app` process
   using the **Emulator Pixel_5_API_33**.

   选择要附加的进程。本指南请选择 **Emulator Pixel_5_API_33** 上的 `com.example.my_app` 进程。

{% comment %}

   @atsansone - 2023-07-24

   These screenshots were commented out for two reasons known for most docs:

   1. The docs should stand on their own.
   2. These screenshots would be painful to maintain.

   If reader feedback urges their return, these will be uncommented.

   ![Attach to Process dialog box open in Android Studio](/assets/images/docs/testing/debugging/native/android-studio/attach-process-dialog.png)
   <div class="figure-caption">

   Flutter app in Android device displaying two buttons.

   </div>
{% endcomment %}

1. Locate the tab for **Android Debugger** in the **Debug** pane.

   在 **Debug** 窗格中找到 **Android Debugger** 标签页。

1. In the **Project** pane, expand
   **my_app_android** <span aria-label="and then">></span>
   **android** <span aria-label="and then">></span>
   **app** <span aria-label="and then">></span>
   **src** <span aria-label="and then">></span>
   **main** <span aria-label="and then">></span>
   **java** <span aria-label="and then">></span>
   **io.flutter plugins**.

   在 **Project** 窗格中展开
      **my_app_android** <span aria-label="and then">></span>
      **android** <span aria-label="and then">></span>
      **app** <span aria-label="and then">></span>
      **src** <span aria-label="and then">></span>
      **main** <span aria-label="and then">></span>
      **java** <span aria-label="and then">></span>
      **io.flutter plugins**。

1. Double click **GeneratedProjectRegistrant** to open the
   Java code in the **Edit** pane.

   双击 **GeneratedProjectRegistrant**，在 **Edit** 窗格中打开 Java 代码。

{% comment %}
   !['The Android Project view highlighting the GeneratedPluginRegistrant.java file.'](/assets/images/docs/testing/debugging/native/android-studio/debug-open-java-code.png){:width="100%"}
   <div class="figure-caption">

   The Android Project view highlighting the `GeneratedPluginRegistrant.java` file.

   </div>
{% endcomment %}

At the end of this procedure, both the Dart and Android debuggers interact
with the same process.
Use either, or both, to set breakpoints, examine stack, resume execution
and the like. In other words, debug!

完成此流程后，Dart 与 Android 调试器都会与同一进程交互。
你可以使用其中任一或两者来设置断点、查看堆栈、恢复执行等。换句话说，开始调试吧！

{% comment %}
![The Dart debug pane with two breakpoints set in `lib/main.dart`](/assets/images/docs/testing/debugging/native/dart-debugger.png){:width="100%"}
<div class="figure-caption">

The Dart debug pane with two breakpoints set in `lib/main.dart`.

</div>
{% endcomment %}

{% comment %}
!['The Android debug pane with one breakpoint set in GeneratedPluginRegistrant.java.'](/assets/images/docs/testing/debugging/native/android-studio/debugger-active.png)
<div class="figure-caption">

The Android debug pane with one breakpoint set in GeneratedPluginRegistrant.java.

</div>
{% endcomment %}
