---
# title: Added BuildContext parameter to TextEditingController.buildTextSpan
title: TextEditingController.buildTextSpan 新增 BuildContext 参数
# description: >
#   A BuildContext parameter is added to TextEditingController.buildTextSpan so
#   inheritors that override buildTextSpan can access inherited widgets.
description: >
  TextEditingController.buildTextSpan 新增了 BuildContext 参数，
  让重写 buildTextSpan 的子类可以访问继承的 widget。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

A `BuildContext` parameter was added to `TextEditingController.buildTextSpan`.

`TextEditingController.buildTextSpan` 新增了 `BuildContext` 参数。

Classes that extend or implement `TextEditingController`
and override `buildTextSpan` need to add the `BuildContext`
parameter to the signature to make it a valid override.

扩展或实现 `TextEditingController` 并重写 `buildTextSpan` 的类，
需要在签名中加入 `BuildContext` 参数，重写才有效。

Callers of `TextEditingController.buildTextSpan`
need to pass a `BuildContext` to the call.

调用 `TextEditingController.buildTextSpan` 时，
需要传入一个 `BuildContext`。

## Context

## 背景

`TextEditingController.buildTextSpan` is called by `EditableText`
on its controller to create the `TextSpan` that it renders.
`buildTextSpan` can be overridden in custom classes that extend
`TextEditingController`. This allows classes extending
`TextEditingController` override `buildTextSpan` to change
the style of parts of the text, for example, for rich text editing.

`EditableText` 会在它的 controller 上调用
`TextEditingController.buildTextSpan`，
以创建要渲染的 `TextSpan`。
扩展 `TextEditingController` 的自定义类可以重写 `buildTextSpan`。
这样，扩展 `TextEditingController` 的类就能通过重写 `buildTextSpan`
改变部分文本的样式，例如用于富文本编辑。

Any state that is required by `buildTextSpan`
(other than the `TextStyle` and `withComposing` arguments)
needed to be passed into the class that extends
`TextEditingController`.

`buildTextSpan` 所需的任何状态
（除了 `TextStyle` 和 `withComposing` 参数之外）
都需要传入扩展 `TextEditingController` 的那个类。

## Description of change

## 改动说明

With the `BuildContext` available, users can access
`InheritedWidgets` inside `buildTextSpan`
to retrieve state required to style the text,
or otherwise manipulate the created `TextSpan`.

有了 `BuildContext` 之后，你可以在 `buildTextSpan` 里访问
`InheritedWidgets`，取出设置文本样式所需的状态，
或者用其他方式调整创建出来的 `TextSpan`。

Consider the example where we have a
`HighlightTextEditingController` that wants to
highlight text by setting its color to `Theme.accentColor`.

下面的例子是一个 `HighlightTextEditingController`，
它想把文本颜色设为 `Theme.accentColor` 来高亮文本。

Before this change the controller implementation would look like this:

这次改动之前，controller 的实现看起来是这样：

```dart
class HighlightTextEditingController extends TextEditingController {
  HighlightTextEditingController(this.highlightColor);

  final Color highlightColor;

  @override
  TextSpan buildTextSpan({TextStyle? style, required bool withComposing}) {
    return super.buildTextSpan(style: TextStyle(color: highlightColor), withComposing: withComposing);
  }
```

And users of the controller would need to pass the color
when creating the controller.

使用这个 controller 的人在创建它时需要传入颜色。

With the `BuildContext` parameter available,
the `HighlightTextEditingController` can directly access
`Theme.accentColor` using `Theme.of(BuildContext)`:

有了 `BuildContext` 参数之后，
`HighlightTextEditingController` 可以用 `Theme.of(BuildContext)`
直接访问 `Theme.accentColor`：

```dart
class HighlightTextEditingController extends TextEditingController {
  @override
  TextSpan buildTextSpan({required BuildContext context, TextStyle? style, required bool withComposing}) {
    final Color color = Theme.of(context).accentColor;
    return super.buildTextSpan(context: context, style: TextStyle(color: color), withComposing: withComposing);
  }
}
```

