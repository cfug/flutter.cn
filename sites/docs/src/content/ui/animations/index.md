---
# title: Introduction to animations
title: 动画效果介绍
# shortTitle: Animations
shortTitle: 动画
# description: How to perform animations in Flutter.
description: 如何使用 Flutter 实现动画效果。
tags: 用户界面,Flutter UI,动画
keywords: 动画效果实现
ai-translated: true
---

Well-designed animations make a UI feel more intuitive,
contribute to the slick look and feel of a polished app,
and improve the user experience.
Flutter's animation support makes it easy to implement a variety of
animation types. Many widgets, especially [Material widgets][],
come with the standard motion effects defined in their design spec,
but it's also possible to customize these effects.

精心设计的动画会使 UI 更生动，
它有助于提升应用程序更精巧的外观和感觉，
从而改善用户体验。
Flutter 让各种动画效果的实现变得容易。
在许多 widget 特别是 [Material widgets][] 中，
它们都自带其设计规范中定义的标准动画效果，
当然，你也可以定制这些效果。

## Choosing an approach

## 选择一种实现方式

There are different approaches you can take when creating
animations in Flutter. Which approach is right for you?
To help you decide, check out the video,
[How to choose which Flutter Animation Widget is right for you?][]
(Also published as a [_companion article_][article1].)

在 Flutter 中创建动画可以有多种不同实现方式。
那么，究竟哪种才是最适合你的呢？
为了帮助你更好的理解它，你可以观看下面的视频，
[如何在 Flutter 中选择合适的动画 Widget][How to choose which Flutter Animation Widget is right for you?]
（同时也发布了一篇 [配套文章][article1]。）

<YouTubeEmbed id="GXIJJkq_H8g" title="How to choose which Flutter animation widget is right for your use case"></YouTubeEmbed>

(To dive deeper into the decision process,
watch the [Animations in Flutter done right][] video,
presented at Flutter Europe.)

（若想要深入了解它的决策流程，
请观看在 Flutter Europe 社区账号发布的
[在 Flutter 中使用动画的正确选择][Animations in Flutter done right]）视频。

As shown in the video, the following
decision tree helps you decide what approach
to use when implementing a Flutter animation:

正如视频中说的那样，
下面的决策树将帮助你挑选实现 Flutter 动画的正确方式：

<img src='/assets/images/docs/ui/animations/animation-decision-tree.png' alt="The animation decision tree">

## Animation deep dive

## 深入了解动画

For a deeper understanding of just how animations work in Flutter, watch
[Animation deep dive][].
(Also published as a [_companion article_][article6].)

要深入了解 Flutter 中的动画是如何工作的，
请观看视频 [Animation deep dive][]。
（同时也发表了 [_配套文章_][article6]）。

<YouTubeEmbed id="PbcILiN8rbo" title="深入研究 Flutter 动画"></YouTubeEmbed> <!-- Take a deep dive into Flutter animation -->

## Implicit and explicit animations

## 隐式动画和显式动画

### Pre-packaged implicit animations

### 内置的隐式动画

If a pre-packaged implicit animation (the easiest animation
to implement) suits your needs, watch
[Animation basics with implicit animations][].
(Also published as a [_companion article_][article2].)

如果内置的隐式动画（最简单的动画）已经能够满足你的需求，
请观看 [隐式动画基础][Animation basics with implicit animations]。
（同时也发布了一篇 [_配套文章_][article2]。）

<YouTubeEmbed id="IVTjpW3W33s" title="Flutter 隐式动画动画基础知识"></YouTubeEmbed> <!-- Flutter implicit animation basics -->

### Custom implicit animations

### 自定义隐式动画

To create a custom implicit animation, watch
[Creating your own custom implicit animations with TweenAnimationBuilder][].
(Also published as a [_companion article_][article3].)

