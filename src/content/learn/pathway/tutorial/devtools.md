---
title: DevTools
# description: Learn to use the Dart DevTools when developing Flutter apps.
description: 学习在开发 Flutter 应用时使用 Dart DevTools。
layout: tutorial
---

Learn to use the widget inspector and property editor to debug layout issues and experiment with properties in real-time.

学习使用 widget 检查器和属性编辑器来调试布局问题，并实时体验属性的修改效果。

<YouTubeEmbed id="CIfLE0CShbg" title="Intro to Flutter and Dart DevTools" fullWidth="true"></YouTubeEmbed>

<SummaryCard>
title: What you'll accomplish
items:
  - title: Explore your app's widget tree with the widget inspector
    icon: account_tree
  - title: Learn to debug layout issues like unbounded constraints
    icon: bug_report
  - title: Experiment with properties in real-time
    icon: tune
</SummaryCard>

---

### Introduction

### 简介

As your Flutter app grows in complexity, it becomes more important
to understand how each of the widget properties affects the UI.
The [Dart and Flutter DevTools][] provide you with
two particularly useful features:
the **widget inspector** and the **property editor**.

随着 Flutter 应用复杂度的增加，理解每个 widget 属性如何影响 UI 变得越来越重要。[Dart and Flutter DevTools][] 为你提供了两个特别实用的功能：**widget 检查器** 和 **属性编辑器**。

First, launch DevTools by running the following commands while
your app is running in debug mode:

首先，在应用以调试模式运行时，执行以下命令启动 DevTools：

```console
$ dart devtools
```

:::note Run in your IDE

Provided you have the appropriate Flutter plugin installed,
you can also run DevTools directly inside
Code OSS-based editors such as [VS Code][] as well as
[IntelliJ and Android Studio][].
The screenshots in this lesson are from VS Code.

如果你已安装了相应的 Flutter 插件，也可以直接在基于 Code OSS 的编辑器（如 [VS Code][]）以及 [IntelliJ and Android Studio][] 中运行 DevTools。本课程中的截图来自 VS Code。

:::

[Dart and Flutter DevTools]: /tools/devtools
[VS Code]: /tools/vs-code
[IntelliJ and Android Studio]: /tools/android-studio

### The widget inspector

### Widget 检查器

The widget inspector allows you to visualize and explore your widget tree.
It helps you understand the layout of your UI and
identifies which widgets are responsible for different parts of the screen.
Running against the app you've built so far, the inspector looks like this:

Widget 检查器允许你可视化地浏览 widget 树。它帮助你了解 UI 的布局结构，并确定哪些 widget 负责屏幕的不同部分。对你目前构建的应用运行检查器，界面如下所示：

<img src='/assets/images/docs/tutorial/widget_inspector.png' width="320px" alt="A screenshot of the Flutter widget inspector tool.">

Consider the `GamePage` widget you created in this section:

来看看你在本节中创建的 `GamePage` widget：

```dart
class GamePage extends StatelessWidget {
  GamePage({super.key});

  final Game _game = Game();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        spacing: 5.0,
        children: [
          for (var guess in _game.guesses)
            Row(
              spacing: 5.0,
              children: [
                for (var letter in guess) Tile(letter.char, letter.type)
              ]
            ),
        ],
      ),
    );
  }
}
```

And how it's used in `MainApp`:

