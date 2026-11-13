---
# title: Animations tutorial
title: 教程 | 在 Flutter 应用里实现动画效果
# shortTitle: Tutorial
shortTitle: 教程
# description: A tutorial showing how to build explicit animations in Flutter.
description: 如何在 Flutter 中实现动画效果。
tags: 用户界面,Flutter UI,动画
keywords: 教程,实战,显式动画
---

:::secondary What you'll learn

:::secondary 你将学到什么
* How to use the fundamental classes from the
  animation library to add animation to a widget.

  如何使用动画库中的基本类为 widget 添加动画。

* When to use `AnimatedWidget` vs. `AnimatedBuilder`.

  `AnimatedWidget` 和 `AnimatedBuilder` 的应用区别。

:::

This tutorial shows you how to build explicit animations in Flutter.
The examples build on each other, introducing you to different aspects of the
animation library. The tutorial is built on essential concepts, classes,
and methods in the animation library that you can learn about in
[Introduction to animations][].

本教程将讲解如何在 Flutter 中构建显式动画。
这些示例相辅相成，来向你介绍动画库的不同方面。
本教程以动画库中的基本概念、类和方法为基础，
你可以在 [动画介绍][Introduction to animations] 中了解这些内容。

The Flutter SDK also provides built-in explicit animations,
such as [`FadeTransition`][], [`SizeTransition`][], and [`SlideTransition`][].
These widgets take an `Animation` object,
often driven by an `AnimationController`,
and update the UI as its value changes.
They require less code than the custom explicit animations
described in this tutorial.

The following sections walk you through several animation examples.
Each section provides a link to the source code for that example.

下面的内容会向你介绍几个动画示例。
每个示例都提供了源代码的链接。

## Rendering animations

## 渲染动画

:::secondary 要点
<!-- What's the point? -->

* How to add basic animation to a widget using `addListener()` and
  `setState()`.
* Every time the `Animation` generates a new number,
  the callback registered with `addListener()` calls `setState()`.
* How to define an `AnimationController` with the required
  `vsync` parameter.
* How to use the `..` syntax in `..addListener`,
  also known as Dart's _cascade notation_.
:::

An `Animation` object generates a sequence of numbers over time,
but doesn't render anything to the screen.
To render with an `Animation` object, store the `Animation` object as a
member of your widget, then use its value to decide how to draw.

目前为止，我们学习了如何随着时间生成数字序列。但屏幕上并未显示任何内容。
要显示一个 `Animation` 对象，需将 `Animation` 对象存储为你的 widget 成员，
然后用它的值来决定如何绘制。

Consider the following app that draws the Flutter logo without animation:

<?code-excerpt "animation/animate0/lib/main.dart"?>
```dart
import 'package:material_ui/material_ui.dart';

void main() => runApp(const LogoApp());

class LogoApp extends StatefulWidget {
  const LogoApp({super.key});

  @override
  State<LogoApp> createState() => _LogoAppState();
}

class _LogoAppState extends State<LogoApp> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 10),
        height: 300,
        width: 300,
        child: const FlutterLogo(),
      ),
    );
  }
}
```

**App source:** [animate0][]

**源代码:** [animate0][]

The following shows the same code modified to animate the
logo to grow from nothing to full size.
When defining an `AnimationController`, you must pass in a
`vsync` object. The `vsync` parameter is described in the
[`AnimationController` section][].

下面的代码是加入动画效果的，logo 从无到全屏。
当定义 `AnimationController` 时，
必须要使用一个 `vsync` 对象。
在 [`AnimationController` 部分][`AnimationController` section]
会具体介绍 `vsync` 参数。

The changes from the non-animated example are highlighted:

对比无动画示例，改动部分被突出显示：

