---
title: Fade a widget in and out
title: Widget 的淡入淡出效果
prev:
  title: Animate the properties of a Container
  title: Container 里的动画渐变效果
  path: /docs/cookbook/animation/animated-container
next:
  title: Add a Drawer to a screen
  title: 在屏幕上添加一个 Drawer
  path: /docs/cookbook/design/drawer
---

UI developers often need to show and hide elements on screen.
However, quickly popping elements on and off the screen can
feel jarring to end users. Instead,
fade elements in and out with an opacity animation to create
a smooth experience.

在实现 UI 设计时，我们经常需要在屏幕上显示或隐藏各种元素。如若这个过程只是让某个元素快速地出现或者消失，用户们肯定不买帐。我们一般会使用不透明动画让元素淡入淡出，以创建出更加流畅的用户体验。

The [`AnimatedOpacity`][] widget makes it easy to perform opacity
animations. This recipe uses the following steps:

在 Flutter 中，你可以使用 [`AnimatedOpacity`][] widget 来完成这个效果，请参见下面的步骤：

## Directions

## 步骤

  1. Show a box to fade in and out

     创建一个用来淡入淡出的方框
  
  2. Define a `StatefulWidget`
  
     定义一个 `StatefulWidget`
  
  3. Display a button that toggles the visibility
  
     显示一个用于切换可见状态的按钮

  4. Fade the box in and out

     淡入淡出方框

## 1. Create a box to fade in and out

## 1. 创建一个用来淡入淡出的方框

First, create something to fade in and out. For this example,
draw a green box on screen.

首先是创建一个来淡入淡出的东西。在这个示例中，你将在屏幕上绘制一个绿色的方框。

<!-- skip -->
```dart
Container(
  width: 200.0,
  height: 200.0,
  color: Colors.green,
);
```

## 2. Define a `StatefulWidget`

## 2. 定义一个 `StatefulWidget`

Now that you have a green box to animate,
you need a way to know whether the box should be visible.
To accomplish this, use a [`StatefulWidget`][].

我们要对这个绿色的方框进行动画。
那么为了表示这个方框的状态是否可见，你需要使用 [`StatefulWidget`][]。

A `StatefulWidget` is a class that creates a `State` object.
The `State` object holds some data about the app and provides a way to
update that data. When updating the data,
you can also ask Flutter to rebuild the UI with those changes.

`StatefulWidget` 是一个类，它将会创建一个 `State` 对象。
而这个 `State` 对象将包含与这个应用相关的一些数据，并且能够更新它们。
当你更新数据时，可以让Flutter使用这些更改去重建用户界面。

In this case, you have one piece of data:
a boolean representing whether the button is visible.

在这个示例中，我们将使用一个布尔值来表示其是否可见。

To construct a `StatefulWidget`, create two classes: A
`StatefulWidget` and a corresponding `State` class.
Pro tip: The Flutter plugins for Android Studio and VSCode include
the `stful` snippet to quickly generate this code.

要构造一个 `StatefulWidget`，
你需要创建两个类：一个 `StatefulWidget` 类以及与其对应的 `State` 类。
小提示：Android Studio 和 VSCode 的 Flutter 插件都包含了 `stful` 片段，
能够快速生成该代码。

<!-- skip -->
```dart
// The StatefulWidget's job is to take data and create a State class.
// In this case, the widget takes a title, and creates a _MyHomePageState.
class MyHomePage extends StatefulWidget {
  final String title;

  MyHomePage({Key key, this.title}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

// The State class is responsible for two things: holding some data you can
// update and building the UI using that data.
class _MyHomePageState extends State<MyHomePage> {
  // Whether the green box should be visible.
  bool _visible = true;

  @override
  Widget build(BuildContext context) {
    // The green box goes here with some other Widgets.
  }
}
```

## 3. Display a button that toggles the visibility

## 3. 显示一个用于切换可见状态的按钮

Now that you have some data to determine whether the green box
should be visible, you need a way update that data.
In this example, if the box is visible, hide it.
If the box is hidden, show it.

现在你已经有了一些数据能够决定这个绿色方框是否可见，但是还需要一个方法来改变这些数据。在这个例子中，我们想让方框在显示与隐藏之间切换。

