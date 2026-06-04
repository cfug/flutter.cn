---
# title: Common Flutter errors
title: Flutter 开发中常见的报错
# description: How to recognize and resolve common Flutter framework errors.
description: 如何识别并解决一些常见的 Flutter 框架的报错。
tags: 测试
keywords: flutter报错,A RenderFlex overflowed,An InputDecorator cannot have an unbounded width
ai-translated: true
---

<?code-excerpt path-base="testing/common_errors"?>

## Introduction

## 介绍

This page explains several frequently-encountered Flutter
framework errors (including layout errors) and gives suggestions
on how to resolve them.
This is a living document with more errors to be added in
future revisions, and your contributions are welcomed.
Feel free to [open an issue][] or [submit a pull request][] to
make this page more useful to you and the Flutter community.

本页说明若干常见的 Flutter 框架错误（包括布局错误），并给出解决建议。本文档会持续更新，未来会补充更多错误，欢迎贡献。欢迎[提交 issue][open an issue] 或[提交 pull request][submit a pull request]，让本页对你和 Flutter 社区更有帮助。

[open an issue]: {{site.repo.this}}/issues/new/choose
[submit a pull request]: {{site.repo.this}}/pulls

## A solid red or grey screen when running your app

## 运行应用时出现纯红或纯灰屏幕

Typically called a "red (or grey) screen of death",
this is sometimes how Flutter lets
you know that there's an error.

通常称为「红（或灰）屏死机」，有时 Flutter 以此告诉你发生了错误。

The red screen can appear when the app runs in
debug or profile mode. The grey screen can appear
when the app runs in release mode.

应用在 debug 或 profile 模式下运行时可能出现红屏；在 release 模式下运行时可能出现灰屏。

Generally, these errors occur when there's an
uncaught exception (and you might need another
try-catch block), or when there is some rendering error,
such as an overflow error.

通常这些错误由未捕获的异常引起（你可能需要额外的 try-catch 块），或由渲染错误（例如溢出错误）引起。

The following articles provide some useful insights
on debugging this sort of error:

以下文章对调试此类错误很有帮助：

* [Flutter errors demystified][] by Abishek
* [Understanding and addressing the grey screen in Flutter][] by Christopher Nwosu-Madueke
* [Flutter stuck on white screen][] by Kesar Bhimani

* Abishek 的 [Flutter errors demystified][]
* Christopher Nwosu-Madueke 的 [Understanding and addressing the grey screen in Flutter][]
* Kesar Bhimani 的 [Flutter stuck on white screen][]

[Flutter errors demystified]: {{site.medium}}/@hpatilabhi10/flutter-errors-demystified-red-screen-errors-vs-debug-console-errors-acb3b8ed2625
[Flutter stuck on white screen]: https://www.dhiwise.com/post/flutter-stuck-on-white-screen-understanding-and-fixing
[Understanding and addressing the grey screen in Flutter]: {{site.medium}}/@LordChris/understanding-and-addressing-the-grey-screen-in-flutter-5e72c31f408f

## 'A RenderFlex overflowed…'

## 「A RenderFlex overflowed…」

RenderFlex overflow is one of the most frequently
encountered Flutter framework errors,
and you've probably run into it already.

RenderFlex 溢出是最常见的 Flutter 框架错误之一，你可能已经遇到过。

**What does the error look like?**

**错误是什么样子的？**

When it happens, yellow and black stripes appear,
indicating the area of overflow in the app UI.
In addition, an error message displays in the debug console:

```plaintext
The following assertion was thrown during layout:
A RenderFlex overflowed by 1146 pixels on the right.

The relevant error-causing widget was

    Row      lib/errors/renderflex_overflow_column.dart:23

The overflowing RenderFlex has an orientation of Axis.horizontal.
The edge of the RenderFlex that is overflowing has been marked in the rendering
with a yellow and black striped pattern. This is usually caused by the contents
being too big for the RenderFlex.
(Additional lines of this message omitted)
```

发生时，应用 UI 中会出现黄黑条纹标示溢出区域，调试控制台也会显示错误消息。

**How might you run into this error?**

**你可能会如何遇到此错误？**

The error often occurs when a `Column` or `Row` has a
child widget that isn't constrained in its size.
For example,
the code snippet below demonstrates a common scenario:

当 `Column` 或 `Row` 含有未约束尺寸的子 widget 时，常会出现此错误。下面代码片段展示一种常见场景：

