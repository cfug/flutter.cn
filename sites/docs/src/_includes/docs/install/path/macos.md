:::note
The following steps assume you're
using the [default shell][zsh-mac] on macOS, Zsh.

以下步骤假定你在 macOS 上使用
[默认 shell][zsh-mac] Zsh。

If you use another shell besides Zsh,
check out [this tutorial on setting your PATH][other-path].

若你使用的不是 Zsh，
请参阅 [这篇设置 PATH 的教程][other-path]。
:::

 1. <h3>Determine your Flutter SDK installation location</h3>

    <h3>确定 Flutter SDK 安装位置</h3>

    Copy the absolute path to the directory that you
    downloaded and extracted the Flutter SDK into.

    复制你下载并解压 Flutter SDK 所在目录的绝对路径。

 1. <h3>Open or create the Zsh environment variable file</h3>

    <h3>打开或创建 Zsh 环境变量文件</h3>

    If it exists, open the [Zsh environment variable file][zsh-files]
    `~/.zprofile` in your preferred text editor.
    If it doesn't exist, create the `~/.zprofile` file.

    若存在，请在你偏好的文本编辑器中打开
    [Zsh 环境变量文件][zsh-files] `~/.zprofile`。
    若不存在，请创建 `~/.zprofile` 文件。

 1. <h3>Add the Flutter SDK bin to your path</h3>

    <h3>将 Flutter SDK 的 bin 添加到你的 PATH</h3>

    At the end of your `~/.zprofile` file,
    use the built-in `export` command to update the `PATH` variable
    to include the `bin` directory of your Flutter installation.

    在 `~/.zprofile` 文件末尾，
    使用内置 `export` 命令更新 `PATH` 变量，
    使其包含 Flutter 安装目录下的 `bin`。

    Replace `<path-to-sdk>` with the path to your Flutter SDK installation.

    将 `<path-to-sdk>` 替换为你的 Flutter SDK 安装路径。

    ```bash
    export PATH="<path-to-sdk>/bin:$PATH"
    ```

    For example, if you downloaded Flutter into a
    `develop/flutter` folder inside your user directory,
    you'd add the following to the file:

    例如，若你将 Flutter 下载到用户目录下的
    `develop/flutter` 文件夹，可向文件添加：

    ```bash
    export PATH="$HOME/develop/flutter/bin:$PATH"
    ```

 1. <h3>Save your changes</h3>

    <h3>保存你的更改</h3>

    Save, then close, the `~/.zprofile` file you edited.

    保存并关闭你编辑的 `~/.zprofile` 文件。

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

[zsh-mac]: https://support.apple.com/en-us/102360
[zsh-files]: https://zsh.sourceforge.io/Intro/intro_3.html
[other-path]: https://www.cyberciti.biz/faq/unix-linux-adding-path/
[troubleshoot]: /install/troubleshoot
