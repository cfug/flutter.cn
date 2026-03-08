---
#title: User input
title: 用户输入
#description: Accept input from the user with buttons and text fields.
description: 通过按钮和文本输入框接收用户输入。
layout: tutorial
---

Learn to build text inputs, manage text with controllers, and handle user actions with buttons.

学习如何构建文本输入框、使用控制器管理文本，以及通过按钮处理用户操作。

<SummaryCard>
title: What you'll accomplish
items:
  - title: Build a text input widget with TextField
    icon: text_fields
  - title: Manage text with TextEditingController
    icon: edit_note
  - title: Control input focus for a better user experience
    icon: center_focus_strong
  - title: Handle user actions with callbacks and buttons
    icon: touch_app
</SummaryCard>

---

### Introduction

### 简介

The app will display the user's guesses in the `Tile` widgets,
but it needs a way for the user to input those guesses.
In this lesson, build that functionality with two interaction widgets:
[`TextField`][] and [`IconButton`][].

应用会在 `Tile` widget 中显示用户的猜测结果，
但还需要一种方式让用户输入这些猜测。
在本课中，你将使用两个交互 widget 来构建该功能：
[`TextField`][] 和 [`IconButton`][]。

[`TextField`]: {{site.api}}/flutter/material/TextField-class.html
[`IconButton`]: {{site.api}}/flutter/material/IconButton-class.html

### Implement callback functions

### 实现回调函数

To allow users to type in their guesses,
you'll create a dedicated widget named `GuessInput`.
First, create the basic structure for your `GuessInput` widget that
requires a callback function as an argument.
Name the callback function `onSubmitGuess`.

为了让用户能够输入猜测内容，
你需要创建一个名为 `GuessInput` 的专用 widget。
首先，创建 `GuessInput` widget 的基本结构，
它需要一个回调函数作为参数。
将该回调函数命名为 `onSubmitGuess`。

Add the following code to your `main.dart` file.

将以下代码添加到你的 `main.dart` 文件中。

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  @override
  Widget build(BuildContext context) {
    // You'll build the UI in the next steps.
    return Container(); // Placeholder
  }
}
```

The line `final void Function(String) onSubmitGuess;`
declares a `final` member of the class called `onSubmitGuess`
that has the type `void Function(String)`.
This function takes a  single `String` argument (the user's guess) and
doesn't return any value (denoted by `void`).

`final void Function(String) onSubmitGuess;` 这行代码
声明了一个名为 `onSubmitGuess` 的 `final` 类成员，
其类型为 `void Function(String)`。
该函数接受一个 `String` 参数（用户的猜测）并且
不返回任何值（用 `void` 表示）。

This callback tells us that the logic that
actually handles the user's guess will be written elsewhere.
It's a good practice for interactive widgets to
use callback functions to keep the widget that handles interactions reusable and
decoupled from any specific functionality.

这个回调告诉我们，实际处理用户猜测的逻辑将在其他地方编写。
对于交互式 widget 来说，使用回调函数是一种好的实践，
它能让处理交互的 widget 保持可复用，
并与特定的业务逻辑解耦。

By the end of this lesson, the passed-in `onSubmitGuess` function
is called when a user enters a guess.
First, you'll need to build the visual parts of this widget.
This is what the widget will look like.

在本课结束时，当用户输入猜测后，
传入的 `onSubmitGuess` 函数将被调用。
首先，你需要构建这个 widget 的可视化部分。
下图展示了该 widget 的最终效果。

<img src='/assets/images/docs/tutorial/app_with_input.png' width="320px" alt="A screenshot of the Flutter property editor tool.">

### The `TextField` widget

### `TextField` widget

Given that the text field and button are displayed side-by-side,
create them as a `Row` widget.
Replace the `Container` placeholder in your `build` method with
a `Row` containing an `Expanded` `TextField`:

由于文本输入框和按钮需要并排显示，
使用 `Row` widget 来创建它们。
将 `build` 方法中的 `Container` 占位符替换为
包含 `Expanded` `TextField` 的 `Row`：

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  @override
  Widget build(BuildContext context) {
     return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
```

