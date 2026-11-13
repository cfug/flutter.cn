---
# title: Scrollable AlertDialog (No longer deprecated)
title: 可滚动的 AlertDialog（不再弃用）
# description: AlertDialog should scroll automatically when it overflows.
description: AlertDialog 溢出时应当自动滚动。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

:::note
`AlertDialog.scrollable` is no longer deprecated because there is
no backwards-compatible way to make `AlertDialog` scrollable by default.
Instead, the parameter will remain and you can set `scrollable`
to true if you want a scrollable `AlertDialog`.

`AlertDialog.scrollable` 不再弃用，
因为没有向后兼容的方式让 `AlertDialog` 默认可以滚动。
该参数会保留。如果你需要可滚动的 `AlertDialog`，
可以将 `scrollable` 设为 true。
:::

An `AlertDialog` now scrolls automatically when it overflows.

`AlertDialog` 溢出时现在会自动滚动。

## Context

## 上下文

Before this change,
when an `AlertDialog` widget's contents were too tall,
the display overflowed, causing the contents to be clipped.
This resulted in the following issues:

此次改动之前，
当 `AlertDialog` widget 的内容过高时，
显示会溢出，导致内容被裁剪。
这会带来下列问题：

* There was no way to view the portion of the content that was clipped.

  无法查看被裁剪掉的那部分内容。

* Most alert dialogs have buttons beneath the content to prompt users for
  actions. If the content overflowed, obscuring the buttons,
  users might be unaware of their existence.

  大多数警告对话框会在内容下方放置按钮，提示用户进行操作。
  如果内容溢出并挡住按钮，用户可能不知道这些按钮的存在。

## Description of change

## 改动说明

The previous approach listed the title and content
widgets consecutively in a `Column` widget.

之前的做法是在 `Column` widget 中依次排列标题和内容 widget。

```dart
Column(
  mainAxisSize: MainAxisSize.min,
  crossAxisAlignment: CrossAxisAlignment.stretch,
  children: <Widget>[
    if (title != null)
      Padding(
        padding: titlePadding ?? EdgeInsets.fromLTRB(24, 24, 24, content == null ? 20 : 0),
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

新的做法是把这两个 widget 包进按钮栏上方的 `SingleChildScrollView`，
使它们成为同一个可滚动区域的一部分，
并把按钮栏露在对话框底部。

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

此次改动之后，你可能会看到下列问题：

**Semantics tests might fail because of the addition of a `SingleChildScrollView`.**
: Manual testing of the `Talkback` and `VoiceOver` features
  show that they still exhibit the same (correct)
  behavior as before.

  **语义测试可能因新增 `SingleChildScrollView` 而失败。**
  对 `Talkback` 和 `VoiceOver` 的手动测试表明，
  它们的行为与之前相同，仍然正确。

**Golden tests might fail.**
: This change might have caused diffs in (previously passing)
  golden tests since the `SingleChildScrollView` now nests both the
  title and content widgets.
  Some Flutter projects have taken to creating semantics tests
  by taking goldens of semantics nodes used in Flutter's debug build.

  <br>Any semantics golden updates that reflect the scrolling
  container addition are expected and these diffs should be safe to accept.

  **黄金测试可能失败。**
  由于 `SingleChildScrollView` 现在同时嵌套了标题和内容 widget，
  此次改动可能让（之前通过的）黄金测试出现差异。
  有些 Flutter 项目会通过对 Flutter 调试构建中使用的语义节点截取黄金图像
  来创建语义测试。

  <br>任何反映新增滚动容器的语义黄金图像更新都在预期之内，
  这些差异可以安全地接受。

  Sample resulting Semantics tree:

  得到的 Semantics 树示例：

```plaintext
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

  <br>A nested `SingleChildScrollView` in `AlertDialog.content`
  should work properly if left in the code,
  but should be removed if unintended, since
  it might cause confusion.

  **滚动视图可能导致布局变化。**
  如果对话框原本已经溢出，此次改动会修正这个问题。
  这种布局变化在预期之内。

  <br>如果代码里保留了嵌套在 `AlertDialog.content` 中的 `SingleChildScrollView`，
  它应当仍能正常工作；
  但如果并非有意为之，应当移除，否则可能造成混淆。

Code before migration:

迁移之前的代码：

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

迁移之后的代码：

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

## 时间线

Landed in version: 1.16.3<br>
合入版本：1.16.3<br>
In stable release: 1.17

进入稳定版：1.17

## References

## 参考资料

Design doc:

设计文档：

* [Scrollable `AlertDialog`][]

  [可滚动的 `AlertDialog`][Scrollable `AlertDialog`]

API documentation:

API 文档：

* [`AlertDialog`][]

Relevant issue:

相关 issue：

* [Overflow exceptions with maximum accessibility font size][]

  [无障碍字体调到最大时出现溢出异常][Overflow exceptions with maximum accessibility font size]

Relevant PRs:

相关 PR：

* [Update to `AlertDialog.scrollable`][]

  [更新 `AlertDialog.scrollable`][Update to `AlertDialog.scrollable`]

* [Original attempt to implement scrollable `AlertDialog`][]

  [实现可滚动 `AlertDialog` 的最初尝试][Original attempt to implement scrollable `AlertDialog`]

* [Revert of original attempt to implement scrollable `AlertDialog`][]

  [回退实现可滚动 `AlertDialog` 的最初尝试][Revert of original attempt to implement scrollable `AlertDialog`]


[`AlertDialog`]: {{site.api}}/flutter/material/AlertDialog-class.html
[Original attempt to implement scrollable `AlertDialog`]: {{site.repo.flutter}}/pull/43226
[Overflow exceptions with maximum accessibility font size]: {{site.repo.flutter}}/issues/42696
[Revert of original attempt to implement scrollable `AlertDialog`]: {{site.repo.flutter}}/pull/44003
[Scrollable `AlertDialog`]: /go/scrollable-alert-dialog
[Update to `AlertDialog.scrollable`]: {{site.repo.flutter}}/pull/45079
