---
# title: UIScene adoption
title: 采用 UIScene
# description: >-
#   Learn how to migrate your Flutter iOS app, add-to-app integration, or plugin
#   to Apple's required UIScene lifecycle.
description: >-
  了解如何将 Flutter iOS 应用、add-to-app 集成或插件
  迁移到 Apple 要求的 UIScene 生命周期。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

:::important
As of the Flutter 3.41 release,
`UIScene` support is the default for iOS apps, and
eligible apps are migrated automatically.

自 Flutter 3.41 发布起，
iOS 应用默认支持 `UIScene`，
符合条件的应用会自动完成迁移。
:::

## Summary

## 概要

Apple now requires iOS developers to adopt the `UIScene` lifecycle.
This migration has implications for the
[app launch sequence][] and [app lifecycle][].

Apple 现在要求 iOS 开发者采用 `UIScene` 生命周期。
这次迁移会影响 [应用启动序列][app launch sequence] 和 [应用生命周期][app lifecycle]。

[app launch sequence]: {{site.apple-dev}}/documentation/uikit/about-the-app-launch-sequence
[app lifecycle]: {{site.apple-dev}}/documentation/uikit/managing-your-app-s-life-cycle

## Background

## 背景

During WWDC25, Apple [announced][uiscene-announcement] the following:

在 WWDC25 上，Apple [宣布][uiscene-announcement] 了下面的内容：

> In the release following iOS 26, any UIKit app built with the latest SDK will
> be required to use the UIScene life cycle, otherwise it will not launch.
>
> 在 iOS 26 之后的版本中，使用最新 SDK 构建的任何 UIKit 应用
> 都必须使用 UIScene 生命周期，否则将无法启动。

To adopt the `UIScene` lifecycle,
follow the guide that corresponds to your use case:

要采用 `UIScene` 生命周期，请按你的使用场景选择对应指南：

* For all Flutter apps that support iOS,
  follow the [migration guide for Flutter apps][].

  对于所有支持 iOS 的 Flutter 应用，
  请遵循 [Flutter 应用迁移指南][migration guide for Flutter apps]。

* For Flutter apps embedded in existing native iOS apps,
  follow the [migration guide for add-to-app][].

  对于嵌入现有原生 iOS 应用的 Flutter 应用，
  请遵循 [add-to-app 迁移指南][migration guide for add-to-app]。

* For Flutter plugins that use iOS application lifecycle events,
  follow the [migration guide for Flutter plugins][].

  对于使用 iOS 应用生命周期事件的 Flutter 插件，
  请遵循 [Flutter 插件迁移指南][migration guide for Flutter plugins]。


Migrating to `UIScene` shifts the role of the `AppDelegate`:
the `UISceneDelegate` now handles the UI lifecycle,
while the `AppDelegate` remains responsible for
process events and the overall application lifecycle.

迁移到 `UIScene` 会改变 `AppDelegate` 的职责：
现在由 `UISceneDelegate` 处理 UI 生命周期，
`AppDelegate` 仍然负责进程事件和整个应用的生命周期。

Move all UI-related logic from the `AppDelegate` to the
corresponding `UISceneDelegate` methods.
After you migrate to `UIScene`, UIKit no longer
calls `AppDelegate` methods related to UI state.

把所有与 UI 相关的逻辑从 `AppDelegate`
移到对应的 `UISceneDelegate` 方法。
迁移到 `UIScene` 之后，UIKit 不再调用
与 UI 状态相关的 `AppDelegate` 方法。

[uiscene-announcement]: {{site.apple-dev}}/videos/play/wwdc2025/243/?time=1317
[migration guide for Flutter apps]: #migrate-a-flutter-app
[migration guide for add-to-app]: #migrate-an-add-to-app-integration
[migration guide for Flutter plugins]: #migrate-a-flutter-plugin

<a id="migration-guide-for-flutter-apps" aria-hidden="true"></a>

## Migrate a Flutter app

## 迁移 Flutter 应用

### Auto-migrate

### 自动迁移

As of Flutter 3.41, `UIScene` is supported by default.
If your `AppDelegate` hasn't been customized,
the Flutter CLI automatically migrates your app.

从 Flutter 3.41 起，默认支持 `UIScene`。
如果 `AppDelegate` 没有被自定义过，
Flutter CLI 会自动迁移你的应用。

To trigger the migration, build or run your app with
the `flutter run` or `flutter build ios` commands.
If the migration succeeds,
the CLI outputs `Finished migration to UIScene lifecycle` and
no further action is required.
Otherwise, the CLI warns you and
provides instructions to migrate manually.

要触发迁移，请用 `flutter run` 或 `flutter build ios` 命令
构建或运行应用。
如果迁移成功，CLI 会输出 `Finished migration to UIScene lifecycle`，
无需进一步操作。
否则，CLI 会发出警告，并给出手动迁移的说明。

### Migrate AppDelegate

### 迁移 AppDelegate

Previously, Flutter plugins were registered in
`application:didFinishLaunchingWithOptions:`.
To accommodate the new app launch sequence,
you must now register plugins in a
new `didInitializeImplicitFlutterEngine` callback.

