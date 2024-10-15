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

Flutter Web 提供了两种 _构建模式_ 和两种 _渲染器_。
构建模式是在构建应用时选择的，它决定了应用中可用的两种渲染器之一，以及如何选择渲染器。
在应用启动时，渲染器会在运行时 (runtime) 被选择，这决定了用于渲染 UI 的 Web 技术。

The two build modes are: default mode, and WebAssembly mode.

两种构建模式是：默认模式和 WebAssembly 模式。

The two renderers are: `canvaskit` and `skwasm`.

两种渲染器是：`canvaskit` 和 `skwasm`。

## Renderers

## 渲染器

Rendering UI in Flutter begins in the framework with widgets and render objects.
Once processed, render objects generate a `Scene` object made of layers. The
scene is then passed to the Flutter _engine_ that turns it into pixels. All of
the framework, including all widgets and custom app code, and much of the engine
are written in Dart. However, a big part of the engine is written in C++, which
includes Skia, as well as custom Flutter engine code. Multiple options are
available on the web for how to compile Dart and C++, what graphics system to
use to convert UI into pixels, how to split the workload across threads, etc.

在 Flutter 中渲染 UI 从框架中的 Widget 和 RenderObject 开始。
一旦处理完成，RenderObject 会生成一个由多个 Layer 组成的 `Scene` 对象。
随后，该 Scene 被传递给 Flutter _引擎_，将其转换为像素。
整个框架，包括所有的 widget 和自定义的应用代码，以及大部分引擎，都是用 Dart 编写的。
然而，引擎中有很大一部分是用 C++ 编写的，其中包括 Skia 以及定制的 Flutter 引擎代码。
关于如何编译 Dart 和 C++、使用哪种图形系统将 UI 转换为像素、如何在多个线程间分配工作负载等问题，
Web 上有多种可供选择的方案。

Flutter web does not offer all possible combinations of options. Instead, it
provides just two bundles of carefully chosen combinations.

Flutter Web 并不提供所有可用的方案，而是仅提供了两种精心挑选的方案。

### canvaskit

When using the `canvaskit` renderer, the Dart code is compiled to JavaScript,
and the UI is rendered on the main thread into WebGL. It is compatible with all
modern browsers. It includes a copy of Skia compiled to WebAssembly, which adds
about 1.5MB in download size.

使用 `canvaskit` 渲染器时，Dart 代码会被编译为 JavaScript，
并且 UI 会在主线程中渲染到 WebGL 上。它兼容所有现代浏览器。
该渲染器包含一个编译成 WebAssembly 的 Skia 副本，这会增加大约 1.5MB 的下载大小。

### skwasm

When using `skwasm` the Dart code is compiled to WebAssembly. Additionally, if
the hosting server meets the [SharedArrayBuffer security requirements][],
Flutter will use a dedicated [web worker][] to offload part of the rendering
workload to a separate thread, taking advantage of multiple CPU cores. This
renderer includes a more compact version of Skia compiled to WebAssembly, adding
about 1.1MB in download size.

使用 `skwasm` 渲染器时，Dart 代码会被编译为 WebAssembly。
此外，如果托管服务器满足 [SharedArrayBuffer 安全要求][SharedArrayBuffer security requirements]，
Flutter 会使用一个专用的 [web worker][] 将部分渲染工作转移到单独的线程上，
以利用多核 CPU 的优势。
该渲染器包含一个编译为 WebAssembly 的更精简的 Skia，增加大约 1.1MB 的下载大小。

## Build modes

## 构建模式

### Default build mode

### 默认构建模式

The default mode is used when `flutter run` and `flutter build web` commands are
used without passing `--wasm` or by passing `--no-wasm`. This build mode only
uses the `canvaskit` renderer.

使用 `flutter run` 和 `flutter build web` 命令时，
如果不传递 `--wasm` 或传递 `--no-wasm`，则会使用默认模式。
此构建模式仅使用 `canvaskit` 渲染器。

### WebAssembly build mode

### WebAssembly 构建模式

This mode is enabled by passing `--wasm` to `flutter run` and
`flutter build web` commands.

此模式通过在 `flutter run` 和 `flutter build web` 命令中传递 `--wasm` 标志启用。

This mode makes both `skwasm` and `canvaskit` available. `skwasm` requires
[wasm garbage collection][], which is not yet supported by all modern browsers.
Therefore, at runtime Flutter will pick `skwasm` if garbage collection is
supported, and fallback to `canvaskit` if not. This allows apps compiled in the
WebAssembly mode to still run in all modern browsers.

