---
# title: ImageFilter.blur default tile mode automatic selection.
title: ImageFilter.blur 的默认平铺模式改为自动选择
# description: >-
#   If a tile mode wasn't specified in the constructor, ImageFilter.blur will
#   select one based on the rendering context.
description: >-
  如果构造函数中没有指定平铺模式，ImageFilter.blur 会根据渲染上下文自动选择。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `ui.ImageFilter.blur`'s default tile mode is
now automatically selected by the backend.
Previously `TileMode.clamp` was used unless a different tile mode was specified.
Now, the default is `null` and specifies automatic selection unless
a specific tile mode is specified.

`ui.ImageFilter.blur` 的默认平铺模式现在由后端自动选择。
以前，除非另外指定平铺模式，否则会使用 `TileMode.clamp`。
现在默认值为 `null`，表示自动选择，除非你指定了具体的平铺模式。

## Background

## 背景

`ImageFilter.blur`'s _tile mode_ specifies what happens to
edge pixels for the applied filter.
There are four options:

`ImageFilter.blur` 的 **平铺模式** 决定滤镜作用到边缘像素时的行为。
一共有四个选项：

- `TileMode.clamp` (the previous default)

  `TileMode.clamp`（之前的默认值）

- `Tilemode.repeated`

  `Tilemode.repeated`

- `TileMode.mirror`

  `TileMode.mirror`

- `TileMode.decal`

  `TileMode.decal`

Previously, if the behavior wasn't specified,
`ImageFilter` defaulted to `clamp` mode.
This sometimes surprised developers as it didn't always match expectations.

以前，如果没有指定行为，`ImageFilter` 会默认使用 `clamp` 模式。
这有时会让开发者感到意外，因为它并不总是符合预期。

As of this change, the filter automatically selects the
following tile modes based on context:

此次改动之后，滤镜会根据上下文自动选择下列平铺模式：

* `decal` with save layers and when applied to individual shape draws
          (such as with `drawRect` and `drawPath`).

  在 save layer 中，以及对单个形状绘制
  （例如 `drawRect` 和 `drawPath`）应用时，使用 `decal`。

* `mirror` with backdrop filters.

  对背景滤镜使用 `mirror`。

* `clamp` for `drawImage`.

  对 `drawImage` 使用 `clamp`。

## Migration guide

## 迁移指南

Only blur image filters that don't specify an explicit tile mode are
impacted by this change.

只有没有显式指定平铺模式的模糊图像滤镜会受这次改动影响。

We believe that the new defaults are generally
better and would recommend removing any specified blur tile modes.

新的默认值通常更好，建议去掉已经指定的模糊平铺模式。

Code before migration:

迁移前的代码：

```dart
final filter = ui.ImageFilter.blur(sigmaX: 4, sigmaY: 4, tileMode: TileMode.decal);
```

Code after migration:

迁移后的代码：

```dart
final filter = ui.ImageFilter.blur(sigmaX: 4, sigmaY: 4);
```

## Timeline

## 时间线

Landed in version: 3.28.0-0.1.pre<br>
合入版本：3.28.0-0.1.pre<br>
In stable release: 3.29

进入稳定版：3.29

## References

## 参考资料

API documentation:

API 文档：

* [`ImageFilter`][]

  [`ImageFilter`][`ImageFilter`]

* [`TileMode`][]

  [`TileMode`][`TileMode`]

Relevant issues:

相关 issue：

* [Issue #154935][]

  [Issue #154935][Issue #154935]

* [Issue #110318][]

  [Issue #110318][Issue #110318]

* [Issue #157693][]

  [Issue #157693][Issue #157693]

Relevant PRs:

相关 PR：

* [Change default TileMode for blur ImageFilter objects to null][]

  [将模糊 ImageFilter 对象的默认 TileMode 改为 null][Change default TileMode for blur ImageFilter objects to null]

[`ImageFilter`]: {{site.api}}/flutter/dart-ui/ImageFilter-class.html
[`ImageFilter.blur`]: {{site.api}}/flutter/dart-ui/ImageFilter/ImageFilter.blur.html
[`TileMode`]: {{site.api}}/flutter/dart-ui/TileMode.html
[Issue #154935]: {{site.repo.flutter}}/issues/154935
[Issue #110318]: {{site.repo.flutter}}/issues/110318
[Issue #157693]: {{site.repo.flutter}}/issues/157693
[Change default TileMode for blur ImageFilter objects to null]: {{site.repo.engine}}/pull/55552
