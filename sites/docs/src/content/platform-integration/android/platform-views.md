---
# title: Hosting native Android views in your Flutter app with Platform Views
title: 在 Flutter 应用中使用集成平台视图托管你的原生 Android 视图
# shortTitle: Android platform-views
shortTitle: Android 平台视图
# description: >-
#   Learn how to host native Android views in your
#   Flutter app with Platform Views.
description: 学习如何在 Flutter 应用中使用集成平台视图托管你的原生 Android 视图。
ai-translated: true
---

<?code-excerpt path-base="platform_integration/platform_views"?>

Platform views allow you to embed native views in a Flutter app,
so you can apply transforms, clips, and opacity to the native view
from Dart.

集成平台视图（后称为平台视图）允许将原生视图嵌入到 Flutter 应用中，
所以你可以通过 Dart 将变换、裁剪和不透明度等效果应用到原生视图。

This allows you, for example,
to use the native Google Maps from the Android SDK
directly inside your Flutter app.

例如，这使你可以通过使用平台视图直接在 Flutter 应用内部
使用 Android 和 iOS SDK 中的 Google Maps。

:::note

This page discusses how to host your own native Android views
within a Flutter app.
If you'd like to embed native iOS views in your Flutter app,
visit [Hosting native iOS views][].
To embed native macOS views in your Flutter app,
visit [Hosting native macOS views][].

本篇文档讨论了如何在你的 Flutter 应用中托管你的 Android 原生视图。
如果你想在 Flutter 应用中内嵌 iOS 原生视图，
请阅读这篇文档：[托管 iOS 原生视图][Hosting native iOS views]。
如果你想在 Flutter 应用中内嵌 macOS 原生视图，
请阅读这篇文档：[托管 macOS 原生视图][Hosting native macOS views]。

:::

[Hosting native iOS views]: /platform-integration/ios/platform-views
[Hosting native macOS views]: /platform-integration/macos/platform-views

Platform Views on Android have several implementations.
They come with tradeoffs both in terms of performance and fidelity.

Android 平台上的视图有多种实现方式。
这些实现方式在性能和保真度方面都存在取舍。

### Choosing an implementation

### 选择实现

The following matrix summarizes the different implementations and their trade-offs:

下表概括了不同实现及其取舍：

| <t>Mode</t><t>模式</t> | <t>Benefits</t><t>优势</t> | <t>Considerations</t><t>注意事项</t> | <t>Enabler</t><t>启用方式</t> |
| :--- | :--- | :--- | :--- |
| **Texture layer** | • Good Flutter performance<br>• Full widget transforms work | • Janky during quick scrolling<br>• SurfaceViews lose accessibility and text magnifier breaks<br>• Platform View -> Renders to texture -> Uploads to Impeller -> Impeller composites Flutter content and Platform View content | Default behavior or standard `AndroidView` |
| **纹理层** | • Flutter 性能好<br>• 完整的 widget 变换可用 | • 快速滚动时卡顿<br>• `SurfaceView` 失去无障碍能力，文本放大镜失效<br>• 平台视图 → 渲染到纹理 → 上传到 Impeller → Impeller 合成 Flutter 内容与平台视图内容 | 默认行为，或标准 `AndroidView` |
| **Hybrid composition** | • Full native fidelity<br>• Correct accessibility and SurfaceView support | • Causes thread merging of raster & platform, which degrades Flutter FPS<br>• Platform View -> Renders into the Android view hierarchy as usual, Flutter content renders into `ImageReader`-backed `FlutterImageView`s (a background layer, plus an overlay layer for content drawn above a platform view), the Android view hierarchy composites them together |• `PlatformViewLink` with `AndroidViewSurface`<br>• [`AndroidViewController` builds either a TLHC or an HC Platform View][AC] |
| **混合集成** | • 完整的原生保真度<br>• 无障碍与 `SurfaceView` 支持正确 | • 光栅线程与平台线程合并，降低 Flutter 帧率<br>• 平台视图 → 照常渲染进 Android 视图层级，Flutter 内容渲染到由 `ImageReader` 支撑的 `FlutterImageView`（背景层，以及绘制在平台视图之上的内容所用的叠加层），由 Android 视图层级将它们合成 | • `PlatformViewLink` 搭配 `AndroidViewSurface`<br>• [`AndroidViewController` 会构建 TLHC 或 HC 平台视图][AC] |
| **HCPP** (Experimental) | • Full fidelity and performance<br>• Solves original sync overhead | • Requires Android API 34+, Vulkan support, and use of the Impeller rendering engine<br>• Platform View -> Renders to native Android Surface, Impeller renders to native Android Surface, SurfaceFlinger composites the two together | • `<meta-data>` in `AndroidManifest.xml`<br>• `--enable-hcpp` local flag<br> •[`AndroidViewController` builds either a TLHC or an HC Platform View][AC] |
| **HCPP**（实验性） | • 保真度与性能都完整<br>• 解决原先的同步开销 | • 需要 Android API 34 及以上、Vulkan 支持，并使用 Impeller 渲染引擎<br>• 平台视图 → 渲染到原生 Android Surface，Impeller 渲染到原生 Android Surface，由 SurfaceFlinger 将二者合成 | • `AndroidManifest.xml` 中的 `<meta-data>`<br>• 本地标志 `--enable-hcpp`<br>• [`AndroidViewController` 会构建 TLHC 或 HC 平台视图][AC] |

