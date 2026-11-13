---
# title: Embedding web content into a Flutter web app
title: 在 Flutter Web 应用中嵌入 Web 内容
# shortTitle: Web content in Flutter
shortTitle: Flutter 中的 Web 内容
# description: >-
#   Learn how to embed web content, understand DOM slot layering,
#   and handle pointer events in Flutter web apps.
description: >-
  了解如何在 Flutter Web 应用中嵌入 Web 内容、理解 DOM 插槽层，
  以及处理指针事件。
ai-translated: true
---

In some cases, Flutter web applications need to embed web content not
rendered by Flutter. For example, embedding a `google_maps_flutter` view
(which uses the Google Maps JavaScript SDK) or a `video_player`
(which uses a standard `video` element).

某些情况下，Flutter Web 应用需要嵌入不由 Flutter 渲染的 Web 内容。
例如嵌入 `google_maps_flutter` 视图（使用 Google Maps JavaScript SDK）或 `video_player`（使用标准 `video` 元素）。

Flutter web can render arbitrary web content
within the boundaries of a `Widget`,
and the primitives used to implement the example packages mentioned previously
are available to all Flutter web applications.

Flutter Web 可在 widget 边界内渲染任意 Web 内容，
前述示例 package 所用的底层能力对所有 Flutter Web 应用均可用。

## HtmlElementView

## HtmlElementView 组件

The `HtmlElementView` Flutter widget reserves a space in the layout to be
filled with any HTML element. It has two constructors:

`HtmlElementView` Flutter widget 在布局中预留空间，由任意 HTML 元素填充。它有两个构造函数：

* `HtmlElementView.fromTagName`

  `HtmlElementView.fromTagName`

* `HtmlElementView` and `registerViewFactory`

  `HtmlElementView` 与 `registerViewFactory`

### `HtmlElementView.fromTagName`

### `HtmlElementView.fromTagName` 构造函数

The [`HtmlElementView.fromTagName` constructor][] creates an HTML element from
its `tagName`, and provides an `onElementCreated` method to configure that
element before it's injected into the DOM:

[`HtmlElementView.fromTagName` constructor][] 根据 `tagName` 创建 HTML 元素，
并提供 `onElementCreated` 方法，在注入 DOM 之前配置该元素：

```dart
// Create a `video` tag, and set its `src` and some `style` properties...
HtmlElementView.fromTagName(
  tagName: 'video',
  onElementCreated: (Object video) {
    video as web.HTMLVideoElement;
    video.src =
        'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
    video.style.width = '100%';
    video.style.height = '100%';
    // other customizations to the element...
  },
);
```

To learn more about how to interact with DOM APIs,
check out the [`HTMLVideoElement` class] in [`package:web`][].

要了解如何与 DOM API 交互，请参阅 [`package:web`][] 中的 [`HTMLVideoElement` class]。

To learn more about the video `Object` that is cast to `web.HTMLVideoElement`,
check out Dart's [JS Interoperability][] documentation.

要了解为何将 `Object` 转换为 `web.HTMLVideoElement`，请参阅 Dart 的 [JS Interoperability][] 文档。

### `HtmlElementView` and `registerViewFactory`

### `HtmlElementView` 与 `registerViewFactory`

If you need more control over generating the HTML code you inject,
you can use the primitives that Flutter uses to implement
the `fromTagName` constructor.
In this scenario, register your own HTML element factory
for each type of HTML content that you add to your app.

若需更精细地控制所注入的 HTML，
可使用 Flutter 实现 `fromTagName` 构造函数的底层能力。
此时需为应用中每种要添加的 HTML 内容注册自己的 HTML 元素工厂。

The resulting code has two steps per platform view type:

生成的代码针对每种平台视图类型包含两个步骤：

1. Register the HTML element factory using
   `platformViewRegistry.registerViewFactory` provided by `dart:ui_web`.

   使用 `dart:ui_web` 提供的 `platformViewRegistry.registerViewFactory` 注册 HTML 元素工厂。

1. Place the widget with the desired `viewType` using
   `HtmlElementView(viewType: 'viewType')` in your app's widget tree.

   在应用 widget 树中放置带有所需 `viewType` 的 `HtmlElementView(viewType: 'viewType')` widget。

For more details about this approach, check out the
[`HtmlElementView` widget][] docs.

有关该方式的更多细节，请参阅 [`HtmlElementView` widget][] 文档。

## Fixing hit testing issues

## 修复命中测试问题

Because of how Flutter web performs hit testing,
underlying platform views might sometimes swallow
pointer events before they can reach Flutter.

由于 Flutter Web 的命中测试方式，
底层平台视图有时会在指针事件到达 Flutter 之前将其吞掉。

To prevent losing pointer events intended for Flutter widgets,
use the [`package:pointer_interceptor`][] package.

为避免丢失本应交给 Flutter widget 的指针事件，
请使用 [`package:pointer_interceptor`][] package。

