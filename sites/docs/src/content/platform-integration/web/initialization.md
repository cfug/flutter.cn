---
# title: Flutter web app initialization
title: Flutter web 应用的初始化
# description: Customize how Flutter apps are initialized on the web.
description: 自定义 Flutter 应用在 web 上的初始化方式。
ai-translated: true
---

This page details the initialization process for Flutter web apps and
how it can be customized.

本页介绍 Flutter Web 应用的初始化过程，以及如何自定义。

## Bootstrapping

## 引导启动

The `flutter build web` command produces
a script called `flutter_bootstrap.js` in
the build output directory (`build/web`).
This file contains the JavaScript code needed to initialize and
run your Flutter app.
You can use this script by placing an async-script tag for it in
your `index.html` file in the `web` subdirectory of your Flutter app:

`flutter build web` 命令会在构建输出目录（`build/web`）中
生成名为 `flutter_bootstrap.js` 的脚本。
该文件包含初始化和运行 Flutter 应用所需的 JavaScript 代码。
在 Flutter 应用 `web` 子目录的 `index.html` 中
放入指向它的 async script 标签即可使用：

```html highlightLines=3
<html>
  <body>
    <script src="flutter_bootstrap.js" async></script>
  </body>
</html>
```

Alternatively, you can inline the entire contents of
the `flutter_bootstrap.js` file by inserting the
template token `{% raw %}{{flutter_bootstrap_js}}{% endraw %}` in
your `index.html` file:

也可以在 `index.html` 中插入模板标记
`{% raw %}{{flutter_bootstrap_js}}{% endraw %}`，
从而内联 `flutter_bootstrap.js` 的全部内容：

```html highlightLines=4
<html>
  <body>
    <script>
      {% raw %}{{flutter_bootstrap_js}}{% endraw %}
    </script>
  </body>
</html>
```

The `{% raw %}{{flutter_bootstrap_js}}{% endraw %}` token is
replaced with the contents of the `flutter_bootstrap.js` file when
the `index.html` file is copied to the
output directory (`build/web`) during the build step.

构建步骤把 `index.html` 复制到输出目录（`build/web`）时，
`{% raw %}{{flutter_bootstrap_js}}{% endraw %}` 标记会被替换为
`flutter_bootstrap.js` 的内容。

<a id="customizing-initialization" aria-hidden="true"></a>

## Customize initialization

## 自定义初始化

By default, `flutter build web` generates a `flutter_bootstrap.js` file that
does a simple initialization of your Flutter app.
However, in some scenarios, you might have a reason to
customize this initialization process, such as:

默认情况下，`flutter build web` 会生成 `flutter_bootstrap.js`，
对 Flutter 应用做简单初始化。
但在某些场景下，你可能需要自定义这一过程，例如：

* Setting a custom Flutter configuration for your app.

  为应用设置自定义 Flutter 配置。

* Integrating a custom service worker for offline support or caching.

  集成自定义 service worker，以支持离线或缓存。

* Writing custom JavaScript code to
  run at different stages of the startup process.

  编写自定义 JavaScript，在启动过程的不同阶段运行。

To write your own custom bootstrapping logic instead of
using the default script produced by the build step, you can
place a `flutter_bootstrap.js` file in the `web` subdirectory of your project,
which is copied over and used instead of
the default script produced by the build.
This file is also templated, and you can insert several special tokens that
the build step substitutes at build time when copying
the `flutter_bootstrap.js` file to the output directory.
The following table lists the tokens that the build step will
substitute in either the `flutter_bootstrap.js` or `index.html` files:

若要编写自己的引导逻辑，而不是使用构建步骤生成的默认脚本，
可以在项目的 `web` 子目录中放置 `flutter_bootstrap.js`。
构建时会复制并使用该文件，取代默认脚本。
该文件同样是模板，可以插入若干特殊标记，
构建步骤在把 `flutter_bootstrap.js` 复制到输出目录时会替换它们。
下表列出构建步骤会在 `flutter_bootstrap.js` 或 `index.html` 中替换的标记：

