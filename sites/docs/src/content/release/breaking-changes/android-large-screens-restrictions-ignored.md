---
# title: Large screen orientation and resizability restrictions ignored on Android 17
title: Android 17 在大屏上忽略方向与可调整大小限制
# description: >-
#   For apps targeting Android 17 or higher,
#   orientation, resizability, and aspect ratio restrictions no longer
#   apply on large displays with widths of 600dp or larger.
description: >-
  对于目标版本为 Android 17 或更高的应用，
  方向、可调整大小与宽高比限制
  不再适用于宽度达到 600dp 及以上的大屏。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

For apps targeting Android 17 or higher,
orientation, resizability, and aspect ratio restrictions no longer
apply on displays with width 600dp or greater.
This means that [`SystemChrome.setPreferredOrientations`][] is
ignored on these devices.

对于目标版本为 Android 17 或更高的应用，
方向、可调整大小与宽高比限制不再适用于
宽度达到 600dp 及以上的显示屏。
这意味着在这些设备上会忽略
[`SystemChrome.setPreferredOrientations`][]。

## Background

## 背景

Android is shifting toward a model where apps are expected to adapt
to various orientations, display sizes, and aspect ratios.
Restrictions like fixed orientation or limited resizability
hinder app adaptability.
For more details, see [Android 17 behavior changes][].

Android 正在转向一种新模式：应用需要适配
各种方向、显示尺寸和宽高比。
固定方向或限制可调整大小这类约束
会妨碍应用的适配能力。
详情请参阅 [Android 17 行为变更][Android 17 behavior changes]。

In Android 16, this behavior was introduced as a default
but allowed apps to temporarily opt out
using the `PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY` manifest property.
Android 17 removes this opt-out.

在 Android 16 中，该行为作为默认引入，
但应用仍可暂时退出，
方法是使用清单属性
`PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY`。
Android 17 移除了这一退出方式。

## Description of change

## 改动说明

If you rely on [`SystemChrome.setPreferredOrientations`][]
to lock your app to a specific orientation,
it is ignored on large screens (widths 600dp and larger)
if your app targets Android 17 or higher.
If your app supports Android 16
and you did not opt out of this behavior,
then it behaves the same on Android 17.

如果你依赖 [`SystemChrome.setPreferredOrientations`][]
把应用锁定为特定方向，
那么当应用目标版本为 Android 17 或更高时，
在大屏（宽度 600dp 及以上）上会忽略该调用。
如果你的应用支持 Android 16，
并且没有退出该行为，
那么它在 Android 17 上的表现相同。

If your app relies on locking orientation,
make your app adaptive to support different screen sizes and orientations.
See the guidance for how to do this for large screens
in [Adaptive and responsive UI][].

如果你的应用依赖锁定方向，
请把应用做成自适应，以支持不同的屏幕尺寸和方向。
大屏上的做法请参阅
[自适应与响应式界面][Adaptive and responsive UI]。

## References

## 参考资料

* [Android 17 behavior changes][]

  [Android 17 行为变更][Android 17 behavior changes]

* [Android 16 behavior changes][]

  [Android 16 行为变更][Android 16 behavior changes]

* [`SystemChrome.setPreferredOrientations`][]
* [Adaptive and responsive UI][]

  [自适应与响应式界面][Adaptive and responsive UI]

[Android 17 behavior changes]: https://developer.android.com/about/versions/17/changes/ff-restrictions-ignored
[Android 16 behavior changes]: https://developer.android.com/about/versions/16/behavior-changes-16#ignore-orientation
[`SystemChrome.setPreferredOrientations`]: {{site.api}}/flutter/services/SystemChrome/setPreferredOrientations.html
[Adaptive and responsive UI]: /ui/adaptive-responsive/large-screens
