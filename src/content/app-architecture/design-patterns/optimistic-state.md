---
# title: Optimistic state
title: 乐观状态
# description: "Improve the perception of responsiveness of an application by implementing optimistic state."
description: "通过实现乐观状态来提升应用的响应感知体验。"
contentTags:
  - user experience
  - asynchronous dart
iconPath: /assets/images/docs/app-architecture/design-patterns/optimistic-state-icon.svg
order: 0
---

<?code-excerpt path-base="app-architecture/optimistic_state"?>

When building user experiences,
the perception of performance is sometimes just as important as
the actual performance of the code.
In general, users don't like waiting for an action to finish to see the result,
and anything that takes more than a few milliseconds could be considered "slow"
or "unresponsive" from the user's perspective.

在构建用户体验时，
性能的感知有时与代码的实际性能同样重要。
通常，用户不喜欢等待操作完成才能看到结果，
从用户的角度来看，任何超过几毫秒的操作都可能被认为是"慢"或"无响应"的。

Developers can help mitigate this negative perception
by presenting a successful UI state
before the background task is fully completed.
An example of this would be tapping a "Subscribe" button,
and seeing it change to "Subscribed" instantly,
even if the background call to the subscription API is still running.

开发者可以通过在后台任务完全完成之前
就展示成功的 UI 状态来帮助缓解这种负面感知。
例如，点击"Subscribe"按钮后，
即使后台对订阅 API 的调用仍在运行，
按钮也会立即变为"Subscribed"。

This technique is known as Optimistic State, Optimistic UI or
Optimistic User Experience.
In this recipe,
you will implement an application feature using Optimistic State and
following the [Flutter architecture guidelines][].

这种技术被称为乐观状态（Optimistic State）、乐观 UI 或乐观用户体验。
在本教程中，
你将按照 [Flutter 架构指南][Flutter architecture guidelines]
使用乐观状态来实现一个应用功能。

## Example feature: a subscribe button

## 示例功能：订阅按钮

This example implements a subscribe button similar to
the one you could find in a video streaming application or a newsletter.

本示例实现了一个订阅按钮，
类似于你在视频流媒体应用或新闻订阅中看到的那种。

<img src='/assets/images/docs/cookbook/architecture/optimistic-state.png'
class="site-mobile-screenshot" alt="Application with subscribe button" >

When the button is tapped, the application then calls an external API,
performing a subscription action,
for example recording in a database that the user is now in
the subscription list.
For demo purposes, you will not implement the actual backend code,
instead you will replace this call with
a fake action that will simulate a network request.

当按钮被点击时，应用会调用一个外部 API，
执行订阅操作，
例如在数据库中记录用户已加入订阅列表。
出于演示目的，你不会实现实际的后端代码，
而是用一个模拟网络请求的假操作来替代。

In the case that the call is successful,
the button text will change from "Subscribe" to "Subscribed".
The button background color will change as well.

如果调用成功，
按钮文本将从"Subscribe"变为"Subscribed"。
按钮的背景颜色也会随之改变。

On the contrary, if the call fails,
the button text should revert back to "Subscribe",
and the UI should show an error message to the user,
for example using a Snackbar.

相反，如果调用失败，
按钮文本应恢复为"Subscribe"，
并且 UI 应向用户显示错误消息，
例如使用 Snackbar。

Following the Optimistic State idea,
the button should instantly change to "Subscribed" once it is tapped,
and only change back to "Subscribe" if the request failed.

遵循乐观状态的理念，
按钮在被点击后应立即变为"Subscribed"，
仅在请求失败时才恢复为"Subscribe"。

<img src='/assets/images/docs/cookbook/architecture/optimistic-state.webp'
class="site-mobile-screenshot" alt="Animation of application with subscribe button" >

## Feature architecture

## 功能架构

Start by defining the feature architecture.
Following the architecture guidelines,
create these Dart classes in a Flutter project:

首先定义功能架构。
按照架构指南，
在 Flutter 项目中创建以下 Dart 类：

- A `StatefulWidget` named `SubscribeButton`

  一个名为 `SubscribeButton` 的 `StatefulWidget`

- A class named `SubscribeButtonViewModel` extending `ChangeNotifier`

  一个名为 `SubscribeButtonViewModel` 的类，继承自 `ChangeNotifier`

- A class named `SubscriptionRepository`

  一个名为 `SubscriptionRepository` 的类

