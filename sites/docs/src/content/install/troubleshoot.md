---
# title: Troubleshooting installation
title: 安装问题排查
# shortTitle: Troubleshoot
shortTitle: 排查
# description: >-
#   Get help with common installation issues that new
#   Flutter developers might have run into.
description: 获取常见安装问题的帮助，这些问题可能是新 Flutter 开发者会遇到的。
ai-translated: true
---

This page describes some common installation issues that
new Flutter users have encountered and offers suggestions
on how to resolve them.

本页介绍一些新 Flutter 用户遇到的常见安装问题，
并提供解决建议。

If you are still experiencing problems after
using this page, consider reaching out to any of
the resources listed under [community support channels][].
To add a topic to this page or make a correction,
you can [file an issue][] or
submit a [pull request][] on GitHub.

若使用本页后问题仍未解决，
可考虑通过 [社区支持渠道][community support channels] 中列出的资源寻求帮助。
要为本页添加主题或提交更正，
你可以在 GitHub 上 [提交 issue][file an issue] 或
发起 [pull request][pull request]。

[community support channels]: #community-support
[file an issue]: {{site.github}}/flutter/website/issues/new
[pull request]: {{site.github}}/flutter/website/pulls

## Get the Flutter SDK

## 获取 Flutter SDK

### Unable to find the `flutter` command

### 找不到 `flutter` 命令

__What does this issue look like?__

__这个问题看起来是怎样的？__

When you try to run the `flutter` command,
the console fails to find it.
The error usually looks as follows:

当你尝试运行 `flutter` 命令时，
终端找不到该命令。
错误通常如下所示：

```plaintext
'flutter' is not recognized as an internal or external command operable program or batch file
```

Error messages on macOS and Linux could look slightly different from
the one on Windows.

macOS 和 Linux 上的错误信息可能与 Windows 上的略有不同。

__Explanation and suggestions__

__说明与建议__

Did you add Flutter to the `PATH` environment variable for your platform?
On Windows, follow these [instructions for adding a command
to your path][windows path].

你是否已将 Flutter 添加到你所在平台的 `PATH` 环境变量？
在 Windows 上，请按照这些 [将命令添加到你的 PATH 的说明][windows path] 操作。

If you've already [set up VS Code][] for Flutter development,
you can use the Flutter extension's **Locate SDK** prompt
to identify the location of your `flutter` folder.

若你已为 Flutter 开发 [配置 VS Code][set up VS Code]，
可以使用 Flutter 扩展的 **Locate SDK** 提示
来定位你的 `flutter` 文件夹位置。

See also: [Configuring PATH and Environment Variables - Dart Code][config path]

另请参阅：[Configuring PATH and Environment Variables - Dart Code][config path]

[windows path]: https://www.wikihow.com/Change-the-PATH-Environment-Variable-on-Windows
[set up VS Code]: /tools/vs-code#setup
[config path]: https://dartcode.org/docs/configuring-path-and-environment-variables/

### Flutter in special folders

### Flutter 位于特殊文件夹中

__What does this issue look like?__

__这个问题看起来是怎样的？__

Running your Flutter project produces an error like the following:

运行 Flutter 项目时会出现类似以下的错误：

```plaintext
The Flutter SDK is installed in a protected folder and may not function correctly.
Please move the SDK to a location that is user-writable without Administration permissions and restart.
```

__Explanation and suggestions__

__说明与建议__

On Windows, this usually happens when Flutter is installed
in a directory like
`C:\Program Files\` that requires elevated privileges.
Try relocating Flutter to a different folder,
such as `C:\src\flutter`.

在 Windows 上，这通常发生在将 Flutter 安装在
`C:\Program Files\` 等需要提升权限的目录时。
请尝试将 Flutter 移到其他文件夹，
例如 `C:\src\flutter`。

### Invoke-Expression: You cannot call a method on a null-valued expression

### Invoke-Expression：无法对空值表达式调用方法

__What does this issue look like?__

__这个问题看起来是怎样的？__

When running `flutter doctor` on Windows, you might see an error like:

在 Windows 上运行 `flutter doctor` 时，你可能会看到类似以下的错误：

```plaintext
Invoke-Expression : You cannot call a method on a null-valued expression.
At ...\update_engine_version.ps1:60 char:20
```

__Explanation and suggestions__

__说明与建议__

This error typically occurs when the `SystemRoot` environment variable is missing
or when the PowerShell execution policy prevents the script from running correctly.

此错误通常发生在缺少 `SystemRoot` 环境变量时，
或 PowerShell 执行策略阻止脚本正常运行时。

To resolve this:

要解决此问题：

1.  **Run as Administrator**:
    Open your PowerShell terminal as an Administrator.

1.  **以管理员身份运行**：
    以管理员身份打开 PowerShell 终端。

2.  **Check Environment Variables**:
    Ensure the `SystemRoot` environment variable is set (usually to `C:\Windows`). You can check its value by running `echo $env:SystemRoot` in your PowerShell terminal.

2.  **检查环境变量**：
    确保已设置 `SystemRoot` 环境变量（通常为 `C:\Windows`）。你可以在 PowerShell 终端中运行 `echo $env:SystemRoot` 来检查其值。

3.  **Check Execution Policy**:
    If the issue persists, you might need to adjust your execution policy.
    Run the following command in an Administrator PowerShell window:

3.  **检查执行策略**：
    若问题仍然存在，你可能需要调整执行策略。
    在管理员 PowerShell 窗口中运行以下命令：

    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```

