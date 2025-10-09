---
# title: Add a Flutter screen to an iOS app
title: 在 iOS 应用中添加 Flutter 页面
# shortTitle: Add a Flutter screen
shortTitle: 添加 Flutter 页面
# description: Learn how to add a single Flutter screen to your existing iOS app.
description: 了解如何在现有 iOS 应用中添加单个 Flutter 页面。
tags: Flutter混合工程,add2app
keywords: iOS,Flutter页面,FlutterEngine
---

This guide describes how to add a single Flutter screen to an existing iOS app.

本指南描述了怎样在既有 iOS 应用中添加单个 Flutter 页面。

## Start a FlutterEngine and FlutterViewController

## 启动 FlutterEngine 和 FlutterViewController

To launch a Flutter screen from an existing iOS app, you start a
[`FlutterEngine`][] and a [`FlutterViewController`][].

为了在既有 iOS 应用中展示 Flutter 页面，
请启动 [`FlutterEngine`][] 和 [`FlutterViewController`][]。

:::note

The `FlutterEngine` serves as a host to the Dart VM and your Flutter runtime,
and the `FlutterViewController` attaches to a `FlutterEngine` to pass 
input events into Flutter and to display frames rendered by the
`FlutterEngine`.

`FlutterEngine` 充当 Dart VM 和 Flutter 运行时的主机；
`FlutterViewController` 依附于 `FlutterEngine`，
给 Flutter 传递 UIKit 的输入事件，并展示被 `FlutterEngine` 渲染的每一帧画面。

:::

The `FlutterEngine` might have the same lifespan as your
`FlutterViewController` or outlive your `FlutterViewController`.

`FlutterEngine` 的寿命可能与 `FlutterViewController` 相同，也可能超过 `FlutterViewController`。

:::tip

It's generally recommended to pre-warm a long-lived
`FlutterEngine` for your application because:

通常建议为你的应用预热一个“长寿”的 `FlutterEngine` 是因为:

* The first frame appears faster when showing the `FlutterViewController`.
  
  当展示 `FlutterViewController` 时，第一帧画面将会更快展现；

* Your Flutter and Dart state will outlive one `FlutterViewController`.

  你的 Flutter 和 Dart 状态将比一个`FlutterViewController` 存活更久；

* Your application and your plugins can interact with Flutter and your Dart
  logic before showing the UI.

  在展示 UI 前，你的应用和 plugins 可以与 Flutter 和 Dart 逻辑交互。

:::

See [Loading sequence and performance][]
for more analysis on the latency and memory
trade-offs of pre-warming an engine.

[加载顺序和性能][Loading sequence and performance]
里有更多关于预热 engine 的延迟和内存取舍的分析。

### Create a FlutterEngine

### 创建一个 FlutterEngine

Where you create a `FlutterEngine` depends on your host app.

在哪创建 `FlutterEngine` 取决于你要用的宿主类型。

{% tabs "darwin-framework" %}
{% tab "SwiftUI" %}

In this example, we create a `FlutterEngine` object inside a SwiftUI [`Observable`][] 
object called `FlutterDependencies`. 
Pre-warm the engine by calling `run()`, and then inject this object 
into a `ContentView` using the `environment()` view modifier. 

在这个例子中，
我们在名为 `FlutterDependencies` 的 SwiftUI [`Observable`][] 对象中创建了一个 `FlutterEngine` 对象。
调用 `run()` 为引擎预热，
然后使用 `environment()` view modifier 将此对象传递给了 `ContentView`。

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

{% endtab %}
{% tab "UIKit-Swift" %}

As an example, we demonstrate creating a
`FlutterEngine`, exposed as a property, on app startup in
the app delegate.

这个例子中，我们在应用启动时的 App Delegate 中创建了一个 `FlutterEngine`
并作为属性暴露给外界。

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

{% endtab %}
{% tab "UIKit-ObjC" %}

The following example demonstrates creating a `FlutterEngine`, 
exposed as a property, on app startup in the app delegate.

下面的示例演示了，
我们在应用启动时的 App Delegate 中创建了一个 `FlutterEngine`
并作为属性暴露给外界。

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

{% endtab %}
{% endtabs %}

### Show a FlutterViewController with your FlutterEngine

### 使用 FlutterEngine 展示 FlutterViewController

{% tabs "darwin-framework" %}
{% tab "SwiftUI" %}

