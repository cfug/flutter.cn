---
title: Display a snackbars
title: 显示 snackbars
short-title: SnackBars
short-title: SnackBars
description: How to implement a SnackBar to display messages.
description: 学习使用 SnackBar 展示消息。
prev:
  title: Add a drawer to a screen
  title: 在屏幕上添加一个 Drawer
  path: /docs/cookbook/design/drawer
next:
  title: Export fonts from a package
  title: 以 package 的方式使用字体
  path: /docs/cookbook/design/package-fonts
---

It can be useful to briefly inform your users when certain actions
take place. For example, when a user swipes away a message in a list,
you might want to inform them that the message has been deleted.
You might even want to give them an option to undo the action.

在某些情况下，我们需要用方便且友好的方式告诉用户发生了什么。
例如，当用户滑动删除列表中的一条消息时，
我们或许想提醒用户消息已经被删除了，或者除了提醒之外，
我们还可以提供一个撤销的操作。

In Material Design, this is the job of a
[SnackBar]({{site.api}}/flutter/material/SnackBar-class.html).
This recipe implements a snackbar using the following steps:

在 Material Design 中，用一个
[SnackBar]({{site.api}}/flutter/material/SnackBar-class.html)
就可以实现这个需求。请参见以下步骤：

## Directions

## 步骤

  1. Create a `Scaffold`.

     创建一个  `Scaffold`
     
  2. Display a `SnackBar`.

     显示一个  `Scaffold`
  
  3. Provide an optional action.
  
     提供一个附加的操作
  

## 1. Create a `Scaffold`

## 1. 创建一个 `Scaffold`

When creating apps that follow the Material Design guidelines,
give your apps a consistent visual structure.
In this example, display the `SnackBar` at the bottom of the screen,
without overlapping other important
widgets, such as the `FloatingActionButton`.

在创建遵循 Material Design 设计规范的应用时，
我们希望应用可以有一个一致的视觉层次结构。
当我们在屏幕的底部显示一个 `SnackBar` 时，
不能覆盖其他重要的 widgets，比如 `FloatingActionButton`。

The [Scaffold]({{site.api}}/flutter/material/Scaffold-class.html)
widget, from the
[material library]({{site.api}}/flutter/material/material-library.html),
creates this visual structure and ensures that important
widgets don't overlap.

用 [material library]({{site.api}}/flutter/material/material-library.html)
中的 [Scaffold]({{site.api}}/flutter/material/Scaffold-class.html) widget
就可以创建一个一致的视觉层次结构，并且可以确保其他重要的 widgets 不会被覆盖。

<!-- skip -->
```dart
Scaffold(
  appBar: AppBar(
    title: Text('SnackBar Demo'),
  ),
  body: SnackBarPage(), // Complete this code in the next step.
);
```

## 2. Display a `SnackBar`

## 2. 显示一个 `SnackBar`

With the `Scaffold` in place, display a `SnackBar`.
First, create a `SnackBar`, then display it using the `Scaffold`.

有了 `Scaffold`，我们就可以显示一个 `SnackBar` 了。
首先，我们需要先创建一个 `SnackBar` ，然后使用 `Scaffold` 来显示它。

<!-- skip -->
```dart
final snackBar = SnackBar(content: Text('Yay! A SnackBar!'));

// Find the Scaffold in the widget tree and use it to show a SnackBar.
Scaffold.of(context).showSnackBar(snackBar);
```

## 3. Provide an optional action

## 3. 提供一个附加的操作

You might want to provide an action to the user when
the SnackBar is displayed.
For example, if the user accidentally deletes a message,
they might use an optional action in the SnackBar to recover
the message.

在某些情况下，我们可能想在显示 SnackBar 的时候给用户提供一个附加的操作。
比如，当他们意外的删除了一个消息，我们可以提供一个撤销更改的操作。

To achieve this, we can provide an additional `action` to the `SnackBar` Widget.

Here's an example of providing
an additional `action` to the `SnackBar` widget:

这个例子里，我们在创建 `SnackBar` widget 的时候提供一个附加的 `action ` 参数。

```dart
final snackBar = SnackBar(
  content: Text('Yay! A SnackBar!'),
  action: SnackBarAction(
    label: 'Undo',
    onPressed: () {
      // Some code to undo the change.
    },
  ),
);
```

## Complete example

## 完整样例
{{site.alert.note}}

  In this example, the SnackBar displays when a user taps a button.
  For more information on working with user input, see the
  [Gestures](/docs/cookbook#gestures) section of the cookbook.
  
  注意: 这个例子是当用户点击一个按钮的时候显示一个 SnackBar。
  更多有关处理用户输入的信息，请查阅实用教程 (Cookbook) 的
  [Gestures](/docs/cookbook#gestures) 部分。
  
{{site.alert.end}}

```dart
import 'package:flutter/material.dart';

void main() => runApp(SnackBarDemo());

class SnackBarDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SnackBar Demo',
      home: Scaffold(
        appBar: AppBar(
          title: Text('SnackBar Demo'),
        ),
        body: SnackBarPage(),
      ),
    );
  }
}

class SnackBarPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: RaisedButton(
        onPressed: () {
          final snackBar = SnackBar(
            content: Text('Yay! A SnackBar!'),
            action: SnackBarAction(
              label: 'Undo',
              onPressed: () {
                // Some code to undo the change.
              },
            ),
          );

          // Find the Scaffold in the widget tree and use
          // it to show a SnackBar.
          Scaffold.of(context).showSnackBar(snackBar);
        },
        child: Text('Show SnackBar'),
      ),
    );
  }
}
```

![SnackBar Demo](/images/cookbook/snackbar.gif){:.site-mobile-screenshot}
