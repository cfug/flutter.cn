---
title: Building a web application with Flutter
title: 使用 Flutter 构建 Web 应用
description: Instructions for creating a Flutter app on the web.
description: 创建在 Web 平台上运行的 Flutter 应用。
---

This page covers the following steps for getting started with web support:

本页面包含如下主题，帮助你开启 Flutter Web：

* Configure the `flutter` tool for web support.

  配置 `flutter` 工具以支持 Web

* Create a new project with web support.

  创建一个支持 web 的新项目

* Run a new project with web support.

  在新工程中开启 Flutter Web

* Build an app with web support.

  创建一个支持 Web 运行的新应用

* Add web support to an existing project.

  对已有的应用添加 Web 支持

## Requirements

## 前置条件

To create a Flutter app with web support,
you need the following software:

如果希望创建一个支持 Web 的 Flutter 应用，
你需要先安装好下面的应用：

* Flutter SDK. See the
  [Flutter SDK][] installation instructions.

  Flutter SDK，请查阅 [这个链接][Flutter SDK]
  找到安装教程。
  
* [Chrome][]; debugging a web app requires
  the Chrome browser.
  
  [谷歌浏览器][Chrome-CN]，在调试
  Web 应用时需要谷歌浏览器。
  
* Optional: An IDE that supports Flutter.
  You can install [Android Studio][], [IntelliJ IDEA][],
  or [Visual Studio Code][] and
  [install the Flutter and Dart plugins][]
  to enable language support and tools for refactoring,
  running, debugging, and reloading your web app
  within an editor. See [setting up an editor][]
  for more details.

  可选：支持 Flutter 的集成开发环境 (IDE)，你可以选择使用
  [Android Studio CN][]、[IntelliJ IDEA][] 或者 [Visual Studio Code][]，
  并安装 [Flutter 和 Dart 插件的 IDE 插件][install the Flutter and Dart plugins]
  以获取编程语言支持和在 IDE 里进行编译、调试、运行、重新加载等功能。
  了解更多详细信息，请查看文档：[编辑器设定][setting up an editor]。

For more information, see the [web FAQ][].

更多详细信息请参阅 [web 常见问题解答][web FAQ]。

{{site.alert.note}}

  Flutter has early support for running web applications, but
  you need to be running the `beta` channel of Flutter at present.
  If you experience a problem that hasn’t yet been reported,
  please [file an issue][] and make sure that "web" appears in the title.
  
  Flutter 已经有了对 Web 应用的早期支持，
  但你目前需要运行 Flutter 的 `beta` 频道。
  如果在使用中发现问题，请 [发一个 Issue][file an issue] 给我们，
  并确保标题上有 `[web]` 字样。
{{site.alert.end}}

## Create a new project with web support

## 创建一个支持 web 的新项目

当前，你需要 master 或者 dev 渠道的的 Flutter SDK 来获取 Web 支持：
这里我们假定你已经安装了 Flutter 命令行工具，运行下面的
命令需要安装 master 渠道最新的 SDK 噢：

You can use the following steps
to create a new project with web support.

你可以通过以下步骤创建一个支持 web 的新项目。

### Set up

### 初始化

Run the following commands to use the latest version of the Flutter SDK
from the beta channel and enable web support:

运行以下命令，使用最新的 beta 频道的 Flutter SDK，并开启 web 支持：

```terminal
$ flutter channel beta
$ flutter upgrade
$ flutter config --enable-web
```

[PENDING: Do we really need the following note?]
{{site.alert.note}}

  The `flutter upgrade` command silently fails
  when `origin` points to a personal fork.
  To validate that `origin` points to `{{site.repo.flutter}}.git`,
  run the following commands in the root directory
  of your local copy of the `{{site.repo.flutter}}` repository:

  这里的 `flutter upgrade` 命令会在个人 fork 情况下失效，
  验证 origin 是否指向 "flutter/flutter" 仓库，可以通过下面命令：

  ```terminal
  $ cd <inside local copy of the flutter/flutter repo>
  $ git remote get-url origin
  https://github.com/flutter/flutter.git
  ```

## Enable web support

## 开启 Web 支持

Use the config command to enable web support:

使用如下命令来开启 Web 支持：

```terminal
$ flutter config --enable-web
```

You need only run this once.
This command modifies (or creates) the
`~/.flutter_settings` file (on Mac/Linux)
with the following:

这个命令只需要运行一次即可，它会创建一个 `~/.flutter_settings`
的配置文件：

```shell
{
  "enable-web": true
}
```
{{site.alert.end}}

Once web is enabled,
the `flutter devices` command outputs a `Chrome` device
that opens the Chrome browser with your app running,
and a `Web Server` that provides the URL serving the app.

一旦开启了 Web 支持，运行 `flutter devices`
命令会输出一个名为 `Chrome` 的设备信息。

```terminal
$ flutter devices
2 connected device:

Web Server • web-server • web-javascript • Flutter Tools
Chrome     • chrome     • web-javascript • Google Chrome 81.0.4044.129
```

**After enabling web support, restart your IDE.**
You should now see **Chrome (web)** and
**Web Server (web)** in the device pulldown.

**在开启了 Web 支持后，需要重启 IDE**。
你现在可以在设备下拉列表中看到 **Chrome (web)**。