要创建一个自定义的隐式动画，请观看
[使用 TweenAnimationBuilder 创建独特的隐式动画][Creating your own custom implicit animations with TweenAnimationBuilder]。
（同时也发布了一篇 [_配套文章_][article3]。）

<YouTubeEmbed id="6KiPEqzJIKQ" title="使用 TweenAnimationBuilder 创建自定义隐式动画"></YouTubeEmbed> <!-- Create custom implicit animations with TweenAnimationBuilder -->

### Built-in explicit animations

### 内置的显式动画

To create an explicit animation (where you control the animation,
rather than letting the framework control it), perhaps
you can use one of the built-in explicit animations classes.
For more information, watch
[Making your first directional animations with
built-in explicit animations][].
(Also published as a [_companion article_][article4].)

要创建显式动画（手动控制，而不是让框架控制），
你可以使用内置的其中一个显式动画类来实现。更多有关信息，请观看
[使用内置显式动画][Making your first directional animations with
built-in explicit animations]。
（同时也发布了一篇 [_配套文章_][article4]。）

<YouTubeEmbed id="CunyH6unILQ" title="Making your first directional animations with built-in explicit animations"></YouTubeEmbed>

### Explicit animations

### 显式动画

If you need to build an explicit animation from scratch, watch
[Creating custom explicit animations with
AnimatedBuilder and AnimatedWidget][].
(Also published as a [_companion article_][article5].)

如果你需要从头开始构建显式动画，请观看
[通过 AnimatedBuilder 和 AnimatedWidget 创建一个自定义动画][Creating custom explicit animations with AnimatedBuilder and AnimatedWidget]。
（同时也发布了一篇 [_配套文章_][article5]。）

<YouTubeEmbed id="fneC7t4R_B0" title="Creating custom explicit animations with AnimatedBuilder and AnimatedWidget"></YouTubeEmbed>

## Animation types

## 动画类型

Generally, animations are either tween- or physics-based.
The following sections explain what these terms mean,
and point you to resources where you can learn more.

动画分为两类：补间动画和基于物理动画。下面将解释这些术语的含义，
并帮助你找到更多相关资源。在一些情况下，
我们现有的最佳文档是 Flutter gallery 中的示例代码。

### Tween animation

### 补间动画

Short for _in-betweening_. In a tween animation, the beginning
and ending points are defined, as well as a timeline, and a curve
that defines the timing and speed of the transition.
The framework calculates how to transition from the beginning point
to the end point.

补间动画是“介于两者之间”的缩写。
在补间动画中，定义了起点和终点以及时间轴，
再定义过渡时间和速度的曲线。然后框架会计算如何从起点过渡到终点。

* See the [Animations tutorial][], which uses tweens in the examples.

  请查阅 [动画教程][Animations tutorial]，该教程在示例中使用了 Tween。

* Also see the API documentation for [`Tween`][], [`CurveTween`][], and
  [`TweenSequence`][].

  另外还可以查阅 API 文档中的 [`Tween`][]、[`CurveTween`][] 和 [`TweenSequence`][]。

### Physics-based animation

### 基于物理基础的动画

In physics-based animation, motion is modeled to resemble real-world
behavior. When you toss a ball, for example, where and when it lands
depends on how fast it was tossed and how far it was from the ground.
Similarly, dropping a ball attached to a spring falls
(and bounces) differently than dropping a ball attached to a string.

在基于物理基础的动画中，动作是模拟真实世界的行为来进行建模的。
举个例子，当你抛球时，球落地的时间和位置取决于抛出的速度和距离地面的高度。
类似地，附在弹簧上的球和附在绳子上的球掉落（和反弹）方式是不一样的。

* [Animate a widget using a physics simulation][]<br>
  A recipe in the animations section of the Flutter cookbook.

  [使用物理模拟动画效果][Animate a widget using a physics simulation]<br>
  在 Flutter cookbook 中的动画教程。

