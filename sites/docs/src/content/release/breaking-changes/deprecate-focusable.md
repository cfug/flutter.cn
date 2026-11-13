---
# title: Deprecate `SemanticsProperties.focusable` and `SemanticsConfiguration.isFocusable`
title: 弃用 `focusable` 与 `isFocusable`
# description: >
#   The `focusable` parameter has been replaced by `isFocused`.
description: >
  `focusable` 参数已由 `isFocused` 替代。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `SemanticsProperties.focusable` and `SemanticsConfiguration.isFocusable`
parameters were deprecated in favor of the `SemanticsProperties.focused` and
`SemanticsConfiguration.isFocused` parameters.

`SemanticsProperties.focusable` 与 `SemanticsConfiguration.isFocusable`
参数已弃用，请改用 `SemanticsProperties.focused`
与 `SemanticsConfiguration.isFocused` 参数。

The `focused` parameter is now nullable.
Setting it to `true` or `false` automatically
sets `isFocusable` to `true`, while
setting it to `null` sets `isFocusable` to `false`.

`focused` 参数现在可为空。
把它设为 `true` 或 `false` 时，
会自动把 `isFocusable` 设为 `true`；
把它设为 `null` 时，会把 `isFocusable` 设为 `false`。

## Context

## 上下文

The `SemanticsConfiguration.isFocusable` property is a boolean that
indicates whether the semantics node can have input focus.
`SemanticsConfiguration.isFocused` is a boolean that indicates if the
semantics node has input focus.

`SemanticsConfiguration.isFocusable` 是一个布尔值，
表示该语义节点能否获得输入焦点。
`SemanticsConfiguration.isFocused` 是一个布尔值，
表示该语义节点当前是否拥有输入焦点。

This change also applies to
`SemanticsProperties.focusable` and `SemanticsProperties.focused`.

此改动同样适用于
`SemanticsProperties.focusable` 和 `SemanticsProperties.focused`。

We deprecated `isFocusable` because its functionality is covered by `isFocused`.
The `isFocused` property is now stored as a tristate flag in the engine,
and this change makes the framework consistent with the engine.

我们弃用了 `isFocusable`，因为 `isFocused` 已经覆盖它的功能。
`isFocused` 属性现在在引擎中以三态标志存储，
此改动让框架与引擎保持一致。

## Description of change

## 改动说明

The `SemanticsConfiguration.isFocusable` property is
deprecated in favor of `SemanticsConfiguration.isFocused`.
This property is a nullable boolean; setting it to `true` or `false`
automatically sets `isFocusable` to `true`, and
setting it to `null` sets `isFocusable` to `false`.

`SemanticsConfiguration.isFocusable` 属性已弃用，
请改用 `SemanticsConfiguration.isFocused`。
该属性是可空布尔值；设为 `true` 或 `false` 时，
会自动把 `isFocusable` 设为 `true`；
设为 `null` 时，会把 `isFocusable` 设为 `false`。

## Migration guide

## 迁移指南

Replace `SemanticsConfiguration.isFocusable` with
`SemanticsConfiguration.isFocused`.

把 `SemanticsConfiguration.isFocusable` 替换为
`SemanticsConfiguration.isFocused`。

### Example 1: Setting `isFocused` to `true` automatically sets `isFocusable` to `true`

### 示例 1：将 `isFocused` 设为 `true` 会自动把 `isFocusable` 设为 `true`

Code before migration:

迁移前的代码：

```dart
void describeSemanticsConfiguration(SemanticsConfiguration config) {
  config.isFocusable = true;
  config.isFocused = true;
}
```

Code after migration:

迁移后的代码：

```dart
void describeSemanticsConfiguration(SemanticsConfiguration config) {
  config.isFocused = true;
}
```

### Example 2: Setting `isFocused` to `null` automatically sets `isFocusable` to `false`

### 示例 2：将 `isFocused` 设为 `null` 会自动把 `isFocusable` 设为 `false`

Code before migration:

迁移前的代码：

```dart
void describeSemanticsConfiguration(SemanticsConfiguration config) {
  config.isFocusable = false;
  config.isFocused = false;
}
```

Code after migration:

迁移后的代码：

```dart
void describeSemanticsConfiguration(SemanticsConfiguration config) {
  config.isFocused = null;
}
```


## Timeline

## 时间线

Landed in version: 3.37.0-0.0.pre<br>
合入版本：3.37.0-0.0.pre<br>
In stable release: 3.38

进入稳定版：3.38


## References

## 参考资料

API documentation:

API 文档：

* [`SemanticsConfiguration`][]
* [`SemanticsProperties`][]
* [`SemanticsNode`][]

Relevant issue:

相关 issue：

* [Issue 166092][]

Relevant PR:

相关 PR：

* [PR 170935][]

[`SemanticsConfiguration`]: {{site.api}}/flutter/semantics/SemanticsConfiguration-class.html
[`SemanticsProperties`]: {{site.api}}/flutter/semantics/SemanticsProperties-class.html
[`SemanticsNode`]: {{site.api}}/flutter/semantics/SemanticsNode-class.html
[Issue 166092]: {{site.repo.flutter}}/issues/166092
[PR 170935]: {{site.repo.flutter}}/pull/170935
