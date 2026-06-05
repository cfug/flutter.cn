#### Build the iOS version of the Flutter app in the Terminal

#### 在终端中构建 Flutter app 的 iOS 版本

To generate the needed iOS platform dependencies,
run the `flutter build` command.

要生成所需的 iOS 平台依赖，请运行 `flutter build` 命令。

```console
$ flutter build ios --config-only --no-codesign --debug
```

```console
Warning: Building for device with codesigning disabled. You will have to manually codesign before deploying to device.
Building com.example.myApp for device (ios)...
```

<Tabs key="darwin-debug-flow">
<Tab name="Start from VS Code">

#### Start debugging with VS Code first {:#vscode-ios}

#### 先从 VS Code 开始调试 {:#vscode-ios}

If you use VS Code to debug most of your code, start with this section.

若你主要用 VS Code 调试代码，请从本节开始。

##### Start the Dart debugger in VS Code

##### 在 VS Code 中启动 Dart 调试器

{% render "docs/debug/debug-flow-vscode-as-start.md" %}

{% if add == 'launch' %}
{% render "docs/debug/vscode-flutter-attach-json.md" %}
{% endif %}

##### Attach to the Flutter process in Xcode

##### 在 Xcode 中附加到 Flutter 进程

To attach to the Flutter app in Xcode:

要在 Xcode 中附加到 Flutter app：

1. Go to **Debug** <span aria-label="and then">></span> **Attach to Process**.

   前往 **Debug** <span aria-label="and then">></span> **Attach to Process**。

1. Select **Runner**. It should be at the top of the
   **Attach to Process** menu under the **Likely Targets** heading.

   选择 **Runner**。它应位于 **Attach to Process** 菜单 **Likely Targets** 标题下的顶部。

</Tab>
<Tab name="Start from Xcode">

#### Start debugging with Xcode first {:#xcode-ios}

#### 先从 Xcode 开始调试 {:#xcode-ios}

If you use Xcode to debug most of your code, start with this section.

若你主要用 Xcode 调试代码，请从本节开始。

##### Start the Xcode debugger

##### 启动 Xcode 调试器

1. Open `ios/Runner.xcworkspace` from your Flutter app directory.

   从 Flutter app 目录打开 `ios/Runner.xcworkspace`。

1. Select the correct device using the **Scheme** menu in the toolbar.

   使用工具栏中的 **Scheme** 菜单选择正确的设备。

    If you have no preference, choose **iPhone Pro 14**.

    若无偏好，请选择 **iPhone Pro 14**。

   {% comment %}
    ![Selecting iPhone 14 in the Scheme menu in the Xcode toolbar](/assets/images/docs/testing/debugging/native/xcode/select-device.png){:width="100%"}
    <div class="figure-caption">

    Selecting iPhone 14 in the Scheme menu in the Xcode toolbar.

    </div>
    {% endcomment %}

1. Run this Runner as a normal app in Xcode.

   在 Xcode 中将此 Runner 作为普通 app 运行。

    {% comment %}
    ![Start button in Xcode interface](/assets/images/docs/testing/debugging/native/xcode/run-app.png)
    <div class="figure-caption">

    Start button displayed in Xcode interface.

    </div>
    {% endcomment %}

    When the run completes, the **Debug** area at the bottom of Xcode displays
    a message with the Dart VM service URI. It resembles the following response:

    运行完成后，Xcode 底部的 **Debug** 区域会显示包含 Dart VM 服务 URI 的消息，类似以下输出：

    ```console
    2023-07-12 14:55:39.966191-0500 Runner[58361:53017145]
        flutter: The Dart VM service is listening on
        http://127.0.0.1:50642/00wEOvfyff8=/
    ```

1. Copy the Dart VM service URI.

   复制 Dart VM 服务 URI。

##### Attach to the Dart VM in VS Code

##### 在 VS Code 中附加到 Dart VM

1. To open the command palette, go to
    **View** <span aria-label="and then">></span>
    **Command Palette...**

   要打开命令面板，请前往
      **View** <span aria-label="and then">></span>
      **Command Palette...**

    You can also press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>.

    也可按 <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>。

1. Type `debug`.

   输入 `debug`。

1. Click the **Debug: Attach to Flutter on Device** command.

   点击 **Debug: Attach to Flutter on Device** 命令。

{% comment %}
    !['Running the Debug: Attach to Flutter on Device command in VS Code.'](/assets/images/docs/testing/debugging/vscode-ui/screens/attach-flutter-process-menu.png){:width="100%"}
{% endcomment %}

1. In the **Paste an VM Service URI** box, paste the URI you copied
    from Xcode and press <kbd>Enter</kbd>.

   在 **Paste an VM Service URI** 框中粘贴从 Xcode 复制的 URI，然后按 <kbd>Enter</kbd>。

{% comment %}
    ![Alt text](/assets/images/docs/testing/debugging/vscode-ui/screens/vscode-add-attach-uri-filled.png)
{% endcomment %}

</Tab>
</Tabs>
