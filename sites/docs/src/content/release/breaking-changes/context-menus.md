---
# title: A new way to customize context menus
title: 自定义上下文菜单的新方式
# description: >
#   Several hard-coded parameters for customizing context menus have
#   now been replaced by a generic widget builder.
description: >
  若干用于自定义上下文菜单的硬编码参数，
  现已由通用的 widget 构建器取代。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

Context menus, or text selection toolbars, are the menus that show up when long
pressing or right clicking on text in Flutter, and they show options like
**Cut**, **Copy**, **Paste**, and **Select all**. Previously, it was only
possible to narrowly customize them using `ToolbarOptions` and
`TextSelectionControls`. Now, they have been made composable using widgets, just
like everything else in Flutter, and the specific configuration parameters have
been deprecated.

上下文菜单，也称文本选择工具栏，
是在 Flutter 中长按或右键点击文本时出现的菜单，
其中有 **剪切**、**复制**、**粘贴** 和 **全选** 等选项。
之前只能用 `ToolbarOptions` 和 `TextSelectionControls` 做很有限的自定义。
现在它们可以像 Flutter 里的其他部分一样用 widget 组合而成，
那些专门的配置参数已弃用。

## Context

## 上下文

Previously, it was possible to disable buttons from the context menus using
`TextSelectionControls`, but any customization beyond that required copying and
editing hundreds of lines of custom classes in the framework. Now, all of this
has been replaced by a simple builder function, `contextMenuBuilder`, which
allows any Flutter widget to be used as a context menu.

之前可以用 `TextSelectionControls` 禁用上下文菜单中的按钮，
但再进一步的自定义就得复制并修改框架里数百行自定义类。
现在这些都由一个简单的构建函数 `contextMenuBuilder` 取代，
任意 Flutter widget 都可以用作上下文菜单。

## Description of change

## 改动说明

Context menus are now built from the `contextMenuBuilder` parameter, which has
been added to all text-editing and text-selection widgets. If one is not
provided, then Flutter just sets it to a default that builds the correct context
menu for the given platform. All of these default widgets are exposed to users
for re-use. Customizing context menus now consists of using `contextMenuBuilder`
to return whatever widget you want, possibly including reusing the built-in
context menu widgets.

上下文菜单现在由 `contextMenuBuilder` 参数构建。
该参数已添加到所有文本编辑和文本选择 widget。
如果没有提供，Flutter 会把它设为默认值，
为当前平台构建正确的上下文菜单。
这些默认 widget 都向用户公开，可以复用。
现在自定义上下文菜单，就是用 `contextMenuBuilder`
返回你想要的任意 widget，其中也可以复用内置的上下文菜单 widget。

Here's an example that shows how to add a **Send email** button to the default
context menus whenever an email address is selected. The full code can be found
in the samples repository in
[email_button_page.dart]({{site.repo.samples}}/blob/main/context_menus/lib/email_button_page.dart)
on GitHub.

下面的示例展示如何在选中电子邮件地址时，
向默认上下文菜单添加 **发送邮件** 按钮。
完整代码位于示例仓库的
[email_button_page.dart]({{site.repo.samples}}/blob/main/context_menus/lib/email_button_page.dart)，
托管在 GitHub 上。

```dart
TextField(
  contextMenuBuilder: (context, editableTextState) {
    final TextEditingValue value = editableTextState.textEditingValue;
    final List<ContextMenuButtonItem> buttonItems =
        editableTextState.contextMenuButtonItems;
    if (isValidEmail(value.selection.textInside(value.text))) {
      buttonItems.insert(
          0,
          ContextMenuButtonItem(
            label: 'Send email',
            onPressed: () {
              ContextMenuController.removeAny();
              Navigator.of(context).push(_showDialog(context));
            },
          ));
    }
    return AdaptiveTextSelectionToolbar.buttonItems(
      anchors: editableTextState.contextMenuAnchors,
      buttonItems: buttonItems,
    );
  },
)
```

A large number of examples of different custom context menus are available
[in the samples repo]({{site.repo.samples}}/tree/main/context_menus)
on GitHub.

GitHub 上的
[示例仓库中]({{site.repo.samples}}/tree/main/context_menus)
有大量不同的自定义上下文菜单示例。

All related deprecated features were flagged with the deprecation warning "Use
`contextMenuBuilder` instead."

所有相关的已弃用功能都标有弃用警告
「Use `contextMenuBuilder` instead.」。

## Migration guide

## 迁移指南

