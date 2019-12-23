---
title: Animate a page route transition
title: 为页面切换加入动画效果
next:
  title: Animate a widget using a physics simulation
  title: 在物理模拟器上构建动画
  path: /docs/cookbook/animation/physics-simulation
js:
  - defer: true
    url: https://dartpad.cn/inject_embed.dart.js
---

A design language, such as Material, defines standard behaviors when
transitioning between routes (or screens). Sometimes, though, a custom
transition between screens can make an app more unique. To help,
[`PageRouteBuilder`][] provides an [`Animation`] object.
This `Animation` can be used with [`Tween`][] and
[`Curve`][] objects to customize the transition animation.
This recipe shows how to transition between
routes by animating the new route into view from
the bottom of the screen.

在不同路由（或界面）之间进行切换的时候，许多设计语言，例如 Material 设计，都定义了一些标准行为。
但有时自定义路由会让 app 看上去更加的独特。为了更好的完成这一点，
[PageRouteBuilder]({{site.api}}/flutter/widgets/PageRouteBuilder-class.html)
提供了一个 [Animation]({{site.api}}/flutter/animation/Animation-class.html) 对象。
这个 `Animation` 能够通过结合 [Tween]({{site.api}}/flutter/animation/Tween-class.html) 以及
[Curve]({{site.api}}/flutter/animation/Curve-class.html) 对象来自定义路由转换动画。
这篇指南将会展示如何在两个路由之间切换时使用从屏幕底部动画出来的路由。

To create a custom page route transition, this recipe uses the following steps:

要创建这个自定义路由动画，这篇指南使用了以下步骤：

1. Set up a PageRouteBuilder

   搭建一个 PageRouteBuilder

2. Create a `Tween`

   创建一个 `Tween`

3. Add an `AnimatedWidget`

   添加一个 `AnimatedWidget`

4. Use a `CurveTween`

   使用 `CurveTween`

5. Combine the two `Tween`s

   组合这两个 `Tween`

## 1. Set up a PageRouteBuilder

## 1. 搭建一个 PageRouteBuilder

To start, use a [`PageRouteBuilder`][] to create a [`Route`][].
`PageRouteBuilder` has two callbacks, one to build the content of the route
(`pageBuilder`), and one to build the route's transition (`transitionsBuilder`).

我们从使用一个 [`PageRouteBuilder`][] 来创建一个 [`Route`][]。
`PageRouteBuilder` 有两个回调，第一个是创建这个路由的内容（`pageBuilder`），
另一个则是创建一个路由的转换器（`transitionsBuilder`）。

{{site.alert.note}}
  
  The `child` parameter in transitionsBuilder is the widget returned from
  pageBuilder. The `pageBuilder` function is only called the first time the
  route is built. The framework can avoid extra work because `child` stays the
  same throughout the transition.
  
  transitionsBuilder 的 `child` 参数是通过 pageBuilder 方法来返回一个 transitionsBuilder widget。
  这个 `pageBuilder` 方法仅会在第一次构建路由的时候被调用。框架能够自动避免做额外的工作，
  因为整个过渡期间 `child` 保存了同一个实例。
  
{{site.alert.end}}

The following example creates two routes: a home route with a "Go!" button, and
a second route titled "Page 2".

下面的样例将会创建两个路由：一个主页路由，包含了 "Go!" 按钮，还有第二个路由，包含了一个显示 "Page 2 的标题。

```dart
import 'package:flutter/material.dart';

main() {
  runApp(MaterialApp(
    home: Page1(),
  ));
}

class Page1 extends StatelessWidget {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: RaisedButton(
          child: Text('Go!'),
          onPressed: () {
            Navigator.of(context).push(_createRoute());
          },
        ),
      ),
    );
  }
}

Route _createRoute() {
  return PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => Page2(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return child;
    },
  );
}

class Page2 extends StatelessWidget {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Text('Page 2'),
      ),
    );
  }
}
```

## 2. Create a Tween

## 2. 创建一个 Tween

