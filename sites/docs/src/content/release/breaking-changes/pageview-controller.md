---
# title: Make PageView.controller nullable
title: PageView.controller 改为可空
# description: >-
#   PageView.controller is now nullable.
description: PageView.controller 现已可空。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

If a controller isn't provided in the constructor,
the `controller` member is `null`. This makes
`PageView` and its `controller` property consistent with other widgets.

如果构造函数没有传入 controller，
`controller` 成员就为 `null`。
这样 `PageView` 及其 `controller` 属性就与其他 widget 保持一致。

## Migration guide

## 迁移指南

Before:

之前：

```dart
pageView.controller.page
```

After:

之后：

```dart
pageView.controller!.page
```

## Timeline

## 时间线

Landed in version: 3.19.0-12.0.pre<br>
In stable release: 3.22.0

合入版本：3.19.0-12.0.pre<br>
进入稳定版：3.22.0

## References

## 参考资料

Relevant issues:

相关 issue：

* [PageView uses global controller, that is never disposed. (Issue 141119)][]

  PageView 使用了从未释放的全局 controller
  （Issue 141119）：
  [链接][PageView uses global controller, that is never disposed. (Issue 141119)]

[PageView uses global controller, that is never disposed. (Issue 141119)]: {{site.repo.flutter}}/issues/141119
