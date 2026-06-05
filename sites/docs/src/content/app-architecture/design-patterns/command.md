---
# title: The command pattern
title: 命令模式
# description: "Simplify view model logic by implementing a Command class."
description: "通过实现 Command 类简化 view model 逻辑。"
# contentTags:
#   - mvvm
#   - asynchronous dart
#   - state
contentTags:
  - mvvm
  - asynchronous dart
  - state
# iconPath: /assets/images/docs/app-architecture/design-patterns/command-icon.svg
iconPath: /assets/images/docs/app-architecture/design-patterns/command-icon.svg
# order: 4
order: 4
ai-translated: true
---

<?code-excerpt path-base="app-architecture/command"?>

[Model-View-ViewModel (MVVM)][] is a design pattern
that separates a feature of an application into three parts:
the model, the view model, and the view.
Views and view models make up the UI layer of an application.
Repositories and services represent the data layer of an application,
or the model layer of MVVM.

[Model-View-ViewModel (MVVM)][] 是一种设计模式，将应用的一个功能拆为 model、view model 与 view 三部分。
View 与 view model 构成应用的 UI 层；仓库与 service 代表数据层，即 MVVM 的 model 层。

A command is a class that wraps a method
and helps to handle the different states of that method,
such as running, complete, and error.

Command 是包装方法并帮助处理方法各状态（如 running、complete、error）的类。

[View models][] can use commands to handle interaction and run actions.
You can also use them to display different UI states,
like loading indicators when an action is running,
or display an error dialog when an action failed.

[View model][View models] 可用 command 处理交互与执行操作，也可用于展示不同 UI 状态，
例如操作进行中显示加载指示器，失败时显示错误对话框。

View models can become very complex
as an application grows
and features become bigger.
Commands can help to simplify view models
and reuse code.

随应用与功能增长，view model 可能变得非常复杂；command 有助于简化 view model 并复用代码。

In this guide, you will learn
how to use the command pattern
to improve your view models.

本指南介绍如何使用命令模式改进 view model。

## Challenges when implementing view models

## 实现 view model 时的挑战

View model classes in Flutter are typically implemented
by extending the [`ChangeNotifier`][] class.
This allows view models to call `notifyListeners()` to refresh views
when data is updated.

Flutter 中的 view model 通常通过继承 [`ChangeNotifier`][] 实现，
以便在数据更新时调用 `notifyListeners()` 刷新 view。

<?code-excerpt "lib/no_command.dart (HomeViewModel2)" replace="/2//g"?>
```dart
class HomeViewModel extends ChangeNotifier {
  // ···
}
```

View models contain a representation of the UI state,
including the data being displayed.
For example, this `HomeViewModel` exposes the `User` instance to the view.

View model 包含 UI 状态表示，包括展示的数据。
例如该 `HomeViewModel` 向 view 暴露 `User` 实例。

<?code-excerpt "lib/no_command.dart (getUser)" replace="/null;/\/\/ .../g;/2//g"?>
```dart
class HomeViewModel extends ChangeNotifier {

  User? get user => // ...
  // ···
}
```

View models also contain actions typically triggered by the view,
such as a `load` action in charge of loading the `user`.

View model 还包含通常由 view 触发的操作，例如负责加载 `user` 的 `load` 操作。

<?code-excerpt "lib/no_command.dart (load1)" replace="/null;/\/\/ .../g;/2//g"?>
```dart
class HomeViewModel extends ChangeNotifier {

  User? get user => // ...
  // ···
  void load() {
    // load user
  }
  // ···
}
```

### UI state in view models

### View model 中的 UI 状态

A view model also contains UI state besides data, such as
whether the view is running or has experienced an error.
This allows the app to tell the user if the action has completed successfully.

除数据外，view model 还包含 UI 状态，例如是否正在运行或是否出错，
以便告知用户操作是否成功完成。

<?code-excerpt "lib/no_command.dart (UiState1)" replace="/(null|false);/\/\/ .../g;/2//g"?>
```dart
class HomeViewModel extends ChangeNotifier {

  User? get user => // ...

  bool get running => // ...

  Exception? get error => // ...

  void load() {
    // load user
  }
  // ···
}
```

You can use the running state to display a progress indicator in the view:

可用 running 状态在 view 中显示进度指示器：

<?code-excerpt "lib/no_command.dart (ListenableBuilder)" replace="/\.load//g;/body: //g;/^\),$/)/g"?>
```dart
ListenableBuilder(
  listenable: widget.viewModel,
  builder: (context, _) {
    if (widget.viewModel.running) {
      return const Center(child: CircularProgressIndicator());
    }
    // ···
  },
)
```

Or use the running state to avoid executing the action multiple times:

或用 running 状态避免重复执行操作：

