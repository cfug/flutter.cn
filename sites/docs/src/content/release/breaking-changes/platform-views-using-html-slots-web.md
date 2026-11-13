---
# title: Using HTML slots to render platform views in the web
title: 使用 HTML slot 在 Web 上渲染平台视图
# description: >
#   iframes in Flutter web used to reload, because of
#   the way some DOM operations were made.
#   A change in the way Flutter web apps render platform views
#   makes them stable (preventing iframe reloads, and other problems
#   with video tags or forms potentially losing their state).
description: >
  Flutter Web 中的 iframe 以前会重新加载，
  原因是某些 DOM 操作的方式。
  Flutter Web 应用渲染平台视图的方式有了改动，
  使它们保持稳定（避免 iframe 重新加载，
  以及其他可能导致 video 标签或表单丢失状态的问题）。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Flutter now renders all web platform views in a consistent location of the DOM,
as direct children of `flt-glass-pane` (regardless of the rendering backend:
`html` or `canvaskit`). Platform views are then _"slotted"_ into the correct
position of the App's DOM with standard HTML features.

Flutter 现在会把所有 Web 平台视图渲染到 DOM 中的固定位置，
作为 `flt-glass-pane` 的直接子节点
（与渲染后端是 `html` 还是 `canvaskit` 无关）。
然后通过标准 HTML 特性，把平台视图 **「slotted」** 到应用 DOM 的正确位置。

Up until this change, Flutter web would change the styling of the rendered
contents of a platform views to position/size it to the available space. **This
is no longer the case.** Users can now decide how they want to utilize the space
allocated to their platform view by the framework.

在这次改动之前，Flutter Web 会修改平台视图已渲染内容的样式，
把它定位并缩放到可用空间。**现在不再这样做。**
你现在可以自己决定如何使用框架分配给平台视图的空间。

## Context

## 背景

The Flutter framework frequently tweaks its render tree to optimize the paint
operations that are ultimately made per frame. In the web, these render tree
changes often result in DOM operations.

Flutter 框架会频繁调整渲染树，以优化每一帧最终执行的绘制操作。
在 Web 上，这些渲染树变化往往会变成 DOM 操作。

Flutter web used to render its platform views ([`HtmlElementView` widgets][])
directly into its corresponding position of the DOM.

Flutter Web 以前会把平台视图（[`HtmlElementView` widget][`HtmlElementView` widgets]）
直接渲染到 DOM 中对应的位置。

Using certain DOM elements as the "target" of some DOM operations causes those
elements to lose their internal state. In practice, this means that `iframe`
tags are going to reload, `video` players might restart, or an editable form
might lose its edits.

把某些 DOM 元素当作一些 DOM 操作的「目标」，会导致这些元素丢失内部状态。
实际表现是：`iframe` 标签会重新加载，`video` 播放器可能会重新开始，
可编辑表单也可能会丢掉已输入的内容。

Flutter now renders platform views using [slot elements][] inside of a single,
app-wide [shadow root][]. Slot elements can be added/removed/moved around the
Shadow DOM without affecting the underlying slotted content (which is rendered
in a constant location)

Flutter 现在使用整个应用共用的一个 [shadow root][shadow root] 内的
[slot 元素][slot elements] 来渲染平台视图。
slot 元素可以在 Shadow DOM 中添加、移除或移动，
而不会影响底层被 slot 嵌入的内容（这些内容渲染在固定位置）。

This change was made to:

这次改动是为了：

* Stabilize the behavior of platform views in Flutter web.

  稳定 Flutter Web 中平台视图的行为。

* Unify how platform views are rendered in the web for both rendering
   backends (`html` and `canvaskit`).

  统一两种渲染后端（`html` 和 `canvaskit`）在 Web 上渲染平台视图的方式。

* Provide a predictable location in the DOM that allows developers to reliably
   use CSS to style their platform views, and to use other standard DOM API,
   such as `querySelector`, and `getElementById`.

  在 DOM 中提供一个可预期的位置，让你能可靠地用 CSS 设置平台视图的样式，
  并使用 `querySelector`、`getElementById` 等其他标准 DOM API。

## Description of change

## 改动说明

A Flutter web app is now rendered inside a common [shadow root][] in which
[slot elements][] represent platform views. The actual content of
each platform view is rendered as a **sibling of said shadow root**.

Flutter Web 应用现在渲染在一个共用的 [shadow root][shadow root] 里，
其中的 [slot 元素][slot elements] 代表平台视图。
每个平台视图的实际内容会作为 **该 shadow root 的兄弟节点** 渲染。

### Before

### 之前

```html
...

<flt-glass-pane>
  ...
  <div id="platform-view">Contents</div> <!-- canvaskit -->
  <!-- OR -->
  <flt-platform-view>
    #shadow-root
    | <div id="platform-view">Contents</div> <!-- html -->
  </flt-platform-view>
  ...
</flt-glass-pane>

...
```

### After

### 之后

```html
...

<flt-glass-pane>
  #shadow-root
  | ...
  | <flt-platform-view-slot>
  |   <slot name="platform-view-1" />
  | </flt-platform-view-slot>
  | ...
  <flt-platform-view slot="platform-view-1">
    <div id="platform-view">Contents</div>
  </flt-platform-view>
  ...
</flt-glass-pane>

...
```

After this change, when the framework needs to move DOM nodes around, it
operates over `flt-platform-view-slot`s, which only contain a `slot` element.
The slot _projects_ the contents defined in `flt-platform-view` elements outside
the shadow root. `flt-platform-view` elements are never the target of DOM
operations from the framework, thus preventing the reload issues.

