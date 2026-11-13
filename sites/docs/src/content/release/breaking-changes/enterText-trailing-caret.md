---
# title: Change the enterText method to move the caret to the end of the input text
title: 更改 enterText 方法，将光标移到输入文本末尾
# description: >
#   WidgetTester.enterText and TestTextInput.enterText now
#   move the caret to the end of the input text.
description: >
  WidgetTester.enterText 和 TestTextInput.enterText
  现在会把光标移到输入文本的末尾。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

The `WidgetTester.enterText` and `TestTextInput.enterText` methods
now move the caret to the end of the input text.

`WidgetTester.enterText` 和 `TestTextInput.enterText` 方法
现在会把光标移到输入文本的末尾。

## Context

## 上下文

The caret indicates the insertion point within the current text in an
active input field. Typically, when a new character is entered, the
caret stays immediately after it. In Flutter the caret position is
represented by a collapsed selection. When the selection is invalid,
usually the user won't be able to modify or add text until they
change the selection to a valid value.

光标表示当前活动输入框中文本的插入位置。
通常，输入一个新字符后，光标会紧跟在它后面。
在 Flutter 中，光标位置用折叠选区表示。
当选区无效时，用户通常无法修改或添加文本，
直到把选区改成有效值。

`WidgetTester.enterText` and `TestTextInput.enterText` are 2 methods
used in tests to replace the content of the target text field. Prior
to this change, `WidgetTester.enterText` and `TestTextInput.enterText`
set the selection to an invalid range (-1, -1), indicating there's
no selection or caret. This contradicts the typical behavior of an
input field.

`WidgetTester.enterText` 和 `TestTextInput.enterText`
是测试中用来替换目标文本框内容的两个方法。
在此改动之前，它们会把选区设为无效范围 (-1, -1)，
表示没有选区或光标。
这与输入框的典型行为不一致。

## Description of change

## 变更说明

In addition to replacing the text with the supplied text,
`WidgetTester.enterText` and `TestTextInput.enterText` now set the
selection to `TextSelection.collapsed(offset: text.length)`, instead
of `TextSelection.collapsed(offset: -1)`.

除了用给定文本替换原文本之外，`WidgetTester.enterText`
和 `TestTextInput.enterText` 现在会把
选区设为 `TextSelection.collapsed(offset: text.length)`，
而不再是 `TextSelection.collapsed(offset: -1)`。

## Migration guide

## 迁移指南

It should be very uncommon for tests to have to rely on the
previous behavior of `enterText`, since usually the selection
should not be invalid. **Consider changing the expected values of
your tests to adopt the `enterText` change.**

测试很少需要依赖 `enterText` 的旧行为，
因为选区通常不应该无效。**请考虑修改测试的预期值，
以适配 `enterText` 的改动。**

Common test failures this change may introduce includes:

此改动可能引入的常见测试失败包括：

- Golden test failures:

  The caret appears at the end of the text, as opposed to before
  the text prior to the change.

  黄金测试失败：

  光标出现在文本末尾；
  在此改动之前，光标出现在文本之前。

- Different `TextEditingValue.selection` after calling `enterText`:

  The text field's `TextEditingValue` now has a collapsed
  selection with a non-negative offset, as opposed to
  `TextSelection.collapsed(offset: -1)` prior to the change.
  For instance, you may see
  `expect(controller.value.selection.baseOffset, -1);`
  failing after `enterText` calls.

  调用 `enterText` 之后，`TextEditingValue.selection` 会不同：

  文本框的 `TextEditingValue` 现在是偏移量非负的折叠选区，
  而在此改动之前是 `TextSelection.collapsed(offset: -1)`。
  例如，你可能会看到
  `expect(controller.value.selection.baseOffset, -1);`
  在调用 `enterText` 之后失败。

If your tests have to rely on setting the selection to invalid,
the previous behavior can be achieved using`updateEditingValue`:

如果测试必须把选区设为无效，
可以用 `updateEditingValue` 恢复之前的行为：

### `TestTextInput.enterText`

### `TestTextInput.enterText` 方法

Code before migration:

迁移之前的代码：

```dart
await testTextInput.enterText(text);
```

Code after migration:

迁移之后的代码：

```dart
await testTextInput.updateEditingValue(TextEditingValue(
  text: text,
));
```

### `WidgetTester.enterText`

### `WidgetTester.enterText` 方法

Code before migration:

迁移之前的代码：

```dart
await tester.enterText(finder, text);
```

Code after migration:

迁移之后的代码：

```dart
await tester.showKeyboard(finder);
await tester.updateEditingValue(TextEditingValue(
  text: text,
));
await tester.idle();
```

## Timeline

## 时间线

Landed in version: 2.1.0-13.0.pre<br>
In stable release: 2.5

合入版本：2.1.0-13.0.pre<br>
进入稳定版：2.5

## References

## 参考资料

API documentation:

API 文档：

* [`WidgetTester.enterText`][]
* [`TestTextInput.enterText`][]

Relevant issues:

相关 issue：

* [Issue 79494][]

Relevant PR:

相关 PR：

* [enterText to move the caret to the end][]

  [让 enterText 把光标移到末尾][enterText to move the caret to the end]


[`WidgetTester.enterText`]: {{site.api}}/flutter/flutter_test/WidgetTester/enterText.html
[`TestTextInput.enterText`]: {{site.api}}/flutter/flutter_test/TestTextInput/enterText.html

[Issue 79494]: {{site.repo.flutter}}/issues/79494
[enterText to move the caret to the end]: {{site.repo.flutter}}/pull/79506