You have seen some of these widgets in previous lessons:
`Row` and `Padding`. New, though, is the [`Expanded`][] widget.
When a child of a `Row` (or `Column`) is wrapped in `Expanded`,
it tells that child to fill all the available space along the main axis
(horizontal for`Row`, vertical for `Column`) that
hasn't been taken by other children.
This makes the `TextField` stretch to take up all the space *except*
what's taken by other widgets in the row.

你在之前的课程中已经见过其中一些 widget：
`Row` 和 `Padding`。不过 [`Expanded`][] widget 是新出现的。
当 `Row`（或 `Column`）的子 widget 被 `Expanded` 包裹时，
它会让该子 widget 沿主轴方向填满所有可用空间
（`Row` 中为水平方向，`Column` 中为垂直方向），
即其他子 widget 未占用的空间。
这使得 `TextField` 会拉伸以占据行中*除*其他 widget 之外的所有空间。

:::tip
`Expanded` is often the solution to "[unbounded width/height][]" exceptions.

`Expanded` 通常是解决"[unbounded width/height][]（无限宽度/高度）"异常的方案。
:::

The `TextField` widget is also new in this lesson and is the star of the show.
This is the basic Flutter widget for text input.

`TextField` widget 也是本课新出现的，是本课的重点。
这是 Flutter 中用于文本输入的基础 widget。

Thus far, `TextField` has the following configuration.

到目前为止，`TextField` 的配置如下：

- It's decorated with a rounded border.
  Notice that the decoration configuration is
  very similar to how a `Container` and boxes are decorated.

  它具有圆角边框装饰。
  注意，这里的装饰配置与 `Container` 和盒子模型的装饰方式非常相似。

- Its `maxLength` property is set to 5 because the game
  only allows guesses of 5-letter words.

  它的 `maxLength` 属性设置为 5，因为游戏只允许猜测 5 个字母的单词。

[`Expanded`]: {{site.api}}/flutter/widgets/Expanded-class.html
[unbounded width/height]: https://www.youtube.com/watch?v=jckqXR5CrPI

### Handle text with `TextEditingController`

### 使用 `TextEditingController` 处理文本

Next, you need a way to manage the text that
the user types into the input field.
For this, use a [`TextEditingController`][].

接下来，你需要一种方式来管理用户在输入框中键入的文本。
为此，请使用 [`TextEditingController`][]。

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  // NEW
  final TextEditingController _textEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
            ),
          ),
        ),
        //
      ],
    );
  }
}
```

A `TextEditingController` is used to
read, clear, and modify the text in a `TextField`.
To use it, pass it into the `TextField`.

`TextEditingController` 用于读取、清除和修改 `TextField` 中的文本。
要使用它，需要将其传入 `TextField`。

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController, // NEW
            ),
          ),
        ),
      ],
    );
  }
}
```

Now, when a user inputs text, you can
capture it with the `_textEditingController`, but
you'll need to know _when_ to capture it.
The simplest way to react to input is by
using the `TextField.onSubmitted` argument.
This argument accepts a callback, and the callback is triggered whenever
the user presses the "Enter" key on the keyboard while the text field has focus.

现在，当用户输入文本时，你可以通过 `_textEditingController` 捕获文本，
但你需要知道_何时_去捕获它。
响应输入最简单的方式是使用 `TextField.onSubmitted` 参数。
该参数接受一个回调，当文本输入框获得焦点时，
用户按下键盘上的"Enter"键就会触发这个回调。

For now, ensure that this works by
adding the following callback to `TextField.onSubmitted`:

现在，通过向 `TextField.onSubmitted` 添加以下回调来验证它是否正常工作：

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              onSubmitted: (String input) { // NEW
                print(_textEditingController.text); // Temporary
              }
            ),
          ),
        ),
      ],
    );
  }
}
```

In this case,
you could print the `input` passed to the `onSubmitted` callback directly,
but a better user experience clears the text after each guess:
You need a `TextEditingController` to do that. Update the code as follows:

在这种情况下，
你可以直接打印传递给 `onSubmitted` 回调的 `input`，
但更好的用户体验是在每次猜测后清除文本：
你需要一个 `TextEditingController` 来实现这一点。按如下方式更新代码：

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              onSubmitted: (_) { // UPDATED
                print(_textEditingController.text); // Temporary
                _textEditingController.clear(); // NEW
              }
            ),
          ),
        ),
      ],
    );
  }
}
```