* Also see the API documentation for
  [`AnimationController.animateWith`][] and
  [`SpringSimulation`][].

  请参考 API 文档 [`AnimationController.animateWith`][]
  和 [`SpringSimulation`][]。

## Common animation patterns

## 常见动画模式

Most UX or motion designers find that certain
animation patterns are used repeatedly when designing a UI.
This section lists some of the commonly
used animation patterns, and tells you where to learn more.

大多数 UX 或 动效设计师在设计 UI 时都会寻找主要动画模式。
本章的列表将介绍一些常见的动画模式，并向你介绍更多学习它们的地方。

### Animated list or grid

### 列表或网格动画

This pattern involves animating the addition or removal of
elements from a list or grid.

这种模式用于在列表或网格中添加或删除元素。

* [`AnimatedList` example][]<br>
  This demo, from the [Sample app catalog][], shows how to
  animate adding an element to a list, or removing a selected element.
  The internal Dart list is synced as the user modifies the list using
  the plus (+) and minus (-) buttons.

  [`AnimatedList` example][]<br>
  这个来自 [Sample app catalog][] 的演示展示了
  如何动态添加元素至列表或删除选定元素。
  当用户使用 plus (+) 和 minus (-) 按钮修改列表时，
  会同步到内部 Dart 列表。

### Shared element transition

### 共享元素转换

In this pattern, the user selects an element&mdash;often an
image&mdash;from the page, and the UI animates the selected element
to a new page with more detail. In Flutter, you can easily implement
shared element transitions between routes (pages)
using the `Hero` widget.

在这个模式中，用户从页面中选择一个元素，通常是图像，
然后 UI 会在新页面中为指定元素添加动画，并生成更多细节。
在 Flutter 中，你可以通过 Hero widget
轻松实现路径（页面）间的共享元素转换动画。

* [Hero animations][]
  How to create two styles of Hero animations:

  [Hero animations][] 如何创建两种风格的 Hero 动画：

  * The hero flies from one page to another while changing position
    and size.
    
    当改变位置和大小时，Hero 从一页飞至另一页。
    
  * The hero's boundary changes shape, from a circle to a square,
    as its flies from one page to another.
    
    Hero 的边界改变形状由圆变方，同时从一页飞至另一页。

* Also see the API documentation for the
  [`Hero`][], [`Navigator`][], and [`PageRoute`][] classes.

  另请参阅 API 文档 [`Hero`][]、[`Navigator`][] 和 [`PageRoute`][] 类。

### Staggered animation

### 交织动画

Animations that are broken into smaller motions,
where some of the motion is delayed.
The smaller animations might be sequential,
or might partially or completely overlap.

动画被分解成较小的动作，其中一些动作被延迟。
这些小动画可以是连续的，也可以部分或完全重叠。

* [Staggered Animations][]

  [交织动画][Staggered Animations]

<a id="concepts"></a>

## Essential animation concepts and classes

## 动画的核心概念与类

The animation system in Flutter is based on typed
[`Animation`][] objects. Widgets can either incorporate
these animations in their build functions directly by
reading their current value and listening to their state
changes or they can use the animations as the basis of
more elaborate animations that they pass along to
other widgets.

Flutter 的动画系统基于带类型的 [`Animation`][] 对象。
Widget 可以在 build 函数里直接使用这些动画：
读取当前值，并监听状态变化；
也可以把它们作为更复杂动画的基础，再传给其他 widget。

<a id="animation-class"></a>

### Animation<wbr>\<double>

### `Animation<double>` 类型

In Flutter, an `Animation` object knows nothing about what
is onscreen. An `Animation` is an abstract class that
understands its current value and its state (completed or dismissed).
One of the more commonly used animation types is `Animation<double>`.

在 Flutter 中，`Animation` 对象并不知道屏幕上有什么。
`Animation` 是一个抽象类，它了解自己的当前值，
以及自己的状态（已完成或已解除）。
较常用的动画类型之一是 `Animation<double>`。

