---
# title: Deprecated `cacheExtent` and `cacheExtentStyle`
title: 已弃用 `cacheExtent` 和 `cacheExtentStyle`
# description: >-
#   The `cacheExtent` and `cacheExtentStyle` properties are deprecated.
#   They are replaced by `scrollCacheExtent` with a `ScrollCacheExtent` object.
description: >-
  `cacheExtent` 和 `cacheExtentStyle` 属性已弃用。
  它们由带 `ScrollCacheExtent` 对象的 `scrollCacheExtent` 取代。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Flutter 3.44 deprecates `cacheExtent` and `cacheExtentStyle`
in scrolling-related widgets, such as
`ListView`, `GridView`, `CustomScrollView`, and `Viewport`,
and their corresponding render objects, such as `RenderViewport`.
The new `scrollCacheExtent` property encapsulates
both the value and the caching strategy (pixels or viewport).

Flutter 3.44 弃用了滚动相关 widget 中的
`cacheExtent` 和 `cacheExtentStyle`，
例如 `ListView`、`GridView`、`CustomScrollView` 和 `Viewport`，
以及对应的 render object，例如 `RenderViewport`。
新的 `scrollCacheExtent` 属性同时封装了数值和缓存策略（像素或视口）。

## Background

## 背景

Previously, `cacheExtent` was a `double` and
`cacheExtentStyle` determined how that `double` was interpreted
(either as pixels or as a fraction of the viewport).
This split made the setting harder to understand.

此前，`cacheExtent` 是一个 `double`，
`cacheExtentStyle` 决定如何解释该 `double`
（作为像素，或作为视口的比例）。
这种拆分让该设置更难理解。

The new `scrollCacheExtent` property uses a `ScrollCacheExtent` object that
explicitly encapsulates both the value and
the caching strategy (pixels or viewport),
which provides type safety and clearer intent.

新的 `scrollCacheExtent` 属性使用 `ScrollCacheExtent` 对象，
显式封装数值和缓存策略（像素或视口），
从而提供类型安全，也让意图更明确。

## Migration guide

## 迁移指南

### Widget layer

### Widget 层

#### `cacheExtent` (pixels)

#### `cacheExtent`（像素）

If your code uses `cacheExtent`,
which defaults to pixels,
use `scrollCacheExtent` with `ScrollCacheExtent.pixels`.

如果代码使用 `cacheExtent`（默认单位是像素），
请改用带 `ScrollCacheExtent.pixels` 的 `scrollCacheExtent`。

**Before:**

**之前：**

```dart
ListView(
  cacheExtent: 500.0,
  children: // ...
)
```

**After:**

**之后：**

```dart
ListView(
  scrollCacheExtent: const ScrollCacheExtent.pixels(500.0),
  children: // ...
)
```

#### `cacheExtentStyle` (viewport)

#### `cacheExtentStyle`（视口）

If your code uses `cacheExtent` with `CacheExtentStyle.viewport`,
which is common in `Viewport`,
use `scrollCacheExtent` with `ScrollCacheExtent.viewport`.

如果代码将 `cacheExtent` 与 `CacheExtentStyle.viewport` 一起使用
（这在 `Viewport` 中很常见），
请改用带 `ScrollCacheExtent.viewport` 的 `scrollCacheExtent`。

**Before:**

**之前：**

```dart
Viewport(
  cacheExtent: 0.5,
  cacheExtentStyle: CacheExtentStyle.viewport,
  slivers: // ...
)
```

**After:**

**之后：**

```dart
Viewport(
  scrollCacheExtent: const ScrollCacheExtent.viewport(0.5),
  slivers: // ...
)
```

### Render object layer

### Render object 层

If your code manually sets properties on
`RenderViewport` or a similar render object,
use `scrollCacheExtent`.

如果代码手动设置 `RenderViewport` 或类似 render object 的属性，
请改用 `scrollCacheExtent`。

**Before:**

**之前：**

```dart
renderViewport.cacheExtent = 500.0;
renderViewport.cacheExtentStyle = CacheExtentStyle.pixel;
```

**After:**

**之后：**

```dart
renderViewport.scrollCacheExtent = const ScrollCacheExtent.pixels(500.0);
```

## Timeline

## 时间线

Landed in version: 3.41.0-0.0.pre<br>
合入版本：3.41.0-0.0.pre<br>
In stable release: 3.44

进入稳定版：3.44

## References

## 参考资料

API documentation:

API 文档：

* [`ScrollCacheExtent`][]
* [`ScrollView.scrollCacheExtent`][]
* [`RenderViewportBase.scrollCacheExtent`][]

Relevant PRs:

相关 PR：

* [Introduce ScrollCacheExtent][pr-181092]

  [引入 ScrollCacheExtent][pr-181092]

[`ScrollCacheExtent`]: {{site.api}}/flutter/rendering/ScrollCacheExtent-class.html
[`ScrollView.scrollCacheExtent`]: {{site.api}}/flutter/widgets/ScrollView/scrollCacheExtent.html
[`RenderViewportBase.scrollCacheExtent`]: {{site.api}}/flutter/rendering/RenderViewportBase/scrollCacheExtent.html

[pr-181092]: {{site.repo.flutter}}/pull/181092