:::note
In Dart, it's good practice to use the `_` [wildcard][] to
hide the input to a function that'll never be used.
The preceding example does so.

在 Dart 中，使用 `_` [wildcard][]（通配符）来
隐藏不会被使用的函数参数是一种好的实践。
前面的示例就是这样做的。
:::

[`TextEditingController`]: {{site.api}}/flutter/widgets/TextEditingController-class.html
[wildcard]: {{site.dart-site}}/language/variables#wildcard-variables

### Gain input focus

### 获取输入焦点

Often, you want a specific input or widget to
automatically gain focus without the user taking action.
In this app, for example, the only thing a user can do is enter a guess,
so the `TextField` should be focused automatically when the app launches.
And after the user enters a guess, the focus should stay
in the `TextField` so they can enter their next guess.

通常，你希望某个特定的输入框或 widget
无需用户操作就能自动获得焦点。
例如，在这个应用中，用户唯一能做的事就是输入猜测，
因此 `TextField` 应该在应用启动时自动获得焦点。
而且在用户输入猜测之后，焦点应该保留在 `TextField` 中，
以便用户可以继续输入下一次猜测。

To resolve the first focus issue,
set up the `autofocus` property on the `TextField`.

要解决第一个焦点问题，
请在 `TextField` 上设置 `autofocus` 属性。

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              autofocus: true, // NEW
              onSubmitted: (String input) {
                print(input); // Temporary
                _textEditingController.clear();
              }
            ),
          ),
        ),
      ],
    );
  }
}
```

The second issue requires you to
use a [`FocusNode`][] to manage the keyboard focus.
You can use `FocusNode` to request that a `TextField` gain focus,
(making the keyboard appear on mobile),
or to know when a field has focus.

第二个问题需要你使用 [`FocusNode`][] 来管理键盘焦点。
你可以使用 `FocusNode` 来请求 `TextField` 获得焦点
（在移动端使键盘弹出），
或者检测某个输入框是否拥有焦点。

First, create a `FocusNode` in the `GuessInput` class:

首先，在 `GuessInput` 类中创建一个 `FocusNode`：

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  final FocusNode _focusNode = FocusNode(); // NEW

  @override
  Widget build(BuildContext context) {
    // ...
  }
}
```

Then, use the `FocusNode` to request focus whenever
the `TextField` is submitted after the controller is cleared:

然后，在控制器清除文本之后，
使用 `FocusNode` 在每次 `TextField` 提交时重新请求焦点：

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  final FocusNode _focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              autofocus: true,
              focusNode: _focusNode, // NEW
              onSubmitted: (String input) {
                print(input); // Temporary
                _textEditingController.clear();
                _focusNode.requestFocus(); // NEW
              }
            ),
          ),
        ),
      ],
    );
  }
}
```

Now, when you press <kbd>Enter</kbd> after inputting text,
you can continue typing.

现在，当你输入文本后按下 <kbd>Enter</kbd>，
就可以继续输入了。

[`FocusNode`]: {{site.api}}/flutter/widgets/FocusNode-class.html

### Use the input

### 使用输入内容

Finally, you need to handle the text that the user enters.
Recall that the constructor for `GuessInput` requires a
callback called `onSubmitGuess`.
In `GuessInput`, you need to use that callback.
Replace the `print` statement with a call to that function.

最后，你需要处理用户输入的文本。
回想一下，`GuessInput` 的构造函数需要一个
名为 `onSubmitGuess` 的回调。
在 `GuessInput` 中，你需要使用这个回调。
将 `print` 语句替换为对该函数的调用。

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  final FocusNode _focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              decoration: const InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              autofocus: true,
              focusNode: _focusNode,
              onSubmitted: (String input) {
                onSubmitGuess(_textEditingController.text.trim());
                _textEditingController.clear();
                _focusNode.requestFocus();
              }
            ),
          ),
        ),
      ],
    );
  }
}
```

:::note
The `trim` function prevents whitespace from being entered;
otherwise, the user could enter a four-letter word plus a space character.

