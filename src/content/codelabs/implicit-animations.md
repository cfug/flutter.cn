---
# title: "Implicit animations"
title: 隐式动画
# description: >
#   Learn how to use Flutter's implicitly animated widgets
#   through interactive examples and exercises.
description: "通过交互式示例和练习学习如何在 Flutter 中使用隐式动画的 widgets。"
tags: 教程, 代码实验室
keywords: 隐式动画,UI,用户界面
toc: true
diff2html: true
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
  - defer: true
    url: /assets/js/codelabs/animations_examples.js
---

<?code-excerpt path-base="animation/implicit"?>

Welcome to the implicit animations codelab, where you learn how to use Flutter
widgets that make it easy to create animations for a specific set of properties.

欢迎来到隐式动画的 codelab，
在这里你将学到：
如何使用 Flutter widgets 轻松地对一组特定属性创建动画。

{% include docs/dartpad-troubleshooting.md %}

To get the most out of this codelab, you should have basic knowledge about:

为了充分理解该 codelab，你应该具备以下基本知识：

* How to [make a Flutter app].

  如何 [创建一个 Flutter 应用][make a Flutter app]。

* How to use [stateful widgets].

  如何使用 [stateful widgets][]。

This codelab covers the following material:

该 codelab 包括以下内容:

- Using `AnimatedOpacity` to create a fade-in effect.

  使用 `AnimatedOpacity` 来创建一个淡入效果。

- Using `AnimatedContainer` to animate transitions in size, color, and margin.

  使用 `AnimatedContainer` 让尺寸、颜色和边距产生动画变换。

- Overview of implicit animations and techniques for using them.

  隐式动画及其使用方法的概述。

**Estimated time to complete this codelab: 15-30 minutes.**

**完成该 codelab 的时间约为：15-30 分钟。**

## What are implicit animations?

## 什么是隐式动画?

With Flutter's [animation library][],
you can add motion and create visual effects
for the widgets in your UI.
One widget set in the library manages animations for you.
These widgets are collectively referred to as _implicit animations_,
or _implicitly animated widgets_, deriving their name from the
[ImplicitlyAnimatedWidget][] class that they implement.
With implicit animations,
you can animate a widget property by setting a target value;
whenever that target value changes,
the widget animates the property from the old value to the new one.
In this way, implicit animations trade control for convenience&mdash;they
manage animation effects so that you don't have to.

通过使用 Flutter 的 [动画库][animation library]，
你可以为 UI 中的组件添加运动和创建视觉效果。
你可以使用库中的一套组件来管理动画，
这些组件统称为**隐式动画**或**隐式动画组件**，
其名称源于它们都实现了 [ImplicitlyAnimatedWidget][] 类。
使用隐式动画，你可以通过设置一个目标值，驱动 widget 的属性进行动画变换；
每当目标值发生变化时，属性会从旧值逐渐更新到新值。
通过这种方式，隐式动画内部实现了动画控制，从而能够方便地使用&mdash;
隐式动画组件会管理动画效果，用户不需要再进行额外的处理。

## Example: Fade-in text effect

## 示例：淡入文字效果

The following example shows how to add a fade-in effect to existing UI
using an implicitly animated widget called [AnimatedOpacity][].
**The example begins with no animation code**&mdash;it
consists of a [Material App][] home screen containing:

下面的示例展示了如何使用名为 [AnimatedOpacity][] 的隐式动画 widget，
为已存在的 UI 添加淡入效果。
**这个示例开始没有动画效果**&mdash;
它包含一个由 [Material App][] 组成的主页面，
有以下内容：

- A photograph of an owl.

  一张猫头鹰的照片。

- One **Show details** button that does nothing when clicked.

  一个点击时什么也不做的 **Show details** 按钮。

- Description text of the owl in the photograph.

  照片中猫头鹰的描述文字。

### Fade-in (starter code)

### 淡入 (初始代码)

To view the example, Click **Run**:

点击 **Run** 按钮来运行这个示例：

{% render docs/implicit-animations/fade-in-starter-code.md %}