| <t>Token</t><t>标记</t> | <t>Replaced with</t><t>替换为</t> |
|---|---|
| `{% raw %}{{flutter_js}}{% endraw %}` | The JavaScript code that makes the `FlutterLoader` object available in the `_flutter.loader` global variable. (See the `_flutter.loader.load() API` section below for more details.) |
| `{% raw %}{{flutter_js}}{% endraw %}` | 使 `FlutterLoader` 对象可通过全局变量 `_flutter.loader` 使用的 JavaScript 代码。（更多细节见下方 `_flutter.loader.load()` API 一节。） |
| `{% raw %}{{flutter_build_config}}{% endraw %}` | A JavaScript statement that sets metadata produced by the build process which gives the `FlutterLoader` information needed to properly bootstrap your application. |
| `{% raw %}{{flutter_build_config}}{% endraw %}` | 一条 JavaScript 语句，用于设置构建过程生成的元数据，向 `FlutterLoader` 提供正确引导应用所需的信息。 |
| `{% raw %}{{flutter_service_worker_version}}{% endraw %}` | A unique number representing the build version for custom service worker configurations (Flutter no longer generates a service worker by default; see the [Web FAQ](/platform-integration/web/faq#how-do-i-configure-a-service-worker)). |
| `{% raw %}{{flutter_service_worker_version}}{% endraw %}` | 表示自定义 service worker 配置所用构建版本的唯一数字（Flutter 默认不再生成 service worker；请参阅 [Web 常见问题](/platform-integration/web/faq#how-do-i-configure-a-service-worker)）。 |
| `{% raw %}{{flutter_bootstrap_js}}{% endraw %}` | As mentioned above, this inlines the contents of the `flutter_bootstrap.js` file directly into the `index.html` file. Note that this token can only be used in the `index.html` and not the `flutter_bootstrap.js` file itself. |
| `{% raw %}{{flutter_bootstrap_js}}{% endraw %}` | 如上所述，它把 `flutter_bootstrap.js` 的内容直接内联到 `index.html`。此标记只能用在 `index.html` 中，不能用在 `flutter_bootstrap.js` 自身。 |

{:.table}

<a id="write-a-custom-flutter_bootstrap-js" aria-hidden="true"></a>

## Write a custom bootstrap script {:#custom-bootstrap-js}

## 编写自定义的启动脚本

Any custom `flutter_bootstrap.js` script needs to have three components in
order to successfully start your Flutter app:

任何自定义 `flutter_bootstrap.js` 脚本都需要三个组成部分，
才能成功启动 Flutter 应用：

* A `{% raw %}{{flutter_js}}{% endraw %}` token,
  to make `_flutter.loader` available.

  `{% raw %}{{flutter_js}}{% endraw %}` 标记，使 `_flutter.loader` 可用。

* A `{% raw %}{{flutter_build_config}}{% endraw %}` token,
  which provides information about the build to the
  `FlutterLoader` needed to start your app.

  `{% raw %}{{flutter_build_config}}{% endraw %}` 标记，
  向 `FlutterLoader` 提供启动应用所需的构建信息。

* A call to `_flutter.loader.load()`, which actually starts the app.

  调用 `_flutter.loader.load()`，真正启动应用。

The most basic `flutter_bootstrap.js` file would look something like this:

最基本的 `flutter_bootstrap.js` 大致如下：

```js
{% raw %}{{flutter_js}}{% endraw %}
{% raw %}{{flutter_build_config}}{% endraw %}

_flutter.loader.load();
```

## Customize the Flutter loader

## 自定义 Flutter Loader

The `_flutter.loader.load()` JavaScript API can be invoked with optional
arguments to customize initialization behavior:

可以使用以下可选参数调用 `_flutter.loader.load()` JavaScript API，
来自定义初始化行为：

| <t>Name</t><t>参数名称</t> | <t>Description</t><t>描述</t> | <t>JS&nbsp;type</t><t>JS&nbsp;类型</t> |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------|--------------|
| `config`                | The Flutter configuration of your app.                                                                                        | `Object`     |
| `config`                | 应用程序的 Flutter 配置 | `Object` |
| `onEntrypointLoaded`    | The function called when the engine is ready to be initialized. Receives an `engineInitializer` object as its only parameter. | `Function`   |
| `onEntrypointLoaded` | 当引擎准备初始化时调用的函数。该函数的唯一参数是一个 `engineInitializer` 对象。  | `Function` |

{:.table}

The `config` argument is an object that can have the following optional fields:

`config` 是一个对象，你可以添加以下任何可选参数：

| <t>Name</t><t>参数名称</t> | <t>Description</t><t>描述</t> | <t>Dart&nbsp;type</t><t>Dart&nbsp;类型</t> |
|---|---|---|
|`assetBase`| The base URL of the `assets` directory of the app. Add this when Flutter loads from a different domain or subdirectory than the actual web app. You might need this when you embed Flutter web into another app, or when you deploy its assets to a CDN. |`String`|
|`assetBase`| 应用程序 `assets` 目录的根 URL。当 Flutter 从实际 web 应用不同的域或子目录加载时，请添加此 URL。当你将 Flutter web 嵌入另一个应用程序，或将其静态资源部署到 CDN 时，可能需要使用此 URL。 |`String`|
|`canvasKitBaseUrl`| The base URL from where `canvaskit.wasm` is downloaded. |`String`|
|`canvasKitBaseUrl`| 下载 `canvaskit.wasm` 的根 URL。 |`String`|
|`canvasKitVariant`| The CanvasKit variant to download. Your options cover:<br><br>1. `auto`: Downloads the optimal variant for the browser. The option defaults to this value.<br>2. `full`: Downloads the full variant of CanvasKit that works in all browsers.<br>3. `chromium`: Downloads a smaller variant of CanvasKit that uses Chromium compatible APIs. **_Warning_**: Don't use the `chromium` option unless you plan on only using Chromium-based browsers. |`String`|
|`canvasKitVariant`| 下载 CanvasKit。你的可选值：<br><br>1. `auto`：为浏览器下载最佳版本。（默认值）<br>2. `full`：下载适用于所有浏览器的 CanvasKit 完整版。<br>3. `chromium`：下载较小的 CanvasKit，该版本使用与 Chromium 兼容的 API。**_警告_**：除非你只打算使用基于 Chromium 的浏览器，否则不要使用 `chromium` 值。 |`String`|
|`canvasKitForceCpuOnly`| When `true`, forces CPU-only rendering in CanvasKit (the engine won't use WebGL). |`bool`|
|`canvasKitForceCpuOnly`| 为 `true` 时，强制在 CanvasKit 中只使用 CPU 进行渲染（引擎不会使用 WebGL）。 |`bool`|
|`canvasKitMaximumSurfaces`| The maximum number of overlay surfaces that the CanvasKit renderer can use. |`double`|
|`canvasKitMaximumSurfaces`| CanvasKit 渲染器可使用的最大覆盖层数。 |`double`|
|`debugShowSemanticsNodes`| If `true`, Flutter visibly renders the semantics tree onscreen (for debugging).  |`bool`|
|`debugShowSemanticsNodes`| 如果为 `true`，Flutter 会在屏幕上明显呈现 semantics 语义树（用于调试）。 |`bool`|
|`entrypointBaseUrl`| The base URL of your Flutter app's entrypoint. Defaults to "/".  |`String`|
|`entrypointBaseUrl`| Flutter 应用入口的根 URL。默认为 "/"。  |`String`|
|`fontFallbackBaseUrl`| Base URL for downloading fallback fonts when bundled fonts lack required glyphs. Defaults to `"https://fonts.gstatic.com/s/"`. |`String`|
|`fontFallbackBaseUrl`| 当字体缺少所需的字形的时候，用于下载备用字体的基准 URL。默认值为 `"https://fonts.gstatic.com/s/"` |`String`|
|`forceSingleThreadedSkwasm`| Forces single-threaded SkWasm mode for compatibility (only impacts apps compiled with `--wasm` when [WebAssembly][wasm-support] is selected at runtime). |`bool`|
|`forceSingleThreadedSkwasm`| 为了确保兼容性，强制使用单线程 SkWasm 模式（仅影响在运行时选择了 [WebAssembly][wasm-support] 时使用 `--wasm` 编译的应用）。 |`bool`|
|`hostElement`| HTML Element into which Flutter renders the app (see [embedding Flutter views][embedding-flutter-web]). When not set, Flutter web takes over the whole page. |`HtmlElement`|
|`hostElement`| Flutter 用于渲染应用的 HTML 元素（请参考 [嵌入 Flutter 视图][embedding-flutter-web]）。如果未设置，Flutter web 将占据整个页面。 |`HtmlElement`|
|`multiViewEnabled`| Enables multi-view mode for [embedding Flutter views][embedding-flutter-web] into host DOM elements dynamically. |`bool`|
|`multiViewEnabled`| 启用多视图模式，以便将 [嵌入 Flutter 视图][embedding-flutter-web] 动态嵌入到宿主 DOM 元素中。 |`bool`|
|`nonce`| A [Content Security Policy (CSP) nonce][nonce-mdn] string applied to inline scripts and styles created by the engine. |`String`|
|`nonce`| 应用于引擎生成的内联脚本或样式的一个 [内容安全策略 (CSP) nonce][nonce-mdn] 字符串。 |`String`|

{:.table}

[embedding-flutter-web]: /platform-integration/web/embedding-flutter-web
[nonce-mdn]: https://developer.mozilla.org/docs/Web/HTML/Global_attributes/nonce
[wasm-support]: /platform-integration/web/wasm

## forceSingleThreadedSkwasm

## forceSingleThreadedSkwasm 标志

A boolean flag to force the Skia WebAssembly (skwasm) renderer 
to run in **single-threaded mode**. This is useful if:

布尔标志，用于强制 Skia WebAssembly（skwasm）渲染器以 **单线程模式** 运行。
适用于以下情况：

* Your environment doesn't support multi-threaded WASM. For example,
  `SharedArrayBuffer` is not available or required security
  headers are missing.  

  环境不支持多线程 WASM。例如 `SharedArrayBuffer` 不可用，
  或缺少必需的安全标头。

* You want maximum browser compatibility.

  你希望获得最大的浏览器兼容性。

* Use `false` (default) to allow multi-threaded rendering when
  supported, which improves performance.

  使用 `false`（默认）以便在支持时启用多线程渲染，从而提升性能。

## Example usage

## 示例用法

```js
_flutter.loader.load({
  config: {
    forceSingleThreadedSkwasm: true,
  },
});
```

## Example: Customizing Flutter configuration based on URL query parameters

## 示例：根据 URL 查询参数自定义 Flutter 配置

The following example shows a custom `flutter_bootstrap.js` that enables
single-threaded mode when a `force_st` query parameter is present in the URL:

以下示例演示了一个自定义的 `flutter_bootstrap.js`，
当 URL 中包含 `force_st` 查询参数时，该文件会启用单线程模式：

```js
{% raw %}{{flutter_js}}{% endraw %}
{% raw %}{{flutter_build_config}}{% endraw %}

const searchParams = new URLSearchParams(window.location.search);
const forceSt = searchParams.has('force_st');
const userConfig = forceSt ? { forceSingleThreadedSkwasm: true } : {};
_flutter.loader.load({
  config: userConfig,
});
```

This script evaluates the `URLSearchParams` of the page to determine whether
the user passed a `force_st` query parameter and configures the app accordingly.

该脚本读取页面的 `URLSearchParams`，
判断用户是否传入了 `force_st` 查询参数，并据此配置应用。

## The onEntrypointLoaded callback

## onEntrypointLoaded 回调

You can also pass an `onEntrypointLoaded` callback into the `load` API in order
to perform custom logic at different parts of the initialization process.
The initialization process is split into the following stages:

也可以向 `load` API 传入 `onEntrypointLoaded` 回调，
在初始化过程的不同阶段执行自定义逻辑。
初始化过程分为以下阶段：

**Loading the entrypoint script**
: The `load` function calls the `onEntrypointLoaded` callback once the
  main entrypoint script has been downloaded and run by the browser.
  Flutter also calls `onEntrypointLoaded` on
  every hot restart during development.

  **加载入口脚本**：
  `load` 函数在浏览器下载并运行主入口脚本后调用 `onEntrypointLoaded` 回调。
  开发期间每次热重启时，Flutter 也会调用 `onEntrypointLoaded`。

**Initializing the Flutter engine**
: The `onEntrypointLoaded` callback receives an
  **engine initializer** object as its only parameter.
  Use the engine initializer `initializeEngine()` function to
  set the run-time configuration, like `multiViewEnabled: true`,
  and start the Flutter web engine.

  **初始化 Flutter 引擎**：
  `onEntrypointLoaded` 回调的唯一参数是 **引擎初始化器** 对象。
  使用引擎初始化器的 `initializeEngine()` 函数设置运行时配置
  （例如 `multiViewEnabled: true`），并启动 Flutter Web 引擎。

**Running the app**
: The `initializeEngine()` function returns a [`Promise`][js-promise]
  that resolves with an **app runner** object. The app runner has a
  single method, `runApp()`, that runs the Flutter app.

  **运行应用**：
  `initializeEngine()` 函数返回一个 [`Promise`][js-promise]，
  其结果是 **应用运行器** 对象。
  应用运行器只有一个方法 `runApp()`，用于运行 Flutter 应用。

**Adding views to (or removing views from) an app**
: The `runApp()` method returns a **flutter app** object.
  In multi-view mode, the `addView` and `removeView`
  methods can be used to manage app views from the host app.
  To learn more, check out [Embedded mode][embedded-mode].

  **向应用添加（或移除）视图**：
  `runApp()` 方法返回 **Flutter 应用** 对象。
  在多视图模式下，可用 `addView` 和 `removeView` 从宿主应用管理应用视图。
  更多信息请参阅 [嵌入模式][embedded-mode]。

[embedded-mode]: /platform-integration/web/embedding-flutter-web#embedded-mode
[js-promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

:::warning
When you provide your own `onEntrypointLoaded` callback, the `config`
that you pass to `_flutter.loader.load()` is **not** forwarded to the
engine automatically. Flutter only applies that `config` for you when
you omit `onEntrypointLoaded` and let the loader start the app.

提供自己的 `onEntrypointLoaded` 回调时，
传给 `_flutter.loader.load()` 的 `config` **不会** 自动转发给引擎。
只有省略 `onEntrypointLoaded`、让加载器自行启动应用时，
Flutter 才会替你应用该 `config`。

In a custom callback, pass the configuration to `initializeEngine()`
yourself, otherwise it's silently ignored:

在自定义回调中，请自行把配置传给 `initializeEngine()`，
否则它会被静默忽略：

```js
_flutter.loader.load({
  onEntrypointLoaded: async function(engineInitializer) {
    const appRunner = await engineInitializer.initializeEngine({
      // Set your run-time configuration here.
      renderer: 'canvaskit',
    });
    await appRunner.runApp();
  },
});
```

:::

## Example: Display a progress indicator

## 示例：显示进度指示器

To give the user of your application feedback
during the initialization process,
use the hooks provided for each stage to update the DOM:

为了在应用程序初始化过程中向用户提供反馈，
请使用各个阶段提供的钩子来更新 DOM：

```js
{% raw %}{{flutter_js}}{% endraw %}
{% raw %}{{flutter_build_config}}{% endraw %}

const loading = document.createElement('div');
document.body.appendChild(loading);
loading.textContent = "Loading Entrypoint...";
_flutter.loader.load({
  onEntrypointLoaded: async function(engineInitializer) {
    loading.textContent = "Initializing engine...";
    // If you have a `config`, pass it here. The config given to `load()`
    // is not forwarded when you supply your own `onEntrypointLoaded`.
    const appRunner = await engineInitializer.initializeEngine();

    loading.textContent = "Running app...";
    await appRunner.runApp();
  }
});
```

## Common warning

## 常见警告

If you experience a warning similar to the following:

如果出现类似下面的警告：

```text
Warning: In index.html:37: Local variable for "serviceWorkerVersion" is deprecated.
Use "{{flutter_service_worker_version}}" template token instead.
```

You can fix this by deleting the following line from the `web/index.html` file:

从 `web/index.html` 中删除下面这一行即可修复：

```html title="web/index.html"
var serviceWorkerVersion = null;
```
