---
# title: Changing RawMenuAnchor close order
title: 更改 RawMenuAnchor 的关闭顺序
# description: >-
#   Closing a `RawMenuAnchor` now triggers
#   `onClose` and `onCloseRequested` callbacks for all
#   descendant `RawMenuAnchor`s in a coordinated sequence.
description: >-
  关闭 `RawMenuAnchor` 时，现在会按协调好的顺序，
  为所有后代 `RawMenuAnchor` 触发 `onClose` 和 `onCloseRequested` 回调。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Closing a `RawMenuAnchor` now triggers the `onCloseRequested`
and `onClose` callbacks for all descendant `RawMenuAnchor`s.
The `onCloseRequested` callback is triggered top-down,
starting from the triggering `RawMenuAnchor` and moving to its descendants,
while the `onClose` callback is triggered bottom-up.
If a `RawMenuAnchor` is already closed,
calls to `MenuController.close` and `MenuController.closeChildren`
don't trigger the `onCloseRequested` callback.

关闭一个 `RawMenuAnchor` 时，现在会为所有后代 `RawMenuAnchor`
触发 `onCloseRequested` 和 `onClose` 回调。
`onCloseRequested` 自顶向下触发，
从发起关闭的 `RawMenuAnchor` 开始，再到它的后代；
`onClose` 则自底向上触发。
如果 `RawMenuAnchor` 已经关闭，
调用 `MenuController.close` 和 `MenuController.closeChildren`
不会触发 `onCloseRequested` 回调。

## Background

## 背景

`RawMenuAnchor` is a low-level widget used to build custom menu systems.
Previously, a `RawMenuAnchor` didn't automatically
notify its descendants when it was closed.
You had to manually call `controller.closeChildren()`
within the `onCloseRequested` callback
to close descendant `RawMenuAnchor`s.

`RawMenuAnchor` 是用来构建自定义菜单系统的底层 widget。
先前，`RawMenuAnchor` 关闭时不会自动通知它的后代。
你必须在 `onCloseRequested` 回调里手动调用 `controller.closeChildren()`，
才能关闭后代 `RawMenuAnchor`。

Furthermore, the `onClose` callback timing was inconsistent.
A parent `RawMenuAnchor`'s `onClose` could be executed
before its descendants had finished closing.

此外，`onClose` 回调的时机并不一致。
父级 `RawMenuAnchor` 的 `onClose` 可能在后代完成关闭之前就执行。

The updated behavior ensures that when a parent `RawMenuAnchor` begins to close,
it subsequently triggers `onCloseRequested` for all of its
descendant `RawMenuAnchor`s in a top-down manner.

更新后的行为保证：父级 `RawMenuAnchor` 开始关闭时，
会接着以自顶向下的方式，
为所有后代 `RawMenuAnchor` 触发 `onCloseRequested`。

When `hideOverlay` is called from within `onCloseRequested` to close the menu,
all descendant `RawMenuAnchor`s have their `onClose` callbacks
executed in a bottom-up order.
This means that the most recently opened `RawMenuAnchor`
now has its `onClose` callback executed first,
followed by its parent, and so on up the hierarchy.

在 `onCloseRequested` 中调用 `hideOverlay` 关闭菜单时，
所有后代 `RawMenuAnchor` 的 `onClose` 回调会按自底向上的顺序执行。
也就是说，最近打开的 `RawMenuAnchor` 会最先执行 `onClose` 回调，
然后是它的父级，并依此沿层级向上。

This design allows for a coordinated closing sequence
where child `RawMenuAnchor`s can perform any necessary cleanup
before their parents finalize the closing process.

这样可以形成协调的关闭顺序：
子级 `RawMenuAnchor` 可以先完成必要的清理，
父级再结束关闭过程。

Finally, if a `RawMenuAnchor` is already closed,
calls to `MenuController.close` and `MenuController.closeChildren`
don't trigger the `onCloseRequested` callback,
preventing unnecessary callback executions.

