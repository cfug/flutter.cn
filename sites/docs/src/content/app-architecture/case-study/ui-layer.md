---
# title: UI layer case study
title: UI 层案例研究
# shortTitle: UI layer
shortTitle: UI 层
# description: >-
#   A walk-through of the UI layer of an app that implements MVVM architecture.
description: >-
  实现 MVVM 架构的应用 UI 层 walkthrough。
# prev:
#   title: Case study overview
#   path: /app-architecture/case-study
prev:
  title: 案例研究概览
  path: /app-architecture/case-study
# next:
#   title: Data Layer
#   path: /app-architecture/case-study/data-layer
next:
  title: 数据层
  path: /app-architecture/case-study/data-layer
ai-translated: true
---

The [UI layer][] of each feature in your Flutter application should be
made up of two components: a **[`View`][]** and
a **[`ViewModel`][].**

Flutter 应用中每个功能的 [UI 层][] 应由两个组件构成：**[`View`][]** 与 **[`ViewModel`][]**。

![A screenshot of the booking screen of the compass app.](/assets/images/docs/app-architecture/case-study/mvvm-case-study-ui-layer-highlighted.png)

In the most general sense, view models manage UI state,
and views display UI state.
Views and view models have a one-to-one relationship;
for each view, there's exactly one corresponding view model that
manages that view's state.
Each pair of view and view model make up the UI for a single feature.
For example, an app might have classes called
`LogOutView` and a `LogOutViewModel`.

概括而言，view model 管理 UI 状态，view 展示 UI 状态；
二者一一对应，每对 view 与 view model 构成单一功能的 UI。
例如应用可有 `LogOutView` 与 `LogOutViewModel`。

## Define a view model

## 定义 view model

A view model is a Dart class responsible for handling UI logic.
View models take domain data models as input and expose that data as
UI state to their corresponding views.
They encapsulate logic that the view can attach to
event handlers, like button presses, and
manage sending these events to the data layer of the app,
where data changes happen.

View model 以领域数据模型为输入，向对应 view 暴露为 UI 状态；
封装 view 可挂到按钮按压等事件处理器的逻辑，并将事件发往发生数据变更的应用数据层。

The following code snippet is a class declaration for
a view model class called the `HomeViewModel`.
Its inputs are the [repositories][] that provide its data.
In this case,
the view model is dependent on the
`BookingRepository` and `UserRepository` as arguments.

以下片段为 `HomeViewModel` 的类声明，输入为提供数据的 [仓库][repositories]；
本例依赖 `BookingRepository` 与 `UserRepository` 作为参数。

```dart title=home_viewmodel.dart
class HomeViewModel {
  HomeViewModel({
    required BookingRepository bookingRepository,
    required UserRepository userRepository,
  }) :
    // Repositories are manually assigned because they're private members.
    _bookingRepository = bookingRepository,
    _userRepository = userRepository;

  final BookingRepository _bookingRepository;
  final UserRepository _userRepository;
  // ...
}
```

View models are always dependent on data repositories,
which are provided as arguments to the view model's constructor.
View models and repositories have a many-to-many relationship,
and most view models will depend on multiple repositories.

View model 始终依赖通过构造函数传入的数据仓库；
与仓库为多对多关系，多数 view model 依赖多个仓库。

As in the earlier `HomeViewModel` example declaration,
repositories should be private members on the view model,
otherwise views would have direct access to
the data layer of the application.

如前述 `HomeViewModel`，仓库应为 view model 的私有成员，否则 view 可直接访问数据层。

### UI state

### UI 状态

The output of a view model is data that a view needs to render, generally
referred to as **UI State**, or just state. UI state is an immutable snapshot of
data that is required to fully render a view.

View model 的输出是 view 渲染所需数据，通常称为 **UI State** 或简称 state。
UI state 是完整渲染 view 所需数据的不可变快照。

![A screenshot of the booking screen of the compass app.](/assets/images/docs/app-architecture/case-study/mvvm-case-study-ui-state-highlighted.png)

The view model exposes state as public members.
On the view model in the following code example,
the exposed data is a `User` object,
as well as the user's saved itineraries which
are exposed as an object of type `List<BookingSummary>`.

View model 以公共成员暴露状态。下例中暴露 `User` 及类型为 `List<BookingSummary>` 的已保存行程。

