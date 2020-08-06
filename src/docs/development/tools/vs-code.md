---
title: Visual Studio Code
title: 在 VS Code 里开发 Flutter 应用
short-title: VS Code
short-title: VS Code
description: How to develop Flutter apps in Visual Studio Code.
description: 如何在 VS Code 里开发 Flutter 应用。
---

<ul class="nav nav-tabs" id="ide" role="tablist">
  <li class="nav-item">
    <a class="nav-link" href="/docs/development/tools/android-studio" role="tab" aria-selected="false">Android Studio and IntelliJ</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" role="tab" aria-selected="true">Visual Studio Code</a>
  </li>
</ul>

## Installation and setup

## 安装和配置

Follow the [Set up an editor][] instructions to
install the Dart and Flutter extensions
(also called plugins).

根据 [编辑工具设定][Set up an editor]
的指引来安装 Dart 和 Flutter 扩展（也叫做插件）。

### Updating the extension {#updating}

### 更新扩展程序 {#updating}

Updates to the extensions are shipped on a regular basis.
By default, VS Code automatically updates extensions when
updates are available.

扩展的更新会定期发布。
默认情况下，当有可用的更新时 VS Code 会自动更新扩展。

To install updates manually:

手动安装更新：

 1. Click the Extensions button in the Side Bar.
 
    点击侧边栏的扩展按钮
    
 1. If the Flutter extension is shown with an available update,
    click the update button and then the reload button.
    
    如果 Flutter 扩展显示有可用更新，点击更新按钮，然后重载。

 1. Restart VS Code.

    重启 VS Code。

## Creating projects

## 创建项目

### Creating a new project

### 新建项目

To create a new Flutter project from the Flutter
starter app template:

通过 Flutter 入门应用模板新建 Flutter 项目：

 1. Open the Command Palette 
    (`Ctrl`+`Shift`+`P` (`Cmd`+`Shift`+`P` on macOS)).
    
    打开命令面板（`Ctrl`+`Shift`+`P` （macOS 用 `Cmd`+`Shift`+`P`））。
 
 1. Select the **Flutter: New Project** command and press `Enter`.
 
    选择 **Flutter: New Project** 命令然后按 `Enter`。
    
 1. Enter your desired **Project name**.
 
    输入你想要的**项目名**。
 
 1. Select a **Project location**.
    
    选择**项目地址**。
 

### Opening a project from existing source code

### 从现有源代码打开项目

To open an existing Flutter project:

打开现有 Flutter 项目：

 1. Click **File > Open** from the main IDE window.
 
    在 IDE 主窗口点击 **File > Open**。
 
 1. Browse to the directory holding your existing
    Flutter source code files.
 
    选择存放现有 Flutter 源代码文件的目录。
  
 1. Click **Open**.
 
    点击 **Open**。

## Editing code and viewing issues

## 编写代码及查看问题

The Flutter extension performs code analysis that
enables the following:

Flutter 扩展执行代码分析，它提供：

* Syntax highlighting

  语法高亮。
  
* Code completions based on rich type analysis

  基于丰富输入分析的代码补全。
  
* Navigating to type declarations
  (**Go to Definition** or `F12`),
  and finding type usages
  (**Find All References** or `Shift`+`F12`)
  
  导航到类型声明（**Go to Definition** 或 `F12`）
  和查找类型引用（**Find All References** 或 `Shift`+`F12`）。
  
* Viewing all current source code problems
  (**View > Problems** or `Ctrl`+`Shift`+`M`
  (`Cmd`+`Shift`+`M` on macOS))
  Any analysis issues are shown in the Problems pane:<br>
  ![Problems pane]({% asset tools/vs-code/problems.png @path %}){:.mw-100.pt-1}
  
  查看所有当前代码问题（**View > Problems** 或 `Ctrl`+`Shift`+`M` (macOS 用 `Cmd`+`Shift`+`M`)）。
  所有问题分析都会在 Problems 面板展示：<br>
  ![Problems pane]({% asset tools/vs-code/problems.png @path %}){:.mw-100.pt-1}

