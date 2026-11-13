---
# title: Default `PrimaryScrollController` on Desktop
title: 桌面平台上 `PrimaryScrollController` 的默认行为
# description: >
#   The `PrimaryScrollController` will no longer attach to
#   vertical `ScrollView`s automatically on Desktop.
description: >
  在桌面平台上，`PrimaryScrollController` 不再自动附着到纵向 `ScrollView`。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `PrimaryScrollController` API has been updated to no longer automatically
attach to vertical `ScrollView`s on desktop platforms.

`PrimaryScrollController` API 已更新，
在桌面平台上不再自动附着到纵向 `ScrollView`。

## Context

## 上下文

Prior to this change, `ScrollView.primary` would default to true if a
`ScrollView` had an `Axis.vertical` scroll direction and a `ScrollController`
had not already been provided. This allowed for common UI patterns, like the
scroll-to-top function on iOS to work out of the box for Flutter apps.
On desktop however, this default would often cause the following assertion error:

此次改动之前，如果 `ScrollView` 的滚动方向是 `Axis.vertical`，
且尚未提供 `ScrollController`，`ScrollView.primary` 会默认为 true。
这样常见的 UI 模式（例如 iOS 上的滚到顶部）在 Flutter 应用中可以开箱即用。
但在桌面上，这个默认值经常会触发下面的断言错误：

```plaintext
ScrollController attached to multiple ScrollViews.
```

While it is common for a mobile application to display one `ScrollView` at a time,
desktop UI patterns are more likely to display multiple `ScrollView`s
side-by-side. The prior implementation of `PrimaryScrollController` conflicted
with this pattern, resulting in an often unhelpful error message. To remedy this,
the `PrimaryScrollController` has been updated with additional parameters as
well as better error messaging across multiple widgets that depend on it.

移动应用通常一次只显示一个 `ScrollView`，
桌面 UI 则更常并排显示多个 `ScrollView`。
`PrimaryScrollController` 之前的实现与这种模式冲突，
经常给出没什么帮助的错误信息。
为解决这个问题，`PrimaryScrollController` 增加了参数，
依赖它的多个 widget 也改进了错误信息。

## Description of change

## 改动说明

The previous implementation of `ScrollView` resulted in `primary` being true by
default for all vertical `ScrollView`s that did not already have a
`ScrollController`, on all platforms. This default behavior was not always clear,
particularly because it is separate from the `PrimaryScrollController` itself.

`ScrollView` 之前的实现会让所有尚未提供 `ScrollController` 的纵向 `ScrollView`
在所有平台上默认 `primary` 为 true。
这一默认行为并不总是清晰，
尤其是因为它与 `PrimaryScrollController` 本身是分开的。

```dart
// Previously, this ListView would always result in primary being true,
// and attached to the PrimaryScrollController on all platforms.
Scaffold(
  body: ListView.builder(
    itemBuilder: (BuildContext context, int index) {
      return Text('Item $index');
    }
  ),
);
```

The implementation changes `ScrollView.primary` to be nullable, with the fallback
decision-making being relocated to the `PrimaryScrollController`.
When `primary` is null, and no `ScrollController` has been provided, the `ScrollView`
will look up the `PrimaryScrollController` and instead call `shouldInherit` to
determine if the given `ScrollView` should use the `PrimaryScrollController`.

实现上把 `ScrollView.primary` 改为可空，
并把回退决策移到了 `PrimaryScrollController`。
当 `primary` 为 null 且没有提供 `ScrollController` 时，
`ScrollView` 会查找 `PrimaryScrollController`，
并调用 `shouldInherit` 来判断该 `ScrollView` 是否应使用 `PrimaryScrollController`。

The new members of the `PrimaryScrollController` class,
`automaticallyInheritForPlatforms` and `scrollDirection`, are evaluated in
`shouldInherit`, allowing users clarity and control over the
`PrimaryScrollController`'s behavior.

`PrimaryScrollController` 类的新成员
`automaticallyInheritForPlatforms` 和 `scrollDirection`
会在 `shouldInherit` 中参与判断，
让你能看清并控制 `PrimaryScrollController` 的行为。

By default, backwards compatibility is maintained for mobile platforms.
`PrimaryScrollController.shouldInherit` returns true for vertical
`ScrollView`s. On desktop, this returns false by default.

默认情况下，移动平台保持向后兼容。
对纵向 `ScrollView`，`PrimaryScrollController.shouldInherit` 返回 true。
在桌面上，默认返回 false。

```dart
// Only on mobile platforms will this attach to the PrimaryScrollController by
// default.
Scaffold(
  body: ListView.builder(
    itemBuilder: (BuildContext context, int index) {
      return Text('Item $index');
    }
  ),
);
```

To change the default, users can set `ScrollView.primary` true or false to
explicitly manage the `PrimaryScrollController` for an individual `ScrollView`.
For behavior across multiple `ScrollView`s, the `PrimaryScrollController` is now
configurable by setting the specific platform, as well as the scroll direction
that is preferred for inheritance.

要改变默认行为，可以把 `ScrollView.primary` 设为 true 或 false，
从而显式管理单个 `ScrollView` 的 `PrimaryScrollController`。
对于多个 `ScrollView` 的行为，现在可以通过设置具体平台
以及希望继承的滚动方向来配置 `PrimaryScrollController`。

