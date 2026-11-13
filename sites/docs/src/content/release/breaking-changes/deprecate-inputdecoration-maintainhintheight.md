---
# title: Deprecate `InputDecoration.maintainHintHeight` in favor of
#   `InputDecoration.maintainHintSize`
title: >-
  弃用 `InputDecoration.maintainHintHeight`，
  改用 `InputDecoration.maintainHintSize`
# description: >-
#   The `InputDecoration.maintainHintHeight` parameter has been replaced by
#   `InputDecoration.maintainHintSize`.
description: >-
  `InputDecoration.maintainHintHeight` 参数已由
  `InputDecoration.maintainHintSize` 取代。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The [`InputDecoration.maintainHintHeight`][] parameter was deprecated
in favor of the [`InputDecoration.maintainHintSize`][] parameter.

[`InputDecoration.maintainHintHeight`][`InputDecoration.maintainHintHeight`]
参数已弃用，
请改用
[`InputDecoration.maintainHintSize`][`InputDecoration.maintainHintSize`]
参数。

## Context

## 上下文

The default intrinsic size of an input decorator depends on the hint size.
The [`InputDecoration.maintainHintSize`][] parameter can be set to `false` to
make the intrinsic size ignores the hint size when the hint isn't visible.
Previously, the `InputDecoration.maintainHintHeight` parameter was
used to override the default intrinsic height and had no impact on the
intrinsic width.

输入装饰器的默认固有尺寸取决于 hint 的尺寸。
将 [`InputDecoration.maintainHintSize`][`InputDecoration.maintainHintSize`]
设为 `false` 后，hint 不可见时，固有尺寸会忽略 hint 的尺寸。
此前，`InputDecoration.maintainHintHeight` 参数
用于覆盖默认固有高度，对固有宽度没有影响。

## Description of change

## 改动说明

The [`InputDecoration.maintainHintHeight`][] is deprecated in
favor of [`InputDecoration.maintainHintSize`][] which makes both the intrinsic
width and height depend on the hint dimensions.

[`InputDecoration.maintainHintHeight`][`InputDecoration.maintainHintHeight`]
已弃用，
请改用 [`InputDecoration.maintainHintSize`][`InputDecoration.maintainHintSize`]，
它会让固有宽度和固有高度都取决于 hint 的尺寸。

## Migration guide

## 迁移指南

Replace [`InputDecoration.maintainHintHeight`][] with
[`InputDecoration.maintainHintSize`][] to override the default intrinsic size
computation.

将 [`InputDecoration.maintainHintHeight`][`InputDecoration.maintainHintHeight`]
替换为 [`InputDecoration.maintainHintSize`][`InputDecoration.maintainHintSize`]，
以覆盖默认的固有尺寸计算。

Code before migration:

迁移之前的代码：

```dart highlightLines=3
TextField(
  indicator: InputDecoration(
    maintainHintHeight: false,
  ),
),
```

Code after migration:

迁移之后的代码：

```dart highlightLines=3
TextField(
  indicator: InputDecoration(
    maintainHintSize: false,
  ),
),
```

## Timeline

## 时间线

Landed in version: 3.30.0-0.0.pre<br>
合入版本：3.30.0-0.0.pre<br>
In stable release: 3.32

进入稳定版：3.32

## References

## 参考资料

API documentation:

API 文档：

- [`InputDecoration.maintainHintHeight`][]
- [`InputDecoration.maintainHintSize`][]

Relevant issues:

相关 issue：

- [Issue #93337][]

Relevant PRs:

相关 PR：

- [Fix TextField intrinsic width when hint is not visible][]

  [修复 hint 不可见时
  TextField 的固有宽度][Fix TextField intrinsic width when hint is not visible]

[`InputDecoration.maintainHintHeight`]: {{site.api}}/flutter/material/InputDecoration/maintainHintHeight.html
[`InputDecoration.maintainHintSize`]: {{site.main-api}}/flutter/material/InputDecoration/maintainHintSize.html
[Issue #93337]: {{site.repo.flutter}}/issues/93337
[Fix TextField intrinsic width when hint is not visible]: {{site.repo.flutter}}/pull/161235
