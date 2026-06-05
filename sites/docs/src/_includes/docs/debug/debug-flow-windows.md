#### Build the Windows version of the Flutter app in PowerShell or the Command Prompt

#### 在 PowerShell 或命令提示符中构建 Flutter app 的 Windows 版本

To generate the needed Windows platform dependencies,
run the `flutter build` command.

要生成所需的 Windows 平台依赖，请运行 `flutter build` 命令。

```console
C:\> flutter build windows --debug
```

```console
Building Windows application...                                    31.4s
√  Built build\windows\runner\Debug\my_app.exe.
```

<Tabs key="windows-debug-flow">
<Tab name="Start from VS Code">

#### Start debugging with VS Code first {:#vscode-windows}

#### 先从 VS Code 开始调试 {:#vscode-windows}

If you use VS Code to debug most of your code, start with this section.

若你主要用 VS Code 调试代码，请从本节开始。

##### Start the debugger in VS Code

##### 在 VS Code 中启动调试器

{% render "docs/debug/debug-flow-vscode-as-start.md" %}

{% comment %}
     !['Flutter app generated as a Windows app. The app displays two buttons to open this page in a browser or in the app'](/assets/images/docs/testing/debugging/native/url-launcher-app/windows.png){:width="50%"}
     <div class="figure-caption">

     Flutter app generated as a Windows app. The app displays two buttons to open this page in a browser or in the app.

     </div>
{% endcomment %}

##### Attach to the Flutter process in Visual Studio

##### 在 Visual Studio 中附加到 Flutter 进程

1. To open the project solution file, go to
   **File** <span aria-label="and then">></span>
   **Open** <span aria-label="and then">></span>
   **Project/Solution…**

   要打开项目解决方案文件，请前往
      **File** <span aria-label="and then">></span>
      **Open** <span aria-label="and then">></span>
      **Project/Solution…**

   You can also press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd>.

   也可按 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd>。

1. Choose the `build/windows/my_app.sln` file in your Flutter app directory.

   在 Flutter app 目录中选择 `build/windows/my_app.sln` 文件。

{% comment %}
   ![Open Project/Solution dialog box in Visual Studio 2022 with my_app.sln file selected.](/assets/images/docs/testing/debugging/native/visual-studio/choose-solution.png){:width="100%"}
   <div class="figure-caption">

   Open Project/Solution dialog box in Visual Studio 2022 with
   `my_app.sln` file selected.

   </div>
{% endcomment %}

1. Go to **Debug** > **Attach to Process**.

   前往 **Debug** > **Attach to Process**。

   You can also press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>P</kbd>.

   也可按 <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>P</kbd>。

1. From the **Attach to Process** dialog box, choose `my_app.exe`.

   在 **Attach to Process** 对话框中选择 `my_app.exe`。

{% comment %}
   ![Selecting my_app from the Attach to Process dialog box](/assets/images/docs/testing/debugging/native/visual-studio/attach-to-process-dialog.png){:width="100%"}
{% endcomment %}

   Visual Studio starts monitoring the Flutter app.

   Visual Studio 开始监视 Flutter app。

{% comment %}
   ![Visual Studio debugger running and monitoring the Flutter app](/assets/images/docs/testing/debugging/native/visual-studio/debugger-active.png){:width="100%"}
{% endcomment %}

</Tab>
<Tab name="Start from Visual Studio">

#### Start debugging with Visual Studio first

#### 先从 Visual Studio 开始调试

If you use Visual Studio to debug most of your code, start with this section.

若你主要用 Visual Studio 调试代码，请从本节开始。

##### Start the local Windows debugger

##### 启动本地 Windows 调试器

1. To open the project solution file, go to
   **File** <span aria-label="and then">></span>
   **Open** <span aria-label="and then">></span>
   **Project/Solution…**

   要打开项目解决方案文件，请前往
      **File** <span aria-label="and then">></span>
      **Open** <span aria-label="and then">></span>
      **Project/Solution…**

   You can also press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd>.

   也可按 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd>。

1. Choose the `build/windows/my_app.sln` file in your Flutter app directory.

   在 Flutter app 目录中选择 `build/windows/my_app.sln` 文件。

{% comment %}
   ![Open Project/Solution dialog box in Visual Studio 2022 with my_app.sln file selected.](/assets/images/docs/testing/debugging/native/visual-studio/choose-solution.png){:width="100%"}
   <div class="figure-caption">

   Open Project/Solution dialog box in Visual Studio 2022 with
   `my_app.sln` file selected.

   </div>
{% endcomment %}

1. Set `my_app` as the startup project.
   In the **Solution Explorer**, right-click on `my_app` and select
   **Set as Startup Project**.

   将 `my_app` 设为启动项目。在 **Solution Explorer** 中右键点击 `my_app`，选择 **Set as Startup Project**。

1. Click **Local Windows Debugger** to start debugging.

   点击 **Local Windows Debugger** 开始调试。

   You can also press <kbd>F5</kbd>.

   也可按 <kbd>F5</kbd>。

   When the Flutter app has started, a console window displays
   a message with the Dart VM service URI. It resembles the following response:

   Flutter app 启动后，控制台窗口会显示包含 Dart VM 服务 URI 的消息，类似以下输出：

   ```console
   flutter: The Dart VM service is listening on http://127.0.0.1:62080/KPHEj2qPD1E=/
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
   from Visual Studio and press <kbd>Enter</kbd>.

   在 **Paste an VM Service URI** 框中粘贴从 Visual Studio 复制的 URI，然后按 <kbd>Enter</kbd>。

{% comment %}
   ![Alt text](/assets/images/docs/testing/debugging/vscode-ui/screens/vscode-add-attach-uri-filled.png)
{% endcomment %}

</Tab>
</Tabs>
