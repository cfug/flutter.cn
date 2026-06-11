---
# title: Add a Flutter screen to an iOS app
title: 在 iOS 应用中添加 Flutter 页面
# shortTitle: Add a Flutter screen
shortTitle: 添加 Flutter 页面
# description: Learn how to add a single Flutter screen to your existing iOS app.
description: 了解如何在现有 iOS 应用中添加单个 Flutter 页面。
tags: Flutter混合工程,add2app
keywords: iOS,Flutter页面,FlutterEngine
ai-translated: true
---

This guide describes how to add a single Flutter screen to an existing iOS app.

本指南介绍如何在现有 iOS 应用中添加单个 Flutter 页面。

## Start a FlutterEngine and FlutterViewController

## 启动 FlutterEngine 和 FlutterViewController

To launch a Flutter screen from an existing iOS app, you start a
[`FlutterEngine`][] and a [`FlutterViewController`][].

若要从现有 iOS 应用启动 Flutter 页面，
请启动 [`FlutterEngine`][] 和 [`FlutterViewController`][]。

:::note

The `FlutterEngine` serves as a host to the Dart VM and your Flutter runtime,
and the `FlutterViewController` attaches to a `FlutterEngine` to pass
input events into Flutter and to display frames rendered by the
`FlutterEngine`.

`FlutterEngine` 承载 Dart VM 和 Flutter 运行时；
`FlutterViewController` 会附加到 `FlutterEngine`，
以便将输入事件传递给 Flutter，并显示 `FlutterEngine` 渲染出的帧。

:::

The `FlutterEngine` might have the same lifespan as your
`FlutterViewController` or outlive your `FlutterViewController`.

`FlutterEngine` 的生命周期可能与 `FlutterViewController` 相同，
也可能比 `FlutterViewController` 更长。

:::tip

It's generally recommended to pre-warm a long-lived
`FlutterEngine` for your application because:

通常建议为你的应用预热一个长生命周期的 `FlutterEngine`，原因如下：

* The first frame appears faster when showing the `FlutterViewController`.
  
  展示 `FlutterViewController` 时，第一帧会更快出现。

* Your Flutter and Dart state will outlive one `FlutterViewController`.

  你的 Flutter 和 Dart 状态可以比单个 `FlutterViewController` 存活得更久。

* Your application and your plugins can interact with Flutter and your Dart
  logic before showing the UI.

  在展示 UI 之前，你的应用和插件可以与 Flutter 以及 Dart 逻辑交互。

:::

See [Loading sequence and performance][]
for more analysis on the latency and memory
trade-offs of pre-warming an engine.

请参阅 [加载顺序和性能][Loading sequence and performance]，
了解更多关于预热引擎在延迟和内存方面取舍的分析。

### Create a FlutterEngine

### 创建一个 FlutterEngine

Where you create a `FlutterEngine` depends on your host app.

在哪里创建 `FlutterEngine` 取决于你的宿主应用。

<Tabs key="darwin-framework">
<Tab name="SwiftUI">

In this example, we create a `FlutterEngine` object inside a SwiftUI [`Observable`][]
object called `FlutterDependencies`.
Pre-warm the engine by calling `run()`, and then inject this object
into a `ContentView` using the `environment()` view modifier.

在这个例子中，我们会在一个名为 `FlutterDependencies` 的
SwiftUI [`Observable`][] 对象中创建 `FlutterEngine` 对象。
调用 `run()` 预热引擎，然后使用 `environment()` 视图修饰符
将此对象注入 `ContentView`。

```swift title="MyApp.swift"
import SwiftUI
import Flutter
// The following library connects plugins with iOS platform code to this app.
import FlutterPluginRegistrant

@Observable
class FlutterDependencies {
  let flutterEngine = FlutterEngine(name: "my flutter engine")
  init() {
    // Runs the default Dart entrypoint with a default Flutter route.
    flutterEngine.run()
    // Connects plugins with iOS platform code to this app.
    GeneratedPluginRegistrant.register(with: self.flutterEngine);
  }
}

@main
struct MyApp: App {
    // flutterDependencies will be injected through the view environment.
    @State var flutterDependencies = FlutterDependencies()
    var body: some Scene {
      WindowGroup {
        ContentView()
          .environment(flutterDependencies)
      }
    }
}
```

</Tab>
<Tab name="UIKit-Swift">

