---
# title: State management
title: 状态管理
# description: Learn how to manage state in Flutter.
description: 学习如何在 Flutter 中管理状态。
prev:
  # title: Layout
  title: 布局
  path: /get-started/fundamentals/layout
next:
  # title: Handling user input
  title: 处理用户输入
  path: /get-started/fundamentals/user-input
---

The _state_ of a Flutter app refers to all the objects it uses
to display its UI or manage system resources.
State management is how we organize our app
to most effectively access these objects
and share them between different widgets.

Flutter 应用的_状态_指的是它用于显示 UI 或管理系统资源的所有对象。
状态管理是我们组织应用的方式，
以便最有效地访问这些对象并在不同的 Widget 之间共享它们。

This page explores many aspects of state management, including:

本页面探讨状态管理的多个方面，包括：

* Using a [`StatefulWidget`][]
* Sharing state between widgets using constructors,
  [`InheritedWidget`][]s, and callbacks
* Using [`Listenable`][]s to notify other widgets
  when something changes
* Using Model-View-ViewModel (MVVM)
  for your application's architecture

* 使用 [`StatefulWidget`][]
* 使用构造函数、[`InheritedWidget`][] 和回调在 Widget 之间共享状态
* 使用 [`Listenable`][] 在某些内容发生变化时通知其他 Widget
* 使用 Model-View-ViewModel (MVVM) 作为应用程序的架构

For other introductions to state management, check out these resources:

有关状态管理的其他介绍，请查看以下资源：

* Video: [Managing state in Flutter][managing-state-video].
  This video shows how to use the [riverpod][] package.

* 视频：[在 Flutter 中管理状态][managing-state-video]。
  该视频展示了如何使用 [riverpod][] 包。

<i class="material-symbols" aria-hidden="true" translate="no">flutter_dash</i> Tutorial:
[State management][].
This shows how to use `ChangeNotifer` with the [provider][] package.

<i class="material-symbols" aria-hidden="true" translate="no">flutter_dash</i> 教程：
[状态管理][State management]。
这展示了如何将 `ChangeNotifier` 与 [provider][] 包一起使用。

This guide doesn't use third-party packages
like provider or Riverpod. Instead,
it only uses primitives available in the Flutter framework.

本指南不使用 provider 或 Riverpod 等第三方包。
相反，它只使用 Flutter 框架中可用的基础组件。

## Using a StatefulWidget

## 使用 StatefulWidget

The simplest way to manage state is to use a `StatefulWidget`,
which stores state within itself.
For example, consider the following widget:

管理状态最简单的方法是使用 `StatefulWidget`，它将状态存储在自身内部。
例如，考虑以下 Widget：

```dart
class MyCounter extends StatefulWidget {
  const MyCounter({super.key});

  @override
  State<MyCounter> createState() => _MyCounterState();
}

class _MyCounterState extends State<MyCounter> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $count'),
        TextButton(
          onPressed: () {
            setState(() {
              count++;
            });
          },
          child: Text('Increment'),
        )
      ],
    );
  }
}
```

This code illustrates two important concepts
when thinking about state management:

此代码说明了在考虑状态管理时的两个重要概念：

* **Encapsulation**
: The widget that uses `MyCounter` has no visibility into
  the underlying `count` variable
  and no means to access or change it.
* **Object lifecycle**
: The `_MyCounterState` object and its `count` variable
  are created the first time that `MyCounter` is built,
  and exist until it's removed from the screen.
  This is an example of _ephemeral state_.

* **封装**
：使用 `MyCounter` 的 Widget 无法看到底层的 `count` 变量，
  也无法访问或更改它。
* **对象生命周期**
：`_MyCounterState` 对象及其 `count` 变量
  在 `MyCounter` 首次构建时创建，
  并一直存在直到它从屏幕上移除。
  这是_临时状态_的一个例子。

You might find the following resources to be useful:

你可能会发现以下资源很有用：

* Article: [Ephemeral state and app state][ephemeral-state]
* API docs: [StatefulWidget][]

* 文章：[临时状态和应用状态][ephemeral-state]
* API 文档：[StatefulWidget][]