An `Animation` object sequentially generates
interpolated numbers between two values over a certain duration.
The output of an `Animation` object might be linear,
a curve, a step function, or any other mapping you can create.
Depending on how the `Animation` object is controlled,
it could run in reverse, or even switch directions in the
middle.

`Animation` 对象会在一段时间内，
按顺序生成两个值之间的插值数字。
输出可以是线性的、一条曲线、一个阶梯函数，
或你能构造的任何其他映射。
取决于 `Animation` 对象如何被控制，
它可以反向运行，甚至在中途改变方向。

Animations can also interpolate types other than double, such as
`Animation<Color>` or `Animation<Size>`.

动画也可以插值 double 以外的类型，
例如 `Animation<Color>` 或 `Animation<Size>`。

An `Animation` object has state. Its current value is
always available in the `.value` member.

`Animation` 对象有状态。当前值始终可以从 `.value` 成员读到。

An `Animation` object knows nothing about rendering or
`build()` functions.

`Animation` 对象不了解渲染，也不了解 `build()` 函数。

### CurvedAnimation

### CurvedAnimation 类

A [`CurvedAnimation`][] defines the animation's progress
as a non-linear curve.

[`CurvedAnimation`][] 把动画进度定义为一条非线性曲线。

<?code-excerpt "animation/animate5/lib/main.dart (CurvedAnimation)"?>
```dart
animation = CurvedAnimation(parent: controller, curve: Curves.easeIn);
```

`CurvedAnimation` and `AnimationController` (described in the next sections)
are both of type `Animation<double>`, so you can pass them interchangeably.
The `CurvedAnimation` wraps the object it's modifying&mdash;you
don't subclass `AnimationController` to implement a curve.

`CurvedAnimation` 和 `AnimationController`（下一节介绍）
的类型都是 `Animation<double>`，因此可以互换传递。
`CurvedAnimation` 包装它要修改的对象——
你不需要为了实现曲线去子类化 `AnimationController`。

You can use [`Curves`][] with `CurvedAnimation`. The `Curves` class defines
many commonly used curves, or you can create your own. For example:

可以把 [`Curves`][] 和 `CurvedAnimation` 一起使用。
`Curves` 类定义了许多常用曲线，你也可以创建自己的曲线。例如：

<?code-excerpt "animation/animate5/lib/main.dart (ShakeCurve)" plaster="none"?>
```dart
import 'dart:math';

class ShakeCurve extends Curve {
  @override
  double transform(double t) => sin(t * pi * 2);
}
```

If you want to apply an animation curve to a `Tween`, consider using
[`CurveTween`][].

如果想把动画曲线用在 `Tween` 上，可以考虑 [`CurveTween`][]。

### AnimationController

### AnimationController 类

[`AnimationController`][] is a special `Animation`
object that generates a new value whenever the hardware
is ready for a new frame. By default,
an `AnimationController` linearly produces the numbers
from 0.0 to 1.0 during a given duration.
For example, this code creates an `Animation` object,
but does not start it running:

[`AnimationController`][] 是一种特殊的 `Animation` 对象，
每当硬件准备好新的一帧，它就生成一个新值。
默认情况下，`AnimationController` 在给定时长内
线性地产生从 0.0 到 1.0 的数字。
例如，下面的代码创建了一个 `Animation` 对象，但还没有让它开始运行：

<?code-excerpt "animation/animate5/lib/main.dart (animation-controller)"?>
```dart
controller = AnimationController(
  duration: const Duration(seconds: 2),
  vsync: this,
);
```

`AnimationController` derives from `Animation<double>`, so it can be used
wherever an `Animation` object is needed. However, the `AnimationController`
has additional methods to control the animation. For example, you start
an animation with the `.forward()` method. The generation of numbers is
tied to the screen refresh, so typically 60 numbers are generated per
second. After each number is generated, each `Animation` object calls the
attached `Listener` objects. To create a custom display list for each
child, see [`RepaintBoundary`][].

