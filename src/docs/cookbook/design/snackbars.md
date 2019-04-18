---
title: Displaying SnackBars
title: 显示 SnackBars
short-title: SnackBars
short-title: SnackBars
description: How to implement a SnackBar to display messages.
description: 学习使用 SnackBar 展示消息。
prev:
  title: Add a Drawer to a screen
  title: 在屏幕上添加一个 Drawer
  path: /docs/cookbook/design/drawer
next:
  title: Exporting fonts from a package
  title: 以 package 的方式使用字体
  path: /docs/cookbook/design/package-fonts
---

In some cases, it can be handy to briefly inform our users when certain actions
take place. For example, when a user swipes away a message in a list, we might
want to inform them the message has been deleted. We might even want to give
them an option to undo the action!  
在一些情况下，在发生某些操作时，它是方便的短暂通知，例如：当用户删除掉列表中的信息时，我们可能想通知用户消息已经被删除，甚至想事件给用户撤销的操作。 


In Material Design, this is the job of a
[SnackBar]({{site.api}}/flutter/material/SnackBar-class.html).  
在Material Design中，这是[SnackBar]({{site.api}}/flutter/material/SnackBar-class.html)的工作。

## Directions

## 步骤 
  1. Create a `Scaffold`  
  
     创建一个`Scaffold`
     
  2. Display a `SnackBar` 
  
     显示一个`SnackBar`
     
  3. Provide an additional action  
  
     提供额外的操作

## 1. Create a `Scaffold`
## 1. 创建一个`Scaffold`  

When creating apps that follow the Material Design guidelines, we'll want to
give our apps a consistent visual structure. In this case, we'll need to display
the `SnackBar` at the bottom of the screen, without overlapping other important
Widgets, such as the `FloatingActionButton`!

当创建Material Design风格的App时，我们希望给我们的App有统一的视觉效果，在这种情况下，我们需要在屏幕底部显示`SnackBar`，而不重叠其他重要的小部件，如`FloatingActionButton`！

The [Scaffold]({{site.api}}/flutter/material/Scaffold-class.html)
Widget from the
[material library]({{site.api}}/flutter/material/material-library.html)
creates this visual structure for us and ensures important Widgets don't
overlap!

[material library]({{site.api}}/flutter/material/material-library.html)中[Scaffold]({{site.api}}/flutter/material/Scaffold-class.html)部件为开发这创建可视化结构，并保证重要部件不重叠。

<!-- skip -->
```dart
Scaffold(
  appBar: AppBar(
    title: Text('SnackBar Demo'),
  ),
  body: SnackBarPage(), // You'll fill this in below!
);
```

## 2. Display a `SnackBar`

## 2. 显示一个`SnackBar`

With the `Scaffold` in place, you can display a `SnackBar`! First, you need to
create a `SnackBar`, then display it using the `Scaffold`.

当`Scaffold`完成后，您就可以显示一个`SnackBar`！首先，你需要创建一个`SnackBar`，然后使用`Scaffold`显示它。

<!-- skip -->
```dart
final snackBar = SnackBar(content: Text('Yay! A SnackBar!'));

// Find the Scaffold in the Widget tree and use it to show a SnackBar
Scaffold.of(context).showSnackBar(snackBar);
```

## 3. Provide an additional action

## 3. 提供额外的操作

In some cases, you might want to provide an additional action to the user when
the SnackBar is displayed. For example, if they've accidentally deleted a
message, we could provide an action to undo that change.

在某些情况下，您可能希望在显示SnackBar时向用户提供额外的操作，例如，如果用户意外删除了消息，我们可以提供撤销更改的操作。  

To achieve this, we can provide an additional `action` to the `SnackBar` Widget.

为了实现这一目的，我们可以SnackBar小部件提供额外的操作。  

```dart
final snackBar = SnackBar(
  content: Text('Yay! A SnackBar!'),
  action: SnackBarAction(
    label: 'Undo',
    onPressed: () {
      // Some code to undo the change!
    },
  ),
);
```

## Complete example
## 完整示例 

Note: In this example, the SnackBar displays when a user taps on a button. For
more information on working with user input, please see the
[Gestures](/docs/cookbook#gestures) section of the Cookbook.

注意：在这个示例中，当用户点击按钮时，会显示SnackBar。有关使用用户输入的更多信息，请参阅指导手册的[手势](/docs/cookbook#gestures)部分。

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
                // Some code to undo the change!
              },
            ),
          );

          // Find the Scaffold in the Widget tree and use it to show a SnackBar!
          Scaffold.of(context).showSnackBar(snackBar);
        },
        child: Text('Show SnackBar'),
      ),
    );
  }
}
```

![SnackBar Demo](/images/cookbook/snackbar.gif){:.site-mobile-screenshot}

