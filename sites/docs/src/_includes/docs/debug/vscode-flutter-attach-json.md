##### Enable automatic attachment

##### 启用自动附加

You can configure VS Code to attach to your Flutter module project
whenever you start debugging.
To enable this feature,
create a `.vscode/launch.json` file in your Flutter module project.

你可以配置 VS Code，使其在你开始调试时自动附加到 Flutter 模块项目。
要启用此功能，请在 Flutter 模块项目中创建 `.vscode/launch.json` 文件。

1. Go to **View** <span aria-label="and then">></span> **Run**.

   前往 **View** <span aria-label="and then">></span> **Run**。

   You can also press
   <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd>.

   也可按 <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd>。

   VS Code displays the **Run and Debug** sidebar.

   VS Code 会显示 **Run and Debug** 侧边栏。

1. In this sidebar, click **create a launch.json file**.

   在此侧边栏中点击 **create a launch.json file**。

   VS Code displays the **Select debugger** menu at the top.

   VS Code 会在顶部显示 **Select debugger** 菜单。

1. Select **Dart & Flutter**.

   选择 **Dart & Flutter**。

   VS Code creates then opens the `.vscode/launch.json` file.

   VS Code 会创建并打开 `.vscode/launch.json` 文件。

   <details markdown="1">
   <summary>Expand to see an example launch.json file</summary>

   <summary>展开查看 launch.json 示例文件</summary>

    ```json
    {
        // Use IntelliSense to learn about possible attributes.
        // Hover to view descriptions of existing attributes.
        // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
        "version": "0.2.0",
        "configurations": [
            {
                "name": "my_app",
                "request": "launch",
                "type": "dart"
            },
            {
                "name": "my_app (profile mode)",
                "request": "launch",
                "type": "dart",
                "flutterMode": "profile"
            },
            {
                "name": "my_app (release mode)",
                "request": "launch",
                "type": "dart",
                "flutterMode": "release"
            }
        ]
    }
    ```

    </details>

1. To attach, go to **Run** <span aria-label="and then">></span>
   **Start Debugging**.

   要附加，请前往 **Run** <span aria-label="and then">></span> **Start Debugging**。

   You can also press <kbd>F5</kbd>.

   也可按 <kbd>F5</kbd>。
