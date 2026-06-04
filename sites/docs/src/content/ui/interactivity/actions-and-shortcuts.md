---
# title: Using Actions and Shortcuts
title: 使用操作和快捷方式
# description: How to use Actions and Shortcuts in your Flutter app.
description: 如何在 Flutter 应用程序中使用操作和快捷方式。
ai-translated: true
---

This page describes how to bind physical keyboard events to actions in the user
interface. For instance, to define keyboard shortcuts in your application, this
page is for you.

本页说明如何将物理键盘事件绑定到用户界面中的操作。例如，若要在应用中定义键盘快捷方式，本页适合你。

## Overview

## 概览

For a GUI application to do anything, it has to have actions: users want to tell
the application to _do_ something. Actions are often simple functions that
directly perform the action (such as set a value or save a file). In a larger
application, however, things are more complex: the code for invoking the action,
and the code for the action itself might need to be in different places.
Shortcuts (key bindings) might need definition at a level that knows nothing
about the actions they invoke.

That's where Flutter's actions and shortcuts system comes in. It allows
developers to define actions that fulfill intents bound to them. In this
context, an intent is a generic action that the user wishes to perform, and an
[`Intent`][] class instance represents these user intents in Flutter. An
`Intent` can be general purpose, fulfilled by different actions in different
contexts. An [`Action`][] can be a simple callback (as in the case of
the [`CallbackAction`][]) or something more complex that integrates with entire
undo/redo architectures (for example) or other logic.

GUI 应用要能完成任何事，都需要操作：用户希望告诉应用*做*某件事。操作通常是直接执行该操作的简单函数（例如设置值或保存文件）。然而在较大应用中情况更复杂：调用操作的代码与操作本身的代码可能需要在不同位置。快捷方式（按键绑定）可能需要在不了解其所调用操作的层级上定义。

这时 Flutter 的操作与快捷方式系统就派上用场。它允许开发者定义履行绑定到它们的 intent 的操作。在此语境下，intent 是用户希望执行的通用操作，[`Intent`][] 类实例在 Flutter 中表示这些用户 intent。`Intent` 可以是通用目的，在不同上下文中由不同操作履行。[`Action`][] 可以是简单回调（如 [`CallbackAction`][] 的情况），也可以是更复杂、与整套撤销/重做架构（例如）或其他逻辑集成的实现。

![Using Shortcuts Diagram][]{:width="100%" .diagram-wrap}

[`Shortcuts`][] are key bindings that activate by pressing a key or combination
of keys. The key combinations reside in a table with their bound intent. When
the `Shortcuts` widget invokes them, it sends their matching intent to the
actions subsystem for fulfillment.

[`Shortcuts`][] 是按下某个键或组合键时激活的按键绑定。键组合与其绑定的 intent 存放在表中。当 `Shortcuts` widget 调用它们时，会将匹配的 intent 发送给操作子系统以履行。

To illustrate the concepts in actions and shortcuts, this article creates a
simple app that allows a user to select and copy text in a text field using both
buttons and shortcuts.

为说明操作与快捷方式中的概念，本文创建一个简单应用，让用户通过按钮和快捷方式在文本字段中选择并复制文本。

### Why separate Actions from Intents?

### 为何将 Action 与 Intent 分离？

You might wonder: why not just map a key combination directly to an action?  Why
have intents at all? This is because it is useful to have a separation of
concerns between where the key mapping definitions are (often at a high level),
and where the action definitions are (often at a low level), and because it is
important to be able to have a single key combination map to an intended
operation in an app, and have it adapt automatically to whichever action
fulfills that intended operation for the focused context.

你可能会想：为何不直接将键组合映射到操作？为何要有 intent？这是因为将按键映射定义所在位置（通常在高层次）与操作定义所在位置（通常在低层次）分离很有用；而且重要的是，单个键组合可以映射到应用中的预期操作，并自动适配当前焦点上下文中履行该预期操作的操作。

For instance, Flutter has an `ActivateIntent` widget that maps each type of
control to its corresponding version of an `ActivateAction` (and that executes
the code that activates the control). This code often needs fairly private
access to do its work. If the extra layer of indirection that `Intent`s provide
didn't exist, it would be necessary to elevate the definition of the actions to
where the defining instance of the `Shortcuts` widget could see them, causing
the shortcuts to have more knowledge than necessary about which action to
invoke, and to have access to or provide state that it wouldn't necessarily have
or need otherwise. This allows your code to separate the two concerns to be more
independent.