`AnimationController` 派生自 `Animation<double>`，
因此凡是需要 `Animation` 对象的地方都可以使用它。
不过 `AnimationController` 还有额外的方法来控制动画。
例如，用 `.forward()` 方法启动动画。
数字的生成与屏幕刷新绑定，通常每秒生成 60 个数字。
每生成一个数字，每个 `Animation` 对象都会调用已挂接的 `Listener`。
若要为每个子节点创建自定义的显示列表，请参阅 [`RepaintBoundary`][]。

When creating an `AnimationController`, you pass it a `vsync` argument.
The presence of `vsync` prevents offscreen animations from consuming
unnecessary resources.
You can use your stateful object as the vsync by adding
`SingleTickerProviderStateMixin` to the class definition.
You can see an example of this in [animate1][] on GitHub.

创建 `AnimationController` 时，需要传入 `vsync` 参数。
`vsync` 可以避免屏幕外的动画消耗不必要的资源。
把 `SingleTickerProviderStateMixin` 加到类定义上，
就可以用你的有状态对象作为 vsync。
可以在 GitHub 上的 [animate1][] 中看到示例。

{% comment %}
The `vsync` object ties the ticking of the animation controller to
the visibility of the widget, so that when the animating widget goes
off-screen, the ticking stops, and when the widget is restored, it
starts again (without stopping the clock, so it's as if it had
been ticking the whole time, but without using the CPU.)
To use your custom State object as the `vsync`, include the
`TickerProviderStateMixin` when defining the custom State class.
{% endcomment %}

:::note
In some cases, a position might exceed the `AnimationController`'s
0.0-1.0 range. For example, the `fling()` function
allows you to provide velocity, force, and position
(using the Force object). The position can be anything and
so can be outside of the 0.0 to 1.0 range.

有些情况下，位置可能超出 `AnimationController` 的 0.0 到 1.0 范围。
例如，`fling()` 函数可以让你提供速度、力和位置（使用 Force 对象）。
位置可以是任意值，因此也可以落在 0.0 到 1.0 之外。

A `CurvedAnimation` can also exceed the 0.0 to 1.0 range,
even if the `AnimationController` doesn't.
Depending on the curve selected, the output of
the `CurvedAnimation` can have a wider range than the input.
For example, elastic curves such as `Curves.elasticIn`
significantly overshoots or undershoots the default range.

`CurvedAnimation` 也可能超出 0.0 到 1.0 的范围，
即使 `AnimationController` 本身没有超出。
取决于所选曲线，`CurvedAnimation` 的输出范围可以比输入更宽。
例如 `Curves.elasticIn` 这类弹性曲线会明显冲出或低于默认范围。
:::

### Tween

### Tween 类

By default, the `AnimationController` object ranges from 0.0 to 1.0.
If you need a different range or a different data type, you can use a
[`Tween`][] to configure an animation to interpolate to a
different range or data type. For example, the
following `Tween` goes from -200.0 to 0.0:

默认情况下，`AnimationController` 对象的范围是 0.0 到 1.0。
如果需要不同的范围或不同的数据类型，可以用 [`Tween`][]
把动画配置为插值到另一个范围或数据类型。
例如，下面的 `Tween` 从 -200.0 到 0.0：

<?code-excerpt "animation/animate5/lib/main.dart (tween)"?>
```dart
tween = Tween<double>(begin: -200, end: 0);
```

A `Tween` is a stateless object that takes only `begin` and `end`.
The sole job of a `Tween` is to define a mapping from an
input range to an output range. The input range is commonly
0.0 to 1.0, but that's not a requirement.

`Tween` 是只接收 `begin` 和 `end` 的无状态对象。
`Tween` 的唯一工作是定义从输入范围到输出范围的映射。
输入范围通常是 0.0 到 1.0，但这不是硬性要求。