As an example, we demonstrate creating a
`FlutterEngine`, exposed as a property, on app startup in
the app delegate.

在这个例子中，我们会在应用启动时，在 app delegate 中创建一个
`FlutterEngine`，并将其作为属性暴露。

```swift title="AppDelegate.swift"
import UIKit
import Flutter
// The following library connects plugins with iOS platform code to this app.
import FlutterPluginRegistrant

@UIApplicationMain
class AppDelegate: FlutterAppDelegate { // More on the FlutterAppDelegate.
  lazy var flutterEngine = FlutterEngine(name: "my flutter engine")

  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Runs the default Dart entrypoint with a default Flutter route.
    flutterEngine.run();
    // Connects plugins with iOS platform code to this app.
    GeneratedPluginRegistrant.register(with: self.flutterEngine);
    return super.application(application, didFinishLaunchingWithOptions: launchOptions);
  }
}
```

</Tab>
<Tab name="UIKit-ObjC">

The following example demonstrates creating a `FlutterEngine`,
exposed as a property, on app startup in the app delegate.

下面的示例演示了如何在应用启动时，在 app delegate 中创建一个
`FlutterEngine`，并将其作为属性暴露。

```objc title="AppDelegate.h"
@import UIKit;
@import Flutter;

@interface AppDelegate : FlutterAppDelegate // More on the FlutterAppDelegate below.
@property (nonatomic,strong) FlutterEngine *flutterEngine;
@end
```

```objc title="AppDelegate.m"
// The following library connects plugins with iOS platform code to this app.
#import <FlutterPluginRegistrant/GeneratedPluginRegistrant.h>

#import "AppDelegate.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id> *)launchOptions {
  self.flutterEngine = [[FlutterEngine alloc] initWithName:@"my flutter engine"];
  // Runs the default Dart entrypoint with a default Flutter route.
  [self.flutterEngine run];
  // Connects plugins with iOS platform code to this app.
  [GeneratedPluginRegistrant registerWithRegistry:self.flutterEngine];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

@end
```

</Tab>
</Tabs>

### Show a FlutterViewController with your FlutterEngine

### 使用 FlutterEngine 展示 FlutterViewController

<Tabs key="darwin-framework">
<Tab name="SwiftUI">

The following example shows a generic `ContentView` with a
[`NavigationLink`][] hooked to a flutter screen.
First, create a `FlutterViewControllerRepresentable` to represent the
`FlutterViewController`. The `FlutterViewController` constructor takes
the pre-warmed `FlutterEngine` as an argument, which is injected through
the view environment.

下面的示例展示了一个通用的 `ContentView`，
它通过 [`NavigationLink`][] 连接到 Flutter 页面。
首先，创建一个 `FlutterViewControllerRepresentable` 来表示
`FlutterViewController`。`FlutterViewController` 构造函数接收预热好的
`FlutterEngine` 作为参数，该参数通过视图环境 (view environment) 注入。

```swift title="ContentView.swift"
import SwiftUI
import Flutter

struct FlutterViewControllerRepresentable: UIViewControllerRepresentable {
  // Flutter dependencies are passed in through the view environment.
  @Environment(FlutterDependencies.self) var flutterDependencies

  func makeUIViewController(context: Context) -> some UIViewController {
    return FlutterViewController(
      engine: flutterDependencies.flutterEngine,
      nibName: nil,
      bundle: nil)
  }

  func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) {}
}

struct ContentView: View {
  var body: some View {
    NavigationStack {
      NavigationLink("My Flutter Feature") {
        FlutterViewControllerRepresentable()
      }
    }
  }
}
```

Now, you have a Flutter screen embedded in your iOS app.

现在，你的 iOS 应用中已经嵌入了一个 Flutter 页面。

:::note

In this example, your Dart `main()` entrypoint function runs
when the `FlutterDependencies` observable is initialized.

在本例中，当 `FlutterDependencies` observable 初始化时，
你的 Dart `main()` 入口函数会运行。

:::

</Tab>
<Tab name="UIKit-Swift">

The following example shows a generic `ViewController` with a
`UIButton` hooked to present a [`FlutterViewController`][].
The `FlutterViewController` uses the `FlutterEngine` instance
created in the `AppDelegate`.

下面的示例展示了一个通用的 `ViewController`，
其中有一个 `UIButton` 用于呈现 [`FlutterViewController`][]。
这个 `FlutterViewController` 会使用在 `AppDelegate` 中创建的
`FlutterEngine` 实例。