To make the new page animate in from the bottom, it should animate from
`Offset(0,1)` to `Offset(0, 0)` (usually defined using the `Offset.zero`
constructor). In this case, the Offset is a 2D vector for the
['FractionalTranslation'][] widget.
Setting the `dy` argument to 1 represents a vertical translation one
full height of the page.

为了使新页面从底部动画出来，它应该从 `Offset(0,1)` 到 `Offset(0, 0)` 进行动画。（通常我们会使用 `Offset.zero` 构造器。）
在这个情况下，对于 [FractionalTranslation]({{site.api}}/flutter/widgets/FractionalTranslation-class.html)
widget 来说偏移量是一个 2D 矢量值。将 `dy` 参数设为 1，这代表在竖直方向上切换整个页面的高度。

The `transitionsBuilder` callback has an `animation` parameter. It's an
`Animation<double>` that produces values between 0 and 1. Convert the
Animation<double> into an Animation<Offset> using a Tween:
  
`transitionsBuilder` 的回调有一个 `animation` 参数。
它其实是一个 `Animation<double>`，提供 0 到 1 的值。
使用 Tween 来将 Animation<double> 转为 Animation<Offset>。

```dart
transitionsBuilder: (context, animation, secondaryAnimation, child) {
  var begin = Offset(0.0, 1.0);
  var end = Offset.zero;
  var tween = Tween(begin: begin, end: end);
  var offsetAnimation = animation.drive(tween);
  return child;
},
```

## 3. Use an AnimatedWidget

## 3. 使用 AnimatedWidget

Flutter has a set of widgets extending [`AnimatedWidget`][]
that rebuild themselves when the value of the animation changes. For instance,
SlideTransition takes an `Animation<Offset>` and translates its child (using a
FractionalTranslation widget) whenever the value of the animation changes.

Flutter 有一堆继承自 [`AnimatedWidget`][] 的 widget，
它们能够在动画的值发生改变时自动重建自己。
举个例子，SlideTransition 拿到一个 `Animation<Offset>`
并在动画改变时使用 FractionalTranslation widget 转换其子级。

AnimatedWidget Return a [`SlideTransition`][]
with the `Animation<Offset>` and the child widget:

AnimatedWidget 返回了一个 带有 `Animation<Offset>` 
的 [`SlideTransition`][]，以及 child widget：

```dart
transitionsBuilder: (context, animation, secondaryAnimation, child) {
  var begin = Offset(0.0, 1.0);
  var end = Offset.zero;
  var tween = Tween(begin: begin, end: end);
  var offsetAnimation = animation.drive(tween);

  return SlideTransition(
    position: offsetAnimation,
    child: child,
  );
},
```

## 4. Use a CurveTween

## 4. 使用 CurveTween

Flutter provides a selection of easing curves that
adjust the rate of the animation over time.
The [`Curves`][] class
provides a predefined set of commonly used curves.
For example, `Curves.easeOut`
makes the animation start quickly and end slowly.

Flutter 提供了一系列缓和曲线，可以调整一段时间内的动画速率。
[`Curves`][] 类提供了一个提前定义的用法相似的 curves。
例如，`Curves.easeOut` 将会让动画开始很快结束很慢。

To use a Curve, create a new [`CurveTween`][]
and pass it a Curve:

要使用 Curve，创建一个 [`CurveTween`][] 并传一个 Curve：

```dart
var curve = Curves.ease;
var curveTween = CurveTween(curve: curve);
```

This new Tween still produces values from 0 to 1. In the next step, it will be
combined the `Tween<Offset>` from step 2.

新的 Tween 依然提供 0 到 1 之间的值。在下一步中，它将会结合第二步中提到的 `Tween<Offset>`。

## 5. Combine the two Tweens

## 5. 结合两个 Tween

To combine the tweens,
use [`chain()`][]:

为了结合两个 tween，请使用 [`chain()`][]:

```dart
var begin = Offset(0.0, 1.0);
var end = Offset.zero;
var curve = Curves.ease;

var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
```

