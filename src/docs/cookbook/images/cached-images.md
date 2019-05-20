---
title: Working with cached images
title: 使用缓存图片
prev:
  title: Fade in images with a placeholder
  title: 占位符和网络图片淡入
  path: /docs/cookbook/images/fading-in-images
next:
  title: Basic List
  title: 基础列表
  path: /docs/cookbook/lists/basic-list
---

In some cases, it can be handy to cache images as they're downloaded from the
web so they can be used offline. For this purpose, you'll employ the
[`cached_network_image`]({{site.pub-pkg}}/cached_network_image) package.

在一些情况下，缓存从网络下载的图片用于离线显示是十分方便的。你需要引入 [`cached_network_image`]({{site.pub-pkg}}/cached_network_image) 包来实现这项功能。

In addition to caching, the cached_image_network package also supports
placeholders and fading images in as they're loaded.

除了缓存，cached_image_network 包也支持占位符和加载后的图片淡入。

<!-- skip -->
```dart
CachedNetworkImage(
  imageUrl: 'https://picsum.photos/250?image=9',
);
```

## Adding a placeholder

## 添加占位符

The `cached_network_image` package allows you to use any Widget as a
placeholder. In this example, you'll display a spinner while the image loads.

`cached_network_image` 包允许任何 Widget 充当占位符。在本例中，加载图片时会展示一个旋转加载的效果（spinner）作为占位符。

<!-- skip -->
```dart
CachedNetworkImage(
  placeholder: CircularProgressIndicator(),
  imageUrl: 'https://picsum.photos/250?image=9',
);
```

## Complete example

## 完整样例

<!-- skip -->
```dart
import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = 'Cached Images';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: Center(
          child: CachedNetworkImage(
            placeholder: CircularProgressIndicator(),
            imageUrl:
                'https://picsum.photos/250?image=9',
          ),
        ),
      ),
    );
  }
}
```