In general, any previous changes to context menus that have been deprecated now
require the use of the `contextMenuBuilder` parameter on the relevant
text-editing or text-selection widget (
[on `TextField`]({{site.api}}/flutter/material/TextField/contextMenuBuilder.html),
for example). Return a built-in context menu widget like
[`AdaptiveTextSelectionToolbar`]({{site.api}}/flutter/material/AdaptiveTextSelectionToolbar-class.html)
to use Flutter's built-in context menus, or return your own widget for something
totally custom.

一般来说，之前那些已弃用的上下文菜单改动，
现在都需要在相应的文本编辑或文本选择 widget 上使用 `contextMenuBuilder` 参数
（例如
[`TextField`]({{site.api}}/flutter/material/TextField/contextMenuBuilder.html)
）。
返回内置的上下文菜单 widget，例如
[`AdaptiveTextSelectionToolbar`]({{site.api}}/flutter/material/AdaptiveTextSelectionToolbar-class.html)，
即可使用 Flutter 内置的上下文菜单；
也可以返回你自己的 widget，做完全自定义的菜单。

To transition to `contextMenuBuilder`, the following parameters and classes have
been deprecated.

要过渡到 `contextMenuBuilder`，下列参数和类已弃用。

### [`ToolbarOptions`]({{site.api}}/flutter/widgets/ToolbarOptions-class.html)

### [`ToolbarOptions`]({{site.api}}/flutter/widgets/ToolbarOptions-class.html) 类

This class was previously used to explicitly enable or disable certain buttons
in a context menu. Before this change, you might have passed it into `TextField`
or other widgets like this:

这个类之前用来显式启用或禁用上下文菜单中的某些按钮。
此次改动之前，你可能会把它传给 `TextField` 或其他 widget，像这样：

```dart
// Deprecated.
TextField(
  toolbarOptions: ToolbarOptions(
    copy: true,
  ),
)
```

Now, you can achieve the same effect by adjusting the `buttonItems` passed into
`AdaptiveTextSelectionToolbar`. For example, you could ensure that the **Cut**
button never appears, but the other buttons do appear as usual:

现在可以通过调整传给 `AdaptiveTextSelectionToolbar` 的 `buttonItems`
来达到同样的效果。例如，可以确保 **剪切** 按钮永不出现，
而其他按钮照常出现：

```dart
TextField(
  contextMenuBuilder: (context, editableTextState) {
    final List<ContextMenuButtonItem> buttonItems =
        editableTextState.contextMenuButtonItems;
    buttonItems.removeWhere((ContextMenuButtonItem buttonItem) {
      return buttonItem.type == ContextMenuButtonType.cut;
    });
    return AdaptiveTextSelectionToolbar.buttonItems(
      anchors: editableTextState.contextMenuAnchors,
      buttonItems: buttonItems,
    );
  },
)
```

Or, you could ensure that the **Cut** button appears exclusively and always:

也可以确保 **剪切** 按钮始终单独出现：

```dart
TextField(
  contextMenuBuilder: (context, editableTextState) {
    return AdaptiveTextSelectionToolbar.buttonItems(
      anchors: editableTextState.contextMenuAnchors,
      buttonItems: <ContextMenuButtonItem>[
        ContextMenuButtonItem(
          onPressed: () {
            editableTextState.cutSelection(SelectionChangedCause.toolbar);
          },
          type: ContextMenuButtonType.cut,
        ),
      ],
    );
  },
)
```

### [`TextSelectionControls.canCut`]({{site.api}}/flutter/widgets/TextSelectionControls/canCut.html) and other button booleans

### [`TextSelectionControls.canCut`]({{site.api}}/flutter/widgets/TextSelectionControls/canCut.html) 及其他按钮布尔值

These booleans previously had the same effect of enabling and disabling certain
buttons as `ToolbarOptions.cut`, and so on had. Before this change, you might
have been hiding and showing buttons by overriding `TextSelectionControls` and
setting these booleans like this:

这些布尔值之前的作用与 `ToolbarOptions.cut` 等相同，
用来启用或禁用某些按钮。
此次改动之前，你可能会通过覆写 `TextSelectionControls`
并设置这些布尔值来隐藏和显示按钮，像这样：

```dart
// Deprecated.
class _MyMaterialTextSelectionControls extends MaterialTextSelectionControls {
  @override
  bool canCut() => false,
}
```

See the previous section on `ToolbarOptions` for how to achieve a similar effect
with `contextMenuBuilder`.

要使用 `contextMenuBuilder` 达到类似效果，
请参阅上一节关于 `ToolbarOptions` 的说明。