The `flutter run` command launches the application using the
[development compiler][] in a Chrome browser.
The name of the web device is currently `chrome`,
but this doesn't need to be specified
if there are no other devices attached.

运行 `flutter run` 命令将使用 Chrome 浏览器的
[development compiler][] 来启动应用程序。
当前连接的 Web 设备是 `chrome`，
要在这个设备运行的话，无需特别声明使用它（当没有其他设备的时候）。

## Add web support to an existing app

## 对已有的应用添加 Web 支持

To add web support to an existing project,
run the following command in a terminal
from the top of the project package:

对一个已有的工程添加 Web 支持，
需要在工程根目录下输入下面的命令：

```terminal
flutter create .
```
{{site.alert.note}}

  You only need to execute `flutter config --enable-web` once.
  You can always check the status of your configuration using
  the no-argument `flutter config` command.
  
  这些配置部分的步骤和工作，
  你只需要运行一次 `flutter config --enable-web` 就好。
  你可以随时通过 `flutter config` 来查看你的配置内容。
{{site.alert.end}}

### Create and run

### 创建和运行

Creating a new project with web support is no different
than [creating a new Flutter project][] for other platforms.

创建一个支持 Web 的 Flutter 工程与在支持其他平台的过程没有区别，
请查看文档 [创建一个 Flutter 工程][creating a new Flutter project]。

Once you've configured your environment for web
support, you can create and run a web app either
in the IDE or from the command line.

当你配置好对 Web 的支持后，你可以通过 IDE 或者命令行
创建和运行一个 Web 应用。

#### IDE

#### 集成开发环境 (IDE) 配置

After you've configured your environment to support
the web, make sure you restart the IDE if it was
already running.

在你配置好支持 Web 应用的环境后，
如果 IDE 已经在运行了，请重启一下它。

Create a new app in your IDE and it automatically
creates iOS, Android, and web versions of your app.
(And macOS, too, if you've enabled [desktop support][].)
From the device pulldown, select **Chrome (web)**
and run your app to see it launch in Chrome.

在 IDE 里创建一个新的应用，它将会自动创建应用的对应的 iOS、Android 和 Web 版本。
（如果启用了 [桌面版应用支持][desktop support]，它还会创建 macOS 应用的版本）。
在设备下拉菜单中，选择 **Chrome (web)**，
然后点击运行，你的应用就会在 Chrome 中打开。

#### Command line

#### 命令行

To create a new app that includes web support
(in addition to mobile support), run the following commands,
substituting `myapp` with the name of your project:

为了创建一个既支持移动端又支持 Web 的新应用，
将 `myapp` 替换成自己工程的名字，运行下面的命令：

```terminal
$ flutter create myapp
$ cd myapp
```

To serve your app from `localhost` in Chrome,
enter the following from the top of the package:

要在 Chrome 的 `localhost` 中部署你的应用，
从软件包根目录输入以下内容：

```terminal
flutter run -d chrome
```
{{site.alert.note}}

  If there aren't any other connected devices,
  the `-d chrome` is optional.

  如果没有其他连接的设备，那么 `-d chrome` 是可选的。

{{site.alert.end}}

The `flutter run` command launches the application using the
[development compiler] in a Chrome browser.

运行 `flutter run` 命令将使用 Chrome 浏览器的
[development compiler][] 来启动应用程序。

### Build

Run the following command to generate a release build:

运行下面命令以生成发行构建：

```terminal
flutter build web
```

A release build uses [dart2js][]
(instead of the [development compiler][])
to produce a single JavaScript file `main.dart.js`.
You can create a release build using release mode
(`flutter run --release`) or by using `flutter build web`.
This populates a `build/web` directory
with built files, including an `assets` directory,
which need to be served together.

Release 构建产物使用 [dart2js][]（不是 dartdevc）
生成了一个单独的 JavaScript `main.dart.js` 文件。
你可以通过 release 模式 (`flutter run --release`) 
或者 `flutter build web` 创建一个发行构建。
输出文件在 `build/web` 目录下，
包括需要一起提供的 `assets` 资源文件。

For more information, see
[Build and release a web app][].

了解更多相关信息，请查阅文档：[Build and release a web app][]。

## Add web support to an existing app

### 向现有应用添加 Web 支持

To add web support to an existing project,
run the following command in a
terminal from the root project directory:

为了向现有应用添加 Web 支持，
请在项目根目录下，在终端运行以下命令：

```terminal
$ flutter create .
```

[Build and release a web app]: /docs/deployment/web
[creating a new Flutter project]: /docs/get-started/test-drive
[dart2js]: https://dart.dev/tools/dart2js
[desktop support]: /desktop
[development compiler]: https://dart.dev/tools/dartdevc
[file an issue]: {{site.github}}/flutter/flutter/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[install the Flutter and Dart plugins]: /docs/get-started/editor
[setting up an editor]: /docs/get-started/editor
[web FAQ]: /docs/development/platform-integration/web
[Chrome]: https://www.google.com/chrome/
[Chrome-CN]: https://www.google.com/chrome/
[Flutter SDK]: https://flutter.dev/docs/get-started/install
[Android Studio]: https://developer.android.com/studio
[Android Studio CN]: https://developer.android.com/studio
[IntelliJ IDEA]: https://www.jetbrains.com/idea/
[Visual Studio Code]: https://code.visualstudio.com/