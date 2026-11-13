---
# title: Animations API overview
title: 动画概览
# shortTitle: API overview
shortTitle: API 概览
# description: An overview of animation concepts.
description: 动画效果的概念简述。
tags: 用户界面,Flutter UI,动画
keywords: 概览,概念
---

The animation system in Flutter is based on typed
[`Animation`][] objects. Widgets can either
incorporate these animations in their build
functions directly by reading their current value and listening to their
state changes or they can use the animations as the basis of more elaborate
animations that they pass along to other widgets.

Flutter 中的动画系统基于 [`Animation`][]。
Widget 可以直接将这些动画合并到自己的 build 方法中
来读取它们的当前值或者监听它们的状态变化，
或者可以将其作为的更复杂动画的基础传递给其他 widget。

## Animation

The primary building block of the animation system is the
[`Animation`][] class. An animation represents a value
of a specific type that can change over the lifetime of
the animation. Most widgets that perform an animation
receive an `Animation` object as a parameter,
from which they read the current value of the animation
and to which they listen for changes to that value.

动画系统的首要组成部分就是 [`Animation`][] 类。
一个动画表现为可在它的生命周期内发生变化的特定类型的值。
大多数需要执行动画的 widget 都需要接收一个
`Animation` 对象作为参数，
从而能从中获取到动画的当前状态值以及
应该监听哪些具体值的更改。

### `addListener`

Whenever the animation's value changes,
the animation notifies all the listeners added with
[`addListener`][]. Typically, a [`State`][]
object that listens to an animation calls
[`setState`][] on itself in its listener callback
to notify the widget system that it needs to
rebuild with the new value of the animation.

每当动画的状态值发生变化时，
动画都会通知所有通过 [`addListener`][] 添加的监听器。
通常，一个正在监听动画的 [`State`][]
对象会调用自身的 [`setState`][] 方法，
将自身传入这些监听器的回调函数来通知
widget 系统需要根据新状态值进行重新构建。

This pattern is so common that Flutter provides widgets
that rebuild when animations change value:
[`AnimatedWidget`][] and [`AnimatedBuilder`][].
The first, `AnimatedWidget`, is most useful for
stateless animated widgets. To use `AnimatedWidget`,
subclass it and implement the [`build`][] function.
The second, `AnimatedBuilder`, is useful for more complex widgets
that include an animation as part of a larger build function.
To use `AnimatedBuilder`, construct the widget
and pass it a `builder` function.
To rebuild in response to other kinds of `Listenable` objects,
use [`ListenableBuilder`][].

这种模式非常常见，因此 Flutter 提供了一些 widget，
它们可以帮助 widget 在动画值发生变化时进行重建：
[`AnimatedWidget`][] 和 [`AnimatedBuilder`][]。
第一个是 `AnimatedWidget`，
对于无状态动画 widget 来说是尤其有用的。
要使用 `AnimatedWidget`，
只需继承它并实现一个 [`build`][] 方法。
第二个是 `AnimatedBuilder`，
适用于将动画作为更大的构建函数的一部分。
要使用 `AnimatedBuilder`，
只需构造 widget 并将 `AnimatedBuilder`
传递给 widget 的 `builder` 方法。
如果要针对其他类型的 `Listenable` 对象进行重建，
请使用 [`ListenableBuilder`][]。

For implicit animations, which manage their own controller,
use an [`ImplicitlyAnimatedWidget`][] subclass,
such as `AnimatedOpacity` or [`TweenAnimationBuilder`][].

对于由自身控制器管理的隐式动画，
请使用 [`ImplicitlyAnimatedWidget`][] 的子类，
例如 `AnimatedOpacity` 或 [`TweenAnimationBuilder`][]。

### `addStatusListener`

Animations also provide an [`AnimationStatus`][],
which indicates how the animation will evolve over time.
Whenever the animation's status changes,
the animation notifies all the listeners added with
[`addStatusListener`][]. Typically, animations start
out in the `dismissed` status, which means they're
at the beginning of their range. For example,
animations that progress from 0.0 to 1.0
will be `dismissed` when their value is 0.0.
An animation might then run `forward` (from 0.0 to 1.0)
or perhaps in `reverse` (from 1.0 to 0.0).
Eventually, if the animation reaches the end of its range
(1.0), the animation reaches the `completed` status.

