---
title: Nullable CupertinoThemeData.brightness
title: CupertinoThemeData.brightness 现可为空
description: CupertinoThemeData.brightness is now nullable, and it returns the value specified by the user (defaults to null) as is.
description: CupertinoThemeData.brightness 现可为空，并按原样返回用户指定的值（默认为 null）。
---

## Summary

## 概要

[`CupertinoThemeData.brightness`][] is now nullable.

[`CupertinoThemeData.brightness`][] 现可为空。

## Context

## 背景

[`CupertinoThemeData.brightness`][] is now used to
override `MediaQuery.platformBrightness` for Cupertino widgets.
Before this change, the [`CupertinoThemeData.brightness`][]
getter returned `Brightness.light` when it was set to null.

[`CupertinoThemeData.brightness`][] 现被用于覆盖 Cupertino widgets 的 `MediaQuery.platformBrightness`。
在此之前，
[`CupertinoThemeData.brightness`][] 为空时返回 `Brightness.light`。

## Description of change

## 更改描述

Previously [`CupertinoThemeData.brightness`][]
was implemented as a getter:

此前 [`CupertinoThemeData.brightness`][] 由 getter 实现:

```dart
Brightness get brightness => _brightness ?? Brightness.light;
final Brightness _brightness;
```

It is now a stored property:

现在它是一个存储类型：

```dart
final Brightness brightness;
```

## Migration guide

## 迁移指南

Generally [`CupertinoThemeData.brightness`][]
is rarely useful outside of the Flutter framework.
To retrieve the brightness for Cupertino widgets,
now use [`CupertinoTheme.brightnessOf`][] instead.

一般来说 [`CupertinoThemeData.brightness`][] 很少会在 Flutter 框架层外用到。
现在如果要检索 Cupertino widgets 的亮度，
使用 [`CupertinoTheme.brightnessOf`][] 代替它即可。

With this change, it is now possible to override
`CupertinoThemeData.brightness` in a `CupertinoThemeData`
subclass to change the brightness override. For example:

在此更改后，现在可以在 `CupertinoThemeData` 子类中覆盖
`CupertinoThemeData.brightness` 值来改变亮度，例如：

```dart
class AwaysDarkCupertinoThemeData extends CupertinoThemeData {
  Brightness brightness => Brightness.dark;
}
```

When a `CupertinoTheme` uses the above `CupertinoThemeData`,
dark mode is enabled for all its Cupertino descendants
that are affected by this `CupertinoTheme`.

当有一个 `CupertinoTheme` 使用上述 `CupertinoThemeData` 时，
所有受此 `CupertinoTheme` 影响的 Cupertino 类组件都将启用深色模式。

## Timeline

## 时间表

Landed in version: 1.16.3<br>
In stable release: 1.17

实现版本：1.16.3<br>
稳定版本：1.17

## References

## 参考资料

Design doc:

设计文档：

* [Make `CupertinoThemeData.brightness nullable`][]

  [允许 `CupertinoThemeData.brightness` 为空值][Make `CupertinoThemeData.brightness nullable`]

API documentation:

API 文档：

* [`CupertinoThemeData.brightness`][]

Relevant issue:

相关 issue：

* [Issue 47255][]

Relevant PR:

相关 PR：

* [Let material `ThemeData` dictate brightness if `cupertinoOverrideTheme.brightness` is null][]

  [如果 `cupertinoOverrideTheme.brightness` 为空，则由 `ThemeData` 决定其亮度][Let material `ThemeData` dictate brightness if `cupertinoOverrideTheme.brightness` is null]


[`CupertinoTheme.brightnessOf`]: {{site.api}}/flutter/cupertino/CupertinoTheme/brightnessOf.html
[`CupertinoThemeData.brightness`]: {{site.api}}/flutter/cupertino/NoDefaultCupertinoThemeData/brightness.html
[Issue 47255]: {{site.repo.flutter}}/issues/47255
[Let material `ThemeData` dictate brightness if `cupertinoOverrideTheme.brightness` is null]: {{site.repo.flutter}}/pull/47249
[Make `CupertinoThemeData.brightness nullable`]: {{site.url}}/go/nullable-cupertinothemedata-brightness
