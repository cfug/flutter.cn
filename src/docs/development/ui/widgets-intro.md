---
title: Introduction to widgets
title: Widgets 介绍
description: Learn about Flutter's widgets.
description: 了解 Flutter widget 相关的内容。
---

{% assign api = site.api | append: '/flutter' -%}

Flutter widgets are built using a modern framework that takes
inspiration from [React][]. The central idea is that you build
your UI out of widgets. Widgets describe what their view
should look like given their current configuration and state.
When a widget's state changes, the widget rebuilds its description,
which the framework diffs against the previous description in order
to determine the minimal changes needed in the underlying render
tree to transition from one state to the next.

Flutter 从 [React][] 中吸取灵感，通过现代化框架创建出精美的组件。
它的核心思想是用 widget 来构建你的 UI 界面。
Widget 描述了在当前的配置和状态下视图所应该呈现的样子。
当 widget 的状态改变时，它会重新构建其描述（展示的 UI），
框架则会对比前后变化的不同，
以确定底层渲染树从一个状态转换到下一个状态所需的最小更改。

{{site.alert.note}}

  If you would like to become better acquainted with Flutter by diving
  into some code, check out [basic layout codelab][],
  [building layouts][],
  and [adding interactivity to your Flutter app][].

  如果你想通过深入了解一些代码来更好地掌握 Flutter，
  请查阅 [Codelab: Flutter 布局基础教程][basic layout codelab]、
  [Flutter 中的布局][building layouts] 和 
  [为你的 Flutter 应用加入交互体验][adding interactivity to your Flutter app]
  这三篇文章。
{{site.alert.end}}

## Hello world

The minimal Flutter app simply calls the [`runApp()`][]
function with a widget:

创建一个最小的 Flutter 应用简单到仅需调用 [`runApp()`][] 方法并传入一个 widget 即可：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    Center(
      child: Text(
        'Hello, world!',
        textDirection: TextDirection.ltr,
      ),
    ),
  );
}
```

The `runApp()` function takes the given
[`Widget`][] and makes it the root of the widget tree.
In this example, the widget tree consists of two widgets,
the [`Center`][] widget and its child, the [`Text`][] widget.
The framework forces the root widget to cover the screen,
which means the text "Hello, world" ends up centered on screen.
The text direction needs to be specified in this instance;
when the `MaterialApp` widget is used,
this is taken care of for you, as demonstrated later.

`runApp()` 函数会持有传入的 [`Widget`][`Widget`]，
并且使它成为 widget 树中的根节点。
在这个例子中，Widget 树有两个 widgets，
[`Center`][`Center`] widget 及其子
widget ——[`Text`][`Text`] 。
框架会强制让根 widget 铺满整个屏幕，
也就是说“Hello World”会在屏幕上居中显示。
在这个例子我们需要指定文字的方向
，当使用 `MaterialApp` widget 时，
你就无需考虑这一点，之后我们会进一步的描述。

When writing an app, you'll commonly author new widgets that
are subclasses of either [`StatelessWidget`][] or [`StatefulWidget`][],
depending on whether your widget manages any state.
A widget's main job is to implement a [`build()`][] function,
which describes the widget in terms of other, lower-level widgets.
The framework builds those widgets in turn until the process
bottoms out in widgets that represent the underlying [`RenderObject`][],
which computes and describes the geometry of the widget.

在写应用的过程中，取决于是否需要管理状态，
你通常会创建一个新的组件继承
[`StatelessWidget`][] 或
[`StatefulWidget`][]。
Widget 的主要工作是实现 [`build`][`build()`]方法，
该方法根据其它较低级别的 widget 来描述这个 widget。
框架会逐一构建这些 widget，
直到最底层的描述 widget 几何形状的
[`RenderObject`][]。

## Basic widgets

## 基础 widgets

Flutter comes with a suite of powerful basic widgets,
of which the following are commonly used:

Flutter 自带了一套强大的基础 widgets，下面列出了一些常用的：

**[`Text`][]**
<br> The `Text` widget lets you create a run of styled text
  within your application.

**[`Text`][]** 
<br>`Text` widget 可以用来在应用内创建带样式的文本。

**[`Row`][], [`Column`][]**
<br> These flex widgets let you create flexible layouts in
  both the horizontal (`Row`) and vertical (`Column`) directions.
  The design of these objects is based on the web's
  flexbox layout model.
  
**[`Row`][], [`Column`][]**
<br> 这两个 flex widgets 可以让你在水平 (`Row`) 和垂直(`Column`) 
方向创建灵活的布局。它是基于 web 的 flexbox 布局模型设计的。

**[`Stack`][]**
<br> Instead of being linearly oriented (either horizontally or vertically),
  a `Stack` widget lets you place widgets on top of each other in paint order.
  You can then use the [`Positioned`][] widget on children of a
  `Stack` to position them relative to the top, right, bottom,
  or left edge of the stack. Stacks are based on the web's
  absolute positioning layout model.
  
**[`Stack`][]**
<br> `Stack` widget 不是线性（水平或垂直）定位的，而是按照绘制顺序将 widget 堆叠在一起。
  你可以用 [`Positioned`][] widget 作为`Stack` 的子 widget，
  以相对于 `Stack` 的上，右，下，左来定位它们。
  Stack 是基于 Web 中的绝对位置布局模型设计的。

**[`Container`][]**
<br> The `Container` widget lets you create a rectangular visual element.
  A container can be decorated with a [`BoxDecoration`][], such as a
  background, a border, or a shadow. A `Container` can also have margins,
  padding, and constraints applied to its size. In addition, a
  `Container` can be transformed in three dimensional space using a matrix.
  
**[`Container`][]**
<br> `Container` widget 可以用来创建一个可见的矩形元素。
   Container 可以使用 [`BoxDecoration`][] 来进行装饰，如背景，边框，或阴影等。
   `Container` 还可以设置外边距、内边距和尺寸的约束条件等。
   另外，`Container`可以使用矩阵在三维空间进行转换。

Below are some simple widgets that combine these and other widgets:

下面是一些简单的 widget，它们结合了上面提到的 widget 和一些其他的 widget：

```dart
import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget {
  MyAppBar({this.title});

  // Fields in a Widget subclass are always marked "final".

  final Widget title;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56.0, // in logical pixels
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      decoration: BoxDecoration(color: Colors.blue[500]),
      // Row is a horizontal, linear layout.
      child: Row(
        // <Widget> is the type of items in the list.
        children: <Widget>[
          IconButton(
            icon: Icon(Icons.menu),
            tooltip: 'Navigation menu',
            onPressed: null, // null disables the button
          ),
          // Expanded expands its child to fill the available space.
          Expanded(
            child: title,
          ),
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
    );
  }
}

