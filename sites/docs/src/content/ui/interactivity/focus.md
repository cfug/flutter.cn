---
# title: Understanding Flutter's keyboard focus system
title: 理解 Flutter 的键盘焦点系统
# description: How to use the focus system in your Flutter app.
description: 如何在你的 Flutter 应用中使用焦点系统。
ai-translated: true
---

This article explains how to control where keyboard input is directed. If you
are implementing an application that uses a physical keyboard, such as most
desktop and web applications, this page is for you. If your app won't be used
with a physical keyboard, you can skip this.

本文说明如何控制键盘输入的指向。若你正在实现使用物理键盘的应用（例如大多数桌面和 Web 应用），本页适合你。若你的应用不会配合物理键盘使用，可以跳过本文。

## Overview

## 概览

Flutter comes with a focus system that directs the keyboard input to a
particular part of an application. In order to do this, users "focus" the input
onto that part of an application by tapping or clicking the desired UI element.
Once that happens, text entered with the keyboard flows to that part of the
application until the focus moves to another part of the application.  Focus can
also be moved by pressing a particular keyboard shortcut, which is typically
bound to <kbd>Tab</kbd>, so it is sometimes called "tab traversal".

Flutter 自带焦点系统，将键盘输入导向应用的特定部分。为此，用户通过点击或点按所需的 UI 元素，将输入「焦点」到应用的该部分。之后，键盘输入的文字会流向该部分，直到焦点移到应用的其他部分。焦点也可以通过按下特定键盘快捷键来移动，通常绑定到 <kbd>Tab</kbd>，因此有时称为「Tab 遍历」（tab traversal）。

