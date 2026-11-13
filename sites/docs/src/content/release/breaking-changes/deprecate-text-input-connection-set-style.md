---
# title: Deprecate `TextInputConnection.setStyle`
title: 弃用 `TextInputConnection.setStyle`
# description: >-
#   The `TextInputConnection.setStyle` method has been deprecated
#   in favor of the `TextInputConnection.updateStyle` method.
description: >-
  `TextInputConnection.setStyle` 方法已弃用，
  请改用 `TextInputConnection.updateStyle` 方法。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`TextInputConnection.setStyle` is deprecated in favor of
`TextInputConnection.updateStyle`, which supports synchronizing
`letterSpacing`, `wordSpacing`, and `lineHeight` to the engine.

`TextInputConnection.setStyle` 已弃用，
请改用 `TextInputConnection.updateStyle`。
后者支持把 `letterSpacing`、`wordSpacing` 和 `lineHeight`
同步到引擎。

## Context

## 上下文

The previous `setStyle` method didn't support `letterSpacing`, `wordSpacing`,
or `lineHeight`. This caused visual misalignment of the selection highlight
and IME caret when these properties were used.

之前的 `setStyle` 方法不支持 `letterSpacing`、`wordSpacing`
或 `lineHeight`。使用这些属性时，
选区高亮和 IME 光标会出现视觉错位。

The replacement `updateStyle` method uses
`TextInputStyle` to support these properties,
ensuring the system input is synchronized with the rendered text.

替代方法 `updateStyle` 通过 `TextInputStyle` 支持这些属性，
确保系统输入与渲染出的文本保持同步。

## Migration guide

## 迁移指南

If you author a custom text input client,
replace calls to `TextInputConnection.setStyle`
with `TextInputConnection.updateStyle`.

如果你在编写自定义文本输入客户端，
请把对 `TextInputConnection.setStyle` 的调用
替换为 `TextInputConnection.updateStyle`。

### Code before migration

### 迁移前的代码

```dart
connection.setStyle(
  fontFamily: 'Roboto',
  fontSize: 14.0,
  fontWeight: FontWeight.normal,
  textDirection: TextDirection.ltr,
  textAlign: TextAlign.start,
);
```

### Code after migration

### 迁移后的代码

```dart
connection.updateStyle(
  TextInputStyle(
    fontFamily: 'Roboto',
    fontSize: 14.0,
    fontWeight: FontWeight.normal,
    textDirection: TextDirection.ltr,
    textAlign: TextAlign.start,
    letterSpacing: 1.2,
    wordSpacing: 1.0,
    lineHeight: 1.5,
  ),
);
```

## Timeline

## 时间线

Landed in version: 3.43.0-0.1.pre<br>
合入版本：3.43.0-0.1.pre<br>
In stable release: 3.44

进入稳定版：3.44

## References

## 参考资料

Relevant PR:

相关 PR：

* [Fix IME and selection by syncing more text styles][pr-180436]

  [通过同步更多文本样式修复 IME 与选区][pr-180436]

Relevant issues:

相关 issue：

* [Incorrect position of Japanese predictive conversion popup in TextFormField using maxLines on the Web][issue-161592]

  [Web 上使用 maxLines 的 TextFormField 中，日语预测转换弹窗位置不正确][issue-161592]

[pr-180436]: {{site.repo.flutter}}/pull/180436
[issue-161592]: {{site.repo.flutter}}/issues/161592
