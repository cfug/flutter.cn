---
title: Building a web application with Flutter
title: 使用 Flutter 构建 Web 应用
description: Instructions for creating a Flutter app on the web.
description: 创建在 Web 平台上运行的 Flutter 应用。
---

{% comment %}
  TODO: Once published, remove this page on the GitHub wiki:
  (https://github.com/flutter/flutter/wiki/Building-a-web-application-with-Flutter)
  and forward to this page.
{% endcomment %}

As of 1.9, Flutter has early support for running web
applications. There are still missing features and known
performance issues, so it
**isn't recommended for production use.**

从 1.9 版本开始，Flutter 支持在 Web 上运行，
目前仍存在某些功能缺失和已知的性能问题，
所以我们 **不建议在生产环境中使用**。

{{site.alert.note}}

  Currently, debugging a web app requires the
  Chrome browser. If you haven't already,
  [install Chrome][].
  
  目前如果要在 Web 平台运行 Flutter 应用，
  你必须 [安装 Chrome 浏览器][]。
  
{{site.alert.end}}

For more information, see the [web FAQ][].

如果想要了解更多信息，请看 [Web 常见问题][web FAQ] 文档。

{{site.alert.warning}}

  If you don't yet have the `flutter` tool installed,
  do a [regular install for your platform][], and then 
  return to these instructions.
  
  如果你尚未安装 Flutter 命令行工具，请在这里查看
  [安装教程][regular install for your platform]，
  然后再返回本文继续。
  
{{site.alert.end}}

## Summary

## 概览

Here are the short and sweet instructions to get started.
To **add support to an existing project** and
**assuming that you have the `flutter` tool installed**,
run the following commands in a terminal from the
top of the project package:

这里是一个简洁的使用说明，假设你 **需要添加 Web 支持到现有到项目**，
并且也 **已经安装了 Flutter 命令行工具**。
对一个已有的工程添加 Web 支持，需要在工程根目录下输入下面的命令：

```terminal
$ flutter channel master
$ flutter upgrade
$ flutter config --enable-web
$ cd <into project directory>
$ flutter create .
$ flutter run -d chrome
```

To generate a release build:

生成 release 产物：

```terminal
flutter build web
```

The rest of this page breaks this process down
into individual steps.

文章的剩余部分会将上述过程分解为若干步骤。

## Download the Flutter SDK

## 下载 Flutter SDK

Currently, you need the master channel of the Flutter SDK
for web support. Assuming that you already have the
`flutter` tool installed, run the following commands
to install the latest version from master:

当前，你需要 master 渠道的的 Flutter SDK 来获取 Web 支持：
这里我们假定你已经安装了 Flutter 命令行工具，运行下面的
命令需要安装 master 渠道最新的 SDK 噢：

```terminal
$ flutter channel master
$ flutter upgrade
```

The `flutter upgrade` command silently fails
when "origin" points to a personal fork.
To validate that "origin" points to the
"flutter/flutter" repo, enter the following:

这里的 `flutter upgrade` 命令会在个人 fork 情况下失效，
验证 origin 是否指向 "flutter/flutter" 仓库，可以通过下面命令：

```terminal
$ cd <inside local copy of the flutter/flutter repo>
$ git remote get-url origin
ssh://git@github.com/flutter/flutter.git
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

Once web is enabled,
`flutter devices` outputs a device named `Chrome`.

一旦开启了 Web 支持，运行 `flutter devices`
命令会输出一个名为 `Chrome` 的设备信息。

```terminal
$ flutter devices
1 connected device:

Chrome • chrome • web-javascript • Google Chrome 76.0.3809.100
```

**After enabling web support, restart the IDE.**
You should now see **Chrome (web)** in the device pulldown.

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

## Create a new app with web support

## 创建一个有支持 Web 运行的新应用

To create a new app that includes web support
(in addition to mobile support), run the following,
substituting `myapp` with the name of your project:

为了创建一个既支持移动端又支持 Web 的新应用，
将 `myapp` 替换成自己工程的名字，运行下面的命令：

```terminal
flutter create myapp
```

## Run the web app

## 在 Web 平台运行应用

To run the app on the web, enter the following
from the top of the package:

要在 Web 上运行应用，需要在工程根目录运行下面的命令：

```terminal
flutter run -d chrome
```

If there aren't any other connected devices,
the `-d chrome` is optional.

如果没有连接任何其他设备，`-d chrome` 可以省略。

## Generate a release build

## 生成 release 产物

Run the following, from the top of the project:

在工程根目录运行下面命令：

```terminal
flutter build web
```

A release build uses [dart2js][]
(instead of the development compiler) to produce a single
JavaScript file.  This can be run with the release flag
or built using `flutter build web`. This outputs files at
`build/web`, including the assets, which need to be served together.
There is no support for building a debug build,
since they consist of potentially thousands of small files.

Release 构建产物使用 [dart2js][]（不是 dartdevc）生成了一个单独的 JavaScript 文件。
可以通过带有 `release` 标志的运行命令或是 `flutter build web` 来构建。
输出文件在 `build/web` 目录下，包括需要一起提供的 `assets` 资源文件。
因为 debug 构建可能包含数千个小文件，所以这里不支持 debug 构建。

[dart2js]: https://dart.dev/tools/dart2js
[development compiler]: https://dart.dev/tools/dartdevc
[web FAQ]: /docs/development/platform-integration/web
[install Chrome]: https://www.google.com/chrome/
[regular install for your platform]: /docs/get-started/install