```dart diff
- class _LogoAppState extends State<LogoApp> {
+ class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
+   late Animation<double> animation;
+   late AnimationController controller;
+
+   @override
+   void initState() {
+     super.initState();
+     controller = AnimationController(
+       duration: const Duration(seconds: 2),
+       vsync: this,
+     );
+     animation = Tween<double>(begin: 0, end: 300).animate(controller)
+       ..addListener(() {
+         setState(() {
+           // The state that has changed here is the animation object's value.
+         });
+       });
+     controller.forward();
+   }
+
    @override
    Widget build(BuildContext context) {
      return Center(
        child: Container(
          margin: const EdgeInsets.symmetric(vertical: 10),
-         height: 300,
-         width: 300,
+         height: animation.value,
+         width: animation.value,
          child: const FlutterLogo(),
        ),
      );
    }
+
+   @override
+   void dispose() {
+     controller.dispose();
+     super.dispose();
+   }
  }
```

**App source:** [animate1][]

The callback registered with `addListener()` calls `setState()`,
so every time the `Animation` generates a new number,
the widget is marked for rebuilding.
In `build()`, the container changes size because its height and
width now use `animation.value` instead of a hardcoded value.
Dispose of the controller when the `State` object is
discarded to prevent memory leaks.

因为`addListener()` 函数调用 `setState()`，
所以每次 `Animation` 生成一个新的数字，
当前帧就被标记为 dirty，使得 `build()` 再次被调用。
在 `build()` 函数中，container 会改变大小，
因为它的高和宽都读取 `animation.value`，而不是固定编码值。
当 `State` 对象销毁时要清除控制器以防止内存溢出。

With these few changes,
you've created your first animation in Flutter.

经过这些小改动，你成功创建了第一个 Flutter 动画。

:::tip Dart 语言技巧
<!-- Dart language trick -->

You might not be familiar with Dart's cascade notation&mdash;the two
dots in `..addListener()`. This syntax means that the `addListener()`
method is called with the return value from `animate()`.
Consider the following example:

<?code-excerpt "animation/animate1/lib/main.dart (add-listener)"?>
```dart highlightLines=2
animation = Tween<double>(begin: 0, end: 300).animate(controller)
  ..addListener(() {
    // ···
  });
```

This code is equivalent to:

<?code-excerpt "animation/animate1/lib/main.dart (add-listener)" replace="/animation.*/$&;/g; /  \./animation/g;"?>
```dart highlightLines=2
animation = Tween<double>(begin: 0, end: 300).animate(controller);
animation.addListener(() {
    // ···
  });
```

To learn more about cascades,
check out [Cascade notation][]
in the [Dart language documentation][].

要了解更多级联操作符的内容，请参考 [Dart 文档网站][Dart language documentation]
里的文档 [Cascade notation][]。

:::

## Simplifying with AnimatedWidget

## 使用 AnimatedWidget 进行简化

:::secondary 要点
<!-- What's the point? -->

* How to use the [`AnimatedWidget`][] helper class
  (instead of `addListener()`
  and `setState()`) to create a widget that animates.
  
  如何使用 [`AnimatedWidget`][] 帮助类
  （代替 `addListener()` 和 `setState()`）创建动画 widget。
  
* Use `AnimatedWidget` to create a widget that performs
  a reusable animation.
  To separate the transition from the widget, use an
  `AnimatedBuilder`, as shown in the
  [Refactoring with AnimatedBuilder][] section.
* Examples of `AnimatedWidget` widgets in the Flutter API:
  `AnimatedBuilder`, `AnimatedModalBarrier`,
  `DecoratedBoxTransition`, `FadeTransition`,
  `PositionedTransition`, `RelativePositionedTransition`,
  `RotationTransition`, `ScaleTransition`,
  `SizeTransition`, `SlideTransition`.
  
  Flutter API 中的 `AnimatedWidget`：
  `AnimatedBuilder`、`AnimatedModalBarrier`、
  `DecoratedBoxTransition`、`FadeTransition`、
  `PositionedTransition`、`RelativePositionedTransition`、
  `RotationTransition`、`ScaleTransition`、
  `SizeTransition`、`SlideTransition`。

:::

