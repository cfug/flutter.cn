---
title: Navigate to a new screen and back
title: 导航到一个新页面和返回
description: How to navigate between routes
prev:
  title: Animate a widget across screens
  title: 跨页面切换的动效 Widget (Hero animations)
  path: /docs/cookbook/navigation/hero-animations
next:
  title: Navigate with named routes
  title: 导航到对应名称的 routes 里
  path: /docs/cookbook/navigation/named-routes
---

Most apps contain several screens for displaying different types of
information.
For example, an app might have a screen that displays products.
When the user taps the image of a product, a new screen displays
details about the product.

我们通常会用“屏”来表示应用的不同页面（界面）。
比如，某个应用有一“屏”展示商品列表，当用户点击某个商品的图片，会跳到新的一“屏”展示商品的详细信息。

{{site.alert.secondary}}

  **Terminology**: In Flutter, _screens_ and _pages_ are called _routes_.
  The remainder of this recipe refers to routes.
  
  **术语**: 在 Flutter 中，**屏 (screen)** 和 **页面 (page)** 都叫做 **路由 (route)**，
  在下文中统称为“路由 (route)”。
  
{{site.alert.end}}

In Android, a route is equivalent to an Activity.
In iOS, a route is equivalent to a ViewController.
In Flutter, a route is just a widget.

在 Android 开发中，Activity 相当于“路由”，在 iOS 开发中，ViewController 相当于“路由”。
在 Flutter 中，“路由”也是一个 Widget。

Navigate to a new route using the
[`Navigator`]({{site.api}}/flutter/widgets/Navigator-class.html).
This recipe uses the following steps:

怎么样从一个“路由”跳转到新的“路由“呢？你需要使用 [`Navigator`]({{site.api}}/flutter/widgets/Navigator-class.html) 类。

## Directions

## 步骤

The next few sections show how to navigate between two routes,
using these steps:

下面来展示如何在两个路由间跳转，总共分三步：

  1. Create two routes.
  
     创建两个路由
     
  2. Navigate to the second route using Navigator.push().
     
     用 Navigator.push() 跳转到第二个路由
     
  3. Return to the first route using Navigator.pop().
  
     用 Navigator.pop() 回退到第一个路由

## 1. Create two routes

## 1. 创建两个路由

First, create two routes to work with. Since this is a basic example,
each route contains only a single button. Tapping the button on the
first route navigates to the second route. Tapping the button on the
second route returns to the first route.

首先，我们来创建两个路由。这是个最简单的例子，每个路由只包含一个按钮。
点击第一个路由上的按钮会跳转到第二个路由，点击第二个路由上的按钮，会回退到第一个路由。

First, set up the visual structure:

首先来编写界面布局代码：

```dart
class FirstRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('First Route'),
      ),
      body: Center(
        child: RaisedButton(
          child: Text('Open route'),
          onPressed: () {
            // Navigate to second route when tapped.
          },
        ),
      ),
    );
  }
}

class SecondRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Second Route"),
      ),
      body: Center(
        child: RaisedButton(
          onPressed: () {
            // Navigate back to first route when tapped.
          },
          child: Text('Go back!'),
        ),
      ),
    );
  }
}
```

## 2. Navigate to the second route using Navigator.push()

## 2. 用 Navigator.push() 跳转到第二个路由

To switch to a new route, use the
[`Navigator.push()`]({{site.api}}/flutter/widgets/Navigator/push.html)
method. The `push()` method adds a `Route` to the stack of routes managed by
the Navigator. Where does the `Route` come from?
You can create your own, or use a
[`MaterialPageRoute`]({{site.api}}/flutter/material/MaterialPageRoute-class.html),
which is useful because it transitions to the
new route using a platform-specific animation.

使用 [`Navigator.push()`]({{site.api}}/flutter/widgets/Navigator/push.html)方法跳转到新的路由。
`push()` 方法会添加一个 `Route` 对象到导航器的堆栈上。 那么这个 `Route` 对象是从哪里来的呢？
你可以自己实现一个，或者直接使用 [`MaterialPageRoute`]({{site.api}}/flutter/material/MaterialPageRoute-class.html)类。
使用 `MaterialPageRoute` 是非常方便的，框架已经为我们实现了和平台原生类似的切换动画。 

In the `build()` method of the `FirstRoute` widget,
update the `onPressed()` callback:

在 `FirstRoute` widget 的 `build()` 方法中，我们来修改  `onPressed()` 回调函数：

<!-- skip -->
```dart
// 位于 FirstRoute widget (Within the `FirstRoute` widget)
onPressed: () {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => SecondRoute()),
  );
}
```

## 3. Return to the first route using Navigator.pop()

## 3. 用 Navigator.pop() 回退到第一个路由

How do you close the second route and return to the first? By using the
[`Navigator.pop()`]({{site.api}}/flutter/widgets/Navigator/pop.html)
method. The `pop()` method removes the current `Route` from the stack of
routes managed by the navigator.

怎么关闭第二个路由回退到第一个呢? 使用
[`Navigator.pop()`]({{site.api}}/flutter/widgets/Navigator/pop.html)
方法，`pop()` 方法会从导航器堆栈上移除 `Route` 对象。

To implement a return to the original route, update the `onPressed()`
callback in the `SecondRoute` widget:

我们来修改 `SecondRoute` widget 的 `onPressed()` 回调函数，实现返回第一个路由的功能：

<!-- skip -->
```dart
// 位于 SecondRoute widget (Within the SecondRoute widget)
onPressed: () {
  Navigator.pop(context);
}
```

## Complete example

## 完整样例

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Navigation Basics',
    home: FirstRoute(),
  ));
}

class FirstRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('First Route'),
      ),
      body: Center(
        child: RaisedButton(
          child: Text('Open route'),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => SecondRoute()),
            );
          },
        ),
      ),
    );
  }
}

class SecondRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Second Route"),
      ),
      body: Center(
        child: RaisedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text('Go back!'),
        ),
      ),
    );
  }
}
```

{% comment %}
We need a new GIF that shows "Route" instead of "Screen".
{% endcomment %}

![Navigation Basics Demo](/images/cookbook/navigation-basics.gif){:.site-mobile-screenshot}