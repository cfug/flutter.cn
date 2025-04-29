---
# title: Navigate to a new screen and back
title: 导航到一个新页面和返回
# description: How to navigate between routes.
description: 如何在路由之间进行导航。
tags: cookbook, 实用教程, 路由
keywords: 路由之间的切换
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/navigation/navigation_basics"?>

Most apps contain several screens for displaying different
types of information. For example, an app might have a
screen that displays products. When the user taps the image
of a product, a new screen displays details about the
product.

我们通常会用“屏”来表示应用的不同页面（界面）。
比如，某个应用有一“屏”展示商品列表，当用户点击某个商品的图片，
会跳到新的一“屏”展示商品的详细信息。

:::note 术语
<!-- Terminology -->

In Flutter, _screens_ and _pages_ are called _routes_.
The remainder of this recipe refers to routes.
  
在 Flutter 中，**屏 (screen)** 和 **页面 (page)** 都叫做 **路由 (route)**，
在下文中统称为“路由 (route)”。

:::

In Android, a route is equivalent to an `Activity`.
In iOS, a route is equivalent to a `ViewController`.
In Flutter, a route is just a widget.

在 Android 开发中，`Activity` 相当于“路由”，
在 iOS 开发中，`ViewController` 相当于“路由”。
在 Flutter 中，“路由”也是一个 widget。

This recipe uses the [`Navigator`][] to navigate to a new route.

怎么样从一个“路由”跳转到新的“路由”呢？[`Navigator`][] 类。

这个教程里我们使用 [`Navigator`][] 来跳转到一个新的“路由”：

## Directions

## 步骤

The next few sections show how to navigate between two routes,
using these steps:

下面来展示如何在两个路由间跳转，总共分三步：

  1. Create two routes.
  
     创建两个路由
     
  2. Navigate to the second route using `Navigator.push()`.
     
     用 `Navigator.push()` 跳转到第二个路由
     
  3. Return to the first route using `Navigator.pop()`.
  
     用 `Navigator.pop()` 回退到第一个路由

## 1. Create two routes

## 1. 创建两个路由

First, create two routes to work with. Since this is a basic example,
each route contains only a single button. Tapping the button on the
first route navigates to the second route. Tapping the button on the
second route returns to the first route.

首先，我们来创建两个路由。这是个最简单的例子，每个路由只包含一个按钮。
点击第一个路由上的按钮会跳转到第二个路由，
点击第二个路由上的按钮，会回退到第一个路由。

First, set up the visual structure:

首先来编写界面布局代码：

{% tabs "os-android" %}

{% tab "Android" %}

<?code-excerpt "lib/main_step1.dart (first-second-routes)"?>
```dart
class FirstRoute extends StatelessWidget {
  const FirstRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('First Route')),
      body: Center(
        child: ElevatedButton(
          child: const Text('Open route'),
          onPressed: () {
            // Navigate to second route when tapped.
          },
        ),
      ),
    );
  }
}

class SecondRoute extends StatelessWidget {
  const SecondRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Second Route')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Navigate back to first route when tapped.
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
```

{% endtab %}

{% tab "iOS" %}

<?code-excerpt "lib/main_step1_cupertino.dart (first-second-routes)"?>
```dart
class FirstRoute extends StatelessWidget {
  const FirstRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(middle: Text('First Route')),
      child: Center(
        child: CupertinoButton(
          child: const Text('Open route'),
          onPressed: () {
            // Navigate to second route when tapped.
          },
        ),
      ),
    );
  }
}

class SecondRoute extends StatelessWidget {
  const SecondRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(middle: Text('Second Route')),
      child: Center(
        child: CupertinoButton(
          onPressed: () {
            // Navigate back to first route when tapped.
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
```

{% endtab %}

{% endtabs %}

## 2. Navigate to the second route using Navigator.push()

## 2. 用 Navigator.push() 跳转到第二个路由

To switch to a new route, use the [`Navigator.push()`][]
method. The `push()` method adds a `Route` to the stack of routes managed by
the `Navigator`. Where does the `Route` come from?
You can create your own, or use  a platform-specific route
such as [`MaterialPageRoute`][] or [`CupertinoPageRoute`][].
A platform-specific route is useful because it transitions
to the new route using a platform-specific animation.

使用 [`Navigator.push()`] 方法跳转到新的路由，
`push()` 方法会添加一个 `Route` 对象到导航器的堆栈上。
那么这个 `Route` 对象是从哪里来的呢？
你可以自己实现一个路由，或者使用特定平台的路由，
例如，[`MaterialPageRoute`][] 或者 [`CupertinoPageRoute`][]。
特定平台的路由非常有用，因为框架已经为我们实现了和特定平台原生类似的切换动画。 

In the `build()` method of the `FirstRoute` widget,
update the `onPressed()` callback:

在 `FirstRoute` widget 的 `build()` 方法中，
我们来修改  `onPressed()` 回调函数：

{% tabs "os-android" %}

{% tab "Android" %}

<?code-excerpt "lib/main_step2.dart (first-route-on-pressed)" replace="/^\},$/}/g"?>
```dart
// Within the `FirstRoute` widget:
onPressed: () {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => const SecondRoute()),
  );
}
```

{% endtab %}

{% tab "iOS" %}

<?code-excerpt "lib/main_step2_cupertino.dart (first-route-on-pressed)" replace="/^\},$/}/g"?>
```dart
// Within the `FirstRoute` widget:
onPressed: () {
  Navigator.push(
    context,
    CupertinoPageRoute(builder: (context) => const SecondRoute()),
  );
}
```

