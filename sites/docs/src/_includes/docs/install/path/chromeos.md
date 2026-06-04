:::note
The following steps assume
you've already [turned on Linux support][chromeos-linux] and that
you're using Bash or the default shell on ChromeOS.

以下步骤假定
你已 [开启 Linux 支持][chromeos-linux]，并且
你使用的是 ChromeOS 上的 Bash 或默认 shell。

If you're using a different shell besides the default or Bash, follow the
[add to path instructions for Linux][linux-path]{: target="_blank"} instead.

若你使用的不是默认 shell 或 Bash，请改为按照
[Linux 的添加到 PATH 说明][linux-path]{: target="_blank"} 操作。
:::

 1. <h3>Determine your Flutter SDK installation location</h3>
    <h3>确定 Flutter SDK 安装位置</h3>

    Copy the absolute path to the directory that you
    downloaded and extracted the Flutter SDK into.

    复制你下载并解压 Flutter SDK 所在目录的绝对路径。

 1. <h3>Add the Flutter SDK bin to your path</h3>
    <h3>将 Flutter SDK 的 bin 添加到你的 PATH</h3>

    To add the `bin` directory of your Flutter installation to your `PATH`:

    要将 Flutter 安装目录下的 `bin` 添加到 `PATH`：

    1. Copy the following command.
    1. 复制以下命令。
    1. Replace `<path-to-sdk>` with the path to your Flutter SDK install.
    1. 将 `<path-to-sdk>` 替换为你的 Flutter SDK 安装路径。
    1. Run the edited command in your preferred terminal.
    1. 在你偏好的终端中运行编辑后的命令。

    ```console
    $ echo 'export PATH="<path-to-sdk>:$PATH"' >> ~/.bash_profile
    ```

    For example, if you downloaded Flutter into a
    `develop/flutter` folder inside your user directory,
    you'd run the following:

    例如，若你将 Flutter 下载到用户目录下的
    `develop/flutter` 文件夹，可运行：

    ```console
    $ echo 'export PATH="$HOME/develop/flutter/bin:$PATH"' >> ~/.bash_profile
    ```

 1. <h3>Apply your changes</h3>
    <h3>应用你的更改</h3>

    To apply this change and get access to the `flutter` tool,
    close and reopen all open Zsh sessions in your terminal apps and IDEs.

    要应用此更改并访问 `flutter` 工具，
    请在终端应用和 IDE 中关闭并重新打开所有已打开的 Zsh 会话。

 1. <h3>Validate your setup</h3>
    <h3>验证你的配置</h3>

    To ensure you successfully added the SDK to your `PATH`,
    open a Zsh session in your preferred terminal,
    then try running the `flutter` and `dart` tools.

    为确保你已成功将 SDK 添加到 `PATH`，
    请在你偏好的终端中打开 Zsh 会话，
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

[chromeos-linux]: https://support.google.com/chromebook/answer/9145439
[linux-path]: /install/add-to-path#linux
[troubleshoot]: /install/troubleshoot
