---
# title: Use lists
title: 基础列表
# description: How to implement a list.
description: 如何实现列表。
tags: cookbook, 实用教程, 列表相关
keywords: 基础列表
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/lists/basic_list"?>

Displaying lists of data is a fundamental pattern for mobile apps.
Flutter includes the [`ListView`][]
widget to make working with lists a breeze.

用列表展示数据是移动应用开发中较为常用的方式，
Flutter 自带的 [`ListView`][] widget 可以帮助你轻松的实现一个列表。

## Create a ListView

## 创建一个 ListView

Using the standard `ListView` constructor is
perfect for lists that contain only a few items.
The built-in [`ListTile`][]
widget is a way to give items a visual structure.

使用标准的 `ListView` 构造方法非常适合只有少量数据的列表。
我们还将使用内置的 [`ListTile`][] widget 来给我们的条目提供可视化结构。

<?code-excerpt "lib/main.dart (ListView)" replace="/^body\: //g"?>
```dart
ListView(
  children: const <Widget>[
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
```

## Interactive example

## 交互式样例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter lists hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Basic List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: const Text(title),
        ),
        body: ListView(
          children: const <Widget>[
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

<noscript>
  <img src="/assets/images/docs/cookbook/basic-list.png" alt="Basic List Demo" class="site-mobile-screenshot" /> 
</noscript>


[`ListTile`]: {{site.api}}flutter/material/ListTile-class.html
[`ListView`]: {{site.api}}flutter/widgets/ListView-class.html