```swift title="ViewController.swift"
import Flutter

class ViewController: UIViewController {
  override func viewDidLoad() {
    super.viewDidLoad()

    // Make a button to call the showFlutter function when pressed.
    let button = UIButton(type:UIButton.ButtonType.custom)
    button.addTarget(self, action: #selector(showFlutter), for: .touchUpInside)
    button.setTitle("Show Flutter!", for: UIControl.State.normal)
    button.frame = CGRect(x: 80.0, y: 210.0, width: 160.0, height: 40.0)
    button.backgroundColor = UIColor.blue
    self.view.addSubview(button)
  }

  @objc func showFlutter() {
    let flutterEngine = (UIApplication.shared.delegate as! AppDelegate).flutterEngine
    let flutterViewController =
        FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
    present(flutterViewController, animated: true, completion: nil)
  }
}
```

Now, you have a Flutter screen embedded in your iOS app.

现在，你的 iOS 应用中已经嵌入了一个 Flutter 页面。

:::note

Using the previous example, the default `main()`
entrypoint function of your default Dart library
would run when calling `run` on the
`FlutterEngine` created in the `AppDelegate`.

使用前面的示例时，当在 `AppDelegate` 中创建的 `FlutterEngine`
调用 `run` 时，默认 Dart library 中的默认 `main()` 入口函数会运行。

:::


</Tab>
<Tab name="UIKit-ObjC">

The following example shows a generic `ViewController` with a
`UIButton` hooked to present a [`FlutterViewController`][].
The `FlutterViewController` uses the `FlutterEngine` instance
created in the `AppDelegate`.

下面的示例展示了一个通用的 `ViewController`，
其中有一个 `UIButton` 用于呈现 [`FlutterViewController`][]。
这个 `FlutterViewController` 会使用在 `AppDelegate` 中创建的
`FlutterEngine` 实例。

```objc title="ViewController.m"
@import Flutter;
#import "AppDelegate.h"
#import "ViewController.h"

@implementation ViewController
- (void)viewDidLoad {
    [super viewDidLoad];

    // Make a button to call the showFlutter function when pressed.
    UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
    [button addTarget:self
               action:@selector(showFlutter)
     forControlEvents:UIControlEventTouchUpInside];
    [button setTitle:@"Show Flutter!" forState:UIControlStateNormal];
    button.backgroundColor = UIColor.blueColor;
    button.frame = CGRectMake(80.0, 210.0, 160.0, 40.0);
    [self.view addSubview:button];
}

- (void)showFlutter {
    FlutterEngine *flutterEngine =
        ((AppDelegate *)UIApplication.sharedApplication.delegate).flutterEngine;
    FlutterViewController *flutterViewController =
        [[FlutterViewController alloc] initWithEngine:flutterEngine nibName:nil bundle:nil];
    [self presentViewController:flutterViewController animated:YES completion:nil];
}
@end
```

Now, you have a Flutter screen embedded in your iOS app.

现在，你的 iOS 应用中已经嵌入了一个 Flutter 页面。

:::note

Using the previous example, the default `main()`
entrypoint function of your default Dart library
would run when calling `run` on the
`FlutterEngine` created in the `AppDelegate`.

使用前面的示例时，当在 `AppDelegate` 中创建的 `FlutterEngine`
调用 `run` 时，默认 Dart library 中的默认 `main()` 入口函数会运行。

:::


</Tab>
</Tabs>

### _Alternatively_ - Create a FlutterViewController with an implicit FlutterEngine

### **或者** —— 使用隐式 FlutterEngine 创建 FlutterViewController

As an alternative to the previous example, you can let the
`FlutterViewController` implicitly create its own `FlutterEngine` without
pre-warming one ahead of time.

作为前一个示例的替代方案，你可以让 `FlutterViewController`
隐式创建自己的 `FlutterEngine`，而不提前预热引擎。

This is not usually recommended because creating a
`FlutterEngine` on-demand could introduce a noticeable
latency between when the `FlutterViewController` is
presented and when it renders its first frame. This could, however, be
useful if the Flutter screen is rarely shown, when there are no good
heuristics to determine when the Dart VM should be started, and when Flutter
doesn't need to persist state between view controllers.