## Android setup

## Android 配置

### Having multiple versions of Java installed

### 安装了多个 Java 版本

__What does this issue look like?__

__这个问题看起来是怎样的？__

The command `flutter doctor --android-licenses` fails.
Running `flutter doctor --verbose` gives an error message
like the following:

命令 `flutter doctor --android-licenses` 失败。
运行 `flutter doctor --verbose` 会显示类似以下的错误信息：

```plaintext
java.lang.UnsupportedClassVersionError: com/android/prefs/AndroidLocationsProvider
has been compiled by a more recent version of the Java Runtime (class file version 55.0),
this version of the Java Runtime only recognizes class file versions up to 52.0
```

__Explanation and suggestions__

__说明与建议__

The error occurs when an older version of the
Java Development Kit (JDK)
is installed on your computer.

当你的计算机上安装了较旧版本的
Java Development Kit（JDK）时会出现此错误。

If you don't need multiple versions of Java,
uninstall existing JDKs from your computer.
Flutter automatically uses the JDK included in Android Studio.

若你不需要多个 Java 版本，
请从计算机上卸载现有的 JDK。
Flutter 会自动使用 Android Studio 自带的 JDK。

If you do need another version of Java,
try the workaround described in
[this GitHub issue][java binary path]
until a long-term solution is implemented.
For more information,
check out the [Android Java Gradle migration guide][]
or [flutter doctor --android-licenses not working due to
    java.lang.UnsupportedClassVersionError - Stack Overflow][so java version].

若你确实需要其他 Java 版本，
在长期方案实施之前，可尝试
[this GitHub issue][java binary path] 中描述的变通方法。
更多信息请参阅 [Android Java Gradle 迁移指南][Android Java Gradle migration guide]
或 [flutter doctor --android-licenses not working due to
    java.lang.UnsupportedClassVersionError - Stack Overflow][so java version]。

[java binary path]: {{site.repo.flutter}}/issues/106416#issuecomment-1522198064
[Android Java Gradle migration guide]: /release/breaking-changes/android-java-gradle-migration-guide
[so java version]: {{site.so}}/questions/75328050/

### `cmdline-tools` component is missing

### 缺少 `cmdline-tools` 组件

__What does this issue look like?__

__这个问题看起来是怎样的？__

The `flutter doctor` command complains that the
`cmdline-tools` are missing from the Android toolchain.
For example:

`flutter doctor` 命令会提示 Android 工具链中
缺少 `cmdline-tools`。
例如：

```plaintext noHighlight
[!] Android toolchain - develop for Android devices (Android SDK version 33.0.2)
    • Android SDK at C:\Users\My PC\AppData\Local\Android\sdk
    X cmdline-tools component is missing
```

__Explanation and suggestions__

__说明与建议__

The easiest way to get the cmdline-tools is through the
SDK Manager in Android Studio.
To do this, use the following instructions:

获取 cmdline-tools 的最简单方式是通过 Android Studio 中的
SDK Manager。
请按以下步骤操作：

1. Open the SDK Manager from Android Studio by
   selecting **Tools > SDK Manager** from the menu bar.

   在 Android Studio 中，从菜单栏选择 **Tools > SDK Manager** 打开 SDK Manager。

2. Select the latest Android SDK
   (or a specific version that your app requires),
   Android SDK Command-line Tools, and Android SDK Build-Tools.

   选择最新的 Android SDK
   （或你的应用所需的特定版本）、
   Android SDK Command-line Tools 以及 Android SDK Build-Tools。

3. Click **Apply** to install the selected artifacts.

   点击 **Apply** 安装所选组件。

![Android Studio SDK Manager](/assets/images/docs/get-started/install_android_tools.png)

If you're not using Android Studio,
you can download the tools using the
[sdkmanager][] command-line tool.

若你未使用 Android Studio，
可以使用 [sdkmanager][] 命令行工具下载这些工具。