{:.table .table-striped}

[AC]: {{site.repo.flutter}}/blob/main/dev/integration_tests/hybrid_android_views/lib/android_platform_view.dart

## Hybrid composition {: #hybrid-composition }

## 混合集成 {: #hybrid-composition }

Platform views are rendered as they normally are,
directly in the Android view hierarchy.
Flutter content is rendered into `ImageReader`s and painted by
`FlutterImageView`s that sit in the same window as the platform views,
so the Android view hierarchy composites them together.

平台视图按通常方式直接渲染在 Android 视图层级中。
Flutter 内容渲染到 `ImageReader`，并由与平台视图位于同一窗口的
`FlutterImageView` 绘制，再由 Android 视图层级将它们合成在一起。

Flutter uses two kinds of these layers.
The main Flutter render surface is swapped for a background
`FlutterImageView` once a platform view is added.
Flutter content that draws on top of a platform view
goes into an additional overlay `FlutterImageView`,
allocated from a pool and recycled between frames.

Flutter 使用两种这样的图层。
加入平台视图后，主 Flutter 渲染表面会换成背景 `FlutterImageView`。
绘制在平台视图之上的 Flutter 内容会进入额外的叠加 `FlutterImageView`，
该图层从池中分配，并在帧之间回收。

## Hybrid composition++ (HCPP) {: #hcpp }

## 混合集成++（HCPP）{: #hcpp }

:::version-note
This feature is experimental and is available starting from Flutter 3.44.

该功能为实验性功能，从 Flutter 3.44 起提供。
:::

HCPP is the latest hybrid composition strategy,
designed to solve compositing performance and synchronization issues
seen in the original Hybrid Composition mode.
It is currently available as an opt-in feature.

HCPP 是最新的混合集成策略，
用于解决原始混合集成模式中的合成性能与同步问题。
目前它是一项需要主动启用的功能。

### Requirements

### 要求

* **Android API 34 or later**: Required for native transaction
  synchronization capabilities.

  **Android API 34 或更高版本**：原生事务同步能力所需。

* **Impeller with the Vulkan backend**: The device must be capable of
  rendering with Vulkan. Impeller also has an OpenGLES backend, and
  falls back to it on devices without usable Vulkan support.
  HCPP is not available in that configuration.

  **使用 Vulkan 后端的 Impeller**：设备必须能够使用 Vulkan 渲染。
  Impeller 也有 OpenGLES 后端，在没有可用 Vulkan 支持的设备上回退到该后端。
  此配置下无法使用 HCPP。

