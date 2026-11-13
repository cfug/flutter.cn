---
# title: Scribble Text Input Client
title: Scribble 文本输入客户端
# description: >
#   Add new methods to the TextInputClient interface to allow Scribble
#   to insert or remove text placeholders and show the toolbar.
description: 为 TextInputClient 接口新增方法，让 Scribble 可以插入或移除文本占位符并显示工具栏。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Adds three methods, `showToolbar`, `insertTextPlaceholder`, and
`removeTextPlaceholder` to the `TextInputClient` interface to allow the iOS 14
Scribble feature to insert and remove text placeholders and show the toolbar.

向 `TextInputClient` 接口新增三个方法：
`showToolbar`、`insertTextPlaceholder` 和 `removeTextPlaceholder`。
这样 iOS 14 的 Scribble 功能可以插入和移除文本占位符，并显示工具栏。

## Context

## 上下文

As of iOS 14, iPads support the Scribble feature when using the Apple Pencil.
This feature allows users to use the pencil to interact with text fields to
add, delete, select, and modify text.

从 iOS 14 起，iPad 在使用 Apple Pencil 时支持 Scribble 功能。
用户可以用触控笔与文本字段交互，从而添加、删除、选择和修改文本。

## Description of change

## 变更说明

In native text widgets, the text toolbar is shown when a user uses the pencil
to select text on an iPad running iOS 14 or higher.
To replicate this behavior, the platform sends a `textInput` channel message
called `TextInputClient.showToolbar`.
This notifies the Dart code that the toolbar should be shown.

在原生文本 widget 中，用户在运行 iOS 14 或更高版本的 iPad 上
用触控笔选择文本时，会显示文本工具栏。
为了复现这一行为，平台会发送名为 `TextInputClient.showToolbar` 的
`textInput` 通道消息。
这会通知 Dart 代码应该显示工具栏。

When a user holds the pencil down, a visual gap in the text is shown to allow
the user extra space to write.
To replicate this behavior, the platform sends `textInput` channel messages
called `TextInputClient.insertTextPlaceholder` and
`TextInputClient.removeTextPlaceholder`.
Multiline text inputs should have placeholders that provide vertical space,
while single line inputs should provide horizontal space.

用户按住触控笔时，文本中会显示一段视觉空隙，留出额外的书写空间。
为了复现这一行为，平台会发送名为
`TextInputClient.insertTextPlaceholder` 和
`TextInputClient.removeTextPlaceholder` 的 `textInput` 通道消息。
多行文本输入的占位符应提供垂直空间，单行输入则应提供水平空间。

## Migration guide

## 迁移指南

If you previously implemented `TextEditingClient`, you must override
`showToolbar`, `insertTextPlaceholder`, and `removeTextPlaceholder` to either
support these Scribble features or provide an empty implementation.

如果你之前实现了 `TextEditingClient`，必须重写
`showToolbar`、`insertTextPlaceholder` 和 `removeTextPlaceholder`，
要么支持这些 Scribble 功能，要么提供空实现。

To migrate, implement `showToolbar`, `insertTextPlaceholder`, and
`removeTextPlaceholder`.

迁移时，请实现 `showToolbar`、`insertTextPlaceholder` 和
`removeTextPlaceholder`。

Code before migration:

迁移之前的代码：

```dart
class MyCustomTextInputClient implements TextInputClient {
  ...
}
```

Code after migration:

迁移之后的代码：

```dart
class MyCustomTextInputClient implements TextInputClient {
  ...
  @override
  void showToolbar() {
    ...
  }

  @override
  void insertTextPlaceholder(Size size) {
    ...
  }

  @override
  void removeTextPlaceholder() {
    ...
  }
}
```

## Timeline

## 时间线

Landed in version: 2.9.0-1.0.pre<br>
合入版本：2.9.0-1.0.pre<br>
In stable release: 2.10

进入稳定版：2.10

## References

## 参考资料

API documentation:

API 文档：

* [`TextInputClient`]({{site.api}}/flutter/services/TextInputClient-class.html)

  [`TextInputClient`]({{site.api}}/flutter/services/TextInputClient-class.html)

Relevant issues:

相关 issue：

* [Issue 61278]({{site.repo.flutter}}/issues/61278)

  [问题 61278]({{site.repo.flutter}}/issues/61278)

Relevant PRs:

相关 PR：

* [24224: Support Scribble Handwriting (engine)][]

  [24224：支持 Scribble 手写（引擎）][24224: Support Scribble Handwriting (engine)]

* [75472: Support Scribble Handwriting][]

  [75472：支持 Scribble 手写][75472: Support Scribble Handwriting]

* [97437: Re-land Support Scribble Handwriting][]

  [97437：重新落地 Scribble 手写支持][97437: Re-land Support Scribble Handwriting]

[24224: Support Scribble Handwriting (engine)]: {{site.repo.engine}}/pull/24224
[97437: Re-land Support Scribble Handwriting]: {{site.repo.flutter}}/pull/97437
[75472: Support Scribble Handwriting]: {{site.repo.flutter}}/pull/75472
