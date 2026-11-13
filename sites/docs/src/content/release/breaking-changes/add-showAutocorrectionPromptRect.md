---
# title: showAutocorrectionPromptRect method added to TextInputClient
title: TextInputClient 新增 showAutocorrectionPromptRect 方法
# description: >
#   A new method, void showAutocorrectionPromptRect(int start, int end),
#   was added to the TextInputClient interface
description: >-
  TextInputClient 接口新增了方法
  void showAutocorrectionPromptRect(int start, int end)。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

A new method,`void showAutocorrectionPromptRect(int start, int end)`,
was added to the `TextInputClient` interface.

`TextInputClient` 接口新增了方法
`void showAutocorrectionPromptRect(int start, int end)`。

## Context

## 上下文

In order to display the iOS autocorrection highlight,
the iOS text input plugin needed a way to inform the
Flutter framework of the highlight's start and end position.

为了显示 iOS 自动纠错高亮，
iOS 文本输入插件需要一种方式，
把高亮的起始和结束位置告诉 Flutter 框架。

## Description of change

## 变更说明

A new method, `void showAutocorrectionPromptRect(int start, int end)`,
was added to the `TextInputClient` interface. iOS calls this method
when it finds a new potential autocorrect candidate
in the current user input, or when the range of a previously
highlighted candidate changes.

`TextInputClient` 接口新增了方法
`void showAutocorrectionPromptRect(int start, int end)`。
当 iOS 在当前用户输入中发现新的潜在自动纠错候选，
或先前高亮候选的范围发生变化时，会调用这个方法。

## Migration guide

## 迁移指南

If your application doesn't implement or subclass `TextInputClient`,
no migration is needed. If your application doesn't target iOS,
or the class that implemented the `textInputClient` interface doesn't
support autocorrect, you only need to add an empty implementation
for the new method:

如果你的应用没有实现 `TextInputClient`，也没有创建它的子类，
则无需迁移。如果应用不以 iOS 为目标，
或者实现 `textInputClient` 接口的类不支持自动纠错，
只需为新方法添加一个空实现：

```dart
class CustomTextInputClient implements TextInputClient {
  void showAutocorrectionPromptRect(int start, int end) {}
}
```

Otherwise, if your app targets iOS and supports autocorrect on iOS,
we recommend that you add a sensible implementation of
`void showAutocorrectionPromptRect(int start, int end)`
to your `TextInputClient` subclass.

否则，如果应用以 iOS 为目标并在 iOS 上支持自动纠错，
建议在 `TextInputClient` 子类中为
`void showAutocorrectionPromptRect(int start, int end)`
提供合理的实现。

Code after migration:

迁移之后的代码：

```dart
// Assume your `TextInputClient` is a `State` subclass, and it has a variable
// `_currentPromptRectRange` that controls the autocorrection highlight.
class CustomTextInputClient extends State<...> implements TextInputClient {
  @override
  void updateEditingValue(TextEditingValue value) {
    // When the text changes, the highlight needs to be dismissed.
    if (value.text != _value.text) {
      setState(() {
        _currentPromptRectRange = null;
      });
    }
  }

  void _handleFocusChanged() {
    // When this text input loses focus, the autocorrection highlight needs
    // to be dismissed.
    if (!_hasFocus) {
      setState(() {
        _currentPromptRectRange = null;
      });
    }
  }

  @override
  void showAutocorrectionPromptRect(int start, int end) {
    // Updates the range of the highlight, as iOS requested.
    // This method isn't called when iOS decides to
    // dismiss the highlight.
    setState(() {
      _currentPromptRectRange = TextRange(start: start, end: end);
    });
  }
}
```

## Timeline

## 时间线

In stable release: 1.20

进入稳定版：1.20

## References

## 参考资料

API documentation:

API 文档：

* [`TextInputClient`][]

Relevant issue:

相关 issue：

* [Issue 12920][]

  [问题 12920][Issue 12920]

Relevant PR:

相关 PR：

* [iOS UITextInput autocorrection prompt][]

  [iOS UITextInput 自动纠错提示][iOS UITextInput autocorrection prompt]


[iOS UITextInput autocorrection prompt]: {{site.repo.flutter}}/pull/54119/
[Issue 12920]: {{site.repo.flutter}}/issues/12920
[`TextInputClient`]: {{site.api}}/flutter/services/TextInputClient-class.html
