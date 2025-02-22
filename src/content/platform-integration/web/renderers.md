---
# title: Web renderers
title: Web 渲染器
# description: Choosing build modes and renderers for a Flutter web app.
description: 为 Flutter Web 应用选择构建模式和渲染器。
---

Flutter web offers two _build modes_, and two _renderers_.
The two build modes are the **default** and **WebAssembly**,
and the two renderers are **canvaskit** and **skwasm**.

Flutter Web 提供了两种 _构建模式_ 和两种 _渲染器_。
两种构建模式是 **默认** 和 **WebAssembly**，
两种渲染器分别是 **canvaskit** 和 **skwasm**。

Flutter chooses the build mode when building the app,
and determines which renderers are available at runtime.

Flutter 会在构建应用时选择构建模式，
并以此决定运行时 (runtime) 可用的渲染器。

For a default build,
Flutter chooses the `canvaskit` renderer at runtime.
For a WebAssembly build,
Flutter chooses the `skwasm` renderer at runtime,
and falls back to `canvaskit` if the browser doesn't support `skwasm`.

**默认** 构建：Flutter 会在运行时 (runtime) 选择 `canvaskit` 渲染器。
**WebAssembly** 构建：Flutter 会在运行时 (runtime) 选择 `skwasm` 渲染器，
如果浏览器不支持 `skwasm`，则会回退到 `canvaskit`。

## Build modes

## 构建模式

### Default build mode

### 默认构建模式

Flutter chooses the default mode when the
`flutter run` or `flutter build web` commands are
used without passing `--wasm`, or when passing `--no-wasm`.

在使用 `flutter run` 或者 `flutter build web` 命令时，
如果不传递 `--wasm` 或 `--no-wasm`，
Flutter 会选择默认构建。

This build mode only uses the `canvaskit` renderer.

这种构建模式只会使用 `canvaskit` 渲染器。

To run in a Chrome using the default build mode:

使用默认构建模式，在 Chrome 浏览器中运行：

```console
flutter run -d chrome
```

To build your app for release using the default build mode:

使用默认构建模式来构建应用，以便进行发布：

```console
flutter build web
```

### WebAssembly build mode

### WebAssembly 构建模式

This mode is enabled by passing `--wasm` to `flutter run` and
`flutter build web` commands.

此模式通过在 `flutter run` 和 `flutter build web` 命令中传递 `--wasm` 标志启用。

This mode makes both `skwasm` and `canvaskit` available. `skwasm` requires
[WasmGC][], which is not yet supported by all modern browsers.
Therefore, at runtime Flutter chooses `skwasm` if garbage collection is
supported, and falls back to `canvaskit` if not. This allows apps compiled in the
WebAssembly mode to still run in all modern browsers.

在此模式下，`skwasm` 和 `canvaskit` 都可以使用。
`skwasm` 依赖 [wasm 垃圾回收机制][WasmGC]，而这一功能尚未被所有现代浏览器支持。
因此，在运行时 (runtime)，如果浏览器支持垃圾回收，Flutter 将选用 `skwasm`，
如果不支持，则会回退到 `canvaskit`。
这确保了在 WebAssembly 模式下编译的应用程序仍然能够在所有现代浏览器中运行。

The `--wasm` flag is not supported by non-web platforms.

`--wasm` 标志不适用于非 Web 平台。

To run in Chrome using the WebAssembly mode:

使用 WebAssembly 模式，在 Chrome 浏览器中运行：

```console
flutter run -d chrome --wasm
```

To build your app for release using the WebAssembly mode:

使用 WebAssembly 模式构建应用，以便进行发布：

```console
flutter build web --wasm
```

## Renderers

## 渲染器

Flutter has two renderers (`canvaskit` and `skwasm`)
that re-implement the Flutter engine to run the browser. 
The renderer converts UI primitives (stored as `Scene` objects) into
pixels.

Flutter 有两种渲染器（`canvaskit` 和 `skwasm`），
为了在浏览器中运行，它们重新实现了 Flutter 引擎。
渲染器将 UI 元素（存储为 `Scene` 对象）转换为像素。

### canvaskit

The `canvaskit` renderer is compatible with all modern browsers, and is the 
renderer that is used in the _default_ build mode.

`canvaskit` 渲染器兼容所有现代浏览器，
它是 _默认_ 构建模式中使用的渲染器。

It includes a copy of Skia compiled to WebAssembly, which adds
about 1.5MB in download size.

它包含一份编译为 WebAssembly 的 Skia 副本，
这会增加大约 1.5MB 的下载大小。

### skwasm

The `skwasm` renderer is a more compact version of Skia
that is compiled to WebAssembly and supports rendering on a separate thread.

`skwasm` 渲染器是 Skia 的更精简版本，
让编译为 WebAssembly，并支持在独立的线程上渲染。

This renderer must be used with the _WebAssembly_ build mode,
which compiles the Dart code to WebAssembly.

该渲染器必须与 _WebAssembly_ 构建模式一起使用，
这会将 Dart 代码编译为 WebAssembly。

To take advantage of multiple threads,
the web server must meet the [SharedArrayBuffer security requirements][].
In this mode,
Flutter uses a dedicated [web worker][] to offload part of the rendering
workload to a separate thread,
taking advantage of multiple CPU cores.
If the browser does not meet these requirements,
the `skwasm` renderer runs in a single-threaded configuration.