Then use this tween by passing it to `animation.drive()`. This creates a new
`Animation<Offset>` that can be given to the `SlideTransition` widget:

它们通过把这个 tween 传递给 `animation.drive()` 来创建一个新的 `Animation<Offset>`，
然后你就能把它传给 `SlideTransition` widget：

```dart
return SlideTransition(
  position: animation.drive(tween),
  child: child,
);
```

This new Tween (or Animatable) produces `Offset` values by first evaluating the
`CurveTween`, then evaluating the `Tween<Offset>.` When the animation runs, the
values are computed in this order:

这个新的 Tween（或者是能够动画的东西）通过评估 `CurveTween` 来提供 `Offset`，
然后评估 `Tween<Offset>`。当动画运行时，值都被这条命令计算出：

1. The animation (provided to the transitionsBuilder callback) produces values
   from 0 to 1.
   
   这个动画提供了从 0 到 1 的值。（通过 transitionsBuilder 的值提供）
   
2. The CurveTween maps those values to new values between 0 and 1 based on its
   curve.
   
   这个 CurveTween 根据其将这些值映射到介于 0 和 1 之间的新曲线值。
   
3. The `Tween<Offset>` maps the `double` values to `Offset` values.

   `Tween<Offset>` 将 `double` 值映射为 `Offset` 值。

Another way to create an `Animation<Offset>` with an easing curve is to use a
`CurvedAnimation`:

使用缓动曲线创建 `Animation<Offset>` 的另一种方法是使用 `CurvedAnimation`：

```dart
transitionsBuilder: (context, animation, secondaryAnimation, child) {
  var begin = Offset(0.0, 1.0);
  var end = Offset.zero;
  var curve = Curves.ease;

  var tween = Tween(begin: begin, end: end);
  var curvedAnimation = CurvedAnimation(
   parent: animation,
   curve: curve,
  );

  return SlideTransition(
   position: tween.animate(curvedAnimation),
   child: child,
  );
}
```

## Interactive example

## 交互式样例

```run-dartpad:theme-light:mode-flutter:run-true:width-100%:height-600px:split-60
import 'package:flutter/material.dart';

main() {
  runApp(MaterialApp(
    home: Page1(),
  ));
}

class Page1 extends StatelessWidget {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: RaisedButton(
          child: Text('Go!'),
          onPressed: () {
            Navigator.of(context).push(_createRoute());
          },
        ),
      ),
    );
  }
}

Route _createRoute() {
  return PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => Page2(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      var begin = Offset(0.0, 1.0);
      var end = Offset.zero;
      var curve = Curves.ease;

      var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));

      return SlideTransition(
        position: animation.drive(tween),
        child: child,
      );
    },
  );
}

class Page2 extends StatelessWidget {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Text('Page 2'),
      ),
    );
  }
}
```
<noscript>
  <img src="/images/cookbook/page-route-animation.gif" alt="Demo showing a custom page route transition animating up from the bottom of the screen（样例展示了一个自底向上的路由转换动画）" class="site-mobile-screenshot" />
</noscript>


[`AnimatedWidget`]: {{site.api}}/flutter/widgets/AnimatedWidget-class.html
[`Animation`]: {{site.api}}/flutter/animation/Animation-class.html
[`chain()`]: {{site.api}}/flutter/animation/Animatable/chain.html
[`Curve`]: {{site.api}}/flutter/animation/Curve-class.html
[`Curves`]: {{site.api}}/flutter/animation/Curves-class.html
[`CurveTween`]: {{site.api}}/flutter/animation/CurveTween-class.html
['FractionalTranslation']: {{site.api}}/flutter/widgets/FractionalTranslation-class.html
[`PageRouteBuilder`]: {{site.api}}/flutter/widgets/PageRouteBuilder-class.html
[`Route`]: {{site.api}}/flutter/widgets/Route-class.html
[`SlideTransition`]: {{site.api}}/flutter/widgets/SlideTransition-class.html
[`Tween`]: {{site.api}}/flutter/animation/Tween-class.html
