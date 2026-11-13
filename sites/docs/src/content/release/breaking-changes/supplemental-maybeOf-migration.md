---
# title: Migrate `of` to non-nullable return values, and add `maybeOf`
title: 将 of 迁移为非空返回值，并新增 maybeOf
# description: >
#   To eliminate nullOk parameters to help with API clarity
#   in the face of null safety.
description: 移除 nullOk 参数，让 API 在空安全下更清晰。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

This migration guide describes conversion of code that uses various static `of`
functions to retrieve information from a context that used to return nullable
values, but now return non-nullable values.

本迁移指南说明如何改写这样的代码：它们使用各种静态 `of` 函数从 context 中获取信息，
这些函数以前返回可空值，现在返回非空值。

## Context

## 上下文

Flutter has a common pattern of allowing lookup of some types of widgets
(typically [`InheritedWidget`][]s, but also others) using static member
functions that are typically called `of`.

Flutter 有一种常见模式：用通常名为 `of` 的静态成员函数，
查找某些类型的 widget（通常是 [`InheritedWidget`][]，也包括其他 widget）。

When non-nullability was made the default, it was then desirable to have the
most commonly used APIs return a non-nullable value. This is because saying
`Scrollable.of(context)` and then still requiring an `!` operator or `?` and a
fallback value after that call felt awkward, and was not idiomatic for
non-nullable Dart code.

当非空成为默认行为后，最常用的 API 最好返回非空值。
因为写成 `Scrollable.of(context)` 之后，还得再加 `!` 运算符，
或者加 `?` 并提供回退值，这样很别扭，也不符合非空 Dart 代码的习惯。

A lot of this migration was performed when we eliminated `nullOk` parameters in
a [previous migration][], but some `of` methods were missed in that migration,
and some were subsequently added with nullable return types, counter to our
common pattern.

这次迁移的很大一部分，是在 [先前的迁移][previous migration] 中
移除 `nullOk` 参数时完成的。
但那次迁移漏掉了一些 `of` 方法，
后来新增的一些方法又使用了可空返回类型，与我们的常见模式相反。

In this migration, the affected `of` accessors were split into two calls: one
that returned a non-nullable value and threw an exception when the sought-after
value was not present (still called `of`), and one that returned a nullable
value that didn't throw an exception, and returned null if the value was not
present (a new method called `maybeOf`).

在这次迁移中，受影响的 `of` 访问器被拆成两次调用：
一次仍叫 `of`，返回非空值，找不到目标值时抛出异常；
另一次是新方法 `maybeOf`，返回可空值，找不到时返回 null，不抛出异常。

## Description of change

## 变更说明

The change modified these static `of` APIs to return non-nullable values.
If a value is not found, they will also now assert in debug mode, and
throw an exception in release mode.

这次改动让下列静态 `of` API 返回非空值。
如果找不到值，它们现在会在调试模式下断言，并在发布模式下抛出异常。

* [`AutofillGroup.of`]
* [`DefaultTabController.of`]
* [`DefaultTextHeightBehavior.of`]
* [`Form.of`]
* [`HeroControllerScope.of`]
* [`Material.of`]
* [`Overlay.of`]
* [`PageStorage.of`]
* [`PrimaryScrollController.of`]
* [`RenderAbstractViewport.of`]
* [`RestorationScope.of`]
* [`Scrollable.of`]
* [`ScrollNotificationObserver.of`]

This change also introduced new static `maybeOf` APIs alongside
the above functions, which return a nullable version of the same value, and
simply return null if the value is not found, without throwing any exceptions.

这次改动还在上述函数旁边引入了新的静态 `maybeOf` API。
它们返回同一值的可空版本，找不到时直接返回 null，不抛出任何异常。

* [`AutofillGroup.maybeOf`]
* [`DefaultTabController.maybeOf`]
* [`DefaultTextHeightBehavior.maybeOf`]
* [`Form.maybeOf`]
* [`HeroControllerScope.maybeOf`]
* [`Material.maybeOf`]
* [`Overlay.maybeOf`]
* [`PageStorage.maybeOf`]
* [`PrimaryScrollController.maybeOf`]
* [`RenderAbstractViewport.maybeOf`]
* [`RestorationScope.maybeOf`]
* [`Scrollable.maybeOf`]
* [`ScrollNotificationObserver.maybeOf`]

## Migration guide

## 迁移指南

To modify your code to use the new form of the APIs, first convert all
instances of the original static `of` functions (where its nullability is
important) to use the `maybeOf` form instead.

要改用新形式的 API，先把原来那些可空性很重要的静态 `of` 函数调用，
改成 `maybeOf` 形式。

Code before migration:

迁移之前的代码：

```dart
ScrollController? controller = Scrollable.of(context);
```

Code after migration:

迁移之后的代码：

```dart
ScrollController? controller = Scrollable.maybeOf(context);
```

Then, for instances where the code calls the `of` API followed by
an exclamation point, just remove the exclamation point: it can
no longer return a nullable value.

然后，对于调用 `of` API 后再加感叹号的地方，直接去掉感叹号：
它不能再返回可空值。

Code before migration:

迁移之前的代码：

```dart
ScrollController controller = Scrollable.of(context)!;
```

Code after migration:

迁移之后的代码：

```dart
ScrollController controller = Scrollable.of(context);
```

The following can also be helpful:

下面这些工具也会有帮助：