class MyScaffold extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Material is a conceptual piece of paper on which the UI appears.
    return Material(
      // Column is a vertical, linear layout.
      child: Column(
        children: <Widget>[
          MyAppBar(
            title: Text(
              'Example title',
              style: Theme.of(context).primaryTextTheme.headline6,
            ),
          ),
          Expanded(
            child: Center(
              child: Text('Hello, world!'),
            ),
          ),
        ],
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    title: 'My app', // used by the OS task switcher
    home: MyScaffold(),
  ));
}
```

Be sure to have a `uses-material-design: true` entry in the `flutter`
section of your `pubspec.yaml` file. It allows you to use the predefined
set of [Material icons][]. It's generally a good idea to include this line 
if you are using the Materials library.

请确认在 `pubspec.yaml` 文件中 `flutter` 部分有
`uses-material-design: true` 这条，它能让你使用预置的 [Material icons][]。

```yaml
name: my_app
flutter:
  uses-material-design: true
```

Many Material Design widgets need to be inside of a [`MaterialApp`][]
to display properly, in order to inherit theme data.
Therefore, run the application with a `MaterialApp`.

为了获得(`MaterialApp`)主题的数据，
许多 Material Design 的 widget 需要在 [`MaterialApp`][] 中才能显现正常。
因此，请使用 `MaterialApp` 运行应用。

The `MyAppBar` widget creates a [`Container`][] with a height of 56
device-independent pixels with an internal padding of 8 pixels,
both on the left and the right. Inside the container,
`MyAppBar` uses a [`Row`][] layout to organize its children.
The middle child, the `title` widget, is marked as [`Expanded`][],
which means it expands to fill any remaining available space
that hasn't been consumed by the other children.
You can have multiple `Expanded` children and determine the
ratio in which they consume the available space using the
[`flex`][] argument to `Expanded`.

`MyAppBar` widget 创建了一个高 56 独立像素，左右内边距 8 像素的 [`Container`][]。
在容器内，`MyAppBar` 以 [`Row`][] 布局来组织它的子元素。
中间的子 widget（`title` widget），被标记为  [`Expanded`][]，
这意味着它会扩展以填充其它子 widget 未使用的可用空间。
你可以定义多个`Expanded` 子 widget，
并使用 [`flex`][] 参数确定它们占用可用空间的比例。

The `MyScaffold` widget organizes its children in a vertical column.
At the top of the column it places an instance of `MyAppBar`,
passing the app bar a [`Text`][] widget to use as its title.
Passing widgets as arguments to other widgets is a powerful technique
that lets you create generic widgets that can be reused in a wide
variety of ways. Finally, `MyScaffold` uses an
[`Expanded`][] to fill the remaining space with its body,
which consists of a centered message.

`MyScaffold` widget 将其子 widget 组织在垂直列中。
在列的顶部，它放置一个 `MyAppBar` 实例，
并把 [`Text`][] widget 传给它来作为应用的标题。
把 widget 作为参数传递给其他 widget 是一个很强大的技术，
它可以让你以各种方式创建一些可重用的通用组件。
最后，MyScaffold 使用 [`Expanded`][]
来填充剩余空间，其中包含一个居中的消息。

For more information, see [Layouts][].

有关更多信息，请参阅 [布局][Layouts]。

## Using Material Components

## 使用 Material 组件

Flutter provides a number of widgets that help you build apps
that follow Material Design. A Material app starts with the
[`MaterialApp`][] widget, which builds a number of useful widgets
at the root of your app, including a [`Navigator`][],
which manages a stack of widgets identified by strings,
also known as "routes". The `Navigator` lets you transition smoothly
between screens of your application. Using the [`MaterialApp`][]
widget is entirely optional but a good practice.

Flutter 提供了许多 widget，可帮助你构建遵循 Material Design 的应用。
Material 应用以 [`MaterialApp`][] widget 开始，
它在你的应用的底层下构建了许多有用的 widget。
这其中包括 [`Navigator`][]，
它管理由字符串标识的 widget 栈，也称为“routes”。
`Navigator` 可以让你在应用的页面中平滑的切换。
使用 [`MaterialApp`][] widget 不是必须的，
但这是一个很好的做法。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Flutter Tutorial',
    home: TutorialHome(),
  ));
}

class TutorialHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Scaffold is a layout for the major Material Components.
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.menu),
          tooltip: 'Navigation menu',
          onPressed: null,
        ),
        title: Text('Example title'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
      // body is the majority of the screen.
      body: Center(
        child: Text('Hello, world!'),
      ),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Add', // used by assistive technologies
        child: Icon(Icons.add),
        onPressed: null,
      ),
    );
  }
}
```

