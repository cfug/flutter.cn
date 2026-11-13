---
# title: The RenderEditable needs to be laid out before hit testing
title: RenderEditable 须在命中测试前完成布局
# description: >
#   The hit testing of RenderEditable requires additional information
#   that is only available after the layout.
description: >-
  RenderEditable 的命中测试需要额外信息，
  这些信息只有在布局之后才能获得。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Instances of `RenderEditable` must be laid out before processing hit
testing. Trying to hit-test a `RenderEditable` object before layout
results in an assertion such as the following:

`RenderEditable` 实例必须先完成布局，才能进行命中测试。
在布局之前对 `RenderEditable` 对象做命中测试，
会触发类似下面的断言：

```plaintext
Failed assertion: line 123 pos 45: '!debugNeedsLayout': is not true.
```

## Context

## 背景

To support gesture recognizers in selectable text, the
`RenderEditable` requires the layout information for its
text spans to determine which text span receives the
pointer event. (Before this change, `RenderEditable` objects
didn't take their text into account when evaluating hit tests.)
To implement this, layout was made a prerequisite for performing
hit testing on a `RenderEditable` object.

为了在可选中文本中支持手势识别器，
`RenderEditable` 需要其文本 span 的布局信息，
才能判断哪个文本 span 接收指针事件。
（此次改动之前，`RenderEditable` 对象在计算命中测试时不会考虑文本。）
因此，对 `RenderEditable` 对象做命中测试之前必须先完成布局。

In practice, this is rarely an issue. The widget library
ensures that layout is performed before any hit test on all
render objects. This problem is only likely to be seen in
code that directly interacts with render objects, for
example in tests of custom render objects.

实际中这很少成为问题。widget 库会保证
在对所有 render object 做命中测试之前先完成布局。
只有直接操作 render object 的代码才可能看到这个问题，
例如自定义 render object 的测试。

## Migration guide

## 迁移指南

If you see the `'!debugNeedsLayout': is not true`
assertion error while hit testing the `RenderEditable`,
lay out the `RenderEditable` before doing so.

如果在对 `RenderEditable` 做命中测试时看到
`'!debugNeedsLayout': is not true` 断言错误，
请先对 `RenderEditable` 进行布局。

Code before migration:

迁移前的代码：

```dart
import 'package:flutter/rendering.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';

void main() {
  test('attach and detach correctly handle gesture', () {
    final RenderEditable editable = RenderEditable(
      textDirection: TextDirection.ltr,
      offset: ViewportOffset.zero(),
      textSelectionDelegate: FakeEditableTextState(),
      startHandleLayerLink: LayerLink(),
      endHandleLayerLink: LayerLink(),
    );
    final PipelineOwner owner = PipelineOwner(onNeedVisualUpdate: () {});
    editable.attach(owner);
    // This throws an assertion error because
    // the RenderEditable hasn't been laid out.
    editable.handleEvent(const PointerDownEvent(),
        BoxHitTestEntry(editable, const Offset(10, 10)));
    editable.detach();
  });
}

class FakeEditableTextState extends TextSelectionDelegate {
  @override
  TextEditingValue textEditingValue;
  @override
  void hideToolbar() {}
  @override
  void bringIntoView(TextPosition position) {}
}
```

Code after migration:

迁移后的代码：

```dart
import 'package:flutter/rendering.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';

void main() {
  test('attach and detach correctly handle gesture', () {
    final RenderEditable editable = RenderEditable(
      textDirection: TextDirection.ltr,
      offset: ViewportOffset.zero(),
      textSelectionDelegate: FakeEditableTextState(),
      startHandleLayerLink: LayerLink(),
      endHandleLayerLink: LayerLink(),
    );
    // Lay out the RenderEditable first.
    editable.layout(BoxConstraints.loose(const Size(1000.0, 1000.0)));
    final PipelineOwner owner = PipelineOwner(onNeedVisualUpdate: () {});
    editable.attach(owner);
    editable.handleEvent(const PointerDownEvent(),
        BoxHitTestEntry(editable, const Offset(10, 10)));
    editable.detach();
  });
}

class FakeEditableTextState extends TextSelectionDelegate {
  @override
  TextEditingValue textEditingValue;
  @override
  void hideToolbar() {}
  @override
  void bringIntoView(TextPosition position) {}
}
```

## Timeline

## 时间线

Landed in version: 1.18.0<br>
In stable release: 1.20

合入版本：1.18.0<br>
进入稳定版：1.20

## References

## 参考资料

API documentation:

API 文档：

* [`RenderEditable`][]

Relevant issue:

相关 issue：

* [Issue 43494][]: SelectableText.rich used along with
  TapGestureRecognizer isn't working

  [Issue 43494][]：SelectableText.rich 与
  TapGestureRecognizer 一起使用时不起作用

Relevant PR:

相关 PR：

* [PR 54479: Enable gesture recognizer in selectable rich text][]

  在可选中的富文本中启用手势识别器：
  [PR 54479][PR 54479: Enable gesture recognizer in selectable rich text]


[Issue 43494]: {{site.repo.flutter}}/issues/43494
[`RenderEditable`]: {{site.api}}/flutter/rendering/RenderEditable-class.html
[PR 54479: Enable gesture recognizer in selectable rich text]: {{site.repo.flutter}}/pull/54479
