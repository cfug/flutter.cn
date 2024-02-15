{% assign os=include.os %}
{% assign terminal=include.terminal %}
{%- if os=='macOS' -%}
{% assign special = 'Command' %}
{% else %}
{% assign special = 'Control' %}
{%- endif %}

### Use VS Code to install Flutter
{:.no_toc}

### 使用 VS Code 安装 Flutter
{:.no_toc}

To install Flutter using these instructions, verify that
you have installed [Visual Studio Code][]
{{site.appmin.vscode}} or later and the [Flutter extension for VS Code][].

在使用以下流程来安装 Flutter 前，
请确保你已经安装 [Visual Studio Code][] {{site.appmin.vscode}} 
或更高版本，以及 [Flutter extension for VS Code][]。

#### Prompt VS Code to install Flutter
{:.no_toc}

#### 根据 VS Code 的提示，安装 Flutter
{:.no_toc}

1. Launch VS Code.

   启动 VS Code。

1. To open the **Command Palette**,
   press <kbd>{{special}}</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>.

   打开 **命令面板 (Command Palette)**，
   按下快捷键 <kbd>{{special}}</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>。

1. In the **Command Palette**, type `flutter`.

   在 **命令面板 (Command Palette)** 中输入 `flutter`。

1. Select **Flutter: New Project**.

   选择 **Flutter: New Project**。

1. VS Code prompts you to locate the Flutter SDK on your computer.

   VS Code 会提示你在计算机上找到 Flutter SDK。

   {:type="a"}
   1. If you have the Flutter SDK installed, click **Locate SDK**.

      如果你已经安装 Flutter SDK，请单击 **Locate SDK**。

   1. If you do not have the Flutter SDK installed,
      click **Download SDK**.

      如果你没有安装 Flutter SDK, 请单击 **Download SDK**。

      This option sends you the Flutter install page if you have not
      installed Git {% if os == "Windows" %}for Windows {% endif %}as directed in
      the [development tools prerequisites][].

      如果你没有按照 [开发工具的必要条件][development tools prerequisites] 
      安装 Git {% if os == "Windows" %}for Windows {% endif %}，
      单击该按钮后会导航至 Flutter 安装页面。

1. When prompted **Which Flutter template?**, ignore it.
   Press <kbd>Esc</kbd>.
   You can create a test project after checking your development setup.

   当提示 **Which Flutter template?** 的时候，请忽略它。
   可以按下 <kbd>Esc</kbd>。
   你可以在检查完开发配置后创建初始测试项目。

#### Download the Flutter SDK
{:.no_toc}

#### 下载 Flutter SDK
{:.no_toc}

1. When the **Select Folder for Flutter SDK** dialog displays,
   choose where you want to install Flutter.

   当对话框 **Select Folder for Flutter SDK** 显示时，
   选择你想要安装 Flutter 的位置。

   VS Code places you in your user profile to start.
   Choose a different location.

   VS Code 会打开你默认的位置 (系统环境 %USERPROFILE% 的根目录)。
   你可以选择其他位置。

   {% if os == "Windows" -%}

   Consider `%USERPROFILE%` or `C:\dev`.

   请考虑 `%USERPROFILE%` 或 `C:\dev` 这样的位置。

   {% include docs/install/admonitions/install-paths.md %}
   {% else -%}

   Consider `~/development/`

   请考虑 `~/development/` 这样的位置

   {% endif %}

1. Click **Clone Flutter**.

   单击 **Clone Flutter**。

   While downloading Flutter, VS Code displays this pop-up notification:

   在下载 Flutter 时，VS Code 会弹出该通知：

   ```terminal
   Downloading the Flutter SDK. This may take a few minutes.
   ```

   This download takes a few minutes.
   If you suspect that the download has hung, click **Cancel** then
   start the installation again.

   下载需要一些时间。
   如果你怀疑下载被挂起，
   请单击 **Cancel** 取消下载后，
   再重新尝试安装。

1. Once it finishes downloading Flutter, the **Output** panel displays.

   Flutter 一旦完成下载，
   **输出 (Output)** 面板就会显示。

   ```terminal
   Checking Dart SDK version...
   Downloading Dart SDK from the Flutter engine ...
   Expanding downloaded archive...
   ```

   When successful, VS Code displays this pop-up notification:

   成功后，VS Code 会弹出该通知：

   ```terminal
   Initializing the Flutter SDK. This may take a few minutes.
   ```

   While initializing, the **Output** panel displays the following:

   初始化时，**输出 (Output)** 面板会显示下面的内容：

   ```terminal
   Building flutter tool...
   Running pub upgrade...
   Resolving dependencies...
   Got dependencies.
   Downloading Material fonts...
   Downloading Gradle Wrapper...
   Downloading package sky_engine...
   Downloading flutter_patched_sdk tools...
   Downloading flutter_patched_sdk_product tools...
   Downloading windows-x64 tools...
   Downloading windows-x64/font-subset tools...
   ```

   This process also runs `flutter doctor -v`.
   At this point in the procedure, _ignore this output._
   Flutter Doctor might show errors that don't apply to this quick start.

   该进程还会运行 `flutter doctor -v`。
   此时，*请忽略该输出*。
   因为 Flutter Doctor 可能会显示与本次快速启动无关的错误。

   When the Flutter install succeeds, VS Code displays this pop-up notification:

   Flutter 安装成功后，VS Code 会弹出该通知：

   ```terminal
   Do you want to add the Flutter SDK to PATH so it's accessible
   in external terminals?
   ```

{% if os=='Windows' %}

1. Click **Add SDK to PATH**.

   单击 **Add SDK to PATH**。

   When successful, a notification displays:

   成功后会显示通知：

   ```terminal
   The Flutter SDK was added to your PATH
   ```

{% endif %}

1. VS Code may display a Google Analytics notice.

   VS Code 可能会显示一则 Google Analytics 的通知。

   If you agree, click **OK**.

   如果你同意，请单击 **OK**。

1. To enable `flutter` in all {{terminal}} windows:

   在所有 {{terminal}} 窗口中启用 `flutter`：

   {:type="a"}
   1. Close, then reopen all {{terminal}} windows.

      关闭，然后重新打开所有 {{terminal}} 窗口。

   1. Restart VS Code.

      重新启动 VS Code。

[development tools prerequisites]: #development-tools
[Visual Studio Code]: https://code.visualstudio.com/docs/setup/mac
[Flutter extension for VS Code]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
