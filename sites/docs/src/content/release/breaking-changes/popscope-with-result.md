---
# title: Generic types in PopScope
title: PopScope 中的泛型
# description: >-
#   Added a generic type to the PopScope class and updated
#   the onPopInvoked function signature.
description: >-
  为 PopScope 类添加了泛型，并更新了 onPopInvoked 函数签名。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Added a generic type to the [`PopScope`][] class and replaced
the [`onPopInvoked`][] with a new method [`onPopInvokedWithResult`][].
The new method takes a boolean `didPop` and a `result` as position parameters.

为 [`PopScope`][`PopScope`] 类添加了泛型，
并用新方法 [`onPopInvokedWithResult`][`onPopInvokedWithResult`]
替换了 [`onPopInvoked`][`onPopInvoked`]。
新方法接收布尔值 `didPop` 和 `result` 作为位置参数。

Also replaced the [`Form.onPopInvoked`] with [`Form.onPopInvokedWithResult`][]
for the same reason.

出于同样的原因，[`Form.onPopInvoked`][`Form.onPopInvoked`]
也替换为 [`Form.onPopInvokedWithResult`][`Form.onPopInvokedWithResult`]。

## Context

## 上下文

Previously, `PopScope` didn't have a way to access
the pop result when `onPopInvoked` was called.
The generic type is added to the `PopScope` class so that
the new method `onPopInvokedWithResult` can access the type-safe result.

之前，调用 `onPopInvoked` 时，`PopScope` 无法访问弹出结果。
为 `PopScope` 类添加泛型之后，
新方法 `onPopInvokedWithResult` 可以访问类型安全的结果。

## Description of change

## 改动说明

Added a generic type (`<T>`) to the `PopScope` class and
a new method `onPopInvokedWithResult`.
The `onPopInvoked` property was deprecated in favor of `onPopInvokedWithResult`.

为 `PopScope` 类添加了泛型（`<T>`）和新方法 `onPopInvokedWithResult`。
`onPopInvoked` 属性已弃用，请改用 `onPopInvokedWithResult`。

Also added a new method `onPopInvokedWithResult`
to `Form` to replace `onPopInvoked`.

同时为 `Form` 添加了新方法 `onPopInvokedWithResult`，用以替换 `onPopInvoked`。

## Migration guide

## 迁移指南

Code before migration:

迁移之前的代码：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      navigatorKey: nav,
      home: Column(
        children: [
          Form(
            canPop: false,
            onPopInvoked: (bool didPop) {
              if (didPop) {
                return;
              }
              launchConfirmationDialog();
            },
            child: MyWidget(),
          ),
          PopScope(
            canPop: false,
            onPopInvoked: (bool didPop) {
              if (didPop) {
                return;
              }
              launchConfirmationDialog();
            },
            child: MyWidget(),
          ),
        ],
      ),
    ),
  );
}
```

Code after migration:

迁移之后的代码：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      navigatorKey: nav,
      home: Column(
        children: [
          Form(
            canPop: false,
            onPopInvokedWithResult: (bool didPop, Object? result) {
              if (didPop) {
                return;
              }
              launchConfirmationDialog();
            },
            child: MyWidget(),
          ),
          PopScope<Object?>(
            canPop: false,
            onPopInvokedWithResult: (bool didPop, Object? result) {
              if (didPop) {
                return;
              }
              launchConfirmationDialog();
            },
            child: MyWidget(),
          ),
        ],
      ),
    ),
  );
}
```

The generic type should match the generic type of the [`Route`][]
that the `PopScope` is in.
For example, if the route uses `int` as its generic type,
consider using `PopScope<int>`.

泛型应当与 `PopScope` 所在 [`Route`][`Route`] 的泛型一致。
例如，如果路由的泛型是 `int`，可以考虑使用 `PopScope<int>`。

If the `PopScope` widgets are shared across multiple routes with
different types, you can use `PopScope<Object?>` to catch all possible types.

如果 `PopScope` widget 在多个类型不同的路由之间共享，
可以使用 `PopScope<Object?>` 来覆盖所有可能的类型。

## Timeline

## 时间线

Landed in version: 3.22.0-26.0.pre<br>
合入版本：3.22.0-26.0.pre<br>
In stable release: 3.24.0

进入稳定版：3.24.0

## References

## 参考资料

API documentation:

API 文档：

* [`PopScope`][]
* [`onPopInvoked`][]
* [`Route`][]
* [`onPopInvokedWithResult`][]
* [`Form.onPopInvoked`][]
* [`Form.onPopInvokedWithResult`][]

Relevant issue:

相关 issue：

* [Issue 137458][]

Relevant PR:

相关 PR：

* [Add generic type for result in PopScope][] _(reverted)_

  [为 PopScope 的结果添加泛型][Add generic type for result in PopScope] **（已回退）**

* [Reapply new PopScope API][] _(final reland)_

  [重新应用新的 PopScope API][Reapply new PopScope API] **（最终重新合入）**

[Add generic type for result in PopScope]: {{site.repo.flutter}}/pull/139164
[Reapply new PopScope API]: {{site.repo.flutter}}/pull/147607
[`PopScope`]: {{site.api}}/flutter/widgets/PopScope-class.html
[`Route`]: {{site.api}}/flutter/widgets/Route-class.html
[`onPopInvoked`]: {{site.api}}/flutter/widgets/PopScope/onPopInvoked.html
[`onPopInvokedWithResult`]: {{site.api}}/flutter/widgets/PopScope/onPopInvokedWithResult.html
[`Form.onPopInvoked`]: {{site.api}}/flutter/widgets/Form/onPopInvoked.html
[`Form.onPopInvokedWithResult`]: {{site.api}}/flutter/widgets/Form/onPopInvokedWithResult.html
[Issue 137458]: {{site.repo.flutter}}/issues/137458
