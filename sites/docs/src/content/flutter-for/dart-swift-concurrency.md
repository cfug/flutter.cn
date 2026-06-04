---
# title: Flutter concurrency for Swift developers
title: 面向 Swift 开发者的 Flutter 并发
# description: >
#   Leverage your Swift concurrency knowledge while learning Flutter and Dart.
description: >
  在学习 Flutter 和 Dart 时发挥你的 Swift 并发知识。
ai-translated: true
---

<?code-excerpt path-base="resources/dart_swift_concurrency"?>

Both Dart and Swift support concurrent programming.
This guide should help you understand how
concurrency works in Dart and how it compares to Swift.
With this understanding, you can create
high-performing iOS apps.

Dart 和 Swift 都支持并发编程。本指南帮助你理解 Dart 中的并发机制及其与 Swift 的对比。掌握这些后，你可以构建高性能 iOS 应用。

When developing in the Apple ecosystem,
some tasks might take a long time to complete.
These tasks include fetching or processing large amounts of data.
iOS developers typically use Grand Central Dispatch (GCD)
to schedule tasks using a shared thread pool.
With GCD, developers add tasks to dispatch queues
and GCD decides on which thread to execute them.

在 Apple 生态中开发时，某些任务可能耗时较长，例如获取或处理大量数据。iOS 开发者通常使用 Grand Central Dispatch（GCD）通过共享线程池调度任务：将任务加入 dispatch 队列，由 GCD 决定在哪条线程执行。

But, GCD spins up threads to
handle remaining work items.
This means you can end up with a large number of threads
and the system can become over committed.
With Swift, the structured concurrency model reduced the number
of threads and context switches.
Now, each core has only one thread.

但 GCD 会创建线程处理剩余工作项，可能导致线程过多、系统过载。Swift 的结构化并发模型减少了线程数和上下文切换，现在每个核心只有一条线程。

Dart has a single-threaded execution model,
with support for `Isolates`, an event loop, and asynchronous code.
An `Isolate` is Dart's implementation of a lightweight thread.
Unless you spawn an `Isolate`, your Dart code runs in the
main UI thread driven by an event loop.
Flutter's event loop is
equivalent to the iOS main loop—in other words,
the Looper attached to the main thread.

Dart 采用单线程执行模型，支持 `Isolate`、事件循环和异步代码。`Isolate` 是 Dart 对轻量线程的实现。除非你 spawn 一个 `Isolate`，否则 Dart 代码在由事件循环驱动的主 UI 线程中运行。Flutter 的事件循环相当于 iOS 主循环，即附加在主线程上的 Looper。

Dart's single-threaded model doesn't mean
you are required to run everything
as a blocking operation that causes the UI to freeze.
Instead, use the asynchronous
features that the Dart language provides,
such as `async`/`await`.

Dart 的单线程模型并不意味着你必须把所有操作都作为阻塞操作导致 UI 冻结，而应使用 Dart 提供的异步特性，例如 `async`/`await`。

## Asynchronous Programming

## 异步编程

An asynchronous operation allows other operations
to execute before it completes.
Both Dart and Swift support asynchronous functions
using the `async` and `await` keywords.
In both cases, `async` marks that a function
performs asynchronous work,
and `await` tells the system to await a result
from function. This means that the Dart VM _could_
suspend the function, if necessary.
For more details on asynchronous programming, check out
[Concurrency in Dart]({{site.dart-site}}/guides/language/concurrency).

异步操作允许其他操作在其完成前执行。Dart 和 Swift 都使用 `async` 和 `await` 关键字支持异步函数：`async` 标记函数执行异步工作，`await` 告诉系统等待函数返回结果，这意味着 Dart VM _可能_ 在必要时挂起该函数。有关异步编程的更多细节，请参阅 [Concurrency in Dart]({{site.dart-site}}/guides/language/concurrency)（Dart 中的并发）。

### Leveraging the main thread/isolate

### 利用主线程 / 主 isolate

For Apple operating systems, the primary (also called the main)
thread is where the application begins running.
Rendering the user interface always happens on the main thread.
One difference between Swift and Dart is that
Swift might use different threads for different tasks,
and Swift doesn't guarantee which thread is used.
So, when dispatching UI updates in Swift,
you might need to ensure that the work occurs on the main thread.

在 Apple 操作系统上，主线程是应用开始运行的地方，用户界面渲染始终在主线程进行。Swift 与 Dart 的一个区别是 Swift 可能对不同任务使用不同线程，且不保证使用哪条线程，因此在 Swift 中调度 UI 更新时可能需要确保工作发生在主线程。

Say you want to write a function that fetches the
weather asynchronously and
displays the results.

假设你要编写一个异步获取天气并显示结果的函数。

In GCD, to manually dispatch a process to the main thread,
you might do something like the following.

在 GCD 中，若要手动将进程派发到主线程，可以这样做。

First, define the `Weather` `enum`:

首先定义 `Weather` `enum`：

```swift
enum Weather: String {
    case rainy, sunny
}
```

Next, define the view model and mark it as an [`@Observable`][]
that publishes the `result` of type `Weather?`.
Use GCD to create a background `DispatchQueue` to
send the work to the pool of threads, and then dispatch
back to the main thread to update the `result`.

接下来定义 view model，标记为 [`@Observable`][]，发布类型为 `Weather?` 的 `result`。使用 GCD 创建后台 `DispatchQueue` 将工作发送到线程池，再派回主线程更新 `result`。

```swift
@Observable class ContentViewModel {
    private(set) var result: Weather?

    private let queue = DispatchQueue(label: "weather_io_queue")
    func load() {
        // Mimic 1 second network delay.
        queue.asyncAfter(deadline: .now() + 1) { [weak self] in
            DispatchQueue.main.async {
                self?.result = .sunny
            }
        }
    }
}
```

Finally, display the results:

最后显示结果：

```swift
struct ContentView: View {
    @State var viewModel = ContentViewModel()
    var body: some View {
        Text(viewModel.result?.rawValue ?? "Loading...")
            .onAppear {
                viewModel.load()
        }
    }
}
```

More recently, Swift introduced _actors_ to support
synchronization for shared, mutable state.
To ensure that work is performed on the main thread,
define a view model class that is marked as a `@MainActor`,
with a `load()` function that internally calls an
asynchronous function using `Task`.

近年来 Swift 引入 _actors_ 以支持共享可变状态的同步。要确保工作在主线程执行，可定义标记为 `@MainActor` 的 view model 类，其 `load()` 内部使用 `Task` 调用异步函数。

```swift
@MainActor @Observable class ContentViewModel {
  private(set) var result: Weather?

  func load() async {
    // Mimic 1 second network delay.
    try? await Task.sleep(nanoseconds: 1_000_000_000)
    self.result = .sunny
  }
}
```

Next, define the view model as a state using `@State`,
with a `load()` function that can be called by the view model:

接下来使用 `@State` 定义 view model，由视图调用 `load()`：

```swift
struct ContentView: View {
  @State var viewModel = ContentViewModel()
  var body: some View {
    Text(viewModel.result?.rawValue ?? "Loading...")
      .task {
        await viewModel.load()
      }
  }
}
```

In Dart, all work runs on the main isolate by default.
To implement the same example in Dart,
first, create the `Weather` `enum`:

在 Dart 中，默认所有工作在主 isolate 上运行。要在 Dart 中实现相同示例，首先创建 `Weather` `enum`：

<?code-excerpt "lib/async_weather.dart (weather)"?>
```dart
enum Weather { rainy, windy, sunny }
```

Then, define a simple view model (similar to what was created in SwiftUI),
to fetch the weather. In Dart, a `Future` object represents a value to be
provided in the future. A `Future` is similar to Swift's `@Observable`.
In this example, a function within the view model
returns a `Future<Weather>` object:

然后定义简单的 view model（类似 SwiftUI 中的做法）以获取天气。在 Dart 中，`Future` 对象表示将来提供的值，与 Swift 的 `@Observable` 类似。本例中 view model 内的函数返回 `Future<Weather>`：

<?code-excerpt "lib/async_weather.dart (home-page-view-model)"?>
```dart
@immutable
class HomePageViewModel {
  const HomePageViewModel();
  Future<Weather> load() async {
    await Future.delayed(const Duration(seconds: 1));
    return Weather.sunny;
  }
}
```

The `load()` function in this example shares
similarities with the Swift code.
The Dart function is marked as `async` because
it uses the `await` keyword.

本例中的 `load()` 与 Swift 代码类似。Dart 函数标记为 `async` 是因为使用了 `await`。

Additionally, a Dart function marked as `async`
automatically returns a `Future`.
In other words, you don't have to create a
`Future` instance manually
inside functions marked as `async`.

此外，标记为 `async` 的 Dart 函数会自动返回 `Future`，即在 `async` 函数内无需手动创建 `Future` 实例。

For the last step, display the weather value.
In Flutter, [`FutureBuilder`]({{site.api}}/flutter/widgets/FutureBuilder-class.html) and
[`StreamBuilder`]({{site.api}}/flutter/widgets/StreamBuilder-class.html)
widgets are used to display the results of a Future in the UI.
The following example uses a `FutureBuilder`:

最后一步是显示天气值。在 Flutter 中，[`FutureBuilder`]({{site.api}}/flutter/widgets/FutureBuilder-class.html) 和 [`StreamBuilder`]({{site.api}}/flutter/widgets/StreamBuilder-class.html) widget 用于在 UI 中显示 Future 的结果。以下示例使用 `FutureBuilder`：

<?code-excerpt "lib/async_weather.dart (home-page-widget)"?>
```dart
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  final HomePageViewModel viewModel = const HomePageViewModel();

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      // Feed a FutureBuilder to your widget tree.
      child: FutureBuilder<Weather>(
        // Specify the Future that you want to track.
        future: viewModel.load(),
        builder: (context, snapshot) {
          // A snapshot is of type `AsyncSnapshot` and contains the
          // state of the Future. By looking if the snapshot contains
          // an error or if the data is null, you can decide what to
          // show to the user.
          if (snapshot.hasData) {
            return Center(child: Text(snapshot.data.toString()));
          } else {
            return const Center(child: CupertinoActivityIndicator());
          }
        },
      ),
    );
  }
}
```

For the complete example, check out the
[async_weather][] file on GitHub.

完整示例请参阅 GitHub 上的 [async_weather][] 文件。

[async_weather]: {{site.repo.this}}/blob/main/examples/resources/dart_swift_concurrency/lib/async_weather.dart

### Leveraging a background thread/isolate

### 利用后台线程 / isolate

Flutter apps can run on a variety of multi-core hardware,
including devices running macOS and iOS.
To improve the performance of these applications,
you must sometimes run tasks on different cores
concurrently. This is especially important
to avoid blocking UI rendering with long-running operations.

Flutter 应用可在多种多核硬件上运行，包括 macOS 和 iOS 设备。为提升性能，有时必须在不同核心上并发运行任务，这对避免长时间操作阻塞 UI 渲染尤为重要。

In Swift, you can leverage GCD to run tasks on global queues
with different quality of service class (qos) properties.
This indicates the task's priority.

在 Swift 中，可利用 GCD 在不同服务质量（qos）的全局队列上运行任务，以表示任务优先级。

```swift
func parse(string: String, completion: @escaping ([String:Any]) -> Void) {
  // Mimic 1 sec delay.
  DispatchQueue(label: "data_processing_queue", qos: .userInitiated)
    .asyncAfter(deadline: .now() + 1) {
      let result: [String:Any] = ["foo": 123]
      completion(result)
    }
  }
}
```

In Dart, you can offload computation to a worker isolate,
often called a background worker.
A common scenario spawns a simple worker isolate and
returns the results in a message when the worker exits.
You can use `Isolate.run()` to spawn an isolate and run computations:

在 Dart 中，可将计算卸载到 worker isolate（常称为后台 worker）。常见场景是 spawn 一个简单的 worker isolate，在 worker 退出时通过消息返回结果。可使用 `Isolate.run()` spawn isolate 并运行计算：

```dart
void main() async {
  // Read some data.
  final jsonData = await Isolate.run(() => jsonDecode(jsonString) as Map<String, dynamic>);`

  // Use that data.
  print('Number of JSON keys: ${jsonData.length}');
}
```

In Flutter, you can also use the `compute` function
to spin up an isolate to run a callback function:

在 Flutter 中，也可使用 `compute` 函数启动 isolate 运行回调：

```dart
final jsonData = await compute(getNumberOfKeys, jsonString);
```

In this case, the callback function is a top-level
function as shown below:

此时回调为如下所示的顶层函数：

```dart
Map<String, dynamic> getNumberOfKeys(String jsonString) {
 return jsonDecode(jsonString);
}
```

You can find more information on Dart at
[Learning Dart as a Swift developer][],
and more information on Flutter at
[Flutter for SwiftUI developers][] or
[Flutter for UIKit developers][].

有关 Dart 的更多信息请参阅 [Learning Dart as a Swift developer][]，有关 Flutter 请参阅 [Flutter for SwiftUI developers][] 或 [Flutter for UIKit developers][]。

[Learning Dart as a Swift developer]: {{site.dart-site}}/guides/language/coming-from/swift-to-dart
[Flutter for SwiftUI developers]: /flutter-for/swiftui-devs
[Flutter for UIKit developers]: /flutter-for/uikit-devs
[`@Observable`]: https://developer.apple.com/documentation/observation/observable()