A `Tween` inherits from `Animatable<T>`, not from `Animation<T>`.
An `Animatable`, like `Animation`, doesn't have to output double.
For example, `ColorTween` specifies a progression between two colors.

`Tween` 继承自 `Animatable<T>`，而不是 `Animation<T>`。
和 `Animation` 一样，`Animatable` 不必输出 double。
例如 `ColorTween` 指定两种颜色之间的渐变。

<?code-excerpt "animation/animate5/lib/main.dart (colorTween)"?>
```dart
colorTween = ColorTween(begin: Colors.transparent, end: Colors.black54);
```

A `Tween` object doesn't store any state. Instead, it provides the
[`evaluate(Animation<double> animation)`][] method that uses the
`transform` function to map the current value of the animation
(between 0.0 and 1.0), to the actual animation value.

`Tween` 对象不保存任何状态。它提供
[`evaluate(Animation<double> animation)`][] 方法，
用 `transform` 函数把动画的当前值（介于 0.0 和 1.0 之间）
映射为实际的动画值。

The current value of the `Animation` object can be found in the
`.value` method. The evaluate function also performs some housekeeping,
such as ensuring that begin and end are returned when the
animation values are 0.0 and 1.0, respectively.

`Animation` 对象的当前值可以在 `.value` 方法中找到。
evaluate 函数还会做一些整理工作，
例如当动画值分别为 0.0 和 1.0 时，确保返回 begin 和 end。

#### Tween.animate

#### Tween.animate 方法

To use a `Tween` object, call `animate()` on the `Tween`,
passing in the controller object. For example,
the following code generates the
integer values from 0 to 255 over the course of 500 ms.

要使用 `Tween` 对象，对 `Tween` 调用 `animate()`，并传入控制器。
例如，下面的代码在 500 毫秒内生成从 0 到 255 的整数值。

<?code-excerpt "animation/animate5/lib/main.dart (IntTween)"?>
```dart
AnimationController controller = AnimationController(
  duration: const Duration(milliseconds: 500),
  vsync: this,
);
Animation<int> alpha = IntTween(begin: 0, end: 255).animate(controller);
```

:::note
The `animate()` method returns an [`Animation`][],
not an [`Animatable`][].

`animate()` 方法返回的是 [`Animation`][]，不是 [`Animatable`][]。
:::

The following example shows a controller, a curve, and a `Tween`:

下面的示例同时展示了控制器、曲线和 `Tween`：

<?code-excerpt "animation/animate5/lib/main.dart (IntTween-curve)"?>
```dart
AnimationController controller = AnimationController(
  duration: const Duration(milliseconds: 500),
  vsync: this,
);
final Animation<double> curve = CurvedAnimation(
  parent: controller,
  curve: Curves.easeOut,
);
Animation<int> alpha = IntTween(begin: 0, end: 255).animate(curve);
```

### Animation notifications

### 动画通知

An [`Animation`][] object can have `Listener`s and `StatusListener`s,
defined with `addListener()` and `addStatusListener()`.
A `Listener` is called whenever the value of the animation changes.
The most common behavior of a `Listener` is to call `setState()`
to cause a rebuild. A `StatusListener` is called when an animation begins,
ends, moves forward, or moves reverse, as defined by `AnimationStatus`.

[`Animation`][] 对象可以有 `Listener` 和 `StatusListener`，
分别通过 `addListener()` 和 `addStatusListener()` 定义。
每当动画的值变化，就会调用 `Listener`。
`Listener` 最常见的行为是调用 `setState()` 以触发重建。
当动画开始、结束、正向移动或反向移动时，会调用 `StatusListener`，
这些状态由 `AnimationStatus` 定义。

## Codelabs, tutorials, and articles

## Codelab、教程和文章

The following resources are a good place to start learning
the Flutter animation framework. Each of these documents
shows how to write animation code.

下面这些资料适合作为学习 Flutter 动画框架的起点。
每篇文档都会演示如何编写动画代码。

