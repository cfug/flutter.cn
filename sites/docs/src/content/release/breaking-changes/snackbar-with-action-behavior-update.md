---
# title: SnackBar with action no longer auto-dismisses
title: 带操作按钮的 SnackBar 不再自动消失
# description: >-
#   SnackBars with an action button now default to not auto-dismissing unless
#   manually dismissed by the user.
description: >-
  带操作按钮的 SnackBar 现在默认不会自动消失，
  除非用户手动将其关闭。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The default behavior of a [`SnackBar`][] with an action has changed.
Previously, a `SnackBar` with an action wouldn't
auto-dismiss if talkback was enabled.
Now, all `SnackBar` widgets with an action default to
a non-dismissible state until the user interacts with the action button.

带操作按钮的 [`SnackBar`][] 默认行为已经改变。
先前，带操作按钮的 `SnackBar` 在启用 TalkBack 时不会自动消失。
现在，所有带操作按钮的 `SnackBar` widget 默认都不会消失，
直到用户与操作按钮交互。

## Context

## 背景

A `SnackBar` with an action button is now treated as
a more persistent notification that requires user interaction.
This change improves accessibility and user experience by ensuring that
critical notifications remain on the screen until they are acknowledged.

带操作按钮的 `SnackBar` 现在被视为需要用户交互的、
更持久的通知。
这项改动让关键通知一直留在屏幕上，直到被确认，
从而改善无障碍体验和整体使用体验。

## Description of change

## 变更说明

This change aligns with the Material 3 design specification for
the `SnackBar` component:

这项改动与 Material 3 设计规范中的 `SnackBar` 组件保持一致：

* Old behavior: A `SnackBar` with an action button would auto-dismiss after a
  duration unless talkback was enabled.

  旧行为：带操作按钮的 `SnackBar` 会在一段时间后自动消失，
  除非启用了 TalkBack。

* New behavior: A `SnackBar` with an action button won't auto-dismiss;
  it remains on screen until dismissed by the user.

  新行为：带操作按钮的 `SnackBar` 不会自动消失；
  它会留在屏幕上，直到用户将其关闭。

To override this behavior, an optional `persist` property has
been added to `SnackBar`.
When `persist` is `true`, the `SnackBar` won't auto-dismiss and
remains on screen until manually dismissed by the user.
When `false`, the `SnackBar` auto-dismisses after its standard duration,
regardless of the presence of an action.
When `null`, the `SnackBar` follows the default behavior,
which won't auto-dismiss if an action is present.

要覆盖这一行为，`SnackBar` 新增了可选的 `persist` 属性。
`persist` 为 `true` 时，`SnackBar` 不会自动消失，
会留在屏幕上直到用户手动关闭。
为 `false` 时，无论是否有操作按钮，
`SnackBar` 都会在标准时长后自动消失。
为 `null` 时，`SnackBar` 遵循默认行为：
如果存在操作按钮，就不会自动消失。

## Migration guide

## 迁移指南

To restore the old auto-dismiss behavior for a SnackBar with an action, set
`persist` to `false`.

要恢复带操作按钮的 SnackBar 原先的自动消失行为，
请将 `persist` 设为 `false`。

Code before migration:

迁移前的代码：

```dart
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: const Text('This is a snackbar with an action.'),
    action: SnackBarAction(
      label: 'Action',
      onPressed: () {
        // Perform some action
      },
    ),
  ),
);
```

Code after migration:

迁移后的代码：

```dart highlightLines=4
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: const Text('This is a snackbar with an action.'),
    persist: false, // Add this line to restore auto-dismiss behavior
    action: SnackBarAction(
      label: 'Action',
      onPressed: () {
        // Perform some action
      },
    ),
  ),
);
```

## Timeline

## 时间线

Landed in version: 3.37.0-0.0.pre
In stable release: 3.38

合入版本：3.37.0-0.0.pre
进入稳定版：3.38

## References

## 参考资料

API documentation:

API 文档：

* [`SnackBar`][]

Relevant PRs:

相关 PR：

* [SnackBar with action no longer auto-dismisses][]

  [带操作按钮的 SnackBar 不再自动消失][SnackBar with action no longer auto-dismisses]

[`SnackBar`]: {{site.api}}/flutter/material/SnackBar-class.html

[SnackBar with action no longer auto-dismisses]: {{site.repo.flutter}}/pull/173084
