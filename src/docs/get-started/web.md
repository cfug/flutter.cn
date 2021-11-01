---
title: Building a web application with Flutter
title: 使用 Flutter 构建 Web 应用
description: Instructions for creating a Flutter app on the web.
description: 创建在 Web 平台上运行的 Flutter 应用。
tags: Flutter安装,Flutter起步教程
keywords: Flutter Web,Flutter Web教程
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
  [Android Studio][]、[IntelliJ IDEA][] 或者 [Visual Studio Code][]，
  并安装 [Flutter 和 Dart 插件的 IDE 插件][install the Flutter and Dart plugins]
  以获取编程语言支持和在 IDE 里进行编译、调试、运行、重新加载等功能。
  了解更多详细信息，请查看文档：[编辑器设定][setting up an editor]。

[Android Studio]: https://developer.android.com/studio
[IntelliJ IDEA]: https://www.jetbrains.com/idea/
[Visual Studio Code]: https://code.visualstudio.com/

For more information, see the [web FAQ][].

更多详细信息请参阅 [web 常见问题解答][web FAQ]。

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

运行以下命令，使用最新的 beta 频道的 Flutter SDK，并开启 web 支持：

```terminal
$ flutter channel stable
$ flutter upgrade
```

{{site.alert.warning}}

  Running `flutter channel stable` replaces your current version of Flutter
  with the stable version and can take time if your connection is slow.
  After this, running `flutter upgrade` upgrades your install to the latest
 `stable`.  Returning to another channel (beta, dev, or master) requires calling
 `flutter channel <channel>` explicitly.
  
  运行 `flutter channel stable` 命令将你当前的 Flutter 版本切换到稳定版的时候，
  如果你的网络连接速度有限，这个时间可能会很久。
  在此之后，运行命令 `flutter upgrade` 命令就会 Flutter 版本切换到稳定版渠道。
  如果需要切到其他渠道 (beta、dev 或者 master) 的时候，需要重新通过命令行切换
  `flutter channel <channel>`。
 
{{site.alert.end}}

If Chrome is installed,
the `flutter devices` command outputs a `Chrome` device
that opens the Chrome browser with your app running,
and a `Web Server` that provides the URL serving the app.

一旦开启了 Web 支持，运行 `flutter devices`，
命令会输出一个名为 `Chrome` 的设备信息，
开启一个为 Web 应用提供服务的 `Web Sever`，
并打开 Chrome 浏览器并访问某个 URL 地址。

```terminal
$ flutter devices
1 connected device:

Chrome (web) • chrome • web-javascript • Google Chrome 88.0.4324.150
```

In your IDE, you should see **Chrome (web)** in the device pulldown.

在你的 IDE 中，你应该可以在设备下拉列表里看到 **Chrome (web)**。

### Create and run

### 创建和运行

Creating a new project with web support is no different
than [creating a new Flutter project][] for other platforms.

#### IDE

#### 集成开发环境 (IDE) 配置

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

运行 `flutter run` 命令将使用 Dart 的
[开发编译器 dartdevc][development compiler]
在 Chrome 浏览器中启动应用程序。

{{site.alert.warning}}

  **Hot reload is not supported in a web browser**
  Currently, Flutter supports **hot restart**,
  but not **hot reload** in a web browser.

  **尚未支持在浏览器使用热重载**
  在浏览器里调试的适合，Flutter 支持 **热重启**，
  尚不支持 **热重载**。

{{site.alert.end}}

### Build

### 使用 build 命令

Run the following command to generate a release build:

运行下面命令以生成发行版构建：

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

You can also include `--web-renderer html`  or `--web-renderer canvaskit` to
select between the HTML or CanvasKit renderers, respectively. For more
information, see [Web renderers][].

你也可以使用 `--web-renderer html` 或
`--web-renderer canvaskit` 来切换 HTML 或 CanvasKit 渲染器。
更多信息请参阅[网页渲染器][Web renderers]。

For more information, see
[Build and release a web app][].

了解更多相关信息，请查阅文档：
[打包并发布 Web 应用][Build and release a web app]。

## Add web support to an existing app

## 向现有应用添加 Web 支持

To add web support to an existing project
created using a previous version of Flutter,
run the following command
from your project's directory:

为了向现有应用添加 Web 支持，
请在项目目录下，在终端运行以下命令：

```terminal
$ flutter create .
```

[Build and release a web app]: /docs/deployment/web
[creating a new Flutter project]: /docs/get-started/test-drive
[dart2js]: {{site.dart-site}}/tools/dart2js
[desktop support]: /desktop
[development compiler]: {{site.dart-site}}/tools/dartdevc
[file an issue]: {{site.repo.flutter}}/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[install the Flutter and Dart plugins]: /docs/get-started/editor
[setting up an editor]: /docs/get-started/editor
[web FAQ]: /docs/development/platform-integration/web
[Chrome]: https://www.google.cn/chrome/
[Flutter SDK]: /docs/get-started/install
[Web renderers]: /docs/development/tools/web-renderers