Widgets that use the `PrimaryScrollController`, such as `NestedScrollView`,
`Scrollbar`, and `DropdownMenuButton` will experience no change to existing
functionality. Features like the iOS scroll-to-top will also continue to work as
expected without any migration.

使用 `PrimaryScrollController` 的 widget，
例如 `NestedScrollView`、`Scrollbar` 和 `DropdownMenuButton`，
现有功能不会变化。
iOS 滚到顶部这类功能也会继续按预期工作，无需迁移。

`ScrollAction`s, and `ScrollIntent`s on desktop are the only classes affected by
this change, requiring migration. By default, the `PrimaryScrollController` is
used to execute fallback keyboard scrolling `Shortcuts` if the current `Focus` is
contained within a `Scrollable`. Since displaying more than one `ScrollView`
side-by-side is common on desktop platforms, it isn't possible for
Flutter to decide "Which `ScrollView` should be primary in this view and receive
the keyboard scroll action?"

桌面上受此次改动影响、因而需要迁移的只有 `ScrollAction` 和 `ScrollIntent`。
默认情况下，如果当前 `Focus` 位于某个 `Scrollable` 内，
会用 `PrimaryScrollController` 执行回退的键盘滚动 `Shortcuts`。
桌面平台上并排显示多个 `ScrollView` 很常见，
Flutter 无法自行决定
「这个视图里哪个 `ScrollView` 应该作为主滚动视图，并接收键盘滚动操作？」

If more than one `ScrollView` was present previous to this change, the same
assertion (`ScrollController attached to multiple ScrollViews.`) would be thrown.
Now, on desktop platforms, users need to specify `primary: true` to
designate which `ScrollView` is the fallback to receive unhandled keyboard
`Shortcuts`.

此次改动之前，如果存在多个 `ScrollView`，
会抛出同样的断言（`ScrollController attached to multiple ScrollViews.`）。
现在，在桌面平台上需要指定 `primary: true`，
标明哪个 `ScrollView` 作为回退目标来接收未处理的键盘 `Shortcuts`。

## Migration guide

## 迁移指南

Code before migration:

迁移之前的代码：

```dart
// These side-by-side ListViews would throw errors from Scrollbars and
// ScrollActions previously due to the PrimaryScrollController.
Scaffold(
  body: LayoutBuilder(
    builder: (context, constraints) {
      return Row(
        children: [
          SizedBox(
            height: constraints.maxHeight,
            width: constraints.maxWidth / 2,
            child: ListView.builder(
              itemBuilder: (BuildContext context, int index) {
                return Text('List 1 - Item $index');
              }
            ),
          ),
          SizedBox(
            height: constraints.maxHeight,
            width: constraints.maxWidth / 2,
            child: ListView.builder(
              itemBuilder: (BuildContext context, int index) {
                return Text('List 2 - Item $index');
              }
            ),
          ),
        ]
      );
    },
  ),
);
```

Code after migration:

迁移之后的代码：

```dart
// These side-by-side ListViews will no longer throw errors, but for
// default ScrollActions, one will need to be designated as primary.
Scaffold(
  body: LayoutBuilder(
    builder: (context, constraints) {
      return Row(
        children: [
          SizedBox(
            height: constraints.maxHeight,
            width: constraints.maxWidth / 2,
            child: ListView.builder(
              // This ScrollView will use the PrimaryScrollController
              primary: true,
              itemBuilder: (BuildContext context, int index) {
                return Text('List 1 - Item $index');
              }
            ),
          ),
          SizedBox(
            height: constraints.maxHeight,
            width: constraints.maxWidth / 2,
            child: ListView.builder(
              itemBuilder: (BuildContext context, int index) {
                return Text('List 2 - Item $index');
              }
            ),
          ),
        ]
      );
    },
  ),
);
```

## Timeline

## 时间线

Landed in version: 3.3.0-0.0.pre<br>
合入版本：3.3.0-0.0.pre<br>
In stable release: 3.3

进入稳定版：3.3

## References

## 参考资料

API documentation:

API 文档：

* [`PrimaryScrollController`][]
* [`ScrollView`][]
* [`ScrollAction`][]
* [`ScrollIntent`][]
* [`Scrollbar`][]

Design document:

设计文档：

* [Updating PrimaryScrollController][]

  [更新 PrimaryScrollController][Updating PrimaryScrollController]

Relevant issues:

相关 issue：

* [Issue #100264][]

Relevant PRs:

相关 PR：

* [Updating PrimaryScrollController for Desktop][]

  [为桌面平台更新 PrimaryScrollController][Updating PrimaryScrollController for Desktop]

[`PrimaryScrollController`]: {{site.api}}/flutter/widgets/PrimaryScrollController-class.html
[`ScrollView`]: {{site.api}}/flutter/widgets/ScrollView-class.html
[`ScrollAction`]: {{site.api}}/flutter/widgets/ScrollAction-class.html
[`ScrollIntent`]: {{site.api}}/flutter/widgets/ScrollIntent-class.html
[`Scrollbar`]: {{site.api}}/flutter/material/Scrollbar-class.html
[Updating PrimaryScrollController]: https://docs.google.com/document/d/12OQx7h8UQzzAi0Kxh-saDC2dg7h2fghCCzwJ0ysPmZE/edit?usp=sharing&resourcekey=0-ATO-1Er3HO2HITm59I0IdA
[Issue #100264]: {{site.repo.flutter}}/issues/100264
[Updating PrimaryScrollController for Desktop]: {{site.repo.flutter}}/pull/102099