Now that the code has switched from `MyAppBar` and `MyScaffold` to the
[`AppBar`][] and [`Scaffold`][] widgets, and from `material.dart`,
the app is starting to look at bit more Material.
For example, the app bar has a shadow and the title text inherits the
correct styling automatically. A floating action button is also added.

现在我们已经从 `MyAppBar` 和 `MyScaffold` 切换到了 material.dart 中的 
[`AppBar`][] 和 [`Scaffold`][] widget，
我们的应用更“Material”了一些。
例如，标题栏有了阴影，标题文本会自动继承正确的样式，此外还添加了一个浮动操作按钮。

Notice that widgets are passed as arguments to other widgets.
The [`Scaffold`][] widget takes a number of different widgets as
named arguments, each of which are placed in the `Scaffold`
layout in the appropriate place. Similarly, the
[`AppBar`][] widget lets you pass in widgets for the
[`leading`][] widget, and the [`actions`][] of the [`title`][] widget.
This pattern recurs throughout the framework and is something you
might consider when designing your own widgets.

注意，widget 作为参数传递给了另外的 widget。
[`Scaffold`][] widget 将许多不同的 widget 作为命名参数，
每个 widget 都放在了 Scofford 布局中的合适位置。
同样的，[`AppBar`][] widget 允许我们给 
[`leading`][]、[`title`][] widget 的 [`actions`][] 传递 widget。
这种模式在整个框架会中重复出现，在设计自己的 widget 时可以考虑这种模式。

For more information, see [Material Components widgets][].

有关更多信息，请参阅 [Material 组件][Material Components widgets]。

{{site.alert.note}}

  Material is one of the 2 bundled designs included with Flutter.
  To create an iOS-centric design,
  see the [Cupertino components][] package,
  which has its own versions of [`CupertinoApp`][], and [`CupertinoNavigationBar`][].

  Material 是 Flutter 中两个自带的设计之一，
  如果想要以 iOS 为主的设计，
  可以参考 [Cupertino components][]，
  它有自己版本的 [`CupertinoApp`][] 和 [`CupertinoNavigationBar`][].。
{{site.alert.end}}


## Handling gestures

## 处理手势

Most applications include some form of user interaction with the system.
The first step in building an interactive application is to detect
input gestures. See how that works by creating a simple button:

大多数应用都需要通过系统来处理一些用户交互。
构建交互式应用程序的第一步是检测输入手势，这里通过创建一个简单的按钮来了解其工作原理：

```dart
class MyButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        print('MyButton was tapped!');
      },
      child: Container(
        height: 36.0,
        padding: const EdgeInsets.all(8.0),
        margin: const EdgeInsets.symmetric(horizontal: 8.0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5.0),
          color: Colors.lightGreen[500],
        ),
        child: Center(
          child: Text('Engage'),
        ),
      ),
    );
  }
}
```

