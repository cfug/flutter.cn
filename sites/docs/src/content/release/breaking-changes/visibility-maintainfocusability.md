---
# title: The Visibility widget is no longer focusable by default when maintainState is enabled
title: 启用 maintainState 时 Visibility widget 默认不再可聚焦
# description: >-
#   The Visibility widget by default no longer implicitly retains focusability
#   for its child when maintainState is enabled.
description: >-
  启用 maintainState 时，Visibility widget 默认不再
  为其子组件隐式保留可聚焦性。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

This change was introduced to fix an issue
where an `IndexedStack`s hidden children would be focusable with keyboard events
(see [issue](https://github.com/flutter/flutter/issues/114213))
due to the underlying `Visibility` widgets default behavior.

这次改动用于修复一个问题：
`IndexedStack` 的隐藏子组件会响应键盘事件而获得焦点
（参阅 [该 issue](https://github.com/flutter/flutter/issues/114213)），
原因是底层 `Visibility` widget 的默认行为。

## Description of change

## 改动说明

The core change is the `Visibility` widget is no longer focusable by default
when `maintainState` is enabled.
A new flag, `maintainFocusability`, must be set to true with `maintainState`
for a hidden widget to remain focusable.

核心改动是：启用 `maintainState` 时，
`Visibility` widget 默认不再可聚焦。
隐藏的 widget 若要保持可聚焦，
必须在设置 `maintainState` 的同时把新标志 `maintainFocusability` 设为 true。

## Migration guide

## 迁移指南

If your app has a `Visibility` widget that does not set `maintainState` to true,
then no changes are required.

如果应用中的 `Visibility` widget 没有把 `maintainState` 设为 true，
则无需改动。

If your app has a `Visibility` widget that sets `maintainState` to true
and you relied on the previous default behavior
that allowed you to focus your hidden widget,
you will need to set `maintainFocusability` to true.

如果应用中的 `Visibility` widget 把 `maintainState` 设为了 true，
并且你依赖之前的默认行为来聚焦隐藏的 widget，
则需要把 `maintainFocusability` 设为 true。

Code before migration:

迁移前的代码：

```dart
child: Visibility(
    maintainState: true,
    child: SomeWidget(),
)
```

Code after migration:

迁移后的代码：

```dart
child: Visibility(
    maintainState: true,
    maintainFocusability: true,
    child: SomeWidget(),
)
```

## Timeline

## 时间线

Landed in version: 3.34.0-pre<br>
合入版本：3.34.0-pre<br>
In stable release: 3.35

进入稳定版：3.35

## References

## 参考资料

API documentation:

API 文档：

* [`Visibility`]({{site.api}}/flutter/widgets/Visibility-class.html)

  [`Visibility`]({{site.api}}/flutter/widgets/Visibility-class.html)

Relevant issues:

相关 issue：

* [Issue 114213]({{site.repo.flutter}}/issues/114213)

  [Issue 114213]({{site.repo.flutter}}/issues/114213)

Relevant PRs:

相关 PR：

* [PR 159133: Add flag to exclude focus for hidden children in Visibility, maintainFocusability. Set maintainFocusability to false in IndexedStack]({{site.repo.flutter}}/pull/159133)

  [PR 159133：为 Visibility 增加 maintainFocusability，使隐藏子组件不再获得焦点，并在 IndexedStack 中将其设为 false]({{site.repo.flutter}}/pull/159133)
