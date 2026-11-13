---
# title: When a route is removed from the stack, associated futures must complete
title: 路由从栈中移除时，关联的 Future 必须完成
# description: >
#   Before this breaking change, routes created by Navigator and awaited for
#   results could never complete if the route was removed instead of popped.
description: >
  在这次破坏性改动之前，由 Navigator 创建并等待结果的路由，
  如果是被移除而不是被弹出，对应的 Future 永远不会完成。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

When routes are pushed, developers can await them to be notified when they are
popped. However, this didn't work when they were removed because the associated
future was never completed.

路由被推入后，开发者可以 await 它们，以便在弹出时收到通知。
但如果路由是被移除的，这就不起作用，因为关联的 Future 从未完成。

## Context

## 背景

All Navigator methods that call `remove` had this issue. By using `complete`,
the issue is properly resolved, allowing developers to pass a result.

所有调用 `remove` 的 Navigator 方法都有这个问题。
改用 `complete` 后，问题得到正确解决，开发者可以传入一个结果。

## Description of change

## 改动说明

All Navigator methods have been updated to no longer call `remove` but instead
use `complete`. Context menus are now built from the `contextMenuBuilder`
parameter.

所有 Navigator 方法都已更新，不再调用 `remove`，改为使用 `complete`。
上下文菜单现在由 `contextMenuBuilder` 参数构建。

All methods that directly use `complete` now accept an optional `result`
parameter to return it to the associated future. Other methods that indirectly
use `remove` currently return `null`. In the future, we might extend these
methods with an optional callback function to allow developers to handle pop
logic in indirect scenarios (such as `removeUntil`).

所有直接使用 `complete` 的方法现在都接受一个可选的 `result` 参数，
把它返回给关联的 Future。
其他间接使用 `remove` 的方法目前返回 `null`。
以后可能会为这些方法增加一个可选的回调函数，
让开发者在间接场景（例如 `removeUntil`）中处理 pop 逻辑。

Before this PR, the methods below can't return a result:

在这个 PR 之前，下面的方法不能返回结果：

```dart
Navigator.of(context).removeRoute(route);
Navigator.of(context).removeRouteBelow(route);
```

After this PR, methods can return a result:

在这个 PR 之后，这些方法可以返回结果：

```dart
Navigator.of(context).removeRoute(route, result);
Navigator.of(context).removeRouteBelow(route, result);
```

## Migration guide

## 迁移指南

If you implemented `RouteTransitionRecord` and used `markForRemove`,
you need to use `markForComplete` instead. `markForRemove` is now deprecated.

如果你实现了 `RouteTransitionRecord` 并使用了 `markForRemove`，
需要改用 `markForComplete`。`markForRemove` 现已弃用。

For other developers, no changes are required. The navigator continues to work
as expected with new capabilities.

其他开发者无需改动。Navigator 会继续按预期工作，并具备新的能力。

## Timeline

## 时间线

Landed in version: 3.31.0-0.0.pre<br>
合入版本：3.31.0-0.0.pre<br>
In stable release: 3.32

进入稳定版：3.32

## References

## 参考资料

### API documentation:

### API 文档

* [`RouteTransitionRecord`]({{site.api}}/flutter/widgets/RouteTransitionRecord-class.html)

  [`RouteTransitionRecord`]({{site.api}}/flutter/widgets/RouteTransitionRecord-class.html)

* [`Navigator`]({{site.api}}/flutter/widgets/Navigator-class.html)

  [`Navigator`]({{site.api}}/flutter/widgets/Navigator-class.html)

### Relevant issues:

### 相关 issue

* [removeRoute unresolved future]({{site.repo.flutter}}/issues/157505)

  [removeRoute 的 Future 无法完成]({{site.repo.flutter}}/issues/157505)

### Relevant PRs:

### 相关 PR

* [feat: removeRoute now calls didComplete]({{site.repo.flutter}}/pull/157725)

  [feat：removeRoute 现在会调用 didComplete]({{site.repo.flutter}}/pull/157725)
