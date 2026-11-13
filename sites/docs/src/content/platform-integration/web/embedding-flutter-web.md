---
title: Add Flutter to any web application
shortTitle: Add Flutter to any web app
description: Learn the different ways to embed Flutter views into web content.

title: 将 Flutter 添加到任意 Web 应用
shortTitle: 将 Flutter 添加到任意 Web 应用
description: 了解将 Flutter 视图嵌入 Web 内容的不同方式。
---

Flutter views and web content can be composed to produce a web application
in different ways. Choose one of the following depending on your use-case:

* A Flutter view controls the full page ([full page mode][], including
  [`iframe` embeds](#iframe-embedding))
* Multiple Flutter views dynamically added to an existing web application
  ([embedded mode][])
* A single Flutter view rendered inside a specific HTML container
  ([custom `hostElement`][])

  将 Flutter 视图添加到现有 Web 应用（[嵌入模式][embedded mode]）

[full page mode]: #full-page-mode
[embedded mode]: #embedded-mode
[custom `hostElement`]: #custom-element-hostelement

## Full page mode

## 全页模式

In full page mode, the Flutter web application takes control of the whole
browser window and covers its viewport completely when rendering.

在全页模式下，Flutter Web 应用控制整个浏览器窗口，渲染时完全覆盖其视口。

This is the default embedding mode for new Flutter web projects, and no
additional configuration is needed.

这是新 Flutter Web 项目的默认嵌入模式，无需额外配置。

```html highlightLines=6
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <script src="flutter_bootstrap.js" defer></script>
  </body>
</html>
```

When Flutter web is launched without referencing `multiViewEnabled` or a
`hostElement`, it uses full page mode.

当 Flutter Web 启动时未引用 `multiViewEnabled` 或 `hostElement` 时，将使用全页模式。

To learn more about the `flutter_bootstrap.js` file,
check out [Customize app initialization][].

要了解 `flutter_bootstrap.js` 文件的更多信息，请参阅 [自定义应用初始化][Customize app initialization]。

[Customize app initialization]: /platform-integration/web/initialization

### Embed with an `iframe` {: #iframe-embedding }

### `iframe` 嵌入

Full page mode is recommended when embedding a Flutter web application through an
`iframe`. The page that embeds the `iframe` can size and position it as needed,
and Flutter will fill it completely.

通过 `iframe` 嵌入 Flutter Web 应用时，建议使用全页模式。
嵌入 `iframe` 的页面可按需设置其大小与位置，Flutter 将完全填充它。

```html
<iframe src="https://url-to-your-flutter/index.html"></iframe>
```

To learn more about the pros and cons of an `iframe`,
check out the [Inline Frame element][] docs on MDN.

要了解 `iframe` 的优缺点，请参阅 MDN 上的 [Inline Frame element][] 文档。

[Inline Frame element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe

### Compare `iframe` and direct DOM modes {: #compare-iframe-and-dom-embedding }

When integrating Flutter into an existing web application,
choose between `iframe` embedding and direct DOM embedding
(`hostElement` or multi-view)
based on your isolation, performance, and communication requirements:

| Feature | `iframe` embedding | Direct DOM embedding (`hostElement` / multi-view) |
| --- | --- | --- |
| **Isolation and sandboxing** | Full browser sandboxing with separate JS global scope, DOM tree, and CSS styles | Shares the same DOM tree and JavaScript context |
| **Memory and engine instances** | Each `iframe` initializes its own Flutter engine, WebAssembly/JS runtime, and memory heap | A single Flutter engine instance and memory heap can manage one or more views (when using multi-view) |
| **JavaScript interop** | Communication requires asynchronous messaging (such as `postMessage`) | Direct synchronous communication using `package:web` and `dart:js_interop` |
| **Styling and layout** | Independent frame isolated from host page CSS | Direct integration into host page CSS layout (such as flexbox and grid) |
| **State sharing** | State must be synchronized across window boundaries | Direct state sharing in Dart across all attached views |
| **Best for** | Third-party widgets, untrusted content, isolated micro-frontends, or simple drop-in embeds | Embedded UI components in existing web apps, multi-view dashboards, and tight host-app integration |

{:.table .table-striped}

## Embedded mode

## 嵌入模式

Flutter web applications can also render content into an arbitrary number of
elements (commonly `div`s) of another web application; this is called "embedded
mode" (or "multi-view").

Flutter Web 应用也可将内容渲染到另一 Web 应用的任意数量元素（通常是 `div`）中；
这称为「嵌入模式」（或「多视图」）。

In this mode:

在此模式下：

* A Flutter web application can launch, but doesn't render until the first
  "view" is added, with `addView`.

  Flutter Web 应用可以启动，但在通过 `addView` 添加第一个「视图」之前不会渲染。

* The host application can add or remove views from the embedded Flutter web
  application.

  宿主应用可以向嵌入的 Flutter Web 应用添加或移除视图。

* The Flutter application is notified when views are added or removed,
  so it can adjust its widgets accordingly.

  添加或移除视图时 Flutter 应用会收到通知，从而相应调整其 widget。

### Enable multi-view mode

### 启用多视图模式

Enable multi-view mode setting `multiViewEnabled: true` in the
`initializeEngine` method as shown:

在 `initializeEngine` 方法中设置 `multiViewEnabled: true` 以启用多视图模式，
如下所示：

```js highlightLines=8 title="flutter_bootstrap.js"
{% raw %}{{flutter_js}}{% endraw %}
{% raw %}{{flutter_build_config}}{% endraw %}

_flutter.loader.load({
  onEntrypointLoaded: async function onEntrypointLoaded(engineInitializer) {
    let engine = await engineInitializer.initializeEngine({
      multiViewEnabled: true, // Enables embedded mode.
    });
    let app = await engine.runApp();
    // Make this `app` object available to your JS app.
  }
});
```

### Manage Flutter views from JS

### 从 JS 管理 Flutter 视图

To add or remove views, use the `app` object returned by the `runApp` method:

要添加或移除视图，请使用 `runApp` 方法返回的 `app` 对象：

```js highlightLines=2-4,7
// Adding a view...
let viewId = app.addView({
  hostElement: document.querySelector('#some-element'),
});

// Removing viewId...
let viewConfig = app.removeView(viewId);
```

### Handle view changes from Dart {: #handling-view-changes-from-dart }

### 从 Dart 处理视图变更

View additions and removals are surfaced to Flutter through the
[`didChangeMetrics` method][] of the `WidgetsBinding` class.

视图的添加与移除通过 `WidgetsBinding` 类的 [`didChangeMetrics` method][] 暴露给 Flutter。

The complete list of views attached to your Flutter app is available
through the `WidgetsBinding.instance.platformDispatcher.views` iterable.
These views are of [type `FlutterView`][].

附加到 Flutter 应用的完整视图列表可通过 `WidgetsBinding.instance.platformDispatcher.views` 迭代器获取。
这些视图的 [类型为 `FlutterView`][type `FlutterView`]。

To render content into each `FlutterView`, your Flutter app needs to create a
[`View` widget][]. `View` widgets can be grouped together under a
[`ViewCollection` widget][].

要在每个 `FlutterView` 中渲染内容，Flutter 应用需要创建 [`View` widget][]。
`View` widget 可在 [`ViewCollection` widget][] 下分组。

The following example, from the _Multi View Playground_, encapsulates
the above in a `MultiViewApp` widget that can be used as the root widget for
your app. A [`WidgetBuilder` function][] runs for each `FlutterView`:

以下示例来自 **Multi View Playground**，将上述逻辑封装在可用作应用根 widget 的 `MultiViewApp` widget 中。
每个 `FlutterView` 都会运行 [`WidgetBuilder` function][]：

```dart highlightLines=25,39,46-49,56-61,72 title="multi_view_app.dart"
import 'dart:ui' show FlutterView;
import 'package:flutter/widgets.dart';

/// Calls [viewBuilder] for every view added to the app to obtain the widget to
/// render into that view. The current view can be looked up with [View.of].
class MultiViewApp extends StatefulWidget {
  const MultiViewApp({super.key, required this.viewBuilder});

  final WidgetBuilder viewBuilder;

  @override
  State<MultiViewApp> createState() => _MultiViewAppState();
}

class _MultiViewAppState extends State<MultiViewApp> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _updateViews();
  }

  @override
  void didUpdateWidget(MultiViewApp oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Need to re-evaluate the viewBuilder callback for all views.
    _views.clear();
    _updateViews();
  }

  @override
  void didChangeMetrics() {
    _updateViews();
  }

  Map<Object, Widget> _views = <Object, Widget>{};

  void _updateViews() {
    final Map<Object, Widget> newViews = <Object, Widget>{};
    for (final FlutterView view in WidgetsBinding.instance.platformDispatcher.views) {
      final Widget viewWidget = _views[view.viewId] ?? _createViewWidget(view);
      newViews[view.viewId] = viewWidget;
    }
    setState(() {
      _views = newViews;
    });
  }

  Widget _createViewWidget(FlutterView view) {
    return View(
      view: view,
      child: Builder(
        builder: widget.viewBuilder,
      ),
    );
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ViewCollection(views: _views.values.toList(growable: false));
  }
}
```

For more information, check out the
[`WidgetsBinding` mixin]({{site.api}}/flutter/widgets/WidgetsBinding-mixin.html)
in the API docs.

更多信息请参阅 API 文档中的 [`WidgetsBinding` mixin][]。

[`didChangeMetrics` method]: {{site.api}}/flutter/widgets/WidgetsBindingObserver/didChangeMetrics.html
[type `FlutterView`]: {{site.api}}/flutter/dart-ui/FlutterView-class.html
[`View` widget]: {{site.api}}/flutter/widgets/View-class.html
[`ViewCollection` widget]: {{site.api}}/flutter/widgets/ViewCollection-class.html
[`WidgetsBinding` mixin]: {{site.api}}/flutter/widgets/WidgetsBinding-mixin.html
[`WidgetBuilder` function]: {{site.api}}/flutter/widgets/WidgetBuilder.html

### Replace `runApp` by `runWidget` in Dart

### 在 Dart 中用 `runWidget` 替换 `runApp`

Flutter's [`runApp` function][] assumes that there's at least one view available
to render into (the `implicitView`), however in Flutter web's multi-view mode,
the `implicitView` doesn't exist anymore, so `runApp` will start failing with
`Unexpected null value` errors.

Flutter 的 [`runApp` function][] 假定至少有一个可用于渲染的视图 (`implicitView`)，
但在 Flutter Web 多视图模式下 `implicitView` 不再存在，
因此 `runApp` 将开始因 `Unexpected null value` 错误而失败。

In multi-view mode, your `main.dart` must call the [`runWidget` function][]
instead. It doesn't require an `implicitView`, and will only render into the
views that have been explicitly added into your app.

在多视图模式下，`main.dart` 必须改为调用 [`runWidget` function][]。
它不需要 `implicitView`，只会渲染到已显式添加到应用中的视图。

The following example uses the `MultiViewApp` described above to render
copies of the `MyApp()` widget on every `FlutterView` available:

以下示例使用上文 `MultiViewApp`，在每个可用的 `FlutterView` 上渲染 `MyApp()` widget 的副本：

```dart highlightLines=3 title="main.dart"
void main() {
  runWidget(
    MultiViewApp(
      viewBuilder: (BuildContext context) => const MyApp(),
    ),
  );
}
```

[`runApp` function]: {{site.api}}/flutter/widgets/runApp.html
[`runWidget` function]: {{site.api}}/flutter/widgets/runWidget.html

### Identify views {: #identifying-views }

### 识别视图

Each `FlutterView` has an identifier assigned by Flutter when
attached. This `viewId` can be used to uniquely identify each view,
retrieve its initial configuration, or decide what to render in it.

每个 `FlutterView` 在附加时由 Flutter 分配标识符。
该 `viewId` 可用于唯一标识每个视图、获取其初始配置或决定渲染内容。

The `viewId` of the rendered `FlutterView` can be retrieved from
its `BuildContext` like this:

已渲染 `FlutterView` 的 `viewId` 可通过其 `BuildContext` 如下获取：

```dart highlightLines=4-5
class SomeWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Retrieve the `viewId` where this Widget is being built:
    final int viewId = View.of(context).viewId;
    // ...
```

Similarly, from the `viewBuilder` method of the `MultiViewApp`,
the `viewId` can be retrieved like this:

同样，在 `MultiViewApp` 的 `viewBuilder` 方法中，可如下获取 `viewId`：

```dart highlightLines=4
MultiViewApp(
  viewBuilder: (BuildContext context) {
    // Retrieve the `viewId` where this Widget is being built:
    final int viewId = View.of(context).viewId;
    // Decide what to render based on `viewId`...
  },
)
```

Read more about the [`View.of` constructor][].

了解更多请参阅 [`View.of` constructor][]。

[`View.of` constructor]: {{site.api}}/flutter/widgets/View/of.html

### Initial view configuration

### 初始视图配置

Flutter views can receive any initialization data from JS when starting up.
The values are passed through the `initialData` property of the `addView`
method, as shown:

Flutter 视图在启动时可从 JS 接收任意初始化数据。
值通过 `addView` 方法的 `initialData` 属性传递，如下所示：

```js highlightLines=4-7
// Adding a view with initial data...
let viewId = app.addView({
  hostElement: someElement,
  initialData: {
    greeting: 'Hello, world!',
    randomValue: Math.floor(Math.random() * 100),
  }
});
```

In Dart, the `initialData` is available as a `JSAny` object, accessible through
the top-level `views` property in the `dart:ui_web` library. The data is
accessed through the `viewId` of the current view,  as shown:

在 Dart 中，`initialData` 作为 `JSAny` 对象可用，
可通过 `dart:ui_web` 库中的顶层 `views` 属性访问。
数据通过当前视图的 `viewId` 访问，如下所示：

```dart
final initialData = ui_web.views.getInitialData(viewId) as YourJsInteropType;
```

To learn how to define the `YourJsInteropType` class to map the `initialData`
object passed from JS so it's type-safe in your Dart program, check out:
[JS Interoperability][] on dart.dev.

要了解如何定义 `YourJsInteropType` 类以映射从 JS 传入的 `initialData` 对象，
从而在 Dart 程序中实现类型安全，请参阅 dart.dev 上的 [JS Interoperability][]。

[JS Interoperability]: {{site.dart-site}}/interop/js-interop

### View constraints

### 视图约束

By default, an embedded Flutter web view considers the size of its `hostElement`
as an immutable property, and tightly constrains its layout to the available
space.

默认情况下，嵌入的 Flutter Web 视图将 `hostElement` 的大小视为不可变属性，
并严格将布局约束在可用空间内。

On the web, it's common for the intrinsic size of an element to affect the
layout of the page (like `img` or `p` tags that can reflow content around
them).

在 Web 上，元素的固有尺寸常会影响页面布局（例如 `img` 或 `p` 标签可使周围内容重排）。

When adding a view to Flutter web, you might configure it with constraints that
inform Flutter of how the view needs to be laid out:

向 Flutter Web 添加视图时，可配置约束以告知 Flutter 视图应如何布局：

```js highlightLines=4-8
// Adding a view with initial data...
let viewId = app.addView({
  hostElement: someElement,
  viewConstraints: {
    maxWidth: 320,
    minHeight: 0,
    maxHeight: Infinity,
  }
});
```

The view constraints passed from JS need to be compatible with the CSS styling
of the `hostElement` where Flutter is being embedded. For example, Flutter
won't try to "fix" contradictory constants like passing  `max-height: 100px`
in CSS, but `maxHeight: Infinity` to Flutter.

从 JS 传入的视图约束需与嵌入 Flutter 的 `hostElement` 的 CSS 样式兼容。
例如，若 CSS 为 `max-height: 100px` 而向 Flutter 传入 `maxHeight: Infinity`，
Flutter 不会试图“修复”这类矛盾常量。

To learn more, check out the [`ViewConstraints` class][],
and [Understanding constraints][].

了解更多请参阅 [`ViewConstraints` class][] 与 [理解布局约束][Understanding constraints]。

[`ViewConstraints` class]: {{site.api}}/flutter/dart-ui/ViewConstraints-class.html
[Understanding constraints]: /ui/layout/constraints

## Custom element (`hostElement`)

## 自定义元素（`hostElement`）

You can embed a single-view Flutter web app
into any HTML element of your web page.

你可以将单视图 Flutter Web 应用嵌入网页的任意 HTML 元素。

To tell Flutter web which element to render into,
pass an object with a `config` field to the `_flutter.loader.load` function
that specifies a `HTMLElement` as the `hostElement`.

要指定 Flutter Web 渲染到哪个元素，
请向 `_flutter.loader.load` 传入带 `config` 字段的对象，
并将 `HTMLElement` 指定为 `hostElement`。

```js highlightLines=3
_flutter.loader.load({
  config: {
    hostElement: document.getElementById('flutter_host'),
  }
});
```

:::note
Multi-view embedding also works with a single view.
An advantage of embedding a single-view by using multi-view support,
is that you can create and remove views dynamically. Also,
if single view support is ever deprecated, it won't affect your app.

多视图嵌入也适用于单视图。通过多视图支持嵌入单视图的优势在于可以动态创建和移除视图。
此外，若单视图支持将来被弃用，也不会影响你的应用。
:::

To learn more about other configuration options,
check out [Customizing web app initialization][].

要了解其他配置选项，请参阅 [自定义 Web 应用初始化][Customizing web app initialization]。

[Customizing web app initialization]: /platform-integration/web/initialization

## Host element CSS requirements {: #host-element-css-requirements }

When embedding Flutter directly into a DOM element (using `hostElement`
with single-view or `addView` in multi-view mode), Flutter sizes its
rendering canvas based on the computed dimensions of the host container.

HTML container elements like `<div>` default to `height: auto` and
`position: static`. Without explicit CSS styling, an empty host element
has a computed height of `0px`.
This causes Flutter to compute the view height as zero,
which collapses the Flutter view and prevents content from rendering.

### Mandatory CSS properties {: #mandatory-css-properties }

To ensure Flutter renders correctly, apply the following CSS properties
to your host element:

* **`width` and `height`**:
  Set explicit or relative dimensions (for example,
  `width: 100%; height: 500px;` or `height: 100%` within a sized parent).
  The element must evaluate to a non-zero width and height.
* **`position: relative`** (or `position: absolute` / `position: fixed`):
  Establishes a positioning context for the canvas and DOM overlay layers
  that Flutter creates inside the container.
* **`overflow: hidden`**:
  Prevents Flutter canvas and interaction elements from overflowing
  the container boundaries or causing unexpected scrollbars on the host page.

### Example CSS {: #example-css }

```css title="styles.css"
#flutter_host {
  width: 100%;
  height: 600px;
  position: relative;
  overflow: hidden;
}
```

```html title="index.html"
<div id="flutter_host"></div>
```

## Optimize host pages and third-party scripts {: #landing-pages-and-third-party-scripts }

When embedding a Flutter view into an existing web page (such as a dashboard,
content-rich page, or app that loads third-party scripts), apply the following
patterns to protect initial page-load performance and avoid cross-origin header
conflicts.

### Lazy-load embedded views below the fold {: #lazy-load-embedded-views }

By default, `flutter_bootstrap.js` calls `_flutter.loader.load()` immediately,
which can compete with host HTML, CSS, and critical images during initial page
load.

When an embedded Flutter view sits below the fold or opens on interaction,
defer `_flutter.loader.load()` in a custom `web/flutter_bootstrap.js` file
by using an `IntersectionObserver` (or a `click` or `pointerenter` listener) to
protect initial Largest Contentful Paint (LCP):

```js title="web/flutter_bootstrap.js"
{% raw %}{{flutter_js}}{% endraw %}
{% raw %}{{flutter_build_config}}{% endraw %}

function initLazyFlutter() {
  const hostElement = document.getElementById('flutter_host');
  if (!hostElement) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();

      _flutter.loader.load({
        config: { hostElement },
      });
    },
    // Start loading before the container scrolls into view.
    { rootMargin: '200px' },
  );

  observer.observe(hostElement);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLazyFlutter, {
    once: true,
  });
} else {
  initLazyFlutter();
}
```

### Prevent Cumulative Layout Shift (CLS) {: #prevent-cls }

In addition to the [mandatory CSS properties](#mandatory-css-properties)
required for Flutter to compute non-zero view bounds,
mounting a Flutter view into a container whose height changes after layout
triggers a Cumulative Layout Shift (CLS) on the host page.

To keep surrounding page content stable while Flutter initializes:

* Size `#flutter_host` to its final layout dimensions upfront by using explicit
  `width` and `height` values or the CSS `aspect-ratio` property
  (for example, `width: 100%; aspect-ratio: 16 / 9;`).
* Render a lightweight HTML or CSS skeleton placeholder inside `#flutter_host`
  that matches the reserved dimensions until Flutter paints its first frame.

### Coexist with third-party cross-origin scripts and iframes {: #coexist-with-third-party-scripts }

When you build with the `--wasm` flag, multi-threaded WebAssembly rendering
requires cross-origin isolation (`COOP` and `COEP` HTTP response headers).
On host pages that load third-party scripts, analytics, external images, or
cross-origin embeds, choose the header strategy that matches the page:

* **Third-party scripts, analytics, and images**:
  Configure the server to send `Cross-Origin-Opener-Policy: same-origin` and
  `Cross-Origin-Embedder-Policy: credentialless` rather than `require-corp`.
  With `credentialless`, the browser loads cross-origin subresources without
  requiring third-party servers to return `Cross-Origin-Resource-Policy`
  headers.
* **Third-party cross-origin `<iframe>` embeds**:
  When the host document sets the `Cross-Origin-Embedder-Policy` header, the
  browser blocks cross-origin `<iframe>` elements that don't opt in to COEP.
  When the host page embeds incompatible third-party iframes, omit the `COEP`
  and `COOP` headers.
  Without cross-origin isolation, Flutter's WebAssembly build automatically
  runs in single-threaded mode; set `suppressMultithreadingWarning: true` to
  silence the console warning:

  ```js title="web/flutter_bootstrap.js"
  {% raw %}{{flutter_js}}{% endraw %}
  {% raw %}{{flutter_build_config}}{% endraw %}

  _flutter.loader.load({
    config: {
      hostElement: document.getElementById('flutter_host'),
      suppressMultithreadingWarning: true,
    },
  });
  ```

  If you provide a custom `onEntrypointLoaded` callback (for example, in
  [multi-view mode](#enable-multi-view-mode)), pass the configuration object to
  both `load()` and `initializeEngine()`.
  This configuration preserves WebAssembly (`dart2wasm`) single-threaded
  execution without breaking third-party cross-origin iframes.
  For additional details about loader flags,
  refer to [Customize the Flutter loader][customize-flutter-loader].

[customize-flutter-loader]: /platform-integration/web/initialization#customize-the-flutter-loader
