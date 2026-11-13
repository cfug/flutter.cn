---
# title: Rename MaterialState to WidgetState
title: 将 MaterialState 重命名为 WidgetState
# description: >-
#   MaterialState and its related APIs have been moved
#   outside of the Material library and renamed to
#   WidgetState.
description: >-
  MaterialState 及其相关 API 已移出 Material 库，
  并重命名为 WidgetState。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`MaterialState`, and its related APIs, have been moved out
of the Material library and renamed to `WidgetState`.

`MaterialState` 及其相关 API 已移出 Material 库，
并重命名为 `WidgetState`。

## Background

## 背景

Previously, `MaterialState` provided logic for
handling multiple different states a widget could have,
like "hovered", "focused", and "disabled".
Because this functionality is useful outside the Material library,
namely for the base Widgets layer and Cupertino,
it was decided to move it outside of Material.
As part of the move, and to avoid future confusion,
the different `MaterialState` classes have been renamed to `WidgetState`.
The behavior of the two are the same.

此前，`MaterialState` 提供了处理 widget 多种状态的逻辑，
例如「hovered」、「focused」和「disabled」。
由于这项功能在 Material 库之外也有用，
尤其是基础 widgets 层和 Cupertino，
所以把它移出了 Material。
作为迁移的一部分，也为避免日后混淆，
各个 `MaterialState` 类已重命名为 `WidgetState`。
二者的行为相同。

| <t>Before</t><t>之前</t> | <t>Now</t><t>现在</t> |
|---------------------------------|-------------------------------|
| `MaterialState`                 | `WidgetState`                 |
| `MaterialState`                 | `WidgetState`                 |
| `MaterialStatePropertyResolver` | `WidgetStatePropertyResolver` |
| `MaterialStatePropertyResolver` | `WidgetStatePropertyResolver` |
| `MaterialStateColor`            | `WidgetStateColor`            |
| `MaterialStateColor`            | `WidgetStateColor`            |
| `MaterialStateMouseCursor`      | `WidgetStateColorMouseCursor` |
| `MaterialStateMouseCursor`      | `WidgetStateColorMouseCursor` |
| `MaterialStateBorderSide`       | `WidgetStateBorderSide`       |
| `MaterialStateBorderSide`       | `WidgetStateBorderSide`       |
| `MaterialStateOutlinedBorder`   | `WidgetStateOutlinedBorder`   |
| `MaterialStateOutlinedBorder`   | `WidgetStateOutlinedBorder`   |
| `MaterialStateTextStyle`        | `WidgetStateTextStyle`        |
| `MaterialStateTextStyle`        | `WidgetStateTextStyle`        |
| `MaterialStateProperty`         | `WidgetStateProperty`         |
| `MaterialStateProperty`         | `WidgetStateProperty`         |
| `MaterialStatePropertyAll`      | `WidgetStatePropertyAll`      |
| `MaterialStatePropertyAll`      | `WidgetStatePropertyAll`      |
| `MaterialStatesController`      | `WidgetStatesController`      |
| `MaterialStatesController`      | `WidgetStatesController`      |

The classes `MaterialStateOutlineInputBorder` and
`MaterialStateUnderlineInputBorder` were left in the
Material library with no `WidgetState` equivalent, as
they are specific to Material design.

`MaterialStateOutlineInputBorder` 和
`MaterialStateUnderlineInputBorder` 仍留在 Material 库中，
没有对应的 `WidgetState`，
因为它们是 Material Design 专用的。

## Migration guide

## 迁移指南

A [Flutter fix][] is available to help migrate the `MaterialState`
classes to `WidgetState`.

可以使用 [Flutter fix][]，
把 `MaterialState` 类迁移到 `WidgetState`。

To migrate, replace `MaterialState` with `WidgetState`.

迁移时，把 `MaterialState` 替换为 `WidgetState`。

Code before migration:

迁移之前的代码：

```dart
MaterialState selected = MaterialState.selected;

final MaterialStateProperty<Color> backgroundColor;

class _MouseCursor extends MaterialStateMouseCursor{
  const _MouseCursor(this.resolveCallback);

  final MaterialPropertyResolver<MouseCursor?> resolveCallback;

  @override
  MouseCursor resolve(Set<MaterialState> states) => resolveCallback(states) ?? MouseCursor.uncontrolled;
}

BorderSide side = MaterialStateBorderSide.resolveWith((Set<MaterialState> states) {
  if (states.contains(MaterialState.selected)) {
    return const BorderSide(color: Colors.red);
  }
  return null;
});
```

Code after migration:

迁移之后的代码：

```dart
WidgetState selected = WidgetState.selected;

final WidgetStateProperty<Color> backgroundColor;

class _MouseCursor extends WidgetStateMouseCursor{
  const _MouseCursor(this.resolveCallback);

  final WidgetPropertyResolver<MouseCursor?> resolveCallback;

  @override
  MouseCursor resolve(Set<WidgetState> states) => resolveCallback(states) ?? MouseCursor.uncontrolled;
}

BorderSide side = WidgetStateBorderSide.resolveWith((Set<WidgetState> states) {
  if (states.contains(WidgetState.selected)) {
    return const BorderSide(color: Colors.red);
  }
  return null;
});
```

## Timeline

## 时间线

Landed in version: 3.21.0-11.0.pre<br>
In stable release: 3.22.0

合入版本：3.21.0-11.0.pre<br>
进入稳定版：3.22.0

## References

## 参考资料

Relevant issues:

相关 issue：

* [Create widgets level support for State][]

  [为 State 增加 widgets 层支持][Create widgets level support for State]

Relevant PRs:

相关 PR：

* [Widget State Properties][]

  [Widget State 属性][Widget State Properties]

[Create widgets level support for State]: {{site.repo.flutter}}/issues/138270
[Flutter fix]: /tools/flutter-fix
[Widget State Properties]: {{site.repo.flutter}}/pull/142151