例如，Flutter 有 `ActivateIntent`，将每种控件映射到对应的 `ActivateAction` 版本（并执行激活该控件的代码）。这段代码通常需要相当私有的访问权限才能完成工作。若没有 `Intent` 提供的额外间接层，就必须把操作定义提升到定义 `Shortcuts` widget 的实例可见的位置，导致快捷方式对要调用哪个操作了解过多，并需要访问或提供它本不必拥有或需要的状态。这使你的代码能将两方面关注点更独立地分离。

Intents configure an action so that the same action can serve multiple uses. An
example of this is `DirectionalFocusIntent`, which takes a direction to move
the focus in, allowing the `DirectionalFocusAction` to know which direction to
move the focus. Just be careful: don't pass state in the `Intent` that applies
to all  invocations of an `Action`: that kind of state should be passed to the
constructor of the `Action` itself, to keep the `Intent` from needing to know
too much.

Intent 配置操作，使同一操作可服务多种用途。例如 `DirectionalFocusIntent` 接收移动焦点的方向，让 `DirectionalFocusAction` 知道向哪个方向移动焦点。请注意：不要在 `Intent` 中传递适用于 `Action` 所有调用的状态：这类状态应传给 `Action` 本身的构造函数，以免 `Intent` 需要了解过多信息。

### Why not use callbacks?

### 为何不使用回调？

You also might wonder: why not just use a callback instead of an `Action`
object? The main reason is that it's useful for actions to decide whether they
are enabled by implementing `isEnabled`. Also, it is often helpful if the key
bindings, and the implementation of those bindings, are in different places.

你也可能想：为何不直接用回调代替 `Action` 对象？主要原因是操作通过实现 `isEnabled` 来决定是否启用很有用。此外，将按键绑定及其实现放在不同位置往往很有帮助。

If all you need are callbacks without the flexibility of `Actions` and
`Shortcuts`, you can use the [`CallbackShortcuts`][] widget:

若你只需要回调而不需要 `Actions` 和 `Shortcuts` 的灵活性，可以使用 [`CallbackShortcuts`][] widget：

<?code-excerpt "ui/actions_and_shortcuts/lib/samples.dart (callback-shortcuts)"?>
```dart
@override
Widget build(BuildContext context) {
  return CallbackShortcuts(
    bindings: <ShortcutActivator, VoidCallback>{
      const SingleActivator(LogicalKeyboardKey.arrowUp): () {
        setState(() => count = count + 1);
      },
      const SingleActivator(LogicalKeyboardKey.arrowDown): () {
        setState(() => count = count - 1);
      },
    },
    child: Focus(
      autofocus: true,
      child: Column(
        children: <Widget>[
          const Text('Press the up arrow key to add to the counter'),
          const Text('Press the down arrow key to subtract from the counter'),
          Text('count: $count'),
        ],
      ),
    ),
  );
}
```

## Shortcuts

## 快捷方式

As you'll see below, actions are useful on their own, but the most common use
case involves binding them to a keyboard shortcut. This is what the `Shortcuts`
widget is for.

如下文所示，操作本身很有用，但最常见用法是将它们绑定到键盘快捷方式。这正是 `Shortcuts` widget 的用途。

It is inserted into the widget hierarchy to define key combinations that
represent the user's intent when that key combination is pressed. To convert
that intended purpose for the key combination into a concrete action, the
`Actions` widget used to map the `Intent` to an `Action`. For instance, you can
define a `SelectAllIntent`, and bind it to your own `SelectAllAction` or to your
`CanvasSelectAllAction`, and from that one key binding, the system invokes
either one, depending on which part of your application has focus. Let's see how
the key binding part works:

它插入 widget 层次结构，用于定义表示用户按下该键组合时意图的键组合。要将键组合的预期目的转换为具体操作，需使用 `Actions` widget 将 `Intent` 映射到 `Action`。例如，你可以定义 `SelectAllIntent`，并将其绑定到你自己的 `SelectAllAction` 或 `CanvasSelectAllAction`，仅凭这一键绑定，系统会根据应用哪一部分拥有焦点而调用其中之一。下面说明键绑定部分如何工作：

