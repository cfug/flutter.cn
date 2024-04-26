### Update your path

### 更新 path

Independent of how you installed Flutter,
you need to add the Flutter SDK to your `PATH`.
You can add Flutter to your `PATH` either for the current session
or for all sessions going forward.

无论你如何安装 Flutter，
都需要将 Flutter SDK 添加到你的 `PATH` 中。
为了当前会话或今后所有的会话能够正常使用，
你需要将 Flutter 添加到你的 `PATH` 中。

{% include docs/dart-tool.md %}

#### Update your path for the current session only

#### 仅更新当前会话的 path

To update your `PATH` variable for the current session,
enter this command in your terminal:

请在终端中输入以下指令，更新当前会话的 `PATH` 变量：

```console
$ export PATH="$PATH:[PATH_TO_FLUTTER_GIT_DIRECTORY]/flutter/bin"
```

In this command,
replace `[PATH_TO_FLUTTER_GIT_DIRECTORY]`
with the path to your Flutter SDK install.

在此指令中，
将 `[PATH_TO_FLUTTER_GIT_DIRECTORY]` 替换为 
Flutter SDK 的安装路径。

#### Update your path for all future sessions

#### 为今后所有会话更新 path

To add Flutter to your `PATH` for _any_ terminal session, 
follow these steps:

请按照以下步骤，将 Flutter 添加到 _所有_ 终端会话的 `PATH` 中：

1. Find your Flutter SDK installation path.

   找到 Flutter SDK 的安装路径。

    ```console
    $ find / -type d -wholename "flutter/bin" 2>/dev/null
    ```

    Response should resemble:

    回复应该类似于：

    ```console
    /usr/<example>dev/flutter/bin
    ```

2. Append the following line to your `rc` shell file
   Linux reads the `rc` shell "resource" file each
   time it opens a terminal.

   将下面这一行添加到 `rc` shell 文件中，
   Linux 在每次打开终端时都会读取 `rc` shell 的文件内容。

   Replace `<path_to_flutter_directory>` with your Flutter path

   将 `<path_to_flutter_directory>` 替换为 Flutter 路径
   
    ```console
    $ echo 'export PATH="$PATH:<path_to_flutter_directory>/flutter/bin"' >> $HOME/.bashrc
    ```
    
3. Reload the current shell profile.

   重新加载当前 shell 配置文件。
   
    ```console
    source $HOME/.<rc file>
    ```
    
4. Verify that the `flutter/bin` directory exists in your `PATH`.

   验证 `PATH` 中是否存在 `flutter/bin` 目录。
   
    ```console
    $ echo $PATH
    ```
    
    Response should resemble:

    回复应该类似于：
   
    ```console
    /usr/<example>/dev/flutter/bin:/usr/local/git/git-google/bin:/usr/local/git/current/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin:
    ```
    
5. Verify that you can now use the `flutter` command.

   验证现在是否可用 `flutter` 指令。
   
    ```console
    $ which flutter
    ```

    Response should resemble:

    回复应该类似于：
   
    ```
	  /usr/<example>/dev/flutter/bin/flutter
	  ```

{% include docs/dart-tool.md %}
