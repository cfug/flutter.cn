---
title: Use lists
title: 基础列表
prev:
  title: Work with cached images
  title: 使用缓存图片
  path: /docs/cookbook/images/cached-images
next:
  title: Create a horizontal list
  title: 创建一个水平滑动的列表
  path: /docs/cookbook/lists/horizontal-list
---

Displaying lists of data is a fundamental pattern for mobile apps.
Flutter includes the
[`ListView`]({{site.api}}/flutter/widgets/ListView-class.html)
widget to make working with lists a breeze.

用列表展示数据是移动应用开发中较为常用的方式，Flutter 自带的 [`ListView`]({{site.api}}/flutter/widgets/ListView-class.html) Widget 可以帮助你轻松的实现一个列表。

## Create a ListView

## 创建一个 ListView

Using the standard `ListView` constructor is perfect for lists that
contain only a few items. The built-in
[`ListTile`]({{site.api}}/flutter/material/ListTile-class.html)
widget is a way to give items a visual structure.

使用标准的 `ListView` 构造方法非常适合只有少量数据的列表。我们还将使用内置的 [`ListTile`]({{site.api}}/flutter/material/ListTile-class.html) Widget 来给我们的条目提供可视化结构。

<!-- skip -->
```dart
ListView(
  children: <Widget>[
    ListTile(
      leading: Icon(Icons.map),
      title: Text('Map'),
    ),
    ListTile(
      leading: Icon(Icons.photo_album),
      title: Text('Album'),
    ),
    ListTile(
      leading: Icon(Icons.phone),
      title: Text('Phone'),
    ),
  ],
);
```

## Complete example

## 完整示例

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = 'Basic List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: ListView(
          children: <Widget>[
            ListTile(
              leading: Icon(Icons.map),
              title: Text('Map'),
            ),
            ListTile(
              leading: Icon(Icons.photo_album),
              title: Text('Album'),
            ),
            ListTile(
              leading: Icon(Icons.phone),
              title: Text('Phone'),
            ),
          ],
        ),
      ),
    );
  }
}
```

![Basic List Demo](/images/cookbook/basic-list.png){:.site-mobile-screenshot}


