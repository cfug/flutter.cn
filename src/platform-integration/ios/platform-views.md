---
title: Hosting native iOS views in your Flutter app with Platform Views
title: "在 Flutter 应用中使用集成平台视图托管您的原生 iOS 视图"
short-title: iOS platform-views
short-title: iOS 平台视图
description: Learn how to host native iOS views in your Flutter app with Platform Views.
description: 学习如何在 Flutter 应用中使用集成平台视图托管您的原生  iOS 视图。
---

<?code-excerpt path-base="development/platform_integration"?>

Platform views allow you to embed native views in a Flutter app,
so you can apply transforms, clips, and opacity to the native view
from Dart.

集成平台视图 (后称为平台视图) 允许将原生视图嵌入到 Flutter 应用中，
所以您可以通过 Dart 将变换、裁剪和不透明度等效果应用到原生视图。

This allows you, for example, to use the native
Google Maps from the Android and iOS SDKs
directly inside your Flutter app.

例如，这使您可以通过使用平台视图直接在 Flutter 应用内部
使用 Android 和 iOS SDK 中的 Google Maps。

{{site.alert.note}}

  This page discusses how to host your own native iOS views
  within a Flutter app.
  If you'd like to embed native Android views
  in your Flutter app,
  see [Hosting native Android views][].

  本篇文档讨论了如何在您的 Flutter 应用中托管您的 iOS 原生视图。
  如果你想了解如何嵌入到 Android 视图中，阅读这篇文档：
  [在 Flutter 应用中使用集成平台视图托管您的原生 Android 视图][Hosting native Android views]。

{{site.alert.end}}

[Hosting native Android views]: {{site.url}}/platform-integration/android/platform-views


iOS only uses Hybrid composition,
which means that the native
`UIView` is appended to the view hierarchy.

iOS 只支持混合集成模式，
这意味着原生的 `UIView` 会被加入视图层级中。

To create a platform view on iOS,
use the following instructions:

要在 iOS 中创建平台视图，需要如下步骤：

### On the Dart side

### 在 Dart 端

On the Dart side, create a `Widget`
and add the build implementation,
as shown in the following steps.

在 Dart 端，创建一个 `Widget`
并添加如下的实现，具体如下：

In the Dart widget file, make changes similar to those 
shown in `native_view_example.dart`:

在 Dart 文件中，例如 `native_view_example.dart`，
请执行下列操作：

<ol markdown="1">
<li markdown="1">Add the following imports:

添加如下导入代码：

<?code-excerpt "lib/platform_views/native_view_example_3.dart (import)"?>
```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
```
</li>

<li markdown="1">Implement a `build()` method:

实现 `build()` 方法：

<?code-excerpt "lib/platform_views/native_view_example_3.dart (iOSCompositionWidget)"?>
```dart
Widget build(BuildContext context) {
  // This is used in the platform side to register the view.
  const String viewType = '<platform-view-type>';
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
</li>
</ol>

For more information, see the API docs for:
[`UIKitView`][].

更多信息，请查看 API 文档：[`UIKitView`][]。

[`UIKitView`]: {{site.api}}/flutter/widgets/UiKitView-class.html

### On the platform side

### 在平台端

On the platform side, use either Swift or Objective-C:

在平台端，您可以使用 Swift 或是 Objective-C：

{% samplecode ios-platform-views %}
{% sample Swift %}

Implement the factory and the platform view.
The `FLNativeViewFactory` creates the platform view,
and the platform view provides a reference to the `UIView`.
For example, `FLNativeView.swift`:

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

    /// Implementing this method is only necessary when the `arguments` in `createWithFrame` is not `nil`.
    public func createArgsCodec() -> FlutterMessageCodec & NSObjectProtocol {
          return FlutterStandardMessageCodec.sharedInstance()
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

Finally, register the platform view.
This can be done in an app or a plugin.

最后，注册这个平台视图。
这一步可以在应用中，也可以在插件中。

For app registration,
modify the App's `AppDelegate.swift`:

要在应用中进行注册，修改应用中的
`AppDelegate.swift`:

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

For plugin registration,
modify the plugin's main file
(for example, `FLPlugin.swift`):

要在插件中进行注册，修改插件的主类
(例如 `FLPlugin.swift`):

```swift
import Flutter
import UIKit

