---
# title: Hosting native Android views in your Flutter app with Platform Views
title: "在 Flutter 应用中使用集成平台视图托管你的原生 Android 视图"
# short-title: Android platform-views
short-title: Android 平台视图
# description: Learn how to host native Android views in your Flutter app with Platform Views.
description: 学习如何在 Flutter 应用中使用集成平台视图托管你的原生 Android 视图。
---

<?code-excerpt path-base="platform_integration/platform_views"?>

Platform views allow you to embed native views in a Flutter app,
so you can apply transforms, clips, and opacity to the native view
from Dart.

集成平台视图（后称为平台视图）允许将原生视图嵌入到 Flutter 应用中，
所以你可以通过 Dart 将变换、裁剪和不透明度等效果应用到原生视图。

This allows you, for example, to use the native
Google Maps from the Android SDK
directly inside your Flutter app.

例如，这使你可以通过使用平台视图直接在 Flutter 应用内部
使用 Android 和 iOS SDK 中的 Google Maps。

:::note

This page discusses how to host your own native Android views
within a Flutter app.
If you'd like to embed native iOS views in your Flutter app,
see [Hosting native iOS views][].

本篇文档讨论了如何在你的 Flutter 应用中托管你的 Android 原生视图。
如果你想在 Flutter 应用中内嵌 iOS 原生视图，
请阅读这篇文档：[托管 iOS 原生视图][Hosting native iOS views]。

If you'd like to embed native macOS views in your Flutter app,
see [Hosting native macOS views][].

如果你想在 Flutter 应用中内嵌 macOS 原生视图，
请阅读这篇文档：[托管 macOS 原生视图][Hosting native macOS views]。

:::

[Hosting native iOS views]: /platform-integration/ios/platform-views
[Hosting native macOS views]: /platform-integration/macos/platform-views

Platform Views on Android have two implementations. They come with tradeoffs
both in terms of performance and fidelity. 
Platform views require Android API 23+.

## [Hybrid Composition](#hybrid-composition)

Platform Views are rendered as they are normally. Flutter content is rendered into a texture.
SurfaceFlinger composes the Flutter content and the platform views.

* `+` best performance and fidelity of Android views.
* `-` Flutter performance suffers.
* `-` FPS of application will be lower.
* `-` Certain transformations that can be applied to Flutter widgets will not work when applied to platform views.

## [Texture Layer](#texturelayerhybridcomposition) (or Texture Layer Hybrid Composition)

Platform Views are rendered into a texture.
Flutter draws the platform views (via the texture).
Flutter content is rendered directly into a Surface.

* `+` good performance for Android Views
* `+` best performance for Flutter rendering.
* `+` all transformations work correctly.
* `-` quick scrolling (e.g. a web view) will be janky
* `-` SurfaceViews are problematic in this mode and will be moved into a virtual display (breaking a11y)
* `-` Text magnifier will break unless Flutter is rendered into a TextureView.

To create a platform view on Android,
use the following steps:

在 Android 上创建平台视图需要如下的步骤：

## On the Dart side

## 在 Dart 中进行的处理

On the Dart side, create a `Widget`
and add one of the following build implementations.

在 Dart 端，创建一个 `Widget`
然后添加如下的实现，具体如下：

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
    
2. Implement a `build()` method:

   实现一个 `build()` 方法：
  
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

For more information, see the API docs for:

更多信息，查阅 API 文档：

* [`PlatformViewLink`][]
* [`AndroidViewSurface`][]
* [`PlatformViewsService`][]

[`AndroidViewSurface`]: {{site.api}}/flutter/widgets/AndroidViewSurface-class.html
[`PlatformViewLink`]: {{site.api}}/flutter/widgets/PlatformViewLink-class.html
[`PlatformViewsService`]: {{site.api}}/flutter/services/PlatformViewsService-class.html

### TextureLayerHybridComposition

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

2. Implement a `build()` method:

   实现一个 `build()` 方法：

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

For more information, see the API docs for:

更多信息，查阅 API 文档：

* [`AndroidView`][]

[`AndroidView`]: {{site.api}}/flutter/widgets/AndroidView-class.html

## On the platform side

## 在平台端

On the platform side, use the standard
`io.flutter.plugin.platform` package
in either Kotlin or Java:

在平台端，使用 Kotlin 或 Java 中的标准包
`io.flutter.plugin.platform`：

{% tabs "android-language" %}
{% tab "Kotlin" %}

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

{% endtab %}
{% tab "Java" %}

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

For app registration,
modify the app's main activity
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

{% endtab %}
{% endtabs %}

For more information, see the API docs for:

更多信息，请查看 API 文档：

* [`FlutterPlugin`][]
* [`PlatformViewRegistry`][]
* [`PlatformViewFactory`][]
* [`PlatformView`][]

[`FlutterPlugin`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/FlutterPlugin.html
[`PlatformView`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformView.html
[`PlatformViewFactory`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformViewFactory.html
[`PlatformViewRegistry`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformViewRegistry.html

Finally, modify your `build.gradle` file
to require one of the minimal Android SDK versions:

最后，修改你的 `build.gradle` 文件
来满足 Android SDK 最低版本的要求：

```kotlin
android {
    defaultConfig {
        minSdk = 19 // if using hybrid composition
        minSdk = 20 // if using virtual display.
    }
}
```
### Surface Views 

Handling SurfaceViews is problematic for Flutter and should be avoided when possible.

### Manual view invalidation

Certain Android Views do not invalidate themselves when their content changes.
Some example views include `SurfaceView` and `SurfaceTexture`.
When your Platform View includes these views you are required to
manually invalidate the view after they have been drawn to
(or more specifically: after the swap chain is flipped).
Manual view invalidation is done by calling `invalidate` on the View 
or one of its parent views.

[`AndroidViewSurface`]: {{site.api}}/flutter/widgets/AndroidViewSurface-class.html

### Issues 

[Existing Platform View issues](https://github.com/flutter/flutter/issues?q=is%3Aopen+is%3Aissue+label%3A%22a%3A+platform-views%22)

{% include docs/platform-view-perf.md %}

