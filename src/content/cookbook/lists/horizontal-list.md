---
# title: Create a horizontal list
title: 创建一个水平滑动的列表
# description: How to implement a horizontal list.
description: 如何实现一个水平列表。
tags: cookbook, 实用教程, 列表相关
keywords: 列表定制,水平滑动列表
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/lists/horizontal_list"?>

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

<?code-excerpt "lib/main.dart (ListView)" replace="/^child\: //g"?>
```dart
ListView(
  // This next line does the trick.
  scrollDirection: Axis.horizontal,
  children: <Widget>[
    Container(
      width: 160,
      color: Colors.red,
    ),
    Container(
      width: 160,
      color: Colors.blue,
    ),
    Container(
      width: 160,
      color: Colors.green,
    ),
    Container(
      width: 160,
      color: Colors.yellow,
    ),
    Container(
      width: 160,
      color: Colors.orange,
    ),
  ],
),
```

## Interactive example

## 交互式样例

:::note 桌面和 Web 的说明
<!-- Desktop and web note -->

This example works in the browser and on the desktop.
However, as this list scrolls on the horizontal axis
(left to right or right to left),
hold <kbd>Shift</kbd> while using the mouse scroll wheel to scroll the list.

此示例在浏览器和桌面上能够正常交互：
但要注意的是，
需要按住 <kbd>Shift</kbd> 键的同时使用鼠标滚轮滚动列表，
才能让列表在水平轴上滚动（从左到右和从右到左）。

To learn more, read the [breaking change][] page on the
default drag for scrolling devices.

了解更多信息，请参阅 [破坏性改动][breaking change] 页面中
关于滚动设备的默认拖动方式。

:::

<?code-excerpt "lib/main.dart"?>
```dartpad run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Horizontal List';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: const Text(title),
        ),
        body: Container(
          margin: const EdgeInsets.symmetric(vertical: 20),
          height: 200,
          child: ListView(
            // This next line does the trick.
            scrollDirection: Axis.horizontal,
            children: <Widget>[
              Container(
                width: 160,
                color: Colors.red,
              ),
              Container(
                width: 160,
                color: Colors.blue,
              ),
              Container(
                width: 160,
                color: Colors.green,
              ),
              Container(
                width: 160,
                color: Colors.yellow,
              ),
              Container(
                width: 160,
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
  <img src="/assets/images/docs/cookbook/horizontal-list.gif" alt="Horizontal List Demo" class="site-mobile-screenshot" />
</noscript>

[breaking change]: /release/breaking-changes/default-scroll-behavior-drag
[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html