The following example shows a generic `ContentView` with a 
[`NavigationLink`][] hooked to a flutter screen. 
First, create a `FlutterViewControllerRepresentable` to represent the 
`FlutterViewController`. The `FlutterViewController` constructor takes 
the pre-warmed `FlutterEngine` as an argument, which is injected through
the view environment. 

下面的例子中展示了一个带有 [`NavigationLink`][] 的 `ContentView`
连接到一个 Flutter 屏幕。
首先，创建一个 `FlutterViewControllerRepresentable` 来代表 `FlutterViewController`。
`FlutterViewController` 的构造函数会接收一个预热过的
`FlutterEngine` 作为参数，并通过视图环境 (view environment) 注入。

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

现在，你的 iOS 应用中集成了一个 Flutter 页面。

:::note

In this example, your Dart `main()` entrypoint function runs 
when the `FlutterDependencies` observable is initialized. 

在本例中，当 `FlutterDependencies` Observable 对象初始化时，
Dart `main()` 入口函数会被执行。

:::

{% endtab %}
{% tab "UIKit-Swift" %}

The following example shows a generic `ViewController` with a
`UIButton` hooked to present a [`FlutterViewController`][].
The `FlutterViewController` uses the `FlutterEngine` instance
created in the `AppDelegate`.

下面的例子展示了一个普通的 `ViewController`，
包含一个能跳转到 [`FlutterViewController`][] 的 `UIButton`，这个
`FlutterViewController` 使用在 `AppDelegate`
中创建的 Flutter 引擎 (`FlutterEngine`)。

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

现在，你的 iOS 应用中集成了一个 Flutter 页面。

:::note

Using the previous example, the default `main()`
entrypoint function of your default Dart library
would run when calling `run` on the
`FlutterEngine` created in the `AppDelegate`.

使用前面的示例，当在 `AppDelegate` 中创建的 `FlutterEngine` 
调用 `run` 时，默认的 Dart 库中的 `main()` 入口函数会被执行。

:::


{% endtab %}
{% tab "UIKit-ObjC" %}

The following example shows a generic `ViewController` with a
`UIButton` hooked to present a [`FlutterViewController`][].
The `FlutterViewController` uses the `FlutterEngine` instance
created in the `AppDelegate`.

下面的例子中展示了在一个常见的 `ViewController`，
包含一个能跳转到 [`FlutterViewController`][] 的 `UIButton`，
`FlutterViewController` 会使用在 `AppDelegate`
中创建的 `FlutterEngine` 实例。

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

现在，你的 iOS 应用中集成了一个 Flutter 页面。

:::note

Using the previous example, the default `main()`
entrypoint function of your default Dart library
would run when calling `run` on the
`FlutterEngine` created in the `AppDelegate`.

在上一个例子中，你的默认 Dart 库的默认入口函数 `main()`，
将会在 `AppDelegate` 创建 `FlutterEngine` 并调用 `run` 方法时调用。

:::


{% endtab %}
{% endtabs %}

### _Alternatively_ - Create a FlutterViewController with an implicit FlutterEngine

### **或者** —— 使用隐式 FlutterEngine 创建 FlutterViewController

As an alternative to the previous example, you can let the
`FlutterViewController` implicitly create its own `FlutterEngine` without
pre-warming one ahead of time.

上一个示例还有另一个选择，你可以让 `FlutterViewController`
隐式创建它自己的 `FlutterEngine`，而不用提前预热 engine。

This is not usually recommended because creating a
`FlutterEngine` on-demand could introduce a noticeable
latency between when the `FlutterViewController` is
presented and when it renders its first frame. This could, however, be
useful if the Flutter screen is rarely shown, when there are no good
heuristics to determine when the Dart VM should be started, and when Flutter
doesn't need to persist state between view controllers.

不过不建议这样做，因为按需创建`FlutterEngine` 的话，
在 `FlutterViewController` 被 present 出来之后，
第一帧图像渲染完之前，将会引入明显的延迟。
但是当 Flutter 页面很少被展示时，当对决定何时启动 Dart VM 没有好的启发时，
当 Flutter 无需在页面（view controller）之间保持状态时，
此方式可能会有用。

To let the `FlutterViewController` present without an existing
`FlutterEngine`, omit the `FlutterEngine` construction, and create the
`FlutterViewController` without an engine reference.

为了不使用已经存在的 `FlutterEngine` 来展现 `FlutterViewController`，
省略 `FlutterEngine` 的创建步骤，
并且在创建 `FlutterViewController` 时，去掉 engine 的引用。