The [`GestureDetector`][] widget doesn't have a visual
representation but instead detects gestures made by the
user. When the user taps the [`Container`][],
the `GestureDetector` calls its [`onTap()`][] callback, in this
case printing a message to the console. You can use
`GestureDetector` to detect a variety of input gestures,
including taps, drags, and scales.

[`GestureDetector`][] widget 没有可视化的展现，但它能识别用户的手势。
当用户点击 [`Container`][] 时，
`GestureDetector` 会调用其 [`onTap()`][] 回调，在这里会向控制台打印一条消息。
你可以使用 `GestureDetector` 检测各种输入的手势，包括点击，拖动和缩放。

Many widgets use a [`GestureDetector`][] to provide
optional callbacks for other widgets. For example, the
[`IconButton`][], [`RaisedButton`][], and
[`FloatingActionButton`][] widgets have [`onPressed()`][]
callbacks that are triggered when the user taps the widget.

许多 widget 使用 [`GestureDetector`][] 为其他 widget 提供可选的回调。
例如，[`IconButton`][]、[`RaisedButton`][] 和 [`FloatingActionButton`][] widget 
都有 [`onPressed()`][] 回调，当用户点击 widget 时就会触发这些回调。

For more information, see [Gestures in Flutter][].

有关更多信息，请参阅 [Flutter 中的手势][Gestures in Flutter]。

## Changing widgets in response to input

## 根据用户输入改变 widget

So far, this page has used only stateless widgets.
Stateless widgets receive arguments from their parent widget,
which they store in [`final`][] member variables.
When a widget is asked to [`build()`][], it uses these stored
values to derive new arguments for the widgets it creates.

到目前为止，这个页面仅使用了无状态的 widget。
无状态 widget 接收的参数来自于它的父 widget，
它们储存在 [`final`][] 成员变量中。
当 widget 需要被 [`build()`][] 时，
就是用这些存储的变量为创建的 widget 生成新的参数。

In order to build more complex experiences&mdash;for example,
to react in more interesting ways to user input&mdash;applications
typically carry some state. Flutter uses `StatefulWidgets` to capture
this idea. `StatefulWidgets` are special widgets that know how to generate
`State` objects, which are then used to hold state.
Consider this basic example, using the [`RaisedButton`][] mentioned earlier:

为了构建更复杂的体验，例如，以更有趣的方式对用户输入做出反应&mdash;应用通常带有一些状态。
Flutter 使用 StatefulWidgets 来实现这一想法。
StatefulWidgets 是一种特殊的 widget，
它会生成 State 对象，用于保存状态。看看这个基本的例子，
它使用了前面提到的[`RaisedButton`][]：

```dart
class Counter extends StatefulWidget {
  // This class is the configuration for the state. It holds the
  // values (in this case nothing) provided by the parent and used
  // by the build  method of the State. Fields in a Widget
  // subclass are always marked "final".

  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      // This call to setState tells the Flutter framework that
      // something has changed in this State, which causes it to rerun
      // the build method below so that the display can reflect the
      // updated values. If you change _counter without calling
      // setState(), then the build method won't be called again,
      // and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called,
    // for instance, as done by the _increment method above.
    // The Flutter framework has been optimized to make rerunning
    // build methods fast, so that you can just rebuild anything that
    // needs updating rather than having to individually change
    // instances of widgets.
    return Row(
      children: <Widget>[
        RaisedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
        Text('Count: $_counter'),
      ],
    );
  }
}
```

You might wonder why `StatefulWidget` and `State` are separate objects.
In Flutter, these two types of objects have different life cycles.
`Widgets` are temporary objects, used to construct a presentation of
the application in its current state. `State` objects, on the other
hand, are persistent between calls to
`build()`, allowing them to remember information.

您可能想知道为什么 StatefulWidget 和 State 是独立的对象。
在 Flutter 中，这两种类型的对象具有不同的生命周期。
Widget 是临时对象，用于构造应用当前状态的展示。
而 State 对象在调用 `build()` 之间是持久的，以此来存储信息。

The example above accepts user input and directly uses
the result in its `build()` method.  In more complex applications,
different parts of the widget hierarchy might be
responsible for different concerns; for example, one
widget might present a complex user interface
with the goal of gathering specific information,
such as a date or location, while another widget might
use that information to change the overall presentation.

上面的示例接受用户输入并直接在其 `build()` 方法中直接使用结果。
在更复杂的应用中，widget 层次不同的部分可能负责不同的关注点；
例如，一个 widget 可能呈现复杂的用户界面，
来收集像日期或位置这样特定的信息，而另一个 widget 可能使用该信息来改变整体的展现。

