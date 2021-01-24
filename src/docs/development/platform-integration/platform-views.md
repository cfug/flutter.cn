---
title: Hosting native Android and iOS views in your Flutter app with Platform Views
title: 在 Flutter 应用中使用集成平台视图托管您的原生 Android 和 iOS 视图
short-title: Platform-views
description: Learn how to host native Android and iOS views in your Flutter app with Platform Views.
description: 学习如何在 Flutter 应用中使用集成平台视图托管您的原生 Android 和 iOS 视图。
---

Platform views allow to embed native views in a Flutter app, so
you can apply transforms, clips, and opacity to the native view
from Dart.

集成平台视图（后称为平台视图）允许将原生视图嵌入到 Flutter 应用中，
所以您可以通过 Dart 将变换、裁剪和不透明度等效果应用到原生视图。

This allows you, for example, to use the native
Google Maps from the Android and iOS SDKs
directly inside your Flutter app, by using Platform Views.

例如，这使您可以通过使用平台视图直接在 Flutter 应用内部
使用 Android 和 iOS SDK 中的 Google Maps。

This page discusses how to host your own native views
within a Flutter app.

本篇文档讨论了如何在您的 Flutter 应用中托管您的原生视图。

## Android

Flutter supports two modes: Virtual displays and Hybrid composition.

Flutter 支持两种集成模式：虚拟显示模式 (Virtual displays) 和混合集成模式 (Hybrid composition) 。

Which one to use depends on the use case. Let's take a look:

我们应根据具体情况来决定使用哪种模式。让我们来看看：

* Virtual displays renders the `android.view.View` instance to a texture,
  so it's not embedded within the Android Activity's view hierachy.
  Certain platform interactions such as keyboard handling, and accessibility
  features might not work.

  虚拟显示模式会将 `android.view.View` 实例渲染为纹理，
  因此它不会嵌入到 Android Activity 的视图层次结构中。
  某些平台交互（例如键盘处理和辅助功能）可能无法正常工作。

