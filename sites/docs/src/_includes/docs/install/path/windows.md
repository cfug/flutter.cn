
 1. <h3>Determine your Flutter SDK installation location</h3>

    <h3>确定 Flutter SDK 安装位置</h3>

    Copy the absolute path to the directory that you
    downloaded and extracted the Flutter SDK into.

    复制你下载并解压 Flutter SDK 所在目录的绝对路径。

 1. <h3>Navigate to the environment variables settings</h3>

    <h3>进入环境变量设置</h3>

    1. Press <kbd>Windows</kbd> + <kbd>Pause</kbd>.

       按下快捷键 <kbd>Windows</kbd> + <kbd>Pause</kbd>。

       If your keyboard lacks a <kbd>Pause</kbd> key,
       try <kbd>Windows</kbd> + <kbd>Fn</kbd> + <kbd>B</kbd>.

       如果你的键盘上没有 <kbd>Pause</kbd> 键，
       请尝试 <kbd>Windows</kbd> + <kbd>Fn</kbd> + <kbd>B</kbd>。

       The **System > About** dialog opens.

       这将会显示 **系统 > 系统信息** 的窗口。

    1. Click **Advanced System Settings**
       <span aria-label="and then">></span> **Advanced**
       <span aria-label="and then">></span> **Environment Variables...**.

       单击 **高级系统设置**
       <span aria-label="and then">></span> **高级**
       <span aria-label="and then">></span> **环境变量…**

       The **Environment Variables** dialog opens.

       这将会显示 **环境变量** 的窗口。

 1. <h3>Add the Flutter SDK bin to your path</h3>

    <h3>将 Flutter SDK 的 bin 添加到你的 PATH</h3>

    1. In the **User variables for (username)** section
       of the **Environment Variables** dialog,
       look for the **Path** entry.

       在 **环境变量** 对话框的 **（用户名）的用户变量** 区域中，
       查找 **Path** 条目。

    1. If the **Path** entry exists, double-click it.

       若 **Path** 条目已存在，请双击它。

       The **Edit Environment Variable** dialog should open.

       此时应会打开 **编辑环境变量** 对话框。

       1. Double-click inside an empty row.

          双击空白行。

       1. Type the path to the `bin` directory of your Flutter installation.

          输入 Flutter 安装目录下 `bin` 的路径。

          For example, if you downloaded Flutter into a
          `develop\flutter` folder inside your user directory,
          you'd type the following:

          例如，若你将 Flutter 下载到用户目录下的
          `develop\flutter` 文件夹，则应输入：

          ```plaintext
          %USERPROFILE%\develop\flutter\bin
          ```

       1. Click the Flutter entry you added to select it.

          点击你添加的 Flutter 条目以将其选中。

       1. Click **Move Up** until the Flutter entry sits at the top of the list.

          点击 **上移**，直到 Flutter 条目位于列表顶部。

       1. To confirm your changes, click **OK** three times.

          要确认更改，请点击三次 **确定**。

       {: type="a"}

    1. If the entry doesn't exist, click **New...**.

       若该条目不存在，请点击 **新建…**。

       The **Edit Environment Variable** dialog should open.

       此时应会打开 **编辑环境变量** 对话框。

       1. In the **Variable Name** box, type `Path`.

          在 **变量名** 框中输入 `Path`。

       1. In the **Variable Value** box,
          type the path to the `bin` directory of your Flutter installation.

          在 **变量值** 框中，
          输入 Flutter 安装目录下 `bin` 的路径。

          For example, if you downloaded Flutter into a
          `develop\flutter` folder inside your user directory,
          you'd type the following:

          例如，若你将 Flutter 下载到用户目录下的
          `develop\flutter` 文件夹，则应输入：

          ```plaintext
          %USERPROFILE%\develop\flutter\bin
          ```

       1. To confirm your changes, click **OK** three times.

          要确认更改，请点击三次 **确定**。

       {: type="a"}

 1. <h3>Apply your changes</h3>

    <h3>应用你的更改</h3>

    To apply this change and get access to the `flutter` tool,
    close and reopen all open command prompts,
    sessions in your terminal apps, and IDEs.

    要应用此更改并访问 `flutter` 工具，
    请关闭并重新打开所有已打开的命令提示符、
    终端应用中的会话以及 IDE。

 1. <h3>Validate your setup</h3>

    <h3>验证你的配置</h3>

    To ensure you successfully added the SDK to your `PATH`,
    open command prompt or your preferred terminal app,
    then try running the `flutter` and `dart` tools.

    为确保你已成功将 SDK 添加到 `PATH`，
    请打开命令提示符或你偏好的终端应用，
    然后尝试运行 `flutter` 和 `dart` 工具。

    ```console
    $ flutter --version
    $ dart --version
    ```

    If either command isn't found,
    check out [Flutter installation troubleshooting][troubleshoot].

    若任一命令未找到，
    请参阅 [Flutter 安装问题排查][troubleshoot]。

{: .steps}

[troubleshoot]: /install/troubleshoot