最后，如果 `RawMenuAnchor` 已经关闭，
调用 `MenuController.close` 和 `MenuController.closeChildren`
不会触发 `onCloseRequested` 回调，
从而避免不必要的回调执行。

## Migration guide

## 迁移指南

If your code does not override the default implementation of
`RawMenuAnchor.onCloseRequested` or your `RawMenuAnchor`
does not contain submenus, no changes are required.

如果代码没有重写 `RawMenuAnchor.onCloseRequested` 的默认实现，
或者 `RawMenuAnchor` 不包含子菜单，就无需改动。

If you have a custom implementation of `onCloseRequested`
in a `RawMenuAnchor` containing submenus,
`controller.closeChildren()` is now called automatically
when the parent menu closes.
Make sure that your implementation of `onCloseRequested`
still behaves correctly with this automatic call.
Immediate calls to `controller.closeChildren()` within your
`onCloseRequested` callback are no longer necessary.
Remove those calls.

如果在包含子菜单的 `RawMenuAnchor` 中自定义了 `onCloseRequested`，
父菜单关闭时现在会自动调用 `controller.closeChildren()`。
请确认你的 `onCloseRequested` 实现在这次自动调用之后仍然正确。
不必再在 `onCloseRequested` 回调里立刻调用 `controller.closeChildren()`。
请删掉这些调用。

Additionally, if your logic relied on the
parent's `onClose` callback firing before its descendants,
refactor your code to account for the new bottom-up execution order.

另外，如果逻辑依赖父级的 `onClose` 回调先于后代触发，
请按新的自底向上执行顺序重构代码。

Code before migration:

迁移前的代码：

```dart
RawMenuAnchor(
  controller: menuController,
  onCloseRequested: (hideOverlay) {
    if (!animationController.isForwardOrCompleted) {
      return;
    }

    // Descendant submenus must be closed before the parent menu.
    // This is now handled automatically, so this call is no longer necessary.
    menuController.closeChildren();
    animationController.reverse().whenComplete(hideOverlay);
  },
  onClose: () {
    // This might have executed before descendants called onClose().
    _handleMenuClosed();
  },
  // ...
)
```

Code after migration:

迁移后的代码：

```dart
RawMenuAnchor(
  controller: menuController,
  onCloseRequested: (hideOverlay) {
    if (!animationController.isForwardOrCompleted) {
      return;
    }

    // `menuController.closeChildren()` is now called automatically.
    animationController.reverse().whenComplete(hideOverlay);
  },
  onClose: () {
    // This now executes only after all descendant submenus have
    // called `onClose()`.
    _handleMenuClosed();
  },
  // ...
)
```

:::important
This migration is not supported by `dart fix`

`dart fix` 不支持此次迁移。
:::

## Timeline

## 时间线

Landed in version: 3.44.0-0.1.pre<br>
In stable release: 3.44

合入版本：3.44.0-0.1.pre<br>
进入稳定版：3.44

## References

## 参考资料

API documentation:

API 文档：

* [`RawMenuAnchor`][]
* [`RawMenuAnchor.onCloseRequested`][]

Relevant issues:

相关 issue：

* [[widgets/raw_menu_anchor.dart] onClose should be called by descendant menus before parent][issue-182355]

  [[widgets/raw_menu_anchor.dart] onClose 应由后代菜单先于父级调用][issue-182355]

Relevant PRs:

相关 PR：

* [[widgets/raw_menu_anchor.dart] Always onClose and onCloseRequested on descendants before parent.][pr-182357]

  始终让后代先于父级调用
  onClose 与 onCloseRequested：
  [该 PR][pr-182357]

[`RawMenuAnchor`]: {{site.api}}/flutter/widgets/RawMenuAnchor-class.html
[`RawMenuAnchor.onCloseRequested`]: {{site.api}}/flutter/widgets/RawMenuAnchor/onCloseRequested.html
[issue-182355]: {{site.repo.flutter}}/issues/182355
[pr-182357]: {{site.repo.flutter}}/pull/182357