In Flutter, change notifications flow "up" the widget
hierarchy by way of callbacks, while current state flows
"down" to the stateless widgets that do presentation.
The common parent that redirects this flow is the `State`.
The following slightly more complex example shows how
this works in practice:

在 Flutter 中，widget 通过回调得到状态改变的通知，
同时当前状态通知给其他 widget 用于显示。
重定向这一流程的共同父级是 `State`，
下面稍微复杂的示例显示了它在实践中的工作原理：


```dart
class CounterDisplay extends StatelessWidget {
  CounterDisplay({this.count});

  final int count;

  @override
  Widget build(BuildContext context) {
    return Text('Count: $count');
  }
}

class CounterIncrementor extends StatelessWidget {
  CounterIncrementor({this.onPressed});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      onPressed: onPressed,
      child: Text('Increment'),
    );
  }
}

class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      ++_counter;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Row(children: <Widget>[
      CounterIncrementor(onPressed: _increment),
      CounterDisplay(count: _counter),
    ]);
  }
}
```

Notice the creation of two new stateless widgets,
cleanly separating the concerns of _displaying_ the counter
(`CounterDisplay`) and _changing_ the counter (`CounterIncrementor`).
Although the net result is the same as the previous example,
the separation of responsibility allows greater complexity to
be encapsulated in the individual widgets,
while maintaining simplicity in the parent.

注意创建两个新的无状态 widget 的方式，
它清楚地分离了 **显示** 计数器（`CounterDisplay`）和 
**改变** 计数器（`CounterIncrementor`）。
尽管最终结果与前面的示例相同，
但是责任的分离将更大的复杂性封装在各个 widget 中，保证了父级的简单性。

For more information, see:

有关更多信息，请参阅：

* [`StatefulWidget`][]
  
  [API 文档: StatefulWidget][`StatefulWidget`]

* [`setState()`][]

  [API 文档: State.setState][`setState()`]

## Bringing it all together

## 整合在一起

What follows is a more complete example that brings together
these concepts: A hypothetical shopping application displays various
products offered for sale, and maintains a shopping cart for
intended purchases. Start by defining the presentation class,
`ShoppingListItem`:

下面是一个更完整的示例，汇集了上面介绍的概念：
假定一个购物应用显示各种出售的产品，并在购物车中维护想购买的物品。
首先定义一个用于展示的类，`ShoppingListItem`：

```dart
class Product {
  const Product({this.name});
  final String name;
}

typedef void CartChangedCallback(Product product, bool inCart);

class ShoppingListItem extends StatelessWidget {
  ShoppingListItem({this.product, this.inCart, this.onCartChanged})
      : super(key: ObjectKey(product));

  final Product product;
  final bool inCart;
  final CartChangedCallback onCartChanged;

  Color _getColor(BuildContext context) {
    // The theme depends on the BuildContext because different parts
    // of the tree can have different themes.
    // The BuildContext indicates where the build is
    // taking place and therefore which theme to use.

    return inCart ? Colors.black54 : Theme.of(context).primaryColor;
  }

  TextStyle _getTextStyle(BuildContext context) {
    if (!inCart) return null;

    return TextStyle(
      color: Colors.black54,
      decoration: TextDecoration.lineThrough,
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: () {
        onCartChanged(product, inCart);
      },
      leading: CircleAvatar(
        backgroundColor: _getColor(context),
        child: Text(product.name[0]),
      ),
      title: Text(product.name, style: _getTextStyle(context)),
    );
  }
}
```

The `ShoppingListItem` widget follows a common pattern
for stateless widgets.  It stores the values it receives
in its constructor in [`final`][] member variables,
which it then uses during its [`build()`][] function.
For example, the `inCart` boolean toggles between two visual
appearances: one that uses the primary color from the current
theme, and another that uses gray.

`ShoppingListItem` widget 遵循无状态 widget 的通用模式。
它将构造函数中接受到的值存储在 [`final`][] 成员变量中，
然后在 [`build()`][] 函数中使用它们。
例如，`inCart` 布尔值使两种样式进行切换：
一个使用当前主题的主要颜色，另一个使用灰色。

When the user taps the list item, the widget doesn't modify
its `inCart` value directly. Instead, the widget calls the
`onCartChanged` function it received from its parent widget.
This pattern lets you store state higher in the widget
hierarchy, which causes the state to persist for longer periods of time.
In the extreme, the state stored on the widget passed to
[`runApp()`][] persists for the lifetime of the
application.

当用户点击列表中的一项，widget 不会直接改变 `inCart` 的值，
而是通过调用从父 widget 接收到的 `onCartChanged` 函数。
这种方式可以在组件的生命周期中存储状态更长久，
从而使状态持久化。甚至，widget 传给 [`runApp()`][] 
的状态可以持久到整个应用的生命周期。

