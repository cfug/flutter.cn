---
title: Fade a Widget in and out
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

As UI developers, you often need to show and hide elements on screen. However,
quickly popping elements on and off the screen can feel jarring to end users.
Instead, you can fade elements in and out with an opacity animation to create
a smooth experience.

一些 UI 开发者经常会在屏幕上显示或隐藏一些元素。然而弹出或隐藏屏幕上的元素太快的话会让用户感到不和谐。这时候你可以使用不透明度动画的淡入淡出效果创建出流畅的体验。

In Flutter, you can achieve this task using the [`AnimatedOpacity`][] Widget.

在 Flutter 中，你可以使用 [`AnimatedOpacity`][] Widget 来完成这个效果。

## Directions

## 步骤

  1. Show a box to fade in and out

     创建一个用来淡入淡出的盒子
  
  2. Define a `StatefulWidget`
  
     定义一个 `StatefulWidget`
  
  3. Display a button that toggles the visibility
  
     显示一个用于切换可见状态的按钮

  4. Fade the box in and out

     淡入淡出盒子

## 1. Create a box to fade in and out

## 1. 创建一个用来淡入淡出的盒子

First, you'll need something to fade in and out. In this example,
you'll draw a green box on screen.

首先你需要一些用来淡入淡出的东西。在这个示例中，你将在屏幕上绘制一个绿色的盒子。

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

Now that you have a green box to animate, you'll need a way to know whether the
box should be visible or invisible. To accomplish this, use a
[`StatefulWidget`][].

现在我们要用这个绿色的盒子进行动画。为了表示这个容器现在是可见的还是不可见的，你需要使用 [`StatefulWidget`][]。

A `StatefulWidget` is a class that creates a `State` object. The `State` object
holds some data about our app and provides a way to update that data. When you
update the data, you can also ask Flutter to rebuild our UI with those changes.

`StatefulWidget` 是一个类，它将会创建一个 `State` 对象。而这个 `State` 对象将包含与这个应用相关的一些数据，并且能够更新它们。当你更新数据时，还可以让Flutter使用这些更改去重建用户界面。

In this case, you'll have one piece of data: a boolean representing whether the
button is visible or invisible.

在这个例子中，你将使用一个布尔值来表示它是可见的还是不可见的。

To construct a `StatefulWidget`, you need to create two classes: A
`StatefulWidget` and a corresponding `State` class. Pro tip: The Flutter plugins
for Android Studio and VSCode include the `stful` snippet to quickly generate
this code.

要构造一个 `StatefulWidget`，你需要创建两个类：一个 `StatefulWidget` 类和一个与其对应的 `State` 类。小提示：Android Studio 和 VSCode 的 Flutter 插件都包含了 `stful` 片段，能够快速生成该代码。

<!-- skip -->
```dart
// The StatefulWidget's job is to take in some data and create a State class.
// In this case, our Widget takes in a title, and creates a _MyHomePageState.
class MyHomePage extends StatefulWidget {
  final String title;

  MyHomePage({Key key, this.title}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

// The State class is responsible for two things: holding some data you can
// update and building the UI using that data.
class _MyHomePageState extends State<MyHomePage> {
  // Whether the green box should be visible or invisible
  bool _visible = true;

  @override
  Widget build(BuildContext context) {
    // The green box goes here with some other Widgets.
  }
}
```

## 3. Display a button that toggles the visibility

## 3. 显示一个用于切换可见状态的按钮

Now that you have some data to determine whether the green box should be visible
or invisible, you'll need a way update that data. In this case, if the box is
visible, you want to hide it. If the box is hidden, you want to show it.

现在你已经有了一些数据来决定这个绿色盒子是可见的还是不可见的，但是还需要一个方法来改变那些数据。在这个例子中，如果盒子可见的话，那么隐藏它。如果盒子被隐藏了，那么就显示它。

To achieve this, you'll display a button. When a user presses the button, you'll
flip the boolean from true to false, or false to true. You need to make this
change using [`setState`][], which is a method on the `State` class.
This lets Flutter know it needs to rebuild the Widget.

为此你将使用一个按钮。当用户按下按钮时，将布尔值从 true 变为 false ，或者从 false 变为 true。为了使其生效，你需要使用 State 类中的 [`setState`][] 方法。这会让 Flutter 重建这个小部件。

Note: For more information on working with user input, please see the
[Gestures](/docs/cookbook#gestures) section of the Cookbook.

注意：如果你想要了解更多与用户输入相关的资料，请参阅 Cookbook 的 [Gestures](/docs/cookbook#gestures) 部分。

<!-- skip -->
```dart
FloatingActionButton(
  onPressed: () {
    // Make sure to call setState. This tells Flutter to rebuild the
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

## 4. 淡入淡出盒子

You've got a green box on screen. You've got a button to toggle the visibility
to `true` or `false`. So how do you fade the box in and out? With an
[`AnimatedOpacity`][] Widget.

现在你的屏幕上已经有一个绿色的盒子，以及一个可以通过切换 `true` 或 `false` 值来触发改变的按钮。那么该如何淡入和淡出盒子呢？使用 [`AnimatedOpacity`][] Widget。

The `AnimatedOpacity` Widget requires three arguments:

`AnimatedOpacity` 小部件需要传入三个参数：

  * `opacity`: A value from 0.0 (invisible) to 1.0 (fully visible).

    `opacity`：它的值从 0.0（不可见）到 1.0（完全可见）。

  * `duration`: How long the animation should take to complete.

    `duration`：动画需要持续多长时间。

  * `child`: The Widget to animate. In our case, the green box.

    `child`：需要进行动画的小部件。在这个例子中就是那个绿色的盒子。

<!-- skip -->
```dart
AnimatedOpacity(
  // If the Widget should be visible, animate to 1.0 (fully visible). If
  // the Widget should be hidden, animate to 0.0 (invisible).
  opacity: _visible ? 1.0 : 0.0,
  duration: Duration(milliseconds: 500),
  // The green box needs to be the child of the AnimatedOpacity
  child: Container(
    width: 200.0,
    height: 200.0,
    color: Colors.green,
  ),
);
```

## Complete example

## 一个完整的例子

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

// The StatefulWidget's job is to take in some data and create a State class.
// In this case, the Widget takes a title, and creates a _MyHomePageState.
class MyHomePage extends StatefulWidget {
  final String title;

  MyHomePage({Key key, this.title}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

// The State class is responsible for two things: holding some data you can
// update and building the UI using that data.
class _MyHomePageState extends State<MyHomePage> {
  // Whether the green box should be visible or invisible
  bool _visible = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: AnimatedOpacity(
          // If the Widget should be visible, animate to 1.0 (fully visible).
          // If the Widget should be hidden, animate to 0.0 (invisible).
          opacity: _visible ? 1.0 : 0.0,
          duration: Duration(milliseconds: 500),
          // The green box needs to be the child of the AnimatedOpacity
          child: Container(
            width: 200.0,
            height: 200.0,
            color: Colors.green,
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Make sure to call setState. This tells Flutter to rebuild the
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
[`setState`]: {{site.api}}/flutter/widgets/State/setState.html
