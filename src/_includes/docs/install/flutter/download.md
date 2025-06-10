
### Download then install Flutter {:.no_toc}

### 下载并安装 Flutter {:.no_toc}

{% assign osl = include.os | downcase | replace: "chromeos","linux" %}
{% case include.os %}
{% when 'Windows' -%}
   {% assign unzip='Expand-Archive .\\' %}
   {% assign path='C:\\user\\{username}\\dev' %}
   {% assign flutter-path='C:\\user\\{username}\\dev\\flutter' %}
   {% assign prompt='PS C:\\>' %}
   {% assign prompt2=path | append: '>' %}
   {% assign diroptions='`%USERPROFILE%` (`C:\\Users\\{username}`) 或者 `%LOCALAPPDATA%` (`C:\\Users\\{username}\\AppData\\Local`)' %}
   {% assign dirinstall='`%USERPROFILE%\\dev\\`' %}
   {% assign dirdl='%USERPROFILE%\\Downloads' %}
   {% assign ps-dir-dl='$env:USERPROFILE\\Downloads\\' %}
   {% assign ps-dir-target='$env:USERPROFILE\\dev\\' %}
   {% capture uz -%}
     {{prompt}} Expand-Archive `
         –Path {{ps-dir-dl}}flutter_sdk_v1.0.0.zip `
         -Destination {{ps-dir-target}}
   {%- endcapture %}
{% when "macOS" -%}
   {% assign diroptions='`~/development/`' %}
   {% assign dirinstall='`~/development/`' %}
   {% assign unzip='unzip' %}
   {% assign path='~/development/' %}
   {% assign flutter-path='~/development/flutter' %}
   {% assign prompt='\$' %}
   {% assign dirdl='~/Downloads/' %}
   {% capture uz -%}
      {{prompt}} {{unzip}} {{dirdl}}flutter_sdk_v1.0.0.zip \
          -d {{path}}
   {%- endcapture %}
{% else -%}
   {% assign diroptions='`~/development/`' %}
   {% assign dirinstall='`~/development/`' %}
   {% assign unzip='tar' %}
   {% assign path='~/development/' %}
   {% assign flutter-path='~/development/flutter' %}
   {% assign prompt='\$' %}
   {% assign dirdl='~/Downloads/' %}
   {% capture uz -%}
     {{prompt}} {{unzip}} -xf {{dirdl}}flutter_sdk_v1.0.0.zip -C {{path}}
   {%- endcapture %}
{% endcase -%}

To install Flutter,
download the Flutter SDK bundle from its archive,
move the bundle to where you want it stored,
then extract the SDK.

从归档列表中下载 Flutter SDK 压缩包，
将压缩包移动到你想要的位置，
然后解压 SDK，
以此来安装 Flutter。

