---
title: Preparing a web app for release
title: 打包并发布到 Web 平台
description: How to prepare for and release a web app.
description: 如何打包并发布到 Web 平台。
short-title: Web
short-title: Web
---

During a typical development cycle,
you test an app using `flutter run -d chrome`
(for example) at the command line.
This builds a _debug_ version of your app.

（例如）在典型的开发过程中，
你可以在命令行使用 `flutter run -d chrome` 命令测试应用程序。
这会构建出 **debug** 版本的应用。

This page helps you prepare a _release_ version
of your app.

本页面会帮助你构建 **release** 版本的应用。

This page covers the following topics:

本页面包含以下主题：

* [Adding a launcher icon](#adding-a-launcher-icon)

  [添加一个桌面图标](#adding-a-launcher-icon)

* [Obfuscation and minification](#obfuscation-and-minification)

  [混淆并压缩代码](#obfuscation-and-minification)

* [Building the app for release](#building-the-app-for-release)

  [构建用于发布的应用](#building-the-app-for-release)

* [Deploying to the web](#deploying-to-the-web)

  [发布到 Web 上](#deploying-to-the-web)

## Adding a launcher icon

## 添加一个桌面图标

TBD

暂未完成

## Obfuscation and minification

## 混淆并压缩代码

Obfuscation and minification  is handled for you when you
create a release build.

当你创建了一个 release 版本时，便混淆并压缩了代码。

A debug build of a web app is not minified and
tree shaking has not been performed.

Debug 模式构建的 Web 应用没有被压缩，且 Tree-shaking 没有执行。

A profile build is not minified and tree shaking
has been performed.

Profile 模式构建的 Web 应用没有被压缩，但 Tree-shaking 执行了。

A release build is both minified and tree shaking
has been performed.

Release 模式构建的 Web 应用被压缩了，并且 Tree-shaking 执行了。

## Building the app for release

## 构建用于发布的应用

Build the app for deployment using the
`flutter build web` command.
This generates the app, including the assets,
and places the files into the `/build/web`
directory of the project.

使用 `flutter build web` 命令构建应用程序以进行部署。
这将生成包括资源的应用程序，并将文件放入项目的 `/build/web` 目录中。

Launch a web server (for example,
`python -m SimpleHTTPServer 8000`,
or by using the [dhttpd][] package),
and open the /build/web directory. Navigate to
`localhost:8000` in your browser
(given the python example)
to view the release version of your app.

启动 Web 服务器（例如，`python -m SimpleHTTPServer 8000`，或使用
[dhttpd][] package），然后打开 /build/web 目录。
在浏览器中访问 `localhost:8000`（前文用 Python 启动的服务器）
以查看应用程序的 release 版本。

## Deploying to the web

## 发布到 Web

The release build of a simple app has the following structure:

一般的应用程序的 release 版本具有以下结构：

```none
/build/web
  assets
    AssetManifest.json
    FontManifest.json
    LICENSE
    fonts
      MaterialIcons-Regular.ttf
      <other font files>
    <image files>
  index.html
  main.dart.js
  main.dart.js.map
```

When you are ready to deploy your app,
upload the release bundle
to Firebase, the cloud, or a similar service.

等你准备好部署应用时，将 release 包上传到 Firebase、云或者是类似服务上

In future, we plan to generate PWA configuration files
to support Progressive Web Apps.

在未来，我们计划生成 PWA 配置文件来支持渐进式 Web 应用。

[dhttpd]: {{site.pub}}/packages/dhttpd
