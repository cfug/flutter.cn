---
# title: Embedding web content into a Flutter web app
title: 在 Flutter Web 应用中嵌入 Web 内容
# shortTitle: Web content in Flutter
shortTitle: Flutter 中的 Web 内容
# description: Learn how to load and display images on the web.
description: 了解如何在 Web 上加载和显示内容。
ai-translated: true
---

In some cases, Flutter web applications need to embed web content not
rendered by Flutter. For example, embedding a `google_maps_flutter` view
(which uses the Google Maps JavaScript SDK) or a `video_player`
(which uses a standard `video` element).

某些情况下，Flutter Web 应用需要嵌入不由 Flutter 渲染的 Web 内容。例如嵌入 `google_maps_flutter` 视图（使用 Google Maps JavaScript SDK）或 `video_player`（使用标准 `video` 元素）。

Flutter web can render arbitrary web content within the boundaries of a `Widget`,
and the primitives used to implement the example packages mentioned previously,
are available to all Flutter web applications.

Flutter Web 可在 widget 边界内渲染任意 Web 内容，前述示例包所用的底层能力对所有 Flutter Web 应用均可用。

## `HtmlElementView`
## `HtmlElementView` 组件

The `HtmlElementView` Flutter widget reserves a space in the layout to be
filled with any HTML Element. It has two constructors:

`HtmlElementView` Flutter widget 在布局中预留空间，由任意 HTML 元素填充。它有两个构造函数：

* `HtmlElementView.fromTagName`.

  `HtmlElementView.fromTagName`。

* `HtmlElementView` and `registerViewFactory`.

  `HtmlElementView` 与 `registerViewFactory`。

### `HtmlElementView.fromTagName`
### `HtmlElementView.fromTagName` 构造函数

The [`HtmlElementView.fromTagName` constructor][] creates an HTML Element from
its `tagName`, and provides an `onElementCreated` method to configure that
element before it's injected into the DOM:

[`HtmlElementView.fromTagName` constructor][] 根据 `tagName` 创建 HTML 元素，并提供 `onElementCreated` 方法，在注入 DOM 之前配置该元素：

```dart
// Create a `video` tag, and set its `src` and some `style` properties...
HtmlElementView.fromTag('video', onElementCreated: (Object video) {
  video as web.HTMLVideoElement;
  video.src = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
  video.style.width = '100%';
  video.style.height = '100%';
  // other customizations to the element...
});
```

To learn more about the way to interact with DOM APIs,
check out the [`HTMLVideoElement` class] in [`package:web`][].

要了解如何与 DOM API 交互，请参阅 [`package:web`][] 中的 [`HTMLVideoElement` class]。

To learn more about the video `Object` that is cast to `web.HTMLVideoElement`,
check out Dart's [JS Interoperability][] documentation.

要了解为何将 `Object` 转换为 `web.HTMLVideoElement`，请参阅 Dart 的 [JS Interoperability][] 文档。

[`HtmlElementView.fromTagName` constructor]: {{site.api}}/flutter/widgets/HtmlElementView/HtmlElementView.fromTagName.html
[`HTMLVideoElement` class]: {{site.pub}}/documentation/web/latest/web/HTMLVideoElement-extension-type.html
[`package:web`]: {{site.pub-pkg}}/web

### `HtmlElementView` and `registerViewFactory`
### `HtmlElementView` 与 `registerViewFactory`

If you need more control over generating the HTML code you inject, you can use
the primitives that Flutter uses to implement the `fromTagName` constructor. In
this scenario, register your own HTML Element factory for each type of HTML
content that needs to be added to your app.

若需更精细地控制所注入的 HTML，可使用 Flutter 实现 `fromTagName` 构造函数的底层能力。此时需为应用中每种要添加的 HTML 内容注册自己的 HTML 元素工厂。

The resulting code is more verbose, and has two steps per platform view type:

生成的代码更冗长，每种平台视图类型需两步：

1. Register the HTML Element Factory using
`platformViewRegistry.registerViewFactory` provided by `dart:ui_web.`

   使用 `dart:ui_web` 提供的 `platformViewRegistry.registerViewFactory` 注册 HTML 元素工厂。

1. Place the widget with the desired `viewType`  with
`HtmlElementView('viewType')` in your app's widget tree.

   在应用 widget 树中放置带有所需 `viewType` 的 `HtmlElementView('viewType')` widget。

For more details about this approach, check out
[`HtmlElementView` widget][] docs.

有关该方式的更多细节，请参阅 [`HtmlElementView` widget][] 文档。

[`HtmlElementView` widget]: {{site.api}}/flutter/widgets/HtmlElementView-class.html

## `package:webview_flutter`
## `package:webview_flutter` 插件

Embedding a full HTML page inside a Flutter app is such a common feature, that
the Flutter team offers a plugin to do so:

在 Flutter 应用中嵌入完整 HTML 页面非常常见，Flutter 团队提供了相应插件：

* [`package:webview_flutter`][]

  [`package:webview_flutter`][]

[JS Interoperability]: {{site.dart-site}}/interop/js-interop
[`package:webview_flutter`]: {{site.pub}}/packages/webview_flutter
[`package:webview_flutter_web`]: {{site.pub}}/packages/webview_flutter_web