`trim` 函数用于去除空白字符；
否则用户可能会输入一个四字母单词加一个空格字符。
:::

The remaining functionality is handled in the parent widget, `GamePage`.
In the `build` method of that class,
under the `Row` widgets in the `Column` widget's children,
add the `GuessInput` widget:

剩余的功能由父 widget `GamePage` 处理。
在该类的 `build` 方法中，
在 `Column` widget 的 children 中的 `Row` widget 下方，
添加 `GuessInput` widget：

```dart
class GamePage extends StatelessWidget {
  final Game _game = Game();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        spacing: 5.0,
        children: [
          for (var guess in _game.guesses)
            Row(
              spacing: 5.0,
              children: [
                for (var letter in guess) Tile(letter.char, letter.type),
              ],
            ),
          GuessInput(
            onSubmitGuess: (String guess) {
              // TODO, handle guess
              print(guess); // Temporary
            }
          ),
        ],
      ),
    );
  }
}
```

For the moment, this only prints the guess to
prove that it's wired up correctly.
Submitting the guess requires using the functionality of a `StatefulWidget`,
which you'll do in the next lesson.

目前，这段代码只是打印猜测内容以证明连接正确。
提交猜测需要使用有状态 widget (`StatefulWidget`) 的功能，
你将在下一课中实现。

### Buttons

### 按钮

To improve the UX on mobile and reflect well-known UI practices,
there should also be a button that can submit the guess.

为了改善移动端的用户体验并遵循常见的 UI 实践，
还应该提供一个按钮来提交猜测。

There are many button widgets built into Flutter, like [`TextButton`][],
[`ElevatedButton`][], and the button you'll use now: [`IconButton`][].
All of these buttons (and many other interaction widgets) require two
arguments (in addition to their optional arguments):

Flutter 内置了许多按钮 widget，如 [`TextButton`][]、
[`ElevatedButton`][]，以及你现在要用的 [`IconButton`][]。
所有这些按钮（以及许多其他交互 widget）都需要两个参数
（除了它们的可选参数之外）：

- A callback function passed to `onPressed`.

  传递给 `onPressed` 的回调函数。

- A widget that makes up the content of the button (often `Text` or an `Icon`).

  构成按钮内容的 widget（通常是 `Text` 或 `Icon`）。

Add an icon button to the row widget's children list in the `GuessInput` widget,
and give it an [`Icon`][] widget to display.
The `Icon` widget requires configuration; in this case,
the `padding` property sets the padding between the
edge of the button and the icon it wraps to zero.
This removes the default padding and makes the button smaller.

在 `GuessInput` widget 的 Row widget 的 children 列表中添加一个图标按钮，
并为其提供一个 [`Icon`][] widget 来显示。
`Icon` widget 需要进行配置；在这里，
`padding` 属性将按钮边缘与其包裹的图标之间的内边距设置为零。
这会移除默认的内边距，使按钮更小。

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();
  final FocusNode _focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(/* ... */),
        IconButton(
          padding: EdgeInsets.zero,
          icon: Icon(Icons.arrow_circle_up),
        ),
      ],
    );
  }
}
```

The `IconButton.onPressed` callback should look familiar:

`IconButton.onPressed` 回调应该看起来很熟悉：

```dart
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();
  final FocusNode _focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(/* ... */),
        IconButton(
          padding: EdgeInsets.zero,
          icon: Icon(Icons.arrow_circle_up),
          onPressed: () {
            onSubmitGuess(_textEditingController.text.trim());
            _textEditingController.clear();
            _focusNode.requestFocus();
          },
        ),
      ],
    );
  }
}
```

This method does the same as the `onSubmitted` callback on the `TextField`.

这个方法与 `TextField` 上的 `onSubmitted` 回调做了相同的事情。

[`Icon`]: {{site.api}}/flutter/material/Icons-class.html
[`TextButton`]: {{site.api}}/flutter/material/TextButton-class.html
[`ElevatedButton`]: {{site.api}}/flutter/material/ElevatedButton-class.html
[`IconButton`]: {{site.api}}/flutter/material/IconButton-class.html

:::note Challenge - Share "on submitted" logic.

You might be thinking, "Shouldn't we abstract these methods into one
function and pass it to both inputs?"
You could, and as your app grows in complexity, you probably should.
That said, the callbacks `IconButton.onPressed` and `TextField.onSubmitted` have
different signatures, so it's not completely straight-forward.

你可能会想："难道不应该把这些方法抽象成一个函数，
然后传递给两个输入控件吗？"
确实可以，而且随着应用复杂度的增长，你可能也应该这么做。
不过，`IconButton.onPressed` 和 `TextField.onSubmitted` 的回调
具有不同的函数签名，所以这并不是完全直截了当的。

Refactor the code such that the logic inside this method isn't repeated.

重构代码，使这个方法内部的逻辑不再重复。

**Solution:**

**解决方案：**

```dart title="solution.dart" collapsed
class GuessInput extends StatelessWidget {
  GuessInput({super.key, required this.onSubmitGuess});

