<div class="tab-pane" id="vscode" role="tabpanel" aria-labelledby="vscode-tab" markdown="1">

{% include_relative _web-app.md  %}

## Create the app {#create-app}

## 创建应用

  1. Invoke **View > Command Palette**.
  
     打开 **View > Command Palette**。
    
  1. Type "flutter", and select the **Flutter: New Project**.
     
     输入 "flutter"，选择 **Flutter: New Project**。
    
  1. Enter a project name, such as `myapp`, and press **Enter**.
     
     输入项目名称，比如 `myapp`，然后点 **Enter**
      
  1. Create or select the parent directory for the new project folder.

     创建或者选择新项目的父文件夹。
    
  1. Wait for project creation to complete and the `main.dart`
     file to appear.

     稍等一下项目创建成功，目录中就会生成 `main.dart` 文件。

The above commands create a Flutter project directory called `myapp` that
contains a simple demo app that uses [Material Components][].

上面的操作会创建一个叫做 `myapp` 的 Flutter 项目目录
该目录中包含一个用到 [Material Components][]简单的示例程序。

{% include_relative _package-name.md  %}

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
    更多详细内容，请参见 [在 Flutter 设备中快速切换][]。
    
    - If no device is available and you want to use a device simulator,
      click **No Devices** and launch a simulator.
      
      如果没有可用设备而且你也打算用模拟器，点击 **No Devices** 然后打开一个模拟器。
      
    - To setup a real device, follow the device-specific instructions on the
      [Install][] page for your OS.

 1. Invoke **Run > Start Debugging** or press <kbd>F5</kbd>.
    
    选择 **Run > 开始 Debugging** 或者按<kbd>F5</kbd>。
    
 1. Wait for the app to launch &mdash; progress is printed
    in the **Debug Console** view.
    
    当应用启动以后&mdash; 处理进度会出现在 **Debug Console** 页面中。

{{site.alert.warning}}

  When launching your app from a Mac, if you see
  `ERROR: Could not connect to lockdownd, error code -17`,
  make sure that you have [trusted your computer][].
  
  当你在 Mac 上打开应用时，如果你遇到下面报错：
  `ERROR: Could not connect to lockdownd, error code -17`，
  则意味着你需要进行信任设备操作，详见：
  [信任你的电脑][trusted your computer]。
  
{{site.alert.end}}

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
{% include run-profile.md %}

[Install]: /docs/get-started/install
[Material Components]: {{site.material}}/guidelines
[Quickly switching between Flutter devices]: https://dartcode.org/docs/quickly-switching-between-flutter-devices
[status bar]: {% asset tools/vs-code/device_status_bar.png @path %}
[在 Flutter 设备中快速切换]: https://dartcode.org/docs/quickly-switching-between-flutter-devices
[安装]: /docs/get-started/install
[trusted your computer]: /docs/get-started/install/macos#trust
</div>
