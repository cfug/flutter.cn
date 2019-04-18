---
title: Handling Taps
title: 捕获和处理点击动作
prev:
  title: Adding Material Touch Ripples
  title: 添加点按涟漪效果 (Material Design)
  path: /docs/cookbook/gestures/ripples
next:
  title: Implement Swipe to Dismiss
  title: 实现「滑动清除」效果
  path: /docs/cookbook/gestures/dismissible
---

我们的 App 不仅要把信息展示给用户，还要和用户进行交互。怎么响应用户的点击，拖动等操作行为呢？ 我们使用
[`GestureDetector`]({{site.api}}/flutter/widgets/GestureDetector-class.html)
Widget！

我们来实现一个按钮，当用户点击的时候显示 snackbar 消息。要怎么做呢？

## 步骤
  1. 创建一个按钮。
  2. 用 `GestureDetector` 包裹按钮，并传入 `onTap` 回调函数。

<!-- skip -->
```dart
// GestureDetector 包裹着按钮
GestureDetector(
  // 当他的孩子元素被点击，显示一个 snackbar
  onTap: () {
    final snackBar = SnackBar(content: Text("Tap"));

    Scaffold.of(context).showSnackBar(snackBar);
  },
  // 这个是我们的自定义按钮
  child: Container(
    padding: EdgeInsets.all(12.0),
    decoration: BoxDecoration(
      color: Theme.of(context).buttonColor,
      borderRadius: BorderRadius.circular(8.0),
    ),
    child: Text('My Button'),
  ),
);
```

## 注意

  1. 如果你想添加点按涟漪效果 (Material Design) 请参考文章 "[添加点按涟漪效果 (Material Design)](/docs/cookbook/gestures/ripples/)"。
  2. 这里为了说明原理，我们创建了自定义的按钮，其实 Flutter 已经为我们准备了很多现成的按钮供我们使用：
  [RaisedButton]({{site.api}}/flutter/material/RaisedButton-class.html)，
  [FlatButton]({{site.api}}/flutter/material/FlatButton-class.html)，
  和 [CupertinoButton]({{site.api}}/flutter/cupertino/CupertinoButton-class.html) 等。


## 完整代码

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = 'Gesture Demo';

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
    // Our GestureDetector wraps our button
    return GestureDetector(
      // When the child is tapped, show a snackbar
      onTap: () {
        final snackBar = SnackBar(content: Text("Tap"));

        Scaffold.of(context).showSnackBar(snackBar);
      },
      // Our Custom Button!
      child: Container(
        padding: EdgeInsets.all(12.0),
        decoration: BoxDecoration(
          color: Theme.of(context).buttonColor,
          borderRadius: BorderRadius.circular(8.0),
        ),
        child: Text('My Button'),
      ),
    );
  }
}
```

![Handling Taps Demo](/images/cookbook/handling-taps.gif){:.site-mobile-screenshot}
