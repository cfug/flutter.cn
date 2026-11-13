---
# title: Added missing `dispose()` for some disposable objects in Flutter
title: 为 Flutter 中部分可释放对象补上缺失的 `dispose()`
# description: >
#   'dispose()' might fail because of double disposal.
description: 重复调用 `dispose()` 可能会失败。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Missing calls to 'dispose()' are added for some disposable objects.
For example, ContextMenuController did not dispose OverlayEntry,
and EditableTextState did not dispose TextSelectionOverlay.

部分可释放对象补上了缺失的 `dispose()` 调用。
例如，ContextMenuController 原先没有释放 OverlayEntry，
EditableTextState 原先没有释放 TextSelectionOverlay。

If some other code also invokes 'dispose()' for the object,
and the object is protected from double disposal,
the second 'dispose()' fails with the following error message:

如果其他代码也对同一对象调用 `dispose()`，
并且该对象禁止重复释放，
第二次 `dispose()` 会失败，并给出如下错误信息：

`Once you have called dispose() on a <class name>, it can no longer be used.`

一旦对某个 `<class name>` 调用了 `dispose()`，它就不能再使用。

## Background

## 背景

The convention is that the owner of an object should dispose of it.

惯例是：对象的所有者负责释放它。

This convention was broken in some places:
owners were not disposing the disposable objects.
The issue was fixed by adding a call to `dispose()`.
However, if the object is protected from double disposal,
this can cause failures when running in debug mode
and `dispose()` is called elsewhere on the object.

有些地方打破了这一惯例：
所有者没有释放可释放对象。
问题已通过补上 `dispose()` 调用修复。
不过，如果对象禁止重复释放，
在调试模式下，其他地方再对该对象调用 `dispose()` 就会失败。

## Migration guide

## 迁移指南

If you encounter the following error, update your code to
call `dispose()` only in cases when your code created the object.

如果遇到以下错误，请修改代码，
只在对象由你的代码创建时才调用 `dispose()`。

```plaintext
Once you have called dispose() on a <class name>, it can no longer be used.
```

Code before migration:

迁移前的代码：

```dart
x.dispose();
```

Code after migration:

迁移后的代码：

```dart
if (xIsCreatedByMe) {
  x.dispose();
}
```

To locate the incorrect disposal, check the call stack of the error. If the call stack points to `dispose`
in your code, this disposal is incorrect and should be fixed.

要定位错误的释放，请查看错误的调用栈。
如果调用栈指向你代码中的 `dispose`，
这次释放就是错误的，应当修正。

If the error occurs in Flutter code, `dispose()` was
called incorrectly the first time.

如果错误发生在 Flutter 代码中，
说明第一次调用 `dispose()` 就是不正确的。

You can locate the incorrect call by temporary calling `print(StackTrace.current)`
in the body of the failed method `dispose`.

你可以在失败的 `dispose` 方法体内临时调用 `print(StackTrace.current)`，
以此定位错误的调用。

## Timeline

## 时间线

See the progress and status [in the tracking issue]({{site.repo.flutter}}/issues/134787).

进度与状态请查看 [跟踪 issue]({{site.repo.flutter}}/issues/134787)。
