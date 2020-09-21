---
title: Build and release a web app
title: 打包并发布 Web 应用
description: How to prepare for and release a web app.
description: 如何打包并发布到 Web 平台。
short-title: Web
tags: 发布, Web
keywords: 发布Flutter应用为Web应用
---

During a typical development cycle,
you test an app using `flutter run -d chrome`
(for example) at the command line.
This builds a _debug_ version of your app.

（例如）在典型的开发过程中，
你可以在命令行使用 `flutter run -d chrome` 命令测试应用程序。
这会构建出 **debug** 版本的应用。

This page helps you prepare a _release_ version
of your app and covers the following topics:

本页面会帮助你构建 **release** 版本的应用。

This page covers the following topics:

本页面内容囊括了如下主题：

* [Adding a launcher icon](#adding-a-launcher-icon)

  [添加一个桌面图标](#adding-a-launcher-icon)

* [Obfuscation and minification](#obfuscation-and-minification)

  [混淆并压缩代码](#obfuscation-and-minification)

* [Minification](#minification)

  [压缩](#minification)

* [Building the app for release](#building-the-app-for-release)

  [构建用于发布的应用](#building-the-app-for-release)

* [Deploying to the web](#deploying-to-the-web)

  [发布到 Web 上](#deploying-to-the-web)

## Adding a launcher icon

## 添加一个桌面图标

TBD

暂未完成

## Minification

## 混淆并压缩代码

Minification is handled for you when you
create a release build.

当你创建了一个 release 版本时，便已经压缩了代码。

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

The release build of a simple app has the
following structure:

一般的应用程序的 release 版本具有以下结构：

```none
/build/web
  assets
    AssetManifest.json
    FontManifest.json
    NOTICES
    fonts
      MaterialIcons-Regular.ttf
      <other font files>
    <image files>
  index.html
  main.dart.js
  main.dart.js.map
```

Launch a web server (for example,
`python -m http.server 8000`,
or by using the [dhttpd][] package),
and open the /build/web directory. Navigate to
`localhost:8000` in your browser
(given the python SimpleHTTPServer example)
to view the release version of your app.

启动 Web 服务器（例如，`python -m SimpleHTTPServer 8000`，或使用
[dhttpd][] package），然后打开 /build/web 目录。
在浏览器中访问 `localhost:8000`（前文用 Python 启动的服务器）
以查看应用程序的 release 版本。

## Embedding a Flutter app into an HTML page

## 将 Flutter 应用内嵌到一个 HTML 页面里

You can embed a Flutter web app,
as you would embed other content,
in an [`iframe`][] tag of an HTML file.
In the following example, replace "URL"
with the location of your HTML page:

你可以使用 [`iframe`][] 标签将 Flutter web 应用
内嵌到一个网页里。
请参照下面的例子，将 URL 替换成实际的地址：

```html
<iframe src="URL"></iframe>
```

## Deploying to the web

## 部署到 Web 端

When you are ready to deploy your app,
upload the release bundle
to Firebase, the cloud, or a similar service.
Here are a few possibilities, but there are
many others:

等你准备好部署应用时，将 release 包上传到 Firebase、云或者是类似服务上：

* [Firebase Hosting][]
* [GitHub Pages][]
* [Google Cloud Hosting][]

## PWA Support

As of release 1.20, the Flutter template for web apps includes support
for the core features needed for an installable, offline-capable PWA app.
Flutter-based PWAs can be installed in the same way as any other web-based
PWA; the settings signaling that your Flutter app is a PWA are provided by
`manifest.json`, which is produced by `flutter create` in the `web` directory.

PWA support remains a work in progress,
so please [give us feedback][] if you see something that doesn’t look right.

在未来，我们计划生成 PWA 配置文件来支持渐进式 Web 应用。

[dhttpd]: {{site.pub}}/packages/dhttpd
[Firebase Hosting]: https://firebase.google.com/docs/hosting
[GitHub Pages]: https://pages.github.com/
[give us feedback]: {{site.github}}/flutter/flutter/issues/new?title=%5Bweb%5D:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[Google Cloud Hosting]: https://cloud.google.com/solutions/smb/web-hosting/
[`iframe`]: https://html.com/tags/iframe/
