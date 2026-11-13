---
# title: MouseTracker no longer attaches annotations
title: MouseTracker 不再附加注解
# description: >
#   MouseTracker no longer relies on annotation attachment to
#   perform the mounted-exit check; therefore,
#   all three related methods are removed.
description: >-
  MouseTracker 不再依赖附加注解来执行已挂载退出检查，
  因此相关的三个方法都已移除。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Removed `MouseTracker`'s methods `attachAnnotation`,
`detachAnnotation`, and `isAnnotationAttached`.

移除了 `MouseTracker` 的 `attachAnnotation`、
`detachAnnotation` 和 `isAnnotationAttached` 方法。

## Context

## 上下文

Mouse events, such as when a mouse pointer has entered a region,
exited, or is hovering over a region, are detected with the help of
`MouseTrackerAnnotation`s that are placed on interested regions
during the render phase. Upon each update (a new frame or a new event),
`MouseTracker` compares the annotations hovered by the mouse
pointer before and after the update, then dispatches
callbacks accordingly.

鼠标事件，例如指针进入某个区域、离开某个区域或在某个区域上悬停，
是借助渲染阶段放在相关区域上的 `MouseTrackerAnnotation` 来检测的。
每次更新（新的一帧或新的事件）时，`MouseTracker` 会比较更新前后
鼠标指针悬停的注解，然后相应地分发回调。

