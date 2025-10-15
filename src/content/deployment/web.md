---
# title: Build and release a web app
title: 构建和发布为 Web 应用
# description: How to prepare for and release a web app.
description: 如何打包并发布到 Web 平台。
shortTitle: Web
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

本页面会帮助你构建 **release** 版本的应用，其囊括了如下主题：

* [Building the app for release](#building-the-app-for-release)

  [构建正式版本的应用](#building-the-app-for-release)

* [Deploying to the web](#deploying-to-the-web)

  [部署应用到 Web](#deploying-to-the-web)

* [Deploying to Firebase Hosting](#deploying-to-firebase-hosting)

  [部署到 Firebase 主机](#deploying-to-firebase-hosting)

* [Handling images on the web](#handling-images-on-the-web)

  [处理 Web 中的图片](#handling-images-on-the-web)

* [Choosing a build mode and a renderer](#choosing-a-build-mode-and-a-renderer)

  [选择构建模式和渲染器](#choosing-a-build-mode-and-a-renderer)

* [Minification](#minification)

  [压缩](#minification)

## Building the app for release

## 构建用于发布 (release) 的应用

Build the app for deployment using the `flutter build web` command. 

使用 `flutter build web` 命令构建应用程序，以便进行部署。

```console
flutter build web
```

This
generates the app, including the assets, and places the files into the
`/build/web` directory of the project.

这将生成包括资源的应用程序，这些文件将放入项目的 `/build/web` 目录中。

To validate the release build of your app,
launch a web server (for example,
`python -m http.server 8000`,
or by using the [dhttpd][] package),
and open the /build/web directory. Navigate to
`localhost:8000` in your browser
(given the python SimpleHTTPServer example)
to view the release version of your app.

如果要验证构建的应用发布版本 (release)，
你可以启动 Web 服务器（例如，`python -m http.server 8000`，
或使用 [dhttpd][] package），然后打开 /build/web 目录。
在浏览器中访问 `localhost:8000`（以 Python 启动的服务器为例）
来查看应用程序的发布版本 (release)。

## Additional build flags
You might need to deploy a profile or debug build for testing.
To do this, pass the `--profile` or `--debug` flag
to the `flutter build web` command.
Profile builds are specialized for performance profiling using Chrome DevTools,
and debug builds can be used to configure dart2js
to respect assertions and change the optimization level (using the `-O` flag.)

## Choosing a build mode and a renderer

Flutter web provides two build modes (default and WebAssembly) and two renderers
(`canvaskit` and `skwasm`).

For more information, see [Web renderers][].

## Deploying to the web

When you are ready to deploy your app,
upload the release bundle
to Firebase, the cloud, or a similar service.
Here are a few possibilities, but there are
many others:

* [Firebase Hosting][]
* [GitHub Pages][]
* [Google Cloud Hosting][]

## Deploying to Firebase Hosting

You can use the Firebase CLI to build and release your Flutter app with Firebase
Hosting.

### Before you begin

To get started, [install or update][install-firebase-cli] the Firebase CLI:

```console
npm install -g firebase-tools
```

### Initialize Firebase

1. Enable the web frameworks preview to the [Firebase framework-aware CLI][]:

    ```console
    firebase experiments:enable webframeworks
    ```

2. In an empty directory or an existing Flutter project, run the initialization
command:

    ```console
    firebase init hosting
    ```

3. Answer `yes` when asked if you want to use a web framework.

4. If you're in an empty directory,
    you'll be asked to choose your web framework. Choose `Flutter Web`.

5. Choose your hosting source directory; this could be an existing flutter app.

6. Select a region to host your files.

7. Choose whether to set up automatic builds and deploys with GitHub.

8. Deploy the app to Firebase Hosting:

    ```console
    firebase deploy
    ```

    Running this command automatically runs `flutter build web --release`,
    so you don't have to build your app in a separate step.

To learn more, visit the official [Firebase Hosting][] documentation for
Flutter on the web.

## Handling images on the web

The web supports the standard `Image` widget to display images.
By design, web browsers run untrusted code without harming the host computer.
This limits what you can do with images compared to mobile and desktop platforms.

For more information, see [Displaying images on the web][].

## Minification

To improve app start-up the compiler reduces the size of the compiled code by
removing unused code (known as _tree shaking_), and by renaming code symbols to
shorter strings (e.g. by renaming `AlignmentGeometryTween` to something like
`ab`). Which of these two optimizations are applied depends on the build mode:

| Type of web app build | Code minified? | Tree shaking performed? |
|-----------------------|----------------|-------------------------|
| debug                 | No             | No                      |
| profile               | No             | Yes                     |
| release               | Yes            | Yes                     |

## Embedding a Flutter app into an HTML page

## 将 Flutter 应用内嵌到一个 HTML 页面里

See [Embedding Flutter web][].

请参阅 [内嵌 Flutter Web][Embedding Flutter web]。

[Embedding Flutter web]: /platform-integration/web/embedding-flutter-web

[dhttpd]: {{site.pub}}/packages/dhttpd
[Displaying images on the web]: /platform-integration/web/web-images
[Firebase Hosting]: {{site.firebase}}/docs/hosting/frameworks/flutter
[Firebase framework-aware CLI]: {{site.firebase}}/docs/hosting/frameworks/frameworks-overview
[install-firebase-cli]: {{site.firebase}}/docs/cli#install_the_firebase_cli
[GitHub Pages]: https://pages.github.com/
[give us feedback]: {{site.repo.flutter}}/issues/new?title=%5Bweb%5D:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[Google Cloud Hosting]: https://cloud.google.com/solutions/web-hosting
[Web renderers]: /platform-integration/web/renderers