<?code-excerpt "lib/renderflex_overflow.dart (problem)"?>
```dart
Widget build(BuildContext context) {
  return Row(
    children: [
      const Icon(Icons.message),
      Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Title', style: Theme.of(context).textTheme.headlineMedium),
          const Text(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed '
            'do eiusmod tempor incididunt ut labore et dolore magna '
            'aliqua. Ut enim ad minim veniam, quis nostrud '
            'exercitation ullamco laboris nisi ut aliquip ex ea '
            'commodo consequat.',
          ),
        ],
      ),
    ],
  );
}
```

In the above example,
the `Column` tries to be wider than the space the `Row`
(its parent) can allocate to it, causing an overflow error.
Why does the `Column` try to do that?
To understand this layout behavior, you need to know
how the Flutter framework performs layout:

"_To perform layout, Flutter walks the render tree in a depth-first traversal
and **passes down size constraints** from parent to child… Children respond by
**passing up a size** to their parent object within the constraints the parent
established._" – [Flutter architectural overview][]

In this case, the `Row` widget doesn't constrain the
size of its children, nor does the `Column` widget.
Lacking constraints from its parent widget, the second
`Text` widget tries to be as wide as all the characters
it needs to display. The self-determined width of the
`Text` widget then gets adopted by the `Column`, which
clashes with the maximum amount of horizontal space its parent,
the `Row` widget, can provide.

在上述示例中，`Column` 试图比其父级 `Row` 能分配的空间更宽，导致溢出。`Column` 为何会如此？要理解这一布局行为，需要了解 Flutter 如何执行布局：

「_为执行布局，Flutter 以深度优先遍历渲染树，**自上而下传递尺寸约束**……子节点在父节点建立的约束内**向上回传尺寸**。_」——[Flutter 架构概览][Flutter architectural overview]

本例中，`Row` 未约束子节点尺寸，`Column` 也未约束。子 widget 缺少父级约束时，第二个 `Text` widget 会尽量按全部字符宽度显示；`Text` 自行决定的宽度被 `Column` 采用，与其父级 `Row` 能提供的最大水平空间冲突。

[Flutter architectural overview]: /resources/architectural-overview#layout-and-rendering

**How to fix it?**

**如何修复？**

Well, you need to make sure the `Column` won't attempt
to be wider than it can be. To achieve this,
you need to constrain its width. One way to do it is to
wrap the `Column` in an `Expanded` widget:

<?code-excerpt "lib/renderflex_overflow.dart (solution)"?>
```dart
return const Row(
  children: [
    Icon(Icons.message),
    Expanded(
      child: Column(
        // code omitted
      ),
    ),
  ],
);
```

Another way is to wrap the `Column` in a `Flexible` widget
and specify a `flex` factor. In fact,
the `Expanded` widget is equivalent to the `Flexible` widget
with a `flex` factor of 1.0, as [its source code][] shows.
To further understand how to use the `Flex` widget in Flutter layouts,
check out [this 90-second Widget of the Week video][flexible-video]
on the `Flexible` widget.

你需要确保 `Column` 不会试图超出可容纳的宽度。一种做法是用 `Expanded` widget 包裹 `Column` 以约束其宽度。另一种是用 `Flexible` 并指定 `flex` 因子；事实上 `Expanded` 等价于 `flex` 为 1.0 的 `Flexible`，[其源码][its source code]可证。要进一步理解 Flutter 布局中 `Flex` widget 的用法，可观看关于 `Flexible` widget 的 [90 秒 Widget of the Week 视频][flexible-video]。

**Further information:**

**更多信息：**

The resources linked below provide further information about this error.

以下链接提供更多关于此错误的信息。

* [Flexible (Flutter Widget of the Week)][flexible-video]
* [How to debug layout issues with the Flutter Inspector][medium-article]
* [Understanding constraints][]

* [Flexible（Flutter Widget of the Week）][flexible-video]

  [如何使用 Flutter Inspector 调试布局问题][medium-article]

* [理解约束][Understanding constraints]

[its source code]: {{site.repo.flutter}}/blob/c8e42b47f5ea8b5ff7bf2f2b0a2a8e765f1aa51d/packages/flutter/lib/src/widgets/basic.dart#L5166-L5174
[flexible-video]: {{site.yt.watch}}?v=CI7x0mAZiY0
[medium-article]: {{site.flutter-blog}}/how-to-debug-layout-issues-with-the-flutter-inspector-87460a7b9db#738b
[Understanding constraints]: /ui/layout/constraints

## 'RenderBox was not laid out'

## 「RenderBox was not laid out」