* [`unnecessary_non_null_assertion`][] (linter message) identifies
  places where an  `!` operator should be removed

  [`unnecessary_non_null_assertion`][]（lint 信息）会标出
  应当移除 `!` 运算符的位置

* [`unnecessary_null_checks`][] (analysis option) identifies places
  where the `?` operator isn't needed

  [`unnecessary_null_checks`][]（分析选项）会标出
  不需要 `?` 运算符的位置

* [`unnecessary_null_in_if_null_operators`][] identifies places
  where a `??` operator isn't needed

  [`unnecessary_null_in_if_null_operators`][] 会标出
  不需要 `??` 运算符的位置

* [`unnecessary_nullable_for_final_variable_declarations`][] (analysis option)
  finds unnecessary question mark operators on `final` and `const` variables

  [`unnecessary_nullable_for_final_variable_declarations`][]（分析选项）
  会找出 `final` 和 `const` 变量上不必要的问号运算符

## Timeline

## 时间线

In stable release: 3.7

进入稳定版：3.7

## References

## 参考资料

API documentation:

API 文档：

* [`Material.of`][]

Relevant PRs:

相关 PR：

* [Add `maybeOf` for all the cases when `of` returns nullable][]

  [为所有 of 返回可空值的情况添加 maybeOf][Add `maybeOf` for all the cases when `of` returns nullable]

* [Add `Overlay.maybeOf`, make `Overlay.of` return a non-nullable instance][]

  [添加 Overlay.maybeOf，并让 Overlay.of 返回非空实例][Add `Overlay.maybeOf`, make `Overlay.of` return a non-nullable instance]

[previous migration]: /release/breaking-changes/eliminating-nullok-parameters
[`unnecessary_non_null_assertion`]: {{site.dart-site}}/tools/diagnostic-messages#unnecessary_non_null_assertion
[`unnecessary_null_checks`]: {{site.dart-site}}/tools/linter-rules#unnecessary_null_checks
[`unnecessary_null_in_if_null_operators`]: {{site.dart-site}}/tools/linter-rules#unnecessary_null_in_if_null_operators
[`unnecessary_nullable_for_final_variable_declarations`]: {{site.dart-site}}/tools/linter-rules#unnecessary_nullable_for_final_variable_declarations
[`AutofillGroup.maybeOf`]: {{site.api}}/flutter/widgets/AutofillGroup/maybeOf.html
[`AutofillGroup.of`]: {{site.api}}/flutter/widgets/AutofillGroup/of.html
[`DefaultTabController.maybeOf`]: {{site.api}}/flutter/material/DefaultTabController/maybeOf.html
[`DefaultTabController.of`]: {{site.api}}/flutter/material/DefaultTabController/of.html
[`DefaultTextHeightBehavior.maybeOf`]: {{site.api}}/flutter/widgets/DefaultTextHeightBehavior/maybeOf.html
[`DefaultTextHeightBehavior.of`]: {{site.api}}/flutter/widgets/DefaultTextHeightBehavior/of.html
[`Form.maybeOf`]: {{site.api}}/flutter/widgets/Form/maybeOf.html
[`Form.of`]: {{site.api}}/flutter/widgets/Form/of.html
[`HeroControllerScope.maybeOf`]: {{site.api}}/flutter/widgets/HeroControllerScope/maybeOf.html
[`HeroControllerScope.of`]: {{site.api}}/flutter/widgets/HeroControllerScope/of.html
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[`Material.maybeOf`]: {{site.api}}/flutter/material/Material/maybeOf.html
[`Material.of`]: {{site.api}}/flutter/material/Material/of.html
[`Overlay.maybeOf`]: {{site.api}}/flutter/widgets/Overlay/maybeOf.html
[`Overlay.of`]: {{site.api}}/flutter/widgets/Overlay/of.html
[`PageStorage.maybeOf`]: {{site.api}}/flutter/widgets/PageStorage/maybeOf.html
[`PageStorage.of`]: {{site.api}}/flutter/widgets/PageStorage/of.html
[`PrimaryScrollController.maybeOf`]: {{site.api}}/flutter/widgets/PrimaryScrollController/maybeOf.html
[`PrimaryScrollController.of`]: {{site.api}}/flutter/widgets/PrimaryScrollController/of.html
[`RenderAbstractViewport.maybeOf`]: {{site.api}}/flutter/rendering/RenderAbstractViewport/maybeOf.html
[`RenderAbstractViewport.of`]: {{site.api}}/flutter/rendering/RenderAbstractViewport/of.html
[`RestorationScope.maybeOf`]: {{site.api}}/flutter/widgets/RestorationScope/maybeOf.html
[`RestorationScope.of`]: {{site.api}}/flutter/widgets/RestorationScope/of.html
[`Scrollable.maybeOf`]: {{site.api}}/flutter/widgets/Scrollable/maybeOf.html
[`Scrollable.of`]: {{site.api}}/flutter/widgets/Scrollable/of.html
[`ScrollNotificationObserver.maybeOf`]: {{site.api}}/flutter/widgets/ScrollNotificationObserver/maybeOf.html
[`ScrollNotificationObserver.of`]: {{site.api}}/flutter/widgets/ScrollNotificationObserver/of.html
[Add `maybeOf` for all the cases when `of` returns nullable]: {{site.repo.flutter}}/pull/114120
[Add `Overlay.maybeOf`, make `Overlay.of` return a non-nullable instance]: {{site.repo.flutter}}/pull/110811
