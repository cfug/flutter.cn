### Update your path

### 更新 PATH 环境变量


You can update your PATH variable for the current session only at the command
line, as shown in [Get the Flutter SDK](#get-sdk). You'll probably want to
update this variable permanently, so you can run `flutter` commands in any terminal session.

正如[获取 Flutter SDK ](#get-sdk)一文中所展示你可以仅仅在当前命令行会话中更新你的 PATH 环境变量。但你也许想让这个配置永久生效，这样就可以在任意一个命令行会话中使用 `flutter` 命令了。

The steps for modifying this variable permanently for all terminal sessions are machine-specific.
Typically you add a line to a file that is executed whenever you open
a new window. For example:

以下配置环境变量让其永久生效的方法在不同的机器上有略微的差别。基本上方法都是在某一个文件中增加一句命令，让它在每次新的命令行窗口打开时都执行一遍。比如：

 1. Determine the directory where you placed the Flutter SDK. You will
    need this in Step 3.

    首先决定你想要将 Flutter SDK 放置在哪一个目录内，获取并记录这个目录的路径，你将要在第 3 步中用到它。

 2. Open (or create) `$HOME/.bash_profile`. The file path and filename might be
    different on your machine.
 
    打开（或者创建）`$HOME/.bash_profile`，这里的路径和文件名在你的机器上可能会有所不同。

 3. Add the following line and change `[PATH_TO_FLUTTER_GIT_DIRECTORY]` to be
    the path where you cloned Flutter's git repo:

    在文件中增加下列这行命令，并将其中的 `[PATH_TO_FLUTTER_GIT_DIRECTORY]` 更改为你第一步获取到的路径：

    ```terminal
    $ export PATH="$PATH:[PATH_TO_FLUTTER_GIT_DIRECTORY]/flutter/bin"
    ```

 4. Run `source $HOME/.bash_profile` to refresh the current window.

    运行 `source $HOME/.bash_profile` 来刷新当前命令行窗口。
 
 5. Verify that the `flutter/bin` directory is now in your PATH by running:

    通过运行以下命令来验证 `flutter/bin` 文件夹是否已经添加到 PATH 环境变量中：

    ```terminal
    $ echo $PATH
    ```

For more details, see [this StackExchange question](https://unix.stackexchange.com/questions/26047/how-to-correctly-add-a-path-to-path).

想要查看更加详细的内容，请查看[ StackExchange 中的一个提问](https://unix.stackexchange.com/questions/26047/how-to-correctly-add-a-path-to-path)