## Sharing state between widgets

## 在 Widget 之间共享状态

Some scenarios where an app needs to store state
include the following:

应用需要存储状态的一些场景包括以下几种：

* To **update** the shared state and notify other parts of the app
* To **listen** for changes to the shared state
  and rebuild the UI when it changes

* **更新**共享状态并通知应用的其他部分
* **监听**共享状态的变化并在变化时重建 UI

This section explores how you can effectively share state
between different widgets in your app.
The most common patterns are:

本节探讨如何在应用中的不同 Widget 之间有效地共享状态。
最常见的模式有：

* **Using widget constructors**
  (sometimes called "prop drilling" in other frameworks)
* **Using `InheritedWidget`** (or a similar API,
  such as the [provider][] package).
* **Using callbacks** to notify a parent widget
  that something has changed

* **使用 Widget 构造函数**
  （在其他框架中有时称为「prop drilling」）
* **使用 `InheritedWidget`**（或类似的 API，
  如 [provider][] 包）。
* **使用回调**通知父 Widget 某些内容已更改

### Using widget constructors

### 使用 Widget 构造函数

Since Dart objects are passed by reference,
it's very common for widgets to define the
objects they need to use in their constructor.
Any state you pass into a widget's constructor
can be used to build its UI:

由于 Dart 对象是按引用传递的，
Widget 在其构造函数中定义它们需要使用的对象是很常见的。
你传递给 Widget 构造函数的任何状态都可以用于构建其 UI：

```dart
class MyCounter extends StatelessWidget {
  final int count;
  const MyCounter({super.key, required this.count});

  @override
  Widget build(BuildContext context) {
    return Text('$count');
  }
}
```

This makes it obvious for other users of your widget to know
what they need to provide in order to use it:

这使得你的 Widget 的其他用户可以清楚地知道他们需要提供什么才能使用它：

```dart
Column(
  children: [
    MyCounter(
      count: count,
    ),
    MyCounter(
      count: count,
    ),
    TextButton(
      child: Text('Increment'),
      onPressed: () {
        setState(() {
          count++;
        });
      },
    )
  ],
)
```

Passing the shared data for your app through widget constructors
makes it clear to anyone reading the code that there are shared dependencies.
This is a common design pattern called _dependency injection_
and many frameworks take advantage of it or provide tools to make it easier.

通过 Widget 构造函数传递应用的共享数据，
可以让任何阅读代码的人清楚地了解存在共享依赖关系。
这是一种常见的设计模式，称为_依赖注入_，
许多框架都利用它或提供工具使其更容易实现。

### Using InheritedWidget

### 使用 InheritedWidget

Manually passing data down the widget tree can be verbose
and cause unwanted boilerplate code,
so Flutter provides _`InheritedWidget`_,
which provides a way to efficiently host data in a parent widget
so that child widgets can access them without storing them as a field.

手动将数据向下传递到 Widget 树可能会很繁琐，
并导致不必要的样板代码，
因此 Flutter 提供了 _`InheritedWidget`_，
它提供了一种在父 Widget 中高效托管数据的方式，
以便子 Widget 可以访问它们而无需将它们存储为字段。

To use `InheritedWidget`, extend the `InheritedWidget` class
and implement the static method `of()`
using `dependOnInheritedWidgetOfExactType`.
A widget calling `of()` in a build method
creates a dependency that is managed by the Flutter framework,
so that any widgets that depend on this `InheritedWidget` rebuild
when this widget re-builds with new data
and `updateShouldNotify` returns true.

要使用 `InheritedWidget`，请扩展 `InheritedWidget` 类
并使用 `dependOnInheritedWidgetOfExactType` 实现静态方法 `of()`。
在 build 方法中调用 `of()` 的 Widget
会创建一个由 Flutter 框架管理的依赖关系，
因此当此 Widget 使用新数据重建
且 `updateShouldNotify` 返回 true 时，
依赖于此 `InheritedWidget` 的任何 Widget 都会重建。

