---
# title: Route transition record and transition delegate updates
title: 路由过渡记录与过渡委托的更新
# description: >
#   Changes to the rule on how transition delegate resolve route transition.
description: >
  调整了过渡委托如何解析路由过渡的规则。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

A new boolean getter `isWaitingForExitingDecision` was added
to the route transition record and the `isEntering` getter
was renamed to `isWaitingForEnteringDecision`.
In the `resolve()` method for the transition delegate,
use the `isWaitingForExitingDecision` to check if an exiting
route actually needs an explicit decision on how to transition
off the screen. If you try to make a decision for an existing route
that _isn't_ waiting for a decision, Flutter throws an assertion error.

路由过渡记录新增了布尔 getter `isWaitingForExitingDecision`，
`isEntering` getter 已重命名为 `isWaitingForEnteringDecision`。
在过渡委托的 `resolve()` 方法中，
用 `isWaitingForExitingDecision` 检查一条正在退出的路由
是否确实需要明确决定如何过渡离开屏幕。
如果你对一条 **并未** 等待决策的现有路由做出决策，
Flutter 会抛出断言错误。

## Context

## 上下文

When the navigator receives a new list of pages, it tries to update its
current routes stack to match the list. However, it requires explicit
decisions on how to transition the route on and off the screen.
Previously, routes that were not in the new list required decisions
on how to transition off the screen. However, we later found out
this is not always true. If a route is popped,
but is still waiting for the popping animation to finish,
this route would sit in the navigator routes stack until
the animation was done. If a page update occurred during this time,
this route exits but doesn't require a decision
on how to transition off the screen. Therefore,
`isWaitingForExitingDecision` was added to cover that case.

当导航器收到新的页面列表时，它会尝试更新当前路由栈以匹配该列表。
不过，它需要明确决定路由如何过渡进入和离开屏幕。
以前，不在新列表中的路由都需要决定如何过渡离开屏幕。
后来我们发现并非总是如此。如果一条路由已被弹出，
但仍在等待弹出动画结束，
这条路由会留在导航器的路由栈中，直到动画完成。
如果在此期间发生页面更新，
这条路由会退出，但不需要决定如何过渡离开屏幕。
因此新增了 `isWaitingForExitingDecision` 来覆盖这种情况。

The `isEntering` getter is also renamed to
`isWaitingForEnteringDecision` to be more descriptive,
and also to make the naming more consistent.

`isEntering` getter 也重命名为
`isWaitingForEnteringDecision`，以便更准确地描述含义，
并使命名更加一致。

## Migration guide

## 迁移指南

If you implement your own transition delegate, you need to check the
exiting routes using the getter `isWaitingForExitingDecision` before you
call `markForPop`, `markForComplete`, or `markForRemove` on them.
You also need to rename all the references from `isEntering` to
`isWaitingForEnteringDecision`.

如果你实现了自己的过渡委托，在对正在退出的路由调用
`markForPop`、`markForComplete` 或 `markForRemove` 之前，
需要用 getter `isWaitingForExitingDecision` 进行检查。
你还需要把所有 `isEntering` 引用
重命名为 `isWaitingForEnteringDecision`。

Code before migration:

迁移前的代码：

```dart
import 'package:flutter/widgets.dart';

class NoAnimationTransitionDelegate extends TransitionDelegate<void> {
  @override
  Iterable<RouteTransitionRecord> resolve({
    List<RouteTransitionRecord> newPageRouteHistory,
    Map<RouteTransitionRecord, RouteTransitionRecord> locationToExitingPageRoute,
    Map<RouteTransitionRecord, List<RouteTransitionRecord>> pageRouteToPagelessRoutes,
  }) {
    final List<RouteTransitionRecord> results = <RouteTransitionRecord>[];

    for (final RouteTransitionRecord pageRoute in newPageRouteHistory) {
      if (pageRoute.isEntering) {
        pageRoute.markForAdd();
      }
      results.add(pageRoute);

    }
    for (final RouteTransitionRecord exitingPageRoute in locationToExitingPageRoute.values) {
      exitingPageRoute.markForRemove();
      final List<RouteTransitionRecord> pagelessRoutes = pageRouteToPagelessRoutes[exitingPageRoute];
      if (pagelessRoutes != null) {
        for (final RouteTransitionRecord pagelessRoute in pagelessRoutes) {
          pagelessRoute.markForRemove();
        }
      }
      results.add(exitingPageRoute);

    }
    return results;
  }
}
```

Code after migration:

迁移后的代码：

```dart
import 'package:flutter/widgets.dart';

class NoAnimationTransitionDelegate extends TransitionDelegate<void> {
  @override
  Iterable<RouteTransitionRecord> resolve({
    List<RouteTransitionRecord> newPageRouteHistory,
    Map<RouteTransitionRecord, RouteTransitionRecord> locationToExitingPageRoute,
    Map<RouteTransitionRecord, List<RouteTransitionRecord>> pageRouteToPagelessRoutes,
  }) {
    final List<RouteTransitionRecord> results = <RouteTransitionRecord>[];

    for (final RouteTransitionRecord pageRoute in newPageRouteHistory) {
      // Renames isEntering to isWaitingForEnteringDecision.
      if (pageRoute.isWaitingForEnteringDecision) {
        pageRoute.markForAdd();
      }
      results.add(pageRoute);

    }
    for (final RouteTransitionRecord exitingPageRoute in locationToExitingPageRoute.values) {
      // Checks the isWaitingForExitingDecision before calling the markFor methods.
      if (exitingPageRoute.isWaitingForExitingDecision) {
        exitingPageRoute.markForRemove();
        final List<RouteTransitionRecord> pagelessRoutes = pageRouteToPagelessRoutes[exitingPageRoute];
        if (pagelessRoutes != null) {
          for (final RouteTransitionRecord pagelessRoute in pagelessRoutes) {
            pagelessRoute.markForRemove();
          }
        }
      }
      results.add(exitingPageRoute);

    }
    return results;
  }
}
```

## Timeline

## 时间线

Landed in version: 1.18.0<br>
合入版本：1.18.0<br>
In stable release: 1.20

进入稳定版：1.20

## References

## 参考资料

API documentation:

API 文档：

* [`Navigator`][]
* [`TransitionDelegate`][]
* [`RouteTransitionRecord`][]

Relevant issue:

相关 issue：

* [Issue 45938: Navigator 2.0][]

Relevant PR:

相关 PR：

* [PR 55998][]: Fixes the navigator pages update crash
  when there is still a route waiting

  [PR 55998][PR 55998]：修复仍有路由在等待时，
  Navigator 页面更新导致的崩溃


[Issue 45938: Navigator 2.0]: {{site.repo.flutter}}/issues/45938
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[PR 55998]: {{site.repo.flutter}}/pull/55998
[`TransitionDelegate`]: {{site.api}}/flutter/widgets/TransitionDelegate-class.html
[`RouteTransitionRecord`]: {{site.api}}/flutter/widgets/RouteTransitionRecord-class.html
