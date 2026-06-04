---
# title: Hosting native macOS views in your Flutter app with Platform Views
title: 在 Flutter 应用中通过平台视图嵌入原生 macOS 视图
# shortTitle: macOS platform-views
shortTitle: macOS 平台视图
# description: Learn how to host native macOS views in your Flutter app with Platform Views.
description: 了解如何在 Flutter 应用中通过平台视图嵌入原生 macOS 视图。
ai-translated: true
---

<?code-excerpt path-base="platform_integration/platform_views"?>

Platform views allow you to embed native views in a Flutter app, so you can
apply transforms, clips, and opacity to the native view from Dart.

平台视图让你能在 Flutter 应用中嵌入原生视图，从而从 Dart 对原生视图应用变换、裁剪和透明度。

This allows you, for example, to use the native web views directly inside your
Flutter app.

例如，你可以直接在 Flutter 应用中使用原生 Web 视图。

:::note
This page discusses how to host your own
native macOS views within a Flutter app.
If you'd like to embed native Android views in your Flutter app,
see [Hosting native Android views][].
If you'd like to embed native iOS views in your Flutter app,
see [Hosting native iOS views][].
:::

:::note
本页介绍如何在 Flutter 应用中托管你自己的原生 macOS 视图。若要在 Flutter 应用中嵌入原生 Android 视图，请参阅 [托管原生 Android 视图][]。若要在 Flutter 应用中嵌入原生 iOS 视图，请参阅 [托管原生 iOS 视图][]。
:::

[Hosting native Android views]: /platform-integration/android/platform-views
[托管原生 Android 视图]: /platform-integration/android/platform-views
[Hosting native iOS views]: /platform-integration/ios/platform-views
[托管原生 iOS 视图]: /platform-integration/ios/platform-views

:::version-note
Platform view support on macOS isn't fully functional as of the current release.
For example, gesture support isn't yet available on macOS.
Stay tuned for a future stable release.
:::

:::version-note
截至当前版本，macOS 上的平台视图支持尚未完全可用。例如，macOS 上尚不支持手势。请关注后续稳定版发布。
:::

macOS uses Hybrid composition, which means that the
native `NSView` is appended to the view hierarchy.

macOS 使用混合合成（Hybrid composition），即原生 `NSView` 会追加到视图层级中。

To create a platform view on macOS, use the following instructions:

要在 macOS 上创建平台视图，请按以下说明操作：

## On the Dart side

## Dart 端

On the Dart side, create a `Widget` and add the build implementation,
as shown in the following steps:

在 Dart 端，创建一个 widget 并添加 `build` 实现，如下列步骤所示：

In the Dart widget file, make changes similar to those
shown in `native_view_example.dart`:

在 Dart widget 文件中，进行与 `native_view_example.dart` 中类似的修改：

 1. Add the following imports:

    1. 添加以下 import：

    <?code-excerpt "lib/native_view_example_4.dart (import)"?>
    ```dart
    import 'package:flutter/foundation.dart';
    import 'package:flutter/services.dart';
    ```

 1. Implement a `build()` method:

    1. 实现 `build()` 方法：

    <?code-excerpt "lib/native_view_example_4.dart (macos-composition)"?>
    ```dart
    Widget build(BuildContext context) {
      // This is used in the platform side to register the view.
      const String viewType = '<platform-view-type>';
      // Pass parameters to the platform side.
      final Map<String, dynamic> creationParams = <String, dynamic>{};
    
      return AppKitView(
        viewType: viewType,
        layoutDirection: TextDirection.ltr,
        creationParams: creationParams,
        creationParamsCodec: const StandardMessageCodec(),
      );
    }
    ```

For more information, check out the [`AppKitView`][] API docs.

更多信息请参阅 [`AppKitView`][] API 文档。

[`AppKitView`]: {{site.api}}/flutter/widgets/AppKitView-class.html

## On the platform side

## 平台端

Implement the factory and the platform view.
The `NativeViewFactory` creates the platform view, and
the platform view provides a reference to the `NSView`.
For example, `NativeView.swift`:

实现工厂与平台视图。`NativeViewFactory` 创建平台视图，平台视图提供对 `NSView` 的引用。例如 `NativeView.swift`：