{% tabs "darwin-framework" %}
{% tab "SwiftUI" %}

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

{% endtab %}
{% tab "UIKit-Swift" %}

```swift title="ViewController.swift"
// Existing code omitted.
func showFlutter() {
  let flutterViewController = FlutterViewController(project: nil, nibName: nil, bundle: nil)
  present(flutterViewController, animated: true, completion: nil)
}
```

{% endtab %}
{% tab "UIKit-ObjC" %}

```objc title="ViewController.m"
// Existing code omitted.
- (void)showFlutter {
  FlutterViewController *flutterViewController =
      [[FlutterViewController alloc] initWithProject:nil nibName:nil bundle:nil];
  [self presentViewController:flutterViewController animated:YES completion:nil];
}
@end
```

{% endtab %}
{% endtabs %}

See [Loading sequence and performance][]
for more explorations on latency and memory usage.

查看 [加载顺序和性能][Loading sequence and performance]
了解更多关于延迟和内存使用的探索。

## Using the FlutterAppDelegate

## 使用 FlutterAppDelegate

Letting your application's `UIApplicationDelegate` subclass
`FlutterAppDelegate` is recommended but not required.

推荐让你应用的 `UIApplicationDelegate` 继承 `FlutterAppDelegate`，但不是必须的。

The `FlutterAppDelegate` performs functions such as:

`FlutterAppDelegate` 有这些功能：

* Forwarding application callbacks such as [`openURL`][]
  to plugins such as [local_auth][].

  传递应用的回调，例如 [`openURL`][] 到 Flutter 的插件 —— [local_auth][]。

* Keeping the Flutter connection open 
  in debug mode when the phone screen locks.

  当手机屏幕锁定时，在调试模式下保持 Flutter 连接处于开启状态。

### Creating a FlutterAppDelegate subclass

### 创建 FlutterAppDelegate 子类

Creating a subclass of the `FlutterAppDelegate` in UIKit apps was shown 
in the [Start a FlutterEngine and FlutterViewController section][]. 
In a SwiftUI app, you can create a subclass of the 
`FlutterAppDelegate` and annotate it with the [`Observable()`][] macro as follows:

[启动 FlutterEngine 和 FlutterViewController][Start a FlutterEngine and FlutterViewController section]
文档中展示了如何在使用 UIKit 的应用中创建 `FlutterAppDelegate` 子类。
在使用 SwiftUI 的应用中，你可以创建一个 `FlutterAppDelegate` 的子类，
并使用 [`Observable()`][] 宏 (macro) 对其进行注解，如下所示：

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

然后，在视图中，可以通过视图环境 (view environment) 访问 `AppDelegate`。

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
让你的 app delegate 实现 `FlutterAppLifeCycleProvider` 协议，
来确保 Flutter plugins 接收到必要的回调。
否则，依赖这些事件的 plugins 将会有无法预估的行为。

For instance:

例如：

{% tabs "darwin-language" %}
{% tab "Swift" %}

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

{% endtab %}
{% tab "Objective-C" %}

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

在具体实现中，应该最大化地委托给
`FlutterPluginAppLifeCycleDelegate`：

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

{% endtab %}
{% endtabs %}

## Launch options

## 启动选项

The examples demonstrate running Flutter using the default launch settings.

例子中展示了使用默认启动选项运行 Flutter。

In order to customize your Flutter runtime,
you can also specify the Dart entrypoint, library, and route.

为了定制化你的 Flutter 运行时，你也可以置顶 Dart 入口、库和路由。

### Dart entrypoint

### Dart 入口

Calling `run` on a `FlutterEngine`, by default,
runs the `main()` Dart function
of your `lib/main.dart` file.

在 `FlutterEngine` 上调用 `run`，
默认将会调用你的 `lib/main.dart`
文件里的 `main()` 函数。

You can also run a different entrypoint function by using
[`runWithEntrypoint`][] with an `NSString` specifying
a different Dart function.

你也可以使用另一个入口方法 [`runWithEntrypoint`][]，
并使用 `NSString` 字符串指定一个不同的 Dart 入口。

:::note

Dart entrypoint functions other than `main()`
must be annotated with the following in order to
not be [tree-shaken][] away when compiling:

使用 `main()` 以外的 Dart 入口函数，必须使用下面的注解，
防止被 [tree-shaken][] 优化掉，
而没有编译。