* [Animations in Flutter codelab][]<br>
  Learn about implicit and explicit animations
  while building a multiple-choice quiz game.

  [Flutter 动画 Codelab][Animations in Flutter codelab]<br>
  在构建选择题测验游戏的过程中，了解隐式动画和显式动画。

* [Animations tutorial][]<br>
  Explains the fundamental classes in the Flutter animation package
  (controllers, `Animatable`, curves, listeners, builders),
  as it guides you through a progression of tween animations using
  different aspects of the animation APIs. This tutorial shows
  how to create your own custom explicit animations.

  [动画教程][Animations tutorial]<br>
  讲解 Flutter 动画 package 中的基础类
  （控制器、`Animatable`、曲线、监听器和 builder），
  并带你用动画 API 的不同方面完成一系列补间动画。
  本教程说明如何创建自己的自定义显式动画。

* [Zero to One with Flutter, part 1][] and [part 2][]<br>
  Flutter blog posts showing how to create an animated chart using tweening.

  [从零到一使用 Flutter，第 1 部分][Zero to One with Flutter, part 1]
  和 [第 2 部分][part 2]<br>
  Flutter 博客文章，演示如何用补间创建动画图表。

* [Casual games toolkit][]<br>
  A toolkit with game templates that contain examples of how to use Flutter
  animations.

  [休闲游戏工具包][Casual games toolkit]<br>
  一套带有游戏模板的工具包，其中包含如何使用 Flutter 动画的示例。

## Other resources

## 其他资源

Learn more about Flutter animations at the following links:

以下链接可以了解更多 Flutter 动画：

* There are several [animations packages][] available on pub.dev that contain
  pre-built animations for commonly used patterns, including:
  `Container` transforms, shared axis transitions,
  fade through transitions, and fade transitions.

  pub.dev 上有许多 [动画 package][animations packages]，
  其中包含常见的内置动画，包括 `Container`的过渡动画、共享轴的过渡动画、
  淡入淡出过渡动画以及渐变过渡动画。

* [Animation samples][] from the [Sample app catalog][].

  [示例应用目录][Sample app catalog] 中的 [动画示例][Animation samples]

* [Animation recipes][] from the Flutter cookbook.

  Flutter 实用教程 (Cookbook) 中的 [动画教程][Animation recipes]

* [Animation videos][] from the Flutter YouTube channel.

  Flutter 视频频道中 [动画相关的视频][Animation videos]

* [Animations: overview][]<br>
  A look at some of the major classes in the
  animations library, and Flutter's animation architecture.

  [动画概览][Animations: overview]<br>
  动画库中主要类简介，以及 Flutter 动画结构。

* [Animation and motion widgets][]<br>
  A catalog of some of the animation widgets
  provided in the Flutter APIs.

  [动画及动作 Widgets][Animation and motion widgets]<br>
  Flutter APIs 提供的动画 widgets 目录。

* The [animation library][] in the [Flutter API documentation][]<br>
  The animation API for the Flutter framework. This link
  takes you to a technical overview page for the library.

  [Flutter API 文档][Flutter API documentation] 中的 [动画库][animation library]<br>
  Flutter 的动画 API。此链接将带你进入动画库的概述页。

