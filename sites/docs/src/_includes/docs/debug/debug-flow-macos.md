#### Build the macOS version of the Flutter app in the Terminal

#### 在终端中构建 Flutter app 的 macOS 版本

To generate the needed macOS platform dependencies,
run the `flutter build` command.

要生成所需的 macOS 平台依赖，请运行 `flutter build` 命令。

```console
flutter build macos --debug
```

```console
Building macOS application...
```

<Tabs key="darwin-debug-flow">
<Tab name="Start from VS Code">

#### Start debugging with VS Code first {:#vscode-macos}

#### 先从 VS Code 开始调试 {:#vscode-macos}

##### Start the debugger in VS Code

##### 在 VS Code 中启动调试器

{% render "docs/debug/debug-flow-vscode-as-start.md" %}

##### Attach to the Flutter process in Xcode

##### 在 Xcode 中附加到 Flutter 进程

1. To attach to the Flutter app, go to
   **Debug** <span aria-label="and then">></span>
   **Attach to Process** <span aria-label="and then">></span>
   **Runner**.

   要附加到 Flutter app，请前往
      **Debug** <span aria-label="and then">></span>
      **Attach to Process** <span aria-label="and then">></span>
      **Runner**。

   **Runner** should be at the top of the **Attach to Process** menu
   under the **Likely Targets** heading.

   **Runner** 应位于 **Attach to Process** 菜单 **Likely Targets** 标题下的顶部。

</Tab>
<Tab name="Start from XCode">

#### Start debugging with Xcode first {:#xcode-macos}

#### 先从 Xcode 开始调试 {:#xcode-macos}

##### Start the debugger in Xcode

##### 在 Xcode 中启动调试器

1. Open `macos/Runner.xcworkspace` from your Flutter app directory.

   从 Flutter app 目录打开 `macos/Runner.xcworkspace`。

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

1. To open the command palette, go to **View** > **Command Palette...**

   要打开命令面板，请前往 **View** > **Command Palette...**

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