### [`TextSelectionControls.handleCut`]({{site.api}}/flutter/widgets/TextSelectionControls/handleCut.html) and other button callbacks

### [`TextSelectionControls.handleCut`]({{site.api}}/flutter/widgets/TextSelectionControls/handleCut.html) 及其他按钮回调

These functions allowed the modification of the callback called when the buttons
were pressed. Before this change, you might have been modifying context menu
button callbacks by overriding these handler methods like this:

这些函数可以修改按下按钮时调用的回调。
此次改动之前，你可能会通过覆写这些处理方法
来修改上下文菜单按钮的回调，像这样：

```dart
// Deprecated.
class _MyMaterialTextSelectionControls extends MaterialTextSelectionControls {
  @override
  bool handleCut() {
    // My custom cut implementation here.
  },
}
```

This is still possible using `contextMenuBuilder`, including calling
out to the original buttons' actions in the custom handler, using toolbar
widgets like `AdaptiveTextSelectionToolbar.buttonItems`.

使用 `contextMenuBuilder` 仍然可以做到，
包括在自定义处理函数中调用原来按钮的操作，
并使用 `AdaptiveTextSelectionToolbar.buttonItems` 这类工具栏 widget。

This example shows modifying the **Copy** button to show a dialog in addition to
doing its usual copy logic.

这个示例修改 **复制** 按钮，
在执行通常的复制逻辑之外再显示一个对话框。

```dart
TextField(
  contextMenuBuilder: (BuildContext context, EditableTextState editableTextState) {
    final List<ContextMenuButtonItem> buttonItems =
        editableTextState.contextMenuButtonItems;
    final int copyButtonIndex = buttonItems.indexWhere(
      (ContextMenuButtonItem buttonItem) {
        return buttonItem.type == ContextMenuButtonType.copy;
      },
    );
    if (copyButtonIndex >= 0) {
      final ContextMenuButtonItem copyButtonItem =
          buttonItems[copyButtonIndex];
      buttonItems[copyButtonIndex] = copyButtonItem.copyWith(
        onPressed: () {
          copyButtonItem.onPressed();
          Navigator.of(context).push(
            DialogRoute<void>(
              context: context,
              builder: (BuildContext context) =>
                const AlertDialog(
                  title: Text('Copied, but also showed this dialog.'),
                ),
            );
          )
        },
      );
    }
    return AdaptiveTextSelectionToolbar.buttonItems(
      anchors: editableTextState.contextMenuAnchors,
      buttonItems: buttonItems,
    );
  },
)
```

A full example of modifying a built-in context menu action can be found in the
samples repository in
[modified_action_page.dart]({{site.repo.samples}}/blob/main/context_menus/lib/modified_action_page.dart)
on GitHub.

修改内置上下文菜单操作的完整示例位于示例仓库的
[modified_action_page.dart]({{site.repo.samples}}/blob/main/context_menus/lib/modified_action_page.dart)，
托管在 GitHub 上。

### [`buildToolbar`]({{site.api}}/flutter/widgets/TextSelectionControls/buildToolbar.html)

### [`buildToolbar`]({{site.api}}/flutter/widgets/TextSelectionControls/buildToolbar.html) 方法

This function generated the context menu widget similarly to
`contextMenuBuilder`, but required more setup to use. Before this change, you
might have been overriding `buildToolbar` as a part of `TextSelectionControls`,
like this:

这个函数生成上下文菜单 widget 的方式与 `contextMenuBuilder` 类似，
但使用时需要更多设置。
此次改动之前，你可能会把 `buildToolbar` 作为 `TextSelectionControls` 的一部分来覆写，
像这样：

```dart
// Deprecated.
class _MyMaterialTextSelectionControls extends MaterialTextSelectionControls {
  @override
  Widget buildToolbar(
    BuildContext context,
    Rect globalEditableRegion,
    double textLineHeight,
    Offset selectionMidpoint,
    List<TextSelectionPoint> endpoints,
    TextSelectionDelegate delegate,
    ClipboardStatusNotifier clipboardStatus,
    Offset lastSecondaryTapDownPosition,
  ) {
    return _MyCustomToolbar();
  },
}
```

Now you can simply use `contextMenuBuilder` directly as a parameter to
`TextField` (and others). The information provided in the parameters to
`buildToolbar` can be obtained from the `EditableTextState` that is passed to
`contextMenuBuilder`.

现在可以直接把 `contextMenuBuilder` 作为 `TextField`（以及其他 widget）的参数来使用。
`buildToolbar` 参数中提供的信息，
可以从传给 `contextMenuBuilder` 的 `EditableTextState` 中取得。

