---
# title: Deprecate MemoryAllocations in favor of FlutterMemoryAllocations
title: 弃用 MemoryAllocations，改用 FlutterMemoryAllocations
# description: >-
#   MemoryAllocations is renamed to FlutterMemoryAllocations.
description: >-
  MemoryAllocations 已重命名为 FlutterMemoryAllocations。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Disposables in pure Dart projects can't use `MemoryAllocations` in Flutter.
So, to be leak-trackable they need a Dart-only class.
`MemoryAllocations` in Flutter is renamed to make the name
available to a non-Flutter, Dart project.

纯 Dart 项目中的可释放对象无法使用 Flutter 里的 `MemoryAllocations`。
要追踪它们的泄漏，需要一个纯 Dart 类。Flutter
中的 `MemoryAllocations` 因此被重命名，
把这个名字留给非 Flutter 的 Dart 项目使用。

## Migration guide

## 迁移指南

Before:

之前：

```dart
if (kFlutterMemoryAllocationsEnabled) {
  MemoryAllocations.instance.dispatchObjectCreated(
    library: 'package:flutter/gestures.dart',
    className: '$MultiDragPointerState',
    object: this,
  );
}
```

After:

之后：

```dart
if (kFlutterMemoryAllocationsEnabled) {
  FlutterMemoryAllocations.instance.dispatchObjectCreated(
    library: 'package:flutter/gestures.dart',
    className: '$MultiDragPointerState',
    object: this,
  );
}
```

## Timeline

## 时间线

Landed in version: 3.19.0-2.0.pre<br>
Landed in stable: 3.22.0

合入版本：3.19.0-2.0.pre<br>
合入稳定版：3.22.0

## References

## 参考资料

Relevant issues:

相关 issue：

* [Rename MemoryAllocations to FlutterMemoryAllocations (Issue 140622)][]

  [将 MemoryAllocations 重命名为
  FlutterMemoryAllocations（Issue 140622）][Rename MemoryAllocations to
  FlutterMemoryAllocations (Issue 140622)]

[Rename MemoryAllocations to FlutterMemoryAllocations (Issue 140622)]: {{site.repo.flutter}}/issues/140622
