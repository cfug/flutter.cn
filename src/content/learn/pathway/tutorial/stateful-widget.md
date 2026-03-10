---
# title: Stateful widgets
title: 有状态 widget
# description: Learn about StatefulWidgets and rebuilding Flutter UI.
description: 了解 StatefulWidget 以及如何重新构建 Flutter UI。
layout: tutorial
---

Learn when widgets need to be stateful and how to trigger UI updates with setState.

了解 widget 何时需要是有状态的，以及如何使用 setState 触发 UI 更新。

<YouTubeEmbed id="Gzz8FwSlsUg" title="Stateful widgets in Flutter" fullWidth="true"></YouTubeEmbed>

<SummaryCard>
title: What you'll accomplish
items:
  - title: Learn when widgets need to be stateful
    icon: change_circle
  - title: Convert a StatelessWidget to a StatefulWidget
    icon: swap_horiz
  - title: Trigger UI updates with setState
    icon: refresh
</SummaryCard>

---

### Introduction

### 简介

So far, your app displays a grid and an input field,
but the grid doesn't yet update to reflect the user's guesses.
When this app is complete, each tile in the next unfilled row should
update after each submitted user guess by:

到目前为止，你的应用显示了一个网格和一个输入框，
但网格尚未更新以反映用户的猜测。
当应用完成后，每次用户提交猜测时，
下一个未填充行中的每个方块应通过以下方式更新：

- Displaying the correct letter.

  显示正确的字母。

- Changing color to reflect whether the letter is correct (green),
  is in the word but at an incorrect position (yellow), or
  doesn't appear in the word at all (grey).

  改变颜色以反映该字母是否正确（绿色）、
  在单词中但位置不对（黄色），还是
  完全不在单词中（灰色）。

To handle this dynamic behavior, you need to convert `GamePage` from a
`StatelessWidget` to a [`StatefulWidget`][].

要处理这种动态行为，你需要将 `GamePage` 从
`StatelessWidget` 转换为 [`StatefulWidget`][]。

[`StatefulWidget`]: {{site.api}}/flutter/widgets/StatefulWidget-class.html

### Why stateful widgets?

### 为什么需要有状态 widget？

When a widget's appearance or data needs to change during its lifetime,
you need a `StatefulWidget` and a companion `State` object.
While the `StatefulWidget` itself is still immutable (its properties
can't change after creation), the `State` object is long-lived,
can hold mutable data, and can be rebuilt when that data changes,
causing the UI to update.

当一个 widget 的外观或数据需要在其生命周期内发生变化时，
你需要一个 `StatefulWidget` 及其伴随的 `State` 对象。
虽然 `StatefulWidget` 本身仍然是不可变的（其属性在创建后不能更改），
但 `State` 对象是长期存在的，可以持有可变的数据，
并且可以在数据变化时重新构建，从而使 UI 更新。

For example, the following widget tree imagines a simple app
that uses a stateful widget with a counter that
increases when the button is pressed.

例如，下面的 widget 树展示了一个简单的应用，
它使用了一个有状态 widget，其中有一个
在按下按钮时会增加的计数器。

<img src='/assets/images/docs/tutorial/widget_tree_stateful.png' width="320px" alt="A diagram of a widget tree with a stateful widget and state object.">

Here is the basic `StatefulWidget` structure (doesn't do anything yet):

以下是基本的 `StatefulWidget` 结构（还不执行任何操作）：

```dart
class ExampleWidget extends StatefulWidget {
  ExampleWidget({super.key});

  @override
  State<ExampleWidget> createState() => _ExampleWidgetState();
}

class _ExampleWidgetState extends State<ExampleWidget> {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

### Convert `GamePage` to a stateful widget

### 将 `GamePage` 转换为有状态 widget

To convert the `GamePage` (or any other) widget from
a stateless widget to a stateful widget, do the following steps:

要将 `GamePage`（或任何其他）widget 从
无状态 widget 转换为有状态 widget，请执行以下步骤：

1.  Change `GamePage` to extend `StatefulWidget` instead of `StatelessWidget`.

    将 `GamePage` 改为继承 `StatefulWidget` 而不是 `StatelessWidget`。

1.  Create a new class named `_GamePageState`, that extends `State<GamePage>`.
    This new class will hold the mutable state and the `build` method.
    Move the `build` method and all properties *instantiated on the widget*
    from `GamePage` to the state object.

    创建一个名为 `_GamePageState` 的新类，继承 `State<GamePage>`。
    这个新类将持有可变的状态和 `build` 方法。
    将 `build` 方法和所有 **在 widget 上实例化的** 属性
    从 `GamePage` 移动到 State 对象中。

1.  Implement the `createState()` method in `GamePage`, which
    returns an instance of `_GamePageState`.

    在 `GamePage` 中实现 createState() 方法，
    该方法返回一个 `_GamePageState` 实例。

:::tip Quick assists

You don't have to manually do this work, as the Flutter plugins for
VS Code and IntelliJ provide ["quick assists"][] that can
do this conversion for you.

你不必手动完成这些工作，因为 VS Code 和 IntelliJ 的 Flutter 插件
提供了 ["quick assists"][]（快速辅助）功能，可以自动完成这个转换。

:::

Your modified code should look like this:

修改后的代码应如下所示：

```dart
class GamePage extends StatefulWidget {
  GamePage({super.key});

  @override
  State<GamePage> createState() => _GamePageState();
}

class _GamePageState extends State<GamePage> {
  final Game _game = Game();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          for (var guess in _game.guesses)
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (var letter in guess)
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 2.5, vertical: 2.5),
                    child: Tile(letter.char, letter.type),
                  )
              ],
            ),
          GuessInput(
            onSubmitGuess: (_) {
              // TODO, handle guess
              print(guess); // Temporary
            },
          ),
        ],
      ),
    );
  }
}
```

["quick assists"]: /tools/android-studio#assists-quick-fixes

### Updating the UI with `setState`

### 使用 `setState` 更新 UI

Whenever you mutate a `State` object,
you must call [`setState`][] to signal the framework to
update the user interface and call the `build` method again.

每当你修改 `State` 对象时，
必须调用 [`setState`][] 来通知框架
更新用户界面并再次调用 `build` 方法。

In this app, when a user makes a guess, the word they guessed is
saved on the `Game` object, which is a property on the `GamePage` class,
and therefore is state that might change and require the UI to update.
When this state is mutated, the grid should be
re-drawn to show the user's guess.

在这个应用中，当用户进行猜测时，他们猜测的单词会
保存在 `Game` 对象上，该对象是 `GamePage` 类的一个属性，
因此它是可能会变化并需要 UI 更新的状态。
当这个状态被修改时，网格应该被
重新绘制以显示用户的猜测。

To implement this, update the callback function passed to `GuessInput`.
The function needs to call `setState` and, within `setState`,
it needs to execute the logic to determine whether the users guess was correct.

要实现这一点，请更新传递给 `GuessInput` 的回调函数。
该函数需要调用 setState，并在 setState 内部
执行判断用户猜测是否正确的逻辑。

:::note

The game logic is abstracted away into the `Game` object,
and outside the scope of this tutorial.

游戏逻辑被抽象到了 `Game` 对象中，
不在本教程的讨论范围内。

:::

Update your code:

更新你的代码：

```dart
class GamePage extends StatefulWidget {
  GamePage({super.key});

