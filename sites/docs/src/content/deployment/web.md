---
# title: Build and release a web app
title: 构建和发布为 Web 应用
# description: How to prepare for and release a web app.
description: 如何打包并发布到 Web 平台。
shortTitle: Web
tags: 发布, Web
keywords: 发布Flutter应用为Web应用
ai-translated: true
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

* [Opting-in to WebAssembly](#opting-in-to-webassembly)

  [选择启用 WebAssembly](#opting-in-to-webassembly)

* [Minification](#minification)

  [压缩](#minification)

## Building the app for release

## 构建用于发布 (release) 的应用

Build the app for deployment using the `flutter build web` command.

使用 `flutter build web` 命令构建应用程序，以便进行部署。

```console
flutter build web
```

To build your application with WebAssembly (Wasm), pass the `--wasm` flag:

请传入 `--wasm` 参数标志来使用 WebAssembly (Wasm) 构建你的应用：

```console
flutter build web --wasm
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

## 其他构建标志

You might need to deploy a profile or debug build for testing.
To do this, pass the `--profile` or `--debug` flag
to the `flutter build web` command.
Profile builds are specialized for performance profiling using Chrome DevTools,
and debug builds can be used to configure dart2js
to respect assertions and change the optimization level (using the `-O` flag.)

测试时你可能需要部署 profile 或 debug 构建。
给 `flutter build web` 传入 `--profile` 或 `--debug` 即可。
Profile 构建专门用于配合 Chrome DevTools 做性能分析，
debug 构建则可以配置 dart2js 保留断言，
并通过 `-O` 标志调整优化级别。

### Source maps

### 源码映射

To generate source maps for symbolication in crash reporting services,
pass the `--source-maps` flag:

要为崩溃上报服务的符号化生成源码映射，请传入 `--source-maps` 标志：

```console
flutter build web --source-maps
```

Generating source maps creates separate `.js.map` or `.wasm.map` files
(or both, depending on your build target) in the `build/web` directory
without adding binary overhead to the compiled output.

生成源码映射会在 `build/web` 目录中产生单独的 `.js.map` 或 `.wasm.map` 文件
（或两者都有，取决于构建目标），
而不会给编译产物增加二进制体积。

:::warning Exclude source maps from public hosting
By default, standard web deployment tools upload all files in `build/web/`.
If source maps are deployed publicly, browser DevTools will
automatically download them, exposing un-minified symbol names,
class hierarchies, and local file paths.

Upload `.map` files to your private error-monitoring service
(such as Sentry or Datadog) during CI/CD, and exclude `*.map` files
from public web hosting (for example, using `"ignore": ["**/*.map"]`
in `firebase.json` or stripping them prior to deployment).

:::warning 不要把 source map 公开托管
默认情况下，常见的 Web 部署工具会上传 `build/web/` 中的全部文件。
如果 source map 被公开部署，浏览器 DevTools 会自动下载它们，
从而暴露未压缩的符号名、类层次和本地文件路径。

请在 CI/CD 中把 `.map` 文件上传到私有的错误监控服务
（例如 Sentry 或 Datadog），
并在公开的 Web 托管中排除 `*.map` 文件
（例如在 `firebase.json` 中使用 `"ignore": ["**/*.map"]`，
或在部署前删掉这些文件）。
:::

## Opting-in to WebAssembly

## 选择启用 WebAssembly

To compile and optimize your app for WebAssembly,
use the `--wasm` flag when running or building.

要为 WebAssembly 编译并优化应用，
请在运行或构建时使用 `--wasm` 标志。

For more information, see [Support for WebAssembly (Wasm)][Wasm support].

更多信息请参阅 [WebAssembly (Wasm) 支持][Wasm support]。

:::important Serving WebAssembly builds
WebAssembly builds use multiple threads for improved rendering performance
and require your web server to return specific COEP/COOP HTTP response headers
(`Cross-Origin-Embedder-Policy: credentialless` and
`Cross-Origin-Opener-Policy: same-origin`).
For full details, see [Support for WebAssembly (Wasm)][Wasm support].

:::important 提供 WebAssembly 构建产物
WebAssembly 构建会使用多线程来提高渲染性能，
并要求 Web 服务器返回特定的 COEP/COOP HTTP 响应头
（`Cross-Origin-Embedder-Policy: credentialless` 和
`Cross-Origin-Opener-Policy: same-origin`）。
完整说明请参阅 [WebAssembly (Wasm) 支持][Wasm support]。
:::

## Deploying to the web

## 部署到 Web

When you are ready to deploy your app,
upload the release bundle
to Firebase, the cloud, or a similar service.
Here are a few possibilities, but there are
many others:

准备好部署应用后，
把 release 产物上传到 Firebase、云端或类似服务。
下面是几种常见选择，此外还有很多其他方式：

* [Firebase Hosting][]

  [Firebase 主机][Firebase Hosting]

* [GitHub Pages][]

  [GitHub Pages 站点][GitHub Pages]

* [Google Cloud Hosting][]

  [Google Cloud 托管][Google Cloud Hosting]

## Deploying to Firebase Hosting

## 部署到 Firebase 主机

You can use the Firebase CLI to build and release your Flutter app with Firebase
Hosting.

你可以使用 Firebase CLI，通过 Firebase 主机来构建并发布 Flutter 应用。

### Before you begin

### 开始之前

To get started, [install or update][install-firebase-cli] the Firebase CLI:

开始前，请 [安装或更新][install-firebase-cli] Firebase CLI：

```console
npm install -g firebase-tools
```

### Initialize Firebase

### 初始化 Firebase

1. Enable the web frameworks preview to the [Firebase framework-aware CLI][]:

   为 [支持框架的 Firebase CLI][Firebase framework-aware CLI]
   启用 Web 框架预览：

    ```console
    firebase experiments:enable webframeworks
    ```

2. In an empty directory or an existing Flutter project, run the initialization
command:

   在空目录或已有的 Flutter 项目中运行初始化命令：

    ```console
    firebase init hosting
    ```

3. Answer `yes` when asked if you want to use a web framework.

   当被问到是否使用 Web 框架时，回答 `yes`。

4. If you're in an empty directory,
    you'll be asked to choose your web framework. Choose `Flutter Web`.

   如果当前是空目录，系统会让你选择 Web 框架。请选择 `Flutter Web`。

5. Choose your hosting source directory; this could be an existing flutter app.

   选择托管的源目录，它可以是一个已有的 Flutter 应用。

6. Select a region to host your files.

   选择托管文件的区域。

7. Choose whether to set up automatic builds and deploys with GitHub.

   选择是否使用 GitHub 设置自动构建和部署。

8. Deploy the app to Firebase Hosting:

   把应用部署到 Firebase 主机：

    ```console
    firebase deploy
    ```

    Running this command automatically runs `flutter build web --release`,
    so you don't have to build your app in a separate step.

    运行该命令会自动执行 `flutter build web --release`，
    因此不必再单独构建应用。

To learn more, visit the official [Firebase Hosting][] documentation for
Flutter on the web.

更多内容请访问官方的 Flutter Web [Firebase 主机][Firebase Hosting] 文档。

## Handling images on the web

## 在 Web 上处理图片

The web supports the standard `Image` widget to display images.
By design, web browsers run untrusted code without harming the host computer.
This limits what you can do with images compared to mobile and desktop platforms.

Web 支持用标准的 `Image` widget 显示图片。
出于设计，Web 浏览器会运行不受信任的代码，同时不伤害主机。
因此，与移动端和桌面端相比，你能对图片做的操作更少。

For more information, see [Displaying images on the web][].

更多信息请参阅 [在 Web 上显示图片][Displaying images on the web]。

## Minification

## 压缩

To improve app start-up the compiler reduces the size of the compiled code by
removing unused code (known as _tree shaking_), and by renaming code symbols to
shorter strings (e.g. by renaming `AlignmentGeometryTween` to something like
`ab`). Which of these two optimizations are applied depends on the build mode:

为了加快应用启动，编译器会通过移除未使用的代码
（也就是 **摇树优化**）来缩小编译产物，
并把代码符号重命名为更短的字符串
（例如把 `AlignmentGeometryTween` 重命名为类似 `ab` 的名称）。
这两种优化是否启用，取决于构建模式：

| <t>Type of web app build</t><t>Web 应用构建类型</t> | <t>Code minified?</t><t>代码是否压缩</t> | <t>Tree shaking performed?</t><t>是否摇树优化</t> |
|-----------------------|----------------|-------------------------|
| debug                 | No             | No                      |
| debug | 否 | 否 |
| profile               | No             | Yes                     |
| profile | 否 | 是 |
| release               | Yes            | Yes                     |
| release | 是 | 是 |

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
[Wasm support]: /platform-integration/web/wasm
[Web renderers]: /platform-integration/web/renderers
