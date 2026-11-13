---
# title: Updated `Checkbox.fillColor` behavior
title: 更新了 `Checkbox.fillColor` 的行为
# description: >
#   Improved `Checkbox.fillColor` behavior applies the fill color to the
#   background when the checkbox is unselected.
description: >
  改进后的 `Checkbox.fillColor` 会在 checkbox 未选中时把填充色应用到背景上。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `Checkbox.fillColor` is now applied to the checkbox's background when
the checkbox is unselected.

checkbox 未选中时，`Checkbox.fillColor` 现在会应用到 checkbox 的背景上。

## Context

## 上下文

Previously, the `Checkbox.fillColor` was applied to the checkbox's border
when the checkbox was unselected and its background was transparent.
With this change, the `Checkbox.fillColor` is applied to the checkbox's
background and the border uses the `Checkbox.side` color when the checkbox
is unselected.

之前，checkbox 未选中时，`Checkbox.fillColor` 会应用到边框上，背景则是透明的。
此次改动之后，checkbox 未选中时，`Checkbox.fillColor` 会应用到背景上，
边框则使用 `Checkbox.side` 的颜色。

## Description of change

## 改动说明

The `Checkbox.fillColor` is now applied to the checkbox's background when
the checkbox is unselected instead of being used as the border color.

checkbox 未选中时，`Checkbox.fillColor` 现在会应用到背景上，
不再用作边框颜色。

## Migration guide

## 迁移指南

The updated `Checkbox.fillColor` behavior applies the fill color to the
checkbox's background in the unselected state. To get the previous behavior,
set `Checkbox.fillColor` to `Colors.transparent` in the unselected state and
set `Checkbox.side` to the desired color.

更新后的 `Checkbox.fillColor` 会在未选中状态下把填充色应用到 checkbox 的背景上。
要恢复之前的行为，请在未选中状态下把 `Checkbox.fillColor` 设为 `Colors.transparent`，
并把 `Checkbox.side` 设为所需颜色。

If you use the `Checkbox.fillColor` property to customize the checkbox.

如果你使用 `Checkbox.fillColor` 属性来自定义 checkbox。

Code before migration:

迁移之前的代码：

```dart
Checkbox(
  fillColor: MaterialStateProperty.resolveWith((states) {
    if (!states.contains(MaterialState.selected)) {
      return Colors.red;
    }
    return null;
  }),
  value: _checked,
  onChanged: _enabled
    ? (bool? value) {
        setState(() {
          _checked = value!;
        });
      }
    : null,
),
```

Code after migration:

迁移之后的代码：

```dart
Checkbox(
  fillColor: MaterialStateProperty.resolveWith((states) {
    if (!states.contains(MaterialState.selected)) {
      return Colors.transparent;
    }
    return null;
  }),
  side: const BorderSide(color: Colors.red, width: 2),
  value: _checked,
  onChanged: _enabled
    ? (bool? value) {
        setState(() {
          _checked = value!;
        });
      }
    : null,
),
```

If you use the `CheckboxThemeData.fillColor` property to customize the checkbox.

如果你使用 `CheckboxThemeData.fillColor` 属性来自定义 checkbox。

Code before migration:

迁移之前的代码：

```dart
checkboxTheme: CheckboxThemeData(
  fillColor: MaterialStateProperty.resolveWith((states) {
    if (!states.contains(MaterialState.selected)) {
      return Colors.red;
    }
    return null;
  }),
),
```

Code after migration:

迁移之后的代码：

```dart
checkboxTheme: CheckboxThemeData(
  fillColor: MaterialStateProperty.resolveWith((states) {
    if (!states.contains(MaterialState.selected)) {
      return Colors.transparent;
    }
    return null;
  }),
  side: const BorderSide(color: Colors.red, width: 2),
),
```

## Timeline

## 时间线

Landed in version: 3.10.0-17.0.pre<br>
合入版本：3.10.0-17.0.pre<br>
In stable release: 3.13.0

进入稳定版：3.13.0

## References

## 参考资料

API documentation:

API 文档：

* [`Checkbox.fillColor`][]

Relevant issues:

相关 issue：

* [Add `backgroundColor` to `Checkbox` and `CheckboxThemeData`][]

  [为 `Checkbox` 和 `CheckboxThemeData` 添加 `backgroundColor`][Add `backgroundColor` to `Checkbox` and `CheckboxThemeData`]

Relevant PRs:

相关 PR：

* [`Checkbox.fillColor` should be applied to checkbox's background color when it is unchecked.][]

  [未选中时，`Checkbox.fillColor` 应作用于 checkbox 的背景色。][`Checkbox.fillColor` should be applied to checkbox's background color when it is unchecked.]

[`Checkbox.fillColor`]: {{site.api}}/flutter/material/Checkbox/fillColor.html

[Add `backgroundColor` to `Checkbox` and `CheckboxThemeData`]: {{site.repo.flutter}}/issues/123386
[`Checkbox.fillColor` should be applied to checkbox's background color when it is unchecked.]: {{site.repo.flutter}}/pull/125643