```dart title=home_viewmodel.dart
class HomeViewModel {
  HomeViewModel({
   required BookingRepository bookingRepository,
   required UserRepository userRepository,
  }) : _bookingRepository = bookingRepository,
      _userRepository = userRepository;

  final BookingRepository _bookingRepository;
  final UserRepository _userRepository;

  User? _user;
  User? get user => _user;

  List<BookingSummary> _bookings = [];

  /// Items in an [UnmodifiableListView] can't be directly modified,
  /// but changes in the source list can be modified. Since _bookings
  /// is private and bookings is not, the view has no way to modify the
  /// list directly.
  UnmodifiableListView<BookingSummary> get bookings => UnmodifiableListView(_bookings);

  // ...
}
```

As mentioned, the UI state should be immutable.
This is a crucial part of bug-free software.

如前所述，UI state 应不可变，这是少 bug 软件的关键。

The compass app uses the [`package:freezed`][] to
enforce immutability on data classes. For example,
the following code shows the `User` class definition.
`freezed` provides deep immutability,
and generates the implementation for useful methods like
`copyWith` and `toJson`.

Compass 应用使用 [`package:freezed`][] 强制数据类不可变；下例为 `User` 定义。
`freezed` 提供深层不可变并生成 `copyWith`、`toJson` 等方法。

```dart title=user.dart
@freezed
class User with _$User {
  const factory User({
    /// The user's name.
    required String name,

    /// The user's picture URL.
    required String picture,
  }) = _User;

  factory User.fromJson(Map<String, Object?> json) => _$UserFromJson(json);
}
```

:::note
In the view model example,
two objects are needed to render the view.
As the UI state for any given model grows in complexity,
a view model might have many more pieces of data from
many more repositories exposed to the view.
In some cases,
you might want to create objects that specifically represent the UI state.
For example, you could create a class named `HomeUiState`.
:::

:::note
下例渲染 view 需要两个对象。随 UI state 变复杂，
view model 可能从更多仓库向 view 暴露更多数据。
有时可创建专门表示 UI state 的对象，例如 `HomeUiState`。
:::

### Updating UI state

### 更新 UI 状态

In addition to storing state,
view models need to tell Flutter to re-render views when
the data layer provides a new state.
In the Compass app, view models extend [`ChangeNotifier`][] to achieve this.

除存储状态外，数据层提供新状态时 view model 须通知 Flutter 重新渲染 view。
Compass 中 view model 继承 [`ChangeNotifier`][] 实现这一点。

```dart title=home_viewmodel.dart
class HomeViewModel [!extends ChangeNotifier!] {
  HomeViewModel({
   required BookingRepository bookingRepository,
   required UserRepository userRepository,
  }) : _bookingRepository = bookingRepository,
      _userRepository = userRepository;
  final BookingRepository _bookingRepository;
  final UserRepository _userRepository;

  User? _user;
  User? get user => _user;

  List<BookingSummary> _bookings = [];
  List<BookingSummary> get bookings => _bookings;

  // ...
}
```

`HomeViewModel.user` is a public member that the view depends on.
When new data flows from the data layer and
new state needs to be emitted, [`notifyListeners`][] is called.

`HomeViewModel.user` 是 view 依赖的公共成员；数据层流入新数据需发出新状态时，调用 [`notifyListeners`][]。

<figure>

![A screenshot of the booking screen of the compass app.](/assets/images/docs/app-architecture/case-study/mvvm-case-study-update-ui-steps.png)

    <figcaption>
This figure shows from a high-level how new data in the repository
propagates up to the UI layer and triggers a re-build of your Flutter widgets.
    </figcaption>
</figure>

该图从宏观展示仓库中的新数据如何向上传到 UI 层并触发 Flutter widget 重建。

1. New state is provided to the view model from a Repository.

   仓库向 view model 提供新状态。

2. The view model updates its UI state to reflect the new data.

   View model 更新 UI 状态以反映新数据。

3. `ViewModel.notifyListeners` is called, alerting the View of new UI State.

   调用 `ViewModel.notifyListeners`，通知 View 有新 UI State。

4. The view (widget) re-renders.

   View（widget）重新渲染。

For example, when the user navigates to the Home screen and the view model is
created, the `_load` method is called.
Until this method completes, the UI state is empty,
the view displays a loading indicator.
When the `_load` method completes, if it's successful,
there's new data in the view model, and it must
notify the view that new data is available.

例如用户进入 Home 屏幕并创建 view model 时调用 `_load`；
完成前 UI state 为空，view 显示加载指示器；成功完成后 view model 有新数据，须通知 view。

