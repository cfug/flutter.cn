---
title: "Implicit animations"
title: 隐式动画
description: "A codelab that uses interactive examples and exercises to teach  how to use Flutter's implicitly animated widgets."
description: "通过交互式示例和练习学习如何在 Flutter 中使用隐式动画的 widgets。"
tags: 教程, 代码实验室
keywords: 隐式动画,UI,用户界面
toc: true
diff2html: true
js:
  - defer: true
    url: https://dartpad.cn/inject_embed.dart.js
  - defer: true
    url: /assets/codelabs/js/animations_examples.js
---

<?code-excerpt path-base="animation/implicit"?>

Welcome to the implicit animations codelab, where you learn how to use Flutter
widgets that make it easy to create animations for a specific set of properties.

欢迎来到隐式动画的 codelab，
在这里您将学到：
如何使用 Flutter widgets 轻松地对一组特定属性创建动画。

To get the most out of this codelab, you should have basic knowledge about:

为了充分理解该 codelab，您应该具备以下基本知识：

* How to [make a Flutter app].

  如何 [创建一个 Flutter 应用][make a Flutter app]。
  
* How to use [stateful widgets].

  如何使用 [stateful widgets][]。

This codelab covers the following material:

该 codelab 包括以下内容:

* Using `AnimatedOpacity` to create a fade-in effect.

  使用 `AnimatedOpacity` 来创建一个淡入效果。

* Using `AnimatedContainer` to animate transitions in size, color, and margin.

  使用 `AnimatedContainer` 让尺寸、颜色和边距产生动画变换。

* Overview of implicit animations and techniques for using them.

  隐式动画及其使用方法的概述。

**Estimated time to complete this codelab: 15-30 minutes.**

**完成该 codelab 的时间约为：15-30 分钟。**

## What are implicit animations?

## 什么是隐式动画?

With Flutter's [animation library],
you can add motion and create visual effects
for the widgets in your UI.

通过使用 Flutter 的 [动画库][animation library]，
您可以为 UI 中的组件添加运动和创建视觉效果。

One widget set in the library manages animations for you.
These widgets are collectively referred to as _implicit animations_,
or _implicitly animated widgets_, deriving their name from the
[ImplicitlyAnimatedWidget] class that they implement.

您可以使用库中的一套组件来管理动画，
这些组件统称为**隐式动画**或**隐式动画组件**，
其名称源于它们都实现了 [ImplicitlyAnimatedWidget][] 类。

With implicit animations,
you can animate a widget property by setting a target value;
whenever that target value changes,
the widget animates the property from the old value to the new one.
In this way, implicit animations trade control for convenience&mdash;they
manage animation effects so that you don't have to.

使用隐式动画，您可以通过设置一个目标值，驱动 widget 的属性进行动画变换；
每当目标值发生变化时，属性会从旧值逐渐更新到新值。
通过这种方式，隐式动画内部实现了动画控制，从而能够方便地使用&mdash;
隐式动画组件会管理动画效果，用户不需要再进行额外的处理。

## Example: Fade-in text effect

## 示例：淡入文字效果

The following example shows how to add a fade-in effect to existing UI
using an implicitly animated widget called [AnimatedOpacity].

下面的示例展示了如何使用名为 [AnimatedOpacity][] 的隐式动画 widget，
为已存在的 UI 添加淡入效果。

**The example begins with no animation code**&mdash;it
consists of a [Material App] home screen containing:

**这个示例开始没有动画效果**&mdash;
它包含一个由 [Material App][] 组成的主页面，
有以下内容：

* A photograph of an owl.

  一张猫头鹰的照片。

* One **Show details** button that does nothing when clicked.

  一个点击时什么也不做的 **Show details** 按钮。

* Description text of the owl in the photograph.

  照片中猫头鹰的描述文字。

### Fade-in (starter code)

### 淡入 (初始代码)

Click the **Run** button to run the example:

点击 **Run** 按钮来运行这个示例：

{% include implicit-animations/fade-in-starter-code.md %}

{{site.alert.important}}

  This page uses an embedded version of [DartPad] to display
  examples and exercises.
  If you see empty boxes instead of DartPads, go to the
  [DartPad troubleshooting page].

  本页面使用一个嵌入式版本的 [DartPad][] 来显示示例和进行练习。
  如果您看到的是空白内容，而不是 DartPad，
  请前往 [DartPad 故障排除页][DartPad troubleshooting page]。