<?code-excerpt "ui/actions_and_shortcuts/lib/samples.dart (shortcuts)"?>
```dart
@override
Widget build(BuildContext context) {
  return Shortcuts(
    shortcuts: <LogicalKeySet, Intent>{
      LogicalKeySet(LogicalKeyboardKey.control, LogicalKeyboardKey.keyA):
          const SelectAllIntent(),
    },
    child: Actions(
      dispatcher: LoggingActionDispatcher(),
      actions: <Type, Action<Intent>>{
        SelectAllIntent: SelectAllAction(model),
      },
      child: Builder(
        builder: (context) => TextButton(
          onPressed: Actions.handler<SelectAllIntent>(
            context,
            const SelectAllIntent(),
          ),
          child: const Text('SELECT ALL'),
        ),
      ),
    ),
  );
}
```

The map given to a `Shortcuts` widget maps a `LogicalKeySet` (or a
`ShortcutActivator`, see note below) to an `Intent` instance. The logical key
set defines a set of one or more keys, and the intent indicates the intended
purpose of the keypress. The `Shortcuts` widget looks up key presses in the map,
to find an `Intent` instance, which it gives to the action's `invoke()` method.

传给 `Shortcuts` widget 的 map 将 `LogicalKeySet`（或 `ShortcutActivator`，见下方说明）映射到 `Intent` 实例。逻辑键集定义一个或多个键，intent 表示按键的预期目的。`Shortcuts` widget 在 map 中查找按键，找到 `Intent` 实例后交给操作的 `invoke()` 方法。

:::note
`ShortcutActivator` is a replacement for `LogicalKeySet`.
It allows for more flexible and correct activation of shortcuts.
`LogicalKeySet` is a `ShortcutActivator`, of course, but
there is also `SingleActivator`, which takes a single key and the
optional modifiers to be pressed before the key.
Then there is `CharacterActivator`, which activates a shortcut based on the
character produced by a key sequence, instead of the logical keys themselves.
`ShortcutActivator` is also meant to be subclassed to allow for
custom ways of activating shortcuts from key events.
:::

:::note
`ShortcutActivator` 是 `LogicalKeySet` 的替代方案。
它允许更灵活、更正确地激活快捷方式。
`LogicalKeySet` 当然也是一种 `ShortcutActivator`，
此外还有 `SingleActivator`，接收单个键及可选的修饰键。
还有 `CharacterActivator`，根据按键序列产生的字符而非逻辑键本身来激活快捷方式。
`ShortcutActivator` 也设计为可子类化，以支持从按键事件自定义激活快捷方式的方式。
:::

### The ShortcutManager

### ShortcutManager

The shortcut manager, a longer-lived object than the `Shortcuts` widget, passes
on key events when it receives them. It contains the logic for deciding how to
handle the keys, the logic for walking up the tree to find other shortcut
mappings, and maintains a map of key combinations to intents.

快捷方式管理器是比 `Shortcuts` widget 生命周期更长的对象，在收到按键事件时传递它们。它包含决定如何处理按键的逻辑、沿树向上查找其他快捷方式映射的逻辑，并维护键组合到 intent 的 map。

While the default behavior of the `ShortcutManager` is usually desirable, the
`Shortcuts` widget takes a `ShortcutManager` that you can subclass to customize
its functionality.

虽然 `ShortcutManager` 的默认行为通常符合需求，但 `Shortcuts` widget 可接收你可子类化以自定义功能的 `ShortcutManager`。

For example, if you wanted to log each key that a `Shortcuts` widget handled,
you could make a `LoggingShortcutManager`:

例如，若要记录 `Shortcuts` widget 处理的每个键，可以创建 `LoggingShortcutManager`：

<?code-excerpt "ui/actions_and_shortcuts/lib/samples.dart (logging-shortcut-manager)"?>
```dart
class LoggingShortcutManager extends ShortcutManager {
  @override
  KeyEventResult handleKeypress(BuildContext context, KeyEvent event) {
    final KeyEventResult result = super.handleKeypress(context, event);
    if (result == KeyEventResult.handled) {
      print('Handled shortcut $event in $context');
    }
    return result;
  }
}
```

Now, every time the `Shortcuts` widget handles a shortcut, it prints out the key
event and relevant context.

现在，每次 `Shortcuts` widget 处理快捷方式时，都会打印按键事件和相关 context。

