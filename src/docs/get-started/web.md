---
title: Building a web application with Flutter
description: Instructions for creating a Flutter app for the web.
---

{% comment %}
  TODO: Once published, remove this page on the GitHub wiki:
  (https://github.com/flutter/flutter/wiki/Building-a-web-application-with-Flutter)
  and forward to this page.
  
  TODO: 一经发布，替换GitHub wiki (https://github.com/flutter/flutter/wiki/Building-a-web-application-with-Flutter)页面为本页面。
{% endcomment %}

As of 1.9, Flutter has early support for running web
applications. There are still missing features and known
performance issues, so it
**isn't recommended for production use.**

从1.9版本开始，flutter支持web应用的运行。目前还存在某些特性缺失和已知的性能问题，所以**不建议在生产环境中使用**。

{{site.alert.note}}
  Currently, web support requires the Chrome browser.
  If you haven't already, [install Chrome][].
  
  目前，web支持需要Chrome浏览器。如果你还未安装，[安装Chrome][]。
{{site.alert.end}}

For more information, see the [web FAQ][].
如果想要了解更多信息，请看 [web FAQ][]

## Summary
## 概览

Here are the short and sweet instructions to get started.
To add support to an existing project,
run the following commands in a terminal from the
top of the project package:

这里是一个简洁的使用说明。对一个已有的工程添加web支持，需要在工程根目录下输入下面的命令：

```terminal
flutter channel master
flutter upgrade
flutter config --enable-web
flutter create .
flutter run -d chrome
```

To generate a release build:

生成release产物：

```terminal
flutter build web
```

The rest of this page breaks this process down
into individual steps.

文章的剩余部分会将上述过程分解为若干步骤。

## Download the Flutter SDK
## 下载Flutter SDK

Currently, you need the master channel of the Flutter SDK
for web support:

当前，你需要`master channel`的Flutter SDK来获取web支持：

```terminal
flutter channel master
flutter upgrade
```

## Enable web support
## 开启web支持

Use the config command to enable web support:

使用`config`命令来开启web支持：

```terminal
flutter config --enable-web
```

You need only run this once.

这个命令只需要运行一次即可。
Once this is enabled,
`flutter devices` outputs a device named `Chrome`.

一旦开启了web支持，运行`flutter devices`命令会输出一个名为 `Chrome`的设备信息。

```terminal
$ flutter devices
1 connected device:

Chrome • chrome • web-javascript • Google Chrome 76.0.3809.100
```

**After enabling web support, restart the IDE.**
You should now see **Chrome (web)** in the device pulldown.

**在开启了web支持后，需要重启IDE。**你现在可以在设备下拉列表中看到 **Chrome (web)**。

The `flutter run` command launches the application using the
[development compiler][] in a Chrome browser.
The name of the web device is currently `chrome`,
but this doesn't need to be specified
if there are no other devices attached.

运行`flutter run`命令可以使用Chrome浏览器的[development compiler][]来启动应用程序。 当前连接的web设备是`chrome`，假如没有任何连接的设备，会默认选择web设备来运行应用程序。

## Add web support to an existing app
## 对已有的app添加web支持

To add web support to an existing project,
run the following command in a terminal
from the top of the project package:

对一个已有的工程添加web支持，需要在工程根目录下输入下面的命令：

```terminal
flutter create .
```

## Create a new app with web support
## 创建一个有web支持的新app

To create a new app that includes web support
(in addition to mobile support), run the following,
substituting `myapp` with the name of your project:

为了创建一个既支持移动端又支持web的新app，将`myapp` 替换成自己工程的名字，运行下面的命令：

```terminal
flutter create myapp
```

## Run the web app
## 运行web应用

To run the app on the web, enter the following
from the top of the package:

要在web上运行app，需要在工程根目录运行下面的命令：

```terminal
flutter run -d chrome
```

If there aren't any other connected devices,
the `-d chrome` is optional.

如果没有连接任何设备，`-d chrome`可以省略。

## Generate a release build
## 生成release产物

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

Release构建是使用 [dart2js][]（非development compiler）生成单一的JavaScript文件。可以通过带有release标志的run命令或是 `flutter build web`来构建。输出文件在`build/web`目录下，包括需要一起提供的`assets`资源文件。因为debug构建可能包含数千个小文件，所以这里不支持debug构建。


[dart2js]: https://dart.dev/tools/dart2js
[development compiler]: https://dart.dev/tools/dartdevc
[web FAQ]: /docs/development/platform-integration/web
[install Chrome]: https://www.google.com/chrome/
