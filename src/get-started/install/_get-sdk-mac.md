## Get the Flutter SDK {#get-sdk}

## 获取 Flutter SDK {#get-sdk}

{% include docs/china-notice.md %}

 1. Download the following installation bundle to get the latest
    {{site.sdk.channel}} release of the Flutter SDK:

    下载以下安装包来获取最新的 {{site.sdk.channel}} Flutter SDK：

    |Intel | | <span class="apple-silicon">Apple 芯片</span> |
    |------| | ---------------|
    |[(loading...)](#){:.download-latest-link-{{os}}.btn.btn-primary} | | [(loading...)](#){:.download-latest-link-{{os}}-arm64.apple-silicon.btn.btn-primary} |

    <br>
    For other release channels, and older builds,
    check out the [SDK archive][].

    想要获取到其他版本的安装包，请参阅 [SDK 版本列表][SDK archive] 页面。

    <div class="apple-silicon">
    {{site.alert.tip}}

      To determine whether your Mac uses an Apple silicon processor,
      refer to [Mac computers with Apple silicon][]{:target="_blank"}
      on apple.com

      若要确定你的 Mac 是否是使用了 Apple 芯片处理器，
      请查阅苹果官网的说明页面：
      [搭载 Apple 芯片的 Mac 电脑][]{:target="_blank"}。

    {{site.alert.end}}</div>

 1. Extract the file in the desired location. For example:

    将文件解压到目标路径, 比如:

    {% comment %}
      Our JS also updates the filename in this template,
      but it doesn't include the terminal formatting:

      ```terminal
      $ cd ~/development
      $ unzip ~/Downloads/[[download-latest-link-filename]]flutter_{{os}}_vX.X.X-{{site.sdk.channel}}.zip[[/end]]
      ```
    {% endcomment -%}

    ```terminal
    $ cd ~/development
    $ unzip ~/Downloads/flutter_{{os}}_vX.X.X-{{site.sdk.channel}}.zip
    ```

 1. Add the `flutter` tool to your path:

    配置 `flutter` 的 PATH 环境变量：

    ```terminal
    $ export PATH="$PATH:`pwd`/flutter/bin"
    ```

    This command sets your `PATH` variable for the
    _current_ terminal window only.
    To permanently add Flutter to your path,
    check out [Update your path][].

    这个命令配置了 `PATH` 环境变量，且只会在你 **当前** 命令行窗口中生效。
    如果想让它永久生效，请查看 [更新 PATH 环境变量][Update your path]。

You are now ready to run Flutter commands!

现在你可以愉快地运行 Flutter 的命令行啦！

{{site.alert.note}}

  To update an existing version of Flutter,
  check out [Upgrading Flutter][].

  如果想要升级当前的 Flutter 版本，可以查看 [升级 Flutter][Upgrading Flutter]。

{{site.alert.end}}

### Run flutter doctor

### 运行 flutter doctor 命令

Run the following command to see if there are any
dependencies you need to install to complete the setup
(for verbose output, add the `-v` flag):

通过运行以下命令来查看当前环境是否需要安装其他的依赖
（如果想查看更详细的输出，增加一个 `-v` 参数即可）：

```terminal
$ flutter doctor
```

This command checks your environment and displays
a report to the terminal window.
The Dart SDK is bundled with Flutter;
it isn't necessary to install Dart separately.
Check the output carefully for other software you might
need to install or further tasks to perform
(shown in **bold** text).

这个命令会检查你当前的配置环境，并在命令行窗口中生成一份报告。
安装 Flutter 会附带安装 Dart SDK，所以不需要再对 Dart 进行单独安装。
你需要仔细阅读上述命令生成的报告，看看别漏了一些需要安装的依赖，
或者需要之后执行的命令（这个会以 **加粗的文本** 显示出来）。

For example:

比如你可能会看到下面这样的输出：

<pre>
[-] Android toolchain - develop for Android devices
    • Android SDK at /Users/dash/Library/Android/sdk
    <strong>✗ Android SDK is missing command line tools; download from https://goo.gl/XxQghQ</strong>
    • Try re-installing or updating your Android SDK,
      visit {{site.url}}/setup/#android-setup for detailed instructions.
</pre>

The following sections describe how to perform these tasks
and finish the setup process.

之后的部分会向你描述如果执行这些命令来完成整体的配置过程。

Once you have installed any missing dependencies,
run the `flutter doctor` command again
to verify that you've set everything up correctly.

### Downloading straight from GitHub instead of using an archive

### 直接从 Github 上（而不是归档）下载

_This is only suggested for advanced use cases._

**该建议仅适用于高级用例**

You can also use git directly instead of downloading
the prepared archive. For example,
to download the stable branch:

你也可以不从归档，而是用 Git 直接下载。
例如，可以运行下方的命令，以下载稳定分支的 SDK：

```terminal
$ git clone https://github.com/flutter/flutter.git -b stable
```

[Update your path][], and run `flutter doctor`.
This lets you know if there are other dependencies
you need to install to use Flutter (such as the Android SDK).

[更新环境变量][Update your path]，并运行 `flutter doctor`。
这个命令将会告诉你，是否还缺少运行 Flutter 所需要安装的其他依赖项（例如 Android SDK）。

If you didn't use the archive,
Flutter downloads necessary development binaries as they
are needed (if you used the archive,
they are included in the download). You might want to
pre-download these development binaries
(for example, you might do this when setting
up hermetic build environments,
or if you only have intermittent network availability).
To do so, run the following command:

如果你不使用归档，Flutter 将会下载必要的开发二进制文件（如果你使用的归档，那么这些文件已经包含在内了）。
你也许会想要提前下载这些开发二进制文件（例如，您可能希望设置系统构建环境，或是您的网络可用性不佳）。
那么你可以运行以下命令：

```terminal
$ flutter precache
```

For additional download options, check out `flutter help precache`.

更多额外下载选项，请参阅 `flutter help precache`。

{% include_relative _analytics.md %}

[Flutter repo]: {{site.repo.flutter}}
[SDK archive]: {{site.url}}/release/archive
[Snap Store]: https://snapcraft.io/store
[snapd]: https://snapcraft.io/flutter
[Update your path]: #update-your-path
[Upgrading Flutter]: {{site.url}}/release/upgrade
[Mac computers with Apple silicon]: https://support.apple.com/en-us/HT211814
[搭载 Apple 芯片的 Mac 电脑]: https://support.apple.com/zh-cn/HT211814