  @override
  State<GamePage> createState() => _GamePageState();
}

class _GamePageState extends State<GamePage> {
  final Game _game = Game();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          for (var guess in _game.guesses)
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (var letter in guess)
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 2.5, vertical: 2.5),
                    child: Tile(letter.char, letter.type),
                  )
              ],
            ),
          GuessInput(
           onSubmitGuess: (String guess) {
              setState(() { // NEW
                _game.guess(guess);
              });
            },
          ),
        ],
      ),
    );
  }
}
```

Now, when you type a legal guess into the `TextInput` and submit it,
the application will reflect the user's guess.
If you were to call `_game.guess(guess)` *without* a calling `setState`,
the internal game data would change, but Flutter wouldn't know it
needs to repaint the screen, and the user wouldn't see any updates.

现在，当你在 `TextInput` 中输入一个合法的猜测并提交时，
应用将会反映用户的猜测。
如果你调用 `_game.guess(guess)` 时 **没有** 调用 setState，
内部游戏数据会改变，但 Flutter 不会知道
它需要重新绘制屏幕，用户也不会看到任何更新。

[`setState`]: {{site.api}}/flutter/widgets/State/setState.html

### Review

### 回顾

<SummaryCard>
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Learned when widgets need to be stateful
    icon: change_circle
    details: >-
      When a widget's appearance or data needs to change during its lifetime,
      you need a `StatefulWidget`. The widget itself stays immutable, but
      its companion `State` object holds mutable data and triggers rebuilds.
  - title: Converted GamePage to a StatefulWidget
    icon: swap_horiz
    details: >-
      You refactored `GamePage` to be stateful by
      creating a companion `_GamePageState` class, moving the
      `build` method and mutable properties to it, and
      implementing `createState()`.
      Your IDE's support for quick assists can automate this conversion.
  - title: Made your app respond to user input with setState
    icon: refresh
    details: >-
      Calling `setState` tells Flutter to rebuild the UI of a widget.
      When a user submits a guess, you call `setState` to update the game state,
      and the grid automatically reflects the new data.
      Your app is now truly interactive!
</SummaryCard>

### Test yourself

### 自测

<Quiz title="Stateful Widgets Quiz">
- question: When should you use a StatefulWidget instead of a StatelessWidget?
  options:
    - text: When the widget needs to make HTTP requests.
      correct: false
      explanation: HTTP requests can be made from either, but state changes require StatefulWidget.
    - text: When the widget's appearance or data needs to change during its lifetime.
      correct: true
      explanation: StatefulWidget is needed when the UI must update in response to data changes over time.
    - text: When the widget has more than three child widgets.
      correct: false
      explanation: The number of children doesn't determine whether a widget is stateful.
    - text: When the widget is at the root of the widget tree.
      correct: false
      explanation: Root widgets can be stateless; statefulness depends on whether data changes during the widget's lifetime.
- question: What happens if you change data in a State object without calling setState?
  options:
    - text: The app will crash with an error.
      correct: false
      explanation: The app won't crash, but the UI won't update.
    - text: The data changes internally, but Flutter won't rebuild the UI to reflect the change.
      correct: true
      explanation: Without calling setState, Flutter doesn't know it needs to repaint, so the user won't see updates.
    - text: Flutter automatically detects the change and rebuilds the UI.
      correct: false
      explanation: Flutter requires setState to know when to rebuild; it doesn't auto-detect changes.
    - text: The widget is removed from the widget tree.
      correct: false
      explanation: The widget remains; it just won't visually update without setState.
</Quiz>
