---
# title: Navigate with named routes
title: 导航到对应名称的 routes 里
# description: How to implement named routes for navigating between screens.
description: 如何实现用于导航的命名路由。
tags: cookbook, 实用教程, 路由
keywords: 页面跳转
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/navigation/named_routes"?>

:::note

Named routes are no longer recommended for most
applications. For more information, see
[Limitations][] in the [navigation overview][] page.

针对大多数的应用情况，我们不再推荐使用命名的路由 (Named routes)，
了解更多信息，请参考 [导航概览][navigation overview] 中的 [受限情况][Limitations] 部分。

:::

[Limitations]: /ui/navigation#limitations
[navigation overview]: /ui/navigation

In the [Navigate to a new screen and back][] recipe,
you learned how to navigate to a new screen by creating a new route and
pushing it to the [`Navigator`][].

在 [导航到一个新页面和返回][Navigate to a new screen and back] 一节中，
我们通过创建一个新的路由并将它推到 [`Navigator`][] 
类中学习到了如何导航到新的一个界面 (screen)。

However, if you need to navigate to the same screen in many parts
of your app, this approach can result in code duplication.
The solution is to define a _named route_,
and use the named route for navigation.

然而，如果我们需要在应用的很多地方导航到同一界面，
这样做就会导致代码重复。
在这种情况下，定义 **命名路由 (named route)** 
并使用它进行导航就会非常方便。

To work with named routes,
use the [`Navigator.pushNamed()`][] function.
This example replicates the functionality from the original recipe,
demonstrating how to use named routes using the following steps:

要使用命名路由，我们可以使用 [`Navigator.pushNamed()`][] 方法。
下面的例子展示如何使用“命名路由”来实现前一节中的功能。

## Directions

## 步骤

  1. Create two screens.
  
     创建两个界面

  2. Define the routes.

     定义路由

  3. Navigate to the second screen using `Navigator.pushNamed()`.

     使用 `Navigator.pushNamed()` 跳转到第二个界面

  4. Return to the first screen using `Navigator.pop()`.

     使用 `Navigator.pop()` 返回到第一个界面

## 1. Create two screens

## 1. 创建两个界面

First, create two screens to work with. The first screen contains a
button that navigates to the second screen. The second screen contains a
button that navigates back to the first.

首先，我们需要两个界面来开始。
第一个界面将包含一个跳转到第二个界面的按钮，
第二个界面将包含一个跳转回第一个界面的按钮。

<?code-excerpt "lib/main_original.dart"?>
```dart
import 'package:flutter/material.dart';

class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('First Screen'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Navigate to the second screen when tapped.
          },
          child: const Text('Launch screen'),
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  const SecondScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Second Screen'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Navigate back to first screen when tapped.
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
```

## 2. Define the routes

## 2. 定义路由

Next, define the routes by providing additional properties
to the [`MaterialApp`][] constructor: the `initialRoute`
and the `routes` themselves.

接下来，我们需要通过为 [`MaterialApp`][] 的构造函数额外的属性：
`initialRoute` 和 `routes` 来定义我们的路由。

The `initialRoute` property defines which route the app should start with.
The `routes` property defines the available named routes and the widgets
to build when navigating to those routes.

`initialRoute` 属性定义了应用应该从哪个路由启动。
`routes` 属性定义了所有可用的命名路由，
以及当我们跳转到这些路由时应该构建的 widgets。

{% comment %}
RegEx removes the trailing comma
{% endcomment %}
<?code-excerpt "lib/main.dart (MaterialApp)" replace="/^\),$/)/g"?>
```dart
MaterialApp(
  title: 'Named Routes Demo',
  // Start the app with the "/" named route. In this case, the app starts
  // on the FirstScreen widget.
  initialRoute: '/',
  routes: {
    // When navigating to the "/" route, build the FirstScreen widget.
    '/': (context) => const FirstScreen(),
    // When navigating to the "/second" route, build the SecondScreen widget.
    '/second': (context) => const SecondScreen(),
  },
)
```

:::warning

When using `initialRoute`, **don't** define a `home` property.

当使用 `initialRoute` 时，需要确保你没有同时定义 `home` 属性。

:::

## 3. Navigate to the second screen

## 3. 跳转到第二个界面

With the widgets and routes in place, trigger navigation by using the
[`Navigator.pushNamed()`][] method.
This tells Flutter to build the widget defined in the
`routes` table and launch the screen.

准备好了 Widgets 和路由，我们就可以开始进行页面跳转。
在这里，我们将使用 [`Navigator.pushNamed()`][] 函数。
它会告诉 Flutter 去构建我们在 `routes` 表中定义的 widget 并启动该界面。

In the `build()` method of the `FirstScreen` widget, update the `onPressed()`
callback:

在 `FirstScreen` widget 的 `build()` 方法中，
我们将更新 `onPressed()` 回调：

{% comment %}
RegEx removes the trailing comma
{% endcomment %}
<?code-excerpt "lib/main.dart (PushNamed)" replace="/,$//g"?>
```dart
// Within the `FirstScreen` widget
onPressed: () {
  // Navigate to the second screen using a named route.
  Navigator.pushNamed(context, '/second');
}
```

## 4. Return to the first screen

## 4. 返回到第一个界面

To navigate back to the first screen, use the
[`Navigator.pop()`][] function.

为了能够跳转回第一个页面，
我们可以使用 [`Navigator.pop()`][] 方法。

{% comment %}
RegEx removes the trailing comma
{% endcomment %}
<?code-excerpt "lib/main.dart (Pop)" replace="/,$//g"?>
```dart
// Within the SecondScreen widget
onPressed: () {
  // Navigate back to the first screen by popping the current route
  // off the stack.
  Navigator.pop(context);
}
```

## Interactive example

## 交互式样例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter Named Routes hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      title: 'Named Routes Demo',
      // Start the app with the "/" named route. In this case, the app starts
      // on the FirstScreen widget.
      initialRoute: '/',
      routes: {
        // When navigating to the "/" route, build the FirstScreen widget.
        '/': (context) => const FirstScreen(),
        // When navigating to the "/second" route, build the SecondScreen widget.
        '/second': (context) => const SecondScreen(),
      },
    ),
  );
}

class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('First Screen'),
      ),
      body: Center(
        child: ElevatedButton(
          // Within the `FirstScreen` widget
          onPressed: () {
            // Navigate to the second screen using a named route.
            Navigator.pushNamed(context, '/second');
          },
          child: const Text('Launch screen'),
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  const SecondScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Second Screen'),
      ),
      body: Center(
        child: ElevatedButton(
          // Within the SecondScreen widget
          onPressed: () {
            // Navigate back to the first screen by popping the current route
            // off the stack.
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
  <img src="/assets/images/docs/cookbook/navigation-basics.gif" alt="Navigation Basics Demo" class="site-mobile-screenshot" />
</noscript>


[`MaterialApp`]: {{site.api}}flutter/material/MaterialApp-class.html
[Navigate to a new screen and back]: /cookbook/navigation/navigation-basics
[`Navigator`]: {{site.api}}flutter/widgets/Navigator-class.html
[`Navigator.pop()`]: {{site.api}}flutter/widgets/Navigator/pop.html
[`Navigator.pushNamed()`]: {{site.api}}flutter/widgets/Navigator/pushNamed.html
