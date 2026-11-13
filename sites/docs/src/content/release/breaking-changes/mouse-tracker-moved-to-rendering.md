---
# title: MouseTracker moved to rendering
title: MouseTracker 移至渲染
# description: MouseTracker and related symbols moved to the rendering package.
description: MouseTracker 及相关符号已移至 rendering package。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

[`MouseTracker`][] and related symbols are moved from the
`gestures` package, resulting in error messages such as
undefined classes or methods. Import them from `rendering`
package instead.

[`MouseTracker`][] 及相关符号已从 `gestures` package 移出，
因此会出现类或方法未定义之类的错误。
请改为从 `rendering` package 导入它们。

## Context

## 背景

Prior to this change [`MouseTracker`][] was part of the
`gestures` package. This brought troubles when we found out
that code related to [`MouseTracker`][] often wanted to
import from the `rendering` package.

在此次变更之前，[`MouseTracker`][] 属于 `gestures` package。
与 [`MouseTracker`][] 相关的代码经常需要从 `rendering` package 导入，
因此带来了麻烦。

Since [`MouseTracker`][] turned out to be more connected to
`rendering` than `gestures`, we have moved it and its
related code to `rendering`.

后来发现 [`MouseTracker`][] 与 `rendering` 的关系比与 `gestures` 更密切，
因此已将其及相关代码移至 `rendering`。

## Description of change

## 变更说明

The file `mouse_tracking.dart` has been moved from the
`gestures` package to `rendering`. All symbols in the said
file have been moved without keeping backward compatibility.

文件 `mouse_tracking.dart` 已从 `gestures` package 移至 `rendering`。
该文件中的所有符号都已迁移，且不保留向后兼容。

## Migration guide

## 迁移指南

If you see error of "Undefined class" or "Undefined name" of
the following symbols:

如果你看到以下符号出现「Undefined class」或「Undefined name」错误：

* [`MouseDetectorAnnotationFinder`][]
* [`MouseTracker`][]
* [`MouseTrackerAnnotation`][]
* [`PointerEnterEventListener`][]
* [`PointerExitEventListener`][]
* [`PointerHoverEventListener`][]

You should add the following import:

请添加以下导入：

```dart
import 'package:flutter/rendering.dart';
```

## Timeline

## 时间线

Landed in version: 1.16.3<br>
合入版本：1.16.3<br>
In stable release: 1.17

进入稳定版：1.17

## References

## 参考资料

API documentation:

API 文档：

* [`MouseDetectorAnnotationFinder`][]
* [`MouseTracker`][]
* [`MouseTrackerAnnotation`][]
* [`PointerEnterEventListener`][]
* [`PointerExitEventListener`][]
* [`PointerHoverEventListener`][]

Relevant issues:

相关 issue：

* [Transform mouse events to the local coordinate system][]

  [将鼠标事件变换到局部坐标系][Transform mouse events to the local coordinate system]

* [Move annotations to a separate tree][]

  [将标注移到单独的树][Move annotations to a separate tree]

Relevant PR:

相关 PR：

* [Move mouse_tracking.dart to rendering][]

  [将 mouse_tracking.dart 移至 rendering][Move mouse_tracking.dart to rendering]

[Move annotations to a separate tree]: {{site.repo.flutter}}/issues/49568
[Move mouse_tracking.dart to rendering]: {{site.repo.flutter}}/pull/52781
[Transform mouse events to the local coordinate system]: {{site.repo.flutter}}/issues/33675
[`MouseDetectorAnnotationFinder`]: {{site.api}}/flutter/gestures/MouseDetectorAnnotationFinder.html
[`MouseTracker`]: {{site.api}}/flutter/gestures/MouseTracker-class.html
[`MouseTrackerAnnotation`]: {{site.api}}/flutter/gestures/MouseTrackerAnnotation-class.html
[`PointerEnterEventListener`]: {{site.api}}/flutter/gestures/PointerEnterEventListener.html
[`PointerExitEventListener`]: {{site.api}}/flutter/gestures/PointerExitEventListener.html
[`PointerHoverEventListener`]: {{site.api}}/flutter/gestures/PointerHoverEventListener.html