## Actions

## 操作

`Actions` allow for the definition of operations that the application can
perform by invoking them with an `Intent`. Actions can be enabled or disabled,
and receive the intent instance that invoked them as an argument to allow
configuration by the intent.

`Actions` 允许定义应用通过 `Intent` 调用即可执行的操作。操作可启用或禁用，并接收调用它们的 intent 实例作为参数，以便由 intent 配置。

### Defining actions

### 定义操作

Actions, in their simplest form, are just subclasses of `Action<Intent>` with an
`invoke()` method. Here's a simple action that simply invokes a function on the
provided model:

操作的最简形式是带有 `invoke()` 方法的 `Action<Intent>` 子类。下面是一个在提供的 model 上调用函数的简单操作：

<?code-excerpt "ui/actions_and_shortcuts/lib/samples.dart (select-all-action)"?>
```dart
class SelectAllAction extends Action<SelectAllIntent> {
  SelectAllAction(this.model);

  final Model model;

  @override
  void invoke(covariant SelectAllIntent intent) => model.selectAll();
}
```

Or, if it's too much of a bother to create a new class, use a `CallbackAction`:

或者，若创建新类太麻烦，可使用 `CallbackAction`：

<?code-excerpt "ui/actions_and_shortcuts/lib/samples.dart (callback-action)"?>
```dart
CallbackAction(onInvoke: (intent) => model.selectAll());
```

Once you have an action, you add it to your application using the [`Actions`][]
widget, which takes a map of `Intent` types to `Action`s:

有了操作后，使用 [`Actions`][] widget 将其加入应用，该 widget 接收 `Intent` 类型到 `Action` 的 map：

<?code-excerpt "ui/actions_and_shortcuts/lib/samples.dart (select-all-usage)"?>
```dart
@override
Widget build(BuildContext context) {
  return Actions(
    actions: <Type, Action<Intent>>{SelectAllIntent: SelectAllAction(model)},
    child: child,
  );
}
```

The `Shortcuts` widget uses the `Focus` widget's context and `Actions.invoke` to
find which action to invoke. If the `Shortcuts` widget doesn't find a matching
intent type in the first `Actions` widget encountered, it considers the next
ancestor `Actions` widget, and so on, until it reaches the root of the widget
tree, or finds a matching intent type and invokes the corresponding action.

`Shortcuts` widget 使用 `Focus` widget 的 context 和 `Actions.invoke` 查找要调用的操作。若第一个遇到的 `Actions` widget 中没有匹配的 intent 类型，会继续考虑上层祖先 `Actions` widget，直至到达 widget 树根或找到匹配的 intent 类型并调用对应操作。

### Invoking Actions

### 调用操作

The actions system has several ways to invoke actions.  By far the most common
way is through the use of a `Shortcuts` widget covered in the previous section,
but there are other ways to interrogate the actions subsystem and invoke an
action. It's possible to invoke actions that are not bound to keys.

操作子系统有多种调用操作的方式。最常见的是上一节介绍的 `Shortcuts` widget，但也有其他方式查询操作子系统并调用操作。可以调用未绑定到按键的操作。

For instance, to find an action associated with an intent, you can use:

例如，要查找与 intent 关联的操作，可以使用：

<?code-excerpt "ui/actions_and_shortcuts/lib/samples.dart (maybe-find)"?>
```dart
Action<SelectAllIntent>? selectAll = Actions.maybeFind<SelectAllIntent>(
  context,
);
```

This returns an `Action` associated with the `SelectAllIntent` type if one is
available in the given `context`.  If one isn't available, it returns null. If
an associated `Action` should always be available, then use `find` instead of
`maybeFind`, which throws an exception when it doesn't find a matching `Intent`
type.

若在指定 `context` 中有与 `SelectAllIntent` 类型关联的 `Action`，则返回该 `Action`；否则返回 null。若关联的 `Action` 应始终存在，请使用 `find` 而非 `maybeFind`，找不到匹配的 `Intent` 类型时会抛出异常。

To invoke the action (if it exists), call:

要调用操作（若存在），请调用：

<?code-excerpt "ui/actions_and_shortcuts/lib/samples.dart (invoke-action)"?>
```dart
Object? result;
if (selectAll != null) {
  result = Actions.of(
    context,
  ).invokeAction(selectAll, const SelectAllIntent());
}
```