When the parent receives the `onCartChanged` callback,
the parent updates its internal state, which triggers
the parent to rebuild and create a new instance
of `ShoppingListItem` with the new `inCart` value.
Although the parent creates a new instance of
`ShoppingListItem` when it rebuilds, that operation is cheap
because the framework compares the newly built widgets with the previously
built widgets and applies only the differences to the underlying
[`RenderObject`][].

当父级接收到 `onCartChanged` 回调时，父级会更新其内部状态，
从而触发父级重建并使用新的 `inCart` 值来创建新的 `ShoppingListItem` 实例。
尽管父级在重建时会创建 `ShoppingListItem` 的新实例，
但是由于框架会将新构建的 widget 与先前构建的 widget 进行比较，
仅将差异应用于底层的 [`RenderObject`][]，这种代价是很小的。

Here's an example parent widget that stores mutable state:

这里有一个示例展示父组件是如何存储可变状态：

<!-- skip -->
```dart
class ShoppingList extends StatefulWidget {
  ShoppingList({Key key, this.products}) : super(key: key);

  final List<Product> products;

  // The framework calls createState the first time a widget
  // appears at a given location in the tree.
  // If the parent rebuilds and uses the same type of
  // widget (with the same key), the framework re-uses the State object
  // instead of creating a new State object.

  @override
  _ShoppingListState createState() => _ShoppingListState();
}

class _ShoppingListState extends State<ShoppingList> {
  Set<Product> _shoppingCart = Set<Product>();

  void _handleCartChanged(Product product, bool inCart) {
    setState(() {
      // When a user changes what's in the cart, you need to change
      // _shoppingCart inside a setState call to trigger a rebuild.
      // The framework then calls build, below,
      // which updates the visual appearance of the app.

      if (!inCart)
        _shoppingCart.add(product);
      else
        _shoppingCart.remove(product);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Shopping List'),
      ),
      body: ListView(
        padding: EdgeInsets.symmetric(vertical: 8.0),
        children: widget.products.map((Product product) {
          return ShoppingListItem(
            product: product,
            inCart: _shoppingCart.contains(product),
            onCartChanged: _handleCartChanged,
          );
        }).toList(),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    title: 'Shopping App',
    home: ShoppingList(
      products: <Product>[
        Product(name: 'Eggs'),
        Product(name: 'Flour'),
        Product(name: 'Chocolate chips'),
      ],
    ),
  ));
}
```

The `ShoppingList` class extends [`StatefulWidget`][],
which means this widget stores mutable state.
When the `ShoppingList` widget is first inserted
into the tree, the framework calls the [`createState()`][] function
to create a fresh instance of `_ShoppingListState` to associate with that
location in the tree. (Notice that subclasses of
[`State`][] are typically named with leading underscores to
indicate that they are private implementation details.)
When this widget's parent rebuilds, the parent creates a new instance
of `ShoppingList`, but the framework reuses the `_ShoppingListState`
instance that is already in the tree rather than calling
`createState` again.

`ShoppingList` 类继承自 [`StatefulWidget`][]，
这意味着这个 widget 存储着可变状态。
当 `ShoppingList` 首次插入到 widget 树中时，
框架调用 [`createState()`][] 函数来创建 `_ShoppingListState`
的新实例，以与树中的该位置相关联。
（注意，[`State`][] 的子类通常以下划线开头进行命名，
表示它们的实现细节是私有的）
当该 widget 的父 widget 重建时，
父 widget 首先会创建一个 `ShoppingList` 的实例，
但是框架会复用之前创建的 `_ShoppingListState`，
而不会重新调用 `createState`。

To access properties of the current `ShoppingList`,
the `_ShoppingListState` can use its [`widget`][] property.
If the parent rebuilds and creates a new `ShoppingList`,
the `_ShoppingListState` rebuilds with the new widget value.
If you wish to be notified when the `widget` property changes,
override the [`didUpdateWidget()`][] function, which is passed
an `oldWidget` to let you compare the old widget with
the current widget.

为了访问当前 `ShoppingList` 的属性，`_ShoppingListState` 可以使用它的 [`widget`][] 属性。
当父组件重建一个新的 `ShoppingList` 时，`_ShoppingListState` 会使用新的 [`widget`][] 值来创建。
如果希望在 [`widget`][] 属性更改时收到通知，
则可以重写 [`didUpdateWidget()`][] 函数，
该函数将 `oldWidget` 作为参数传递，
以便将 `oldWidget` 与当前 widget 进行比较。

