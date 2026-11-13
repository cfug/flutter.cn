---
# title: Actions API revision
title: Actions API 修订
# description: >
#   Removes need for FocusNode in invocations, map Intent types to Actions.
description: >
  调用时不再需要 FocusNode，并将 Intent 类型映射到 Action。
ai-translated: true
---

{% render "docs/breaking-changes.md" %}

## Summary

## 概要

In Flutter an [`Intent`][] is an object that's typically bound
to a keyboard key combination using the [`Shortcuts`][] widget.
An `Intent` can be bound to an [`Action`][],
which can update the application's state or perform other operations.
In the course of using this API, we identified several drawbacks
in the design, so we have updated the Actions API to make it easier
to use and understand.

在 Flutter 中，[`Intent`][`Intent`] 是一个对象，
通常通过 [`Shortcuts`][`Shortcuts`] widget 绑定到键盘组合键。
`Intent` 可以绑定到 [`Action`][`Action`]，
用于更新应用状态或执行其他操作。
在使用此 API 的过程中，我们发现设计上有若干不足，
因此更新了 Actions API，让它更易使用、也更好理解。

In the previous Actions API design, actions were mapped from a
[`LocalKey`][] to an `ActionFactory` that created a new
`Action` each time the `invoke` method was called.
In the current API, actions are mapped from the type of the `Intent`
to an `Action` instance (with a `Map<Type, Action>`),
and they are not created anew for each invocation.

在先前的 Actions API 设计中，操作从 [`LocalKey`][`LocalKey`]
映射到一个 `ActionFactory`，每次调用 `invoke` 方法时都会创建一个新的 `Action`。
在当前 API 中，操作从 `Intent` 的类型映射到一个 `Action` 实例
（使用 `Map<Type, Action>`），并且不会在每次调用时重新创建。

## Context

## 上下文

The original Actions API design was oriented towards invoking actions from
widgets, and having those actions act in the context of the widget.
Teams have been using actions, and found several limitations in that
design that needed to be addressed:

最初的 Actions API 设计面向从 widget 调用操作，
并让这些操作在该 widget 的上下文中执行。
各团队在使用操作的过程中，发现该设计有若干需要解决的限制：

1. Actions couldn't be invoked from outside of the widget hierarchy.
   Examples of this include processing a script of commands,
   some undo architectures, and some controller architectures.

   无法从 widget 层级之外调用操作。
   例如处理一串命令脚本、某些撤销架构，以及某些控制器架构。

1. The mapping from shortcut key to `Intent` and then to
   `Action` wasn't always clear, since the data structures
   mapped LogicalKeySet =>Intent and then
   `LocalKey` => `ActionFactory`. The new mapping is still
   `LogicalKeySet` to `Intent` but then it maps `Type`
   (`Intent` type) to `Action`, which is more direct and
   readable, since the type of the intent is written in the mapping.

   从快捷键到 `Intent` 再从 `Intent` 到 `Action` 的映射并不总是清晰，
   因为数据结构先是 LogicalKeySet => Intent，
   然后是 `LocalKey` => `ActionFactory`。
   新的映射仍然是 `LogicalKeySet` 到 `Intent`，
   然后把 `Type`（`Intent` 类型）映射到 `Action`，
   这样更直接、也更易读，因为映射中写明了 intent 的类型。

1. If the key binding for an action was in another part of the
   widget hierarchy, it was not always possible for the `Intent`
   to have access to the state necessary to decide if the
   intent/action should be enabled or not.

   如果某个操作的按键绑定位于 widget 层级的另一部分，
   `Intent` 并不总能访问到判断该 intent/action
   是否应当启用所需的状态。

To address these issues, we made some significant changes to the API.
The mapping of actions was made more intuitive,
and the enabled interface was moved to the `Action` class.
Some unnecessary arguments were removed from the `Action`'s
`invoke` method and its constructor, and actions were allowed
to return results from their invoke method.
Actions were made into generics, accepting the type of `Intent`
they handle, and `LocalKeys` were no longer used for identifying
which action to run, and the type of the `Intent` is used instead.

