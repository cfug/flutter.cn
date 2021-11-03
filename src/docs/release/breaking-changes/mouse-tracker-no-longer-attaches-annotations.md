---
title: MouseTracker no longer attaches annotations
title: MouseTracker 不再附加注释
description: MouseTracker no longer relies on annotation attachment to perform the mounted-exit check; therefore, all three related methods are removed.
description: MouseTracker 不再依赖注释附件来执行安装退出检查，因此删除了三个相关方法。
---

## Summary

## 概述

Removed `MouseTracker`'s methods `attachAnnotation`,
`detachAnnotation`, and `isAnnotationAttached`.

`MouseTracker` 的方法 `attachAnnotation`、`detachAnnotation` 和 `isAnnotationAttached` 已被移除。

## Context

## 上下文

Mouse events, such as when a mouse pointer has entered a region,
exited, or is hovering over a region, are detected with the help of
`MouseTrackerAnnotation`s that are placed on interested regions
during the render phase. Upon each update (a new frame or a new event),
`MouseTracker` compares the annotations hovered by the mouse
pointer before and after the update, then dispatches
callbacks accordingly.

在渲染阶段，通过在感兴趣区域上放置 `MouseTrackerAnnotation` 可以检测鼠标事件，
例如鼠标指针进入、退出或悬停在区域上。每次更新（一个新的帧或事件）时，
`MouseTracker` 会比较更新前后鼠标指针悬停的注释，然后执行相应的回调。

The `MouseTracker` class, which manages the state of mouse pointers,
used to require `MouseRegion` to attach annotations when mounted,
and detach annotations when unmounted.
This was used by `MouseTracker` to perform the
_mounted-exit check_ (for example, `MouseRegion.onExit`
must not be called if the exit was caused by the unmounting
of the widget), in order to prevent calling `setState`
of an unmounted widget and throwing exceptions (explained
in detail in [Issue #44631][]).

`MouseTracker` 类管理鼠标指针的状态，要求 `MouseRegion` 在挂载（mounted）时附加注释，
在移除（unmounted）时分离注释。`MouseTracker` 使用它来执行 **挂载退出检查**。
（例如，如果是因移除 widget 引起的退出，则不调用 `MouseRegion.onExit`），
防止移除 widget 时调用 `setState` 引发的异常（详情可见 [Issue #44631][]）。

This mechanism has been replaced by making `MouseRegion`
a stateful widget, so that it can perform the mounted-exit
check by itself by blocking the callback when unmounted.
Therefore, these methods have been removed, and `MouseTracker`
no longer tracks all annotations on the screen.

这种机制已经被 `MouseRegion` 变为一个有状态的 widget 所取代，
它可以通过在卸载时阻止回调来自行执行挂载退出检查。
因此，这些方法已被删除，`MouseTracker` 不再跟踪屏幕上的所有注释。

## Description of change

## 更改描述

The `MouseTracker` class has removed three methods related
to attaching annotations:

`MouseTracker` 类删除了三个与附加注释相关的方法：

```diff
 class MouseTracker extends ChangeNotifier {
   // ...
-  void attachAnnotation(MouseTrackerAnnotation annotation) {/* ... */}

-  void detachAnnotation(MouseTrackerAnnotation annotation) {/* ... */}

-  @visibleForTesting
-  bool isAnnotationAttached(MouseTrackerAnnotation annotation) {/* ... */}
 }
```

`RenderMouseRegion` and `MouseTrackerAnnotation` no longer perform the
mounted-exit check, while `MouseRegion` still does.

`RenderMouseRegion` 和 `MouseTrackerAnnotation` 不再执行挂载退出检查，在 `MouseRegion` 中仍然执行。

## Migration guide

## 迁移指南

Calls to `MouseTracker.attachAnnotation` and
`detachAnnotation` should be removed with little to no impact:

删除 `MouseTracker.attachAnnotation` 和 `detachAnnotation` 的调用，这几乎没有影响：

* Uses of `MouseRegion` should not be affected at all.

  `MouseRegion` 的使用应该完全不受影响。
  
* If your code directly uses `RenderMouseRegion` or
  `MouseTrackerAnnotation`, be aware that `onExit`
  is now called when the exit is caused by events that used
  to call `MouseTracker.detachAnnotation`.
  This should not be a problem if no states are involved,
  otherwise you might want to add the mounted-exit check,
  especially if the callback is leaked so that outer
  widgets might call `setState` in it. For example:

  如果你的代码直接使用 `RenderMouseRegion` 或 `MouseTrackerAnnotation`，
  请注意现在 `onExit` 的回调会在 `MouseTracker.detachAnnotation` 事件引起的退出时触发。 
  如果不涉及任何状态，应该不会有问题，
  否则你可能希望添加挂载的退出检查，尤其是在回调泄漏时，
  以便外部 widget 可以调用 `setState`。例如：
  
Code before migration:

迁移前的代码：

<!-- skip -->
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

迁移后的代码：

<!-- skip -->
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

必须删除 `MouseTracker.isAnnotationAttached` 的调用。
由于注释不再被跟踪，因此该功能在技术上不再可行。如果你需要此功能，请提交 issue。

## Timeline

## 时间轴

Landed in version: 1.15.4<br>
In stable release: 1.17

发布于版本：1.15.4<br>
发布于稳定版本：1.17

## References

## 参考文献

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
* [Improve MouseTracker lifecycle: Move checks to post-frame][],
  which first introduced the mounted-exit change,
  explained at _The change to onExit_.


[Improve MouseTracker lifecycle: Move checks to post-frame]: {{site.repo.flutter}}/issues/44631
[Issue #44631]: {{site.repo.flutter}}/pull/44631)
[`MouseRegion`]: {{site.api}}/flutter/widgets/MouseRegion-class.html
[`MouseTracker`]: {{site.api}}/flutter/gestures/MouseTracker-class.html
[MouseTracker no longer requires annotations attached]: {{site.repo.flutter}}/issues/48453
[`MouseTrackerAnnotation`]: {{site.api}}/flutter/gestures/MouseTrackerAnnotation-class.html
[`RenderMouseRegion`]: {{site.api}}/flutter/rendering/RenderMouseRegion-class.html