The `AnimatedWidget` base class allows you to separate out
the core widget code from the animation code.
`AnimatedWidget` manages its own `State` object and animation listener,
so you don't need to implement them in your subclass.
Add the following `AnimatedLogo` class:

<?code-excerpt "animation/animate2/lib/main.dart (AnimatedLogo)"?>
```dart
class AnimatedLogo extends AnimatedWidget {
  const AnimatedLogo({super.key, required Animation<double> animation})
    : super(listenable: animation);

  @override
  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;
    return Center(
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 10),
        height: animation.value,
        width: animation.value,
        child: const FlutterLogo(),
      ),
    );
  }
}
```

`AnimatedLogo` uses the current value of the `animation`
when drawing itself.

在绘制时，`AnimatedLogo` 会读取 `animation` 当前值。

The `LogoApp` still manages the `AnimationController` and the `Tween`,
and it passes the `Animation` object to `AnimatedLogo`:

`LogoApp` 持续控制 `AnimationController` 和 `Tween`，
并将 `Animation` 对象传给 `AnimatedLogo`：

```dart diff
  void main() => runApp(const LogoApp());

+ class AnimatedLogo extends AnimatedWidget {
+   const AnimatedLogo({super.key, required Animation<double> animation})
+     : super(listenable: animation);
+
+   @override
+   Widget build(BuildContext context) {
+     final animation = listenable as Animation<double>;
+     return Center(
+       child: Container(
+         margin: const EdgeInsets.symmetric(vertical: 10),
+         height: animation.value,
+         width: animation.value,
+         child: const FlutterLogo(),
+       ),
+     );
+   }
+ }
+
  class LogoApp extends StatefulWidget {
    // ...
  }

  class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
    // ...

    @override
    void initState() {
      super.initState();
      controller = AnimationController(
        duration: const Duration(seconds: 2),
        vsync: this,
      );
-     animation = Tween<double>(begin: 0, end: 300).animate(controller)
-       ..addListener(() {
-         setState(() {
-           // The state that has changed here is the animation object's value.
-         });
-       });
+     animation = Tween<double>(begin: 0, end: 300).animate(controller);
      controller.forward();
    }

    @override
-   Widget build(BuildContext context) {
-     return Center(
-       child: Container(
-         margin: const EdgeInsets.symmetric(vertical: 10),
-         height: animation.value,
-         width: animation.value,
-         child: const FlutterLogo(),
-       ),
-     );
-   }
+   Widget build(BuildContext context) => AnimatedLogo(animation: animation);

    // ...
  }
```

**App source:** [animate2][]

**源代码：** [animate2][]

<a id="monitoring"></a>

## Monitoring the progress of the animation

## 监听动画过程

:::secondary 要点
<!-- What's the point? -->

* Use `addStatusListener()` for notifications of changes
  to the animation's status, such as starting, reaching an endpoint,
  or reversing direction.
  
  使用 `addStatusListener()` 作为动画状态的变更提示，比如开始，结束，或改变方向。
  
* Run an animation in an infinite loop by reversing direction when
  the animation has either completed or returned to its starting state,
  or by calling `controller.repeat(reverse: true)`.
:::

It's often helpful to know when an animation changes state,
such as finishing, moving forward, or reversing.
You can get notifications for this with `addStatusListener()`.
The following code modifies the previous example so that
it listens for a state change and prints an update.
The highlighted line shows the change:

<?code-excerpt "animation/animate3/lib/main.dart (print-state)" plaster="none" replace="/\/\/ (\.\..*)/$1;/g; /\n  }/$&\n  \/\/ .../g"?>
```dart highlightLines=13
class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    animation = Tween<double>(begin: 0, end: 300).animate(controller)
      ..addStatusListener((status) => debugPrint('$status'));
    controller.forward();
  }
  // ...
}
```

Running this code produces this output:

运行这段代码，得到如下结果：

```console
AnimationStatus.forward
AnimationStatus.completed
```

Next, use `addStatusListener()` to reverse the animation
at the beginning or the end. This creates a "breathing" effect:

下一步，在起始或结束时，使用 `addStatusListener()` 反转动画。
制造“呼吸”效果：

```dart diff
  void initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
-   animation = Tween<double>(begin: 0, end: 300).animate(controller);
+   animation = Tween<double>(begin: 0, end: 300).animate(controller)
+     ..addStatusListener((status) {
+       if (status == AnimationStatus.completed) {
+         controller.reverse();
+       } else if (status == AnimationStatus.dismissed) {
+         controller.forward();
+       }
+     })
+     ..addStatusListener((status) => debugPrint('$status'));
    controller.forward();
  }
```

**App source:** [animate3][]

:::tip Repeating an animation
While `addStatusListener()` is useful for reacting to status changes,
if your only goal is to loop an animation continuously in one or both
directions, you can call [`controller.repeat(reverse: true)`][repeat]
instead of manually toggling `forward()` and `reverse()` in a status listener.
Calling `stop()` doesn't change the animation's status,
so it doesn't notify status listeners.
:::

## Refactoring with AnimatedBuilder

## 使用 AnimatedBuilder 进行重构

:::secondary What's the point?
* An [`AnimatedBuilder`][] separates the transition from the widget being
  animated.
* An `AnimatedBuilder` doesn't render the widget itself,
  nor does it manage the `Animation` object.
  
  `AnimatedBuilder` 不会渲染 widget，
  也不会控制 `Animation` 对象。
  
* Use `AnimatedBuilder` to describe an animation as
  part of a `build()` method for another widget.
  To define a widget with a reusable
  animation, use an `AnimatedWidget`, as shown in
  the [Simplifying with AnimatedWidget][] section.
* Examples of widgets that use `AnimatedBuilder` in the Flutter API:
  `BottomSheet`, `ExpansionTile`, `PopupMenu`, `ProgressIndicator`,
  `RefreshIndicator`, `Scaffold`, `SnackBar`, `TabBar`,
  `TextField`.
  
  Flutter API 中 `AnimatedBuilders`：`BottomSheet`、
  `ExpansionTile`、`PopupMenu`、`ProgressIndicator`、
  `RefreshIndicator`、`Scaffold`、`SnackBar`、`TabBar`、
  `TextField`。

:::

One problem with the code in the [animate3][] example
is that changing the animation required changing the widget
that renders the logo. A better solution
is to separate responsibilities into different classes:

[animate3][] 示例代码中有个问题，
就是改变动画需要改变渲染 logo 的widget。
较好的解决办法是，将任务区分到不同类里：

* Render the logo

  渲染 logo
  
* Define the `Animation` object

  定义动画对象
  
* Render the transition

  渲染过渡效果

You can accomplish this separation with the help of the
`AnimatedBuilder` class (or its general-purpose counterpart,
[`ListenableBuilder`][]). An `AnimatedBuilder` is a
separate widget in the widget tree. Like `AnimatedWidget`,
`AnimatedBuilder` automatically listens to notifications
from the `Animation` object, and marks the widget tree
dirty as necessary, so you don't need to call `addListener()`.

你可以使用 `AnimatedBuilder` 类方法来完成分配。
`AnimatedBuilder` 作为渲染树的一个单独类。
像 `AnimatedWidget`，`AnimatedBuilder` 自动监听动画对象提示，
并在必要时在 widget 树中标出，
所以这时不需要调用 `addListener()`。

The widget tree for the [animate4][]
example looks like this:

应用于 [animate4][] 示例的 widget 树长这样：

<DashImage figure image="ui/AnimatedBuilder-WidgetTree.png" alt="AnimatedBuilder widget tree" />

Starting from the bottom of the widget tree, the code for rendering
the logo is straightforward:

<?code-excerpt "animation/animate4/lib/main.dart (logo-widget)"?>
```dart
class LogoWidget extends StatelessWidget {
  const LogoWidget({super.key});

  // Leave out the height and width so it fills the animating parent.
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      child: const FlutterLogo(),
    );
  }
}
```

The middle three blocks in the diagram are all created in the
`build()` method in `GrowTransition`, shown below.
The `GrowTransition` widget itself is stateless and holds
the set of final variables necessary to define the transition animation.
The `build()` method creates and returns the `AnimatedBuilder`,
which takes the anonymous `builder` callback and the
`LogoWidget` object as parameters. The work of rendering the
transition actually happens in the anonymous `builder`
callback, which creates a `SizedBox` (labeled `Container` in the diagram)
of the appropriate size to force the `LogoWidget` to shrink to fit.

图表中间的三部分都是用 `GrowTransition` 中的 `build()` 方法创建的，
如下。 `GrowTransition` widget 本身是无状态的，
而且拥有定义过渡动画所需的一系列最终变量。
build() 函数创建并返回 `AnimatedBuilder`，
`AnimatedBuilder` 使用（`Anonymous` builder）
方法并将 LogoWidget 对象作为参数。
渲染过渡效果实际上是在（`Anonymous` builder）方法中完成的，
该方法创建一个适当大小 `Container` 强制 `LogoWidget` 配合。

One tricky point in the code below is that the child looks
like it's specified twice. What's happening is that the
outer reference to `child` is passed to `AnimatedBuilder`,
which passes it to the anonymous closure, which then uses
that object as its child. The net result is that the
`AnimatedBuilder` is inserted in between the two widgets in the widget tree,
and animation ticks don't rebuild the static `child` subtree.

<?code-excerpt "animation/animate4/lib/main.dart (grow-transition)"?>
```dart
class GrowTransition extends StatelessWidget {
  const GrowTransition({
    required this.child,
    required this.animation,
    super.key,
  });

  final Widget child;
  final Animation<double> animation;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: AnimatedBuilder(
        animation: animation,
        builder: (context, child) {
          return SizedBox(
            height: animation.value,
            width: animation.value,
            child: child,
          );
        },
        child: child,
      ),
    );
  }
}
```

Finally, the code to initialize the animation looks very
similar to the [animate2][] example. The `initState()`
method creates an `AnimationController` and a `Tween`,
then binds them with `animate()`. Next,
the `build()` method returns a `GrowTransition`
object with a `LogoWidget` as a child, and an animation object to
drive the transition. These are the three elements listed
in the bullet points above.

最后，初始动画的代码看起来很像 [animate2][] 的示例。
`initState()` 方法创建了 `AnimationController` 和 `Tween`，
然后用 `animate()` 绑定它们。
神奇的是 `build()` 方法，
它返回一个以`LogoWidget` 为 child 的  `GrowTransition` 对象，
和一个驱动过渡的动画对象。上面列出了三个主要因素。

```dart diff
  void main() => runApp(const LogoApp());

+ class LogoWidget extends StatelessWidget {
+   const LogoWidget({super.key});
+
+   // Leave out the height and width so it fills the animating parent.
+   @override
+   Widget build(BuildContext context) {
+     return Container(
+       margin: const EdgeInsets.symmetric(vertical: 10),
+       child: const FlutterLogo(),
+     );
+   }
+ }
+
+ class GrowTransition extends StatelessWidget {
+   const GrowTransition({
+     required this.child,
+     required this.animation,
+     super.key,
+   });
+
+   final Widget child;
+   final Animation<double> animation;
+
+   @override
+   Widget build(BuildContext context) {
+     return Center(
+       child: AnimatedBuilder(
+         animation: animation,
+         builder: (context, child) {
+           return SizedBox(
+             height: animation.value,
+             width: animation.value,
+             child: child,
+           );
+         },
+         child: child,
+       ),
+     );
+   }
+ }

  class LogoApp extends StatefulWidget {
    // ...
  }

  class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
    // ...

    @override
-   Widget build(BuildContext context) => AnimatedLogo(animation: animation);
+   Widget build(BuildContext context) {
+     return GrowTransition(animation: animation, child: const LogoWidget());
+   }

    // ...
  }
```

**App source:** [animate4][]

**源代码：** [animate4][]

## Simultaneous animations

## 同步动画

:::secondary 重点提醒
<!-- What's the point? -->

* The [`Curves`][] class defines an array of
  commonly used curves that you can
  use with a [`CurvedAnimation`][].
  
  [`Curves`][] 类定义了一列常用的曲线，
  你可以配合 [`CurvedAnimation`][] 来使用。

:::

In this section, you'll build on the example from
[Monitoring the progress of the animation][]
([animate3][]), which used `AnimatedWidget`
to animate in and out continuously. Consider the case
where you want to animate in and out while the
opacity animates from transparent to opaque.

在这部分内容中，你会根据 [监听动画过程](#monitoring) ([animate3][]) 创建示例，
该示例将使用 `AnimatedWidget` 持续进行动画。
可以用在需要对透明度进行从透明到不透明动画处理的情况。

:::note

This example shows how to use multiple tweens on the same animation
controller, where each tween manages a different effect in
the animation. It is for illustrative purposes only.
For opacity animations in production code,
prefer [`FadeTransition`][] to avoid rebuilding widgets on every frame.
For size changes, consider [`SizeTransition`][]
when you want to animate how much of a child is revealed.
:::

Each tween manages an aspect of the animation. For example:

<?code-excerpt "animation/animate5/lib/main.dart (tweens)" plaster="none"?>
```dart
controller = AnimationController(
  duration: const Duration(seconds: 2),
  vsync: this,
);
sizeAnimation = Tween<double>(begin: 0, end: 300).animate(controller);
opacityAnimation = Tween<double>(begin: 0.1, end: 1).animate(controller);
```

You can get the size with `sizeAnimation.value` and
the opacity with `opacityAnimation.value`.
However, `AnimatedLogo` already listens to the controller's animation,
so it can calculate both values from that single animation instead.

通过 `sizeAnimation.value` 我们可以得到尺寸，
通过 `opacityAnimation.value` 可以得到不透明度，
但是 `AnimatedWidget` 的构造函数只读取单一的 `Animation` 对象。
为了解决这个问题，该示例创建了一个 `Tween` 对象并计算确切值。

Change `AnimatedLogo` to encapsulate its own `Tween` objects,
and its `build()` method calls `Tween.evaluate()`
on the parent's animation object to calculate
the required size and opacity values.
The following code shows the changes with highlights:

<?code-excerpt "animation/animate5/lib/main.dart (diff)"?>
```dart highlightLines=6-7,13-14,17-18,34,44
class AnimatedLogo extends AnimatedWidget {
  const AnimatedLogo({super.key, required Animation<double> animation})
    : super(listenable: animation);

  // Make the tweens static because they don't change.
  static final Tween<double> _opacityTween = Tween(begin: 0.1, end: 1);
  static final Tween<double> _sizeTween = Tween(begin: 0, end: 300);

  @override
  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;
    return Center(
      child: Opacity(
        opacity: _opacityTween.evaluate(animation),
        child: Container(
          margin: const EdgeInsets.symmetric(vertical: 10),
          height: _sizeTween.evaluate(animation),
          width: _sizeTween.evaluate(animation),
          child: const FlutterLogo(),
        ),
      ),
    );
  }
}

class LogoApp extends StatefulWidget {
  const LogoApp({super.key});

  @override
  State<LogoApp> createState() => _LogoAppState();
}

class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    animation = CurvedAnimation(parent: controller, curve: Curves.easeIn)
      ..addStatusListener((status) {
        if (status == AnimationStatus.completed) {
          controller.reverse();
        } else if (status == AnimationStatus.dismissed) {
          controller.forward();
        }
      });
    controller.forward();
  }

  @override
  Widget build(BuildContext context) => AnimatedLogo(animation: animation);

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}
```

**App source:** [animate5][]

  [`Tween`][] 会在起始值和结束值之间对动画进行插值（补间动画）

## Next steps

This tutorial gives you a foundation for
creating explicit animations in Flutter using tweens,
but there are many other animation APIs to explore:

* [Implicit animations][] and [`TweenAnimationBuilder`][] for simpler
  animations that don't require managing an `AnimationController`.
* Specialized [`Tween`][] subclasses, such as [`ColorTween`][],
  [`RectTween`][], and [`IntTween`][].
* [Staggered animations][] for coordinating sequential or overlapping motions.
* [Hero animations][] for shared element transitions between routes.
* [Physics simulations][] and [`fling()`][] methods for motion modeled on
  real-world physics.
* [`ReverseAnimation`][] and the [Animations overview][] for a deeper look
  at Flutter's animation architecture.

本指南是在 Flutter 中应用 `Tweens` 创建动画的基础介绍，
还有很多其他类可供探索。
比如指定 `Tween` 类、针对设计系统特有的动画、
`ReverseAnimation`、共享元素过渡（也称为 Hero 动画）、
物理模拟和 `fling()` 方法。

[animate0]: {{site.repo.this}}/tree/main/examples/animation/animate0
[animate1]: {{site.repo.this}}/tree/main/examples/animation/animate1
[animate2]: {{site.repo.this}}/tree/main/examples/animation/animate2
[animate3]: {{site.repo.this}}/tree/main/examples/animation/animate3
[animate4]: {{site.repo.this}}/tree/main/examples/animation/animate4
[animate5]: {{site.repo.this}}/tree/main/examples/animation/animate5
[`AnimatedWidget`]: {{site.api}}/flutter/widgets/AnimatedWidget-class.html
[`AnimatedBuilder`]: {{site.api}}/flutter/widgets/AnimatedBuilder-class.html
[Animations overview]: /ui/animations/overview
[Introduction to animations]: /ui/animations
[`AnimationController`]: {{site.api}}/flutter/animation/AnimationController-class.html
[`AnimationController` section]: /ui/animations#animationcontroller
[`ColorTween`]: {{site.api}}/flutter/animation/ColorTween-class.html
[`Curves`]: {{site.api}}/flutter/animation/Curves-class.html
[`CurvedAnimation`]: {{site.api}}/flutter/animation/CurvedAnimation-class.html
[Cascade notation]: {{site.dart-site}}/language/operators#cascade-notation
[Dart language documentation]: {{site.dart-site}}/language
[`FadeTransition`]: {{site.api}}/flutter/widgets/FadeTransition-class.html
[`fling()`]: {{site.api}}/flutter/animation/AnimationController/fling.html
[Hero animations]: /ui/animations/hero-animations
[Implicit animations]: /ui/animations/implicit-animations
[`IntTween`]: {{site.api}}/flutter/animation/IntTween-class.html
[`ListenableBuilder`]: {{site.api}}/flutter/widgets/ListenableBuilder-class.html
[Monitoring the progress of the animation]: #monitoring
[Physics simulations]: /cookbook/animation/physics-simulation
[`RectTween`]: {{site.api}}/flutter/animation/RectTween-class.html
[Refactoring with AnimatedBuilder]: #refactoring-with-animatedbuilder
[repeat]: {{site.api}}/flutter/animation/AnimationController/repeat.html
[`ReverseAnimation`]: {{site.api}}/flutter/animation/ReverseAnimation-class.html
[`SlideTransition`]: {{site.api}}/flutter/widgets/SlideTransition-class.html
[Simplifying with AnimatedWidget]: #simplifying-with-animatedwidget
[`SizeTransition`]: {{site.api}}/flutter/widgets/SizeTransition-class.html
[Staggered animations]: /ui/animations/staggered-animations
[`Tween`]: {{site.api}}/flutter/animation/Tween-class.html
[`TweenAnimationBuilder`]: {{site.api}}/flutter/widgets/TweenAnimationBuilder-class.html