动画还提供了一个 [`AnimationStatus`][]，
表示动画将如何随时间进行变化。每当动画的状态发生变化时，
动画都会通知所有通过 [`addStatusListener`][] 添加的监听器。
通常情况下，动画会从 `dismissed` 状态开始，
表示它处于变化区间的开始点。举例来说，
从 0.0 到 1.0 的动画在 `dismissed` 状态时的值应该是 0.0。
动画进行的下一状态可能是 `forward`（比如从 0.0 到 1.0）
或者 `reverse`（比如从 1.0 到 0.0）。
最终，如果动画到达其区间的结束点（比如 1.0），
则动画会变成 `completed` 状态。

## AnimationController

To create an animation, first create an [`AnimationController`][].
As well as being an animation itself, an `AnimationController`
lets you control the animation. For example,
you can tell the controller to play the animation
[`forward`][] or [`stop`][] the animation.
You can also [`fling`][] animations,
which uses a physical simulation, such as a spring,
to drive the animation.

要创建动画，首先要创建一个 [`AnimationController`][]。
除了作为动画本身，`AnimationController` 还可以用来控制动画。
例如，你可以通过控制器让动画
正向播放 [`forward`][] 或停止动画 [`stop`][]。
你还可以添加物理模拟效果 [`fling`][]（例如弹簧效果）来驱动动画。

Once you've created an animation controller,
you can start building other animations based on it.
For example, you can create a [`ReverseAnimation`][]
that mirrors the original animation but runs in the
opposite direction (from 1.0 to 0.0).
Similarly, you can create a [`CurvedAnimation`][]
whose value is adjusted by a [`Curve`][] (such as the predefined curves in
[`Curves`][]).

一旦创建了一个动画控制器，你可以基于它来构建其他动画。
例如，你可以创建一个 [`ReverseAnimation`][]，
效果是复制一个动画但是将其反向运行（比如从 1.0 到 0.0）。
同样，你可以创建一个 [`CurvedAnimation`][]，
效果是用 [`Curve`][] 来调整动画的值（例如 [`Curves`][] 中预定的曲线）。

## Tweens

## 补间动画

To animate beyond the 0.0 to 1.0 interval, you can use a
[`Tween<T>`][], which interpolates between its
[`begin`][] and [`end`][] values. Many types have specific
`Tween` subclasses that provide type-specific interpolation.
For example, [`ColorTween`][] interpolates between colors and
[`RectTween`][] interpolates between rects.
You can define your own interpolations by creating
your own subclass of `Tween` and overriding its
[`lerp`][] function.

如果想要在 0.0 到 1.0 的区间之外设置动画，
可以使用 [`Tween<T>`][]，它可以在它的 [`begin`][] 值和
[`end`][] 值之间进行插值补间。
许多类都有特定的 `Tween` 子类，
它们能提供基于特定类型的插值行为。
例如， [`ColorTween`][] 可以在颜色间进行插值，
[`RectTween`][] 可以在矩形之间进行插值。
你可以通过创建自己的 `Tween` 子类并覆盖其
[`lerp`][] 方法来定义自己的补间动画。

By itself, a tween only defines how to interpolate
between two values. To get a concrete value for the
current frame of an animation, you also need an
animation to determine the current state.
There are two ways to combine a tween
with an animation to get a concrete value:

补间动画本身只定义了如何在两个值之间进行插值。
要获取动画当前帧的具体值，
还需要一个动画来确定当前状态。
有两种方法可以将补间动画与动画组合在一起以获得动画的具体值：

1. You can [`evaluate`][] the tween at the current
   value of an animation. This approach is most useful
   for widgets that are already listening to the animation and hence
   rebuilding whenever the animation changes value.

   你可以用 [`evaluate`][] 方法处理动画的当前值从而得到对应的插值。
   这种方法对于已经监听动画并因此在动画改变值时
   重新构建的 widget 是最有效的。

