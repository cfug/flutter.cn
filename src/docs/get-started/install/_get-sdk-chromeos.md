{% if os == 'linux' -%}
  {% assign unzip = 'tar xf' -%}
  {% assign file_ext = '.tar.xz' -%}
{% else -%}
  {% assign unzip = 'unzip' -%}
  {% assign file_ext = '.zip' -%}
{% endif -%}

## Get the Flutter SDK {#get-sdk}

## 获取 Flutter SDK{#get-sdk}

 1. Download the following installation bundle to get the latest
    {{site.sdk.channel}} release of the Flutter SDK:

    下载下面的安装包以获得最新的 Flutter SDK 的 {{site.sdk.channel}}发布包。

    [(loading...)](#){:.download-latest-link-{{os}}.btn.btn-primary}

    For other release channels, and older builds,
    see the [SDK archive][] page.

    对于其他发布频道，以及更早的版本，请查看 [SDK 存档][SDK archive]页面。

 1. In the Files app, drag-and-drop the downloaded file from "Downloads"
    to "Linux Files" to access Flutter from your Linux container.

    在文件管理应用中，将下载好的文件从 "Downloads" 拖拽到 "Linux Files" 中，以便能够从 Linux container 中访问到 Flutter。

 1. Extract the file in the desired location, for example:

    将文件解压到合适的地方，例如：

    {% comment %}

      Our JS also updates the filename in this template, but it doesn't include the terminal formatting:

      我们的 JS 脚本还会更新该模板中的文件名，但不包括终端中的格式：

      {% prettify shell %}
      $ cd ~/development
      $ {{unzip}} ~/Downloads/[[download-latest-link-filename]]flutter_{{os}}_vX.X.X-{{site.sdk.channel}}{{file_ext}}[[/end]]
      {% endprettify %}
      
    {% endcomment -%}

    ```terminal
    $ cd ~/development
    $ {{unzip}} ~/Downloads/flutter_{{os}}_vX.X.X-{{site.sdk.channel}}{{file_ext}}
    ```
    
    If you don't want to install a fixed version of the installation bundle, 
    you can skip steps 1 and 2. 
    Instead, get the source code from the [Flutter repo][]
    on GitHub with the following command:

    如果你不想安装安装包的补丁，你可以跳过步骤 1 或 步骤 2，直接获取 Github 上 [Flutter 仓库][Flutter repo] 的源码并执行以下命令：
    
    ```terminal
    $ git clone https://github.com/flutter/flutter.git
    ```
    
    You can also change branches or tags as needed.
    For example, to get just the stable version:

    你也可以按你的需要切换分支或者tag。
    例如，你可以使用 stable 版本的分支：
    
    ```terminal
    $ git clone https://github.com/flutter/flutter.git -b stable --depth 1
    ```
    
 1. Add the `flutter` tool to your path:

    将 `flutter` 工具添加到环境变量中：

    ```terminal
    $ export PATH="$PATH:`pwd`/flutter/bin"
    ```

    This command sets your `PATH` variable for the
    _current_ terminal window only.
    To permanently add Flutter to your path, see
    [Update your path][].

    用这个命令添加 `PATH` 仅在当前的命令行视窗生效。
    要将 Flutter 永久添加到环境变量中，请参阅
    [更新您的路径][Update your path]。

 1. Optionally, pre-download development binaries:

    可选步骤，提前下载二进制开发文件：

    The `flutter` tool downloads platform-specific development binaries as
    needed. For scenarios where pre-downloading these artifacts is preferable
    (for example, in hermetic build environments,
    or with intermittent network availability), iOS
    and Android binaries can be downloaded ahead of time by running:

    `flutter` 工具将下载所需的平台特殊开发二进制文件。
    对于预下载这些工件更好的做法是（例如，在系统构建环境中，
    网络可能出现不通畅的问题），通过运行下面命令提前下载 iOS
    和 Android 的二进制文件：

    ```terminal
    $ flutter precache
    ```

    For additional download options, see `flutter help precache`.

    对于这些可选的下载项，请参考 `flutter help precache`。

You are now ready to run Flutter commands!

你现在可以运行 Flutter 命令了！

{{site.alert.note}}

  To update an existing version of Flutter, see
  [Upgrading Flutter][].

  要更新已有 Flutter版本，请参阅[升级你的 Flutter][Upgrading Flutter]。

{{site.alert.end}}


### Run flutter doctor

### 运行 flutter doctor

Run the following command to see if there are any dependencies you need to
install to complete the setup (for verbose output, add the `-v` flag):

运行以下命令以查看是否还有缺失的依赖需要安装，你需要安装这些依赖以完成设置（要看到详细输出，请添加 `-v` 标识）：

```terminal
$ flutter doctor
```

This command checks your environment and displays a report to the terminal
window. The Dart SDK is bundled with Flutter; it is not necessary to install
Dart separately. Check the output carefully for other software you might
need to install or further tasks to perform (shown in **bold** text).

该命令将检查你的环境情况并显示汇报在命令行窗口中。
Dart SDK 已经绑在 Flutter 中了；你无需单独再安装 Dart。
仔细检查你是否还有需要安装的东西，或者要执行的任务（在该文字中提示的）。

For example:

例如：

<pre>
[-] Android toolchain - develop for Android devices
    • Android SDK at /Users/obiwan/Library/Android/sdk
    <strong>✗ Android SDK is missing command line tools; download from https://goo.gl/XxQghQ</strong>
    • Try re-installing or updating your Android SDK,
      visit {{site.url}}/setup/#android-setup for detailed instructions.
</pre>

The following sections describe how to perform these tasks and finish the setup
process.

上面的部分描述了如何执行这些任务，并完成设置流程。

Once you have installed any missing dependencies, run the `flutter doctor`
command again to verify that you’ve set everything up correctly.

当你已经安装了全部缺失的依赖之后，请再次运行 `flutter doctor` 命令，以验证你是否是真的全部正确设置完毕了。

{% include_relative _analytics.md %}

[Flutter repo]: {{site.github}}/flutter/flutter
[Installing snapd]: https://snapcraft.io/docs/installing-snapd
[SDK archive]: /docs/development/tools/sdk/archive
[Snap Store]: https://snapcraft.io/store
[snapd]: https://snapcraft.io/flutter
[Update your path]: #update-your-path
[Upgrading Flutter]: /docs/development/tools/sdk/upgrading
