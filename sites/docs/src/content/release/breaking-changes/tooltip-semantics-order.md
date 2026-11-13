---
# title: Accessibility traversal order of tooltip changed
title: tooltip 的无障碍遍历顺序已变更
# description: >-
#   The Tooltip widget's message now immediately follows the
#   Tooltip widget's child during accessibility traversal.
description: 无障碍遍历时，Tooltip widget 的 message 现在紧跟在其 child 之后。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

During accessibility focus traversal, `Tooltip.message` is
visited immediately after `Tooltip.child`.

在无障碍焦点遍历期间，`Tooltip.message` 会紧接在 `Tooltip.child` 之后被访问。

## Background

## 背景

The `Tooltip` widget usually wraps an interactive UI component such as a button,
and shows a help message when long pressed.
When the message is visible, assistive technologies should announce it after
the button.

`Tooltip` widget 通常包裹按钮这类可交互的 UI 组件，
并在长按时显示帮助信息。
当信息可见时，辅助技术应该在按钮之后朗读它。

The `Tooltip` widget originally put `Tooltip.message` on
an `OverlayEntry` when long pressed.
As a result, `Tooltip.message` was not immediately after
`Tooltip.child` in the semantics tree.

`Tooltip` widget 原先在长按时把 `Tooltip.message` 放在 `OverlayEntry` 上。
因此，在语义树中，`Tooltip.message` 并没有紧跟在 `Tooltip.child` 之后。

## Migration guide

## 迁移指南

This change moved the tooltip message in the semantics tree.
You might see accessibility test failures if
your tests expect a tooltip message to appear in a
specific location in the semantics tree, when it is visible.
Update any failing accessibility tests to adopt the new tooltip semantics order.

这次改动移动了语义树中的 tooltip 信息。
如果测试期望 tooltip 信息可见时出现在语义树的某个特定位置，
你可能会看到无障碍测试失败。
请更新失败的无障碍测试，以采用新的 tooltip 语义顺序。

For example, if you constructed the following widget tree in your test:

例如，如果你在测试中构建了下面的 widget 树：

```dart
Directionality(
  textDirection: TextDirection.ltr,
  child: Overlay(
    initialEntries: <OverlayEntry>[
      OverlayEntry(
        builder: (BuildContext context) {
          return ListView(
            children: <Widget>[
              const Text('before'),
              Tooltip(
                key: tooltipKey,
                showDuration: const Duration(days: 365),
                message: 'message',
                child: const Text('child'),
              ),
              const Text('after'),
            ],
          );
        },
      ),
    ],
  ),
);
```

When the tooltip message is visible, the corresponding semantics tree before
this change should look like this:

tooltip 信息可见时，这次改动之前对应的语义树应如下所示：

```dart
SemanticsNode#0
 │
 ├─SemanticsNode#1
 │ │
 │ └─SemanticsNode#5
 │   │ flags: hasImplicitScrolling
 │   │ scrollChildren: 3
 │   │
 │   ├─SemanticsNode#2
 │   │   tags: RenderViewport.twoPane
 │   │   label: "before"
 │   │   textDirection: ltr
 │   │
 │   ├─SemanticsNode#3
 │   │   tags: RenderViewport.twoPane
 │   │   label: "child"
 │   │   tooltip: "message"
 │   │   textDirection: ltr
 │   │
 │   └─SemanticsNode#4
 │       tags: RenderViewport.twoPane
 │       label: "after"
 │       textDirection: ltr
 │
 └─SemanticsNode#6
     label: "message"
     textDirection: ltr
```

After this change, the same widget tree generates a
slightly different semantics tree, as shown below.
Node #6 becomes a child of node #3, instead of node #0.

这次改动之后，同一棵 widget 树会生成略有不同的语义树，如下所示。
节点 #6 变成节点 #3 的子节点，而不再是节点 #0 的子节点。

```dart
SemanticsNode#0
 │
 └─SemanticsNode#1
   │
   └─SemanticsNode#5
     │ flags: hasImplicitScrolling
     │ scrollChildren: 3
     │
     ├─SemanticsNode#2
     │   tags: RenderViewport.twoPane
     │   label: "before"
     │   textDirection: ltr
     │
     ├─SemanticsNode#3
     │ │ tags: RenderViewport.twoPane
     │ │ label: "child"
     │ │ tooltip: "message"
     │ │ textDirection: ltr
     │ │
     │ └─SemanticsNode#6
     │     label: "message"
     │     textDirection: ltr
     │
     └─SemanticsNode#4
         tags: RenderViewport.twoPane
         label: "after"
         textDirection: ltr
```

## Timeline

## 时间线

Landed in version: 3.16.0-11.0.pre<br>
合入版本：3.16.0-11.0.pre<br>
In stable release: 3.19.0

进入稳定版：3.19.0

## References

## 参考资料

API documentation:

API 文档：

* [`Tooltip`][]

Relevant PRs:

相关 PR：

* [OverlayPortal.overlayChild contributes semantics to OverlayPortal instead of Overlay][]

  [OverlayPortal.overlayChild 把语义贡献给 OverlayPortal 而不是 Overlay][OverlayPortal.overlayChild contributes semantics to OverlayPortal instead of Overlay]

[`Tooltip`]: {{site.api}}/flutter/material/Tooltip-class.html
[OverlayPortal.overlayChild contributes semantics to OverlayPortal instead of Overlay]: {{site.repo.flutter}}/pull/134921
