## Get the Flutter SDK

## 获取 Flutter SDK

 1. Download the following installation bundle to get the latest
    {{site.sdk.channel}} release of the Flutter SDK:

    下载下面的安装包以获取最新版本 {{site.sdk.channel}} 的 Flutter SDK

    [(loading...)](#){:.download-latest-link-{{os}}.btn.btn-primary}

    For other release channels, and older builds, see the [SDK
    releases](/docs/development/tools/sdk/releases) page.

    要查看其他发行通道和以往的版本，请参阅 [SDK 版本列表](/docs/development/tools/sdk/releases) 页面。

 1. Extract the zip file and place the contained `flutter` in the desired
    installation location for the Flutter SDK
    (for example, `C:\src\flutter`; do not
    install Flutter in a directory like `C:\Program Files\` that requires
    elevated privileges).
    
    将压缩包解压，然后把其中的 `flutter` 目录整个放在你预想的 Flutter SDK 安装目录中（比如 `C:\src\flutter`；请勿将该目录放在一些需要额外操作权限的目录，比如 `C:\Program Files\`）。

 1. Locate the file `flutter_console.bat` inside the `flutter` directory.
    Start it by double-clicking.

    找到 `flutter` 目录中的 **flutter_console.bat** 文件，双击执行该批处理脚本。

You are now ready to run Flutter commands in the Flutter Console!

好的，现在你可以在控制台当中使用 Flutter 的命令了。

To update an existing version of Flutter,
see [Upgrading Flutter](/docs/development/tools/sdk/upgrading).

要升级本地已安装的 Flutter，请参阅 [升级 Flutter](/docs/development/tools/sdk/upgrading)。

### Update your path

### 更新 path 环境变量

If you wish to run Flutter commands in the regular Windows console,
take these steps to add Flutter to the `PATH` environment variable:

如果你想要在普通的 Windows 控制台中使用 Flutter 命令，
那就需要按照下面的步骤来将 Flutter 的二进制文件路径加入到 `PATH` 环境变量。

* From the Start search bar, type 'env' and select **Edit environment
  variables for your account**.

  在开始菜单的搜索功能键入“env”，然后选择 **编辑当前用户的环境变量**
  
* Under **User variables** check if there is an entry called **Path**:

  在 **用户变量** 一栏中，检查是否有 **Path** 这个条目：
  
  * If the entry does exist, append the full path to `flutter\bin` using `;` as a separator from existing values.

    如果存在，直接把 `flutter\bin` 目录的完整路径以 `;` 作为分隔加到已有的值后面。
    
  * If the entry does not exist, create a new user variable named `Path` with the full path to `flutter\bin` as its value.

    如果不存在的话，在用户环境变量中创建一个新的 `Path` 变量，然后将 `flutter\bin` 所在的完整路径作为新变量的值。

Note that you have to close and reopen any existing console windows
for these changes to take effect.

注意，你需要关闭和重新启动已经打开的各个控制台窗口，
这样下次启动控制台时才能访问到刚才修改的变量。

### Run `flutter doctor`

### 运行 `flutter doctor`

From a console window that has the Flutter directory in the path (see above),
run the following command to see if there are any platform dependencies you
need to complete the setup:

在将 `Path` 变量更新后，打开一个新的控制台窗口，然后将下面的命令输入进去执行。
如果它提示有任何的平台相关依赖，那么你就需要按照指示完成这些配置：

```console
C:\src\flutter>flutter doctor
```

This command checks your environment and displays a report of the status
of your Flutter installation. Check the output carefully for other
software you might need to install or further tasks to perform
(shown in **bold** text).

上述命令会检查你的现有环境，然后把检测结果以报告形式呈现出来。仔细阅读它显示的内容，检查是否有尚未安装的软件或是有其他的步骤需要完成（通常会以**粗体**呈现）。

For example:

举个例子：

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

下面的章节描述了如何执行报告中提到的任务来完成整体配置。每当按照报告安装了任何的依赖项，就可以执行 `flutter doctor` 来检查还有什么没有完成的。

{% include_relative _analytics.md %}