通常不建议这样做，因为按需创建 `FlutterEngine` 可能会在
`FlutterViewController` 呈现后、渲染第一帧前引入明显延迟。
不过，如果 Flutter 页面很少显示、没有合适的启发式方法判断何时启动
Dart VM，且 Flutter 不需要在多个 view controller 之间保持状态，
这种方式也可能有用。

To let the `FlutterViewController` present without an existing
`FlutterEngine`, omit the `FlutterEngine` construction, and create the
`FlutterViewController` without an engine reference.

若要在没有现有 `FlutterEngine` 的情况下呈现 `FlutterViewController`，
请省略 `FlutterEngine` 的构造步骤，并在创建 `FlutterViewController` 时
不要传入 engine 引用。

<Tabs key="darwin-framework">
<Tab name="SwiftUI">

```swift title="ContentView.swift"
import SwiftUI
import Flutter

struct FlutterViewControllerRepresentable: UIViewControllerRepresentable {
  func makeUIViewController(context: Context) -> some UIViewController {
    return FlutterViewController(
      project: nil,
      nibName: nil,
      bundle: nil)
  }

  func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) {}
}

struct ContentView: View {
  var body: some View {
    NavigationStack {
      NavigationLink("My Flutter Feature") {
        FlutterViewControllerRepresentable()
      }
    }
  }
}
```

</Tab>
<Tab name="UIKit-Swift">

```swift title="ViewController.swift"
// Existing code omitted.
func showFlutter() {
  let flutterViewController = FlutterViewController(project: nil, nibName: nil, bundle: nil)
  present(flutterViewController, animated: true, completion: nil)
}
```

</Tab>
<Tab name="UIKit-ObjC">

```objc title="ViewController.m"
// Existing code omitted.
- (void)showFlutter {
  FlutterViewController *flutterViewController =
      [[FlutterViewController alloc] initWithProject:nil nibName:nil bundle:nil];
  [self presentViewController:flutterViewController animated:YES completion:nil];
}
@end
```

</Tab>
</Tabs>

See [Loading sequence and performance][]
for more explorations on latency and memory usage.

请参阅 [加载顺序和性能][Loading sequence and performance]，
了解更多关于延迟和内存使用的探讨。

## Using the FlutterAppDelegate

## 使用 FlutterAppDelegate

Letting your application's `UIApplicationDelegate` subclass
`FlutterAppDelegate` is recommended but not required.

建议让你的应用的 `UIApplicationDelegate` 继承 `FlutterAppDelegate`，
但这并非必需。

The `FlutterAppDelegate` performs functions such as:

`FlutterAppDelegate` 会执行以下功能：

* Forwarding application callbacks such as [`openURL`][]
  to plugins such as [local_auth][].

  将应用回调（例如 [`openURL`][]）转发给 [local_auth][] 等插件。

* Keeping the Flutter connection open
  in debug mode when the phone screen locks.

  在手机屏幕锁定时，在调试模式下保持 Flutter 连接打开。

### Creating a FlutterAppDelegate subclass

### 创建 FlutterAppDelegate 子类

Creating a subclass of the `FlutterAppDelegate` in UIKit apps was shown
in the [Start a FlutterEngine and FlutterViewController section][].
In a SwiftUI app, you can create a subclass of the
`FlutterAppDelegate` and annotate it with the [`Observable()`][] macro as follows:

[启动 FlutterEngine 和 FlutterViewController][Start a FlutterEngine and FlutterViewController section]
一节展示了如何在 UIKit 应用中创建 `FlutterAppDelegate` 子类。
在 SwiftUI 应用中，你可以创建 `FlutterAppDelegate` 的子类，
并使用 [`Observable()`][] 宏为其添加注解，如下所示：

```swift title="MyApp.swift"
import SwiftUI
import Flutter
import FlutterPluginRegistrant

@Observable
class AppDelegate: FlutterAppDelegate {
  let flutterEngine = FlutterEngine(name: "my flutter engine")

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
      // Runs the default Dart entrypoint with a default Flutter route.
      flutterEngine.run();
      // Used to connect plugins (only if you have plugins with iOS platform code).
      GeneratedPluginRegistrant.register(with: self.flutterEngine);
      return true;
    }
}

@main
struct MyApp: App {
  // Use this property wrapper to tell SwiftUI
  // it should use the AppDelegate class for the application delegate
  @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

  var body: some Scene {
      WindowGroup {
        ContentView()
      }
  }
}
```