2. You can [`animate`][] the tween based on the animation.
   Rather than returning a single value, the animate function
   returns a new `Animation` that incorporates the tween.
   This approach is most useful when you want to give the
   newly created animation to another widget,
   which can then read the current value that incorporates
   the tween as well as listen for changes to the value.

   你可以用 [`animate`][] 方法处理一个动画。
   相对于返回单个值，animate 方法返回一个包含补间动画插值的
   新的 `Animation`。这种方法对于当你想要将新创建的动画提供给
   另一个 widget 时最有效，它可以直接读取包含补间动画的插值
   以及监听对应插值的更改。

## Architecture

## 架构

Animations are built from a number of core building blocks

动画实际上是由一系列核心模块共同构建的。

### Scheduler

### 调度器

The [`SchedulerBinding`][] is a singleton class
that exposes the Flutter scheduling primitives.

[`SchedulerBinding`][] 是一个暴露出 Flutter 调度原语的单例类。

For this discussion, the key primitive is the frame callbacks.
Each time a frame needs to be shown on the screen,
Flutter's engine triggers a "begin frame" callback that
the scheduler multiplexes to all the listeners registered using
[`scheduleFrameCallback()`][]. All these callbacks are
given the official time stamp of the frame, in
the form of a `Duration` from some arbitrary epoch. Since all the
callbacks have the same time, any animations triggered from these
callbacks will appear to be exactly synchronized even
if they take a few milliseconds to be executed.

在这一节，关键原语是帧回调。每当一帧需要在屏幕上显示时，
Flutter 的引擎会触发一个 “开始帧” 回调，
调度程序会将其多路传输给所有使用
[`scheduleFrameCallback()`][] 注册的监听器。
所有这些回调不管在任意状态或任意时刻都可以
收到这一帧的绝对时间戳。由于所有回调收到时间戳都相同，
因此这些回调触发的任何动画看起来都是完全同步的，
即使它们需要几毫秒才能执行。

### Tickers

### 运行器

The [`Ticker`][] class hooks into the scheduler's
[`scheduleFrameCallback()`][]
mechanism to invoke a callback every tick.

[`Ticker`][] 类挂载在调度器的 [`scheduleFrameCallback()`][] 的机制上，
来达到每次运行都会触发回调的效果。

A `Ticker` can be started and stopped. When started, it returns a
`Future` that will resolve when it is stopped.

一个 `Ticker` 可以被启动和停止，启动时，
它会返回一个 `Future`，这个 `Future` 在 `Ticker` 停止时会被改为完成状态。

Each tick, the `Ticker` provides the callback with the
duration since the first tick after it was started.

每次运行, `Ticker` 都会为回调函数提供从
`Ticker` 开始运行到现在的持续时间。

Because tickers always give their elapsed time relative to the first
tick after they were started, tickers are all synchronized. If you
start three tickers at different times between two ticks, they will all
nonetheless be synchronized with the same starting time, and will
subsequently tick in lockstep. Like people at a bus stop,
all the tickers wait for a regularly occurring event
(the tick) to begin moving (counting time).

因为运行器总是会提供在自它们开始运行以来的持续时间，
所以所有运行器都是同步的。
如果你在两帧之间的不同时刻启动三个运行器，
它们都会被同步到相同的开始时间，并随后同步运行。

### Simulations

### 模拟器

The [`Simulation`][] abstract class maps a
relative time value (an elapsed time) to a
double value, and has a notion of completion.

[`Simulation`][] 抽象类将相对时间值（运行时间）映射为双精度值，
并且有完成的概念。

In principle simulations are stateless, but in practice
some simulations (for example,
[`BouncingScrollSimulation`][] and
[`ClampingScrollSimulation`][])
change state irreversibly when queried.

原则上，模拟器是无状态的，但在实践中，
一些模拟器（例如 [`BouncingScrollSimulation`][]
和 [`ClampingScrollSimulation`][]）
在查询时会不可逆地被改变状态。

There are [various concrete implementations][]
of the `Simulation` class for different effects.

针对不同的效果，`Simulation` 类有
[各种具体实现][various concrete implementations]。

