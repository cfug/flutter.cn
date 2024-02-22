## Get the Flutter SDK {#get-sdk}

## 获取 Flutter SDK {#get-sdk}

{% include docs/china-notice.md %}

To install the Flutter SDK on your Linux system,
use one of the following methods.

在使用 Linux 时，你可以通过如下的方式安装 Flutter。

### Method 1: Install Flutter using snapd

### 方式 1：使用 snapd 安装 Flutter

This offers the most direct method to install
the Flutter SDK on your Linux system.

使用 snapd 在 Linux 上安装 Flutter 是最直接的方式。

To learn about using snapd, check [Installing snapd][].

更多使用 snapd 的教程，请查看 [安装 snapd][Installing snapd]。

After you install `snapd`, [install Flutter from the Snap Store][] or
run the following command:

安装 snapd 后，你可以
[通过 Snap 商店来安装 Flutter][install Flutter from the Snap Store]，
或者通过以下命令安装：

```terminal
$ sudo snap install flutter --classic
```

{{site.alert.note}}

  After you install Flutter with `snapd`,
  display your Flutter SDK path with the following command:

  安装 snap 后，可以使用如下命令展示 Flutter SDK 路径：

  ```terminal
  $ flutter sdk-path
  ```

{{site.alert.end}}

### Method 2: Manual installation

### 方式 2：手动安装 Flutter

If you aren't using `snapd`, follow these steps to install Flutter.

如果你没有 `snapd`，那么你可以通过以下步骤安装 Flutter。

1. Download the installation bundle for the latest
   {{site.sdk.channel}} release of the Flutter SDK:

   通过下载下面的安装包以获得最新 {{site.sdk.channel}} release 版本的 Flutter SDK：

   [(loading...)](#){:.download-latest-link-{{os}}.btn.btn-primary}

   You can find older builds and other release channels in the [SDK archive][].

   对于其他发布频道以及更久的构建版本，
   请查看 [SDK 发布][SDK archive] 页面。

1. Extract the downloaded file to a location of your choice:

   将文件解压到合适的地方，例如：

    ```terminal
    $ cd ~/development
    $ tar xf ~/Downloads/flutter_{{os}}_vX.X.X-{{site.sdk.channel}}.tar.xz
    ```

1. Add the `flutter` tool to your path:

   将 `flutter` 工具添加到环境变量中：

    ```terminal
    $ export PATH="$PATH:`pwd`/flutter/bin"
    ```

    This command sets your `PATH` environment variable for the current
    terminal window only.
    To add Flutter as permanent part of your path,
    check out [Update your path][].

   用这个命令添加 `PATH` 仅在当前的命令行视窗生效。
   要将 Flutter 永久添加到环境变量中，请参阅
   [更新你的路径][Update your path]。

1. (Optional) Pre-download development binaries:

   （可选）预下载开发二进制文件：

    ```terminal
    $ flutter precache
    ```

    To find additional download options, run `flutter help precache`.

   你可以执行 `flutter help precache` 查看其他的下载选项。

{{site.alert.note}}

  To update an existing version of Flutter, see [Upgrading Flutter][].

  要更新已有 Flutter版本，请参阅 [升级你的 Flutter][Upgrading Flutter]。

{{site.alert.end}}

### Verify your install with `flutter doctor`

### 运行 `flutter doctor` 校验安装

After installing Flutter, run `flutter doctor`.

安装 Flutter 后，运行 `flutter doctor`：

```terminal
$ flutter doctor
```

This command checks your environment and displays a report in the
terminal window.
Flutter bundles the Dart SDK. You don't need to install Dart.

该命令将检查你的环境情况并显示汇报在命令行窗口中。
Dart SDK 已经绑在 Flutter 中了；你无需单独再安装 Dart。

To get greater detail on what you need to fix, add the `-v` flag:

若你想了解你需要进一步配置的内容，使用 `-v` 运行：

```terminal
$ flutter doctor -v
```

Review the output for further tasks to perform.
An example would be the text shown in **bold**.

仔细检查你是否还有需要配置的内容或者要执行的任务（例如加粗显示的内容）。

The `flutter doctor -v` output might resemble the following:

`flutter doctor -v` 命令可能会包含以下内容：

{% comment %}
Need to use HTML for this code block to get the replacements
and boldface to work.
{% endcomment -%}

<pre>
[-] Android toolchain - develop for Android devices
    • Android SDK at /Users/dash/Library/Android/sdk
    <strong>✗ Android SDK is missing command line tools; download from https://goo.gl/XxQghQ</strong>
    • Try re-installing or updating your Android SDK,
      visit {{site.url}}/setup/#android-setup for detailed instructions.
</pre>

The following sections describe how to perform these tasks
and finish the setup process.

上面的部分描述了如何执行这些任务，并完成设置流程。

After completing the outlined tasks,
run the `flutter doctor` command again.

当你已经执行了列出的所有任务后，
再次运行 `flutter doctor` 命令以验证这些构建是否设置正确。

{% include_relative _analytics.md %}

[Flutter repo]: {{site.repo.flutter}}
[install Flutter from the Snap Store]: https://snapcraft.io/flutter
[Installing snapd]: https://snapcraft.io/docs/installing-snapd
[SDK archive]: {{site.url}}/release/archive
[Update your path]: #update-your-path
[Upgrading Flutter]: {{site.url}}/release/upgrade
