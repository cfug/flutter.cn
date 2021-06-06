---
title: Scrollable AlertDialog
title: 可滚动的 AlertDialog (不再弃用)
description: AlertDialog should scroll automatically when it overflows.
description: 当 AlertDialog 边界溢出时将会自动变为可滚动的。
---

## Summary

## 概述

{{site.alert.note}}
  `AlertDialog.scrollable` is no longer deprecated because there is
  no backwards-compatible way to make `AlertDialog` scrollable by default.
  Instead, the parameter will remain and you can set `scrollable`
  to true if you want a scrollable `AlertDialog`.
  
  `AlertDialog.scrollable`不再弃用，
  因为没有向后兼容的方法使 `AlertDialog` 在默认情况下可滚动。
  相反，参数将保持不变，如果需要 `AlertDialog` 可滚动，可以将 `scrollable` 设置为 true。
    
{{site.alert.end}}

An `AlertDialog` now scrolls automatically when it overflows.

`AlertDialog` 现在会在绘制溢出时变为可滚动状态。

## Context

## 上下文

Before this change,
when an `AlertDialog` widget’s contents were too tall,
the display overflowed, causing the contents to be clipped.
This resulted in the following issues:

在此更改之前，当 `AlertDialog` widget 中的内容过高时，
会显示绘制溢出，使内容被剪裁。这导致了以下的问题：

* There was no way to view the portion of the content that was clipped.

* 无法查看被剪裁的内容。

* Most alert dialogs have buttons beneath the content to prompt users for
  actions. If the content overflowed, obscuring the buttons,
  users might be unaware of their existence.

* 大多数 `AlertDialog` 的内容下方都有按钮，
用于提示用户执行操作。如果内容溢出，遮盖了按钮，
用户可能不知道它们的存在。

## Description of change

## 更改描述

The previous approach listed the title and content
widgets consecutively in a `Column` widget.

在本次改动前，通过下面的方法在 `Column` widget 中连续地列出标题和内容 widget。

<!-- skip -->
```dart
Column(
  mainAxisSize: MainAxisSize.min,
  crossAxisAlignment: CrossAxisAlignment.stretch,
  children: <Widget>[
    if (title != null)
      Padding(
        padding: titlePadding ?? EdgeInsets.fromLTRB(24.0, 24.0, 24.0, content == null ? 20.0 : 0.0),
        child: DefaultTextStyle(
          style: titleTextStyle ?? dialogTheme.titleTextStyle ?? theme.textTheme.title,
          child: Semantics(
          child: title,
          namesRoute: true,
          container: true,
          ),
        ),
      ),
    if (content != null)
      Flexible(
        child: Padding(
        padding: contentPadding,
        child: DefaultTextStyle(
          style: contentTextStyle ?? dialogTheme.contentTextStyle ?? theme.textTheme.subhead,
          child: content,
        ),
      ),
    ),
    // ...
  ],
);
```

The new approach wraps both widgets in a
`SingleChildScrollView` above the button bar,
making both widgets part of the same scrollable
and exposing the button bar at the bottom of the dialog.

在本次改动后，两个 widget 被嵌套在在按钮栏上方的 `SingleChildScrollView` 中，
使两个 widget 成为同一个可滚动的模块，
按钮栏将显示在对话框底部。

<!-- skip -->
```dart
Column(
  mainAxisSize: MainAxisSize.min,
  crossAxisAlignment: CrossAxisAlignment.stretch,
  children: <Widget>[
    if (title != null || content != null)
      SingleChildScrollView(
        child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
         children: <Widget>[
           if (title != null)
             titleWidget,
             if (content != null)
             contentWidget,
         ],
       ),
     ),
   // ...
  ],
),
```

## Migration guide

## 迁移指南

You might see the following issues as a result of this change:

此更改可能会导致以下问题：

**Semantics tests might fail because of the addition of a `SingleChildScrollView`.**
: Manual testing of the `Talkback` and `VoiceOver` features
  show that they still exhibit the same (correct)
  behavior as before.
  
**由于添加了 `SingleChildScrollView`，语义测试可能会失败。**
：对 `Talkback` 和 `VoiceOver` 功能的手动测试表明，
它们仍然表现出与以前相同的（正确的）行为。