Combine that into one call with the following:

也可通过以下方式合并为一次调用：

<?code-excerpt "ui/actions_and_shortcuts/lib/samples.dart (maybe-invoke)"?>
```dart
Object? result = Actions.maybeInvoke<SelectAllIntent>(
  context,
  const SelectAllIntent(),
);
```

Sometimes you want to invoke an action as a
result of pressing a button or another control.
You can do this with the `Actions.handler` function.
If the intent has a mapping to an enabled action,
the `Actions.handler` function creates a handler closure.
However, if it doesn't have a mapping, it returns `null`.
This allows the button to be disabled if
there is no enabled action that matches in the context.

有时你想在按下按钮或其他控件时调用操作。可使用 `Actions.handler` 函数。若 intent 映射到已启用的操作，`Actions.handler` 会创建处理闭包；若无映射则返回 `null`。这样在上下文中没有匹配的已启用操作时，按钮可被禁用。

<?code-excerpt "ui/actions_and_shortcuts/lib/samples.dart (handler)"?>
```dart
@override
Widget build(BuildContext context) {
  return Actions(
    actions: <Type, Action<Intent>>{SelectAllIntent: SelectAllAction(model)},
    child: Builder(
      builder: (context) => TextButton(
        onPressed: Actions.handler<SelectAllIntent>(
          context,
          SelectAllIntent(controller: controller),
        ),
        child: const Text('SELECT ALL'),
      ),
    ),
  );
}
```

The `Actions` widget only invokes actions when `isEnabled(Intent intent)`
returns true, allowing the action to decide if the dispatcher should consider it
for invocation.  If the action isn't enabled, then the `Actions` widget gives
another enabled action higher in the widget hierarchy (if it exists) a chance to
execute.

`Actions` widget 仅在 `isEnabled(Intent intent)` 返回 true 时调用操作，允许操作决定调度器是否应考虑调用它。若操作未启用，`Actions` widget 会给 widget 层次结构中更高位置的另一个已启用操作（若存在）执行机会。

The previous example uses a `Builder` because `Actions.handler` and
`Actions.invoke` (for example) only finds actions in the provided `context`, and
if the example passes the `context` given to the `build` function, the framework
starts looking _above_ the current widget.  Using a `Builder` allows the
framework to find the actions defined in the same `build` function.

上一示例使用 `Builder`，因为 `Actions.handler` 和 `Actions.invoke`（等）仅在提供的 `context` 中查找操作；若示例传入 `build` 函数得到的 `context`，框架会从*当前* widget 之上开始查找。使用 `Builder` 可使框架找到同一 `build` 函数中定义的操作。

You can invoke an action without needing a `BuildContext`, but since the
`Actions` widget requires a context to find an enabled action to invoke, you
need to provide one, either by creating your own `Action` instance, or by
finding one in an appropriate context with `Actions.find`.

To invoke the action, pass the action to the `invoke` method on an
`ActionDispatcher`, either one you created yourself, or one retrieved from an
existing `Actions` widget using the `Actions.of(context)` method. Check whether
the action is enabled before calling `invoke`. Of course, you can also just call
`invoke` on the action itself, passing an `Intent`, but then you opt out of any
services that an action dispatcher might provide (like logging, undo/redo, and
so on).

你可在不需要 `BuildContext` 的情况下调用操作，但由于 `Actions` widget 需要 context 来查找要调用的已启用操作，你需要提供 context：创建自己的 `Action` 实例，或通过 `Actions.find` 在合适的 context 中查找。要调用操作，将操作传给 `ActionDispatcher` 的 `invoke` 方法——可以是自建的，也可通过 `Actions.of(context)` 从现有 `Actions` widget 获取。调用 `invoke` 前检查操作是否已启用。当然也可直接在操作上调用 `invoke` 并传入 `Intent`，但这样会放弃操作调度器可能提供的服务（如日志、撤销/重做等）。

### Action dispatchers

### 操作调度器

Most of the time, you just want to invoke an action, have it do its thing, and
forget about it. Sometimes, however, you might want to log the executed actions.

多数情况下，你只需调用操作、让它完成工作即可。但有时你可能想记录已执行的操作。

This is where replacing the default `ActionDispatcher` with a custom dispatcher
comes in.  You pass your `ActionDispatcher` to the `Actions` widget, and it
invokes actions from any `Actions` widgets below that one that doesn't set a
dispatcher of its own.