<?code-excerpt "lib/no_command.dart (load2)" replace="/2//g"?>
```dart
void load() {
  if (running) {
    return;
  }
  // load user
}
```

Managing the state of an action can get complicated
if the view model contains multiple actions.
For example, adding an `edit()` action to the `HomeViewModel`
can lead the following outcome:

若 view model 包含多个操作，管理操作状态会变复杂。
例如向 `HomeViewModel` 添加 `edit()` 可能导致：

<?code-excerpt "lib/no_command.dart (HomeViewModel3)" replace="/(null|false);/\/\/ .../g;/3//g"?>
```dart
class HomeViewModel extends ChangeNotifier {
  User? get user => // ...

  bool get runningLoad => // ...

  Exception? get errorLoad => // ...

  bool get runningEdit => // ...

  Exception? get errorEdit => // ...

  void load() {
    // load user
  }

  void edit(String name) {
    // edit user
  }
}
```

Sharing the running state
between the `load()` and `edit()` actions might not always work,
because you might want to show a different UI component
when the `load()` action runs than when the `edit()` action runs;
you'll have the same problem with the `error` state.

在 `load()` 与 `edit()` 间共享 running 状态未必可行，
因两种操作可能需要不同 UI 组件；`error` 状态也有同样问题。

### Triggering UI actions from view models

### 从 view model 触发 UI 操作

View model classes can run into problems when
executing UI actions and the view model's state changes.

执行 UI 操作且 view model 状态变化时，view model 可能遇到问题。

For example, you might want to show a `SnackBar` when an error occurs,
or navigate to a different screen when an action completes.
To implement this, listen for changes in the view model,
and perform the action depending on the state.

例如出错时显示 `SnackBar`，操作完成时导航到其他屏幕。
实现方式是监听 view model 变化并按状态执行操作。

In the view:

在 view 中：

<?code-excerpt "lib/no_command.dart (addListener)"?>
```dart
@override
void initState() {
  super.initState();
  widget.viewModel.addListener(_onViewModelChanged);
}

@override
void dispose() {
  widget.viewModel.removeListener(_onViewModelChanged);
  super.dispose();
}
```

<?code-excerpt "lib/no_command.dart (_onViewModelChanged)" remove="widget.viewModel.clearError();"?>
```dart
void _onViewModelChanged() {
  if (widget.viewModel.error != null) {
    // Show Snackbar
  }
}
```

You need to clear the error state each time you execute this action,
otherwise this action happens each time `notifyListeners()` is called.

每次执行该操作后须清除 error 状态，否则每次 `notifyListeners()` 都会重复触发。

<?code-excerpt "lib/no_command.dart (_onViewModelChanged)"?>
```dart
void _onViewModelChanged() {
  if (widget.viewModel.error != null) {
    widget.viewModel.clearError();
    // Show Snackbar
  }
}
```

## Command pattern

## 命令模式

You might find yourself repeating the above code over and over,
implementing a different running state
for each action in every view model.
At that point, it makes sense to extract this code
into a reusable pattern called a _command_.

你可能反复编写上述代码，为每个 view model 的每个操作实现不同 running 状态。
此时将代码提取为可复用的 _command_ 模式是合理的。

A command is a class that encapsulates a view model action,
and exposes the different states that an action can have.

Command 封装 view model 操作并暴露操作可能处于的各种状态。

<?code-excerpt "lib/simple_command.dart (Command)" replace="/(null|false);/\/\/ .../g;"?>
```dart
class Command extends ChangeNotifier {
  Command(this._action);

  bool get running => // ...

  Exception? get error => // ...

  bool get completed => // ...

  void Function() _action;

  void execute() {
    // run _action
  }

  void clear() {
    // clear state
  }
}
```

In the view model,
instead of defining an action directly with a method,
you create a command object:

在 view model 中，不直接用方法定义操作，而是创建 command 对象：

<?code-excerpt "lib/simple_command.dart (ViewModel)" replace="/(null|false);/\/\/ .../g;"?>
```dart
class HomeViewModel extends ChangeNotifier {
  HomeViewModel() {
    load = Command(_load)..execute();
  }

  User? get user => // ...

  late final Command load;

  void _load() {
    // load user
  }
}
```

The previous `load()` method becomes `_load()`,
and instead the command `load` gets exposed to the `View`.
The previous `running` and `error` states can be removed,
as they are now part of the command.

原 `load()` 变为 `_load()`，向 `View` 暴露 command `load`；
原 `running` 与 `error` 可移除，已归入 command。

### Executing a command

### 执行 command

Instead of calling `viewModel.load()` to run the load action,
now you call `viewModel.load.execute()`.

不再调用 `viewModel.load()`，而调用 `viewModel.load.execute()`。

The `execute()` method can also be called from within the view model.
The following line of code runs the `load` command when the
view model is created.