```dart title=home_viewmodel.dart highlightLines=19
class HomeViewModel extends ChangeNotifier {
  // ...

 Future<Result> _load() async {
    try {
      final userResult = await _userRepository.getUser();
      switch (userResult) {
        case Ok<User>():
          _user = userResult.value;
          _log.fine('Loaded user');
        case Error<User>():
          _log.warning('Failed to load user', userResult.error);
      }

      // ...

      return userResult;
    } finally {
      notifyListeners();
    }
  }
}
```

:::note
`ChangeNotifier` and [`ListenableBuilder`][] (discussed later on this page) are
part of the Flutter SDK,
and provide a good solution for updating the UI when state changes.
You can also use a robust third-party state management solution, such as
[`package:riverpod`][], [`package:flutter_bloc`][], or [`package:signals`][].
These libraries offer different tools for handling UI updates.
Read more about using `ChangeNotifier` in
our [state-management documentation][].
:::

:::note
`ChangeNotifier` 与 [`ListenableBuilder`][]（后文讨论）属于 Flutter SDK，
是状态变化时更新 UI 的良好方案。
也可使用 [`package:riverpod`][]、[`package:flutter_bloc`][]、[`package:signals`][] 等第三方状态管理库。
更多 `ChangeNotifier` 用法见 [状态管理文档][state-management documentation]。
:::

[`package:riverpod`]: {{site.pub-pkg}}/riverpod
[`package:flutter_bloc`]: {{site.pub-pkg}}/flutter_bloc
[`package:signals`]: {{site.pub-pkg}}/signals
[state-management documentation]: /data-and-backend/state-mgmt/intro

## Define a view

## 定义 view

A view is a widget within your app.
Often, a view represents one screen in your app that
has its own route and includes a [`Scaffold`][] at the top of the
widget subtree, such as the `HomeScreen`, but this isn't always the case.

View 是应用内的 widget。常代表带独立路由、widget 树顶层含 [`Scaffold`][] 的屏幕（如 `HomeScreen`），但未必如此。

Sometimes a view is a single UI element that
encapsulates functionality that needs to be re-used throughout the app.
For example, the Compass app has a view called `LogoutButton`,
which can be dropped anywhere in the widget tree that a user might
expect to find a logout button.
The `LogoutButton` view has its own view model called `LogoutViewModel`.
And on larger screens, there might be multiple views on screen that
would take up the full screen on mobile.

有时 view 是可在应用中复用的单一 UI 元素，例如 Compass 的 `LogoutButton` 及其 `LogoutViewModel`；
大屏上可能同时显示多个在手机上占全屏的 view。

:::note
"View" is an abstract term, and one view doesn't equal one widget.
Widgets are composable, and several can be combined to create one view.
Therefore, view models don't have a one-to-one relationship with widgets,
but rather a one-to-one relation with a *collection* of widgets.
:::

:::note
「View」是抽象概念，一个 view 不等于一个 widget；多个 widget 可组成一个 view。
因此 view model 与 widget 是一对*一组* widget 的关系，而非一对一。
:::

The widgets within a view have three responsibilities:

View 内 widget 有三项职责：

* They display the data properties from the view model.

  展示 view model 的数据属性。

* They listen for updates from the view model and re-render when new data is available.

  监听 view model 更新并在有新数据时重新渲染。

* They attach callbacks from the view model to event handlers, if applicable.

  将 view model 的回调挂到事件处理器（如适用）。

