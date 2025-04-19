---
title: Widgets
description: Learn the basic building blocks of Flutter.
prev:
  title: Intro to Dart
  path: /get-started/fundamentals/dart
next:
  title: Layout
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

要开始使用Flutter，你需要熟悉Dart编程语言，Flutter应用就是用这种语言编写的；你还需要熟悉Widget这个概念，它是组成Flutter用户界面的构件。
本页会介绍这两部分内容，他们将贯穿整个起步教程的始终，你会在后续的阅读中继续学习与他们有关的知识。
本页还罗列了若干用于延伸阅读的资源，要继续学习教程中后续的内容，你不必精通他们。

## Widgets

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

关于Flutter，你总是会听到“一切都是Widget”的说法。
Widget是组成Flutter应用程序用户界面的构件，每个Widget都是对用户界面某一部分内容的不可变的声明。
他们被用于描述用户界面的方方面面，包括物理外观（诸如文本和按钮）和布局效果（诸如填充和对齐）。

Widgets form a hierarchy based on composition.
Each widget nests inside its parent and
can receive context from the parent.
This structure carries all the way up to the root
widget, as this trivial example shows:

若干Widget组合在一起形成一个层级结构。每一个Widget都嵌套在它的父级Widget内部，从父级Widget中接收上下文。
正如下面的简例所示，这样的结构关系一直延伸到根Widget：

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

在上面的代码中，所有被实例化的类都是Widget：
`MaterialApp`， `Scaffold`， `AppBar`， `Text`，
`Center`， `Builder`， `Column`， `SizedBox`， 以及
`ElevatedButton`。

### Widget composition

### Widget组合

As mentioned, Flutter emphasizes widgets as a unit
of composition. Widgets are typically composed of
many other small, single-purpose widgets that
combine to produce powerful effects.

如前所述，Flutter强调Widget是组合的单位。
通常，Widget由许多更小的、功能专一的Widget组合而成，这种组合形式往往会带来强大的功能。

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

Flutter提供了若干布局类Widget，比如`Padding`，`Alignment`，`Row`，`Column`和`Grid`。布局类Widget本身没有可视化外观，他们的作用纯粹是为了控制其他Widget的布局方式。
Flutter还提供了一些基于组合方法构建的实用性Widget，例如常用的`Container`，就是由一些具备布局，绘制，定位和控制尺寸功能的Widget各司其职组合而成的。
另外有一些Widget，他们为用户界面贡献了视觉表征，例如前面简例中出现的`ElevatedButton`和`Text`，诸如`Icon`和`Image`这样的Widget也在其列。

If you run the code from the preceding example,
Flutter paints a button with the text
"Hello, World!" centered on the screen, laid out vertically.
To position these elements, there's a `Center` widget,
which positions its children in the center
of the available space, and a `Column` widget,
which lays out its children vertically one after another.

如果运行前面简例中的代码，Flutter会在屏幕中央以垂直布局的方式铺排一行文字“Hello, World!”和一个按钮。为了定位这些要素，代码用到了两个Widget。
一个是`Center`，作用是把它的子Widget定位在可用空间的中央；另一个是`Column`，作用是把它的子Widget在垂直方向上依次排开。

<img src='/assets/images/docs/fwe/simple_composition_example.png' width="100%" alt="A diagram that shows widget composition with a series of lines and nodes.">


In the [next page][] in this series, you will
learn more about layout in Flutter.

在起步教程的[下一页][]，你会学到更多关于Flutter布局的知识。

### Building widgets

### 构建Widget

To create a user interface in Flutter,
you override the [`build`][] method on widget objects.
All widgets must have a build method,
and it must return another widget. For example,
if you want to add text to the screen with some padding,
you could write it like this:

在Flutter中创建用户界面时，你需要重写Widget对象的[`build`][]方法。
所有的Widget都必须包含一个build方法，这个方法以另一个Widget对象作为返回值。
举例来说，如果你想在屏幕上添加一段带内边距的文本，可以这样编写代码：

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

当这个Widget被创建或者它的依赖项（例如被传入Widget的状态）发生变化时，框架就会调用`build`方法。
这个方法有可能会在每一帧都被调用，所以它不应包含任何副作用，只是完成必要的构建Widget的工作。
要深入了解Flutter如何渲染Widget，请参阅[Flutter架构概览][]。