To handle this, display a button. When a user presses the button,
flip the boolean from true to false, or false to true.
Make this change using [`setState()`][],
which is a method on the `State` class.
This tells Flutter to rebuild the widget.

为此你将使用一个按钮——当用户按下按钮时，数据将会在 true 和 false 之间进行切换。为了使改变生效，你需要使用 `State` 类中的 [`setState`][] 方法，这会使 Flutter 重建这个小部件。

For more information on working with user input, see the
[Gestures](/docs/cookbook#gestures) section of the cookbook.

注意：如果你想要了解更多与用户输入相关的资料，请参阅 Cookbook 的 [Gestures](/docs/cookbook#gestures) 部分。

<!-- skip -->
```dart
FloatingActionButton(
  onPressed: () {
    // Call setState. This tells Flutter to rebuild the
    // UI with the changes.
    setState(() {
      _visible = !_visible;
    });
  },
  tooltip: 'Toggle Opacity',
  child: Icon(Icons.flip),
);
```

## 4. Fade the box in and out

## 4. 淡入淡出方框

You have a green box on screen and a button to toggle the visibility
to `true` or `false`. How to fade the box in and out? With an
[`AnimatedOpacity`][] widget.

现在你的屏幕上已经有一个绿色的方框，以及一个可以通过改变 `true` 或 `false` 来切换方框可见性的按钮。那么该如何让方框淡入淡出呢？答案是使用 [`AnimatedOpacity`][] Widget。

The `AnimatedOpacity` widget requires three arguments:

`AnimatedOpacity` 小部件需要传入三个参数：

  * `opacity`: A value from 0.0 (invisible) to 1.0 (fully visible).

    `opacity`：它的取值范围从 0.0（不可见）到 1.0（完全可见）。

  * `duration`: How long the animation should take to complete.

    `duration`：代表这个动画需要持续多长时间。

  * `child`: The widget to animate. In our case, the green box.

    `child`：需要进行动画的小部件。在这个例子中就是那个绿色的方框。

<!-- skip -->
```dart
AnimatedOpacity(
  // If the widget is visible, animate to 0.0 (invisible).
  // If the widget is hidden, animate to 1.0 (fully visible).
  opacity: _visible ? 1.0 : 0.0,
  duration: Duration(milliseconds: 500),
  // The green box must be a child of the AnimatedOpacity widget.
  child: Container(
    width: 200.0,
    height: 200.0,
    color: Colors.green,
  ),
);
```

## Complete example

## 完整的例子

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final appTitle = 'Opacity Demo';
    return MaterialApp(
      title: appTitle,
      home: MyHomePage(title: appTitle),
    );
  }
}

// The StatefulWidget's job is to take data and create a State class.
// In this case, the widget takes a title, and creates a _MyHomePageState.
class MyHomePage extends StatefulWidget {
  final String title;

  MyHomePage({Key key, this.title}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

// The State class is responsible for two things: holding some data you can
// update and building the UI using that data.
class _MyHomePageState extends State<MyHomePage> {
  // Whether the green box should be visible
  bool _visible = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: AnimatedOpacity(
          // If the widget is visible, animate to 0.0 (invisible).
          // If the widget is hidden, animate to 1.0 (fully visible).
          opacity: _visible ? 1.0 : 0.0,
          duration: Duration(milliseconds: 500),
          // The green box must be a child of the AnimatedOpacity widget.
          child: Container(
            width: 200.0,
            height: 200.0,
            color: Colors.green,
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Call setState. This tells Flutter to rebuild the
          // UI with the changes.
          setState(() {
            _visible = !_visible;
          });
        },
        tooltip: 'Toggle Opacity',
        child: Icon(Icons.flip),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

![Fade In and Out Demo](/images/cookbook/fade-in-out.gif){:.site-mobile-screenshot}

![一个淡入淡出的例子](/images/cookbook/fade-in-out.gif){:.site-mobile-screenshot}

[`AnimatedOpacity`]: {{site.api}}/flutter/widgets/AnimatedOpacity-class.html
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`setState()`]: {{site.api}}/flutter/widgets/State/setState.html
