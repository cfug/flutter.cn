---
# title: Updated EditableText scroll into view behavior
title: 更新 EditableText 滚动到可视区域的行为
# description: >
#   Improve EditableText selection scroll into view behavior to always
#   use the current selection extent.
description: 改进 EditableText 选区滚入可视区域的行为，始终使用当前选区末端。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `Editable.onCaretChanged` callback is removed. With this change,
`EditableText` behavior for scrolling the selection into view
changes.

`Editable.onCaretChanged` 回调已被移除。
随之改变的是 `EditableText` 将选区滚入可视区域的行为。

## Context

## 上下文

Previously, upon scrolling into view to show user updates, `EditableText`
used multiple mechanisms to determine the extent of the selection or the
caret location.

以前，为了把用户的更新滚入可视区域，`EditableText`
会用多种机制判断选区末端或光标位置。

## Description of change

## 变更说明

By removing the `Editable.onCaretChanged` callback, `EditableText` will always
use the most up-to-date selection extent location when scrolling to show it.
Specifically, this improves scroll into view behavior after
changing selection from collapsed to non-collapsed using
`userUpdateTextEditingValue()`.

移除 `Editable.onCaretChanged` 回调后，
`EditableText` 在滚动以显示选区时，始终使用最新的选区末端位置。
具体来说，用 `userUpdateTextEditingValue()`
把折叠选区改成非折叠选区之后，滚入可视区域的行为会更好。

## Timeline

## 时间线

Landed in version: 3.12.0-4.0.pre<br>
合入版本：3.12.0-4.0.pre<br>
In stable release: 3.13.0

进入稳定版：3.13.0

## References

## 参考资料

API documentation:

API 文档：

* [`EditableText`]({{site.api}}/flutter/widgets/EditableText-class.html)

  [`EditableText`]({{site.api}}/flutter/widgets/EditableText-class.html)

Relevant PRs:

相关 PR：

* [109114: Remove Editable.onCaretChanged callback]({{site.repo.flutter}}/pull/109114)

  [109114：移除 Editable.onCaretChanged 回调]({{site.repo.flutter}}/pull/109114)