If these requirements are not met on the end-user device,
Flutter will automatically fall back to the existing platform view strategy
configured for the app.

若终端用户设备不满足这些要求，
Flutter 会自动回退到应用已配置的现有平台视图策略。

### Opt in

### 主动启用

Because HCPP acts as a global upgrade for how platform views are backed,
it's enabled through configuration rather than
standard Dart initialization methods (`initAndroidView`, and so on).

由于 HCPP 是平台视图底层实现的全局升级，
它通过配置启用，而不是通过常规 Dart 初始化方法（`initAndroidView` 等）。

You can enable HCPP using one of the following methods:

可用以下任一方式启用 HCPP：

1.  **Command line flag (run/test)**:
    Pass the `--enable-hcpp` flag to your
    `flutter run` or `flutter test` command:

    **命令行标志（run/test）**：
    向 `flutter run` 或 `flutter test` 传入 `--enable-hcpp` 标志：

    ```console
    $ flutter run --enable-hcpp
    ```

    :::note
    This flag is intended for local execution and testing.
    **It can't be passed to the `flutter build` commands.**
    For release builds, use the manifest configuration
    as shown in the next step.

    此标志用于本地运行与测试。
    **不能传给 `flutter build` 命令。**
    发布构建请使用下一步所示的清单配置。
    :::

2.  **AndroidManifest.xml**:
    Include a `<meta-data>` tag inside the
    `<application>` block of your `AndroidManifest.xml`:

    **AndroidManifest.xml**：
    在 `AndroidManifest.xml` 的 `<application>` 块内加入 `<meta-data>` 标签：

    ```xml
    <meta-data
        android:name="io.flutter.embedding.android.EnableHcpp"
        android:value="true" />
    ```

### Limitations and known issues

### 限制与已知问题

* **Complex overlay stacking**:
  Transparent platform views won't display correctly
  in layout stacks structured as:
  **Flutter canvas -> Platform View -> Overlay -> Transparent Platform View**,
  when all four of these layers intersect.

  **复杂的叠加层堆叠**：
  当布局栈为
  **Flutter 画布 → 平台视图 → 叠加层 → 透明平台视图**，
  且这四层全部相交时，透明平台视图无法正确显示。

## Texture layer {: #texture-layer }

## 纹理层 {: #texture-layer }

Platform Views are rendered into a texture.
Flutter draws the platform views (using the texture).
Flutter content is rendered directly into a Surface.

平台视图被渲染到纹理中。
Flutter 使用该纹理绘制平台视图。
Flutter 内容直接渲染到 Surface。

This approach provides:

这种方式可以提供：

* good performance for Android Views

  Android View 性能良好

* good performance for Flutter rendering

  Flutter 渲染性能良好

* all transformations work correctly

  所有变换都能正确生效

However, this approach might cause:

不过，这种方式可能导致：

* jankiness on quick scrolling (such as a web view)

  快速滚动时卡顿（例如 web view）

* broken accessibility for `SurfaceView`s

  `SurfaceView` 的无障碍功能失效

* broken text magnification unless Flutter is rendered
  into a `TextureView`

  除非将 Flutter 渲染到 `TextureView`，否则文本放大功能失效

## On the Dart side

## 在 Dart 中进行的处理

To create a platform view on Android, use the following steps.
First, on the Dart side, create a `Widget` and add one of the
following build implementations depending on your chosen strategy.

要在 Android 上创建平台视图，请按照以下步骤操作。
首先，在 Dart 端创建一个 `Widget`，并根据你选择的策略来添加以下其中一个构建实现。

### Hybrid composition

### 混合集成模式

In your Dart file,
for example `native_view_example.dart`,
use the following instructions:

在 Dart 文件中，例如 `native_view_example.dart`，
请执行下列操作：