为解决这些问题，我们对 API 做了一些重大改动。
操作的映射变得更直观，启用接口也移到了 `Action` 类。
`Action` 的 `invoke` 方法及其构造函数去掉了一些不必要的参数，
并且操作可以从 invoke 方法返回结果。
`Action` 变成了泛型，接受它所处理的 `Intent` 类型，
不再用 `LocalKey` 来标识要运行哪个操作，而是改用 `Intent` 的类型。

The majority of these changes were made in the PRs for
[Revise Action API][] and [Make Action.enabled be
isEnabled(Intent intent) instead][], and are
described in detail in [the design
doc](/go/actions-and-shortcuts-design-revision).

这些改动大部分是在
[修订 Action API][Revise Action API] 和
[让 Action.enabled 改为 isEnabled(Intent
intent)][Make Action.enabled be isEnabled(Intent intent) instead]
这两个 PR 中完成的，
详见 [设计文档](/go/actions-and-shortcuts-design-revision)。

## Description of change

## 改动说明

Here are the changes made to address the above problems:

为解决上述问题，做了以下改动：

1. The `Map<LocalKey, ActionFactory>` that was given to the [`Actions`][] widget
   is now a `Map<Type, Action<Intent>>` (the type is the type of the Intent to
   be passed to the Action).

   传给 [`Actions`][`Actions`] widget 的 `Map<LocalKey, ActionFactory>`
   现在是 `Map<Type, Action<Intent>>`
   （这里的类型是要传给 Action 的 Intent 类型）。

1. The `isEnabled` method was moved from the `Intent` class to the `Action`
   class.

   `isEnabled` 方法已从 `Intent` 类移到 `Action` 类。

1. The `FocusNode` argument to `Action.invoke` and `Actions.invoke` methods was removed.

   `Action.invoke` 和 `Actions.invoke` 方法的 `FocusNode` 参数已移除。

1. Invoking an action no longer creates a new instance of the `Action`.

   调用操作时不再创建新的 `Action` 实例。

1. The `LocalKey` argument to the `Intent` constructor was removed.

   `Intent` 构造函数的 `LocalKey` 参数已移除。

1. The `LocalKey` argument to `CallbackAction` was removed.

   `CallbackAction` 的 `LocalKey` 参数已移除。

1. The `Action` class is now a generic (`Action<T extends Intent>`) for better
   type safety.

   `Action` 类现在是泛型（`Action<T extends Intent>`），以获得更好的类型安全。

1. The `OnInvokeCallback` used by `CallbackAction` no longer takes a `FocusNode`
   argument.

   `CallbackAction` 使用的 `OnInvokeCallback` 不再接收 `FocusNode` 参数。

1. The `ActionDispatcher.invokeAction` signature has changed to not accept an
   optional `FocusNode`, but instead take an optional `BuildContext`.

   `ActionDispatcher.invokeAction` 的签名已改变：
   不再接受可选的 `FocusNode`，改为接受可选的 `BuildContext`。

1. The `LocalKey` static constants (named key by convention) in `Action`
   subclasses have been removed.

   `Action` 子类中的 `LocalKey` 静态常量（按约定命名为 key）已移除。

1. The `Action.invoke` and `ActionDispatcher.invokeAction` methods now return
   the result of invoking the action as an `Object`.

   `Action.invoke` 和 `ActionDispatcher.invokeAction` 方法
   现在以 `Object` 返回调用操作的结果。

1. The `Action` class may now be listened to for state changes.

   现在可以监听 `Action` 类的状态变化。

1. The `ActionFactory` typedef has been removed, as it is no longer used.

   `ActionFactory` typedef 已移除，因为不再使用。

## Example analyzer failures

## 分析器报错示例

Here are some example analyzer failures that might be encountered where an
outdated use of the Actions API might be the cause of the problem. The specifics
of the error might differ, and there may be other failures caused by these
changes.

下面是一些可能遇到的分析器报错示例，
原因可能是使用了过时的 Actions API。
具体错误可能不同，这些改动也可能导致其他失败。