1. Download the following installation bundle to get the latest
   {{site.sdk.channel}} release of the Flutter SDK.

   下载以下 Flutter SDK 最新 {{site.sdk.channel}} 版本的
   压缩包。

   {% if include.os=='macOS' %}

   | <t>Intel Processor</t><t>Intel 处理器</t> | <t>Apple Silicon</t><t>Apple Silicon 处理器</t> |
   |-----------------|---------------|
   | [(loading...)](#){:.download-latest-link-{{osl}} .filled-button} | [(loading...)](#){:.download-latest-link-{{osl}}-arm64 .apple-silicon .filled-button} |

   {% else %}

   [(loading...)](#){:.download-latest-link-{{osl}} .filled-button}

   {% endif -%}

   For other release channels, and older builds, check out the [SDK archive][].

   关于其他发布渠道和旧版本，
   请查阅 [Flutter SDK 归档列表][SDK archive]。

   The Flutter SDK should download to the {{include.os}}
   default download directory: `{{dirdl}}`.

   Flutter SDK 应该会下载至 {{include.os}} 默认下载目录：
   `{{dirdl}}`。

   {% if include.os=='Windows' %}

   If you changed the location of the Downloads directory,
   replace this path with that path.
   To find your Downloads directory location,
   check out this [Microsoft Community post][move-dl].

   如果你自行更改了下载目录的位置，
   那么请将之后步骤中解压指令 (Expand-Archive) 的
   路径 (-Path) 改为你更改后的路径。
   如果你需要查找当前计算机下载目录的位置，
   请查阅 [Microsoft Community post][move-dl]

   {% endif %}

1. Create a folder where you can install Flutter.

   创建一个文件夹，用于安装 Flutter。

   Consider creating a directory at {{diroptions}}.

   可以考虑在 {{diroptions}} 中创建一个目录。

   {% if include.os == "Windows" -%}

   :::warning

   Don't install Flutter to a directory or path that meets
   one or both of the following conditions:

   不要将 Flutter 安装到以下情况的目录或路径中：

   * The path contains special characters or spaces.
   
     路径包含特殊字符或空格。

   * The path requires elevated privileges.

     路径需要较高的权限。

   As an example, `C:\Program Files` fails both conditions.

   例如，`C:\Program Files` 路径就是以上情况。

   :::

   {% endif %}

1. Extract the file into the directory you want to store the Flutter SDK.

   将 Flutter SDK 压缩文件 (zip) 解压到你想要存储的目录中。
   可以使用以下指令进行解压。

   ```console
   {{uz}}
   ```

   When finished, the Flutter SDK should be in the `{{flutter-path}}` directory.

   完成后，Flutter SDK 应该会位于 `{{flutter-path}}` 目录中。

[SDK archive]: /install/archive
[move-dl]: https://answers.microsoft.com/en-us/windows/forum/all/move-download-folder-to-other-drive-in-windows-10/67d58118-4ccd-473e-a3da-4e79fdb4c878

{% case include.os %}
{% when 'Windows' %}

### Update your Windows PATH variable {:.no_toc}

### 更新 Windows PATH 环境变量 {:.no_toc}

{% render docs/help-link.md, location:'win-path', section:'#unable-to-find-the-flutter-command' %}

To run Flutter commands in PowerShell,
add Flutter to the `PATH` environment variable.
This section presumes that you installed the Flutter SDK in
`%USERPROFILE%\dev\flutter`.

将 Flutter 添加到 `PATH` 环境变量后，
才能在 PowerShell 中运行 Flutter 指令。
本节假定你在 `%USERPROFILE%\dev\flutter` 中
安装了 Flutter SDK。

1. Press <kbd>Windows</kbd> + <kbd>Pause</kbd>.

   按下快捷键 <kbd>Windows</kbd> + <kbd>Pause</kbd>。

   If your keyboard lacks a <kbd>Pause</kbd> key,
   try <kbd>Windows</kbd> + <kbd>Fn</kbd> + <kbd>B</kbd>.

   如果你的键盘上没有 <kbd>Pause</kbd> 键，
   请尝试 <kbd>Windows</kbd> + <kbd>Fn</kbd> + <kbd>B</kbd>。

   The **System > About** dialog displays.

   这将会显示 **系统 > 系统信息** 的窗口。

1. Click **Advanced System Settings**
   <span aria-label="and then">></span> **Advanced**
   <span aria-label="and then">></span> **Environment Variables...**

   单击 **高级系统设置**
   <span aria-label="and then">></span> **高级**
   <span aria-label="and then">></span> **环境变量…**

   The **Environment Variables** dialog displays.

   这将会显示 **环境变量** 的窗口。

1. In the **User variables for (username)** section,
   look for the **Path** entry.

   在 **username 用户变量** 的部分中，
   找到 **Path** 条目。

   {:type="a"}
   1. If the entry exists, double-click on it.

      如果存在该条目，请双击它。

      The **Edit Environment Variable** dialog displays.

      这将会显示 **编辑环境变量** 的窗口。

      {:type="i"}

      1. Double-click in an empty row.

         双击空白行。

      1. Type `%USERPROFILE%\dev\flutter\bin`.

         输入 `%USERPROFILE%\dev\flutter\bin`。

      1. Click the **%USERPROFILE%\dev\flutter\bin** entry.

         单击选中 **%USERPROFILE%\dev\flutter\bin** 条目。

      1. Click **Move Up** until the Flutter entry sits at the top of the list.

         单击 **上移**，直到 Flutter 条目位于列表顶部。

      1. Click **OK** three times.

         顺着打开的窗口依次点击 **确认**（三次）。

   1. If the entry doesn't exist, click **New...**.

      如果条目不存在，请单击 **新建…**。

      The **Edit Environment Variable** dialog displays.

      这将会显示 **新建用户变量** 的窗口。

      {:type="i"}
      1. In the **Variable Name** box, type `Path`.

         在 **变量名** 框中，输入 `Path`。

      1. In the **Variable Value** box,
         type `%USERPROFILE%\dev\flutter\bin`

         在 **变量值** 框中，
         输入 `%USERPROFILE%\dev\flutter\bin`。

      1. Click **OK** three times.

         顺着打开的窗口依次点击 **确认**（三次）。

1. To enable these changes,
   close and reopen any existing
   command prompts and PowerShell instances.

   为了启用这些更改，
   请关闭并重新打开所有现有命令提示符和 PowerShell 实例。

{% when 'macOS' %}

### Add Flutter to your `PATH` {:.no_toc}

### 将 Flutter 添加至 `PATH` {:.no_toc}

To run Flutter commands in the terminal,
add Flutter to the `PATH` environment variable.
This guide presumes your [Mac runs the latest default shell][zsh-mac], `zsh`.
Zsh uses the `.zshenv` file for [environment variables][envvar].

要在 terminal 中运行 Flutter 命令，
请将 Flutter 添加到 `PATH` 环境变量中。
本指南假定你的 [Mac 运行的是最新的默认 shell][zsh-mac]，`zsh`。
Zsh 使用 `.zshenv` 文件来处理 [环境变量][envvar]。

1. Launch your preferred text editor.

   启动你喜欢的文本编辑器。

1. If it exists, open the Zsh environmental variable file `~/.zshenv`
   in your text editor. If it doesn't, create `~/.zshenv`.

   如果 `~/.zshenv` 文件存在，
   请在文本编辑器中打开 Zsh 环境变量文件 `~/.zshenv`。
   如果不存在，请创建 `~/.zshenv`。

1. Copy the following line and paste it at the end of your `~/.zshenv` file.

   复制以下内容并粘贴到 `~/.zshenv` 文件内的末尾。

   ```bash
   export PATH=$HOME/development/flutter/bin:$PATH
   ```

1. Save your `~/.zshenv` file.

   保存 `~/.zshenv` 文件。

1. To apply this change, restart all open terminal sessions.

   请重新启动所有打开的终端会话窗口，
   来应用此更改。

If you use another shell,
check out [this tutorial on setting your PATH][other-path].

如果你使用其他 shell，
请查阅 [设置 PATH 的教程][other-path]。

[zsh-mac]: https://support.apple.com/en-us/102360
[envvar]: https://zsh.sourceforge.io/Intro/intro_3.html
[other-path]: https://www.cyberciti.biz/faq/unix-linux-adding-path/

{% else %}

### Add Flutter to your `PATH` {:.no_toc}

### 将 Flutter 添加至 `PATH` {:.no_toc}

To run Flutter commands in a shell,
add Flutter to the `PATH` environment variable.

1. Check which shell starts when you open a new console window.
   This would be your _default shell_.

   ```console
   $ echo $SHELL
   ```

   This differs from another command that tells you which shell runs
   in your current console.

   ```console
   $ echo $0
   ```

1. To add Flutter to your `PATH`, expand the entry for your default shell, then
   choose the command.

{% for shell in shells %}

   <details {% if shell.name == 'bash' %}open{% endif %}>
   <summary>Show <code>{{shell.name}}</code> command</summary>

   ```console
   $ {{shell.set-path}}
   ```

   {% if shell.name == 'shell' %}
   :::note
   If the above doesn't work, you might be using a non-login shell.
   In that case, add the same line to ~/.bashrc: `console $ echo
   'export PATH="~/development/flutter/bin:$PATH"' >> ~/.bashrc `.
   To ensure consistency across all shell types, source ~/.bashrc from
   ~/.bash_profile by adding the following to ~/.bash_profile: ` if [ -f
   ~/.bashrc ]; then source ~/.bashrc fi `.
   {% endif %}

   </details>

{% endfor %}

1. To apply this change, restart all open terminal sessions.

{% endcase %}