{{site.alert.end}}

### Animate opacity with AnimatedOpacity widget

### 使用 AnimatedOpacity widget 进行透明度动画

  This section contains a list of steps you can use to add an
  implicit animation to the
  [fade-in starter code]. After the steps, you can also run the
  [fade-in complete] code with the the changes already made.
  The steps outline how to use the `AnimatedOpacity`
  widget to add the following animation feature:

  这部分包含在 [淡入初始代码][fade-in starter code] 中添加一个隐式动画一系列步骤。
  完成这些步骤后，您还可以运行 [淡入完成代码][fade-in complete]，
  该代码已经实现了淡入效果。
  这些步骤概述了如何使用 `AnimatedOpacity` widget 来添加以下的动画特性：

  * The owl's description text remains hidden until the user clicks the
    **Show details** button.
    
    用户点击 **Show details** 按钮后，显示猫头鹰的描述文字。
    
  * When the user clicks the **Show details** button,
    the owl's description text fades in.

    当用户点击 **Show details** 按钮时，猫头鹰的描述文字淡入。

#### 1. Pick a widget property to animate

#### 1. 选择要进行动画的 widget 属性

To create a fade-in effect, you can animate the `opacity` property using the
`AnimatedOpacity` widget. Change the `Container` widget to an
`AnimatedOpacity` widget:

想要创建淡入效果，您可以使用 `AnimatedOpacity` widget 对 `opacity` 属性进行动画。
将 `Container` widget 换成 `AnimatedOpacity` widget：

<?code-excerpt "opacity{1,2}/lib/main.dart"?>
```diff
--- opacity1/lib/main.dart
+++ opacity2/lib/main.dart
@@ -21,7 +21,7 @@
             style: TextStyle(color: Colors.blueAccent),
           ),
           onPressed: () => null),
-      Container(
+      AnimatedOpacity(
         child: Column(
           children: <Widget>[
             Text('Type: Owl'),
```

{{site.alert.info}}

  You can reference the line numbers in the example code to help track
  where to make these changes.

  您可以根据示例代码中的行号查看修改的位置。

{{site.alert.end}}

#### 2. Initialize a state variable for the animated property

#### 2. 为动画属性初始化一个状态变量

To hide the text before the user clicks **Show details**, set
the starting value for `opacity` to zero:

将 `opacity` 的初始值设置为 0 ，以便在用户点击 **Show details** 前隐藏文字：

<?code-excerpt "opacity{2,3}/lib/main.dart"?>
```diff
--- opacity2/lib/main.dart
+++ opacity3/lib/main.dart
@@ -11,6 +11,8 @@
 }

 class _FadeInDemoState extends State<FadeInDemo> {
+  double opacity = 0.0;
+
   @override
   Widget build(BuildContext context) {
     return Column(children: <Widget>[
@@ -22,6 +24,8 @@
           ),
           onPressed: () => null),
       AnimatedOpacity(
+        duration: Duration(seconds: 3),
+        opacity: opacity,
         child: Column(
           children: <Widget>[
             Text('Type: Owl'),
```

#### 3. Set up a trigger for the animation, and choose an end value

#### 3. 为动画设置一个触发器，并选择一个结束值

Configure the animation to trigger when the user clicks the **Show details**
button. To do this, change `opacity` state using the `onPressed()` handler for
`TextlButton`. To make the `FadeInDemo` widget become fully visible when
the user clicks the **Show details** button, use the `onPressed()` handler
to set `opacity` to 1:

当用户点击 **Show details** 按钮时，将会触发动画。
为了做到这点，我们使用 `TextButton` 的 `onPressed()` 方法，
在调用时改变 `opacity` 的状态值为 1。

<?code-excerpt "opacity{4,5}/lib/main.dart"?>
```diff
--- opacity4/lib/main.dart
+++ opacity5/lib/main.dart
@@ -18,11 +18,14 @@
     return Column(children: <Widget>[
       Image.network(owl_url),
       TextButton(
-          child: Text(
-            'Show Details',
-            style: TextStyle(color: Colors.blueAccent),
-          ),
-          onPressed: () => null),
+        child: Text(
+          'Show Details',
+          style: TextStyle(color: Colors.blueAccent),
+        ),
+        onPressed: () => setState(() {
+          opacity = 1;
+        }),
+      ),
       AnimatedOpacity(
         duration: Duration(seconds: 2),
         opacity: opacity,
```

