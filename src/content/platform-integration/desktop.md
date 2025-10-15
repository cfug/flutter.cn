---
# title: Desktop support for Flutter
title: Flutter 桌面支持
# description: General information about Flutter support for desktop apps.
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

:::note

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


:::

[Building Windows apps with Flutter]: /platform-integration/windows/building
[Building macOS apps with Flutter]: /platform-integration/macos/building
[Building Linux apps with Flutter]: /platform-integration/linux/building

## Create a new project

## 创建一个新项目

You can use the following steps
to create a new project with desktop support.

你可以通过下列步骤，来创建一个支持桌面的新项目。

### Set up desktop devtools

### 配置桌面开发工具

Consult the guide for your target desktop environment:

请参考你对应系统环境的桌面开发工具指南：

* [Install Linux desktop devtools][Linux-devtools]

  [安装 Linux 桌面开发工具][Linux-devtools]

* [Install macOS desktop devtools][macOS-devtools]

  [安装 macOS 桌面开发工具][macOS-devtools]

* [Install Windows desktop devtools][Windows-devtools]

  [安装 Windows 桌面开发工具][Windows-devtools]

[Linux-devtools]: /platform-integration/linux/setup#set-up-tooling
[macOS-devtools]: /platform-integration/macos/setup#set-up-tooling
[Windows-devtools]: /platform-integration/windows/setup#set-up-tooling

If `flutter doctor` finds problems or missing components
for a platform that you don't want to develop for,
you can ignore those warnings. Or you can disable the
platform altogether using the `flutter config` command,
for example:

在执行 `flutter doctor` 命令时如果发现有不需要支持的平台的问题或者组件缺少报错等提示，
你可以忽略这些警告，或者使用 `flutter config` 命令来禁用这个平台，比如：

```console
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
from [creating a new Flutter project][] for other platforms.

创建一个桌面支持的新项目，与在其他平台
[创建新的 Flutter 项目][creating a new Flutter project]
没什么不同的地方。

Once you've configured your environment for desktop
support, you can create and run a desktop application
either in the IDE or from the command line.

一旦配置好了桌面支持的环境，
你可以通过 IDE 或命令行创建和运行桌面程序。

[creating a new Flutter project]: /reference/create-new-app

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

#### From the command line

#### 使用命令行

To create a new application that includes desktop support
(in addition to mobile and web support), run the following commands,
substituting `my_app` with the name of your project:

想要创建一个包含桌面支持的新应用（除了支持移动和 Web），请运行下面的命令，
将 `my_app` 替换成你项目的名称：

```console
$ flutter create my_app
$ cd my_app
```

To launch your application from the command line,
enter one of the following commands from the top
of the package:

想要从命令行启动你的应用，可以在根目录执行以下命令之一：

```console
C:\> flutter run -d windows
$ flutter run -d macos
$ flutter run -d linux
```

:::note
If you do not supply the `-d` flag, `flutter run` lists
the available targets to choose from.
:::

## Build a release app

## 创建 release 版本的应用

To generate a release build,
run one of the following commands:

要生成 release 版本，可以运行以下命令之一：

```console
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

```console
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

[using packages]: /packages-and-plugins/using-packages
[Developing packages and plugins]: /packages-and-plugins/developing-packages
[Federated plugins]: /packages-and-plugins/developing-packages#federated-plugins
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

Wonderous app [running app][wonderous-app], [repo][wonderous-repo]
<br> A showcase app that uses Flutter to create a highly expressive user interface.
  Wonderous focuses on delivering an accessible and high-quality user experience
  while including engaging interactions and novel animations.
  To run Wonderous as a desktop app, clone the project and
  follow the instructions provided in the [README][wonderous-readme].

Wonderous 应用 [在线访问][wonderous-app]，[源代码仓库地址][wonderous-repo]
<br> 这是一款使用 Flutter 创建的应用，它拥有极具表现力的用户界面。
  Wonderous 专注于提供可访问的高质量用户体验，
  同时包含引人入胜的交互体验以及新颖的动画效果。
  如果你想要将 Wonderous 作为桌面应用运行，
  你可以克隆该项目，并按照 [README][wonderous-readme] 中的说明进行体验。

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

[wonderous-app]: {{site.wonderous}}/web
[wonderous-repo]: {{site.repo.wonderous}}
[wonderous-readme]: {{site.repo.wonderous}}#wonderous
[Photo Search app]: {{site.repo.samples}}/tree/main/desktop_photo_search
[gskinner-flokk-repo]: {{site.github}}/gskinnerTeam/flokk
[gskinner-flokk-blogpost]: https://blog.gskinner.com/archives/2020/09/flokk-how-we-built-a-desktop-app-using-flutter.html
[Write a Flutter desktop application]: {{site.codelabs}}/codelabs/flutter-github-client
