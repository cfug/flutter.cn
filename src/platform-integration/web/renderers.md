---
title: Web renderers
title: Web 渲染器
description: How to choose a web renderer for running and building a web app.
description: 选择合适的渲染器来运行和构建 Web 应用。
---

When running and building apps for the web, you can choose between two different
renderers. This page describes both renderers and how to choose the best one for
your needs. The two renderers are:

你可以选择两种不同的渲染器来运行和构建 Web 应用。
下文将介绍这两种渲染器以及它们的适用场景：

**HTML renderer**
<br> This renderer, which has a smaller download size than the CanvasKit renderer, uses a combination of
  HTML elements, CSS, Canvas elements, and SVG elements.

**使用 HTML 渲染**
<br> 使用 HTML，CSS，Canvas 和 SVG 元素来渲染，应用的大小相对 CanvasKit 较小。

**CanvasKit renderer**
<br> This renderer is fully consistent with Flutter mobile and desktop, has faster
  performance with higher widget density, but adds about 1.5MB in download size.
  [CanvasKit][canvaskit] uses WebGL to render Skia paint commands.

**使用 CanvasKit 渲染**
<br> 应用在移动和桌面端保持一致，
  有更好的性能，以及降低不同浏览器渲染效果不一致的风险。但是应用的大小会增加大约 2MB。

## Command line options

## 命令行参数

The `--web-renderer` command line option takes one of three values, `auto`,
`html`, or `canvaskit`.

`--web-renderer` 可选参数值为 `auto`、`html` 或 `canvaskit`。

* `auto` (default) - automatically chooses which renderer to use. This option
  chooses the HTML renderer when the app is running in a mobile browser, and
  CanvasKit renderer when the app is running in a desktop browser.
  
  `auto`（默认）- 自动选择渲染器。移动端浏览器选择 HTML，桌面端浏览器选择 CanvasKit。
  
* `html` - always use the HTML renderer

  `html` - 强制使用 HTML 渲染器。

* `canvaskit` - always use the CanvasKit renderer

  `canvaskit` - 强制使用 CanvasKit 渲染器。

This flag can be used with the `run` or `build` subcommands. For example:

此选项适用于 `run` 和 `build` 命令。例如：

```terminal
flutter run -d chrome --web-renderer html
```

```terminal
flutter build web --web-renderer canvaskit
```

This flag is ignored when a non-browser (mobile or desktop) device
target is selected.

如果运行/构建目标是非浏览器设备（即移动设备或桌面设备），这个选项会被忽略。

## Runtime configuration

## 配置运行时

To override the web renderer at runtime:

要覆写 web 实时渲染器请执行以下操作：

* Build the app with the `auto` option.

  使用 `auto` 选项构建应用。

* Prepare a configuration object with the `renderer` property set to
  `"canvaskit"` or `"html"`.

  准备一个 `renderer` 属性设定为 `"canvaskit"` 或 `"html"` 的配置对象。

* Pass that object to the `engineInitializer.initializeEngine(configuration);`
  method in the [Flutter Web app initialization][web-app-init] script.

  将这个对象在 [Flutter Web 应用初始化][web-app-init] 的时候传给 
  `engineInitializer.initializeEngine(configuration);` 方法。

```html
<body>
  <script>
    let useHtml = true;

    window.addEventListener('load', function(ev) {
    _flutter.loader.loadEntrypoint({
      serviceWorker: {
        serviceWorkerVersion: serviceWorkerVersion,
      },
      onEntrypointLoaded: function(engineInitializer) {
        let config = {
          renderer: useHtml ? "html" : "canvaskit",
        };
        engineInitializer.initializeEngine(config).then(function(appRunner) {
          appRunner.runApp();
        });
      }
    });
  });
  </script>
</body>
```

The web renderer can't be changed after the Flutter engine startup process
begins in `main.dart.js`.

Flutter engine 启动之后无法再在 `main.dart.js` 更换 web 渲染器。

{{site.alert.note}}

  As of **Flutter 3.7.0**,  setting a `window.flutterWebRenderer`
  (an approach used in previous releases) displays a
  **deprecation notice** in the JS console. For more information,
  check out [Customizing web app initialization][web-app-init].

  从 **Flutter 3.7.0** 开始，设置 `window.flutterWebRenderer`（以前版本中使用的一种方法）
  会在 JS 控制台中显示 **弃用通知**。
  有关详细信息，请查看 [自定义 Web 应用程序初始化][web-app-init]。

{{site.alert.end}}

## Choosing which option to use

## 选择合适的渲染器

Choose the `auto` option (default) if you are optimizing for download size on
mobile browsers and optimizing for performance on desktop browsers.

如果你在移动端浏览器平台上更关心应用大小，而桌面端浏览器更关心性能，请选择 `auto` 选项（默认）。

Choose the `html` option if you are optimizing download size over performance on
both desktop and mobile browsers.

如果你在移动端和桌面端都更关心应用大小，请选择 `html` 选项。

Choose the `canvaskit` option if you are prioritizing performance and
pixel-perfect consistency on both desktop and mobile browsers.

`canvaskit`：移动端和桌面端都更关心性能，和跨浏览器的像素级一致性。

## Examples

## 示例

Run in Chrome using the default renderer option (`auto`):

在 Chrome 浏览器上使用默认 (`auto`) 渲染器运行：

```
flutter run -d chrome
```

Build your app in release mode, using the default (auto) option:

使用默认 (`auto`) 渲染器构建应用（发布模式）：

```
flutter build web --release
```

Build your app in release mode, using just the CanvasKit renderer:

使用 CanvasKit 渲染器构建应用（发布模式）：

```
flutter build web --web-renderer canvaskit --release
```

Run  your app in profile mode using the HTML renderer:

使用 HTML 渲染器构建应用（发布模式）：

```
flutter run -d chrome --web-renderer html --profile
```

[canvaskit]: https://skia.org/docs/user/modules/canvaskit/
[file an issue]: {{site.repo.flutter}}/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[web-app-init]: {{site.url}}/platform-integration/web/initialization
