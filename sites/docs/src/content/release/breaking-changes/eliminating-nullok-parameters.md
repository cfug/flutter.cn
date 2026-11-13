---
# title: Eliminating nullOk Parameters
title: 移除 nullOk 参数
# description: >
#     To eliminate nullOk parameters to help with
#     API clarity in the face of null safety.
description: 移除 nullOk 参数，让 API 在空安全下更清晰。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

This migration guide describes conversion of code that uses the `nullOk`
parameter on multiple `of` static accessors and related accessors to use
alternate APIs with nullable return values.

本迁移指南说明如何改写这样的代码：它们在多个 `of` 静态访问器及相关访问器上使用
`nullOk` 参数，应改为使用返回可空值的替代 API。

## Context

## 上下文

Flutter has a common pattern of allowing lookup of some types of widgets
([`InheritedWidget`][]s) using static member functions that are typically called
`of`, and take a `BuildContext`.

Flutter 有一种常见模式：用通常名为 `of`、并接收 `BuildContext` 的静态成员函数，
查找某些类型的 widget（[`InheritedWidget`][]）。

Before non-nullability was the default, it was useful to have a toggle on these
APIs that swapped between throwing an exception if the widget was not present in
the widget tree and returning null if it was not found. It was useful, and
wasn't confusing, since every variable was nullable.

在非空成为默认行为之前，这些 API 上有一个开关很有用：
widget 不在 widget 树中时抛出异常，或者找不到时返回 null。
这既有用，也不容易混淆，因为那时每个变量都是可空的。

When non-nullability was made the default, it was then desirable to have the
most commonly used APIs return a non-nullable value. This is because saying
`MediaQuery.of(context, nullOk: false)` and then still requiring an `!` operator
or `?` and a fallback value after that call felt awkward.

当非空成为默认行为后，最常用的 API 最好返回非空值。
因为写成 `MediaQuery.of(context, nullOk: false)` 之后，
还得再加 `!` 运算符，或者加 `?` 并提供回退值，这样很别扭。

The `nullOk` parameter was a cheap form of providing a null safety toggle, which
in the face of true language support for non-nullability, was then supplying
redundant, and perhaps contradictory signals to the developer.

`nullOk` 参数是一种廉价的空安全开关。
面对语言真正的非空支持时，它给开发者的信号就变得多余，甚至可能相互矛盾。

To solve this, the `of` accessors (and some related accessors that also used
`nullOk`) were split into two calls: one that returned a non-nullable value and
threw an exception when the sought-after widget was not present, and one that
returned a nullable value that didn't throw an exception, and returned null if
the widget was not present.

为了解决这个问题，`of` 访问器（以及同样使用 `nullOk` 的一些相关访问器）
被拆成两次调用：一次返回非空值，找不到目标 widget 时抛出异常；
另一次返回可空值，不抛出异常，widget 不存在时返回 null。

The design document for this change is [Eliminating nullOk parameters][].

这次改动的设计文档是 [移除 nullOk 参数][Eliminating nullOk parameters]。

[Eliminating nullOk parameters]: /go/eliminating-nullok-parameters

## Description of change

## 变更说明

The actual change modified these APIs to not have a `nullOk` parameter, and to
return a non-nullable value:

实际改动移除了这些 API 的 `nullOk` 参数，并让它们返回非空值：

* [`MediaQuery.of`][]
* [`Navigator.of`][]
* [`ScaffoldMessenger.of`][]
* [`Scaffold.of`][]
* [`Router.of`][]
* [`Localizations.localeOf`][]
* [`FocusTraversalOrder.of`][]
* [`FocusTraversalGroup.of`][]
* [`Focus.of`][]
* `Shortcuts.of`
* [`Actions.handler`][]
* [`Actions.find`][]
* [`Actions.invoke`][]
* [`AnimatedList.of`][]
* [`SliverAnimatedList.of`][]
* [`CupertinoDynamicColor.resolve`][]
* [`CupertinoDynamicColor.resolveFrom`][]
* [`CupertinoUserInterfaceLevel.of`][]
* [`CupertinoTheme.brightnessOf`][]
* [`CupertinoThemeData.resolveFrom`][]
* [`NoDefaultCupertinoThemeData.resolveFrom`][]
* [`CupertinoTextThemeData.resolveFrom`][]
* [`MaterialBasedCupertinoThemeData.resolveFrom`][]

And introduced these new APIs alongside those, to
return a nullable value:

并在它们旁边引入了这些新 API，用来返回可空值：