### Widget state

### Widget状态

The framework introduces two major classes of widget:
stateful and stateless widgets.

Flutter框架将Widget分为两个大类：有状态Widget和无状态Widget。

Widgets that have no mutable state
(they have no class properties
that change over time) subclass [`StatelessWidget`][].
Many built-in widgets are stateless,
such as `Padding`, `Text`, and `Icon`.
When you create your own widgets,
you'll create `Stateless` widgets most of the time.

不包含可变状态（即随时间变化的成员属性）的Widget是无状态的，继承自[`StatelessWidget`][]。
许多内建的Widget都是无状态的，比如`Padding`，`Text`和`Icon`。
你创建的自定义Widget多数情况下是无状态的。

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

另一方面，如果一个Widget的某些特性需要随用户交互或其他因素改变，则这个Widget是有状态的。
举例来说，想象一个包含计数器的Widget，当用户点击某个按钮时，计数器的数值会递增。这个数值就是Widget的状态。每当这个值改变的时候，Widget就需要被重建以更新用户界面的相关部分。
有状态的Widget继承自[`StatefulWidget`][]。由于Widget自身是不可变的，不可变的Widget的可变的状态会被一个独立的State子类（继承自[`State`][]）所持有。
`StatefulWidget`没有声明`build`方法（译注：上文“所有的Widget都必须包含一个build方法”意指每个Widget都有一个build方法与之对应，无论这个build方法由Widget类还是Widget类对应的State子类声明），有状态Widget的用户界面是通过调用Widget对应的State子类对象的build方法来构建的，如下面的例子所示。

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

每次你试图修改状态（比如，增加计数器的数值）时，都需要调用持有这一状态的State子类对象的[`setState`][]方法来完成。
这会使框架收到通知，从而再次调用（译注：第一次调用发生在创建Widget时）Widget对应的State子类对象的build方法来更新用户界面。

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

将状态与Widget分离的机制，使其他Widget可以使用完全相同的方式对待无状态的Widget和有状态的Widget，不用担心会丢失状态。
父Widget可以随时创建子Widget的新实例，无需持有对子Widget的引用。销毁/创建子Widget的实例不会破坏子Widget状态的持久化。
框架会完成在合适的时机为一个Widget匹配并复用一个存在的State对象的全部工作。

There's more information about
[`StatefulWidget`][] objects later in this
series, in the [state management lesson][].

起步教程的后续章节会对[`StatefulWidget`][]进行更深入的讲解，具体请参阅[状态管理][]部分。

## Important widgets to know

## 必须了解的重要Widget

The Flutter SDK includes many built-in widgets,
from the smallest pieces of UI, like `Text`,
to layout widgets, and widgets that style
your application. The following widgets are
the most important to be aware of as you move onto the
next lesson in the learning pathway.

Flutter的SDK提供了很多内建的Widget，小到对应用户界面的基本元素的Widget（比如`Text`），大到布局类Widget和那些影响整个应用风格的Widget。
以下列出的Widget是你在后续学习过程中必须要掌握的重中之重。

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

这一页介绍了Flutter的基本概念（例如Widget），意在引导读者熟悉Flutter和Dart代码。
你不必要求自己充分理解摆在你面前的所有内容，因为后续章节会继续深入的讲接它们。
在起步教程的下一部分，你将使用Flutter创建更复杂的布局，从而实现更引人入胜的用户界面。

If you'd like practice with the
information you learned on this page,
you can read [Building user interfaces with Flutter][].

如果你想实践从本页学到的内容，请移步[用Flutter构建用户界面][]。

[Building user interfaces with Flutter]: /ui
[用Flutter构建用户界面]: /ui
[`build`]: {{site.api}}/flutter/widgets/StatelessWidget/build.html
[next page]: /get-started/fundamentals/layout
[下一页]: /get-started/fundamentals/layout
[Flutter architectural overview]: /resources/architectural-overview
[Flutter架构概览]: /resources/architectural-overview
[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`State`]: {{site.api}}/flutter/widgets/State-class.html
[`setState`]: {{site.api}}/flutter/widgets/State/setState.html
[state management lesson]: /get-started/fundamentals/state-management
[状态管理]: /get-started/fundamentals/state-management
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

为了把教程做的越来越好，我们[期待你的反馈][]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="widgets"
[期待你的反馈]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="widgets"
