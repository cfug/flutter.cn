---
# title: Add Material touch ripples
title: 添加点按涟漪效果 (Material Design)
# description: How to implement ripple animations.
description: 如何实现涟漪动画。
tags: cookbook, 实用教程, 手势操作
keywords: 动画,涟漪效果
js:
  - defer: true
    url: /assets/js/inject_dartpad.js
---

<?code-excerpt path-base="cookbook/gestures/ripples/"?>

Widgets that follow the Material Design guidelines display
a ripple animation when tapped.

当我们在开发遵循 Material Design 规范应用的时候，
我们可能会需要为某个 widgets 的点击加入涟漪效果。

Flutter provides the [`InkWell`][]
widget to perform this effect.
Create a ripple effect using the following steps:

Flutter 提供了 [`InkWell`][] widget 来实现这个功能。
你可以通过以下步骤实现涟漪效果：

  1. Create a widget that supports tap.

     创建一个想要点击的 widget；

  2. Wrap it in an `InkWell` widget to manage tap callbacks and
     ripple animations.

     用 `InkWell` widget 包裹它，并设置回调函数，
     就可以显示涟漪动画了。

<?code-excerpt "lib/main.dart (InkWell)" replace="/return //g;/^\);$/)/g"?>
```dart
// The InkWell wraps the custom flat button widget.
InkWell(
  // When the user taps the button, show a snackbar.
  onTap: () {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text('Tap')));
  },
  child: const Padding(
    padding: EdgeInsets.all(12),
    child: Text('Flat Button'),
  ),
)
```

## Interactive example

## 交互式样例

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter Material ripples hands-on example in DartPad" run="true"
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'InkWell Demo';

    return const MaterialApp(title: title, home: MyHomePage(title: title));
  }
}

class MyHomePage extends StatelessWidget {
  final String title;

  const MyHomePage({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: const Center(child: MyButton()),
    );
  }
}

class MyButton extends StatelessWidget {
  const MyButton({super.key});

  @override
  Widget build(BuildContext context) {
    // The InkWell wraps the custom flat button widget.
    return InkWell(
      // When the user taps the button, show a snackbar.
      onTap: () {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Tap')));
      },
      child: const Padding(
        padding: EdgeInsets.all(12),
        child: Text('Flat Button'),
      ),
    );
  }
}
```

<noscript>
  <img src="/assets/images/docs/cookbook/ripples.gif" alt="Ripples Demo" class="site-mobile-screenshot" />
</noscript>


[`InkWell`]: {{site.api}}/flutter/material/InkWell-class.html
