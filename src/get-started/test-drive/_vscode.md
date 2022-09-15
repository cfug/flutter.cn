<div class="tab-pane" id="vscode" role="tabpanel" aria-labelledby="vscode-tab" markdown="1">

## Create the app {#create-app}

## 创建应用 {#create-app}

  1. Invoke **View > Command Palette**.

     打开 **View > Command Palette**。

  1. Type "flutter", and select the **Flutter: New Project**.

     输入「flutter」，选择 **Flutter: New Project**。

  1. Select **Application**.

     选择 **Application**。

  1. Create or select the parent directory for the new project folder.

     新建或选择新项目将存放的上层目录。

  1. Enter a project name, such as `my_app`, and press **Enter**.

     输入项目名称，例如 `my_app`，并点击 **Enter**。

  1. Wait for project creation to complete and the `main.dart`
     file to appear.

     等待项目创建完成，并且 `main.dart` 文件展现在编辑器中。

The above commands create a Flutter project directory called `my_app` that
contains a simple demo app that uses [Material Components][].

该命令会创建一个名为 `myapp`，里面包含一个简单的示例程序，
里面用到了 [Material 组件][Material Components]。

{% include_relative _package-name.md  %}

{% include_relative _restart-vscode.md %}

{% include_relative _main-code-note.md  %}

## Run the app

1. Locate the VS Code status bar
   (the blue bar at the bottom of the window):<br>

   定位到 VS Code 的状态栏（窗口底部的蓝色栏）：<br> 
    ![status bar][]{:.mw-100.pt-1.pb-2}

1. Select a device from the **Device Selector** area.
   For details, see [Quickly switching between Flutter devices][].

   从 **Device Selector** 区域选择一个设备。
   更多信息，参考 [快速切换用于 Flutter 的设备][Quickly switching between Flutter devices]。

   - If no device is available, and you want to use a device simulator,
     click **No Devices** and click
     **Start iOS Simulator** to launch a simulator.

     如果没有可用的设备，而同时你想使用模拟器，点击 **No Devices**
     并点击 **Start iOS Simulator** 启动一个模拟器。

     {{site.alert.warning}}

        You might not see **Start iOS Simulator** option
        when you click **No Devices** in VS Code.
        If you're on Mac, then you might have to run following command
        in terminal to launch a simulator.

        点击 VS Code 的 **No Devices** 时，
        你可能不会看到 **Start iOS Simulator** 的选项。
        如果你在使用 macOS，请在终端中执行以下命令：

        ```terminal
        open -a simulator
        ```

        On Windows or Linux, it's not possible to launch an iOS simulator.

        在 Windows 或 Linux 上你无法启动 iOS 模拟器。

      {{site.alert.end}}

    - To setup a real device, follow the device-specific instructions
      on the [Install][] page for your OS.

      想要配置真机用于调试，请查看你正在使用的系统的对应
      [安装][Install] 设备指导。

1. Invoke **Run > Start Debugging** or press <kbd>F5</kbd>.

   运行 **Run > Start Debugging** 或按下 <kbd>F5</kbd>。

1. Wait for the app to launch&mdash;progress is printed
   in the **Debug Console** view.

   等待应用启动&mdash;&mdash;启动进度会在 **Debug Console** 中展示。

{% capture save_changes -%}
  : invoke **Save All**, or click **Hot Reload**
  {% include_relative _hot-reload-icon.md %}.
{% endcapture %}

{% include_relative _try-hot-reload.md save_changes=save_changes %}
{% include docs/run-profile.md %}

[Install]: {{site.url}}/get-started/install
[Material Components]: {{site.material}}/guidelines
[Quickly switching between Flutter devices]: https://dartcode.org/docs/quickly-switching-between-flutter-devices
[status bar]: {{site.url}}/assets/images/docs/tools/vs-code/device_status_bar.png
[trusted your computer]: {{site.url}}/get-started/install/macos#trust

</div>