![A diagram showing a view's relationship to a view model.](/assets/images/docs/app-architecture/guide/feature-architecture-simplified-View-highlighted.png)


Continuing the Home feature example,
the following code shows the definition of the `HomeScreen` view.

延续 Home 功能示例，以下展示 `HomeScreen` view 的定义。

```dart title=home_screen.dart
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key, required this.viewModel});

  final HomeViewModel viewModel;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // ...
    );
  }
}
```

Most of the time, a view's only inputs should be a `key`,
which all Flutter widgets take as an optional argument,
and the view's corresponding view model.

多数情况下 view 的输入仅为可选 `key` 与对应 view model。

### Display UI data in a view

### 在 view 中展示 UI 数据

A view depends on a view model for its state. In the Compass app,
the view model is passed in as an argument in the view's constructor.
The following example code snippet is from the `HomeScreen` widget.

View 依赖 view model 获取状态；Compass 在 view 构造函数中传入 view model。
以下片段来自 `HomeScreen` widget。

```dart title=home_screen.dart
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key, [!required this.viewModel!]});

  [!final HomeViewModel viewModel;!]

  @override
  Widget build(BuildContext context) {
    // ...
  }
}
```

Within the widget, you can access the passed-in bookings from the `viewModel`.
In the following code,
the `booking` property is being provided to a sub-widget.

在 widget 内可通过 `viewModel` 访问传入的 bookings；下例将 `booking` 传给子 widget。

```dart title=home_screen.dart
@override
  Widget build(BuildContext context) {
    return Scaffold(
      // Some code was removed for brevity.
      body: SafeArea(
        child: ListenableBuilder(
          listenable: viewModel,
          builder: (context, _) {
            return CustomScrollView(
              slivers: [
                SliverToBoxAdapter(...),
                SliverList.builder(
                   itemCount: [!viewModel.bookings.length!],
                    itemBuilder: (_, index) => _Booking(
                      key: ValueKey([!viewModel.bookings[index].id!]),
                      booking:viewModel.bookings[index],
                      onTap: () => context.push(Routes.bookingWithId(
                         viewModel.bookings[index].id)),
                      onDismissed: (_) => viewModel.deleteBooking.execute(
                           viewModel.bookings[index].id,
                         ),
                    ),
                ),
              ],
            );
          },
        ),
      ),
```

### Update the UI

### 更新 UI

The `HomeScreen` widget listens for updates from the view model with
the [`ListenableBuilder`][] widget.
Everything in the widget subtree under the `ListenableBuilder` widget
re-renders when the provided [`Listenable`][] changes.
In this case, the provided `Listenable` is the view model.
Recall that the view model is of type [`ChangeNotifier`][]
which is a subtype of the `Listenable` type.

`HomeScreen` 通过 [`ListenableBuilder`][] 监听 view model；
其子树在 [`Listenable`][] 变化时重建，此处为 [`ChangeNotifier`][] 类型的 view model。

```dart title=home_screen.dart
@override
Widget build(BuildContext context) {
  return Scaffold(
    // Some code was removed for brevity.
      body: SafeArea(
        child: ListenableBuilder(
          listenable: viewModel,
          builder: (context, _) {
            return CustomScrollView(
              slivers: [
                SliverToBoxAdapter(),
                SliverList.builder(
                  itemCount: viewModel.bookings.length,
                  itemBuilder: (_, index) =>
                      _Booking(
                        key: ValueKey(viewModel.bookings[index].id),
                        booking: viewModel.bookings[index],
                        onTap: () =>
                            context.push(Routes.bookingWithId(
                                viewModel.bookings[index].id)
                            ),
                        onDismissed: (_) =>
                            viewModel.deleteBooking.execute(
                              viewModel.bookings[index].id,
                            ),
                      ),
                ),
              ],
            );
          }
        )
      )
  );
}
```

### Handling user events

### 处理用户事件

Finally, a view needs to listen for *events* from users,
so the view model can handle those events.
This is achieved by exposing a callback method on the view model class which
encapsulates all the logic.

最后，view 须监听用户*事件*，由 view model 通过暴露封装逻辑的回调处理。

![A diagram showing a view's relationship to a view model.](/assets/images/docs/app-architecture/guide/feature-architecture-simplified-UI-highlighted.png)

On the `HomeScreen`, users can delete previously booked events by swiping
a [`Dismissible`][] widget.

在 `HomeScreen` 上，用户可通过滑动 [`Dismissible`][] 删除已预订项。

Recall this code from the previous snippet:

回顾上一片段中的代码：

<CodePreview direction="row">

  <DashImage 
    image="app-architecture/case-study/dismissible.webp"
    alt="A clip that demonstrates the 'dismissible' functionality of the Compass app."
    img-style="max-height: 480px; border-radius: 12px; border: black 2px solid;"
    />

  ```dart title=home_screen.dart highlightLines=9-10
  SliverList.builder(
    itemCount: widget.viewModel.bookings.length,
    itemBuilder: (_, index) => _Booking(
      key: ValueKey(viewModel.bookings[index].id),
      booking: viewModel.bookings[index],
      onTap: () => context.push(
        Routes.bookingWithId(viewModel.bookings[index].id)
      ),
      onDismissed: (_) =>
        viewModel.deleteBooking.execute(widget.viewModel.bookings[index].id),
    ),
  ),
  ```

</CodePreview>

On the `HomeScreen`, a user's saved trip is represented by
the `_Booking` widget. When a `_Booking` is dismissed,
the `viewModel.deleteBooking` method is executed.

`HomeScreen` 上用 `_Booking` 表示行程；dismiss 时执行 `viewModel.deleteBooking`。

A saved booking is application state that persists beyond
a session or the lifetime of a view,
and only repositories should modify such application state.
So, the `HomeViewModel.deleteBooking` method turns around and
calls a method exposed by a repository in the data layer,
as shown in the following code snippet.

已保存预订为持久应用状态，只应由仓库修改；`HomeViewModel.deleteBooking` 调用数据层仓库方法，见下。

```dart title=home_viewmodel.dart highlightLines=3
Future<Result<void>> _deleteBooking(int id) async {
  try {
    final resultDelete = await _bookingRepository.delete(id);
    switch (resultDelete) {
      case Ok<void>():
        _log.fine('Deleted booking $id');
      case Error<void>():
        _log.warning('Failed to delete booking $id', resultDelete.error);
        return resultDelete;
    }

    // Some code was omitted for brevity.
    // final  resultLoadBookings = ...;

    return resultLoadBookings;
  } finally {
    notifyListeners();
  }
}
```

In the Compass app,
these methods that handle user events are called **commands**.

在 Compass 中，这些处理用户事件的方法称为 **command**。

### Command objects

### Command 对象

Commands are responsible for the interaction that starts in the UI layer and
flows back to the data layer. In this app specifically,
a `Command` is also a type that helps update the UI safely,
regardless of the response time or contents.

Command 负责从 UI 层回流数据层的交互；`Command` 类型可安全更新 UI，不受响应时间或内容影响。

The `Command` class wraps a method and
helps handle the different states of that method,
such as `running`, `complete`, and `error`.
These states make it easy to display different UI,
like loading indicators when `Command.running` is true.

`Command` 包装方法并处理 `running`、`complete`、`error` 等状态，便于展示加载等 UI。

The following is code from the `Command` class.
Some code has been omitted for demo purposes.

以下为 `Command` 类代码（部分省略）。

```dart title=command.dart
abstract class Command<T> extends ChangeNotifier {
  Command();
  bool running = false;
  Result<T>? _result;

  /// true if action completed with error
  bool get error => _result is Error;

  /// true if action completed successfully
  bool get completed => _result is Ok;

  /// Internal execute implementation
  Future<void> _execute(action) async {
    if (_running) return;

    // Emit running state - e.g. button shows loading state
    _running = true;
    _result = null;
    notifyListeners();

    try {
      _result = await action();
    } finally {
      _running = false;
      notifyListeners();
    }
  }
}
```

The `Command` class itself extends `ChangeNotifier`,
and within the method `Command.execute`,
`notifyListeners` is called multiple times.
This allows the view to handle different states with very little logic,
which you'll see an example of later on this page.

`Command` 继承 `ChangeNotifier`，`execute` 中多次 `notifyListeners()`，使 view 以极少逻辑处理多状态（后文有例）。

You may have also noticed that `Command` is an abstract class.
It's implemented by concrete classes such as `Command0` `Command1`.
The integer in the class name refers to
the number of arguments that the underlying method expects.
You can see examples of these implementation classes in
the Compass app's [`utils` directory][].

`Command` 为抽象类，由 `Command0`、`Command1` 等实现，数字表示参数个数；示例见 Compass [`utils` 目录][`utils` directory]。

:::tip Package recommendation
Instead of writing your own `Command` class,
consider using the [`flutter_command`][] package,
which is a robust library that implements classes like these.
:::

:::tip 包推荐
也可使用 [`flutter_command`][] 等库，无需自行实现 `Command`。
:::


### Ensuring views can render before data exists

### 确保 view 在数据存在前即可渲染

In view model classes, commands are created in the constructor.

在 view model 构造函数中创建 command。

```dart title=home_viewmodel.dart highlightLines=8-9,15-16,24-30
class HomeViewModel extends ChangeNotifier {
  HomeViewModel({
   required BookingRepository bookingRepository,
   required UserRepository userRepository,
  }) : _bookingRepository = bookingRepository,
      _userRepository = userRepository {
    // Load required data when this screen is built.
    load = Command0(_load)..execute();
    deleteBooking = Command1(_deleteBooking);
  }

  final BookingRepository _bookingRepository;
  final UserRepository _userRepository;

  late Command0 load;
  late Command1<void, int> deleteBooking;

  User? _user;
  User? get user => _user;

  List<BookingSummary> _bookings = [];
  List<BookingSummary> get bookings => _bookings;

  Future<Result> _load() async {
    // ...
  }

  Future<Result<void>> _deleteBooking(int id) async {
    // ...
  }

  // ...
}
```

The `Command.execute` method is asynchronous,
so it can't guarantee that the data will be available when
the view wants to render. This gets at *why* the Compass app uses `Commands`.
In the view's `Widget.build` method,
the command is used to conditionally render different widgets.

`Command.execute` 是异步的，无法保证 view 渲染时数据已就绪——这正是 Compass 使用 `Command` 的原因；
在 `Widget.build` 中用 command 条件渲染不同 widget。

```dart title=home_screen.dart
// ...
child: ListenableBuilder(
  listenable: [!viewModel.load!],
  builder: (context, child) {
    if ([!viewModel.load.running!]) {
      return const Center(child: CircularProgressIndicator());
    }

    if ([!viewModel.load.error!]) {
      return ErrorIndicator(
        title: AppLocalization.of(context).errorWhileLoadingHome,
        label: AppLocalization.of(context).tryAgain,
          onPressed: viewModel.load.execute,
        );
     }

    // The command has completed without error.
    // Return the main view widget.
    return child!;
  },
),

// ...
```

Because the `load` command is a property that exists on
the view model rather than something ephemeral,
it doesn't matter when the `load` method is called or when it resolves.
For example, if the load command resolves before
the `HomeScreen` widget was even created,
it isn't a problem because the `Command` object still exists,
and exposes the correct state.

`load` command 是 view model 上的持久属性，调用与完成时机不影响正确状态暴露。

This pattern standardizes how common UI problems are solved in the app,
making your codebase less error-prone and more scalable,
but it's not a pattern that every app will want to implement.
Whether you want to use it is highly dependent on
other architectural choices you make.
Many libraries that help you manage state have
their own tools to solve these problems.
For example, if you were to use
[streams][] and [`StreamBuilders`][] in your app,
the [`AsyncSnapshot`][] classes provided by Flutter have
this functionality built in.

该模式标准化常见 UI 问题的解决方式，但并非所有应用都需要；
是否采用取决于其他架构选择。许多状态管理库自带类似工具，例如 [stream][streams] 与 [`StreamBuilders`][] 配合 [`AsyncSnapshot`][]。

:::note Real world example
While building the Compass app, we found a bug that was solved by using
the Command pattern. [Read about it on GitHub][].
:::

:::note 真实案例
构建 Compass 时曾用命令模式修复一个 bug。[在 GitHub 上阅读][Read about it on GitHub]。
:::

[UI layer]: /app-architecture/guide#ui-layer
[UI 层]: /app-architecture/guide#ui-layer
[`View`]: /app-architecture/guide#views
[`ViewModel`]: /app-architecture/guide#view-models
[repositories]: /app-architecture/guide#repositories
[commands]: /app-architecture/guide#command-objects
[`package:freezed`]: {{site.pub-pkg}}/freezed
[`ChangeNotifier`]: {{site.api}}/flutter/foundation/ChangeNotifier-class.html
[`Listenable`]: {{site.api}}/flutter/foundation/Listenable-class.html
[`ListenableBuilder`]: {{site.api}}/flutter/widgets/ListenableBuilder-class.html
[`notifyListeners`]: {{site.api}}/flutter/foundation/ChangeNotifier/notifyListeners.html
[`Scaffold`]: {{site.api}}/flutter/material/Scaffold-class.html
[`Dismissible`]: {{site.api}}/flutter/widgets/Dismissible-class.html
[`utils` directory]: https://github.com/flutter/samples/blob/main/compass_app/app/lib/utils/command.dart
[`flutter_command`]: {{site.pub-pkg}}/flutter_command
[streams]: {{site.api}}/flutter/dart-async/Stream-class.html
[`StreamBuilders`]: {{site.api}}/flutter/widgets/StreamBuilder-class.html
[`AsyncSnapshot`]: {{site.api}}/flutter/widgets/AsyncSnapshot-class.html
[Read about it on GitHub]: https://github.com/flutter/samples/pull/2449#pullrequestreview-2328333146

## Feedback

## 反馈

As this section of the website is evolving,
we [welcome your feedback][]!

网站本节内容仍在完善中，
[欢迎提供反馈][welcome your feedback]！

[welcome your feedback]: https://google.qualtrics.com/jfe/form/SV_4T0XuR9Ts29acw6?page="case-study/ui-layer"
