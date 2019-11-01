---
title: Animations tutorial
title: 教程 | 在 Flutter 应用里实现动画效果
short-title: Tutorial
short-title: 教程
description: A tutorial showing how to build explicit animations in Flutter.
description: 如何在 Flutter 中实现动画效果。
diff2html: true
---

{% assign api = '{{site.api}}/flutter' -%}
{% capture examples -%} {{site.repo.this}}/tree/{{site.branch}}/examples {%- endcapture -%}

<?code-excerpt path-base="animation"?>

{{site.alert.secondary}}
  <h4 class="no_toc">What you’ll learn</h4>

  <h4 class="no_toc">本章内容</h4>

  * How to use the fundamental classes from the animation library to add
    animation to a widget.

    如何使用动画库中的基本类为 widget 添加动画。
  
  * When to use `AnimatedWidget` vs. `AnimatedBuilder`.

    `AnimatedWidget` 和 `AnimatedBuilder` 的应用区别。
  
{{site.alert.end}}

This tutorial shows you how to build explicit animations in Flutter. After
introducing some of the essential concepts, classes, and methods in the
animation library, it walks you through 5 animation examples. The examples build
on each other, introducing you to different aspects of the animation library.

本教程将讲解如何在 Flutter 中构建显式动画。我们先来介绍一些动画库中的基本概念，类和方法，然后列举五个动画示例。这些示例互相关联，展示了动画库的不同方面。

The Flutter SDK also provides transition animations, such as [FadeTransition][],
[SizeTransition][], and [SlideTransition][]. These simple animations are
triggered by setting a beginning and ending point. They are simpler to implement
than explicit animations, which are described here.

Flutter SDK 也提供过渡动画，比如 [FadeTransition][]，[SizeTransition][] 和 [SlideTransition][]。这些简单的动画可以通过设置起点和终点来触发。它们比下面介绍的显式动画更容易实现。

<a name="concepts"></a>
## Essential animation concepts and classes

## 基本动画概念和类

