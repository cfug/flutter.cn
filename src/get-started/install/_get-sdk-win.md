## Get the Flutter SDK

## 获取 Flutter SDK

 1. Download the following installation bundle to get the latest
    {{site.sdk.channel}} release of the Flutter SDK:

    点击下方的安装包，获取 {{site.sdk.channel}} 发行通道的 Flutter SDK 最新版本：

    [(loading...)](#){:.download-latest-link-{{os}}.btn.btn-primary}

    For other release channels, and older builds,
    see the [SDK releases][] page.

    要查看其他发行通道和以往的版本，请参阅
    [SDK 版本列表][SDK releases] 页面。

 1. Extract the zip file and place the contained `flutter`
    in the desired installation location for the Flutter SDK
    (for example, `C:\src\flutter`).

    将压缩包解压，然后把其中的 `flutter` 目录整个放在
    你想放置 Flutter SDK 的路径中（例如 `C:\src\flutter`）。

{{site.alert.warning}}

  Do not install Flutter to a path that contains special
  characters or spaces.

  请勿将 Flutter 有特殊字符或空格的路径下。

{{site.alert.end}}

{{site.alert.warning}}

  Do not install Flutter in a directory like `C:\Program Files\` that requires
  elevated privileges.

  请勿将 Flutter 安装在需要高权限的文件夹内，例如 `C:\Program Files\`。

{{site.alert.end}}

If you don't want to install a fixed version of the installation 
bundle, you can skip steps 1 and 2. Instead, get the source code 
from the [Flutter repo][] on 
GitHub, and change branches or tags as needed. For example:

如果你不想安装指定版本的安装包。可以忽略步骤 1 和 2。
从 GitHub 上的 [Flutter repo][] 获取源代码，
并根据需要，切换到指定的分支或标签。例如：

```batchfile
C:\src>git clone https://github.com/flutter/flutter.git -b stable
```

You are now ready to run Flutter commands in the Flutter Console.

现在你可以在控制台当中使用 Flutter 的命令了。

[Flutter repo]: {{site.repo.flutter}}

### Update your path

### 更新 path 环境变量

If you wish to run Flutter commands in the regular Windows console,
take these steps to add Flutter to the `PATH` environment variable:

如果你想在 Windows 控制台中运行 Flutter 命令，需要按照下面的步骤来将 Flutter 的
运行文件路径加入到 `PATH` 环境变量。

* From the Start search bar, enter 'env'
  and select **Edit environment variables for your account**.

  在开始菜单的搜索功能键入「env」，然后选择 **编辑系统环境变量**。

* Under **User variables** check if there is an entry called **Path**:

  在 **用户变量** 一栏中，检查是否有 **Path** 这个条目：

  * If the entry exists, append the full path to `flutter\bin` using
    `;` as a separator from existing values.

    如果存在这个条目，以 `;` 分隔已有的内容，加入 `flutter\bin` 目录的完整路径。

  * If the entry doesn't exist,
    create a new user variable named `Path` with
    the full path to `flutter\bin` as its value.

    如果不存在的话，在用户环境变量中创建一个新的 `Path` 变量，
    然后将 `flutter\bin` 所在的完整路径作为新变量的值。

You have to close and reopen any existing console windows
for these changes to take effect.

你需要重新打开已经打开的命令行提示符窗口，
这样下次启动命令提示符时，才能访问到刚才修改的变量。

{% include docs/dart-tool-win.md %}

### Run `flutter doctor`

### 运行 `flutter doctor`

From a console window that has the Flutter directory in the
path (see above), run the following command to see if there
are any platform dependencies you need to complete the setup:

在将 `Path` 变量更新后，打开一个新的控制台窗口，然后执行下面的命令。
如果它提示有任何的平台相关依赖，那么你就需要按照指示完成这些配置：

```batchfile
C:\src\flutter>flutter doctor
```

This command checks your environment and displays a report of the status
of your Flutter installation. Check the output carefully for other
software you might need to install or further tasks to perform
(shown in **bold** text).

上述命令会检查你的现有环境，并将检测结果以报告形式呈现出来。
仔细阅读它显示的内容，检查是否有尚未安装的软件
或是有其他的步骤需要完成（通常会以**粗体**呈现）。

For example:

例如：

<pre>
[-] Android toolchain - develop for Android devices
    • Android SDK at D:\Android\sdk
    <strong>✗ Android SDK is missing command line tools; download from https://goo.gl/XxQghQ</strong>
    • Try re-installing or updating your Android SDK,
      visit {{site.url}}/setup/#android-setup for detailed instructions.
</pre>

The following sections describe how to perform these tasks and
finish the setup process. Once you have installed any missing
dependencies, you can run the `flutter doctor` command again to
verify that you’ve set everything up correctly.

下面的章节介绍了对缺失的内容进行配置的方法。
每当您安装了任何一个的依赖项，
就可以随时执行 `flutter doctor` 来检查是否正确配置了所有内容。

{{site.alert.note}}

  If `flutter doctor` returns that either the Flutter plugin
  or Dart plugin of Android Studio are not installed, move
  on to [Set up an editor][] to resolve this issue.

  如果 `flutter doctor` 提示 Android Studio 的
  Flutter 或者 Dart 插件尚未安装，请移步文档
  [编辑器设定][Set up an editor] 查阅如何解决这个问题。

{{site.alert.end}}

{% include_relative _analytics.md %}


[Flutter repo]: {{site.repo.flutter}}
[SDK releases]: {{site.url}}/development/tools/sdk/releases
[Set up an editor]: {{site.url}}/get-started/editor?tab=androidstudio