This page explores the APIs used to perform these operations on a Flutter
application, and how the focus system works. We have noticed that there is some
confusion among developers about how to define and use [`FocusNode`][] objects.
If that describes your experience, skip ahead to the [best practices for
creating `FocusNode` objects](#best-practices-for-creating-focusnode-objects).

本页探讨在 Flutter 应用中执行这些操作所用的 API，以及焦点系统的工作原理。我们注意到开发者在如何定义和使用 [`FocusNode`][] 对象方面存在一些困惑。若你也有类似经历，请跳转到[创建 `FocusNode` 对象的最佳实践](#best-practices-for-creating-focusnode-objects)。

### Focus use cases

### 焦点使用场景

Some examples of situations where you might need to know how to use the focus
system:

以下是你可能需要了解如何使用焦点系统的一些场景示例：

- [Receiving/handling key events](#key-events)
- [Implementing a custom component that needs to be focusable](#focus-widget)
- [Receiving notifications when the focus changes](#change-notifications)
- [Changing or defining the "tab order" of focus traversal in an application](#focustraversalpolicy)
- [Defining groups of controls that should be traversed together](#focustraversalgroup-widget)
- [Preventing some controls in an application from being focusable](#controlling-what-gets-focus)

- [接收/处理按键事件](#key-events)
- [实现需要可获得焦点的自定义 widget](#focus-widget)
- [在焦点变化时接收通知](#change-notifications)
- [更改或定义应用中焦点遍历的「Tab 顺序」](#focustraversalpolicy)
- [定义应一起遍历的控件组](#focustraversalgroup-widget)
- [阻止应用中某些控件获得焦点](#controlling-what-gets-focus)

## Glossary

## 术语表

Below are terms, as Flutter uses them, for elements of the focus system. The
various classes that implement some of these concepts are introduced below.

以下是 Flutter 对焦点系统各元素的术语定义。实现其中部分概念的各种类将在下文介绍。

- **Focus tree** - A tree of focus nodes that typically sparsely mirrors the
  widget tree, representing all the widgets that can receive focus.
- **Focus node** - A single node in a focus tree. This node can receive the
  focus, and is said to "have focus" when it is part of the focus chain. It
  participates in handling key events only when it has focus.
- **Primary focus** - The farthest focus node from the root of the focus tree
  that has focus. This is the focus node where key events start propagating to
  the primary focus node and its ancestors.
- **Focus chain** - An ordered list of focus nodes that starts at the primary
  focus node and follows the branches of the focus tree to the root of the
  focus tree.
- **Focus scope** - A special focus node whose job is to contain a group of
  other focus nodes, and allow only those nodes to receive focus. It contains
  information about which nodes were previously focused in its subtree.
- **Focus traversal** - The process of moving from one focusable node to
  another in a predictable order. This is typically seen in applications when
  the user presses <kbd>Tab</kbd> to move to the next focusable control or
  field.

- **焦点树（Focus tree）** — 焦点节点组成的树，通常稀疏地镜像 widget 树，表示所有可获得焦点的 widget。
- **焦点节点（Focus node）** — 焦点树中的单个节点。该节点可获得焦点；当它属于焦点链时，称为「拥有焦点」。仅在拥有焦点时参与处理按键事件。
- **主焦点（Primary focus）** — 焦点树中距离根最远且拥有焦点的焦点节点。按键事件从该节点开始向主焦点节点及其祖先传播。
- **焦点链（Focus chain）** — 从主焦点节点开始、沿焦点树分支直至根的有序焦点节点列表。
- **焦点作用域（Focus scope）** — 特殊焦点节点，用于包含一组其他焦点节点，并仅允许这些节点获得焦点。它保存其子树中先前获得焦点的节点信息。
- **焦点遍历（Focus traversal）** — 按可预测顺序从一个可获得焦点的节点移动到另一个的过程。通常在用户按 <kbd>Tab</kbd> 移到下一个可获得焦点的控件或字段时出现。

## FocusNode and FocusScopeNode

## FocusNode 与 FocusScopeNode

The `FocusNode` and [`FocusScopeNode`][] objects implement the
mechanics of the focus system. They are long-lived objects (longer than widgets,
similar to render objects) that hold the focus state and attributes so that they
are persistent between builds of the widget tree. Together, they form
the focus tree data structure.

`FocusNode` 和 [`FocusScopeNode`][] 对象实现焦点系统的机制。它们是长生命周期对象（比 widget 更持久，类似 render 对象），保存焦点状态与属性，从而在 widget 树多次构建之间保持持久。它们共同构成焦点树数据结构。

They were originally intended to be developer-facing objects used to control
some aspects of the focus system, but over time they have evolved to mostly
implement details of the focus system. In order to prevent breaking existing
applications, they still contain public interfaces for their attributes. But, in
general, the thing for which they are most useful is to act as a relatively
opaque handle, passed to a descendant widget in order to call `requestFocus()`
on an ancestor widget, which requests that a descendant widget obtain focus.
Setting of the other attributes is best managed by a [`Focus`][] or
[`FocusScope`][] widget, unless you are not using them, or implementing your own
version of them.

它们最初旨在作为面向开发者的对象，用于控制焦点系统的某些方面，但随着时间推移，已大多演变为实现焦点系统细节。为避免破坏现有应用，它们仍保留属性的公开接口。但一般而言，它们最有用的用途是作为相对不透明的句柄，传给子 widget，以便在祖先 widget 上调用 `requestFocus()`，请求子 widget 获得焦点。其他属性的设置最好由 [`Focus`][] 或 [`FocusScope`][] widget 管理，除非你未使用它们，或正在实现自己的版本。

### Best practices for creating FocusNode objects

### 创建 FocusNode 对象的最佳实践

Some dos and don'ts around using these objects include:

使用这些对象时的一些建议与禁忌包括：

- Don't allocate a new `FocusNode` for each build.  This can cause
  memory leaks, and occasionally causes a loss of focus when the widget
  rebuilds while the node has focus.
- Do create `FocusNode` and `FocusScopeNode` objects in a stateful widget.
  `FocusNode` and `FocusScopeNode` need to be disposed of when you're done
  using them, so they should only be created inside of a stateful widget's
  state object, where you can override `dispose` to dispose of them.
- Don't use the same `FocusNode` for multiple widgets. If you do, the
  widgets will fight over managing the attributes of the node, and you
  probably won't get what you expect.
- Do set the `debugLabel` of a focus node widget to help with diagnosing
  focus issues.
- Don't set the `onKeyEvent` callback on a `FocusNode` or `FocusScopeNode` if
  they are being managed by a `Focus` or `FocusScope` widget.
  If you want an `onKeyEvent` handler, then add a new `Focus` widget
  around the widget subtree you would like to listen to, and
  set the `onKeyEvent` attribute of the widget to your handler.
  Set `canRequestFocus: false` on the widget if
  you also don't want it to be able to take primary focus.
  This is because the `onKeyEvent` attribute on the `Focus` widget can be
  set to something else in a subsequent build, and if that happens,
  it overwrites the `onKeyEvent` handler you set on the node.
- Do call `requestFocus()` on a node to request that it receives the
  primary focus, especially from an ancestor that has passed a node it owns to
  a descendant where you want to focus.
- Do use `focusNode.requestFocus()`. It is not necessary to call
  `FocusScope.of(context).requestFocus(focusNode)`. The
  `focusNode.requestFocus()` method is equivalent and more performant.

- 不要在每次 build 时分配新的 `FocusNode`。这可能导致内存泄漏，且当节点拥有焦点时 widget 重建偶尔会导致失去焦点。
- 应在有状态 widget 中创建 `FocusNode` 和 `FocusScopeNode` 对象。使用完毕后需要 dispose，因此应只在有状态 widget 的 state 对象内创建，以便在 `dispose` 中释放它们。
- 不要对多个 widget 使用同一个 `FocusNode`。否则 widget 会争夺节点属性的管理权，结果往往不符合预期。
- 应设置焦点节点 widget 的 `debugLabel`，以便诊断焦点问题。
- 若 `FocusNode` 或 `FocusScopeNode` 由 `Focus` 或 `FocusScope` widget 管理，不要在其上设置 `onKeyEvent` 回调。若需要 `onKeyEvent` 处理器，在你想监听的 widget 子树外再包一层 `Focus` widget，并将该 widget 的 `onKeyEvent` 属性设为你的处理器。若你也不希望它能获得主焦点，将 widget 的 `canRequestFocus` 设为 false。这是因为 `Focus` widget 的 `onKeyEvent` 属性可能在后续 build 中被设为其他值，从而覆盖你在节点上设置的 `onKeyEvent` 处理器。
- 应在节点上调用 `requestFocus()` 以请求其获得主焦点，尤其是从已将自有节点传给子代的祖先处，在你希望获得焦点的子代上调用。
- 应使用 `focusNode.requestFocus()`。不必调用 `FocusScope.of(context).requestFocus(focusNode)`。`focusNode.requestFocus()` 方法等价且性能更好。

### Unfocusing

### 取消焦点

There is an API for telling a node to "give up the focus", named
`FocusNode.unfocus()`. While it does remove focus from the node, it is important
to realize that there really is no such thing as "unfocusing" all nodes. If a
node is unfocused, then it must pass the focus somewhere else, since there is
_always_ a primary focus. The node that receives the focus when a node calls
`unfocus()` is either the nearest `FocusScopeNode`, or a previously focused node
in that scope, depending upon the `disposition` argument given to `unfocus()`.
If you would like more control over where the focus goes when you remove it from
a node, explicitly focus another node instead of calling `unfocus()`, or use the
focus traversal mechanism to find another node with the `focusInDirection`,
`nextFocus`, or `previousFocus` methods on `FocusNode`.

有一个 API 用于让节点「放弃焦点」，名为 `FocusNode.unfocus()`。虽然它会从该节点移除焦点，但重要的是要理解，并不存在真正「取消所有节点焦点」这回事。若某节点失去焦点，焦点必须转移到别处，因为*始终*存在主焦点。节点调用 `unfocus()` 时接收焦点的节点，取决于传给 `unfocus()` 的 `disposition` 参数，要么是最近的 `FocusScopeNode`，要么是该作用域内先前拥有焦点的节点。若你想更精确地控制从某节点移除焦点后焦点去向，应显式让另一节点获得焦点，而不是调用 `unfocus()`，或使用焦点遍历机制，通过 `FocusNode` 上的 `focusInDirection`、`nextFocus` 或 `previousFocus` 方法找到另一节点。

When calling `unfocus()`, the `disposition` argument allows two modes for
unfocusing: [`UnfocusDisposition.scope`][] and
`UnfocusDisposition.previouslyFocusedChild`. The default is `scope`, which gives
the focus to the nearest parent focus scope. This means that if the focus is
thereafter moved to the next node with `FocusNode.nextFocus`, it starts with the
"first" focusable item in the scope.

调用 `unfocus()` 时，`disposition` 参数提供两种取消焦点模式：[`UnfocusDisposition.scope`][] 和 `UnfocusDisposition.previouslyFocusedChild`。默认为 `scope`，将焦点交给最近的父焦点作用域。这意味着若之后用 `FocusNode.nextFocus` 将焦点移到下一节点，会从作用域内「第一个」可获得焦点的项开始。

The `previouslyFocusedChild` disposition will search the scope to find the
previously focused child and request focus on it. If there is no previously
focused child, it is equivalent to `scope`.

`previouslyFocusedChild` 处置会在作用域内查找先前拥有焦点的子节点并请求其获得焦点。若没有先前拥有焦点的子节点，则与 `scope` 等价。

:::secondary Beware
If there is no other scope, then focus moves to the root scope node of
the focus system, `FocusManager.rootScope`. This is generally not desirable, as
the root scope doesn't have a `context` for the framework to determine which
node should be focused next. If you find that your application suddenly loses
the ability to navigate by using focus traversal, this is probably what has
happened.  To fix it, add a `FocusScope` as an ancestor to the focus node that
is requesting the unfocus. The `WidgetsApp` (from which `MaterialApp` and
`CupertinoApp` are derived) has its own `FocusScope`, so this should not be an
issue if you are using those.
:::

:::secondary 注意
若没有其他作用域，焦点会移到焦点系统的根作用域节点 `FocusManager.rootScope`。这通常不理想，因为根作用域没有 `context`，框架无法确定下一个应获得焦点的节点。若你发现应用突然无法通过焦点遍历导航，可能就是发生了这种情况。修复方法是在请求取消焦点的焦点节点的祖先处添加 `FocusScope`。`WidgetsApp`（`MaterialApp` 和 `CupertinoApp` 均派生自它）自带 `FocusScope`，因此若你使用这些应用壳，一般不会有此问题。
:::

## Focus widget

## Focus widget

The `Focus` widget owns and manages a focus node, and is the workhorse of the
focus system.  It manages the attaching and detaching of the focus node it owns
from the focus tree, manages the attributes and callbacks of the focus node, and
has static functions to enable discovery of focus nodes attached to the widget
tree.

`Focus` widget 拥有并管理焦点节点，是焦点系统的主力。它管理其拥有的焦点节点在焦点树上的挂载与卸载，管理焦点节点的属性与回调，并提供静态函数以便发现挂载在 widget 树上的焦点节点。

In its simplest form, wrapping the `Focus` widget around a widget subtree allows
that widget subtree to obtain focus as part of the focus traversal process, or
whenever `requestFocus` is called on the `FocusNode` passed to it. When combined
with a gesture detector that calls `requestFocus`, it can receive focus when
tapped or clicked.

最简单用法是用 `Focus` widget 包裹 widget 子树，使该子树在焦点遍历过程中，或在传入的 `FocusNode` 上调用 `requestFocus` 时获得焦点。若与调用 `requestFocus` 的手势检测器配合，可在点按或点击时获得焦点。

You might pass a `FocusNode` object to the `Focus` widget to manage, but if you
don't, it creates its own. The main reason to create your own
`FocusNode` is to be able to call `requestFocus()`
on the node to control the focus from a parent widget. Most of the other
functionality of a `FocusNode` is best accessed by changing the attributes of
the `Focus` widget itself.

你可以将 `FocusNode` 对象传给 `Focus` widget 由其管理；若不传，它会自行创建。自行创建 `FocusNode` 的主要原因是从父 widget 在节点上调用 `requestFocus()` 以控制焦点。`FocusNode` 的其他大部分功能最好通过修改 `Focus` widget 自身的属性来访问。

The `Focus` widget is used in most of Flutter's own controls to implement their
focus functionality.

Flutter 的大多数内置控件都使用 `Focus` widget 实现其焦点功能。

Here is an example showing how to use the `Focus` widget to make a custom
control focusable. It creates a container with text that reacts to receiving the
focus.

下面示例展示如何使用 `Focus` widget 使自定义控件可获得焦点。它创建一个带文字的容器，在获得焦点时做出反应。

<?code-excerpt "ui/focus/lib/custom_control_example.dart"?>
```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  static const String _title = 'Focus Sample';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      home: Scaffold(
        appBar: AppBar(title: const Text(_title)),
        body: const Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[MyCustomWidget(), MyCustomWidget()],
        ),
      ),
    );
  }
}

class MyCustomWidget extends StatefulWidget {
  const MyCustomWidget({super.key});

  @override
  State<MyCustomWidget> createState() => _MyCustomWidgetState();
}

class _MyCustomWidgetState extends State<MyCustomWidget> {
  Color _color = Colors.white;
  String _label = 'Unfocused';

  @override
  Widget build(BuildContext context) {
    return Focus(
      onFocusChange: (focused) {
        setState(() {
          _color = focused ? Colors.black26 : Colors.white;
          _label = focused ? 'Focused' : 'Unfocused';
        });
      },
      child: Center(
        child: Container(
          width: 300,
          height: 50,
          alignment: Alignment.center,
          color: _color,
          child: Text(_label),
        ),
      ),
    );
  }
}
```

### Key events

### 按键事件

If you wish to listen for key events in a subtree,
set the `onKeyEvent` attribute of the `Focus` widget to
be a handler that either just listens to the key, or
handles the key and stops its propagation to other widgets.

若要在子树中监听按键事件，将 `Focus` widget 的 `onKeyEvent` 属性设为处理器，该处理器仅监听按键，或处理按键并阻止其向其他 widget 传播。

Key events start at the focus node with primary focus.
If that node doesn't return `KeyEventResult.handled` from
its `onKeyEvent` handler, then its parent focus node is given the event.
If the parent doesn't handle it, it goes to its parent,
and so on, until it reaches the root of the focus tree.
If the event reaches the root of the focus tree without being handled, then
it is returned to the platform to give to
the next native control in the application
(in case the Flutter UI is part of a larger native application UI).
Events that are handled are not propagated to other Flutter widgets,
and they are also not propagated to native widgets.

按键事件从拥有主焦点的焦点节点开始。若该节点的 `onKeyEvent` 处理器未返回 `KeyEventResult.handled`，则事件交给其父焦点节点。若父节点未处理，则继续向上，直至焦点树根。若事件到达焦点树根仍未被处理，则返回平台，交给应用中的下一个原生控件（当 Flutter UI 是更大原生应用 UI 的一部分时）。已处理的事件不会传播到其他 Flutter widget，也不会传播到原生 widget。

Here's an example of a `Focus` widget that absorbs every key that
its subtree doesn't handle, without being able to be the primary focus:

下面是一个 `Focus` widget 示例，它吸收子树未处理的每个按键，且自身不能成为主焦点：

<?code-excerpt "ui/focus/lib/samples.dart (absorb-keys)"?>
```dart
@override
Widget build(BuildContext context) {
  return Focus(
    onKeyEvent: (node, event) => KeyEventResult.handled,
    canRequestFocus: false,
    child: child,
  );
}
```

Focus key events are processed before text entry events, so handling a key event
when the focus widget surrounds a text field prevents that key from being
entered into the text field.

焦点按键事件在文本输入事件之前处理，因此在焦点 widget 包裹文本字段时处理按键事件会阻止该键输入到文本字段。

Here's an example of a widget that won't allow the letter "a" to be typed into
the text field:

下面是一个不允许在文本字段中输入字母「a」的 widget 示例：

<?code-excerpt "ui/focus/lib/samples.dart (no-letter-a)"?>
```dart
@override
Widget build(BuildContext context) {
  return Focus(
    onKeyEvent: (node, event) {
      return (event.logicalKey == LogicalKeyboardKey.keyA)
          ? KeyEventResult.handled
          : KeyEventResult.ignored;
    },
    child: const TextField(),
  );
}
```

If the intent is input validation, this example's functionality would probably
be better implemented using a `TextInputFormatter`, but the technique can still
be useful: the `Shortcuts` widget uses this method to handle shortcuts before
they become text input, for instance.

若目的是输入校验，该示例功能用 `TextInputFormatter` 实现可能更合适，但该技巧仍有用处：例如 `Shortcuts` widget 用此方法在快捷键成为文本输入之前处理它们。

### Controlling what gets focus

### 控制哪些可获得焦点

One of the main aspects of focus is controlling what can receive focus and how.
The attributes `canRequestFocus`, `skipTraversal,` and `descendantsAreFocusable`
control how this node and its descendants participate in the focus process.

焦点的主要方面之一是控制什么可以获得焦点以及如何获得。属性 `canRequestFocus`、`skipTraversal` 和 `descendantsAreFocusable` 控制该节点及其子代如何参与焦点过程。

If the `skipTraversal` attribute true, then this focus node doesn't participate
in focus traversal. It is still focusable if `requestFocus` is called on its
focus node, but is otherwise skipped when the focus traversal system is looking
for the next thing to focus on.

若 `skipTraversal` 属性为 true，则该焦点节点不参与焦点遍历。若在其焦点节点上调用 `requestFocus`，仍可获得焦点，但在焦点遍历系统寻找下一个焦点目标时会被跳过。

The `canRequestFocus` attribute, unsurprisingly, controls whether or not the
focus node that this `Focus` widget manages can be used to request focus. If
this attribute is false, then calling `requestFocus` on the node has no effect.
It also implies that this node is skipped for focus traversal, since it can't
request focus.

`canRequestFocus` 属性（顾名思义）控制该 `Focus` widget 管理的焦点节点是否可用于请求焦点。若该属性为 false，在节点上调用 `requestFocus` 无效。这也意味着该节点在焦点遍历中被跳过，因为它无法请求焦点。

The `descendantsAreFocusable` attribute controls whether the descendants of this
node can receive focus, but still allows this node to receive focus.  This
attribute can be used to turn off focusability for an entire widget subtree.
This is how the `ExcludeFocus` widget works: it's just a `Focus` widget with
this attribute set.

`descendantsAreFocusable` 属性控制该节点的子代是否可获得焦点，但仍允许该节点自身获得焦点。该属性可用于关闭整个 widget 子树的焦点能力。`ExcludeFocus` widget 就是这样工作的：它只是将该属性设好的 `Focus` widget。

### Autofocus

### 自动焦点

Setting the `autofocus` attribute of a `Focus` widget tells the widget to
request the focus the first time the focus scope it belongs to is focused.  If
more than one widget has `autofocus` set, then it is arbitrary which one
receives the focus, so try to only set it on one widget per focus scope.

将 `Focus` widget 的 `autofocus` 属性设为 true 会告诉 widget 在其所属焦点作用域第一次获得焦点时请求焦点。若有多个 widget 设置了 `autofocus`，哪个获得焦点是任意的，因此尽量每个焦点作用域只在一个 widget 上设置。

The `autofocus` attribute only takes effect if there isn't already a focus in
the scope that the node belongs to.

仅当节点所属作用域内尚无焦点时，`autofocus` 属性才会生效。

Setting the `autofocus` attribute on two nodes that belong to different focus
scopes is well defined: each one becomes the focused widget when their
corresponding scopes are focused.

在两个属于不同焦点作用域的节点上设置 `autofocus` 是明确定义的：各自在对应作用域获得焦点时成为获得焦点的 widget。

### Change notifications

### 变化通知

The `Focus.onFocusChanged` callback can be used to get notifications that the
focus state for a particular node has changed. It notifies if the node is added
to or removed from the focus chain, which means it gets notifications even if it
isn't the primary focus. If you only want to know if you have received the
primary focus, check and see if `hasPrimaryFocus` is true on the focus node.

`Focus.onFocusChanged` 回调可用于在特定节点的焦点状态变化时收到通知。节点被加入或移出焦点链时都会通知，这意味着即使不是主焦点也会收到通知。若你只想知道是否获得了主焦点，请检查焦点节点上的 `hasPrimaryFocus` 是否为 true。

### Obtaining the FocusNode

### 获取 FocusNode

Sometimes, it is useful to obtain the focus node of a `Focus` widget to
interrogate its attributes.

有时需要获取 `Focus` widget 的焦点节点以查询其属性。

To access the focus node from an ancestor of the `Focus` widget, create and pass
in a `FocusNode` as the `Focus` widget's `focusNode` attribute. Because it needs
to be disposed of, the focus node you pass needs to be owned by a stateful
widget, so don't just create one each time it is built.

要从 `Focus` widget 的祖先访问焦点节点，创建 `FocusNode` 并作为 `Focus` widget 的 `focusNode` 属性传入。因其需要 dispose，你传入的焦点节点应由有状态 widget 拥有，不要在每次 build 时新建。

If you need access to the focus node from the descendant of a `Focus` widget,
you can call `Focus.of(context)` to obtain the focus node of the nearest `Focus
`widget to the given context. If you need to obtain the `FocusNode` of a `Focus`
widget within the same build function, use a [`Builder`][] to make sure you have
the correct context. This is shown in the following example:

若要从 `Focus` widget 的子代访问焦点节点，可调用 `Focus.of(context)` 获取距给定 context 最近的 `Focus` widget 的焦点节点。若要在同一 build 函数内获取 `Focus` widget 的 `FocusNode`，请使用 [`Builder`][] 确保 context 正确。如下例所示：

<?code-excerpt "ui/focus/lib/samples.dart (builder)"?>
```dart
@override
Widget build(BuildContext context) {
  return Focus(
    child: Builder(
      builder: (context) {
        final bool hasPrimary = Focus.of(context).hasPrimaryFocus;
        print('Building with primary focus: $hasPrimary');
        return const SizedBox(width: 100, height: 100);
      },
    ),
  );
}
```

### Timing

### 时机

One of the details of the focus system is that when focus is requested, it only
takes effect after the current build phase completes.  This means that focus
changes are always delayed by one frame, because changing focus can
cause arbitrary parts of the widget tree to rebuild, including ancestors of the
widget currently requesting focus. Because descendants cannot dirty their
ancestors, it has to happen between frames, so that any needed changes can
happen on the next frame.

焦点系统的一个细节是：请求焦点时，仅在当前 build 阶段完成后才生效。这意味着焦点变化总是延迟一帧，因为改变焦点可能导致 widget 树任意部分（包括当前请求焦点的 widget 的祖先）重建。子代不能使祖先变脏，因此必须在帧之间进行，以便所需变化在下一帧发生。

## FocusScope widget

## FocusScope widget

The `FocusScope` widget is a special version of the `Focus` widget that manages
a `FocusScopeNode` instead of a `FocusNode`.  The `FocusScopeNode` is a special
node in the focus tree that serves as a grouping mechanism for the focus nodes
in a subtree. Focus traversal stays within a focus scope unless a node outside
of the scope is explicitly focused.

`FocusScope` widget 是 `Focus` widget 的特殊版本，管理 `FocusScopeNode` 而非 `FocusNode`。`FocusScopeNode` 是焦点树中的特殊节点，作为子树中焦点节点的分组机制。除非显式聚焦作用域外的节点，否则焦点遍历停留在焦点作用域内。

The focus scope also keeps track of the current focus and history of the nodes
focused within its subtree.  That way, if a node releases focus or is removed
when it had focus, the focus can be returned to the node that had focus
previously.

焦点作用域还跟踪其子树内当前焦点及曾获得焦点的节点历史。这样，若某节点在拥有焦点时释放焦点或被移除，焦点可返回到先前拥有焦点的节点。

Focus scopes also serve as a place to return focus to if none of the descendants
have focus.  This allows the focus traversal code to have a starting context for
finding the next (or first) focusable control to move to.

当没有子代拥有焦点时，焦点作用域也作为焦点返回的落脚点。这使焦点遍历代码有起始上下文，用于查找下一个（或第一个）可移到的可获得焦点的控件。

If you focus a focus scope node, it first attempts to focus the current, or most
recently focused node in its subtree, or the node in its subtree that requested
autofocus (if any).  If there is no such node, it receives the focus itself.

若你聚焦焦点作用域节点，它会先尝试聚焦其子树中当前或最近拥有焦点的节点，或请求了 autofocus 的节点（若有）。若没有此类节点，则由作用域节点自身获得焦点。

## FocusableActionDetector widget

## FocusableActionDetector widget

The [`FocusableActionDetector`][] is a widget that combines the functionality of
[`Actions`][], [`Shortcuts`][], [`MouseRegion`][] and a `Focus` widget to create
a detector that defines actions and key bindings, and provides callbacks for
handling focus and hover highlights. It is what Flutter controls use to
implement all of these aspects of the controls. It is just implemented using the
constituent widgets, so if you don't need all of its functionality, you can just
use the ones you need, but it is a convenient way to build these behaviors into
your custom controls.

[`FocusableActionDetector`][] 是将 [`Actions`][]、[`Shortcuts`][]、[`MouseRegion`][] 与 `Focus` widget 的功能组合在一起的 widget，用于创建定义动作与按键绑定、并提供处理焦点与悬停高亮回调的检测器。Flutter 控件用它实现控件的上述所有方面。它仅用组成 widget 实现，因此若你不需要全部功能，可只使用需要的部分，但它是将这些行为融入自定义控件的便捷方式。

:::note
To learn more, watch this short Widget of the Week video on
the `FocusableActionDetector` widget:

<YouTubeEmbed id="R84AGg0lKs8" title="FocusableActionDetector - Flutter widget of the week"></YouTubeEmbed>
:::

:::note
想了解更多，请观看关于 `FocusableActionDetector` widget 的简短「每周 Widget」视频：

<YouTubeEmbed id="R84AGg0lKs8" title="FocusableActionDetector - Flutter widget of the week"></YouTubeEmbed>
:::

## Controlling focus traversal

## 控制焦点遍历

Once an application has the ability to focus, the next thing many apps want to
do is to allow the user to control the focus using the keyboard or another input
device. The most common example of this is "tab traversal" where the user
presses <kbd>Tab</kbd> to go to the "next" control. Controlling what "next"
means is the subject of this section. This kind of traversal is provided by
Flutter by default.

应用具备焦点能力后，许多应用接下来希望让用户用键盘或其他输入设备控制焦点。最常见的是「Tab 遍历」：用户按 <kbd>Tab</kbd> 移到「下一个」控件。控制「下一个」的含义是本节主题。Flutter 默认提供此类遍历。

In a simple grid layout, it's fairly easy to decide which control is next. If
you're not at the end of the row, then it's the one to the right (or left for
right-to-left locales). If you are at the end of a row, it's the first control
in the next row. Unfortunately, applications are rarely laid out in grids, so
more guidance is often needed.

在简单网格布局中，较容易决定下一个控件。若不在行末，则是右侧（从右到左语言环境则为左侧）的控件。若在行末，则是下一行第一个控件。遗憾的是，应用很少按网格布局，因此往往需要更多指引。

The default algorithm in Flutter ([`ReadingOrderTraversalPolicy`][]) for focus
traversal is pretty good: It gives the right answer for most applications.
However, there are always pathological cases, or cases where the context or
design requires a different order than the one the default ordering algorithm
arrives at. For those cases, there are other mechanisms for achieving the
desired order.

Flutter 用于焦点遍历的默认算法（[`ReadingOrderTraversalPolicy`][]）相当好：对大多数应用能给出正确结果。但总有极端情况，或上下文/设计要求的顺序与默认排序算法不同。对这些情况，有其他机制可实现所需顺序。

### FocusTraversalGroup widget

### FocusTraversalGroup widget

The [`FocusTraversalGroup`][] widget should be placed in the tree around widget
subtrees that should be fully traversed before moving on to another widget or
group of widgets. Just grouping widgets into related groups is often enough to
resolve many tab traversal ordering problems. If not, the group can also be
given a [`FocusTraversalPolicy`][] to determine the ordering within the group.

[`FocusTraversalGroup`][] widget 应放在 widget 树中，包裹应在移到其他 widget 或 widget 组之前完整遍历的 widget 子树。仅将 widget 分组为相关组往往足以解决许多 Tab 遍历顺序问题。若不够，还可为组指定 [`FocusTraversalPolicy`][] 以确定组内顺序。

The default [`ReadingOrderTraversalPolicy`][] is usually sufficient, but in
cases where more control over ordering is needed, an
[`OrderedTraversalPolicy`][] can be used. The `order` argument of the
[`FocusTraversalOrder`][] widget wrapped around the focusable components
determines the order. The order can be any subclass of [`FocusOrder`][], but
[`NumericFocusOrder`][] and [`LexicalFocusOrder`][] are provided.

默认的 [`ReadingOrderTraversalPolicy`][] 通常足够，但若需要更多顺序控制，可使用 [`OrderedTraversalPolicy`][]。包裹可获得焦点的 widget 的 [`FocusTraversalOrder`][] widget 的 `order` 参数决定顺序。顺序可以是 [`FocusOrder`][] 的任意子类，但提供了 [`NumericFocusOrder`][] 和 [`LexicalFocusOrder`][]。

If none of the provided focus traversal policies are sufficient for your
application, you could also write your own policy and use it to determine any
custom ordering you want.

若提供的焦点遍历策略都不满足应用需求，你也可以编写自己的策略，以确定任意自定义顺序。

Here's an example of how to use the `FocusTraversalOrder` widget to traverse a
row of buttons in the order TWO, ONE, THREE using `NumericFocusOrder`.

下面示例展示如何使用 `FocusTraversalOrder` widget，通过 `NumericFocusOrder` 按 TWO、ONE、THREE 顺序遍历一行按钮：

<?code-excerpt "ui/focus/lib/samples.dart (ordered-button-row)"?>
```dart
class OrderedButtonRow extends StatelessWidget {
  const OrderedButtonRow({super.key});

  @override
  Widget build(BuildContext context) {
    return FocusTraversalGroup(
      policy: OrderedTraversalPolicy(),
      child: Row(
        children: <Widget>[
          const Spacer(),
          FocusTraversalOrder(
            order: const NumericFocusOrder(2),
            child: TextButton(child: const Text('ONE'), onPressed: () {}),
          ),
          const Spacer(),
          FocusTraversalOrder(
            order: const NumericFocusOrder(1),
            child: TextButton(child: const Text('TWO'), onPressed: () {}),
          ),
          const Spacer(),
          FocusTraversalOrder(
            order: const NumericFocusOrder(3),
            child: TextButton(child: const Text('THREE'), onPressed: () {}),
          ),
          const Spacer(),
        ],
      ),
    );
  }
}
```

### FocusTraversalPolicy

### FocusTraversalPolicy

The `FocusTraversalPolicy` is the object that determines which widget is next,
given a request and the current focus node. The requests (member functions) are
things like `findFirstFocus`, `findLastFocus`, `next`, `previous`, and
`inDirection`.

`FocusTraversalPolicy` 是根据请求和当前焦点节点决定下一个 widget 的对象。请求（成员函数）包括 `findFirstFocus`、`findLastFocus`、`next`、`previous` 和 `inDirection` 等。

`FocusTraversalPolicy` is the abstract base class for concrete policies, like
`ReadingOrderTraversalPolicy`,  `OrderedTraversalPolicy` and the
[`DirectionalFocusTraversalPolicyMixin`][] classes.

`FocusTraversalPolicy` 是具体策略的抽象基类，例如 `ReadingOrderTraversalPolicy`、`OrderedTraversalPolicy` 以及 [`DirectionalFocusTraversalPolicyMixin`][] 类。

In order to use a `FocusTraversalPolicy`, you give one to a
`FocusTraversalGroup`, which determines the widget subtree in which the policy
will be effective. The member functions of the class are rarely called directly:
they are meant to be used by the focus system.

要使用 `FocusTraversalPolicy`，需将其交给 `FocusTraversalGroup`，由后者确定策略生效的 widget 子树。该类的成员函数很少直接调用：它们供焦点系统使用。

## The focus manager

## 焦点管理器

The [`FocusManager`][] maintains the current primary focus for the system. It
only has a few pieces of API that are useful to users of the focus system. One
is the `FocusManager.instance.primaryFocus` property, which contains the
currently focused focus node and is also accessible from the global
`primaryFocus` field.

[`FocusManager`][] 维护系统当前的主焦点。它对焦点系统用户仅有少量有用 API。之一是 `FocusManager.instance.primaryFocus` 属性，包含当前获得焦点的焦点节点，也可通过全局 `primaryFocus` 字段访问。

Other useful properties are `FocusManager.instance.highlightMode` and
`FocusManager.instance.highlightStrategy`. These are used by widgets that need
to switch between a "touch" mode and a "traditional" (mouse and keyboard) mode
for their focus highlights. When a user is using touch to navigate, the focus
highlight is usually hidden, and when they switch to a mouse or keyboard, the
focus highlight needs to be shown again so they know what is focused. The
`highlightStrategy` tells the focus manager how to interpret changes in the
usage mode of the device: it can either automatically switch between the two
based on the most recent input events, or it can be locked in touch or
traditional modes. The provided widgets in Flutter already know how to use this
information, so you only need it if you're writing your own controls from
scratch. You can use `addHighlightModeListener` callback to listen for changes
in the highlight mode.

其他有用属性包括 `FocusManager.instance.highlightMode` 和 `FocusManager.instance.highlightStrategy`。需要在其焦点高亮之间切换「触摸」模式与「传统」（鼠标和键盘）模式的 widget 会使用它们。用户用触摸导航时，焦点高亮通常隐藏；切换到鼠标或键盘时，需再次显示焦点高亮，以便知道当前焦点在哪。`highlightStrategy` 告诉焦点管理器如何解释设备使用模式的变化：可根据最近输入事件自动在两种模式间切换，或锁定为触摸或传统模式。Flutter 提供的 widget 已知道如何使用这些信息，因此仅在你从零编写自己的控件时才需要。可用 `addHighlightModeListener` 回调监听高亮模式变化。

[`Actions`]: {{site.api}}/flutter/widgets/Actions-class.html
[`Builder`]: {{site.api}}/flutter/widgets/Builder-class.html
[`DirectionalFocusTraversalPolicyMixin`]: {{site.api}}/flutter/widgets/DirectionalFocusTraversalPolicyMixin-mixin.html
[`Focus`]: {{site.api}}/flutter/widgets/Focus-class.html
[`FocusableActionDetector`]: {{site.api}}/flutter/widgets/FocusableActionDetector-class.html
[`FocusManager`]: {{site.api}}/flutter/widgets/FocusManager-class.html
[`FocusNode`]: {{site.api}}/flutter/widgets/FocusNode-class.html
[`FocusOrder`]: {{site.api}}/flutter/widgets/FocusOrder-class.html
[`FocusScope`]: {{site.api}}/flutter/widgets/FocusScope-class.html
[`FocusScopeNode`]: {{site.api}}/flutter/widgets/FocusScopeNode-class.html
[`FocusTraversalGroup`]: {{site.api}}/flutter/widgets/FocusTraversalGroup-class.html
[`FocusTraversalOrder`]: {{site.api}}/flutter/widgets/FocusTraversalOrder-class.html
[`FocusTraversalPolicy`]: {{site.api}}/flutter/widgets/FocusTraversalPolicy-class.html
[`LexicalFocusOrder`]: {{site.api}}/flutter/widgets/LexicalFocusOrder-class.html
[`MouseRegion`]: {{site.api}}/flutter/widgets/MouseRegion-class.html
[`NumericFocusOrder`]: {{site.api}}/flutter/widgets/NumericFocusOrder-class.html
[`OrderedTraversalPolicy`]: {{site.api}}/flutter/widgets/OrderedTraversalPolicy-class.html
[`ReadingOrderTraversalPolicy`]: {{site.api}}/flutter/widgets/ReadingOrderTraversalPolicy-class.html
[`Shortcuts`]: {{site.api}}/flutter/widgets/Shortcuts-class.html
[`UnfocusDisposition.scope`]: {{site.api}}/flutter/widgets/UnfocusDisposition.html
