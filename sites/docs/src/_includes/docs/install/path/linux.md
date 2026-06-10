 1. <h3>Determine your Flutter SDK installation location</h3>

    <h3>确定 Flutter SDK 安装位置</h3>

    Copy the absolute path to the directory that you
    downloaded and extracted the Flutter SDK into.

    复制你下载并解压 Flutter SDK 所在目录的绝对路径。

 1. <h3>Determine your default shell</h3>

    <h3>确定你的默认 shell</h3>

    If you don't know what shell you use,
    check which shell starts when you open a new console window.

    若你不确定自己使用哪种 shell，
    可查看打开新控制台窗口时启动的是哪一种。

    ```console
    $ echo $SHELL
    ```

 1. <h3>Add the Flutter SDK bin to your path</h3>

    <h3>将 Flutter SDK 的 bin 添加到你的 PATH</h3>

    To add the `bin` directory of your Flutter installation to your `PATH`:

    要将 Flutter 安装目录下的 `bin` 添加到 `PATH`：

    1. Expand the instructions for your default shell.

       展开与你默认 shell 对应的说明。

    1. Copy the provided command.

       复制提供的命令。

    1. Replace `<path-to-sdk>` with the path to your Flutter SDK install.

       将 `<path-to-sdk>` 替换为你的 Flutter SDK 安装路径。

    1. Run the edited command in your preferred terminal with that shell.

       在使用该 shell 的你偏好的终端中运行编辑后的命令。

    <hr>

    <details>
    <summary>展开 <code>bash</code> 相关说明</summary>

    ```console
    $ echo 'export PATH="<path-to-sdk>/bin:$PATH"' >> ~/.bashrc
    ```

    For example, if you downloaded Flutter into a
    `develop/flutter` folder inside your user directory,
    you'd run the following:

    例如，若你将 Flutter 下载到用户目录下的
    `develop/flutter` 文件夹，可运行：

    ```console
    $ echo 'export PATH="$HOME/develop/flutter/bin:$PATH"' >> ~/.bashrc
    ```

    </details>

    <details>
    <summary>展开 <code>zsh</code> 相关说明</summary>

    ```console
    $ echo 'export PATH="<path-to-sdk>/bin:$PATH"' >> ~/.zshenv
    ```

    For example, if you downloaded Flutter into a
    `develop/flutter` folder inside your user directory,
    you'd run the following:

    例如，若你将 Flutter 下载到用户目录下的
    `develop/flutter` 文件夹，可运行：

    ```console
    $ echo 'export PATH="$HOME/develop/flutter/bin:$PATH"' >> ~/.zshenv
    ```

    </details>

    <details>
    <summary>展开 <code>fish</code> 相关说明</summary>

    ```console
    $ fish_add_path -g -p <path-to-sdk>/bin
    ```

    For example, if you downloaded Flutter into a
    `develop/flutter` folder inside your user directory,
    you'd run the following:

    例如，若你将 Flutter 下载到用户目录下的
    `develop/flutter` 文件夹，可运行：

    ```console
    $ fish_add_path -g -p ~/develop/flutter/bin
    ```

    </details>

    <details>
    <summary>展开 <code>csh</code> 相关说明</summary>

    ```console
    $ echo 'setenv PATH "<path-to-sdk>/bin:$PATH"' >> ~/.cshrc
    ```

    For example, if you downloaded Flutter into a
    `develop/flutter` folder inside your user directory,
    you'd run the following:

    例如，若你将 Flutter 下载到用户目录下的
    `develop/flutter` 文件夹，可运行：

    ```console
    $ echo 'setenv PATH "$HOME/develop/flutter/bin:$PATH"' >> ~/.cshrc
    ```

    </details>

    <details>
    <summary>展开 <code>tcsh</code> 相关说明</summary>

    ```console
    $ echo 'setenv PATH "<path-to-sdk>/bin:$PATH"' >> ~/.tcshrc
    ```

    For example, if you downloaded Flutter into a
    `develop/flutter` folder inside your user directory,
    you'd run the following:

    例如，若你将 Flutter 下载到用户目录下的
    `develop/flutter` 文件夹，可运行：

    ```console
    $ echo 'setenv PATH "$HOME/develop/flutter/bin:$PATH"' >> ~/.tcshrc
    ```

    </details>

    <details>
    <summary>展开 <code>ksh</code> 相关说明</summary>

    ```console
    $ echo 'export PATH="<path-to-sdk>/bin:$PATH"' >> ~/.profile
    ```

    For example, if you downloaded Flutter into a
    `develop/flutter` folder inside your user directory,
    you'd run the following:

    例如，若你将 Flutter 下载到用户目录下的
    `develop/flutter` 文件夹，可运行：

    ```console
    $ echo 'export PATH="$HOME/develop/flutter/bin:$PATH"' >> ~/.profile
    ```

    </details>

    <details>
    <summary>展开 <code>sh</code> 相关说明</summary>

    ```console
    $ echo 'export PATH="<path-to-sdk>/bin:$PATH"' >> ~/.profile
    ```

    For example, if you downloaded Flutter into a
    `develop/flutter` folder inside your user directory,
    you'd run the following:

    例如，若你将 Flutter 下载到用户目录下的
    `develop/flutter` 文件夹，可运行：

    ```console
    $ echo 'export PATH="$HOME/develop/flutter/bin:$PATH"' >> ~/.profile
    ```

    </details>

 1. <h3>Apply your changes</h3>

    <h3>应用你的更改</h3>

    To apply this change and get access to the `flutter` tool,
    close and reopen all open shell sessions in your terminal apps and IDEs.

    要应用此更改并访问 `flutter` 工具，
    请在终端应用和 IDE 中关闭并重新打开所有已打开的 shell 会话。

 1. <h3>Validate your setup</h3>

    <h3>验证你的配置</h3>

    To ensure you successfully added the SDK to your `PATH`,
    open your preferred terminal with your default shell,
    then try running the `flutter` and `dart` tools.

    为确保你已成功将 SDK 添加到 `PATH`，
    请使用默认 shell 打开你偏好的终端，
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