While this error is pretty common,
it's often a side effect of a primary error
occurring earlier in the rendering pipeline.

此错误相当常见，但往往是渲染管线中更早发生的主要错误的副作用。

**What does the error look like?**

**错误是什么样子的？**

The message shown by the error looks like this:

```plaintext
RenderBox was not laid out:
RenderViewport#5a477 NEEDS-LAYOUT NEEDS-PAINT NEEDS-COMPOSITING-BITS-UPDATE
```

错误显示的消息类似上文。

**How might you run into this error?**

**你可能会如何遇到此错误？**

Usually, the issue is related to violation of box constraints,
and it needs to be solved by providing more information
to Flutter about how you'd like to constrain the widgets in question.
You can learn more about how constraints work
in Flutter on the [Understanding constraints][] page.

通常与 box 约束违反有关，需要向 Flutter 提供更多关于如何约束相关 widget 的信息。可在[理解约束][Understanding constraints]页面了解更多。

The `RenderBox was not laid out` error is often
caused by one of two other errors:

* 'Vertical viewport was given unbounded height'
* 'An InputDecorator...cannot have an unbounded width'

`RenderBox was not laid out` 错误常由另外两种错误引起：

* 「Vertical viewport was given unbounded height」
* 「An InputDecorator...cannot have an unbounded width」

<a id="unbounded"></a>

## 'Vertical viewport was given unbounded height'

## 「Vertical viewport was given unbounded height」

This is another common layout error you could run into
while creating a UI in your Flutter app.

在 Flutter 应用中构建 UI 时可能遇到的另一种常见布局错误。

**What does the error look like?**

**错误是什么样子的？**

The message shown by the error looks like this:

```plaintext
The following assertion was thrown during performResize():
Vertical viewport was given unbounded height.

Viewports expand in the scrolling direction to fill their container.
In this case, a vertical viewport was given an unlimited amount of
vertical space in which to expand. This situation typically happens when a
scrollable widget is nested inside another scrollable widget.
(Additional lines of this message omitted)
```

错误显示的消息类似上文。

**How might you run into this error?**

**你可能会如何遇到此错误？**

The error is often caused when a `ListView`
(or other kinds of scrollable widgets such as `GridView`)
is placed inside a `Column`. A `ListView` takes all
the vertical space available to it,
unless it's constrained by its parent widget.
However, a `Column` doesn't impose any constraint
on its children's height by default.
The combination of the two behaviors leads to the failure of
determining the size of the `ListView`.

当 `ListView`（或其他可滚动 widget，如 `GridView`）放在 `Column` 内时，常会出现此错误。`ListView` 会占用所有可用的垂直空间，除非父 widget 约束它。然而 `Column` 默认不约束子节点高度。两种行为叠加会导致无法确定 `ListView` 的尺寸。

<?code-excerpt "lib/unbounded_height.dart (problem)"?>
```dart
Widget build(BuildContext context) {
  return Center(
    child: Column(
      children: <Widget>[
        const Text('Header'),
        ListView(
          children: const <Widget>[
            ListTile(leading: Icon(Icons.map), title: Text('Map')),
            ListTile(leading: Icon(Icons.subway), title: Text('Subway')),
          ],
        ),
      ],
    ),
  );
}
```

**How to fix it?**

**如何修复？**

To fix this error, specify how tall the `ListView` should be.
To make it as tall as the remaining space in the `Column`,
wrap it using an `Expanded` widget (as shown in the following example).
Otherwise, specify an absolute height using a `SizedBox`
widget or a relative height using a `Flexible` widget.

修复此错误需指定 `ListView` 的高度。若要与 `Column` 中剩余空间同高，用 `Expanded` widget 包裹（如下例）。否则用 `SizedBox` 指定绝对高度，或用 `Flexible` 指定相对高度。

<?code-excerpt "lib/unbounded_height.dart (solution)"?>
```dart
Widget build(BuildContext context) {
  return Center(
    child: Column(
      children: <Widget>[
        const Text('Header'),
        Expanded(
          child: ListView(
            children: const <Widget>[
              ListTile(leading: Icon(Icons.map), title: Text('Map')),
              ListTile(leading: Icon(Icons.subway), title: Text('Subway')),
            ],
          ),
        ),
      ],
    ),
  );
}
```

**Further information:**

**更多信息：**

The resources linked below provide
further information about this error.

以下链接提供更多关于此错误的信息。

* [How to debug layout issues with the Flutter Inspector][medium-article]
* [Understanding constraints][]