`execute()` 也可在 view model 内部调用；以下代码在创建 view model 时运行 `load` command。

<?code-excerpt "lib/main.dart (ViewModelInit)"?>
```dart
HomeViewModel() {
  load = Command(_load)..execute();
}
```

The `execute()` method sets the running state to `true`
and resets the `error` and `completed` states.
When the action finishes,
the `running` state changes to `false`
and the `completed` state to `true`.

`execute()` 将 running 设为 `true` 并重置 `error` 与 `completed`；
操作结束时 running 为 `false`，completed 为 `true`。

If the `running` state is `true`,
the command cannot begin executing again.
This prevents users from triggering a command
multiple times by pressing a button rapidly.

running 为 `true` 时 command 无法再次执行，防止用户快速连按重复触发。

The command’s `execute()` method captures any thrown `Exceptions`
automatically and exposes them in the `error` state.

command 的 `execute()` 自动捕获抛出的 `Exception` 并暴露在 `error` 状态。

The following code shows a sample `Command` class that
has been simplified for demo purposes.
You can see a full implementation at the end of this page.

以下为简化的 `Command` 示例，完整实现见文末。

<?code-excerpt "lib/main.dart (Command)"?>
```dart
class Command extends ChangeNotifier {
  Command(this._action);

  bool _running = false;
  bool get running => _running;

  Exception? _error;
  Exception? get error => _error;

  bool _completed = false;
  bool get completed => _completed;

  final Future<void> Function() _action;

  Future<void> execute() async {
    if (_running) {
      return;
    }

    _running = true;
    _completed = false;
    _error = null;
    notifyListeners();

    try {
      await _action();
      _completed = true;
    } on Exception catch (error) {
      _error = error;
    } finally {
      _running = false;
      notifyListeners();
    }
  }

  void clear() {
    _running = false;
    _error = null;
    _completed = false;
  }
}
```

### Listening to the command state

### 监听 command 状态

The `Command` class extends from `ChangeNotifier`,
allowing Views to listen to its states.

`Command` 继承 `ChangeNotifier`，view 可监听其状态。

In the `ListenableBuilder`,
instead of passing the view model to `ListenableBuilder.listenable`,
pass the command:

在 `ListenableBuilder` 中，将 command 传给 `listenable`，而非整个 view model：


<?code-excerpt "lib/main.dart (CommandListenable)" replace="/body: //g;/^\),$/)/g"?>
```dart
ListenableBuilder(
  listenable: widget.viewModel.load,
  builder: (context, child) {
    if (widget.viewModel.load.running) {
      return const Center(child: CircularProgressIndicator());
    }
  // ···
)
```

And listen to changes in the command state in order to run UI actions:

监听 command 状态变化以执行 UI 操作：

<?code-excerpt "lib/main.dart (addListener)"?>
```dart
@override
void initState() {
  super.initState();
  widget.viewModel.addListener(_onViewModelChanged);
}

@override
void dispose() {
  widget.viewModel.removeListener(_onViewModelChanged);
  super.dispose();
}
```

<?code-excerpt "lib/main.dart (_onViewModelChanged)"?>
```dart
void _onViewModelChanged() {
  if (widget.viewModel.load.error != null) {
    widget.viewModel.load.clear();
    // Show Snackbar
  }
}
```

### Combining command and ViewModel

### 组合 command 与 ViewModel

You can stack multiple `ListenableBuilder` widgets to listen to `running`
and `error` states before showing the view model data.

可堆叠多个 `ListenableBuilder`，在展示 view model 数据前监听 `running` 与 `error` 状态。

<?code-excerpt "lib/main.dart (ListenableBuilder)"?>
```dart
body: ListenableBuilder(
  listenable: widget.viewModel.load,
  builder: (context, child) {
    if (widget.viewModel.load.running) {
      return const Center(child: CircularProgressIndicator());
    }

    if (widget.viewModel.load.error != null) {
      return Center(
        child: Text('Error: ${widget.viewModel.load.error}'),
      );
    }

    return child!;
  },
  child: ListenableBuilder(
    listenable: widget.viewModel,
    builder: (context, _) {
      // ···
    },
  ),
),
```

You can define multiple commands classes in a single view model,
simplifying its implementation
and minimizing the amount of repeated code.

可在单个 view model 中定义多个 command 类，简化实现并减少重复代码。

<?code-excerpt "lib/main.dart (HomeViewModel2)" replace="/null;/\/\/ .../g"?>
```dart
class HomeViewModel2 extends ChangeNotifier {
  HomeViewModel2() {
    load = Command(_load)..execute();
    delete = Command(_delete);
  }

  User? get user => // ...

  late final Command load;

  late final Command delete;

  Future<void> _load() async {
    // load user
  }

  Future<void> _delete() async {
    // delete user
  }
}
```

