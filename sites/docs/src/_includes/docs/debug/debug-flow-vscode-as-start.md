1. To open the Flutter app directory, go to
   **File** <span aria-label="and then">></span>
   **Open Folder...** and choose the `my_app` directory.

   1. 要打开 Flutter app 目录，请前往
      **File** <span aria-label="and then">></span>
      **Open Folder...**，选择 `my_app` 目录。

1. Open the `lib/main.dart` file.

   1. 打开 `lib/main.dart` 文件。

1. If you can build an app for more than one device,
   you must select the device first.

   1. 若可为多种设备构建 app，须先选择设备。

   Go to
   **View** <span aria-label="and then">></span>
   **Command Palette...**

   前往
   **View** <span aria-label="and then">></span>
   **Command Palette...**

   You can also press <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> +
   <kbd>Shift</kbd> + <kbd>P</kbd>.

   也可按 <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>。

1. Type `flutter select`.

   1. 输入 `flutter select`。

1. Click the **Flutter: Select Device** command.

   1. 点击 **Flutter: Select Device** 命令。

1. Choose your target device.

   1. 选择目标设备。

1. Click the debug icon
   (![VS Code's bug icon to trigger the debugging mode of a Flutter app](/assets/images/docs/testing/debugging/vscode-ui/icons/debug.png)).
   This opens the **Debug** pane and launches the app.
   Wait for the app to launch on the device and for the debug pane to
   indicate **Connected**.
   The debugger takes longer to launch the first time.
   Subsequent launches start faster.

   1. 点击调试图标
      (![VS Code's bug icon to trigger the debugging mode of a Flutter app](/assets/images/docs/testing/debugging/vscode-ui/icons/debug.png))。
      这会打开 **Debug** 窗格并启动 app。
      等待 app 在设备上启动，且调试窗格显示 **Connected**。
      首次启动调试器耗时更长，之后启动会更快。

   This Flutter app contains two buttons:

   此 Flutter app 包含两个按钮：

   - **Launch in browser**: This button opens this page in the
     default browser of your device.


     **Launch in browser**：此按钮会在设备的默认浏览器中打开本页。

   - **Launch in app**: This button opens this page within your app.
     This button only works for iOS or Android. Desktop apps launch a browser.


     **Launch in app**：此按钮会在 app 内打开本页。仅适用于 iOS 或 Android。桌面 app 会启动浏览器。
