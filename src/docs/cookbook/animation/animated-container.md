---
title: Animate the properties of a container
title: Container 里的动画渐变效果
prev:
  title: Animate a widget using a physics simulation
  path: /docs/cookbook/animation/physics-simulation
next:
  title: Fade a Widget in and out
  title: Widget 的淡入淡出效果
  path: /docs/cookbook/animation/opacity-animation
---

The [`Container`]({{site.api}}/flutter/widgets/Container-class.html)
class provides a convenient way to create a widget with specific properties:
width, height, background color, padding, borders, and more.

[`Container`]({{site.api}}/flutter/widgets/Container-class.html)
类提供了一系列实用方法，能够便捷地创建出一个具有
指定宽度、高度、背景颜色、外边距和边框等属性的 widget。

Simple animations often involve changing these properties over time.
For example,
you might want to animate the background color from grey to green to
indicate that an item has been selected by the user.

简单的动画通常会在一段时间内改变这些属性。
例如你可能想将灰色背景逐渐变为绿色背景来告诉用户已经选择了某个项目。

To animate these properties, Flutter provides the
[`AnimatedContainer`]({{site.api}}/flutter/widgets/AnimatedContainer-class.html)
widget. Like the `Container` widget, `AnimatedContainer` allows you to define
the width, height, background colors, and more. However, when the
`AnimatedContainer` is rebuilt with new properties, it automatically
animates between the old and new values. In Flutter, these types of
animations are known as "implicit animations."

为了制作这样的简单动画效果，Flutter 提供了
[`AnimatedContainer`]({{site.api}}/flutter/widgets/AnimatedContainer-class.html)
widget。与 `Container` 一样，`AnimatedContainer` 也可以设置它的宽度、高度以及背景颜色等等。
但是 `AnimatedContainer` 在使用新属性进行重建时，将会自动在旧值和新值之间生成动画。
这种动画在 Flutter 中被称为“隐式动画”。

This recipe describes how to use an `AnimatedContainer` to animate the size,
background color, and border radius when the user taps a button
using the following steps:

下面这篇教程将介绍如何使用 `AnimatedContainer` 实现当用户点击按钮时改变它的大小，
背景颜色，以及边框半径的动画。

## Directions

## 步骤

  1. Create a StatefulWidget with default properties.

     创建一个拥有默认属性的 StatefulWidget

  2. Build an `AnimatedContainer` using the properties.

     创建一个使用这些属性的 `AnimatedContainer`

  3. Start the animation by rebuilding with new properties.

     通过设置新的属性触发重建并启动动画

## 1. Create a StatefulWidget with default properties

## 1. 创建一个拥有默认属性的 StatefulWidget

To start, create
[`StatefulWidget`]({{site.api}}/flutter/widgets/StatefulWidget-class.html)
and [`State`]({{site.api}}/flutter/widgets/State-class.html) classes.
Use the custom State class to define the properties that change over
time. In this example, that includes the width, height, color, and border
radius. You can also define the default value of each property.

首先你需要创建一个
[`StatefulWidget`]({{site.api}}/flutter/widgets/StatefulWidget-class.html)
类和 [`State`]({{site.api}}/flutter/widgets/State-class.html) 类。
然后在 State 类中定义需要随时间更改的属性。
在这个示例中，我们将会改变其宽度、高度、颜色和边框半径。
此外，你还可以定义其他默认属性。

These properties belong to a custom `State` class so they
can be updated when the user taps a button.

但是这些属性必须定义在 `State` 类中，这样我们才能在用户点击按钮时更新它们。

<!-- skip -->
```dart
class AnimatedContainerApp extends StatefulWidget {
  @override
  _AnimatedContainerAppState createState() => _AnimatedContainerAppState();
}

class _AnimatedContainerAppState extends State<AnimatedContainerApp> {
  // Define the various properties with default values. Update these properties
  // when the user taps a FloatingActionButton.
  double _width = 50;
  double _height = 50;
  Color _color = Colors.green;
  BorderRadiusGeometry _borderRadius = BorderRadius.circular(8);

  @override
  Widget build(BuildContext context) {
    // Fill this out in the next steps.
  }
}
```

## 2. Build an `AnimatedContainer` using the properties

## 2. 创建一个使用这些属性的 AnimatedContainer

Next, build the `AnimatedContainer` using the properties defined in the
previous step. Furthermore, provide a `duration` that defines how long
the animation should run.