The first thing `Actions` does when invoking an action is look up the
`ActionDispatcher` and pass the action to it for invocation. If there is none,
it creates a default `ActionDispatcher` that simply invokes the action.

If you want a log of all the actions invoked, however, you can create your own
`LoggingActionDispatcher` to do the job:

此时可将默认 `ActionDispatcher` 替换为自定义调度器。将 `ActionDispatcher` 传给 `Actions` widget，它会调用其下未自行设置调度器的任何 `Actions` widget 中的操作。`Actions` 调用操作时首先查找 `ActionDispatcher` 并将操作交给它调用；若没有则创建默认 `ActionDispatcher` 直接调用操作。若需要所有已调用操作的日志，可创建自己的 `LoggingActionDispatcher`：

<?code-excerpt "ui/actions_and_shortcuts/lib/samples.dart (logging-action-dispatcher)"?>
```dart
class LoggingActionDispatcher extends ActionDispatcher {
  @override
  Object? invokeAction(
    covariant Action<Intent> action,
    covariant Intent intent, [
    BuildContext? context,
  ]) {
    print('Action invoked: $action($intent) from $context');
    super.invokeAction(action, intent, context);

    return null;
  }

  @override
  (bool, Object?) invokeActionIfEnabled(
    covariant Action<Intent> action,
    covariant Intent intent, [
    BuildContext? context,
  ]) {
    print('Action invoked: $action($intent) from $context');
    return super.invokeActionIfEnabled(action, intent, context);
  }
}
```

Then you pass that to your top-level `Actions` widget:

然后将它传给顶层 `Actions` widget：

<?code-excerpt "ui/actions_and_shortcuts/lib/samples.dart (logging-action-dispatcher-usage)"?>
```dart
@override
Widget build(BuildContext context) {
  return Actions(
    dispatcher: LoggingActionDispatcher(),
    actions: <Type, Action<Intent>>{SelectAllIntent: SelectAllAction(model)},
    child: Builder(
      builder: (context) => TextButton(
        onPressed: Actions.handler<SelectAllIntent>(
          context,
          const SelectAllIntent(),
        ),
        child: const Text('SELECT ALL'),
      ),
    ),
  );
}
```

This logs every action as it executes, like so:

执行时会记录每个操作，例如：

```console
flutter: Action invoked: SelectAllAction#906fc(SelectAllIntent#a98e3) from Builder(dependencies: _[ActionsMarker])
```

## Putting it together

## 综合示例

The combination of `Actions` and `Shortcuts` is powerful: you can define generic
intents that map to specific actions at the widget level. Here's a simple app
that illustrates the concepts described above. The app creates a text field that
also has "select all" and "copy to clipboard" buttons next to it. The buttons
invoke actions to accomplish their work. All the invoked actions and
shortcuts are logged.

`Actions` 与 `Shortcuts` 的组合很强大：你可以在 widget 层级定义映射到具体操作的通用 intent。下面是一个说明上文概念的简单应用：应用创建一个文本字段，旁边有「全选」和「复制到剪贴板」按钮；按钮通过调用操作完成工作；所有被调用的操作和快捷方式都会记录日志。