class FLPlugin: NSObject, FlutterPlugin {
    public static func register(with registrar: FlutterPluginRegistrar) {
        let factory = FLNativeViewFactory(messenger: registrar.messenger())
        registrar.register(factory, withId: "<platform-view-type>")
    }
}
```

{% sample Objective-C %}

In Objective-C, add the headers for the factory and the platform view.
For example, as shown in `FLNativeView.h`:

使用 Objective-C 时，你需要在工厂类和平台视图的文件头部添加以下内容。
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
The `FLNativeViewFactory` creates the platform view,
and the platform view provides a reference to the
`UIView`. For example, `FLNativeView.m`:

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

/// Implementing this method is only necessary when the `arguments` in `createWithFrame` is not `nil`.
- (NSObject<FlutterMessageCodec>*)createArgsCodec {
    return [FlutterStandardMessageCodec sharedInstance];
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

Finally, register the platform view.
This can be done in an app or a plugin.

最后，注册这个平台视图。
这一步可以在应用中，也可以在插件中。

For app registration,
modify the App's `AppDelegate.m`:

要在应用中进行注册，
修改应用中的 `AppDelegate.m`：

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

For plugin registration,
modify the main plugin file
(for example, `FLPlugin.m`):

要在插件中进行注册，修改插件主文件
(例如 `FLPlugin.m`):

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

[`FlutterPlatformView`]: {{site.api}}/ios-embedder/protocol_flutter_platform_view-p.html
[`FlutterPlatformViewFactory`]: {{site.api}}/ios-embedder/protocol_flutter_platform_view_factory-p.html
[`PlatformView`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformView.html

## Putting it together

## 整合起来

When implementing the `build()` method in Dart,
you can use [`defaultTargetPlatform`][]
to detect the platform, and decide which widget to use:

在 Dart 中实现 `build()` 方法时，
您可以使用 [`defaultTargetPlatform`][] 
来检测当前的平台，并且决定如何使用这个 widget：

<?code-excerpt "lib/platform_views/native_view_example_3.dart (TogetherWidget)"?>
```dart
Widget build(BuildContext context) {
  // This is used in the platform side to register the view.
  const String viewType = '<platform-view-type>';
  // Pass parameters to the platform side.
  final Map<String, dynamic> creationParams = <String, dynamic>{};

  switch (defaultTargetPlatform) {
    case TargetPlatform.android:
    // return widget on Android.
    case TargetPlatform.iOS:
    // return widget on iOS.
    default:
      throw UnsupportedError('Unsupported platform view');
  }
}
```

## Performance
Platform views in Flutter come with performance trade-offs.

For example, in a typical Flutter app, the Flutter UI is 
composed on a dedicated raster thread. 
This allows Flutter apps to be fast, 
as the main platform thread is rarely blocked.

When a platform view is rendered with hybrid composition, 
the Flutter UI is composed from the platform thread. 
The platform thread competes with other tasks 
like handling OS or plugin messages.

When an iOS PlatformView is on screen, the screen refresh rate is 
capped at 80fps to avoid rendering janks.

For complex cases, there are some techniques that can be used 
to mitigate performance issues.

For example, you could use a placeholder texture while an 
animation is happening in Dart. 
In other words, if an animation is slow while a platform view is rendered, 
then consider taking a screenshot of the native view and rendering it as a texture.

## Composition limitations
There are some limitations when composing iOS Platform Views.

- The [`ShaderMask`][] and [`ColorFiltered`][] widgets are not supported.
- The [`BackdropFilter`][] widget is supported, 
but there are some limitations on how it can be used. 
For more details, check out the [iOS Platform View Backdrop Filter Blur design doc][design-doc].

[`ShaderMask`]: {{site.api}}/flutter/foundation/ShaderMask.html
[`ColorFiltered`]: {{site.api}}/flutter/foundation/ColorFiltered.html
[`BackdropFilter`]: {{site.api}}/flutter/foundation/BackdropFilter.html
[`defaultTargetPlatform`]: {{site.api}}/flutter/foundation/defaultTargetPlatform.html
[design-doc]: {{site.main-url}}/go/ios-platformview-backdrop-filter-blur

