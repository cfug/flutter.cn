---
# title: Building a web application with Flutter
title: 构建 Flutter Web 应用
short-title: Web development
# description: Instructions for creating a Flutter app for the web.
description: 针对 Web 平台构建 Flutter 应用的指南。
---

This page covers the following steps for getting started with web support:

本页面将通过几个步骤让你开启 Web 平台的支持：

* Configure the `flutter` tool for web support.

  配置 `flutter` 工具开启 Web 支持。

* Create a new project with web support.

  创建支持 Web 的新项目。

* Run a new project with web support.

  运行支持 Web 的新项目。

* Build an app with web support.

  构建支持 Web 的新项目。

* Add web support to an existing project.

  为现有项目添加 Web 支持。

## Requirements

## 要求

To create a Flutter app with web support,
you need the following software:

要创建支持 Web 平台的 Flutter 应用，你需要以下这些软件内容：

* Flutter SDK. See the
  [Flutter SDK][] installation instructions.

  Flutter SDK。查看 [Flutter SDK][] 安装指导。

* [Chrome][]; debugging a web app requires
  the Chrome browser.

  [Chrome][]：用于调试 Web 应用。

* Optional: An IDE that supports Flutter.
  You can install [Visual Studio Code][],
  [Android Studio][], [IntelliJ IDEA][].
  Also [install the Flutter and Dart plugins][]
  to enable language support and tools for refactoring,
  running, debugging, and reloading your web app
  within an editor. See [setting up an editor][]
  for more details.

  可选：用于 Flutter 开发的 IDE。
  你可以安装 [Android Studio][]、[IntelliJ IDEA][]
  或者 [Visual Studio Code][]，并且
  [安装 Flutter 和 Dart 插件][install the Flutter and Dart plugins]
  以启用语言支持、用于运行/调试/重构的开发工具，
  以及在 IDE 中重载你的 Web 应用。
  查看 [编辑工具设定][setting up an editor] 了解更多。

[Android Studio]: {{site.android-dev}}/studio
[IntelliJ IDEA]: https://www.jetbrains.com/idea/
[Visual Studio Code]: https://code.visualstudio.com/


For more information, see the [web FAQ][].

更多内容请阅读 [Web 平台常见问题][Web FAQ]。

## Create a new project with web support

## 创建支持 Web 的新项目

You can use the following steps
to create a new project with web support.

你可以依照以下步骤创建支持 Web 的新项目。

### Set up

### 准备工作

Run the following commands to use the latest version of the Flutter SDK:

运行以下命令以使用最新版本的 Flutter SDK：

```console
$ flutter channel stable
$ flutter upgrade
```

:::warning

Running `flutter channel stable` replaces your current version of Flutter
with the stable version and can take time if your connection is slow.
After this, running `flutter upgrade` upgrades your install to the latest
`stable`.  Returning to another channel (beta or master) requires calling
`flutter channel <channel>` explicitly.

运行 `flutter channel stable` 会替换你正在使用的 Flutter 版本为稳定版本，
如果你的网络状况不好，可能会花费较多的时间。
运行完成后，再运行 `flutter upgrade` 会升级到最新的 `stable` 版本。
如果你需要切换回其他渠道的 Flutter 版本（beta 或 master），
你需要运行 `flutter channel <渠道>`。

:::

If Chrome is installed,
the `flutter devices` command outputs a `Chrome` device
that opens the Chrome browser with your app running,
and a `Web Server` that provides the URL serving the app.

如果 Chrome 已经安装，`flutter devices` 命令会输出一个
`Chrome` 设备，在运行应用时会使用它启动应用；
以及一个将应用提供在指定 URL 的 `Web Server`。

```console
$ flutter devices
1 connected device:

Chrome (web) • chrome • web-javascript • Google Chrome 88.0.4324.150
```

In your IDE, you should see **Chrome (web)** in the device pulldown.

在你的 IDE 中，你可以在设备下拉列表中看到 **Chrome (web)**。

### Create and run

### 创建并运行

Creating a new project with web support is no different
than [creating a new Flutter project][] for other platforms.

创建支持 Web 的新项目的步骤与
[开发体验初探][creating a new Flutter project]
中创建其他平台应用的步骤相差无几。