## Migration guide

## 迁移指南

### Overriding `TextEditingController.buildTextSpan`

### 重写 `TextEditingController.buildTextSpan`

Add a `required BuildContext context` parameter to the
signature of the `buildTextSpan` override.

在 `buildTextSpan` 重写的签名中加入 `required BuildContext context` 参数。

Code before migration:

迁移前的代码：

```dart
class MyTextEditingController {
  @override
  TextSpan buildTextSpan({TextStyle? style, required bool withComposing}) {
    /* ... */
  }
}
```

Example error message before migration:

迁移前的错误信息示例：

```plaintext
'MyTextEditingController.buildTextSpan' ('TextSpan Function({TextStyle? style, required bool withComposing})') isn't a valid override of 'TextEditingController.buildTextSpan' ('TextSpan Function({required BuildContext context, TextStyle? style, required bool withComposing})').
```

Code after migration:

迁移后的代码：

```dart
class MyTextEditingController {
  @override
  TextSpan buildTextSpan({required BuildContext context, TextStyle? style, required bool withComposing}) {
    /* ... */
  }
}
```

### Calling `TextEditingController.buildTextSpan`

### 调用 `TextEditingController.buildTextSpan`

Pass a named parameter 'context' of type
`BuildContext` to the call.

调用时传入类型为 `BuildContext` 的命名参数 'context'。

Code before migration:

迁移前的代码：

```dart
TextEditingController controller = /* ... */;
TextSpan span = controller.buildTextSpan(withComposing: false);
```

Error message before migration:

迁移前的错误信息：

```plaintext
The named parameter 'context' is required, but there's no corresponding argument.
Try adding the required argument.
```

Code after migration:

迁移后的代码：

```dart
BuildContext context = /* ... */;
TextEditingController controller = /* ... */;
TextSpan span = controller.buildTextSpan(context: context, withComposing: false);
```

## Timeline

## 时间线

Landed in version: 1.26.0<br>
合入版本：1.26.0<br>
In stable release: 2.0.0

进入稳定版：2.0.0

## References

## 参考资料

API documentation:

API 文档：

* [`TextEditingController.buildTextSpan`][]

  [`TextEditingController.buildTextSpan`][`TextEditingController.buildTextSpan`]

Relevant issues:

相关 issue：

* [Issue #72343][]

  [Issue #72343][Issue #72343]

Relevant PRs:

相关 PR：

* [Reland "Add BuildContext parameter to TextEditingController.buildTextSpan" #73510][]

  [重新合入「为 TextEditingController.buildTextSpan 添加 BuildContext 参数」#73510][Reland "Add BuildContext parameter to TextEditingController.buildTextSpan" #73510]

* [Revert "Add BuildContext parameter to TextEditingController.buildTextSpan" #73503][]

  [回滚「为 TextEditingController.buildTextSpan 添加 BuildContext 参数」#73503][Revert "Add BuildContext parameter to TextEditingController.buildTextSpan" #73503]

* [Add BuildContext parameter to TextEditingController.buildTextSpan #72344][]

  [为 TextEditingController.buildTextSpan 添加 BuildContext 参数 #72344][Add BuildContext parameter to TextEditingController.buildTextSpan #72344]

[Add BuildContext parameter to TextEditingController.buildTextSpan #72344]: {{site.repo.flutter}}/pull/72344
[Issue #72343]: {{site.repo.flutter}}/issues/72343
[Reland "Add BuildContext parameter to TextEditingController.buildTextSpan" #73510]: {{site.repo.flutter}}/pull/73510
[Revert "Add BuildContext parameter to TextEditingController.buildTextSpan" #73503]: {{site.repo.flutter}}/pull/73503
[`TextEditingController.buildTextSpan`]: {{site.api}}/flutter/widgets/TextEditingController/buildTextSpan.html