* [`MediaQuery.maybeOf`][]
* [`Navigator.maybeOf`][]
* [`ScaffoldMessenger.maybeOf`][]
* [`Scaffold.maybeOf`][]
* [`Router.maybeOf`][]
* [`Localizations.maybeLocaleOf`][]
* [`FocusTraversalOrder.maybeOf`][]
* [`FocusTraversalGroup.maybeOf`][]
* [`Focus.maybeOf`][]
* `Shortcuts.maybeOf`
* [`Actions.maybeFind`][]
* [`Actions.maybeInvoke`][]
* [`AnimatedList.maybeOf`][]
* [`SliverAnimatedList.maybeOf`][]
* [`CupertinoDynamicColor.maybeResolve`][]
* [`CupertinoUserInterfaceLevel.maybeOf`][]
* [`CupertinoTheme.maybeBrightnessOf`][]

## Migration guide

## 迁移指南

In order to modify your code to use the new form of the APIs, convert all
instances of calls that include `nullOk = true` as a parameter to use the
`maybe` form of the API instead.

要改用新形式的 API，请把所有带 `nullOk = true` 参数的调用，
改成对应 API 的 `maybe` 形式。

So this:

因此，这样写：

```dart
MediaQueryData? data = MediaQuery.of(context, nullOk: true);
```

becomes:

会变成：

```dart
MediaQueryData? data = MediaQuery.maybeOf(context);
```

You also need to modify all instances of calling the API with `nullOk =
false` (often the default), to accept non-nullable return values, or remove any
`!` operators:

还需要修改所有以 `nullOk = false`（通常是默认值）调用 API 的地方，
改为接受非空返回值，或移除所有 `!` 运算符：

So either of:

因此，下面两种写法：

```dart
MediaQueryData data = MediaQuery.of(context)!; // nullOk false by default.
MediaQueryData? data = MediaQuery.of(context); // nullOk false by default.
```

both become:

都会变成：

```dart
MediaQueryData data = MediaQuery.of(context); // No ! or ? operator here now.
```

The `unnecessary_non_null_assertion` analysis option can be quite helpful in
finding the places where the `!` operator should be removed, and the
`unnecessary_nullable_for_final_variable_declarations` analysis option can be
helpful in finding unnecessary question mark operators on `final` and `const`
variables.

`unnecessary_non_null_assertion` 分析选项可以帮助找出应当移除 `!` 运算符的位置，
`unnecessary_nullable_for_final_variable_declarations` 分析选项可以帮助找出
`final` 和 `const` 变量上不必要的问号运算符。

## Timeline

## 时间线

Landed in version: 1.24.0<br>
合入版本：1.24.0<br>
In stable release: 2.0.0

进入稳定版：2.0.0

## References

## 参考资料

API documentation:

API 文档：

* [`MediaQuery.of`][]
* [`Navigator.of`][]
* [`ScaffoldMessenger.of`][]
* [`Scaffold.of`][]
* [`Router.of`][]
* [`Localizations.localeOf`][]
* [`FocusTraversalOrder.of`][]
* [`FocusTraversalGroup.of`][]
* [`Focus.of`][]
* `Shortcuts.of`
* [`Actions.handler`][]
* [`Actions.find`][]
* [`Actions.invoke`][]
* [`AnimatedList.of`][]
* [`SliverAnimatedList.of`][]
* [`CupertinoDynamicColor.resolve`][]
* [`CupertinoDynamicColor.resolveFrom`][]
* [`CupertinoUserInterfaceLevel.of`][]
* [`CupertinoTheme.brightnessOf`][]
* [`CupertinoThemeData.resolveFrom`][]
* [`NoDefaultCupertinoThemeData.resolveFrom`][]
* [`CupertinoTextThemeData.resolveFrom`][]
* [`MaterialBasedCupertinoThemeData.resolveFrom`][]
* [`MediaQuery.maybeOf`][]
* [`Navigator.maybeOf`][]
* [`ScaffoldMessenger.maybeOf`][]
* [`Scaffold.maybeOf`][]
* [`Router.maybeOf`][]
* [`Localizations.maybeLocaleOf`][]
* [`FocusTraversalOrder.maybeOf`][]
* [`FocusTraversalGroup.maybeOf`][]
* [`Focus.maybeOf`][]
* `Shortcuts.maybeOf`
* [`Actions.maybeFind`][]
* [`Actions.maybeInvoke`][]
* [`AnimatedList.maybeOf`][]
* [`SliverAnimatedList.maybeOf`][]
* [`CupertinoDynamicColor.maybeResolve`][]
* [`CupertinoUserInterfaceLevel.maybeOf`][]
* [`CupertinoTheme.maybeBrightnessOf`][]

