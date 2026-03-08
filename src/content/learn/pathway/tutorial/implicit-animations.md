---
# title: Simple animations
title: 简单动画
# description: Learn the simplest way to implement animations in Flutter.
description: 学习在 Flutter 中实现动画的最简单方式。
layout: tutorial
---

Flutter provides a rich set of animation APIs, and the simplest way to
start using them is with **implicit animations**.
"Implicit animations" refers to a group of widgets that
automatically animate changes to their properties without you
needing to manage any intermediate behavior.

Flutter 提供了丰富的动画 API，而使用它们最简单的方式就是**隐式动画**。
"隐式动画"是指一组能够自动对属性变化进行动画处理的 widget，
你无需手动管理任何中间状态行为。

<SummaryCard>
title: What you'll accomplish
items:
  - title: Discover implicit animations in Flutter
    icon: auto_awesome
  - title: Animate property changes with AnimatedContainer
    icon: animation
  - title: Customize timing with duration and curves
    icon: timeline
</SummaryCard>

In this lesson, you'll learn about one of the most common and
versatile implicit animation widgets: [`AnimatedContainer`][].
With just two additional lines of code, the background color of each `Tile`
animates to a new color in about half a second.

在本课中，你将学习最常用且最灵活的隐式动画 widget 之一：[`AnimatedContainer`][]。
只需额外添加两行代码，每个 `Tile` 的背景颜色就能在大约半秒内平滑地过渡到新颜色。

[`AnimatedContainer`]: {{site.api}}/flutter/widgets/AnimatedContainer-class.html

---

### Convert `Container` to `AnimatedContainer`

### 将 `Container` 转换为 `AnimatedContainer`

Currently, the `Tile.build` method returns a `Container` to display a letter.
When the `hitType` changes, like from `HitType.none` to `HitType.hit`,
the background color of the tile changes instantly.
For example, from white to green in the case of `HitType.none` to `HitType.hit`.

目前，`Tile.build` 方法返回一个 `Container` 来显示字母。
当 `hitType` 发生变化时，例如从 `HitType.none` 变为 `HitType.hit`，
方块的背景颜色会瞬间改变。
比如从 `HitType.none` 到 `HitType.hit` 时，颜色会从白色直接变为绿色。

For reference, here's the current implementation of the `Tile` widget:

以下是 `Tile` widget 的当前实现，供参考：

```dart
class Tile extends StatelessWidget {
  const Tile(required this.letter, required hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      width: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        color: switch (type) {
          HitType.hit => Colors.green,
          HitType.partial => Colors.yellow,
          HitType.miss => Colors.grey,
          _ => Colors.white,
        },
      ),
      child: Center(
        child: Text(
          letter.toUpperCase(),
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
    );
  }
}
```

To make the color change animate smoothly,
replace the `Container` widget with an `AnimatedContainer`.

要让颜色变化平滑过渡，
请将 `Container` widget 替换为 `AnimatedContainer`。

An `AnimatedContainer` is like a `Container`, but it
automatically animates changes to its properties over a specified `duration`.
When properties such as
`color`, `height`, `width`, `decoration`, or `alignment` change,
`AnimatedContainer` interpolates between the old and new values,
creating a smooth transition.

`AnimatedContainer` 类似于 `Container`，但它会在指定的 `duration` 内
自动对属性变化进行动画处理。
当 `color`、`height`、`width`、`decoration` 或 `alignment` 等属性发生变化时，
`AnimatedContainer` 会在新旧值之间进行插值，从而实现平滑过渡。

Modify your `Tile` widget as follows:

按如下方式修改你的 `Tile` widget：

```dart
class Tile extends StatelessWidget {
  const Tile(required this.letter, required hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 500),
      height: 60,
      width: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        color: switch (hitType) {
          HitType.hit => Colors.green,
          HitType.partial => Colors.yellow,
          HitType.miss => Colors.grey,
          _ => Colors.white,
        },
      ),
      child: Center(
        child: Text(
          letter.toUpperCase(),
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
    );
  }
}
```

**`duration`** is a required property that
specifies how long the animation should take.
In this example, passing `Duration(milliseconds: 500)` means
the color transition will take half a second.
You can also specify seconds, minutes, and many other units of time.

**`duration`** 是一个必需属性，用于指定动画的持续时间。
在本例中，传入 `Duration(milliseconds: 500)` 表示颜色过渡将持续半秒。
你还可以使用秒、分钟等其他时间单位。

Now, when the `hitType` changes and the `Tile` widget rebuilds
(because `setState` was called in `GamePage`),
the color of the tile smoothly animates from its old color to
the new one over the specified duration.

现在，当 `hitType` 发生变化并且 `Tile` widget 重建时
（因为在 `GamePage` 中调用了 setState），
方块的颜色会在指定的持续时间内从旧颜色平滑过渡到新颜色。