### Animate opacity with AnimatedOpacity widget

### 使用 AnimatedOpacity widget 进行透明度动画

This section contains a list of steps you can use to add an
implicit animation to the
[fade-in starter code][]. After the steps, you can also run the
[fade-in complete][] code with the changes already made.
The steps outline how to use the `AnimatedOpacity`
widget to add the following animation feature:

这部分包含在 [淡入初始代码][fade-in starter code] 中添加一个隐式动画一系列步骤。
完成这些步骤后，你还可以运行 [淡入完成代码][fade-in complete]，
该代码已经实现了淡入效果。
这些步骤概述了如何使用 `AnimatedOpacity` widget 来添加以下的动画特性：

- The owl's description text remains hidden until the user clicks
  **Show details**.

  用户点击 **Show details** 按钮后，显示猫头鹰的描述文字。

- When the user clicks **Show details**,
  the owl's description text fades in.

  当用户点击 **Show details** 按钮时，猫头鹰的描述文字淡入。

#### 1. Pick a widget property to animate

#### 1. 选择要进行动画的 widget 属性

To create a fade-in effect, you can animate the
`opacity` property using the`AnimatedOpacity` widget. 
Wrap the `Column` widget in an `AnimatedOpacity` widget:

想要创建淡入效果，你可以使用 `AnimatedOpacity` widget 对 `opacity` 属性进行动画。
将 `Column` widget 换成 `AnimatedOpacity` widget：

```diff2html
--- opacity1/lib/main.dart
+++ opacity2/lib/main.dart
@@ -26,12 +26,14 @@
         ),
         onPressed: () => {},
       ),
-      const Column(
-        children: [
-          Text('Type: Owl'),
-          Text('Age: 39'),
-          Text('Employment: None'),
-        ],
+      AnimatedOpacity(
+        child: const Column(
+          children: [
+            Text('Type: Owl'),
+            Text('Age: 39'),
+            Text('Employment: None'),
+          ],
+        ),
       )
     ]);
   }
```

:::note

You can reference the line numbers in the example code to help track where
to make these changes in the [fade-in starter code][].

你可以根据示例代码中的行号，
查看 [淡入初始代码][fade-in starter code] 里修改的位置。

:::

#### 2. Initialize a state variable for the animated property

#### 2. 为动画属性初始化一个状态变量

To hide the text before the user clicks **Show details**, set
the starting value for `opacity` to zero:

将 `opacity` 的初始值设置为 0 ，以便在用户点击 **Show details** 前隐藏文字：

```diff2html
--- opacity2/lib/main.dart
+++ opacity3/lib/main.dart
@@ -15,6 +15,8 @@
 }

 class _FadeInDemoState extends State<FadeInDemo> {
+  double opacity = 0;
+
   @override
   Widget build(BuildContext context) {
     return ListView(children: <Widget>[
@@ -27,6 +29,7 @@
         onPressed: () => {},
       ),
       AnimatedOpacity(
+        opacity: opacity,
         child: const Column(
           children: [
             Text('Type: Owl'),
```

#### 3. Set the duration of the animation

#### 3. 为动画设置一个时长

In addition to an `opacity` parameter, `AnimatedOpacity` requires a
[duration][] to use for its animation. For this example,
you can start with 2 seconds:

除了 `opacity` 参数以外，`AnimatedOpacity` 还需要为动画设置 [duration][]。
在下面的例子中，动画会以两秒的时长运行：

```diff2html
--- opacity3/lib/main.dart
+++ opacity4/lib/main.dart
@@ -29,6 +29,7 @@
         onPressed: () => {},
       ),
       AnimatedOpacity(
+        duration: const Duration(seconds: 2),
         opacity: opacity,
         child: const Column(
           children: [
```

#### 4. Set up a trigger for animation and choose an end value

#### 4. 为动画设置一个触发器，并选择一个结束值