### Extending the command pattern

### 扩展命令模式

The command pattern can be extended in multiple ways.
For example, to support a different number of arguments.

命令模式可通过多种方式扩展，例如支持不同数量的参数。

<?code-excerpt "lib/extended_command.dart (HomeViewModel)" replace="/null;/\/\/ .../g"?>
```dart
class HomeViewModel extends ChangeNotifier {
  HomeViewModel() {
    load = Command0(_load)..execute();
    edit = Command1<String>(_edit);
  }

  User? get user => // ...

  // Command0 accepts 0 arguments
  late final Command0 load;

  // Command1 accepts 1 argument
  late final Command1<String> edit;

  Future<void> _load() async {
    // load user
  }

  Future<void> _edit(String name) async {
    // edit user
  }
}
```

## Putting it all together

## 总结

In this guide,
you learned how to use the command design pattern
to improve the implementation of view models
when using the MVVM design pattern.

本指南介绍了在使用 MVVM 时如何用命令设计模式改进 view model 实现。

Below, you can find the full `Command` class
as implemented in the [Compass App example][]
for the Flutter architecture guidelines.
It also uses the [`Result` class][]
to determine if the action completed successfully or with an error.

下文为 Flutter 架构指南 [Compass 应用示例][Compass App example] 中的完整 `Command` 类，
并使用 [`Result` 类][`Result` class] 判断操作成功或失败。

This implementation also includes two types of commands,
a `Command0`, for actions without parameters,
and a `Command1`, for actions that take one parameter.

该实现包含 `Command0`（无参）与 `Command1`（单参）两种 command。

:::note
Check [pub.dev][] for other ready-to-use
implementations of the command pattern,
such as the [`command_it`][] package.

可在 [pub.dev][] 查看现成的命令模式实现，例如 [`command_it`][] 包。
:::

<?code-excerpt "lib/command.dart"?>
```dart
// Copyright 2024 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'dart:async';

import 'package:flutter/foundation.dart';

import 'result.dart';

/// Defines a command action that returns a [Result] of type [T].
/// Used by [Command0] for actions without arguments.
typedef CommandAction0<T> = Future<Result<T>> Function();

/// Defines a command action that returns a [Result] of type [T].
/// Takes an argument of type [A].
/// Used by [Command1] for actions with one argument.
typedef CommandAction1<T, A> = Future<Result<T>> Function(A);

/// Facilitates interaction with a view model.
///
/// Encapsulates an action,
/// exposes its running and error states,
/// and ensures that it can't be launched again until it finishes.
///
/// Use [Command0] for actions without arguments.
/// Use [Command1] for actions with one argument.
///
/// Actions must return a [Result] of type [T].
///
/// Consume the action result by listening to changes,
/// then call to [clearResult] when the state is consumed.
abstract class Command<T> extends ChangeNotifier {
  bool _running = false;

  /// Whether the action is running.
  bool get running => _running;

  Result<T>? _result;

  /// Whether the action completed with an error.
  bool get error => _result is Error;

  /// Whether the action completed successfully.
  bool get completed => _result is Ok;

  /// The result of the most recent action.
  ///
  /// Returns `null` if the action is running or completed with an error.
  Result<T>? get result => _result;

  /// Clears the most recent action's result.
  void clearResult() {
    _result = null;
    notifyListeners();
  }

  /// Execute the provided [action], notifying listeners and
  /// setting the running and result states as necessary.
  Future<void> _execute(CommandAction0<T> action) async {
    // Ensure the action can't launch multiple times.
    // e.g. avoid multiple taps on button
    if (_running) return;

    // Notify listeners.
    // e.g. button shows loading state
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

/// A [Command] that accepts no arguments.
final class Command0<T> extends Command<T> {
  /// Creates a [Command0] with the provided [CommandAction0].
  Command0(this._action);

  final CommandAction0<T> _action;

  /// Executes the action.
  Future<void> execute() async {
    await _execute(_action);
  }
}

/// A [Command] that accepts one argument.
final class Command1<T, A> extends Command<T> {
  /// Creates a [Command1] with the provided [CommandAction1].
  Command1(this._action);

  final CommandAction1<T, A> _action;

  /// Executes the action with the specified [argument].
  Future<void> execute(A argument) async {
    await _execute(() => _action(argument));
  }
}
```

[Compass App example]: {{site.repo.samples}}/tree/main/compass_app
[`Result` class]: /app-architecture/design-patterns/result
[pub.dev]: {{site.pub}}
[`command_it`]: {{site.pub-pkg}}/command_it
[`ChangeNotifier`]: /learn/pathway/tutorial/change-notifier
[Model-View-ViewModel (MVVM)]: /app-architecture/guide#view-models
[View models]: /app-architecture/guide#view-models