Then, in your view, the `AppDelegate` is accessible through the view environment.

然后，你可以在视图中通过视图环境 (view environment) 访问 `AppDelegate`。

```swift title="ContentView.swift"
import SwiftUI
import Flutter

struct FlutterViewControllerRepresentable: UIViewControllerRepresentable {
  // Access the AppDelegate through the view environment.
  @Environment(AppDelegate.self) var appDelegate

  func makeUIViewController(context: Context) -> some UIViewController {
    return FlutterViewController(
      engine: appDelegate.flutterEngine,
      nibName: nil,
      bundle: nil)
  }

  func updateUIViewController(_ uiViewController: UIViewControllerType, context: Context) {}
}

struct ContentView: View {
  var body: some View {
    NavigationStack {
      NavigationLink("My Flutter Feature") {
        FlutterViewControllerRepresentable()
      }
    }
  }
}
```

### If you can't directly make FlutterAppDelegate a subclass

### 如果不能直接让 FlutterAppDelegate 成为子类

If your app delegate can't directly make `FlutterAppDelegate` a subclass,
make your app delegate implement the `FlutterAppLifeCycleProvider`
protocol in order to make sure your plugins receive the necessary callbacks.
Otherwise, plugins that depend on these events might have undefined behavior.

如果你的 app delegate 不能直接继承 `FlutterAppDelegate`，
请让 app delegate 实现 `FlutterAppLifeCycleProvider` 协议，
以确保 Flutter 插件能收到必要的回调。
否则，依赖这些事件的插件可能会出现未定义行为。

For instance:

例如：

<Tabs key="darwin-language">
<Tab name="Swift">

```swift title="AppDelegate.swift"
import Foundation
import Flutter

@Observable
class AppDelegate: UIResponder, UIApplicationDelegate, FlutterAppLifeCycleProvider {

  private let lifecycleDelegate = FlutterPluginAppLifeCycleDelegate()

  let flutterEngine = FlutterEngine(name: "my flutter engine")

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    flutterEngine.run()
    return lifecycleDelegate.application(application, didFinishLaunchingWithOptions: launchOptions ?? [:])
  }

  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    lifecycleDelegate.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken)
  }

  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    lifecycleDelegate.application(application, didFailToRegisterForRemoteNotificationsWithError: error)
  }

  func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    lifecycleDelegate.application(application, didReceiveRemoteNotification: userInfo, fetchCompletionHandler: completionHandler)
  }

  func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    return lifecycleDelegate.application(app, open: url, options: options)
  }

  func application(_ application: UIApplication, handleOpen url: URL) -> Bool {
    return lifecycleDelegate.application(application, handleOpen: url)
  }

  func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
    return lifecycleDelegate.application(application, open: url, sourceApplication: sourceApplication ?? "", annotation: annotation)
  }

  func application(_ application: UIApplication, performActionFor shortcutItem: UIApplicationShortcutItem, completionHandler: @escaping (Bool) -> Void) {
    lifecycleDelegate.application(application, performActionFor: shortcutItem, completionHandler: completionHandler)
  }

  func application(_ application: UIApplication, handleEventsForBackgroundURLSession identifier: String, completionHandler: @escaping () -> Void) {
    lifecycleDelegate.application(application, handleEventsForBackgroundURLSession: identifier, completionHandler: completionHandler)
  }

  func application(_ application: UIApplication, performFetchWithCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    lifecycleDelegate.application(application, performFetchWithCompletionHandler: completionHandler)
  }

  func add(_ delegate: FlutterApplicationLifeCycleDelegate) {
    lifecycleDelegate.add(delegate)
  }
}
```

</Tab>
<Tab name="Objective-C">

```objc title="AppDelegate.h"
@import Flutter;
@import UIKit;
@import FlutterPluginRegistrant;

@interface AppDelegate : UIResponder <UIApplicationDelegate, FlutterAppLifeCycleProvider>
@property (strong, nonatomic) UIWindow *window;
@property (nonatomic,strong) FlutterEngine *flutterEngine;
@end
```

The implementation should delegate mostly to a
`FlutterPluginAppLifeCycleDelegate`:

具体实现应尽量委托给 `FlutterPluginAppLifeCycleDelegate`：

