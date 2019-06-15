---
title: Navigate with named routes
title: 导航到对应名称的 routes 里
prev:
  title: Navigate to a new screen and back
  title: 导航到一个新页面和返回
  path: /docs/cookbook/navigation/navigation-basics
next:
  title: Pass arguments to a named route
  title: 给特定的 route 传参
  path: /docs/cookbook/navigation/navigate-with-arguments
---

In the [Navigate to a new screen and
back](/docs/cookbook/navigation/navigation-basics) recipe,
you learned how to navigate to a new screen by creating a new route and
pushing it to the
[`Navigator`]({{site.api}}/flutter/widgets/Navigator-class.html).

在[导航到一个新页面和返回](/docs/cookbook/navigation/navigation-basics/)一节中，
我们通过创建一个新的路由并将它推到 [`Navigator`]({{site.api}}/flutter/widgets/Navigator-class.html) 类中学习到了如何导航到新的一个界面 (screen)。

However, if you need to navigate to the same screen in many parts
of your app, this approach can result in code duplication.
The solution is to define a _named route_,
and use the named route for navigation.

然而，如果我们需要在应用的很多地方导航到同一界面，这样做就会导致代码重复。在这种情况下，定义**命名路由(named route)**并使用它进行导航就会非常方便。

To work with named routes, use the
[`Navigator.pushNamed()`]({{site.api}}/flutter/widgets/Navigator/pushNamed.html)
function. This example replicates the functionality from the original
recipe, demonstrating how to use named routes using the following steps: 

要使用命名路由，我们可以使用 [`Navigator.pushNamed()`]({{site.api}}/flutter/widgets/Navigator/pushNamed.html) 方法。下面的例子展示如何使用“命名路由”来实现前一节中的功能。

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

首先，我们需要两个界面来开始。第一个界面将包含一个跳转到第二个界面的按钮。第二个界面将包含一个跳转回第一个界面的按钮。


```dart
class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('First Screen'),
      ),
      body: Center(
        child: RaisedButton(
          child: Text('Launch screen'),
          onPressed: () {
            // Navigate to the second screen when tapped.            
            // 点击时跳转到第二个界面！（Navigate to second screen when tapped!）
          },
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Second Screen"),
      ),
      body: Center(
        child: RaisedButton(
          onPressed: () {
            // Navigate back to first screen when tapped.            
            // 点击时跳转回第一个界面！（Navigate back to first screen when tapped!）
          },
          child: Text('Go back!'),
        ),
      ),
    );
  }
}
```

## 2. Define the routes

## 2. 定义路由

Next, define the routes by providing additional properties to the
[`MaterialApp`]({{site.api}}/flutter/material/MaterialApp-class.html)
constructor: the `initialRoute` and the `routes` themselves.

接下来，我们需要通过为 [`MaterialApp`]({{site.api}}/flutter/material/MaterialApp-class.html) 的构造函数额外的属性：`initialRoute` 和 `routes` 自身，来定义我们的路由。

The `initialRoute` property defines which route the app should start with.
The `routes` property defines the available named routes and the widgets
to build when navigating to those routes.

`initialRoute` 属性定义了应用应该从哪个路由启动。`routes` 属性定义了所有可用的命名路由，以及当我们跳转到这些路由时应该构建的 Widgets。



<!-- skip -->
```dart
MaterialApp(
  // Start the app with the "/" named route. In this case, the app starts
  // on the FirstScreen widget.
  
  // 使用“/”命名路由来启动应用（Start the app with the "/" named route. In our case, the app will start）
  // 在这里，应用将从 FirstScreen Widget 启动（on the FirstScreen Widget）
  
  initialRoute: '/',
  routes: {
    // When navigating to the "/" route, build the FirstScreen widget.
    // 当我们跳转到“/”时，构建 FirstScreen Widget（When we navigate to the "/" route, build the FirstScreen Widget）
    '/': (context) => FirstScreen(),
    // When navigating to the "/second" route, build the SecondScreen widget.
    // 当我们跳转到“/second”时，构建 SecondScreen Widget（When we navigate to the "/second" route, build the SecondScreen Widget）
    '/second': (context) => SecondScreen(),
  },
);
```

