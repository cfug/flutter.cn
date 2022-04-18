<div class="tab-pane" id="vscode" role="tabpanel" aria-labelledby="vscode-tab" markdown="1">

## Create the app {#create-app}

## 创建应用程序 {#create-app}

  1. Invoke **View > Command Palette**.

     打开 **View > Command Palette**。

  1. Type "flutter", and select the **Flutter: New Project**.

     输入「flutter」，选择 **Flutter: New Project**。

  1. Select **Application**.

     选择 **Application**。

  1. Create or select the parent directory for the new project folder.

     新建或选择新项目将存放的上层目录。

  1. Enter a project name, such as `myapp`, and press **Enter**.

     输入项目名称，例如 `myapp`，并点击 **Enter**。

  1. Wait for project creation to complete and the `main.dart`
     file to appear.

     等待项目创建完成，并且 `main.dart` 文件展现在编辑器中。

The above commands create a Flutter project directory called `myapp` that
contains a simple demo app that uses [Material Components][].

该命令会创建一个名为 `myapp`，里面包含一个简单的示例程序，
里面用到了 [Material 组件][Material Components]。

{% include_relative _package-name.md  %}

{% include_relative _restart-vscode.md %}

{% include_relative _main-code-note.md  %}

## Run the app

 1. Locate the VS Code status bar (the blue bar at the bottom of the
    window):<br> ![status bar][]{:.mw-100.pt-1.pb-2}
 1. Select a device from the **Device Selector** area.
    For details, see [Quickly switching between Flutter devices][].
    - If no device is available and you want to use a device simulator,
      click **No Devices** and launch a simulator.

      {{site.alert.warning}}
      You may not see **Start iOS Simulator** option when you click **No Devices** in VS Code. If you are on Mac then you may have to run following command in          terminal to launch a simulator.
      ```
      open -a simulator
      ```

      On Windows or Linux it is not possible to launch iOS simulator.
      {{site.alert.end}}

    - To setup a real device, follow the device-specific instructions on the
      [Install][] page for your OS.
 1. Invoke **Run > Start Debugging** or press <kbd>F5</kbd>.
 1. Wait for the app to launch &mdash; progress is printed
    in the **Debug Console** view.

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