```objc title="AppDelegate.m"
@interface AppDelegate ()
@property (nonatomic, strong) FlutterPluginAppLifeCycleDelegate* lifeCycleDelegate;
@end

@implementation AppDelegate

- (instancetype)init {
    if (self = [super init]) {
        _lifeCycleDelegate = [[FlutterPluginAppLifeCycleDelegate alloc] init];
    }
    return self;
}

- (BOOL)application:(UIApplication*)application
didFinishLaunchingWithOptions:(NSDictionary<UIApplicationLaunchOptionsKey, id>*))launchOptions {
    self.flutterEngine = [[FlutterEngine alloc] initWithName:@"io.flutter" project:nil];
    [self.flutterEngine runWithEntrypoint:nil];
    [GeneratedPluginRegistrant registerWithRegistry:self.flutterEngine];
    return [_lifeCycleDelegate application:application didFinishLaunchingWithOptions:launchOptions];
}

// Returns the key window's rootViewController, if it's a FlutterViewController.
// Otherwise, returns nil.
- (FlutterViewController*)rootFlutterViewController {
    UIViewController* viewController = [UIApplication sharedApplication].keyWindow.rootViewController;
    if ([viewController isKindOfClass:[FlutterViewController class]]) {
        return (FlutterViewController*)viewController;
    }
    return nil;
}

- (void)application:(UIApplication*)application
didRegisterUserNotificationSettings:(UIUserNotificationSettings*)notificationSettings {
    [_lifeCycleDelegate application:application
didRegisterUserNotificationSettings:notificationSettings];
}

- (void)application:(UIApplication*)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData*)deviceToken {
    [_lifeCycleDelegate application:application
didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication*)application
didReceiveRemoteNotification:(NSDictionary*)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
    [_lifeCycleDelegate application:application
       didReceiveRemoteNotification:userInfo
             fetchCompletionHandler:completionHandler];
}

- (BOOL)application:(UIApplication*)application
            openURL:(NSURL*)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id>*)options {
    return [_lifeCycleDelegate application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication*)application handleOpenURL:(NSURL*)url {
    return [_lifeCycleDelegate application:application handleOpenURL:url];
}

- (BOOL)application:(UIApplication*)application
            openURL:(NSURL*)url
  sourceApplication:(NSString*)sourceApplication
         annotation:(id)annotation {
    return [_lifeCycleDelegate application:application
                                   openURL:url
                         sourceApplication:sourceApplication
                                annotation:annotation];
}

- (void)application:(UIApplication*)application
performActionForShortcutItem:(UIApplicationShortcutItem*)shortcutItem
  completionHandler:(void (^)(BOOL succeeded))completionHandler {
    [_lifeCycleDelegate application:application
       performActionForShortcutItem:shortcutItem
                  completionHandler:completionHandler];
}

- (void)application:(UIApplication*)application
handleEventsForBackgroundURLSession:(nonnull NSString*)identifier
  completionHandler:(nonnull void (^)(void))completionHandler {
    [_lifeCycleDelegate application:application
handleEventsForBackgroundURLSession:identifier
                  completionHandler:completionHandler];
}

- (void)application:(UIApplication*)application
performFetchWithCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
    [_lifeCycleDelegate application:application performFetchWithCompletionHandler:completionHandler];
}

- (void)addApplicationLifeCycleDelegate:(NSObject<FlutterPlugin>*)delegate {
    [_lifeCycleDelegate addDelegate:delegate];
}
@end
```

</Tab>
</Tabs>

## Launch options

## 启动选项

The examples demonstrate running Flutter using the default launch settings.

这些示例演示了如何使用默认启动设置运行 Flutter。

In order to customize your Flutter runtime,
you can also specify the Dart entrypoint, library, and route.

若要自定义 Flutter 运行时，你也可以指定 Dart 入口点、library 和路由。

### Dart entrypoint

### Dart 入口

Calling `run` on a `FlutterEngine`, by default,
runs the `main()` Dart function
of your `lib/main.dart` file.

默认情况下，在 `FlutterEngine` 上调用 `run` 会运行
`lib/main.dart` 文件中的 Dart `main()` 函数。

You can also run a different entrypoint function by using
[`runWithEntrypoint`][] with an `NSString` specifying
a different Dart function.

你也可以使用 [`runWithEntrypoint`][] 并传入指定其他 Dart 函数的
`NSString`，以运行不同的入口点函数。

:::note

Dart entrypoint functions other than `main()`
must be annotated with the following in order to
not be [tree-shaken][] away when compiling:

`main()` 以外的 Dart 入口点函数必须使用以下注解，
以免在编译时被 [摇树优化][tree-shaken] 移除：

```dart
@pragma('vm:entry-point')
void myOtherEntrypoint() { ... };
```

:::

### Dart library

### Dart 库

In addition to specifying a Dart function, you can specify an entrypoint
function in a specific file.

除了指定 Dart 函数，你还可以指定特定文件中的入口点函数。

For instance the following runs `myOtherEntrypoint()`
in `lib/other_file.dart` instead of `main()` in `lib/main.dart`:

例如，下面的代码会运行 `lib/other_file.dart` 中的
`myOtherEntrypoint()`，而不是 `lib/main.dart` 中的 `main()`：

<Tabs key="darwin-language">
<Tab name="Swift">

```swift
flutterEngine.run(withEntrypoint: "myOtherEntrypoint", libraryURI: "other_file.dart")
```

</Tab>
<Tab name="Objective-C">

```objc
[flutterEngine runWithEntrypoint:@"myOtherEntrypoint" libraryURI:@"other_file.dart"];
```

</Tab>
</Tabs>


### Route

### 路由

An initial route can be set for your Flutter [`WidgetsApp`][]
when constructing the engine.

构造引擎时，可以为你的 Flutter [`WidgetsApp`][] 设置初始路由。

<Tabs key="darwin-language">
<Tab name="Swift">

```swift
let flutterEngine = FlutterEngine()
// FlutterDefaultDartEntrypoint is the same as nil, which will run main().
engine.run(
  withEntrypoint: "main", initialRoute: "/onboarding")
```

</Tab>
<Tab name="Objective-C">

```objc
FlutterEngine *flutterEngine = [[FlutterEngine alloc] init];
// FlutterDefaultDartEntrypoint is the same as nil, which will run main().
[flutterEngine runWithEntrypoint:FlutterDefaultDartEntrypoint
                    initialRoute:@"/onboarding"];
```

</Tab>
</Tabs>

This code sets your `dart:ui`'s [`PlatformDispatcher.defaultRouteName`][]
to `"/onboarding"` instead of `"/"`.

这段代码会将你的 `dart:ui` 的 [`PlatformDispatcher.defaultRouteName`][]
设置为 `"/onboarding"`，而不是 `"/"`。

Alternatively, to construct a FlutterViewController directly without pre-warming
a FlutterEngine:

或者，也可以不预热 FlutterEngine，直接构造 FlutterViewController：

<Tabs key="darwin-language">
<Tab name="Swift">

```swift
let flutterViewController = FlutterViewController(
      project: nil, initialRoute: "/onboarding", nibName: nil, bundle: nil)
```

</Tab>
<Tab name="Objective-C">

```objc
FlutterViewController* flutterViewController =
      [[FlutterViewController alloc] initWithProject:nil
                                        initialRoute:@"/onboarding"
                                             nibName:nil
                                              bundle:nil];
```

</Tab>
</Tabs>

:::tip

In order to imperatively change your current Flutter
route from the platform side after the `FlutterEngine`
is already running, use [`pushRoute()`][]
or [`popRoute()`] on the `FlutterViewController`.

如果需要在 `FlutterEngine` 已经运行后，从平台侧以命令式方式更改当前
Flutter 路由，请在 `FlutterViewController` 上使用 [`pushRoute()`][] 或
[`popRoute()`][]。

To pop the iOS route from the Flutter side,
call [`SystemNavigator.pop()`][].

若要从 Flutter 侧弹出 iOS 路由，请调用 [`SystemNavigator.pop()`][]。

:::

See [Navigation and routing][] for more about Flutter's routes.

请参阅 [路由和导航][Navigation and routing]，了解更多关于 Flutter 路由的内容。

### Other

### 其他

The previous example only illustrates a few ways to customize
how a Flutter instance is initiated. Using [platform channels][],
you're free to push data or prepare your Flutter environment
in any way you'd like, before presenting the Flutter UI using a
`FlutterViewController`.

前面的示例只展示了几种自定义 Flutter 实例初始化方式。
借助 [平台通道][platform channels]，你可以在使用 `FlutterViewController`
呈现 Flutter UI 之前，以任何想要的方式推送数据或准备 Flutter 环境。

## Content-sized views

## 内容自适应尺寸的视图