  final void Function(String) onSubmitGuess;

  final TextEditingController _textEditingController = TextEditingController();

  final FocusNode _focusNode = FocusNode();

  void _onSubmit() {
    onSubmitGuess(_textEditingController.text);
    _textEditingController.clear();
    _focusNode.requestFocus();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              maxLength: 5,
              focusNode: _focusNode,
              autofocus: true,
              decoration: InputDecoration(
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(35)),
                ),
              ),
              controller: _textEditingController,
              onSubmitted: (String value) {
                _onSubmit();
              },
            ),
          ),
        ),
        IconButton(
          padding: EdgeInsets.zero,
          icon: Icon(Icons.arrow_circle_up),
          onPressed: _onSubmit,
        ),
      ],
    );
  }
}
```

:::

### Review

### 回顾

<SummaryCard>
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Built a text input widget with TextField
    icon: text_fields
    details: >-
      You created a `GuessInput` widget with a `TextField` for text entry.
      You configured it with a rounded border, character limit, and
      used `Expanded` to make it fill available space in the row.
  - title: Managed text with TextEditingController
    icon: edit_note
    details: >-
      `TextEditingController` lets you read and modify text field content.
      You used it to capture the user's input with `.text` and clear the
      field after submission with `.clear()`.
  - title: Controlled input focus for a polished UX
    icon: center_focus_strong
    details: >-
      You used `autofocus` to focus the text field on launch and `FocusNode`
      with `requestFocus()` to maintain focus after each guess.
      These details make your app feel responsive and well-built.
  - title: Handled user actions with callbacks and buttons
    icon: touch_app
    details: >-
      To respond to user input,
      you specified callback functions like `onSubmitted` and `onPressed`.
      Passing callback functions as constructor arguments keeps your
      widgets reusable and decoupled from specific logic.
</SummaryCard>

### Test yourself

### 自测

<Quiz title="User Input Quiz">
- question: How do you programmatically read or clear the text in a TextField?
  options:
    - text: Access the TextField's text property directly.
      correct: false
      explanation: TextField doesn't expose a text property; you need a controller.
    - text: Use the TextEditingController attached to the TextField.
      correct: true
      explanation: TextEditingController provides the text property to read the value and clear() method to reset it.
    - text: Listen to the onChanged callback and store the value in a variable.
      correct: false
      explanation: While onChanged works for reading, clearing requires a TextEditingController.
    - text: Call TextField.getText() method.
      correct: false
      explanation: TextField doesn't have a getText method; use TextEditingController instead.
- question: How do you programmatically move focus to a specific TextField?
  options:
    - text: "Call `TextField.focus()` directly."
      correct: false
      explanation: TextField doesn't have a focus method; you use a FocusNode.
    - text: "Set the `autofocus` property to true at runtime."
      correct: false
      explanation: The 'autofocus' property only works on initial build, not for moving focus later.
    - text: "Use a FocusNode and call `requestFocus()` on it."
      correct: true
      explanation: "A FocusNode gives you control over focus, and calling `requestFocus()` moves focus to its associated widget."
    - text: Wrap the TextField in a GestureDetector and tap programmatically.
      correct: false
      explanation: This is not how focus is managed; FocusNode is the proper approach.
</Quiz>
