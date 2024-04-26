---
title: "flutter: The Flutter command-line tool"
title: Flutter 命令行文档
description: "The reference page for using 'flutter' in a terminal window."
description: 在终端中使用 "flutter" 命令的指南。
---

The `flutter` command-line tool is how developers (or IDEs on behalf of
developers) interact with Flutter. For Dart related commands,
you can use the [`dart`][] command-line tool.

开发者（或 IDE）可以使用 `flutter` 命令行工具与 Flutter 的相关功能进行交互。
对于 Dart 相关的命令，你可以使用 [`dart`][] 命令行工具。

Here's how you might use the `flutter` tool to create, analyze, test, and run an
app:

以下命令让你可以使用 `flutter` 命令行工具来创建、分析、测试以及运行一个应用程序：

```console
$ flutter create my_app
$ cd my_app
$ flutter analyze
$ flutter test
$ flutter run lib/main.dart
```

To run [`pub`][`dart pub`] commands using the `flutter` tool:

使用 `flutter` 命令行工具运行 [`pub`][`dart pub`] 相关命令：

```console
$ flutter pub get
$ flutter pub outdated
$ flutter pub upgrade
```

To view all commands that `flutter` supports:

查看 `flutter` 所有支持的命令：

```console
$ flutter --help --verbose
```

To get the current version of the Flutter SDK, including its framework, engine,
and tools:

获取当前版本 Flutter SDK 的信息（包含框架、引擎和相关工具）：

```console
$ flutter --version
```

## `flutter` commands

## `flutter` 命令

The following table shows which commands you can use with the `flutter` tool:

下表列举了你可以使用的 `flutter` 命令：

