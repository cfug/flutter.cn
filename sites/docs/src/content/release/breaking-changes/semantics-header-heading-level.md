---
# title: Update semantics header and headingLevel behavior on iOS and Android
title: 更新 iOS 与 Android 上 semantics header 和 headingLevel 的行为
# description: >-
#   The `header` semantics property is now a no-op on iOS and Android.
#   Accessibility heading behaviors are now controlled with `headingLevel`.
description: >-
  `header` 语义属性在 iOS 和 Android 上现在不起作用。
  无障碍标题行为改由 `headingLevel` 控制。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `header` semantics property now behaves as a no-op on iOS and Android.
To declare a section heading for accessibility purposes on these platforms,
use the `headingLevel` property with a value greater than `0`.

`header` 语义属性在 iOS 和 Android 上现在不起作用。
要在这些平台上为无障碍声明章节标题，
请使用大于 `0` 的 `headingLevel` 属性。

## Context

## 上下文

Historically, Flutter used the boolean `header` semantics property
to denote headings on platform implementations:

过去，Flutter 用布尔语义属性 `header` 在平台实现中表示标题：

* On Android, a `header` value of `true` mapped to `View.setHeading(true)`.

  在 Android 上，`header` 为 `true` 时会映射到 `View.setHeading(true)`。

* On iOS, a `header` value of `true` mapped to the
  `UIAccessibilityTraitHeader` accessibility trait.

  在 iOS 上，`header` 为 `true` 时会映射到无障碍特征
  `UIAccessibilityTraitHeader`。

However, `setHeading` and `UIAccessibilityTraitHeader`
represent headings (equivalent to section headers/headings),
which are best represented by a heading level.
In contrast, "header" on these platforms often represents a banner
or an app bar (such as `SliverAppBar` or `AppBar`),
creating confusion and mismatch
between platform APIs and Flutter properties.

不过，`setHeading` 和 `UIAccessibilityTraitHeader`
表示的是标题（相当于章节标题），用标题级别来表达更合适。
与此相对，这些平台上的「header」通常表示横幅或应用栏
（例如 `SliverAppBar` 或 `AppBar`）。
这造成了平台 API 与 Flutter 属性之间的混淆和错位。

With this change:

这次改动之后：

* The `header` semantics property behaves as a no-op on iOS and Android.
  It remains available in the API and can still be
  used in the future if similar APIs are provided.

  `header` 语义属性在 iOS 和 Android 上不起作用。
  它仍然保留在 API 中，如果将来提供了类似 API，仍可继续使用。

* The `headingLevel` property is updated so that setting it
  to a value greater than `0` maps directly to
  `View.setHeading(true)` on Android
  and `UIAccessibilityTraitHeader` on iOS.
  On iOS 13 or later, it also maps to `accessibilityHeadingLevel`.

  `headingLevel` 属性已更新：把它设为大于 `0` 的值时，
  在 Android 上会直接映射到 `View.setHeading(true)`，
  在 iOS 上会映射到 `UIAccessibilityTraitHeader`。
  在 iOS 13 或更高版本上，它还会映射到 `accessibilityHeadingLevel`。

## Migration guide

## 迁移指南

If your code previously used `Semantics(header: true, ...)` or
`SemanticsProperties(header: true, ...)` to declare headings,
migrate your code to use `headingLevel: 1`
(or another integer greater than `0`).

如果代码以前用 `Semantics(header: true, ...)` 或
`SemanticsProperties(header: true, ...)` 来声明标题，
请改为使用 `headingLevel: 1`（或其他大于 `0` 的整数）。

Note that while setting `headingLevel` to any value greater than `0`
declares a heading on Android and iOS, other platforms (such as the web)
treat the specific heading level number differently.
For example, on the web, values `1` through `6` map to the
corresponding `<h1>` through `<h6>` HTML elements.

请注意，把 `headingLevel` 设为任何大于 `0` 的值，
在 Android 和 iOS 上都会声明一个标题，
但其他平台（例如 Web）会区别对待具体的标题级别数字。
例如在 Web 上，`1` 到 `6` 会映射到对应的 `<h1>` 到 `<h6>` HTML 元素。

Code before migration:

迁移之前的代码：

```dart highlightLines=2
Semantics(
  header: true,
  child: Text('Section Title'),
)
```

Code after migration:

迁移之后的代码：

```dart highlightLines=2
Semantics(
  headingLevel: 1,
  child: Text('Section Title'),
)
```

Similarly, if you used `SemanticsProperties`:

同样，如果你使用了 `SemanticsProperties`：

Code before migration:

迁移之前的代码：

```dart highlightLines=2
SemanticsProperties(
  header: true,
)
```

Code after migration:

迁移之后的代码：

```dart highlightLines=2
SemanticsProperties(
  headingLevel: 1,
)
```

## Timeline

## 时间线

Landed in version: 3.45.0-0.1.pre<br>
合入版本：3.45.0-0.1.pre<br>
In stable release: 3.47

进入稳定版：3.47

## References

## 参考资料

API documentation:

API 文档：

* [`Semantics`][]
* [`SemanticsProperties`][]
* [`SemanticsConfiguration`][]

Relevant issues:

相关 issue：

* [Issue 175416][]

  [问题 175416][Issue 175416]

Relevant PRs:

相关 PR：

* [PR 186916][]
* [PR 175416][]

[`Semantics`]: {{site.api}}/flutter/widgets/Semantics-class.html
[`SemanticsProperties`]: {{site.api}}/flutter/semantics/SemanticsProperties-class.html
[`SemanticsConfiguration`]: {{site.api}}/flutter/semantics/SemanticsConfiguration-class.html
[Issue 175416]: {{site.repo.flutter}}/issues/175416
[PR 186916]: {{site.repo.flutter}}/pull/186916
[PR 175416]: {{site.repo.flutter}}/pull/175416
