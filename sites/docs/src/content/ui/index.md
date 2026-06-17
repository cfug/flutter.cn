---
# title: Building user interfaces with Flutter
title: 使用 Flutter 构建界面
shortTitle: UI
# description: Introduction to user interface development in Flutter.
description: 介绍如何用 Flutter 构建界面
ai-translated: true
---

<?code-excerpt path-base="ui/widgets_intro/"?>

Flutter widgets are built using a modern framework that takes
inspiration from [React][]. The central idea is that you build
your UI out of widgets. Widgets describe what their view
should look like given their current configuration and state.
When a widget's state changes, the widget rebuilds its description,
which the framework diffs against the previous description in order
to determine the minimal changes needed in the underlying render
tree to transition from one state to the next.

Flutter widget 采用受 [React][] 启发的现代框架构建。
核心思想是用 widget 构建 UI。
Widget 根据当前配置和状态描述其视图应有的外观。
当 widget 的状态改变时，widget 会重建其描述，框架将其与先前的描述进行 diff，
以确定底层渲染树从一种状态过渡到另一种状态所需的最小变更。

:::note
If you would like to become better acquainted with Flutter by diving
into some code, check out [building layouts][],
and [adding interactivity to your Flutter app][].

若想通过编写代码更好地熟悉 Flutter，
请参阅 [构建布局][building layouts] 和 [为 Flutter 应用添加交互性][adding interactivity to your Flutter app]。
:::

## Hello world

## 你好世界

The minimal Flutter app simply calls the [`runApp()`][]
function with a widget:

最简 Flutter 应用只需用 widget 调用 [`runApp()`][] 函数：

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter Hello World hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(
    const Center(
      child: Text(
        'Hello, world!',
        textDirection: TextDirection.ltr,
        style: TextStyle(color: Colors.blue),
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

[`runApp()`][] 函数接收给定的 [`Widget`][] 并将其设为 widget 树的根。
本例中 widget 树由两个 widget 组成：[`Center`][] 及其子节点 [`Text`][]。
框架强制根 widget 覆盖整个屏幕，因此「Hello, world」文字会显示在屏幕中央。
此例需指定文字方向；
使用 `MaterialApp` widget 时会自动处理，后文将演示。

When writing an app, you'll commonly author new widgets that
are subclasses of either [`StatelessWidget`][] or [`StatefulWidget`][],
depending on whether your widget manages any state.
A widget's main job is to implement a [`build()`][] function,
which describes the widget in terms of other, lower-level widgets.
The framework builds those widgets in turn until the process
bottoms out in widgets that represent the underlying [`RenderObject`][],
which computes and describes the geometry of the widget.

编写应用时，
你通常会编写继承 [`StatelessWidget`][] 或 [`StatefulWidget`][] 的新 widget，
取决于 widget 是否管理状态。
widget 的主要工作是实现 [`build()`][] 函数，用更低层级的 widget 描述自身。
框架依次构建这些 widget，直至底层由表示 [`RenderObject`][] 的 widget 结束，
由后者计算并描述 widget 的几何信息。

## Basic widgets

## 基础 widget

Flutter comes with a suite of powerful basic widgets,
of which the following are commonly used:

Flutter 自带一系列强大的基础 widget，以下是常用的一些：

**[`Text`][]**
<br/> The `Text` widget lets you create a run of styled text
  within your application.

**[`Text`][]**
<br/> `Text` widget 让你在应用中创建一段样式化文本。

**[`Row`][], [`Column`][]**
<br/> These flex widgets let you create flexible layouts in
  both the horizontal (`Row`) and vertical (`Column`) directions.
  The design of these objects is based on the web's
  flexbox layout model.

**[`Row`][], [`Column`][]**
<br/> 这些 flex widget 让你在水平 (`Row`) 和垂直 (`Column`) 方向创建灵活布局，
  其设计基于 Web 的 flexbox 布局模型。

**[`Stack`][]**
<br/> Instead of being linearly oriented (either horizontally or vertically),
  a `Stack` widget lets you place widgets on top of each other in paint order.
  You can then use the [`Positioned`][] widget on children of a
  `Stack` to position them relative to the top, right, bottom,
  or left edge of the stack. Stacks are based on the web's
  absolute positioning layout model.

**[`Stack`][]**
<br/> `Stack` widget 不按线性方向（水平或垂直）排列，而按绘制顺序将 widget 叠放。
  可在 `Stack` 的子节点上使用 [`Positioned`][] widget，
  相对于栈的上、右、下、左边缘定位。`Stack` 基于 Web 的绝对定位布局模型。

**[`Container`][]**
<br/> The `Container` widget lets you create a rectangular visual element.
  A container can be decorated with a [`BoxDecoration`][], such as a
  background, a border, or a shadow. A `Container` can also have margins,
  padding, and constraints applied to its size. In addition, a
  `Container` can be transformed in three-dimensional space using a matrix.

**[`Container`][]**
<br/> `Container` widget 用于创建矩形视觉元素，
  可用 [`BoxDecoration`][] 装饰背景、边框或阴影，
  也可设置外边距、内边距和尺寸约束，还可用矩阵在三维空间中变换。

Below are some simple widgets that combine these and other widgets:

下面是组合这些及其他 widget 的一些简单示例：

<?code-excerpt "lib/main_myappbar.dart"?>
```dartpad title="Flutter combining widgets hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

class MyAppBar extends StatelessWidget {
  const MyAppBar({required this.title, super.key});

  // Fields in a Widget subclass are always marked "final".

  final Widget title;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56, // in logical pixels
      padding: const EdgeInsets.symmetric(horizontal: 8),
      decoration: BoxDecoration(color: Colors.blue[500]),
      // Row is a horizontal, linear layout.
      child: Row(
        children: [
          const IconButton(
            icon: Icon(Icons.menu),
            tooltip: 'Navigation menu',
            onPressed: null, // null disables the button
          ),
          // Expanded expands its child
          // to fill the available space.
          Expanded(child: title),
          const IconButton(
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
  const MyScaffold({super.key});

  @override
  Widget build(BuildContext context) {
    // Material is a conceptual piece
    // of paper on which the UI appears.
    return Material(
      // Column is a vertical, linear layout.
      child: Column(
        children: [
          MyAppBar(
            title: Text(
              'Example title',
              style:
                  Theme.of(context) //
                      .primaryTextTheme
                      .titleLarge,
            ),
          ),
          const Expanded(child: Center(child: Text('Hello, world!'))),
        ],
      ),
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      title: 'My app', // used by the OS task switcher
      home: SafeArea(child: MyScaffold()),
    ),
  );
}
```

Be sure to have a `uses-material-design: true` entry in the `flutter`
section of your `pubspec.yaml` file. It allows you to use the predefined
set of [Material icons][]. It's generally a good idea to include this line
if you are using the Materials library.

请确保在 `pubspec.yaml` 的 `flutter` 段中包含 `uses-material-design: true` 条目。
这样你才能使用预定义的 [Material 图标][Material icons] 集。
若使用 Materials 库，通常建议包含这一行。

```yaml
name: my_app
flutter:
  uses-material-design: true
```

Many Material Design widgets need to be inside of a [`MaterialApp`][]
to display properly, in order to inherit theme data.
Therefore, run the application with a `MaterialApp`.

许多 Material Design widget 需要放在 [`MaterialApp`][] 内才能正确显示并继承主题数据。
因此请用 `MaterialApp` 运行应用。

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

`MyAppBar` widget 创建一个高度为 56 逻辑像素的 [`Container`][]，左右内边距各为 8 像素。
在容器内，`MyAppBar` 使用 [`Row`][] 布局组织子节点。
中间的 `title` widget 标记为 [`Expanded`][]，表示它会扩展以填满其他子节点未占用的剩余空间。
可以有多个 `Expanded` 子节点，并通过 `Expanded` 的 [`flex`][] 参数决定它们占用可用空间的比例。

The `MyScaffold` widget organizes its children in a vertical column.
At the top of the column it places an instance of `MyAppBar`,
passing the app bar a [`Text`][] widget to use as its title.
Passing widgets as arguments to other widgets is a powerful technique
that lets you create generic widgets that can be reused in a wide
variety of ways. Finally, `MyScaffold` uses an
[`Expanded`][] to fill the remaining space with its body,
which consists of a centered message.

`MyScaffold` widget 在垂直列中组织子节点。
列顶部放置 `MyAppBar` 实例，并向应用栏传入用作标题的 [`Text`][] widget。
将 widget 作为参数传给其他 widget 是一种强大技巧，可创建可在多种场景复用的通用 widget。
最后，`MyScaffold` 用 [`Expanded`][] 以居中消息填充剩余空间作为 body。

For more information, check out [Layouts][].

更多信息请参阅 [布局][Layouts]。

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

Flutter 提供多种 widget，帮助你构建符合 Material Design 的应用。
Material 应用以 [`MaterialApp`][] widget 开头，它在应用根节点构建多种实用 widget，
包括 [`Navigator`][]——管理以字符串标识的 widget 栈，
即「路由」。`Navigator` 让你在应用各界面间平滑过渡。
使用 [`MaterialApp`][] widget 完全可选，但是良好实践。

<?code-excerpt "lib/main_tutorial.dart"?>
```dartpad title="Flutter Material design hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(title: 'Flutter Tutorial', home: TutorialHome()));
}

class TutorialHome extends StatelessWidget {
  const TutorialHome({super.key});

  @override
  Widget build(BuildContext context) {
    // Scaffold is a layout for
    // the major Material Components.
    return Scaffold(
      appBar: AppBar(
        leading: const IconButton(
          icon: Icon(Icons.menu),
          tooltip: 'Navigation menu',
          onPressed: null,
        ),
        title: const Text('Example title'),
        actions: const [
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          ),
        ],
      ),
      // body is the majority of the screen.
      body: const Center(child: Text('Hello, world!')),
      floatingActionButton: const FloatingActionButton(
        tooltip: 'Add', // used by assistive technologies
        onPressed: null,
        child: Icon(Icons.add),
      ),
    );
  }
}
```

Now that the code has switched from `MyAppBar` and `MyScaffold` to the
[`AppBar`][] and [`Scaffold`][] widgets, and from `material.dart`,
the app is starting to look a bit more Material.
For example, the app bar has a shadow and the title text inherits the
correct styling automatically. A floating action button is also added.

现在代码已从 `MyAppBar` 和 `MyScaffold` 切换为 [`AppBar`][] 和 [`Scaffold`][] widget，
并改用 `material.dart`，应用开始更具 Material 风格。
例如，应用栏带有阴影，标题文字会自动继承正确样式，还添加了浮动操作按钮。

Notice that widgets are passed as arguments to other widgets.
The [`Scaffold`][] widget takes a number of different widgets as
named arguments, each of which are placed in the `Scaffold`
layout in the appropriate place. Similarly, the
[`AppBar`][] widget lets you pass in widgets for the
[`leading`][] widget, and the [`actions`][] of the [`title`][] widget.
This pattern recurs throughout the framework and is something you
might consider when designing your own widgets.

注意 widget 会作为参数传给其他 widget。
[`Scaffold`][] widget 接收多种不同 widget 作为命名参数，
各自放在 `Scaffold` 布局的合适位置。
同样，[`AppBar`][] widget 让你为 [`leading`][]、[`title`][] 的 [`actions`][] 传入 widget。
这一模式在框架中反复出现，设计自己的 widget 时也可考虑采用。

For more information, check out [Material Components widgets][].

更多信息请参阅 [Material 组件 widget][Material Components widgets]。

:::note
Material is one of the 2 bundled designs included with Flutter.
To create an iOS-centric design,
check out the [Cupertino components][] package,
which has its own versions of
[`CupertinoApp`][], and [`CupertinoNavigationBar`][].

Material 是 Flutter 内置的两套设计之一。
若要创建以 iOS 为中心的设计，
请参阅 [Cupertino 组件][Cupertino components] package，
其中包含 [`CupertinoApp`][] 和 [`CupertinoNavigationBar`][] 等自有版本。
:::

## Handling gestures

## 处理手势

Most applications include some form of user interaction with the system.
The first step in building an interactive application is to detect
input gestures. See how that works by creating a simple button:

大多数应用都包含与系统的某种用户交互。
构建交互式应用的第一步是检测输入手势。
通过创建一个简单按钮来了解其工作原理：

<?code-excerpt "lib/main_mybutton.dart"?>
```dartpad title="Flutter button hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

class MyButton extends StatelessWidget {
  const MyButton({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        print('MyButton was tapped!');
      },
      child: Container(
        height: 50,
        padding: const EdgeInsets.all(8),
        margin: const EdgeInsets.symmetric(horizontal: 8),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5),
          color: Colors.lightGreen[500],
        ),
        child: const Center(child: Text('Engage')),
      ),
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(body: Center(child: MyButton())),
    ),
  );
}
```

The [`GestureDetector`][] widget doesn't have a visual
representation but instead detects gestures made by the
user. When the user taps the [`Container`][],
the `GestureDetector` calls its [`onTap()`][] callback, in this
case printing a message to the console. You can use
`GestureDetector` to detect a variety of input gestures,
including taps, drags, and scales.

[`GestureDetector`][] widget 没有视觉表现，而是检测用户做出的手势。
当用户点击 [`Container`][] 时，`GestureDetector` 会调用其 [`onTap()`][] 回调，本例中向控制台打印消息。
你可以用 `GestureDetector` 检测多种输入手势，包括点击、拖动和缩放。

Many widgets use a [`GestureDetector`][] to provide
optional callbacks for other widgets. For example, the
[`IconButton`][], [`ElevatedButton`][], and
[`FloatingActionButton`][] widgets have [`onPressed()`][]
callbacks that are triggered when the user taps the widget.

许多 widget 内部使用 [`GestureDetector`][] 为其他 widget 提供可选回调。
例如，[`IconButton`][]、[`ElevatedButton`][] 和 [`FloatingActionButton`][] widget 具有 [`onPressed()`][] 回调，
在用户点击 widget 时触发。

For more information, check out [Gestures in Flutter][].

更多信息请参阅 [Flutter 中的手势][Gestures in Flutter]。

## Changing widgets in response to input

## 根据输入更改 widget

So far, this page has used only stateless widgets.
Stateless widgets receive arguments from their parent widget,
which they store in [`final`][] member variables.
When a widget is asked to [`build()`][], it uses these stored
values to derive new arguments for the widgets it creates.

到目前为止，本页只使用了无状态 widget。
无状态 widget 从父 widget 接收参数，并存入 [`final`][] 成员变量。
当要求 widget [`build()`][] 时，它用这些存储的值为其创建的 widget 推导新参数。

In order to build more complex experiences&mdash;for example,
to react in more interesting ways to user input&mdash;applications
typically carry some state. Flutter uses `StatefulWidgets` to capture
this idea. `StatefulWidgets` are special widgets that know how to generate
`State` objects, which are then used to hold state.
Consider this basic example, using the [`ElevatedButton`][] mentioned earlier:

要构建更复杂的体验——例如以更有趣的方式响应用户输入——应用通常需要持有一些状态。
Flutter 用 `StatefulWidget` 表达这一概念。
`StatefulWidget` 是知道如何生成 `State` 对象的特殊 widget，
再由 `State` 对象保存状态。
下面是一个使用前文 [`ElevatedButton`][] 的基础示例：

<?code-excerpt "lib/main_counter.dart"?>
```dartpad title="Flutter state management hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

class Counter extends StatefulWidget {
  // This class is the configuration for the state.
  // It holds the values (in this case nothing) provided
  // by the parent and used by the build  method of the
  // State. Fields in a Widget subclass are always marked
  // "final".

  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      // This call to setState tells the Flutter framework
      // that something has changed in this State, which
      // causes it to rerun the build method below so that
      // the display can reflect the updated values. If you
      // change _counter without calling setState(), then
      // the build method won't be called again, and so
      // nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called,
    // for instance, as done by the _increment method above.
    // The Flutter framework has been optimized to make
    // rerunning build methods fast, so that you can just
    // rebuild anything that needs updating rather than
    // having to individually changes instances of widgets.
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        ElevatedButton(onPressed: _increment, child: const Text('Increment')),
        const SizedBox(width: 16),
        Text('Count: $_counter'),
      ],
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(body: Center(child: Counter())),
    ),
  );
}
```

You might wonder why `StatefulWidget` and `State` are separate objects.
In Flutter, these two types of objects have different life cycles.
`Widgets` are temporary objects, used to construct a presentation of
the application in its current state. `State` objects, on the other
hand, are persistent between calls to
`build()`, allowing them to remember information.

你可能会疑惑为何 `StatefulWidget` 与 `State` 是分开的对象。
在 Flutter 中，这两类对象生命周期不同。
`Widget` 是临时对象，用于构建应用在某一状态下的呈现。
`State` 对象则在多次调用 `build()` 之间保持存在，从而能记住信息。

The example above accepts user input and directly uses
the result in its `build()` method.  In more complex applications,
different parts of the widget hierarchy might be
responsible for different concerns; for example, one
widget might present a complex user interface
with the goal of gathering specific information,
such as a date or location, while another widget might
use that information to change the overall presentation.

上面的示例接受用户输入并直接在 `build()` 方法中使用结果。
在更复杂的应用中，widget 树的不同部分可能负责不同关注点；
例如，一个 widget 可能展示用于收集日期或位置等特定信息的复杂界面，
另一个 widget 则可能用这些信息改变整体呈现。

In Flutter, change notifications flow "up" the widget
hierarchy by way of callbacks, while current state flows
"down" to the stateless widgets that do presentation.
The common parent that redirects this flow is the `State`.
The following slightly more complex example shows how
this works in practice:

在 Flutter 中，变更通知通过回调沿 widget 层次结构向上流动，
当前状态则向下流向负责呈现的无状态 widget。
重定向这一流动的共同父级是 `State`。
下面稍复杂的示例展示其实际运作方式：

<?code-excerpt "lib/main_counterdisplay.dart"?>
```dartpad title="Flutter Hello World hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

class CounterDisplay extends StatelessWidget {
  const CounterDisplay({required this.count, super.key});

  final int count;

  @override
  Widget build(BuildContext context) {
    return Text('Count: $count');
  }
}

class CounterIncrementor extends StatelessWidget {
  const CounterIncrementor({required this.onPressed, super.key});

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(onPressed: onPressed, child: const Text('Increment'));
  }
}

class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
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
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        CounterIncrementor(onPressed: _increment),
        const SizedBox(width: 16),
        CounterDisplay(count: _counter),
      ],
    );
  }
}

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(body: Center(child: Counter())),
    ),
  );
}
```

Notice the creation of two new stateless widgets,
cleanly separating the concerns of _displaying_ the counter
(`CounterDisplay`) and _changing_ the counter (`CounterIncrementor`).
Although the net result is the same as the previous example,
the separation of responsibility allows greater complexity to
be encapsulated in the individual widgets,
while maintaining simplicity in the parent.

注意这里创建了两个新的无状态 widget，
清晰分离了 **显示** 计数器 (`CounterDisplay`) 与 **修改** 计数器 (`CounterIncrementor`) 的职责。
尽管总体结果与前一示例相同，职责分离使各 widget 能封装更复杂的逻辑，同时保持父 widget 简洁。

For more information, check out:

更多信息请参阅：

* [`StatefulWidget`][]
* [`setState()`][]

## Bringing it all together

## 综合示例

What follows is a more complete example that brings together
these concepts: A hypothetical shopping application displays various
products offered for sale, and maintains a shopping cart for
intended purchases. Start by defining the presentation class,
`ShoppingListItem`:

下面是一个更完整的示例，综合上述概念：
假设某购物应用展示待售商品，并维护意向购买的购物车。
先从定义呈现类 `ShoppingListItem` 开始：

<?code-excerpt "lib/main_shoppingitem.dart"?>
```dartpad title="Flutter complete shopping list item hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

class Product {
  const Product({required this.name});

  final String name;
}

typedef CartChangedCallback = void Function(Product product, bool inCart);

class ShoppingListItem extends StatelessWidget {
  ShoppingListItem({
    required this.product,
    required this.inCart,
    required this.onCartChanged,
  }) : super(key: ObjectKey(product));

  final Product product;
  final bool inCart;
  final CartChangedCallback onCartChanged;

  Color _getColor(BuildContext context) {
    // The theme depends on the BuildContext because different
    // parts of the tree can have different themes.
    // The BuildContext indicates where the build is
    // taking place and therefore which theme to use.

    return inCart //
        ? Colors.black54
        : Theme.of(context).primaryColor;
  }

  TextStyle? _getTextStyle(BuildContext context) {
    if (!inCart) return null;

    return const TextStyle(
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

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Center(
          child: ShoppingListItem(
            product: const Product(name: 'Chips'),
            inCart: true,
            onCartChanged: (product, inCart) {},
          ),
        ),
      ),
    ),
  );
}
```

The `ShoppingListItem` widget follows a common pattern
for stateless widgets.  It stores the values it receives
in its constructor in [`final`][] member variables,
which it then uses during its [`build()`][] function.
For example, the `inCart` boolean toggles between two visual
appearances: one that uses the primary color from the current
theme, and another that uses gray.

`ShoppingListItem` widget 遵循无状态 widget 的常见模式：
将构造函数接收的值存入 [`final`][] 成员变量，并在 [`build()`][] 函数中使用。
例如，`inCart` 布尔值在两种视觉外观间切换：
一种使用当前主题的主色，另一种使用灰色。

When the user taps the list item, the widget doesn't modify
its `inCart` value directly. Instead, the widget calls the
`onCartChanged` function it received from its parent widget.
This pattern lets you store state higher in the widget
hierarchy, which causes the state to persist for longer periods of time.
In the extreme, the state stored on the widget passed to
[`runApp()`][] persists for the lifetime of the
application.

当用户点击列表项时，widget 不会直接修改 `inCart` 值，
而是调用从父 widget 收到的 `onCartChanged` 函数。
这一模式让你能把状态保存在 widget 层次结构更高处，使状态持续更久。
极端情况下，传给 [`runApp()`][] 的 widget 上保存的状态会贯穿整个应用生命周期。

When the parent receives the `onCartChanged` callback,
the parent updates its internal state, which triggers
the parent to rebuild and create a new instance
of `ShoppingListItem` with the new `inCart` value.
Although the parent creates a new instance of
`ShoppingListItem` when it rebuilds, that operation is cheap
because the framework compares the newly built widgets with the previously
built widgets and applies only the differences to the underlying
[`RenderObject`][].

当父级收到 `onCartChanged` 回调时，会更新内部状态，从而触发父级重建并创建带有新 `inCart` 值的 `ShoppingListItem` 新实例。
尽管父级重建时会创建新的 `ShoppingListItem` 实例，但这一操作开销很小，
因为框架会将新构建的 widget 与先前构建的 widget 比较，并仅将差异应用到底层 [`RenderObject`][]。

Here's an example parent widget that stores mutable state:

下面是一个保存可变状态的父 widget 示例：

<?code-excerpt "lib/main_shoppinglist.dart"?>
```dartpad title="Flutter storing mutable state hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

class Product {
  const Product({required this.name});

  final String name;
}

typedef CartChangedCallback = void Function(Product product, bool inCart);

class ShoppingListItem extends StatelessWidget {
  ShoppingListItem({
    required this.product,
    required this.inCart,
    required this.onCartChanged,
  }) : super(key: ObjectKey(product));

  final Product product;
  final bool inCart;
  final CartChangedCallback onCartChanged;

  Color _getColor(BuildContext context) {
    // The theme depends on the BuildContext because different
    // parts of the tree can have different themes.
    // The BuildContext indicates where the build is
    // taking place and therefore which theme to use.

    return inCart //
        ? Colors.black54
        : Theme.of(context).primaryColor;
  }

  TextStyle? _getTextStyle(BuildContext context) {
    if (!inCart) return null;

    return const TextStyle(
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

class ShoppingList extends StatefulWidget {
  const ShoppingList({required this.products, super.key});

  final List<Product> products;

  // The framework calls createState the first time
  // a widget appears at a given location in the tree.
  // If the parent rebuilds and uses the same type of
  // widget (with the same key), the framework re-uses
  // the State object instead of creating a new State object.

  @override
  State<ShoppingList> createState() => _ShoppingListState();
}

class _ShoppingListState extends State<ShoppingList> {
  final _shoppingCart = <Product>{};

  void _handleCartChanged(Product product, bool inCart) {
    setState(() {
      // When a user changes what's in the cart, you need
      // to change _shoppingCart inside a setState call to
      // trigger a rebuild.
      // The framework then calls build, below,
      // which updates the visual appearance of the app.

      if (!inCart) {
        _shoppingCart.add(product);
      } else {
        _shoppingCart.remove(product);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Shopping List')),
      body: ListView(
        padding: const EdgeInsets.symmetric(vertical: 8),
        children: widget.products.map((product) {
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
  runApp(
    const MaterialApp(
      title: 'Shopping App',
      home: ShoppingList(
        products: [
          Product(name: 'Eggs'),
          Product(name: 'Flour'),
          Product(name: 'Chocolate chips'),
        ],
      ),
    ),
  );
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

`ShoppingList` 类继承 [`StatefulWidget`][]，表示该 widget 保存可变状态。
当 `ShoppingList` widget 首次插入树时，
框架调用 [`createState()`][] 创建新的 `_ShoppingListState` 实例并与树中该位置关联。
（注意 [`State`][] 的子类通常以下划线开头，表示它们是私有实现细节。）
当该 widget 的父级重建时，父级会创建新的 `ShoppingList` 实例，
但框架会复用树中已有的 `_ShoppingListState` 实例，而不会再次调用 `createState`。

To access properties of the current `ShoppingList`,
the `_ShoppingListState` can use its [`widget`][] property.
If the parent rebuilds and creates a new `ShoppingList`,
the `_ShoppingListState` rebuilds with the new widget value.
If you wish to be notified when the `widget` property changes,
override the [`didUpdateWidget()`][] function, which is passed
an `oldWidget` to let you compare the old widget with
the current widget.

要访问当前 `ShoppingList` 的属性，`_ShoppingListState` 可使用其 [`widget`][] 属性。
若父级重建并创建新的 `ShoppingList`，`_ShoppingListState` 会用新的 widget 值重建。
若希望在 `widget` 属性变化时收到通知，可重写 [`didUpdateWidget()`][] 函数，
它会传入 `oldWidget` 以便你将旧 widget 与当前 widget 比较。

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

处理 `onCartChanged` 回调时，
`_ShoppingListState` 通过向 `_shoppingCart` 添加或移除商品来变更内部状态。
为向框架表明内部状态已改变，这些调用应包在 [`setState()`][] 中。
调用 `setState` 会将该 widget 标记为 dirty，并在应用下次需要更新屏幕时安排重建。
若在修改 widget 内部状态时忘记调用 `setState`，框架不会知道 widget 已 dirty，
可能不会调用 widget 的 [`build()`][] 函数，界面也就可能不会反映变更后的状态。
用这种方式管理状态时，你无需为创建和更新子 widget 分别编写代码，
只需实现 `build` 函数，它可同时处理两种情况。

## Responding to widget lifecycle events

## 响应 widget 生命周期事件

After calling [`createState()`][] on the `StatefulWidget`,
the framework inserts the new state object into the tree and
then calls [`initState()`][] on the state object.
A subclass of [`State`][] can override `initState` to do work
that needs to happen just once. For example, override `initState`
to configure animations or to subscribe to platform services.
Implementations of `initState` are required to start
by calling `super.initState`.

在 `StatefulWidget` 上调用 [`createState()`][] 之后，框架将新的 state 对象插入树，
然后在该 state 对象上调用 [`initState()`][]。
[`State`][] 的子类可重写 `initState` 以执行只需进行一次的工作，
例如配置动画或订阅平台服务。`initState` 的实现必须先调用 `super.initState`。

When a state object is no longer needed,
the framework calls [`dispose()`][] on the state object.
Override the `dispose` function to do cleanup work.
For example, override `dispose` to cancel timers or to
unsubscribe from platform services. Implementations of
`dispose` typically end by calling `super.dispose`.

当不再需要 state 对象时，框架会在该 state 对象上调用 [`dispose()`][]。
可重写 `dispose` 函数进行清理，例如取消定时器或取消订阅平台服务。
`dispose` 的实现通常以调用 `super.dispose` 结束。

For more information, check out [`State`][].

更多信息请参阅 [`State`][]。

## Key

Use keys to control which widgets the framework matches up
with other widgets when a widget rebuilds. By default, the
framework matches widgets in the current and previous build
according to their [`runtimeType`][] and the order in which they appear.
With keys, the framework requires that the two widgets have
the same [`key`][] as well as the same `runtimeType`.

使用 key 可控制 widget 重建时框架将哪些 widget 相互匹配。
默认情况下，框架根据 [`runtimeType`][] 及出现顺序匹配当前构建与先前构建中的 widget。
有了 key，框架还要求两个 widget 具有相同的 [`key`][] 以及相同的 `runtimeType`。

Keys are most useful in widgets that build many instances of
the same type of widget. For example, the `ShoppingList` widget,
which builds just enough `ShoppingListItem` instances to
fill its visible region:

key 在构建大量同类型 widget 实例时最有用。
例如 `ShoppingList` widget 会构建刚好填满可见区域的 `ShoppingListItem` 实例：

 * Without keys, the first entry in the current build
   would always sync with the first entry in the previous build,
   even if, semantically, the first entry in the list just
   scrolled off screen and is no longer visible in the viewport.

   没有 key 时，当前构建中的第一项总会与先前构建中的第一项同步，
   即使从语义上讲列表第一项已滚出屏幕、在视口中不再可见。

 * By assigning each entry in the list a "semantic" key,
   the infinite list can be more efficient because the
   framework syncs entries with matching semantic keys
   and therefore similar (or identical) visual appearances.
   Moreover, syncing the entries semantically means that
   state retained in stateful child widgets remains attached
   to the same semantic entry rather than the entry in the
   same numerical position in the viewport.

   为列表中每项分配「语义」key 后，无限列表可以更高效，
   因为框架会同步具有匹配语义 key 的项，从而保持相似（或相同）的视觉外观。
   此外，按语义同步项意味着有状态子 widget 中保留的状态会附着在相同语义项上，
   而不是视口中相同数值位置的项上。

For more information, check out the [`Key`][] API.

更多信息请参阅 [`Key`][] API。

## Global keys

## Global key

Use global keys to uniquely identify child widgets.
Global keys must be globally unique across the entire
widget hierarchy, unlike local keys which need
only be unique among siblings. Because they are
globally unique, a global key can be used to
retrieve the state associated with a widget.

使用 global key 可唯一标识子 widget。
global key 必须在整个 widget 层次结构中全局唯一，
而 local key 只需在兄弟节点间唯一。
由于全局唯一，global key 可用于获取与 widget 关联的 state。

For more information, check out the [`GlobalKey`][] API.

更多信息请参阅 [`GlobalKey`][] API。

[`actions`]: {{site.api}}/flutter/material/AppBar-class.html#actions
[adding interactivity to your Flutter app]: /ui/interactivity
[`AppBar`]: {{site.api}}/flutter/material/AppBar-class.html
[`BoxDecoration`]: {{site.api}}/flutter/painting/BoxDecoration-class.html
[`build()`]: {{site.api}}/flutter/widgets/StatelessWidget/build.html
[building layouts]: /ui/layout
[`Center`]: {{site.api}}/flutter/widgets/Center-class.html
[`Column`]: {{site.api}}/flutter/widgets/Column-class.html
[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`createState()`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html#createState
[Cupertino components]: /ui/widgets/cupertino
[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`CupertinoNavigationBar`]: {{site.api}}/flutter/cupertino/CupertinoNavigationBar-class.html
[`didUpdateWidget()`]: {{site.api}}/flutter/widgets/State-class.html#didUpdateWidget
[`dispose()`]: {{site.api}}/flutter/widgets/State-class.html#dispose
[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html
[`final`]: {{site.dart-site}}/language/variables#final-and-const
[`flex`]: {{site.api}}/flutter/widgets/Expanded-class.html#flex
[`FloatingActionButton`]: {{site.api}}/flutter/material/FloatingActionButton-class.html
[Gestures in Flutter]: /ui/interactivity/gestures
[`GestureDetector`]: {{site.api}}/flutter/widgets/GestureDetector-class.html
[`GlobalKey`]: {{site.api}}/flutter/widgets/GlobalKey-class.html
[`IconButton`]: {{site.api}}/flutter/material/IconButton-class.html
[`initState()`]: {{site.api}}/flutter/widgets/State-class.html#initState
[`key`]: {{site.api}}/flutter/widgets/Widget-class.html#key
[`Key`]: {{site.api}}/flutter/foundation/Key-class.html
[Layouts]: /ui/widgets/layout
[`leading`]: {{site.api}}/flutter/material/AppBar-class.html#leading
[Material Components widgets]: /ui/widgets/material
[Material icons]: https://design.google.com/icons/
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`onPressed()`]: {{site.api}}/flutter/material/ElevatedButton-class.html#onPressed
[`onTap()`]: {{site.api}}/flutter/widgets/GestureDetector-class.html#onTap
[`Positioned`]: {{site.api}}/flutter/widgets/Positioned-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[React]: https://react.dev
[`RenderObject`]: {{site.api}}/flutter/rendering/RenderObject-class.html
[`Row`]: {{site.api}}/flutter/widgets/Row-class.html
[`runApp()`]: {{site.api}}/flutter/widgets/runApp.html
[`runtimeType`]: {{site.api}}/flutter/widgets/Widget-class.html#runtimeType
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`setState()`]: {{site.api}}/flutter/widgets/State/setState.html
[`Stack`]: {{site.api}}/flutter/widgets/Stack-class.html
[`State`]: {{site.api}}/flutter/widgets/State-class.html
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html
[`Text`]: {{site.api}}/flutter/widgets/Text-class.html
[`title`]: {{site.api}}/flutter/material/AppBar-class.html#title
[`widget`]: {{site.api}}/flutter/widgets/State-class.html#widget
[`Widget`]: {{site.api}}/flutter/widgets/Widget-class.html
