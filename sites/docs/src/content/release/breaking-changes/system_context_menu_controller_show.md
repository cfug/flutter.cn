---
# title: SystemContextMenuController.show Deprecated
title: SystemContextMenuController.show 已弃用
# description: >-
#   `SystemContextMenuController`'s `show` method is deprecated and replaced by
#   its `showWithItems` method.
description: >-
  `SystemContextMenuController` 的 `show` 方法已弃用，
  由 `showWithItems` 方法取代。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

`SystemContextMenuController.show` is deprecated. The same functionality can be
achieved by passing the result of calling `SystemContextMenu.getDefaultItems` to
`SystemContextMenuController.showWithItems`.

`SystemContextMenuController.show` 已弃用。
把 `SystemContextMenu.getDefaultItems` 的调用结果传给
`SystemContextMenuController.showWithItems`，即可实现相同功能。

## Background

## 背景

The iOS-drawn `SystemContextMenu` feature was originally added without the
ability to control which items are shown in the menu. The platform would decide
which items to show based on the active `TextInputConnection`.

最初加入由 iOS 绘制的 `SystemContextMenu` 时，
无法控制菜单中显示哪些项。
平台会根据当前活动的 `TextInputConnection` 决定显示哪些项。

The problem with this approach is that an "Autofill" button is often shown, but
Flutter does not have the ability to respond to this button. So in many cases,
users see an "Autofill" button that does nothing when tapped, and Flutter app
developers have no way to hide the button.

这种做法的问题是经常会显示「自动填充」按钮，
但 Flutter 无法响应该按钮。
因此在很多情况下，用户会看到一个点了没有反应的「自动填充」按钮，
而 Flutter 应用开发者也无法隐藏它。

This problem is solved by introducing a new method,
`SystemContextMenuController.showWithItems`, which requires a list of `items` to
be passed.

新方法 `SystemContextMenuController.showWithItems` 解决了这个问题。
调用时必须传入 `items` 列表。

Developers that have no preference which items are shown can call the new method
`SystemContextMenu.getDefaultItems` to get the default items based on the given
`EditableTextState`. For example, if the `EditableTextState` indicates that
there is nothing selected, then the **Copy** button won't be included, since it
requires a selection to copy.

如果不在意显示哪些项，可以调用新方法
`SystemContextMenu.getDefaultItems`，
根据给定的 `EditableTextState` 获取默认项。
例如，如果 `EditableTextState` 表明没有任何选中内容，
就不会包含 **复制** 按钮，因为复制需要一段选中内容。

## Migration guide

## 迁移指南

Most users use the system context menu through the `SystemContextMenu` widget,
and in this case there will be no change required. The `SystemContextMenu`
widget automatically gets the default items under the hood.

大多数用户通过 `SystemContextMenu` widget 使用系统上下文菜单，
这种情况下无需改动。
`SystemContextMenu` widget 会在内部自动获取默认项。

No migration is needed:

无需迁移：

```dart
class _MyWidgetState extends State<MyWidget> {
  @override
  Widget build(BuildContext context) {
    TextField(
      contextMenuBuilder: (BuildContext context, EditableTextState editableTextState) {
        return SystemContextMenu.editableText(
          editableTextState: editableTextState,
        );
      }
    );
  }
}
```

For advanced users that directly work with `SystemContextMenuController`,
migrate to the new method `SystemContextMenuController.showWithItems`. The
default can be obtained from `SystemContextMenu.getDefaultItems` as a list of
`IOSSystemContextMenuItem`s, which can be converted to the format required by
`showWithItems` through `IOSSystemContextMenuItem.getData`.

直接使用 `SystemContextMenuController` 的进阶用户，
请迁移到新方法 `SystemContextMenuController.showWithItems`。
默认项可以通过 `SystemContextMenu.getDefaultItems` 获取，
结果是 `IOSSystemContextMenuItem` 列表，
再通过 `IOSSystemContextMenuItem.getData`
转换成 `showWithItems` 所需的格式。

Code before migration:

迁移前的代码：

```dart
_controller.show(selectionRect);
```

Code after migration:

迁移后的代码：

```dart
final List<IOSSystemContextMenuItem> defaultItems =
    SystemContextMenu.getDefaultItems(editableTextState);
final WidgetsLocalizations localizations =
    WidgetsLocalizations.of(context);
final List<IOSSystemContextMenuItemData> defaultItemData =
    defaultItems
        .map((IOSSystemContextMenuItem item) =>
            item.getData(localizations))
        .toList();
_controller.showWithItems(selectionRect, defaultItemData);
```

## Timeline

## 时间线

Landed in version: 3.29.0-0.3.pre<br>
In stable release: 3.32

合入版本：3.29.0-0.3.pre<br>
进入稳定版：3.32

## References

## 参考资料

API documentation:

API 文档：

* [`TextInputConnection`][]
* [`SystemContextMenuController.show`][]
* [`SystemContextMenuController.showWithItems`][]
* [`SystemContextMenu`][]

Relevant issues:

相关 issue：

* [Flutter should support iOS 15's Secure Paste feature][]

  Flutter 应支持 iOS 15 的安全粘贴功能：
  [该 issue][Flutter should support iOS 15's Secure Paste feature]

Relevant PRs:

相关 PR：

* [Secure paste milestone 2][]

  [安全粘贴里程碑 2][Secure paste milestone 2]

* [ios secure_paste show menu item based on info sent from framework][]

  iOS secure_paste 根据框架发来的信息显示菜单项：
  [该 PR][ios secure_paste show menu item based on info sent from framework]

* [Native ios context menu][]

  [原生 iOS 上下文菜单][Native ios context menu]

* [ios_edit_menu add native edit menu][]

  [ios_edit_menu 添加原生编辑菜单][ios_edit_menu add native edit menu]

[`TextInputConnection`]: {{site.api}}/flutter/services/TextInputConnection-class.html
[`SystemContextMenuController.show`]: {{site.api}}/flutter/services/SystemContextMenuController/show.html
[`SystemContextMenuController.showWithItems`]: {{site.api}}/flutter/services/SystemContextMenuController/showWithItems.html
[`SystemContextMenu`]: {{site.api}}/flutter/services/SystemContextMenu.html

[Secure paste milestone 2]: {{site.repo.flutter}}/pull/159013
[ios secure_paste show menu item based on info sent from framework]: {{site.repo.engine}}/pull/161103
[Native ios context menu]: {{site.repo.flutter}}/pull/143002
[ios_edit_menu add native edit menu]: {{site.repo.flutter}}/pull/50095
[Flutter should support iOS 15's Secure Paste feature]: {{site.repo.flutter}}/issues/103163