## Running and debugging

## 运行和调试

{{site.alert.note}}

  You can debug your app in a couple of ways.

  有多种方式能够调试你的应用

  * Using [DevTools][], a suite of debugging and profiling
    tools that run in a browser. DevTools replaces the previous
    browser-based profiling tool, Observatory, and includes
    functionality previously only available to Android Studio
    and IntelliJ, such as the Flutter inspector.

    使用 [DevTools][]，它是一个运行在浏览器中的
    调试以及性能测试工具集。DevTools 取代了前一代基于浏览器的性能测试工具 Observatory，
    它包含了以前仅适用于 Android Studio 和 IntelliJ 的功能，例如 Flutter inspector。

  * Using VS Code's built-in debugging features,
    such as setting breakpoints.

    使用 VS Code 的内置调试功能，例如设置断点。

  The instructions below describe features available in VS Code.
  For information on using launching DevTools, see
  [Running DevTools from VS Code][] in the [DevTools][] docs.

  以下说明描述了 VS Code 可用的功能。更多使用 DevTools 的详细信息请参考
  [DevTools][] 中的 [Running DevTools from VS Code][] 文档。
  
{{site.alert.end}}

Start debugging by clicking **Run > Start Debugging**
from the main IDE window, or press `F5`.

在 IDE 主窗口点击 **Run > Start Debugging** 或按 `F5` 开启调试。

### Selecting a target device

### 选择目标设备

When a Flutter project is open in VS Code,
you should see a set of Flutter specific entries in the status bar,
including a Flutter SDK version and a
device name (or the message **No Devices**):<br>

当一个 Flutter 项目在 VS Code 中打开，
你会在状态栏看到一些 Flutter 特有项，
包括 Flutter SDK 版本和设备名称（或者**无设备**信息）：<br>

![VS Code status bar][]{:.mw-100.pt-1}

{{site.alert.note}}
  * If you do not see a Flutter version number or device info,
    your project might not have been detected as a Flutter project.
    Ensure that the folder that contains your `pubspec.yaml` is
    inside a VS Code **Workspace Folder**.

    如果你没看到 Flutter 版本号或者设备信息，
    你的项目可能不被识别为一个 Flutter 项目。
    请确认 VS Code **Workspace Folder** 的目录中是否含有 `pubspec.yaml`。

  * If the status bar reads **No Devices**, Flutter has not been
    able to discover any connected iOS or Android devices or simulators.
    You need to connect a device, or start a simulator or emulator,
    to proceed.
    
    如果状态栏显示**无设备**表明 Flutter 
    没有发现任何已连接的 IOS、Android 或者模拟器。
    你需要连接设备或者启动模拟器。

{{site.alert.end}}

The Flutter extension automatically selects the last device connected.
However, if you have multiple devices/simulators connected, click
**device** in the status bar to see a pick-list
at the top of the screen. Select the device you want to use for
running or debugging.

Flutter 扩展会自动选择上次连接的设备。
然而，如果你有多个设备/模拟器连接，
点击状态栏的 **device** 查看屏幕顶部的选择列表。
选择你要用来运行或调试的设备。

{{site.alert.note}}

  If you want to try running your app on the web,
  but the **Chrome (web)** target doesn't appear in the
  list of targets, make sure you've enabled web, as
  described in [Building a web application][].

  如果你尝试运行 web 应用，但是 **Chrome (web)** 并不在目标列表中，
  请检查是否启用了 web，在 [Building a web application][] 中进行了介绍。

{{site.alert.end}}

### Run app without breakpoints

### 无断点运行

 1. Click **Run > Start Without Debugging** in the
    main IDE window, or press `Ctrl`+`F5`.
    The status bar turns orange to show you are in a debug session.<br>
    ![Debug console]({% asset tools/vs-code/debug_console.png @path %}){:.mw-100.pt-1}

    在 IDE 主窗口点击 **Run > Start Without Debugging**，
    或者按 `Ctrl`+`F5`，状态栏变橙色说明你正处于调试模式。<br>
    ![Debug console]({% asset tools/vs-code/debug_console.png @path %}){:.mw-100.pt-1}
    
