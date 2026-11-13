---
# title: Page transition builders reorganization
title: 页面转场构建器重组
# description: >-
#   CupertinoPageTransitionsBuilder has been moved from the
#   Material library to the Cupertino library where it belongs.
description: CupertinoPageTransitionsBuilder 已从 Material 库移到它所属的 Cupertino 库。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`CupertinoPageTransitionsBuilder` has been relocated from
`package:flutter/material.dart` to `package:flutter/cupertino.dart`.

`CupertinoPageTransitionsBuilder` 已从
`package:flutter/material.dart` 移到 `package:flutter/cupertino.dart`。

## Background

## 背景

Flutter provides several page transition builders that
control how routes animate when navigating between pages.
These builders are used with `PageTransitionsTheme` to
customize transitions per platform.

Flutter 提供了多种页面转场构建器，
用来控制页面之间导航时路由如何动画。
这些构建器配合 `PageTransitionsTheme` 使用，
可以按平台自定义转场。

The available page transition builders are:

可用的页面转场构建器如下：

| <t>Builder</t><t>构建器</t> | <t>Library</t><t>库</t> | <t>Description</t><t>说明</t> |
|---------|---------|-------------|
| `FadeUpwardsPageTransitionsBuilder` | Material | Default transition before Material 3 |
| `FadeUpwardsPageTransitionsBuilder` | Material | Material 3 之前的默认转场 |
| `OpenUpwardsPageTransitionsBuilder` | Material | Vertical slide transition |
| `OpenUpwardsPageTransitionsBuilder` | Material | 垂直滑动转场 |
| `ZoomPageTransitionsBuilder` | Material | Zoom transition (Material 3 default) |
| `ZoomPageTransitionsBuilder` | Material | 缩放转场（Material 3 默认） |
| `PredictiveBackPageTransitionsBuilder` | Material | Android predictive back gesture support |
| `PredictiveBackPageTransitionsBuilder` | Material | 支持 Android 预测性返回手势 |
| `CupertinoPageTransitionsBuilder` | **Cupertino** | iOS-style horizontal slide transition |
| `CupertinoPageTransitionsBuilder` | **Cupertino** | iOS 风格的水平滑动转场 |

{:.table}

Previously, `CupertinoPageTransitionsBuilder` was defined in
the Material library alongside the other builders.
This class is semantically a Cupertino component because
its implementation uses Cupertino transition mixins and
provides iOS-style navigation animations.

以前，`CupertinoPageTransitionsBuilder` 定义在 Material 库中，
和其他构建器放在一起。
这个类在语义上属于 Cupertino 组件，
因为它的实现使用了 Cupertino 转场 mixin，
并提供 iOS 风格的导航动画。

This move improves code organization and allows Cupertino apps to
use this builder without depending on the Material library.

这次移动让代码组织更清晰，
Cupertino 应用也可以在不依赖 Material 库的情况下使用这个构建器。

## Migration guide

## 迁移指南

If you use `CupertinoPageTransitionsBuilder` and
only import `package:flutter/material.dart`,
add an import for `package:flutter/cupertino.dart`.

如果你使用 `CupertinoPageTransitionsBuilder`，
并且只导入了 `package:flutter/material.dart`，
请再导入 `package:flutter/cupertino.dart`。

Code before migration:

迁移之前的代码：

```dart
import 'package:flutter/material.dart';

final pageTransitionsTheme = PageTransitionsTheme(
  builders: {
    TargetPlatform.android: ZoomPageTransitionsBuilder(),
    TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
  },
);
```

Code after migration:

迁移之后的代码：

```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

final pageTransitionsTheme = PageTransitionsTheme(
  builders: {
    TargetPlatform.android: ZoomPageTransitionsBuilder(),
    TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
  },
);
```

If your app already imports both packages, no changes are needed.

如果应用已经同时导入了这两个 package，则无需修改。

## Timeline

## 时间线

Landed in version: 3.43.0-0.1.pre<br>
合入版本：3.43.0-0.1.pre<br>
In stable release: 3.44

进入稳定版：3.44

## References

## 参考资料

Relevant PRs:

相关 PR：

* [Decouple CupertinoPageTransitionsBuilder from Material][pr-179776]

  [将 CupertinoPageTransitionsBuilder 从 Material 中拆出][pr-179776]

[pr-179776]: {{site.repo.flutter}}/pull/179776
