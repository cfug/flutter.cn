---
title: Fade in images with a placeholder
title: 占位符和网络图片淡入
prev:
  title: Display images from the internet
  title: 显示网络上的远程图片
  path: /docs/cookbook/images/network-image
next:
  title: Work with cached images
  title: 使用缓存图片
  path: /docs/cookbook/images/cached-images
---

When displaying images using the default `Image` widget, you might notice they
simply pop onto the screen as they're loaded. This might feel visually jarring
to your users.

当使用默认的 `Image` widget 显示图片时，你可能会注意到图片只是在加载完后直接显示到屏幕上。用户可能会觉得这看起来不舒服。

Instead, wouldn't it be nice to display a placeholder at first,
and images would fade in as they're loaded? Use the
[`FadeInImage`][] widget for exactly this purpose.

此外，如果可以先展示占位符，待图片加载完成后淡入显示图片不是很酷么？可以使用 Flutter 自带的 [`FadeInImage`]({{site.api}}/flutter/widgets/FadeInImage-class.html) Widget 来实现这个功能。

`FadeInImage` works with images of any type: in-memory, local assets,
or images from the internet.

`FadeInImage` 适用于任何类型的图片：内存中的，本地存储的，抑或是网络上的。

## In-Memory

## 从内存加载占位符

In this example, use the [transparent_image][]
package for a simple transparent placeholder.

本例将使用 [transparent_image]({{site.pub-pkg}}/transparent_image) 包来实现一个简单的透明占位符。

<!-- skip -->
```dart
FadeInImage.memoryNetwork(
  placeholder: kTransparentImage,
  image: 'https://picsum.photos/250?image=9',
);
```

### Complete example

### 完整样例

```dart
import 'package:flutter/material.dart';
import 'package:transparent_image/transparent_image.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = 'Fade in images';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: Stack(
          children: <Widget>[
            Center(child: CircularProgressIndicator()),
            Center(
              child: FadeInImage.memoryNetwork(
                placeholder: kTransparentImage,
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

![Fading In Image Demo](/images/cookbook/fading-in-images.gif){:.site-mobile-screenshot}

### From asset bundle

### 从本地存储加载占位符

You can also consider using local assets for placeholders.
First, add the asset to the project’s `pubspec.yaml` file
(for more details, see [Adding assets and images][]):

也可以考虑使用本地资源作为占位符。首先将资源添加到项目的 `pubspec.yaml` 文件中（更多细节请参阅 [Assets and images](/docs/development/ui/assets-and-images)）：

<!-- skip -->
```diff
 flutter:
   assets:
+    - assets/loading.gif
```

Then, use the [`FadeInImage.assetNetwork()`][] constructor:

然后使用 [FadeInImage.assetNetwork()]({{site.api}}/flutter/widgets/FadeInImage/FadeInImage.assetNetwork.html) 构造函数：

<!-- skip -->
```dart
FadeInImage.assetNetwork(
  placeholder: 'assets/loading.gif',
  image: 'https://picsum.photos/250?image=9',
);
```

### Complete example

### 完整样例

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = 'Fade in images';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
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

![Asset fade-in](/images/cookbook/fading-in-asset-demo.gif){:.site-mobile-screenshot}


[Adding assets and images]: /docs/development/ui/assets-and-images
[`FadeInImage`]: {{site.api}}/flutter/widgets/FadeInImage-class.html
[`FadeInImage.assetNetwork()`]: {{site.api}}/flutter/widgets/FadeInImage/FadeInImage.assetNetwork.html
[transparent_image]: {{site.pub-pkg}}/transparent_image