Relevant issue:

相关 issue：

* [Issue 68637][]

  [问题 68637][Issue 68637]

Relevant PRs:

相关 PR：

* [Remove `nullOk` in `MediaQuery.of`][]

  [移除 MediaQuery.of 中的 nullOk][Remove `nullOk` in `MediaQuery.of`]

* [Remove `nullOk` in `Navigator.of`][]

  [移除 Navigator.of 中的 nullOk][Remove `nullOk` in `Navigator.of`]

* [Remove `nullOk` parameter from `AnimatedList.of` and `SliverAnimatedList.of`][]

  [移除 AnimatedList.of 和 SliverAnimatedList.of 的 nullOk 参数][Remove `nullOk` parameter from `AnimatedList.of` and `SliverAnimatedList.of`]

* [Remove `nullOk` parameter from `Shortcuts.of`, `Actions.find`, and `Actions.handler`][]

  [移除 Shortcuts.of、Actions.find 和 Actions.handler 的 nullOk 参数][Remove `nullOk` parameter from `Shortcuts.of`, `Actions.find`, and `Actions.handler`]

* [Remove `nullOk` parameter from `Focus.of`, `FocusTraversalOrder.of`, and `FocusTraversalGroup.of`][]

  [移除 Focus.of、FocusTraversalOrder.of 和 FocusTraversalGroup.of 的 nullOk 参数][Remove `nullOk` parameter from `Focus.of`, `FocusTraversalOrder.of`, and `FocusTraversalGroup.of`]

* [Remove `nullOk` parameter from `Localizations.localeOf`][]

  [移除 Localizations.localeOf 的 nullOk 参数][Remove `nullOk` parameter from `Localizations.localeOf`]

* [Remove `nullOk` parameter from `Router.of`][]

  [移除 Router.of 的 nullOk 参数][Remove `nullOk` parameter from `Router.of`]

* [Remove `nullOk` from `Scaffold.of` and `ScaffoldMessenger.of`][]

  [移除 Scaffold.of 和 ScaffoldMessenger.of 的 nullOk][Remove `nullOk` from `Scaffold.of` and `ScaffoldMessenger.of`]

* [Remove `nullOk` parameter from Cupertino color resolution APIs][]

  [移除 Cupertino 颜色解析 API 的 nullOk 参数][Remove `nullOk` parameter from Cupertino color resolution APIs]

* [Remove vestigial `nullOk` parameter from `Localizations.localeOf`][]

  [移除 Localizations.localeOf 中残留的 nullOk 参数][Remove vestigial `nullOk` parameter from `Localizations.localeOf`]

* [Remove `nullOk` from `Actions.invoke`, add `Actions.maybeInvoke`][]

  [移除 Actions.invoke 的 nullOk，并添加 Actions.maybeInvoke][Remove `nullOk` from `Actions.invoke`, add `Actions.maybeInvoke`]

