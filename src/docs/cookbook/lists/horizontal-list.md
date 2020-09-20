---
title: Create a horizontal list
title: 创建一个水平滑动的列表
description: How to implement a horizontal list.
description: 如何实现一个水平列表。
tags: cookbook, 实用教程, 列表相关
keywords: 列表定制,水平滑动列表
prev:
  title: Use lists
  title: 基础列表
  path: /docs/cookbook/lists/basic-list
next:
  title: Create a grid list
  title: 创建一个网格列表
  path: /docs/cookbook/lists/grid-lists
js:
  - defer: true
    url: https://dartpad.cn/inject_embed.dart.js
---

You might want to create a list that scrolls
horizontally rather than vertically.
The [`ListView`][] widget supports horizontal lists.

有时，你可能想要创建一个水平滑动（而不是竖直滑动）的列表。
[`ListView`][] widget 本身就支持水平列表的创建。

Use the standard `ListView` constructor, passing in a horizontal
`scrollDirection`, which overrides the default vertical direction.

我们将会使用标准的 `ListView` 构造方法，
通过指定 `scrollDirection` 的值为水平方向，
来覆盖默认的竖直方向。

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

## Interactive example

## 交互式样例

```run-dartpad:theme-light:mode-flutter:run-true:width-100%:height-600px:split-60:ga_id-interactive_example
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

<noscript>
  <img src="/images/cookbook/horizontal-list.gif" alt="Horizontal List Demo" class="site-mobile-screenshot" />
</noscript>


[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