### Adjust the animation curve

### 调整动画曲线

To add a bit of customization to an implicit animation,
you can pass it a different [`Curve`][].
Different curves change the speed of the animation
at different points throughout the animation.

要为隐式动画添加一些自定义效果，
你可以传入不同的 [`Curve`][]（曲线）。
不同的曲线会改变动画在各个阶段的速度变化。

For example, the default curve for Flutter animations is `Curves.linear`. This gif shows how the animation curve behaves:

例如，Flutter 动画的默认曲线是 `Curves.linear`。下面的 gif 展示了该动画曲线的效果：

<img src="/assets/images/docs/tutorial/linear_curve.gif" width="320px"
alt="A gif that shows a linear curve.">

Compare that to `Curve.bounceIn`, another common curve:

与另一种常见曲线 `Curve.bounceIn` 对比一下：

<img src="/assets/images/docs/tutorial/bounce_in_curve.gif" width="320px"
alt="A gif that shows a bounce-in curve">



To change the `Curve` of this animation, update the code to the following:

要更改此动画的 `Curve`，请将代码更新为如下所示：

```dart
class Tile extends StatelessWidget {
  const Tile(required this.letter, required hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 500),
      curve: Curves.bounceIn, // NEW
      height: 60,
      width: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        color: switch (hitType) {
          LetterType.hit => Colors.green,
          LetterType.partial => Colors.yellow,
          LetterType.miss => Colors.grey,
          _ => Colors.white,
        },
      ),
      child: Center(
        child: Text(
          letter.toUpperCase(),
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
    );
  }
}
```

There are many different curves provided by the Flutter SDK, so
feel free to try them out by passing different types to the `curve` parameter.

Flutter SDK 提供了许多不同的曲线，
你可以通过向 `curve` 参数传入不同的类型来自由尝试。

Implicit animations like `AnimatedContainer` are powerful because
you just tell the widget what the new state should be, and
it handles the "how" of the animation.

像 `AnimatedContainer` 这样的隐式动画功能强大，
因为你只需告诉 widget 新状态是什么，
它就会自动处理动画的"过程"。

For complex, custom animations, you can write your own animated widgets.
If you're curious, try it out in the [animations tutorial][].

对于复杂的自定义动画，你可以编写自己的动画 widget。
如果感兴趣，可以在 [animations tutorial][]（动画教程）中尝试。

[`Curve`]: {{site.api}}/flutter/animation/Curves-class.html
[animations tutorial]: /ui/animations/tutorial

### Review

### 回顾

<SummaryCard>
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Discovered implicit animations
    icon: auto_awesome
    details: >-
      Implicit animations are widgets that automatically
      animate changes to their properties.
      You specify the new state, and the widget handles
      the animation for you without requiring manual animation management.
  - title: Animated the tiles with AnimatedContainer
    icon: animation
    details: >-
      By replacing `Container` with `AnimatedContainer` and adding a `duration`,
      your tiles now smoothly transition between colors.
      With just two lines of code, you added professional polish to your app!
  - title: Customized timing with duration and curves
    icon: timeline
    details: >-
      The `duration` property controls how long the animation takes,
      while `curve` changes the animation's feel.
      You tried `Curves.decelerate`, but you can also try other values
      like `Curves.easeIn`, `Curves.bounceOut`, or `Curves.elasticIn`.
  - title: Completed the Birdle game
    icon: celebration
    details: >-
      You've built a complete Wordle-style game with custom widgets,
      dynamic layouts, user input, state management, and smooth animations.
      You now have the foundational skills to build your own Flutter apps!
</SummaryCard>

### Test yourself

### 自测

<Quiz title="Implicit Animations Quiz">
- question: What widget can you use to automatically animate changes to properties like color, size, and decoration?
  options:
    - text: Container
      correct: false
      explanation: Container doesn't animate; property changes happen instantly.
    - text: AnimatedContainer
      correct: true
      explanation: AnimatedContainer automatically animates changes to its properties over the specified duration.
    - text: AnimationController
      correct: false
      explanation: AnimationController is for explicit animations; AnimatedContainer is simpler for basic animations.
    - text: TransitionContainer
      correct: false
      explanation: There is no TransitionContainer widget; use AnimatedContainer for implicit animations.
- question: "What does the `duration` property control in an AnimatedContainer?"
  options:
    - text: How long the widget stays on screen before disappearing.
      correct: false
      explanation: Duration controls animation time, not widget visibility.
    - text: How long the animation takes to transition from the old value to the new value.
      correct: true
      explanation: The duration specifies the time over which the property change is animated.
    - text: The delay before the animation starts.
      correct: false
      explanation: Duration is about animation length; delays require separate configuration.
    - text: How many times the animation repeats.
      correct: false
      explanation: Implicit animations run once per state change; repetition requires explicit animation controllers.
</Quiz>
