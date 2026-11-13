---
# title: Nullable CupertinoThemeData.brightness
title: 可空的 CupertinoThemeData.brightness
# description: >
#   CupertinoThemeData.brightness is now nullable, and it
#   returns the value specified by the user (defaults to null) as is.
description: >
  CupertinoThemeData.brightness 现在可空，
  并原样返回用户指定的值（默认为 null）。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

[`CupertinoThemeData.brightness`] is now nullable.

[`CupertinoThemeData.brightness`] 现在可空。

## Context

## 上下文

[`CupertinoThemeData.brightness`][] is now used to
override `MediaQuery.platformBrightness` for Cupertino widgets.
Before this change, the [`CupertinoThemeData.brightness`][]
getter returned `Brightness.light` when it was set to null.

[`CupertinoThemeData.brightness`][] 现在用于
覆盖 Cupertino widget 的 `MediaQuery.platformBrightness`。
在此改动之前，当 [`CupertinoThemeData.brightness`][]
设为 null 时，getter 会返回 `Brightness.light`。

## Description of change

## 变更说明

Previously [`CupertinoThemeData.brightness`][]
was implemented as a getter:

此前 [`CupertinoThemeData.brightness`][]
实现为一个 getter：

```dart
Brightness get brightness => _brightness ?? Brightness.light;
final Brightness _brightness;
```

It is now a stored property:

现在它是一个存储属性：

```dart
final Brightness brightness;
```

## Migration guide

## 迁移指南

Generally [`CupertinoThemeData.brightness`][]
is rarely useful outside of the Flutter framework.
To retrieve the brightness for Cupertino widgets,
now use [`CupertinoTheme.brightnessOf`][] instead.

通常，[`CupertinoThemeData.brightness`][]
在 Flutter 框架之外很少用到。
要获取 Cupertino widget 的亮度，
现在请改用 [`CupertinoTheme.brightnessOf`][]。

With this change, it is now possible to override
`CupertinoThemeData.brightness` in a `CupertinoThemeData`
subclass to change the brightness override. For example:

有了这次改动，你可以在 `CupertinoThemeData`
子类中覆盖 `CupertinoThemeData.brightness`，
从而改变亮度覆盖。例如：

```dart
class AlwaysDarkCupertinoThemeData extends CupertinoThemeData {
  Brightness brightness => Brightness.dark;
}
```

When a `CupertinoTheme` uses the above `CupertinoThemeData`,
dark mode is enabled for all its Cupertino descendants
that are affected by this `CupertinoTheme`.

当 `CupertinoTheme` 使用上述 `CupertinoThemeData` 时，
受该 `CupertinoTheme` 影响的所有 Cupertino 后代都会启用深色模式。

## Timeline

## 时间线

Landed in version: 1.16.3<br>
In stable release: 1.17

合入版本：1.16.3<br>
进入稳定版：1.17

## References

## 参考资料

Design doc:

设计文档：

* [Make `CupertinoThemeData.brightness nullable`][]

  [使 `CupertinoThemeData.brightness`
  可空][Make `CupertinoThemeData.brightness nullable`]

API documentation:

API 文档：

* [`CupertinoThemeData.brightness`][]

Relevant issue:

相关 issue：

* [Issue 47255][]

Relevant PR:

相关 PR：

* [Let material `ThemeData` dictate brightness if `cupertinoOverrideTheme.brightness` is null][]

  [当 `cupertinoOverrideTheme.brightness` 为 null 时，
  由 Material `ThemeData` 决定亮度][Let material `ThemeData`
  dictate brightness if `cupertinoOverrideTheme.brightness` is null]


[`CupertinoTheme.brightnessOf`]: {{site.api}}/flutter/cupertino/CupertinoTheme/brightnessOf.html
[`CupertinoThemeData.brightness`]: {{site.api}}/flutter/cupertino/NoDefaultCupertinoThemeData/brightness.html
[Issue 47255]: {{site.repo.flutter}}/issues/47255
[Let material `ThemeData` dictate brightness if `cupertinoOverrideTheme.brightness` is null]: {{site.repo.flutter}}/pull/47249
[Make `CupertinoThemeData.brightness nullable`]: /go/nullable-cupertinothemedata-brightness
