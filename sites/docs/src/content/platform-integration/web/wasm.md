---
# title: Support for WebAssembly (Wasm)
title: 对 WebAssembly（Wasm）的支持
# description: >-
#   Current status of Flutter's support for WebAssembly (Wasm).
description: >-
  Flutter 对 WebAssembly（Wasm）支持的当前状态。
# shortTitle: Wasm
shortTitle: Wasm
# last-update: Nov 6, 2024
last-update: 2024 年 11 月 6 日
ai-translated: true
---

Flutter and Dart support
[WebAssembly](https://webassembly.org/)
as a compilation target when building
applications for the web.

Flutter 与 Dart 支持将 [WebAssembly](https://webassembly.org/) 作为为 Web 构建应用时的编译目标。

[`stable`]: {{site.github}}/flutter/flutter/blob/main/docs/releases/Flutter-build-release-channels.md#stable
[`package:web`]: {{site.pub-pkg}}/web
[`dart:js_interop`]: {{site.dart.api}}/dart-js_interop/dart-js_interop-library.html

## Get started
## 入门

To try a pre-built Flutter web app using Wasm, check out the
[Wonderous demo app](https://wonderous.app/web/).

要试用使用 Wasm 构建的 Flutter Web 应用，可查看 [Wonderous 演示应用](https://wonderous.app/web/)。

To experiment with Wasm in your own apps, use the following steps.

若要在自己的应用中试验 Wasm，请按以下步骤操作。

### Switch to the latest version of Flutter
### 切换到最新版 Flutter

Switch to Flutter version 3.24 or higher
to run and compile Flutter applications to WebAssembly.
To ensure you are running the latest version, run `flutter upgrade`.

请切换到 Flutter 3.24 或更高版本，以运行并将 Flutter 应用编译为 WebAssembly。要确保使用最新版本，请运行 `flutter upgrade`。

### Ensure that your app's dependencies are compatible
### 确保应用依赖兼容

Try the default template [sample app][],
or choose any Flutter application
that has been migrated to be
[compatible with Wasm](#js-interop-wasm).

请尝试默认模板[示例应用][]，或选择已迁移为[与 Wasm 兼容](#js-interop-wasm)的任意 Flutter 应用。

[sample app]: /reference/create-new-app
[示例应用]: /reference/create-new-app

### Modify the index page
### 修改索引页

Make sure your app's `web/index.html` is updated to the latest
[Flutter web app initialization][] for Flutter 3.22 and later.

请确保应用的 `web/index.html` 已更新为适用于 Flutter 3.22 及更高版本的最新 [Flutter Web 应用初始化][Flutter web app initialization]。

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

该命令会在相对于包根的 `build/web` 目录中生成输出，与 `flutter build web` 相同。

### Open the app in a compatible web browser
### 在兼容的 Web 浏览器中打开应用

Even with the `--wasm` flag, Flutter will still compile the application to
JavaScript. If WasmGC support is not detected at runtime, the JavaScript output
is used so the application will continue to work in all major browsers.

即使使用 `--wasm` 标志，Flutter 仍会将应用编译为 JavaScript。若运行时未检测到 WasmGC 支持，将使用 JavaScript 输出，因此应用仍可在所有主流浏览器中运行。

You can verify whether the app is actually running with Wasm by checking for
the `dart2wasm` environment variable, set during compilation (preferred).

你可以通过检查编译时设置的 `dart2wasm` 环境变量来验证应用是否实际以 Wasm 运行（推荐）。

```dart
const isRunningWithWasm = bool.fromEnvironment('dart.tool.dart2wasm');
```

Alternatively, you can use differences in number representations
to test whether the native (Wasm) number representation is used.

或者，你可以利用数字表示方式的差异来测试是否使用了原生（Wasm）数字表示。

```dart
final isRunningWithWasm = identical(double.nan, double.nan);
```

### Serve the built output with an HTTP server
### 使用 HTTP 服务器提供构建输出

Flutter web WebAssembly can use multiple threads to render your application
faster, with less jank. To do this, Flutter uses advanced browser features that
require specific HTTP response headers.

Flutter Web WebAssembly 可使用多线程更快渲染应用并减少卡顿。为此，Flutter 使用需要特定 HTTP 响应标头的高级浏览器功能。

:::important
Flutter web applications compiled with WebAssembly won't run with multiple-threads
unless the server is configured to send specific HTTP headers.

除非服务器配置为发送特定 HTTP 标头，否则使用 WebAssembly 编译的 Flutter Web 应用无法以多线程方式运行。
:::

| Name | Value |
|-|-|
| `Cross-Origin-Embedder-Policy` | `credentialless` <br> or <br> `require-corp` |
| `Cross-Origin-Opener-Policy` | `same-origin` |

{:.table}

| 名称 | 值 |
|-|-|
| `Cross-Origin-Embedder-Policy` | `credentialless` <br> 或 <br> `require-corp` |
| `Cross-Origin-Opener-Policy` | `same-origin` |

{:.table}

To learn more about these headers, check out
[Load cross-origin resources without CORP headers using COEP: credentialless][coep].

要了解这些标头的更多信息，请参阅[使用 COEP: credentialless 加载无需 CORP 标头的跨域资源][coep]。

[coep]: https://developer.chrome.com/blog/coep-credentialless-origin-trial

## Learn more about browser compatibility
## 了解更多浏览器兼容性信息

To run a Flutter app that has been compiled to Wasm,
you need a browser that supports [WasmGC][].

要运行已编译为 Wasm 的 Flutter 应用，你需要支持 [WasmGC][] 的浏览器。

[Chromium and V8][] support WasmGC since version 119.
Chrome on iOS uses WebKit, which doesn't yet [support WasmGC][].
Firefox announced stable support for WasmGC in Firefox 120,
but currently doesn't work due to a known limitation (see details below).

[Chromium 与 V8][Chromium and V8] 自 119 版起支持 WasmGC。iOS 上的 Chrome 使用 WebKit，目前尚不[支持 WasmGC][support WasmGC]。Firefox 在 120 版宣布稳定支持 WasmGC，但由于已知限制目前无法工作（详见下文）。

[WasmGC]: {{site.github}}/WebAssembly/gc/tree/main/proposals/gc
[Chromium and V8]: https://chromestatus.com/feature/6062715726462976
[support WasmGC]: https://bugs.webkit.org/show_bug.cgi?id=247394
[issue]: https://bugzilla.mozilla.org/show_bug.cgi?id=1788206

- **Why not Firefox?**
  Firefox versions 120 and later were previously able to run Flutter/Wasm, but
  they're experiencing a bug that is blocking compatibility with Flutter's Wasm
  renderer. Follow [this bug][firefox-bug] for details.

  **为何不用 Firefox？**
  Firefox 120 及更高版本此前可以运行 Flutter/Wasm，但目前存在一个阻碍与 Flutter Wasm 渲染器兼容的 bug。详情请关注[此 bug][firefox-bug]。

- **Why not Safari?**
  Safari now supports WasmGC, but is experiencing a similar bug that is
  blocking compatibility with Flutter's Wasm renderer.
  Follow [this bug][safari-bug] for details.

  **为何不用 Safari？**
  Safari 现已支持 WasmGC，但存在类似 bug，阻碍与 Flutter Wasm 渲染器的兼容。详情请关注[此 bug][safari-bug]。

[firefox-bug]: https://bugzilla.mozilla.org/show_bug.cgi?id=1788206
[safari-bug]: https://bugs.webkit.org/show_bug.cgi?id=267291

:::warning
Flutter compiled to Wasm can't run on the iOS version of any browser.
All browsers on iOS are required to use WebKit,
and can't use their own browser engine.

编译为 Wasm 的 Flutter 无法在任何浏览器的 iOS 版本上运行。iOS 上的所有浏览器都必须使用 WebKit，不能使用各自的浏览器引擎。
:::

## Using compatible JS interop libraries {:#js-interop-wasm}
## 使用兼容的 JS 互操作库 {:#js-interop-wasm}

To support compilation to Wasm, Dart has changed
how it enables interop with browser and JavaScript APIs.
This prevents Dart code that uses `dart:html` or `package:js`
from compiling to Wasm.

为支持编译到 Wasm，Dart 改变了与浏览器和 JavaScript API 互操作的方式。这会导致使用 `dart:html` 或 `package:js` 的 Dart 代码无法编译为 Wasm。

Instead, Dart now provides new, lightweight interop solutions built around
static JS interop:

取而代之的是，Dart 现在提供基于静态 JS 互操作的新轻量方案：

- [`package:web`][], which replaces `dart:html` (and other web libraries)

  [`package:web`][]，用于替代 `dart:html`（及其他 Web 库）

- [`dart:js_interop`][], which replaces `package:js` and `dart:js`

  [`dart:js_interop`][]，用于替代 `package:js` 和 `dart:js`

To learn more about JS interop in Dart,
see Dart's [JS interop][] documentation page.

要了解 Dart 中的 JS 互操作，请参阅 Dart 的 [JS interop][] 文档页面。

[`package:url_launcher`]: {{site.pub-pkg}}/url_launcher
[`package:web` migration guide]: {{site.dart-site}}/interop/js-interop/package-web
[JS interop]: {{site.dart-site}}/interop/js-interop
[`wasm-ready`]: {{site.pub-pkg}}?q=is%3Awasm-ready
[pub.dev]: {{site.pub}}
