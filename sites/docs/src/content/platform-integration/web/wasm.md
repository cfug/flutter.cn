---
# title: Support for WebAssembly (Wasm)
title: 对 WebAssembly (Wasm) 的支持
# description: >-
#   Learn how to build, run, and interoperate with JavaScript and browser APIs in
#   Flutter WebAssembly (Wasm) apps.
description: >-
  了解如何在 Flutter WebAssembly (Wasm) 应用中
  构建、运行 JavaScript 和浏览器 API，并实现它们之间的交互操作。
shortTitle: Wasm
# last-update: Nov 9, 2026
last-update: 2026 年 11 月 9 日
ai-translated: true
---

Flutter and Dart support
[WebAssembly](https://webassembly.org/)
as a compilation target when building
applications for the web.

Flutter 与 Dart 支持将 [WebAssembly](https://webassembly.org/) 作为 
Web 构建应用时的编译目标。

[`stable`]: {{site.repo.flutter}}/blob/master/docs/releases/Flutter-build-release-channels.md#stable
[`package:web`]: {{site.pub-pkg}}/web
[`dart:js_interop`]: {{site.dart.api}}/dart-js_interop/dart-js_interop-library.html

## Get started

## 入门

To try a pre-built Flutter web app using Wasm, check out the
[Wonderous demo app](https://wonderous.app/web/).

要试用使用 Wasm 构建的 Flutter Web 应用，
可查看 [Wonderous 演示应用](https://wonderous.app/web/)。

To experiment with Wasm in your own apps, use the following steps.

若要在自己的应用中试验 Wasm，请按以下步骤操作。

### Switch to the latest version of Flutter

### 切换到最新版 Flutter

Switch to Flutter version 3.24 or higher
to run and compile Flutter applications to WebAssembly.
To ensure you are running the latest version, run `flutter upgrade`.

请切换到 Flutter 3.24 或更高版本，以运行并将 Flutter 应用编译为 WebAssembly。
要确保使用最新版本，请运行 `flutter upgrade`。

### Ensure that your app's dependencies are compatible

### 确保应用依赖兼容

Try the default template [sample app][],
or choose any Flutter application
that has been migrated to be
[compatible with Wasm](#js-interop-wasm).

请尝试默认模板 [示例应用][sample app]，
或选择已迁移为 [与 Wasm 兼容](#js-interop-wasm)的任意 Flutter 应用。

[sample app]: /reference/create-new-app

### Modify the index page

### 修改索引页

Make sure your app's `web/index.html` is updated to the latest
[Flutter web app initialization][] for Flutter 3.22 and later.

请确保应用的 `web/index.html` 已更新为适用于 Flutter 3.22 及更高版本的最新 
[Flutter Web 应用初始化][Flutter web app initialization]。

If you would like to use the default, delete the contents of the `web/`
directory and run the following command to regenerate them:

若要使用默认配置，请删除 `web/` 目录内容并运行以下命令重新生成：

```console
$ flutter create . --platforms web
```

[Flutter web app initialization]: /platform-integration/web/initialization

### Run or build your app

### 运行或构建应用

To run the app with Wasm for development or testing,
use the `--wasm` flag with the `flutter run` command.

要在开发或测试时使用 Wasm 运行应用，请在 `flutter run` 命令中使用 `--wasm` 标志。

```console
$ flutter run -d chrome --wasm
```

To build a web application with Wasm, add the `--wasm` flag to
the existing `flutter build web` command.

要使用 Wasm 构建 Web 应用，请在现有的 `flutter build web` 命令中添加 `--wasm` 标志。

```console
$ flutter build web --wasm
```

The command produces output into the `build/web` directory relative to the
package root, just like `flutter build web`.

该命令会在相对于 package 根的 `build/web` 目录中生成输出，与 `flutter build web` 相同。

:::note
Enabling Wasm compilation for a Flutter web app does not use deferred loading
by default. Deferred loading in Wasm is available in Flutter 3.50 and later and
can be enabled using the `--enable-wasm-deferred-loading` flag:

```console
$ flutter build web --wasm --enable-wasm-deferred-loading
```

To customize how deferred `.wasm` modules are downloaded at runtime, provide a
`wasmDeferredModulesLoader` callback in your [Flutter web app initialization][]
configuration.
:::

#### Debug Wasm builds in production {:#wasm-production-debugging}

#### Wasm 生产环境调试

By default, Wasm release builds strip debug symbols and omit source maps
to minimize binary size.

默认情况下，Wasm 发布构建会移除调试符号并省略源映射文件，
以尽可能减小二进制文件的大小。

- **For error monitoring (recommended)**: Pass `--source-maps` to generate
  a `main.dart.wasm.map` file for symbolication in error tracking services.
  For security recommendations and deployment warnings, refer to
  [Source maps](/deployment/web#source-maps).

  **错误监控（推荐）**：传递 `--source-maps` 参数来生成 
  `main.dart.wasm.map` 文件，供错误跟踪服务进行符号映射。
  相关安全建议和部署警告，请参考 [源映射](/deployment/web#source-maps)。

- **For staging or QA builds**: Pass `--no-strip-wasm` to preserve Wasm
  function names directly in browser console stack traces, at the cost of
  an approximate **47% increase** in Wasm binary size.

  **staging 或 QA 构建**：传递 `--no-strip-wasm` 参数，
  可在浏览器控制台的堆栈跟踪中直接保留 Wasm 函数名词，
  但会导致 Wasm 二进制文件大小增加约 **47%**。

```console
# Generate source maps for production error tracking:
$ flutter build web --wasm --source-maps

# Preserve Wasm function names for staging/QA debugging:
$ flutter build web --wasm --no-strip-wasm
```

### Open the app in a compatible web browser

### 在兼容的 Web 浏览器中打开应用

Even with the `--wasm` flag, Flutter will still compile the application to
JavaScript. If WasmGC support is not detected at runtime, the JavaScript output
is used so the application will continue to work in all major browsers.

即使使用 `--wasm` 标志，Flutter 仍会将应用编译为 JavaScript。
若运行时未检测到 WasmGC 支持，将使用 JavaScript 输出，因此应用仍可在所有主流浏览器中运行。

You can verify whether the app is actually running with Wasm by checking for
the `dart2wasm` environment variable, set during compilation (preferred).

你可以通过检查编译时设置的 `dart2wasm` 环境变量来验证应用是否实际以 Wasm 运行（推荐）。

```dart
const isRunningWithWasm = bool.fromEnvironment('dart.tool.dart2wasm');
```

Alternatively, you can use differences in number representations
to test whether the native (Wasm) number representation is used.

或者，你可以利用数字表示方式的差异来测试是否使用了原生 (Wasm) 数字表示。

```dart
final isRunningWithWasm = identical(double.nan, double.nan);
```

### Serve the built output with an HTTP server

### 使用 HTTP 服务器提供构建输出

Flutter web WebAssembly can use multiple threads to render your application
faster, with less jank. To do this, Flutter uses advanced browser features that
require specific HTTP response headers.

Flutter Web WebAssembly 可使用多线程更快渲染应用并减少卡顿。
为此，Flutter 使用需要特定 HTTP 响应标头的高级浏览器功能。

:::important
Flutter web applications compiled with WebAssembly won't run with multiple-threads
unless the server is configured to send specific HTTP headers.

除非服务器配置为发送特定 HTTP 标头，否则使用 WebAssembly 编译的 Flutter Web 应用无法以多线程方式运行。
:::

| <t>Name</t><t>名称</t> | <t>Value</t><t>值</t> |
| :--- | :--- |
| `Cross-Origin-Embedder-Policy` | `credentialless` or `require-corp` |
| `Cross-Origin-Opener-Policy` | `same-origin` |

{:.table .table-striped}

To learn more about these headers, check out
[Load cross-origin resources without CORP headers using COEP: credentialless][coep].
For production MIME types, pre-compression, cold-start optimization, and CDN
serving, refer to [Deploy WebAssembly in production][deploy-wasm].

要了解这些标头的更多信息，请参阅 [使用 COEP: credentialless 加载无需 CORP 标头的跨域资源][coep]。
关于生产环境的 MIME 类型、预压缩、冷启动优化和 CDN 分发，
请参考 [在生产环境中部署 WebAssembly][deploy-wasm]。

[coep]: https://developer.chrome.com/blog/coep-credentialless-origin-trial
[deploy-wasm]: /deployment/web#deploy-webassembly-in-production

## Learn more about browser compatibility

## 了解更多浏览器兼容性信息

In Flutter 3.50 and later, running a Flutter app compiled to WebAssembly
(`dart2wasm`) requires a browser that supports [WasmGC][],
[JS String Builtins][wasm-js-string] (`wasm:js-string`), and
[Phase 4 Exception Handling][wasm-eh] (`try_table` and `exnref`).
For architectural details on how Dart uses these proposals, refer to
[Dart WebAssembly compilation][dart-wasm].

At startup, `flutter_bootstrap.js` probes the browser's WebAssembly engine for
these features and checks the `wasmAllowList` configuration before selecting the
Wasm build. When a browser does not support these features or is not enabled in
`wasmAllowList`, Flutter automatically falls back to the JavaScript (`dart2js`)
and CanvasKit build produced by `flutter build web --wasm`.

| Browser engine | Minimum version for Wasm | Default behavior in Flutter 3.50 (`--wasm`) | How to enable Wasm |
| :--- | :--- | :--- | :--- |
| **Chromium** (Chrome, Edge, Opera, Brave) | **137+** (Desktop & Android) | Runs WebAssembly (`dart2wasm`) by default; Chrome `< 137` falls back to `dart2js` + CanvasKit. | Enabled by default (`wasmAllowList.blink: true`). |
| **WebKit** (Safari macOS & iOS, all iOS browsers) | **Safari 26.2+** (macOS & iOS 26.2+) | Falls back to `dart2js` + CanvasKit by default (`wasmAllowList.webkit: false`). | Set `wasmAllowList: { webkit: true }` in [Flutter web app initialization][]. Safari `<= 26.1` automatically falls back to `dart2js` + CanvasKit via runtime feature detection. |
| **Gecko** (Firefox) | **Firefox 147+** | Falls back to `dart2js` + CanvasKit by default (`wasmAllowList.gecko: false`). | Set `wasmAllowList: { gecko: true }` in [Flutter web app initialization][]. Firefox `< 147` automatically falls back to `dart2js` + CanvasKit. |

{:.table .table-striped}

[WasmGC]: https://github.com/WebAssembly/gc/tree/main/proposals/gc
[wasm-js-string]: https://github.com/WebAssembly/js-string-builtins
[wasm-eh]: https://github.com/WebAssembly/exception-handling

## Use compatible JS interop libraries {:#js-interop-wasm}

## 使用兼容的 JS 互操作库 {:#js-interop-wasm}

To support compilation to Wasm, Dart has modernized
how it enables interop with browser and JavaScript APIs.
Legacy Dart SDK web and JS interop libraries (`dart:html`, `dart:js`,
`dart:js_util`, `dart:indexed_db`, `dart:svg`, `dart:web_audio`, and
`dart:web_gl`) are **deprecated and planned for removal from the Dart SDK in an
upcoming release**, and neither those libraries nor the deprecated `package:js`
package are supported when compiling to Wasm.

Instead, Dart provides lightweight interop solutions built around
static JS interop that work across both JavaScript and WebAssembly targets:

- [`package:web`][], which replaces `dart:html` (and other legacy web libraries)
- [`dart:js_interop`][], which replaces `package:js`, `dart:js`, and `dart:js_util`

For a detailed guide on migrating existing code,
see the [`package:web` migration guide][].

相关迁移现有代码的详细指南，
请参考 [`package:web` 迁移指南][`package:web` migration guide]

When compiling to Wasm, be aware of runtime differences
in JS interop types (such as `is`/`as` type casts
and Zone propagation in callbacks).
For details, check out Dart's
[JS interop types documentation]({{site.dart-site}}/interop/js-interop/js-types#compatibility-type-checks-and-casts)
and the [package:web Zones section]({{site.dart-site}}/interop/js-interop/package-web#zones).

在编译为 Wasm 时，请注意 JS 交互操作类型在运行时存在的差异
（例如 `is`/`as` 类型转换以及回调中的 Zone 传播）。
详情请查看 Dart 的
[JS 互操作类型文档]({{site.dart-site}}/interop/js-interop/js-types#compatibility-type-checks-and-casts)
以及 [package:web 中的 Zones]({{site.dart-site}}/interop/js-interop/package-web#zones).

To learn more about JS interop in Dart,
see Dart's [JS interop][] documentation page.

要了解 Dart 中的 JS 互操作，请参阅 Dart 的 [JS interop][] 文档页面。

### Diagnose Wasm compilation errors {:#diagnosing-wasm-compilation-errors}

### 诊断 Wasm 编译错误 {:#diagnosing-wasm-compilation-errors}

When compiling a Flutter web project with `--wasm`, if your application or its
packages import unsupported web APIs (such as `dart:html` or `package:js`),
the compilation will fail.

#### 1. Perform early detection and enforce modern JS interop

You can detect incompatibilities early with dry-run warnings. When you run
`flutter build web` without the `--wasm` flag, a Wasm dry run is still performed
automatically (pass `--no-wasm-dry-run` to suppress it). If incompatibilities
are found, you will see a non-fatal warning like this:

```console
Wasm dry run failed:
Found incompatibilities with WebAssembly.

package:my_app/main.dart 1:1 - dart:html unsupported (0)
```

In Flutter 3.50 and later, you can also enforce modern JS interop across
JavaScript (`dart2js` and `ddc`) builds. This ensures Wasm compatibility and
prepares your app for the upcoming removal of deprecated web libraries from the
Dart SDK. Pass `--no-deprecated-js-interop` to `flutter build web`,
`flutter run`, `flutter drive`, or `flutter test --platform chrome`:

```console
$ flutter build web --no-deprecated-js-interop
```

Passing `--no-deprecated-js-interop` causes imports of deprecated `dart:*` web
libraries (and packages that import them, such as `package:js`) to fail at
compile time. It also evaluates `dart.library.html`, `dart.library.js`, and
`dart.library.js_util` to `false` in conditional imports.

#### 2. Inspect the compiler dependency tree

If you run `flutter build web --wasm` and it fails due to an unsupported
import, `flutter_tools` prints a structured `Context` tree showing which
package and file imported the unavailable library:

```console
Context: The unavailable library 'dart:html' is imported through these packages:

    main.dart => package:my_app => dart:html

Detailed import paths for (some of) these imports:

    main.dart => package:my_app/main.dart => dart:html
```

#### 3. Migrate legacy imports

To fix these compilation errors, you must migrate from legacy JS interop
packages to modern WebAssembly-compatible alternatives:

- Replace `dart:html` and other legacy web libraries with [`package:web`][].
- Replace `dart:js` and `package:js` with [`dart:js_interop`][].

For comprehensive migration instructions, check out the
[`package:web` migration guide on dart.dev]({{site.dart-site}}/interop/js-interop/package-web)
and Dart's [JS interop usage guide]({{site.dart-site}}/interop/js-interop).

If you need to support both legacy and modern environments during your
migration, use conditional imports by checking for `dart.library.js_interop`:

```dart
import 'fallback.dart'
  if (dart.library.js) 'legacy_web_interop.dart'
  if (dart.library.js_interop) 'wasm_web_interop.dart';
```

To learn more about selecting implementations at compile time, see the
[conditional imports documentation on dart.dev]({{site.dart-site}}/interop/js-interop/package-web#conditional-imports).

## Interoperate with host pages and browser APIs {:#host-scripts-and-measurement-apis}

For `@JS()` extension-type syntax, WasmGC representation details, and boundary
performance guidelines, refer to
[WebAssembly support in JS interop][js-interop-wasm-dart] and
[Dart WebAssembly compilation][dart-wasm].
The following patterns cover Flutter-specific integration with host pages and
browser performance APIs.

### Communicate with the host page through custom DOM events {:#decouple-embedded-views-with-customevent}

Rather than coupling Dart code directly to global JavaScript functions on the
host page, dispatch standard DOM `CustomEvent` messages through `package:web`.
Host scripts can subscribe and unsubscribe independently by calling the
`window.addEventListener()` method:

```dart title="host_events.dart"
import 'dart:js_interop';
import 'package:web/web.dart' as web;

void notifyHostPage(String eventName, Map<String, Object?> payload) {
  web.window.dispatchEvent(
    web.CustomEvent(
      eventName,
      web.CustomEventInit(detail: payload.jsify(), bubbles: true),
    ),
  );
}
```

On the host page, listen for the custom event:

```js title="host_page.js"
window.addEventListener('flutter:view-ready', (event) => {
  console.log('Flutter view ready:', event.detail);
});
```

### Measure startup and frame milestones with the User Timing API {:#record-startup-and-frame-milestones}

To record Flutter startup and interaction milestones in the Chrome DevTools
**Performance** panel and browser `PerformanceObserver` listeners, combine
`WidgetsBinding.instance.addPostFrameCallback` with the browser's User Timing
API (`window.performance.mark` and `window.performance.measure`).
The `flutter_first_frame` mark records a timestamp relative to navigation start
(`performance.timeOrigin`).
The `flutter_first_frame_render` measure tracks Dart execution from `main()`
(after engine and `.wasm` module instantiation) to the first rendered frame:

```dart title="main.dart"
import 'dart:js_interop';
import 'package:flutter/widgets.dart';
import 'package:web/web.dart' as web;

void main() {
  web.window.performance.mark('flutter_main_start');
  WidgetsFlutterBinding.ensureInitialized();

  WidgetsBinding.instance.addPostFrameCallback((_) {
    web.window.performance.mark('flutter_first_frame');
    web.window.performance.measure(
      'flutter_first_frame_render',
      'flutter_main_start'.toJS,
      'flutter_first_frame',
    );
  });

  runApp(const MyApp());
}
```

[dart-wasm]: {{site.dart-site}}/web/wasm
[js-interop-wasm-dart]: {{site.dart-site}}/interop/js-interop#wasm-support
[`package:url_launcher`]: {{site.pub-pkg}}/url_launcher
[`package:web` migration guide]: {{site.dart-site}}/interop/js-interop/package-web
[JS interop]: {{site.dart-site}}/interop/js-interop
[`wasm-ready`]: {{site.pub-pkg}}?q=is%3Awasm-ready
[pub.dev]: {{site.pub}}