1. Add the following imports:

   添加下面的导入代码：

   <?code-excerpt "lib/native_view_example_1.dart (import)"?>
   ```dart
   import 'package:flutter/foundation.dart';
   import 'package:flutter/gestures.dart';
   import 'package:flutter/material.dart';
   import 'package:flutter/rendering.dart';
   import 'package:flutter/services.dart';
   ```

2. Implement a `build` method:

   实现一个 `build` 方法：
  
   <?code-excerpt "lib/native_view_example_1.dart (hybrid-composition)"?>
   ```dart
   Widget build(BuildContext context) {
     // This is used in the platform side to register the view.
     const String viewType = '<platform-view-type>';
     // Pass parameters to the platform side.
     const Map<String, dynamic> creationParams = <String, dynamic>{};
   
     return PlatformViewLink(
       viewType: viewType,
       surfaceFactory: (context, controller) {
         return AndroidViewSurface(
           controller: controller as AndroidViewController,
           gestureRecognizers: const <Factory<OneSequenceGestureRecognizer>>{},
           hitTestBehavior: PlatformViewHitTestBehavior.opaque,
         );
       },
       onCreatePlatformView: (params) {
         return PlatformViewsService.initSurfaceAndroidView(
             id: params.id,
             viewType: viewType,
             layoutDirection: TextDirection.ltr,
             creationParams: creationParams,
             creationParamsCodec: const StandardMessageCodec(),
             onFocus: () {
               params.onFocusChanged(true);
             },
           )
           ..addOnPlatformViewCreatedListener(params.onPlatformViewCreated)
           ..create();
       },
     );
   }
   ```

For more information, visit the following API docs:

更多信息，查阅 API 文档：

* [`PlatformViewLink`][]
* [`AndroidViewSurface`][]
* [`PlatformViewsService`][]

[`AndroidViewSurface`]: {{site.api}}/flutter/widgets/AndroidViewSurface-class.html
[`PlatformViewLink`]: {{site.api}}/flutter/widgets/PlatformViewLink-class.html
[`PlatformViewsService`]: {{site.api}}/flutter/services/PlatformViewsService-class.html

### TextureLayerHybridComposition

### TextureLayerHybridComposition 模式

In your Dart file,
for example `native_view_example.dart`,
use the following instructions:

在 Dart 文件中，例如 `native_view_example.dart`，
请执行下列操作：

1. Add the following imports:

   添加下面的导入代码：
   
   <?code-excerpt "lib/native_view_example_2.dart (import)"?>
   ```dart
   import 'package:flutter/material.dart';
   import 'package:flutter/services.dart';
   ```

2. Implement a `build` method:

   实现一个 `build` 方法：

   <?code-excerpt "lib/native_view_example_2.dart (virtual-display)"?>
   ```dart
   Widget build(BuildContext context) {
     // This is used in the platform side to register the view.
     const String viewType = '<platform-view-type>';
     // Pass parameters to the platform side.
     final Map<String, dynamic> creationParams = <String, dynamic>{};
   
     return AndroidView(
       viewType: viewType,
       layoutDirection: TextDirection.ltr,
       creationParams: creationParams,
       creationParamsCodec: const StandardMessageCodec(),
     );
   }
   ```

For more information, visit the [`AndroidView`][] API page.

更多信息，请查看 [`AndroidView`][] API 文档。

[`AndroidView`]: {{site.api}}/flutter/widgets/AndroidView-class.html

## On the platform side

## 在平台端

On the platform side, use the standard
`io.flutter.plugin.platform` package
in either Kotlin or Java:

在平台端，使用 Kotlin 或 Java 中的标准 package
`io.flutter.plugin.platform`：

<Tabs key="android-language">
<Tab name="Kotlin">

In your native code, implement the following:

在你的原生代码中，实现如下方法：

Extend `io.flutter.plugin.platform.PlatformView`
to provide a reference to the `android.view.View`
(for example, `NativeView.kt`):

