---
# title: Bottom Navigation Title To Label
title: 底部导航的 title 改为 label
# description: >
#   Deprecated BottomNavigationBarItem's title (a Widget) in
#   favor of label (a String).
description: 废弃 BottomNavigationBarItem 的 title（Widget），改用 label（String）。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`BottomNavigationBarItem.title` gives a deprecation warning,
or no longer exists when referenced in code.

引用 `BottomNavigationBarItem.title` 时会收到废弃警告，
或者该属性在代码中已经不存在。

## Context

## 上下文

`BottomNavigationBarItem`s `title` parameter was deprecated
in favor of `label`. This change was necessary to improve
the user experience of `BottomNavigationBar`s when the text
scale factor is increased. Items in a `BottomNavigationBar`
now show tooltips on long press. Accomplishing this
requires a `String` parameter on `BottomNavigationBarItem`s.

`BottomNavigationBarItem` 的 `title` 参数已废弃，改用 `label`。
这次改动是为了改善文字缩放系数变大时 `BottomNavigationBar` 的体验。
`BottomNavigationBar` 中的项现在会在长按时显示 tooltip。
要做到这一点，`BottomNavigationBarItem` 需要一个 `String` 参数。

## Description of change

## 变更说明

The `BottomNavigationBarItem` class has a `title` parameter,
which is a `Widget`. This made it impossible for the
`BottomNavigationBar` to show `Tooltip` widgets,
a change that was necessary to improve the accessibility experience.
Now, instead of building the `BottomNavigationBarItem.title`
widget, the BottomNavigationBar wraps the
`BottomNavigationBarItem.label` in a Text widget and builds that.

`BottomNavigationBarItem` 类原先有一个类型为 `Widget` 的 `title` 参数。
因此 `BottomNavigationBar` 无法显示 `Tooltip` widget，
而显示 tooltip 是改善无障碍体验所需要的。
现在，BottomNavigationBar 不再构建 `BottomNavigationBarItem.title` widget，
而是把 `BottomNavigationBarItem.label` 包进 Text widget 再构建。

## Migration guide

## 迁移指南

Code before migration:

迁移之前的代码：

```dart
BottomNavigationBarItem(
  icon: Icons.add,
  title: Text('add'),
)
```

Code after migration:

迁移之后的代码：

```dart
BottomNavigationBarItem(
  icon: Icons.add,
  label: 'add',
)
```

## Timeline

## 时间线

Landed in version: 1.22.0<br>
合入版本：1.22.0<br>
In stable release: 2.0.0

进入稳定版：2.0.0

## References

## 参考资料

API documentation:

API 文档：

* [`BottomNavigationBarItem`][]

Relevant PRs:

相关 PR：

* [PR 60655][]: Clean up hero controller scope

  [PR 60655][]：清理 hero controller 的作用域

* [PR 59127][]: Update BottomNavigationBar to show tooltips on long press.

  [PR 59127][]：更新 BottomNavigationBar，使其在长按时显示 tooltip。

Breaking change proposal:

破坏性改动提案：

* [Breaking Change: Bottom Navigation Item Title][]

  [破坏性改动：底部导航项的 title][Breaking Change: Bottom Navigation Item Title]


[`BottomNavigationBarItem`]: {{site.api}}/flutter/widgets/BottomNavigationBarItem-class.html
[Breaking Change: Bottom Navigation Item Title]: /go/bottom-navigation-bar-title-deprecation
[PR 59127]: {{site.repo.flutter}}/pull/59127
[PR 60655]: {{site.repo.flutter}}/pull/60655
