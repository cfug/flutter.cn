---
# title: Widgets
title: Widget
# description: Learn the basic building blocks of Flutter.
description: 了解 Flutter 的基本构成要素。
prev:
#   title: Intro to Dart
  title: Dart 入门
  path: /get-started/fundamentals/dart
next:
#   title: Layout
  title: 布局
  path: /get-started/fundamentals/layout
---

To get started with Flutter,
you need to have some familiarity with the Dart programming language, which Flutter
applications are written in, and widgets,
which are the building blocks of Flutter UI.
Both will be introduced on this page, but you'll continue
learning about each throughout this series.
Additional resources are listed throughout this page,
but you do not need to be an expert in either
subject in order to continue.

在开始使用 Flutter 之前，
你需要对 Dart 编程语言以及 Widget 有所了解，
因为 Dart 是 Flutter 应用的开发语言，
而 Widget 则是 Flutter UI 的基本构成要素。
本页将简要介绍这两部分内容，后续的教程会逐步深入讲解它们。
此外，本页还提供了若干延伸学习资源，
你不必精通它们，也可以继续学习教程的后续内容。

## Widgets

In regard to Flutter, you'll often hear
"everything is a widget".
Widgets are the building blocks of a
Flutter app's user interface,
and each widget is an immutable declaration of part
of the user interface. Widgets are used
to describe all aspects of a user interface,
including physical aspects such as text and buttons to
lay out effects like padding and alignment.

关于 Flutter，你总是会听到「万物皆 Widget (everything is a widget)」的说法。
Widget 是 Flutter 应用程序用户界面的基本构成要素，
每个 Widget 都是对用户界面特定部分的不可变 (immutable) 声明。
它们用于描述用户界面的各个维度，
包括物理外观（诸如文本和按钮）和布局效果（诸如填充和对齐）。

Widgets form a hierarchy based on composition.
Each widget nests inside its parent and
can receive context from the parent.
This structure carries all the way up to the root
widget, as this trivial example shows:

Widget 通过组合机制形成层级结构。
每个 Widget 都嵌套于父 Widget 内，
并且能够从父级接收上下文信息。
正如下面的简例所示，这样的结构关系一直延伸到根 Widget：

```dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp( // Root widget
      home: Scaffold(
        appBar: AppBar(
          title: const Text('My Home Page'),
        ),
        body: Center(
          child: Builder(
            builder: (context) {
              return Column(
                children: [
                  const Text('Hello, World!'),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () {
                      print('Click!');
                    },
                    child: const Text('A button'),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
```

In the preceding code,
all instantiated classes are widgets:
`MaterialApp`, `Scaffold`, `AppBar`, `Text`,
`Center`, `Builder`, `Column`, `SizedBox`, and
`ElevatedButton`.

在上面的代码中，所有实例化的类都是 Widget：
`MaterialApp`、`Scaffold`、`AppBar`、`Text`、
`Center`、`Builder`、`Column`、`SizedBox` 以及
`ElevatedButton`。

### Widget composition

### Widget 的组合结构

As mentioned, Flutter emphasizes widgets as a unit
of composition. Widgets are typically composed of
many other small, single-purpose widgets that
combine to produce powerful effects.

如前所述，Flutter 强调将 Widget 作为组合的基本单元。
通常，Widget 由许多更加小型、功能单一的 Widget 组合而成，
通过层层组合嵌套实现复杂的界面效果。

There are layout widgets such
as `Padding`, `Alignment`, `Row`, `Column`,
and `Grid`. These layout widgets do not have a
visual representation of their own.
Instead, their sole purpose is to
control some aspect of another widget's layout.
Flutter also includes utility widgets that
take advantage of this compositional approach.
For example, `Container`, a commonly used widget,
is made up of several widgets responsible for layout,
painting, positioning, and sizing.
Some widgets have visual representation,
such as `ElevatedButton` and
`Text` in the preceding example, as well as
widgets like `Icon` and `Image`.

Flutter 提供了多种布局 Widget，
比如 `Padding`、`Alignment`、`Row`、`Column` 和 `Grid`。
这些布局类 Widget 本身没有可视化呈现，
它们的唯一作用是控制其他 Widget 的布局方式。
Flutter 还提供了一些利用组合方式构建的实用性 Widget，
例如常用的 `Container`，
就是由多个负责布局、绘制、定位和尺寸调整的 Widget，各司其职组合而成的。
另外还有一些 Widget，它们具备用户界面的可视化呈现，
例如前面简例中出现的 `ElevatedButton` 和 `Text`，
以及 `Icon` 和 `Image` 等类似的可视化 Widget。

