---
# title: Create widgets
title: 创建 widget
# description: Learn about stateless widgets and how to build your own.
description: 了解无状态 widget 以及如何构建你自己的 widget。
layout: tutorial
---

Learn to create custom widgets and use the most common SDK widgets like
Container, Center, and Text.

学习如何创建自定义 widget，并使用最常见的 SDK widget，如 Container、Center 和 Text。

<YouTubeEmbed id="gyBUnaojFDg" title="Anatomy of a widget" fullWidth="true"></YouTubeEmbed>

<SummaryCard>
title: What you'll accomplish
items:
  - title: Create a custom StatelessWidget
    icon: widgets
  - title: Make widgets reusable with constructor parameters
    icon: tune
  - title: Style widgets using Container and BoxDecoration
    icon: palette
</SummaryCard>

---

### Before you start

### 开始之前

This app relies on a bit of game logic that isn't UI-related,
and thus is outside the scope of this tutorial.
Before you move on, you need to add this logic to your app.

这个应用依赖一些与 UI 无关的游戏逻辑，
因此超出了本教程的范围。
在继续之前，你需要将这些逻辑添加到你的应用中。

1.  Download the file below and save it
    as `lib/game.dart` in your project directory.

    下载下面的文件，并将其保存为项目目录中的 `lib/game.dart`。

1.  Import the file in your `lib/main.dart` file.

    在你的 `lib/main.dart` 文件中导入该文件。

<DownloadableSnippet src="tutorial/game-code.dart" name="game.dart" />

:::note Game logic note

You might notice the
`legalGuesses` and `legalWords` lists only contain a few words.
The full lists combined have over 10,000 words and were omitted for brevity.
You don't need the full lists to continue the tutorial.
When you're testing your app, make sure to use the words from those lists.

你可能会注意到 `legalGuesses` 和 `legalWords` 列表只包含少量单词。
完整的列表合计超过 10,000 个单词，为简洁起见已省略。
你不需要完整的列表即可继续本教程。
在测试应用时，请确保使用这些列表中的单词。

Alternatively, you can find the full lists in
[this GitHub repository][full-words], as well as
instructions to import it into your project.

或者，你可以在[这个 GitHub 仓库][full-words]中找到完整的列表，
以及将其导入到项目中的说明。

:::

[full-words]: https://github.com/ericwindmill/legal_wordle_words

### Anatomy of a stateless widget

### 无状态 widget 的结构

A `Widget` is a Dart class that extends one of the Flutter widget classes,
in this case [`StatelessWidget`][].

`Widget` 是一个 Dart 类，它继承了 Flutter widget 类之一，
在本例中是 [`StatelessWidget`][]。

Open your `main.dart` file and add this code below the `MainApp` class,
which defines a new widget called `Tile`.

打开你的 `main.dart` 文件，在 `MainApp` 类下方添加以下代码，
它定义了一个名为 `Tile` 的新 widget。

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

  final String letter;
  final HitType hitType;

  // ...
}
```

[`StatelessWidget`]: {{site.api}}/flutter/widgets/StatelessWidget-class.html

#### Constructor

#### 构造函数

The `Tile` class has a [constructor][] that defines
what data needs to be passed into the widget to render the widget.
In this case, the constructor accepts two parameters:

`Tile` 类有一个[构造函数][constructor]，它定义了
渲染该 widget 时需要传入哪些数据。
在本例中，构造函数接受两个参数：

- A `String` representing the guessed letter of the tile.

  一个 `String`，表示方块中猜测的字母。

- A `HitType` [enum value][] represent the guess result and
  used to determine the color of the tile.
  For example, `HitType.hit` results in a green tile.

  一个 `HitType` [枚举值][enum value]，表示猜测结果，
  用于确定方块的颜色。
  例如，`HitType.hit` 会产生一个绿色方块。

Passing data into widget constructors is at the core of making widgets reusable.

通过构造函数向 widget 传递数据是实现 widget 可复用的核心。

[constructor]: {{site.dart-site}}/language/constructors
[enum value]: {{site.dart-site}}/language/enums

#### Build method

#### `build` 方法

Finally, there's the all important `build` method, which must be defined on
every widget, and will always return another widget.

最后是至关重要的 `build` 方法，它必须在每个 widget 上定义，
并且始终返回另一个 widget。

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    // TODO: Replace Container with widgets.
    return Container();
  }
}
```