```plaintext
error: MyActionDispatcher.invokeAction' ('bool Function(Action<Intent>, Intent, {FocusNode focusNode})') isn't a valid override of 'ActionDispatcher.invokeAction' ('Object Function(Action<Intent>, Intent, [BuildContext])'). (invalid_override at [main] lib/main.dart:74)

error: MyAction.invoke' ('void Function(FocusNode, Intent)') isn't a valid override of 'Action.invoke' ('Object Function(Intent)'). (invalid_override at [main] lib/main.dart:231)

error: The method 'isEnabled' isn't defined for the type 'Intent'. (undefined_method at [main] lib/main.dart:97)

error: The argument type 'Null Function(FocusNode, Intent)' can't be assigned to the parameter type 'Object Function(Intent)'. (argument_type_not_assignable at [main] lib/main.dart:176)

error: The getter 'key' isn't defined for the type 'NextFocusAction'. (undefined_getter at [main] lib/main.dart:294)

error: The argument type 'Map<LocalKey, dynamic>' can't be assigned to the parameter type 'Map<Type, Action<Intent>>'. (argument_type_not_assignable at [main] lib/main.dart:418)
```

## Migration guide

## 迁移指南

Significant changes area required to update existing code
to the new API.

将现有代码更新到新 API 需要做较大改动。

### Actions mapping for pre-defined actions

### 预定义操作的 Actions 映射

To update the action maps in the `Actions` widget for
predefined actions in Flutter, like `ActivateAction`
and `SelectAction`, do the following:

要更新 `Actions` widget 中 Flutter 预定义操作
（例如 `ActivateAction` 和 `SelectAction`）的操作映射，请按以下步骤操作：

* Update the argument type of the `actions` argument

  更新 `actions` 参数的参数类型

* Use an instance of a specific `Intent` class in the
  `Shortcuts` mapping, rather than an `Intent(TheAction.key)`
  instance.

  在 `Shortcuts` 映射中使用某个具体 `Intent` 类的实例，
  而不要使用 `Intent(TheAction.key)` 实例。

Code before migration:

迁移之前的代码：

```dart
class MyWidget extends StatelessWidget {
  // ...
  @override
  Widget build(BuildContext context) {
    return Shortcuts(
      shortcuts: <LogicalKeySet, Intent> {
        LogicalKeySet(LogicalKeyboardKey.enter): Intent(ActivateAction.key),
      },
      child: Actions(
        actions: <LocalKey, ActionFactory>{
          Activate.key: () => ActivateAction(),
        },
        child: Container(),
      )
    );
  }
}
```

Code after migration:

迁移之后的代码：

```dart
class MyWidget extends StatelessWidget {
  // ...
  @override
  Widget build(BuildContext context) {
    return Shortcuts(
      shortcuts: <LogicalKeySet, Intent> {
        LogicalKeySet(LogicalKeyboardKey.enter): ActivateIntent,
      },
      child: Actions(
        actions: <Type, Action<Intent>>{
          ActivateIntent: ActivateAction(),
        },
        child: Container(),
      )
    );
  }
}
```

### Custom actions

### 自定义操作

To migrate your custom actions, eliminate the `LocalKeys`
you've defined, and replace them with `Intent` subclasses,
as well as changing the type of the argument to the `actions`
argument of the `Actions` widget.

要迁移自定义操作，请去掉你定义的 `LocalKey`，
用 `Intent` 子类替换它们，
并更改 `Actions` widget 的 `actions` 参数的类型。

Code before migration:

迁移之前的代码：

```dart
class MyAction extends Action {
  MyAction() : super(key);

  /// The [LocalKey] that uniquely identifies this action to an [Intent].
  static const LocalKey key = ValueKey<Type>(RequestFocusAction);

  @override
  void invoke(FocusNode node, MyIntent intent) {
    // ...
  }
}

class MyWidget extends StatelessWidget {
  // ...
  @override
  Widget build(BuildContext context) {
    return Shortcuts(
      shortcuts: <LogicalKeySet, Intent> {
        LogicalKeySet(LogicalKeyboardKey.enter): Intent(MyAction.key),
      },
      child: Actions(
        actions: <LocalKey, ActionFactory>{
          MyAction.key: () => MyAction(),
        },
        child: Container(),
      )
    );
  }
}
```

Code after migration:

迁移之后的代码：