* Hybrid composition requires Flutter 1.22 ([version 1.22.2](https://github.com/flutter/flutter/wiki/Hotfixes-to-the-Stable-Channel#1222--october-16-2020) is recommended). This mode appends the
  native `android.view.View` to the view hierarchy. Therefore, keyboard
  handling, and accessibility work out of the box. Prior to Android 10,
  this mode may significantly reduce the frame throughput (FPS) of the
  Flutter UI. See [performance][] for more.

  混合集成模式需要 Flutter 1.22
  （推荐使用 [1.22.2 版本]([version 1.22.2](https://github.com/flutter/flutter/wiki/Hotfixes-to-the-Stable-Channel#1222--october-16-2020)）。
  这种模式将原生的 `android.view.View` 附加到视图层次结构中。
  因此，键盘处理和无障碍功能是开箱即用的。
  在 Android 10 之前，此模式可能会大大降低 Flutter UI 的帧吞吐量 (FPS)。
  有关更多信息，请参见 [性能][performance] 小节。

To create a platform view on Android, follow these steps:

在 Android 上创建平台视图需要如下的步骤：

### On the Dart side

### 在 Dart 中进行的处理

On the Dart side, create a `Widget`
and add the following build implementation,
as shown in the following steps.

在 Dart 端，创建一个 `Widget`
然后添加如下的实现，具体如下：

{{site.alert.warning}}

  For this to work, your plugin or app must use Android embedding v2.
  If you haven't updated your plugin, see the
  [plugin migration guide][].

  您的插件或应用必须使用 Android embedding v2 以确保平台视图可用。
  如果您还没有更新您的插件，查看
  [插件迁移指南][plugin migration guide].

{{site.alert.end}}


#### Hybrid Composition

#### 混合集成模式

In your Dart file, for example `native_view_example.dart`,
do the following:

在 Dart 文件中，例如 `native_view_example.dart`，
请执行下列操作：

1. Add the following imports:

   添加下面的导入：

<!-- skip -->
```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
```

2. Implement a `build()` method:

   实现 `build` 方法：

<!-- skip -->
```dart
Widget build(BuildContext context) {
  // This is used in the platform side to register the view.
  final String viewType = '<platform-view-type>';
  // Pass parameters to the platform side.
  final Map<String, dynamic> creationParams = <String, dynamic>{};

  return PlatformViewLink(
    viewType: viewType,
    surfaceFactory:
        (BuildContext context, PlatformViewController controller) {
      return AndroidViewSurface(
        controller: controller,
        gestureRecognizers: const <Factory<OneSequenceGestureRecognizer>>{},
        hitTestBehavior: PlatformViewHitTestBehavior.opaque,
      );
    },
    onCreatePlatformView: (PlatformViewCreationParams params) {
      return PlatformViewsService.initSurfaceAndroidView(
        id: params.id,
        viewType: viewType,
        layoutDirection: TextDirection.ltr,
        creationParams: creationParams,
        creationParamsCodec: StandardMessageCodec(),
      )
        ..addOnPlatformViewCreatedListener(params.onPlatformViewCreated)
        ..create();
    },
  );
}
```

For more information, see the API docs for:

更多信息可以查看下面的 API 文档：

* [`PlatformViewLink`][]
* [`AndroidViewService`][]
* [`PlatformViewsService`][]

#### Virtual Display

In your Dart file, for example `native_view_example.dart`,
do the following:

在 Dart 文件中，例如 `native_view_example.dart`，
请执行下列操作：

1. Add the following imports:

   添加下面的导入：

<!-- skip -->
```dart
import 'package:flutter/widget.dart';
```

2. Implement a `build()` method:

   实现 `build` 方法：

<!-- skip -->
```dart
Widget build(BuildContext context) {
  // This is used in the platform side to register the view.
  final String viewType = 'hybrid-view-type';
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

### On the platform side

### 在平台（Android）端

On the platform side, use the standard
`io.flutter.plugin.platform` package in either Java or Kotlin:

在平台端，使用 Java 或 Kotlin 中的标准包 `io.flutter.plugin.platform`：

{% samplecode android-platform-views %}
{% sample Kotlin %}

In your native code, implement the following:

在您的原生代码中，实现如下方法：

Extend `io.flutter.plugin.platform.PlatformView` to provide a reference to the `android.view.View`,
For example `NativeView.kt`:

继承 `io.flutter.plugin.platform.PlatformView` 以提供对 `android.view.View` 的引用，
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

Create a factory class that creates an instance of the `NativeView` created earlier,
for example `NativeViewFactory.kt`:

创建一个用来创建 `NativeView` 的实例的工厂类，
参考 `NativeViewFactory.kt`：

```kotlin
package dev.flutter.example

import android.content.Context
import android.view.View
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

Finally, register the platform view. This can be done in an app or a plugin.

最后，注册这个平台视图。
这一步可以在应用中，也可以在插件中。

For app registration, modify the app's main activity (e.g. `MainActivity.kt`):

要在应用中进行注册，修改应用的主 Activity （例如：`MainActivity.kt`）：

```kotlin
package dev.flutter.example

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine

class MainActivity : FlutterActivity() {
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        flutterEngine
                .platformViewsController
                .registry
                .registerViewFactory("<platform-view-type>", NativeViewFactory())
    }
}
```

For plugin registration, modify the plugin's main class (e.g. `PlatformViewPlugin.kt`):

要在插件中进行注册，修改您插件的主类（例如：`PlatformViewPlugin.kt`）：

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

{% sample Java %}

In your native code, implement the following:

在您的原生代码中，实现如下方法：

Extend `io.flutter.plugin.platform.PlatformView` to provide a reference to the `android.view.View`,
For example, `NativeView.java`:

继承 `io.flutter.plugin.platform.PlatformView` 以提供对 `android.view.View` 的引用，
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

Create a factory class that creates an instance of the `NativeView` created earlier,
for example, `NativeViewFactory.java`:

创建一个用来创建 `NativeView` 的实例的工厂类，
参考 `NativeViewFactory.java`：

```java
package dev.flutter.example;

import android.content.Context;
import android.view.View;
import androidx.annotation.Nullable;
import androidx.annotation.NonNull;
import io.flutter.plugin.common.BinaryMessenger;
import io.flutter.plugin.common.StandardMessageCodec;
import io.flutter.plugin.platform.PlatformView;
import io.flutter.plugin.platform.PlatformViewFactory;
import java.util.Map;

class NativeViewFactory extends PlatformViewFactory {
  @NonNull private final BinaryMessenger messenger;
  @NonNull private final View containerView;

  NativeViewFactory(@NonNull BinaryMessenger messenger, @NonNull View containerView) {
    super(StandardMessageCodec.INSTANCE);
    this.messenger = messenger;
    this.containerView = containerView;
  }

  @NonNull
  @Override
  public PlatformView create(@NonNull Context context, int id, @Nullable Object args) {
    final Map<String, Object> creationParams = (Map<String, Object>) args;
    return new NativeView(context, id, creationParams);
  }
}
```

Finally, register the platform view. This can be done in an app or a plugin.

最后，注册这个平台视图。
这一步可以在应用中，也可以在插件中。

For app registration, modify the app's main activity (e.g. `MainActivity.java`):

要在应用中进行注册，修改应用的主 Activity （例如：`MainActivity.java`）：

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

For plugin registration, modify the plugin's main file (e.g. `PlatformViewPlugin.java`):

要在插件中进行注册，修改插件的主类（例如：`PlatformViewPlugin.java`）：

```java
package dev.flutter.plugin.example;

import androidx.annotation.NonNull;
import io.flutter.embedding.engine.plugins.FlutterPlugin;
import io.flutter.plugin.common.BinaryMessenger;

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
{% endsamplecode %}

For more information, see the API docs for:

更多信息，请查看 API 文档：

* [`FlutterPlugin`][]
* [`PlatformViewRegistry`][]
* [`PlatformViewFactory`][]
* [`PlatformView`][]

Finally, modify your `build.gradle` file to require one of the
minimal Android SDK versions:

最后，修改您的 `build.gradle` 文件
来满足 Android SDK 最低版本的要求：

```gradle
android {
    defaultConfig {
        minSdkVersion 19 // if using Hybrid composition.
        minSdkVersion 20 // if using Virtual display.
    }
}
```

## iOS

iOS only uses Hybrid composition, which means that the native
`UIView` is appended to view hierarchy.

iOS 只支持混合集成模式，
这意味着原生的 `UIView` 会被加入视图层级中。

Prior to Flutter 1.22, platform views were in developers preview.
In 1.22 or above, it's no longer the case, so there's no need to
set the `io.flutter.embedded_views_preview` flag in `Info.plist`.

在 Flutter 1.22 前，平台视图是一个开发者预览的版本。
在 1.22 或更高版本中则不再是这样了，
所以我们不再需要在 `Info.plist` 中
设置 `io.flutter.embedded_views_preview` 标识。

To create a platform view on iOS, follow these steps:

要在 iOS 中创建平台视图，需要如下步骤：

### On the Dart side

### 在 Dart 端

On the Dart side, create a `Widget`
and add the following build implementation,
as shown in the following steps.

在 Dart 端，创建一个 `Widget`
并添加如下的实现，具体如下：

In your Dart file, for example
do the following in `native_view_example.dart`:

在 Dart 文件中，例如 `native_view_example.dart`，
请执行下列操作：

1. Add the following imports:

   添加如下导入：

<!-- skip -->
```dart
import 'package:flutter/widget.dart';
```

2. Implement a `build()` method:

   实现 `build` 方法：

<!-- skip -->
```dart
Widget build(BuildContext context) {
  // This is used in the platform side to register the view.
  final String viewType = '<platform-view-type>';
  // Pass parameters to the platform side.
  final Map<String, dynamic> creationParams = <String, dynamic>{};

  return UiKitView(
    viewType: viewType,
    layoutDirection: TextDirection.ltr,
    creationParams: creationParams,
    creationParamsCodec: const StandardMessageCodec(),
  );
}
```

For more information, see the API docs for:
[`UIKitView`][].

更多信息，请查看 API 文档：
[`UIKitView`][].

### On the platform side

### 在平台（iOS）端

On the platform side, you use the either Swift or Objective-C:

在平台端，您可以使用 Swift 或是 Objective-C：

{% samplecode ios-platform-views %}
{% sample Swift %}

Implement the factory and the platform view.
The `FLNativeViewFactory` creates the platform view, and the platform view
provides a reference to the `UIView`. For example, `FLNativeView.swift`:

实现工厂和平台视图。
`FLNativeViewFactory` 创建一个关联了 `UIView` 的平台视图。
举个例子，`FLNativeView.swift`：

```swift
import Flutter
import UIKit

class FLNativeViewFactory: NSObject, FlutterPlatformViewFactory {
    private var messenger: FlutterBinaryMessenger

    init(messenger: FlutterBinaryMessenger) {
        self.messenger = messenger
        super.init()
    }

    func create(
        withFrame frame: CGRect,
        viewIdentifier viewId: Int64,
        arguments args: Any?
    ) -> FlutterPlatformView {
        return FLNativeView(
            frame: frame,
            viewIdentifier: viewId,
            arguments: args,
            binaryMessenger: messenger)
    }
}

class FLNativeView: NSObject, FlutterPlatformView {
    private var _view: UIView

    init(
        frame: CGRect,
        viewIdentifier viewId: Int64,
        arguments args: Any?,
        binaryMessenger messenger: FlutterBinaryMessenger?
    ) {
        _view = UIView()
        super.init()
        // iOS views can be created here
        createNativeView(view: _view)
    }

    func view() -> UIView {
        return _view
    }

    func createNativeView(view _view: UIView){
        _view.backgroundColor = UIColor.blue
        let nativeLabel = UILabel()
        nativeLabel.text = "Native text from iOS"
        nativeLabel.textColor = UIColor.white
        nativeLabel.textAlignment = .center
        nativeLabel.frame = CGRect(x: 0, y: 0, width: 180, height: 48.0)
        _view.addSubview(nativeLabel)
    }
}
```

Finally, register the platform view. This can be done in an app or a plugin.

最后，注册这个平台视图。
这一步可以在应用中，也可以在插件中。

For app registration, modify the App's `AppDelegate.swift`:

要在应用中进行注册，修改应用中的 `AppDelegate.swift`：

```swift
import Flutter
import UIKit

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]?
    ) -> Bool {
        GeneratedPluginRegistrant.register(with: self)

        weak var registrar = self.registrar(forPlugin: "plugin-name")

        let factory = FLNativeViewFactory(messenger: registrar!.messenger())
        self.registrar(forPlugin: "<plugin-name>")!.register(
            factory,
            withId: "<platform-view-type>")
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }
}
```

For plugin registration, modify the plugin's main file (e.g. `FLPlugin.swift`):

要在插件中进行注册，修改插件的主类（例如 `FLPlugin.swift`）：

```swift
import Flutter
import UIKit

class FLPlugin: NSObject, FlutterPlugin {
    public static func register(with registrar: FlutterPluginRegistrar) {
        let factory = FLNativeViewFactory(messenger: registrar.messenger)
        registrar.register(factory, withId: "<platform-view-type>")
    }
}
```

{% sample Objective-C %}

Add the headers for the factory and the platform view.
For example, `FLNativeView.h`:

在工厂类和平台视图的文件头部添加以下内容。
用 `FLNativeView.h` 举例：

```objc
#import <Flutter/Flutter.h>

@interface FLNativeViewFactory : NSObject <FlutterPlatformViewFactory>
- (instancetype)initWithMessenger:(NSObject<FlutterBinaryMessenger>*)messenger;
@end

@interface FLNativeView : NSObject <FlutterPlatformView>

- (instancetype)initWithFrame:(CGRect)frame
               viewIdentifier:(int64_t)viewId
                    arguments:(id _Nullable)args
              binaryMessenger:(NSObject<FlutterBinaryMessenger>*)messenger;

- (UIView*)view;
@end
```

Implement the factory and the platform view.
The `FLNativeViewFactory` creates the platform view, and the platform view
provides a reference to the `UIView`. For example, `FLNativeView.m`:

实现工厂类和平台视图。
`FLNativeViewFactory` 创建一个关联了 `UIView` 的平台视图。
用 `FLNativeView.m` 举例：

```objc
#import "FLNativeView.h"

@implementation FLNativeViewFactory {
  NSObject<FlutterBinaryMessenger>* _messenger;
}

- (instancetype)initWithMessenger:(NSObject<FlutterBinaryMessenger>*)messenger {
  self = [super init];
  if (self) {
    _messenger = messenger;
  }
  return self;
}

- (NSObject<FlutterPlatformView>*)createWithFrame:(CGRect)frame
                                   viewIdentifier:(int64_t)viewId
                                        arguments:(id _Nullable)args {
  return [[FLNativeView alloc] initWithFrame:frame
                              viewIdentifier:viewId
                                   arguments:args
                             binaryMessenger:_messenger];
}

@end

@implementation FLNativeView {
   UIView *_view;
}

- (instancetype)initWithFrame:(CGRect)frame
               viewIdentifier:(int64_t)viewId
                    arguments:(id _Nullable)args
              binaryMessenger:(NSObject<FlutterBinaryMessenger>*)messenger {
  if (self = [super init]) {
    _view = [[UIView alloc] init];
  }
  return self;
}

- (UIView*)view {
  return _view;
}

@end
```

Finally, register the platform view. This can be done in an app or a plugin.

最后，注册这个平台视图。
这一步可以在应用中，也可以在插件中。

For app registration, modify the App's `AppDelegate.m`:

要在应用中进行注册，修改应用中的 `AppDelegate.m`：

```objc
#import "AppDelegate.h"
#import "FLNativeView.h"
#import "GeneratedPluginRegistrant.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [GeneratedPluginRegistrant registerWithRegistry:self];

   NSObject<FlutterPluginRegistrar>* registrar =
      [self registrarForPlugin:@"plugin-name"];

  FLNativeViewFactory* factory =
      [[FLNativeViewFactory alloc] initWithMessenger:registrar.messenger];

  [[self registrarForPlugin:@"<plugin-name>"] registerViewFactory:factory
                                                          withId:@"<platform-view-type>"];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

@end
```

For plugin registration, modify the main plugin file (e.g. `FLPlugin.m`):

要在插件中进行注册，修改插件主文件（例如 `FLPlugin.m`）：

```objc

#import <Flutter/Flutter.h>
#import "FLNativeView.h"

@interface FLPlugin : NSObject<FlutterPlugin>
@end

@implementation FLPlugin

+ (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar {
  FLNativeViewFactory* factory =
      [[FLNativeViewFactory alloc] initWithMessenger:registrar.messenger];
  [registrar registerViewFactory:factory withId:@"<platform-view-type>"];
}

@end
```

{% endsamplecode %}

For more information, see the API docs for:

更多信息，请查看 API 文档：

* [`FlutterPlatformViewFactory`][]
* [`FlutterPlatformView`][]
* [`PlatformView`][]

## Putting it together

## 整合

When implementing the `build()` method in Dart, you can use [`defaultTargetPlatform`][]
to detect the platform, and decide what widget to use:

在 Dart 中实现 `build()` 方法时，您可以使用 [`defaultTargetPlatform`][] 
来检测当前的平台，并且决定如何使用这个 widget：

<!-- skip -->
```dart
Widget build(BuildContext context) {
  // This is used in the platform side to register the view.
  final String viewType = '<platform-view-type>';
  // Pass parameters to the platform side.
  final Map<String, dynamic> creationParams = <String, dynamic>{};

  switch (defaultTargetPlatform) {
    case TargetPlatform.android:
      // return widget on Android.
    case TargetPlatform.iOS:
      // return widget on iOS.
    default:
      throw UnsupportedError("Unsupported platform view");
  }
}
```

## Performance

## 性能

Platform views in Flutter come with performance trade-offs.

在 Flutter 中使用平台视图时，性能会有所折衷。

For example, in a typical Flutter app, the Flutter UI is composed
on a dedicated raster thread. This allows Flutter apps to be fast,
as the main platform thread is rarely blocked.

例如，在典型的 Flutter 应用中，Flutter UI 是在专用栅格线程上组成的。
由于平台的主线程很少被阻塞，因此 Flutter 应用程序可以快速运行。

While a platform view is rendered with Hybrid composition, the Flutter
UI is composed from the platform thread, which competes with other
tasks like handling OS or plugin messages, etc.

使用混合集成模式渲染平台视图时，
Flutter UI 由平台线程完成，与其他线程一起竞争，
例如：处理系统或插件消息等任务。

Prior to Android 10, Hybrid composition copies each Flutter frame
out of the graphic memory into main memory, and then copies it back
to a GPU texture. In Android 10 or above, the graphics memory is
copied twice. As this copy happens per frame, the performance of
the entire Flutter UI may be impacted.

在 Android 10 之前，
混合集成模式将每个 Flutter 帧从显存中复制到主内存中，
然后再将其复制回 GPU 纹理中。
在 Android 10 或更高版本中，显存会被复制两次。
由于每帧都会进行一次复制，因此可能会影响整个 Flutter UI 的性能。

Virtual display, on the other hand, makes each pixel of the native view
flow through additional intermediate graphic buffers, which cost graphic
memory and drawing performance.

另一方面，虚拟显示模式使平台视图的每个像素
流经附加的中间图形缓冲区，这会浪费显存和绘图性能。

For complex cases, there are some techniques that can be used to mitigate
these issues.

对于复杂的情况，可以使用一些技巧来缓解这些问题。

For example, you could use a placeholder texture while an animation is
happening in Dart. In other words, if an animation is slow while a
platform view is rendered, then consider taking a screenshot of the
native view and rendering it as a texture.

例如，当 Dart 中发生动画时，您可以使用占位符纹理。
换句话说，如果在渲染平台视图时动画很慢，
请考虑对原生视图进行截图，并将其渲染为纹理。

For more information, see:

更多消息，查看：

* [`TextureLayer`][]
* [`TextureRegistry`][]
* [`FlutterTextureRegistry`][]

[`AndroidView`]: {{site.api}}/flutter/widgets/AndroidView-class.html
[`AndroidViewService`]: {{site.api}}/flutter/widgets/AndroidViewSurface-class.html
[`defaultTargetPlatform`]: {{site.api}}/flutter/foundation/defaultTargetPlatform.html
[`FlutterPlatformView`]: {{site.api}}/objcdoc/Protocols/FlutterPlatformView.html
[`FlutterPlatformViewFactory`]: {{site.api}}/objcdoc/Protocols/FlutterPlatformViewFactory.html
[`FlutterPlugin`]: {{site.api}}/javadoc/io/flutter/embedding/engine/plugins/FlutterPlugin.html
[`FlutterTextureRegistry`]: {{site.api}}/objcdoc/Protocols/FlutterTextureRegistry.html
[performance]: #performance
[plugin migration guide]: https://flutter.dev/docs/development/packages-and-plugins/plugin-api-migration
[`PlatformView`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformView.html
[`PlatformViewFactory`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformViewFactory.html
[`PlatformViewLink`]: {{site.api}}/flutter/widgets/PlatformViewLink-class.html
[`PlatformViewRegistry`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformViewRegistry.html
[`PlatformViewsService`]: {{site.api}}/flutter/services/PlatformViewsService-class.html
[`UIKitView`]: {{site.api}}/flutter/widgets/UiKitView-class.html
[`TextureLayer`]: {{site.api}}/flutter/rendering/TextureLayer-class.html
[`TextureRegistry`]: {{site.api}}/javadoc/io/flutter/view/TextureRegistry.html