On iOS, you can also set your embedded `FlutterView` to size itself based off its content.

在 iOS 上，你也可以将嵌入的 `FlutterView` 设置为根据其内容自行调整尺寸。

<Tabs key="darwin-language">
<Tab name="Swift">

```swift
let flutterViewController = FlutterViewController(engine: engine, nibName: nil, bundle: nil)
flutterViewController.isAutoResizable = true
```

</Tab>
<Tab name="Objective-C">

```objc
_flutterViewController = [[FlutterViewController alloc] initWithEngine:engine nibName:nil bundle:nil];
_flutterViewController.autoResizable = YES;
```

</Tab>
</Tabs>

### Restrictions

### 限制

To use this, your root widget must support unbounded constraints. Avoid using widgets that require bounded constraints (like `ListView` or `LayoutBuilder`) at the top of your tree, as they can conflict with the dynamic sizing logic.

若要使用此功能，你的根 widget 必须支持无界约束。
请避免在 widget 树顶层使用需要有界约束的 widget
（例如 `ListView` 或 `LayoutBuilder`），
因为它们可能会与动态尺寸逻辑冲突。

In practice, this means that quite a few common widgets are not supported,
such as `ScaffoldBuilder`, `CupertinoTimerPicker`,
or any widget that internally relies on a `LayoutBuilder`.
When in doubt, you can use an `UnconstrainedBox` to test the usability of 
a widget for a content-sized view, as in the following example:

实际上，这意味着相当多常见的 widget 并不受支持，
例如 `ScaffoldBuilder`、`CupertinoTimerPicker`，
或者任何内部依赖 `LayoutBuilder` 的 widget。
如果不确定，可以使用 `UnconstrainedBox` 测试某个 widget
是否适用于内容自适应尺寸的视图，如下例所示：

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context)
  => MaterialApp(home: MyPage());
}

class MyPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: UnconstrainedBox(
          // TODO: Edit this line to check if a widget
          // can cause problems with content-sized views.
          child: Text('This works!'),
          // child: Column(children: [Column(children: [Expanded(child: Text('This blows up!'))])]),
          // child: ListView(children: [Text('This blows up!')]),
        )
    );
  }
}
```

For a working example, refer to this [sample project][].

可运行的示例请参阅此 [示例项目][sample project]。

[`FlutterEngine`]: {{site.api}}/ios-embedder/interface_flutter_engine.html
[`FlutterViewController`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html
[Loading sequence and performance]: /add-to-app/performance
[local_auth]: {{site.pub}}/packages/local_auth
[Navigation and routing]: /ui/navigation
[Navigator]: {{site.api}}/flutter/widgets/Navigator-class.html
[`NavigatorState`]: {{site.api}}/flutter/widgets/NavigatorState-class.html
[`openURL`]: {{site.apple-dev}}/documentation/uikit/uiapplicationdelegate/1623112-application
[platform channels]: /platform-integration/platform-channels
[`popRoute()`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html#ac89c8010fbf7a39f7aaab64f68c013d2
[`pushRoute()`]: {{site.api}}/ios-embedder/interface_flutter_view_controller.html#ac7cffbf03f9c8c0b28d1f0dafddece4e
[`runApp`]: {{site.api}}/flutter/widgets/runApp.html
[`runWithEntrypoint`]: {{site.api}}/ios-embedder/interface_flutter_engine.html#a019d6b3037eff6cfd584fb2eb8e9035e
[`SystemNavigator.pop()`]: {{site.api}}/flutter/services/SystemNavigator/pop.html
[tree-shaken]: https://en.wikipedia.org/wiki/Tree_shaking
[`WidgetsApp`]: {{site.api}}/flutter/widgets/WidgetsApp-class.html
[`PlatformDispatcher.defaultRouteName`]: {{site.api}}/flutter/dart-ui/PlatformDispatcher/defaultRouteName.html
[Start a FlutterEngine and FlutterViewController section]:/add-to-app/ios/add-flutter-screen/#start-a-flutterengine-and-flutterviewcontroller
[`Observable`]: {{site.apple-dev}}/documentation/observation/observable
[`NavigationLink`]: {{site.apple-dev}}/documentation/swiftui/navigationlink
[`Observable()`]: {{site.apple-dev}}/documentation/observation/observable()
[sample project]: {{site.repo.samples}}/tree/main/add_to_app/ios_content_resizing
