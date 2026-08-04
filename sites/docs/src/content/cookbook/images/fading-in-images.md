---
# title: Fade in images with a placeholder
title: 占位符和网络图片淡入
# description: How to fade images into view.
description: 如何淡入占位符和网络图片。
tags: cookbook, 实用教程, 使用图片
keywords: 交互,淡入淡出,占位符
---

<?code-excerpt path-base="cookbook/images/fading_in_images"?>

When displaying images using the default `Image` widget,
you might notice they simply pop onto the screen as they're loaded.
This might feel visually jarring to your users.

当使用默认的 `Image` widget 显示图片时，
你可能会注意到图片只是在加载完后直接显示到屏幕上，
用户可能会觉得这看起来不舒服。

Instead, wouldn't it be nice to display a placeholder at first,
and images would fade in as they're loaded? Use the
[`FadeInImage`][] widget for exactly this purpose.

此外，如果可以先展示占位符，待图片加载完成后淡入显示图片不是很酷么？
可以使用 Flutter 自带的 [`FadeInImage`][] widget 来实现这个功能。

`FadeInImage` works with images of any type: in-memory, local assets,
or images from the internet.

`FadeInImage` 适用于任何类型的图片：
内存中的，本地存储的，抑或是网络上的。

## In-memory

## 从内存加载占位符

To use a single-pixel, transparent PNG as the placeholder image,
complete the following steps:

请按照以下步骤，来将单像素的透明 PNG 作为占位图：

1.  **Create the transparent image data.**

    **创建透明图像数据。**

    Import `dart:convert` and `dart:typed_data`,
    then decode the image from a Base64-encoded string:

    导入 `dart:convert` 和 `dart:typed_data`，
    然后从 Base64 编码的字符串中解码图像：

    <?code-excerpt "lib/memory_main.dart (TransparentImage)" plaster="none"?>
    ```dart
    import 'dart:convert';
    import 'dart:typed_data';
    final Uint8List transparentImage = base64Decode(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4'
      'nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
    );
    ```

1.  **Use the image data as a placeholder.**

    **将图像数据用作占位符。**

    Pass the decoded image data to the `placeholder` parameter:

    将解码后的图像数据传递给 `placeholder` 参数：

    <?code-excerpt "lib/memory_main.dart (MemoryNetwork)" replace="/^child\: //g"?>
    ```dart
    FadeInImage.memoryNetwork(
      placeholder: transparentImage,
      image: 'https://picsum.photos/250?image=9',
    ),
    ```

{:.steps}

### Complete example

### 完整样例

<?code-excerpt "lib/memory_main.dart"?>
```dart
import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';

final Uint8List transparentImage = base64Decode(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4'
  'nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
);

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Fade in images';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: Stack(
          children: <Widget>[
            const Center(child: CircularProgressIndicator()),
            Center(
              child: FadeInImage.memoryNetwork(
                placeholder: transparentImage,
                image: 'https://picsum.photos/250?image=9',
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

![Fading In Image Demo](/assets/images/docs/cookbook/fading-in-images.webp){:.site-mobile-screenshot}

## From asset bundle

## 从本地存储加载占位符

To use a local image asset as the placeholder image,
complete the following steps:

请按照以下步骤，来将本地图像资源用作占位图：

1.  **Add the placeholder to the asset bundle.**

    **将占位图添加到资源包中。**

    Add a placeholder image to the project's `assets` directory,
    such as `assets/loading.gif`.
    Then, declare the asset in the project's `pubspec.yaml` file.
    For more details, see [Adding assets and images][].

    在项目的 `assets` 目录中添加一张占位图，
    例如 `assets/loading.gif`。
    然后在项目的 `pubspec.yaml` 文件中声明该资源。
    更多详细信息，请参考 [添加资源和图片][Adding assets and images]。

    ```yaml diff
      flutter:
        assets:
    +     - assets/loading.gif
    ```

1.  **Use the asset as a placeholder.**

    **将资源用作占位。**

    Pass the asset path to the `placeholder` parameter of
    the [`FadeInImage.assetNetwork`][] constructor:

    将资源路径传递给 [`FadeInImage.assetNetwork`][] 构造函数的 `placeholder` 参数：

    <?code-excerpt "lib/asset_main.dart (AssetNetwork)" replace="/^child\: //g"?>
    ```dart
    FadeInImage.assetNetwork(
      placeholder: 'assets/loading.gif',
      image: 'https://picsum.photos/250?image=9',
    ),
    ```

{:.steps}

### Complete example

### 完整样例

<?code-excerpt "lib/asset_main.dart"?>
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const title = 'Fade in images';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(title: const Text(title)),
        body: Center(
          child: FadeInImage.assetNetwork(
            placeholder: 'assets/loading.gif',
            image: 'https://picsum.photos/250?image=9',
          ),
        ),
      ),
    );
  }
}
```

![Asset fade-in](/assets/images/docs/cookbook/fading-in-asset-demo.webp){:.site-mobile-screenshot}


[Adding assets and images]: /ui/assets/assets-and-images
[`FadeInImage`]: {{site.api}}/flutter/widgets/FadeInImage-class.html
[`FadeInImage.assetNetwork`]: {{site.api}}/flutter/widgets/FadeInImage/FadeInImage.assetNetwork.html
