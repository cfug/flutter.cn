---
title: Introduction to declarative UI
title: 声明式 UI 介绍
short-title: Declarative UI
short-title: 声明式 UI
description: Explains the difference between a declarative and imperative programming style.
description: 描述和解释声明式和命令式编程思想的差异。
tags: Flutter教程,Flutter起步,Flutter入门
keywords: 概览,声明式编程,响应式编程,UI框架
---

_This introduction describes the conceptual difference between the
declarative style used by Flutter, and the imperative style used by
many other UI frameworks._

**这篇介绍描述了 Flutter 所使用的声明式 UI 和许多其他 UI 框架所使用的命令式 UI 的概念性差异**

## Why a declarative UI?

## 为什么是声明式 UI？

Frameworks from Win32 to web to Android and iOS typically use an imperative
style of UI programming. This might be the style you’re most familiar
with&mdash;where you manually construct a full-functioned UI entity,
such as a UIView or equivalent, and later mutate it using methods and
setters when the UI changes.

从 Win32 到 Web 再到 Android 和 iOS，
框架通常使用一种命令式的编程风格来完成 UI 编程。
这可能是你最熟悉的风格 &mdash; 
你手动构建一个全功能的 UI 实例，
比如一个 UIView 或其他类似的，
在随后 UI 发生变化时，使用方法或 Setter 修改它。

In order to lighten the burden on developers from having to program how to
transition between various UI states, Flutter, by contrast,
lets the developer describe the current UI state and leaves the
transitioning to the framework.

为了减轻开发人员的负担，无需编写如何在不同的 UI 状态之间进行切换的代码，
Flutter 相反，让开发人员描述当前的 UI 状态，并将转换交给框架。

This, however, requires a slight shift in thinking for how to manipulate UI.

然而，这需要稍微改变下如何操作 UI 的思考方式

## How to change UI in a declarative framework
## 如何在命令式框架中修改 UI

Consider a simplified example below:

思考像下面这样一个简单的例子:

<img src="/images/declarativeUIchanges.png" alt="View B (contained by view A) morphs from containing two views, c1 and c2, to containing only view c3">

In the imperative style, you would typically go to ViewB’s owner
and retrieve the instance `b` using selectors or with `findViewById` or similar,
and invoke mutations on it (and implicitly invalidate it). For example:

在命令式风格中，你通常需要使用选择器 `findViewById` 
或类似函数获取到 ViewB 的实例 `b` 和所有权，
并调用相关的修改的方法（并隐式的使其失效）。例如：

```java
// Imperative style
b.setColor(red)
b.clearChildren()
ViewC c3 = new ViewC(...)
b.add(c3)
```

You might also need to replicate this configuration in the constructor of
ViewB since the source of truth for the UI might outlive instance `b` itself.

由于 UI 真实的来源可能比实例 `b` 本身的存活周期更长，
你可能还需要在 ViewB 的构造函数中复制此配置。

In the declarative style, view configurations (such as Flutter’s Widgets)
are immutable and are only lightweight "blueprints". To change the UI,
a widget triggers a rebuild on itself (most commonly by calling `setState()`
on StatefulWidgets in Flutter) and constructs a new Widget subtree.

在声明式风格中，视图配置（如 Flutter 的 Widget ）是不可变的，
它只是轻量的“蓝图”。要改变 UI，widget 会在自身上触发重建
（在 Flutter 中最常见的方法是在 StatefulWidgets 组件上调用 `setState()`）
并构造一个新的 Widget 子树。


<!-- skip -->
```dart
// Declarative style
return ViewB(
  color: red,
  child: ViewC(...),
)
```

Here, rather than mutating an old instance `b` when the UI changes,
Flutter constructs new Widget instances. The framework manages many of the
responsibilities of a traditional UI object (such as maintaining the
state of the layout) behind the scenes with RenderObjects.
RenderObjects persist between frames and Flutter’s lightweight Widgets
tell the framework to mutate the RenderObjects between states.
The Flutter framework handles the rest.

在这里，当用户界面发生变化时，Flutter 不会修改旧的实例 `b`，
而是构造新的 widget 实例。
框架使用 RenderObjects 管理传统 UI 对象的职责（比如维护布局的状态）。
RenderObjects 在帧之间保持不变，
Flutter 的轻量级 widget 通知框架在状态之间修改 RenderObjects，
Flutter 框架则处理其余部分。