```swift title="NativeView.swift"
import Cocoa
import FlutterMacOS

class NativeViewFactory: NSObject, FlutterPlatformViewFactory {
  private var messenger: FlutterBinaryMessenger

  init(messenger: FlutterBinaryMessenger) {
    self.messenger = messenger
    super.init()
  }

  func create(
    withViewIdentifier viewId: Int64,
    arguments args: Any?
  ) -> NSView {
    return NativeView(
      viewIdentifier: viewId,
      arguments: args,
      binaryMessenger: messenger)
  }

  /// Implementing this method is only necessary when
  /// the `arguments` in `createWithFrame` is not `nil`.
  public func createArgsCodec() -> (FlutterMessageCodec & NSObjectProtocol)? {
    return FlutterStandardMessageCodec.sharedInstance()
  }
}

class NativeView: NSView {

  init(
    viewIdentifier viewId: Int64,
    arguments args: Any?,
    binaryMessenger messenger: FlutterBinaryMessenger?
  ) {
    super.init(frame: CGRect(x: 0, y: 0, width: 200, height: 200))
    wantsLayer = true
    layer?.backgroundColor = NSColor.systemBlue.cgColor
    // macOS views can be created here
    createNativeView(view: self)
  }

    required init?(coder nsCoder: NSCoder) {
        super.init(coder: nsCoder)
    }

  func createNativeView(view _view: NSView) {
    let nativeLabel = NSTextField()
    nativeLabel.frame = CGRect(x: 0, y: 0, width: 180, height: 48.0)
    nativeLabel.stringValue = "Native text from macOS"
    nativeLabel.textColor = NSColor.black
    nativeLabel.font = NSFont.systemFont(ofSize: 14)
    nativeLabel.isBezeled = false
    nativeLabel.focusRingType = .none
    nativeLabel.isEditable = true
    nativeLabel.sizeToFit()
    _view.addSubview(nativeLabel)
  }
}
```

Finally, register the platform view.
This can be done in an app or a plugin.

最后注册平台视图，可在应用或插件中完成。

For app registration, modify the App's `MainFlutterWindow.swift`:

应用注册：修改应用的 `MainFlutterWindow.swift`：

```swift title="MainFlutterWindow.swift"
import Cocoa
import FlutterMacOS

class MainFlutterWindow: NSWindow {
  override func awakeFromNib() {
    // ...

    let registrar = flutterViewController.registrar(forPlugin: "plugin-name")
    let factory = NativeViewFactory(messenger: registrar.messenger)
    registrar.register(
      factory,
      withId: "<platform-view-type>")
  }
}
```

For plugin registration, modify the plugin's main file:

插件注册：修改插件主文件：

```swift title="Plugin.swift"
import Cocoa
import FlutterMacOS

public class Plugin: NSObject, FlutterPlugin {
  public static func register(with registrar: FlutterPluginRegistrar) {
    let factory = NativeViewFactory(messenger: registrar.messenger)
    registrar.register(factory, withId: "<platform-view-type>")
  }
}
```

For more information, check out the API docs for:

更多信息请参阅以下 API 文档：

* [`FlutterPlatformViewFactory`][]
* [`FlutterPlatformView`][]
* [`PlatformView`][]

[`FlutterPlatformView`]: {{site.api}}/ios-embedder/protocol_flutter_platform_view-p.html
[`FlutterPlatformViewFactory`]: {{site.api}}/ios-embedder/protocol_flutter_platform_view_factory-p.html
[`PlatformView`]: {{site.api}}/javadoc/io/flutter/plugin/platform/PlatformView.html

## Putting it together

## 整合

When implementing the `build()` method in Dart,
you can use [`defaultTargetPlatform`][]
to detect the platform, and decide which widget to use:

在 Dart 中实现 `build()` 时，可使用 [`defaultTargetPlatform`][] 检测平台并决定使用哪个 widget：

<?code-excerpt "lib/native_view_example_4.dart (together-widget)"?>
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
    case TargetPlatform.macOS:
    // return widget on macOS.
    default:
      throw UnsupportedError('Unsupported platform view');
  }
}
```

[`defaultTargetPlatform`]: {{site.api}}/flutter/foundation/defaultTargetPlatform.html

## Performance

## 性能

Platform views in Flutter come with performance trade-offs.

Flutter 中的平台视图存在性能权衡。

For example, in a typical Flutter app, the Flutter UI is composed on a dedicated
raster thread. This allows Flutter apps to be fast, as this thread is rarely
blocked.

例如，在典型的 Flutter 应用中，Flutter UI 在专用光栅线程上合成，该线程很少阻塞，因此应用能保持较快响应。

When a platform view is rendered with hybrid composition, the Flutter UI
continues to be composed from the dedicated raster thread, but the platform view
performs graphics operations on the platform thread. To rasterize the combined
contents, Flutter performs synchronization between its raster thread and the
platform thread. As such, any slow or blocking operations on the platform thread
can negatively impact Flutter graphics performance.

使用混合合成渲染平台视图时，Flutter UI 仍由专用光栅线程合成，但平台视图在平台线程上执行图形操作。为光栅化合并内容，Flutter 会在光栅线程与平台线程之间同步；因此平台线程上的缓慢或阻塞操作会影响 Flutter 图形性能。
