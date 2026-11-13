---
# title: Insert content text input client
title: 文本输入客户端的 insert content
# description: >
#   Add a new method to the TextInputClient interface to allow
#   Android virtual keyboards to insert rich content into Flutter TextFields.
description: >
  为 TextInputClient 接口新增方法，
  让 Android 虚拟键盘可以把富内容插入 Flutter 的 TextField。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Added an `insertContent` method to the `TextInputClient` interface to
allow Android's image keyboard feature to
insert content into a Flutter `TextField`.

在 `TextInputClient` 接口中新增了 `insertContent` 方法，
让 Android 的图片键盘功能可以把内容插入 Flutter 的 `TextField`。

## Context

## 上下文

As of Android 7.1, IMEs (input method editors or virtual keyboards) can send
images and rich content into a text editor.
This allows users to insert gifs, stickers, or
context-aware rich content into a text field.

从 Android 7.1 起，IME（输入法编辑器，即虚拟键盘）
可以把图片和富内容发送到文本编辑器。
用户因此可以把 GIF、贴纸或感知上下文的富内容插入文本字段。

## Description of change

## 改动说明

When the user inserts rich content in the IME, the platform
sends a `TextInputClient.commitContent` channel message,
notifying the Dart code that the IME inserted rich content.
The channel message contains the mime type, URI, and bytedata for
the inserted content in JSON form.

当用户在 IME 中插入富内容时，平台会发送
`TextInputClient.commitContent` 通道消息，
通知 Dart 代码 IME 已插入富内容。
该通道消息以 JSON 形式包含所插入内容的 MIME 类型、URI 和字节数据。

## Migration guide

## 迁移指南

If you implemented the `TextInputClient` interface earlier, override
`insertContent` to either support rich content insertion
or provide an empty implementation.

如果你此前实现了 `TextInputClient` 接口，
请覆盖 `insertContent`，以支持插入富内容，或提供一个空实现。

To migrate, implement `insertContent`.

要完成迁移，请实现 `insertContent`。

Code before migration:

迁移之前的代码：

```dart
class MyCustomTextInputClient implements TextInputClient {
  // ...
}
```

Code after migration:

迁移之后的代码：

```dart
class MyCustomTextInputClient implements TextInputClient {
  // ...
  @override
  void insertContent() {
    // ...
  }
  // ...
}
```

Your implementation of `TextInputClient` might not require
the ability to receive rich content inserted from the IME.
In that case, you can leave the implementation of
`insertContent` empty with no consequences.

你的 `TextInputClient` 实现也许不需要接收 IME 插入的富内容。
这种情况下，可以把 `insertContent` 的实现留空，不会有任何影响。

```dart
class MyCustomTextInputClient implements TextInputClient {
  // ...
  @override
  void insertContent() {}
  // ...
}
```

As an alternative, you can use a similar implementation to
the default `TextInputClient`.
To learn how to do this, check out the [insertContent implementation][].

也可以采用与默认 `TextInputClient` 类似的实现。
要了解具体做法，请查看 [insertContent 实现][insertContent implementation]。

To prevent breaking changes to an interface,
use `with TextInputClient` rather than `implements TextInputClient`.

为避免接口再出现破坏性改动，
请使用 `with TextInputClient`，而不要 `implements TextInputClient`。

[insertContent implementation]: {{site.api}}/flutter/services/TextInputClient/insertContent.html

## Timeline

## 时间线

Landed in version: 3.8.0-1.0.pre<br>
合入版本：3.8.0-1.0.pre<br>
In stable release: 3.10.0

进入稳定版：3.10.0

## References

## 参考资料

API documentation:

API 文档：

* [`TextInputClient`]({{site.api}}/flutter/services/TextInputClient-class.html)

Relevant issue:

相关 issue：

* [Issue 20796]({{site.repo.flutter}}/issues/20796)

Relevant PRs:

相关 PR：

* [24224: Support Image Insertion on Android (engine)]({{site.repo.engine}}/pull/35619)

  [24224：在 Android 上支持插入图片 (engine)]({{site.repo.engine}}/pull/35619)

* [97437: Support Image Insertion on Android]({{site.repo.flutter}}/pull/110052)

  [97437：在 Android 上支持插入图片]({{site.repo.flutter}}/pull/110052)
