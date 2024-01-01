---
title: Desktop support for Flutter
title: Flutter 桌面支持
description: General information about Flutter support for desktop apps.
description: Flutter 的桌面端支持相关说明和信息。
toc: true
tags: 文档
keywords: Flutter Desktop, Flutter 桌面版
---

Flutter provides support for compiling
a native Windows, macOS, or Linux desktop app.
Flutter's desktop support also extends to plugins&mdash;you
can install existing plugins that support the Windows,
macOS, or Linux platforms, or you can create your own.

桌面支持可以让你的 Flutter 代码编译成 Windows、macOS 或 Linux 的原生桌面应用。
Flutter 的桌面支持也允许插件拓展&mdash;
你可以使用已经支持了 Windows、macOS 或 Linux 平台的插件，或者创建你自己的插件来实现功能。

{{site.alert.note}}

  This page covers developing apps for all desktop
  platforms. Once you've read this, you can dive into
  specific platform information at the following links:

  本页面包含了所有桌面平台的应用开发内容。
  你阅读之后可以在以下链接中深入查看特定平台的内容。

  * [Building Windows apps with Flutter][]

    [通过 Flutter 开发 Windows 应用][Building Windows apps with Flutter]

  * [Building macOS apps with Flutter][]

    [通过 Flutter 开发 macOS 应用][Building macOS apps with Flutter]

  * [Building Linux apps with Flutter][]

    [通过 Flutter 开发 Linux 应用][Building Linux apps with Flutter]

{{site.alert.end}}

[Building Windows apps with Flutter]: {{site.url}}/platform-integration/windows/building
[Building macOS apps with Flutter]: {{site.url}}/platform-integration/macos/building
[Building Linux apps with Flutter]: {{site.url}}/platform-integration/linux/building

## Requirements

## 要求

To compile a desktop application,
you must build it **on** the targeted
platform: build a Windows application on Windows,
a macOS application on macOS,
and a Linux application on Linux.

要能够编译桌面应用，你必须 **在特定的平台** 上编译应用:
在 Windows 上构建 Windows 应用，在 macOS 上构建 macOS 应用，
在 Linux 上构建 Linux 应用。

To create a Flutter application with desktop support,
you need the following software:

要创建一个支持桌面的 Flutter 应用，你需要以下的软件：

* Flutter SDK. See the
  [Flutter SDK][] installation instructions.

  Flutter SDK，查看 [Flutter SDK][] 安装说明。

* Optional: An IDE that supports Flutter.
  You can install [Android Studio][], [IntelliJ IDEA][],
  or [Visual Studio Code][] and
  [install the Flutter and Dart plugins][]
  to enable language support and tools for refactoring,
  running, debugging, and reloading your desktop app
  within an editor. See [setting up an editor][]
  for more details.

  可选项：一个支持 Flutter 的 IDE。你可以安装 [Android Studio][]、
  [IntelliJ IDEA][] 或 [Visual Studio Code][]，并且需要
  [安装 Flutter 和 Dart 插件][install the Flutter and Dart plugins]。
  这些插件可以使 IDE 支持 Dart 语言，也为你提供了一些工具，
  如重构、允许、调试和重载桌面应用。详情请查看 [配置一个编辑器][setting up an editor]。

[Android Studio]: {{site.android-dev}}/studio/install
[Flutter SDK]: {{site.url}}/get-started/install
[install the Flutter and Dart plugins]: {{site.url}}/get-started/editor
[IntelliJ IDEA]: https://www.jetbrains.com/idea/download/
[setting up an editor]: {{site.url}}/get-started/editor
[Visual Studio Code]: {{site.url}}/tools/vs-code

### Additional Windows requirements

### Windows 的额外要求

For Windows desktop development,
you need the following in addition to the Flutter SDK:

要开发 Windows 桌面程序，除了 Flutter SDK，你还需要做以下准备:

* [Visual Studio 2022][] or [Visual Studio Build Tools 2022][]
  When installing Visual Studio or only the Build Tools,
  select the "Desktop development with C++" workload,
  including all of its default components,
  to install the necessary C++ toolchain and
  Windows SDK header files.

  [Visual Studio 2022][] 或 [Visual Studio 2022 生成工具][Visual Studio Build Tools 2022]
  在选择安装 Visual Studio 时或只安装生成工具的时候，
  你需要选择「使用 C++ 的桌面开发」，包括其所有默认组件，
  以安装必要的 C++ 工具链和 Windows SDK 的头文件。

{{site.alert.note}}

  **Visual Studio** is different than Visual Studio _Code_.

  **Visual Studio** 与 Visual Studio **Code** 不同。