以及它在 `MainApp` 中的使用方式：

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(child: GamePage()),
      ),
    );
  }
}
```

In the widget inspector, you should see a tree of
exactly the same widgets that are in your code:
`MaterialApp` as the root, with `Scaffold` as its `home`,
an `AppBar` as its `appBar`, and so on down the entire tree to
the `Row` widgets with `Tile` children.
You can select any widget in the tree to see its properties and
even jump to its source code in your IDE.

在 widget 检查器中，你应该能看到与代码中完全一致的 widget 树：`MaterialApp` 作为根节点，`Scaffold` 作为其 `home`，`AppBar` 作为其 `appBar`，依此类推，一直到包含 `Tile` 子节点的 `Row` widget。你可以选择树中的任意 widget 来查看其属性，甚至可以直接跳转到 IDE 中的源代码。

### Debugging layout issues

### 调试布局问题

The widget inspector is perhaps most useful for debugging layout issues.

Widget 检查器在调试布局问题时可能最为实用。

In certain situations,
a widget's [constraints][] are unbounded, or infinite.
This means that either
the maximum width or the maximum height is set to [`double.infinity`][].
A widget that tries to be as big as possible won't function usefully when
given an unbounded constraint and, in debug mode, throws an exception.

在某些情况下，widget 的 [约束][constraints] 是无界的，即无限大。这意味着最大宽度或最大高度被设置为 [`double.infinity`][]。当一个试图尽可能大的 widget 遇到无界约束时，它将无法正常工作，并在调试模式下抛出异常。

The most common case where a render box ends up with an unbounded
constraint is within a flex box widget ([`Row`][] or [`Column`][]),
and within a scrollable region,
such as a [`ListView`][] or [`ScrollView`][] subclasses.

渲染盒子遇到无界约束最常见的情况是在弹性盒子 widget（[`Row`][] 或 [`Column`][]）内部，以及在可滚动区域内部，例如 [`ListView`][] 或 [`ScrollView`][] 的子类。

`ListView`, for example, tries to expand to
fit the space available in its cross-direction. Such as if
it's a vertically scrolling block that tries to be as wide as its parent.
If you nest a vertically scrolling `ListView` inside
a horizontally scrolling `ListView`, the inner list tries to
be as wide as possible, which is infinitely wide, since the
outer one is scrollable in that direction.

例如，`ListView` 会尝试在其交叉方向上扩展以填满可用空间。比如一个垂直滚动的列表会尝试和父级一样宽。如果你将一个垂直滚动的 `ListView` 嵌套在一个水平滚动的 `ListView` 中，内部列表会尝试尽可能宽，而这个宽度是无限大的，因为外部列表在该方向上是可滚动的。

Perhaps the most common error you'll run into while
building a Flutter application is due to incorrectly using layout widgets.
This error is referred to as the "unbounded constraints" error.

在构建 Flutter 应用时，你最常遇到的错误可能就是由于布局 widget 使用不当导致的。这个错误被称为"无界约束"错误。

Watch the following video to get an understanding of how to
spot and resolve this issue.

观看以下视频，了解如何发现和解决此问题。

<YouTubeEmbed id="jckqXR5CrPI" title="Decoding Flutter: Unbounded height and width"></YouTubeEmbed>

[constraints]: /ui/layout/constraints
[`double.infinity`]: {{site.api}}/flutter/dart-core/double/infinity-constant.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
[`ScrollView`]: {{site.api}}/flutter/widgets/ScrollView-class.html

### The property editor

### 属性编辑器

When you select a widget in the widget inspector,
the property editor displays all the properties of that selected widget.
This is a powerful tool for understanding why a widget looks the way it does and
for experimenting with property value changes in real-time.

当你在 widget 检查器中选中一个 widget 时，属性编辑器会显示该 widget 的所有属性。这是一个强大的工具，可以帮助你理解 widget 为何呈现当前的外观，并实时体验属性值的修改效果。

<img src='/assets/images/docs/tutorial/property_editor.png' width="320px" alt="A screenshot of the Flutter property editor tool.">

Look at the `Tile` widget's `build` method from earlier:

来看看之前 `Tile` widget 的 `build` 方法：

```dart
class Tile extends StatelessWidget {
  const Tile(required this.letter, required hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 60,
      height: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        color: switch (hitType) {
          HitType.hit => Colors.green,
          HitType.partial => Colors.yellow,
          HitType.miss => Colors.grey,
          _ => Colors.white,
        },
      ),
    );
  }
}
```

If you select a `Tile` widget in the widget inspector,
the property editor would show you its
`width` (60), `height` (60), and the `decoration` property.
You could then expand the `BoxDecoration` to
see the `border` and `color` properties.

如果你在 widget 检查器中选中一个 `Tile` widget，属性编辑器会显示其 `width`（60）、`height`（60）以及 `decoration` 属性。你可以展开 `BoxDecoration` 来查看 `border` 和 `color` 属性。

For many properties, you can even
modify their values directly within the property editor.
For example, to quickly test how a different `width` or `height` would look
for your `Container` in the `Tile` widget,
change the numerical value in the property editor.
Then instantly see the update on your running app without
needing to recompile or even hot reload.
This allows for rapid iteration on UI design.

对于许多属性，你甚至可以直接在属性编辑器中修改它们的值。例如，要快速测试 `Tile` widget 中 `Container` 使用不同 `width` 或 `height` 时的效果，只需在属性编辑器中更改数值，就能立即在运行中的应用上看到更新，无需重新编译甚至热重载。这使得 UI 设计的迭代速度大大提升。

### Review

### 回顾

<SummaryCard>
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Explored your app's widget tree with the widget inspector
    icon: account_tree
    details: >-
      The widget inspector lets you visualize your entire widget tree,
      select any widget to view its properties, and
      jump directly to its source code.
      It's an essential tool for understanding your app's structure.
  - title: Learned about common layout issues
    icon: bug_report
    details: >-
      You learned about **unbounded constraints**,
      one of the most common errors hit in Flutter development.
      This happens when widgets like
      `Row`, `Column`, or `ListView` receive infinite constraints.
      Now you can recognize and fix these issues when they occur.
  - title: Experimented with properties in real-time
    icon: tune
    details: >-
      The property editor shows all properties of a selected widget and
      lets you modify values instantly with no recompiling or hot reload needed.
      This enables rapid iteration when fine-tuning your UI.
</SummaryCard>

### Test yourself

### 自测

<Quiz title="DevTools Quiz">
- question: What is a common cause of "unbounded constraints" errors in Flutter?
  options:
    - text: Using too many StatefulWidgets in the widget tree.
      correct: false
      explanation: StatefulWidget usage doesn't cause unbounded constraints.
    - text: Placing a widget that tries to expand infinitely inside a scrollable or flex container without proper constraints.
      correct: true
      explanation: Widgets like ListView inside a Row, or nested scrollables, can receive infinite constraints and fail.
    - text: Forgetting to call setState after changing data.
      correct: false
      explanation: Missing setState causes UI not to update, not constraint errors.
    - text: Using Container without specifying a color.
      correct: false
      explanation: Color is optional and unrelated to layout constraints.
- question: What can you do with the Widget Inspector in Flutter DevTools?
  options:
    - text: Automatically generate unit tests for your widgets.
      correct: false
      explanation: The Widget Inspector is for visualization and debugging, not test generation.
    - text: Visualize your widget tree, select widgets to view their properties, and jump to source code.
      correct: true
      explanation: The Widget Inspector lets you explore your app's structure, inspect widget properties, and navigate to the corresponding source code.
    - text: Deploy your app directly to the app store.
      correct: false
      explanation: Deployment is handled separately; the Widget Inspector is for debugging.
    - text: Edit your app's theme colors and typography.
      correct: false
      explanation: Theme editing requires code changes; the Widget Inspector is for inspecting the current state.
</Quiz>