<?code-excerpt "lib/starter.dart (Starter)"?>
```dart
class SubscribeButton extends StatefulWidget {
  const SubscribeButton({super.key});

  @override
  State<SubscribeButton> createState() => _SubscribeButtonState();
}

class _SubscribeButtonState extends State<SubscribeButton> {
  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}

class SubscribeButtonViewModel extends ChangeNotifier {}

class SubscriptionRepository {}
```

The `SubscribeButton` widget and the `SubscribeButtonViewModel` represent
the presentation layer of this solution.
The widget is going to display a button
that will show the text "Subscribe" or "Subscribed"
depending on the subscription state.
The view model will contain the subscription state.
When the button is tapped,
the widget will call the view model to perform the action.

`SubscribeButton` widget 和 `SubscribeButtonViewModel` 代表了该方案的展示层。
该 widget 将显示一个按钮，
根据订阅状态显示文本"Subscribe"或"Subscribed"。
视图模型将包含订阅状态。
当按钮被点击时，
widget 将调用视图模型来执行操作。

The `SubscriptionRepository` will implement a subscribe method
that will throw an exception when the action fails.
The view model will call this method when performing the subscription action.

`SubscriptionRepository` 将实现一个订阅方法，
当操作失败时会抛出异常。
视图模型在执行订阅操作时将调用此方法。

Next, connect them together by adding the `SubscriptionRepository`
to the `SubscribeButtonViewModel`:

接下来，通过将 `SubscriptionRepository` 添加到 `SubscribeButtonViewModel` 来将它们连接在一起：

<?code-excerpt "lib/main.dart (ViewModelStart)" replace="/y;$/y;\n}/g"?>
```dart
class SubscribeButtonViewModel extends ChangeNotifier {
  SubscribeButtonViewModel({required this.subscriptionRepository});

  final SubscriptionRepository subscriptionRepository;
}
```

And add the `SubscribeButtonViewModel` to the `SubscribeButton` widget:

然后将 `SubscribeButtonViewModel` 添加到 `SubscribeButton` widget 中：

<?code-excerpt "lib/main.dart (Widget)"?>
```dart
class SubscribeButton extends StatefulWidget {
  const SubscribeButton({super.key, required this.viewModel});

  /// Subscribe button view model.
  final SubscribeButtonViewModel viewModel;

  @override
  State<SubscribeButton> createState() => _SubscribeButtonState();
}
```

Now that you have created the basic solution architecture,
you can create the `SubscribeButton` widget the following way:

现在你已经创建了基本的方案架构，
可以按以下方式创建 `SubscribeButton` widget：

<?code-excerpt "lib/main.dart (SubscribeButton)" replace="/^child: //g;/^\),$/)/g"?>
```dart
SubscribeButton(
  viewModel: SubscribeButtonViewModel(
    subscriptionRepository: SubscriptionRepository(),
  ),
)
```

### Implement the `SubscriptionRepository`

### 实现 `SubscriptionRepository`

Add a new asynchronous method named `subscribe()`
to the `SubscriptionRepository` with the following code:

向 `SubscriptionRepository` 添加一个名为 `subscribe()` 的异步方法，代码如下：

<?code-excerpt "lib/main.dart (SubscriptionRepository)"?>
```dart
class SubscriptionRepository {
  /// Simulates a network request and then fails.
  Future<void> subscribe() async {
    // Simulate a network request
    await Future.delayed(const Duration(seconds: 1));
    // Fail after one second
    throw Exception('Failed to subscribe');
  }
}
```

The call to `await Future.delayed()` with a duration of one second
has been added to simulate a long running request.
The method execution will pause for a second, and then it will continue running.

调用 `await Future.delayed()` 并设置一秒的持续时间是为了模拟一个长时间运行的请求。
方法执行将暂停一秒，然后继续运行。

In order to simulate a request failing,
the subscribe method throws an exception at the end.
This will be used later on to show how to recover from a failed request
when implementing Optimistic State.

为了模拟请求失败，
subscribe 方法在最后抛出了一个异常。
这将在后面用于展示在实现乐观状态时如何从失败的请求中恢复。

### Implement the `SubscribeButtonViewModel`

### 实现 `SubscribeButtonViewModel`

To represented the subscription state, as well a possible error state,
add the following public members to the `SubscribeButtonViewModel`:

为了表示订阅状态以及可能的错误状态，
向 `SubscribeButtonViewModel` 添加以下公共成员：

<?code-excerpt "lib/main.dart (States)"?>
```dart
// Whether the user is subscribed
bool subscribed = false;

// Whether the subscription action has failed
bool error = false;
```