If you run the code from the preceding example,
Flutter paints a button with the text
"Hello, World!" centered on the screen, laid out vertically.
To position these elements, there's a `Center` widget,
which positions its children in the center
of the available space, and a `Column` widget,
which lays out its children vertically one after another.

如果你运行前面简例中的代码，
Flutter 将在屏幕中央以垂直布局的方式绘制一行「Hello, World!」文字和一个按钮。
为了定位这些元素，
代码使用 `Center` Widget 实现居中（将子 Widget 置于可用区域中心），
使用 `Column` Widget 完成垂直方向的排列布局（将所有子 Widget 按垂直方向顺序排列）。

<img src='/assets/images/docs/fwe/simple_composition_example.png' width="100%" alt="A diagram that shows widget composition with a series of lines and nodes.">


In the [next page][] in this series, you will
learn more about layout in Flutter.

在本章节的 [下一页][next page]，你会学到更多关于 Flutter 布局的知识。

### Building widgets

### 构建 Widget

To create a user interface in Flutter,
you override the [`build`][] method on widget objects.
All widgets must have a build method,
and it must return another widget. For example,
if you want to add text to the screen with some padding,
you could write it like this:

在 Flutter 中创建用户界面时，
你需要重写 Widget 对象的 [`build`][] 方法。
所有的 Widget 都必须包含一个 build 方法，
并且该方法必须返回新的 Widget 实例。
举例来说，如果你想在屏幕上添加一段带内边距的文本，
你可以这样编写代码：

```dart
class PaddedText extends StatelessWidget {
  const PaddedText({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: const Text('Hello, World!'),
    );
  }
}
```

The framework calls the `build` method when this
widget is created and when the dependencies of this
widget change (such as state that is passed into the widget).
This method can potentially be called in every frame
and should not have any side effects beyond
building a widget.
To learn more about how Flutter renders widgets,
check out the [Flutter architectural overview][].

当这个 Widget 被创建
或者它的依赖项（例如传递给 Widget 的状态）发生变化时，
框架就会调用 `build` 方法。
这个方法有可能会在每一帧都被调用，
所以它不应该有副作用，唯一职责就是完成 Widget 的构建。
要深入了解 Flutter 如何渲染 Widget，
请参阅 [Flutter 架构概览][Flutter architectural overview]。

### Widget state

### Widget 状态

The framework introduces two major classes of widget:
stateful and stateless widgets.

Flutter 框架将 Widget 分为两个大类：
有状态 (Stateful) Widget 和 无状态 (Stateless) Widget。

Widgets that have no mutable state
(they have no class properties
that change over time) subclass [`StatelessWidget`][].
Many built-in widgets are stateless,
such as `Padding`, `Text`, and `Icon`.
When you create your own widgets,
you'll create `Stateless` widgets most of the time.

不包含可变状态（即没有随时间变化的成员属性）的 Widget
是无状态 Widget，均继承自 [`StatelessWidget`][]。
许多内置的 Widget 都是无状态的，
比如 `Padding`、`Text` 和 `Icon`。
当你构建自定义 Widget 时，
优先采用 `无状态 (Stateless)` Widget。

On the other hand,
if the unique characteristics of a widget need to change
based on user interaction or other factors,
that widget is stateful.
For example, if a widget has a counter that
increments whenever the user taps a button,
then the value of the counter is the state for that widget.
When that value changes, the widget needs to be
rebuilt to update its part of the UI.
These widgets subclass [`StatefulWidget`][],
and (because the widget itself is immutable)
they store mutable state in a separate class that
subclasses [`State`][].
`StatefulWidgets` don't have a `build` method;
instead, their user interface is built through
their `State` object, as shown in the example below.