接下来，你就可以使用上一步中定义的属性来构建 `AnimatedContainer`。
此外，你还必须提供一个 `duration` 它将定义这个动画应该运行多长时间。

<!-- skip -->
```dart
AnimatedContainer(
  // Use the properties stored in the State class.
  width: _width,
  height: _height,
  decoration: BoxDecoration(
    color: _color,
    borderRadius: _borderRadius,
  ),
  // Define how long the animation should take.
  duration: Duration(seconds: 1),
  // Provide an optional curve to make the animation feel smoother.
  curve: Curves.fastOutSlowIn,
);
```

## 3. Start the animation by rebuilding with new properties

## 3. 通过设置新的属性触发重建并启动动画

Finally, start the animation by rebuilding the `AnimatedContainer` with
the new properties. How to trigger a rebuild? Use the
[`setState()`]({{site.api}}/flutter/widgets/State/setState.html)
method.

最后将设置新的属性触发 `AnimatedContainer` 重建并启动动画。那么如何触发重建呢？
当我们提到 `StatefulWidgets` 时，
[`setState()`]({{site.api}}/flutter/widgets/State/setState.html) 就行了。

Add a button to the app. When the user taps the button, update
the properties with a new width, height, background color and border radius
inside a call to `setState()`.

在这个例子中，我们给应用添加了一个按钮。
当用户点击按钮时，将会调用 `setState`
去刷新它的宽度、高度、背景颜色和边框半径等属性。

A real app typicallyA real app typically transitions between fixed values (for example,
from a grey to a green background). For this app,
generate new values each time the user taps the button.

实际项目通常只会在某些固定值之间进行转换（例如从灰色背景过渡到绿色背景）。
在这个应用中，每次用户点击按钮都会生成新的值。

<!-- skip -->
```dart
FloatingActionButton(
  child: Icon(Icons.play_arrow),
  // When the user taps the button
  onPressed: () {
    // Use setState to rebuild the widget with new values.
    setState(() {
      // Create a random number generator.
      final random = Random();

      // Generate a random width and height.
      _width = random.nextInt(300).toDouble();
      _height = random.nextInt(300).toDouble();

      // Generate a random color.
      _color = Color.fromRGBO(
        random.nextInt(256),
        random.nextInt(256),
        random.nextInt(256),
        1,
      );

      // Generate a random border radius.
      _borderRadius =
          BorderRadius.circular(random.nextInt(100).toDouble());
    });
  },
);
```

## Complete example

## 完整样例

```dart
import 'dart:math';

import 'package:flutter/material.dart';

void main() => runApp(AnimatedContainerApp());

class AnimatedContainerApp extends StatefulWidget {
  @override
  _AnimatedContainerAppState createState() => _AnimatedContainerAppState();
}

class _AnimatedContainerAppState extends State<AnimatedContainerApp> {
  // Define the various properties with default values. Update these properties
  // when the user taps a FloatingActionButton.
  double _width = 50;
  double _height = 50;
  Color _color = Colors.green;
  BorderRadiusGeometry _borderRadius = BorderRadius.circular(8);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('AnimatedContainer Demo'),
        ),
        body: Center(
          child: AnimatedContainer(
            // Use the properties stored in the State class.
            width: _width,
            height: _height,
            decoration: BoxDecoration(
              color: _color,
              borderRadius: _borderRadius,
            ),
            // Define how long the animation should take.
            duration: Duration(seconds: 1),
            // Provide an optional curve to make the animation feel smoother.
            curve: Curves.fastOutSlowIn,
          ),
        ),
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.play_arrow),
          // When the user taps the button
          onPressed: () {
            // Use setState to rebuild the widget with new values.
            setState(() {
              // Create a random number generator.
              final random = Random();

              // Generate a random width and height.
              _width = random.nextInt(300).toDouble();
              _height = random.nextInt(300).toDouble();

              // Generate a random color.
              _color = Color.fromRGBO(
                random.nextInt(256),
                random.nextInt(256),
                random.nextInt(256),
                1,
              );

              // Generate a random border radius.
              _borderRadius =
                  BorderRadius.circular(random.nextInt(100).toDouble());
            });
          },
        ),
      ),
    );
  }
}
```

![AnimatedContainer demo showing a box growing and shrinking in size while changing color and border radius](/images/cookbook/animated-container.gif){:.site-mobile-screenshot}

![这个 AnimatedContainer demo 展示了一个通过动画改变颜色、边框半径、放大和缩小的盒子](/images/cookbook/animated-container.gif){:.site-mobile-screenshot}
