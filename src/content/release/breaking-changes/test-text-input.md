---
# title: TestTextInput state reset
title: 重置 TestTextInput 状态
# description: TestTextInput state is now reset between tests.
description: 测试之间，TestTextInput 的状态将重置。
---

## Summary

## 概述

The state of a `TestTextInput` instance,
a stub for the system's onscreen keyboard,
is now reset between tests.

现在 `TestTextInput` 实例（系统屏幕键盘的存根）的状态会在测试之间重置。

## Context

## 上下文

The Flutter test framework uses a class called `TestTextInput`
to track and manipulate editing state in a widgets test.
Individual tests can make calls that modify the internal
state of this object, sometimes indirectly (such as
by setting their own handlers on `SystemChannels.textInput`).
Subsequent tests might then check the state of
`WidgetTester.testTextInput` and get unexpected values.

Flutter 测试框架中使用一个名为 `TestTextInput` 的类来跟踪和操作 widgets 测试中的编辑状态。
个别测试可以通过方法调用来修改此对象的内部状态，
有时是间接的（例如通过 `SystemChannels.textInput` 设置自己的处理程序）。
在其之后的的测试可能会检查 `WidgetTester.testTextInput` 的状态，拿到不符合预期的值。

## Description of change

## 更改描述

The state of `WidgetTester.testTextInput`
is now reset before running a `testWidgets` test.

现在 `WidgetTester.testTextInput` 的状态会在运行 `testWidgets` 测试之前重置。

## Migration guide

## 迁移指南

Tests that relied on dirty state from a previously run
test must be updated. For example, the following test,
from `packages/flutter/test/material/text_field_test.dart`
in the `'Controller can update server'` test,
previously passed because of a combination of dirty state
from previous tests and a failure to actually set state
in cases where it should have been set.

之前依赖于 `WidgetTester.testTextInput` 运行时脏状态的测试必须更新。
例如 `packages/flutter/test/material/text_field_test.dart`
文件中的 `'Controller can update server'` 测试。
在这之前，其它测试使得 `WidgetTester.testTextInput` 处于脏状态，
并且在应该设置状态的时候设置状态失败，所以它通过了测试。

Code before migration:

迁移前的代码：

In a `widgetsTest`, before actually changing text on a
text editing widget, this call might have succeeded:

`widgetsTest` 里，在实际更改文本编辑 widget 上的文本之前，
此调用可能已成功：

```dart
    expect(tester.testTextInput.editingState['text'], isEmpty);
```

Code after migration:

迁移后的代码：

Either remove the call entirely, or consider using the
following to assert that the state hasn't been modified yet:

要么完全删除该调用，要么考虑使用以下声明来确认状态尚未被修改：

```dart
    expect(tester.testTextInput.editingState, isNull);
```

## Timeline

## 时间轴

Landed in version: 1.16.3<br>
In stable release: 1.17

发布于版本：1.16.3<br>
发布于稳定版本：1.17

## References

## 参考文献

API documentation:

API 文档：

* [`TestTextInput`][]
* [`WidgetTester`][]

Relevant issue:

相关 issues：

* [Randomize test order to avoid global state][]

Relevant PR:

相关 PR：

* [Reset state between tests][]


[Randomize test order to avoid global state]: {{site.repo.flutter}}/issues/47233
[Reset state between tests]: {{site.repo.flutter}}/pull/47464
[`TestTextInput`]: {{site.api}}/flutter/flutter_test/TestTextInput-class.html
[`WidgetTester`]: {{site.api}}/flutter/flutter_test/WidgetTester-class.html
