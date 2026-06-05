---
# title: Add a Flutter screen to an macOS app
title: 向 macOS 应用添加 Flutter 屏幕
# shortTitle: Add a Flutter screen
shortTitle: 添加 Flutter 屏幕
# description: Learn how to add a single Flutter screen to your existing macOS app.
description: 了解如何向你现有的 macOS 应用添加单个 Flutter 屏幕。
tags: Flutter混合工程,add2app
keywords: macOS,Flutter 屏幕
ai-translated: true
---

This guide describes how to add a single Flutter screen to an existing macOS app.

本指南介绍如何向现有 macOS 应用添加单个 Flutter 屏幕。

## Start a FlutterEngine and FlutterViewController

## 启动 FlutterEngine 与 FlutterViewController

To launch a Flutter screen from an existing macOS app,
you start a [`FlutterEngine`][] and a [`FlutterViewController`][].

要从现有 macOS 应用启动 Flutter 屏幕，需要启动 [`FlutterEngine`][] 与 [`FlutterViewController`][]。

:::note
The `FlutterEngine` serves as a host to the Dart VM and your Flutter runtime,
and the `FlutterViewController` attaches to a `FlutterEngine`
to pass input events into Flutter
and to display frames rendered by the `FlutterEngine`.

`FlutterEngine` 作为 Dart VM 与 Flutter 运行时的宿主，`FlutterViewController` 附着于 `FlutterEngine`，将输入事件传入 Flutter，并显示由 `FlutterEngine` 渲染的帧。
:::

The `FlutterEngine` might have the same lifespan
as your `FlutterViewController` or outlive your `FlutterViewController`.

`FlutterEngine` 的生命周期可能与 `FlutterViewController` 相同，也可能更长。

:::tip
It's generally recommended to pre-warm a long-lived
`FlutterEngine` for your application because:

* The first frame appears faster when showing the `FlutterViewController`.
* Your Flutter and Dart state will outlive one `FlutterViewController`.
* Your application and your plugins can interact with Flutter
  and your Dart logic before showing the UI.

通常建议为应用预热长期存活的 `FlutterEngine`，因为：

* 显示 `FlutterViewController` 时首帧出现更快。
* Flutter 与 Dart 状态可跨越多个 `FlutterViewController` 存活。
* 应用与插件可在显示 UI 之前与 Flutter 及 Dart 逻辑交互。
:::

See [Loading sequence and performance][]
for more analysis on the latency and memory
trade-offs of pre-warming an engine.

有关预热引擎在延迟与内存方面的权衡，请参阅 [加载顺序与性能][Loading sequence and performance]。

### Create a FlutterEngine

### 创建 FlutterEngine

Where you create a `FlutterEngine` depends on your host app.

创建 `FlutterEngine` 的位置取决于宿主应用。

<Tabs key="macos-framework">
<Tab name="SwiftUI">

In this example, we create a `FlutterEngine` object
inside a SwiftUI [`Observable`][] object called `FlutterDependencies`.
Pre-warm the engine by calling `run()`, and then inject this object
into a `ContentView` using the `environment()` view modifier.

本示例在名为 `FlutterDependencies` 的 SwiftUI [`Observable`][] 对象内创建 `FlutterEngine`，通过调用 `run()` 预热引擎，再使用 `environment()` 视图修饰符将其注入 `ContentView`。

 ```swift title="MyApp.swift"
import SwiftUI
import FlutterMacOS
// The following library connects plugins with macOS platform code to this app.
import FlutterPluginRegistrant

@Observable
class FlutterDependencies {
  let flutterEngine = FlutterEngine(name: "my flutter engine", project: nil)
  init() {
    // Runs the default Dart entrypoint with a default Flutter route.
    flutterEngine.run(withEntrypoint: nil)
    // Connects plugins with macOS platform code to this app.
    RegisterGeneratedPlugins(registry: self.flutterEngine)
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
<Tab name="AppKit-Swift">

As an example, we demonstrate creating a `FlutterEngine`,
exposed as a property, on app startup in the app delegate.

作为示例，我们在应用委托的应用启动时创建并暴露为属性的 `FlutterEngine`。

```swift title="AppDelegate.swift"
import Cocoa
import FlutterMacOS
// The following library connects plugins with macOS platform code to this app.
import FlutterPluginRegistrant

@main
class AppDelegate: FlutterAppDelegate {
  lazy var flutterEngine = FlutterEngine(name: "my flutter engine", project: nil)

  override func applicationDidFinishLaunching(_ aNotification: Notification) {
    flutterEngine.run(withEntrypoint: nil)
    RegisterGeneratedPlugins(registry: self.flutterEngine)
  }
}
```

</Tab>
</Tabs>

### Show a FlutterViewController with your FlutterEngine

### 使用 FlutterEngine 显示 FlutterViewController

<Tabs key="macos-framework">
<Tab name="SwiftUI">

The following example shows a generic `ContentView` with a
[`NavigationLink`][] hooked to a flutter screen.
First, create a `FlutterViewControllerRepresentable`
to represent the `FlutterViewController`.
The `FlutterViewController` constructor takes
the pre-warmed `FlutterEngine` as an argument,
which is injected through the view environment.

以下示例展示带有连接到 Flutter 屏幕的 [`NavigationLink`][] 的通用 `ContentView`。首先创建 `FlutterViewControllerRepresentable` 表示 `FlutterViewController`。`FlutterViewController` 构造函数接收预热的 `FlutterEngine` 作为参数，通过视图环境注入。

```swift title="ContentView.swift"
import SwiftUI
import FlutterMacOS

struct FlutterViewControllerRepresentable: NSViewControllerRepresentable {
  // Flutter dependencies are passed in through the view environment.
  @Environment(FlutterDependencies.self) var flutterDependencies

  func makeNSViewController(context: Context) -> FlutterViewController {
    return FlutterViewController(
      engine: flutterDependencies.flutterEngine,
      nibName: nil,
      bundle: nil
    )
  }

  func updateNSViewController(_ nsViewController: FlutterViewController, context: Context) {}
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

Now, you have a Flutter screen embedded in your macOS app.

现在，你已在 macOS 应用中嵌入了 Flutter 屏幕。

:::note
In this example, your Dart `main()` entrypoint function runs
when the `FlutterDependencies` observable is initialized.

在本示例中，Dart `main()` 入口函数在 `FlutterDependencies` observable 初始化时运行。
:::

</Tab>
<Tab name="AppKit-Swift">

The following example shows a generic `ViewController` with an
`NSButton` hooked to present a [`FlutterViewController`][].
The `FlutterViewController` uses the `FlutterEngine` instance
created in the `AppDelegate`.

以下示例展示带有 `NSButton` 的通用 `ViewController`，用于呈现 [`FlutterViewController`][]。`FlutterViewController` 使用在 `AppDelegate` 中创建的 `FlutterEngine` 实例。

```swift title="ViewController.swift"
import Cocoa
import FlutterMacOS

class ViewController: NSViewController {

  override func viewDidLoad() {
    super.viewDidLoad()

    // Make a button to call the showFlutter function when pressed.
    let button =  NSButton(title: "Show Flutter!", target: self, action: #selector(showFlutter))
    button.frame = CGRect(x: 202, y: 187, width: 160.0, height: 40.0)
    self.view.addSubview(button)
  }

  @objc func showFlutter() {
    let flutterEngine = (NSApplication.shared.delegate as! AppDelegate).flutterEngine
    let flutterViewController =
        FlutterViewController(engine: flutterEngine, nibName: nil, bundle: nil)
    self.addChild(flutterViewController)
    flutterViewController.view.frame = self.view.bounds
    presentAsModalWindow(flutterViewController)
  }
}
```

Now, you have a Flutter screen embedded in your macOS app.

现在，你已在 macOS 应用中嵌入了 Flutter 屏幕。

:::note
Using the previous example, the default `main()` entrypoint function
of your default Dart library runs
when calling `run` on the `FlutterEngine` created in the `AppDelegate`.

使用上一示例，在 `AppDelegate` 中创建的 `FlutterEngine` 上调用 `run` 时，默认 Dart 库的默认 `main()` 入口函数会运行。
:::

</Tab>
</Tabs>

### _Alternatively_ - Create a FlutterViewController with an implicit FlutterEngine

### _另一种方式_ — 使用隐式 FlutterEngine 创建 FlutterViewController

As an alternative to the previous example,
you can let the `FlutterViewController` implicitly create
its own `FlutterEngine` without pre-warming one ahead of time.

作为上一示例的替代，可让 `FlutterViewController` 隐式创建自己的 `FlutterEngine`，而无需事先预热。

This is not usually recommended
because creating a `FlutterEngine` on-demand could introduce a noticeable
latency between when the `FlutterViewController` is presented
and when it renders its first frame.
This could, however, be useful if the Flutter screen is rarely shown,
when there are no good heuristics
to determine when the Dart VM should be started,
and when Flutter doesn't need to persist state between view controllers.

通常不推荐这样做，因为按需创建 `FlutterEngine` 可能在呈现 `FlutterViewController` 与渲染首帧之间引入明显延迟。但若 Flutter 屏幕很少显示、难以判断何时应启动 Dart VM，且 Flutter 无需在 view controller 之间保持状态时，这种方式可能有用。

To let the `FlutterViewController` present without an existing `FlutterEngine`,
omit the `FlutterEngine` construction,
and create the `FlutterViewController` without an engine reference.

要让 `FlutterViewController` 在没有现有 `FlutterEngine` 的情况下呈现，省略 `FlutterEngine` 的构建，并创建不带引擎引用的 `FlutterViewController`。

<Tabs key="macos-framework">
<Tab name="SwiftUI">

```swift title="ContentView.swift"
// Existing code omitted.
func makeNSViewController(context: Context) -> FlutterViewController {
  return FlutterViewController()
}
```

</Tab>
<Tab name="AppKit-Swift">

```swift title="ViewController.swift"
// Existing code omitted.
func showFlutter() {
  let flutterViewController = FlutterViewController()
  self.addChild(flutterViewController)
  flutterViewController.view.frame = self.view.bounds
  presentAsModalWindow(flutterViewController)
}
```

</Tab>
</Tabs>

See [Loading sequence and performance][]
for more explorations on latency and memory usage.

有关延迟与内存使用的更多探讨，请参阅 [加载顺序与性能][Loading sequence and performance]。

## Using the FlutterAppDelegate

## 使用 FlutterAppDelegate

Letting your application's `UIApplicationDelegate` subclass
`FlutterAppDelegate` is recommended but not required.

建议（但非必须）让应用的 `UIApplicationDelegate` 子类化 `FlutterAppDelegate`。

The `FlutterAppDelegate` performs functions such as:

`FlutterAppDelegate` 执行的功能包括：

* Forwarding application callbacks such as [`openURLs`][]
  to plugins such as [google_sign_in][].

  将 [`openURLs`][] 等应用回调转发给 [google_sign_in][] 等插件。

### Creating a FlutterAppDelegate subclass

### 创建 FlutterAppDelegate 子类

Creating a subclass of the `FlutterAppDelegate` in UIKit apps was shown
in the [Start a FlutterEngine and FlutterViewController section][].
In a SwiftUI app, you can create a subclass of the `FlutterAppDelegate`
and annotate it with the [`Observable()`][] macro as follows:

在 UIKit 应用中创建 `FlutterAppDelegate` 子类的方法见 [启动 FlutterEngine 与 FlutterViewController 一节][Start a FlutterEngine and FlutterViewController section]。在 SwiftUI 应用中，可创建 `FlutterAppDelegate` 子类并用 [`Observable()`][] 宏标注，如下所示：

```swift title="MyApp.swift"
import SwiftUI
import FlutterMacOS

@Observable
class AppDelegate: FlutterAppDelegate {
  let flutterEngine = FlutterEngine(name: "my flutter engine", project: nil)

  override func applicationDidFinishLaunching(_ aNotification: Notification) {
    // Runs the default Dart entrypoint with a default Flutter route.
    flutterEngine.run(withEntrypoint: nil)
    // Used to connect plugins (only if you have plugins
    // with macOS platform code).
    RegisterGeneratedPlugins(registry: self.flutterEngine)
  }
}

@main
struct MyApp: App {
  // Use this property wrapper to tell SwiftUI
  // it should use the AppDelegate class for the application delegate
  @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

  var body: some Scene {
    WindowGroup {
      ContentView()
    }
  }
}
```

Then, in your view, the `AppDelegate` is accessible
through the view environment.

随后，在视图中可通过视图环境访问 `AppDelegate`。

```swift title="ContentView.swift"
import SwiftUI
import FlutterMacOS

struct FlutterViewControllerRepresentable: NSViewControllerRepresentable {
  // Access the AppDelegate through the view environment.
  @Environment(AppDelegate.self) var appDelegate

  func makeNSViewController(context: Context) -> FlutterViewController {
    return FlutterViewController(
      engine: appDelegate.flutterEngine,
      nibName: nil,
      bundle: nil
    )
  }

  func updateNSViewController(_ nsViewController: FlutterViewController, context: Context) {}
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

[`FlutterEngine`]: {{site.api}}/macos-embedder/interface_flutter_engine.html
[`FlutterViewController`]: {{site.api}}/macos-embedder/interface_flutter_view_controller.html
[Loading sequence and performance]: /add-to-app/performance
[google_sign_in]: {{site.pub}}/packages/google_sign_in
[`openURLs`]: {{site.apple-dev}}/documentation/appkit/nsapplicationdelegate/application(_:open:)
[Start a FlutterEngine and FlutterViewController section]:/add-to-app/macos/add-flutter-screen/#start-a-flutterengine-and-flutterviewcontroller
[`Observable`]: {{site.apple-dev}}/documentation/observation/observable
[`NavigationLink`]: {{site.apple-dev}}/documentation/swiftui/navigationlink
[`Observable()`]: {{site.apple-dev}}/documentation/observation/observable()