Both are set to `false` on start.

两者在初始时都设置为 `false`。

Following the ideas of Optimistic State,
the `subscribed` state will change to `true`
as soon as the user taps the subscribe button.
And will only change back to `false` if the action fails.

遵循乐观状态的理念，
一旦用户点击订阅按钮，`subscribed` 状态将变为 `true`。
仅在操作失败时才会恢复为 `false`。

The `error` state will change to `true` when the action fails,
indicating the `SubscribeButton` widget to show an error message to the user.
The variable should go back to `false` once the error has been displayed.

当操作失败时，`error` 状态将变为 `true`，
通知 `SubscribeButton` widget 向用户显示错误消息。
一旦错误消息已显示，该变量应恢复为 `false`。

Next, implement an asynchronous `subscribe()` method:

接下来，实现一个异步的 `subscribe()` 方法：

<?code-excerpt "lib/main.dart (subscribe)"?>
```dart
// Subscription action
Future<void> subscribe() async {
  // Ignore taps when subscribed
  if (subscribed) {
    return;
  }

  // Optimistic state.
  // It will be reverted if the subscription fails.
  subscribed = true;
  // Notify listeners to update the UI
  notifyListeners();

  try {
    await subscriptionRepository.subscribe();
  } catch (e) {
    print('Failed to subscribe: $e');
    // Revert to the previous state
    subscribed = false;
    // Set the error state
    error = true;
  } finally {
    notifyListeners();
  }
}
```

As described previously, first the method sets the `subscribed` state to `true`
and then calls to `notifyListeners()`.
This forces the UI to update and the button changes its appearance,
showing the text "Subscribed" to the user.

如前所述，该方法首先将 `subscribed` 状态设置为 `true`，
然后调用 `notifyListeners()`。
这会强制 UI 更新，按钮改变外观，
向用户显示文本"Subscribed"。

Then the method performs the actual call to the repository.
This call is wrapped by a `try-catch`
in order to catch any exceptions it may throw.
In case an exception is caught, the `subscribed` state is set back to `false`,
and the `error` state is set to `true`.
A final call to `notifyListeners()` is done
to change the UI back to 'Subscribe'.

然后该方法执行对 Repository 的实际调用。
此调用被 `try-catch` 包裹，
以捕获可能抛出的任何异常。
如果捕获到异常，`subscribed` 状态将被设回 `false`，
`error` 状态将被设为 `true`。
最后调用 `notifyListeners()` 将 UI 恢复为"Subscribe"。

If there is no exception, the process is complete
because the UI is already reflecting the success state.

如果没有异常，则流程已完成，
因为 UI 已经反映了成功状态。

The complete `SubscribeButtonViewModel` should look like this:

完整的 `SubscribeButtonViewModel` 应如下所示：

<?code-excerpt "lib/main.dart (ViewModelFull)"?>
```dart
/// Subscribe button View Model.
/// Handles the subscribe action and exposes the state to the subscription.
class SubscribeButtonViewModel extends ChangeNotifier {
  SubscribeButtonViewModel({required this.subscriptionRepository});

  final SubscriptionRepository subscriptionRepository;

  // Whether the user is subscribed
  bool subscribed = false;

  // Whether the subscription action has failed
  bool error = false;

  // Subscription action
  Future<void> subscribe() async {
    // Ignore taps when subscribed
    if (subscribed) {
      return;
    }

    // Optimistic state.
    // It will be reverted if the subscription fails.
    subscribed = true;
    // Notify listeners to update the UI
    notifyListeners();

    try {
      await subscriptionRepository.subscribe();
    } catch (e) {
      print('Failed to subscribe: $e');
      // Revert to the previous state
      subscribed = false;
      // Set the error state
      error = true;
    } finally {
      notifyListeners();
    }
  }

}
```

### Implement the `SubscribeButton`

### 实现 `SubscribeButton`

In this step,
you will first implement the build method of the `SubscribeButton`,
and then implement the feature's error handling.

在这一步中，
你将首先实现 `SubscribeButton` 的 build 方法，
然后实现该功能的错误处理。

Add the following code to the build method:

将以下代码添加到 build 方法中：

<?code-excerpt "lib/main.dart (build)"?>
```dart
@override
Widget build(BuildContext context) {
  return ListenableBuilder(
    listenable: widget.viewModel,
    builder: (context, _) {
      return FilledButton(
        onPressed: widget.viewModel.subscribe,
        style: widget.viewModel.subscribed
            ? SubscribeButtonStyle.subscribed
            : SubscribeButtonStyle.unsubscribed,
        child: widget.viewModel.subscribed
            ? const Text('Subscribed')
            : const Text('Subscribe'),
      );
    },
  );
}
```

