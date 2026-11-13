---
# title: New CupertinoIcons has icon glyph changes
title: 新版 CupertinoIcons 的图标字形有所变化
# description: >
#   Once you update to cupertino_icons 1.0.0, some old glyphs are
#   automapped to the new glyphs. Consider double-checking visually.
description: >
  更新到 cupertino_icons 1.0.0 之后，部分旧字形会自动映射到新字形。
  建议目视复查。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The existing cupertino_icons [0.1.3 icons][]
are based on iOS 11 aesthetics with sharp angles and thin lines.

现有的 cupertino_icons [0.1.3 图标][0.1.3 icons]
基于 iOS 11 的视觉风格，角度尖锐、线条较细。

As Apple's iconography updates with new OS versions,
the `cupertino_icons` package is also refreshed.

随着 Apple 的图标体系随新系统版本更新，
`cupertino_icons` package 也做了刷新。

Generally, all previous glyphs referenced from the
[`CupertinoIcons`][] API are automatically mapped to
very similar looking icons in the new SF Symbols
style (featuring rounder, thicker lines).

一般来说，[`CupertinoIcons`][`CupertinoIcons`] API 引用的全部旧字形
都会自动映射到新 SF Symbols 风格中外观非常接近的图标
（线条更圆、更粗）。

Some icons that have no equivalents in the
new SF Symbols style are left as is.

在新 SF Symbols 风格中没有对应图标的，会保持原样。

Some icons that have less variation
(such as thickness, alternative looks, and so on)
are automapped and collapsed to the best matching
variation in the new SF Symbols style but should be
double checked to determine whether they preserve the
intended visual effect.

有些图标的变体较少（例如粗细、替代外观等），
会自动映射并合并为新 SF Symbols 风格中最匹配的变体。
这些图标应当复查，确认是否仍保留预期的视觉效果。

## Description of change

## 改动说明

The new `cupertino_icons 1.0.0` font is handcrafted
to best preserve the intent and aesthetic of the
symbology through the transition. All existing
`CupertinoIcons`' static `IconData` fields
(and thus all of the font `.ttf`'s codepoints)
continue to work and point to a reasonable new icon.

新的 `cupertino_icons 1.0.0` 字体经过手工调整，
以便在过渡中尽量保留符号的意图和美感。
现有 `CupertinoIcons` 的全部静态 `IconData` 字段
（因而也包括字体 `.ttf` 的全部码位）
都会继续可用，并指向一个合理的新图标。

The new cupertino_icons 1.0.0 package also has ~1,000
more icons to choose from.

新的 cupertino_icons 1.0.0 package 还多了约 1,000 个可选图标。

### Unchanged icons

### 未改动的图标

No SF Symbols styled alternatives exist
for the icons in the following list.
The previous cupertino_icons 0.1.3 icons
have been kept as is in 1.0.0.

下面列出的图标没有 SF Symbols 风格的替代。
cupertino_icons 0.1.3 中的这些图标在 1.0.0 中保持原样。

* bluetooth
* bus
* car
* car_detailed
* chevron_back
* chevron_forward
* lab_flask
* lab_flask_solid
* news
* news_solid
* train_style_one
* train_style_two

### Merged icons

### 已合并的图标

Icons within the same group are now the exact same
icon in 1.0.0. In other words, the distinctions
between those icon variations that existed in 0.1.3 is
lost and now renders the same SF Symbols
styled icon that represents the theme of the group.

同一组中的图标在 1.0.0 里现在是完全相同的图标。
也就是说，0.1.3 中这些变体之间的区别已经消失，
现在会渲染成代表该组主题的同一个 SF Symbols 风格图标。

This affects the following icon groups:

这会影响下面这些图标组：

* share, share_up
* battery_charging, battery_full, battery_75_percent
* shuffle, shuffle_medium, shuffle_thick
* delete, delete_simple
* refresh, refresh_thin, refresh_thick
* clear, clear_thick
* clear_circled_solid, clear_thick_circled
* gear, gear_alt, gear_big
* loop, loop_thick
* time_solid, clock_solid
* time, clock
* tag, tags
* tag_solid, tags_solid

This is mainly due to some artistic liberties taken
when creating the original `cupertino_icons` set that
no longer match the variations diversity of the more
formal SF Symbols icon set for some of the icons.

这主要是因为最初制作 `cupertino_icons` 图标集时做了一些艺术化处理，
对其中部分图标来说，这些处理已不再符合
更正式的 SF Symbols 图标集所具有的变体丰富度。

## Migration guide

## 迁移指南

After upgrading to 1.22,
if you also upgrade the `cupertino_icons`
pubspec dependency from 0.1.3 to 1.0.0,
for example, by changing:

升级到 1.22 之后，
如果你把 `cupertino_icons` 的 pubspec 依赖从 0.1.3 升级到 1.0.0，
例如改成下面这样：

```yaml
dependencies:
  ... // Other dependencies
  cupertino_icons: ^0.1.0
```

to:

改为：

```yaml
dependencies:
  ... // Other dependencies
  cupertino_icons: ^1.0.0
```

All your `CupertinoIcons` should automatically
update to the new aesthetic (except for the
[unchanged icons](#unchanged-icons) listed above).

你的全部 `CupertinoIcons` 都会自动更新为新的视觉风格
（上面列出的 [未改动的图标](#unchanged-icons) 除外）。

At this point, you can also explore [`CupertinoIcons`][]
for new icons to use in your application.

此时你也可以浏览 [`CupertinoIcons`][`CupertinoIcons`]，
挑选新图标用在应用中。

You're encouraged to verify your application after
migrating to ensure that the automatically mapped
new icons are suitable for your desired aesthetics.

建议在迁移之后检查应用，
确认自动映射的新图标是否符合你想要的视觉效果。

## Timeline

## 时间线

Landed in: 1.22.0-10.0.pre.65<br>
合入版本：1.22.0-10.0.pre.65<br>
In stable release: 1.22

进入稳定版：1.22

## References

## 参考资料

[0.1.3 icons]: https://raw.githubusercontent.com/flutter/cupertino_icons/master/map.png
[`CupertinoIcons`]: {{site.api}}/flutter/cupertino/CupertinoIcons-class.html
