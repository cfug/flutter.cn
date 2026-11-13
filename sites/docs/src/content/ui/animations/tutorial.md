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

:::secondary 你将学到什么
<!-- What you'll learn -->

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

Flutter SDK 也内置了显式动画，比如
[`FadeTransition`][]，[`SizeTransition`][] 和 [`SlideTransition`][]。
这些 widget 接收一个 `Animation` 对象，
通常由 `AnimationController` 驱动，
并随着值得变化来更新 UI。
它们比下面介绍的自定义显式动画更容易实现。

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
  
  如何使用 `addListener()` 和 `setState()` 为 widget 添加基础动画。
  
* Every time the `Animation` generates a new number,
  the callback registered with `addListener()` calls `setState()`.
  
  每次 `Animation` 生成一个新的数值，
  `addListener()` 注册的回调函数就会调用 `setState()`。
  
* How to define an `AnimationController` with the required
  `vsync` parameter.
  
  如何使用所需的 `vsync` 参数定义一个 `AnimationController`。
  
* How to use the `..` syntax in `..addListener`,
  also known as Dart's _cascade notation_.
  
  理解 "`..addListener`" 中的 "`..`" 语法，也称为 Dart 的 _cascade notation_。

:::

An `Animation` object generates a sequence of numbers over time,
but doesn't render anything to the screen.
To render with an `Animation` object, store the `Animation` object as a
member of your widget, then use its value to decide how to draw.

`Animation` 对象会随着时间生成数字序列。但屏幕上并未显示任何内容。
要显示一个 `Animation` 对象，需将 `Animation` 对象存储为你的 widget 成员，
然后用它的值来决定如何绘制。

Consider the following app that draws the Flutter logo without animation:

参考下面的应用程序，它没有使用动画绘制 Flutter logo。

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

**源代码:** [animate1][]

The callback registered with `addListener()` calls `setState()`,
so every time the `Animation` generates a new number,
the widget is marked for rebuilding.
In `build()`, the container changes size because its height and
width now use `animation.value` instead of a hardcoded value.
Dispose of the controller when the `State` object is
discarded to prevent memory leaks.

通过 `addListener()` 注册的回调函数会调用 `setState()`，
因此每次 `Animation` 生成一个新的数值，
当前帧就被标记为 dirty（需要重建），使得 `build()` 再次被调用。
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

你可能对于 Dart 的级联操作符（`..addListener()` 中的两点）不太熟悉。
这个语法意思是使用 `animate()` 的返回值调用  `addListener()` 方法。
参考下面示例：

<?code-excerpt "animation/animate1/lib/main.dart (add-listener)"?>
```dart highlightLines=2
animation = Tween<double>(begin: 0, end: 300).animate(controller)
  ..addListener(() {
    // ···
  });
```

This code is equivalent to:

这段代码相当于：

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
  
  利用 `AnimatedWidget` 创建一个可以运行重复使用动画的 widget。
  如需区分 widget 过渡，可以使用 `AnimatedBuilder`，你可以在
  [使用 AnimatedBuilder 进行重构][Refactoring with AnimatedBuilder]
  部分查阅更多信息。
  
* Examples of `AnimatedWidget` widgets in the Flutter API:
  `AnimatedBuilder`, `AnimatedModalBarrier`,
  `DecoratedBoxTransition`, `FadeTransition`,
  `PositionedTransition`, `RelativePositionedTransition`,
  `RotationTransition`, `ScaleTransition`,
  `SizeTransition`, `SlideTransition`.
  
  Flutter API 中的 `AnimatedWidget` widget：
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

`AnimatedWidget` 基本类可以从动画代码中区分出核心 widget 代码。
`AnimatedWidget` 会自行管理其 `State` 对象和动画监听器，
因此你无需在子类中实现它们。
可以添加下面的 `AnimatedLogo` 类：

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
  
  通过在动画完成或返回起始状态时改变方向
  或者调用 `controller.repeat(reverse: true)`，
  来使动画无限循环。

:::

It's often helpful to know when an animation changes state,
such as finishing, moving forward, or reversing.
You can get notifications for this with `addStatusListener()`.
The following code modifies the previous example so that
it listens for a state change and prints an update.
The highlighted line shows the change:

了解动画何时改变状态通常是很有用的，比如完成，前进或后退。
可以通过 `addStatusListener()` 来获得提示。
下面是之前示例修改后的代码，这样就可以监听状态的改变和更新。
修改部分会突出显示：

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

**源代码：** [animate3][]

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

:::secondary 要点
<!-- What's the point? -->

* An [`AnimatedBuilder`][] separates the transition from the widget being
  animated.

  [`AnimatedBuilder`][] 将过渡效果与正在进行动画的 widget 分离。

* An `AnimatedBuilder` doesn't render the widget itself,
  nor does it manage the `Animation` object.
  
  `AnimatedBuilder` 不会渲染 widget，
  也不会控制 `Animation` 对象。
  
* Use `AnimatedBuilder` to describe an animation as
  part of a `build()` method for another widget.
  To define a widget with a reusable
  animation, use an `AnimatedWidget`, as shown in
  the [Simplifying with AnimatedWidget][] section.
  
  使用 `AnimatedBuilder` 描述一个动画是其他 widget `build()` 方法的一部分。
  如果只是单纯需要用可重复使用的动画定义一个 widget，
  可参考文档：[简单使用 AnimatedWidget][Simplifying with AnimatedWidget]。
  
* Examples of widgets that use `AnimatedBuilder` in the Flutter API:
  `BottomSheet`, `ExpansionTile`, `PopupMenu`, `ProgressIndicator`,
  `RefreshIndicator`, `Scaffold`, `SnackBar`, `TabBar`,
  `TextField`.
  
  Flutter API 中 `AnimatedBuilders` widget 示例：`BottomSheet`、
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

你可以使用 `AnimatedBuilder` 类（或其他通用版本 [`ListenableBuilder`][]）来完成分离。
`AnimatedBuilder` 是 widget 树的一个单独的 widget。
与 `AnimatedWidget` 类似，都会自动监听来自 `Animation` 对象的通知，
并在必要时在 widget 树中标记为已修改，
所以这时不需要调用 `addListener()`。

The widget tree for the [animate4][]
example looks like this:

应用于 [animate4][] 示例的 widget 树长这样：

<DashImage figure image="ui/AnimatedBuilder-WidgetTree.png" alt="AnimatedBuilder widget tree" />

Starting from the bottom of the widget tree, the code for rendering
the logo is straightforward:

从 widget 树底部开始，渲染 logo 的代码很容易：

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
`build()` 方法会创建并返回 `AnimatedBuilder`，
该方法将匿名 `builder` 回调函数和 `LogoWidget` 对象作为参数。
渲染过渡效果实际上是在匿名 `builder` 回调函数中完成的，
该回调函数会创建一个适当大小的 `SizedBox`（图中为 `Container`），
强制 `LogoWidget` 配合缩小来适应该区域。

One tricky point in the code below is that the child looks
like it's specified twice. What's happening is that the
outer reference to `child` is passed to `AnimatedBuilder`,
which passes it to the anonymous closure, which then uses
that object as its child. The net result is that the
`AnimatedBuilder` is inserted in between the two widgets in the widget tree,
and animation ticks don't rebuild the static `child` subtree.

在下面这段代码中，一个比较棘手的问题是 child 看起来被指定了两次。
其实是 `child` 的外部参照被传递给了 `AnimatedBuilder`，
再传递给匿名闭包，然后用作 child 的对象。
最终结果就是 `AnimatedBuilder` 被插入到 widget 树中的两个 widget 中间，
且动画帧不会重建静态的 `child` 子树。

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
接下来的 `build()` 方法，
它返回一个以 `LogoWidget` 为 child 的 `GrowTransition` 对象，
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

在这部分内容中，你会根据 [监听动画过程][Monitoring the progress of the animation] ([animate3][]) 创建示例，
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

这个示例展示了如何在同一个动画控制器中使用复合补间动画，
每个补间动画控制一个动画的不同效果。仅用于说明目的。
在生产代码中进行不透明度动画时，
建议使用 [`FadeTransition`][] 来避免每一帧都重建 widget。
对于尺寸变化，如果需要通过动画控制子元素的显示范围，
可以考虑使用 [`SizeTransition`][]。

:::

Each tween manages an aspect of the animation. For example:

每个补间动画控制一个动画的不同方面，例如：

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
不过，`AnimatedLogo` 已经监听到了控制器的动画，
因此它可以直接根据该单一动画计算出这两个值。

Change `AnimatedLogo` to encapsulate its own `Tween` objects,
and its `build()` method calls `Tween.evaluate()`
on the parent's animation object to calculate
the required size and opacity values.
The following code shows the changes with highlights:

修改 `AnimatedLogo` 来封装其 `Tween` 对象，
以及其 `build()` 方法在母动画对象上调用
`Tween.evaluate()` 来计算所需的尺寸和不透明度值。
下面的代码中将这些改动突出显示：

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

**源代码：** [animate5][]

## Next steps

## 后续

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
