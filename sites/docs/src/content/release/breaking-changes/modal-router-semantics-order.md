---
# title: Semantics Order of the Overlay Entries in Modal Routes
title: 模态路由中 Overlay 条目的语义顺序
# description: >
#   The scope of the modal route has a higher semantics
#   traverse order than its modal barrier.
description: >
  模态路由的内容范围比它的模态遮罩
  具有更高的语义遍历顺序。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

We changed the semantics traverse order of the overlay entries in modal routes.
Accessibility talk back or voice over now focuses the scope of a modal route
first instead of its modal barrier.

我们更改了模态路由中 overlay 条目的语义遍历顺序。
无障碍功能 TalkBack 或 VoiceOver 现在会先聚焦模态路由的内容范围，
而不是它的模态遮罩。

## Context

## 上下文

The modal route has two overlay entries, the scope and the modal barrier. The
scope is the actual content of the modal route, and the modal barrier is the
background of the route if its scope does not cover the entire screen. If the
modal route returns true for `barrierDismissible`, the modal barrier becomes
accessibility focusable because users can tap the modal barrier to pop the
modal route. This change specifically made the accessibility to focus the scope
first before the modal barrier.

模态路由有两个 overlay 条目：内容范围和模态遮罩。
内容范围是模态路由的实际内容；
如果内容范围没有盖住整个屏幕，模态遮罩就是路由的背景。
如果模态路由的 `barrierDismissible` 返回 true，
模态遮罩就可以获得无障碍焦点，
因为用户可以点按模态遮罩来弹出模态路由。
这次改动专门让无障碍功能先聚焦内容范围，再聚焦模态遮罩。

## Description of change

## 变更说明

We added additional semantics node above both
the overlay entries of modal routes.
Those semantics nodes denote the semantics
traverse order of these two overlay entries.
This also changed the structure of semantics tree.

我们在模态路由的两个 overlay 条目之上
各增加了一个语义节点。
这些语义节点标明了这两个 overlay 条目的语义遍历顺序。
这也改变了语义树的结构。

## Migration guide

## 迁移指南

If your tests start failing due to semantics tree changes after the update,
you can migrate your code by expecting a new node on above of the modal route
overlay entries.

如果更新后测试因语义树变化而失败，
可以在断言中期望模态路由 overlay 条目之上
多出一个新节点，从而完成迁移。

Code before migration:

迁移之前的代码：

```dart
import 'dart:ui';

import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/material.dart';

void main() {
  testWidgets('example test', (WidgetTester tester) async {
    final SemanticsHandle handle =
        tester.binding.pipelineOwner.ensureSemantics();

    // Build our app and trigger a frame.
    await tester.pumpWidget(MaterialApp(home: Scaffold(body: Text('test'))));

    final SemanticsNode root =
        tester.binding.pipelineOwner.semanticsOwner.rootSemanticsNode;

    final SemanticsNode firstNode = getChild(root);
    expect(firstNode.rect, Rect.fromLTRB(0.0, 0.0, 800.0, 600.0));

    // Fixes the test by expecting an additional node above the scope route.
    final SemanticsNode secondNode = getChild(firstNode);
    expect(secondNode.rect, Rect.fromLTRB(0.0, 0.0, 800.0, 600.0));

    final SemanticsNode thirdNode = getChild(secondNode);
    expect(thirdNode.rect, Rect.fromLTRB(0.0, 0.0, 800.0, 600.0));
    expect(thirdNode.hasFlag(SemanticsFlag.scopesRoute), true);

    final SemanticsNode forthNode = getChild(thirdNode);
    expect(forthNode.rect, Rect.fromLTRB(0.0, 0.0, 56.0, 14.0));
    expect(forthNode.label, 'test');
    handle.dispose();
  });
}

SemanticsNode getChild(SemanticsNode node) {
  SemanticsNode child;
  bool visitor(SemanticsNode target) {
    child = target;
    return false;
  }

  node.visitChildren(visitor);
  return child;
}
```

Code after migration:

迁移之后的代码：

```dart
import 'dart:ui';

import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/material.dart';

void main() {
  testWidgets('example test', (WidgetTester tester) async {
    final SemanticsHandle handle =
        tester.binding.pipelineOwner.ensureSemantics();

    // Build our app and trigger a frame.
    await tester.pumpWidget(MaterialApp(home: Scaffold(body: Text('test'))));

    final SemanticsNode root =
        tester.binding.pipelineOwner.semanticsOwner.rootSemanticsNode;

    final SemanticsNode firstNode = getChild(root);
    expect(firstNode.rect, Rect.fromLTRB(0.0, 0.0, 800.0, 600.0));

    // Fixes the test by expecting an additional node above the scope route.
    final SemanticsNode secondNode = getChild(firstNode);
    expect(secondNode.rect, Rect.fromLTRB(0.0, 0.0, 800.0, 600.0));

    final SemanticsNode thirdNode = getChild(secondNode);
    expect(thirdNode.rect, Rect.fromLTRB(0.0, 0.0, 800.0, 600.0));
    expect(thirdNode.hasFlag(SemanticsFlag.scopesRoute), true);

    final SemanticsNode forthNode = getChild(thirdNode);
    expect(forthNode.rect, Rect.fromLTRB(0.0, 0.0, 56.0, 14.0));
    expect(forthNode.label, 'test');
    handle.dispose();
  });
}

SemanticsNode getChild(SemanticsNode node) {
  SemanticsNode child;
  bool visitor(SemanticsNode target) {
    child = target;
    return false;
  }

  node.visitChildren(visitor);
  return child;
}
```

## Timeline

## 时间线

Landed in version: 1.19.0<br>
In stable release: 1.20

合入版本：1.19.0<br>
进入稳定版：1.20

## References

## 参考资料

API documentation:

API 文档：

* [`ModalRoute`][]
* [`OverlayEntry`][]

Relevant issue:

相关 issue：

* [Issue 46625][]

Relevant PR:

相关 PR：

* [PR 59290][]

[`ModalRoute`]: {{site.api}}/flutter/widgets/ModalRoute-class.html
[`OverlayEntry`]: {{site.api}}/flutter/widgets/OverlayEntry-class.html
[Issue 46625]: {{site.repo.flutter}}/issues/46625
[PR 59290]: {{site.repo.flutter}}/pull/59290