{{site.alert.secondary}}
  <h4 class="no_toc">What's the point?</h4>

  <h4 class="no_toc">重点是什么？</h4>

  * [Animation][], a core class in Flutter's animation library,
    interpolates the values used to guide an animation.
    
    [Animation][]，Flutter 动画库中的核心类，插入用于指导动画的值。
    
  * An `Animation` object knows the current state of an animation (for example,
    whether it's started, stopped, or moving forward or in reverse),
    but doesn't know anything about what appears onscreen.
    
    `Animation` 对象知道动画目前的状态（例如，是否开始，暂停，前进或倒退），但是对屏幕上显示的内容一无所知。
    
  * An [AnimationController][] manages the `Animation`.
  
    [AnimationController][] 管理 `Animation`。
    
  * A [CurvedAnimation][] defines progression as a non-linear curve.
  
    [CurvedAnimation][] 定义进程为非线性曲线。
    
  * A [Tween][] interpolates between the range of data as used by the
    object being animated. For example, a `Tween` might define an interpolation
    from red to blue, or from 0 to 255.
    
    [Tween][] 为动画对象插入一个范围值。例如，`Tween` 可以定义插入值由红到蓝，或从 0 到 255。
  
  * Use Listeners and StatusListeners to monitor animation state changes.
  
    使用 Listeners 和 StatusListeners 监视动画状态变化。
{{site.alert.end}}

The animation system in Flutter is based on typed [Animation][] objects. Widgets
can either incorporate these animations in their build functions directly by
reading their current value and listening to their state changes or they can use
the animations as the basis of more elaborate animations that they pass along to
other widgets.

Flutter 中的动画系统基于类型化的 [Animation] [] 对象。Widgets 既可以通过读取当前值和监听状态变化直接合并动画到 build 函数，也可以作为传递给其他 widgets 的更精细动画的基础。

<a name="animation-class"></a>

### Animation<wbr>\<double>

In Flutter, an Animation object knows nothing about what is onscreen.
An `Animation` is an abstract class that understands its current value
and its state (completed or dismissed). One of the more commonly used
animation types is `Animation<double>`.

在 Flutter 中，动画对象无法获取屏幕上显示的内容。`Animation` 是一个已知当前值和状态（已完成或已解除）的抽象类。一个比较常见的动画类型是 `Animation<double>`。

An `Animation` object sequentially generates
interpolated numbers between two values over a certain duration.
The output of an `Animation` object might be linear, a curve, a step function,
or any other mapping you can devise. Depending on how the `Animation` object
is controlled, it could run in reverse, or even switch directions in the
middle.

一个 `Animation` 对象在一段时间内，持续生成介于两个值之间的插入值。这个 `Animation` 对象输出的可能是直线，曲线，阶梯函数，或者任何自定义的映射。根据 `Animation` 对象的不同控制方式，它可以反向运行，或者中途切换方向。

Animations can also interpolate types other than double, such as
`Animation<Color>` or `Animation<Size>`.

动画还可以插入除 double 以外的类型，比如 `Animation<Color>` 或者 `Animation<Size>`。

An `Animation` object has state. Its current value is always available
in the `.value` member.

`Animation` 对象具有状态。它的当前值在 `.value` 中始终可用。

An `Animation` object knows nothing about rendering or `build()` functions.

`Animation` 对象与渲染或 `build()` 函数无关。

### Curved&shy;Animation

A [CurvedAnimation][] defines the animation's progress as a non-linear curve.

[CurvedAnimation][] 定义动画进程为非线性曲线。

<?code-excerpt "animate5/lib/main.dart (CurvedAnimation)"?>
```dart
animation = CurvedAnimation(parent: controller, curve: Curves.easeIn);
```

{{site.alert.note}}

  The [Curves][] class defines many commonly used curves, or you can create your
  own. For example:

  [Curves][] 类定义了很多常用曲线，或者您也可以自定义。例如：

  <?code-excerpt "animate5/lib/main.dart (ShakeCurve)" plaster="none"?>
  {% prettify dart context="html" %}
  import 'dart:math';

  class ShakeCurve extends Curve {
    @override
    double transform(double t) => sin(t * pi * 2);
  }
  {% endprettify %}
{{site.alert.end}}

`CurvedAnimation` and `AnimationController` (described in the next section)
are both of type `Animation<double>`, so you can pass them interchangeably.
The CurvedAnimation wraps the object it’s modifying&mdash;you
don’t subclass `AnimationController` to implement a curve.

`CurvedAnimation` 和 `AnimationController`（下面将会详细说明）都是 `Animation<double>` 类型，所以可以互换使用。`CurvedAnimation` 封装正在修改的对象 &mdash; 不需要将 `AnimationController` 分解成子类来实现曲线。

### Animation&shy;Controller

[AnimationController][] is a special `Animation` object that generates a new
value whenever the hardware is ready for a new frame. By default,
an `AnimationController` linearly produces the numbers from 0.0 to 1.0
during a given duration. For example, this code creates an Animation object,
but does not start it running:

[AnimationController][] 是个特殊的 `Animation` 对象，每当硬件准备新帧时，他都会生成一个新值。默认情况下，`AnimationController` 在给定期间内会线性生成从 0.0 到 1.0 的数字。例如，这段代码创建了一个动画对象，但是没有启动运行。

<?code-excerpt "animate5/lib/main.dart (AnimationController)"?>
```dart
controller =
    AnimationController(duration: const Duration(seconds: 2), vsync: this);
```

`AnimationController` derives from `Animation<double>`, so it can be used
wherever an `Animation` object is needed. However, the `AnimationController`
has additional methods to control the animation. For example, you start
an animation with the `.forward()` method. The generation of numbers is
tied to the screen refresh, so typically 60 numbers are generated per
second. After each number is generated, each Animation object calls the
attached Listener objects. To create a custom display list for each
child, see [RepaintBoundary][].

`AnimationController` 源自于 `Animation<double>`，所以可以用在任何需要 `Animation` 对象的地方。但是 `AnimationController` 还有其他方法控制动画。例如，使用 `.forward()` 方法启动动画。数字的生成与屏幕刷新关联，所以一般来说每秒钟会生成 60 个数字。数字生成之后，每个动画对象都调用附加 Listener 对象。为每个 child 创建自定义显示列表，请参考 [RepaintBoundary][]。

When creating an `AnimationController`, you pass it a `vsync` argument. The
presence of `vsync` prevents offscreen animations from consuming unnecessary
resources. You can use your stateful object as the vsync by adding
`SingleTickerProviderStateMixin` to the class definition. You can see an example
of this in [animate1]({{examples}}/animation/animate1/lib/main.dart) on GitHub.

创建 `AnimationController` 的同时，也赋予了一个 `vsync` 参数。`vsync` 的存在防止后台动画消耗不必要的资源。您可以通过添加 `SingleTickerProviderStateMixin` 到类定义，将有状态的对象用作 vsync。可参考 GitHub 网站 [animate1]({{examples}}/animation/animate1/lib/main.dart) 中的示例。

{% comment %}
The `vsync` object ties the ticking of the animation controller to
the visiblity of the widget, so that when the animating widget goes
off-screen, the ticking stops, and when the widget is restored, it
starts again (without stopping the clock, so it's as if it had
been ticking the whole time, but without using the CPU.)
To use your custom State object as the `vsync`, include the
`TickerProviderStateMixin` when defining the custom State class.

`vsync` 对象将动画控制器的时钟系统和 widget 的可见性连结，所以当动画 widget 切换到后台，时钟停止；而当 widget 恢复前台运行，时钟重新启动（这个过程时钟并不终止，可被认为一直在运行中，只是不占用 CPU）。在定义自定义状态类时，也可将自定义状态对象用作 `vsync`，包括 `TickerProviderStateMixin`。
{% endcomment -%}

{{site.alert.note}}

  In some cases, a position might exceed the `AnimationController`'s 0.0-1.0
  range. For example, the `fling()` function allows you to provide velocity,
  force, and position (via the Force object). The position can be anything and
  so can be outside of the 0.0 to 1.0 range.
  
  在一些情况下，一个位置可能会超过 `AnimationController` 的 0.0-1.0 的范围。例如，`fling()` 函数允许提供速度，力和位置（通过 Force 对象）。这个位置可以是任意的，所以可能会超出 0.0-1.0 的范围。

  A `CurvedAnimation` can also exceed the 0.0 to 1.0 range, even if the
  `AnimationController` doesn't. Depending on the curve selected, the output of
  the `CurvedAnimation` can have a wider range than the input. For example,
  elastic curves such as Curves.elasticIn will significantly overshoot or
  undershoot the default range.
  
  即使 `AnimationController` 在范围内，`CurvedAnimation` 也可能会出现超出 0.0-1.0 范围的情况。根据所选曲线的不同，`CurvedAnimation` 的输出范围可能会超过输入。举个例子，弹性曲线（比如Curves.elasticIn）会明显超出或低于默认范围。
{{site.alert.end}}

### Tween

By default, the `AnimationController` object ranges from 0.0 to 1.0. If you need
a different range or a different data type, you can use a [Tween][] to configure
an animation to interpolate to a different range or data type. For example, the
following `Tween` goes from -200.0 to 0.0:

在默认情况下，`AnimationController` 对象的范围是 0.0-0.1。如果需要不同的范围或者不同的数据类型，可以使用 [Tween][] 配置动画来插入不同的范围或数据类型。例如下面的示例中，`Tween` 的范围是 -200 到 0.0。

<?code-excerpt "animate5/lib/main.dart (tween)"?>
```dart
tween = Tween<double>(begin: -200, end: 0);
```

A `Tween` is a stateless object that takes only `begin` and `end`. The sole job
of a `Tween` is to define a mapping from an input range to an output range. The
input range is commonly 0.0 to 1.0, but that’s not a requirement.

`Tween` 是无状态的对象，只有 `begin` 和 `end`。`Tween` 的这种单一用途用来定义从输入范围到输出范围的映射。输入范围一般为 0.0-1.0，但这并不是必须的。

A `Tween` inherits from `Animatable<T>`, not from `Animation<T>`. An Animatable,
like Animation, doesn't have to output double. For example, `ColorTween`
specifies a progression between two colors.

`Tween` 源自 `Animatable<T>`，而不是 `Animation<T>`。像动画这样的可动画元素不必重复输出。例如，`ColorTween` 指定了两种颜色之间的过程。

<?code-excerpt "animate5/lib/main.dart (colorTween)"?>
```dart
colorTween = ColorTween(begin: Colors.transparent, end: Colors.black54);
```

A `Tween` object does not store any state. Instead, it provides the
`evaluate(Animation<double> animation)` method that applies the mapping function
to the current value of the animation. The current value of the `Animation`
object can be found in the `.value` method. The evaluate function also performs
some housekeeping, such as ensuring that begin and end are returned when the
animation values are 0.0 and 1.0, respectively.

`Tween` 对象不存储任何状态。而是提供 `evaluate(Animation<double> animation)` 方法，将映射函数应用于动画当前值。`Animation` 对象的当前值可以在 `.value` 方法中找到。evaluate 函数还执行一些内部处理内容，比如确保当动画值在 0.0 和1.0 时分别返回起始点和终点。

#### Tween.animate

To use a `Tween` object, call `animate()` on the `Tween`, passing in the
controller object. For example, the following code generates the
integer values from 0 to 255 over the course of 500 ms.

要使用 `Tween` 对象，请在 `Tween` 调用 `animate()`，传入控制器对象。例如，下面的代码在 500 ms 的进程中生成 0-255 范围内的整数值。

<?code-excerpt "animate5/lib/main.dart (IntTween)"?>
```dart
AnimationController controller = AnimationController(
    duration: const Duration(milliseconds: 500), vsync: this);
Animation<int> alpha = IntTween(begin: 0, end: 255).animate(controller);
```

{{site.alert.note}}

  The `animate()` method returns an [Animation][], not an [Animatable][].
  
  `animate()` 方法会返回一个 [Animation][]，而不是 [Animatable][]。
{{site.alert.end}}

The following example shows a controller, a curve, and a `Tween`:

下面的示例展示了一个控制器，一个曲线，和一个 `Tween`。

<?code-excerpt "animate5/lib/main.dart (IntTween-curve)"?>
```dart
AnimationController controller = AnimationController(
    duration: const Duration(milliseconds: 500), vsync: this);
final Animation curve =
    CurvedAnimation(parent: controller, curve: Curves.easeOut);
Animation<int> alpha = IntTween(begin: 0, end: 255).animate(curve);
```

### Animation notifications

### 动画通知

An [Animation][] object can have `Listener`s and `StatusListener`s,
defined with `addListener()` and `addStatusListener()`.
A `Listener` is called whenever the value of the animation changes.
The most common behavior of a `Listener` is to call `setState()`
to cause a rebuild. A `StatusListener` is called when an animation begins,
ends, moves forward, or moves reverse, as defined by `AnimationStatus`.
The next section has an example of the `addListener()` method,
and [Monitoring the progress of the animation](#monitoring) shows an
example of `addStatusListener()`.

一个 [Animation][] 对象可以有不止一个 `Listener` 和 `StatusListener`，用 `addListener()` 和 `addStatusListener()` 来定义。当动画值改变时调用 `Listener`。`Listener` 最常用的操作是调用 `setState()` 进行重建。当一个动画开始，结束，前进或后退时，会调用 `StatusListener`，用 `AnimationStatus` 来定义。下一部分有关于 `addListener()` 方法的示例，在 [监控动画过程](#monitoring) 中也有 `addStatusListener()` 的示例。

---

## Animation examples

## 动画示例

This section walks you through 5 animation examples.
Each section provides a link to the source code for that example.

这部分列举了五个动画示例，每个示例都提供了源代码的链接。

### Rendering animations

### 渲染动画

{{site.alert.secondary}}
  <h4 class="no_toc">What's the point?</h4>

  <h4 class="no_toc">要点</h4>

  * How to add basic animation to a widget using `addListener()` and
    `setState()`.
    
    如何使用 `addListener()` 和 `setState()` 为 widget 添加基础动画。
    
  * Every time the Animation generates a new number, the `addListener()`
    function calls `setState()`.
    
    每次动画生成一个新的数字，`addListener()` 函数就会调用 `setState()`。
    
  * How to define an `AnimatedController` with the required `vsync` parameter.
    如何使用所需的 `vsync` 参数定义一个 `AnimatedController`。
    
  * Understanding the "`..`" syntax in "`..addListener`", also known as Dart's
    _cascade notation_.
    
    理解 "`..addListener`" 中的 "`..`" 语法，也称为 Dart 的 _cascade notation_。
    
  * To make a class private, start its name with an underscore (`_`).
  
    如需使类私有，在名字前面添加下划线（`_`）。
    
{{site.alert.end}}

So far you've learned how to generate a sequence of numbers over time. Nothing
has been rendered to the screen. To render with an `Animation` object, store the
`Animation` object as a member of your widget, then use its value to decide how
to draw.

目前为止，我们学习了如何随着时间生成数字序列。但屏幕上并未显示任何内容。要显示一个 `Animation` 对象，需将 `Animation` 对象存储为您的 widget 成员，然后用它的值来决定如何绘制。

Consider the following app that draws the Flutter logo without animation:

参考下面的应用程序，它没有使用动画绘制 Flutter logo。

<?code-excerpt "animate0/lib/main.dart"?>
```dart
import 'package:flutter/material.dart';

void main() => runApp(LogoApp());

class LogoApp extends StatefulWidget {
  _LogoAppState createState() => _LogoAppState();
}

class _LogoAppState extends State<LogoApp> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 10),
        height: 300,
        width: 300,
        child: FlutterLogo(),
      ),
    );
  }
}
```

**App source:** [animate0]({{examples}}/animation/animate0)

**源代码:** [animate0]({{examples}}/animation/animate0)

The following shows the same code modified to animate the logo to grow from
nothing to full size. When defining an `AnimationController`, you must pass in a
`vsync` object. The `vsync` parameter is described in the
[AnimationController](#animationcontroller) section.

下面的代码是加入动画效果的，logo 从无到全屏。当定义 `AnimationController` 时，必须要使用一个 `vsync` 对象。在 [AnimationController](#animationcontroller) 部分会具体介绍 `vsync` 参数。

The changes from the non-animated example are highlighted:

对比无动画示例，改动部分被突出显示：

<?code-excerpt "animate{0,1}/lib/main.dart"?>
```diff
--- animate0/lib/main.dart
+++ animate1/lib/main.dart
@@ -1,3 +1,4 @@
+import 'package:flutter/animation.dart';
 import 'package:flutter/material.dart';

 void main() => runApp(LogoApp());
@@ -6,16 +7,39 @@
   _LogoAppState createState() => _LogoAppState();
 }

-class _LogoAppState extends State<LogoApp> {
+class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
+  Animation<double> animation;
+  AnimationController controller;
+
+  @override
+  void initState() {
+    super.initState();
+    controller =
+        AnimationController(duration: const Duration(seconds: 2), vsync: this);
+    animation = Tween<double>(begin: 0, end: 300).animate(controller)
+      ..addListener(() {
+        setState(() {
+          // The state that has changed here is the animation object’s value.
+        });
+      });
+    controller.forward();
+  }
+
   @override
   Widget build(BuildContext context) {
     return Center(
       child: Container(
         margin: EdgeInsets.symmetric(vertical: 10),
-        height: 300,
-        width: 300,
+        height: animation.value,
+        width: animation.value,
         child: FlutterLogo(),
       ),
     );
   }
+
+  @override
+  void dispose() {
+    controller.dispose();
+    super.dispose();
+  }
 }
```

**App source:** [animate1]({{examples}}/animation/animate1)

**源代码:** [animate1]({{examples}}/animation/animate1)

The `addListener()` function calls `setState()`, so every time the `Animation`
generates a new number, the current frame is marked dirty, which forces
`build()` to be called again. In `build()`, the container changes size because
its height and width now use `animation.value` instead of a hardcoded value.
Dispose of the controller when the animation is finished to prevent memory
leaks.

因为`addListener()` 函数调用 `setState()`，所以每次 `Animation` 生成一个新的数字，当前帧就被标记为 dirty，使得 `build()` 再次被调用。在 `build()` 函数中，container 会改变大小，因为它的高和宽都读取 `animation.value`，而不是固定编码值。当动画结束时要清除控制器以防止内存溢出。

With these few changes, you’ve created your first animation in Flutter!

经过这些小改动，你成功创建了第一个 Flutter 动画。


{{site.alert.secondary}}

  **Dart language tricks:**
  You might not be familiar with Dart's cascade notation&mdash;the two
  dots in `..addListener()`. This syntax means that the `addListener()`
  method is called with the return value from `animate()`.
  Consider the following example:

  **Dart 语言技巧：**
  你可能对于 Dart 的级联操作符（`..addListener()` 中的两点）不太熟悉。这个语法意思是使用 `animate()` 的返回值调用  `addListener()` 方法。参考下面示例：

  <?code-excerpt "animate1/lib/main.dart (addListener)" replace="/animation.*|\.\.addListener/[!$&!]/g"?>
  {% prettify dart context="html" %}
  [!animation = Tween<double>(begin: 0, end: 300).animate(controller)!]
    [!..addListener!](() {
      // ···
    });
  {% endprettify %}

  This code is equivalent to:

  这段代码相当于：

  <?code-excerpt "animate1/lib/main.dart (addListener)" replace="/animation.*/$&;/g; /  \./animation/g; /animation.*/[!$&!]/g"?>
  {% prettify dart context="html" %}
  [!animation = Tween<double>(begin: 0, end: 300).animate(controller);!]
  [!animation.addListener(() {!]
      // ···
    });
  {% endprettify %}

  You can learn more about cascade notation in the
  [Dart Language Tour.]({{site.dart-site}}/guides/language/language-tour)
  
  更多关于级联操作符的内容，请参考 [Dart Language Tour]({{site.dart-site}}/guides/language/language-tour)。

{{site.alert.end}}

###  Simplifying with Animated&shy;Widget

###  使用 Animated&shy;Widget 进行简化

{{site.alert.secondary}}
  <h4 class="no_toc">What's the point?</h4>

  <h4 class="no_toc">要点</h4>

  * How to use the [AnimatedWidget][] helper class (instead of `addListener()`
    and `setState()`) to create a widget that animates.
    
    如何使用 [AnimatedWidget][] 帮助类（代替 `addListener()` 和 `setState()`）创建动画 widget。
    
  * Use `AnimatedWidget` to create a widget that performs a reusable animation.
    To separate the transition from the widget, use an
    [AnimatedBuilder.](#refactoring-with-animatedbuilder)
    
    利用 `AnimatedWidget` 创建一个可以运行重复使用动画的 widget。如需区分 widget 过渡，可以使用 [AnimatedBuilder.](#refactoring-with-animatedbuilder)。
    
  * Examples of `AnimatedWidget`s in the Flutter API: AnimatedBuilder,
    AnimatedModal&shy;Barrier, DecoratedBox&shy;Transition, FadeTransition,
    Positioned&shy;Transition, Relative&shy;Positioned&shy;Transition,
    RotationTransition, ScaleTransition, SizeTransition, SlideTransition.
    
    Flutter API 中的 `AnimatedWidget`：AnimatedBuilder,
    AnimatedModal&shy;Barrier, DecoratedBox&shy;Transition, FadeTransition,
    Positioned&shy;Transition, Relative&shy;Positioned&shy;Transition,
    RotationTransition, ScaleTransition, SizeTransition, SlideTransition。
{{site.alert.end}}

The `AnimatedWidget` base class allows you to separate out the core widget code
from the animation code. `AnimatedWidget` doesn't need to maintain a `State`
object to hold the animation. Add the following `AnimatedLogo` class:

`AnimatedWidget` 基本类可以从动画代码中区分出核心 widget 代码。`AnimatedWidget` 不需要保持 `State` 对象来 hold 动画。可以添加下面的 `AnimatedLogo` 类：

<?code-excerpt path-base="animation/animate2"?>
<?code-excerpt "lib/main.dart (AnimatedLogo)" title?>
```dart
class AnimatedLogo extends AnimatedWidget {
  AnimatedLogo({Key key, Animation<double> animation})
      : super(key: key, listenable: animation);

  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;
    return Center(
      child: Container(
        margin: EdgeInsets.symmetric(vertical: 10),
        height: animation.value,
        width: animation.value,
        child: FlutterLogo(),
      ),
    );
  }
}
```
<?code-excerpt path-base="animation"?>

`AnimatedLogo` uses the current value of the `animation` when drawing itself.

在绘制时，`AnimatedLogo` 会读取 `animation` 当前值。

The `LogoApp` still manages the `AnimationController` and the `Tween`, and it
passes the `Animation` object to `AnimatedLogo`:

`LogoApp` 持续控制 `AnimationController` 和 `Tween`，并将 `Animation` 对象传给 `AnimatedLogo`：

<?code-excerpt "animate{1,2}/lib/main.dart" from="class _LogoAppState" diff-u="6"?>
```diff
--- animate1/lib/main.dart
+++ animate2/lib/main.dart
@@ -10,2 +27,2 @@
 class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
   Animation<double> animation;
@@ -13,32 +30,18 @@

   @override
   void initState() {
     super.initState();
     controller =
         AnimationController(duration: const Duration(seconds: 2), vsync: this);
-    animation = Tween<double>(begin: 0, end: 300).animate(controller)
-      ..addListener(() {
-        setState(() {
-          // The state that has changed here is the animation object’s value.
-        });
-      });
+    animation = Tween<double>(begin: 0, end: 300).animate(controller);
     controller.forward();
   }

   @override
-  Widget build(BuildContext context) {
-    return Center(
-      child: Container(
-        margin: EdgeInsets.symmetric(vertical: 10),
-        height: animation.value,
-        width: animation.value,
-        child: FlutterLogo(),
-      ),
-    );
-  }
+  Widget build(BuildContext context) => AnimatedLogo(animation: animation);

   @override
   void dispose() {
     controller.dispose();
     super.dispose();
   }
```

**App source:** [animate2]({{examples}}/animation/animate2)

**源代码：** [animate2]({{examples}}/animation/animate2)

<a name="monitoring"></a>
### Monitoring the progress of the animation

### 监控动画过程

{{site.alert.secondary}}
  <h4 class="no_toc">What's the point?</h4>

  <h4 class="no_toc">要点</h4>

  * Use `addStatusListener()` for notifications of changes to the animation's
    state, such as starting, stopping, or reversing direction.
    
    使用 `addStatusListener()` 作为动画状态的变更提示，比如开始，结束，或改变方向。
    
  * Run an animation in an infinite loop by reversing direction when
    the animation has either completed or returned to its starting state.
    
    通过在动画完成或返回起始状态时改变方向，使动画无限循环。
{{site.alert.end}}

It’s often helpful to know when an animation changes state, such as finishing,
moving forward, or reversing. You can get notifications for this with
`addStatusListener()`. The following code modifies the previous example so that
it listens for a state change and prints an update. The highlighted line shows
the change:

了解动画何时改变状态通常是很有用的，比如完成，前进或后退。可以通过 `addStatusListener()` 来获得提示。下面是之前示例修改后的代码，这样就可以监听状态的改变和更新。修改部分会突出显示：

<?code-excerpt "animate3/lib/main.dart (print state)" plaster="none" replace="/\/\/ (\.\..*)/$1;/g; /\.\..*/[!$&!]/g; /\n  }/$&\n  \/\/ .../g"?>
```dart
class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
  Animation<double> animation;
  AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller =
        AnimationController(duration: const Duration(seconds: 2), vsync: this);
    animation = Tween<double>(begin: 0, end: 300).animate(controller)
      [!..addStatusListener((state) => print('$state'));!]
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
Next, use `addStatusListener()` to reverse the animation at the beginning or the
end. This creates a "breathing" effect:

下一步，在起始或结束时，使用 `addStatusListener()` 反转动画。制造“呼吸”效果：

<?code-excerpt "animate{2,3}/lib/main.dart" to="/^   }/" diff-u="4"?>
```diff
--- animate2/lib/main.dart
+++ animate3/lib/main.dart
@@ -32,7 +32,15 @@
   void initState() {
     super.initState();
     controller =
         AnimationController(duration: const Duration(seconds: 2), vsync: this);
-    animation = Tween<double>(begin: 0, end: 300).animate(controller);
+    animation = Tween<double>(begin: 0, end: 300).animate(controller)
+      ..addStatusListener((status) {
+        if (status == AnimationStatus.completed) {
+          controller.reverse();
+        } else if (status == AnimationStatus.dismissed) {
+          controller.forward();
+        }
+      })
+      ..addStatusListener((state) => print('$state'));
     controller.forward();
   }
```

**App source:** [animate3]({{examples}}/animation/animate3)

**源代码：** [animate3]({{examples}}/animation/animate3)

### Refactoring with AnimatedBuilder

### 使用 AnimatedBuilder 进行重构

{{site.alert.secondary}}
  <h4 class="no_toc">What's the point?</h4>

  <h4 class="no_toc">要点</h4>

  * An [AnimatedBuilder][] understands how to render the transition.
  
    [AnimatedBuilder][] 知道如何渲染过渡效果
    
  * An `AnimatedBuilder` doesn't know how to render the widget, nor does it
    manage the Animation object.
    
    但 `AnimatedBuilder` 不会渲染 widget，也不会控制动画对象。
    
  * Use `AnimatedBuilder` to describe an animation as part of a build method
    for another widget. If you simply want to define a widget with a reusable
    animation, use [AnimatedWidget.](#simplifying-with-animatedwidget)
    
    使用 `AnimatedBuilder` 描述一个动画是其他 widget 构建方法的一部分。如果只是单纯需要用可重复使用的动画定义一个 widget，可参考 [AnimatedWidget.](#simplifying-with-animatedwidget)。
    
  * Examples of `AnimatedBuilders` in the Flutter API: `BottomSheet`, `ExpansionTile`,
    `PopupMenu`, `ProgressIndicator`, `RefreshIndicator`, `Scaffold`, `SnackBar`, `TabBar`,
    `TextField`.
    
    Flutter API 中 `AnimatedBuilders`：`BottomSheet`, `ExpansionTile`,
    `PopupMenu`, `ProgressIndicator`, `RefreshIndicator`, `Scaffold`, `SnackBar`, `TabBar`,
    `TextField`。
{{site.alert.end}}

One problem with the code in the
[animate3]({{examples}}/animation/animate3/lib/main.dart) example, is that changing the
animation required changing the widget that renders the logo. A better solution
is to separate responsibilities into different classes:

[animate3]({{examples}}/animation/animate3/lib/main.dart) 示例代码中有个问题，就是改变动画需要改变渲染 logo 的widget。较好的解决办法是，将任务区分到不同类里：

* Render the logo

  渲染 logo
  
* Define the Animation object

  定义动画对象
  
* Render the transition

  渲染过渡效果

You can accomplish this separation with the help of the `AnimatedBuilder` class.
An `AnimatedBuilder` is a separate class in the render tree. Like `AnimatedWidget`,
`AnimatedBuilder` automatically listens to notifications from the Animation
object, and marks the widget tree dirty as necessary, so you don't need to call
`addListener()`.

您可以使用 `AnimatedBuilder` 类方法来完成分配。`AnimatedBuilder` 作为渲染树的一个单独类。像 `AnimatedWidget`，`AnimatedBuilder` 自动监听动画对象提示，并在必要时在 widget 树中标出，所以这时不需要调用 `addListener()`。

The widget tree for the [animate4]({{examples}}/animation/animate4/lib/main.dart)
example looks like this:

应用于 [animate4]({{examples}}/animation/animate4/lib/main.dart) 示例的 widget 树长这样：

{% asset 'ui/AnimatedBuilder-WidgetTree.png'
    alt="AnimatedBuilder widget tree" class="d-block mx-auto" width="160px" %}

Starting from the bottom of the widget tree, the code for rendering
the logo is straightforward:

从 widget 树底部开始，渲染 logo 的代码很容易：

<?code-excerpt "animate4/lib/main.dart (LogoWidget)"?>
```dart
class LogoWidget extends StatelessWidget {
  // Leave out the height and width so it fills the animating parent
  Widget build(BuildContext context) => Container(
        margin: EdgeInsets.symmetric(vertical: 10),
        child: FlutterLogo(),
      );
}
```

The middle three blocks in the diagram are all created in the `build()` method
in `GrowTransition`, shown below. The `GrowTransition` widget itself is stateless and holds
the set of final variables necessary to define the transition animation. The
build() function creates and returns the `AnimatedBuilder`, which takes the
(`Anonymous` builder) method and the LogoWidget object as parameters. The work
of rendering the transition actually happens in the (`Anonymous` builder)
method, which creates a `Container` of the appropriate size to force the
`LogoWidget` to shrink to fit.

图表中间的三部分都是用 `GrowTransition` 中的 `build()` 方法创建的，如下。 `GrowTransition` widget 本身是无状态的，而且拥有定义过渡动画所需的一系列最终变量。build() 函数创建并返回 `AnimatedBuilder`，`AnimatedBuilder` 使用（`Anonymous` builder）方法并将 LogoWidget 对象作为参数。渲染过渡效果实际上是在（`Anonymous` builder）方法中完成的，该方法创建一个适当大小 `Container` 强制 `LogoWidget` 配合。

One tricky point in the code below is that the child looks like it's specified
twice. What's happening is that the outer reference of child is passed to
`AnimatedBuilder`, which passes it to the anonymous closure, which then uses
that object as its child. The net result is that the `AnimatedBuilder` is
inserted in between the two widgets in the render tree.

在下面这段代码中，一个比较棘手的问题是 child 看起来被指定了两次。其实是 child 的外部参照被传递给了 `AnimatedBuilder`，再传递给匿名闭包，然后用作 child 的对象。最终结果就是 `AnimatedBuilder` 被插入渲染树的两个 widgets 中间。

<?code-excerpt "animate4/lib/main.dart (GrowTransition)"?>
```dart
class GrowTransition extends StatelessWidget {
  GrowTransition({this.child, this.animation});

  final Widget child;
  final Animation<double> animation;

  Widget build(BuildContext context) => Center(
        child: AnimatedBuilder(
            animation: animation,
            builder: (context, child) => Container(
                  height: animation.value,
                  width: animation.value,
                  child: child,
                ),
            child: child),
      );
}
```

Finally, the code to initialize the animation looks very similar to the
[animate2]({{examples}}/animation/animate2/lib/main.dart) example. The `initState()`
method creates an `AnimationController` and a `Tween`, then binds them with
`animate()`. The magic happens in the `build()` method, which returns a
`GrowTransition` object with a `LogoWidget` as a child, and an animation object to
drive the transition. These are the three elements listed in the bullet points
above.

最后，初始动画的代码看起来很像 [animate2]({{examples}}/animation/animate2/lib/main.dart) 的示例。`initState()` 方法创建了 `AnimationController` 和 `Tween`，然后用 `animate()` 绑定它们。神奇的是 `build()` 方法，它返回一个以`LogoWidget` 为 child 的  `GrowTransition` 对象，和一个驱动过渡的动画对象。上面列出了三个主要因素。

<?code-excerpt "animate{2,4}/lib/main.dart" from="class _LogoAppState" diff-u="10"?>
```diff
--- animate2/lib/main.dart
+++ animate4/lib/main.dart
@@ -27,22 +36,25 @@
 class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
   Animation<double> animation;
   AnimationController controller;

   @override
   void initState() {
     super.initState();
     controller =
         AnimationController(duration: const Duration(seconds: 2), vsync: this);
     animation = Tween<double>(begin: 0, end: 300).animate(controller);
     controller.forward();
   }

   @override
-  Widget build(BuildContext context) => AnimatedLogo(animation: animation);
+  Widget build(BuildContext context) => GrowTransition(
+        child: LogoWidget(),
+        animation: animation,
+      );

   @override
   void dispose() {
     controller.dispose();
     super.dispose();
   }
 }
```

**App source:** [animate4]({{examples}}/animation/animate4)

**源代码：** [animate4]({{examples}}/animation/animate4)

### Simultaneous animations

### 同步动画

{{site.alert.secondary}}
  <h4 class="no_toc">What's the point?</h4>

  <h4 class="no_toc">重点提醒</h4>

  * The [Curves][] class defines an array of commonly used curves that you can
    use with a [CurvedAnimation][].
    
    [Curves][] 类定义了一列常用的曲线，您可以配合 [CurvedAnimation][] 来使用。
    
{{site.alert.end}}

In this section, you'll build on the example from [monitoring the progress of
the animation](#monitoring) ([animate3]({{examples}}/animation/animate3/lib/main.dart)),
which used `AnimatedWidget` to animate in and out continuously. Consider the case
where you want to animate in and out while the opacity animates from transparent
to opaque.

在这部分内容中，您会根据 [监控动画过程](#monitoring) ([animate3]({{examples}}/animation/animate3/lib/main.dart)) 创建示例，该示例将使用 `AnimatedWidget` 持续进行动画。可以用在需要对透明度进行从透明到不透明动画处理的情况。

{{site.alert.note}}

  This example shows how to use multiple tweens on the same animation
  controller, where each tween manages a different effect in the animation. It
  is for illustrative purposes only. If you were tweening opacity and size in
  production code, you'd probably use [FadeTransition][] and [SizeTransition][]
  instead.
  
  这个示例展示了如何在同一个动画控制器中使用复合补间动画，每个补间动画控制一个动画的不同效果。
  仅用于说明目的。如果您需要在代码中加入渐变不透明度和尺寸效果，
  可能需要用 [FadeTransition][] 和 [SizeTransition][] 来代替。
  
{{site.alert.end}}

Each tween manages an aspect of the animation. For example:

每个补间动画控制一个动画的不同方面，例如：

<?code-excerpt "animate5/lib/main.dart (tweens)" plaster="none"?>
```dart
controller =
    AnimationController(duration: const Duration(seconds: 2), vsync: this);
sizeAnimation = Tween<double>(begin: 0, end: 300).animate(controller);
opacityAnimation = Tween<double>(begin: 0.1, end: 1).animate(controller);
```

You can get the size with `sizeAnimation.value` and the opacity
with `opacityAnimation.value`, but the constructor for `AnimatedWidget`
only takes a single `Animation` object. To solve this problem,
the example creates its own `Tween` objects and explicitly calculates the
values.

通过 `sizeAnimation.value` 我们可以得到尺寸，通过 `opacityAnimation.value` 可以得到不透明度，但是 `AnimatedWidget` 的构造函数只读取单一的 `Animation` 对象。为了解决这个问题，该示例创建了一个 `Tween` 对象并计算确切值。

Change `AnimatedLogo` to encapsulate its own `Tween` objects, and its `build()`
method calls `Tween.evaluate()` on the parent's animation object to calculate
the required size and opacity values. The following code shows the changes with
highlights:

修改 `AnimatedLogo` 来封装其 `Tween` 对象，以及其 `build()` 方法在母动画对象上调用 `Tween.evaluate()` 来计算所需的尺寸和不透明度值。下面的代码中将这些改动突出显示。

<?code-excerpt "animate5/lib/main.dart (diff)" replace="/(static final|child: Opacity|opacity:|_sizeTween\.|CurvedAnimation).*/[!$&!]/g"?>
```dart
class AnimatedLogo extends AnimatedWidget {
  // Make the Tweens static because they don't change.
  [!static final _opacityTween = Tween<double>(begin: 0.1, end: 1);!]
  [!static final _sizeTween = Tween<double>(begin: 0, end: 300);!]

  AnimatedLogo({Key key, Animation<double> animation})
      : super(key: key, listenable: animation);

  Widget build(BuildContext context) {
    final animation = listenable as Animation<double>;
    return Center(
      [!child: Opacity(!]
        [!opacity: _opacityTween.evaluate(animation),!]
        child: Container(
          margin: EdgeInsets.symmetric(vertical: 10),
          height: [!_sizeTween.evaluate(animation),!]
          width: [!_sizeTween.evaluate(animation),!]
          child: FlutterLogo(),
        ),
      ),
    );
  }
}

class LogoApp extends StatefulWidget {
  _LogoAppState createState() => _LogoAppState();
}

class _LogoAppState extends State<LogoApp> with SingleTickerProviderStateMixin {
  Animation<double> animation;
  AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller =
        AnimationController(duration: const Duration(seconds: 2), vsync: this);
    animation = [!CurvedAnimation(parent: controller, curve: Curves.easeIn)!]
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

**App source:** [animate5]({{examples}}/animation/animate5)

**源代码：** [animate5]({{examples}}/animation/animate5)

## Next steps

## 下面的步骤

This tutorial gives you a foundation for creating animations in Flutter using
`Tweens`, but there are many other classes to explore. You might investigate the
specialized `Tween` classes, animations specific to Material Design,
`ReverseAnimation`, shared element transitions (also known as Hero animations),
physics simulations and `fling()` methods. See the [animations landing
page](/docs/development/ui/animations) for the latest available documents and
examples.

本指南是在 Flutter 中应用 `Tweens` 创建动画的基础介绍，还有很多其他类可供探索。比如指定 `Tween` 类，Material Design 特有的动画，`ReverseAnimation`，共享元素过渡（也称为 Hero 动画），物理模拟和 `fling()` 方法。关于最新的文档和示例可参见 [动画效果介绍](/docs/development/ui/animations)。

[AnimatedWidget]: {{site.api}}/flutter/widgets/AnimatedWidget-class.html
[Animatable]: {{site.api}}/flutter/animation/Animatable-class.html
[Animation]: {{site.api}}/flutter/animation/Animation-class.html
[AnimatedBuilder]: {{site.api}}/flutter/widgets/AnimatedBuilder-class.html
[AnimationController]: {{site.api}}/flutter/animation/AnimationController-class.html
[Curves]: {{site.api}}/flutter/animation/Curves-class.html
[CurvedAnimation]: {{site.api}}/flutter/animation/CurvedAnimation-class.html
[FadeTransition]: {{site.api}}/flutter/widgets/FadeTransition-class.html
[RepaintBoundary]: {{site.api}}/flutter/widgets/RepaintBoundary-class.html
[SlideTransition]: {{site.api}}/flutter/widgets/SlideTransition-class.html
[SizeTransition]: {{site.api}}/flutter/widgets/SizeTransition-class.html
[Tween]: {{site.api}}/flutter/animation/Tween-class.html