### Run app with breakpoints

### 断点运行

 1. If desired, set breakpoints in your source code.
    
    如果需要，在源代码中设置断点。
   
 1. Click **Run > Start Debugging** in the main IDE window,
    or press `F5`.
    
    在 IDE 主窗口点击 **Run > Start Debugging** 或按 `F5`。
 
    * The left **Debug Sidebar** shows stack frames and variables.
      
      左侧的**调试侧边栏**显示堆栈帧和变量。
      
    * The bottom **Debug Console** pane shows detailed logging output.
    
      底部的**调试控制台**面板显示输出的日志详情。
    
    * Debugging is based on a default launch configuration.
      To customize, click the cog at the top of the
      **Debug Sidebar** to create a `launch.json` file.
      You can then modify the values.
      
      调试基于默认的配置。
      也可以通过点击**调试侧边栏**顶部的齿轮创建 `launch.json` 文件自定义调试。
      你可以修改里面的值。

## Fast edit and refresh development cycle

## 快速编辑和刷新开发周期

Flutter offers a best-in-class developer cycle enabling you
to see the effect of your changes almost instantly with the
_Stateful Hot Reload_ feature. See
[Using hot reload](hot-reload) for details.

Flutter 提供一流的开发周期，通过 **Stateful Hot Reload** 
特性使你在几乎修改代码的同时就能看到变化。
详情请看 [使用热重载](hot-reload)。

## Advanced debugging

## 进阶调试

### Debugging visual layout issues

### 可视化布局问题调试

During a debug session,
several additional debugging commands are added to the
[Command Palette][] and to the [Flutter inspector][].
When space is limited, the icon is used as the visual
version of the label.

在调试会话期间，[命令面板][Command Palette] 和 [Flutter inspector][]
会添加一些额外的调试命令，包括：

<dl markdown="1">
<dt markdown="1"><t><b>Toggle Baseline Painting</b></t><t><b>切换 Baseline 绘制</b></t> ![Baseline painting icon]({% asset tools/devtools/paint-baselines-icon.png @path %}){:width="20px"}</dt>
<dd><p>Causes each RenderBox to paint a line at each of its baselines.</p><p>每个 RenderBox 在底部绘制一条线。</p></dd>
<dt markdown="1"><t><b>Toggle Repaint Rainbow</b></t><t><b>切换重绘 Rainbow</b></t> ![Repaint rainbow icon]({% asset tools/devtools/repaint-rainbow-icon.png @path %}){:width="20px"}</dt>
<dd><p>Shows rotating colors on layers when repainting.</p><p>重新绘制时在图层上改变颜色。</p></dd>
<dt markdown="1"><t><b>Toggle Slow Animations</b></t><t><b>切换慢模式横幅</b></t> ![Slow animations icon]({% asset tools/devtools/slow-animations-icon.png @path %}){:width="20px"}</dt>
<dd><t>Slows down animations to enable visual inspection.</t><t>减慢动画以启用视觉检查。</t>
</dd>
<dt markdown="1"><t><b>Toggle Debug Mode Banner</b></t> <t><b>切换 debug 模式横幅显示</b></t> ![Debug mode banner icon]({% asset tools/devtools/debug-mode-banner-icon.png @path %}){:width="20px"}</dt>
<dd><p>Hides the debug mode banner even when running a debug build.</p><p>在运行调试构建时隐藏 debug 模式的横幅 (banner)。</p></dd>
</dl>

### Debugging external libraries

### 调试外部库

By default, debugging an external library is disabled
in the Flutter extension. To enable:

默认情况下，Flutter 扩展禁止调试外部库。启用步骤：

1. Select **Settings > Extensions > Dart Configuration**.
   
   选择 **Settings > Extensions > Dart Configuration**

2. Check the `Debug External Libraries` option.

   勾选 `Debug External Libraries` 选项。

## Editing tips for Flutter code

