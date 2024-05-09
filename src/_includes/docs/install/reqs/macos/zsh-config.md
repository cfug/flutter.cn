{% assign target = include.target %}

<details>
<summary><strong>如果需要验证 shell 的配置，请点击展开此部分</strong></summary>
<!-- To verify your shell configuration, expand this section -->

Like most UNIX-like operating system, macOS can support multiple shells,
like `bash`, `zsh`, and `sh`.
As of the October 2019 release of macOS Catalina (macOS 10.15),
Zsh or `zsh` is the default shell for macOS.

macOS 与大多数「类 UNIX」操作系统一样，
macOS 可以支持多种 shell，
如 `bash`、`zsh` 和 `sh`。
从 2019 年 10 月发布的 macOS Catalina (macOS 10.15) 开始，
Zsh 或 `zsh` 成为了 macOS 的默认 shell。

#### Check and set `zsh` as default

#### 检查并将 `zsh` 设置为默认

1. To verify `zsh` was set as the default macOS shell,
   run the [Directory Services command line utility][dscl].

   请运行 [目录服务命令行程序][dscl]
   来验证 `zsh` 是否被设置为 macOS 的默认 shell。

    ```console
    $ dscl . -read ~/ UserShell
    ```

    {{terminal}} should print the following as its response.

    {{terminal}} 应该会打印以下内容。

    ```console
    UserShell: /bin/zsh
    ```

    You can skip the remaining steps.

    如果确认为默认，你可以跳过剩余的步骤。

1. If you need to install `zsh`,
   follow the procedure in [this Wiki][install-zsh].

   如果需要安装 `zsh`，
   请按照 [Wiki][install-zsh] 中的步骤进行操作。

1. If you need to change your default shell to `zsh`,
   run the `chsh` command.

   如果需要将默认的 shell 更改为 `zsh`，
   请运行 `chsh` 命令。

    ```console
    $ chsh -s `which zsh`
    ```

To learn more about macOS and `zsh`, check out
[Use zsh as the default shell on your Mac][zsh-mac]
in the macOS documentation.

如果需要了解更多关于 macOS 和 `zsh` 的信息，
请查阅 macOS 文档中的 [在 Mac 上使用 zsh 作为默认 shell][zsh-mac]。

</details>

[install-zsh]: https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH
[dscl]: https://ss64.com/mac/dscl.html
