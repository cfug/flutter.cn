---
# title: Concurrency and isolates
title: 并发与 isolate
# description: Multithreading in Flutter using Dart isolates.
description: 在 Flutter 中使用 Dart isolate 实现多线程。
ai-translated: true
---

<?code-excerpt path-base="perf/concurrency/isolates/"?>

All Dart code runs in [isolates]({{site.dart-site}}/language/concurrency),
which are similar to threads,
but differ in that isolates have their own isolated memory.
They do not share state in any way,
and can only communicate by messaging.
By default,
Flutter apps do all of their work on a single isolate –
the main isolate.
In most cases, this model allows for simpler programming and
is fast enough that the application's UI doesn't become unresponsive.

所有 Dart 代码在 [isolate]({{site.dart-site}}/language/concurrency) 中运行，类似线程，但各有独立内存，不以任何方式共享状态，只能通过消息通信。默认情况下 Flutter 应用的所有工作都在单个 isolate——主 isolate——上完成。多数情况下该模型使编程更简单，且足够快，应用 UI 不会无响应。

Sometimes though,
applications need to perform exceptionally large computations
that can cause "UI jank" (jerky motion).
If your app is experiencing jank for this reason,
you can move these computations to a helper isolate.
This allows the underlying runtime environment
to run the computation concurrently
with the main UI isolate's work
and takes advantage of multi-core devices.

但有时应用需要执行特别大的计算，可能导致「UI jank」（卡顿）。若因此出现 jank，可将计算移到辅助 isolate，让运行时环境与主 UI isolate 的工作并发执行，并利用多核设备。

Each isolate has its own memory
and its own event loop.
The event loop processes
events in the order that they're added to an event queue.
On the main isolate,
these events can be anything from handling a user tapping in the UI,
to executing a function,
to painting a frame on the screen.

每个 isolate 有独立内存和事件循环。事件循环按加入事件队列的顺序处理事件。在主 isolate 上，这些事件可以是处理 UI 点击、执行函数或在屏幕上绘制一帧等。
The following figure shows an example event queue
with 3 events waiting to be processed.

![The main isolate diagram](/assets/images/docs/development/concurrency/basics-main-isolate.png){:width="50%" .diagram-wrap}

For smooth rendering,
Flutter adds a "paint frame" event to the event queue
60 times per second(for a 60Hz device).
If these events aren't processed on time,
the application experiences UI jank,
or worse,
become unresponsive altogether.

为流畅渲染，Flutter 每秒向事件队列添加 60 次「paint frame」事件（60Hz 设备）。若这些事件未及时处理，应用会出现 UI jank，甚至更糟——完全无响应。

![Event jank diagram](/assets/images/docs/development/concurrency/event-jank.png){:width="60%" .diagram-wrap}

Whenever a process can't be completed in a frame gap,
the time between two frames,
it's a good idea to offload the work to another isolate
to ensure that the main isolate can produce 60 frames per second.
When you spawn an isolate in Dart,
it can process the work concurrently with the main isolate,
without blocking it.

若某过程无法在帧间隔（两帧之间的时间）内完成，最好将工作卸载到另一 isolate，确保主 isolate 每秒产出 60 帧。在 Dart 中 spawn isolate 时，它可与主 isolate 并发处理工作而不阻塞主 isolate。

You can read more about how isolates
and the event loop work in Dart on
the [concurrency page][] of the Dart
documentation.

有关 isolate 与事件循环的更多说明，请参阅 Dart 文档的 [concurrency page][]（并发页面）。

[concurrency page]: {{site.dart-site}}/language/concurrency

<YouTubeEmbed id="vl_AaCgudcY" title="Isolates and the event loop | Flutter in Focus"></YouTubeEmbed>

## Common use cases for isolates

## isolate 的常见用例

There is only one hard rule for when you should use isolates,
and that's when large computations are causing your Flutter application
to experience UI jank.
This jank happens when there is any computation that takes longer than
Flutter's frame gap.

何时应使用 isolate 只有一条硬性规则：大型计算导致 Flutter 应用出现 UI jank。当任何计算耗时超过 Flutter 的帧间隔时就会出现 jank。

![Event jank diagram](/assets/images/docs/development/concurrency/event-jank.png){:width="60%" .diagram-wrap}

Any process _could_ take longer to complete,
depending on the implementation
and the input data,
making it impossible to create an exhaustive list of
when you need to consider using isolates.

That said, isolates are commonly used for the following:

此外，isolate 常用于以下场景：

- Reading data from a local database

  从本地数据库读取数据
- Sending push notifications

  发送推送通知
- Parsing and decoding large data files

  解析和解码大型数据文件
- Processing or compressing photos, audio files, and video files

  处理或压缩照片、音频和视频文件
- Converting audio and video files

  转换音频和视频文件
- When you need asynchronous support while using FFI

  使用 FFI 时需要异步支持
- Applying filtering to complex lists or filesystems

  对复杂列表或文件系统应用过滤

## Message passing between isolates

## isolate 之间的消息传递

Dart's isolates are an implementation of the [Actor model][].
They can only communicate with each other by message passing,
which is done with [`Port` objects][].
When messages are "passed" between each other,
they are generally copied from the sending isolate to the
receiving isolate.
This means that any value passed to an isolate,
even if mutated on that isolate,
doesn't change the value on the original isolate.

Dart 的 isolate 是 [Actor model][]（Actor 模型）的实现，只能通过 [`Port` objects][] 进行消息传递通信。消息在 isolate 之间「传递」时，通常从发送 isolate 复制到接收 isolate，因此传给 isolate 的值即使在该 isolate 上被修改，也不会改变原 isolate 上的值。

The only [objects that aren't copied when passed][] to an isolate
are immutable objects that can't be changed anyway,
such a String or an unmodifiable byte.
When you pass an immutable object between isolates,
a reference to that object is sent across the port,
rather than the object being copied,
for better performance.
Because immutable objects can't be updated,
this effectively retains the actor model behavior.

传给 isolate 时 [objects that aren't copied when passed][]（不复制的对象）仅包括不可变对象，如 String 或不可修改的字节。传递不可变对象时，为提升性能会发送引用而非复制对象。因不可变对象无法更新，这有效保持了 Actor 模型行为。

[`Port` objects]: {{site.dart.api}}/dart-isolate/ReceivePort-class.html
[objects that aren't copied when passed]: {{site.dart.api}}/dart-isolate/SendPort/send.html

An exception to this rule is
when an isolate exits when it sends a message using the `Isolate.exit` method.
Because the sending isolate won't exist after sending the message,
it can pass ownership of the message from one isolate to the other,
ensuring that only one isolate can access the message.

例外是使用 `Isolate.exit` 发送消息时 isolate 退出：因发送 isolate 发送后不再存在，可将消息所有权从一个 isolate 转给另一个，确保只有一个 isolate 能访问该消息。

The two lowest-level primitives that send messages are `SendPort.send`,
which makes a copy of a mutable message as it sends,
and `Isolate.exit`,
which sends the reference to the message.
Both `Isolate.run` and `compute`
use `Isolate.exit` under the hood.

发送消息的两种底层原语是 `SendPort.send`（发送时复制可变消息）和 `Isolate.exit`（发送消息引用）。`Isolate.run` 和 `compute` 底层都使用 `Isolate.exit`。

## Short-lived isolates

## 短期 isolate

The easiest way to move a process to an isolate in Flutter is with
the `Isolate.run` method.
This method spawns an isolate,
passes a callback to the spawned isolate to start some computation,
returns a value from the computation,
and then shuts the isolate down when the computation is complete.
This all happens concurrently with the main isolate,
and doesn't block it.

在 Flutter 中将过程移到 isolate 的最简单方式是使用 `Isolate.run`。该方法 spawn isolate，向 spawn 的 isolate 传递回调以开始计算，返回计算结果，计算完成后关闭 isolate。这一切与主 isolate 并发进行，不会阻塞主 isolate。

![Isolate diagram](/assets/images/docs/development/concurrency/isolate-bg-worker.png){:width="70%" .diagram-wrap}

The `Isolate.run` method requires a single argument,
a callback function,
that is run on the new isolate.
This callback's function signature must have exactly
one required, unnamed argument.
When the computation completes,
it returns the callback's value back to the main isolate,
and exits the spawned isolate.

`Isolate.run` 需要一个参数：在新 isolate 上运行的回调函数。该回调的函数签名必须恰好有一个必需的无名参数。计算完成后，将回调的返回值返回主 isolate 并退出 spawn 的 isolate。

For example,
consider this code that loads a large JSON blob from a file,
and converts that JSON into custom Dart objects.
If the json decoding process wasn't off loaded to a new isolate,
this method would cause the UI to
become unresponsive for several seconds.

例如，以下代码从文件加载大型 JSON 并转换为自定义 Dart 对象。若 JSON 解码未卸载到新 isolate，该方法会使 UI 数秒无响应。

<?code-excerpt "lib/main.dart (isolate-run)"?>
```dart
// Produces a list of 211,640 photo objects.
// (The JSON file is ~20MB.)
Future<List<Photo>> getPhotos() async {
  final String jsonString = await rootBundle.loadString('assets/photos.json');
  final List<Photo> photos = await Isolate.run<List<Photo>>(() {
    final List<Object?> photoData = jsonDecode(jsonString) as List<Object?>;
    return photoData.cast<Map<String, Object?>>().map(Photo.fromJson).toList();
  });
  return photos;
}
```

For a complete walkthrough of using Isolates to
parse JSON in the background, see [this cookbook recipe][].

有关在后台使用 Isolate 解析 JSON 的完整 walkthrough，请参阅 [this cookbook recipe][]（cookbook 食谱）。

[this cookbook recipe]: /cookbook/networking/background-parsing

## Stateful, longer-lived isolates

## 有状态的长期 isolate

Short-live isolates are convenient to use,
but there is performance overhead required to spawn new isolates,
and to copy objects from one isolate to another.
If you're doing the same computation using `Isolate.run` repeatedly,
you might have better performance by creating isolates that don't exit immediately.

短期 isolate 使用方便，但 spawn 新 isolate 和在 isolate 间复制对象有性能开销。若反复用 `Isolate.run` 做相同计算，创建不立即退出的 isolate 可能性能更好。

To do this, you can use a handful of lower-level isolate-related APIs that
`Isolate.run` abstracts:

为此可使用 `Isolate.run` 所封装的一些底层 isolate API：

- [`Isolate.spawn()`][] and [`Isolate.exit()`][]
- [`ReceivePort`][] and [`SendPort`][]
- [`send()`][] method

When you use the `Isolate.run` method,
the new isolate immediately shuts down after it
returns a single message to the main isolate.
Sometimes, you'll need isolates that are long lived,
and can pass multiple messages to each other over time.
In Dart, you can accomplish this with the Isolate API
and Ports.
These long-lived isolates are colloquially known as _background workers_.

使用 `Isolate.run` 时，新 isolate 在向主 isolate 返回单条消息后立即关闭。有时你需要长期存活、可随时间互发多条消息的 isolate。在 Dart 中可用 Isolate API 和 Port 实现，这些长期 isolate 俗称 _background workers_（后台 worker）。

Long-lived isolates are useful when you have a specific process that either
needs to be run repeatedly throughout the lifetime of your application,
or if you have a process that runs over a period of time
and needs to yield multiple return values to the main isolate.

长期 isolate 适用于需要在应用生命周期内反复运行的特定过程，或在一段时间内运行并需向主 isolate 产生多个返回值的过程。

Or, you might use [worker_manager][] to manage long-lived isolates.

[worker_manager]: {{site.pub-pkg}}/worker_manager

### ReceivePorts and SendPorts

### ReceivePort 与 SendPort

Set up long-lived communication between isolates with two classes
(in addition to Isolate):
[`ReceivePort`][] and [`SendPort`][].
These ports are the only way isolates can communicate with each other.

`Ports` behave similarly to `Streams`,
in which the `StreamController`
or `Sink` is created in one isolate,
and the listener is set up in the other isolate.
In this analogy,
the `StreamController` is called a `SendPort`,
and you can "add" messages with the `send()` method.
`ReceivePort`s are the listeners,
and when these listeners receive a new message,
they call a provided callback with the message as an argument.

`Port` 的行为类似 `Stream`：在一个 isolate 中创建 `StreamController` 或 `Sink`，在另一个 isolate 中设置监听器。类比中 `StreamController` 称为 `SendPort`，可用 `send()`「添加」消息；`ReceivePort` 是监听器，收到新消息时用消息作为参数调用提供的回调。

For an in-depth explanation on setting up two-way
communication between the main isolate
and a worker isolate,
follow the examples in the [Dart documentation][].

有关主 isolate 与 worker isolate 之间双向通信的深入说明，请参阅 [Dart documentation][]（Dart 文档）中的示例。

[Dart documentation]: {{site.dart-site}}/language/concurrency

## Using platform plugins in isolates

## 在 isolate 中使用平台插件

You can use platform plugins in background isolates.
This enables plugins to offload heavy, platform-dependent
computations to an isolate that won't block your UI.
For example, imagine you're encrypting data using a native host API
(such as an Android API on Android, an iOS API on iOS, and so on).
Previously, [marshaling data][] to the host platform could waste UI thread time,
and can now be done in a background isolate.

可在后台 isolate 中使用平台插件，使插件将繁重的平台相关计算卸载到不阻塞 UI 的 isolate。例如使用原生宿主 API 加密数据时，以前 [marshaling data][]（编组数据）到宿主平台可能占用 UI 线程时间，现可在后台 isolate 完成。

Platform channel isolates use the [`BackgroundIsolateBinaryMessenger`][] API.
The following snippet shows an example of using
the `shared_preferences` package in a background isolate.

以下片段展示在后台 isolate 中使用 `shared_preferences` 包的示例。

<?code-excerpt "lib/isolate_binary_messenger.dart"?>
```dart
import 'dart:isolate';

import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  // Identify the root isolate to pass to the background isolate.
  RootIsolateToken rootIsolateToken = RootIsolateToken.instance!;
  Isolate.spawn(_isolateMain, rootIsolateToken);
}

Future<void> _isolateMain(RootIsolateToken rootIsolateToken) async {
  // Register the background isolate with the root isolate.
  BackgroundIsolateBinaryMessenger.ensureInitialized(rootIsolateToken);

  // You can now use the shared_preferences plugin.
  SharedPreferences sharedPreferences = await SharedPreferences.getInstance();

  print(sharedPreferences.getBool('isDebug'));
}
```

## Limitations of Isolates

## Isolate 的限制

If you're coming to Dart from a language with multithreading,
it's reasonable to expect isolates to behave like threads,
but that isn't the case.
Isolates have their own global fields,
and can only communicate with message passing,
ensuring that mutable objects in an isolate are only ever accessible
in a single isolate.
Therefore, isolates are limited by their access to their own memory.
For example,
if you have an application with a global mutable variable called `configuration`,
it is copied as a new global field in a spawned isolate.
If you mutate that variable in the spawned isolate,
it remains untouched in the main isolate.
This is true even if you pass the `configuration` object as a message
to the new isolate.
This is how isolates are meant to function,
and it's important to keep in mind when you consider using isolates.

若你来自支持多线程的语言，可能预期 isolate 像线程一样工作，但事实并非如此。isolate 有独立全局字段，只能通过消息传递通信，确保可变对象仅在一个 isolate 中可访问，因此受限于自身内存访问。例如应用有全局可变变量 `configuration`，spawn 的 isolate 会复制为新全局字段；在 spawn 的 isolate 中修改该变量，主 isolate 中不变，即使将 `configuration` 作为消息传给新 isolate 亦然。这是 isolate 的设计行为，考虑使用 isolate 时需牢记。

### Web platforms and compute

### Web 平台与 compute

Dart web platforms, including Flutter web,
don't support isolates.
If you're targeting the web with your Flutter app,
you can use the `compute` method to ensure your code compiles.
The [`compute()`][] method runs the computation on
the main thread on the web,
but spawns a new thread on mobile devices.
On mobile and desktop platforms
`await compute(fun, message)`
is equivalent to `await Isolate.run(() => fun(message))`.

包括 Flutter web 在内的 Dart Web 平台不支持 isolate。若 Flutter 应用面向 Web，可使用 `compute` 确保代码能编译。[`compute()`][] 在 Web 上于主线程运行计算，在移动设备上 spawn 新线程。在移动和桌面平台上 `await compute(fun, message)` 等价于 `await Isolate.run(() => fun(message))`。

For more information on concurrency on the web,
check out the [concurrency documentation][] on dart.dev.

有关 Web 并发的更多信息，请参阅 dart.dev 的 [concurrency documentation][]（并发文档）。

[concurrency documentation]: {{site.dart-site}}/language/concurrency

### No `rootBundle` access or `dart:ui` methods

### 无法访问 `rootBundle` 或 `dart:ui` 方法

All UI tasks and Flutter itself are coupled to the main isolate.
Therefore,
you can't access assets using `rootBundle` in spawned isolates,
nor can you perform any widget
or UI work in spawned isolates.

所有 UI 任务和 Flutter 本身都与主 isolate 绑定，因此无法在 spawn 的 isolate 中用 `rootBundle` 访问资源，也不能在 spawn 的 isolate 中执行 widget 或 UI 工作。

### Limited plugin messages from host platform to Flutter

### 从宿主平台到 Flutter 的插件消息受限

With background isolate platform channels,
you can use platform channels in isolates to send messages to the host platform
(for example Android or iOS),
and receive responses to those messages.
However, you can't receive unsolicited messages from the host platform.

通过后台 isolate 平台通道，可在 isolate 中使用平台通道向宿主平台（如 Android 或 iOS）发送消息并接收响应，但无法接收来自宿主平台的主动消息。

As an example,
you can't set up a long-lived Firestore listener in a background isolate,
because Firestore uses platform channels to push updates to Flutter,
which are unsolicited.
You can, however, query Firestore for a response in the background.

例如，无法在后台 isolate 中设置长期 Firestore 监听器，因为 Firestore 通过平台通道向 Flutter 推送主动更新。但可在后台查询 Firestore 获取响应。

## More information

## 更多信息

For more information on isolates, check out the following resources:

有关 isolate 的更多信息，请参阅以下资源：

- If you're using many isolates, consider the [IsolateNameServer][] class in Flutter,
or the pub package that clones the functionality for Dart applications not using
Flutter.

  若使用多个 isolate，可考虑 Flutter 的 [IsolateNameServer][] 类，或为非 Flutter 的 Dart 应用使用复制该功能的 pub 包。
- Dart's Isolates are an implementation of the [Actor model][].

  Dart 的 Isolate 是 [Actor model][] 的实现。
- [isolate_agents][] is a package that abstracts Ports and make it easier to create long-lived isolates.

  [isolate_agents][] 是抽象 Port、便于创建长期 isolate 的包。
- Read more about the `BackgroundIsolateBinaryMessenger` API [announcement][].

  阅读 `BackgroundIsolateBinaryMessenger` API [announcement][]（公告）的更多内容。

[announcement]: {{site.flutter-blog}}/introducing-background-isolate-channels-7a299609cad8
[Actor model]: https://en.wikipedia.org/wiki/Actor_model
[isolate_agents]: {{site.medium}}/@gaaclarke/isolate-agents-easy-isolates-for-flutter-6d75bf69a2e7
[marshaling data]: https://en.wikipedia.org/wiki/Marshalling_(computer_science)
[`compute()`]: {{site.api}}/flutter/foundation/compute.html
[`Isolate.spawn()`]: {{site.dart.api}}/dart-isolate/Isolate/spawn.html
[`Isolate.exit()`]: {{site.dart.api}}/dart-isolate/Isolate/exit.html
[`ReceivePort`]: {{site.dart.api}}/dart-isolate/ReceivePort-class.html
[`SendPort`]: {{site.dart.api}}/dart-isolate/SendPort-class.html
[`send()`]: {{site.dart.api}}/dart-isolate/SendPort/send.html
[`BackgroundIsolateBinaryMessenger`]: {{site.api}}/flutter/services/BackgroundIsolateBinaryMessenger-class.html
[IsolateNameServer]: {{site.api}}/flutter/dart-ui/IsolateNameServer-class.html