Configure the animation to trigger when the user clicks **Show details**.
To do this, change `opacity` state using the `onPressed()` handler for
`TextButton`. To make the `FadeInDemo` widget become fully visible when
the user clicks **Show details**, use the `onPressed()` handler
to set `opacity` to 1:

当用户点击 **Show details** 按钮时，将会触发动画。
为了做到这点，我们使用 `TextButton` 的 `onPressed()` 方法，
在调用时改变 `opacity` 的状态值为 1。

```diff2html
--- opacity4/lib/main.dart
+++ opacity5/lib/main.dart
@@ -26,7 +26,9 @@
           'Show Details',
           style: TextStyle(color: Colors.blueAccent),
         ),
-        onPressed: () => {},
+        onPressed: () => setState(() {
+          opacity = 1;
+        }),
       ),
       AnimatedOpacity(
         duration: const Duration(seconds: 2),
```

:::note

You only need to set the start and end values of `opacity`.
The `AnimatedOpacity` widget manages everything in between.

注意：你只需要设置 `opacity` 的开始值和结束值。
`AnimatedOpacity` widget 会自行处理动画过程中的一切。

:::

### Fade-in (complete)

### 淡入 (完成代码)

Here's the example with the completed changes you've made.
Run this example then click **Show details** to trigger the animation.

下面的示例是修改后的完成版代码&mdash;
运行这个示例，然后点击 **Show details** 按钮就可以触发动画。

{% render docs/implicit-animations/fade-in-complete.md %}

### Putting it all together

### 小结一下

The [Fade-in text effect][] example demonstrates the following features
of the `AnimatedOpacity` widget.

- It listens for state changes to its `opacity` property.

  `AnimatedOpacity` 会监听其 `opacity` 属性的状态变化。

- When the `opacity` property changes,
  it animates the transition to the new value for `opacity`.

  当 `opacity` 属性改变时，
  `AnimatedOpacity` 会自动将 `opacity` 变化到新值，
  同时使 widget 进行动画跟随变换。

- It requires a `duration` parameter to define how long
  the transition between the values should take.

  `AnimatedOpacity` 需要一个 `duration` 参数来确定新旧 `opacity` 进行动画变换的时长。

:::note

- Implicit animations can only animate the
  properties of a parent stateful widget.
  The preceding example enables this with the
  `FadeInDemo` widget that extends `StatefulWidget`.

  隐式动画只能在父节点是 `StatefulWidget` 时以动画变换属性。
  因此，本示例是从继承 `StatefulWidget` 的 `FadeInDemo` widget 开始的。

- The `AnimatedOpacity` widget only animates the `opacity` property.
  Some implicitly animated widgets can animate many properties
  at the same time. The following example showcases this.

  `AnimatedOpacity` 只能将一个 `opacity` 属性进行动画。
  一些隐式动画 widget 可以同时动画变换多个属性，如下面的示例所示。

:::

## Example: Shape-shifting effect

## 示例：形状变化效果

The following example shows how to use the [`AnimatedContainer`][] widget to
animate multiple properties (`margin`, `borderRadius`, and `color`) with
different types (`double` and `Color`).
**The example begins with no animation code**.
It starts with a [Material App][] home screen that contains:

下面的示例将展示如何使用 [`AnimatedContainer`][] widget
让多个不同类型（`double` 和 `Color`）的属性
（`margin`、`borderRadius` 和 `color`）同时进行动画变换。
**这个示例开始没有动画效果**&mdash;
它以一个由 [Material App][] 组成的主页面开始，
有以下内容：

- A `Container` widget configured with a
 `borderRadius`, `margin`, and `color`.
  These properties are setup to be regenerated 
  each time you run the example.

  一个有 `margin`、`borderRadius`、和 `color` 属性的 `Container`，
  这些属性每次运行时的值都不同。

- A **Change** button that does nothing when clicked.

  一个点击时什么都不做的 **Change** 按钮。

### Shape-shifting (starter code)

### 形状变化 (初始代码)

To start the example, click **Run**.

点击 **Run** 按钮来运行这个示例：

{% render docs/implicit-animations/shape-shifting-starter-code.md %}

