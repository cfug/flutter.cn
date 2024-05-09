### Update your path

### 更新 PATH 环境变量

You can update your PATH variable for the current session at
the command line, as shown in step 3 of [Get the Flutter SDK][].
To update this variable permanently so you can run
`flutter` commands in _any_ terminal session,
use the following instructions.

正如 [获取 Flutter SDK][Get the Flutter SDK]
一文中所展示你可以在当前命令行会话中更新你的 PATH 环境变量。
但你也许想让这个配置永久生效，
这样就可以在任意一个命令行会话中使用 `flutter` 命令了。

The steps for modifying the `PATH` variable
_all_ subsequent terminal sessions are machine-specific.
Typically, you add a line to a shell script file that
executes whenever you open a new window. For example:

以下配置环境变量让其永久生效的方法在不同的机器上有略微的差别。
基本上方法都是在某一个文件中增加一句命令，
让它在每次新的命令行窗口打开时都执行一遍。比如：

 1. Determine the path of your clone of the Flutter SDK.
    You need this in Step 3.

    首先决定你想要将 Flutter SDK 下载或者通过 `git clone` 命令到哪一个目录内，
    获取并记录这个目录的路径，你将要在第 3 步中用到它。

 2. Open (or create) the `rc` file for your shell.
    Typing `echo $SHELL` in your Terminal tells you
    which shell you're using.
    If you're using Bash,
    edit `$HOME/.bash_profile` or `$HOME/.bashrc`.
    If you're using Z shell, edit `$HOME/.zshrc`.
    If you're using a different shell, the file path
    and filename will be different on your machine.
 
    打开或者创建 shell 的 `rc` 文件，
    比如，在 Linux 和 macOS Mojave 或 Mojave 之前的系统里，是默认使用 Bash 的，
    所以需要修改 `$HOME/.bashrc` 文件。
    macOS Catalina 操作系统默认使用 Z Shell，
    所以需要修改 `$HOME/.zshrc` 文件。
    请知晓，如果你使用不同的 shell，文件目录或文件名可能会有所不同。

 3. Add the following line and change
    `[PATH_OF_FLUTTER_GIT_DIRECTORY]` to be
    the path of your clone of the Flutter git repo:

    在文件中增加下列这行命令，并将其中的 
    `[PATH_OF_FLUTTER_GIT_DIRECTORY]` 更改为你第一步获取到的路径：

    ```console
    $ export PATH="$PATH:[PATH_OF_FLUTTER_GIT_DIRECTORY]/bin"
    ```

 4. Run `source $HOME/.<rc file>`
    to refresh the current window,
    or open a new terminal window to
    automatically source the file.

    运行 `source $HOME/.bash_profile` 来刷新当前命令行窗口。

 5. Verify that the `flutter/bin` directory
    is now in your PATH by running:

    通过运行以下命令来验证 `flutter/bin` 文件夹是否已经添加到 PATH 环境变量中：

    ```console
    $ echo $PATH
    ```

    Verify that the `flutter` command is available by running:

    验证 `flutter` 命令是否可用，可以执行下面的命令检测：

    ```console
    $ which flutter
    ```

[Get the Flutter SDK]: #get-sdk