{{site.alert.end}}

[Visual Studio 2022]: https://visualstudio.microsoft.com/downloads/
[Visual Studio Build Tools 2022]: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022

### Additional macOS requirements

### macOS 的额外要求

For macOS desktop development,
you need the following in addition to the Flutter SDK:

要开发 macOS 桌面程序，除了 Flutter SDK，你还需要做以下准备:

* [Xcode][] the full version of Xcode is required, not just the commandline tools

  完整安装版本的 [Xcode][]，不能只是安装了命令行工具的那种

* [CocoaPods][] if you use plugins

  如果使用插件，需要安装 [CocoaPods][]

[CocoaPods]: https://cocoapods.org/
[Xcode]: {{site.apple-dev}}/xcode/

### Additional Linux requirements

### Linux 的额外要求

For Linux desktop development,
you need the following in addition to the Flutter SDK:

要开发 Linux 桌面程序，除了 Flutter SDK，你还需要做以下准备:

{% include docs/linux-requirements-list.md %}

One easy way to install the Flutter SDK along with the necessary
dependencies is by using [snapd][].
For more information, see [Installing snapd][].

安装 Flutter SDK 和这些依赖，最简单方式的方式是使用 [snapd][]。
更多详细信息，可以查看 [安装 snapd][Installing snapd]。

Once you have `snapd`, you can install Flutter
using the [Snap Store][], or at the command line:

安装 `snapd` 后，你就可以使用 [Snap Store][] 安装 Flutter，
也可以在命令行进行安装:

```terminal
$ sudo snap install flutter --classic
```

Alternatively, if you prefer not to use `snapd`,
you can use the following command:

如果你在使用的 Linux 发行版上无法使用 `snapd`，你可以使用下面的命令行:

{% include docs/linux-requirements-command.md %}

[Snap Store]: https://snapcraft.io/store
[Installing snapd]: https://snapcraft.io/docs/installing-snapd
[snapd]: https://snapcraft.io/flutter

## Create a new project

## 创建一个新项目

You can use the following steps
to create a new project with desktop support.

你可以通过下列步骤，来创建一个支持桌面的新项目。

### Set up

### 配置步骤

On Windows, desktop support is enabled on
Flutter 2.10 or higher. On macOS and Linux,
desktop support is enabled on Flutter 3 or higher.

Flutter 2.10 以及更高版本中加入了对 Windows 操作系统的桌面端支持。
mac OS 和 Linux 的桌面端支持需要使用 Flutter 3 及更高版本。

You might run `flutter doctor` to see if
there are any unresolved issues.
You should see a checkmark for each successfully
configured area. It should look something like
the following on Windows,
with an entry for "develop for Windows":

你也可以运行 `flutter doctor` 来查看是否存在未解决的问题。
每一个成功的配置都有一个对勾，比如在 Windows 上你可能会看到如下内容:

```terminal
C:\> flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 3.0.0, on Microsoft Windows [Version 10.0.19044.1706], locale en-US)
[✓] Chrome - develop for the web
[✓] Visual Studio - develop for Windows (Visual Studio Professional 2022 17.2.0)
[✓] VS Code (version 1.67.2)
[✓] Connected device (3 available)
[✓] HTTP Host Availability

• No issues found!
```

On macOS, look for a line like this:

在 macOS 上，你可能会看到如下内容:

```terminal
[✓] Xcode - develop for iOS and macOS
```

On Linux, look for a line like this:

Linux 平台，你可能会看到如下内容：

```terminal
[✓] Linux toolchain - develop for Linux desktop
```

If `flutter doctor` finds problems or missing components
for a platform that you don't want to develop for,
you can ignore those warnings. Or you can disable the
platform altogether using the `flutter config` command,
for example:

在执行 `flutter doctor` 命令时如果发现有不需要支持的平台的问题或者组件缺少报错等提示，
你可以忽略这些警告，或者使用 `flutter config` 命令来禁用这个平台，比如：

```terminal
$ flutter config --no-enable-ios
```

Other available flags:

其他可用的参数：

* `--no-enable-windows-desktop`
* `--no-enable-linux-desktop`
* `--no-enable-macos-desktop`
* `--no-enable-web`
* `--no-enable-android`
* `--no-enable-ios`

After enabling desktop support,
restart your IDE so that it can detect the new device.

加入了桌面端支持之后，请重启你的 IDE，然后 IDE 就能检测到新的设备了。

### Create and run

### 创建和运行