### Animatables

The [`Animatable`][] abstract class maps a
double to a value of a particular type.

[`Animatable`][] 抽象类将双精度值映射为特定类型的值。

An `Animatable` doesn't track animation progress,
though some subclasses have mutable configuration.

`Animatable` 尽管有些子类具有可变配置，但不会跟踪动画进度。

#### Tweens

#### 补间动画

The [`Tween<T>`][] class maps a double
value nominally in the range 0.0-1.0 to a typed value
(for example, a `Color`, or another double).
It is an `Animatable`.

[`Tween<T>`][] 类将名义范围为 0.0-1.0
的双精度值映射到某个类型值（例如 `Color` 或其他双精度值）。
它属于 `Animatable`。

It has a notion of an output type (`T`),
a `begin` value and an `end` value of that type,
and a way to interpolate (`lerp`) between the begin
and end values for a given input value (the double nominally in
the range 0.0-1.0).

它有一个输出类型（`T`）的概念，
这个输出类型有一个 `begin` 值和一个`end` 值，
以及在给定输入值的起始值和结束值
（名义范围为 0.0-1.0 的双精度值）之间
插值（`lerp`）的方法。

A `Tween` doesn't track animation progress,
but its `begin` and `end` values are mutable.

`Tween` 不会跟踪动画进度，
但它的 `begin` 和 `end` 值是可以修改的。

#### Composing animatables

#### 组合 animatables

Passing an `Animatable<double>` (the parent) to the
`chain()` method of an `Animatable` object
creates a new `Animatable` subclass that
applies the parent's mapping then the child's mapping.

将 `Animatable<double>`（父类）传递给一个
`Animatable` 对象的 `chain()` 方法会创建一个新的
`Animatable` 子类，这个子类会先应用父类的映射，
然后应用子类的映射。

### Curves

### 曲线

The [`Curve`][] abstract class maps doubles
nominally in the range 0.0-1.0 to doubles
nominally in the range 0.0-1.0.

[`Curve`][] 抽象类将名义范围为 0.0-1.0 的双精度值
映射到名义范围为 0.0-1.0 的双精度值。

`Curve` classes are stateless and immutable.

`Curve` 类是无状态和不可变的。

### Animations

### 动画

The [`Animation`][] abstract class provides a
value of a given type, a concept of animation
direction and animation status, and a listener interface to
register callbacks that get invoked when the value or status change.

[`Animation`][] 抽象类提供给定类型的
值、动画方向的概念和动画状态和一个监听器接口，
这个监听器接口用来注册值或状态的改变时被调用的回调。

Some subclasses of `Animation` have values that never change
([`kAlwaysCompleteAnimation`][], [`kAlwaysDismissedAnimation`][],
[`AlwaysStoppedAnimation`][]); registering callbacks on
these has no effect as the callbacks are never called.

有些 `Animation` 的子类值是永远不变的
（[`kAlwaysCompleteAnimation`][]、[`kAlwaysDismissedAnimation`][] 和
[`AlwaysStoppedAnimation`][]），
在这些子类上注册回调没有任何效果，因为这些回调永远不会被调用。

The `Animation<double>` variant is special because it can be used to
represent a double nominally in the range 0.0-1.0, which is the input
expected by `Curve` and `Tween` classes, as well as some further
subclasses of `Animation`.

`Animation<double>` 变量很特殊，
因为它可以被用来表示名义范围为 0.0-1.0 的双精度值，
也就是 `Curve` 和 `Tween` 类以及动画的一些其他子类所期望的输入。

Some `Animation` subclasses are stateless,
merely forwarding listeners to their parents.
Some are very stateful.

有些 `Animation` 的子类是无状态的，
只是将监听器转发给其父级；另外有些是有状态的。

#### Composable animations

#### 组合动画

Most `Animation` subclasses take an explicit "parent"
`Animation<double>`. They are driven by that parent.

大多数 `Animation` 子类都采用明确的
“父级提供的” `Animation<double>`。可以说它们是由父级驱动的。

