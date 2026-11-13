---
# title: Page transitions replaced by ZoomPageTransitionsBuilder
title: 页面过渡由 ZoomPageTransitionsBuilder 替代
# description: Using the latest page transition instead of the old one.
description: 使用最新的页面过渡，替代旧的页面过渡。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

In order to ensure that libraries follow the latest OEM behavior,
the default page transition builders now use
`ZoomPageTransitionsBuilder` on all platforms (excluding iOS and macOS)
instead of `FadeUpwardsPageTransitionsBuilder`.

为了确保库遵循最新的 OEM 行为，
默认的页面过渡构建器现在在除 iOS 和 macOS 以外的所有平台上
使用 `ZoomPageTransitionsBuilder`，
而不再使用 `FadeUpwardsPageTransitionsBuilder`。

## Context

## 上下文

The `FadeUpwardsPageTransitionsBuilder` (provided with the first
Flutter release), defined a page transition that's
similar to the one provided by Android O. This page transitions builder
will eventually be deprecated on Android, as per Flutter's
[deprecation policy](/release/compatibility-policy#deprecation-policy).

`FadeUpwardsPageTransitionsBuilder`（随首个 Flutter 版本提供）
定义了一种与 Android O 相近的页面过渡。
按照 Flutter 的 [弃用策略](/release/compatibility-policy#deprecation-policy)，
这个页面过渡构建器最终会在 Android 上被弃用。

`ZoomPageTransitionsBuilder`, the new page transition builder for
Android, Linux, and Windows, defines a page transition that's similar to
the one provided by Android Q and R.

`ZoomPageTransitionsBuilder` 是 Android、Linux 和 Windows 的
新页面过渡构建器，它定义的页面过渡与 Android Q 和 R 相近。

According to the [Style guide for Flutter repo][],
the framework will follow the latest OEM behavior.
Page transition builders using `FadeUpwardsPageTransitionsBuilder`
are all switched to the `ZoomPageTransitionsBuilder`.
When the current `TargetPlatform` doesn't have
`PageTransitionsBuilder` defined in the `ThemeData.pageTransitionsTheme`,
`ZoomPageTransitionsBuilder` is used as the default.

根据 [Flutter 仓库风格指南][Style guide for Flutter repo]，
框架会遵循最新的 OEM 行为。
使用 `FadeUpwardsPageTransitionsBuilder` 的页面过渡构建器
都已切换为 `ZoomPageTransitionsBuilder`。
当当前 `TargetPlatform` 在 `ThemeData.pageTransitionsTheme` 中
没有定义 `PageTransitionsBuilder` 时，
默认使用 `ZoomPageTransitionsBuilder`。

[Style guide for Flutter repo]: {{site.repo.flutter}}/blob/main/docs/contributing/Style-guide-for-Flutter-repo.md
## Description of change

## 改动说明

`PageTransitionsBuilder`s defined in
`PageTransitionsTheme._defaultBuilders` have changed from
`FadeUpwardsPageTransitionsBuilder` to
`ZoomPageTransitionsBuilder` for `TargetPlatform.android`,
`TargetPlatform.linux` and `TargetPlatform.windows`.

`PageTransitionsTheme._defaultBuilders` 中为
`TargetPlatform.android`、`TargetPlatform.linux`
和 `TargetPlatform.windows` 定义的 `PageTransitionsBuilder`
已从 `FadeUpwardsPageTransitionsBuilder`
改为 `ZoomPageTransitionsBuilder`。

## Migration guide

## 迁移指南

If you want to switch back to the previous page transition builder
(`FadeUpwardsPageTransitionsBuilder`), you should define builders
explicitly for the target platforms.

如果想切换回之前的页面过渡构建器
（`FadeUpwardsPageTransitionsBuilder`），
应为目标平台显式定义构建器。

Code before migration:

迁移前的代码：

```dart
MaterialApp(
  theme: ThemeData(colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple)),
)
```

Code after migration:

迁移后的代码：

```dart
MaterialApp(
  theme: ThemeData(
    pageTransitionsTheme: const PageTransitionsTheme(
      builders: <TargetPlatform, PageTransitionsBuilder>{
        TargetPlatform.android: FadeUpwardsPageTransitionsBuilder(), // Apply this to every platforms you need.
      },
    ),
  ),
)
```

If you want to apply the same page transition builder to all platforms:

如果想把同一种页面过渡构建器应用到所有平台：

```dart
MaterialApp(
  theme: ThemeData(
    pageTransitionsTheme: PageTransitionsTheme(
      builders: Map<TargetPlatform, PageTransitionsBuilder>.fromIterable(
        TargetPlatform.values,
        value: (dynamic _) => const FadeUpwardsPageTransitionsBuilder(),
      ),
    ),
  ),
)

```

### Tests migration

### 测试迁移

If you used to try to find widgets but failed with *Too many elements*
using the new transition, and saw errors similar to the following:

如果在使用新过渡后查找 widget 时失败，
并出现 **Too many elements** 之类的错误：

```plaintext
══╡ EXCEPTION CAUGHT BY FLUTTER TEST FRAMEWORK ╞════════════════════════════════════════════════════
The following StateError was thrown running a test:
Bad state: Too many elements

When the exception was thrown, this was the stack:
#0      Iterable.single (dart:core/iterable.dart:656:24)
#1      WidgetController.widget (package:flutter_test/src/controller.dart:69:30)
#2      main.<anonymous closure> (file:///path/to/your/test.dart:1:2)
```

You should migrate your tests by using the
`descendant` scope for `Finder`s with the specific widget type.
Below is the example of `DataTable`'s test:

你应通过为指定 widget 类型的 `Finder`
使用 `descendant` 范围来迁移测试。
下面是 `DataTable` 测试的示例：

Test before migration:

迁移前的测试：

```dart
final Finder finder = find.widgetWithIcon(Transform, Icons.arrow_upward);
```

Test after migration:

迁移后的测试：

```dart
final Finder finder = find.descendant(
  of: find.byType(DataTable),
  matching: find.widgetWithIcon(Transform, Icons.arrow_upward),
);
```

Widgets that typically need to migrate the finder scope are:
`Transform`, `FadeTransition`, `ScaleTransition`, and `ColoredBox`.

通常需要迁移 finder 范围的 widget 有：
`Transform`、`FadeTransition`、`ScaleTransition` 和 `ColoredBox`。

## Timeline

## 时间线

Landed in version: 2.13.0-1.0.pre<br>
合入版本：2.13.0-1.0.pre<br>
In stable release: 3.0.0

进入稳定版：3.0.0

## References

## 参考资料

API documentation:

API 文档：

* [`ZoomPageTransitionsBuilder`][]
* [`FadeUpwardsPageTransitionsBuilder`][]
* [`PageTransitionsTheme`][]

Relevant issues:

相关 issue：

* [Issue 43277][]

Relevant PR:

相关 PR：

* [PR 100812][]

[`ZoomPageTransitionsBuilder`]: {{site.api}}/flutter/material/ZoomPageTransitionsBuilder-class.html
[`FadeUpwardsPageTransitionsBuilder`]: {{site.api}}/flutter/material/FadeUpwardsPageTransitionsBuilder-class.html
[`PageTransitionsTheme`]: {{site.api}}/flutter/material/PageTransitionsTheme-class.html
[Issue 43277]: {{site.repo.flutter}}/issues/43277
[PR 100812]: {{site.repo.flutter}}/pull/100812