* [如何使用 Flutter Inspector 调试布局问题][medium-article]
* [理解约束][Understanding constraints]

## 'An InputDecorator...cannot have an unbounded width'

## 「An InputDecorator...cannot have an unbounded width」

The error message suggests that it's also related
to box constraints, which are important to understand
to avoid many of the most common Flutter framework errors.

错误消息表明这也与 box 约束有关；理解约束有助于避免许多最常见的 Flutter 框架错误。

**What does the error look like?**

**错误是什么样子的？**

The message shown by the error looks like this:

```plaintext
The following assertion was thrown during performLayout():
An InputDecorator, which is typically created by a TextField, cannot have an
unbounded width.
This happens when the parent widget does not provide a finite width constraint.
For example, if the InputDecorator is contained by a `Row`, then its width must
be constrained. An `Expanded` widget or a SizedBox can be used to constrain the
width of the InputDecorator or the TextField that contains it.
(Additional lines of this message omitted)
```

错误显示的消息类似上文。

**How might you run into the error?**

**你可能会如何遇到此错误？**

This error occurs, for example, when a `Row` contains a
`TextFormField` or a `TextField` but the latter has
no width constraint.

例如，当 `Row` 包含 `TextFormField` 或 `TextField` 而后者没有宽度约束时，会出现此错误。

<?code-excerpt "lib/unbounded_width.dart (problem)"?>
```dart
Widget build(BuildContext context) {
  return MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text('Unbounded Width of the TextField')),
      body: const Row(children: [TextField()]),
    ),
  );
}
```

**How to fix it?**

**如何修复？**

As suggested by the error message,
fix this error by constraining the text field
using either an `Expanded` or `SizedBox` widget.
The following example demonstrates using an `Expanded` widget:

按错误消息建议，使用 `Expanded` 或 `SizedBox` widget 约束文本字段即可修复。以下示例使用 `Expanded` widget：

<?code-excerpt "lib/unbounded_width.dart (solution)"?>
```dart
Widget build(BuildContext context) {
  return MaterialApp(
    home: Scaffold(
      appBar: AppBar(title: const Text('Unbounded Width of the TextField')),
      body: Row(children: [Expanded(child: TextFormField())]),
    ),
  );
}
```

## 'Incorrect use of ParentData widget'

## 「Incorrect use of ParentData widget」

This error is about missing an expected parent widget.

此错误与缺少预期的父 widget 有关。

**What does the error look like?**

**错误是什么样子的？**

The message shown by the error looks like this:

```plaintext
The following assertion was thrown while looking for parent data:
Incorrect use of ParentDataWidget.
(Some lines of this message omitted)
Usually, this indicates that at least one of the offending ParentDataWidgets
listed above is not placed directly inside a compatible ancestor widget.
```

错误显示的消息类似上文。

**How might you run into the error?**

**你可能会如何遇到此错误？**

While Flutter's widgets are generally flexible
in how they can be composed together in a UI,
a small subset of those widgets expect specific parent widgets.
When this expectation can't be satisfied in your widget tree,
you're likely to encounter this error.

Flutter 的 widget 在 UI 中的组合通常很灵活，但少数 widget 需要特定的父 widget。当 widget 树无法满足这一要求时，就可能遇到此错误。

Here is an _incomplete_ list of widgets that expect
specific parent widgets within the Flutter framework.
Feel free to submit a PR (using the doc icon in
the top right corner of the page) to expand this list.

以下是 Flutter 框架中需要特定父 widget 的 widget 的*不完整*列表。欢迎提交 PR（使用页面右上角的文档图标）扩充此列表。

| Widget                                |  Expected parent widget(s) |
|:--------------------------------------|---------------------------:|
| `Flexible`                            | `Row`, `Column`, or `Flex` |
| `Expanded` (a specialized `Flexible`) | `Row`, `Column`, or `Flex` |
| `Positioned`                          |                    `Stack` |
| `TableCell`                           |                    `Table` |

**How to fix it?**

**如何修复？**

The fix should be obvious once you know
which parent widget is missing.

一旦知道缺少哪个父 widget，修复方法通常就很明显。

## 'setState called during build'

## 「setState called during build」

The `build` method in your Flutter code isn't
a good place to call `setState`,
either directly or indirectly.

Flutter 代码中的 `build` 方法不适合调用 `setState`，无论是直接还是间接调用。

**What does the error look like?**

**错误是什么样子的？**

When the error occurs,
the following message is displayed in the console:

```plaintext
The following assertion was thrown building DialogPage(dirty, dependencies:
[_InheritedTheme, _LocalizationsScope-[GlobalKey#59a8e]],
state: _DialogPageState#f121e):
setState() or markNeedsBuild() called during build.

This Overlay widget cannot be marked as needing to build because the framework
is already in the process of building widgets.
(Additional lines of this message omitted)
```

发生错误时，控制台会显示上述消息。

**How might you run into the error?**

**你可能会如何遇到此错误？**

In general, this error occurs when the `setState`
method is called within the `build` method.

A common scenario where this error occurs is when
attempting to trigger a `Dialog` from within the
`build` method. This is often motivated by the need to
immediately show information to the user,
but `setState` should never be called from a `build` method.

一般而言，在 `build` 方法内调用 `setState` 会导致此错误。常见场景是在 `build` 方法中尝试触发 `Dialog`，往往是为了立即向用户展示信息，但绝不应在 `build` 方法中调用 `setState`。

The following snippet seems to be a common culprit of this error:

以下代码片段常是此错误的元凶：

<?code-excerpt "lib/set_state_build.dart (problem)"?>
```dart
Widget build(BuildContext context) {
  // Don't do this.
  showDialog(
    context: context,
    builder: (context) {
      return const AlertDialog(title: Text('Alert Dialog'));
    },
  );

  return const Center(
    child: Column(children: <Widget>[Text('Show Material Dialog')]),
  );
}
```

This code doesn't make an explicit call to `setState`,
but it's called by `showDialog`.
The `build` method isn't the right place to call
`showDialog` because `build` can be called by the
framework for every frame, for example, during an animation.

此代码未显式调用 `setState`，但 `showDialog` 会调用它。`build` 不是调用 `showDialog` 的合适位置，因为框架可能每帧都调用 `build`，例如在动画期间。

**How to fix it?**

**如何修复？**

One way to avoid this error is to use the `Navigator` API
to trigger the dialog as a route. In the following example,
there are two pages. The second page has a
dialog to be displayed upon entry.
When the user requests the second page by
clicking a button on the first page,
the `Navigator` pushes two routes–one
for the second page and another for the dialog.

避免此错误的一种方式是使用 `Navigator` API 将对话框作为路由触发。以下示例有两个页面；第二个页面在进入时显示对话框。用户在第一页点击按钮请求第二页时，`Navigator` 压入两条路由——一条对应第二页，另一条对应对话框。

<?code-excerpt "lib/set_state_build.dart (solution)"?>
```dart
class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('First Screen')),
      body: Center(
        child: ElevatedButton(
          child: const Text('Launch screen'),
          onPressed: () {
            // Navigate to the second screen using a named route.
            Navigator.pushNamed(context, '/second');
            // Immediately show a dialog upon loading the second screen.
            Navigator.push(
              context,
              PageRouteBuilder(
                barrierDismissible: true,
                opaque: false,
                pageBuilder: (_, anim1, anim2) => const MyDialog(),
              ),
            );
          },
        ),
      ),
    );
  }
}
```

## `The ScrollController is attached to multiple scroll views`

## 「The ScrollController is attached to multiple scroll views」

This error can occur when multiple scrolling
widgets (such as `ListView`) appear on the
screen at the same time. It's more likely for
this error to occur on a web or desktop app,
than a mobile app since it's rare to encounter
this scenario on mobile.

当多个可滚动 widget（如 `ListView`）同时出现在屏幕上时，可能出现此错误。在 Web 或桌面应用中比移动应用更常见，因为移动应用很少遇到此场景。

For more information and to learn how to fix,
check out the following video on
[`PrimaryScrollController`][controller-video]:

更多信息及修复方法，请参阅以下关于 [`PrimaryScrollController`][controller-video] 的视频：

<YouTubeEmbed id="33_0ABjFJUU" title="PrimaryScrollController | Decoding Flutter"></YouTubeEmbed>

[controller-video]: {{site.api}}/flutter/widgets/PrimaryScrollController-class.html

## References

## 参考资料

To learn more about how to debug errors,
especially layout errors in Flutter,
check out the following resources:

要进一步了解如何调试错误，尤其是 Flutter 中的布局错误，请参阅以下资源：

* [How to debug layout issues with the Flutter Inspector][medium-article]
* [Understanding constraints][]
* [Flutter architectural overview][]

* [如何使用 Flutter Inspector 调试布局问题][medium-article]
* [理解约束][Understanding constraints]
* [Flutter 架构概览][Flutter architectural overview]

[Flutter architectural overview]: /resources/architectural-overview#layout-and-rendering