反之，
如果一个 Widget 的某些特性需要随用户交互或其他因素而改变，
则这个 Widget 是有状态的。
举例来说，如果有一个包含计数器的 Widget，
当用户点击按钮时，计数器的数值会递增，
那么这个数值就是 Widget 的状态。
每当这个值改变的时候，Widget 就需要被重建以更新它在 UI 中的部分。
有状态的 Widget 继承自 [`StatefulWidget`][]，
（因为 Widget 本身是不可变的）
它们将可变状态存放在一个单独继承自 [`State`][] 的类中。
`StatefulWidget` 没有 `build` 方法，
它们的用户界面是通过关联其 `State` 对象来构建的，
正如下面的例子所示。

```dart
class CounterWidget extends StatefulWidget {
  @override
  State<CounterWidget> createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Text('$_counter');
  }
}
```

Whenever you mutate a `State` object
(for example, by incrementing the counter),
you must call [`setState`][] to signal the framework
to update the user interface by
calling the `State`'s `build` method again.

每当你试图修改状态时（比如，增加计数器的数值），
你必须要调用 [`setState`][] 方法来通知框架更新用户界面，
该操作会触发关联 `State` 的 `build` 方法重新执行构建。

Separating state from widget objects
lets other widgets treat both
stateless and stateful widgets in exactly the same way,
without being concerned about losing state.
Instead of needing to hold on to
a child to preserve its state,
the parent can create a new instance of the child
at any time without losing
the child's persistent state.
The framework does all the work of finding and
reusing existing state objects when appropriate.

将状态与 Widget 分离的机制，
使得其他 Widget 可以统一处理无状态和有状态的 Widget，
而不用担心丢失状态。
父 Widget 无需保留子 Widget 的状态，
可以随时创建子 Widget 的新实例，
这样做不会破坏子 Widget 状态的持久化。
框架会在合适的时机自动匹配并复用现有的 State 对象。

There's more information about
[`StatefulWidget`][] objects later in this
series, in the [state management lesson][].

入门教程的后续章节会对 [`StatefulWidget`][] 进行更深入的讲解，
具体请参阅 [状态管理][state management lesson] 部分。

## Important widgets to know

## 必须了解的重点 Widget

The Flutter SDK includes many built-in widgets,
from the smallest pieces of UI, like `Text`,
to layout widgets, and widgets that style
your application. The following widgets are
the most important to be aware of as you move onto the
next lesson in the learning pathway.

Flutter 的 SDK 提供了许多内置的 Widget，
小到 UI 基础类 Widget（比如 `Text`），
大到布局类 Widget 和那些影响整个应用风格的 Widget。
以下列出的 Widget 是你在后续学习过程中必须要掌握的重点。

* [`Container`][]
* [`Text`][]
* [`Scaffold`][]
* [`AppBar`][]
* [`Row`][] and [`Column`][]
* [`ElevatedButton`][]
* [`Image`][]
* [`Icon`][]

## Next: Layouts

## 下一步：布局

This page is an introduction to foundational
Flutter concepts, like widgets,
and helps you become familiar with reading
Flutter and Dart code. It's okay if you don't
feel clear on every topic you encountered, as every page after
this is a deep-dive on specific topics.
In the next section, you'll start building more
interesting UIs by creating more complex layouts in Flutter.

本页介绍了 Flutter 的基础概念（例如 Widget），
旨在帮助你熟悉 Flutter 和 Dart 代码。
你不必要求自己充分理解现在所有的知识点，
因为后续章节将带你继续深入学习它们。
在下一章节中，你将使用 Flutter 创建更复杂的布局，
从而构建更引人入胜的 UI。

If you'd like practice with the
information you learned on this page,
you can read [Building user interfaces with Flutter][].

如果你想通过实践来巩固本页所学的内容，
请移步 [使用 Flutter 构建用户界面][Building user interfaces with Flutter]。

[Building user interfaces with Flutter]: /ui
[`build`]: {{site.api}}/flutter/widgets/StatelessWidget/build.html
[next page]: /get-started/fundamentals/layout
[Flutter architectural overview]: /resources/architectural-overview
[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`State`]: {{site.api}}/flutter/widgets/State-class.html
[`setState`]: {{site.api}}/flutter/widgets/State/setState.html
[state management lesson]: /get-started/fundamentals/state-management
[`AppBar`]: {{site.api}}/flutter/material/AppBar-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`Icon`]: {{site.api}}/flutter/widgets/Icon-class.html
[`Image`]: {{site.api}}/flutter/widgets/Image-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

为了把教程做得越来越好，我们 [期待你的反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="widgets"
