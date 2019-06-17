---
title: Add Material touch ripples
title: 添加点按涟漪效果 (Material Design)
prev:
  title: Retrieve the value of a text field
  title: 获取文本框的输入值
  path: /docs/cookbook/forms/retrieve-input
next:
  title: Handle taps
  title: 捕获和处理点击动作
  path: /docs/cookbook/gestures/handling-taps
---

Widgets that follow the Material Design guidelines display
a ripple animation when tapped.

当我们在开发遵循 Material Design 规范应用的时候，我们可能会需要为某个 Widgets 的点击加入涟漪效果。

Flutter provides the
[`InkWell`]({{site.api}}/flutter/material/InkWell-class.html)
widget to perform this effect. Create a ripple effect using
the following steps:

Flutter 提供了 [`InkWell`]({{site.api}}/flutter/material/InkWell-class.html) Widget 来实现这个功能。你可以通过以下步骤实现涟漪效果：


  1. Create a widget that supports tap.

     创建一个想要点击的 Widget

  2. Wrap it in an `InkWell` widget to manage tap callbacks and
     ripple animations.

     用 `InkWell` Widget 包裹它，并设置回调函数， 就可以显示涟漪动画了。

<!-- skip -->
```dart
// The InkWell wraps the custom flat button widget.
InkWell(
  // When the user taps the button, show a snackbar.
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

### 完整样例

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
    // The InkWell wraps the custom flat button widget.
    return InkWell(
      // When the user taps the button, show a snackbar.
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
