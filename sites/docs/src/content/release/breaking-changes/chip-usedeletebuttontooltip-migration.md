---
# title: Migrate useDeleteButtonTooltip to deleteButtonTooltipMessage of Chips
title: 将 Chip 的 useDeleteButtonTooltip 迁移到 deleteButtonTooltipMessage
# description: >
#   Deprecated useDeleteButtonTooltip of chips that have
#   a delete button in favor of deleteButtonTooltipMessage.
description: >
  带删除按钮的 Chip 已弃用 useDeleteButtonTooltip，
  请改用 deleteButtonTooltipMessage。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Using `useDeleteButtonTooltip` of any chip that has a delete button gives a
deprecation warning, or no longer exists when referenced. This includes the
`Chip`, `InputChip`, and `RawChip` widgets.

任何带删除按钮的 Chip 在使用 `useDeleteButtonTooltip` 时都会给出弃用警告，
或者该属性在被引用时已不存在。
这包括 `Chip`、`InputChip` 和 `RawChip` widget。

## Context

## 背景

The `useDeleteButtonTooltip` of `Chip`, `InputChip`, and `RawChip` widgets is
deprecated in favor of `deleteButtonTooltipMessage`, as the latter can be used
to disable the tooltip of the chip's delete button.

`Chip`、`InputChip` 和 `RawChip` widget 的 `useDeleteButtonTooltip` 已弃用，
请改用 `deleteButtonTooltipMessage`。
后者可以用来关闭 Chip 删除按钮的工具提示。

## Description of change

## 改动说明

The `deleteButtonTooltipMessage` property provides a message to the
tooltip on the delete button of the chip widgets.
Subsequently, a change was made such that providing an empty string to this
property disables the tooltip.

`deleteButtonTooltipMessage` 属性为 Chip widget 删除按钮上的工具提示提供文案。
随后又做了一项改动：向该属性传入空字符串即可关闭工具提示。

To avoid redundancy of the API, this change deprecated `useDeleteButtonTooltip`,
which was introduced for this exact functionality. A [Flutter fix][] is
available to help you migrate existing code from `useDeleteButtonTooltip` to
`deleteButtonTooltipMessage`, if you explicitly disabled the tooltip.

为避免 API 冗余，此次改动弃用了 `useDeleteButtonTooltip`。
该属性当初就是为了实现这一功能而引入的。
如果你显式关闭了工具提示，可以使用 [Flutter Fix][Flutter fix]，
把现有代码从 `useDeleteButtonTooltip` 迁移到 `deleteButtonTooltipMessage`。

## Migration guide

## 迁移指南

By default, the tooltip of the delete button is always enabled.
To explicitly disable the tooltip, provide an empty string to the
`deleteButtonTooltipMessage` property.
The following code snippets show the migration changes, which are applicable for
`Chip`, `InputChip`, and `RawChip` widgets:

默认情况下，删除按钮的工具提示始终启用。
若要显式关闭工具提示，请向 `deleteButtonTooltipMessage` 属性传入空字符串。
下面的代码片段展示了迁移改动，适用于
`Chip`、`InputChip` 和 `RawChip` widget：

Code before migration:

迁移前的代码：

```dart
Chip(
  label: const Text('Disabled delete button tooltip'),
  onDeleted: _handleDeleteChip,
  useDeleteButtonTooltip: false,
);

RawChip(
  label: const Text('Enabled delete button tooltip'),
  onDeleted: _handleDeleteChip,
  useDeleteButtonTooltip: true,
);
```

Code after migration:

迁移后的代码：

```dart
Chip(
  label: const Text('Disabled delete button tooltip'),
  onDeleted: _handleDeleteChip,
  deleteButtonTooltipMessage: '',
);

RawChip(
  label: const Text('Enabled delete button tooltip'),
  onDeleted: _handleDeleteChip,
);
```

## Timeline

## 时间线

Landed in version: 2.11.0-0.1.pre<br>
合入版本：2.11.0-0.1.pre<br>
In stable release: 3.0.0

进入稳定版：3.0.0

## References

## 参考资料

API documentation:

API 文档：

* [`Chip`][]

  [`Chip`][`Chip`]

* [`InputChip`][]

  [`InputChip`][`InputChip`]

* [`RawChip`][]

  [`RawChip`][`RawChip`]

Relevant PR:

相关 PR：

* [Deprecate `useDeleteButtonTooltip` for Chips][]

  [弃用 Chip 的 `useDeleteButtonTooltip`][Deprecate `useDeleteButtonTooltip` for Chips]

[`Chip`]: {{site.api}}/flutter/material/Chip-class.html
[`InputChip`]: {{site.api}}/flutter/material/InputChip-class.html
[`RawChip`]: {{site.api}}/flutter/material/RawChip-class.html

[Deprecate `useDeleteButtonTooltip` for Chips]: {{site.repo.flutter}}/pull/96174
[Flutter fix]: /tools/flutter-fix
