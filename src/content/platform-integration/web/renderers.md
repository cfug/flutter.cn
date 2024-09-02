---
# title: Web renderers
title: Web 渲染器
# description: Choosing build modes and renderers for a Flutter web app.
description: 为 Flutter Web 应用选择构建模式和渲染器。
---

Flutter web offers two _build modes_, and two _renderers_. A build mode
is chosen when building the app and it determines which of the two renderers are
available in the app, and how a renderer is chosen. A renderer is chosen at
runtime when the app is being launched, and it determines the set of web
technologies used to render the UI.

The two build modes are: default mode, and WebAssembly mode.

The two renderers are: `canvaskit` and `skwasm`.

## Renderers

Rendering UI in Flutter begins in the framework with widgets and render objects.
Once processed, render objects generate a `Scene` object made of layers. The
scene is then passed to the Flutter _engine_ that turns it into pixels. All of
the framework, including all widgets and custom app code, and much of the engine
are written in Dart. However, a big part of the engine is written in C++, which
includes Skia, as well as custom Flutter engine code. Multiple options are
available on the web for how to compile Dart and C++, what graphics system to
use to convert UI into pixels, how to split the workload across threads, etc.

Flutter web does not offer all possible combinations of options. Instead, it
provides just two bundles of carefully chosen combinations.

### canvaskit

When using the `canvaskit` renderer, the Dart code is compiled to JavaScript,
and the UI is rendered on the main thread into WebGL. It is compatible with all
modern browsers. It includes a copy of Skia compiled to WebAssembly, which adds
about 1.5MB in download size.

### skwasm

When using `skwasm` the Dart code is compiled to WebAssembly. Additionally, if
the hosting server meets the [SharedArrayBuffer security requirements][],
Flutter will use a dedicated [web worker][] to offload part of the rendering
workload to a separate thread, taking advantage of multiple CPU cores. This
renderer includes a more compact version of Skia compiled to WebAssembly, adding
about 1.1MB in download size.

## Build modes

### Default build mode

The default mode is used when `flutter run` and `flutter build web` commands are
used without passing `--wasm` or by passing `--no-wasm`. This build mode only
uses the `canvaskit` renderer.

### WebAssembly build mode

This mode is enabled by passing `--wasm` to `flutter run` and
`flutter build web` commands.

This mode makes both `skwasm` and `canvaskit` available. `skwasm` requires
[wasm garbage collection][], which is not yet supported by all modern browsers.
Therefore, at runtime Flutter will pick `skwasm` if garbage collection is
supported, and fallback to `canvaskit` if not. This allows apps compiled in the
WebAssembly mode to still run in all modern browsers.

The `--wasm` flag is not supported by non-web platforms.

## Choosing a renderer at runtime

By default, when building in WebAssembly mode, Flutter will decide when to
use `skwasm`, and when to fallback to `canvaskit`. This can be overridden by
passing a configuration object to the loader, as follows:

 1. Build the app with the `--wasm` flag to make both `skwasm` and `canvaskit`
    renderers available to the app.
 1. Set up custom web app initialization as described in
    [Write a custom `flutter_bootstrap.js`][custom-bootstrap].
 1. Prepare a configuration object with the `renderer` property set to
    `"canvaskit"` or `"skwasm"`.
 1. Pass your prepared config object as the `config` property of
    a new object to the `_flutter.loader.load` method that is
    provided by the earlier injected code.

    将你准备好的 config 对象作为新对象的 `config` 属性，
    传递给先前注入的代码所提供的 `_flutter.loader.load` 方法。

Example:

示例：

```html highlightLines=9-14
<body>
  <script>
    {% raw %}{{flutter_js}}{% endraw %}
    {% raw %}{{flutter_build_config}}{% endraw %}

    // TODO: Replace this with your own code to determine which renderer to use.
    const useCanvasKit = true;

    const config = {
      renderer: useCanvasKit ? "canvaskit" : "skwasm",
    };
    _flutter.loader.load({
      config: config,
    });
  </script>
</body>
```

The web renderer can't be changed after calling the `load` method. Therefore,
any decisions about which renderer to use, must be made prior to calling
`_flutter.loader.load`.

Web 渲染器在调用 `load` 方法后就无法改变了。
因此，必须在调用 `_flutter.loader.load` 之前决定使用哪种渲染器。

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

## Choosing which build mode to use

## 选择合适的渲染器

Compiling Dart to WebAssembly comes with a few new requirements that must be met
by all app code, and all plugins and packages used by the app:

- The code must only use the new JS interop library `dart:js_interop`. Old-style
  `dart:js`, `dart:js_util`, and `package:js` are no longer supported.
- Code using Web APIs must use the new `package:web` instead of `dart:html`.
- WebAssembly implements Dart's numeric types `int` and `double` exactly the
  same as the Dart VM. In JavaScript these types are emulated using the JS
  `Number` type. It is possible that your code accidentally or purposefully
  relies on the JS behavior for numbers. If so, such code needs to be updated to
  behave correctly with the Dart VM behavior.

General recommendations can be summarized as follows:

* Choose the default mode if your app relies on plugins and packages that do
  not yet support WebAssembly.
* Choose the WebAssembly mode if your app's code and packages are compatible
  with WebAssembly and app performance is important. `skwasm` has noticeably
  better app start-up time and frame performance compared to `canvaskit`.
  `skwasm` is particularly effective in multi-threaded mode, so consider
  configuring the server such that it meets the
  [SharedArrayBuffer security requirements][].

## Examples

## 示例

Run in Chrome using the default build mode:

在 Chrome 浏览器上使用默认构建模式运行：

```console
flutter run -d chrome
```

Build your app for release using the default build mode:

使用默认构建模式来构建应用，以便进行发布：

```console
flutter build web
```

Build your app for release using the WebAssembly mode:

使用 WebAssembly 模式构建应用，以便进行发布：

```console
flutter build web --wasm
```

Run your app for profiling using the default build mode:

使用默认构建模式运行应用，以便进行性能分析：

```console
flutter run -d chrome --profile
```

[canvaskit]: https://skia.org/docs/user/modules/canvaskit/
[file an issue]: {{site.repo.flutter}}/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[web worker]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
[wasm garbage collection]: https://developer.chrome.com/blog/wasmgc
[SharedArrayBuffer security requirements]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements
