---
# title: Migration guide for RouteSettings copyWith
title: `RouteSettings.copyWith` 迁移指南
# description: Removal of RouteSettings copyWith and how to migrate
description: 移除 `RouteSettings.copyWith` 以及如何迁移。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `RouteSettings.copyWith` method is removed, and apps that use
it need to use the constructor to create a new `RouteSettings`
instance instead.

`RouteSettings.copyWith` 方法已被移除。
仍在使用它的应用需要改用构造函数来创建新的 `RouteSettings` 实例。

## Context

## 上下文

With the introduction of the [`Page`][] class,
the `RouteSettings.copyWith` was no longer a viable API.

随着 [`Page`][`Page`] 类的引入，
`RouteSettings.copyWith` 不再是一个可行的 API。

## Description of change

## 改动说明

`RouteSettings.copyWith` was removed

`RouteSettings.copyWith` 已被移除。

## Migration guide

## 迁移指南

Code before migration:

迁移之前的代码：

```dart
RouteSettings newSettings = oldSettings.copyWith(name: 'new name');
```

Code after migration:

迁移之后的代码：

```dart
RouteSettings newSettings = RouteSettings(name: 'new name', arguments: oldSettings.arguments);
```

## Timeline

## 时间线

Landed in version: 3.5.0-9.0.pre-137-gc6f6095acd<br>
合入版本：3.5.0-9.0.pre-137-gc6f6095acd<br>
In stable release: 3.7

进入稳定版：3.7

## References

## 参考资料

Relevant PRs:

相关 PR：

* [PR 113860][]: Removes RouteSetting.copyWith.

  [PR 113860][PR 113860]：移除 RouteSetting.copyWith。

[PR 113860]: {{site.repo.flutter}}/pull/113860
[`Page`]: {{site.api}}/flutter/widgets/Page-class.html