This build method contains a `ListenableBuilder`
that listens to changes from the view model.
The builder then creates a `FilledButton`
that will display the text "Subscribed" or "Subscribe"
depending on the view model state.
The button style will also change depending on this state.
As well, when the button is tapped,
it runs the `subscribe()` method from the view model.

此 build 方法包含一个 `ListenableBuilder`，
用于监听视图模型的变化。
builder 会创建一个 `FilledButton`，
根据视图模型的状态显示文本"Subscribed"或"Subscribe"。
按钮样式也会根据此状态变化。
同时，当按钮被点击时，
它会运行视图模型中的 `subscribe()` 方法。

The `SubscribeButtonStyle` can be found here.
Add this class next to the `SubscribeButton`.
Feel free to modify the `ButtonStyle`.

`SubscribeButtonStyle` 可以在这里找到。
将此类添加到 `SubscribeButton` 旁边。
你可以随意修改 `ButtonStyle`。

<?code-excerpt "lib/main.dart (style)"?>
```dart
class SubscribeButtonStyle {
  static const unsubscribed = ButtonStyle(
    backgroundColor: WidgetStatePropertyAll(Colors.red),
  );

  static const subscribed = ButtonStyle(
    backgroundColor: WidgetStatePropertyAll(Colors.green),
  );
}
```

If you run the application now,
you will see how the button changes when you press it,
however it will change back to the original state without showing an error.

如果你现在运行应用，
你将看到按钮在按下时如何变化，
但它会恢复到原始状态而不显示错误。

### Handling errors

### 处理错误

To handle errors,
add the `initState()` and `dispose()` methods to the `SubscribeButtonState`,
and then add the `_onViewModelChange()` method.

为了处理错误，
向 `SubscribeButtonState` 添加 `initState()` 和 `dispose()` 方法，
然后添加 `_onViewModelChange()` 方法。

<?code-excerpt "lib/main.dart (listener1)"?>
```dart
@override
void initState() {
  super.initState();
  widget.viewModel.addListener(_onViewModelChange);
}

@override
void dispose() {
  widget.viewModel.removeListener(_onViewModelChange);
  super.dispose();
}
```

<?code-excerpt "lib/main.dart (listener2)"?>
```dart
/// Listen to ViewModel changes.
void _onViewModelChange() {
  // If the subscription action has failed
  if (widget.viewModel.error) {
    // Reset the error state
    widget.viewModel.error = false;
    // Show an error message
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text('Failed to subscribe')));
  }
}
```

The `addListener()` call registers the `_onViewModelChange()` method
to be called when the view model notifies listeners.
It's important to call `removeListener()` when the widget is disposed of,
in order to avoid errors.

`addListener()` 调用注册了 `_onViewModelChange()` 方法，
使其在视图模型通知监听器时被调用。
在 widget 被销毁时调用 `removeListener()` 非常重要，
以避免错误。

The `_onViewModelChange()` method checks the `error` state,
and if it is `true`,
displays a `Snackbar` to the user showing an error message.
As well, the `error` state is set back to `false`,
to avoid displaying the error message multiple times
if `notifyListeners()` is called again in the view model.

`_onViewModelChange()` 方法检查 `error` 状态，
如果为 `true`，
则向用户显示一个带有错误消息的 Snackbar。
同时，`error` 状态被设回 `false`，
以避免在视图模型中再次调用 `notifyListeners()` 时多次显示错误消息。

## Advanced Optimistic State

## 进阶乐观状态

In this tutorial,
you've learned how to implement an Optimistic State with a single binary state,
but you can use this technique to create a more advanced solution
by incorporating a third temporal state
that indicates that the action is still running.

在本教程中，
你已经学习了如何使用单一的二元状态来实现乐观状态，
但你可以通过引入第三个临时状态来创建更高级的方案，
该临时状态用于指示操作仍在运行中。

For example, in a chat application when the user sends a new message,
the application will display the new chat message in the chat window,
but with an icon indicating that the message is still pending to be delivered.
When the message is delivered, that icon would be removed.

例如，在聊天应用中，当用户发送新消息时，
应用会在聊天窗口中显示新的聊天消息，
但会带有一个图标表示消息仍在等待发送。
当消息发送成功后，该图标会被移除。