### Use the custom widget

### 使用自定义 widget

When the app is finished,
there will be 25 instances of this widget on the screen.
For now, though, display just one so you can see the updates as they're made.
In the `MainApp.build` method, replace the `Text` widget with the following:

当应用完成后，屏幕上将有 25 个这样的 widget 实例。
不过现在，只显示一个，这样你可以在修改时看到更新效果。
在 `MainApp.build` 方法中，将 `Text` widget 替换为以下内容：

```dart
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Tile('A', HitType.hit), // NEW
        ),
      ),
    );
  }
}
```

At the moment, your app will be blank,
because the `Tile` widget returns an empty `Container`,
which doesn't display anything by default.

此时，你的应用将是空白的，
因为 `Tile` widget 返回了一个空的 `Container`，
默认情况下它不会显示任何内容。

### The `Container` widget

### `Container` widget

The `Tile` widget consists of three of the most common core widgets:
`Container`, `Center`, and `Text`.
[`Container`][] is a convenience widget that wraps several core styling widgets,
such as [`Padding`][], [`ColoredBox`][], [`SizedBox`][], and [`DecoratedBox`][].

`Tile` widget 由三个最常用的核心 widget 组成：
`Container`、`Center` 和 `Text`。
[`Container`][] 是一个便捷 widget，它封装了多个核心样式 widget，
例如 [`Padding`][]、[`ColoredBox`][]、[`SizedBox`][] 和 [`DecoratedBox`][]。

Because the finished UI contains 25 `Tile` widgets in neat columns and rows,
it should have an explicit size.
Set the width and height properties on the `Container`.
(You could also do this with a `SizedBox` widget, but you'll use
more properties of the `Container` next.)

因为最终的 UI 包含 25 个整齐排列成行和列的 `Tile` widget，
所以它应该有一个明确的尺寸。
在 `Container` 上设置 width 和 height 属性。
（你也可以使用 `SizedBox` widget 来实现，但接下来你会用到
`Container` 的更多属性。）

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    // NEW
    return Container(
      width: 60,
      height: 60,
      // TODO: Add needed widgets
    );
  }
}
```

[`Container`]: {{site.api}}/flutter/widgets/Container-class.html
[`Padding`]: {{site.api}}/flutter/widgets/Padding-class.html
[`ColoredBox`]: {{site.api}}/flutter/widgets/ColoredBox-class.html
[`SizedBox`]: {{site.api}}/flutter/widgets/SizedBox-class.html
[`DecoratedBox`]: {{site.api}}/flutter/widgets/DecoratedBox-class.html

### BoxDecoration

Next, add a [`Border`][] to the box with the following code:

接下来，使用以下代码为方框添加一个 [`Border`][]：

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    // NEW
    return Container(
      width: 60,
      height: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        // TODO: add background color
      ),
    );
  }
}
```

`BoxDecoration` is an object that knows how to
add any number of decorations to a widget, from
background color to borders to box shadows and more.
In this case, you've added a border.
When you hot reload, there should be
a lightly colored border around the white square.

`BoxDecoration` 是一个能够为 widget 添加各种装饰的对象，
包括背景颜色、边框、阴影等等。
在本例中，你添加了一个边框。
当你热重载后，白色方块周围应该会出现一个浅色边框。

When this game is complete,
the color of the tile will depend on the user's guess.
The tile will be green when the user has guessed correctly,
yellow when the letter is correct but the position is incorrect, and
gray if the guess is wrong in both respects.

当这个游戏完成后，
方块的颜色将取决于用户的猜测。
当用户猜对时方块为绿色，
当字母正确但位置不对时为黄色，
当两者都错时为灰色。

The following figure shows all three possibilities.

下图展示了所有三种可能的情况。

<img src='/assets/images/docs/tutorial/tiles.png' width="320px" alt="A screenshot of a green, yellow, and grey tile.">


To achieve this in UI, use a [switch expression][] to
set the `color` of the `BoxDecoration`.

要在 UI 中实现这一效果，请使用 [switch 表达式][switch expression]
来设置 `BoxDecoration` 的 `color`。

