---
# title: Removed semantics elevation and thickness
title: 移除语义属性 elevation 与 thickness
# description: >-
#   Removed elevation and thickness from semantics properties.
description: >-
  从语义属性中移除了 elevation 与 thickness。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Both elevation and thickness semantics properties and their related APIs were removed.

elevation 与 thickness 这两项语义属性及其相关 API 均已移除。

## Context

## 上下文

Both elevation and thickness semantics properties were created for Fuchsia's 3D rendering.
They were never implemented and thus remained unused. There was also no other known usage
for these properties. These properties added unnecessary code complexity and have been removed.

elevation 与 thickness 语义属性是为 Fuchsia 的 3D 渲染而设的。
它们从未实现，因此一直未被使用，也没有其他已知用途。
这些属性增加了不必要的代码复杂度，现已移除。

## Description of change

## 改动说明

The following properties are removed `SemanticsConfiguration.elevation`,
`SemanticsConfiguration.thickness`,
`SemanticsNode.thickness`, `SemanticsNode.elevation`, and `SemanticsNode.elevationAdjustment`.

下列属性已移除：`SemanticsConfiguration.elevation`、
`SemanticsConfiguration.thickness`、
`SemanticsNode.thickness`、`SemanticsNode.elevation`
以及 `SemanticsNode.elevationAdjustment`。

## Migration guide

## 迁移指南

If you previously assigned these properties, remove the assignments.

如果你之前为这些属性赋值，请删除这些赋值。

Code before migration:

迁移前的代码：

```dart
void describeSemanticsConfiguration(SemanticsConfiguration config) {
  config.label = 'my label';
  config.elevation = 1;
  config.thickness = 1;
}
```

Code after migration:

迁移后的代码：

```dart
void describeSemanticsConfiguration(SemanticsConfiguration config) {
  config.label = 'my label';
}
```

## Timeline

## 时间线

Landed in version: 3.34.0-0.0.pre<br>
合入版本：3.34.0-0.0.pre<br>
In stable release: 3.35

进入稳定版：3.35

## References

## 参考资料

API documentation:

API 文档：

* [`SemanticsConfiguration`][]
* [`SemanticsNode`][]

Relevant issue:

相关 issue：

* [Issue 166092][]

Relevant PR:

相关 PR：

* [PR 169382][]

[`SemanticsConfiguration`]: {{site.api}}/flutter/semantics/SemanticsConfiguration-class.html
[`SemanticsNode`]: {{site.api}}/flutter/semantics/SemanticsNode-class.html
[Issue 166092]: {{site.repo.flutter}}/issues/166092
[PR 169382]: {{site.repo.flutter}}/pull/169382