<?code-excerpt "ui/actions_and_shortcuts/lib/copyable_text.dart"?>
```dartpad title="Copyable text DartPad hands-on example" run="true"
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// A text field that also has buttons to select all the text and copy the
/// selected text to the clipboard.
class CopyableTextField extends StatefulWidget {
  const CopyableTextField({super.key, required this.title});

  final String title;

  @override
  State<CopyableTextField> createState() => _CopyableTextFieldState();
}

class _CopyableTextFieldState extends State<CopyableTextField> {
  late final TextEditingController controller = TextEditingController();
  late final FocusNode focusNode = FocusNode();

  @override
  void dispose() {
    controller.dispose();
    focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Actions(
      dispatcher: LoggingActionDispatcher(),
      actions: <Type, Action<Intent>>{
        ClearIntent: ClearAction(controller),
        CopyIntent: CopyAction(controller),
        SelectAllIntent: SelectAllAction(controller, focusNode),
      },
      child: Builder(
        builder: (context) {
          return Scaffold(
            body: Center(
              child: Row(
                children: <Widget>[
                  const Spacer(),
                  Expanded(
                    child: TextField(
                      controller: controller,
                      focusNode: focusNode,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.copy),
                    onPressed: Actions.handler<CopyIntent>(
                      context,
                      const CopyIntent(),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.select_all),
                    onPressed: Actions.handler<SelectAllIntent>(
                      context,
                      const SelectAllIntent(),
                    ),
                  ),
                  const Spacer(),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

/// A ShortcutManager that logs all keys that it handles.
class LoggingShortcutManager extends ShortcutManager {
  @override
  KeyEventResult handleKeypress(BuildContext context, KeyEvent event) {
    final KeyEventResult result = super.handleKeypress(context, event);
    if (result == KeyEventResult.handled) {
      print('Handled shortcut $event in $context');
    }
    return result;
  }
}

/// An ActionDispatcher that logs all the actions that it invokes.
class LoggingActionDispatcher extends ActionDispatcher {
  @override
  Object? invokeAction(
    covariant Action<Intent> action,
    covariant Intent intent, [
    BuildContext? context,
  ]) {
    print('Action invoked: $action($intent) from $context');
    super.invokeAction(action, intent, context);

    return null;
  }
}

/// An intent that is bound to ClearAction in order to clear its
/// TextEditingController.
class ClearIntent extends Intent {
  const ClearIntent();
}

/// An action that is bound to ClearIntent that clears its
/// TextEditingController.
class ClearAction extends Action<ClearIntent> {
  ClearAction(this.controller);

  final TextEditingController controller;

  @override
  Object? invoke(covariant ClearIntent intent) {
    controller.clear();

    return null;
  }
}

/// An intent that is bound to CopyAction to copy from its
/// TextEditingController.
class CopyIntent extends Intent {
  const CopyIntent();
}

/// An action that is bound to CopyIntent that copies the text in its
/// TextEditingController to the clipboard.
class CopyAction extends Action<CopyIntent> {
  CopyAction(this.controller);

  final TextEditingController controller;

  @override
  Object? invoke(covariant CopyIntent intent) {
    final String selectedString = controller.text.substring(
      controller.selection.baseOffset,
      controller.selection.extentOffset,
    );
    Clipboard.setData(ClipboardData(text: selectedString));

    return null;
  }
}

/// An intent that is bound to SelectAllAction to select all the text in its
/// controller.
class SelectAllIntent extends Intent {
  const SelectAllIntent();
}

/// An action that is bound to SelectAllAction that selects all text in its
/// TextEditingController.
class SelectAllAction extends Action<SelectAllIntent> {
  SelectAllAction(this.controller, this.focusNode);

  final TextEditingController controller;
  final FocusNode focusNode;

  @override
  Object? invoke(covariant SelectAllIntent intent) {
    controller.selection = controller.selection.copyWith(
      baseOffset: 0,
      extentOffset: controller.text.length,
      affinity: controller.selection.affinity,
    );

    focusNode.requestFocus();

    return null;
  }
}

/// The top level application class.
///
/// Shortcuts defined here are in effect for the whole app,
/// although different widgets may fulfill them differently.
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  static const String title = 'Shortcuts and Actions Demo';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: title,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: Shortcuts(
        shortcuts: <LogicalKeySet, Intent>{
          LogicalKeySet(LogicalKeyboardKey.escape): const ClearIntent(),
          LogicalKeySet(LogicalKeyboardKey.control, LogicalKeyboardKey.keyC):
              const CopyIntent(),
          LogicalKeySet(LogicalKeyboardKey.control, LogicalKeyboardKey.keyA):
              const SelectAllIntent(),
        },
        child: const CopyableTextField(title: title),
      ),
    );
  }
}

void main() => runApp(const MyApp());
```


[`Action`]: {{site.api}}/flutter/widgets/Action-class.html
[`Actions`]: {{site.api}}/flutter/widgets/Actions-class.html
[`CallbackAction`]: {{site.api}}/flutter/widgets/CallbackAction-class.html
[`CallbackShortcuts`]: {{site.api}}/flutter/widgets/CallbackShortcuts-class.html
[`Intent`]: {{site.api}}/flutter/widgets/Intent-class.html
[`Shortcuts`]: {{site.api}}/flutter/widgets/Shortcuts-class.html
[Using Shortcuts Diagram]: /assets/images/docs/using_shortcuts.png
