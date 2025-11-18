---
# title: Create a horizontal list
title: 创建一个水平滑动的列表
# description: How to implement a horizontal list.
description: 如何实现一个水平列表。
tags: cookbook, 实用教程, 列表相关
keywords: 列表定制,水平滑动列表
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

<?code-excerpt "lib/main.dart (list-view)" replace="/^child\: //g"?>
```dart highlightLines=2
ListView(
  scrollDirection: Axis.horizontal,
  children: [
    for (final color in Colors.primaries)
      Container(width: 160, color: color),
  ],
),
```

[`ListView`]: {{site.api}}/flutter/widgets/ListView-class.html

## Interactive example

## 交互式样例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter horizontal list hands-on example in DartPad" run="true"
import 'dart:ui';

import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Horizontal list';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: Container(
          margin: const EdgeInsets.symmetric(vertical: 20),
          height: 200,
          child: ScrollConfiguration(
            // Add a custom scroll behavior that
            // allows all devices to drag the list.
            behavior: const MaterialScrollBehavior().copyWith(
              dragDevices: {...PointerDeviceKind.values},
            ),
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                for (final color in Colors.primaries)
                  Container(width: 160, color: color),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/horizontal-list.webp" alt="Horizontal List Demo" class="site-mobile-screenshot" />
</noscript>