在此模式下，`skwasm` 和 `canvaskit` 都可以使用。
`skwasm` 依赖 [wasm 垃圾回收机制][wasm garbage collection]，而这一功能尚未被所有现代浏览器支持。
因此，在运行时 (runtime)，如果浏览器支持垃圾回收，Flutter 将选用 `skwasm`，
如果不支持，则会回退到 `canvaskit`。
这确保了在 WebAssembly 模式下编译的应用程序仍然能够在所有现代浏览器中运行。

The `--wasm` flag is not supported by non-web platforms.

`--wasm` 标志不适用于非 Web 平台。

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

:::version-note

The method of specifying the web renderer was changed in Flutter 3.22.
To learn how to configure the renderer in earlier Flutter versions,
check out [Legacy web app initialization][web-init-legacy].

指定 Web 渲染器的方法在 Flutter 3.22 中有所更改。
要了解如何在早期 Flutter 版本中配置渲染器，请查看 [旧版 Web 应用初始化][web-init-legacy]。

:::

[custom-bootstrap]: /platform-integration/web/initialization#custom-bootstrap-js
[customizing-web-init]: /platform-integration/web/initialization
[web-init-legacy]: /platform-integration/web/initialization-legacy

## Choosing which build mode to use

## 如何选择合适的构建模式

Compiling Dart to WebAssembly comes with a few new requirements that must be met
by all app code, and all plugins and packages used by the app:

将 Dart 编译为 WebAssembly 伴随着一些新的要求，
所有应用代码以及应用使用的插件和 package 都必须满足这些要求：

- The code must only use the new JS interop library `dart:js_interop`. Old-style
  `dart:js`, `dart:js_util`, and `package:js` are no longer supported.

  代码必须只使用新的 JS 互操作库 `dart:js_interop`。
  旧的 `dart:js`、`dart:js_util` 和 `package:js` 已不再支持。
  
- Code using Web APIs must use the new `package:web` instead of `dart:html`.

  使用 Web API 的代码必须使用新的 `package:web` 而不是 `dart:html`。
  
- WebAssembly implements Dart's numeric types `int` and `double` exactly the
  same as the Dart VM. In JavaScript these types are emulated using the JS
  `Number` type. It is possible that your code accidentally or purposefully
  relies on the JS behavior for numbers. If so, such code needs to be updated to
  behave correctly with the Dart VM behavior.

  WebAssembly 实现了 Dart 的数值类型 `int` 和 `double`，
  其行为与 Dart VM 完全一致。在 JavaScript 中，
  这些类型是使用 JS 的 `Number` 类型进行模拟的。
  你的代码可能无意或故意依赖于 JS 中的数值行为。
  如果是这样，这部分代码需要更新，以确保与 Dart VM 的行为一致。

General recommendations can be summarized as follows:

总体建议可以总结如下：

* Choose the default mode if your app relies on plugins and packages that do
  not yet support WebAssembly.

  如果你的应用依赖于尚未支持 WebAssembly 的插件和 package，那就选择默认模式。
  
* Choose the WebAssembly mode if your app's code and packages are compatible
  with WebAssembly and app performance is important. `skwasm` has noticeably
  better app start-up time and frame performance compared to `canvaskit`.
  `skwasm` is particularly effective in multi-threaded mode, so consider
  configuring the server such that it meets the
  [SharedArrayBuffer security requirements][].

  如果你的应用代码和 package 与 WebAssembly 兼容，
  并且应用性能非常重要，那就选择 WebAssembly 模式。
  `skwasm` 相较于 `canvaskit` 在应用启动时间和帧性能方面有明显优势。
  `skwasm` 性能优势在多线程模式下尤为显著，
  因此请考虑配置服务器以满足 [SharedArrayBuffer 安全要求][SharedArrayBuffer security requirements]。

## Examples

## 示例

Run in Chrome using the default build mode:

在 Chrome 浏览器中使用默认构建模式运行：

```console
flutter run -d chrome
```

Build your app for release using the default build mode:

使用默认构建模式构建你的应用以进行发布：

```console
flutter build web
```

Build your app for release using the WebAssembly mode:

使用 WebAssembly 模式构建你的应用以进行发布：

```console
flutter build web --wasm
```

Run your app for profiling using the default build mode:

使用默认构建模式运行你的应用以进行性能分析：

```console
flutter run -d chrome --profile
```

[canvaskit]: https://skia.org/docs/user/modules/canvaskit/
[file an issue]: {{site.repo.flutter}}/issues/new?title=[web]:+%3Cdescribe+issue+here%3E&labels=%E2%98%B8+platform-web&body=Describe+your+issue+and+include+the+command+you%27re+running,+flutter_web%20version,+browser+version
[web worker]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
[wasm garbage collection]: https://developer.chrome.com/blog/wasmgc
[SharedArrayBuffer security requirements]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements
