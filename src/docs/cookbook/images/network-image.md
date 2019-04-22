---
title: Display images from the internet
title: 显示网络上的远程图片
prev:
  title: Implement Swipe to Dismiss
  title: 实现「滑动清除」效果
  path: /docs/cookbook/gestures/dismissible
next:
  title: Fade in images with a placeholder
  title: 占位符和网络图片淡入
  path: /docs/cookbook/images/fading-in-images
---

Displaying images is fundamental for most mobile apps. Flutter provides the
[`Image`]({{site.api}}/flutter/widgets/Image-class.html) Widget to
display different types of images.

对大多数移动应用来说，图片显示是一项基础功能。Flutter 提供了 [`Image`]({{site.api}}/flutter/widgets/Image-class.html) 来显示不同类型的图片。

In order to work with images from a URL, use the
[`Image.network`]({{site.api}}/flutter/widgets/Image/Image.network.html)
constructor.

使用 [`Image.network`]({{site.api}}/flutter/widgets/Image/Image.network.html) 构造函数来处理来自 URL 的图片。

<!-- skip -->
```dart
Image.network(
  'https://picsum.photos/250?image=9',
)
```

## Bonus: Animated Gifs

## 意外之喜：Gif 动画

One amazing thing about the `Image` Widget: It also supports animated gifs out
of the box!

`Image` Widget 令人兴奋的特性之一：提供了开箱即用的 gif 动画支持！

<!-- skip -->
```dart
Image.network(
  'https://github.com/flutter/plugins/raw/master/packages/video_player/doc/demo_ipod.gif?raw=true',
);
```

## Placeholders and Caching

## 占位符与缓存

The default `Image.network` constructor does not handle more advanced
functionality, such as fading images in after loading or caching images
to the device after they're downloaded. To achieve these tasks, please see
the following recipes:

默认的 `Image.network` 构造函数并没有提供诸如加载后的图片淡入或下载之后将图片缓存到设备等更进一步的功能。请参阅以下链接来实现这些功能

  * [Fade in images with a placeholder](/docs/cookbook/images/fading-in-images/)
  
  * [占位符和网络图片淡入](/docs/cookbook/images/fading-in-images/)
  
  * [Working with cached images](/docs/cookbook/images/cached-images/)
  
  * [使用缓存图片](/docs/cookbook/images/cached-images/)

## Complete example

## 完整样例

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var title = 'Web Images';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: Image.network(
          'https://picsum.photos/250?image=9',
        ),
      ),
    );
  }
}
```

![Network Image Demo](/images/cookbook/network-image.png){:.site-mobile-screenshot}
