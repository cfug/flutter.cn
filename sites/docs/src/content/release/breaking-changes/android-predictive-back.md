---
# title: Android predictive back
title: Android 预测性返回
# description: >-
#   The ability to control back navigation at the time that a back gesture is
#   received has been replaced with an ahead-of-time navigation API in order to
#   support Android 14's Predictive Back feature.
description: >-
  为支持 Android 14 的预测性返回功能，
  在收到返回手势时再决定是否返回的能力，
  已由一套预先声明的导航 API 取代。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

To support Android 14's Predictive Back feature,
a set of ahead-of-time APIs have replaced just-in-time navigation APIs,
like `WillPopScope` and `Navigator.willPop`.

为支持 Android 14 的预测性返回功能，
一套预先声明的 API 取代了即时导航 API，
例如 `WillPopScope` 和 `Navigator.willPop`。

:::note
The Flutter 3.22 release includes some updates
to predictive back behavior. For more info, check out
[Issue #132504][].

Flutter 3.22 对预测性返回行为做了一些更新。
更多信息请查看 [Issue #132504][]。
:::

[Issue #132504]: {{site.repo.flutter}}/issues/132504#issuecomment-2025776552

## Background

## 背景

Android 14 introduced the
[Predictive Back feature]({{site.android-dev}}/guide/navigation/predictive-back-gesture),
which allows the user to peek behind the current route during a valid back
gesture and decide whether to continue back or to cancel the gesture. This was
incompatible with Flutter's navigation APIs that allow the developer to cancel a
back gesture after it is received.

Android 14 引入了
[预测性返回功能]({{site.android-dev}}/guide/navigation/predictive-back-gesture)。
在一次有效的返回手势中，用户可以预览当前路由后面的内容，
并决定继续返回还是取消手势。
这与 Flutter 原先的导航 API 不兼容，
那些 API 允许开发者在收到返回手势之后再取消它。

With predictive back, the back animation begins immediately when the
user initiates the gesture and before it has been committed. There is no
opportunity for the Flutter app to decide whether it's allowed to happen at that
time. It must be known ahead of time.

有了预测性返回，用户一开始做手势、尚未提交时，返回动画就会立刻开始。
此时 Flutter 应用没有机会再决定是否允许返回。
必须事先知道。

For this reason, all APIs that allow a Flutter app developer to cancel a back
navigation at the time that a back gesture is received are now deprecated. They
have been replaced with equivalent APIs that maintain a boolean state at all
times that dictates whether or not back navigation is possible. When it is, the
predictive back animation happens as usual. Otherwise, navigation is stopped. In
both cases, the app developer is informed that a back was attempted and
whether it was successful.

因此，所有允许 Flutter 应用开发者在收到返回手势时
再取消返回导航的 API 都已弃用。
它们被等价的 API 取代。这些 API 始终维护一个布尔状态，
表明当前是否可以返回。
可以返回时，预测性返回动画照常播放；否则导航会停止。
两种情况下，应用开发者都会得知有人尝试返回，以及是否成功。

### PopScope

### PopScope 组件

The `PopScope` class directly replaces `WillPopScope` in order to enable
predictive back. Instead of deciding whether a pop is possible at the time it
occurs, this is set ahead of time with the `canPop` boolean. You can still
listen to pops by using `onPopInvokedWithResult`.

`PopScope` 类直接取代 `WillPopScope`，以支持预测性返回。
不再在 pop 发生时才决定能否 pop，
而是事先用布尔值 `canPop` 设定。
仍可以通过 `onPopInvokedWithResult` 监听 pop。

```dart
PopScope(
  canPop: _myPopDisableEnableLogic(),
  onPopInvokedWithResult: (bool didPop, Object? result) {
    // Handle the pop. If `didPop` is false, it was blocked.
  },
)
```

### Form.canPop and Form.onPopInvokedWithResult

### Form.canPop 与 Form.onPopInvokedWithResult

These two new parameters are based on `PopScope` and replace the deprecated
`Form.onWillPop` parameter. They are used with `PopScope` in the same way as
above.

这两个新参数基于 `PopScope`，并取代已弃用的 `Form.onWillPop` 参数。
它们与 `PopScope` 的用法和上面相同。

```dart
Form(
  canPop: _myPopDisableEnableLogic(),
  onPopInvokedWithResult: (bool didPop, Object? result) {
    // Handle the pop. If `didPop` is false, it was blocked.
  },
)
```

### Route.popDisposition

### Route.popDisposition 属性

This getter synchronously returns the `RoutePopDisposition`
for the route, which describes how pops will behave.

这个 getter 会同步返回该路由的 `RoutePopDisposition`，
用来描述 pop 将如何表现。

```dart
if (myRoute.popDisposition == RoutePopDisposition.doNotPop) {
  // Back gestures are disabled.
}
```

### ModalRoute.registerPopEntry and ModalRoute.unregisterPopEntry

### ModalRoute.registerPopEntry 与 ModalRoute.unregisterPopEntry

Use these methods to register `PopScope` widgets,
to be evaluated when the route decides whether it can pop.
This functionality might be used when implementing a
custom `PopScope` widget.

用这些方法注册 `PopScope` widget，
以便路由在决定能否 pop 时进行求值。
实现自定义 `PopScope` widget 时可能会用到这一功能。

```dart
@override
void didChangeDependencies() {
  super.didChangeDependencies();
  final ModalRoute<dynamic>? nextRoute = ModalRoute.of(context);
  if (nextRoute != _route) {
    _route?.unregisterPopEntry(this);
    _route = nextRoute;
    _route?.registerPopEntry(this);
  }
}
```

## Migration guide

## 迁移指南

### Migrating from `WillPopScope` to `PopScope`

### 从 `WillPopScope` 迁移到 `PopScope`

The direct replacement of the `WillPopScope` widget is the `PopScope` widget.
In many cases, logic that was being run at the time of the back gesture in
`onWillPop` can be done at build time and set to `canPop`.

`WillPopScope` widget 的直接替代是 `PopScope` widget。
很多情况下，原先在返回手势发生时于 `onWillPop` 中运行的逻辑，
可以改到构建时完成，并设置到 `canPop`。

Code before migration:

迁移前的代码：

```dart
WillPopScope(
  onWillPop: () async {
    return _myCondition;
  },
  child: ...
),
```

Code after migration:

迁移后的代码：

```dart
PopScope(
  canPop: _myCondition,
  child: ...
),
```

For cases where it's necessary to be notified that a
pop was attempted, the `onPopInvokedWithResult` method can be
used in a similar way to `onWillPop`. Keep in mind
that while `onWillPop` was called before the pop
was handled and had the ability to cancel it,
`onPopInvokedWithResult` is called after the pop is finished being handled.

如果需要在有人尝试 pop 时得到通知，
可以按与 `onWillPop` 类似的方式使用 `onPopInvokedWithResult`。
请注意，`onWillPop` 在处理 pop 之前调用，并且可以取消它；
`onPopInvokedWithResult` 则在 pop 处理完成之后调用。

Code before migration:

迁移前的代码：

```dart
WillPopScope(
  onWillPop: () async {
    _myHandleOnPopMethod();
    return true;
  },
  child: ...
),
```

Code after migration:

迁移后的代码：

```dart
PopScope(
  canPop: true,
  onPopInvokedWithResult: (bool didPop, Object? result) {
    _myHandleOnPopMethod();
  },
  child: ...
),
```

### Migrating from WillPopScope to NavigatorPopHandler for nested Navigators

### 将嵌套 Navigator 从 WillPopScope 迁移到 NavigatorPopHandler

A very common use case of `WillPopScope` was to properly handle
back gestures when using nested `Navigator` widgets.
It's possible to do this using `PopScope` as well,
but there is now a wrapper widget that makes this even easier:
`NavigatorPopHandler`.

`WillPopScope` 一个非常常见的用途，
是在使用嵌套 `Navigator` widget 时正确处理返回手势。
用 `PopScope` 也可以做到，
但现在有一个包装 widget 让这件事更简单：`NavigatorPopHandler`。

Code before migration:

迁移前的代码：

```dart
WillPopScope(
  onWillPop: () async => !(await _nestedNavigatorKey.currentState!.maybePop()),
  child: Navigator(
    key: _nestedNavigatorKey,
    …
  ),
)
```

Code after migration:

迁移后的代码：

```dart
NavigatorPopHandler(
  onPop: () => _nestedNavigatorKey.currentState!.pop(),
  child: Navigator(
    key: _nestedNavigatorKey,
    …
  ),
)
```

### Migrating from Form.onWillPop to Form.canPop and Form.onPopInvokedWithResult

### 从 Form.onWillPop 迁移到 Form.canPop 与 Form.onPopInvokedWithResult

Previously, `Form` used a `WillPopScope` instance under
the hood and exposed its `onWillPop` method.
This has been replaced with a `PopScope` that exposes its
`canPop` and `onPopInvokedWithResult` methods.
Migrating is identical to migrating from
`WillPopScope` to `PopScope`, detailed above.

先前，`Form` 在内部使用 `WillPopScope` 实例，并暴露其 `onWillPop` 方法。
现已改为使用 `PopScope`，并暴露其 `canPop` 和 `onPopInvokedWithResult` 方法。
迁移方式与上面从 `WillPopScope` 迁移到 `PopScope` 相同。

### Migrating from Route.willPop to Route.popDisposition

### 从 Route.willPop 迁移到 Route.popDisposition

`Route`'s `willPop` method returned a
`Future<RoutePopDisposition>` to accommodate the fact
that pops could be canceled. Now that that's no longer true,
this logic has been simplified to a synchronous getter.

`Route` 的 `willPop` 方法返回 `Future<RoutePopDisposition>`，
是为了适应 pop 可能被取消的情况。
现在已经不会再取消，这段逻辑简化成了同步 getter。

Code before migration:

迁移前的代码：

```dart
if (await myRoute.willPop() == RoutePopDisposition.doNotPop) {
  ...
}
```

Code after migration:

迁移后的代码：

```dart
if (myRoute.popDisposition == RoutePopDisposition.doNotPop) {
  ...
}
```

### Migrating from ModalRoute.add/removeScopedWillPopCallback to ModalRoute.(un)registerPopEntry

### 改用 registerPopEntry 与 unregisterPopEntry

Internally, `ModalRoute` kept track of the existence of
`WillPopScope`s in its widget subtree by registering them
with `addScopedWillPopCallback` and
`removeScopedWillPopCallback`.
Since `PopScope` replaces `WillPopScope`,
these methods have been replaced by `registerPopEntry` and
`unregisterPopEntry`, respectively.

在内部，`ModalRoute` 通过 `addScopedWillPopCallback` 和
`removeScopedWillPopCallback` 注册 widget 子树中的 `WillPopScope`，
以此跟踪它们是否存在。
由于 `PopScope` 取代了 `WillPopScope`，
这两个方法分别由 `registerPopEntry` 和 `unregisterPopEntry` 取代。

`PopEntry` is implemented by `PopScope` in order to expose only the minimal
information necessary to `ModalRoute`. Anyone writing their own `PopScope`
should implement `PopEntry` and register and unregister their widget with
its enclosing `ModalRoute`.

`PopScope` 实现了 `PopEntry`，以便只向 `ModalRoute` 暴露必要的最少信息。
自行编写 `PopScope` 的人应当实现 `PopEntry`，
并向包裹它的 `ModalRoute` 注册和注销自己的 widget。

Code before migration:

迁移前的代码：

```dart
@override
void didChangeDependencies() {
  super.didChangeDependencies();
  if (widget.onWillPop != null) {
    _route?.removeScopedWillPopCallback(widget.onWillPop!);
  }
  _route = ModalRoute.of(context);
  if (widget.onWillPop != null) {
    _route?.addScopedWillPopCallback(widget.onWillPop!);
  }
}
```

Code after migration:

迁移后的代码：

```dart
@override
void didChangeDependencies() {
  super.didChangeDependencies();
  _route?.unregisterPopEntry(this);
  _route = ModalRoute.of(context);
  _route?.registerPopEntry(this);
}
```

### Migrating from ModalRoute.hasScopedWillPopCallback to ModalRoute.popDisposition

### 从 ModalRoute.hasScopedWillPopCallback 迁移到 ModalRoute.popDisposition

This method was previously used for a use-case
very similar to Predictive Back but in the Cupertino library,
where certain back transitions allowed canceling
the navigation. The route transition was disabled
when there was even the possibility of a `WillPopScope`
widget canceling the pop.

这个方法先前用于一个与预测性返回非常相似的场景，
但位于 Cupertino 库中：某些返回转场允许取消导航。
只要存在 `WillPopScope` widget 可能取消 pop，
路由转场就会被禁用。

Now that the API requires this to be decided ahead of time,
this no longer needs to be speculatively based on the
existence of `PopScope` widgets. The definitive
logic of whether a `ModalRoute` has popping blocked
by a `PopScope` widget is baked into `ModalRoute.popDisposition`.

现在 API 要求事先做出决定，
因此不再需要根据是否存在 `PopScope` widget 来推测。
`ModalRoute` 的 pop 是否被 `PopScope` widget 阻止，
其确定逻辑已经内置在 `ModalRoute.popDisposition` 中。

Code before migration:

迁移前的代码：

```dart
if (_route.hasScopedWillPopCallback) {
  // Disable predictive route transitions.
}
```

Code after migration:

迁移后的代码：

```dart
if (_route.popDisposition == RoutePopDisposition.doNotPop) {
  // Disable predictive route transitions.
}
```

### Migrating a back confirmation dialog

### 迁移返回确认对话框

`WillPopScope` was sometimes used to show a confirmation
dialog when a back gesture was received.
This can still be done with `PopScope` in a similar pattern.

`WillPopScope` 有时用来在收到返回手势时显示确认对话框。
用 `PopScope` 仍可以按类似的模式做到。

Code before migration:

迁移前的代码：

```dart
WillPopScope(
  onWillPop: () async {
    final bool? shouldPop = await _showBackDialog();
    return shouldPop ?? false;
  },
  child: child,
)
```

Code after migration:

迁移后的代码：

```dart
return PopScope(
  canPop: false,
  onPopInvokedWithResult: (bool didPop, Object? result) async {
    if (didPop) {
      return;
    }
    final NavigatorState navigator = Navigator.of(context);
    final bool? shouldPop = await _showBackDialog();
    if (shouldPop ?? false) {
      navigator.pop();
    }
  },
  child: child,
)
```

### Supporting predictive back

### 支持预测性返回

For complete setup instructions, guidelines on predictive back gesture
animations, and Android manifest configuration, check out how to [add the
predictive-back gesture](/platform-integration/android/predictive-back).

完整的设置说明、预测性返回手势动画指南以及 Android manifest 配置，
请查看如何 [添加预测性返回手势](/platform-integration/android/predictive-back)。

## Timeline

## 时间线

Landed in version: 3.14.0-7.0.pre<br>
In stable release: 3.16

合入版本：3.14.0-7.0.pre<br>
进入稳定版：3.16

## References

## 参考资料

API documentation:

API 文档：

* [`PopScope`][]
* [`NavigatorPopHandler`][]
* [`PopEntry`][]
* [`Form.canPop`][]
* [`Form.onPopInvokedWithResult`][]
* [`Route.popDisposition`][]
* [`ModalRoute.registerPopEntry`][]
* [`ModalRoute.unregisterPopEntry`][]

Relevant issues:

相关 issue：

* [Issue 109513][]

Relevant PRs:

相关 PR：

* [Predictive Back support for root routes][]

  [根路由的预测性返回支持][Predictive Back support for root routes]

* [Platform channel for predictive back][]

  [预测性返回的平台通道][Platform channel for predictive back]

[`PopScope`]: {{site.api}}/flutter/widgets/PopScope-class.html
[`NavigatorPopHandler`]: {{site.api}}/flutter/widgets/NavigatorPopHandler-class.html
[`PopEntry`]: {{site.api}}/flutter/widgets/PopEntry-class.html
[`Form.canPop`]: {{site.api}}/flutter/widgets/Form/canPop.html
[`Form.onPopInvokedWithResult`]: {{site.api}}/flutter/widgets/Form/onPopInvokedWithResult.html
[`Route.popDisposition`]: {{site.api}}/flutter/widgets/Route/popDisposition.html
[`ModalRoute.registerPopEntry`]: {{site.api}}/flutter/widgets/ModalRoute/registerPopEntry.html
[`ModalRoute.unregisterPopEntry`]: {{site.api}}/flutter/widgets/ModalRoute/unregisterPopEntry.html

[Issue 109513]: {{site.repo.flutter}}/issues/109513
[Predictive back support for root routes]: {{site.repo.flutter}}/pull/120385
[Platform channel for predictive back]: {{site.repo.engine}}/pull/39208