[sdkmanager]: {{site.android-dev}}/studio/command-line/sdkmanager

## macOS setup

## macOS 配置

### SocketException: Send failed, OS Error: No route to host, errno = 65

### SocketException：发送失败，OS 错误：No route to host，errno = 65

__What does this issue look like?__

__这个问题看起来是怎样的？__

On macOS, the `flutter run` command produces an error like:

在 macOS 上，`flutter run` 命令会产生类似以下的错误：

```plaintext
$ flutter run
Launching lib/main.dart in debug mode...
...
Installing and launching...
Oops; flutter has exited unexpectedly: "SocketException: Send failed (OS Error: No route to host, errno = 65), address = 0.0.0.0, port = 5353".
```

__Explanation and suggestions__

__说明与建议__

This issue is related to macOS permissions.

此问题与 macOS 权限有关。

To fix this:

要解决此问题：

1. Upgrade your Flutter SDK to the latest version.

1. 将 Flutter SDK 升级到最新版本。

2. Open **System Settings** > **Privacy & Security** > **Local Network**.
   Toggle on the permission for all the code editors and terminals you use to
   launch Flutter apps.
   You might need to restart your code editor, terminal, and physical device.

2. 打开 **System Settings** > **Privacy & Security** > **Local Network**。
   为你用于启动 Flutter 应用的所有代码编辑器和终端开启权限。
   你可能需要重启代码编辑器、终端和实体设备。

## Other problems

## 其他问题

### Exit code 69

### 退出代码 69

__What does this issue look like?__

__这个问题看起来是怎样的？__

Running a `flutter` command produces an "exit code: 69" error,
as shown in the following example:

运行 `flutter` 命令会出现「exit code: 69」错误，
如下例所示：

```plaintext
Running "flutter pub get" in flutter_tools...
Resolving dependencies in .../flutter/packages/flutter_tools... (28.0s)
Got TLS error trying to find package test at https://pub.dev/.
pub get failed
command:
".../flutter/bin/cache/dart-sdk/bin/
dart __deprecated_pub --color --directory
.../flutter/packages/flutter_tools get --example"
pub env: {
  "FLUTTER_ROOT": ".../flutter",
  "PUB_ENVIRONMENT": "flutter_cli:get",
  "PUB_CACHE": ".../.pub-cache",
}
exit code: 69
```

__Explanation and suggestions__

__说明与建议__

This issue is related to networking.
Try the following instructions to troubleshoot:

此问题与网络有关。
请尝试以下步骤进行排查：

* Check your internet connection.
  Make sure that you're connected to the
  internet and that your connection is stable.

  检查你的网络连接。
  确保你已连接到互联网且连接稳定。

* Restart your devices, including your computer
  and networking equipment.

  重启你的设备，包括计算机和网络设备。

* Use a VPN to help to bypass any restrictions that
  might prevent you from connecting to the network.

  使用 VPN 以帮助绕过可能阻止你连接网络的限制。

* If you have tried all of these steps and are
  still getting the error, print out verbose logs
  with the `flutter doctor -v` command and ask for help in
  one of the [community support channels][].

  若你已尝试以上所有步骤仍出现错误，
  请使用 `flutter doctor -v` 命令输出详细日志，
  并在 [社区支持渠道][community support channels] 之一寻求帮助。

[community support channels]: #community-support

## Community support

## 社区支持

The Flutter community is helpful and welcoming.
If none of the above suggestions solves your installation issue,
consider asking for support from one of the following channels:

Flutter 社区乐于助人、氛围友好。
若以上建议都无法解决你的安装问题，
可考虑通过以下渠道之一寻求帮助：

* [/r/flutterhelp](https://www.reddit.com/r/flutterhelp/) on Reddit

  Reddit 上的 [/r/flutterhelp](https://www.reddit.com/r/flutterhelp/)

* [/r/flutterdev](https://discord.gg/rflutterdev) on Discord,
  particularly the `install-and-setup` channel on this server.

  Discord 上的 [/r/flutterdev](https://discord.gg/rflutterdev)，
  尤其是该服务器上的 `install-and-setup` 频道。

* [StackOverflow][],
  in particular, questions tagged with [#flutter][] or [#dart][].
* [StackOverflow][]，
  尤其是带有 [#flutter][] 或 [#dart][] 标签的问题。

To be respectful of everyone's time,
search the archive for a similar issue before posting a new one.

为尊重每个人的时间，
在发布新问题前请先搜索归档中是否有类似问题。

[StackOverflow]: {{site.so}}
[#dart]: {{site.so}}/questions/tagged/dart
[#flutter]: {{site.so}}/questions/tagged/flutter
