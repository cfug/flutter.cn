---
# title: >-
#   Deprecated the 'value' parameter of
#   the 'DropdownButtonFormField' constructor
title: >-
  已弃用 `DropdownButtonFormField` 构造函数的 `value` 参数
# description: >-
#   The `DropdownButtonFormField` constructor parameter `value` has been
#   replaced by the parameter `initialValue`.
description: >-
  `DropdownButtonFormField` 构造函数的 `value` 参数已由 `initialValue` 取代。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `value` parameter of the [`DropdownButtonFormField`][] constructor was
deprecated in favor of the `initialValue` parameter.

[`DropdownButtonFormField`][`DropdownButtonFormField`] 构造函数的 `value` 参数已弃用，
请改用 `initialValue` 参数。

## Context

## 上下文

The `value` parameter of the [`DropdownButtonFormField`][] constructor was used
to initialize [`DropdownButtonFormField.initialValue`][].
Not using the same name was confusing. For example,
developers falsely assumed that setting `value` would change
the current selected value. This was not the case—it
only set the initial value or when the field is reset.

[`DropdownButtonFormField`][`DropdownButtonFormField`] 构造函数的 `value` 参数
用于初始化
[`DropdownButtonFormField.initialValue`][`DropdownButtonFormField.initialValue`]。
两者名称不同，容易让人误解。
例如，开发者会误以为设置 `value` 就会改变当前选中值。
事实并非如此，它只会设置初始值，或在字段重置时生效。

## Description of change

## 改动说明

The `value` parameter of the [`DropdownButtonFormField`][] constructor is
deprecated in favor of the parameter named `initialValue`.

[`DropdownButtonFormField`][`DropdownButtonFormField`] 构造函数的 `value` 参数已弃用，
请改用名为 `initialValue` 的参数。

## Migration guide

## 迁移指南

Replace the `value` parameter of the [`DropdownButtonFormField`][] constructor
with the `initialValue` parameter to initialize
[`DropdownButtonFormField.initialValue`][].

将 [`DropdownButtonFormField`][`DropdownButtonFormField`] 构造函数的 `value` 参数
替换为 `initialValue`，用来初始化
[`DropdownButtonFormField.initialValue`][`DropdownButtonFormField.initialValue`]。

Code before migration:

迁移之前的代码：

```dart highlightLines=2
DropdownButtonFormField(
  value: 'Yellow',
),
```

Code after migration:

迁移之后的代码：

```dart highlightLines=2
DropdownButtonFormField(
  initialValue: 'Yellow',
),
```

## Timeline

## 时间线

Landed in version: 3.35.0-0.0.pre<br>
合入版本：3.35.0-0.0.pre<br>
In stable release: 3.35

进入稳定版：3.35

## References

## 参考资料

API documentation:

API 文档：

- [`DropdownButtonFormField`][]
- [`DropdownButtonFormField.initialValue`][]

Relevant issues:

相关 issue：

- [Issue #169983][]

Relevant PRs:

相关 PR：

- [Deprecate `DropdownButtonFormField` `value` parameter in favor of `initialValue`][]

  [弃用 `DropdownButtonFormField` 的 `value` 参数，改用 `initialValue`][Deprecate `DropdownButtonFormField` `value` parameter in favor of `initialValue`]

[`DropdownButtonFormField`]: {{site.api}}/flutter/material/DropdownButtonFormField/DropdownButtonFormField.html
[`DropdownButtonFormField.initialValue`]: {{site.main-api}}/flutter/widgets/FormField/initialValue.html
[Issue #169983]: {{site.repo.flutter}}/issues/169983
[Deprecate `DropdownButtonFormField` `value` parameter in favor of `initialValue`]: {{site.repo.flutter}}/pull/170805