继承 `io.flutter.plugin.platform.PlatformView`
以提供对 `android.view.View` 的引用，
如 `NativeView.kt` 所示：

```kotlin
package dev.flutter.example

import android.content.Context
import android.graphics.Color
import android.view.View
import android.widget.TextView
import io.flutter.plugin.platform.PlatformView

internal class NativeView(context: Context, id: Int, creationParams: Map<String?, Any?>?) : PlatformView {
    private val textView: TextView

    override fun getView(): View {
        return textView
    }

    override fun dispose() {}

    init {
        textView = TextView(context)
        textView.textSize = 72f
        textView.setBackgroundColor(Color.rgb(255, 255, 255))
        textView.text = "Rendered on a native Android view (id: $id)"
    }
}
```

Create a factory class that creates an instance of the
`NativeView` created earlier
(for example, `NativeViewFactory.kt`):

创建一个用来创建 `NativeView` 的实例的工厂类，
参考 `NativeViewFactory.kt`：

```kotlin
package dev.flutter.example

import android.content.Context
import io.flutter.plugin.common.StandardMessageCodec
import io.flutter.plugin.platform.PlatformView
import io.flutter.plugin.platform.PlatformViewFactory

class NativeViewFactory : PlatformViewFactory(StandardMessageCodec.INSTANCE) {
    override fun create(context: Context, viewId: Int, args: Any?): PlatformView {
        val creationParams = args as Map<String?, Any?>?
        return NativeView(context, viewId, creationParams)
    }
}
```

Finally, register the platform view.
You can do this in an app or a plugin.

最后，注册这个平台视图。
这一步可以在应用中，也可以在插件中。

For app registration,
modify the app's main activity
(for example, `MainActivity.kt`):

要在应用中进行注册，修改应用的主 Activity
(例如：`MainActivity.kt`)：

```kotlin
package dev.flutter.example

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine

class MainActivity : FlutterActivity() {
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        flutterEngine
                .platformViewsController
                .registry
                .registerViewFactory("<platform-view-type>",
                                      NativeViewFactory())
    }
}
```

For plugin registration,
modify the plugin's main class
(for example, `PlatformViewPlugin.kt`):

要在插件中进行注册，修改你插件的主类 
(例如：`PlatformViewPlugin.kt`)：

```kotlin
package dev.flutter.plugin.example

import io.flutter.embedding.engine.plugins.FlutterPlugin
import io.flutter.embedding.engine.plugins.FlutterPlugin.FlutterPluginBinding

class PlatformViewPlugin : FlutterPlugin {
    override fun onAttachedToEngine(binding: FlutterPluginBinding) {
        binding
                .platformViewRegistry
                .registerViewFactory("<platform-view-type>", NativeViewFactory())
    }

    override fun onDetachedFromEngine(binding: FlutterPluginBinding) {}
}
```

</Tab>
<Tab name="Java">

In your native code, implement the following:

在你的原生代码中，实现如下方法：

Extend `io.flutter.plugin.platform.PlatformView`
to provide a reference to the `android.view.View`
(for example, `NativeView.java`):

继承 `io.flutter.plugin.platform.PlatformView`
以提供对 `android.view.View` 的引用，
如 `NativeView.java` 所示：

```java
package dev.flutter.example;

import android.content.Context;
import android.graphics.Color;
import android.view.View;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import io.flutter.plugin.platform.PlatformView;
import java.util.Map;

class NativeView implements PlatformView {
   @NonNull private final TextView textView;

    NativeView(@NonNull Context context, int id, @Nullable Map<String, Object> creationParams) {
        textView = new TextView(context);
        textView.setTextSize(72);
        textView.setBackgroundColor(Color.rgb(255, 255, 255));
        textView.setText("Rendered on a native Android view (id: " + id + ")");
    }

    @NonNull
    @Override
    public View getView() {
        return textView;
    }

    @Override
    public void dispose() {}
}
```

