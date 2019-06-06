---
title: Adding Material Touch Ripples
title: 添加点按涟漪效果 (Material Design)
prev:
  title: Retrieve the value of a text field
  title: 获取文本框的输入值
  path: /docs/cookbook/forms/retrieve-input
next:
  title: Handling Taps
  title: 捕获和处理点击动作
  path: /docs/cookbook/gestures/handling-taps
---

While designing an app that should follow the Material Design Guidelines, we'll
want to add the ripple animation to Widgets when tapped.

在开发符合 Material Design 设计规范的 app 时， 想要添加点按涟漪效果。

Flutter provides the [`InkWell`]({{site.api}}/flutter/material/InkWell-class.html)
Widget to achieve this effect.

Flutter 提供了 [`InkWell`]({{site.api}}/flutter/material/InkWell-class.html) Widget 来实现这个功能。

## Directions

## 步骤

  1. Create a Widget we want to tap

     创建一个想要点击的 Widget

  2. Wrap it in an `InkWell` Widget to manage tap callbacks and ripple animations

     用 `InkWell` Widget 包裹它，并设置回调函数， 就可以显示涟漪动画了。

<!-- skip -->
```dart
// The InkWell Wraps our custom flat button Widget
InkWell(
  // When the user taps the button, show a snackbar
  onTap: () {
    Scaffold.of(context).showSnackBar(SnackBar(
      content: Text('Tap'),
    ));
  },
  child: Container(
    padding: EdgeInsets.all(12.0),
    child: Text('Flat Button'),
  ),
);
```

## Complete example

## 完整例子

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = 'InkWell Demo';

    return MaterialApp(
      title: title,
      home: MyHomePage(title: title),
    );
  }
}

class MyHomePage extends StatelessWidget {
  final String title;

  MyHomePage({Key key, this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Center(child: MyButton()),
    );
  }
}

class MyButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // The InkWell Wraps our custom flat button Widget
    return InkWell(
      // When the user taps the button, show a snackbar
      onTap: () {
        Scaffold.of(context).showSnackBar(SnackBar(
          content: Text('Tap'),
        ));
      },
      child: Container(
        padding: EdgeInsets.all(12.0),
        child: Text('Flat Button'),
      ),
    );
  }
}
```

![Ripples Demo](/images/cookbook/ripples.gif){:.site-mobile-screenshot}