## Flutter 代码编辑提示

If you have additional tips we should share, [let us know][]!

如果你有其他我们应该提供的代码提示建议，请 [告诉我们][]!

### Assists & quick fixes

### 代码辅助和快速修复

Assists are code changes related to a certain code identifier.
A number of these are available when the cursor is placed on a
Flutter widget identifier, as indicated by the yellow lightbulb icon.
The assist can be invoked by clicking the lightbulb, or by using the
keyboard shortcut `Ctrl`+`.` (`Cmd`+`.` on Mac), as illustrated here:

代码辅助功能是特定代码标识符相关的代码修改。
当光标放在 Flutter widget 上时，黄色灯泡图标会指示可用的修改，
可以通过点击灯泡进行修改，
或者使用快捷键 `Ctrl`+`.` (macOS 用 `Cmd`+`.`)，
如图所示：

![Code assists]({% asset tools/vs-code/assists.png @path %}){:width="467px"}

Quick fixes are similar,
only they are shown with a piece of code has an error and they
can assist in correcting it.

快速修复跟辅助类似，当一段代码有错误并且可以辅助修正时才会显示。

**Wrap with new widget assist**

**Widget 嵌套辅助**

  This can be used when you have a widget that you want to wrap
  in a surrounding widget, for example if you want to wrap a
  widget in a `Row` or `Column`.
  
  当你有个 widget 想包装进一个容器 widget 时，
  例如你想把 widget 放入一个 `Row` 或者 `Column`。
  
**Wrap widget list with new widget assist**

**Widget 列表嵌套辅助**

  Similar to the assist above, but for wrapping an existing
  list of widgets rather than an individual widget.
  
  和上面的辅助类似，但它嵌套的是一个 widget 的列表，
  而不是单个的 widget。

**Convert child to children assist**

**child 和 children 转换辅助**

  Changes a child argument to a children argument,
  and wraps the argument value in a list.
  
  将 child 转换成 children，并且把参数值写进一个 list。

**Convert StatelessWidget to StatefulWidget assist**
<br> Changes the implementation of a `StatelessWidget` to that of a `StatefulWidget`,
  by creating the `State` class and moving the code there.
  
**StatelessWidget 到 StatefulWidget 的转换**
<br> 创建 `State` 类并将代码移动过去，
可以将 `StatelessWidget` 的实现更改为 `StatefulWidget`。

### Snippets

### 代码片段

Snippets can be used to speed up entering typical code structures.
They are invoked by typing their prefix,
and then selecting from the code completion window:

代码片段可以用来加速输入通用类型代码段。
通过输入前缀来调用，然后从代码完成窗口中选择：

![Snippets]({% asset tools/vs-code/snippets.png @path %}){:width="700px"}

The Flutter extension includes the following snippets:

Flutter 扩展包含以下片段：

* Prefix `stless`: Create a new subclass of `StatelessWidget`.

  前缀 `stless`：创建一个 `StatelessWidget` 子类。
  
* Prefix `stful`: Create a new subclass of `StatefulWidget`
  and its associated State subclass.
  
  前缀 `stful`：创建一个 `StatefulWidget` 子类，并且和 State 子类关联。
  
* Prefix `stanim`: Create a new subclass of `StatefulWidget`,
  and its associated State subclass including a field initialized
  with an `AnimationController`.
  
  前缀 `stanim`：创建一个 `StatefulWidget` 子类，并且把包含字段初始化的 State 子类和一个 `AnimationController` 关联。

You can also define custom snippets by executing
**Configure User Snippets** from the [Command Palette][].

你也可以通过在 [命令面板][] 执行**Configure User Snippets**来自定义片段。

### Keyboard shortcuts

### 键盘快捷键

**Hot reload**
<br> During a debug session, clicking the **Hot Reload** button on the
  **Debug Toolbar**, or pressing `Ctrl`+`F5`
  (`Cmd`+`F5` on macOS) performs a hot reload.