```dart
@pragma('vm:entry-point')
void myOtherEntrypoint() { ... };
```

:::

### Dart library

### Dart 库

In addition to specifying a Dart function, you can specify an entrypoint
function in a specific file.

另外，在指定 Dart 函数时，你可以指定特定文件的特定函数。

For instance the following runs `myOtherEntrypoint()`
in `lib/other_file.dart` instead of `main()` in `lib/main.dart`:

下面的例子使用 `lib/other_file.dart` 文件的
`myOtherEntrypoint()` 函数取代 `lib/main.dart` 的 `main()` 函数：

{% tabs "darwin-language" %}
{% tab "Swift" %}

```swift
flutterEngine.run(withEntrypoint: "myOtherEntrypoint", libraryURI: "other_file.dart")
```

{% endtab %}
{% tab "Objective-C" %}

```objc
[flutterEngine runWithEntrypoint:@"myOtherEntrypoint" libraryURI:@"other_file.dart"];
```

{% endtab %}
{% endtabs %}


### Route

### 路由

An initial route can be set for your Flutter [`WidgetsApp`][]
when constructing the engine.

当构建 engine 时，可以为你的 Flutter [`WidgetsApp`][] 设置一个初始路由。

{% tabs "darwin-language" %}
{% tab "Swift" %}

```swift
let flutterEngine = FlutterEngine()
// FlutterDefaultDartEntrypoint is the same as nil, which will run main().
engine.run(
  withEntrypoint: "main", initialRoute: "/onboarding")
```

{% endtab %}
{% tab "Objective-C" %}

```objc
FlutterEngine *flutterEngine = [[FlutterEngine alloc] init];
// FlutterDefaultDartEntrypoint is the same as nil, which will run main().
[flutterEngine runWithEntrypoint:FlutterDefaultDartEntrypoint
                    initialRoute:@"/onboarding"];
```

{% endtab %}
{% endtabs %}

This code sets your `dart:ui`'s [`PlatformDispatcher.defaultRouteName`][]
to `"/onboarding"` instead of `"/"`.

这段代码使用 `"/onboarding"` 取代 `"/"`，
作为你的 `dart:ui` 的 [`PlatformDispatcher.defaultRouteName`][]

Alternatively, to construct a FlutterViewController directly without pre-warming
a FlutterEngine:

你也可以直接构造 FlutterViewController 而不用提前初始化 FlutterEngine：

{% tabs "darwin-language" %}
{% tab "Swift" %}

```swift
let flutterViewController = FlutterViewController(
      project: nil, initialRoute: "/onboarding", nibName: nil, bundle: nil)
```

{% endtab %}
{% tab "Objective-C" %}

```objc
FlutterViewController* flutterViewController =
      [[FlutterViewController alloc] initWithProject:nil
                                        initialRoute:@"/onboarding"
                                             nibName:nil
                                              bundle:nil];
```

{% endtab %}
{% endtabs %}

:::tip

In order to imperatively change your current Flutter
route from the platform side after the `FlutterEngine`
is already running, use [`pushRoute()`][]
or [`popRoute()`] on the `FlutterViewController`.

如果在 `FlutterEngine` 启动后，迫切得需要在平台侧改变你当前的 Flutter 路由，
可以使用 `FlutterViewController` 里的 [`pushRoute()`][] 或者 [`popRoute()`][]。

To pop the iOS route from the Flutter side,
call [`SystemNavigator.pop()`][].

在 Flutter 侧推出 iOS 路由，调用 [`SystemNavigator.pop()`][]。

:::

See [Navigation and routing][] for more about Flutter's routes.

查看文档：[路由和导航][Navigation and routing] 了解更多 Flutter 路由的内容。

### Other

### 其它

The previous example only illustrates a few ways to customize
how a Flutter instance is initiated. Using [platform channels][],
you're free to push data or prepare your Flutter environment
in any way you'd like, before presenting the Flutter UI using a
`FlutterViewController`.

之前的例子仅仅展示了怎样定制 Flutter 实例初始化的几种方式，
通过 [撰写双端平台代码][platform channels]，
你可以在 `FlutterViewController` 展示 Flutter UI 之前，
自由地选择你喜欢的，推入数据和准备 Flutter 环境的方式。

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
[`Observable`]: https://developer.apple.com/documentation/observation/observable
[`NavigationLink`]: https://developer.apple.com/documentation/swiftui/navigationlink
[`Observable()`]: https://developer.apple.com/documentation/observation/observable()