The `CurvedAnimation` subclass takes an `Animation<double>` object
(the parent), a forward curve, and an optional reverse curve.
It uses the parent's value as input to the curve
for the current direction.
If the parent reverses before reaching an endpoint,
`CurvedAnimation` keeps using the same curve
to avoid an abrupt jump in value.

`CurvedAnimation` 子类接收一个 `Animation<double>` 对象（父级）、
一个正向 curve 以及一个可选的反向 curve，
它将父级的值作为输入提供给当前方向下 curve。
如果父类在到达端点之前反向，
`CurvedAnimation` 会继续使用同一条 curve 来避免值发生冲突。

The `ReverseAnimation` subclass takes an
`Animation<double>` object as its parent and reverses
all the values of the animation. It assumes the parent
is using a value nominally in the range 0.0-1.0 and returns
a value in the range 1.0-0.0. The status and direction of the parent
animation are also reversed. `ReverseAnimation` is immutable and
stateless.

`ReverseAnimation` 子类接收一个 `Animation<double>` 对象作为它的父级，
但反转动画所有的值。它假定父级使用名义范围为 0.0-1.0 的双精度值，
并返回范围为 1.0-0.0 的值。父级动画的状态和方向也会被反转。
`ReverseAnimation` 是不可变和无状态的。

The `ProxyAnimation` subclass takes an `Animation<double>` object as
its parent and merely forwards the current state of that parent.
However, the parent is mutable.

`ProxyAnimation` 子类接收一个 `Animation<double>` 对象
作为其父级，并仅转发该父级的当前状态。
然而，父级是可变的。

The `TrainHoppingAnimation` subclass takes two parents, and switches
between them when their values cross.

`TrainHoppingAnimation` 子类接收两个父类，
并在它们的值交叉时在它们之间切换。

#### Animation Controllers

#### 动画控制器

The [`AnimationController`][] is a stateful
`Animation<double>` that uses a `Ticker` to advance its progress each frame.
It can be started and stopped. At each tick, it takes the time
elapsed since it was started and passes it to a `Simulation` to obtain
a value. That is then the value it reports. If the `Simulation`
reports that at that time it has ended, then the controller stops
itself.

[`AnimationController`][] 是一个有状态的
`Animation<double>`，并使用一个 `Ticker` 来推进每一帧的进度，
它可以被启动和停止。每次运行，它会收集从启动开始经过的时间，
并将其传递给 `Simulation` 来获得一个值，
这就是在当前时间戳下它应该传递的值。
如果 `Simulation` 反馈此时动画已经结束了，
则控制器就会自行停止。

The animation controller can be given a lower and upper bound to
animate between, and a duration.

可以给动画控制器设置动画运行的下限和上限，
还有动画的持续时间。

In the common case (using `forward()` or `reverse()`),
the animation controller performs a linear
interpolation from the lower bound to the upper bound (or vice versa,
for the reverse direction) over the given duration.

在一般情况下
（使用 `forward()` 或者 `reverse()`），
动画控制器会在给定的持续时间内线性地从
下限至上限（反之亦然，用于在反向）进行插值补间。

When using `repeat()`, the animation controller uses a linear
interpolation between the given bounds over the given duration.
It repeats indefinitely unless you specify a `count` or stop it.

当使用 `repeat()` 时，动画控制器会在持续时间内
线性地在上下边界之间进行插值补间，
除非指定 `count` 或者停止它，否则它会无限循环。

When using `animateTo()`, the animation controller interpolates
from the current value to the given target,
using a linear curve unless you specify a different `curve`.
If you omit `duration`, it scales the controller's duration
by the distance to the target as a fraction of the controller's range.

When using `fling()`, the animation controller uses a spring simulation
with the given initial velocity and optional `SpringDescription`.

When using `animateWith()`, the given simulation is
used to drive the controller.

These methods return a `TickerFuture` that completes
when the animation finishes successfully.
Canceling the animation, including by starting another animation or
disposing the controller, leaves this future incomplete.
Use its `orCancel` property to await a future that
throws `TickerCanceled` on cancellation.

#### Attaching animatables to animations

#### 将 animatables 附加到动画上