The `MouseTracker` class, which manages the state of mouse pointers,
used to require `MouseRegion` to attach annotations when mounted,
and detach annotations when unmounted.
This was used by `MouseTracker` to perform the
_mounted-exit check_ (for example, `MouseRegion.onExit`
must not be called if the exit was caused by the unmounting
of the widget), in order to prevent calling `setState`
of an unmounted widget and throwing exceptions (explained
in detail in [Issue #44631][]).

管理鼠标指针状态的 `MouseTracker` 类，
过去要求 `MouseRegion` 在挂载时附加注解，在卸载时分离注解。
`MouseTracker` 用它来执行 **已挂载退出检查**
（例如，如果离开是由 widget 卸载引起的，
就不能调用 `MouseRegion.onExit`），
以免对已卸载的 widget 调用 `setState` 并抛出异常
（详见 [问题 #44631][Issue #44631]）。

This mechanism has been replaced by making `MouseRegion`
a stateful widget, so that it can perform the mounted-exit
check by itself by blocking the callback when unmounted.
Therefore, these methods have been removed, and `MouseTracker`
no longer tracks all annotations on the screen.

这一机制已被替换：`MouseRegion` 改成了有状态 widget，
这样它可以在卸载时自行拦截回调，完成已挂载退出检查。
因此这些方法已被移除，`MouseTracker` 也不再跟踪屏幕上的全部注解。

## Description of change

## 变更说明

The `MouseTracker` class has removed three methods related
to attaching annotations:

`MouseTracker` 类移除了三个与附加注解相关的方法：

```dart diff
  class MouseTracker extends ChangeNotifier {
    // ...
-   void attachAnnotation(MouseTrackerAnnotation annotation) {/* ... */}

-   void detachAnnotation(MouseTrackerAnnotation annotation) {/* ... */}

-   @visibleForTesting
-   bool isAnnotationAttached(MouseTrackerAnnotation annotation) {/* ... */}
  }
```

`RenderMouseRegion` and `MouseTrackerAnnotation` no longer perform the
mounted-exit check, while `MouseRegion` still does.

`RenderMouseRegion` 和 `MouseTrackerAnnotation` 不再执行已挂载退出检查，
而 `MouseRegion` 仍然会执行。

## Migration guide

## 迁移指南

Calls to `MouseTracker.attachAnnotation` and
`detachAnnotation` should be removed with little to no impact:

对 `MouseTracker.attachAnnotation` 和 `detachAnnotation` 的调用应当移除，
影响很小，甚至没有影响：

* Uses of `MouseRegion` should not be affected at all.

  使用 `MouseRegion` 的代码完全不受影响。

* If your code directly uses `RenderMouseRegion` or
  `MouseTrackerAnnotation`, be aware that `onExit`
  is now called when the exit is caused by events that used
  to call `MouseTracker.detachAnnotation`.
  This should not be a problem if no states are involved,
  otherwise you might want to add the mounted-exit check,
  especially if the callback is leaked so that outer
  widgets might call `setState` in it. For example:

  如果代码直接使用 `RenderMouseRegion` 或 `MouseTrackerAnnotation`，
  请注意：当离开是由过去会调用 `MouseTracker.detachAnnotation` 的事件引起时，
  现在会调用 `onExit`。
  如果不涉及状态，这应该不是问题；
  否则你可能需要加上已挂载退出检查，
  尤其是回调被泄漏、外层 widget 可能在其中调用 `setState` 的时候。例如：

Code before migration:

迁移之前的代码：

```dart
class MyMouseRegion extends SingleChildRenderObjectWidget {
  const MyMouseRegion({this.onHoverChange});

  final ValueChanged<bool> onHoverChange;

  @override
  RenderMouseRegion createRenderObject(BuildContext context) {
    return RenderMouseRegion(
      onEnter: (_) { onHoverChange(true); },
      onExit: (_) { onHoverChange(false); },
    );
  }

  @override
  void updateRenderObject(BuildContext context, RenderMouseRegion renderObject) {
    renderObject
      ..onEnter = (_) { onHoverChange(true); }
      ..onExit = (_) { onHoverChange(false); };
  }
}
```

Code after migration:

迁移之后的代码：

```dart
class MyMouseRegion extends SingleChildRenderObjectWidget {
  const MyMouseRegion({this.onHoverChange});

  final ValueChanged<bool> onHoverChange;

  @override
  RenderMouseRegion createRenderObject(BuildContext context) {
    return RenderMouseRegion(
      onEnter: (_) { onHoverChange(true); },
      onExit: (_) { onHoverChange(false); },
    );
  }

  @override
  void updateRenderObject(BuildContext context, RenderMouseRegion renderObject) {
    renderObject
      ..onEnter = (_) { onHoverChange(true); }
      ..onExit = (_) { onHoverChange(false); };
  }

  @override
  void didUnmountRenderObject(RenderMouseRegion renderObject) {
    renderObject
      ..onExit = onHoverChange == null ? null : (_) {};
  }
}
```

Calls to `MouseTracker.isAnnotationAttached` must be removed.
This feature is no longer technically possible,
since annotations are no longer tracked.
If you somehow need this feature, please submit an issue.

必须移除对 `MouseTracker.isAnnotationAttached` 的调用。
由于不再跟踪注解，这个功能在技术上已经无法实现。
如果确实需要这个功能，请提交一个 issue。

## Timeline

## 时间线

Landed in version: 1.15.4<br>
合入版本：1.15.4<br>
In stable release: 1.17

进入稳定版：1.17

## References

## 参考资料

API documentation:

API 文档：

* [`MouseRegion`][]
* [`MouseTracker`][]
* [`MouseTrackerAnnotation`][]
* [`RenderMouseRegion`][]

Relevant PRs:

相关 PR：

* [MouseTracker no longer requires annotations attached][],
  which made the change

  [MouseTracker 不再要求附加注解][MouseTracker no longer requires annotations attached]，
  也就是这次改动

* [Improve MouseTracker lifecycle: Move checks to post-frame][],
  which first introduced the mounted-exit change,
  explained at _The change to onExit_.

  [改进 MouseTracker 生命周期：将检查移到帧之后][Improve MouseTracker lifecycle: Move checks to post-frame]，
  首次引入了已挂载退出变更，
  说明见 **onExit 的变更**。


[Improve MouseTracker lifecycle: Move checks to post-frame]: {{site.repo.flutter}}/issues/44631
[Issue #44631]: {{site.repo.flutter}}/pull/44631
[`MouseRegion`]: {{site.api}}/flutter/widgets/MouseRegion-class.html
[`MouseTracker`]: {{site.api}}/flutter/gestures/MouseTracker-class.html
[MouseTracker no longer requires annotations attached]: {{site.repo.flutter}}/issues/48453
[`MouseTrackerAnnotation`]: {{site.api}}/flutter/gestures/MouseTrackerAnnotation-class.html
[`RenderMouseRegion`]: {{site.api}}/flutter/rendering/RenderMouseRegion-class.html
