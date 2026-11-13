---
# title: Deprecate `containsSemantics` in favor of `isSemantics`
title: 弃用 `containsSemantics`，改用 `isSemantics`
# description: >-
#   The `containsSemantics` matcher has been deprecated in favor of
#   `isSemantics` and `matchesSemantics` matchers.
description: >-
  `containsSemantics` 匹配器已弃用，
  请改用 `isSemantics` 和 `matchesSemantics` 匹配器。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `containsSemantics` partial matcher is deprecated and replaced by
`isSemantics` to clarify intent and standardize matcher conventions.

部分匹配器 `containsSemantics` 已弃用，由 `isSemantics` 取代，
以便明确意图并统一匹配器的命名约定。

## Context

## 背景

The `contains` prefix for partial matchers, such as `containsSemantics`, has been 
replaced with `is` to align with naming conventions:

部分匹配器的 `contains` 前缀（例如 `containsSemantics`）
已改为 `is`，以符合命名约定：

* **Partial matchers** (such as `isSemantics`) match only
  the properties explicitly provided.
  Any arguments not provided are ignored.

  **部分匹配器**（例如 `isSemantics`）只匹配显式提供的属性。
  未提供的参数会被忽略。

* **Exact matchers** (such as `matchesSemantics`) verify all values.
  Any arguments not provided are expected to
  match the object's default values.

  **精确匹配器**（例如 `matchesSemantics`）会校验所有值。
  未提供的参数应匹配对象的默认值。

## Migration guide

## 迁移指南

To automatically migrate your code, run the following command:

要自动迁移代码，请运行以下命令：

```console
$ dart fix --apply
```

Alternatively, replace `containsSemantics` with `isSemantics` for partial
matching (most common case), or `matchesSemantics` if you need to assert 
exact property values (including defaults for omitted arguments).

也可以把 `containsSemantics` 换成 `isSemantics` 做部分匹配
（最常见的情况）；如果需要断言精确的属性值
（包括被省略参数的默认值），则改用 `matchesSemantics`。

Code before migration:

迁移之前的代码：

```dart
expect(
  tester.getSemantics(find.byType(MyWidget)),
  containsSemantics(
    label: 'My Widget',
    isButton: true,
  ),
);
```

Code after migration:

迁移之后的代码：

```dart
expect(
  tester.getSemantics(find.byType(MyWidget)),
  isSemantics(
    label: 'My Widget',
    isButton: true,
  ),
);
```

## Timeline

## 时间线

Landed in version: 3.40.0-1.0.pre<br>
合入版本：3.40.0-1.0.pre<br>
In stable release: 3.41

进入稳定版：3.41

## References

## 参考资料

API documentation:

API 文档：

* [`isSemantics`][]
* [`matchesSemantics`][]

Relevant issues:

相关 issue：

* [Issue 180534][]
* [Issue 107859][]

Relevant PR:

相关 PR：

* [PR 180538][]

[`isSemantics`]: {{site.api}}/flutter/flutter_test/isSemantics.html
[`matchesSemantics`]: {{site.api}}/flutter/flutter_test/matchesSemantics.html
[Issue 180534]: {{site.repo.flutter}}/issues/180534
[Issue 107859]: {{site.repo.flutter}}/issues/107859
[PR 180538]: {{site.repo.flutter}}/pull/180538