In the subscribe button example,
you could add another flag in the view model
indicating that the `subscribe()` method is still running,
or use the Command pattern running state,
then modify the button style slightly to show that the operation is running.

在订阅按钮的示例中，
你可以在视图模型中添加另一个标志，
表示 `subscribe()` 方法仍在运行，
或使用命令模式的运行状态，
然后稍微修改按钮样式以显示操作正在运行。

## Interactive example

## 交互示例

This example shows the `SubscribeButton` widget
together with the `SubscribeButtonViewModel`
and `SubscriptionRepository`,
which implement a subscribe tap action with Optimistic State.

此示例展示了 `SubscribeButton` widget
以及 `SubscribeButtonViewModel`
和 `SubscriptionRepository`，
它们使用乐观状态实现了一个订阅点击操作。

When you tap the button,
the button text changes from "Subscribe" to "Subscribed". After a second,
the repository throws an exception,
which gets captured by the view model,
and the button reverts back to showing "Subscribe",
while also displaying a Snackbar with an error message.

当你点击按钮时，
按钮文本从"Subscribe"变为"Subscribed"。一秒后，
Repository 抛出一个异常，
该异常被视图模型捕获，
按钮恢复为显示"Subscribe"，
同时显示一个带有错误消息的 Snackbar。

<?code-excerpt "lib/main.dart"?>
```dartpad title="Flutter Optimistic State example in DartPad" run="true"
// ignore_for_file: avoid_print

import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: SubscribeButton(
            viewModel: SubscribeButtonViewModel(
              subscriptionRepository: SubscriptionRepository(),
            ),
          ),
        ),
      ),
    );
  }
}

/// A button that simulates a subscription action.
/// For example, subscribing to a newsletter or a streaming channel.
class SubscribeButton extends StatefulWidget {
  const SubscribeButton({super.key, required this.viewModel});

  /// Subscribe button view model.
  final SubscribeButtonViewModel viewModel;

  @override
  State<SubscribeButton> createState() => _SubscribeButtonState();
}

class _SubscribeButtonState extends State<SubscribeButton> {
  @override
  void initState() {
    super.initState();
    widget.viewModel.addListener(_onViewModelChange);
  }

  @override
  void dispose() {
    widget.viewModel.removeListener(_onViewModelChange);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: widget.viewModel,
      builder: (context, _) {
        return FilledButton(
          onPressed: widget.viewModel.subscribe,
          style: widget.viewModel.subscribed
              ? SubscribeButtonStyle.subscribed
              : SubscribeButtonStyle.unsubscribed,
          child: widget.viewModel.subscribed
              ? const Text('Subscribed')
              : const Text('Subscribe'),
        );
      },
    );
  }

  /// Listen to ViewModel changes.
  void _onViewModelChange() {
    // If the subscription action has failed
    if (widget.viewModel.error) {
      // Reset the error state
      widget.viewModel.error = false;
      // Show an error message
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Failed to subscribe')));
    }
  }

}

class SubscribeButtonStyle {
  static const unsubscribed = ButtonStyle(
    backgroundColor: WidgetStatePropertyAll(Colors.red),
  );

  static const subscribed = ButtonStyle(
    backgroundColor: WidgetStatePropertyAll(Colors.green),
  );
}

/// Subscribe button View Model.
/// Handles the subscribe action and exposes the state to the subscription.
class SubscribeButtonViewModel extends ChangeNotifier {
  SubscribeButtonViewModel({required this.subscriptionRepository});

  final SubscriptionRepository subscriptionRepository;

  // Whether the user is subscribed
  bool subscribed = false;

  // Whether the subscription action has failed
  bool error = false;

  // Subscription action
  Future<void> subscribe() async {
    // Ignore taps when subscribed
    if (subscribed) {
      return;
    }

    // Optimistic state.
    // It will be reverted if the subscription fails.
    subscribed = true;
    // Notify listeners to update the UI
    notifyListeners();

    try {
      await subscriptionRepository.subscribe();
    } catch (e) {
      print('Failed to subscribe: $e');
      // Revert to the previous state
      subscribed = false;
      // Set the error state
      error = true;
    } finally {
      notifyListeners();
    }
  }

}

/// Repository of subscriptions.
class SubscriptionRepository {
  /// Simulates a network request and then fails.
  Future<void> subscribe() async {
    // Simulate a network request
    await Future.delayed(const Duration(seconds: 1));
    // Fail after one second
    throw Exception('Failed to subscribe');
  }
}
```

[Flutter Architecture guidelines]:/app-architecture