### Animate color, borderRadius, and margin with AnimatedContainer

### 使用 AnimatedContainer 将 color、borderRadius、和 margin 进行动画变换

This section contains a list of steps you can use to add an
implicit animation to the [shape-shifting starter code][].
After completing each step, you can also run the
[complete shape-shifting example][] with the changes already made.

这部分包含在 [形状变化初始代码][shape-shifting starter code] 中
添加一个隐式动画的一系列步骤。
完成这些步骤后，你还可以运行
[形状变化示例][complete shape-shifting example]，
该代码已经实现了淡入效果。

The [shape-shifting starter code][] assigns
each property in the `Container` widget a random value.
Associated functions generate the relevant values:

在 [形状变化初始代码][shape-shifting starter code] 中
每个 `Container` widget 的属性都由一个相关的函数赋值来完成以下的效果:

- The `randomColor()` function generates a
  `Color` for the `color` property

  `randomColor()` 函数为 `color` 属性生成新的 `Color`。

- The `randomBorderRadius()` function generates a
  `double` for the `borderRadius` property.

  `randomBorderRadius()` 函数为 `borderRadius` 属性生成新的 `double`。

- The `randomMargin()` function generates a
  `double` for the `margin` property.

  `randomMargin()` 函数为 `margin` 属性生成新的 `double`。

The following steps use the `AnimatedContainer` widget to:

以下步骤会使用 `AnimatedContainer` 来达到：

- Transition to new values for `color`, `borderRadius`,
  and `margin` whenever the user clicks **Change**.

  每当用户点击 **Change** 按钮时，
  `color`、`borderRadius` 和 `margin` 都会渐变到新的值。

- Animate the transition to the new values for `color`,
  `borderRadius`, and `margin` whenever they are set.

  每当 `color`、`borderRadius` 和 `margin` 被设置时，
  都会进行动画变换到新的值。

#### 1. Add an implicit animation

#### 1. 添加一个隐式动画

Change the `Container` widget to an `AnimatedContainer` widget:

将 `Container` widget 换成 `AnimatedContainer` widget：

```diff2html
--- container1/lib/main.dart
+++ container2/lib/main.dart
@@ -47,7 +47,7 @@
             SizedBox(
               width: 128,
               height: 128,
-              child: Container(
+              child: AnimatedContainer(
                 margin: EdgeInsets.all(margin),
                 decoration: BoxDecoration(
                   color: color,
```

:::note

You can reference the line numbers in the example code to help track where to
make these changes in the [shape-shifting starter code][].

你可以根据示例代码中的行号，
查看 [形状变化初始代码][shape-shifting starter code] 里修改的位置。

:::

#### 2. Set starting values for animated properties

#### 2. 为动画属性设置初始值

The `AnimatedContainer` widget transitions between
old and new values of its properties when they change.
To contain the behavior triggered when the user clicks **Change**,
create a `change()` method.
The `change()` method can use the `setState()` method to set new values
for the `color`, `borderRadius`, and `margin` state variables:

当属性的新旧值发生变化时，`AnimatedContainer` 会自动在新旧值之间产生动画效果。
通过创建一个 `change()` 方法，我们将定义当用户点击 **Change** 按钮时触发变更的行为。
`change()` 方法可以使用 `setState()` 
为 `color`、`borderRadius` 和 `margin` 状态变量设置新值：

```diff2html
--- container2/lib/main.dart
+++ container3/lib/main.dart
@@ -38,6 +38,14 @@
     margin = randomMargin();
   }

+  void change() {
+    setState(() {
+      color = randomColor();
+      borderRadius = randomBorderRadius();
+      margin = randomMargin();
+    });
+  }
+
   @override
   Widget build(BuildContext context) {
     return Scaffold(
```

#### 3. Set up a trigger for the animation

#### 3. 为动画设置触发器

To set the animation to trigger whenever the user presses **Change**,
invoke the `change()` method in the `onPressed()` handler:

每当用户点击 **Change** 按钮时触发动画，
调用 `onPressed()` 处理器的 `change()` 方法：