**Golden tests might fail.**
: This change might have caused diffs in (previously passing)
  golden tests since the `SingleChildScrollView` now nests both the
  title and content widgets.
  Some Flutter projects have taken to creating semantics tests
  by taking goldens of semantics nodes used in Flutter's debug build.
  
**黄金测试可能会失败。** 
：由于 `SingleChildScrollView` 现在嵌套了标题和内容 widget，
因此此更改可能导致（以前通过的）黄金测试出现不同的结果。
一些 Flutter 项目已经开始通过获取 Flutter debug 构建过程中使用的语义节点 goldens 来创建语义测试。

  <br>Any semantics golden updates that reflect the scrolling
  container addition are expected and these diffs should be safe to accept.

  <br>任何语义上指示出滚动容器的添加都是可预见的，这类差异可以安全地接受。 

  Sample resulting Semantics tree:
  
  语义树示例：

```
flutter:        ├─SemanticsNode#30 <-- SingleChildScrollView
flutter:          │ flags: hasImplicitScrolling
flutter:          │ scrollExtentMin: 0.0
flutter:          │ scrollPosition: 0.0
flutter:          │ scrollExtentMax: 0.0
flutter:          │
flutter:          ├─SemanticsNode#31 <-- title
flutter:          │   flags: namesRoute
flutter:          │   label: "Hello"
flutter:          │
flutter:          └─SemanticsNode#32 <-- contents
flutter:              label: "Huge content"
```

**Layout changes might result because of the scroll view.**
: If the dialog was already overflowing,
  this change corrects the problem.
  This layout change is expected.
  
**由于滚动视图，可能导致布局更改。**
：如果对话框发生了绘制溢出，
此更改将修复问题。
这种布局上的变化是意料之中的。

  <br>A nested `SingleChildScrollView` in `AlertDialog.content`
  should work properly if left in the code,
  but should be removed if unintended, since
  it might cause confusion.
    
  <br>当代码中有 `SingleChildScrollView` 嵌套在 `AlertDialog.content` 时，
  那么对话框应该正常展示，但如果不是有意为之，
  则应该将其移除，因为这可能会导致混淆。
  
Code before migration:

迁移前的代码：

<!-- skip -->
```dart
AlertDialog(
  title: Text(
    'Very, very large title that is also scrollable',
    textScaleFactor: 5,
  ),
  content: SingleChildScrollView( // won't be scrollable
    child: Text('Scrollable content', textScaleFactor: 5),
  ),
  actions: <Widget>[
    TextButton(child: Text('Button 1'), onPressed: () {}),
    TextButton(child: Text('Button 2'), onPressed: () {}),
  ],
)
```

Code after migration:

迁移后的代码：

<!-- skip -->
```dart
AlertDialog(
  title: Text('Very, very large title', textScaleFactor: 5),
  content: Text('Very, very large content', textScaleFactor: 5),
  actions: <Widget>[
    TextButton(child: Text('Button 1'), onPressed: () {}),
    TextButton(child: Text('Button 2'), onPressed: () {}),
  ],
)
```

## Timeline

## 时间轴

Landed in version: 1.16.3<br>
In stable release: 1.17

发布于版本：1.16.3<br>
发布于稳定版本：1.17

## References

## 参考文献

Design doc:

设计文档

* [Scrollable `AlertDialog`][]

API documentation:

API 文档：

* [`AlertDialog`][]

Relevant issue:

相关 issue：

* [Overflow exceptions with maximum accessibility font size][]

Relevant PRs:

相关 PRs：

* [Update to `AlertDialog.scrollable`][]
* [Original attempt to implement scrollable `AlertDialog`][]
* [Revert of original attempt to implement scrollable `AlertDialog`][]


[`AlertDialog`]: {{site.api}}/flutter/material/AlertDialog-class.html
[Original attempt to implement scrollable `AlertDialog`]: {{site.github}}/flutter/flutter/pull/43226
[Overflow exceptions with maximum accessibility font size]: {{site.github}}/flutter/flutter/issues/42696
[Revert of original attempt to implement scrollable `AlertDialog`]: {{site.github}}/flutter/flutter/pull/44003
[Scrollable `AlertDialog`]: /go/scrollable-alert-dialog
[Update to `AlertDialog.scrollable`]: {{site.github}}/flutter/flutter/pull/45079