#### IDE

#### 编辑器 (IDE)

Create a new app in your IDE and it automatically
creates iOS, Android, [desktop][], and web versions of your app.
From the device pulldown, select **Chrome (web)**
and run your app to see it launch in Chrome.

在 IDE 中创建新应用时，会自动包含 iOS、Android 和 Web 支持。
（如果你启用了 [桌面平台支持][desktop]，也会一并支持。）
在设备下拉列表里，选择 **Chrome (web)** 运行你的应用，
它会在 Chrome 中启动。

#### Command line

#### 命令行

To create a new app that includes web support
(in addition to mobile support), run the following commands,
substituting `my_app` with the name of your project:

运行以下命令创建支持 Web 平台的应用（包括移动端），
你可以调整 `myapp` 为你的项目名称：

```console
$ flutter create my_app
$ cd my_app
```

To serve your app from `localhost` in Chrome,
enter the following from the top of the package:

想要使用 Chrome 在 `localhost` 访问到你的应用，
在应用的根目录执行以下命令：

```console
$ flutter run -d chrome
```
:::note

If there aren't any other connected devices,
the `-d chrome` is optional.

如果你没有连接任何设备，那么 `-d chrome` 参数是可选的。

:::

The `flutter run` command launches the application using the
[development compiler] in a Chrome browser.

`flutter run` 命令会在 Chrome 中使用 [开发编译器][development compiler]。

:::warning

**Hot reload is not supported in a web browser**
Currently, Flutter supports **hot restart**,
but not **hot reload** in a web browser.

**Web 浏览器不支持热重载。**
目前为止，Flutter 仅支持在 Web 浏览器中 **热重启**，
不支持 **热重载**。

:::

### Build

### 构建

Run the following command to generate a release build:

运行以下命令生成 release 版本的构建：

```console
$ flutter build web
```

If you receive a `not supported` error, run the following command:

如果你收到 `not supported` 的错误，请运行以下命令：

```console
$ flutter config --enable-web
```

A release build uses [dart2js][]
(instead of the [development compiler][])
to produce a single JavaScript file `main.dart.js`.
You can create a release build using release mode
(`flutter run --release`) or by using `flutter build web`.
This populates a `build/web` directory
with built files, including an `assets` directory,
which need to be served together.

发布版本的构建会使用 [dart2js][]
（而不是 [开发编译器][development compiler]）
来生成单独的 `main.dart.js` 文件。
你可以通过运行 release 模式 (`flutter run --release`)
或运行 `flutter build web` 来构建 release 模式的应用。
它们会在 `build/web` 目录下生成构建的文件，
包括需要一并提供的 `assets` 文件夹。

Flutter web offers multiple build modes and renderers. For more information,
see [Web renderers][].

Flutter Web 提供多种构建模式和渲染器。
想要了解更多信息，你可以阅读 [Web 渲染器][Web renderers]。

To learn more, see
[Build and release a web app][].

想要了解更多 Web 构建的内容，你可以阅读
[构建和发布为 Web 应用][Build and release a web app]。

## Add web support to an existing app

## 为现有项目添加 Web 支持

To add web support to an existing project
created using a previous version of Flutter,
run the following command
from your project's top-level directory:

要为现有的项目添加 Web 支持，请在项目的根目录下运行：

```console
$ flutter create --platforms web .
```

If you receive a `not supported` error, run the following command:

如果你收到 `not supported` 的错误，请运行以下命令：

```console
$ flutter config --enable-web
```

[Build and release a web app]: /deployment/web
[creating a new Flutter project]: /get-started/test-drive
[dart2js]: {{site.dart-site}}/tools/dart2js
[desktop]: /platform-integration/desktop
[development compiler]: {{site.dart-site}}/tools/dartdevc
[file an issue]: {{site.repo.flutter}}/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[install the Flutter and Dart plugins]: /get-started/editor
[setting up an editor]: /get-started/editor
[web FAQ]: /platform-integration/web/faq
[Chrome]: https://www.google.com/chrome/
[Flutter SDK]: /get-started/install
[Web renderers]: /platform-integration/web/renderers
