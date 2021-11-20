<div class="tab-pane" id="vscode" role="tabpanel" aria-labelledby="vscode-tab" markdown="1">

{% include_relative _web-app.md  %}

## Create the app {#create-app}

## 创建应用

  1. Invoke **View > Command Palette**.

     打开 **View > Command Palette**。

  1. Type "flutter", and select the **Flutter: New Project**.

     输入 "flutter"，选择 **Flutter: New Project**。

  1. Select **Application**.

     选择 "Application"。

  1. Create or select the parent directory for the new project folder.

     创建或者选择新项目的父文件夹。

  1. Enter a project name, such as `myapp`, and press **Enter**.

     输入项目名称，比如 `myapp`，然后点 **Enter**。

  1. Wait for project creation to complete and the `main.dart`
     file to appear.

     稍等一下项目创建成功，目录中就会生成 `main.dart` 文件。

The above commands create a Flutter project directory called `myapp` that
contains a simple demo app that uses [Material Components][].

上面的操作会创建一个叫做 `myapp` 的 Flutter 项目目录
该目录中包含一个用到 [Material Components][]简单的示例程序。

{% include_relative _package-name.md  %}

{% include_relative _restart-vscode.md %}

{% include_relative _main-code-note.md  %}

## Run the app

## 运行应用

 1. Locate the VS Code status bar (the blue bar at the bottom of the
    window):<br>
    
    找到 VS Code 的状态栏(窗口底部蓝色的条)<br> 
    ![status bar][]{:.mw-100.pt-1.pb-2}

 1. Select a device from the **Device Selector** area.
    For details, see [Quickly switching between Flutter devices][].
  
    从 **Device Selector** 里选择一个设备。
    更多详细内容，请参见 [在 Flutter 设备中快速切换][Quickly switching between Flutter devices]。
    
    - If no device is available and you want to use a device simulator,
      click **No Devices** and launch a simulator.

      如果没有可用设备而且你也打算用模拟器，
      点击 **No Devices** 然后打开一个模拟器。
      
      {{site.alert.warning}}

      You may not see **Start iOS Simulator** option when you click **No Devices** in VS Code. If you are on Mac then you may have to run following command in terminal to launch a simulator.

      当你在 VS Code 中点击 **No Devices** 的时候，你也许看不到 **Start iOS Simulator** 选项。如果你使用 Mac，你可能得运行以下命令才能启动模拟器。

      ```
      open -a simulator
      ```

      In Android it is not possible to launch iOS simulator.

      Android 是不可能启动 iOS 模拟器的。

      {{site.alert.end}}

    - To setup a real device, follow the device-specific instructions on the
      [Install][] page for your OS.

      要设置真实设备，请在操作系统的[安装][Install]页面进行操作。

 1. Invoke **Run > Start Debugging** or press <kbd>F5</kbd>.
    
    选择 **Run > 开始 Debugging** 或者按<kbd>F5</kbd>。
    
 1. Wait for the app to launch &mdash; progress is printed
    in the **Debug Console** view.
    
    当应用启动以后&mdash; 处理进度会出现在 **Debug Console** 页面中。

{% capture save_changes -%}
 : invoke **Save All**, or click **Hot Reload**
 {% include_relative _hot-reload-icon.md %}.
{% endcapture %}

{% capture save_changes_zhcn -%}
  : 选择 **Save All**，或者点击**热重载** 按钮：
  {% include_relative _hot-reload-icon.md %}
  (绿色的带有圆形箭头的按钮)。
{% endcapture %}

{% include_relative _try-hot-reload.md save_changes=save_changes %}
{% include docs/run-profile.md %}

[Install]: {{site.url}}/get-started/install
[Material Components]: {{site.material}}/guidelines
[Quickly switching between Flutter devices]: https://dartcode.org/docs/quickly-switching-between-flutter-devices
[在 Flutter 设备中快速切换]: https://dartcode.org/docs/quickly-switching-between-flutter-devices
[安装]: {{site.url}}/get-started/install
[status bar]: /assets/images/docs/tools/vs-code/device_status_bar.png
[trusted your computer]: {{site.url}}/get-started/install/macos#trust
</div>