Create a factory class that creates an
instance of the `NativeView` created earlier
(for example, `NativeViewFactory.java`):

创建一个用来创建 `NativeView` 的实例的工厂类，
参考 `NativeViewFactory.java`：

```java
package dev.flutter.example;

import android.content.Context;
import androidx.annotation.Nullable;
import androidx.annotation.NonNull;
import io.flutter.plugin.common.StandardMessageCodec;
import io.flutter.plugin.platform.PlatformView;
import io.flutter.plugin.platform.PlatformViewFactory;
import java.util.Map;

class NativeViewFactory extends PlatformViewFactory {

  NativeViewFactory() {
    super(StandardMessageCodec.INSTANCE);
  }

  @NonNull
  @Override
  public PlatformView create(@NonNull Context context, int id, @Nullable Object args) {
    final Map<String, Object> creationParams = (Map<String, Object>) args;
    return new NativeView(context, id, creationParams);
  }
}
```

Finally, register the platform view.
You can do this in an app or a plugin.

最后，注册这个平台视图。
这一步可以在应用中，也可以在插件中。

For app registration, modify the app's main activity
(for example, `MainActivity.java`):

要在应用中进行注册，修改应用的主 Activity
(例如：`MainActivity.java`):

```java
package dev.flutter.example;

import androidx.annotation.NonNull;
import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;

public class MainActivity extends FlutterActivity {
    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        flutterEngine
            .getPlatformViewsController()
            .getRegistry()
            .registerViewFactory("<platform-view-type>", new NativeViewFactory());
    }
}
```

For plugin registration,
modify the plugin's main file
(for example, `PlatformViewPlugin.java`):

要在插件中进行注册，
修改插件的主类 (例如：`PlatformViewPlugin.java`):

```java
package dev.flutter.plugin.example;

import androidx.annotation.NonNull;
import io.flutter.embedding.engine.plugins.FlutterPlugin;

public class PlatformViewPlugin implements FlutterPlugin {
  @Override
  public void onAttachedToEngine(@NonNull FlutterPluginBinding binding) {
    binding
        .getPlatformViewRegistry()
        .registerViewFactory("<platform-view-type>", new NativeViewFactory());
  }

  @Override
  public void onDetachedFromEngine(@NonNull FlutterPluginBinding binding) {}
}
```

</Tab>
</Tabs>

For more information, visit the API docs for:

更多信息，请查看 API 文档：

* [`FlutterPlugin`][]
* [`PlatformViewRegistry`][]
* [`PlatformViewFactory`][]
* [`PlatformView`][]