When handling the `onCartChanged` callback, the `_ShoppingListState`
mutates its internal state by either adding or removing a product from
`_shoppingCart`. To signal to the framework that it changed its internal
state, it wraps those calls in a [`setState()`][] call.
Calling `setState` marks this widget as dirty and schedules it to be rebuilt
the next time your app needs to update the screen.
If you forget to call `setState` when modifying the internal
state of a widget, the framework won't know your widget is
dirty and might not call the widget's [`build()`][] function,
which means the user interface might not update to reflect
the changed state.  By managing state in this way,
you don't need to write separate code for creating and
updating child widgets. Instead, you simply implement the `build`
function, which handles both situations.

当处理 `onCartChanged` 回调时，`_ShoppingListState` 
通过增加或删除 `_shoppingCart` 中的产品来改变其内部状态。
为了通知框架它改变了它的内部状态，
需要调用 [setState()]({{api}}/widgets/State-class.html#setState)。
调用 [setState()]({{api}}/widgets/State-class.html#setState) 
会将该 widget 标记为“dirty”（脏的），
并且计划在下次应用需要更新屏幕时重新构建它。
如果在修改 widget 的内部状态后忘记调用 setState，
框架将不知道这个 widget 是“dirty”(脏的)，
并且可能不会调用 widget 的 [build()]({{api}}/widgets/StatelessWidget/build.html) 方法，
这意味着用户界面可能不会更新以展示新的状态。
通过以这种方式管理状态，你不需要编写用于创建和更新子 widget 的单独代码。
相反，你只需实现 build 函数，它可以处理这两种情况。

## Responding to widget lifecycle events

## 响应 widget 的生命周期事件

After calling [`createState()`][] on the `StatefulWidget`,
the framework inserts the new state object into the tree and
then calls [`initState()`][] on the state object.
A subclass of [`State`][] can override `initState` to do work
that needs to happen just once. For example, override `initState`
to configure animations or to subscribe to platform services.
Implementations of `initState` are required to start
by calling `super.initState`.

在 StatefulWidget 上调用 [`createState()`][] 之后，
框架将新的状态对象插入到树中，
然后在状态对象上调用 [`initState()`][]。
[`State`][] 的子类可以重写 `initState` 来完成只需要发生一次的工作。
例如，重写 `initState` 来配置动画或订阅平台服务。
实现 `initState` 需要调用父类的 `super.initState` 方法来开始。

When a state object is no longer needed,
the framework calls [`dispose()`][] on the state object.
Override the `dispose` function to do cleanup work.
For example, override `dispose` to cancel timers or to
unsubscribe from platform services. Implementations of
`dispose` typically end by calling `super.dispose`.

当不再需要状态对象时，框架会调用状态对象上的 [`dispose()`][] 方法。
可以重写`dispose` 方法来清理状态。
例如，重写 `dispose` 以取消计时器或取消订阅平台服务。
实现 `dispose` 时通常通过调用 `super.dispose` 来结束。

For more information, see [`State`][].

有关更多信息，请参阅 [`State`][]。

## Keys

Use keys to control which widgets the framework matches up
with other widgets when a widget rebuilds. By default, the
framework matches widgets in the current and previous build
according to their [`runtimeType`][] and the order in which they appear.
With keys, the framework requires that the two widgets have
the same [`key`][] as well as the same `runtimeType`.

使用 key 可以控制框架在 widget 重建时与哪些其他 widget 进行匹配。
默认情况下，框架根据它们的 [`runtimeType`][]
以及它们的显示顺序来匹配。使用 key 时，
框架要求两个 widget 具有相同的 [`key`][] 和 `runtimeType`。

Keys are most useful in widgets that build many instances of
the same type of widget. For example, the `ShoppingList` widget,
which builds just enough `ShoppingListItem` instances to
fill its visible region:

Key 在构建相同类型 widget 的多个实例时很有用。
例如，`ShoppingList` widget，它只构建刚刚好足够的 `ShoppingListItem` 实例来填充其可见区域：

 * Without keys, the first entry in the current build
   would always sync with the first entry in the previous build,
   even if, semantically, the first entry in the list just
   scrolled off screen and is no longer visible in the viewport.

   如果没有 key，当前构建中的第一个条目将始终与前一个构建中的第一个条目同步，
   在语义上，列表中的第一个条目如果滚动出屏幕，那么它应该不会再在窗口中可见。

 * By assigning each entry in the list a "semantic" key,
   the infinite list can be more efficient because the
   framework syncs entries with matching semantic keys
   and therefore similar (or identical) visual appearances.
   Moreover, syncing the entries semantically means that
   state retained in stateful child widgets remains attached
   to the same semantic entry rather than the entry in the
   same numerical position in the viewport.

   通过给列表中的每个条目分配为“语义” key，无限列表可以更高效，
   因为框架将通过相匹配的语义 key 来同步条目，
   并因此具有相似（或相同）的可视外观。
   此外，语义上同步条目意味着在有状态子 widget 中，
   保留的状态将附加到相同的语义条目上，而不是附加到相同数字位置上的条目。

For more information, see the [`Key`][] API.

有关更多信息，请参阅 [`Key`]({{api}}/foundation/Key-class.html) API。

## Global keys

## 全局 key

Use global keys to uniquely identify child widgets.
Global keys must be globally unique across the entire
widget hierarchy, unlike local keys which need
only be unique among siblings. Because they are
globally unique, a global key can be used to
retrieve the state associated with a widget.

全局 key 可以用来标识唯一子 widget。
全局 key 在整个 widget 结构中必须是全局唯一的，
而不像本地 key 只需要在兄弟 widget 中唯一。
由于它们是全局唯一的，因此可以使用全局 key 来检索与 widget 关联的状态。

For more information, see the [`GlobalKey`][] API.

有关更多信息，请参阅 [`GlobalKey`][] API。

[runApp()]: {{api}}/widgets/runApp.html
[`actions`]: {{api}}/material/AppBar-class.html#actions
[adding interactivity to your Flutter app]: /docs/development/ui/interactive
[`AppBar`]: {{api}}/material/AppBar-class.html
[basic layout codelab]: /docs/codelabs/layout-basics
[`BoxDecoration`]: {{api}}/painting/BoxDecoration-class.html
[`build()`]: {{api}}/widgets/StatelessWidget/build.html
[building layouts]: /docs/development/ui/layout
[`Center`]: {{api}}/widgets/Center-class.html
[`Column`]: {{api}}/widgets/Column-class.html
[`Container`]: {{api}}/widgets/Container-class.html
[`createState()`]: {{api}}/widgets/StatefulWidget-class.html#createState
[Cupertino components]: /docs/development/ui/widgets/cupertino
[`CupertinoApp`]: {{api}}/cupertino/CupertinoApp-class.html
[`CupertinoNavigationBar`]: {{api}}/cupertino/CupertinoNavigationBar-class.html
[`didUpdateWidget()`]: {{api}}/widgets/State-class.html#didUpdateWidget
[`dispose()`]: {{api}}/widgets/State-class.html#dispose
[`Expanded`]: {{api}}/widgets/Expanded-class.html
[`final`]: {{site.dart-site}}/guides/language/language-tour#final-and-const
[`flex`]: {{api}}/widgets/Expanded-class.html#flex
[`FloatingActionButton`]: {{api}}/material/FloatingActionButton-class.html
[Gestures in Flutter]: /docs/development/ui/advanced/gestures
[`GestureDetector`]: {{api}}/widgets/GestureDetector-class.html
[`GlobalKey`]: {{api}}/widgets/GlobalKey-class.html
[`IconButton`]: {{api}}/material/IconButton-class.html
[`initState()`]: {{api}}/widgets/State-class.html#initState
[`key`]: {{api}}/widgets/Widget-class.html#key
[`Key`]: {{api}}/foundation/Key-class.html
[Layouts]: /docs/development/ui/widgets/layout
[`leading`]: {{api}}/material/AppBar-class.html#leading
[Material Components widgets]: /docs/development/ui/widgets/material
[Material icons]: https://design.google.com/icons/
[`MaterialApp`]: {{api}}/material/MaterialApp-class.html
[`Navigator`]: {{api}}/widgets/Navigator-class.html
[`onPressed()`]: {{api}}/material/RaisedButton-class.html#onPressed
[`onTap()`]: {{api}}/widgets/GestureDetector-class.html#onTap
[`Positioned`]: {{api}}/widgets/Positioned-class.html
[`RaisedButton`]: {{api}}/material/RaisedButton-class.html
[React]: https://reactjs.org
[`RenderObject`]: {{api}}/rendering/RenderObject-class.html
[`Row`]: {{api}}/widgets/Row-class.html
[`runApp()`]: {{api}}/widgets/runApp.html
[`runtimeType`]: {{api}}/widgets/Widget-class.html#runtimeType
[`Scaffold`]: {{api}}/material/Scaffold-class.html
[`setState()`]: {{api}}/widgets/State/setState.html
[`Stack`]: {{api}}/widgets/Stack-class.html
[`State`]: {{api}}/widgets/State-class.html
[`StatefulWidget`]: {{api}}/widgets/StatefulWidget-class.html
[`StatelessWidget`]: {{api}}/widgets/StatelessWidget-class.html
[`Text`]: {{api}}/widgets/Text-class.html
[`title`]: {{api}}/material/AppBar-class.html#title
[`widget`]: {{api}}/widgets/State-class.html#widget
[`Widget`]: {{api}}/widgets/Widget-class.html