[animate1]: {{site.repo.this}}/tree/main/examples/animation/animate1
[Animate a widget using a physics simulation]: /cookbook/animation/physics-simulation
[`Animatable`]: {{site.api}}/flutter/animation/Animatable-class.html
[`AnimatedList` example]: {{site.repo.samples}}/blob/main/animations
[`Animation`]: {{site.api}}/flutter/animation/Animation-class.html
[Animation and motion widgets]: /ui/widgets/animation
[Animation basics with implicit animations]: {{site.yt.watch}}?v=IVTjpW3W33s&list=PLjxrf2q8roU2v6UqYlt_KPaXlnjbYySua&index=1
[Animation deep dive]: {{site.yt.watch}}?v=PbcILiN8rbo&list=PLjxrf2q8roU2v6UqYlt_KPaXlnjbYySua&index=5
[animation library]: {{site.api}}/flutter/animation/animation-library.html
[Animation recipes]: /cookbook/animation
[Animation samples]: {{site.repo.samples}}/tree/main/animations#animation-samples
[Animation videos]: {{site.social.youtube}}/search?query=animation
[Animations in Flutter done right]: {{site.yt.watch}}?v=wnARLByOtKA&t=3s
[Animations: overview]: /ui/animations/overview
[animations packages]: {{site.pub}}/packages?q=topic%3Aanimation
[Animations tutorial]: /ui/animations/tutorial
[`AnimationController`]: {{site.api}}/flutter/animation/AnimationController-class.html
[`AnimationController.animateWith`]: {{site.api}}/flutter/animation/AnimationController/animateWith.html
[article1]: {{site.flutter-blog}}/how-to-choose-which-flutter-animation-widget-is-right-for-you-79ecfb7e72b5
[article2]: {{site.flutter-blog}}/flutter-animation-basics-with-implicit-animations-95db481c5916
[article3]: {{site.flutter-blog}}/custom-implicit-animations-in-flutter-with-tweenanimationbuilder-c76540b47185
[article4]: {{site.flutter-blog}}/directional-animations-with-built-in-explicit-animations-3e7c5e6fbbd7
[article5]: {{site.flutter-blog}}/when-should-i-useanimatedbuilder-or-animatedwidget-57ecae0959e8
[article6]: {{site.flutter-blog}}/animation-deep-dive-39d3ffea111f
[Casual games toolkit]: /resources/games-toolkit/
[Creating your own custom implicit animations with TweenAnimationBuilder]: {{site.yt.watch}}?v=6KiPEqzJIKQ&feature=youtu.be
[Creating custom explicit animations with AnimatedBuilder and AnimatedWidget]: {{site.yt.watch}}?v=fneC7t4R_B0&list=PLjxrf2q8roU2v6UqYlt_KPaXlnjbYySua&index=4
[`Curves`]: {{site.api}}/flutter/animation/Curves-class.html
[`CurvedAnimation`]: {{site.api}}/flutter/animation/CurvedAnimation-class.html
[`CurveTween`]: {{site.api}}/flutter/animation/CurveTween-class.html
[`evaluate(Animation<double> animation)`]: {{site.api}}/flutter/animation/Animation/value.html
[Flutter API documentation]: {{site.api}}
[`Hero`]: {{site.api}}/flutter/widgets/Hero-class.html
[Hero animations]: /ui/animations/hero-animations
[How to choose which Flutter Animation Widget is right for you?]: {{site.yt.watch}}?v=GXIJJkq_H8g
[Animations in Flutter codelab]: {{site.codelabs}}/advanced-flutter-animations
[Making your first directional animations with built-in explicit animations]: {{site.yt.watch}}?v=CunyH6unILQ&list=PLjxrf2q8roU2v6UqYlt_KPaXlnjbYySua&index=3
[Material widgets]: /ui/widgets/material
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`PageRoute`]: {{site.api}}/flutter/widgets/PageRoute-class.html
[part 2]: https://flutter.dev/blog/zero-to-one-with-flutter-part-two
[`RepaintBoundary`]: {{site.api}}/flutter/widgets/RepaintBoundary-class.html
[Sample app catalog]: {{site.repo.samples}}
[`SpringSimulation`]: {{site.api}}/flutter/physics/SpringSimulation-class.html
[Staggered Animations]: /ui/animations/staggered-animations
[`Tween`]: {{site.api}}/flutter/animation/Tween-class.html
[`TweenSequence`]: {{site.api}}/flutter/animation/TweenSequence-class.html
[Zero to One with Flutter, part 1]: https://flutter.dev/blog/zero-to-one-with-flutter
