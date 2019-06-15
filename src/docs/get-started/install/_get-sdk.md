{% if os == 'linux' -%}
  {% assign unzip = 'tar xf' -%}
  {% assign file_ext = '.tar.xz' -%}
{% else -%}
  {% assign unzip = 'unzip' -%}
  {% assign file_ext = '.zip' -%}
{% endif -%}

## Get the Flutter SDK {#get-sdk}

## 获取 Flutter SDK {#get-sdk}


 1. Download the following installation bundle to get the latest {{site.sdk.channel}} release of the
    Flutter SDK:

    下载以下安装包来获取最新的 {{site.sdk.channel}} Flutter SDK：

    [(loading...)](#){:.download-latest-link-{{os}}.btn.btn-primary}

    For other release channels, and older builds, see the [SDK
    archive](/docs/development/tools/sdk/archive) page.

    想要获取到其他版本的安装包，可以查看 [SDK 归档](/docs/development/tools/sdk/archive) 页面。

 2. Extract the file in the desired location, for example:

    将文件解压到目标路径, 比如:

    {% comment %}
      Our JS also updates the filename in this template, but it doesn't include the terminal formatting:

      {% prettify shell %}
      $ cd ~/development
      $ {{unzip}} ~/Downloads/[[download-latest-link-filename]]flutter_{{os}}_vX.X.X-{{site.sdk.channel}}{{file_ext}}[[/end]]
      {% endprettify %}
    {% endcomment -%}

    ```terminal
    $ cd ~/development
    $ {{unzip}} ~/Downloads/flutter_{{os}}_vX.X.X-{{site.sdk.channel}}{{file_ext}}
    ```

 3. Add the `flutter` tool to your path:

    配置 `flutter` 的 PATH 环境变量：

    ```terminal
    $ export PATH="$PATH:`pwd`/flutter/bin"
    ```

    This command sets your `PATH` variable for the _current_ terminal window only.
    To permanently add Flutter to your path, see [Update your
    path](#update-your-path).

    这个命令配置了 `PATH` 环境变量，且只会在你 **当前** 命令行窗口中生效。
    如果想让它永久生效，请查看 [更新 PATH 环境变量](#update-your-path)。
    
 4. Optionally, pre-download development binaries:
    
    开发二进制文件预下载（可选操作）

    The `flutter` tool downloads platform-specific development binaries as
    needed. For scenarios where pre-downloading these artifacts is preferable
    (e.g., hermetic build environments, intermittent network availability), iOS
    and Android binaries can be downloaded ahead of time by running:
    
    `flutter` 命令行工具会下载不同平台的开发二进制文件，如果需要一个封闭式的构建环境，
    或在网络可用性不稳定的情况下使用等情况，你可能需要通过下面这个命令预先下载
    iOS 和 Android 的开发二进制文件：


    ```terminal
    $ flutter precache
    ```

    For additional download options, see `flutter help precache`.
    
    更多使用方式，请使用 `flutter help precache` 命令查看。

You are now ready to run Flutter commands!

现在你可以愉快地运行 Flutter 的命令行啦！


{{site.alert.note}}

  To update an existing version of Flutter, see
  [Upgrading Flutter](/docs/development/tools/sdk/upgrading).
  
  如果想要升级当前的 Flutter 版本，可以查看 [升级 Flutter](/docs/development/tools/sdk/upgrading)。

{{site.alert.end}}

### Run flutter doctor

### 运行 flutter doctor 命令


Run the following command to see if there are any dependencies you need to
install to complete the setup (for verbose output, add the `-v` flag):

通过运行以下命令来查看当前环境是否需要安装其他的依赖（如果想查看更详细的输出，增加一个 `-v` 参数即可）：

```terminal
$ flutter doctor
```

This command checks your environment and displays a report to the terminal
window. The Dart SDK is bundled with Flutter; it is not necessary to install
Dart separately. Check the output carefully for other software you might
need to install or further tasks to perform (shown in **bold** text).

这个命令会检查你当前的配置环境，并在命令行窗口中生成一份报告。
安装 Flutter 会附带安装 Dart SDK，所以不需要再对 Dart 进行单独安装。
你需要仔细阅读上述命令生成的报告，看看别漏了一些需要安装的依赖，
或者需要之后执行的命令（这个会以 **加粗的文本** 显示出来）。

For example:

比如你可能会看到下面这样的输出：

<pre>
[-] Android toolchain - develop for Android devices
    • Android SDK at /Users/obiwan/Library/Android/sdk
    <strong>✗ Android SDK is missing command line tools; download from https://goo.gl/XxQghQ</strong>
    • Try re-installing or updating your Android SDK,
      visit {{site.url}}/setup/#android-setup for detailed instructions.
</pre>

The following sections describe how to perform these tasks and finish the setup
process.

之后的部分会向你描述如果执行这些命令来完成整体的配置过程。

Once you have installed any missing dependencies, run the `flutter doctor`
command again to verify that you’ve set everything up correctly.

当你安装了任一缺失部分的依赖后，可以再次运行 `flutter doctor` 命令来确认是否成功安装。

{% include_relative _analytics.md %}