```diff2html
--- container3/lib/main.dart
+++ container4/lib/main.dart
@@ -65,7 +65,7 @@
             ),
             ElevatedButton(
               child: const Text('Change'),
-              onPressed: () => {},
+              onPressed: () => change(),
             ),
           ],
         ),
```

#### 4. Set duration

#### 4. 设置时长

Set the `duration` of the animation that powers the transition
between the old and new values:

在最后，设置新旧值之间变换的时长参数 `duration`：

```diff2html
--- container4/lib/main.dart
+++ container5/lib/main.dart
@@ -6,6 +6,8 @@

 import 'package:flutter/material.dart';

+const _duration = Duration(milliseconds: 400);
+
 double randomBorderRadius() {
   return Random().nextDouble() * 64;
 }
@@ -61,6 +63,7 @@
                   color: color,
                   borderRadius: BorderRadius.circular(borderRadius),
                 ),
+                duration: _duration,
               ),
             ),
             ElevatedButton(
```

### Shape-shifting (complete)

### 形状变化 (完成代码)

Here's the example with the completed changes you've made.
Run the code and click **Change** to trigger the animation.
Each time you click **Change**, the shape animates to its new values
for `margin`, `borderRadius`, and `color`.

下面的示例是修改后的完成版代码&mdash;
运行这个示例，然后点击 **Change** 按钮就可以触发动画。
注意：每次你点击 **Change** 按钮，
形状的 `margin`、`borderRadius` 和 `color` 都会进行动画变化到新的值。

{% render docs/implicit-animations/shape-shifting-complete.md %}

### Using animation curves

### 使用动画曲线

The preceding examples show how:

- Implicit animations allow you to animate the transition between
  values for specific widget properties.

  如何让你通过隐式动画对特定的 widget 属性值进行动画变化。

- The `duration` parameter allows you to set how long the animation
  takes to complete.

  如何通过 `duration` 参数设置动画完成所需的时间。

Implicit animations also allow you to control changes to **the rate**
of an animation that occurs during the set `duration`.
To define this change in rate,
set the value of the `curve` parameter to
a [`Curve`][], such as one declared in the [`Curves`][] class.

隐式动画还允许你在 `duration` 时长内控制动画的 **速率** 变化。
用来定义这种速率变化的参数是 [`Curve`][]，
或者 [`Curves`][] 这些已经预定义的曲线。

The preceding examples did not specify a value for the `curve` parameter.
Without a specified curve value,
the implicit animations apply a [linear animation curve][].

前面的例子中没有指定 `curve`，
所以隐式动画默认使用 [线性动画曲线][linear animation curve]。

Specify a value for the `curve` parameter in
the [complete shape-shifting example][].
The animation changes when you pass the
[`easeInOutBack`][] constant for `curve`,

在 [形状变化示例][complete shape-shifting example]
中添加一个 `curve` 参数，
然后当你将常量 [`easeInOutBack`][] 传递给 `curve` 时，
观察动画的变化：

```diff2html
--- container5/lib/main.dart
+++ container6/lib/main.dart
@@ -64,6 +64,7 @@
                   borderRadius: BorderRadius.circular(borderRadius),
                 ),
                 duration: _duration,
+                curve: Curves.easeInOutBack,
               ),
             ),
             ElevatedButton(
```

When you pass the `Curves.easeInOutBack` constant to the `curve` property
of the `AnimatedContainer` widget, watch how
the rates of change for `margin`, `borderRadius`, and `color`
follow the curve that constant defined.

现在你已经将 `easeInOutBack` 作为 `curve` 的值传递给了 `AnimatedContainer`，
注意：`margin`、`borderRadius` 和 `color` 的变化速率
遵循 `easeInOutBack` 所定义的曲线:

<div id="animation_1_play_button_"></div>
<video id="animation_1" style="width:464px; height:192px;" loop="">
  <source src="{{site.flutter-assets}}/animation/curve_ease_in_out_back.mp4" type="video/mp4">
</video>

