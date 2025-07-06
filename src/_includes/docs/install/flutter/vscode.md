{%- if include.os=='macOS' -%}
{% assign special = 'Command' %}
{% else %}
{% assign special = 'Control' %}
{%- endif %}

### Use VS Code to install Flutter {:.no_toc}

### 使用 VS Code 安装 Flutter {:.no_toc}

To install Flutter using these instructions,
verify that you've installed
[Visual Studio Code][] and the [Flutter extension for VS Code][].

在使用以下流程来安装 Flutter 前，
请确保你已经安装 
[Visual Studio Code][] 以及 [Flutter extension for VS Code][]。

#### Prompt VS Code to install Flutter

#### 根据 VS Code 的提示，安装 Flutter

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

   1. If you don't have the Flutter SDK installed,
      click **Download SDK**.

      如果你没有安装 Flutter SDK, 请单击 **Download SDK**。

      This option sends you the Flutter install page if you haven't
      installed Git {% if include.os == "Windows" %}for Windows {% endif %}as
      directed in the [development tools prerequisites][].

      如果你没有按照 [开发工具的必要条件][development tools prerequisites] 
      安装 Git {% if include.os == "Windows" %}for Windows {% endif %}，
      单击该按钮后会导航至 Flutter 安装页面。

1. When prompted **Which Flutter template?**, ignore it.
   Press <kbd>Esc</kbd>.
   You can create a test project after checking your development setup.

   当提示 **Which Flutter template?** 的时候，请忽略它。
   可以按下 <kbd>Esc</kbd>。
   你可以在检查完开发配置后创建初始测试项目。

#### Download the Flutter SDK

#### 下载 Flutter SDK

1. When the **Select Folder for Flutter SDK** dialog displays,
   choose where you want to install Flutter.

   当对话框 **Select Folder for Flutter SDK** 显示时，
   选择你想要安装 Flutter 的位置。

   VS Code places you in your user profile to start.
   Choose a different location.

   VS Code 会打开你默认的位置。
   你可以选择其他位置。

   {% if include.os == "Windows" -%}

   Consider `%USERPROFILE%` or `C:\dev`.

   请考虑 `%USERPROFILE%` 或 `C:\dev` 这样的位置。

   :::warning

   Don't install Flutter to a directory or path that meets
   one or both of the following conditions:

   不要将 Flutter 安装到以下情况的目录或路径中：

   * The path contains special characters or spaces.
   
     路径包含特殊字符或空格。

   * The path requires elevated privileges.

     路径需要较高的权限。

   As an example, `C:\Program Files` meets both conditions.

   例如，`C:\Program Files` 路径就是以上情况。

   :::

   {% else -%}

   Consider `~/development/`

   请考虑 `~/development/` 这样的位置

   {% endif %}

1. Click **Clone Flutter**.

   单击 **Clone Flutter**。

   While downloading Flutter, VS Code displays these pop-up notifications:

   在下载 Flutter 时，VS Code 会弹出这些通知：

   ```console
   Downloading the Flutter SDK. This may take a few minutes.
   ```

   ```console
   Initializing the Flutter SDK. This may take a few minutes.
   ```

   The download and installation take a few minutes.
   If you suspect that the download has hung, click **Cancel**,
   then start the installation again.

   下载和安装需要一些时间。
   如果你怀疑下载被挂起，
   请单击 **Cancel** 取消下载后，
   再重新尝试安装。

   When the Flutter installation succeeds,
   VS Code displays this pop-up notification:

   Flutter 安装成功后，VS Code 会弹出该通知：

   ```console
   Do you want to add the Flutter SDK to PATH so it's accessible
   in external terminals?
   ```

1. Click **Add SDK to PATH**.

   单击 **Add SDK to PATH**。

   When successful, a notification displays:

   成功后会显示通知：

   ```console
   The Flutter SDK was added to your PATH
   ```

1. VS Code might display a Google Analytics notice.

   VS Code 可能会显示一则 Google Analytics 的通知。

   If you agree, click **OK**.

   如果你同意，请单击 **OK**。

1. To enable `flutter` in all {{include.terminal}} windows:

   在所有 {{include.terminal}} 窗口中启用 `flutter`：

   1. Close, then reopen all {{include.terminal}} windows.

      关闭，然后重新打开所有 {{include.terminal}} 窗口。

   1. Restart VS Code.

      重新启动 VS Code。

   {:type="a"}

[development tools prerequisites]: #development-tools
[Visual Studio Code]: https://code.visualstudio.com/docs/setup/mac
[Flutter extension for VS Code]: https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