如果要利用多线程的优势，
Web 服务器必须满足 [SharedArrayBuffer 安全要求][SharedArrayBuffer security requirements]。
在此模式下，
Flutter 会使用一个专用的 [web worker][] 将部分渲染工作转移到单独的线程上，
从而利用多核 CPU 的优势。
如果浏览器不符合这些要求，
`skwasm` 渲染器将以单线程的配置运行。

This renderer includes a more compact version of Skia compiled to WebAssembly,
adding about 1.1MB in download size.

该渲染器包含一个编译为 WebAssembly 的更精简的 Skia 版本，
这会增加大约 1.1MB 的下载大小。

## Choosing a renderer at runtime

## 在运行时 (runtime) 选择渲染器

By default, when building in WebAssembly mode, Flutter will decide when to
use `skwasm`, and when to fallback to `canvaskit`. This can be overridden by
passing a configuration object to the loader, as follows:

默认情况下，在 WebAssembly 模式下构建时，Flutter 会自动决定何时使用 `skwasm`，
以及何时回退到 `canvaskit`。你可以通过传递配置对象给加载器来覆盖这一行为，具体步骤如下：

 1. Build the app with the `--wasm` flag to make both `skwasm` and `canvaskit`
    renderers available to the app.
    
    使用 `--wasm` 标志构建应用程序，以使应用能够使用 `skwasm` 和 `canvaskit` 渲染器。
    
 1. Set up custom web app initialization as described in
    [Write a custom `flutter_bootstrap.js`][custom-bootstrap].
    
    按照 [编写自定义 `flutter_bootstrap.js`][custom-bootstrap]
    中的描述设置自定义 Web 应用初始化。
    
 1. Prepare a configuration object with the `renderer` property set to
    `"canvaskit"` or `"skwasm"`.

    准备一个配置对象，将其 `renderer` 属性设置为 `"canvaskit"` 或 `"skwasm"`。
    
 1. Pass your prepared config object as the `config` property of
    a new object to the `_flutter.loader.load` method that is
    provided by the earlier injected code.

    将准备好的 config 对象作为新对象的 `config` 属性，
    传递给之前注入代码提供的 `_flutter.loader.load` 方法。

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

在调用 `load` 方法后，Web 渲染器就无法再次更改。
因此，必须在调用 `_flutter.loader.load` 之前决定使用哪种渲染器。

[custom-bootstrap]: /platform-integration/web/initialization#custom-bootstrap-js
[customizing-web-init]: /platform-integration/web/initialization

## Choosing which build mode to use

## 如何选择合适的构建模式

To compile Dart to WebAssembly,
your app and its plugins / packages must meet the following requirements:

要将 Dart 编译为 WebAssembly，
所有应用代码以及应用使用的插件和 package 都必须满足以下要求：

- **Use new JS Interop** - 
  The code must only use the new JS interop library `dart:js_interop`. Old-style
  `dart:js`, `dart:js_util`, and `package:js` are no longer supported.

  **使用新的 JS 互操作库 (JS Interop)** -
  代码必须只使用新的 JS 互操作库 `dart:js_interop`。
  旧的 `dart:js`、`dart:js_util` 和 `package:js` 已不再支持。

- **Use new Web APIs** -
  Code using Web APIs must use the new `package:web` instead of `dart:html`.

  **使用新的 Web API** -
  使用 Web API 的代码必须使用新的 `package:web` 而不是 `dart:html`。

- **Number compatibility** -
  WebAssembly implements Dart's numeric types `int` and `double` exactly the
  same as the Dart VM. In JavaScript these types are emulated using the JS
  `Number` type. It is possible that your code accidentally or purposefully
  relies on the JS behavior for numbers. If so, such code needs to be updated to
  behave correctly with the Dart VM behavior.

  **数值类型的兼容性** -
  WebAssembly 实现了 Dart 的数值类型 `int` 和 `double`，
  其行为与 Dart VM 完全一致。在 JavaScript 中，
  这些类型是使用 JS 的 `Number` 类型进行模拟的。
  你的代码可能无意或故意依赖于 JS 中的数值行为。
  如果是这样，这部分代码需要更新，以确保与 Dart VM 的行为一致。

Use these tips to decide which mode to use:

你可以通过以下建议来决定使用哪种模式：

* **Package support** - Choose the default mode if your app relies on plugins and packages that do
  not yet support WebAssembly.

  **Package 支持** - 
  如果你的应用依赖于尚未支持 WebAssembly 的插件和 package，那就选择默认模式。

* **Performance** -
  Choose the WebAssembly mode if your app's code and packages are compatible
  with WebAssembly and app performance is important. `skwasm` has noticeably
  better app start-up time and frame performance compared to `canvaskit`.
  `skwasm` is particularly effective in multi-threaded mode, so consider
  configuring the server such that it meets the
  [SharedArrayBuffer security requirements][].

  **高性能** -
  如果你的应用代码和 package 与 WebAssembly 兼容，
  并且应用性能非常重要，那就选择 WebAssembly 模式。
  `skwasm` 相较于 `canvaskit` 在应用启动时间和帧性能方面有明显优势。
  `skwasm` 性能优势在多线程模式下尤为显著，
  因此请考虑配置服务器以满足 [SharedArrayBuffer 安全要求][SharedArrayBuffer security requirements]。

[canvaskit]: https://skia.org/docs/user/modules/canvaskit/
[file an issue]: {{site.repo.flutter}}/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[web worker]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
[WasmGC]: https://developer.chrome.com/blog/wasmgc
[SharedArrayBuffer security requirements]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements
