---
# title: Staggered animations
title: 交织动画
# description: How to write a staggered animation in Flutter.
description: 如何在 Flutter 中编写一个交织动画。
# shortTitle: Staggered
shortTitle: 交织动画
tags: 用户界面,Flutter UI,动画
keywords: 交织动画
---

:::secondary 你将学到什么
<!-- What you'll learn -->

* A staggered animation consists of sequential or overlapping
    animations.

  一个交织动画由一组序列动画或重叠动画所组成。

* To create a staggered animation, use multiple `Animation` objects.

  创建一个交织动画，要用到多个 `Animation` 对象。

* One `AnimationController` controls all of the `Animation` objects.

  一个 `AnimationController` 控制所有 `Animation` 对象。

* Each `Animation` object specifies the animation during an `Interval`.

  每个 `Animation` 对象在一个 `Interval` 间隔时间内指定一个动画。

* For each property being animated, create a `Tween`.

  为每一个要执行动画的属性创建一个 `Tween`。

:::

:::tip 术语
<!-- Terminology -->

If the concept of tweens or tweening is new to you, refer to the
[Animations in Flutter tutorial][].

如果 tweens 或 tweening 的概念对你来说比较新，请看
[Flutter 指南中的 Animation][Animations in Flutter tutorial]。

:::

Staggered animations are a straightforward concept: visual changes
happen as a series of operations, rather than all at once.
The animation might be purely sequential, with one change occurring after
the next, or it might partially or completely overlap. It might also
have gaps, where no changes occur.

交织动画是一个简单的概念：视觉变化是随着一系列的动作发生，而不是一次性的动作。
动画可能是纯粹顺序的，一个改变随着一个改变发生，
动画也可能是部分或者全部重叠的。动画也可能有间隙，没有变化发生。

This guide shows how to build a staggered animation in Flutter
that applies a series of sequential and overlapping animations
to a single widget. Tapping the screen begins an animation
that changes opacity, size, shape, color, and padding.

The following video demonstrates this staggered animation:

以下视频演示了这种交织动画：

<iframe {{site.bili.std-size}} src="{{site.bili.embed}}?bvid=BV1j441157TP&p=2&autoplay=false" title="Staggered animation example" {{site.bili.set-short}}></iframe>

In the video, you see the following animation of a single widget,
which begins as a bordered blue square with slightly rounded corners.
The square runs through changes in the following order:

在这个视频中，你可以看到一个独立的 widget 的以下动画，
以一个带边框的略微有圆角的蓝色矩形开始，
这个矩形会按照以下顺序变化：

1. Fades in

   淡出

1. Widens

   扩大

1. Becomes taller while moving upwards

   向上移动同时变得更高

1. Transforms into a bordered circle

   变为一个有边框的圆圈

1. Changes color to orange

   颜色变为橙色

After running forward, the animation runs in reverse.

向前运行之后， 动画将反向运行。

:::secondary 刚接触Flutter？
<!-- New to Flutter? -->

This page assumes you know how to create a layout using Flutter's
widgets. To learn more, visit [Building Layouts in Flutter][].

本文假定你已经知道如何使用 Flutter 的 widget 创建一个布局。
更多信息请看 [Flutter 中的布局][Building Layouts in Flutter].

:::

## Basic structure of a staggered animation

## 一个交织动画的基础结构

:::secondary 重点是什么？
<!-- What's the point? -->

* All of the animations are driven by the same
  [`AnimationController`][].

  所有的动画都是由相同同样的 [`AnimationController`][] 驱动。

* Regardless of how long the animation lasts in real time,
  the controller's values must be between 0.0 and 1.0, inclusive.

  无论动画在真实时间中播放多长时间，控制器的值必须在 0.0 和 1.0 之间，包括 0.0 和 1.0。

* Each animation has an [`Interval`][]
  between 0.0 and 1.0, inclusive.

  每个动画都有一个 [`Interval`][]，
  值必须在 0.0 和 1.0 之间，包括 0.0 和 1.0。

* For each property that animates in an interval, create a
  [`Tween`][]. The `Tween` specifies the start and end
  values for that property.

  对于每一个间隔内产生动画的属性，创建一个 [`Tween`][]。
  `Tween` 可以指定该属性的开始值和结束值。 

* The `Tween` produces an [`Animation`][]
  object that is managed by the controller.

  `Tween` 产生一个由控制器管理的 [`Animation`][] 对象。

:::

The following diagram shows the `Interval` objects used in the
staggered animation example.
You might notice the following characteristics:

下图展示了交织动画使用 `Interval` 对象的例子。
你会注意到有以下特点：

* The opacity changes during the first 10% of the timeline.

  透明度在时间轴的前 10% 发生变化。

* A tiny gap occurs between the change in opacity
  and the change in width.

  透明度的变化和宽度的变化之间有一个很小的间隔。

* Nothing animates during the last 25% of the timeline.

  在时间轴的最后 25% 没有动画。

* Increasing the padding makes the widget appear to rise upward.

  增加填充使 widget 看起来向上上升。

* Increasing the border radius to `75.0`
  transforms the `150.0` x `150.0` square with rounded corners into a circle.
  
  将圆角半径增加到 `75.0`，
  会将这个边长为 `150.0` x `150.0` 的圆角正方形变成一个圆。
  
* The padding and height changes occur during
  the exact same interval, but they don't have to.
  
  填充和高度的变化发生在相同的时间间隔内，但它们不必这么做。

![Diagram showing the interval specified for each motion](/assets/images/docs/ui/animations/StaggeredAnimationIntervals.png)

To set up the animation:

设置这个动画：

* Create an `AnimationController` that manages all of the
  `Animation` objects.

  创建一个 `AnimationController` 管理所有的 `Animations` 对象。

* Create a `Tween` for each property being animated.

  为每一个有动画的属性创建一个 Tween 
  
  * The `Tween` defines a range of values.
  
    Tween 定义一个值的范围。
  
  * The `animate()` method of `Tween` takes a parent animation
    and produces an `Animation` for that property.
    
    `Tween` 的 `animate()` 方法需要一个父级动画，
    并为该属性生成一个 `Animation` 对象。
    
* Specify the interval with the `curve` property of `CurvedAnimation`.

  使用 `CurvedAnimation` 的 `curve` 属性指定间隔。

When the controlling animation's value changes,
the new animation's value changes, triggering the UI to update.

当控制动画的值发生变化时，新动画的值也随之变化值更改，触发 UI 更新。

The following code creates a tween for the `width` property.
It builds a [`CurvedAnimation`][], specifying an eased curve.
For other available predefined animation curves, consult [`Curves`][].

下面的代码为 `width` 属性创建了一个 tween。
它创建了一个 [`CurvedAnimation`][], 指定一个 eased curve。
其他更多的预定的动画曲线请看 [`Curves`][]。

<?code-excerpt "animation/staggered_animation/lib/main.dart (width)"?>
```dart
width = Tween<double>(begin: 50, end: 150).animate(
  CurvedAnimation(
    parent: controller,
    curve: const Interval(0.125, 0.250, curve: Curves.ease),
  ),
),
```

The `begin` and `end` values don't have to be doubles.

`begin` 和 `end` 的值不一定是 doubles。

The following code builds the tween for the `borderRadius` property
(which controls the roundness of the square's corners),
using `BorderRadius.circular()`.

下面的代码为 `borderRadius` 属性创建一个 tween（控制矩形的圆角半径），使用 `BorderRadius.circular()`。

<?code-excerpt "animation/staggered_animation/lib/main.dart (border-radius)"?>
```dart
borderRadius =
    BorderRadiusTween(
      begin: BorderRadius.circular(4),
      end: BorderRadius.circular(75),
    ).animate(
      CurvedAnimation(
        parent: controller,
        curve: const Interval(0.375, 0.500, curve: Curves.ease),
      ),
    ),
```

### Complete staggered animation

### 完整的交织动画

Like all interactive widgets, the complete animation consists
of a widget pair: a stateless and a stateful widget.

像所有可交互的 widget 一样，完整的动画包括一对 widget：一个 stateless widget 和一个 stateful widget。

The stateless widget specifies the `Tween` objects,
defines the `Animation` objects, and provides a `build()` function
responsible for building the animating portion of the widget tree.

无状态 widget 指定 `Tween` 对象，
定义动画对象，提供一个 `build()` 方法，负责构建 widget 树的动画部分。


The stateful widget creates the controller, plays the animation,
and builds the non-animating portion of the widget tree.
The animation begins when a tap is detected anywhere on the screen.

有状态 widget 创建控制器，播放动画， 同时构建 widget 树的非动画部分。
当在屏幕上检测到一个点击时，动画开始。

**App source:** [staggered animation example][]

**App 源码：** [交织动画示例][staggered animation example]

### Stateless widget: StaggerAnimation

### 无状态的 widget: StaggerAnimation

In the stateless widget, `StaggerAnimation`,
the `build()` function instantiates an
[`AnimatedBuilder`][]&mdash;a general-purpose widget for building animations.
The `AnimatedBuilder` builds a widget and configures it
using the current values of the `Animation` objects.
The example creates a function named `_buildAnimation()` (which performs
the actual UI updates), and assigns it to its `builder` property.
`AnimatedBuilder` listens to notifications from the animation controller,
marking the widget tree dirty as values change.
For each tick of the animation, the values are updated,
resulting in a call to `_buildAnimation()`.

在无状态 widget 中，`StaggerAnimation`，the `build()` 函数实例化了一个
[`AnimatedBuilder`][]&mdash;一个用于构建动画的通用 widget。
`AnimatedBuilder` 构建一个 widget 并使用 `Animation` 对象的当前值配置它。
这个例子创建一个名为 `_buildAnimation()` （实际更新 UI）的方法，
并将其分配给其 `builder` 属性。`AnimatedBuilder` 监听来自动画控制器的通知，
当值发生更改时，将 widget 树标记为 dirty。
对于动画的每一个标记，值都会更新，导致调用 `_buildAnimation()`。


:::tip
This example uses an `Opacity` widget inside `AnimatedBuilder` to keep all
animated properties in a single builder. When animating opacity on its own,
prefer [`FadeTransition`][] to avoid rebuilding the child widget on each frame.
:::

<?code-excerpt "animation/staggered_animation/lib/main.dart (stagger-animation)"?>
```dart highlightLines=6,12,63-69,74,94-95
import 'dart:async';

import 'package:flutter/scheduler.dart' show timeDilation;
import 'package:material_ui/material_ui.dart';

class StaggerAnimation extends StatelessWidget {
  StaggerAnimation({super.key, required this.controller})
    : // Each animation defined here transforms its value during the subset
      // of the controller's duration defined by the animation's interval.
      // For example, the opacity animation transforms its value during
      // the first 10% of the controller's duration.
      opacity = Tween<double>(begin: 0, end: 1).animate(
        CurvedAnimation(
          parent: controller,
          curve: const Interval(0, 0.100, curve: Curves.ease),
        ),
      ),

      width = Tween<double>(begin: 50, end: 150).animate(
        CurvedAnimation(
          parent: controller,
          curve: const Interval(0.125, 0.250, curve: Curves.ease),
        ),
      ),

      height = Tween<double>(begin: 50, end: 150).animate(
        CurvedAnimation(
          parent: controller,
          curve: const Interval(0.250, 0.375, curve: Curves.ease),
        ),
      ),

      padding =
          EdgeInsetsTween(
            begin: const EdgeInsets.only(bottom: 16),
            end: const EdgeInsets.only(bottom: 75),
          ).animate(
            CurvedAnimation(
              parent: controller,
              curve: const Interval(0.250, 0.375, curve: Curves.ease),
            ),
          ),

      borderRadius =
          BorderRadiusTween(
            begin: BorderRadius.circular(4),
            end: BorderRadius.circular(75),
          ).animate(
            CurvedAnimation(
              parent: controller,
              curve: const Interval(0.375, 0.500, curve: Curves.ease),
            ),
          ),

      color = ColorTween(begin: Colors.indigo[100], end: Colors.orange[400])
          .animate(
            CurvedAnimation(
              parent: controller,
              curve: const Interval(0.500, 0.750, curve: Curves.ease),
            ),
          );

  final Animation<double> controller;
  final Animation<double> opacity;
  final Animation<double> width;
  final Animation<double> height;
  final Animation<EdgeInsets> padding;
  final Animation<BorderRadius?> borderRadius;
  final Animation<Color?> color;

  // This function is called each time the controller "ticks" a new frame.
  // When it runs, all of the animation's values will have been
  // updated to reflect the controller's current value.
  Widget _buildAnimation(BuildContext context, Widget? child) {
    return Container(
      padding: padding.value,
      alignment: Alignment.bottomCenter,
      child: Opacity(
        opacity: opacity.value,
        child: Container(
          width: width.value,
          height: height.value,
          decoration: BoxDecoration(
            color: color.value,
            border: Border.all(color: Colors.indigo[300]!, width: 3),
            borderRadius: borderRadius.value,
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(builder: _buildAnimation, animation: controller);
  }
}
```

### Stateful widget: StaggerDemo

### 有状态的 widget: StaggerDemo

The stateful widget, `StaggerDemo`, creates the `AnimationController`,
specifying a 2000 ms duration. It plays the animation,
and builds the non-animating portion of the widget tree.
The animation begins when a tap is detected on the screen.
The animation runs forward, then backward.
Taps during playback are ignored so the sequence can finish.

有状态的 widget, `StaggerDemo`，创建 `AnimationController`，
设定一个 2000 毫秒的持续时间。控制器播放一个动画，然后在 widget 树上创建一个无动画的部分。
当在屏幕上检测到一个点击时，动画开始。
动画先正向播放，然后反向播放。
播放过程中忽略点击操作，来确保动画序列能完整播放。

<?code-excerpt "animation/staggered_animation/lib/main.dart (stagger-demo)"?>
```dart highlightLines=1,28,32-33,40
class StaggerDemo extends StatefulWidget {
  const StaggerDemo({super.key});

  @override
  State<StaggerDemo> createState() => _StaggerDemoState();
}

class _StaggerDemoState extends State<StaggerDemo>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _playAnimation() async {
    if (_controller.isAnimating) return;

    try {
      await _controller.forward().orCancel;
      await _controller.reverse().orCancel;
    } on TickerCanceled {
      // The animation got canceled, probably because it was disposed of.
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Staggered Animation')),
      body: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: _playAnimation,
        child: Center(
          child: Container(
            width: 300,
            height: 300,
            decoration: BoxDecoration(
              color: Colors.black.withValues(alpha: 0.1),
              border: Border.all(color: Colors.black.withValues(alpha: 0.5)),
            ),
            child: StaggerAnimation(controller: _controller.view),
          ),
        ),
      ),
    );
  }
}

void main() {
  timeDilation = 10; // 1 is normal animation speed.
  runApp(const MaterialApp(home: StaggerDemo()));
}
```

[`Animation`]: {{site.api}}/flutter/animation/Animation-class.html
[`AnimationController`]: {{site.api}}/flutter/animation/AnimationController-class.html
[`AnimatedBuilder`]: {{site.api}}/flutter/widgets/AnimatedBuilder-class.html
[Animations in Flutter tutorial]: /ui/animations/tutorial
[Building Layouts in Flutter]: /ui/layout
[`CurvedAnimation`]: {{site.api}}/flutter/animation/CurvedAnimation-class.html
[`Curves`]: {{site.api}}/flutter/animation/Curves-class.html
[`FadeTransition`]: {{site.api}}/flutter/widgets/FadeTransition-class.html
[`Interval`]: {{site.api}}/flutter/animation/Interval-class.html
[staggered animation example]: {{site.repo.this}}/tree/main/examples/animation/staggered_animation
[`Tween`]: {{site.api}}/flutter/animation/Tween-class.html