{{site.alert.secondary}}

  Notice that you only need to set the start and end values of `opacity`.
  The `AnimatedOpacity` widget manages everything in between.

  注意：您只需要设置 `opacity` 的开始值和结束值。
  `AnimatedOpacity` widget 会自行处理动画过程中的一切。

{{site.alert.end}}

#### 4. Set the duration of the animation

#### 4. 为动画设置时长

In addition to an `opacity` parameter, `AnimatedOpacity` requires a
[duration] to use for its animation. For this example,
you can start with 2 seconds:

除了 `opacity` 参数，`AnimatedOpacity` 还需要 [duration][] 参数确定动画时长。
在下面的示例中，您可以设置淡入时长为 2 秒： 

<?code-excerpt "opacity{3,4}/lib/main.dart"?>
```diff
--- opacity3/lib/main.dart
+++ opacity4/lib/main.dart
@@ -24,7 +24,7 @@
           ),
           onPressed: () => null),
       AnimatedOpacity(
-        duration: Duration(seconds: 3),
+        duration: Duration(seconds: 2),
         opacity: opacity,
         child: Column(
           children: <Widget>[
```

### Fade-in (complete)

### 淡入 (完成代码)

Here's the example with the completed changes you've made&mdash;run this
example and click the **Show details** button to trigger the animation.

下面的示例是修改后的完成版代码&mdash;
运行这个示例，然后点击 **Show details** 按钮就可以触发动画。

{% include implicit-animations/fade-in-complete.md %}

### Putting it all together

### 小结一下

The [Fade-in text effect] example demonstrates the following features
of `AnimatedOpacity`:

[淡入文字效果][Fade-in text effect] 的例子展现了 `AnimatedOpacity` 的特性:

* `AnimatedOpacity` listens for state changes in its `opacity` property.

  `AnimatedOpacity` 会监听其 `opacity` 属性的状态变化。

* Whenever `opacity` changes, `AnimatedOpacity` automatically animates the
  widget's transition to the new value for `opacity`.
  
  当 `opacity` 属性改变时，
  `AnimatedOpacity` 会自动将 `opacity` 变化到新值，
  同时使 widget 进行动画跟随变换。

* `AnimatedOpacity` requires a `duration` parameter to define the time it takes
  to animate the transition between an old `opacity` value and a new one.

  `AnimatedOpacity` 需要一个 `duration` 参数来确定新旧 `opacity` 进行动画变换的时长。

{{site.alert.secondary}}

  Note that Implicit animations can only animate properties of a parent
  `StatefulWidget`, so this example begins with the `FadeInDemo` widget that
  extends `StatefulWidget`.

  注意：隐式动画只能在父节点是 `StatefulWidget` 时以动画变换属性。
  因此，本示例是从继承 `StatefulWidget` 的 `FadeInDemo` widget 开始的。

  Notice also that `AnimatedOpacity` animates a single property: `opacity`.
  Some implicitly animated widgets can animate many properties, as the following
  example illustrates.

  还请注意：`AnimatedOpacity` 只能将一个 `opacity` 属性进行动画。
  一些隐式动画 widget 可以同时动画变换多个属性，如下面的示例所示。

{{site.alert.end}}

## Example: Shape-shifting effect

## 示例：形状变化效果

The following example shows how to use the [AnimatedContainer] widget to
animate multiple properties (`margin`, `borderRadius`, and `color`) with
different types (`double` and `Color`).

下面的示例将展示如何使用 [AnimatedContainer][] widget
让多个不同类型（`double` 和 `Color`）的属性
（`margin`、`borderRadius` 和 `color`）同时进行动画变换。

**The example begins with no animation code**&mdash;it starts with a
[Material App] home screen that contains:

**这个示例开始没有动画效果**&mdash;
它以一个由 [Material App][] 组成的主页面开始，
有以下内容：

* A `Container` with `borderRadius`, `margin`, and `color` properties that are
  different each time you run the example.
  
  一个有 `margin`、`borderRadius`、和 `color` 属性的 `Container`，
  这些属性每次运行时的值都不同。
  
* A **Change** button that does nothing when clicked.

  一个点击时什么都不做的 **Change** 按钮。

### Shape-shifting (starter code)

### 形状变化 (初始代码)

Click the **Run** button to run the example:

点击 **Run** 按钮来运行这个示例：

{% include implicit-animations/shape-shifting-starter-code.md %}

### Animate color, borderRadius, and margin with AnimatedContainer

### 使用 AnimatedContainer 将 color、borderRadius、和 margin 进行动画变换

  This section contains a list of steps you can use to add an
  implicit animation to the [shape-shifting starter code].
  After the steps, you can also run the
  [shape-shifting complete] example with the changes already made.

  这部分包含在 [形状变化初始代码][shape-shifting starter code] 中
  添加一个隐式动画的一系列步骤。
  完成这些步骤后，您还可以运行 [形状变化完成代码][shape-shifting complete]，
  该代码已经实现了淡入效果。

In the [shape-shifting starter code],
each property in the `Container` widget (`color`,
`borderRadius`, and `margin`)
is assigned a value by an associated function (`randomColor()`,
`randomBorderRadius()`, and `randomMargin()` respectively).
By using an `AnimatedContainer` widget,
you can refactor this code to do the following:

在 [形状变化初始代码][shape-shifting starter code] 中
每个 `Container` widget 的属性（`color`、`borderRadius` 和 `margin`）
都由一个相关的函数赋值
（ 分别是 `randomColor()`、`randomBorderRadius()` 和 `randomMargin()`）。 
您可以使用 `AnimatedContainer` widget 重构这段代码，
来完成以下的效果:

* Generate new values for `color`, `borderRadius`,
  and `margin` whenever the user clicks the **Change** button.
  
  每当用户点击 **Change** 按钮时，
  `color`、`borderRadius` 和 `margin` 都会生成一个新值。
  
* Animate the transition to the new values for `color`,
  `borderRadius`, and `margin` whenever they are set.
  
  每当 `color`、`borderRadius` 和 `margin` 被设置时，
  都会进行动画变换到新的值。
  
#### 1. Add an implicit animation

#### 1. 添加一个隐式动画

Change the `Container` widget to an `AnimatedContainer` widget:

将 `Container` widget 换成 `AnimatedContainer` widget：

<?code-excerpt "container{1,2}/lib/main.dart"?>
```diff
--- container1/lib/main.dart
+++ container2/lib/main.dart
@@ -44,7 +44,7 @@
             SizedBox(
               width: 128,
               height: 128,
-              child: Container(
+              child: AnimatedContainer(
                 margin: EdgeInsets.all(margin),
                 decoration: BoxDecoration(
                   color: color,
```
{{site.alert.info}}

  You can reference the line numbers in the example code to help track where to
  make these changes in [shape-shifting starter code]

  您可以根据示例代码中的行号，
  查看 [形状变化初始代码][shape-shifting starter code] 里修改的位置。

{{site.alert.end}}

#### 2. Set starting values for animated properties

#### 2. 为动画属性设置初始值

`AnimatedContainer` automatically animates between old and new values of
its properties when they change. Create a `change()` method that defines the
behavior triggered when the user clicks the **Change** button.
The `change()` method can use `setState()` to set new values
for the `color`, `borderRadius`, and `margin` state variables:

当属性的新旧值发生变化时，`AnimatedContainer` 会自动在新旧值之间产生动画效果。
通过创建一个 `change()` 方法，我们将定义当用户点击 **Change** 按钮时触发变更的行为。
`change()` 方法可以使用 `setState()` 
为 `color`、`borderRadius` 和 `margin` 状态变量设置新值：

<?code-excerpt "container{2,3}/lib/main.dart"?>
```diff
--- container2/lib/main.dart
+++ container3/lib/main.dart
@@ -35,6 +35,14 @@
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

To set the animation to trigger whenever the user presses the **Change** button,
invoke the `change()` method in the `onPressed()` handler:

每当用户点击 **Change** 按钮时触发动画，
调用 `onPressed()` 处理器的 `change()` 方法：

<?code-excerpt "container{3,4}/lib/main.dart"?>
```diff
--- container3/lib/main.dart
+++ container4/lib/main.dart
@@ -62,7 +62,7 @@
             ),
             ElevatedButton(
               child: Text('change'),
-              onPressed: () => null,
+              onPressed: () => change(),
             ),
           ],
         ),