[`MediaQuery.of`]: {{site.api}}/flutter/widgets/MediaQuery/of.html
[`Navigator.of`]: {{site.api}}/flutter/widgets/Navigator/of.html
[`ScaffoldMessenger.of`]: {{site.api}}/flutter/material/ScaffoldMessenger/of.html
[`Scaffold.of`]: {{site.api}}/flutter/material/Scaffold/of.html
[`Router.of`]: {{site.api}}/flutter/widgets/Router/of.html
[`Localizations.localeOf`]: {{site.api}}/flutter/widgets/Localizations/localeOf.html
[`FocusTraversalOrder.of`]: {{site.api}}/flutter/widgets/FocusTraversalOrder/of.html
[`FocusTraversalGroup.of`]: {{site.api}}/flutter/widgets/FocusTraversalGroup/of.html
[`Focus.of`]: {{site.api}}/flutter/widgets/Focus/of.html
[`Actions.handler`]: {{site.api}}/flutter/widgets/Actions/handler.html
[`Actions.find`]: {{site.api}}/flutter/widgets/Actions/find.html
[`Actions.invoke`]: {{site.api}}/flutter/widgets/Actions/invoke.html
[`AnimatedList.of`]: {{site.api}}/flutter/widgets/AnimatedList/of.html
[`SliverAnimatedList.of`]: {{site.api}}/flutter/widgets/SliverAnimatedList/of.html
[`CupertinoDynamicColor.resolve`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/resolve.html
[`CupertinoDynamicColor.resolveFrom`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/resolveFrom.html
[`CupertinoUserInterfaceLevel.of`]: {{site.api}}/flutter/cupertino/CupertinoUserInterfaceLevel/of.html
[`CupertinoTheme.brightnessOf`]: {{site.api}}/flutter/cupertino/CupertinoTheme/brightnessOf.html
[`CupertinoThemeData.resolveFrom`]: {{site.api}}/flutter/cupertino/CupertinoThemeData/resolveFrom.html
[`NoDefaultCupertinoThemeData.resolveFrom`]: {{site.api}}/flutter/cupertino/NoDefaultCupertinoThemeData/resolveFrom.html
[`CupertinoTextThemeData.resolveFrom`]: {{site.api}}/flutter/cupertino/CupertinoTextThemeData/resolveFrom.html
[`MaterialBasedCupertinoThemeData.resolveFrom`]: {{site.api}}/flutter/material/MaterialBasedCupertinoThemeData/resolveFrom.html
[`MediaQuery.maybeOf`]: {{site.api}}/flutter/widgets/MediaQuery/maybeOf.html
[`Navigator.maybeOf`]: {{site.api}}/flutter/widgets/Navigator/maybeOf.html
[`ScaffoldMessenger.maybeOf`]: {{site.api}}/flutter/material/ScaffoldMessenger/maybeOf.html
[`Scaffold.maybeOf`]: {{site.api}}/flutter/material/Scaffold/maybeOf.html
[`Router.maybeOf`]: {{site.api}}/flutter/widgets/Router/maybeOf.html
[`Localizations.maybeLocaleOf`]: {{site.api}}/flutter/widgets/Localizations/maybeLocaleOf.html
[`FocusTraversalOrder.maybeOf`]: {{site.api}}/flutter/widgets/FocusTraversalOrder/maybeOf.html
[`FocusTraversalGroup.maybeOf`]: {{site.api}}/flutter/widgets/FocusTraversalGroup/maybeOf.html
[`Focus.maybeOf`]: {{site.api}}/flutter/widgets/Focus/maybeOf.html
[`Actions.maybeFind`]: {{site.api}}/flutter/widgets/Actions/maybeFind.html
[`Actions.maybeInvoke`]: {{site.api}}/flutter/widgets/Actions/maybeInvoke.html
[`AnimatedList.maybeOf`]: {{site.api}}/flutter/widgets/AnimatedList/maybeOf.html
[`SliverAnimatedList.maybeOf`]: {{site.api}}/flutter/widgets/SliverAnimatedList/maybeOf.html
[`CupertinoDynamicColor.maybeResolve`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/maybeResolve.html
[`CupertinoUserInterfaceLevel.maybeOf`]: {{site.api}}/flutter/cupertino/CupertinoUserInterfaceLevel/maybeOf.html
[`CupertinoTheme.maybeBrightnessOf`]: {{site.api}}/flutter/cupertino/CupertinoTheme/maybeBrightnessOf.html
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[Issue 68637]: {{site.repo.flutter}}/issues/68637
[Remove `nullOk` in `MediaQuery.of`]: {{site.repo.flutter}}/pull/68736
[Remove `nullOk` in `Navigator.of`]: {{site.repo.flutter}}/pull/70726
[Remove `nullOk` parameter from `AnimatedList.of` and `SliverAnimatedList.of`]: {{site.repo.flutter}}/pull/68925
[Remove `nullOk` parameter from `Shortcuts.of`, `Actions.find`, and `Actions.handler`]: {{site.repo.flutter}}/pull/68921
[Remove `nullOk` parameter from `Focus.of`, `FocusTraversalOrder.of`, and `FocusTraversalGroup.of`]: {{site.repo.flutter}}/pull/68917
[Remove `nullOk` parameter from `Localizations.localeOf`]: {{site.repo.flutter}}/pull/68911
[Remove `nullOk` parameter from `Router.of`]: {{site.repo.flutter}}/pull/68910
[Remove `nullOk` from `Scaffold.of` and `ScaffoldMessenger.of`]: {{site.repo.flutter}}/pull/68908
[Remove `nullOk` parameter from Cupertino color resolution APIs]: {{site.repo.flutter}}/pull/68905
[Remove vestigial `nullOk` parameter from `Localizations.localeOf`]: {{site.repo.flutter}}/pull/74657
[Remove `nullOk` from `Actions.invoke`, add `Actions.maybeInvoke`]: {{site.repo.flutter}}/pull/74680
