---
# title: TextInputClient currentTextEditingValue
title: TextInputClient 的 currentTextEditingValue
# description: >
#   Add a new field to the TextInputClient interface to
#   get the current TextEditingValue from a client.
description: >
  为 TextInputClient 接口新增字段，
  用于从客户端获取当前的 TextEditingValue。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Add a field, `currentTextEditingValue`, to the `TextInputClient`
interface to get the current value of an editable text field
from a platform client.

在 `TextInputClient` 接口中新增字段 `currentTextEditingValue`，
以便从平台客户端获取可编辑文本字段的当前值。

## Context

## 背景

The `TextInputClient` class is used by the Flutter framework to
communicate with platform code about the current state of text
input widgets like `EditableText`.

Flutter 框架使用 `TextInputClient` 类，
与平台代码沟通 `EditableText` 等文本输入 widget 的当前状态。

The platform side can lose its state when an Android app
moves to the background. As of this change,
the app can ask the framework for the last known state.
In order to obtain this information,
the `TextEditingValue` was surfaced for the `TextInputClient`.

Android 应用进入后台时，平台侧可能会丢失自己的状态。
此次改动之后，应用可以向框架查询最后已知的状态。
为了拿到这份信息，`TextInputClient` 对外暴露了 `TextEditingValue`。

## Description of change

## 改动说明

On some supported platforms, the application can be moved into
the background where it is expected to consume fewer resources.
For example, a backgrounded application on Android should avoid consuming
unnecessary memory and has no need to retain references to views.
Before this change, the Android-specific platform code could
lose state information about editable text fields when
the app moved back to the foreground.
This is seen, for example,
when text entered in a `TextField` widget is lost to
the Java code, but is still remembered in the Dart code.

在部分受支持的平台上，应用可以被移到后台，并应占用更少资源。
例如，Android 上处于后台的应用应避免消耗不必要的内存，
也无需继续持有视图的引用。
在此次改动之前，当应用回到前台时，
Android 平台代码可能会丢失可编辑文本字段的状态。
一种表现是：在 `TextField` widget 中输入的文本
在 Java 代码里丢了，但 Dart 代码仍然保留着。

As of this change,
the platform side now sends a `textInput` channel
message called `TextInput.requestExistingState`.
This notifies the Dart code that, when the app wakes up,
it should re-establish any text input connections
and notify the platform of its most
recently known editing state.

此次改动之后，平台侧会通过 `textInput` 通道
发送名为 `TextInput.requestExistingState` 的消息。
这会通知 Dart 代码：应用被唤醒时，
应重新建立所有文本输入连接，
并把最近已知的编辑状态告知平台。

The `TextInput` class interacts with client widgets using
the `TextInputClient` interface. This interface previously
provided no insight into the current value that a client had.
To allow the `TextInput` class to appropriately respond to
`TextInput.requestExistingState`, a new getter was added to
`TextInputClient` called `currentTextEditingValue`.
You cannot safely use the last value passed to
`TextInputConnection.setEditingState`, since the client
only calls that method under specific circumstances,
such as when Dart code directly modifies the value of a
`TextEditingController` in a way that does not directly mirror
the platform's native handling of a response to a key input event.
This is how a `TextInputFormatter` generally works,
or what happens when Dart code directly sets
`TextEditingController.value`.

`TextInput` 类通过 `TextInputClient` 接口与客户端 widget 交互。
此前，该接口无法得知客户端当前持有的值。
为了让 `TextInput` 能正确响应 `TextInput.requestExistingState`，
`TextInputClient` 新增了名为 `currentTextEditingValue` 的 getter。
你不能放心地使用上一次传给 `TextInputConnection.setEditingState` 的值，
因为客户端只在特定情况下才会调用该方法。
例如，Dart 代码直接修改 `TextEditingController` 的值，
且这种方式并不直接对应平台对按键输入事件的原生处理。
`TextInputFormatter` 通常就是这样工作的；
Dart 代码直接设置 `TextEditingController.value` 时也是如此。

## Migration guide

## 迁移指南

If you previously implemented or extended `TextEditingClient`,
you must now add the appropriate override for `currentTextEditingValue`.

如果你之前实现或扩展了 `TextEditingClient`，
现在必须为 `currentTextEditingValue` 添加相应的 override。

This value may be null.

该值可能为 null。

If you want to migrate _before_ this change lands,
you can add a class to your class
similar to the following:

如果你想在此改动合入 **之前** 完成迁移，
可以在自己的类上再加一个类似下面的类：

```dart
abstract class _TemporaryTextEditingClient {
  TextEditingValue get currentTextEditingValue;
}
```

This allows you to add the new member with an
`@override` annotation before the change lands
in the framework. Later, you can remove the
temporary interface definition.

这样，在改动进入框架之前，
你就可以带上 `@override` 注解添加这个新成员。
之后可以删掉这个临时接口定义。

Code before migration:

迁移前的代码：

```dart
class _MyCustomTextWidgetState extends State<MyCustomWidget> implements TextEditingClient {
  ...

  @override
  void updateEditingValue(TextEditingValue value) {
    ...
  }

  @override
  void performAction(TextInputAction action) {
    ...
  }

  @override
  void updateFloatingCursor(RawFloatingCursorPoint point) {
    ...
  }
}
```

Code after migration:

迁移后的代码：

```dart
class _MyCustomTextWidgetState extends State<MyCustomWidget> implements TextEditingClient {
  ...

  @override
  TextEditingValue get currentTextEditingValue => widget.textEditingController.value;

  @override
  void updateEditingValue(TextEditingValue value) {
    ...
  }

  @override
  void performAction(TextInputAction action) {
    ...
  }

  @override
  void updateFloatingCursor(RawFloatingCursorPoint point) {
    ...
  }
}
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

* [`TextInput`][]

  [`TextInput`][`TextInput`]

* [`TextInputClient`][]

  [`TextInputClient`][`TextInputClient`]

* [`EditableText`][]

  [`EditableText`][`EditableText`]

* [`SystemChannels.textInput`][]

  [`SystemChannels.textInput`][`SystemChannels.textInput`]

Relevant issue:

相关 issue：

* [Issue 47137][]

  [Issue 47137][Issue 47137]

Relevant PR:

相关 PR：

* [Fix requestExistingInputState response][]

  [修复 requestExistingInputState 的响应][Fix requestExistingInputState response]


[`EditableText`]: {{site.api}}/flutter/widgets/EditableText-class.html
[Fix requestExistingInputState response]: {{site.repo.flutter}}/pull/47472
[Issue 47137]: {{site.repo.flutter}}/issues/47137
[`TextInput`]: {{site.api}}/flutter/services/TextInput-class.html
[`TextInputClient`]: {{site.api}}/flutter/services/TextInputClient-class.html
[`SystemChannels.textInput`]: {{site.api}}/flutter/services/SystemChannels/textInput-constant.html