```

#### 4. Set duration

#### 4. 设置时长

Finally, set the `duration` of the animation that powers the transition
between the old and new values:

在最后，设置新旧值之间变换的时长参数 `duration`：

<?code-excerpt "container{4,5}/lib/main.dart"?>
```diff
--- container4/lib/main.dart
+++ container5/lib/main.dart
@@ -6,6 +6,8 @@

 import 'package:flutter/material.dart';

+const _duration = Duration(milliseconds: 400);
+
 double randomBorderRadius() {
   return Random().nextDouble() * 64;
 }
@@ -58,6 +60,7 @@
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

Here’s the example with the completed changes you’ve made&mdash;run the code
and click the **Change** button to trigger the animation. Notice that each time
you click the **Change** button, the shape animates to its new values
for `margin`, `borderRadius`, and `color`.

下面的示例是修改后的完成版代码&mdash;
运行这个示例，然后点击 **Change** 按钮就可以触发动画。
注意：每次您点击 **Change** 按钮，
形状的 `margin`、 `borderRadius`、 和 `color` 都会进行动画变化到新的值。

{% include implicit-animations/shape-shifting-complete.md %}

### Using animation curves

### 使用动画曲线

The preceding examples show how implicit animations allow you to animate
changes in values for specific widget properties, and how the
`duration` parameter allows you to set the amount of time an
animation takes to complete. Implicit animations also allow you to
control changes to __the rate__ of an animation within the `duration`.
The parameter you use to define this change in rate is [curve].

前面的示例展示出，如何让您通过隐式动画对特定的 widget 属性值进行动画变化，
以及如何通过 `duration` 参数设置动画完成所需的时间。
隐式动画还允许您在 `duration` 时长内控制动画的**速率**变化。
用来定义这种速率变化的参数是 [curve][]。

The preceding examples do not specify a `curve`,
so the implicit animations apply a [linear animation curve] by default.
Add a `curve` parameter to the [shape-shifting complete]
and watch how the animation changes when you pass the
[easeInOutBack] constant for `curve`:

前面的例子中没有指定 `curve`，
所以隐式动画默认使用 [线性动画曲线][linear animation curve]。
在 [形状变化完成代码][shape-shifting complete] 中添加一个 `curve` 参数，
然后当您将常量 [easeInOutBack][] 传递给 `curve` 时，
观察动画的变化：

<?code-excerpt "container{5,6}/lib/main.dart"?>
```diff
--- container5/lib/main.dart
+++ container6/lib/main.dart
@@ -61,6 +61,7 @@
                   borderRadius: BorderRadius.circular(borderRadius),
                 ),
                 duration: _duration,
+                curve: Curves.easeInOutBack,
               ),
             ),
             ElevatedButton(
```

Now that you have passed `easeInOutBack` as the value for `curve` to
`AnimatedContainer`, notice that the rates of change for `margin`,
`borderRadius`, and `color` follow the curve defined by the
`easeInOutBack` curve:

现在您已经将 `easeInOutBack` 作为 `curve` 的值传递给了 `AnimatedContainer`，
注意：`margin`、`borderRadius` 和 `color` 的变化速率
遵循 `easeInOutBack` 所定义的曲线:

<div id="animation_1_play_button_"></div>
<video id="animation_1" style="width:464px; height:192px;" loop="">
  <source src="{{site.flutter-assets}}/animation/curve_ease_in_out_back.mp4" type="video/mp4">
</video>

{{site.alert.secondary}}

  The `easeInOutBack` constant is only one of many that you can
  pass for the `curve` parameter. Explore the
  [list of curve constants] to discover more ways
  to use `curve` to modify the look and feel of your animations.

  常量 `easeInOutBack` 只是您可以传递给 `curve` 参数的众多常量之一。
  探索一下 [曲线常量列表][list of curve constants]，
  您就可以发现更多使用 `curve` 来改变动画感观的方式。

{{site.alert.end}}

### Putting it all together

### 小结一下

The [shape-shifting complete] example animates transitions between values for
`margin`, `borderRadius`, and `color` properties.
Note that `AnimatedContainer` animates changes to any of its properties,
including those you didn't use such as `padding`, `transform`,
and even `child` and `alignment`!
The [shape-shifting complete] example builds upon [fade-in complete] by showing
additional capabilities of implicit animations:

[形状变化完成代码][shape-shifting complete] 示例
对 `margin`、`borderRadius` 和 `color` 属性值进行了动画变换。
注意：`AnimatedContainer` 可以对它的任意属性进行动画改变，
包括那些您没有使用的属性，比如 `padding`、`transform`，
甚至是 `child` 和 `alignment`!
这个 [形状变化完成代码][shape-shifting complete] 的示例
建立在 [渐变完成代码][fade-in complete] 的基础上，
展现出隐式动画的额外功能:

* Some implicit animations (for example,
  `AnimatedOpacity`) only animate a single
  property, while others (like `AnimatedContainer`)
  can animate many properties.
  
  一些隐式动画（比如 `AnimatedOpacity`）只能对一个属性值进行动画变换，
  然而有些（比如 `AnimatedContainer`）可以同时变换多个属性。
  
* Implicit animations automatically animate between the old and
  new values of properties when they change using the provided
  `curve` and `duration`.
  
  隐式动画会在新旧属性值变换时，
  自动使用提供的 `curve` 和 `duration` 进行动画变换。
  
* If you do not specify a `curve`,
  implicit animations default to a [linear curve].

  如果您没有指定 `curve`，隐式动画的曲线会默认使用 [线性曲线][linear curve]。

## What's next?

## 下一个是什么？

Congratulations, you've finished the codelab! If you'd like to learn more,
here are some suggestions for where to go next:

恭喜，您已经完成了这个 codelab！
如果您想要了解更多，这里有一些其他文章的推荐：

* Try the [animations tutorial].

  尝试一下 [动画教程][animations tutorial]。

* Learn about [hero animations] and [staggered animations].

  学习 [hero 动画][hero animations] 和 [staggered 动画][staggered animations]。

* Checkout the [animation library].

  查看更多 [动画库][animation library] 的信息。

* Try another [codelab].

  尝试一下其他的 [codelab][]。

<iframe src="https://g.forms.cn/forms/d/e/1FAIpQLSfTcB884FuPXukPEEewU5pgphZyF2Ue0pOWoIHvRp-4D-xYjw/viewform?embedded=true" width="100%" height="1726" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

[AnimatedContainer]: {{site.api}}/flutter/widgets/AnimatedContainer-class.html
[AnimatedOpacity]: {{site.api}}/flutter/widgets/AnimatedOpacity-class.html
[animation library]: {{site.api}}/flutter/animation/animation-library.html
[animations tutorial]: /docs/development/ui/animations/tutorial
[codelab]: /docs/codelabs
[curve]: {{site.api}}/flutter/animation/Curve-class.html
[DartPad troubleshooting page]: {{site.dart-site}}/tools/dartpad/troubleshoot
[DartPad]: {{site.dartpad}}
[duration]: {{site.api}}/flutter/widgets/ImplicitlyAnimatedWidget/duration.html
[easeInOutBack]: {{site.api}}/flutter/animation/Curves/easeInOutBack-constant.html
[fade-in complete]: #fade-in-complete
[fade-in starter code]: #fade-in-starter-code
[Fade-in text effect]: #example-fade-in-text-effect
[hero animations]: /docs/development/ui/animations/hero-animations
[ImplicitlyAnimatedWidget]: {{site.api}}/flutter/widgets/ImplicitlyAnimatedWidget-class.html
[linear animation curve]: {{site.api}}/flutter/animation/Curves/linear-constant.html
[linear curve]: {{site.api}}/flutter/animation/Curves/linear-constant.html
[list of common implicitly animated widgets]: {{site.api}}/flutter/widgets/ImplicitlyAnimatedWidget-class.html
[list of curve constants]: {{site.api}}/flutter/animation/Curves-class.html
[make a Flutter app]: {{site.codelabs}}/codelabs/first-flutter-app-pt1/
[Material App]: {{site.api}}/flutter/material/MaterialApp-class.html
[shape-shifting complete]: #shape-shifting-complete
[Shape-shifting effect]: #example-shape-shifting-effect
[shape-shifting starter code]: #shape-shifting-starter-code
[staggered animations]: /docs/development/ui/animations/staggered-animations
[stateful widgets]: /docs/development/ui/interactive#stateful-and-stateless-widgets