{% endtab %}

{% endtabs %}

## 3. Return to the first route using Navigator.pop()

## 3. 用 Navigator.pop() 回退到第一个路由

How do you close the second route and return to the first?
By using the [`Navigator.pop()`][] method.
The `pop()` method removes the current `Route` from the stack of
routes managed by the `Navigator`.

怎么关闭第二个路由回退到第一个呢? 
使用 [`Navigator.pop()`][] 方法，
`pop()` 方法会从导航器堆栈上移除 `Route` 对象。

To implement a return to the original route, update the `onPressed()`
callback in the `SecondRoute` widget:

实现返回第一个页面，更新 `SecondRoute` widget
的 `onPressed()` 方法回调。

<?code-excerpt "lib/main_step2.dart (second-route-on-pressed)" replace="/^\},$/}/g"?>
```dart
// Within the SecondRoute widget
onPressed: () {
  Navigator.pop(context);
}
```

## Interactive example

## 交互式样例

{% tabs "os-android" %}

{% tab "Android" %}

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter navigation hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(const MaterialApp(title: 'Navigation Basics', home: FirstRoute()));
}

class FirstRoute extends StatelessWidget {
  const FirstRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('First Route')),
      body: Center(
        child: ElevatedButton(
          child: const Text('Open route'),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const SecondRoute()),
            );
          },
        ),
      ),
    );
  }
}

class SecondRoute extends StatelessWidget {
  const SecondRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Second Route')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/navigation-basics.webp" alt="Navigation Basics Demo" class="site-mobile-screenshot" />
</noscript>

{% endtab %}

{% tab "iOS" %}

<?code-excerpt "lib/main_cupertino.dart"?>
```dartpad title="Flutter Cupertino theme hands-on example in DartPad" run="true"
import 'package:flutter/cupertino.dart';

void main() {
  runApp(const CupertinoApp(title: 'Navigation Basics', home: FirstRoute()));
}

class FirstRoute extends StatelessWidget {
  const FirstRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(middle: Text('First Route')),
      child: Center(
        child: CupertinoButton(
          child: const Text('Open route'),
          onPressed: () {
            Navigator.push(
              context,
              CupertinoPageRoute(builder: (context) => const SecondRoute()),
            );
          },
        ),
      ),
    );
  }
}

class SecondRoute extends StatelessWidget {
  const SecondRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(middle: Text('Second Route')),
      child: Center(
        child: CupertinoButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/navigation-basics-cupertino.webp" alt="Navigation Basics Cupertino Demo" class="site-mobile-screenshot" />
</noscript>

{% endtab %}

{% endtabs %}

## Additional navigation methods

The recipe in this topic shows you one way to navigate to a new screen and
back to the previous scene, using the [`push`] and [`pop`] methods in the
[`Navigator`] class, but there are several other `Navigator` static methods that
you can use. Here are a few of them:

*   [`pushAndRemoveUntil`]: Adds a navigation route to the stack and then removes
    the most recent routes from the stack until a condition is met.
*   [`pushReplacement`]: Replaces the current route on the top of the
    stack with a new one.
*   [`replace`]: Replace a route on the stack with another route.
*   [`replaceRouteBelow`]: Replace the route below a specific route on the stack.
*   [`popUntil`]: Removes the most recent routes that were added to the stack of
    navigation routes until a condition is met.
*   [`removeRoute`]: Remove a specific route from the stack.
*   [`removeRouteBelow`]: Remove the route below a specific route on the
    stack.
*   [`restorablePush`]: Restore a route that was removed from the stack.

[Cupertino]: {{site.docs}}/ui/widgets/cupertino
[Material Components]: {{site.docs}}/ui/widgets/material
[`CupertinoApp`]: {{site.api}}/flutter/cupertino/CupertinoApp-class.html
[`CupertinoButton`]: {{site.api}}/flutter/cupertino/CupertinoButton-class.html
[`CupertinoPageRoute`]: {{site.api}}/flutter/cupertino/CupertinoPageRoute-class.html
[`CupertinoPageScaffold`]: {{site.api}}/flutter/cupertino/CupertinoPageScaffold-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`MaterialApp`]: {{site.api}}/flutter/material/MaterialApp-class.html
[`MaterialPageRoute`]: {{site.api}}/flutter/material/MaterialPageRoute-class.html
[`Navigator.pop()`]: {{site.api}}/flutter/widgets/Navigator/pop.html
[`Navigator.push()`]: {{site.api}}/flutter/widgets/Navigator/push.html
[`Navigator`]: {{site.api}}/flutter/widgets/Navigator-class.html
[`pop`]: {{site.api}}/flutter/widgets/Navigator/pop.html
[`popUntil`]: {{site.api}}/flutter/widgets/Navigator/popUntil.html
[`push`]: {{site.api}}/flutter/widgets/Navigator/push.html
[`pushAndRemoveUntil`]: {{site.api}}/flutter/widgets/Navigator/pushAndRemoveUntil.html
[`pushReplacement`]: {{site.api}}/flutter/widgets/Navigator/pushReplacement.html 
[`removeRoute`]: {{site.api}}/flutter/widgets/Navigator/removeRoute.html
[`removeRouteBelow`]: {{site.api}}/flutter/widgets/Navigator/removeRouteBelow.html
[`replace`]: {{site.api}}/flutter/widgets/Navigator/replace.html
[`replaceRouteBelow`]: {{site.api}}/flutter/widgets/Navigator/replaceRouteBelow.html
[`restorablePush`]: {{site.api}}/flutter/widgets/Navigator/restorablePush.html
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
