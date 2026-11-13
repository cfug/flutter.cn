---
# title: Navigator's page APIs breaking change
title: Navigator 页面 API 的破坏性改动
# description: >-
#   Replace Navigator's 'onPopPage' property with the 'onDidRemovePage' property.
description: >-
  将 Navigator 的 onPopPage 属性替换为 onDidRemovePage 属性。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The [`Navigator`][] page APIs are refactored so that
they can integrate with Flutter's other pop mechanisms.

[`Navigator`][] 的页面 API 已重构，
以便与 Flutter 的其他弹出机制集成。

## Context

## 上下文

The `onPopPage` property was added for cleaning up pages after
a page is about to be popped.
To veto pop, you'd return `false` in the callback.
This did not work well with other popping mechanisms in the framework,
such as [`PopScope`][] and iOS back gestures.

`onPopPage` 属性用于在页面即将弹出后清理页面。
要否决弹出，你可以在回调中返回 `false`。
这与框架中的其他弹出机制配合得不好，
例如 [`PopScope`][] 和 iOS 返回手势。

To integrate the framework's pop mechanisms together,
the page APIs needed to be refactored.

为了把框架的弹出机制整合在一起，
页面 API 需要重构。

## Description of change

## 变更说明

The `onDidRemovePage` property replaces the `onPopPage` property.
You can no longer veto a pop in the `onDidRemovePage` property.
Instead, you are only responsible for updating the [`pages`][].

`onDidRemovePage` 属性取代了 `onPopPage` 属性。
你不能再在 `onDidRemovePage` 中否决弹出。
你只需要负责更新 [`pages`][]。

The veto mechanism is now managed with the
`Page.canPop` and `Page.onPopInvoked` properties.
These function similar to how you use the `PopScope` widget.

否决机制现在由
`Page.canPop` 和 `Page.onPopInvoked` 属性管理。
它们的用法与 `PopScope` widget 类似。

[`pages`]: {{site.api}}/flutter/widgets/Navigator/pages.html

## Migration guide

## 迁移指南

Code before migration:

迁移之前的代码：

```dart
import 'package:flutter/material.dart';

final MaterialPage<void> page1 = MaterialPage<void>(child: Placeholder());
final MaterialPage<void> page2 = MaterialPage<void>(child: Placeholder());
final MaterialPage<void> page3 = MaterialPage<void>(child: Placeholder());

void main() {
  final List<Page<void>> pages = <Page<void>>[page1, page2, page3];
  runApp(
    MaterialApp(
      home: Navigator(
        pages: pages,
        onPopPage: (Route<Object?> route, Object? result) {
          if (route.settings == page2) {
            return false;
          }
          if (route.didPop) {
            pages.remove(route.settings);
            return true;
          }
          return false;
        },
      ),
    ),
  );
}
```

Code after migration:

迁移之后的代码：

```dart
import 'package:flutter/material.dart';

final MaterialPage<void> page1 = MaterialPage<void>(child: Placeholder());
final MaterialPage<void> page2 = MaterialPage<void>(canPop: false, child: Placeholder());
final MaterialPage<void> page3 = MaterialPage<void>(child: Placeholder());

void main() {
  final List<Page<void>> pages = <Page<void>>[page1, page2, page3];
  runApp(
    MaterialApp(
      home: Navigator(
        pages: pages,
        onDidRemovePage: (Page<Object?> page) {
          pages.remove(page);
        },
      ),
    ),
  );
}
```

## Timeline

## 时间线

Landed in version: 3.22.0-32.0.pre<br>
In stable release: 3.24.0

合入版本：3.22.0-32.0.pre<br>
进入稳定版：3.24.0

## References

## 参考资料

API documentation:

API 文档：

* [`Navigator`][]
* [`PopScope`][]

Relevant issue:

相关 issue：

* [Issue 137458][]

Relevant PR:

相关 PR：

* [Refactors page API][]

  [重构页面 API][Refactors page API]

[Refactors page API]: {{site.repo.flutter}}/pull/137792
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`PopScope`]: {{site.api}}/flutter/widgets/PopScope-class.html
[Issue 137458]: {{site.repo.flutter}}/issues/137458
