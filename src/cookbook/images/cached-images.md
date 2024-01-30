---
title: Work with cached images
title: 使用缓存图片
description: How to work with cached images.
description: 如何操作缓存的图片。
tags: cookbook, 实用教程, 使用图片
keywords: Flutter使用图片,图片缓存,网络图片,API
---

{% include docs/yt_shims.liquid %}

<?code-excerpt path-base="cookbook/images/cached_images"?>

In some cases, it's handy to cache images as they're downloaded from the
web, so they can be used offline. For this purpose,
use the [`cached_network_image`][] package.

在一些情况下，缓存从网络下载的图片用于离线显示是十分方便的，
你需要引入 [`cached_network_image`][] 这个 package 来实现这项功能。

{{site.alert.note}}

  To learn more, watch this short Package of the Week video on the cached_network_image package:

  了解更多，请参考下方「每周 Widget」的里关于 cached_network_image 的短视频：

  <iframe class="full-width" src="{{yt-embed}}/fnHr_rsQwDA" title="了解 cached_network_image Flutter Package" {{yt-set}}></iframe>

{{site.alert.end}}

In addition to caching, the `cached_network_image`
package also supports placeholders and fading images
in as they're loaded.

除了缓存，`cached_image_network` 包也支持占位符和加载后的图片淡入。

<?code-excerpt "lib/simple.dart (SimpleCachedImage)" replace="/^return //g"?>
```dart
CachedNetworkImage(
  imageUrl: 'https://picsum.photos/250?image=9',
);
```

## Adding a placeholder

## 添加占位符

The `cached_network_image` package allows you to use any widget as a
placeholder. In this example, display a spinner while the image loads.

`cached_network_image` 包允许任何 widget 充当占位符。
在本例中，加载图片时会展示一个旋转加载的效果（spinner）作为占位符。

<?code-excerpt "lib/main.dart (CachedNetworkImage)" replace="/^child\: //g"?>
```dart
CachedNetworkImage(
  placeholder: (context, url) => const CircularProgressIndicator(),
  imageUrl: 'https://picsum.photos/250?image=9',
),
```

## Complete example

## 完整样例

<?code-excerpt "lib/main.dart"?>
```dart
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Cached Images';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: const Text(title),
        ),
        body: Center(
          child: CachedNetworkImage(
            placeholder: (context, url) => const CircularProgressIndicator(),
            imageUrl: 'https://picsum.photos/250?image=9',
          ),
        ),
      ),
    );
  }
}
```

[`cached_network_image`]: {{site.pub-pkg}}/cached_network_image
