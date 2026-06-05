---
# title: Web accessibility
title: Web 无障碍
# description: Information about web accessibility
description: 关于 Web 无障碍的信息
ai-translated: true
---

## Background

## 背景

Flutter supports web accessibility by translating its internal
Semantics tree into an accessible HTML DOM structure that
screen readers can understand.
Since Flutter renders its UI on a single canvas, it needs a special layer
to expose the UI's meaning and structure to web browsers.


Flutter 通过将内部 Semantics 树转换为屏幕阅读器可理解的 HTML DOM 结构来支持 Web 无障碍。由于 Flutter 在单一 canvas 上渲染 UI，需要特殊层向 Web 浏览器暴露 UI 的含义与结构。


## Opt-in web accessibility

## 可选启用的 Web 无障碍

### Invisible button

### 隐形按钮

For performance reasons, Flutter's web accessibility is not on by default.
To turn on accessibility, the user needs to press an invisible button with
`aria-label="Enable accessibility"`.
After pressing the button, the DOM tree will reflect all accessibility
information for the widgets.

出于性能考虑，Flutter 的 Web 无障碍默认未开启。要启用无障碍，用户需按下带有 `aria-label="Enable accessibility"` 的隐形按钮。按下后，DOM 树将反映 widget 的全部无障碍信息。

### Turn on accessibility mode in code

### 在代码中开启无障碍模式

An alternative approach is to turn on accessibility mode
by adding the following code when running an app.

另一种方式是在运行应用时添加以下代码以开启无障碍模式。

```dart
import 'package:flutter/semantics.dart';

void main() {
  runApp(const MyApp());
  if (kIsWeb) {
    SemanticsBinding.instance.ensureSemantics();
  }
}
```



## Enhancing Accessibility with Semantic Roles

## 使用语义角色增强无障碍

### What are Semantic Roles?

### 什么是语义角色？

Semantic roles define the purpose of a UI element, helping screen readers
and other assistive tools interpret and present your application effectively
to users. For example, a role can indicate whether a widget is a button, a link,
a heading, a slider, or part of a table.

语义角色定义 UI 元素的用途，帮助屏幕阅读器和其他辅助工具向用户有效解释和呈现你的应用。例如，角色可表明 widget 是按钮、链接、标题、滑块还是表格的一部分。

While Flutter's standard widgets often provide these semantics automatically,
a custom component without a clearly defined role can be incomprehensible
to a screen reader user.


Flutter 的标准 widget 通常会自动提供这些语义，但没有明确定义角色的自定义 widget 可能对屏幕阅读器用户难以理解。


By assigning appropriate roles, you ensure that:

通过分配合适的角色，你可以确保：

* Screen readers can announce the type and purpose of elements correctly.
* Users can navigate your application more effectively using assistive technologies.
* Your application adheres to web accessibility standards, improving usability.

  屏幕阅读器能正确播报元素的类型与用途。
* 用户能借助辅助技术更高效地在应用中导航。
* 应用符合 Web 无障碍标准，提升可用性。

### Using `SemanticsRole` in Flutter for web

### 在 Flutter Web 中使用 `SemanticsRole`

Flutter provides the [`Semantics` widget][] with the [`SemanticsRole` enum][]
to allow developers to assign specific roles to their widgets. When your
Flutter web app is rendered, these Flutter-specific roles are translated into
corresponding ARIA roles in the web page's HTML structure.

Flutter 提供 [`Semantics` widget][] 与 [`SemanticsRole` enum][]，让开发者为 widget 分配特定角色。Flutter Web 应用渲染时，这些 Flutter 特有角色会转换为网页 HTML 结构中对应的 ARIA 角色。

[`Semantics` widget]: {{site.api}}/flutter/widgets/Semantics-class.html
[`SemanticsRole` enum]: {{site.api}}/flutter/dart-ui/SemanticsRole.html

**1. Automatic Semantics from Standard Widgets**

**1. 标准 widget 的自动语义**

Many standard Flutter widgets, like `TabBar`, `MenuAnchor`, and `Table`,
automatically include semantic information along with their roles.
Whenever possible, prefer using these standard widgets
as they handle many accessibility aspects out-of-the-box.

许多标准 Flutter widget（如 `TabBar`、`MenuAnchor`、`Table`）会自动包含语义信息及其角色。尽可能优先使用这些标准 widget，它们开箱即用地处理许多无障碍方面。

**2. Explicitly adding or overriding roles**

**2. 显式添加或覆盖角色**

For custom components or when the default semantics aren't sufficient,
use the `Semantics` widget to define the role:

对于自定义 widget 或默认语义不足时，使用 `Semantics` widget 定义角色：

Here's an example of how you might explicitly define a list and its items:

以下示例演示如何显式定义列表及其列表项：

```dart
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';


class MyCustomListWidget extends StatelessWidget {
  const MyCustomListWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // This example shows how to explicitly assign list and listitem roles
    // when building a custom list structure.
    return Semantics(
      role: SemanticsRole.list,
      explicitChildNodes: true,
      child: Column(
        children: <Widget>[
          Semantics(
            role: SemanticsRole.listItem,
            child: const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text('Content of the first custom list item.'),
            ),
          ),
          Semantics(
            role: SemanticsRole.listItem,
            child: const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text('Content of the second custom list item.'),
            ),
          ),
        ],
      ),
    );
  }
}
```