以前，Flutter 插件在 `application:didFinishLaunchingWithOptions:` 中注册。
为了适应新的应用启动序列，
你现在必须在新的 `didInitializeImplicitFlutterEngine` 回调中注册插件。

 1. Conform your `AppDelegate` to the `FlutterImplicitEngineDelegate`
    protocol and move the `GeneratedPluginRegistrant` registration to
    `didInitializeImplicitFlutterEngine`.

    让 `AppDelegate` 遵循 `FlutterImplicitEngineDelegate` 协议，
    并把 `GeneratedPluginRegistrant` 的注册移到
    `didInitializeImplicitFlutterEngine`。


    <Tabs key="ios-language-switcher">
    <Tab name="Swift">

    ```swift title="my_app/ios/Runner/AppDelegate.swift" diff
    - @objc class AppDelegate: FlutterAppDelegate {
    + @objc class AppDelegate: FlutterAppDelegate, FlutterImplicitEngineDelegate {
        override func application(
          _ application: UIApplication,
          didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
        ) -> Bool {
    -     GeneratedPluginRegistrant.register(with: self)
          return super.application(application, didFinishLaunchingWithOptions: launchOptions)
        }

    +   func didInitializeImplicitFlutterEngine(_ engineBridge: FlutterImplicitEngineBridge) {
    +     GeneratedPluginRegistrant.register(with: engineBridge.pluginRegistry)
    +   }
      }
    ```

    </Tab>
    <Tab name="Objective-C">

    ```objc title="my_app/ios/Runner/AppDelegate.h" diff
    - @interface AppDelegate : FlutterAppDelegate
    + @interface AppDelegate : FlutterAppDelegate <FlutterImplicitEngineDelegate>
    ```

    ```objc title="my_app/ios/Runner/AppDelegate.m" diff
      - (BOOL)application:(UIApplication *)application
          didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    -   [GeneratedPluginRegistrant registerWithRegistry:self];
        return [super application:application didFinishLaunchingWithOptions:launchOptions];
      }

    + - (void)didInitializeImplicitFlutterEngine:(NSObject<FlutterImplicitEngineBridge>*)engineBridge {
    +   [GeneratedPluginRegistrant registerWithRegistry:engineBridge.pluginRegistry];
    + }
    ```

    </Tab>
    </Tabs>

 1. If applicable, create method channels and platform views in
    `didInitializeImplicitFlutterEngine`.

    如果适用，请在 `didInitializeImplicitFlutterEngine` 中
    创建方法通道和平台视图。


    If you previously created [method channels][] or [platform views][]
    in `application:didFinishLaunchingWithOptions:`,
    move that logic to `didInitializeImplicitFlutterEngine`.

    如果你以前在 `application:didFinishLaunchingWithOptions:` 中
    创建过 [方法通道][method channels] 或 [平台视图][platform views]，
    请把那段逻辑移到 `didInitializeImplicitFlutterEngine`。

    <Tabs key="ios-language-switcher">
    <Tab name="Swift">

    ```swift
    func didInitializeImplicitFlutterEngine(_ engineBridge: FlutterImplicitEngineBridge) {
      // Register plugins with `engineBridge.pluginRegistry`:
      GeneratedPluginRegistrant.register(with: engineBridge.pluginRegistry)

      // Create method channels with `engineBridge.applicationRegistrar.messenger()`:
      let batteryChannel = FlutterMethodChannel(
        name: "samples.flutter.dev/battery",
        binaryMessenger: engineBridge.applicationRegistrar.messenger()
      )

      // Create platform views with `engineBridge.applicationRegistrar.messenger()`:
      let factory = FLNativeViewFactory(messenger: engineBridge.applicationRegistrar.messenger())
    }
    ```

    </Tab>
    <Tab name="Objective-C">

    ```objc
    - (void)didInitializeImplicitFlutterEngine:(NSObject<FlutterImplicitEngineBridge>*)engineBridge {
      // Register plugins with `engineBridge.pluginRegistry`:
      [GeneratedPluginRegistrant registerWithRegistry:engineBridge.pluginRegistry];

      // Create method channels with `engineBridge.applicationRegistrar.messenger`:
      FlutterMethodChannel* batteryChannel = [FlutterMethodChannel
          methodChannelWithName:@"samples.flutter.dev/battery"
                binaryMessenger:engineBridge.applicationRegistrar.messenger];

      // Create platform views with `engineBridge.applicationRegistrar.messenger`:
      FLNativeViewFactory* factory =
          [[FLNativeViewFactory alloc] initWithMessenger:engineBridge.applicationRegistrar.messenger];
    }
    ```

    </Tab>
    </Tabs>

    :::warning
    If you try to access the `FlutterViewController` in
    `application:didFinishLaunchingWithOptions:`, your app might crash.
    Use the `FlutterImplicitEngineDelegate` protocol instead.

    如果在 `application:didFinishLaunchingWithOptions:` 中
    访问 `FlutterViewController`，应用可能会崩溃。
    请改用 `FlutterImplicitEngineDelegate` 协议。

    ```swift
    // BAD
    let controller: FlutterViewController = window?.rootViewController as! FlutterViewController
    ```

    To access the `FlutterViewController` directly,
    check out [Bespoke FlutterViewController usage][].

    若要直接访问 `FlutterViewController`，
    请参阅 [自定义 FlutterViewController 用法][Bespoke FlutterViewController usage]。
    :::

 1. Migrate any custom logic within application lifecycle events.

    迁移应用生命周期事件中的任何自定义逻辑。


    Apple has deprecated application lifecycle events related to UI state.
    After you migrate to the `UIScene` lifecycle,
    UIKit no longer calls these events.

    Apple 已弃用与 UI 状态相关的应用生命周期事件。
    迁移到 `UIScene` 生命周期之后，
    UIKit 不再调用这些事件。

    If you used one of these deprecated APIs,
    such as [`applicationDidBecomeActive`][],
    you likely need to create a `SceneDelegate` and
    migrate to scene lifecycle events.
    To learn more, see [Apple's documentation][] on migrating.

    如果你用过这些已弃用的 API，
    例如 [`applicationDidBecomeActive`][`applicationDidBecomeActive`]，
    很可能需要创建 `SceneDelegate`，
    并迁移到场景生命周期事件。
    更多内容见 [Apple 的文档][Apple's documentation]。

    If you implement your own `SceneDelegate`,
    you must subclass `FlutterSceneDelegate` or
    conform to the `FlutterSceneLifeCycleProvider` protocol.
    For examples, see [Create or update a SceneDelegate][].

    如果你实现自己的 `SceneDelegate`，
    必须子类化 `FlutterSceneDelegate`，
    或遵循 `FlutterSceneLifeCycleProvider` 协议。
    示例见 [创建或更新 SceneDelegate][Create or update a SceneDelegate]。

[method channels]: /platform-integration/platform-channels
[platform views]: /platform-integration/ios/platform-views
[Bespoke FlutterViewController usage]: #bespoke-flutterviewcontroller-usage
[`applicationDidBecomeActive`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/applicationdidbecomeactive
[Apple's documentation]: {{site.apple-dev}}/documentation/technotes/tn3187-migrating-to-the-uikit-scene-based-life-cycle
[Create or update a SceneDelegate]: #create-or-update-a-scenedelegate

### Migrate Info.plist

### 迁移 Info.plist

To complete the migration to the `UIScene` lifecycle,
add an **Application Scene Manifest** entry to your `Info.plist`.

要完成向 `UIScene` 生命周期的迁移，
请在 `Info.plist` 中添加 **Application Scene Manifest** 条目。

As shown in Xcode's editor:

如 Xcode 编辑器中所示：

![Xcode plist editor for UIApplicationSceneManifest](/assets/images/docs/breaking-changes/uiscenedelegate-plist.png)

As XML:

对应的 XML：

```xml title="Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "https://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>UIApplicationSceneManifest</key>
  <dict>
    <key>UIApplicationSupportsMultipleScenes</key>
    <false/>
    <key>UISceneConfigurations</key>
    <dict>
      <key>UIWindowSceneSessionRoleApplication</key>
      <array>
        <dict>
          <key>UISceneClassName</key>
          <string>UIWindowScene</string>
          <key>UISceneDelegateClassName</key>
          <string>FlutterSceneDelegate</string>
          <key>UISceneConfigurationName</key>
          <string>flutter</string>
          <key>UISceneStoryboardFile</key>
          <string>Main</string>
        </dict>
      </array>
    </dict>
  </dict>
</dict>
</plist>
```

### Create a SceneDelegate (optional)

### 创建 SceneDelegate（可选）

If you need access to the `SceneDelegate`,
you can create one by subclassing `FlutterSceneDelegate`:

如果需要访问 `SceneDelegate`，
可以子类化 `FlutterSceneDelegate` 来创建一个：

 1. Open your app in Xcode.

    在 Xcode 中打开你的应用。


 1. Right-click the **Runner** folder, then select **New Empty File**.

    右键点击 **Runner** 文件夹，然后选择 **New Empty File**。


    ![New Empty File option in Xcode](/assets/images/docs/breaking-changes/uiscene-new-file.png)

 1. Create your `SceneDelegate` class.

    创建你的 `SceneDelegate` 类。


    <Tabs key="ios-language-switcher">
    <Tab name="Swift">

    For Swift projects,
    create a `SceneDelegate.swift` file:

    对于 Swift 项目，
    创建 `SceneDelegate.swift` 文件：

    ```swift title="my_app/ios/Runner/SceneDelegate.swift"
    import Flutter
    import UIKit

    class SceneDelegate: FlutterSceneDelegate {}
    ```

    </Tab>
    <Tab name="Objective-C">

    For Objective-C projects,
    create a `SceneDelegate.h` and a `SceneDelegate.m` file:

    对于 Objective-C 项目，
    创建 `SceneDelegate.h` 和 `SceneDelegate.m` 文件：

    ```objc title="my_app/ios/Runner/SceneDelegate.h"
    #import <Flutter/Flutter.h>
    #import <UIKit/UIKit.h>

    @interface SceneDelegate : FlutterSceneDelegate

    @end
    ```

    ```objc title="my_app/ios/Runner/SceneDelegate.m"
    #import "SceneDelegate.h"

    @implementation SceneDelegate

    @end
    ```

    </Tab>
    </Tabs>

 1. In your `Info.plist` file,
    change the **Delegate Class Name** (`UISceneDelegateClassName`) value
    from `FlutterSceneDelegate` to your new class.

    在 `Info.plist` 文件中，
    把 **Delegate Class Name**（`UISceneDelegateClassName`）的值
    从 `FlutterSceneDelegate` 改成你的新类。


    <Tabs key="ios-language-switcher">
    <Tab name="Swift">

    For Swift projects, use `$(PRODUCT_MODULE_NAME).SceneDelegate`:

    对于 Swift 项目，使用 `$(PRODUCT_MODULE_NAME).SceneDelegate`：

    ```xml title="Info.plist" highlightLines=10-11
    <key>UIApplicationSceneManifest</key>
    <dict>
      <!-- ... -->
      <key>UISceneConfigurations</key>
      <dict>
        <key>UIWindowSceneSessionRoleApplication</key>
        <array>
          <dict>
            <!-- ... -->
            <key>UISceneDelegateClassName</key>
            <string>$(PRODUCT_MODULE_NAME).SceneDelegate</string>
            <!-- ... -->
          </dict>
        </array>
      </dict>
    </dict>
    ```

    </Tab>
    <Tab name="Objective-C">

    For Objective-C projects, use `SceneDelegate`:

    对于 Objective-C 项目，使用 `SceneDelegate`：

    ```xml title="Info.plist" highlightLines=10-11
    <key>UIApplicationSceneManifest</key>
    <dict>
      <!-- ... -->
      <key>UISceneConfigurations</key>
      <dict>
        <key>UIWindowSceneSessionRoleApplication</key>
        <array>
          <dict>
            <!-- ... -->
            <key>UISceneDelegateClassName</key>
            <string>SceneDelegate</string>
            <!-- ... -->
          </dict>
        </array>
      </dict>
    </dict>
    ```

    </Tab>
    </Tabs>

<a id="migration-guide-for-adding-flutter-to-existing-app-add-to-app" aria-hidden="true"></a>

## Migrate an add-to-app integration

## 迁移 add-to-app 集成

Similar to the `FlutterAppDelegate`,
the `FlutterSceneDelegate` is recommended but not required.
The `FlutterSceneDelegate` forwards scene callbacks,
such as [`openURL`][], to plugins such as [`local_auth`][].

与 `FlutterAppDelegate` 类似，
建议使用 `FlutterSceneDelegate`，但它不是必需的。
`FlutterSceneDelegate` 会把场景回调
（例如 [`openURL`][`openURL`]）转发给 [`local_auth`][`local_auth`] 等插件。

[`openURL`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/1623112-application
[`local_auth`]: {{site.pub}}/packages/local_auth

<a id="createupdate-a-scenedelegate" aria-hidden="true"></a>

### Create or update a SceneDelegate

### 创建或更新 SceneDelegate

<Tabs key="ios-framework-switcher">
<Tab name="UIKit-Swift">

```swift diff
  import UIKit
+ import Flutter

- class SceneDelegate: UIResponder, UIWindowSceneDelegate {
+ class SceneDelegate: FlutterSceneDelegate {
```

</Tab>
<Tab name="UIKit-ObjC">

```objc diff
- @interface SceneDelegate : UIResponder <UIWindowSceneDelegate>
+ @interface SceneDelegate : FlutterSceneDelegate
```

</Tab>
<Tab name="SwiftUI">

When using Flutter in a SwiftUI app,
you can [optionally use a `FlutterAppDelegate`][flutter-app-delegate]
to receive application events.
To migrate it to receive `UIScene` events, 
make the following changes:

在 SwiftUI 应用中使用 Flutter 时，
你可以 [选择使用 `FlutterAppDelegate`][flutter-app-delegate]
来接收应用事件。
要把它迁移为接收 `UIScene` 事件，
请做下列修改：

 1. Set the scene delegate to `FlutterSceneDelegate` in
    `application:configurationForConnecting:options:`:

    在 `application:configurationForConnecting:options:` 中
    把 scene delegate 设为 `FlutterSceneDelegate`：


    ```swift diff
      @Observable
      class AppDelegate: FlutterAppDelegate {
        ...
    +   override func application(
    +     _ application: UIApplication,
    +     configurationForConnecting connectingSceneSession: UISceneSession,
    +     options: UIScene.ConnectionOptions
    +   ) -> UISceneConfiguration {
    +     let configuration = UISceneConfiguration(
    +       name: nil,
    +       sessionRole: connectingSceneSession.role
    +     )
    +     configuration.delegateClass = FlutterSceneDelegate.self
    +     return configuration
    +   }
      }
    ```

 1. If your app doesn't support multiple scenes,
    set **Enable Multiple Scenes** to **NO** under
    **Application Scene Manifest** in your target's Info properties.
    Multiple-scene support is enabled by default for SwiftUI apps.

    如果应用不支持多个场景，
    请在 target 的 Info 属性里，
    把 **Application Scene Manifest** 下的
    **Enable Multiple Scenes** 设为 **NO**。
    SwiftUI 应用默认启用多场景支持。


    ![Xcode plist editor for UIApplicationSceneManifest](/assets/images/docs/breaking-changes/uiscenedelegate-swiftui-info-plist.png)

    If your app does support multiple scenes,
    see [If your app supports multiple scenes][] for further instructions.

    如果应用确实支持多个场景，
    请参阅 [如果应用支持多个场景][If your app supports multiple scenes] 中的进一步说明。

</Tab>
</Tabs>

[flutter-app-delegate]: /add-to-app/ios/add-flutter-screen#using-the-flutterappdelegate
[If your app supports multiple scenes]: #if-your-app-supports-multiple-scenes

<a id="if-you-cant-directly-make-flutterscenedelegate-a-subclass" aria-hidden="true"></a>

### If you can't subclass FlutterSceneDelegate

### 如果无法子类化 FlutterSceneDelegate

If you can't subclass `FlutterSceneDelegate`,
use the `FlutterSceneLifeCycleProvider` protocol and a
`FlutterPluginSceneLifeCycleDelegate` object to
forward scene lifecycle events to Flutter.

如果无法子类化 `FlutterSceneDelegate`，
请使用 `FlutterSceneLifeCycleProvider` 协议
和 `FlutterPluginSceneLifeCycleDelegate` 对象，
把场景生命周期事件转发给 Flutter。

<Tabs key="ios-language-switcher">
<Tab name="Swift">

```swift title="SceneDelegate.swift" diff
  import Flutter
  import UIKit

- class SceneDelegate: UIResponder, UIWindowSceneDelegate
+ class SceneDelegate: UIResponder, UIWindowSceneDelegate, FlutterSceneLifeCycleProvider
  {
+   var sceneLifeCycleDelegate: FlutterPluginSceneLifeCycleDelegate =
+     FlutterPluginSceneLifeCycleDelegate()

    var window: UIWindow?

    func scene(
      _ scene: UIScene,
      willConnectTo session: UISceneSession,
      options connectionOptions: UIScene.ConnectionOptions
    ) {
+     sceneLifeCycleDelegate.scene(
+       scene,
+       willConnectTo: session,
+       options: connectionOptions
+     )
    }

    func sceneDidDisconnect(_ scene: UIScene) {
+     sceneLifeCycleDelegate.sceneDidDisconnect(scene)
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
+     sceneLifeCycleDelegate.sceneWillEnterForeground(scene)
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
+     sceneLifeCycleDelegate.sceneDidBecomeActive(scene)
    }

    func sceneWillResignActive(_ scene: UIScene) {
+     sceneLifeCycleDelegate.sceneWillResignActive(scene)
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
+     sceneLifeCycleDelegate.sceneDidEnterBackground(scene)
    }

    func scene(
      _ scene: UIScene,
      openURLContexts URLContexts: Set<UIOpenURLContext>
    ) {
+     sceneLifeCycleDelegate.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
+     sceneLifeCycleDelegate.scene(scene, continue: userActivity)
    }

    func windowScene(
      _ windowScene: UIWindowScene,
      performActionFor shortcutItem: UIApplicationShortcutItem,
      completionHandler: @escaping (Bool) -> Void
    ) {
+     sceneLifeCycleDelegate.windowScene(
+       windowScene,
+       performActionFor: shortcutItem,
+       completionHandler: completionHandler
+     )
    }
  }
```

</Tab>
<Tab name="Objective-C">

```objc title="SceneDelegate.h" diff
- @interface SceneDelegate : UIResponder <UIWindowSceneDelegate>
+ @interface SceneDelegate : UIResponder <UIWindowSceneDelegate, FlutterSceneLifeCycleProvider>

  @property(strong, nonatomic) UIWindow* window;

+ @property(nonatomic, strong) FlutterPluginSceneLifeCycleDelegate* sceneLifeCycleDelegate;

  @end
```

```objc title="SceneDelegate.m" diff
  @implementation SceneDelegate

  - (instancetype)init {
    if (self = [super init]) {
+     _sceneLifeCycleDelegate = [[FlutterPluginSceneLifeCycleDelegate alloc] init];
    }
    return self;
  }

  - (void)scene:(UIScene*)scene
      willConnectToSession:(UISceneSession*)session
                  options:(UISceneConnectionOptions*)connectionOptions {
+   [self.sceneLifeCycleDelegate scene:scene willConnectToSession:session options:connectionOptions];
  }

  - (void)sceneDidDisconnect:(UIScene*)scene {
+   [self.sceneLifeCycleDelegate sceneDidDisconnect:scene];
  }

  - (void)sceneDidBecomeActive:(UIScene*)scene {
+   [self.sceneLifeCycleDelegate sceneDidBecomeActive:scene];
  }

  - (void)sceneWillResignActive:(UIScene*)scene {
+   [self.sceneLifeCycleDelegate sceneWillResignActive:scene];
  }

  - (void)sceneWillEnterForeground:(UIScene*)scene {
+   [self.sceneLifeCycleDelegate sceneWillEnterForeground:scene];
  }

  - (void)sceneDidEnterBackground:(UIScene*)scene {
+   [self.sceneLifeCycleDelegate sceneDidEnterBackground:scene];
  }

  - (void)scene:(UIScene*)scene openURLContexts:(NSSet<UIOpenURLContext*>*)URLContexts {
+   [self.sceneLifeCycleDelegate scene:scene openURLContexts:URLContexts];
  }

  - (void)scene:(UIScene*)scene continueUserActivity:(NSUserActivity*)userActivity {
+   [self.sceneLifeCycleDelegate scene:scene continueUserActivity:userActivity];
  }

  - (void)windowScene:(UIWindowScene*)windowScene
      performActionForShortcutItem:(UIApplicationShortcutItem*)shortcutItem
                 completionHandler:(void (^)(BOOL))completionHandler {
+   [self.sceneLifeCycleDelegate windowScene:windowScene
+             performActionForShortcutItem:shortcutItem completionHandler:completionHandler];
  }
```

</Tab>
</Tabs>

### If your app supports multiple scenes

### 如果应用支持多个场景

Flutter doesn't fully support multiple scenes yet,
but support is in progress.

Flutter 尚未完全支持多个场景，
但相关支持正在进行中。

<a id="migration-guide-for-flutter-plugins" aria-hidden="true"></a>

## Migrate a Flutter plugin

## 迁移 Flutter 插件

Not all plugins use lifecycle events.
However, if your plugin does,
migrate it to UIKit's scene-based lifecycle as follows:

并非所有插件都会使用生命周期事件。
如果你的插件会用到，
请按下面的步骤迁移到 UIKit 基于场景的生命周期：

 1. Update the Dart and Flutter SDK versions in your `pubspec.yaml`.

    更新 `pubspec.yaml` 中的 Dart 和 Flutter SDK 版本。


    The APIs required for this migration are available
    starting in Flutter 3.38:

    这次迁移所需的 API 从 Flutter 3.38 开始提供：

    ```yaml title="pubspec.yaml"
    environment:
      sdk: ^3.10.0
      flutter: ">=3.38.0"
    ```

 1. Adopt the `FlutterSceneLifeCycleDelegate` protocol.

    采用 `FlutterSceneLifeCycleDelegate` 协议。


    <Tabs key="ios-language-switcher">
    <Tab name="Swift">

    ```swift diff
    - public final class MyPlugin: NSObject, FlutterPlugin {
    + public final class MyPlugin: NSObject, FlutterPlugin, FlutterSceneLifeCycleDelegate {
    ```

    </Tab>
    <Tab name="Objective-C">

    ```objc diff
    - @interface MyPlugin : NSObject<FlutterPlugin>
    + @interface MyPlugin : NSObject<FlutterPlugin, FlutterSceneLifeCycleDelegate>
    ```

    </Tab>
    </Tabs>

 1. Register the plugin as a receiver of `UISceneDelegate` calls.

    把插件注册为 `UISceneDelegate` 调用的接收者。


    To continue supporting apps that haven't yet
    migrated to the `UIScene` lifecycle,
    consider remaining registered to the application delegate and
    keeping the `AppDelegate` events as well.

    为了继续支持尚未迁移到 `UIScene` 生命周期的应用，
    可以仍然注册到 application delegate，
    并保留 `AppDelegate` 事件。

    <Tabs key="ios-language-switcher">
    <Tab name="Swift">

    ```swift diff
      public static func register(with registrar: FlutterPluginRegistrar) {
        ...
        registrar.addApplicationDelegate(instance)
    +   registrar.addSceneDelegate(instance)
      }
    ```

    </Tab>
    <Tab name="Objective-C">

    ```objc diff
      + (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar> *)registrar {
        ...
        [registrar addApplicationDelegate:instance];
    +   [registrar addSceneDelegate:instance];
      }
    ```

    </Tab>
    </Tabs>

 1. Add the scene events that your plugin needs.

    添加插件需要的场景事件。


    Most `AppDelegate` UI events have a one-to-one replacement,
    as shown in the following table.
    For details about each event, visit Apple's documentation for
    [`UISceneDelegate`][] and [`UIWindowSceneDelegate`][].

    大多数 `AppDelegate` 的 UI 事件都有一一对应的替换，
    如下表所示。
    每个事件的细节请查阅 Apple 关于
    [`UISceneDelegate`][`UISceneDelegate`]
    和 [`UIWindowSceneDelegate`][`UIWindowSceneDelegate`] 的文档。

    | <t>App delegate method</t><t>App delegate 方法</t> | <t>Scene delegate equivalent</t><t>对应的 Scene delegate 方法</t> |
    |:------------------------------------------------------------------|:------------------------------------------------------------------|
    | [`applicationDidBecomeActive`][]                                  | [`sceneDidBecomeActive`][]                                        |
    | [`applicationDidBecomeActive`][]                                  | [`sceneDidBecomeActive`][]                                        |
    | [`applicationWillResignActive`][]                                 | [`sceneWillResignActive`][]                                       |
    | [`applicationWillResignActive`][]                                 | [`sceneWillResignActive`][]                                       |
    | [`applicationWillEnterForeground`][]                              | [`sceneWillEnterForeground`][]                                    |
    | [`applicationWillEnterForeground`][]                              | [`sceneWillEnterForeground`][]                                    |
    | [`applicationDidEnterBackground`][]                               | [`sceneDidEnterBackground`][]                                     |
    | [`applicationDidEnterBackground`][]                               | [`sceneDidEnterBackground`][]                                     |
    | [`application:continueUserActivity:restorationHandler:`][]        | [`scene:continueUserActivity:`][]                                 |
    | [`application:continueUserActivity:restorationHandler:`][]        | [`scene:continueUserActivity:`][]                                 |
    | [`application:performActionForShortcutItem:completionHandler:`][] | [`windowScene:performActionForShortcutItem:completionHandler:`][] |
    | [`application:performActionForShortcutItem:completionHandler:`][] | [`windowScene:performActionForShortcutItem:completionHandler:`][] |
    | [`application:openURL:options:`][]                                | [`scene:openURLContexts:`][]                                      |
    | [`application:openURL:options:`][]                                | [`scene:openURLContexts:`][]                                      |
    | [`application:willFinishLaunchingWithOptions:`][]                 | [`scene:willConnectToSession:options:`][]                         |
    | [`application:willFinishLaunchingWithOptions:`][]                 | [`scene:willConnectToSession:options:`][]                         |
    | [`application:didFinishLaunchingWithOptions:`][]                  | [`scene:willConnectToSession:options:`][]                         |
    | [`application:didFinishLaunchingWithOptions:`][]                  | [`scene:willConnectToSession:options:`][]                         |

    {:.table}

    Once you identify the scene events that replace the
    application events your plugin relied on,
    implement the corresponding `FlutterSceneLifeCycleDelegate` methods.
    The following snippets show the signature of each
    scene event that `FlutterSceneLifeCycleDelegate` supports;
    implement only the ones your plugin needs.

    确定哪些场景事件替换了插件所依赖的应用事件之后，
    实现对应的 `FlutterSceneLifeCycleDelegate` 方法。
    下面的代码片段给出了 `FlutterSceneLifeCycleDelegate` 支持的
    每个场景事件的签名；
    只实现插件需要的那些即可。

    <Tabs key="ios-language-switcher">
    <Tab name="Swift">

    ```swift
    public func scene(
      _ scene: UIScene,
      willConnectTo session: UISceneSession,
      options connectionOptions: UIScene.ConnectionOptions?
    ) -> Bool { }

    public func sceneDidDisconnect(_ scene: UIScene) { }

    public func sceneWillEnterForeground(_ scene: UIScene) { }

    public func sceneDidBecomeActive(_ scene: UIScene) { }

    public func sceneWillResignActive(_ scene: UIScene) { }

    public func sceneDidEnterBackground(_ scene: UIScene) { }

    public func scene(
      _ scene: UIScene,
      openURLContexts URLContexts: Set<UIOpenURLContext>
    ) -> Bool { }

    public func scene(
      _ scene: UIScene,
      continue userActivity: NSUserActivity
    ) -> Bool { }

    public func windowScene(
      _ windowScene: UIWindowScene,
      performActionFor shortcutItem: UIApplicationShortcutItem,
      completionHandler: @escaping (Bool) -> Void
    ) -> Bool { }
    ```

    </Tab>
    <Tab name="Objective-C">

    ```objc
    - (BOOL)scene:(UIScene*)scene
        willConnectToSession:(UISceneSession*)session
                     options:(nullable UISceneConnectionOptions*)connectionOptions { }

    - (void)sceneDidDisconnect:(UIScene*)scene { }

    - (void)sceneWillEnterForeground:(UIScene*)scene { }

    - (void)sceneDidBecomeActive:(UIScene*)scene { }

    - (void)sceneWillResignActive:(UIScene*)scene { }

    - (void)sceneDidEnterBackground:(UIScene*)scene { }

    - (BOOL)scene:(UIScene*)scene openURLContexts:(NSSet<UIOpenURLContext*>*)URLContexts { }

    - (BOOL)scene:(UIScene*)scene continueUserActivity:(NSUserActivity*)userActivity { }

    - (BOOL)windowScene:(UIWindowScene*)windowScene
        performActionForShortcutItem:(UIApplicationShortcutItem*)shortcutItem
                   completionHandler:(void (^)(BOOL succeeded))completionHandler { }
    ```

    </Tab>
    </Tabs>

 1. Move launch logic from `application:willFinishLaunchingWithOptions:`
    and `application:didFinishLaunchingWithOptions:` to
    `scene:willConnectToSession:options:`.

    把启动逻辑从 `application:willFinishLaunchingWithOptions:`
    和 `application:didFinishLaunchingWithOptions:`
    移到 `scene:willConnectToSession:options:`。


    Although `application:willFinishLaunchingWithOptions:` and
    `application:didFinishLaunchingWithOptions:` aren't deprecated,
    their launch options are `nil` after you migrate to the `UIScene` lifecycle.
    Move any logic that relies on the launch options to the
    `scene:willConnectToSession:options:` event.

    虽然 `application:willFinishLaunchingWithOptions:` 和
    `application:didFinishLaunchingWithOptions:` 并未弃用，
    但迁移到 `UIScene` 生命周期之后，它们的启动选项为 `nil`。
    请把依赖启动选项的逻辑移到
    `scene:willConnectToSession:options:` 事件。

 1. If your plugin uses an API that must be called before
    `application:didFinishLaunchingWithOptions:` completes,
    you should expose a public method that app developers
    can call directly in their AppDelegate.

    如果插件使用的 API 必须在
    `application:didFinishLaunchingWithOptions:` 完成之前调用，
    你应该暴露一个公开方法，
    让应用开发者在自己的 AppDelegate 里直接调用。


    The following Apple APIs must be configured before app launch finishes:

    下列 Apple API 必须在应用启动完成之前配置：

    - [`BGTaskScheduler.registerForTaskWithIdentifier:usingQueue:launchHandler:`][]

      [`BGTaskScheduler.registerForTaskWithIdentifier:usingQueue:launchHandler:`][`BGTaskScheduler.registerForTaskWithIdentifier:usingQueue:launchHandler:`]

    - [`UNUserNotificationCenterDelegate`][]

      [`UNUserNotificationCenterDelegate`][`UNUserNotificationCenterDelegate`]

    - [`HKHealthStore.enableBackgroundDeliveryForType:frequency:withCompletion:`][]

      [`HKHealthStore.enableBackgroundDeliveryForType:frequency:withCompletion:`][`HKHealthStore.enableBackgroundDeliveryForType:frequency:withCompletion:`]


    For example, to support `BGTaskScheduler`:

    例如，要支持 `BGTaskScheduler`：

    <Tabs key="ios-language-switcher">
    <Tab name="Swift">

    ```swift diff
      // Plugin

      public class BGTaskPlugin: NSObject, FlutterPlugin {
        public static let shared =  BGTaskPlugin()
        public static func register(with registrar: FlutterPluginRegistrar) {
          let channel = ...
          registrar.addMethodCallDelegate(shared, channel: channel)
          registrar.addApplicationDelegate(shared)
        }
    +   // A new API for apps to call in their `AppDelegate`'s `application:didFinishLaunchingWithOptions:`
    +   public func registerBackgroundHandler(identifier: String) {
    +     BGTaskScheduler.register(forTaskWithIdentifier: identifier, using: .main) { task in
    +       // Handle background task execution
    +     }
    +   }
    -   public func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [AnyHashable : Any] = [:]) -> Bool {
    -     BGTaskScheduler.register(forTaskWithIdentifier: identifier, using: .main) { task in
    -       // Handle background task execution
    -     }
    -     return true
    -   }
      }

      // App

      class AppDelegate: FlutterAppDelegate {
        override func application(
          _ application: UIApplication,
          didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
        ) -> Bool {
    +     BGTaskPlugin.shared.registerBackgroundHandler(identifier: "com.example.task")
          return super.application(application, didFinishLaunchingWithOptions: launchOptions)
        }
      }
    ```

    </Tab>
    <Tab name="Objective-C">

    ```objc diff
      // Plugin

      @interface BGTaskPlugin : NSObject <FlutterPlugin>
    + + (instancetype)sharedInstance;
    + - (void)registerBackgroundHandlerWithIdentifier:(NSString *)identifier;
      @end

      @implementation BGTaskPlugin

    + + (instancetype)sharedInstance {
    +   static BGTaskPlugin *sharedInstance = nil;
    +   static dispatch_once_t onceToken;
    +   dispatch_once(&onceToken, ^{
    +     sharedInstance = [[BGTaskPlugin alloc] init];
    +   });
    +   return sharedInstance;
    + }

      + (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar> *)registrar {
        FlutterMethodChannel *channel = ...
        [registrar addMethodCallDelegate:[BGTaskPlugin sharedInstance] channel:channel];
        [registrar addApplicationDelegate:[BGTaskPlugin sharedInstance]];
      }

    + // A new API for apps to call in their `AppDelegate`'s `application:didFinishLaunchingWithOptions:`
    + - (void)registerBackgroundHandlerWithIdentifier:(NSString *)identifier {
    +   [[BGTaskScheduler sharedScheduler] registerForTaskWithIdentifier:identifier
    +                                                         usingQueue:dispatch_get_main_queue()
    +                                                      launchHandler:^(BGTask *task) {
    +     // Handle background task execution
    +   }];
    + }

    - - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    -   [[BGTaskScheduler sharedScheduler] registerForTaskWithIdentifier:identifier
    -                                                         usingQueue:dispatch_get_main_queue()
    -                                                      launchHandler:^(BGTask *task) {
    -     // Handle background task execution
    -   }];
    -   return YES;
    - }
      @end

      // App

      @implementation AppDelegate
      - (BOOL)application:(UIApplication *)application
          didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    +   [[BGTaskPlugin sharedInstance] registerBackgroundHandlerWithIdentifier:@"com.example.task"];
        return [super application:application didFinishLaunchingWithOptions:launchOptions];
      }
      @end
    ```

    </Tab>
    </Tabs>

    This change is required due to UIScene changing the app launch
    sequence. For apps that adopt `UIScene`, Flutter calls
    plugin's `application:willFinishLaunchingWithOptions:` and
    `application:didFinishLaunchingWithOptions:` during the
    `scene:willConnectToSession:options:` callback, after UIKit's 
    `application:didFinishLaunchingWithOptions:` returns. 

    之所以必须这样改，是因为 UIScene 改变了应用的启动序列。
    对于采用 `UIScene` 的应用，Flutter 会在
    `scene:willConnectToSession:options:` 回调期间
    调用插件的 `application:willFinishLaunchingWithOptions:` 和
    `application:didFinishLaunchingWithOptions:`，
    而此时 UIKit 的 `application:didFinishLaunchingWithOptions:` 已经返回。

    Plugin registration methods are also deferred until after UIKit's 
    `application:didFinishLaunchingWithOptions:` returns.

    插件注册方法也会推迟到 UIKit 的
    `application:didFinishLaunchingWithOptions:` 返回之后。

 1. Migrate other deprecated APIs to properly
    access the `viewController`, `screen`, or `window`.

    迁移其他已弃用的 API，
    以便正确访问 `viewController`、`screen` 或 `window`。


    | <t>Deprecated API</t><t>已弃用的 API</t> | <t>UIScene replacement</t><t>UIScene 替换项</t> |
    |:-----------------------------------|:------------------------------|
    | [`UIScreen mainScreen`][]          | [`UIWindowScene screen`][]    |
    | [`UIScreen mainScreen`][]          | [`UIWindowScene screen`][]    |
    | [`UIApplication keyWindow`][]      | [`UIWindowScene keyWindow`][] |
    | [`UIApplication keyWindow`][]      | [`UIWindowScene keyWindow`][] |
    | [`UIApplication windows`][]        | [`UIWindowScene windows`][]   |
    | [`UIApplication windows`][]        | [`UIWindowScene windows`][]   |
    | [`UIApplicationDelegate window`][] | [`UIView window`][]           |
    | [`UIApplicationDelegate window`][] | [`UIView window`][]           |

    {:.table}

    Because `UIApplication.shared.delegate.window` is `nil`
    after adopting `UIScene`,
    you should access the `viewController`
    via the plugin registrar's `viewController` property
    and retrieve the window or `windowScene` from there,
    as shown in the following examples.

    采用 `UIScene` 之后，`UIApplication.shared.delegate.window` 为 `nil`，
    因此你应该通过插件 registrar 的 `viewController` 属性访问 `viewController`，
    再从那里取得 window 或 `windowScene`，
    如下面的示例所示。

    <Tabs key="ios-language-switcher">
    <Tab name="Swift">

    ```swift diff
      public class MyPlugin: NSObject, FlutterPlugin {
    +   weak var registrar: FlutterPluginRegistrar?

    +   init(registrar: FlutterPluginRegistrar) {
    +     self.registrar = registrar
    +   }

        public static func register(with registrar: FlutterPluginRegistrar) {
    -     let instance = MyPlugin()
    +     let instance = MyPlugin(registrar: registrar)
        }

        func someMethod() {
    -     let screen = UIScreen.main
    +     let screen = self.registrar?.viewController?.view.window?.windowScene?.screen

    -     let window = UIApplication.shared.delegate?.window
    +     let window = self.registrar?.viewController?.view.window

    -     let keyWindow = UIApplication.shared.keyWindow
    +     if #available(iOS 15.0, *) {
    +       let keyWindow = self.registrar?.viewController?.view.window?.windowScene?.keyWindow
    +     } else {
    +       let keyWindow = self.registrar?.viewController?.view.window?.windowScene?.windows
    +         .filter({ $0.isKeyWindow }).first
    +     }

    -     let windows = UIApplication.shared.windows
    +     let windows = self.registrar?.viewController?.view.window?.windowScene?.windows
        }
      }
    ```

    </Tab>
    <Tab name="Objective-C">

    ```objc diff
      @interface MyPlugin ()
    + @property(nonatomic, weak) NSObject<FlutterPluginRegistrar> *registrar;
    + - (instancetype)initWithRegistrar:(NSObject<FlutterPluginRegistrar> *)registrar;
      @end

      @implementation MyPlugin

    + - (instancetype)initWithRegistrar:(NSObject<FlutterPluginRegistrar> *)registrar {
    +   self = [super init];
    +   if (self) {
    +     _registrar = registrar;
    +   }
    +   return self;
    + }

      + (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar> *)registrar {
    -   MyPlugin *instance = [[MyPlugin alloc] init];
    +   MyPlugin *instance = [[MyPlugin alloc] initWithRegistrar:registrar];
      }

      - (void)someMethod {
    -   UIScreen *screen = [UIScreen mainScreen];
    +   UIScreen *screen = self.registrar.viewController.view.window.windowScene.screen;

    -   UIWindow *window = [UIApplication sharedApplication].delegate.window;
    +   UIWindow *window = self.registrar.viewController.view.window;

    -   UIWindow *keyWindow = [[UIApplication sharedApplication] keyWindow];
    +   if (@available(iOS 15.0, *)) {
    +     UIWindow *keyWindow = self.registrar.viewController.view.window.windowScene.keyWindow;
    +   } else {
    +     for (UIWindow *window in self.registrar.viewController.view.window.windowScene.windows) {
    +       if (window.isKeyWindow) {
    +         UIWindow *keyWindow = window;
    +       }
    +     }
    +   }

    -   NSArray<UIWindow *> *windows = [UIApplication sharedApplication].windows;
    +   NSArray<UIWindow *> *windows = self.registrar.viewController.view.window.windowScene.windows;
      }
    ```

    </Tab>
    </Tabs>

[`UISceneDelegate`]: {{site.apple-dev}}/documentation/uikit/uiscenedelegate
[`UIWindowSceneDelegate`]: {{site.apple-dev}}/documentation/uikit/uiwindowscenedelegate
[`applicationWillResignActive`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/1622950-applicationwillresignactive
[`applicationWillEnterForeground`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/1623076-applicationwillenterforeground
[`applicationDidEnterBackground`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/1622997-applicationdidenterbackground
[`application:continueUserActivity:restorationHandler:`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/1623072-application
[`application:performActionForShortcutItem:completionHandler:`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/application(_:performactionfor:completionhandler:)
[`application:openURL:options:`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/1623112-application
[`application:willFinishLaunchingWithOptions:`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/1623032-application
[`application:didFinishLaunchingWithOptions:`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/1622921-application
[`sceneDidBecomeActive`]: {{site.apple-dev}}/documentation/uikit/uiscenedelegate/3197915-scenedidbecomeactive
[`sceneWillResignActive`]: {{site.apple-dev}}/documentation/uikit/uiscenedelegate/3197919-scenewillresignactive
[`sceneWillEnterForeground`]: {{site.apple-dev}}/documentation/uikit/uiscenedelegate/3197918-scenewillenterforeground
[`sceneDidEnterBackground`]: {{site.apple-dev}}/documentation/uikit/uiscenedelegate/3197917-scenedidenterbackground
[`scene:continueUserActivity:`]: {{site.apple-dev}}/documentation/uikit/uiscenedelegate/scene(_:continue:)
[`windowScene:performActionForShortcutItem:completionHandler:`]: {{site.apple-dev}}/documentation/uikit/uiwindowscenedelegate/3238088-windowscene
[`scene:openURLContexts:`]: {{site.apple-dev}}/documentation/uikit/uiscenedelegate/3238059-scene
[`scene:willConnectToSession:options:`]: {{site.apple-dev}}/documentation/uikit/uiscenedelegate/3197914-scene
[`UIScreen mainScreen`]: {{site.apple-dev}}/documentation/uikit/uiscreen/1617815-mainscreen
[`UIWindowScene screen`]: {{site.apple-dev}}/documentation/uikit/uiwindowscene/screen?language=objc
[`UIApplication keyWindow`]: {{site.apple-dev}}/documentation/uikit/uiapplication/1622924-keywindow
[`UIWindowScene keyWindow`]: {{site.apple-dev}}/documentation/uikit/uiwindowscene/keywindow?language=objc
[`UIApplication windows`]: {{site.apple-dev}}/documentation/uikit/uiapplication/windows
[`UIWindowScene windows`]: {{site.apple-dev}}/documentation/uikit/uiwindowscene/windows?language=objc
[`UIApplicationDelegate window`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/window
[`UIView window`]: {{site.apple-dev}}/documentation/uikit/uiview/window?language=objc
[`BGTaskScheduler.registerForTaskWithIdentifier:usingQueue:launchHandler:`]: <{{site.apple-dev}}/documentation/backgroundtasks/bgtaskscheduler/register(fortaskwithidentifier:using:launchhandler:)?language=objc>
[`UNUserNotificationCenterDelegate`]: {{site.apple-dev}}/documentation/usernotifications/unusernotificationcenterdelegate?language=objc
[`HKHealthStore.enableBackgroundDeliveryForType:frequency:withCompletion:`]: <{{site.apple-dev}}/documentation/healthkit/hkhealthstore/enablebackgrounddelivery(for:frequency:withcompletion:)?language=objc>

## Bespoke FlutterViewController usage

## 自定义 FlutterViewController 用法

If your app instantiates a `FlutterViewController` from
storyboards in `application:didFinishLaunchingWithOptions:` for
reasons other than creating platform channels,
you must accommodate the new initialization order.
To do so, use one of the following migration options:

如果应用在 `application:didFinishLaunchingWithOptions:` 里
从 storyboard 实例化 `FlutterViewController`，
且原因不是创建平台通道，
就必须适应新的初始化顺序。
可以采用下面任一迁移方式：

- Subclass `FlutterViewController` and put the logic in
  the subclass's `awakeFromNib` method.

  子类化 `FlutterViewController`，
  把逻辑放进子类的 `awakeFromNib` 方法。

- Specify a `UISceneDelegate` in the `Info.plist` or
  in the `UIApplicationDelegate`, and
  put the logic in `scene:willConnectToSession:options:`.
  To learn more, check out [Apple's documentation][apple-delegate-docs].

  在 `Info.plist` 或 `UIApplicationDelegate` 中指定 `UISceneDelegate`，
  并把逻辑放进 `scene:willConnectToSession:options:`。
  更多内容请参阅 [Apple 的文档][apple-delegate-docs]。


[apple-delegate-docs]: {{site.apple-dev}}/documentation/uikit/specifying-the-scenes-your-app-supports

### Example

### 示例

```swift
@objc class MyViewController: FlutterViewController {
  override func awakeFromNib() {
    super.awakeFromNib()
    doSomethingWithFlutterViewController(self)
  }
}
```

## Hide migration warning

## 隐藏迁移警告

To hide the Flutter CLI warning about migrating to `UIScene`,
add the following to your `pubspec.yaml`:

要隐藏 Flutter CLI 关于迁移到 `UIScene` 的警告，
请把下面的内容加到 `pubspec.yaml`：

```yaml title="pubspec.yaml" diff
  flutter:
    config:
+     enable-uiscene-migration: false
```

## Temporarily disable UIScene

## 暂时停用 UIScene

To _temporarily_ disable `UIScene` support, add an underscore (`_`)
in front of **Application Scene Manifest** in your `Info.plist`:

要 **暂时** 停用 `UIScene` 支持，请在 `Info.plist` 里
**Application Scene Manifest** 前面加一个下划线（`_`）：

![Xcode plist editor with an underscore in front of Application Scene Manifest](/assets/images/docs/breaking-changes/disable-ui-scene.png)

When you're ready to re-enable `UIScene` support, remove the underscore.

准备重新启用 `UIScene` 支持时，去掉这个下划线。

## Timeline

## 时间线

Landed in version: 3.38.0-0.1.pre<br>
合入版本：3.38.0-0.1.pre<br>
In stable release: 3.38

进入稳定版：3.38

Apple hasn't yet announced when it will enforce the `UIScene` requirement.
Once Apple changes its warning to an assertion,
Flutter apps that haven't adopted the `UIScene` lifecycle will
crash on startup when built with the latest SDK.

Apple 尚未宣布何时强制执行 `UIScene` 要求。
一旦 Apple 把警告改成断言，
尚未采用 `UIScene` 生命周期的 Flutter 应用，
在用最新 SDK 构建时会在启动时崩溃。

## References

## 参考资料

- [Issue 167267][]: The initial reported issue.

  [Issue 167267][Issue 167267]：最初报告的 issue。


[Issue 167267]: {{site.repo.flutter}}/issues/167267
