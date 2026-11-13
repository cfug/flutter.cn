---
# title: Remove describeEnum
title: 移除 describeEnum
# description: >-
#   The `describeEnum` method has been removed from the Flutter framework.
#   Since Dart 2.14, enums have a `name` getter that does the same thing.
description: >-
  已从 Flutter 框架中移除 `describeEnum` 方法。
  自 Dart 2.14 起，枚举的 `name` getter 提供相同功能。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `describeEnum` method has been removed from the framework because it's redundant with the `name`
getter on `Enum` which was introduced in `Dart 2.14`.

已从框架中移除 `describeEnum` 方法，
因为它与 `Dart 2.14` 引入的 `Enum` 的 `name` getter 重复。

## Context

## 背景

Historically, Flutter used `describeEnum` to return a `String` description of an enum value.
This became redundant when the `name` getter of `Enum` was introduced in `Dart 2.14`.

过去，Flutter 使用 `describeEnum` 返回枚举值的 `String` 描述。
自 `Dart 2.14` 为 `Enum` 引入 `name` getter 后，这一做法变得多余。

## Migration guide

## 迁移指南

If your code previously used the `describeEnum` method to get the value name of an enum member,
migrate your code to use the `name` getter on the instance itself.

如果你的代码以前用 `describeEnum` 获取枚举成员的值名称，
请改为在实例自身上使用 `name` getter。

```dart diff
  enum Theme { light, dark }

- final theme = describeEnum(Theme.light);

+ Theme.light.name;
```

:::important
This migration isn't supported by `dart fix`.

此迁移不受 `dart fix` 支持。
:::

## Timeline

## 时间线

Landed in version: TBD<br>
合入版本：TBD<br>
In stable release: TBD

进入稳定版：TBD

## References

## 参考资料

API documentation:

API 文档：

* [`enums`][]


Relevant PRs:

相关 PR：

* [PR 94496][]
* [PR 190076][]

[`enums`]: {{site.dart-site}}/language/enums
[PR 94496]: {{site.repo.flutter}}/pull/94496
[PR 190076]: {{site.repo.flutter}}/pull/190076