The [`PointerInterceptor`][] widget creates
an empty, transparent platform view
and places it directly behind its child widget in paint order.
This transparent element catches browser pointer events
before they reach the underlying `HtmlElementView`,
allowing Flutter's gesture framework to handle the interaction as expected.

[`PointerInterceptor`][] widget 会创建一个空的透明平台视图，
并按绘制顺序把它放在子 widget 正后方。
这个透明元素会在浏览器指针事件到达底层 `HtmlElementView` 之前拦截它们，
从而让 Flutter 的手势框架按预期处理交互。

### Add the dependency

### 添加依赖

Add `pointer_interceptor` to your `pubspec.yaml` file:

把 `pointer_interceptor` 加入 `pubspec.yaml`：

```yaml
dependencies:
  pointer_interceptor: ^0.10.1+2
```

### Wrap interactive widgets

### 包裹可交互 widget

To make an individual interactive widget clickable over an `HtmlElementView`
(such as a [`FloatingActionButton`][] or [`ElevatedButton`][]),
wrap the widget with `PointerInterceptor`:

要让单个可交互 widget 在 `HtmlElementView` 之上可点击
（例如 [`FloatingActionButton`][] 或 [`ElevatedButton`][]），
请用 `PointerInterceptor` 包裹该 widget：

```dart
PointerInterceptor(
  child: FloatingActionButton(
    onPressed: () {
      // Handle button press
    },
    child: const Icon(Icons.add),
  ),
)
```

### Wrap layout and overlay containers

### 包裹布局与叠加容器

When you use overlay components that cover a platform view,
such as a [`Drawer`][], dialog, or popup menu,
wrap the container widget in a `PointerInterceptor`:

使用覆盖平台视图的叠加组件时，
例如 [`Drawer`][]、对话框或弹出菜单，
请用 `PointerInterceptor` 包裹容器 widget：

```dart
Scaffold(
  drawer: PointerInterceptor(
    child: Drawer(
      child: ListView(
        children: [
          ListTile(
            title: const Text('Home'),
            onTap: () {
              // Handle navigation
            },
          ),
        ],
      ),
    ),
  ),
  body: HtmlElementView.fromTagName(tagName: 'iframe'),
)
```

### Conditionally intercept events

### 按条件拦截事件

The `intercepting` property lets you enable or disable pointer interception
based on a boolean condition:

`intercepting` 属性可根据布尔条件启用或禁用指针拦截：

```dart
PointerInterceptor(
  intercepting: isOverlayVisible,
  child: ElevatedButton(
    onPressed: () {
      // Handle button press
    },
    child: const Text('Submit'),
  ),
)
```

When `intercepting` is `false`, `PointerInterceptor` renders its `child`
directly without creating an extra platform view in the DOM.

当 `intercepting` 为 `false` 时，`PointerInterceptor` 会直接渲染其 `child`，
不会在 DOM 中额外创建平台视图。

### Debug interceptor bounds

### 调试拦截区域边界

The `PointerInterceptor` widget includes a `debug` property.
Setting `debug: true` renders a visible colored overlay
over the interceptor area,
helping you verify the size and position of the intercepted region:

`PointerInterceptor` widget 包含 `debug` 属性。
设置 `debug: true` 会在拦截区域上渲染可见的彩色叠加层，
便于确认被拦截区域的大小和位置：

```dart
PointerInterceptor(
  debug: true,
  child: ElevatedButton(
    onPressed: () {},
    child: const Text('Click me'),
  ),
)
```

## `package:webview_flutter`

## `package:webview_flutter` 插件

Embedding a full HTML page inside a Flutter app is a common requirement.
The Flutter team offers a plugin for this purpose:

在 Flutter 应用中嵌入完整 HTML 页面非常常见，Flutter 团队提供了相应插件：

* [`package:webview_flutter`][]

[JS Interoperability]: {{site.dart-site}}/interop/js-interop
[`Drawer`]: {{site.api}}/flutter/material/Drawer-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`FloatingActionButton`]: {{site.api}}/flutter/material/FloatingActionButton-class.html
[`HtmlElementView.fromTagName` constructor]: {{site.api}}/flutter/widgets/HtmlElementView/HtmlElementView.fromTagName.html
[`HtmlElementView` widget]: {{site.api}}/flutter/widgets/HtmlElementView-class.html
[`HTMLVideoElement` class]: {{site.pub}}/documentation/web/latest/web/HTMLVideoElement-extension-type.html
[`package:pointer_interceptor`]: {{site.pub-pkg}}/pointer_interceptor
[`package:web`]: {{site.pub-pkg}}/web
[`package:webview_flutter`]: {{site.pub-pkg}}/webview_flutter
[`package:webview_flutter_web`]: {{site.pub-pkg}}/webview_flutter_web
[`PointerInterceptor`]: {{site.pub-api}}/pointer_interceptor/latest/pointer_interceptor/PointerInterceptor-class.html