Creating a new project with desktop support is no different
than [creating a new Flutter project][] for other platforms.

创建一个桌面支持的新项目，与在其他平台
[创建新的 Flutter 项目][creating a new Flutter project]
没什么不同的地方。

Once you've configured your environment for desktop
support, you can create and run a desktop application
either in the IDE or from the command line.

一旦配置好了桌面支持的环境，
你可以通过 IDE 或命令行创建和运行桌面程序。

[creating a new Flutter project]: {{site.url}}/get-started/test-drive

#### Using an IDE

#### 使用 IDE

After you've configured your environment to support
desktop, make sure you restart the IDE if it was
already running.

在你配置好桌面支持的环境后，记得重启已经在运行的 IDE。

Create a new application in your IDE and it automatically
creates iOS, Android, web, and desktop versions of your app.
From the device pulldown, select **windows (desktop)**,
**macOS (desktop)**, or **linux (desktop)**
and run your application to see it launch on the desktop.

在你的 IDE 中创建新应用时，它会自动创建 iOS、 Android 和应用的桌面版本。
从设备的下拉选项中，选择 **windows (desktop)**、
**macOS (desktop)** 或 **linux (desktop)**
然后运行你的应用，就会看到应用在桌面启动。

[web support]: {{site.url}}/get-started/web

#### From the command line

#### 使用命令行

To create a new application that includes desktop support
(in addition to mobile and web support), run the following commands,
substituting `my_app` with the name of your project:

想要创建一个包含桌面支持的新应用（除了支持移动和 Web），请运行下面的命令，
将 `my_app` 替换成你项目的名称：

```terminal
$ flutter create my_app
$ cd my_app
```

To launch your application from the command line,
enter one of the following commands from the top
of the package:

想要从命令行启动你的应用，可以在根目录执行以下命令之一：

```terminal
C:\> flutter run -d windows
$ flutter run -d macos
$ flutter run -d linux
```

{{site.alert.note}}
  If you do not supply the `-d` flag, `flutter run` lists
  the available targets to choose from.
{{site.alert.end}}

## Build a release app

## 创建 release 版本的应用

To generate a release build,
run one of the following commands:

要生成 release 版本，可以运行以下命令之一：

```terminal
PS C:\> flutter build windows
$ flutter build macos
$ flutter build linux
```

## Add desktop support to an existing Flutter app

## 为已有的应用添加桌面支持

To add desktop support to an existing Flutter project,
run the following command in a terminal from the
root project directory:

想为已有的 Flutter 项目添加桌面支持，你可以从项目根目录在控制台运行下面命令：

```terminal
$ flutter create --platforms=windows,macos,linux .
```

This adds the necessary desktop files and directories
to your existing Flutter project.
To add only specific desktop platforms,
change the `platforms` list to include only
the platform(s) you want to add.

这将会在你的 Flutter 桌面项目中添加必要的已有文件和文件夹。
如果需要只添加特定平台桌面端的支持，修改 `platforms` 的值
为你想要支持的平台即可。

## Plugin support

## 插件支持

Flutter on the desktop supports using and creating plugins.
To use a plugin that supports desktop,
follow the steps for plugins in [using packages][].
Flutter automatically adds the necessary native code
to your project, as with any other platform.

Flutter 在桌面支持中使用和创建插件。
使用支持桌面端的插件，可以根据文档
[在 Flutter 里使用 Packages][using packages]
中描述的内容进行操作。
Flutter 会像在其他平台中一样的操作，
自动将需要的原生平台代码加入到你的工程中。

### Writing a plugin

### 编写一个插件

When you start building your own plugins,
you'll want to keep federation in mind.
Federation is the ability to define several
different packages, each targeted at a
different set of platforms, brought together
into a single plugin for ease of use by developers.
For example, the Windows implementation of the
`url_launcher` is really `url_launcher_windows`,
but a Flutter developer can simply add the
`url_launcher` package to their `pubspec.yaml`
as a dependency and the build process pulls in
the correct implementation based on the target platform.
Federation is handy because different teams with
different expertise can build plugin implementations
for different platforms.
You can add a new platform implementation to any
endorsed federated plugin on pub.dev,
so long as you coordinate this effort with the
original plugin author.

当你开始构建自己的插件时，你需要记住联合。联合是定义几个不同包的能力，
其中每个包都针对不同的平台，将它们合并到一个插件中，这样方便开发人员使用。
比如，Windows 实现的 `url_launcher`，实际是通过 `url_launcher_windows` 完成的，
但是 Flutter 开发者可以在 `pubspec.yaml` 中，
简单地添加 `url_launcher` 包作为依赖，在构建过程中会基于目标平台引入正确的实现。
联合非常方便，因为具有不同专长的不同团队，可以为不同的平台构建相应的插件实现。
与原插件作者协调之后，你可以为 pub.dev 上任何联合插件添加新的平台实现。