| <t>Command</t><t>命令</t> | <t>Example of use</t><t>示例</t> | <t>More information</t><t>描述</t> |
|-----------------|------------------------------------------------|-----------------------------------------------------------------------------------|
| analyze | `flutter analyze -d <DEVICE_ID>`     | Analyzes the project's Dart source code.<br>Use instead of [`dart analyze`][]. |
| analyze | `flutter analyze -d <DEVICE_ID>`     | 分析项目的 Dart 源码。<br>该命令用来替代 [`dart analyze`][]。 |
| assemble | `flutter assemble -o <DIRECTORY>` | Assemble and build flutter resources. |
| assemble | `flutter assemble -o <DIRECTORY>` | 组建和构建 Flutter 资源。 |
| attach | `flutter attach -d <DEVICE_ID>` | Attach to a running application. |
| attach | `flutter attach -d <DEVICE_ID>` | 连接到运行中的应用程序。 |
| bash-completion | `flutter bash-completion` | Output command line shell completion setup scripts. |
| bash-completion | `flutter bash-completion` | 输出 Shell 命令行设置的脚本。 |
| build | `flutter build <DIRECTORY>` | Flutter build commands. |
| build | `flutter build <DIRECTORY>` | Flutter 构建命令。 |
| channel | `flutter channel <CHANNEL_NAME>` | List or switch flutter channels. |
| channel | `flutter channel <CHANNEL_NAME>` | 列出或切换 Flutter 的渠道分支 |
| clean | `flutter clean` | Delete the `build/` and `.dart_tool/` directories. |
| clean | `flutter clean` | 删除 `build/` 和 `.dart_tool/` 目录。 |
| config | `flutter config --build-dir=<DIRECTORY>` | Configure Flutter settings. To remove a setting, configure it to an empty string. |
| config | `flutter config --build-dir=<DIRECTORY>` | 设置 Flutter 配置项。如果你需要删除一个配置项，请将该配置项的值置空。 |
| create  | `flutter create <DIRECTORY>`      | Creates a new project. |
| create  | `flutter create <DIRECTORY>`      | 创建一个新项目。 |
| custom-devices  | `flutter custom-devices list` | Add, delete, list, and reset custom devices. |
| custom-devices  | `flutter custom-devices list` | 添加、删除、列出或重置定制的设备。 |
| devices | `flutter devices -d <DEVICE_ID>` | List all connected devices. |
| devices | `flutter devices -d <DEVICE_ID>` | 列出所有连接的设备。 |
| doctor | `flutter doctor` | Show information about the installed tooling. |
| doctor | `flutter doctor` | 显示相关已安装工具的信息。 |
| downgrade | `flutter downgrade` | Downgrade Flutter to the last active version for the current channel. |
| downgrade | `flutter downgrade` | 将 Flutter 降级到当前渠道分支的上一个有效版本。 |
| drive | `flutter drive` | Runs Flutter Driver tests for the current project. |
| drive | `flutter drive` | 运行当前项目的 Flutter 测试。 |
| emulators | `flutter emulators` | List, launch and create emulators. |
| emulators | `flutter emulators` | 列出、启动或创建模拟器。 |
| gen-l10n | `flutter gen-l10n <DIRECTORY>` | Generate localizations for the Flutter project. |
| gen-l10n | `flutter gen-l10n <DIRECTORY>` | 为 Flutter 项目生成 l10n 本地化。 |
| install | `flutter install -d <DEVICE_ID>` | Install a Flutter app on an attached device. |
| install | `flutter install -d <DEVICE_ID>` | 在连接的设备上安装 Flutter 应用程序。 |
| logs | `flutter logs` | Show log output for running Flutter apps. |
| logs | `flutter logs` | 显示运行中的 Flutter 应用程序的日志内容。 |
| precache | `flutter precache <ARGUMENTS>` | Populates the Flutter tool's cache of binary artifacts. |
| precache | `flutter precache <ARGUMENTS>` | 下载并预缓存 Flutter 相关平台工具的二进制文件 |
| pub     | `flutter pub <PUB_COMMAND>`       | Works with packages.<br>Use instead of [`dart pub`][]. |
| pub     | `flutter pub <PUB_COMMAND>`       | package 的相关操作命令。<br>该命令用来替代 [`dart pub`][]。 |
| run     | `flutter run <DART_FILE>`         | Runs a Flutter program. |
| run     | `flutter run <DART_FILE>`         | 运行 Flutter 应用程序。 |
| screenshot | `flutter screenshot` | Take a screenshot of a Flutter app from a connected device. |
| screenshot | `flutter screenshot` | 在连接的设备上对 Flutter 应用程序进行截图。 |
| symbolize | `flutter symbolize --input=<STACK_TRACK_FILE>` | Symbolize a stack trace from the AOT compiled flutter application. |
| symbolize | `flutter symbolize --input=<STACK_TRACK_FILE>` | 读取并解析 Flutter 应用程序中 AOT 编译的堆栈跟踪信息。 |
| test    | `flutter test [<DIRECTORYDART_FILE>]` | Runs tests in this package.<br>Use instead of [`dart test`][`dart test`]. |
| test    | `flutter test [<DIRECTORYDART_FILE>]` | 运行测试<br>该命令用来替代 [`dart test`][]。 |
| upgrade | `flutter upgrade` | Upgrade your copy of Flutter. |
| upgrade | `flutter upgrade` | 升级你的 Flutter 版本。 |

{:.table .table-striped .nowrap}

For additional help on any of the commands, enter `flutter help <command>`
or follow the links in the **More information** column.
You can also get details on `pub` commands — for example,
`flutter help pub outdated`.

对于 flutter 命令的其他帮助信息，请输入 `flutter help <command>` 获取，
或根据上面表格 **描述** 栏内的链接，获取对应命令的相关信息。
你还可以获取关于 `pub` 命令的帮助信息 —— 例如，
`flutter help pub outdated`。

[`dart`]: {{site.dart-site}}/tools/dart-tool
[`dart analyze`]: {{site.dart-site}}/tools/dart-analyze
[`dart format`]: {{site.dart-site}}/tools/dart-format
[`dart pub`]: {{site.dart-site}}/tools/dart-pub
[`dart test`]: {{site.dart-site}}/tools/dart-test