Passing an `Animation<double>` (the new parent) to
the `animate()` method of an `Animatable` object
creates a new `Animation` subclass that acts like
the `Animatable` but is driven from the given parent.

将 `Animation<double>`（新父级）传递给一个
`Animatable` 对象的 `animate()` 方法将创建一个
新的 `Animation` 子类，它的作用类似于 `Animatable`，
但是由给定的父级驱动。

[`addListener`]: {{site.api}}/flutter/animation/Animation/addListener.html
[`addStatusListener`]: {{site.api}}/flutter/animation/Animation/addStatusListener.html
[`AlwaysStoppedAnimation`]: {{site.api}}/flutter/animation/AlwaysStoppedAnimation-class.html
[`Animatable`]: {{site.api}}/flutter/animation/Animatable-class.html
[`animate`]: {{site.api}}/flutter/animation/Animatable/animate.html
[`AnimatedBuilder`]: {{site.api}}/flutter/widgets/AnimatedBuilder-class.html
[`AnimationController`]: {{site.api}}/flutter/animation/AnimationController-class.html
[`AnimatedWidget`]: {{site.api}}/flutter/widgets/AnimatedWidget-class.html
[`Animation`]: {{site.api}}/flutter/animation/Animation-class.html
[`AnimationStatus`]: {{site.api}}/flutter/animation/AnimationStatus.html
[`begin`]: {{site.api}}/flutter/animation/Tween/begin.html
[`BouncingScrollSimulation`]: {{site.api}}/flutter/widgets/BouncingScrollSimulation-class.html
[`build`]: {{site.api}}/flutter/widgets/AnimatedWidget/build.html
[`ClampingScrollSimulation`]: {{site.api}}/flutter/widgets/ClampingScrollSimulation-class.html
[`ColorTween`]: {{site.api}}/flutter/animation/ColorTween-class.html
[`Curve`]: {{site.api}}/flutter/animation/Curve-class.html
[`Curves`]: {{site.api}}/flutter/animation/Curves-class.html
[`CurvedAnimation`]: {{site.api}}/flutter/animation/CurvedAnimation-class.html
[`end`]: {{site.api}}/flutter/animation/Tween/end.html
[`evaluate`]: {{site.api}}/flutter/animation/Animatable/evaluate.html
[`fling`]: {{site.api}}/flutter/animation/AnimationController/fling.html
[`forward`]: {{site.api}}/flutter/animation/AnimationController/forward.html
[`ImplicitlyAnimatedWidget`]: {{site.api}}/flutter/widgets/ImplicitlyAnimatedWidget-class.html
[`kAlwaysCompleteAnimation`]: {{site.api}}/flutter/animation/kAlwaysCompleteAnimation-constant.html
[`kAlwaysDismissedAnimation`]: {{site.api}}/flutter/animation/kAlwaysDismissedAnimation-constant.html
[`lerp`]: {{site.api}}/flutter/animation/Tween/lerp.html
[`ListenableBuilder`]: {{site.api}}/flutter/widgets/ListenableBuilder-class.html
[`RectTween`]: {{site.api}}/flutter/animation/RectTween-class.html
[`ReverseAnimation`]: {{site.api}}/flutter/animation/ReverseAnimation-class.html
[`scheduleFrameCallback()`]: {{site.api}}/flutter/scheduler/SchedulerBinding/scheduleFrameCallback.html
[`SchedulerBinding`]: {{site.api}}/flutter/scheduler/SchedulerBinding-mixin.html
[`setState`]: {{site.api}}/flutter/widgets/State/setState.html
[`Simulation`]: {{site.api}}/flutter/physics/Simulation-class.html
[`State`]: {{site.api}}/flutter/widgets/State-class.html
[`stop`]: {{site.api}}/flutter/animation/AnimationController/stop.html
[`Ticker`]: {{site.api}}/flutter/scheduler/Ticker-class.html
[`Tween<T>`]: {{site.api}}/flutter/animation/Tween-class.html
[`TweenAnimationBuilder`]: {{site.api}}/flutter/widgets/TweenAnimationBuilder-class.html
[various concrete implementations]: {{site.api}}/flutter/physics/physics-library.html
