## Performance

## 性能

Platform views in Flutter come with performance trade-offs.

在 Flutter 中使用平台视图时，性能会有所取舍。

For example, in a typical Flutter app, the Flutter UI is composed
on a dedicated raster thread. This allows Flutter apps to be fast,
as the main platform thread is rarely blocked.

例如，在典型的 Flutter 应用中，Flutter 的 UI 是专门在 raster 线程上合成的。
由于平台的主线程很少被阻塞，因此 Flutter 应用程序可以快速运行。

While a platform view is rendered with hybrid composition,
the Flutter UI is composed from the platform thread,
which competes with other tasks like handling OS or plugin messages.

使用混合集成模式渲染平台视图时，
Flutter UI 由平台线程完成，与其他线程一起竞争，
例如：处理系统或插件消息等任务。

Prior to Android 10, hybrid composition copied each Flutter frame
out of the graphic memory into main memory, and then copied it back
to a GPU texture. As this copy happens per frame, the performance of
the entire Flutter UI might be impacted. In Android 10 or above, the
graphics memory is copied only once.

在 Android 10 之前，
混合集成模式将每个 Flutter 帧从显存中复制到主内存中，
然后再将其复制回 GPU 纹理中。
在 Android 10 或更高版本中，显存会被复制两次。
由于每帧都会进行一次复制，因此可能会影响整个 Flutter UI 的性能。

Virtual display, on the other hand,
makes each pixel of the native view
flow through additional intermediate graphic buffers,
which cost graphic memory and drawing performance.

另一方面，虚拟显示模式使平台视图的每个像素
流经附加的中间图形缓冲区，这会浪费显存和绘图性能。

For complex cases, there are some techniques that
can be used to mitigate these issues.

对于复杂的情况，可以使用一些技巧来缓解这些问题。

For example, you could use a placeholder texture
while an animation is happening in Dart.
In other words, if an animation is slow while a
platform view is rendered,
then consider taking a screenshot of the
native view and rendering it as a texture.

例如，当 Dart 中发生动画时，您可以使用占位符纹理。
换句话说，如果在渲染平台视图时动画很慢，
请考虑对原生视图进行截图，并将其渲染为纹理。

For more information, see:

更多信息，请查看下面链接：

* [`TextureLayer`][]
* [`TextureRegistry`][]
* [`FlutterTextureRegistry`][]
* [`FlutterImageView`][]

[`FlutterImageView`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterImageView.html
[`FlutterTextureRegistry`]: {{site.api}}/ios-embedder/protocol_flutter_texture_registry-p.html
[`TextureLayer`]: {{site.api}}/flutter/rendering/TextureLayer-class.html
[`TextureRegistry`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.html
