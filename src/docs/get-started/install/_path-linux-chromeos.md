### Update your path

### 更新你的环境变量

You can update your PATH variable for the current session at
the command line, as shown in [Get the Flutter SDK][].
You'll probably want to update this variable permanently,
so you can run `flutter` commands in any terminal session.

与 [获取 Flutter SDk][Get the Flutter SDK] 中说的一样，你可以通过命令行更新当前窗口的环境变量。但你也许会想要让它一直生效，在任何终端中都可以运行 `flutter` 命令。

The steps for modifying this variable permanently for
all terminal sessions are machine-specific.
Typically you add a line to a file that is executed
whenever you open a new window. For example:

下面是更改环境变量的详细步骤，这将会对所有终端生效，且仅在该机器上生效。
通常，每当你打开一个新的窗口，都会将一行添加到执行的文件。例如：

 1. Determine the directory where you placed the Flutter SDK.
    You need this in Step 3.

    检测你存放 Flutter SDK 的文件夹，你需要在第三步用到它。

 2. Open (or create) the `rc` file for your shell.
    For example, Linux uses the Bash shell by default,
    so edit `$HOME/.bashrc`.
    If you are using a different shell, the file path
    and filename will be different on your machine.

    在你的 shell 中打开（或者创建）`rc` 文件。
    例如，Linux 默认使用 Bash shell，所以编辑 `$HOME/.bashrc` 文件。
    如果你使用不同的 shell，那么在你电脑上的文件路径以及文件名必须不同。

 3. Add the following line and change
    `[PATH_TO_FLUTTER_GIT_DIRECTORY]` to be
    the path where you cloned Flutter's git repo:

    添加下面内容，并将 `[PATH_TO_FLUTTER_GIT_DIRECTORY]` 改到你 clone Flutter 的 git 仓库目录下。

    ```terminal
    $ export PATH="$PATH:[PATH_TO_FLUTTER_GIT_DIRECTORY]/flutter/bin"
    ```

 4. Run `source $HOME/.<rc file>`
    to refresh the current window,
    or open a new terminal window to
    automatically source the file.

    运行 `source $HOME/.<rc file>` 刷新当前窗口或者打开一个新的终端窗口就会自动更新这个文件。

 5. Verify that the `flutter/bin` directory
    is now in your PATH by running:

    通过运行以下命令验证 `flutter/bin` 确实加到环境变量中了：

    ```terminal
    $ echo $PATH
    ```
    Verify that the `flutter` command is available by running:

    通过运行以下命令验证 `flutter` 命令：

    ```terminal
    $ which flutter
    ```

{% include dart-tool.md %}

### Update path directly

### 直接更新环境变量

In some cases, your distribution may not permanently acquire
the path when using the above directions. When this occurs,
you can change the environment variables file directly.
These instructions require administrator privileges:

在某些情况下，你的分发可能无法长期获取使用上面提到的环境变量。
发生这种情况时，你可以直接更改环境变量文件。但这需要管理员权限：

   1. Determine the directory where you placed the Flutter SDK.

      找到你存放 Flutter SDK 的目录。

   2. Locate the `etc` directory at the root of the system,
      and open the `profile` file with root privileges.

      定位系统根目录下的 `etc` 文件夹，然后用 root 权限打开 `profile` 文件。

        ```terminal
        $ sudo nano /etc/profile
        ```
   3. Update the PATH string with the location of your
      Flutter SDK directory.

      更新 Flutter SDK 文件夹所在路径的字符串。

      ```shell
      if [ "`id -u`" -eq 0 ]; then
         PATH="..."
      else
         PATH="/usr/local/bin:...:[PATH_TO_FLUTTER_GIT_DIRECTORY]/flutter/bin"
      fi
      export PATH
      ```

   4. End the current session or reboot your system.

      结束当前会话并重启系统。

   5. Once you start a new session, verify that the
      `flutter` command is available by running:

      当你重新启动了新会话，请确认 `flutter` 命令已经可以执行：

      ```terminal
      $ which flutter
      ```

For more details on setting the path in Bash,
see [this StackExchange question][bash].
For information on setting the path in Z shell,
see [this StackOverflow question][zsh].

更多关于如何在 Bash 中配置环境变量的信息请查看[这条 StackExchange 提问][bash]。
更多关于如何在 Z shell 中配置环境变量的信息请查看[这条 StackExchange 提问][zsh]。


[Get the Flutter SDK]: #get-sdk
[bash]: https://unix.stackexchange.com/questions/26047/how-to-correctly-add-a-path-to-path
[zsh]: https://stackoverflow.com/questions/11530090/adding-a-new-entry-to-the-path-variable-in-zsh