```dart
class MyState extends InheritedWidget {
  const MyState({
    super.key,
    required this.data,
    required super.child,
  });

  final String data;

  static MyState of(BuildContext context) {
    // This method looks for the nearest `MyState` widget ancestor.
    final result = context.dependOnInheritedWidgetOfExactType<MyState>();

    assert(result != null, 'No MyState found in context');

    return result!;
  }

  @override
  // This method should return true if the old widget's data is different
  // from this widget's data. If true, any widgets that depend on this widget
  // by calling `of()` will be re-built.
  bool updateShouldNotify(MyState oldWidget) => data != oldWidget.data;
}
```

Next, call the `of()` method
from the `build()`method of the widget
that needs access to the shared state:

接下来，从需要访问共享状态的 Widget 的 `build()` 方法中调用 `of()` 方法：

```dart
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    var data = MyState.of(context).data;
    return Scaffold(
      body: Center(
        child: Text(data),
      ),
    );
  }
}
```


### Using callbacks

### 使用回调

You can notify other widgets when a value changes by exposing a callback.
Flutter provides the `ValueChanged` type,
which declares a function callback with a single parameter:

你可以通过暴露回调来在值更改时通知其他 Widget。
Flutter 提供了 `ValueChanged` 类型，
它声明了一个带有单个参数的函数回调：

```dart
typedef ValueChanged<T> = void Function(T value);
```

By exposing `onChanged` in your widget's constructor,
you provide a way for any widget that is using this widget
to respond when your widget calls `onChanged`.

通过在 Widget 的构造函数中暴露 `onChanged`，
你为使用此 Widget 的任何 Widget 提供了一种方式，
以便在你的 Widget 调用 `onChanged` 时做出响应。

```dart
class MyCounter extends StatefulWidget {
  const MyCounter({super.key, required this.onChanged});

  final ValueChanged<int> onChanged;

  @override
  State<MyCounter> createState() => _MyCounterState();
}
```

For example, this widget might handle the `onPressed` callback,
and call `onChanged` with its latest internal state for the `count` variable:

例如，这个 Widget 可能会处理 `onPressed` 回调，
并使用 `count` 变量的最新内部状态调用 `onChanged`：

```dart
TextButton(
  onPressed: () {
    widget.onChanged(count++);
  },
),
```

### Dive deeper

### 深入了解

For more information on sharing state between widgets,
check out the following resources:

有关在 Widget 之间共享状态的更多信息，请查看以下资源：

* Article: [Flutter Architectural Overview—State management][architecture-state]
* Video: [Pragmatic state management][]
* Video: [InheritedWidgets][inherited-widget-video]
* Video: [A guide to Inherited Widgets][]
* Sample: [Provider shopper][]
* Sample: [Provider counter][]
* API Docs: [`InheritedWidget`][]

* 文章：[Flutter 架构概述—状态管理][architecture-state]
* 视频：[实用状态管理][Pragmatic state management]
* 视频：[InheritedWidgets][inherited-widget-video]
* 视频：[InheritedWidget 指南][A guide to Inherited Widgets]
* 示例：[Provider shopper][]
* 示例：[Provider counter][]
* API 文档：[`InheritedWidget`][]

## Using listenables

## 使用 Listenable

Now that you've chosen how you want to share state in your app,
how do you update the UI when it changes?
How do you change the shared state in a way
that notifies other parts of the app?

既然你已经选择了如何在应用中共享状态，
那么当状态发生变化时如何更新 UI？
如何以一种能通知应用其他部分的方式来更改共享状态？

Flutter provides an abstract class called `Listenable`
that can update one or more listeners.
Some useful ways to use listenables are:

Flutter 提供了一个名为 `Listenable` 的抽象类，
它可以更新一个或多个监听器。
使用 Listenable 的一些有用方式包括：

* Use a `ChangeNotifier` and subscribe to it using a `ListenableBuilder`
* Use a `ValueNotifier` with a `ValueListenableBuilder`

* 使用 `ChangeNotifier` 并通过 `ListenableBuilder` 订阅它
* 使用 `ValueNotifier` 配合 `ValueListenableBuilder`

### ChangeNotifier

To use `ChangeNotifier`, create a class that extends it,
and call `notifyListeners` whenever the class needs to notify its listeners.

要使用 `ChangeNotifier`，请创建一个继承它的类，
并在该类需要通知其监听器时调用 `notifyListeners`。

```dart
class CounterNotifier extends ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}
```

Then pass it to `ListenableBuilder`
to ensure that the subtree returned by the `builder` function
is re-built whenever the `ChangeNotifier` updates its listeners.

然后将其传递给 `ListenableBuilder`，
以确保每当 `ChangeNotifier` 更新其监听器时，
由 `builder` 函数返回的子树都会重建。

```dart
Column(
  children: [
    ListenableBuilder(
      listenable: counterNotifier,
      builder: (context, child) {
        return Text('counter: ${counterNotifier.count}');
      },
    ),
    TextButton(
      child: Text('Increment'),
      onPressed: () {
        counterNotifier.increment();
      },
    ),
  ],
)
```

### ValueNotifier

A [`ValueNotifier`][] is a simpler version of a `ChangeNotifier`,
that stores a single value.
It implements the `ValueListenable` and `Listenable` interfaces,
so it's compatible
with widgets such as `ListenableBuilder` and `ValueListenableBuilder`.
To use it, create an instance of `ValueNotifier` with the initial value:

[`ValueNotifier`][] 是 `ChangeNotifier` 的一个更简单的版本，
它存储单个值。
它实现了 `ValueListenable` 和 `Listenable` 接口，
因此它与 `ListenableBuilder` 和 `ValueListenableBuilder` 等 Widget 兼容。
要使用它，请使用初始值创建一个 `ValueNotifier` 实例：

```dart
ValueNotifier<int> counterNotifier = ValueNotifier(0);
```

Then use the `value` field to read or update the value,
and notify any listeners that the value has changed.
Because `ValueNotifier` extends `ChangeNotifier`,
it is also a `Listenable` and can be used with a `ListenableBuilder`.
But you can also use `ValueListenableBuilder`,
which provides the value in the `builder` callback:

然后使用 `value` 字段来读取或更新值，
并通知所有监听器值已更改。
因为 `ValueNotifier` 继承自 `ChangeNotifier`，
所以它也是一个 `Listenable`，可以与 `ListenableBuilder` 一起使用。
但你也可以使用 `ValueListenableBuilder`，
它在 `builder` 回调中提供值：

```dart
Column(
  children: [
    ValueListenableBuilder(
      valueListenable: counterNotifier,
      builder: (context, value, child) {
        return Text('counter: $value');
      },
    ),
    TextButton(
      child: Text('Increment'),
      onPressed: () {
        counterNotifier.value++;
      },
    ),
  ],
)
```

### Deep dive

### 深入探索

To learn more about `Listenable` objects, check out the following resources:

要了解更多关于 `Listenable` 对象的信息，请查看以下资源：

* API Docs: [`Listenable`][]
* API Docs: [`ValueNotifier`][]
* API Docs: [`ValueListenable`][]
* API Docs: [`ChangeNotifier`][]
* API Docs: [`ListenableBuilder`][]
* API Docs: [`ValueListenableBuilder`][]
* API Docs: [`InheritedNotifier`][]

* API 文档：[`Listenable`][]
* API 文档：[`ValueNotifier`][]
* API 文档：[`ValueListenable`][]
* API 文档：[`ChangeNotifier`][]
* API 文档：[`ListenableBuilder`][]
* API 文档：[`ValueListenableBuilder`][]
* API 文档：[`InheritedNotifier`][]

## Using MVVM for your application's architecture

## 为应用程序架构使用 MVVM

Now that we understand how to share state
and notify other parts of the app when its state changes,
we're ready to start thinking about how to organize
the stateful objects in our app.

既然我们已经了解了如何共享状态
以及在状态变化时通知应用的其他部分，
我们就可以开始考虑如何组织应用中的有状态对象了。

This section describes how to implement a design pattern that works well
with reactive frameworks like Flutter,
called _Model-View-ViewModel_ or _MVVM_.

本节介绍如何实现一种与 Flutter 等响应式框架配合良好的设计模式，
称为 _Model-View-ViewModel_ 或 _MVVM_。

### Defining the Model

### 定义 Model

The Model is typically a Dart class that does low-level tasks
such as making HTTP requests,
caching data, or managing system resources such as a plugin.
A model doesn't usually need to import Flutter libraries.

Model 通常是一个执行底层任务的 Dart 类，
例如发起 HTTP 请求、缓存数据或管理插件等系统资源。
Model 通常不需要导入 Flutter 库。

For example, consider a model that loads or updates the counter state
using an HTTP client:

例如，考虑一个使用 HTTP 客户端加载或更新计数器状态的 Model：

```dart
import 'package:http/http.dart';

class CounterData {
  CounterData(this.count);

  final int count;
}

class CounterModel {
  Future<CounterData> loadCountFromServer() async {
    final uri = Uri.parse('https://myfluttercounterapp.net/count');
    final response = await get(uri);

    if (response.statusCode != 200) {
      throw ('Failed to update resource');
    }

    return CounterData(int.parse(response.body));
  }

  Future<CounterData> updateCountOnServer(int newCount) async {
    // ...
  }
}
```

This model doesn't use any Flutter primitives or make any assumptions
about the platform it's running on;
its only job is to fetch or update the count using its HTTP client.
This allows the model to be implemented with a Mock or Fake in unit tests,
and defines clear boundaries between your app's low-level components and the
higher-level UI components needed to build the full app.

这个 Model 不使用任何 Flutter 基础组件，也不对其运行的平台做任何假设；
它的唯一工作是使用 HTTP 客户端获取或更新计数。
这使得 Model 可以在单元测试中使用 Mock 或 Fake 来实现，
并在应用的底层组件和构建完整应用所需的高级 UI 组件之间定义清晰的边界。

The `CounterData` class defines the structure of the data
and is the true "model" of our application.
The model layer is typically responsible for the core algorithms
and data structures needed for your app.
If you are interested in other ways to define the model,
such as using immutable value types,
check out packages like [freezed][]
or [build_collection][] on pub.dev.

`CounterData` 类定义了数据的结构，是我们应用程序真正的「模型」。
Model 层通常负责应用所需的核心算法和数据结构。
如果你对定义 Model 的其他方式感兴趣，
例如使用不可变值类型，
可以查看 pub.dev 上的 [freezed][] 或 [build_collection][] 等包。

### Defining the ViewModel

### 定义 ViewModel

A `ViewModel` binds the _View_ to the _Model_.
It protects the model from being accessed directly by the View,
and ensures that data flow starts from a change to the model.
Data flow is handled by the `ViewModel`, which uses `notifyListeners`
to inform the View that something changed.
The `ViewModel` is like a waiter in a restaurant
that handles the communication
between the kitchen (model) and the customers (views).

`ViewModel` 将 _View_ 绑定到 _Model_。
它保护 Model 不被 View 直接访问，
并确保数据流从 Model 的变化开始。
数据流由 `ViewModel` 处理，它使用 `notifyListeners`
来通知 View 有内容发生了变化。
`ViewModel` 就像餐厅里的服务员，
处理厨房（Model）和顾客（View）之间的沟通。

```dart
import 'package:flutter/foundation.dart';

class CounterViewModel extends ChangeNotifier {
  final CounterModel model;
  int? count;
  String? errorMessage;
  CounterViewModel(this.model);

  Future<void> init() async {
    try {
      count = (await model.loadCountFromServer()).count;
    } catch (e) {
      errorMessage = 'Could not initialize counter';
    }
    notifyListeners();
  }

  Future<void> increment() async {
    final currentCount = count;
    if (currentCount == null) {
      throw('Not initialized');
    }
    try {
      final incrementedCount = currentCount + 1;
      await model.updateCountOnServer(incrementedCount);
      count = incrementedCount;
    } catch(e) {
      errorMessage = 'Could not update count';
    }
    notifyListeners();
  }
}
```

Notice that the `ViewModel` stores an `errorMessage`
when it receives an error from the Model.
This protects the View from unhandled runtime errors,
which could lead to a crash.
Instead, the `errorMessage` field
can be used by the view to show a user-friendly error message.

请注意，当 `ViewModel` 从 Model 收到错误时，
它会存储一个 `errorMessage`。
这保护了 View 免受未处理的运行时错误的影响，
这些错误可能导致崩溃。
相反，`errorMessage` 字段可以被 View 用来显示用户友好的错误消息。


### Defining the View

### 定义 View

Since our `ViewModel` is a `ChangeNotifier`,
any widget with a reference to it can use a `ListenableBuilder`
to rebuild its widget tree
when the `ViewModel` notifies its listeners:

由于我们的 `ViewModel` 是一个 `ChangeNotifier`，
任何引用它的 Widget 都可以使用 `ListenableBuilder`
在 `ViewModel` 通知其监听器时重建其 Widget 树：

```dart
ListenableBuilder(
  listenable: viewModel,
  builder: (context, child) {
    return Column(
      children: [
        if (viewModel.errorMessage != null)
          Text(
            'Error: ${viewModel.errorMessage}',
            style: Theme.of(context)
                .textTheme
                .labelSmall
                ?.apply(color: Colors.red),
          ),
        Text('Count: ${viewModel.count}'),
        TextButton(
          onPressed: () {
            viewModel.increment();
          },
          child: Text('Increment'),
        ),
      ],
    );
  },
)
```

This pattern allows the business logic of your application
to be separate from the UI logic
and low-level operations performed by the Model layer.

这种模式允许应用程序的业务逻辑与 UI 逻辑
以及 Model 层执行的底层操作分离。

## Learn more about state management

## 了解更多关于状态管理的内容

This page touches the surface of state management as
there are many ways to organize and manage
the state of your Flutter application.
If you would like to learn more, check out the following resources:

本页面只是触及了状态管理的表面，
因为有很多方式可以组织和管理 Flutter 应用程序的状态。
如果你想了解更多，请查看以下资源：

* Article: [List of state management approaches][]
* Repository: [Flutter Architecture Samples][]

* 文章：[状态管理方法列表][List of state management approaches]
* 代码仓库：[Flutter 架构示例][Flutter Architecture Samples]

[A guide to Inherited Widgets]: {{site.youtube-site}}/watch?v=Zbm3hjPjQMk
[build_collection]: {{site.pub-pkg}}/built_collection
[Flutter Architecture Samples]: https://fluttersamples.com/
[`InheritedWidget`]: {{site.api}}/flutter/widgets/InheritedWidget-class.html
[List of state management approaches]: /data-and-backend/state-mgmt/options
[Pragmatic state management]: {{site.youtube-site}}/watch?v=d_m5csmrf7I
[Provider counter]: https://github.com/flutter/samples/tree/main/provider_counter
[Provider shopper]: https://github.com/flutter/samples/tree/main/provider_shopper
[State management]: /data-and-backend/state-mgmt/intro
[StatefulWidget]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html
[`ChangeNotifier`]: {{site.api}}/flutter/foundation/ChangeNotifier-class.html
[`InheritedNotifier`]: {{site.api}}/flutter/widgets/InheritedNotifier-class.html
[`ListenableBuilder`]: {{site.api}}/flutter/widgets/ListenableBuilder-class.html
[`Listenable`]: {{site.api}}/flutter/foundation/Listenable-class.html
[`ValueListenableBuilder`]: {{site.api}}/flutter/widgets/ValueListenableBuilder-class.html
[`ValueListenable`]: {{site.api}}/flutter/foundation/ValueListenable-class.html
[`ValueNotifier`]: {{site.api}}/flutter/foundation/ValueNotifier-class.html
[architecture-state]: /resources/architectural-overview#state-management
[ephemeral-state]: /data-and-backend/state-mgmt/ephemeral-vs-app
[freezed]: {{site.pub-pkg}}/freezed
[inherited-widget-video]: {{site.youtube-site}}/watch?v=og-vJqLzg2c
[managing-state-video]: {{site.youtube-site}}/watch?v=vU9xDLdEZtU
[provider]: {{site.pub-pkg}}/provider
[riverpod]: {{site.pub-pkg}}/riverpod

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

由于本网站的此部分正在不断发展，
我们[欢迎你的反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_6A9KxXR7XmMrNsy?page="state-management"