{{site.alert.warning}}
  When using `initialRoute`, **don't** define a `home` property.
{{site.alert.end}}

注意：当使用 `initialRoute` 时，需要确保你没有同时定义 `home` 属性。

## 3. Navigate to the second screen

## 3. 跳转到第二个界面

With the widgets and routes in place, trigger navigation by using the
[`Navigator.pushNamed()`]({{site.api}}/flutter/widgets/Navigator/pushNamed.html)
method. This tells Flutter to build the widget defined in the
`routes` table and launch the screen.

准备好了 Widgets 和路由，我们就可以开始进行页面跳转！在这里，我们将使用 `Navigator.pushNamed()` 函数。它会告诉 Flutter 去构建我们在 `routes` 表中定义的 Widget 并启动该界面。

In the `build()` method of the `FirstScreen` widget, update the `onPressed()`
callback:

在 `FirstScreen` Widget 的 `build()` 方法中，我们将更新 `onPressed()` 回调：

<!-- skip -->
```dart
// Within the `FirstScreen` widget
// 在 `FirstScreen` Widget中（Within the `FirstScreen` Widget）
onPressed: () {
  // Navigate to the second screen using a named route.
  // 使用命名路由跳转到第二个界面（Navigate to the second screen using a named route）
  Navigator.pushNamed(context, '/second');
}
```

## 4. Return to the first screen

## 4. 返回到第一个界面

To navigate back to the first screen, use the
[`Navigator.pop()`]({{site.api}}/flutter/widgets/Navigator/pop.html)
function.

为了能够跳转回第一个页面，我们可以使用 [`Navigator.pop`]({{site.api}}/flutter/widgets/Navigator/pop.html) 方法。

<!-- skip -->
```dart
// Within the SecondScreen widget
// 在 SecondScreen Widget 中（Within the SecondScreen Widget）
onPressed: () {
  // Navigate back to the first screen by popping the current route
  // off the stack.
  
  // 通过从堆栈弹出当前路由（Navigate back to the first screen by popping the current route）
  // 来返回到第一个界面（off the stack）
  Navigator.pop(context);
}
```

## Complete example

## 完整样例

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Named Routes Demo',
    // Start the app with the "/" named route. In this case, the app starts
    // on the FirstScreen widget.
    
    // 使用“/”命名路由来启动应用（Start the app with the "/" named route. In our case, the app will start）
    // 在这里，应用将从 FirstScreen Widget 启动（on the FirstScreen Widget）
    initialRoute: '/',
    routes: {
      // When navigating to the "/" route, build the FirstScreen widget.    
      // 当我们跳转到“/”时，构建 FirstScreen Widget（When we navigate to the "/" route, build the FirstScreen Widget）
      
      '/': (context) => FirstScreen(),
      
      // When navigating to the "/second" route, build the SecondScreen widget.
      // 当我们跳转到“/second”时，构建 SecondScreen Widget（When we navigate to the "/second" route, build the SecondScreen Widget）
      '/second': (context) => SecondScreen(),
    },
  ));
}

class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('First Screen'),
      ),
      body: Center(
        child: RaisedButton(
          child: Text('Launch screen'),
          onPressed: () {
            // Navigate to the second screen using a named route.
            // 使用命名路由跳转到第二个界面（Navigate to the second screen using a named route）
            Navigator.pushNamed(context, '/second');
          },
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Second Screen"),
      ),
      body: Center(
        child: RaisedButton(
          onPressed: () {
            // Navigate back to the first screen by popping the current route
            // off the stack.
            // 通过从堆栈弹出当前路由（Navigate back to the first screen by popping the current route）
            // 来返回到第一个界面（off the stack）
            Navigator.pop(context);
          },
          child: Text('Go back!'),
        ),
      ),
    );
  }
}
```

![Navigation Basics Demo](/images/cookbook/navigation-basics.gif){:.site-mobile-screenshot}