这次改动之后，框架需要移动 DOM 节点时，
操作的是只包含一个 `slot` 元素的 `flt-platform-view-slot`。
slot 会 **投射** shadow root 之外、`flt-platform-view` 元素中定义的内容。
`flt-platform-view` 元素永远不会成为框架 DOM 操作的目标，
因此不会再出现重新加载的问题。

From an app's perspective, this change is transparent. **However**, this is
considered a _breaking change_ because some tests make assumptions
about the internal DOM of a Flutter web app, and break.

从应用的角度看，这次改动是透明的。**但是**，它仍被视为一次 **破坏性改动**，
因为有些测试对 Flutter Web 应用的内部 DOM 做了假设，从而会失败。

## Migration guide

## 迁移指南

### Code

### 代码

The engine may print a warning message to the console similar to:

引擎可能会在控制台打印类似下面的警告：

```bash
Height of Platform View type: [$viewType] may not be set. Defaulting to `height: 100%`.
Set `style.height` to any appropriate value to stop this message.
```

or:

或者：

```bash
Width of Platform View type: [$viewType] may not be set. Defaulting to `width: 100%`.
Set `style.width` to any appropriate value to stop this message.
```

Previously, the content returned by [`PlatformViewFactory` functions][] was
resized and positioned by the framework. Instead, Flutter now sizes and
positions `<flt-platform-view-slot>`, which is the parent of the slot where the
content is projected.

以前，[`PlatformViewFactory` 函数][`PlatformViewFactory` functions] 返回的内容
会由框架调整大小和位置。
现在，Flutter 调整大小和位置的是 `<flt-platform-view-slot>`，
它是内容所投射到的那个 slot 的父节点。

To stop the warning above, platform views need to set the `style.width` and
`style.height` of their root element to any appropriate (non-null) value.

要消除上面的警告，平台视图需要把根元素的 `style.width` 和 `style.height`
设为任意合适的非 null 值。

For example, to make the root `html.Element` fill all the available space
allocated by the framework, set its `style.width` and `style.height` properties
to `'100%'`:

例如，要让根 `html.Element` 填满框架分配的全部可用空间，
把它的 `style.width` 和 `style.height` 设为 `'100%'`：

```dart
ui.platformViewRegistry.registerViewFactory(viewType, (int viewId) {
  final html.Element htmlElement = html.DivElement()
    // ..other props
    ..style.width = '100%'
    ..style.height = '100%';
  // ...
  return htmlElement;
});
```

If other techniques are used to lay out the platform view (like `inset: 0`) a
value of `auto` for `width` and `height` is enough to stop the warning.

如果用了其他方式来布局平台视图（例如 `inset: 0`），
把 `width` 和 `height` 设为 `auto` 就足以消除警告。

Read more about [`CSS width`][] and [`CSS height`][].

进一步了解 [`CSS width`][`CSS width`] 和 [`CSS height`][`CSS height`]。

### Tests

### 测试

After this change, user's test code does **not** need to deeply inspect the
contents of the shadow root of the App. All of the platform view contents will
be placed as direct children of `flt-glass-pane`, wrapped in a
`flt-platform-view` element.

这次改动之后，你的测试代码 **不需要** 深入检查应用 shadow root 的内容。
所有平台视图的内容都会作为 `flt-glass-pane` 的直接子节点，
包在 `flt-platform-view` 元素里。

Avoid looking inside the `flt-glass-pane` shadow root, it is considered a
**"private implementation detail"**, and its markup can change at any time,
without notice.

不要查看 `flt-glass-pane` shadow root 的内部。它被视为 **「私有实现细节」**，
其标记可能随时改变，且不会另行通知。

(See Relevant PRs below for examples of the "migrations" described above).

（下面的相关 PR 中有上述「迁移」的示例。）

## Timeline

## 时间线

Landed in version: 2.3.0-16.0.pre<br>
合入版本：2.3.0-16.0.pre<br>
In stable release: 2.5

进入稳定版：2.5

## References

## 参考资料

Design document:

设计文档：

* [Using slot to embed web Platform Views][design doc]

  [使用 slot 嵌入 Web 平台视图][design doc]

Relevant issues:

相关 issue：

* [Issue #80524][issue-80524]

  [Issue #80524][issue-80524]

Relevant PRs:

相关 PR：

* [flutter/engine#25747][pull-25747]: Introduces the feature.

  [flutter/engine#25747][pull-25747]：引入该功能。

* [flutter/flutter#82926][pull-82926]: Tweaks `flutter` tests.

  [flutter/flutter#82926][pull-82926]：调整 `flutter` 测试。

* [flutter/plugins#3964][pull-3964]: Tweaks to `plugins` code.

  [flutter/plugins#3964][pull-3964]：调整 `plugins` 代码。

* [flutter/packages#364][pull-364]: Tweaks to `packages` code.

  [flutter/packages#364][pull-364]：调整 `packages` 代码。

[`CSS height`]: https://developer.mozilla.org/en-US/docs/Web/CSS/height
[`CSS width`]: https://developer.mozilla.org/en-US/docs/Web/CSS/width
[`HtmlElementView` widgets]: {{site.api}}/flutter/widgets/HtmlElementView-class.html
[`PlatformViewFactory` functions]: {{site.repo.engine}}/blob/58459a5e342f84c755919f2ad5029b22bcddd548/lib/web_ui/lib/src/engine/platform_views/content_manager.dart#L15-L18
[design doc]: /go/web-slot-content
[issue-80524]: {{site.repo.flutter}}/issues/80524
[pull-25747]: {{site.repo.engine}}/pull/25747
[pull-364]: {{site.repo.packages}}/pull/364
[pull-3964]: https://github.com/flutter/plugins/pull/3964
[pull-82926]: {{site.repo.flutter}}/pull/82926
[shadow root]: https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot
[slot elements]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot
