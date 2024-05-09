## Get the Flutter SDK {:#get-sdk}

## 获取 Flutter SDK

{% include docs/china-notice.md %}

 1. Install the core development tools needed for Flutter:

    安装 Flutter 所需的核心开发工具：

    ```console
    $ sudo apt install clang cmake ninja-build pkg-config libgtk-3-dev
    ```

    This downloads the compiler toolchain needed
    to compile apps for ChromeOS.

    这会下载用于编译 ChromeOS 应用所需的编译器工具链。

 1. Download Flutter from the [Flutter repo][]
    on GitHub with the following command in your home directory:

    从 GitHub 的 [Flutter repo][] 下载 Flutter，
    在你的主目录使用以下命令：

    ```console
    $ git clone https://github.com/flutter/flutter.git -b stable
    ```

 1. Add the `flutter` tool to your path:

    将 `flutter` 工具添加到环境变量中：

    ```console
    $ echo PATH="$PATH:`pwd`/flutter/bin" >> ~/.profile
    $ source ~/.profile
    ```

You are now ready to run Flutter commands!

你现在已经准备好运行 Flutter 命令了！

### Run flutter doctor

### 运行 flutter doctor

Run the following command to see if there are any dependencies you need to
install to complete the setup (for verbose output, add the `-v` flag):

运行以下命令以查看是否还有缺失的依赖需要安装，你需要安装这些依赖以完成设置
（要看到详细输出，请添加 `-v` 标识）：

```console
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
    <strong>✗ Unable to locate Android SDK.
    Install Android Studio from:
    https://developer.android.com/studio/index.html</strong>
</pre>

The following sections describe how to perform these tasks and finish the setup
process.

上面的部分描述了如何执行这些任务，并完成设置流程。

Once you have installed any missing dependencies, run the `flutter doctor`
command again to verify that you've set everything up correctly.

当你已经安装了全部缺失的依赖之后，请再次运行 `flutter doctor` 命令，
以验证你是否是真的全部正确设置完毕了。

{% include docs/install/deprecated/analytics.md %}

[Flutter repo]: {{site.repo.flutter}}