The following example shows how to build a fully-custom toolbar from scratch
while still using the default buttons.

下面的示例展示如何从零构建一个完全自定义的工具栏，
同时仍然使用默认按钮。

```dart
class _MyContextMenu extends StatelessWidget {
  const _MyContextMenu({
    required this.anchor,
    required this.children,
  });

  final Offset anchor;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Positioned(
          top: anchor.dy,
          left: anchor.dx,
          child: Container(
            width: 200,
            height: 200,
            color: Colors.amberAccent,
            child: Column(
              children: children,
            ),
          ),
        ),
      ],
    );
  }
}

class _MyTextField extends StatelessWidget {
  const _MyTextField();

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: _controller,
      maxLines: 4,
      minLines: 2,
      contextMenuBuilder: (context, editableTextState) {
        return _MyContextMenu(
          anchor: editableTextState.contextMenuAnchors.primaryAnchor,
          children: AdaptiveTextSelectionToolbar.getAdaptiveButtons(
            context,
            editableTextState.contextMenuButtonItems,
          ).toList(),
        );
      },
    );
  }
}
```

A full example of building a custom context menu can be found in the samples
repository in
[`custom_menu_page.dart`]({{site.repo.samples}}/blob/main/context_menus/lib/custom_menu_page.dart)
on GitHub.

构建自定义上下文菜单的完整示例位于示例仓库的
[`custom_menu_page.dart`]({{site.repo.samples}}/blob/main/context_menus/lib/custom_menu_page.dart)，
托管在 GitHub 上。

## Timeline

## 时间线

Landed in version: 3.6.0-0.0.pre<br>
合入版本：3.6.0-0.0.pre<br>
In stable release: 3.7.0

进入稳定版：3.7.0

## References

## 参考资料

API documentation:

API 文档：

* [`TextField.contextMenuBuilder`]({{site.api}}/flutter/material/TextField/contextMenuBuilder.html)
* [`AdaptiveTextSelectionToolbar`]({{site.api}}/flutter/material/AdaptiveTextSelectionToolbar-class.html)

Relevant issues:

相关 issue：

* [Simple custom text selection toolbars]({{site.repo.flutter}}/issues/73574)

  [简单的自定义文本选择工具栏]({{site.repo.flutter}}/issues/73574)

* [Right click menu outside of text fields]({{site.repo.flutter}}/issues/98272)

  [文本字段之外的右键菜单]({{site.repo.flutter}}/issues/98272)

* [Text editing for desktop - stable]({{site.repo.flutter}}/issues/90563)

  [桌面端文本编辑 - 稳定版]({{site.repo.flutter}}/issues/90563)

* [Ability to disable context menu on TextFields]({{site.repo.flutter}}/issues/79796)

  [能够在 TextField 上禁用上下文菜单]({{site.repo.flutter}}/issues/79796)

* [Missing APIs for text selection toolbar styling]({{site.repo.flutter}}/issues/22210)

  [缺少文本选择工具栏样式相关 API]({{site.repo.flutter}}/issues/22210)

* [Enable copy toolbar in all widgets]({{site.repo.flutter}}/issues/49996)

  [在所有 widget 中启用复制工具栏]({{site.repo.flutter}}/issues/49996)

* [Disable context menu from browser]({{site.repo.flutter}}/issues/78671)

  [禁用浏览器的上下文菜单]({{site.repo.flutter}}/issues/78671)

* [Custom context menus don't show up for Flutter web]({{site.repo.flutter}}/issues/84219)

  [自定义上下文菜单在 Flutter web 上不显示]({{site.repo.flutter}}/issues/84219)

Relevant PRs:

相关 PR：

* [ContextMenus]({{site.repo.flutter}}/pull/107193)

  [上下文菜单]({{site.repo.flutter}}/pull/107193)

* [Ability to disable the browser's context menu on web]({{site.repo.flutter}}/pull/118194)

  [能够在 web 上禁用浏览器的上下文菜单]({{site.repo.flutter}}/pull/118194)

* [Ability to disable the browser's context menu on web (engine)]({{site.repo.engine}}/pull/38682)

  [能够在 web 上禁用浏览器的上下文菜单（engine）]({{site.repo.engine}}/pull/38682)

* [Custom context menus in SelectableRegion on web]({{site.repo.flutter}}/pull/121653)

  [web 上 SelectableRegion 中的自定义上下文菜单]({{site.repo.flutter}}/pull/121653)