```dart
// You may need to create new Intent subclasses if you used
// a bare LocalKey before.
class MyIntent extends Intent {
  const MyIntent();
}

class MyAction extends Action<MyIntent> {
  @override
  Object invoke(MyIntent intent) {
    // ...
  }
}

class MyWidget extends StatelessWidget {
  // ...
  @override
  Widget build(BuildContext context) {
    return Shortcuts(
      shortcuts: <LogicalKeySet, Intent> {
        LogicalKeySet(LogicalKeyboardKey.enter): MyIntent,
      },
      child: Actions(
        actions: <Type, Action<Intent>>{
          MyIntent: MyAction(),
        },
        child: Container(),
      )
    );
  }
}
```

### Custom `Actions` and `Intents` with arguments

### 带参数的自定义 `Actions` 与 `Intents`

To update actions that use intent arguments or hold state,
you need to modify the arguments to the `invoke` method.
In the example below, the code keeps the value of the
argument in the intent as part of the action instance.
This is because in the old design there is a new instance
of the action created each time it's executed,
and the resulting action could be kept by the
[`ActionDispatcher`][] to record the state.

要更新使用 intent 参数或持有状态的操作，
需要修改 `invoke` 方法的参数。
在下面的示例中，代码把 intent 中的参数值保存在操作实例里。
这是因为在旧设计中，每次执行都会创建一个新的操作实例，
并且 [`ActionDispatcher`][`ActionDispatcher`]
可以保留得到的操作以记录状态。

In the example of post migration code below,
the new `MyAction` returns the state as the result
of calling `invoke`, since a new instance isn't created
for each invocation. This state is returned to the caller of
`Actions.invoke`, or `ActionDispatcher.invokeAction`,
depending on how the action is invoked.

在下面迁移之后的代码示例中，
新的 `MyAction` 把状态作为调用 `invoke` 的结果返回，
因为每次调用都不会创建新实例。
该状态会返回给 `Actions.invoke` 或 `ActionDispatcher.invokeAction` 的调用方，
具体取决于操作是如何调用的。

Code before migration:

迁移之前的代码：

```dart
class MyIntent extends Intent {
  const MyIntent({this.argument});

  final int argument;
}

class MyAction extends Action {
  MyAction() : super(key);

  /// The [LocalKey] that uniquely identifies this action to an [Intent].
  static const LocalKey key = ValueKey<Type>(RequestFocusAction);

  int state;

  @override
  void invoke(FocusNode node, MyIntent intent) {
    // ...
    state = intent.argument;
  }
}
```

Code after migration:

迁移之后的代码：

```dart
class MyIntent extends Intent {
  const MyIntent({this.argument});

  final int argument;
}

class MyAction extends Action<MyIntent> {
  @override
  int invoke(Intent intent) {
    // ...
    return intent.argument;
  }
}
```

## Timeline

## 时间线

Landed in version: 1.18<br>
合入版本：1.18<br>
In stable release: 1.20

进入稳定版：1.20

## References

## 参考资料

API documentation:

API 文档：

* [`Action`][]
* [`ActionDispatcher`][]
* [`Actions`][]
* [`Intent`][]
* [`Shortcuts`][]

Relevant issue:

相关 issue：

* [Issue 53276][]

Relevant PRs:

相关 PR：

* [Revise Action API][]

  [修订 Action API][Revise Action API]

* [Make Action.enabled be isEnabled(Intent intent) instead][]

  [让 Action.enabled 改为 isEnabled(Intent
  intent)][Make Action.enabled be isEnabled(Intent intent) instead]

[`Action`]: {{site.api}}/flutter/widgets/Action-class.html
[`ActionDispatcher`]: {{site.api}}/flutter/widgets/ActionDispatcher-class.html
[`Actions`]: {{site.api}}/flutter/widgets/Actions-class.html
[`Intent`]: {{site.api}}/flutter/widgets/Intent-class.html
[Issue 53276]: {{site.repo.flutter}}/issues/53276
[`LocalKey`]: {{site.api}}/flutter/foundation/LocalKey-class.html
[Make Action.enabled be isEnabled(Intent intent) instead]: {{site.repo.flutter}}/pull/55230
[Revise Action API]: {{site.repo.flutter}}/pull/42940
[`Shortcuts`]: {{site.api}}/flutter/widgets/Shortcuts-class.html
