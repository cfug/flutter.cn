---
# title: Drag outside an app
title: 在应用外拖拽
# description: How to drag from an app to another app or the operating system.
description: 如何从应用拖拽到另一个应用或操作系统。
ai-translated: true
---

You might want to implement
drag and drop somewhere in your app.

你可能希望在应用的某个位置实现拖拽功能。

You have a couple potential approaches
that you can take. One directly uses
Flutter widgets and the other uses a package
([super_drag_and_drop][]), available on [pub.dev][].

你可以采用几种潜在方案。
一种直接使用 Flutter widget，
另一种使用 [pub.dev][] 上的 package（[super_drag_and_drop][]）。

[pub.dev]: {{site.pub}}
[super_drag_and_drop]: {{site.pub-pkg}}/super_drag_and_drop

## Create draggable widgets within your app

## 在应用内创建可拖拽 widget

If you want to implement drag and drop within
your application, you can use the [`Draggable`][]
widget. For insight into this approach, see
the [Drag a UI element within an app][] recipe.

若要在应用内实现拖拽，可以使用 [`Draggable`][] widget。
要了解该做法，请参阅 [在应用内拖拽 UI 元素][Drag a UI element within an app] Cookbook 教程。

An advantage of using `Draggable` and `DragTarget` is
that you can supply Dart code to decide whether to accept a drop.

使用 `Draggable` 和 `DragTarget` 的一个优点是，
你可以编写 Dart 代码来决定是否接受放置。

For more information, check out the
[`Draggable` widget of the week][video] video.

更多信息请参阅
[`Draggable` widget of the week][video] 视频。

[Drag a UI element within an app]: /cookbook/effects/drag-a-widget
[`Draggable`]:  {{site.api}}/flutter/widgets/Draggable-class.html
[`DragTarget`]: {{site.api}}/flutter/widgets/DragTarget-class.html
[local data]: {{site.pub-api}}/super_drag_and_drop/latest/super_drag_and_drop/DragItem/localData.html
[video]: https://youtu.be/q4x2G_9-Mu0?si=T4679e90U2yrloCs

## Implement drag and drop between apps

## 在应用之间实现拖拽

If you want to implement drag and drop within
your application and _also_ between your
application and another (possibly non-Flutter) app,
check out the [super_drag_and_drop][] package.

若要在应用内实现拖拽，**并且** 还要在
你的应用与另一个（可能非 Flutter）应用之间实现拖拽，
请查看 [super_drag_and_drop][] package。

To avoid implementing two styles of drag and drop,
one for drags outside of the app and another for
dragging inside the app,
you can supply [local data][] to the package to
perform drags within your app.

为避免实现两套拖拽方式——一套用于应用外拖拽、另一套用于应用内拖拽——
你可以向该 package 提供 [local data][]，
以在应用内执行拖拽。

Another difference between this approach and
using `Draggable` directly,
is that you must tell the package up front
what data your app accepts because the platform
APIs need a synchronous response, which doesn't
allow an asynchronous response from the framework.

该做法与直接使用 `Draggable` 的另一项区别是，
你必须事先告知 package 你的应用接受哪些数据，
因为平台 API 需要同步响应，而框架无法提供异步响应。

An advantage of using this approach is that it
works across desktop, mobile, _and_ web.

该做法的一个优点是它适用于桌面、移动端 **以及** Web。
