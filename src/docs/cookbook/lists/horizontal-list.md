---
title: Create a horizontal list
title: 创建一个水平滑动的列表
prev:
  title: Basic List
  title: 基础列表
  path: /docs/cookbook/lists/basic-list
next:
  title: Creating a Grid List
  title: 创建一个网格列表
  path: /docs/cookbook/lists/grid-lists
---

At times, you may want to create a List that scrolls horizontally rather than
vertically. The [`ListView`]({{site.api}}/flutter/widgets/ListView-class.html)
Widget supports horizontal lists out of the box.

有时，你可能想要创建一个水平而不是竖直滑动的列表。[`ListView`]({{site.api}}/flutter/widgets/ListView-class.html) Widget 支持水平列表。

We'll use the standard `ListView` constructor, passing through a horizontal
`scrollDirection`, which will override the default vertical direction.

我们将会使用标准的 `ListView` 构造方法，通过指定 `scrollDirection` 的值为水平方向，来覆盖默认的竖直方向。

<!-- skip -->
```dart
ListView(
  // This next line does the trick.
  scrollDirection: Axis.horizontal,
  children: <Widget>[
    Container(
      width: 160.0,
      color: Colors.red,
    ),
    Container(
      width: 160.0,
      color: Colors.blue,
    ),
    Container(
      width: 160.0,
      color: Colors.green,
    ),
    Container(
      width: 160.0,
      color: Colors.yellow,
    ),
    Container(
      width: 160.0,
      color: Colors.orange,
    ),
  ],
)
```

## Complete example

## 完整示例

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = 'Horizontal List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: Container(
          margin: EdgeInsets.symmetric(vertical: 20.0),
          height: 200.0,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: <Widget>[
              Container(
                width: 160.0,
                color: Colors.red,
              ),
              Container(
                width: 160.0,
                color: Colors.blue,
              ),
              Container(
                width: 160.0,
                color: Colors.green,
              ),
              Container(
                width: 160.0,
                color: Colors.yellow,
              ),
              Container(
                width: 160.0,
                color: Colors.orange,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

![Horizontal List Demo](/images/cookbook/horizontal-list.gif){:.site-mobile-screenshot}