For more information, including information
about endorsed plugins, see the following resources:

想要了解更多信息，包括关于已支持的插件信息，请参阅以下资源:

* [Developing packages and plugins][], particularly the
  [Federated plugins][] section.

  [开发包和插件][Developing packages and plugins]，特别是 [联合插件][Federated plugins] 部分。

* [How to write a Flutter web plugin, part 2][],
  covers the structure of federated plugins and
  contains information applicable to desktop
  plugins.

  [如何写一个 Flutter web 插件，第 2 部分][How to write a Flutter web plugin, part 2]，
  介绍联合插件的结构，并包含适用于桌面插件的信息。

* [Modern Flutter Plugin Development][] covers
  recent enhancements to Flutter's plugin support.

  [现代 Flutter 插件开发][Modern Flutter Plugin Development]
  介绍了最近对 Flutter 插件支持的增强。

[using packages]: {{site.url}}/packages-and-plugins/using-packages
[Developing packages and plugins]: {{site.url}}/packages-and-plugins/developing-packages
[Federated plugins]: {{site.url}}/packages-and-plugins/developing-packages#federated-plugins
[How to write a Flutter web plugin, part 2]: {{site.flutter-medium}}/how-to-write-a-flutter-web-plugin-part-2-afdddb69ece6
[Modern Flutter Plugin Development]: {{site.flutter-medium}}/modern-flutter-plugin-development-4c3ee015cf5a

## Samples and codelabs

## Codelab 和 Flutter 文档

[Write a Flutter desktop application][]
<br> A codelab that walks you through building
a desktop application that integrates the GitHub
GraphQL API with your Flutter app.

[构建一个 Flutter 桌面程序][Write a Flutter desktop application]
<br> 这个 codelab 会引导你通过使用 Flutter，
来构建一个集成 GitHub GraphQL API 的桌面应用。

You can run the following samples as desktop apps,
as well as download and inspect the source code to
learn more about Flutter desktop support.

你可以运行下面的桌面应用案例，也可以下载并阅读源代码，
以了解更多关于 Flutter 桌面支持的信息。

Flutter Gallery [running web app][], [repo][flutter-gallery-repo]
<br> A samples project hosted on GitHub to help developers
  evaluate and use Flutter. The Gallery consists of a
  collection of Material design widgets, behaviors,
  and vignettes implemented with Flutter.
  You can clone the project and run Gallery as a desktop app
  by following the instructions provided in the [README][].

Flutter Gallery [线上运行的 Web 应用][running web app]，[源代码仓库地址][flutter-gallery-repo]
<br> 一个托管在 GitHub 上案例项目，可以用来帮助开发人员评估和使用 Flutter。
  Gallery 的构成部分有：Material design widgets 的集合、
  behaviors 和用 Flutter 实现的 vignettes。
  你可以克隆该项目，并按照 [README][] 中的说明，将 Gallery 作为桌面应用程序运行。

Flokk [announcement blogpost][gskinner-flokk-blogpost], [repo][gskinner-flokk-repo]
<br> A Google contacts manager that integrates with GitHub and Twitter.
  It syncs with your Google account, imports your contacts,
  and allows you to manage them.

Flokk [官宣文章][gskinner-flokk-blogpost]，[源代码仓库地址][gskinner-flokk-repo]
<br> 一款集成了 GitHub 和 Twitter 的谷歌联系人管理器应用。
  可以从你的 Google 账户同步数据，导入联系人信息，并管理它们。

[Photo Search app][]
<br> A sample application built as a desktop application that
  uses desktop-supported plugins.

[图片搜索应用][Photo Search app]
<br> 使用支持桌面端的插件构建的一个桌面应用案例。

[Photo Search app]: {{site.repo.samples}}/tree/main/desktop_photo_search
[running web app]: {{site.gallery}}
[flutter-gallery-repo]: {{site.repo.gallery}}
[README]: {{site.repo.gallery}}#readme
[gskinner-flokk-repo]: {{site.github}}/gskinnerTeam/flokk
[gskinner-flokk-blogpost]: https://blog.gskinner.com/archives/2020/09/flokk-how-we-built-a-desktop-app-using-flutter.html
[Write a Flutter desktop application]: {{site.codelabs}}/codelabs/flutter-github-client
