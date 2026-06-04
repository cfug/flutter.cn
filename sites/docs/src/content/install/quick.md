---
# title: Set up and test drive Flutter
title: 设置并试跑 Flutter
# shortTitle: Quick start
shortTitle: 快速开始
# description: >-
#   Set up Flutter on your device with a Code OSS-based editor, such as VS Code, and
#   get started developing your first multi-platform app with Flutter!
description: 在你的设备上使用基于 Code OSS 的编辑器（例如 VS Code）配置 Flutter，并开始开发你的第一个多平台应用！
showBanner: false
sitemap: false
ai-translated: true
---

{% render "docs/install/quick.md" site: site %}

## Test drive Flutter {: #test-drive}

## 试跑 Flutter

Now that you've set up VS Code and Flutter,
it's time to create an app and try out Flutter development!

现在你已经配置好了 VS Code 和 Flutter，
是时候创建一个应用并体验 Flutter 开发了！

 1. <h3>Create a new Flutter app</h3>
    <h3>创建新的 Flutter 应用</h3>

    1. Open the command palette in VS Code.

       在 VS Code 中打开命令面板。

       Go to **View** <span aria-label="and then">></span> **Command Palette**
       or press <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>.

       依次选择 **View** <span aria-label="and then">></span> **Command Palette**，
       或按 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. In the command palette, start typing `flutter:`.

       在命令面板中，开始输入 `flutter:`。

       VS Code should surface commands from the Flutter plugin.

       VS Code 应会显示来自 Flutter 插件的命令。

    1. Select the **Flutter: New Project** command.

       选择 **Flutter: New Project** 命令。

       Your OS or VS Code might ask for access to your documents,
       agree to continue to the next step.

       你的操作系统或 VS Code 可能会请求访问你的文档，
       请同意以继续下一步。

    1. Choose the **Application** template.

       选择 **Application** 模板。

       VS Code should prompt you with **Which Flutter template?**.
       Choose **Application** to bootstrap a simple counter app.

       VS Code 应会提示 **Which Flutter template?**。
       选择 **Application** 以引导创建一个简单的计数器应用。

    1. Create or select the parent directory for your new app's folder.

       创建或选择新应用文件夹的父目录。

       A file dialog should appear.

       应会出现文件对话框。

       1. Select or create the parent directory where
          you want the project to be created.
       1. 选择或创建你希望创建项目的父目录。
       1. To confirm your selection,
          click **Select a folder to create the project in**.
       1. 要确认你的选择，
          请点击 **Select a folder to create the project in**。

    1. Enter a name for your app.

       为你的应用输入名称。

       VS Code should prompt you to enter a name for your new app.
       Enter `trying_flutter` or a similar `lowercase_with_underscores` name.
       To confirm your selection, press <kbd>Enter</kbd>.

       VS Code 应会提示你输入新应用的名称。
       输入 `trying_flutter` 或类似的 `lowercase_with_underscores` 名称。
       要确认你的选择，请按 <kbd>Enter</kbd>。

    1. Wait for project initialization to complete.

       等待项目初始化完成。

       Task progress is often surfaced as a notification in the bottom right
       and can also be accessed from the **Output** panel.

       任务进度通常会在右下角以通知形式显示，
       也可从 **Output** 面板查看。

    1. Open the `lib` directory, then the `main.dart` file.

       打开 `lib` 目录，然后打开 `main.dart` 文件。

       If you're curious about what each portion of the code does,
       check out the preceding comments throughout the file.

       若你想了解代码各部分的作用，
       可查看文件中前面的注释。

 1. <h3>Run your app on the web</h3>
    <h3>在 Web 上运行你的应用</h3>

    While Flutter apps can run on many platforms,
    try running your new app on the web.

    Flutter 应用可在许多平台上运行，
    请尝试在 Web 上运行你的新应用。

    1. Open the command palette in VS Code.

       在 VS Code 中打开命令面板。

       Go to **View** <span aria-label="and then">></span> **Command Palette**
       or press <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>.

       依次选择 **View** <span aria-label="and then">></span> **Command Palette**，
       或按 <kbd class="special-key">Cmd/Ctrl</kbd> +
       <kbd>Shift</kbd> + <kbd>P</kbd>。

    1. In the command palette, start typing `flutter:`.

       在命令面板中，开始输入 `flutter:`。

       VS Code should surface commands from the Flutter plugin.

       VS Code 应会显示来自 Flutter 插件的命令。

    1. Select the **Flutter: Select Device** command.

       选择 **Flutter: Select Device** 命令。

    1. From the **Select Device** prompt, select **Chrome**.

       在 **Select Device** 提示中选择 **Chrome**。

    1. Run or start debugging your app.

       运行或开始调试你的应用。

       Go to **Run** <span aria-label="and then">></span>
       **Start Debugging** or press <kbd>F5</kbd>.

       依次选择 **Run** <span aria-label="and then">></span>
       **Start Debugging**，或按 <kbd>F5</kbd>。

       `flutter run` is used to build and start your app,
       then a new instance of Chrome should open and
       start running your newly created app.

       会使用 `flutter run` 构建并启动你的应用，
       随后应会打开新的 Chrome 实例并开始运行你刚创建的应用。

 1. <h3>Try hot reload</h3>
    <h3>尝试热重载</h3>

    Flutter offers a fast development cycle with **stateful hot reload**,
    the ability to reload the code of a live running app without
    restarting or losing app state.

    Flutter 提供带有 **带状态的热重载** 的快速开发周期，
    可在不重启应用、不丢失应用状态的情况下
    重新加载正在运行的应用的代码。

    You can change your app's source code,
    run the hot reload command in VS Code,
    then see the change in your running app.

    你可以修改应用的源代码，
    在 VS Code 中运行热重载命令，
    然后在正在运行的应用中看到变化。

    1. In the running app, try adding to the counter a few times by
       clicking the ![increment (+)][increment-button]{: .text-icon} button.

       在正在运行的应用中，尝试多次点击
       ![increment (+)][increment-button]{: .text-icon} 按钮以增加计数。

    1. With your app still running, make a change in the `lib/main.dart` file.

       在应用仍在运行时，修改 `lib/main.dart` 文件。

       Change the `_counter++` line in the `_incrementCounter` method
       to instead decrement the `_counter` field.

       将 `_incrementCounter` 方法中的 `_counter++` 行
       改为递减 `_counter` 字段。

       ```dart diff
         setState(() {
           // ...
       -   _counter++;
       +   _counter--;
         });
       ```

    1. Save your changes
       (**File** <span aria-label="and then">></span> **Save All**) or
       click the **Hot Reload** ![hot reload icon][]{: .text-icon} button.

       保存你的更改
       （**File** <span aria-label="and then">></span> **Save All**），或
       点击 **Hot Reload** ![hot reload icon][]{: .text-icon} 按钮。

       Flutter updates the running app without losing any existing state.
       Notice the existing value stayed the same.

       Flutter 会更新正在运行的应用且不会丢失任何现有状态。
       请注意现有数值保持不变。

    1. Try clicking the
       ![increment (+)][increment-button]{: .text-icon} button again.
       Notice the value decreases instead of increases.

       再次尝试点击
       ![increment (+)][increment-button]{: .text-icon} 按钮。
       请注意数值会减少而不是增加。

 1. <h3>Explore the Flutter sidebar</h3>
    <h3>探索 Flutter 侧边栏</h3>

    The Flutter plugin adds a dedicated sidebar to VS Code
    for managing Flutter debug sessions and devices,
    viewing an outline of your code and widgets,
    as well as accessing the Dart and Flutter DevTools.

    Flutter 插件会在 VS Code 中添加专用侧边栏，
    用于管理 Flutter 调试会话和设备、
    查看代码和 widget 大纲，
    以及访问 Dart 和 Flutter DevTools。

    1. If your app isn't running, start debugging it again.

       若你的应用未在运行，请再次开始调试。

       Go to **Run** <span aria-label="and then">></span>
       **Start Debugging** or press <kbd>F5</kbd>.

       依次选择 **Run** <span aria-label="and then">></span>
       **Start Debugging**，或按 <kbd>F5</kbd>。

    1. Open the Flutter sidebar in VS Code.

       在 VS Code 中打开 Flutter 侧边栏。

       Either open it with the Flutter ![Flutter logo][]{: .text-icon} button in
       the VS Code sidebar or open it from the command palette by
       running the **Flutter: Focus on Flutter Sidebar View** command.

       可通过 VS Code 侧边栏中的 Flutter ![Flutter logo][]{: .text-icon} 按钮打开，
       或在命令面板中运行 **Flutter: Focus on Flutter Sidebar View** 命令打开。

    1. In the Flutter sidebar, under **DevTools**,
       click the **Flutter Inspector** button.

       在 Flutter 侧边栏的 **DevTools** 下，
       点击 **Flutter Inspector** 按钮。

       A separate **Widget Inspector** panel should open in VS Code.

       VS Code 中应会打开单独的 **Widget Inspector** 面板。

       In the widget inspector, you can view your app's widget tree,
       view the properties and layout of each widget, and more.

       在 widget inspector 中，你可以查看应用的 widget 树、
       查看每个 widget 的属性和布局等。

    1. In the widget inspector, try clicking the top-level `MyHomePage` widget.

       在 widget inspector 中，尝试点击顶层的 `MyHomePage` widget。

       A view of its properties and layout should open, and
       the VS Code editor should navigate to and focus the line where
       the widget was included.

       应会打开其属性和布局视图，
       VS Code 编辑器应会导航并聚焦到包含该 widget 的行。

    1. Explore and try out other features in
       the widget inspector and Flutter sidebar.

       在 widget inspector 和 Flutter 侧边栏中探索并尝试其他功能。

{:.steps}

[increment-button]: /assets/images/docs/get-started/increment-button.png
[hot reload icon]: /assets/images/docs/get-started/hot-reload.svg
[Flutter logo]: /assets/images/branding/flutter/logo/square.svg

## Continue your Flutter journey {: #next-steps}

## 继续你的 Flutter 之旅

**Congratulations!**
Now that you've installed and tried out Flutter,
follow the [Flutter learning pathway][],
set up development for an [additional target platform][], or
explore some of these resources to continue your Flutter learning journey.

**恭喜！**
现在你已经安装并试跑了 Flutter，
请按照 [Flutter 学习路径][Flutter learning pathway] 继续学习，
为 [其他目标平台][additional target platform] 配置开发环境，
或探索以下资源以继续你的 Flutter 学习之旅。

{% render "docs/get-started/setup-next-steps.html", site: site %}

[Flutter learning pathway]: /learn/pathway
[additional target platform]: /platform-integration#setup