**热重载**
<br> During a debug session, clicking the **Hot Reload** button on the
  **Debug Toolbar**, or pressing `Ctrl`+`F5`
  (`Cmd`+`F5` on macOS) performs a hot reload.
  
  调试期间，在**调试工具栏**点击**热重载 (Hot Reload)**按钮，
  或者按 `Ctrl`+`F5` (macOS 用 `Cmd`+`F5`)执行热重载。
  
  Keyboard mappings can be changed by executing the **Open Keyboard Shortcuts**
  command from the [Command Palette][].
  
  键盘映射可以在 [命令面板][] 执行**Open Keyboard Shortcuts**修改。


### Hot reload vs. hot restart

### 热重载和热重启

Hot reload works by injecting updated source code files into the
running Dart VM (Virtual Machine). This includes not only
adding new classes, but also adding methods and fields to
existing classes, and changing existing functions.
A few types of code changes cannot be hot reloaded though:

热重载的工作原理是将更新后的代码注入 Dart VM（虚拟机）。
不仅包括添加新类，还包括添加方法和字段到已有的类中。
但有些类型的代码是无法被热重载的：

* Global variable initializers

  全部变量的初始化

* Static field initializers

  静态变量的初始化

* The `main()` method of the app

  应用的 `main()` 方法

For these changes, fully restart your application without
having to end your debugging session. To perform a hot restart,
run the **Flutter: Hot Restart** command from the
[Command Palette][], or press `Ctrl`+`Shift`+`F5`(`Cmd`+`Shift`+`F5` on macOS).

对于这些更改，你无需结束调试过程而直接热重启 (hot restart) 你的应用。
要执行热重启，执行 [命令面板][Command Palette] 的 **Flutter：热重启**命令，
或者按 ``Ctrl`+`Shift`+`F5 (在 macOS 上使用 `Cmd`+`Shift`+`F5`)。

## Troubleshooting

## 故障排除

### Known issues and feedback

### 已知问题和反馈

All known bugs are tracked in the issue tracker:
[Dart and Flutter extensions GitHub issue tracker][issue tracker].

所有已知 bug 在这个 issue 列表中记录：
[Dart 和 Flutter 扩展 GitHub issue 追踪][]。

We welcome feedback,
both on bugs/issues and feature requests.
Prior to filing new issues:

我们非常欢迎 bugs/issues 和特性请求的反馈。在提交新 issue 之前：

* Do a quick search in the issue trackers to see if the
  issue is already tracked.
  
  在 issue 列表中查找看该问题是否已被记录。
  
* Make sure you are [up to date](#updating) with the most recent
  version of the plugin.
  
  确保你已经 [更新](#updating) 最新版本插件。
  
When filing new issues, include [flutter doctor][] output.

提交新 issue 时，请包含 [flutter doctor][] 输出。
 
[Building a web application]: /docs/get-started/web
[Command Palette]: https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette
[命令面板]: https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette
[DevTools' docs]: https://flutter.github.io/devtools
[DevTools' 文档]: https://flutter.github.io/devtools
[flutter doctor]: /docs/resources/bug-reports/#provide-some-flutter-diagnostics
[let us know]: {{site.github}}/flutter/website/issues/new
[联系我们]: {{site.github}}/flutter/website/issues/new
[Dart and Flutter extensions GitHub issue tracker]: {{site.github}}/Dart-Code/Dart-Code/issues
[Dart 和 Flutter 扩展 GitHub issue 追踪]: {{site.github}}/Dart-Code/Dart-Code/issues
[DevTools]: /docs/development/tools/devtools
[flutter doctor]: /docs/resources/bug-reports/#provide-some-flutter-diagnostics
[Flutter inspector]: /docs/development/tools/devtools/inspector
[let us know]: {{site.github}}/flutter/website/issues/new
[issue tracker]: {{site.github}}/Dart-Code/Dart-Code/issues
[Running DevTools from VS Code]: /docs/development/tools/devtools/vscode
[Set up an editor]: /docs/get-started/editor?tab=vscode
[VS Code status bar]: {% asset tools/vs-code/device_status_bar.png @path %}
