##### Start the Xcode debugger
{:.no_toc}

##### 启动 Xcode 调试器
{:.no_toc}

1. Open `ios/Runner.xcworkspace` from your Flutter app directory.

   从 Flutter app 目录打开 `ios/Runner.xcworkspace`。

1. Select the correct device using the **Scheme** menu in the toolbar.

   使用工具栏中的 **Scheme** 菜单选择正确的设备。

    If you have no preference, choose **iPhone Pro 14**.

    若无偏好，请选择 **iPhone Pro 14**。

   {% comment %}
    ![Selecting iPhone 14 in the Scheme menu in the Xcode toolbar](/assets/images/docs/testing/debugging/native/xcode/select-device.png){:width="100%"}
    <div markdown="1">{:.figure-caption}
    Selecting iPhone 14 in the Scheme menu in the Xcode toolbar.
    </div>
    {% endcomment %}

1. Run this Runner as a normal app in Xcode.

   在 Xcode 中将此 Runner 作为普通 app 运行。

    {% comment %}
    ![Start button in Xcode interface](/assets/images/docs/testing/debugging/native/xcode/run-app.png)
    <div markdown="1">{:.figure-caption}
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
{:.no_toc}

##### 在 VS Code 中附加到 Dart VM
{:.no_toc}

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