### Putting it all together

### 小结一下

The [complete shape-shifting example][] animates transitions between
values for `margin`, `borderRadius`, and `color` properties.
The `AnimatedContainer` widget animates changes to any of its properties.
These include those you didn't use such as `padding`, `transform`,
and even `child` and `alignment`!
By showing additional capabilities of implicit animations,
the [complete shape-shifting example][] builds upon
[fade-in complete][] example.

[形状变化示例][complete shape-shifting example]
对 `margin`、`borderRadius` 和 `color` 属性值进行了动画变换。
注意：`AnimatedContainer` 可以对它的任意属性进行动画改变，
包括那些你没有使用的属性，比如 `padding`、`transform`，
甚至是 `child` 和 `alignment`!
这个 [形状变化示例][complete shape-shifting example]
建立在 [渐变完成代码][fade-in complete] 的基础上，
展现出隐式动画的额外功能。

To summarize implicit animations:

总结隐式动画的特点：

- Some implicit animations, like the `AnimatedOpacity` widget,
  only animate one property.
  Others, like the `AnimatedContainer` widget, can animate many properties.

  一些隐式动画（比如 `AnimatedOpacity`）只能对一个属性值进行动画变换，
  然而有些（比如 `AnimatedContainer`）可以同时变换多个属性。

- Implicit animations animate the transition between the
  old and new value of a property when it
  changes using the provided `curve` and `duration`.

  隐式动画会在新旧属性值变换时，
  自动使用提供的 `curve` 和 `duration` 进行动画变换。

- If you do not specify a `curve`,
  implicit animations default to a [linear curve][].

  如果你没有指定 `curve`，隐式动画的曲线会默认使用 [线性曲线][linear curve]。

## What's next?

## 下一步是什么？

Congratulations, you've finished the codelab!
To learn more, check out these suggestions:

恭喜，你已经完成了这个 codelab！
如果你想要了解更多，这里有一些其他文章的推荐：

- Try the [animations tutorial][].

  尝试一下 [动画教程][animations tutorial]。

- Learn about [hero animations][] and [staggered animations][].

  学习 [hero 动画][hero animations] 和 [staggered 动画][staggered animations]。

- Checkout the [animation library][].

  查看更多 [动画库][animation library] 的信息。

- Try another [codelab][].

  尝试一下其他的 [codelab][]。

[`AnimatedContainer`]: {{site.api}}/flutter/widgets/AnimatedContainer-class.html
[AnimatedOpacity]: {{site.api}}/flutter/widgets/AnimatedOpacity-class.html
[animation library]: {{site.api}}/flutter/animation/animation-library.html
[animations tutorial]: /ui/animations/tutorial
[codelab]: /codelabs
[`Curve`]: {{site.api}}/flutter/animation/Curve-class.html
[`Curves`]: {{site.api}}/flutter/animation/Curves-class.html
[duration]: {{site.api}}/flutter/widgets/ImplicitlyAnimatedWidget/duration.html
[`easeInOutBack`]: {{site.api}}/flutter/animation/Curves/easeInOutBack-constant.html
[fade-in complete]: #fade-in-complete
[fade-in starter code]: #fade-in-starter-code
[Fade-in text effect]: #example-fade-in-text-effect
[hero animations]: /ui/animations/hero-animations
[ImplicitlyAnimatedWidget]: {{site.api}}/flutter/widgets/ImplicitlyAnimatedWidget-class.html
[linear animation curve]: {{site.api}}/flutter/animation/Curves/linear-constant.html
[linear curve]: {{site.api}}/flutter/animation/Curves/linear-constant.html
[make a Flutter app]: {{site.codelabs}}/codelabs/flutter-codelab-first
[Material App]: {{site.api}}/flutter/material/MaterialApp-class.html
[complete shape-shifting example]: #shape-shifting-complete
[shape-shifting starter code]: #shape-shifting-starter-code
[staggered animations]: /ui/animations/staggered-animations
[stateful widgets]: /ui/interactivity#stateful-and-stateless-widgets
