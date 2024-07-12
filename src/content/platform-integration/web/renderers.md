---
# title: Web renderers
title: Web 渲染器
# description: How to choose a web renderer for running and building a web app.
description: 选择合适的渲染器来运行和构建 Web 应用。
---

When running and building apps for the web, you can choose between two different
renderers. This page describes both renderers and how to choose the best one for
your needs. The two renderers are:

你可以选择两种不同的渲染器来运行和构建 Web 应用。
下文将介绍这两种渲染器以及它们的适用场景：

**CanvasKit renderer**
<br> This renderer is fully consistent with Flutter mobile and desktop, has faster
  performance with higher widget density, but adds about 1.5MB in download size.
  [CanvasKit][canvaskit] uses WebGL to render Skia paint commands.

**使用 CanvasKit 渲染**
<br> 应用在移动和桌面端保持一致，
  有更好的性能，以及降低不同浏览器渲染效果不一致的风险。
  但是应用的大小会增加大约 1.5MB。
  [CanvasKit][canvaskit] 使用 WebGL 来渲染 Skia 绘制命令。

**HTML renderer**
<br> This renderer, which has a smaller download size than the CanvasKit renderer,
  uses a combination of HTML elements, CSS, Canvas elements, and SVG elements.

**使用 HTML 渲染**
<br> 使用 HTML，CSS，Canvas 和 SVG 元素来渲染，应用的大小相对 CanvasKit 较小。

## Command line options

## 命令行参数

The `--web-renderer` command line option takes one of three values:
`canvaskit`, `html`, or `auto`.

`--web-renderer` 可选参数值：`canvaskit`、`html` 或 `auto`。

* `canvaskit` (soon to be default) - always use the CanvasKit renderer

  `canvaskit` （即将成为默认） - 始终使用 CanvasKit 渲染器。

* `auto` (default) - automatically chooses which renderer to use. This option
    chooses the HTML renderer when the app is running in a mobile browser, and
    CanvasKit renderer when the app is running in a desktop browser.

  `auto`（默认）- 自动选择渲染器。移动端浏览器选择使用 HTML，桌面端浏览器选择使用 CanvasKit。

* `html` - always use the HTML renderer

  `html` - 始终使用 HTML 渲染器。

This flag can be used with the `run` or `build` subcommands. For example:

此选项适用于 `run` 和 `build` 命令。例如：

```console
flutter run -d chrome --web-renderer html
```

```console
flutter build web --web-renderer canvaskit
```

This flag is ignored when a non-browser (mobile or desktop) device
target is selected.

如果运行/构建目标是非浏览器设备（即移动设备或桌面设备），这个选项会被忽略。

## Runtime configuration

## 配置运行时

To override the web renderer at runtime:

要在运行时覆写 web 渲染器，请执行以下操作：

 1. Build the app with the `auto` option.

    使用 `auto` 选项构建应用。

 1. Set up custom web app initialization
    as described in [Write a custom `flutter_bootstrap.js`][custom-bootstrap].

    按照 [编写自定义的 `flutter_bootstrap.js`][custom-bootstrap] 中的指南，
    来设置自定义 Web 应用初始化。

 1. Prepare a configuration object with the `renderer` property set to
    `"canvaskit"` or `"html"`.

    准备一个 `renderer` 属性设定为 `"canvaskit"` 或 `"html"` 的配置对象。

 1. Pass your prepared config object as the `config` property of
    a new object to the `_flutter.loader.load` method that is
    provided by the earlier injected code.

    将你准备好的 config 对象作为新对象的 `config` 属性，
    传递给先前注入的代码所提供的 `_flutter.loader.load` 方法。

```html highlightLines=9-14
<body>
  <script>
    {% raw %}{{flutter_js}}{% endraw %}
    {% raw %}{{flutter_build_config}}{% endraw %}

    // TODO: Replace this with your own code to determine which renderer to use.  
    const useHtml = true;
  
    const config = {
      renderer: useHtml ? "html" : "canvaskit",
    };
    _flutter.loader.load({
      config: config,
    });
  </script>
</body>
```

The web renderer can't be changed after the Flutter engine startup process
begins in `main.dart.js`.

在 `main.dart.js` 中的 Flutter engine 启动之后，就无法再更换 Web 渲染器。

:::version-note

The method of specifying the web renderer was changed in Flutter 3.22.
To learn how to configure the renderer in earlier Flutter versions,
check out [Legacy web app initialization][web-init-legacy].

在 Flutter 3.22 中更改了指定 Web 渲染器的方法。
要了解如何在 Flutter 早期版本中配置渲染器，
请查阅 [早期的 Web 应用初始化][web-init-legacy]

:::

[custom-bootstrap]: /platform-integration/web/initialization#custom-bootstrap-js
[customizing-web-init]: /platform-integration/web/initialization
[web-init-legacy]: /platform-integration/web/initialization-legacy

## Choosing which option to use

## 选择合适的渲染器

Choose the `canvaskit` option (default) if you are prioritizing performance and
pixel-perfect consistency on both desktop and mobile browsers.

`canvaskit`（默认）：在移动端和桌面端的浏览器上都更关心性能，以及像素级的一致性。

Choose the `html` option if you are optimizing download size over performance on
both desktop and mobile browsers.

`html`：在移动端和桌面端的浏览器上都更关心应用下载的大小，而非性能。

Choose the `auto` option if you are optimizing for download size on
mobile browsers and optimizing for performance on desktop browsers.

`auto`：在移动端浏览器上更关心应用下载的大小，在桌面端浏览器上更关心性能。

## Examples

## 示例

Run in Chrome using the default renderer option (`auto`):

在 Chrome 浏览器上使用默认 (`auto`) 渲染器运行：

```console
flutter run -d chrome
```

Build your app in release mode, using the default (`auto`) option:

使用默认 (`auto`) 渲染器构建应用（发布模式）：

```console
flutter build web --release
```

Build your app in release mode, using just the CanvasKit renderer:

使用 CanvasKit 渲染器构建应用（发布模式）：

```console
flutter build web --web-renderer canvaskit --release
```

Run your app in profile mode using the HTML renderer:

使用 HTML 渲染器构建应用（发布模式）：

```console
flutter run -d chrome --web-renderer html --profile
```

[canvaskit]: https://skia.org/docs/user/modules/canvaskit/
[file an issue]: {{site.repo.flutter}}/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
