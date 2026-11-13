---
# title: Migration guide for wide gamut CupertinoDynamicColor
title: 广色域 CupertinoDynamicColor 迁移指南
# description: >-
#   Addressing previously missed deprecations in CupertinoDynamicColor to
#   align with wide gamut Color API.
description: >-
  补上此前遗漏的 CupertinoDynamicColor 弃用，
  以与广色域 Color API 对齐。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Certain properties and methods in [`CupertinoDynamicColor`][] were deprecated
to align with the [`Color`][] class due to [wide gamut color spaces][] support
added in [Flutter 3.27][Migration guide for wide gamut Color].

由于 [Flutter 3.27][Migration guide for wide gamut Color]
增加了 [广色域色彩空间][wide gamut color spaces] 支持，
[`CupertinoDynamicColor`][`CupertinoDynamicColor`] 中的部分属性和方法已弃用，
以与 [`Color`][`Color`] 类对齐。

## Context

## 上下文

The `Color` class was updated to support wide gamut color spaces,
but some corresponding deprecations were not initially applied to
`CupertinoDynamicColor` due to its implementation rather than
due to the extension of `Color`.

`Color` 类已更新以支持广色域色彩空间，
但部分对应的弃用起初没有应用到 `CupertinoDynamicColor`，
原因在于它的实现方式，而不是 `Color` 的扩展。

## Description of change

## 改动说明

1.  The [`CupertinoDynamicColor.red`][] field is deprecated in
    favor of [`CupertinoDynamicColor.r`].

    [`CupertinoDynamicColor.red`][`CupertinoDynamicColor.red`] 字段已弃用，
    请改用 [`CupertinoDynamicColor.r`][`CupertinoDynamicColor.r`]。

1.  The [`CupertinoDynamicColor.green`][] is deprecated in
    favor of [`CupertinoDynamicColor.g`].

    [`CupertinoDynamicColor.green`][`CupertinoDynamicColor.green`] 已弃用，
    请改用 [`CupertinoDynamicColor.g`][`CupertinoDynamicColor.g`]。

1.  The [`CupertinoDynamicColor.blue`][] is deprecated in
    favor of [`CupertinoDynamicColor.b`].

    [`CupertinoDynamicColor.blue`][`CupertinoDynamicColor.blue`] 已弃用，
    请改用 [`CupertinoDynamicColor.b`][`CupertinoDynamicColor.b`]。

1.  The [`CupertinoDynamicColor.opacity`][] is deprecated in
    favor of [`CupertinoDynamicColor.a`].

    [`CupertinoDynamicColor.opacity`][`CupertinoDynamicColor.opacity`] 已弃用，
    请改用 [`CupertinoDynamicColor.a`][`CupertinoDynamicColor.a`]。

1.  The [`CupertinoDynamicColor.withOpacity()`][] is deprecated in
    favor of [`CupertinoDynamicColor.withValues()`].

    [`CupertinoDynamicColor.withOpacity()`][`CupertinoDynamicColor.withOpacity()`]
    已弃用，
    请改用
    [`CupertinoDynamicColor.withValues()`][`CupertinoDynamicColor.withValues()`]。


## Migration guide

## 迁移指南

### Access color components

### 访问颜色分量

If your app accesses a single color component, consider
taking advantage of the floating-point components.
In the short term, you can scale the components themselves.

如果应用访问单个颜色分量，
请考虑使用浮点分量。
短期内，你也可以自行缩放这些分量。

```dart
int _floatToInt8(double x) {
  return (x * 255.0).round().clamp(0, 255);
}

const CupertinoDynamicColor color = CupertinoColors.systemBlue;
final intRed = _floatToInt8(color.r);
final intGreen = _floatToInt8(color.g);
final intBlue = _floatToInt8(color.b);
```

### Opacity

### 不透明度

Before Flutter 3.27, `Color` had the concept of "opacity", which
showed up in the methods `opacity` and `withOpacity()`.
Since Flutter 3.27, the alpha channel has been stored as a floating-point value.
Using `.a` and `.withValues()` will give the full expression of
a floating-point value and won't be quantized (restricted to a limited range).
That means "alpha" expresses the intent of "opacity" more correctly.

在 Flutter 3.27 之前，`Color` 有「不透明度」这一概念，
体现在 `opacity` 和 `withOpacity()` 方法中。
从 Flutter 3.27 起，alpha 通道以浮点值存储。
使用 `.a` 和 `.withValues()` 可以完整表达浮点值，
并且不会被量化（限制在有限范围内）。
这意味着「alpha」更准确地表达了「不透明度」的意图。

#### Migrate `opacity`

#### 迁移 `opacity`

```dart
// Before: Access the alpha channel as a (converted) floating-point value.
final x = color.opacity;

// After: Access the alpha channel directly.
final x = color.a;
```

#### Migrate `withOpacity`

#### 迁移 `withOpacity`

```dart
// Before: Create a new color with the specified opacity.
final x = color.withOpacity(0.5);

// After: Create a new color with the specified alpha channel value,
// accounting for the current or specified color space.
final x = color.withValues(alpha: 0.5);
```

## Timeline

## 时间线

Landed in version: 3.36.0-0.1.pre<br>
合入版本：3.36.0-0.1.pre<br>
Stable release: 3.38

进入稳定版：3.38

## References

## 参考资料

Relevant guides:

相关指南：

* [Migration guide for wide gamut Color][]

  [广色域 Color 迁移指南][Migration guide for wide gamut Color]

Relevant issues:

相关 issue：

* [Implement wide gamut color support in the Framework][]

  [在框架中实现广色域色彩支持][Implement wide gamut color support in the Framework]

* [CupertinoDynamicColor is missing deprecation notices][]

  [CupertinoDynamicColor
  缺少弃用提示][CupertinoDynamicColor is missing deprecation notices]

Relevant PRs:

相关 PR：

* [Add missing deprecations to CupertinoDynamicColor][]

  [为 CupertinoDynamicColor
  补上缺失的弃用][Add missing deprecations to CupertinoDynamicColor]

[`Color`]: {{site.api}}/flutter/dart-ui/Color-class.html
[`CupertinoDynamicColor`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor-class.html
[wide gamut color spaces]: https://en.wikipedia.org/wiki/RGB_color_spaces
[`CupertinoDynamicColor.red`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/red.html
[`CupertinoDynamicColor.r`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/r.html
[`CupertinoDynamicColor.green`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/green.html
[`CupertinoDynamicColor.g`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/g.html
[`CupertinoDynamicColor.blue`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/blue.html
[`CupertinoDynamicColor.b`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/b.html
[`CupertinoDynamicColor.opacity`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/opacity.html
[`CupertinoDynamicColor.a`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/a.html
[`CupertinoDynamicColor.withOpacity()`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/withOpacity.html
[`CupertinoDynamicColor.withValues()`]: {{site.api}}/flutter/cupertino/CupertinoDynamicColor/withValues.html
[Migration guide for wide gamut Color]: /release/breaking-changes/wide-gamut-framework
[Implement wide gamut color support in the Framework]: {{site.repo.flutter}}/issues/127855
[CupertinoDynamicColor is missing deprecation notices]: {{site.repo.flutter}}/issues/171059
[Add missing deprecations to CupertinoDynamicColor]: {{site.repo.flutter}}/pull/171160
