{% assign terminal=include.terminal %}
{% assign target = include.target %}
{% assign dir = include.dir %}

### Add Flutter to your `PATH`
{:.no_toc}

### 将 Flutter 添加至 `PATH`
{:.no_toc}

To run Flutter commands in {{terminal}},
add Flutter to the `PATH` environment variable.
This guide presumes your [Mac runs the latest default shell][zsh-mac], `zsh`.
Zsh uses the `.zshenv` file for [environment variables][envvar].

要在 {{terminal}} 中运行 Flutter 命令，
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

   ```conf
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