[`FlutterPlugin`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/FlutterPlugin.html
[`PlatformView`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformView.html
[`PlatformViewFactory`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformViewFactory.html
[`PlatformViewRegistry`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformViewRegistry.html

### Manual view invalidation

### 手动使视图失效

Certain Android Views don't invalidate themselves when their content changes.
Some examples include `SurfaceView` and `SurfaceTexture`.
When your Platform View includes these views,
you must manually invalidate it after it has been drawn
(or, more specifically, after the swap chain is flipped).
Invalidate the view by calling `invalidate` on it or on one of its parents.

某些 Android View 在内容变化时不会自行失效。
例如 `SurfaceView` 和 `SurfaceTexture`。
当平台视图包含这些视图时，绘制完成后
（更确切地说，是交换链翻转之后）必须手动使其失效。
对该视图或其某个父视图调用 `invalidate` 即可。

[`AndroidViewSurface`]: {{site.api}}/flutter/widgets/AndroidViewSurface-class.html

### Issues

### 问题

Check out the [existing Platform View issues][] on GitHub.

请在 GitHub 上查看 [现有的平台视图 issue][existing Platform View issues]。

[existing Platform View issues]: {{site.repo.flutter}}/issues?q=is%3Aopen+is%3Aissue+label%3A%22a%3A+platform-views

## Performance

## 性能

Platform views in Flutter come with performance trade-offs.

Flutter 中的平台视图伴随着性能取舍。

In a typical Flutter app,
Flutter rasterizes frames on a dedicated raster thread,
while platform code, such as plugins and Android views,
runs on the platform thread, which is the Android main thread.
This separation keeps Flutter rendering fast and fluid,
as the platform thread is not blocked by rasterization work.

在典型的 Flutter 应用中，
Flutter 在专用光栅线程上对帧进行光栅化，
而插件和 Android 视图等平台代码运行在平台线程（即 Android 主线程）上。
这种分离让 Flutter 渲染保持快速流畅，
因为平台线程不会被光栅化工作阻塞。

However, when a platform view is rendered on Android using
hybrid composition,
Flutter merges the raster thread into the platform thread
to ensure correct synchronization between
the native Android views and the Flutter canvas.
Because of this thread merging,
rasterizing complex Flutter widgets alongside a platform view
competes with other work on the platform thread,
such as OS messages and plugin interactions,
potentially causing lower application FPS and frame drops.

不过，在 Android 上使用混合集成渲染平台视图时，
Flutter 会把光栅线程合并进平台线程，
以确保原生 Android 视图与 Flutter 画布正确同步。
由于线程合并，在平台视图旁光栅化复杂 Flutter widget 时，
会与平台线程上的其他工作争用，
例如操作系统消息和插件交互，
从而可能降低应用帧率并出现掉帧。

Also, prior to Android 10, hybrid composition copied each Flutter frame
out of the graphic memory into main memory,
and then copied it back to a GPU texture. As this copy happens per frame,
the performance of the entire Flutter UI might be impacted.
In Android 10 or above, the graphics memory is copied only once.

另外，在 Android 10 之前，混合集成会把每一帧 Flutter 画面
从图形内存复制到主内存，再复制回 GPU 纹理。
由于逐帧复制，整个 Flutter UI 的性能都可能受影响。
在 Android 10 及以上，图形内存只复制一次。

Hybrid Composition++ (HCPP) minimizes this overhead by using native
transaction synchronization on supported devices (Android API 34+ with Vulkan),
allowing superior performance without the heavy costs of original hybrid
composition.

在受支持的设备上（Android API 34 及以上且支持 Vulkan），
混合集成++（HCPP）通过原生事务同步把这项开销降到最低，
从而获得更好的性能，又不必承担原始混合集成的高昂代价。

Virtual display, on the other hand, makes each pixel of the native view flow
through additional intermediate graphic buffers,
which cost graphic memory and drawing performance.
This can cause jank during high-frequency updates like fast scrolling.

另一方面，虚拟显示会让原生视图的每个像素
流经额外的中间图形缓冲区，
这会消耗图形内存和绘制性能。
在快速滚动等高频更新时可能导致卡顿。

For complex cases, there are some techniques that
can be used to mitigate these issues.

对于复杂场景，可以用一些技巧缓解这些问题。

For example, you can use a placeholder texture
while an animation is happening in Dart.
In other words, if an animation is slow while a
platform view is rendered,
then consider taking a screenshot of the
native view and rendering it as a texture.

例如，在 Dart 中播放动画时可以使用占位纹理。
也就是说，如果渲染平台视图时动画变慢，
可以考虑对原生视图截图，并将其作为纹理渲染。

For more information, visit the following API pages:

更多信息请参阅以下 API 页面：

* [`TextureLayer`][]
* [`TextureRegistry`][]
* [`FlutterTextureRegistry`][]
* [`FlutterImageView`][]

[`FlutterImageView`]: {{site.api}}/javadoc/io/flutter/embedding/android/FlutterImageView.html
[`FlutterTextureRegistry`]: {{site.api}}/ios-embedder/protocol_flutter_texture_registry-p.html
[`TextureLayer`]: {{site.api}}/flutter/rendering/TextureLayer-class.html
[`TextureRegistry`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.html