```dart
class Tile extends StatelessWidget {
  const Tile(required this.letter, required hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 60,
      height: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        color: switch (hitType) {
          HitType.hit => Colors.green,
          HitType.partial => Colors.yellow,
          HitType.miss => Colors.grey,
          _ => Colors.white,
        },
        // TODO: add children
      ),
    );
  }
}
```

[`Border`]: {{site.api}}/flutter/widgets/Container-class.html
[switch expression]: {{site.dart-site}}/language/branches#switch-expressions

### Child widgets

### 子 widget

Finally, add the `Center` and `Text` widgets to the `Container.child` property.

最后，将 `Center` 和 `Text` widget 添加到 `Container.child` 属性中。

Most widgets in the Flutter SDK have a `child` or `children` property that's
meant to be passed a widget or a list of widgets, respectively.
It's the best practice to use the same naming convention in
your own custom widgets.

Flutter SDK 中的大多数 widget 都有 `child` 或 `children` 属性，
分别用于传入一个 widget 或一个 widget 列表。
在你自己的自定义 widget 中使用相同的命名约定是最佳实践。

```dart
class Tile extends StatelessWidget {
  const Tile(this.letter, this.hitType, {super.key});

  final String letter;
  final HitType hitType;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 60,
      height: 60,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        color: switch (hitType) {
          HitType.hit => Colors.green,
          HitType.partial => Colors.yellow,
          HitType.miss => Colors.grey,
          _ => Colors.white,
        },
      ),
      child: Center(
        child: Text(
          letter.toUpperCase(),
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
    );
  }
}
```

Hot reload and a green box appears. To toggle the color,
update and hot reload the `HitType` passed into the `Tile` you created:

热重载后会出现一个绿色方块。要切换颜色，
请更新传入你创建的 `Tile` 的 `HitType` 并热重载：

```dart
// main.dart line ~16
// green
child: Tile('A', HitType.hit)
// grey
child: Tile('A', HitType.miss)
// yellow
child: Tile('A', HitType.partial)
```

Soon, this small box will be one of many widgets on the screen. In the next
lesson, you'll start building the game grid itself.

很快，这个小方块将成为屏幕上众多 widget 之一。在下一课中，
你将开始构建游戏网格本身。

### Review

### 回顾

<SummaryCard>
title: What you accomplished
subtitle: Here's a summary of what you built and learned in this lesson.
completed: true
items:
  - title: Built a custom StatelessWidget
    icon: widgets
    details: >-
      You created a new `Tile` widget by extending `StatelessWidget`.
      Every widget has a constructor to accept data and
      a `build` method that returns other widgets.
      This pattern is fundamental to building user interfaces with Flutter.
  - title: Made widgets reusable with constructor parameters
    icon: tune
    details: >-
      By accepting `letter` and `hitType` as constructor parameters,
      your `Tile` widget can display different content and colors.
      Passing data through constructors is how you can
      create flexible, reusable components.
  - title: Styled widgets using Container and BoxDecoration
    icon: palette
    details: >-
      You used `Container` to set the widget's size and
      `BoxDecoration` to add borders and background colors.
      Then to conditional style the tile's color,
      you used a switch expression on the `hitType` value.
</SummaryCard>

### Test yourself

### 测试一下

<Quiz title="Widget Fundamentals Quiz">
- question: "What must every Flutter widget's `build` method return?"
  options:
    - text: A String describing the widget.
      correct: false
      explanation: "The `build` method returns a widget, not a String."
    - text: Another widget.
      correct: true
      explanation: "The `build` method always returns another widget, which forms part of the widget tree."
    - text: A boolean indicating success or failure.
      correct: false
      explanation: Widgets don't indicate success; they return other widgets to be rendered.
    - text: Null if there's nothing to display.
      correct: false
      explanation: "The `build` method cannot return null; it must return a valid widget."
- question: Which object is used to add decorations like borders, background colors, and shadows to a Container?
  options:
    - text: ThemeData
      correct: false
      explanation: ThemeData is for app-wide styling, not individual container decorations.
    - text: TextStyle
      correct: false
      explanation: TextStyle is for text formatting, not container decorations.
    - text: BoxDecoration
      correct: true
      explanation: BoxDecoration can add borders, background colors, gradients, shadows, and more to a Container.
    - text: EdgeInsets
      correct: false
      explanation: EdgeInsets is for specifying padding or margin, not visual decorations.
</Quiz>
