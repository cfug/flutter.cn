---
# title: Route and Navigator Refactoring
title: Route 与 Navigator 重构
# description: >
#   Some APIs and function signatures of the
#   Route and Navigator classes have changed.
description: Route 与 Navigator 类的部分 API 和函数签名已变更。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `Route` class no longer manages its overlay entries in overlay,
and its `install()` method no longer has an `insertionPoint` parameter.
The `isInitialRoute` property in `RouteSetting` has been deprecated,
and `Navigator.pop()` no longer returns a value.

`Route` 类不再在 overlay 中管理自己的 overlay 条目，
它的 `install()` 方法也不再有 `insertionPoint` 参数。
`RouteSetting` 中的 `isInitialRoute` 属性已废弃，
`Navigator.pop()` 也不再返回值。

## Context

## 上下文

We refactored the navigator APIs to prepare for the new page API
and the introduction of the `Router` widget as outlined in
the [Router][] design document.
This refactoring introduced some function signature changes
in order to make the existing navigator APIs continue to work
with the new page API.

我们重构了导航器 API，为新的页面 API 以及 [Router][] 设计文档中介绍的
`Router` widget 做准备。
这次重构改动了一些函数签名，
让现有的导航器 API 能够继续与新的页面 API 一起工作。

## Description of change

## 变更说明

The boolean return value of `Navigator.pop()` was not well
defined, and the user could achieve the same result by calling
`Navigator.canPop()`.
Since the API for `Navigator.canPop()` was better defined,
we simplified `Navigator.pop()` to not return a boolean value.

`Navigator.pop()` 的布尔返回值定义得并不清楚，
调用 `Navigator.canPop()` 也能得到同样的结果。
由于 `Navigator.canPop()` 的 API 定义更明确，
我们简化了 `Navigator.pop()`，让它不再返回布尔值。

On the other hand, the navigator requires the ability
to manually rearrange entries in the overlay to allow
the user to change the route history in the new API.
We changed it so that the route only creates and destroys
its overlay entries, while the navigator inserts or
removes overlay entries from the overlay.
We also removed the `insertionPoint` argument of
`Route.install()` because it was obsolete after the change.

另一方面，导航器需要能够手动重排 overlay 中的条目，
这样用户才能在新 API 中更改路由历史。
我们做了调整：路由只创建和销毁自己的 overlay 条目，
而由导航器把 overlay 条目插入 overlay 或从中移除。
改动之后 `Route.install()` 的 `insertionPoint` 参数已经过时，因此也一并移除。

Finally, we removed the `isInitialRoute` property from
`RouteSetting` as part of refactoring, and provided the
`onGenerateInitialRoutes` API for full control of
initial routes generation.

最后，作为重构的一部分，我们从 `RouteSetting` 中移除了
`isInitialRoute` 属性，并提供了 `onGenerateInitialRoutes` API，
以便完全控制初始路由的生成。

## Migration guide

## 迁移指南

Case 1: An app depends on `pop()` returning a boolean value.

情形 1：应用依赖 `pop()` 返回布尔值。

```dart
TextField(
  onTap: () {
    if (Navigator.pop(context))
      print('There still is at least one route after pop');
    else
      print('Oops! No more routes.');
  }
)
```

You could use `Navigator.canPop()` in combination with
`Navigator.pop()` to achieve the same result.

可以把 `Navigator.canPop()` 和 `Navigator.pop()` 结合起来，得到同样的结果。

```dart
TextField(
  onTap: () {
    if (Navigator.canPop(context))
      print('There still is at least one route after pop');
    else
      print('Oops! No more routes.');
    // Our navigator pops the route anyway.
    Navigator.pop(context);
  }
)
```

Case 2: An app generates routes based on `isInitialRoute`.

情形 2：应用根据 `isInitialRoute` 生成路由。

```dart
MaterialApp(
  onGenerateRoute: (RouteSetting setting) {
    if (setting.isInitialRoute)
      return FakeSplashRoute();
    else
      return RealRoute(setting);
  }
)
```

There are different ways to migrate this change.
One way is to set an explicit value for `MaterialApp.initialRoute`.
You can then test for this value in place of `isInitialRoute`.
As `initialRoute` inherits its default value outside of Flutter's scope,
you must set an explicit value for it.

迁移这次改动有不同的做法。
一种做法是为 `MaterialApp.initialRoute` 设置明确的值。
然后可以用这个值代替 `isInitialRoute` 进行判断。
由于 `initialRoute` 的默认值继承自 Flutter 范围之外，
你必须为它设置一个明确的值。

```dart
MaterialApp(
  initialRoute: '/', // Set this value explicitly. Default might be altered.
  onGenerateRoute: (RouteSetting setting) {
    if (setting.name == '/')
      return FakeSplashRoute();
    else
      return RealRoute(setting);
  }
)
```

If there is a more complicated use case,
you can use the new API, `onGenerateInitialRoutes`,
in `MaterialApp` or `CupertinoApp`.

如果用例更复杂，可以在 `MaterialApp` 或 `CupertinoApp` 中
使用新 API `onGenerateInitialRoutes`。

```dart
MaterialApp(
  onGenerateRoute: (RouteSetting setting) {
    return RealRoute(setting);
  },
  onGenerateInitialRoutes: (String initialRouteName) {
    return <Route>[FakeSplashRoute()];
  }
)
```

## Timeline

## 时间线

Landed in version: 1.16.3<br>
合入版本：1.16.3<br>
In stable release: 1.17

进入稳定版：1.17

## References

## 参考资料

Design doc:

设计文档：

* [Router][]

  [Router][Router]

API documentation:

API 文档：

* [`Route`][]
* [`Route.install`][]
* [`RouteSetting.isInitialRoute`][]
* [`Navigator`][]
* [`Navigator.pop`][]
* [`Navigator.canPop`][]

Relevant issue:

相关 issue：

* [Issue 45938: Router][]

  [问题 45938：Router][Issue 45938: Router]

Relevant PR:

相关 PR：

* [PR 44930][] - Refactor the imperative api to continue working in the new navigation system

  [PR 44930][]：重构命令式 API，使其在新的导航系统中继续工作


[Issue 45938: Router]: {{site.repo.flutter}}/issues/45938
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`Navigator.pop`]: {{site.api}}/flutter/widgets/Navigator/pop.html
[`Navigator.canPop`]: {{site.api}}/flutter/widgets/Navigator/canPop.html
[Router]: /go/navigator-with-router
[PR 44930]: {{site.repo.flutter}}/pull/44930
[`Route`]: {{site.api}}/flutter/widgets/Route-class.html
[`Route.install`]: {{site.api}}/flutter/widgets/Route/install.html
[`RouteSetting.isInitialRoute`]: {{site.api}}/flutter/widgets/RouteSettings/isInitialRoute.html
